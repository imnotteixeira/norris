import React, { useEffect, useState } from 'react';
import { Measure, meters, minutes, seconds } from 'safe-units';
import { SummaryActivity } from '../../server/model/Activity';
import { DashboardPageContext } from '../../shared';

const DashboardContent: React.FC<DashboardPageContext> = (props) => {
    
    const [disabled, setDisabled] = useState<boolean>(()=>true)
    

    useEffect(() => {
        // This is important, as it makes the app "usable" once it is hydrated
        setDisabled(false)
    }, [])

    console.log(props.activitiesData)

    return (
        <div>
            <h1>Isto vai ter graficos pipis, Rui. Nao te preocupes</h1>
            <h1>Here are the activities times:</h1>
            <div style={{height: 500}}></div>
            <ActivitiesTimesChart activities={props.activitiesData} />
            {props.activitiesData.map(activity => (
                <li key={activity.id}>{`Type: ${activity.type} | Date (local): ${activity.start_date_local} | Total Time: ${Measure.of(activity.elapsed_time.value, seconds).in(minutes)} | Distance: ${Measure.of(activity.distance.value, meters)}`}</li>
            ))}
        </div>
    );
}

interface ActivitiesTimesChartProps {
    activities: SummaryActivity[]
}

const ActivitiesTimesChart: React.FC<ActivitiesTimesChartProps> = () => {
    return (
        <p>A graph here</p>
    )
}

export default DashboardContent;
