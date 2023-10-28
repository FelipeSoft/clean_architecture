import { Router } from "express";
import { authenticationController } from "../modules/AuthenticationModule";

const authenticationRoutes = Router();

authenticationRoutes.get("/authentication/login", authenticationController.login);

export default authenticationRoutes;

