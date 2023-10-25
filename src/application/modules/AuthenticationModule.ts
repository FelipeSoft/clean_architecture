import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import LoginAuthentication from "../usecases/Authentication/LoginAuthentication";
import AuthenticationRouter from "../routers/AuthenticationRouter";
import Database from "../../../config/database";
import AuthenticationDataAccessObjectMySQL from "../../persistence/dao/AuthenticationDataAccessObjectMySQL";
import AuthenticationRepository from "../../persistence/repositories/AuthenticationRepository";

const router = Router();
const connection = new Database();

const authenticationDataAccessObject = new AuthenticationDataAccessObjectMySQL(connection.getConnection());
const authenticationRepository = new AuthenticationRepository(authenticationDataAccessObject);
const loginAuthentication = new LoginAuthentication(authenticationRepository);

const authenticationController = new AuthenticationController(loginAuthentication);
const authenticationRouter = new AuthenticationRouter(authenticationController, router);

export { authenticationRouter };
