import { RequestHandler, Router } from "express";
import Container, { Inject, Service } from "typedi";
import { DefaultPageProps, IRouteRenderHandler, PageData, PageHandler, PageResponse, SyncPageRequestHandler } from ".";
import { HomePageContext } from "../../shared";
import { PageId, PageType } from "../../shared/constants";

const router = Router();
@Service()
class HomeHandler implements IRouteRenderHandler<HomePageContext> {
    
    @Inject("DEFAULT_PAGE_PROPS")
    defaultPageProps: DefaultPageProps;

    constructor() {}
    
    handle: SyncPageRequestHandler<HomePageContext> = (): PageData<HomePageContext> => {
        
        return {
            pageId: PageId.INDEX,
            defaultPageProps: this.defaultPageProps,
            context: {
                pageType: PageType.HOME,
            }
        }
    }
}

// const registerer: PageHandler = (app: Router) => 
//     genericPageRenderer(app, router, "/", "get", "/", Container.get(HomeHandler).handle);

const registerer: PageHandler = (app: Router) => {
    app.use("/", router);

    router.get("/", (req: any, res: PageResponse, next: any) => {
        const pageResponseData = Container.get(HomeHandler).handle(req);

        res.render(pageResponseData.pageId, {
            defaultPageProps: pageResponseData.defaultPageProps,
            context: JSON.stringify(pageResponseData.context)
        })
    })

}

export default registerer;
