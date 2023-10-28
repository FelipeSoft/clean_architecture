import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import LoginAuthentication from "../usecases/Authentication/LoginAuthentication";
import AuthenticationRouter from "../routers/authenticationRoutes";
import Database from "../../../core/Database";
import AuthenticationDataAccessObjectMySQL from "../../persistence/dao/AuthenticationDataAccessObjectMySQL";
import AuthenticationRepository from "../../persistence/repositories/AuthenticationRepository";

const router = Router();
const connection = new Database();

const authenticationDataAccessObject = new AuthenticationDataAccessObjectMySQL(connection.getConnection());
const authenticationRepository = new AuthenticationRepository(authenticationDataAccessObject);
const loginAuthentication = new LoginAuthentication(authenticationRepository);

const authenticationController = new AuthenticationController(loginAuthentication);

export { authenticationController };
