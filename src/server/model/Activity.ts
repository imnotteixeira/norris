import { Length, Time, Velocity } from "safe-units";
import ActivityType from "./ActivityType";
import { MetaAthlete } from "./Athlete";
import Lap from "./Lap";
import PolylineMap from "./PolylineMap";
import ResourceState from "./ResourceState";
import SegmentEffort from "./SegmentEffort";
import Split from "./Split";
import SportType from "./SportType";

export interface MetaActivity {
    id: number,
    resource_state?: ResourceState.Meta,
}

export default interface Activity {
    id: number,
    resource_state?: ResourceState,
    athlete: MetaAthlete,
    name: string,
    distance: Length,
    moving_time: Time,
    elapsed_time: Time,
    total_elevation_gain: Length,
    type: ActivityType,
    sport_type: SportType,
    workout_type: number, // Not sure what the numbers mean here. The API docs don't specify it.
    start_date: Date,
    start_date_local: Date,
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
    map: PolylineMap,
    trainer: boolean,
    commute: boolean,
    manual: boolean,
    private: boolean,
    visibility: string, // Not sure what the strings mean here. The API docs don't specify it.
    flagged: boolean,
    gear_id: string | null,
    start_latlng: [ number, number ],
    end_latlng: [ number, number ],
    average_speed: Velocity,
    max_speed: Velocity,
    has_heartrate: boolean,
    heartrate_opt_out: boolean,
    display_hide_heartrate_option: boolean,
    elev_high: Length,
    elev_low: Length,
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
    segment_efforts: SegmentEffort[],
    //   { this is a segment effort example (to type later)
    //     id: 3054727003214676500,
    //     resource_state: 2,
    //     name: 'Puente a puente margen derecho. 420m',
    //     activity: null,
    //     athlete: null,
    //     elapsed_time: 155,
    //     moving_time: 148,
    //     start_date: '2023-01-29T10:17:33Z',
    //     start_date_local: '2023-01-29T11:17:33Z',
    //     distance: 427.8,
    //     start_index: 402,
    //     end_index: 549,
    //     device_watts: boolean,
    //     segment: null,
    //     pr_rank: 2,
    //     achievements: [],
    //     hidden: boolean
    //   },
    splits_metric: Split[]
    //   { this is an activity split example
    //     distance: 1001.4,
    //     elapsed_time: 319,
    //     elevation_difference: -0.5,
    //     moving_time: 309,
    //     split: 1,
    //     average_speed: 3.24,
    //     average_grade_adjusted_speed: 3.24,
    //     pace_zone: 0
    //   },
    splits_standard: Split[], // this seems like the same as above but with different units. Confirm.
    laps: Lap[],
    //   { this is a lap example
    //     id: 28545002206,
    //     resource_state: 2,
    //     name: 'Lap 1',
    //     activity: null,
    //     athlete: null,
    //     elapsed_time: 1397,
    //     moving_time: 1397,
    //     start_date: '2023-01-29T10:10:31Z',
    //     start_date_local: '2023-01-29T11:10:31Z',
    //     distance: 3880.4,
    //     start_index: number,
    //     end_index: 1332,
    //     total_elevation_gain: 6,
    //     average_speed: 2.78,
    //     max_speed: 4.526,
    //     device_watts: boolean,
    //     lap_index: 1,
    //     split: 1,
    //     pace_zone: 0
    //   }
    best_efforts: SegmentEffort[]
    //   { Effort example
    //     id: 23944318771,
    //     resource_state: 2,
    //     name: '400m',
    //     activity: null,
    //     athlete: null,
    //     elapsed_time: 113,
    //     moving_time: 114,
    //     start_date: '2023-01-29T10:10:45Z',
    //     start_date_local: '2023-01-29T11:10:45Z',
    //     distance: 400,
    //     start_index: 13,
    //     end_index: 123,
    //     pr_rank: null,
    //     achievements: []
    //   },
    photos: { primary: any, count: 0 },
    stats_visibility: any,
    hide_from_home: boolean,
    device_name: string,
    embed_token: string,
    similar_activities: {
        effort_count: number,
        average_speed: Velocity,
        min_average_speed: Velocity,
        mid_average_speed: Velocity,
        max_average_speed: Velocity,
        pr_rank: number,
        frequency_milestone: any,
        trend: {
          speeds: Velocity[],
          current_activity_index: number,
          min_speed: Velocity,
          mid_speed: Velocity,
          max_speed: Velocity,
          direction: number
        },
        resource_state?: ResourceState
    },
    available_zones: []
}