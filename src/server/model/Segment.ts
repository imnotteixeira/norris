import { Length } from "safe-units"
import ActivityType from "./ActivityType"
import LatLng from "./LatLng"
import { SummaryPRSegmentEffort } from "./PRSegmentEffort"
import { SummarySegmentEffort } from "./SegmentEffort"

export default interface SummarySegment {
    name: string
    activity_type: ActivityType
    distance: Length
    average_grade: number
    maximum_grade: number
    elevation_high: Length
    elevation_low: Length
    start_latlng: LatLng
    end_latlng: LatLng
    climb_category: number
    city: string
    state: string
    country: string
    private: boolean
    athlete_pr_effort: SummaryPRSegmentEffort | null
    athlete_segment_stats: SummarySegmentEffort | null
}