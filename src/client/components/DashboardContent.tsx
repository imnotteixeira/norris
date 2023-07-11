import React, { useEffect, useState } from 'react';
import { Measure, meters, minutes, seconds } from 'safe-units';
import { SummaryActivity } from '../../server/model/Activity';
import { DashboardPageContext } from '../../shared';
import { ResponsiveLine, Serie } from '@nivo/line'

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
            <div style={{height: 500}}>
                <ActivitiesTimesChart activities={props.activitiesData} />
            </div>
            
            {props.activitiesData.map(activity => (
                <li key={activity.id}>{`Type: ${activity.type} | Date (local): ${activity.start_date_local} | Total Time: ${Measure.of(activity.elapsed_time.value, seconds).in(minutes)} | Distance: ${Measure.of(activity.distance.value, meters)}`}</li>
            ))}
        </div>
    );
}

interface ActivitiesTimesChartProps {
    activities: SummaryActivity[]
}

const data = [
    {
      "id": "japan",
      "color": "hsl(266, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 122
        },
        {
          "x": "helicopter",
          "y": 222
        },
        {
          "x": "boat",
          "y": 30
        },
        {
          "x": "train",
          "y": 236
        },
        {
          "x": "subway",
          "y": 237
        },
        {
          "x": "bus",
          "y": 273
        },
        {
          "x": "car",
          "y": 237
        },
        {
          "x": "moto",
          "y": 32
        },
        {
          "x": "bicycle",
          "y": 173
        },
        {
          "x": "horse",
          "y": 77
        },
        {
          "x": "skateboard",
          "y": 271
        },
        {
          "x": "others",
          "y": 86
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(104, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 105
        },
        {
          "x": "helicopter",
          "y": 81
        },
        {
          "x": "boat",
          "y": 284
        },
        {
          "x": "train",
          "y": 59
        },
        {
          "x": "subway",
          "y": 225
        },
        {
          "x": "bus",
          "y": 211
        },
        {
          "x": "car",
          "y": 242
        },
        {
          "x": "moto",
          "y": 248
        },
        {
          "x": "bicycle",
          "y": 126
        },
        {
          "x": "horse",
          "y": 99
        },
        {
          "x": "skateboard",
          "y": 96
        },
        {
          "x": "others",
          "y": 15
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(305, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 93
        },
        {
          "x": "helicopter",
          "y": 276
        },
        {
          "x": "boat",
          "y": 156
        },
        {
          "x": "train",
          "y": 48
        },
        {
          "x": "subway",
          "y": 224
        },
        {
          "x": "bus",
          "y": 211
        },
        {
          "x": "car",
          "y": 239
        },
        {
          "x": "moto",
          "y": 203
        },
        {
          "x": "bicycle",
          "y": 138
        },
        {
          "x": "horse",
          "y": 85
        },
        {
          "x": "skateboard",
          "y": 52
        },
        {
          "x": "others",
          "y": 149
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(85, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 58
        },
        {
          "x": "helicopter",
          "y": 256
        },
        {
          "x": "boat",
          "y": 171
        },
        {
          "x": "train",
          "y": 293
        },
        {
          "x": "subway",
          "y": 2
        },
        {
          "x": "bus",
          "y": 101
        },
        {
          "x": "car",
          "y": 180
        },
        {
          "x": "moto",
          "y": 286
        },
        {
          "x": "bicycle",
          "y": 283
        },
        {
          "x": "horse",
          "y": 299
        },
        {
          "x": "skateboard",
          "y": 59
        },
        {
          "x": "others",
          "y": 182
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(291, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 22
        },
        {
          "x": "helicopter",
          "y": 168
        },
        {
          "x": "boat",
          "y": 109
        },
        {
          "x": "train",
          "y": 286
        },
        {
          "x": "subway",
          "y": 290
        },
        {
          "x": "bus",
          "y": 7
        },
        {
          "x": "car",
          "y": 83
        },
        {
          "x": "moto",
          "y": 18
        },
        {
          "x": "bicycle",
          "y": 248
        },
        {
          "x": "horse",
          "y": 217
        },
        {
          "x": "skateboard",
          "y": 82
        },
        {
          "x": "others",
          "y": 129
        }
      ]
    }
  ]

const parseActivitiesDataForGraph = (activities: SummaryActivity[]): Serie[] => ([{
    id: "Activity Time",
    color: "hsl(291, 70%, 50%)",
    data: activities.map((activity: SummaryActivity) => ({
        x: activity.start_date,
        y: Measure.of(activity.elapsed_time.value, seconds).in(minutes)

    }))
}])

const ActivitiesTimesChart: React.FC<ActivitiesTimesChartProps> = ({activities}: ActivitiesTimesChartProps) => {
    const graphData = parseActivitiesDataForGraph(activities)
    
    return (
        <ResponsiveLine
        data={graphData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        enableGridX={false}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Activity Time (minutes)',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default DashboardContent;
