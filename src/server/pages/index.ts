import { Router, RequestHandler, Request, IRouterMatcher, Response } from "express";
import homePageHandler from "./home"
import authPageHandler from "./auth"
import dashboardPageHandler from "./dashboard"
import { PageId, PageType } from "../../shared/constants";

export type PageHandler = (router: Router) => void

export interface PageContext {
    pageType: PageType
}

export interface DefaultPageProps {
    reactVersion: string,
    reactDomVersion: string,
    suffix: string,
    containerId: string,
    assetsPath: string
}
export interface PageData<T extends PageContext> {
    pageId: PageId
    defaultPageProps: DefaultPageProps
    context: T
}
export interface RenderPageData<T extends PageContext> {
    defaultPageProps: DefaultPageProps,
    body: string,
    context: T
}

// export interface PageHandlerResponse<T extends PageContext> extends PageData<T> {
//     context: T
// }

export type AsyncPageRequestHandler<T extends PageContext> = (req: Request<any>) => Promise<PageData<T>>
export type SyncPageRequestHandler<T extends PageContext> = (req: Request<any>) => PageData<T>
type PageRequestHandler<T extends PageContext> = SyncPageRequestHandler<T> | AsyncPageRequestHandler<T>

export type AsyncRedirectHandler = (req: Request<any>, res: Response<any>) => Promise<void>
export type SyncRedirectHandler = (req: Request<any>, res: Response<any>) => void
type PageRedirectHandler = SyncRedirectHandler | AsyncRedirectHandler

export interface IRouteRenderHandler<T extends PageContext> {
    handle: PageRequestHandler<T>
}

export interface IRouteRedirectHandler {
    handle: PageRedirectHandler
}

const PAGE_HANDLERS = [
    homePageHandler,
    authPageHandler,
    dashboardPageHandler,
]

export interface PageResponse extends Omit<Response, 'render'> {
    render: (view: PageId, options?: RenderPageData<any>) => void;
}

// export const genericPageRenderer = <T extends PageContext> (
//     app: Router,
//     router: Router, 
//     appPath: string, 
//     // routerHandlerFn: (path: string, fn: (req: any, res: PageResponse, next: any) => Promise<void>) => {}, 
//     routerHandlerMethod: string, 
//     localRoutePath: string, 
//     routeHandler: PageRequestHandler<T>
// ) => {
//     app.use(appPath, router);

//     router[routerHandlerMethod](localRoutePath, async (req: any, res: PageResponse, next: any) => {
//         const pageResponseData = await routeHandler(req);

//         res.render(pageResponseData.pageId, {
//             defaultPageProps: pageResponseData.defaultPageProps,
//             context: JSON.stringify(pageResponseData.context)
//         })
//     })
// }

export default () => {
    
    const app = Router();

    const registerPage = (pageHandler: PageHandler) => pageHandler(app)
    
    PAGE_HANDLERS.forEach(registerPage)

    return app;
};
