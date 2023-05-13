import { Container } from "typedi"
import { version as reactVersion } from 'react';
import { version as reactDomVersion } from 'react-dom/server';
import { containerId } from '../../shared/constants';
import ssrEntryPoint from '../ssr';

export default (isProd: boolean, assetsPort: string) => {

    const suffix = isProd ? '.production.min.js' : '.development.js';
    
    const assetsPath = `http://localhost:${assetsPort}`; // TODO: Maybe this needs changing for production

    const defaultPageProps = {
        reactVersion,
        reactDomVersion,
        suffix,
        containerId,
        body: ssrEntryPoint,
        assetsPath
    }

    Container.set("DEFAULT_PAGE_PROPS", defaultPageProps)

    initAppConfig()
}

export interface AppConfig {
    STRAVA_CLIENT_ID?: string
    STRAVA_CLIENT_SECRET?: string
}

const REQUIRED_CONFIG_FIELDS = [
    "STRAVA_CLIENT_ID",
    "STRAVA_CLIENT_SECRET",
]

const initAppConfig = async () => {
    require('dotenv-flow').config();

    let missingRequiredConfig = false;
    
    REQUIRED_CONFIG_FIELDS.forEach((requiredField) => {
        if(!process.env[requiredField]) {
            console.error(`${requiredField} is a required config setting! Please set the env variable.`)
            missingRequiredConfig = true
        }
    })

    if (missingRequiredConfig) {
        process.exit(1);
    }

    const config: AppConfig = {
        STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
        STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET
    }


    Container.set<AppConfig>("APP_CONFIG", config)
}