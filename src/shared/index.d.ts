// Anything in this file can be accessible by Backend as well as Frontend

import { SummaryActivity } from "../server/model/Activity"
import { PageContext } from "../server/pages"
import { PageType } from "./constants"

interface AppContext {
    pageType: PageType
}

export interface HomePageContext extends PageContext {}
export interface DashboardPageContext extends PageContext {
    activitiesData: SummaryActivity[]
}
