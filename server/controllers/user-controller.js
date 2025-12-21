import bcrypt from "bcrypt";
import token from "../services/token-service.js";
import { User } from "../models/User.js";
import { Img } from "../models/Img.js";

import config from "../config.js";

class Controller {
    signIn = async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({
                where: { username },
            });

            if (!userData)
                return res
                    .status(400)
                    .json({ email: "Username is not defined" });

            const dbPass = userData.passwordHash;
            const isPassEquals = await bcrypt.compare(password, dbPass);

            if (!isPassEquals)
                return res
                    .status(400)
                    .json({ password: "Password is not correct" });

            if (!userData.isActivated)
                return res.status(400).json({
                    "root.server": "Account is not activated.",
                });

            const tokens = token.generateTokens({
                id: userData.id,
                role: "user",
            });
            await token.saveTokenUser(userData.id, tokens.refreshToken);
            await res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: config.REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000,
                httpOnly: true,
                // secure: true,   //mandatory
                // sameSite: 'none', // mandatory
                // path: "/"  // mandatory
            });
            await res.cookie("accessToken", tokens.accessToken, {
                maxAge: config.ACCESS_TOKEN_MINUTES * 60 * 1000,
                httpOnly: true,
                // secure: true,   //mandatory
                // sameSite: 'none', // mandatory
                // path: "/"  // mandatory
            });

            // const userFullInfo = await userService.fullInfo(userData);

            res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    signUp = async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const usernameFind = await User.findOne({ where: { username } });

            if (usernameFind)
                return res
                    .status(400)
                    .json({ username: "Username is already taken" });

            const passwordHash = await bcrypt.hash(password, 5);

            const insertUser = await User.create({
                username,
                password,
                passwordHash,
            });

            const { id } = insertUser;

            try {
                const tokens = token.generateTokens({ id, role: "user" });
                await token.saveTokenUser(id, tokens.refreshToken);
            } catch (e) {
                await insertUser.destroy();
                throw e;
            }
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    logOut = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            await token.removeTokenUser(refreshToken);
            res.status(200).json(true);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };

    refresh = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken)
                return res.status(401).json("not authorized user");

            const ansData = token.validateRefreshToken(refreshToken);
            const userData = await token.findTokenUser(refreshToken);
            if (!ansData || !userData)
                return res.status(401).json("not authorized user");
            const tokens = token.generateTokens({
                id: userData.id,
                role: "user",
            });
            await token.saveTokenUser(userData.id, tokens.refreshToken);
            await res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: config.REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000, //days
                httpOnly: true,
                // secure: true,   //mandatory
                // sameSite: 'none', // mandatory
                // path: "/"  // mandatory
            });
            await res.cookie("accessToken", tokens.accessToken, {
                maxAge: config.ACCESS_TOKEN_MINUTES * 60 * 1000,
                httpOnly: true,
                // secure: true,   //mandatory
                // sameSite: 'none', // mandatory
                // path: "/"  // mandatory
            });
            res.status(200).json(tokens.accessToken);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };

    aboutUser = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) return res.status(401).json("not Authorization");
            const userData = await token.findTokenUser(refreshToken);
            const ansData = token.validateRefreshToken(refreshToken);
            if (!ansData || !userData)
                return res.status(401).json("not Authorization");

            return res.json(userData);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };

    getAll = async (req, res) => {
        try {
            const usersData = await User.findAll();

            return res.json(usersData);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json("id is not found");

            const userData = await User.findOne({
                where: {
                    id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            return res.json(userData);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    // cashOut = async (req, res) => {
    //     try {
    //         const { sum, description, user_id } = req.body;

    //         if (!sum || !user_id)
    //             return res
    //                 .status(400)
    //                 .json({ "root.server": "Incorrect values" });

    //         const { id: checkUp_id } = await CheckUp.findOne({
    //             order: [["date", "desc"]],
    //         });

    //         const userData = await User.findOne({
    //             where: { id: user_id },
    //         });

    //         if (!userData)
    //             return res
    //                 .status(400)
    //                 .json({ "root.server": "User is not found" });

    //         const { [depositTypes[deposit_type]]: deposit, id } = userData;

    //         const newDepositSum = parseFloat(deposit) - parseFloat(sum);

    //         if (newDepositSum < 0)
    //             return res
    //                 .status(400)
    //                 .json({ sum: "not enough money on deposit" });

    //         const eventData = await Event.create({
    //             sum,
    //             name: description ? `cash out: ${description}` : "cash out",
    //             user_id: id,
    //             checkUp_id,
    //             deposit_type,
    //             increment: 0,
    //         });

    //         try {
    //             await User.update(
    //                 {
    //                     [depositTypes[deposit_type]]: newDepositSum.toFixed(2),
    //                 },
    //                 { where: { id } }
    //             );
    //         } catch (error) {
    //             await eventData.destroy();
    //             throw error;
    //         }

    //         res.status(200).json(true);
    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json(e?.message);
    //     }
    // };
    updateName = async (req, res) => {
        try {
            const { name, id } = req.body;

            if (!name) return res.status(400).json({ name: "name not found" });

            await User.update({ name }, { where: { id } });

            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    updateElc = async (req, res) => {
        try {
            const { elc, id } = req.body;

            if (!elc) return res.status(400).json({ elc: "elc not found" });

            await User.update({ elc }, { where: { id } });

            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    updateBankNumber = async (req, res) => {
        try {
            const { bankNumber, id } = req.body;

            if (!bankNumber)
                return res
                    .status(400)
                    .json({ bankNumber: "bankNumber not found" });

            await User.update({ bankNumber }, { where: { id } });

            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    updateUsername = async (req, res) => {
        try {
            const { username, id } = req.body;

            if (!username)
                return res.status(400).json({ username: "username not found" });

            const userDataDublicat = await User.findOne({
                where: { username },
            });

            if (userDataDublicat)
                return res
                    .status(400)
                    .json({ username: "Username is already taken" });

            await User.update({ username }, { where: { id } });

            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    updatePassword = async (req, res) => {
        try {
            const { password, id } = req.body;

            if (!password)
                return res.status(400).json({ password: "password not found" });

            const passwordHash = await bcrypt.hash(password, 5);

            await User.update({ password, passwordHash }, { where: { id } });

            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
}
export default new Controller();
