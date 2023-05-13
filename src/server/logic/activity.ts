import { Service } from "typedi";
import Activity from "../model/Activity";

@Service()
class ActivityProcessor {
    generateActivityMetricData(activity: Activity) {
        // TODO: Aggregate data from multiple providers (plugin-like architecture)
    }
}