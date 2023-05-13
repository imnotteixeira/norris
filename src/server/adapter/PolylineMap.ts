import PolylineMap from "../model/PolylineMap";

interface PolylineMapSource {
    id: number,
    polyline: string,
    summary_polyline: string
}

const adapt = (source: PolylineMapSource): PolylineMap => ({
    id: source.id,
    polyline: source.polyline,
    summary_polyline: source.summary_polyline,
})

export default adapt;