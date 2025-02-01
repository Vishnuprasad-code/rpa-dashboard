// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

import { useTheme } from '@mui/material/styles';

import { StyledToolTip } from "../StyledComponents/styledToolTip.tsx"

import Typography from '@mui/material/Typography';

import { BarDatum, ComputedBarDatum } from '@nivo/bar/dist/types/types';
import { Theme } from '@mui/material/styles/createTheme';

import CustomZoomPinchComponent from "../ZoomComponent/CustomZoomComponent.tsx"



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
                    fontSize: bar.width * 0.35,
                    fontWeight: 'bold',
                }}
            >
                {`${successCount} / ${Number(successCount) + Number(failedCount)}`}
            </text>
        )
    })
};


const CustomTooltip = ({ data }: { data: BarDatum }) => {
    return (
        <StyledToolTip sx={{
            p: "10px",
            // "& > div": {
            //     mx: "10px",
            //     my: "5px",
            // }
        }}>
            <Typography variant="h5" sx={{
                width: "100%",
                pb: "5px",
                py: "5px",
                textTransform: "uppercase",
                borderBottom: "1px solid black",
                textUnderlineOffset: "10px",
                marginBottom: "10px"
            }}>{data["rpa"]}</Typography>
            <div>Successful: {data["success"] ?? 0}</div>
            <div>Failed: {data["failed"] ?? 0}</div>
        </StyledToolTip>
    );
}

export function ResponsiveStackBar(
    {
        data,
        clicHandler = null,
        initialPositionY = 0,

    }: {
        data: any,
        clicHandler: ((data: BarDatum) => void) | null,
        initialPositionY?: number | null
    }) {

    const theme = useTheme();
    return (
        <CustomZoomPinchComponent initialPositionY={initialPositionY}>
            <ResponsiveBar
                data={data}
                keys={["success", "failed"]}
                indexBy="rpa"
                margin={{ top: data.length > 5 ? 50 : 150, right: 50, bottom: 50, left: 50 }}
                padding={data.length > 5 ? 0.5 : 0.7}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={["#00B6CB", "#cc6b3c"]}  // #3ca7dc
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
                    },
                    tooltip: {
                        container: {
                            position: 'absolute',
                            overflow: 'visible',
                        },
                    },
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
                gridYValues={2}
                enableLabel={false}
                fill={[]}
                borderRadius={2}
                borderColor="white"
                axisTop={null}
                axisRight={null}
                axisBottom={
                    {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -35,
                        truncateTickAt: 9,
                    }
                    // null
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
                    ({ bars }) => totalsRedender(bars, theme),
                ]}
                onClick={({ data }) => clicHandler && clicHandler(data)}
                role="application"
                ariaLabel="Nivo bar chart"
                barAriaLabel={(e) =>
                    e.id + ": " + e.formattedValue + " in country: " + e.indexValue
                }
            />
        </CustomZoomPinchComponent>
    );
}
