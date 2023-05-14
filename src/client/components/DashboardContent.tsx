import React, { useEffect, useState } from 'react';
import { Measure, meters } from 'safe-units';
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
            <h1>Here are the activities times:</h1>
            {props.activitiesData.map(activity => (
                <li key={activity.id}>{`Type: ${activity.type} | Date (local): ${activity.start_date_local} | Distance: ${Measure.of(activity.distance.value, meters)}`}</li>
            ))}
        </div>
    );
}

export default DashboardContent;
