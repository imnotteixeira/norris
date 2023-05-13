import { RequestHandler, Router } from "express";
import Container, { Inject, Service } from "typedi";
import { IRouteHandler, PageHandler } from ".";
import { Pages } from "../../shared/constants";

const router = Router();

@Service()
class HomeHandler implements IRouteHandler {
    
    @Inject("DEFAULT_PAGE_PROPS")
    defaultPageProps: Record<string, any>;

    constructor() {}
    
    handle: RequestHandler = (req, res) => {
        res.render("index", {
            ...this.defaultPageProps,
            context: JSON.stringify({
                pageId: Pages.HOME
            })
        })
    }
}

const registerer: PageHandler = (app: Router) => {
    app.use("/", router);

    router.get("/", Container.get(HomeHandler).handle);
};

export default registerer;
