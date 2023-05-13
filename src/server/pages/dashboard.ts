import Container, { Inject, Service } from "typedi"
import { Router, RequestHandler } from "express";
import { IRouteHandler, PageHandler } from ".";
import { Pages } from "../../shared/constants";
import StravaService from "../service/strava";
import Activity from "../model/Activity";
import adaptActivity from "../adapter/Activity"
import { Measure, yards } from "safe-units";

const router = Router();

const dummyActivity: Activity = adaptActivity({
    resource_state: 3,
    athlete: { id: 65350579, resource_state: 1 },
    name: 'Lunch Run',
    distance: 3876.2,
    moving_time: 1384,
    elapsed_time: 1397,
    total_elevation_gain: 6,
    type: 'Run',
    sport_type: 'Run',
    workout_type: 3,
    id: 8469902820,
    start_date: '2023-01-29T10:10:31Z',
    start_date_local: '2023-01-29T11:10:31Z',
    timezone: '(GMT+01:00) Europe/Madrid',
    utc_offset: 3600,
    location_city: null,
    location_state: null,
    location_country: null,
    achievement_count: 5,
    kudos_count: 0,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: {
      id: 'a8469902820',
      polyline: 'svjuFnlnUHDAFG@WIy@So@Yw@e@k@c@QSi@}@MMk@YWGk@Eg@?iARY?_BLm@RYHSNKDq@Fk@TOBk@G_AMo@Cq@DOJq@t@i@t@[l@UdAOXGVGn@Qf@S`AM`AIRKl@MXQhAWl@QTm@^GHGLo@b@uBf@UB[J]Dk@Re@ZEHITKJQN{@`@q@H_@A_@FUCKGOEkBG]IqAe@g@Es@Dc@?WD_@BODo@T[Fc@RQ@KGAE@aAAKEEKAKBWTWHg@DICGEOi@@c@P{@Vc@Lo@\\i@Te@Fa@Lc@DGFA\\JNHp@HLFXBDDn@H`@JX@j@Hb@JNLJP\\hARJZ@~@SV@\\GPBDDF@NATK\\I\\AXDTID@ZUF?FHVfAJDPABLLJZ`@TRvBu@t@Qt@Wz@e@\\]d@y@`@_BPeAPc@Py@NYDO@ULk@VwB`@}@l@{@x@_AHCTFLOj@QLAjABp@Ed@BV?|Bq@p@Kd@Mz@GX@VIXCXDv@L\\RPBRNp@x@RNh@n@RNXNt@V^Nx@RBHAp@',
      resource_state: 3,
      summary_polyline: 'svjuFnlnUHDAFG@WIy@So@Yw@e@k@c@QSi@}@MMk@YWGk@Eg@?iARY?_BLm@RYHSNKDq@Fk@TOBk@G_AMo@Cq@DOJq@t@i@t@[l@UdAOXGVGn@Qf@S`AM`AIRKl@MXQhAWl@QTm@^GHGLo@b@uBf@UB[J]Dk@Re@ZEHITKJQN{@`@q@H_@A_@FUCKGOEkBG]IqAe@g@Es@Dc@?WD_@BODo@T[Fc@RQ@KGAE@aAAKEEKAKBWTWHg@DICGEOi@@c@P{@Vc@Lo@\\i@Te@Fa@Lc@DGFA\\JNHp@HLFXBDDn@H`@JX@j@Hb@JNLJP\\hARJZ@~@SV@\\GPBDDF@NATK\\I\\AXDTID@ZUF?FHVfAJDPABLLJZ`@TRvBu@t@Qt@Wz@e@\\]d@y@`@_BPeAPc@Py@NYDO@ULk@VwB`@}@l@{@x@_AHCTFLOj@QLAjABp@Ed@BV?|Bq@p@Kd@Mz@GX@VIXCXDv@L\\RPBRNp@x@RNh@n@RNXNt@V^Nx@RBHAp@'
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    visibility: 'followers_only',
    flagged: false,
    gear_id: null,
    start_latlng: [ 40.364748537540436, -3.6834376584738493 ],
    end_latlng: [ 40.36472666077316, -3.683819957077503 ],
    average_speed: 2.801,
    max_speed: 4.526,
    has_heartrate: false,
    heartrate_opt_out: false,
    display_hide_heartrate_option: false,
    elev_high: 572.3,
    elev_low: 568.2,
    upload_id: 9087875305,
    upload_id_str: '9087875305',
    external_id: '60d2ad62-3d3a-451f-af70-b543c21169ce-activity.fit',
    from_accepted_tag: false,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    description: null,
    calories: 0,
    perceived_exertion: null,
    prefer_perceived_exertion: false,
    segment_efforts: [
      {
        id: 3054727003214676500,
        resource_state: 2,
        name: 'Puente a puente margen derecho. 420m',
        activity: null,
        athlete: null,
        elapsed_time: 155,
        moving_time: 148,
        start_date: '2023-01-29T10:17:33Z',
        start_date_local: '2023-01-29T11:17:33Z',
        distance: 427.8,
        start_index: 402,
        end_index: 549,
        device_watts: false,
        segment: null,
        pr_rank: 2,
        achievements: [],
        hidden: false
      },
      {
        id: 3054727003212687000,
        resource_state: 2,
        name: 'Subida a la Dama del Manzanares',
        activity: null,
        athlete: null,
        elapsed_time: 127,
        moving_time: 107,
        start_date: '2023-01-29T10:20:54Z',
        start_date_local: '2023-01-29T11:20:54Z',
        distance: 236.9,
        start_index: 593,
        end_index: 713,
        device_watts: false,
        segment: null,
        pr_rank: 2,
        achievements: [],
        hidden: false
      },
      {
        id: 3054727003214381600,
        resource_state: 2,
        name: '1K lineal hacia Caja Magica',
        activity: null,
        athlete: null,
        elapsed_time: 355,
        moving_time: 343,
        start_date: '2023-01-29T10:26:22Z',
        start_date_local: '2023-01-29T11:26:22Z',
        distance: 1008.2,
        start_index: 906,
        end_index: 1244,
        device_watts: false,
        segment: null,
        pr_rank: 3,
        achievements: [],
        hidden: false
      }
    ],
    splits_metric: [
      {
        distance: 1001.4,
        elapsed_time: 319,
        elevation_difference: -0.5,
        moving_time: 309,
        split: 1,
        average_speed: 3.24,
        average_grade_adjusted_speed: 3.24,
        pace_zone: 0
      },
      {
        distance: 1001.1,
        elapsed_time: 359,
        elevation_difference: 3.1,
        moving_time: 359,
        split: 2,
        average_speed: 2.79,
        average_grade_adjusted_speed: 2.81,
        pace_zone: 0
      },
      {
        distance: 999.6,
        elapsed_time: 406,
        elevation_difference: -2.4,
        moving_time: 403,
        split: 3,
        average_speed: 2.48,
        average_grade_adjusted_speed: 2.48,
        pace_zone: 0
      },
      {
        distance: 874.1,
        elapsed_time: 313,
        elevation_difference: 2.3,
        moving_time: 313,
        split: 4,
        average_speed: 2.79,
        average_grade_adjusted_speed: 2.83,
        pace_zone: 0
      }
    ],
    splits_standard: [
      {
        distance: 1610.2,
        elapsed_time: 531,
        elevation_difference: 1.1,
        moving_time: 521,
        split: 1,
        average_speed: 3.09,
        average_grade_adjusted_speed: 3.1,
        pace_zone: 0
      },
      {
        distance: 1611.2,
        elapsed_time: 634,
        elevation_difference: -1.3,
        moving_time: 631,
        split: 2,
        average_speed: 2.55,
        average_grade_adjusted_speed: 2.56,
        pace_zone: 0
      },
      {
        distance: 654.8,
        elapsed_time: 232,
        elevation_difference: 2.7,
        moving_time: 232,
        split: 3,
        average_speed: 2.82,
        average_grade_adjusted_speed: 2.88,
        pace_zone: 0
      }
    ],
    laps: [
      {
        id: 28545002206,
        resource_state: 2,
        name: 'Lap 1',
        activity: null,
        athlete: null,
        elapsed_time: 1397,
        moving_time: 1397,
        start_date: '2023-01-29T10:10:31Z',
        start_date_local: '2023-01-29T11:10:31Z',
        distance: 3880.4,
        start_index: 0,
        end_index: 1332,
        total_elevation_gain: 6,
        average_speed: 2.78,
        max_speed: 4.526,
        device_watts: false,
        lap_index: 1,
        split: 1,
        pace_zone: 0
      }
    ],
    best_efforts: [
      {
        id: 23944318771,
        resource_state: 2,
        name: '400m',
        activity: null,
        athlete: null,
        elapsed_time: 113,
        moving_time: 114,
        start_date: '2023-01-29T10:10:45Z',
        start_date_local: '2023-01-29T11:10:45Z',
        distance: 400,
        start_index: 13,
        end_index: 123,
        pr_rank: null,
        achievements: []
      },
      {
        id: 23944318851,
        resource_state: 2,
        name: '1/2 mile',
        activity: null,
        athlete: null,
        elapsed_time: 241,
        moving_time: 242,
        start_date: '2023-01-29T10:10:45Z',
        start_date_local: '2023-01-29T11:10:45Z',
        distance: 805,
        start_index: 13,
        end_index: 244,
        pr_rank: null,
        achievements: []
      },
      {
        id: 23944318904,
        resource_state: 2,
        name: '1k',
        activity: null,
        athlete: null,
        elapsed_time: 306,
        moving_time: 307,
        start_date: '2023-01-29T10:10:45Z',
        start_date_local: '2023-01-29T11:10:45Z',
        distance: 1000,
        start_index: 13,
        end_index: 306,
        pr_rank: null,
        achievements: []
      },
      {
        id: 23944318978,
        resource_state: 2,
        name: '1 mile',
        activity: null,
        athlete: null,
        elapsed_time: 518,
        moving_time: 519,
        start_date: '2023-01-29T10:10:45Z',
        start_date_local: '2023-01-29T11:10:45Z',
        distance: 1609,
        start_index: 13,
        end_index: 508,
        pr_rank: null,
        achievements: []
      },
      {
        id: 23944319063,
        resource_state: 2,
        name: '2 mile',
        activity: null,
        athlete: null,
        elapsed_time: 1152,
        moving_time: 1150,
        start_date: '2023-01-29T10:10:45Z',
        start_date_local: '2023-01-29T11:10:45Z',
        distance: 3219,
        start_index: 13,
        end_index: 1111,
        pr_rank: 2,
        achievements: []
      }
    ],
    photos: { primary: null, count: 0 },
    stats_visibility: [
      { type: 'heart_rate', visibility: 'everyone' },
      { type: 'pace', visibility: 'everyone' },
      { type: 'power', visibility: 'everyone' },
      { type: 'speed', visibility: 'everyone' },
      { type: 'calories', visibility: 'everyone' }
    ],
    hide_from_home: false,
    device_name: 'Strava Android App',
    embed_token: 'c6150b011fb1008f7bfc759a369e3b4bb3334f89',
    similar_activities: {
      effort_count: 12,
      average_speed: 2.5747802721046362,
      min_average_speed: 2.1623548046462515,
      mid_average_speed: 2.472258634565648,
      max_average_speed: 2.88585253251815,
      pr_rank: 1,
      frequency_milestone: null,
      trend: {
        speeds: [],
        current_activity_index: 2,
        min_speed: 2.1623548046462515,
        mid_speed: 2.472258634565648,
        max_speed: 2.88585253251815,
        direction: 0
      },
      resource_state: 2
    },
    available_zones: []
  })
  

@Service()
class DashboardHandler implements IRouteHandler {
    
    @Inject("DEFAULT_PAGE_PROPS")
    defaultPageProps: Record<string, any>;

    constructor(
        public stravaService: StravaService
    ) {}
    
    handle: RequestHandler = async (req, res) => {
        const accessToken = req.cookies["strava-oauth-token"];
        // console.info("ACTIVITIES", await this.stravaService.getActivities(accessToken))
        // console.info("THAT ONE ACTIVITY RAW", await this.stravaService.getActivity(accessToken, "8469902820"))
        const thatOneActivity = adaptActivity(await this.stravaService.getActivity(accessToken, "8469902820"))
        console.info("THAT ONE ACTIVITY", thatOneActivity)

        console.info("Distance in meters", thatOneActivity.distance)
        console.info("Distance in yards", thatOneActivity.distance.in(yards))

        // const oneActivity = dummyActivity;

        res.render("index", {
            ...this.defaultPageProps,
            context: JSON.stringify({
                pageId: Pages.DASHBOARD
            })
        })
    }
}

const registerer: PageHandler = (app: Router) => {
    app.use("/dashboard", router);

    router.get("/", Container.get(DashboardHandler).handle);
};

export default registerer;
