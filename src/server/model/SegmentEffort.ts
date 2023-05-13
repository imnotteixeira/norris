import { Length, Time, Power } from "safe-units";
import { MetaActivity } from "./Activity";
import { MetaAthlete } from "./Athlete";
import SummarySegment from "./Segment";

export interface SummarySegmentEffort {
    id: number
    activity_id: number
    elapsed_time: Time
    start_date: Date
    start_date_local: Date
    distance: Length
    is_kom: boolean
}

export default interface SegmentEffort {
    id: number
    activity_id: number
    elapsed_time: Time
    start_date: Date
    start_date_local: Date
    distance: Length
    is_kom: boolean
    name: string
    activity: MetaActivity | null
    athlete: MetaAthlete | null
    moving_time: Time
    start_index: number
    end_index: number
    average_cadence: number
    average_watts: Power
    device_watts: boolean
    average_heartrate: number
    max_heartrate: number
    segment: SummarySegment | null
    kom_rank: number
    pr_rank: number
    hidden: boolean 
}
