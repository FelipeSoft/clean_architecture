import { Request, Response } from "express"

interface IUserController {
    handle(request: Request, response: Response): Promise<Response>;
}

export default IUserController;