// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import data from "./BarChartMockData.js";

import Box from '@mui/material/Box';


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


export function MyResponsiveBar(){
    // return (
    // <Box
    //     height="30vh"
    //   >   
    //   Graph
    // </Box>
    // )
    return (
        <Box
        sx={{
            height: "100%",
            width: "100%",
      }}
      >
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger"]}
        indexBy="rpa"
        margin={{ top: 10, right: 0, bottom: 2, left: 0 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["cyan", "black"]}
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
        fill={[]}
        borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -35,
        // legend: 'country',
        // legendPosition: 'middle',
        // legendOffset: 32,
        truncateTickAt: 9,
        }}
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
        }}
        legends={[]}
        tooltip={({ data }) => {
        console.log(data);
        return (
            <div style={{ backgroundColor: "red" }}>burger: {data["burger"]}</div>
        );
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
        />
    </Box>
    );
}
