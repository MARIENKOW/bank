import { v4 } from "uuid";
import { unlink, existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { Document } from "../models/Document";

class DocumentService {
    save = async (document) => {
        if (!document) throw new Error("document is not found");
        const name = document?.name || ".pdf";
        const documentName = v4() + name;

        await this.moveFile(document?.data || document, documentName);

        try {
            const path = process.env.DOCUMENT_FOLDER + "/" + documentName;
            const { id: document_id } = await Document.create({
                name: documentName,
                path,
            });
            return { document_id, documentName, path };
        } catch (error) {
            await this.unlinkFile(documentName);
            throw error;
        }
    };

    async moveFile(document, documentName) {
        const uploadPath = path.resolve() + process.env.DOCUMENT_FOLDER;
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
        }
        writeFileSync(uploadPath + "/" + documentName, document);
        return uploadPath;
    }

    async unlinkFile(documentName) {
        return new Promise((res, rej) => {
            const uploadPath = path.resolve() + process.env.DOCUMENT_FOLDER;
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, { recursive: true });
            }
            unlink(uploadPath + "/" + documentName, (err) => {
                if (err) return rej(err);
                res(true);
            });
        });
    }

    async delete(document_id) {
        if (!document_id) throw new Error("document_id is not found");

        const documentData = await Document.findOne({
            where: { id: document_id },
        });

        if (!documentData) return;

        const { name: documentName, id } = documentData;

        await this.unlinkFile(documentName);

        return Document.destroy({ where: { id: document_id } });
    }
}

export default new DocumentService();
