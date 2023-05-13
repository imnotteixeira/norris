import { Measure, meters } from "safe-units";
import ActivityType from "../model/ActivityType";
import SummarySegment from "../model/Segment";
import adaptActivityType from "./ActivityType";
import adaptLatLng from "./LatLng";
import adaptAthletePrEffort from "./PRSegmentEffort";
import { adaptSummarySegmentEffort } from "./SegmentEffort";

interface SegmentSource {
    name: string
    activity_type: unknown
    distance: number
    average_grade: number
    maximum_grade: number
    elevation_high: number
    elevation_low: number
    start_latlng: unknown
    end_latlng: unknown
    climb_category: number
    city: string
    state: string
    country: string
    private: boolean
    athlete_pr_effort: unknown
    athlete_segment_stats: unknown
}

const adapt = (source: SegmentSource): SummarySegment => ({
    name: source.name,
    activity_type: adaptActivityType(source.activity_type as string | undefined) ?? ActivityType.UNKNOWN,
    distance: Measure.of(source.distance, meters),
    average_grade: source.average_grade,
    maximum_grade: source.maximum_grade,
    elevation_high: Measure.of(source.elevation_high, meters),
    elevation_low: Measure.of(source.elevation_low, meters),
    start_latlng: adaptLatLng(source.start_latlng as any),
    end_latlng: adaptLatLng(source.end_latlng as any),
    climb_category: source.climb_category,
    city: source.city,
    state: source.state,
    country: source.country,
    private: source.private,
    athlete_pr_effort: source.athlete_pr_effort ? adaptAthletePrEffort(source.athlete_pr_effort as any): null,
    athlete_segment_stats: source.athlete_segment_stats ? adaptSummarySegmentEffort(source.athlete_segment_stats as any): null,
})

export default adapt;