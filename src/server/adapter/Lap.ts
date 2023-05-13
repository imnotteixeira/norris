import { Measure, meters, seconds } from "safe-units";
import Lap from "../model/Lap";
import { adaptMetaActivity } from "./Activity";
import { adaptMetaAthlete } from "./Athlete";

interface LapSource {
    id: number
    activity: unknown
    athlete: unknown
    average_cadence: number
    average_speed: number
    distance: number
    elapsed_time: number
    start_index: number
    end_index: number
    lap_index: number
    max_speed: number
    moving_time: number
    name: string
    pace_zone: number
    split: number
    start_date: string
    start_date_local: string
    total_elevation_gain: number
}

const adapt = (source: LapSource): Lap => ({
    id: source.id,
    activity: source.activity ? adaptMetaActivity(source.activity as any) : null,
    athlete: source.athlete ? adaptMetaAthlete(source.athlete as any) : null,
    average_cadence: source.average_cadence,
    average_speed: Measure.of(source.average_speed, meters.per(seconds)),
    distance: Measure.of(source.distance, meters),
    elapsed_time: Measure.of(source.elapsed_time, seconds),
    start_index: source.start_index,
    end_index: source.end_index,
    lap_index: source.lap_index,
    max_speed: Measure.of(source.max_speed, meters.per(seconds)),
    moving_time: Measure.of(source.moving_time, seconds),
    name: source.name,
    pace_zone: source.pace_zone,
    split: source.split,
    start_date: new Date(source.start_date),
    start_date_local: new Date(source.start_date_local),
    total_elevation_gain: Measure.of(source.total_elevation_gain, meters),
})

export default adapt;
