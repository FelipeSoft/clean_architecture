import { Router } from "express";

interface IRouter {
    init(): void;
    getRoutes(): Router;
}

export default IRouter;