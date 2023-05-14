import { Service } from 'typedi';
import strava, { Strava } from 'strava-v3';


@Service()
class StravaService {
    
    getActivities = (accessToken: string) => {
        const stravaClient: Strava = new (strava.client as any)(accessToken)
        
        // TODO: REQUIRE PERIOD TO LIMIT RESULTS
        // before
        // Integer, in query 	An epoch timestamp to use for filtering activities that have taken place before a certain time.
        // after
        // Integer, in query 	An epoch timestamp to use for filtering activities that have taken place after a certain time. 
        return stravaClient.athlete.listActivities({per_page : 100})
    }
    
    getActivity = (accessToken: string, id: string) => {
        const stravaClient: Strava = new (strava.client as any)(accessToken)
        
        return stravaClient.activities.get({id})
    }
}

export default StravaService;