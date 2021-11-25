import { Request, Response } from "express";

let users: { [key: string]: any }[] = [{
    id: "1",
    name: "Gehlen Batatinha",
    profilePhoto: ""
}];

const findUserByID = (id: string) => {
    return users.find((user: { [key: string]: any }) => user.id === id);
};

export default {
    list(req: Request, res: Response): any {
        return res.status(200).json(users);
    },

    detail(req: Request, res: Response): any {
        let user: { [key: string]: any } = findUserByID(req.params['id']);

        if (user) return res.status(200).json(user);
        return res.status(404).json({ "detail": "user not found" });
    },

    patch(req: Request, res: Response): any {
        let user: { [key: string]: any } = findUserByID(req.params['id']);
        if (user) {
            Object.keys(user).forEach((key: string) => {
                user[key] = (req.body[key]) ? req.body[key] : user[key];
            });

            if (req.file) user.profilePhoto = `${req.get('host')}\\${req.file.filename}`
            res.status(200).json({ "detail": "user updated" });
        }
        return res.status(404).json({ "detail": "user not found" });
    }
}