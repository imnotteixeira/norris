import { Measure, meters, seconds, watts } from "safe-units";
import SegmentEffort, { SummarySegmentEffort } from "../model/SegmentEffort";
import { adaptMetaActivity } from "./Activity";
import { adaptMetaAthlete } from "./Athlete";
import adaptSegment from "./Segment";

interface SegmentEffortSource {
    id: number
    activity_id: number
    elapsed_time: number
    start_date: Date
    start_date_local: Date
    distance: number
    is_kom: boolean
    name: string
    activity: unknown
    athlete: unknown
    moving_time: number
    start_index: number
    end_index: number
    average_cadence: number
    average_watts: number
    device_watts: boolean
    average_heartrate: number
    max_heartrate: number
    segment: unknown
    kom_rank: number
    pr_rank: number
    hidden: boolean 
}

interface SummarySegmentEffortSource {
    id: number
    activity_id: number
    elapsed_time: number
    start_date: string
    start_date_local: string
    distance: number
    is_kom: boolean
}

const adapt = (source: SegmentEffortSource): SegmentEffort => ({
    id: source.id,
    activity_id: source.activity_id,
    elapsed_time: Measure.of(source.elapsed_time, seconds),
    start_date: source.start_date,
    start_date_local: source.start_date_local,
    distance: Measure.of(source.distance, meters),
    is_kom: source.is_kom,
    name: source.name,
    activity: source.activity ? adaptMetaActivity(source.activity as any) : null,
    athlete: source.athlete ? adaptMetaAthlete(source.athlete as any) : null,
    moving_time: Measure.of(source.moving_time, seconds),
    start_index: source.start_index,
    end_index: source.end_index,
    average_cadence: source.average_cadence,
    average_watts: Measure.of(source.average_watts, watts),
    device_watts: source.device_watts,
    average_heartrate: source.average_heartrate,
    max_heartrate: source.max_heartrate,
    segment: source.segment ? adaptSegment(source.segment as any) : null,
    kom_rank: source.kom_rank,
    pr_rank: source.pr_rank,
    hidden: source.hidden,
})

export const adaptSummarySegmentEffort = (source: SummarySegmentEffortSource): SummarySegmentEffort => ({
    id: source.id,
    activity_id: source.activity_id,
    elapsed_time: Measure.of(source.elapsed_time, seconds),
    start_date: new Date(source.start_date),
    start_date_local: new Date(source.start_date_local),
    distance: Measure.of(source.distance, meters),
    is_kom: source.is_kom,
}) 

export default adapt;