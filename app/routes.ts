import { Router } from "express";
import User from "./controllers/user.controller";
import upload from "./upload";


const routes = Router();

routes.get("/users", User.list);
routes.get("/users/:id", User.detail);
routes.patch("/users/:id", upload.single("profile"), User.patch);



export default routes;