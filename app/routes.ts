import { Router } from "express";

import User from "./controllers/user.controller";
const routes = Router();


routes.get("/users", User.list);
routes.get("/users/:id", User.detail);
routes.patch("/users/:id", User.patch);


export default routes;