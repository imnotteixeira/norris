import SportType from "../model/SportType";
import { enumFromStringValue } from "../util";

const adapt = (source?: string): SportType | undefined => enumFromStringValue<SportType>(SportType, source)

export default adapt;