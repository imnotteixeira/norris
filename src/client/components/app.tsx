import React, { useEffect, useState } from 'react';
import { AppContext, DashboardPageContext } from '../../shared';
import { PageType } from '../../shared/constants';
import DashboardContent from './DashboardContent';

const STRAVA_CLIENT_ID = "100410";
// This needs to be allowlisted in the strava app settings
const OAUTH_REDIRECT_URL = "https://6b09-2-153-89-31.ngrok-free.app/login/strava/";
const STRAVA_OAUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code&scope=activity:read_all`

const App: React.FC<AppContext> = (props) => {
    
    const [disabled, setDisabled] = useState<boolean>(()=>true)
    

    useEffect(() => {
        // This is important, as it makes the app "usable" once it is hydrated
        setDisabled(false)
    }, [])


    return (
        <div>
            <h1>This should be a {props.pageType} page</h1>
            {props.pageType === PageType.HOME && <a href={STRAVA_OAUTH_URL}>Connect Strava Account</a>}
            {props.pageType === PageType.DASHBOARD && <DashboardContent {...props as DashboardPageContext}/>}
        </div>
    );
}

export default App;
