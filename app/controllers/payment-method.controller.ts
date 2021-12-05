import { Request, Response } from "express";

let paymentMethods: { [key: string]: { [key: string]: any }[] } = {
    "1": [
        { id: "1", description: "Banco 1", expirationDate: "2022-12-01 00:00:00.000", securityCode: "2222", number: "2222.3333.4444.5555" },
        { id: "dda8d5e0-55d4-11ec-b0e4-0b2861e598bf", description: "Banco 2", expirationDate: "2022-07-01 00:00:00.000", securityCode: "5569", number: "0069.5845.3587.5421" }
    ]
}

export default {
    list(req: Request, res: Response): any {
        let userId: any = req.query.user;

        if (paymentMethods[userId]) return res.status(200).json(paymentMethods[userId]);
        return res.status(200).json([]);
    },
    create(req: Request, res: Response): any {
        let userId: any = req.query.user;
        if (paymentMethods[userId]) paymentMethods[userId].push(req.body);
        else paymentMethods[userId] = [req.body];
        return res.status(201).json({});
    },
    patch(req: Request, res: Response): any {
        let userId: any = req.query.user;
        if (paymentMethods[userId]) {
            let index: number = paymentMethods[userId].findIndex((payment: { [key: string]: any }) => payment.id === req.params['id']);
            if (index !== -1) {
                Object.keys(paymentMethods[userId][index]).forEach((key: string) => {
                    paymentMethods[userId][index][key] = (req.body[key]) ? req.body[key] : paymentMethods[userId][index][key];
                });
                return res.status(200).json({ 'detail': 'payment method updated' });
            }
            return res.status(404).json({ 'detail': 'payment method not found' });
        }
        return res.status(404).json({ 'detail': 'user not found' });

    },
    delete(req: Request, res: Response): any {
        let userId: any = req.query.user;

        if (paymentMethods[userId]) {
            let index: number = paymentMethods[userId].findIndex((payment: { [key: string]: any }) => payment.id === req.params['id']);
            if (index !== -1) {
                paymentMethods[userId].splice(index, 1);
                return res.status(200).json({ 'detail': 'payment method removed' });
            }
            return res.status(404).json({ 'detail': 'payment method not found' });
        }
        return res.status(404).json({ 'detail': 'user not found' });
    }
}