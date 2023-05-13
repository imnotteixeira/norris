import { RequestHandler, Router } from "express";
import { IRouteHandler, PageHandler } from ".";
import fetch from 'node-fetch';
import Container, { Inject, Service } from "typedi";

const router = Router();

@Service()
class AuthHandler implements IRouteHandler {
    
    @Inject("DEFAULT_PAGE_PROPS")
    defaultPageProps: Record<string, any>;

    constructor() {}

    STRAVA_CLIENT_ID = "GET_THIS_FROM_ENV";
    STRAVA_CLIENT_SECRET = "GET_THIS_FROM_ENV"
    
    handle: RequestHandler = async (req, res) => {
        // TODO: Should we really be storing this directly in the client?
        // TODO more secure cookie settings
        // TODO CSRF?
        const stravaOauthRes = await fetch("https://www.strava.com/api/v3/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: this.STRAVA_CLIENT_ID,
                client_secret: this.STRAVA_CLIENT_SECRET,
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
