import { Measure, seconds } from "safe-units";
import { SummaryPRSegmentEffort } from "../model/PRSegmentEffort";

interface SummaryPRSegmentEffortSource {
    pr_activity_id: number,
    pr_elapsed_time: number
    pr_date: string
    effort_count: number
}

const adapt = (source: SummaryPRSegmentEffortSource): SummaryPRSegmentEffort => ({
    pr_activity_id: source.pr_activity_id,
    pr_elapsed_time: Measure.of(source.pr_elapsed_time, seconds),
    pr_date: new Date(source.pr_date),
    effort_count: source.effort_count,
})

export default adapt;
