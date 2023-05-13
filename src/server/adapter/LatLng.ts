import LatLng from "../model/LatLng";

type LatLngSource = unknown[]

const adapt = (source: LatLngSource): LatLng => ([
    source[0] as number, source[1] as number
])

export default adapt;
