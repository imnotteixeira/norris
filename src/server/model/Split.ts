import { Length, Time, Velocity } from "safe-units"

export default interface Split {
    average_speed: Velocity
    distance: Length
    elapsed_time: Time
    elevation_difference: Length
    pace_zone: number
    moving_time: Time
    split: number
}