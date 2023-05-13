import ActivityType from "../model/ActivityType";
import { enumFromStringValue } from "../util";

const adapt = (source?: string): ActivityType | undefined => enumFromStringValue<ActivityType>(ActivityType, source)

export default adapt;