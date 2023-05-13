import { Measure, meters, seconds } from "safe-units";
import Split from "../model/Split";

interface SplitSource {
    average_speed: number
    distance: number
    elapsed_time: number
    elevation_difference: number
    pace_zone: number
    moving_time: number
    split: number
}

const adapt = (source: SplitSource): Split => ({
    average_speed: Measure.of(source.average_speed, meters.per(seconds)),
    distance: Measure.of(source.distance, meters),
    elapsed_time: Measure.of(source.elapsed_time, seconds),
    elevation_difference: Measure.of(source.elevation_difference, meters),
    pace_zone: source.pace_zone,
    moving_time: Measure.of(source.moving_time, seconds),
    split: source.split,
})

export default adapt;
