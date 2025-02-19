// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/heatmap
import { ResponsiveHeatMap } from '@nivo/heatmap'

import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { StyledToolTip } from '../StyledComponents/styledToolTip';
import CustomZoomPinchComponent from '../ZoomComponent/CustomZoomComponent';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const CustomTooltip = (props: any) => {
    return (
        <StyledToolTip sx={{
            p: "10px",
            // "& > div": {
            //     mx: "10px",
            //     my: "5px",
            // }
        }}>
            <Typography variant="h5" sx={{
            }}>Solved {props.cell.data.y} Captchas b/w {props.cell.data.x}</Typography>
        </StyledToolTip>
    );
}

const CustomHeatMap = (props: any) => {
    const theme = useTheme();
    return <CustomZoomPinchComponent initialPositionY={props.initialPositionY ?? 0}>
        <ResponsiveHeatMap
            data={props.data}
            margin={{ top: 100, right: 100, bottom: 80, left: 150 }}
            // valueFormat=">-.2s"
            theme={{
                text: {
                    fontSize: 12,
                    fill: theme.palette.text.primary,
                }
            }}
            enableLabels={false} // Disable default labels
            layers={[
                "grid",
                "axes",
                "cells",
                "legends",
                (props) =>
                    props.cells.map((cell, index) => (
                        <g
                            key={index}
                            transform={`translate(${cell.x}, ${cell.y})`}>
                            {/* Background Circle */}
                            <circle r={15} fill="black" opacity={0.5} />
                            {/* Label inside the circle */}
                            <text
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={12}
                                fontWeight="bold"
                                fill="white"
                            >
                                {Math.round(cell.value as number)}  {/* Ensure integer labels */}
                            </text>
                        </g>
                    )),
            ]}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -30,
                legend: '',
                legendOffset: 46,
                truncateTickAt: 0
            }}
            // axisRight={{
            //     tickSize: 5,
            //     tickPadding: 5,
            //     tickRotation: 0,
            //     legend: 'RPA',
            //     legendPosition: 'middle',
            //     legendOffset: 100,
            //     truncateTickAt: 0
            // }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'RPA',
                legendPosition: 'middle',
                legendOffset: -100,
                truncateTickAt: 0
            }}
            colors={{ "type": "sequential", "scheme": "greens" }}
            emptyColor="#555555"
            tooltip={CustomTooltip}
            // isInteractive={false}
            legends={
                [
                    {
                        anchor: 'bottom',
                        translateX: 0,
                        translateY: 30,
                        length: 400,
                        thickness: 8,
                        direction: 'row',
                        tickPosition: 'after',
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        tickFormat: '>-.2s',
                        title: 'Value →',
                        titleAlign: 'start',
                        titleOffset: 4
                    }
                ]}
        />
    </CustomZoomPinchComponent>
}



export default CustomHeatMap;