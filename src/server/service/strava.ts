import { Service } from 'typedi';
import strava, { Strava } from 'strava-v3';


@Service()
class StravaService {
    
    getActivities = (accessToken: string) => {
        const stravaClient: Strava = new (strava.client as any)(accessToken)
        
        return stravaClient.athlete.listActivities({})
    }
    
    getActivity = (accessToken: string, id: string) => {
        const stravaClient: Strava = new (strava.client as any)(accessToken)
        
        return stravaClient.activities.get({id})
    }
}

export default StravaService;