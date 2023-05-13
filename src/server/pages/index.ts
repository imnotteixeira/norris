import { Router, RequestHandler } from "express";
import homePageHandler from "./home"
import authPageHandler from "./auth"
import dashboardPageHandler from "./dashboard"

export type PageHandler = (router: Router) => void

export interface IRouteHandler {
    handle: RequestHandler
}

const PAGE_HANDLERS = [
    homePageHandler,
    authPageHandler,
    dashboardPageHandler,
]

export default () => {
    
    const app = Router();

    const registerPage = (pageHandler: PageHandler) => pageHandler(app)
    
    PAGE_HANDLERS.forEach(registerPage)

    return app;
};
