import { RequestHandler, Router } from "express";
import { AsyncPageRequestHandler, AsyncRedirectHandler, IRouteRedirectHandler, PageContext, PageHandler } from ".";
import fetch from 'node-fetch';
import Container, { Inject, Service } from "typedi";
import { AppConfig } from "../module";

const router = Router();

interface AuthPageContext extends PageContext {}
@Service()
class AuthHandler implements IRouteRedirectHandler {
    
    @Inject("DEFAULT_PAGE_PROPS")
    defaultPageProps: Record<string, any>;
    
    @Inject("APP_CONFIG")
    appConfig: AppConfig;

    constructor() {}
    handle: AsyncRedirectHandler = async (req, res) => {
        // TODO: Should we really be storing this directly in the client?
        // TODO more secure cookie settings
        // TODO CSRF?
        const stravaOauthRes = await fetch("https://www.strava.com/api/v3/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: this.appConfig.STRAVA_CLIENT_ID,
                client_secret: this.appConfig.STRAVA_CLIENT_SECRET,
                grant_type: "authorization_code",
                code: req.query.code
            })
        })
        const data = await stravaOauthRes.json();

        console.info("GOT STRAVA AUTH RESPONSE", data)

        res.cookie("strava-oauth-token", data.access_token)
        res.redirect("/dashboard")
    }
}

const registerer: PageHandler = (app: Router) => {
    app.use("/login", router);

    router.get("/strava", Container.get(AuthHandler).handle);
};

export default registerer;
