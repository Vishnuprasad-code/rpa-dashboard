// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

import { useTheme } from '@mui/material/styles';

import {StyledToolTip} from "../StyledComponents/styledToolTip.tsx"

import Typography from '@mui/material/Typography';

import { BarDatum, ComputedBarDatum } from '@nivo/bar/dist/types/types';
import { Theme } from '@mui/material/styles/createTheme';

// import { mainStatsDataType, GraphDataType } from "../../Types/types.ts";



// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const totalsRedender = (bars: readonly ComputedBarDatum<BarDatum>[], theme: Theme) => {
    const filtereBars = bars.slice(Math.ceil(bars.length / 2));
    return filtereBars.map((bar, barIndex) => {
        const otherBar = bars[barIndex]
        const successCount = bar.data.data["success"] ?? 0
        const failedCount = bar.data.data["failed"] ?? 0
        return (
        <text
            key={bar.key}
            x={bar.x + bar.width / 2}
            y={Math.min(bar.y, otherBar.y) - 10}
            textAnchor="middle"
            style={{
                fill: theme.palette.text.primary,
                fontSize: 10,
                fontWeight: 'bold',
            }}
        >
            {`${successCount} / ${Number(successCount) + Number(failedCount)}`}
        </text>
    )})
};


const CustomTooltip = ({data}: {data: BarDatum}) => {
    return (
        <StyledToolTip>
            <Typography sx={{
                textDecoration: "underline",
                textUnderlineOffset: "10px",
                marginBottom: "10px"
            }}>{data["rpa"]}</Typography>
            <div>success: {data["success"] ?? 0}</div>
            <div>failed: {data["failed"] ?? 0}</div>
        </StyledToolTip>
    );
}

export function ResponsiveStackBar({data}){
    const theme = useTheme();
    
    return (
      <ResponsiveBar
        data={data}
        keys={["success", "failed"]}
        indexBy="rpa"
        margin={{ top: 50, right: 5, bottom: 20, left: 5 }}
        padding={0.5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#3ca7dc", "black"]}
        theme={{
            grid: {
                line: {
                  stroke: theme.palette.primary.light, // Set your desired gridline color here
                  strokeWidth: 1, // Optional: adjust the width of the gridlines
                },
              },
            text: {
                fontSize: 12,
                fill: theme.palette.text.primary,
            }
        }}
        defs={[
        {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
        },
        {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
        },
        ]}
        enableGridY={true}
        gridYValues={3}
        enableLabel={false}
        fill={[]}
        borderRadius={4}
        borderColor="white"
        axisTop={null}
        axisRight={null}
        axisBottom={
            //     {
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: -35,
            // truncateTickAt: 9,
            // }
            null
        }
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[]}
        tooltip={CustomTooltip}
        layers={[
            'grid',
            'axes',
            'bars',
            'markers',
            'legends',
            ({bars}) => totalsRedender(bars, theme),
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        />
    );
}
