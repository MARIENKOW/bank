import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import fileUpload from "express-fileupload";
import { Img } from "./models/Img.js";
import { Admin } from "./models/Admin.js";
import { Access } from "./models/Access.js";
import { Event } from "./models/Event.js";
import { Blog } from "./models/Blog.js";
import { Video } from "./models/Video.js";
import VideoRouter from "./routers/VideoRouter.js";
import config from "./config.js";
import SiteRouter from "./routers/SiteRouter.js";
import AdminRouter from "./routers/AdminRouter.js";
import AccessRouter from "./routers/AccessRouter.js";
import UserRouter from "./routers/UserRouter.js";
import EventRouter from "./routers/EventRouter.js";
import PhoneRouter from "./routers/PhoneRouter.js";
import BlogRouter from "./routers/BlogRouter.js";
import { BlogVersionLanguage } from "./models/BlogVersionLanguage.js";
import { User } from "./models/User.js";
import { EventInsurance } from "./models/EventInsurance.js";
import EventInsuranceRouter from "./routers/EventInsuranceRouter.js";
import { Credit } from "./models/Credit.js";
import { Document } from "./models/Document.js";
import CreditRouter from "./routers/CreditRouter.js";
import BankRouter from "./routers/BankRouter.js";
import { UserDocument } from "./models/UserDocument.js";
import UserDocumentRouter from "./routers/UserDocumentRouter.js";
import { Bank } from "./models/Bank.js";

const asModels = (models) => {
    Object.values(models).forEach((model) => {
        if (typeof model.associate === "function") {
            model.associate(models);
        }
    });
};

asModels({
    Img,
    Admin,
    Access,
    Blog,
    Video,
    BlogVersionLanguage,
    User,
    Event,
    EventInsurance,
    Document,
    Credit,
    UserDocument,
    Bank
});

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: config.CLIENT_URL,
    })
);

app.use(
    "/api" + process.env.VIDEO_FOLDER,
    express.static("./" + process.env.VIDEO_FOLDER)
);
app.use(
    "/api" + process.env.NFT_FOLDER,
    express.static("./" + process.env.NFT_FOLDER)
);
app.use(
    "/api" + process.env.DOCUMENT_FOLDER,
    express.static("./" + process.env.DOCUMENT_FOLDER)
);
app.use("/api/meta", express.static("./meta"));
app.use("/api/Admin", AdminRouter);
app.use("/api/User", UserRouter);
app.use("/api/Access", AccessRouter);
app.use("/api/Event", EventRouter);
app.use("/api/EventInsurance", EventInsuranceRouter);
app.use("/api/Blog", BlogRouter);
app.use("/api/Video", VideoRouter);
app.use("/api/Phone", PhoneRouter);
app.use("/api/Credit", CreditRouter);
app.use("/api/Bank", BankRouter);
app.use("/api/UserDocument", UserDocumentRouter);
app.use("/api", SiteRouter);

const web = http.Server(app);

try {
    web.listen(PORT, process.env.SERVER_URL, () =>
        console.log("Server is working")
    );
} catch (e) {
    console.log(`${e.message}`);
}
