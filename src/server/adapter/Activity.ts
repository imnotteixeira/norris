import { Measure, meters, seconds } from "safe-units";
import Activity, { MetaActivity } from "../model/Activity";
import ResourceState from "../model/ResourceState";
import ActivityType from "../model/ActivityType";
import SportType from "../model/SportType";
import { adaptMetaAthlete } from "./Athlete";
import adaptActivityType from "./ActivityType";
import adaptMap from "./PolylineMap";
import adaptSportType from "./SportType";
import adaptSegmentEffort from "./SegmentEffort";
import adaptSplit from "./Split";
import adaptLap from "./Lap";

interface ActivitySource {
    id: number,
    resource_state?: number,
    athlete: unknown,
    name: string,
    distance: number,
    moving_time: number,
    elapsed_time: number,
    total_elevation_gain: number,
    type: unknown,
    sport_type: unknown,
    workout_type: number,
    start_date: string,
    start_date_local: string,
    timezone: string,
    utc_offset: number,
    location_city: string | null,
    location_state: string | null,
    location_country: string | null,
    achievement_count: number,
    kudos_count: number,
    comment_count: number,
    athlete_count: number,
    photo_count: number,
    map: unknown,
    trainer: boolean,
    commute: boolean,
    manual: boolean,
    private: boolean,
    visibility: string,
    flagged: boolean,
    gear_id: string | null,
    start_latlng: [ number, number ],
    end_latlng: [ number, number ],
    average_speed: number,
    max_speed: number,
    has_heartrate: boolean,
    heartrate_opt_out: boolean,
    display_hide_heartrate_option: boolean,
    elev_high: number,
    elev_low: number,
    upload_id: number,
    upload_id_str: string,
    external_id: string,
    from_accepted_tag: boolean,
    pr_count: number,
    total_photo_count: number,
    has_kudoed: boolean,
    description: string | null,
    calories: number,
    perceived_exertion: string | null,
    prefer_perceived_exertion: boolean,
    segment_efforts: unknown[],
    splits_metric: unknown[]
    splits_standard: unknown[],
    laps: unknown[],
    best_efforts: unknown[]
    photos: { primary: unknown, count: 0 },
    stats_visibility: unknown,
    hide_from_home: boolean,
    device_name: string,
    embed_token: string,
    similar_activities: {
      effort_count: number,
      average_speed: number,
      min_average_speed: number,
      mid_average_speed: number,
      max_average_speed: number,
      pr_rank: number,
      frequency_milestone: unknown,
      trend: {
        speeds: number[],
        current_activity_index: number,
        min_speed: number,
        mid_speed: number,
        max_speed: number,
        direction: number
      },
      resource_state?: ResourceState
    },
    available_zones: []
}

interface MetaActivitySource {
    id: number,
    resource_state?: string
}

const adaptSimilarActivities = (source: any) => {
    console.warn("MISSING IMPLEMENTATION FOR adaptSimilarActivities()")
    return {
        effort_count: 12,
        average_speed: Measure.of(2.5747802721046362, meters.per(seconds)),
        min_average_speed: Measure.of(2.1623548046462515, meters.per(seconds)),
        mid_average_speed: Measure.of(2.472258634565648, meters.per(seconds)),
        max_average_speed: Measure.of(2.88585253251815, meters.per(seconds)),
        pr_rank: 1,
        frequency_milestone: null,
        trend: {
          speeds: [],
          current_activity_index: 2,
          min_speed: Measure.of(2.1623548046462515, meters.per(seconds)),
          mid_speed: Measure.of(2.472258634565648, meters.per(seconds)),
          max_speed: Measure.of(2.88585253251815, meters.per(seconds)),
          direction: 0
        },
        resource_state: ResourceState.Summary
      }
} 

const adapt = (source: ActivitySource): Activity => ({
    id: source.id,
    resource_state: source.resource_state,
    athlete: adaptMetaAthlete(source.athlete as any),
    name: source.name,
    distance: Measure.of(source.distance, meters),
    moving_time: Measure.of(source.moving_time, seconds),
    elapsed_time: Measure.of(source.elapsed_time, seconds),
    total_elevation_gain: Measure.of(source.total_elevation_gain, meters),
    type: adaptActivityType(source.type as string | undefined) ?? ActivityType.UNKNOWN,
    sport_type: adaptSportType(source.sport_type as string | undefined) ?? SportType.UNKNOWN,
    workout_type: source.workout_type,
    start_date: new Date(source.start_date),
    start_date_local: new Date(source.start_date_local),
    timezone: source.timezone,
    utc_offset: source.utc_offset,
    location_city: source.location_city,
    location_state: source.location_state,
    location_country: source.location_country,
    achievement_count: source.achievement_count,
    kudos_count: source.kudos_count,
    comment_count: source.comment_count,
    athlete_count: source.athlete_count,
    photo_count: source.photo_count,
    map: adaptMap(source.map as any),
    trainer: source.trainer,
    commute: source.commute,
    manual: source.manual,
    private: source.private,
    visibility: source.visibility,
    flagged: source.flagged,
    gear_id: source.gear_id,
    start_latlng: source.start_latlng,
    end_latlng: source.end_latlng,
    average_speed: Measure.of(source.average_speed, meters.per(seconds)),
    max_speed: Measure.of(source.max_speed, meters.per(seconds)),
    has_heartrate: source.has_heartrate,
    heartrate_opt_out: source.heartrate_opt_out,
    display_hide_heartrate_option: source.display_hide_heartrate_option,
    elev_high: Measure.of(source.elev_high, meters),
    elev_low: Measure.of(source.elev_low, meters),
    upload_id: source.upload_id,
    upload_id_str: source.upload_id_str,
    external_id: source.external_id,
    from_accepted_tag: source.from_accepted_tag,
    pr_count: source.pr_count,
    total_photo_count: source.total_photo_count,
    has_kudoed: source.has_kudoed,
    description: source.description,
    calories: source.calories,
    perceived_exertion: source.perceived_exertion,
    prefer_perceived_exertion: source.prefer_perceived_exertion,
    segment_efforts: (source.segment_efforts as any[]).map(adaptSegmentEffort),
    splits_metric: (source.splits_metric as any[]).map(adaptSplit),
    splits_standard: (source.splits_standard as any[]).map(adaptSplit),
    laps: (source.laps as any[]).map(adaptLap),
    best_efforts: (source.best_efforts as any[]).map(adaptSegmentEffort),
    photos: source.photos,
    stats_visibility: source.stats_visibility,
    hide_from_home: source.hide_from_home,
    device_name: source.device_name,
    embed_token: source.embed_token,
    similar_activities: adaptSimilarActivities(source.similar_activities),
    available_zones: source.available_zones,
})

export const adaptMetaActivity = (source: MetaActivitySource): MetaActivity => ({
    id: source.id,
    resource_state: ResourceState.Meta
})

export default adapt;