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
}