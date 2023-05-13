import ResourceState from "./ResourceState";

export interface MetaAthlete {
    id: number,
    resource_state?: ResourceState.Meta
}

export interface Athlete {
    id: number;
    resource_state?: ResourceState;
    firstname?: string;
    lastname?: string;
    profile_medium?: string;
    profile?: string;
    city?: string;
    state?: string;
    country?: string;
    sex?: string;
    premium?: boolean;
    summit?: boolean;
    created_at: Date;
    updated_at: Date;
}