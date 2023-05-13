import { Length, Time, Velocity } from "safe-units"
import { MetaActivity } from "./Activity"
import { MetaAthlete } from "./Athlete"

export default interface Lap {
    id: number
    activity: MetaActivity | null
    athlete: MetaAthlete | null
    average_cadence: number
    average_speed: Velocity
    distance: Length
    elapsed_time: Time
    start_index: number
    end_index: number
    lap_index: number
    max_speed: Velocity
    moving_time: Time
    name: string
    pace_zone: number
    split: number
    start_date: Date
    start_date_local: Date
    total_elevation_gain: Length
}