import { Athlete, MetaAthlete } from "../model/Athlete";
import ResourceState from "../model/ResourceState";

interface AthleteSource {
    id: number;
    resource_state?: number;
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
    created_at: string;
    updated_at: string;
}

interface MetaAthleteSource {
    id: number,
    resource_state?: string
}

const adapt = (source: AthleteSource): Athlete => ({
    id: source.id,
    resource_state: source.resource_state,
    firstname: source.firstname,
    lastname: source.lastname,
    profile_medium: source.profile_medium,
    profile: source.profile,
    city: source.city,
    state: source.state,
    country: source.country,
    sex: source.sex,
    premium: source.premium,
    summit: source.summit,
    created_at: new Date(source.created_at),
    updated_at: new Date(source.updated_at),
})

export const adaptMetaAthlete = (source: MetaAthleteSource): MetaAthlete => ({
    id: source.id,
    resource_state: ResourceState.Meta
})

export default adapt;