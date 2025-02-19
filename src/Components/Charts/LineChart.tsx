import { ResponsiveLine } from "@nivo/line";
import { useTheme } from '@mui/material/styles';
import CustomZoomPinchComponent from "../ZoomComponent/CustomZoomComponent";
import { StyledToolTip } from "../StyledComponents/styledToolTip";
import { Typography } from "@mui/material";



const CustomTooltip = (props: any) => {
    const point = props.point
    return (
        <StyledToolTip sx={{
            p: "10px",
            // "& > div": {
            //     mx: "10px",
            //     my: "5px",
            // }
        }}>
            <Typography variant="h5" sx={{
            }}>{point.data.rpa_name}: solved in {point.data.yFormatted}s at {point.data.xFormatted}</Typography>
        </StyledToolTip>
    );
}


const CustomLineChart = (props: any) => {
    const theme = useTheme();
    return <CustomZoomPinchComponent initialPositionY={props.initialPositionY ?? 0}>

        <ResponsiveLine
            data={props.data}
            margin={{ top: 40, right: 110, bottom: 60, left: 60 }}
            theme={{
                text: {
                    fontSize: 12,
                    fill: theme.palette.text.primary,
                },
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.text.primary,
                            strokeWidth: 1,
                        }
                    }
                },
                crosshair: {
                    line: {
                        stroke: theme.palette.text.primary, // Change crosshair color
                        strokeWidth: 2, // Make it bolder
                        strokeDasharray: "5 5", // Dotted or dashed line
                    },
                },
            }}
            xScale={{
                type: 'time',
                format: "%H:%M",
                useUTC: false,
                precision: "minute",
            }}
            xFormat="time:%H:%M"
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
            }}
            colors={["#33f08a", "#cc6b3c", "#8437a6"]}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: "%H:%M",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -20,
                legend: 'time',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'solve time in seconds',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={5}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            tooltip={CustomTooltip}
            enableGridX={false}
            enableGridY={false}
            enableTouchCrosshair={true}
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
    </CustomZoomPinchComponent>
};

export default CustomLineChart;