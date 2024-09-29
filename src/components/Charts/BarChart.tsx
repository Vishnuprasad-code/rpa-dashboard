// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import data from "./BarChartMockData.js";

import Box from '@mui/material/Box';
import {GlossyBox} from "../StyledComponents/styledBox.tsx"


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export function MyResponsiveBar(){
    return (
        <GlossyBox
      >
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger"]}
        indexBy="rpa"
        margin={{ top: 50, right: 0, bottom: 20, left: 0 }}
        padding={0.5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#3ca7dc", "black"]}
        theme={{
            "text": {
                "fontSize": 12,
                "fill": "white",
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
        enableTotals={true}
        enableGridY={true}
        gridYValues={[0]}
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
        tooltip={({ data }) => {
            return (
                <div style={{ backgroundColor: "red" }}>burger: {data["burger"]}</div>
            );
        }}
        layers={[
            'grid',
            'axes',
            'bars',
            'markers',
            'legends',
            ({ bars, xScale, yScale }) => {
                const filtereBars = bars.slice(Math.ceil(bars.length / 2));
                return filtereBars.map((bar) => {
                    console.log(bar)
                    return (<text
                        key={bar.key}
                        x={bar.x + bar.width / 2}
                        y={bar.y - 15}
                        textAnchor="middle"
                        style={{
                            fill: 'black',
                            fontSize: 14,
                            fontWeight: 'bold',
                        }}
                    >
                        {bar.data.data["hot dog"] ?? 0} / {(bar.data.data["burger"] ?? 0) + (bar.data.data["hot dog"] ?? 0)}
                    </text>
                )})
            },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        />
    </GlossyBox>
    );
}
