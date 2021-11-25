import { Request, Response } from "express";


let purchases: { [key: string]: { [key: string]: any }[] } = {
    "1": [
        { 'id': '1', 'name': '', 'description': '', 'value': '', 'date': '' },
        { 'id': '2', 'name': '', 'description': '', 'value': '', 'date': '' },
    ]
};

export default {
    list(req: Request, res: Response): any {
        let userId: any = req.query.user;
        if (purchases[userId]) return res.status(200).json(purchases[userId]);
        return res.status(200).json([]);
    },
    create(req: Request, res: Response): any {
        let userId: any = req.query.user;

        if (purchases[userId]) purchases[userId].push(req.body);
        else purchases[userId] = [req.body];
        return res.status(201).json({});
    },
    patch(req: Request, res: Response): any {
        let userId: any = req.query.user;
        if (purchases[userId]) {
            let index: number = purchases[userId].findIndex((payment: { [key: string]: any }) => payment.id === req.params['id']);
            if (index !== -1) {
                Object.keys(purchases[userId][index]).forEach((key: string) => {
                    purchases[userId][index][key] = (req.body[key]) ? req.body[key] : purchases[userId][index][key];
                });
                return res.status(200).json({ 'detail': 'payment method updated' });
            }
            return res.status(404).json({ 'detail': 'payment method not found' });
        }
        return res.status(404).json({ 'detail': 'user not found' });

    },
    delete(req: Request, res: Response): any {
        let userId: any = req.query.user;

        if (purchases[userId]) {
            let index: number = purchases[userId].findIndex((payment: { [key: string]: any }) => payment.id === req.params['id']);
            if (index !== -1) {
                purchases[userId].splice(index, 1);
                return res.status(200).json({ 'detail': 'payment method removed' });
            }
            return res.status(404).json({ 'detail': 'payment method not found' });
        }
        return res.status(404).json({ 'detail': 'user not found' });
    }


}