import { Router } from "express";

import upload from "./upload";
import User from "./controllers/user.controller";
import Purchase from "./controllers/purchase.controller";
import paymentMethods from "./controllers/payment-method.controller";

const routes = Router();

routes.get("/users", User.list);
routes.get("/users/:id", User.detail);
routes.patch("/users/:id", upload.single("profile"), User.patch);

routes.get("/payment-methods", paymentMethods.list);
routes.post("/payment-methods", paymentMethods.create);
routes.patch("/payment-methods/:id", paymentMethods.patch);
routes.delete("/payment-methods/:id", paymentMethods.delete);

routes.get("/purchases", Purchase.list);
routes.post("/purchases", Purchase.create);
routes.patch("/purchases/:id", Purchase.patch);
routes.delete("/purchases/:id", Purchase.delete);

export default routes;