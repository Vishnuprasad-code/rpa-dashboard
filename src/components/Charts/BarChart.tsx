// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";
import data from "./BarChartMockData.js";

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {GlossyBox} from "../StyledComponents/styledBox.tsx"
import {StyledToolTip} from "../StyledComponents/styledToolTip.tsx"

import Typography from '@mui/material/Typography';



// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const totalsRedender = ({ bars }) => {
    const theme = useTheme();
    const filtereBars = bars.slice(Math.ceil(bars.length / 2));
    return filtereBars.map((bar) => {
        console.log(bar)
        return (
        <text
            key={bar.key}
            x={bar.x + bar.width / 2}
            y={bar.y - 13}
            textAnchor="middle"
            style={{
                fill: theme.palette.text.primary,
                fontSize: 10,
                fontWeight: 'bold',
            }}
        >
            {bar.data.data["sos_filing_successful"] ?? 0} / {(bar.data.data["sos_filing_successful"] ?? 0) + (bar.data.data["failed_filing"] ?? 0)}
        </text>
    )})
};


const CustomTooltip = ({data}) => {
    return (
        <StyledToolTip>
            <Typography sx={{
                textDecoration: "underline",
                textUnderlineOffset: "10px",
                marginBottom: "10px"
            }}>{data["rpa"]}</Typography>
            <div>sos_filing_successful: {data["sos_filing_successful"] ?? 0}</div>
            <div>failed_filing: {data["failed_filing"] ?? 0}</div>
        </StyledToolTip>
    );
}

export function MyResponsiveBar(){
    const theme = useTheme();
    return (
        <GlossyBox
      >
      <ResponsiveBar
        data={data}
        keys={["sos_filing_successful", "failed_filing"]}
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
            totalsRedender,
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
