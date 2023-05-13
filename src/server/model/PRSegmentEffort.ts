import { Time } from "safe-units"

export interface SummaryPRSegmentEffort {
    pr_activity_id: number,
    pr_elapsed_time: Time
    pr_date: Date
    effort_count: number
}
