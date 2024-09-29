// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import data from "./PieChartCircleMockData.js";
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import {GlossyBox} from "../StyledComponents/styledBox.tsx"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export function MyResponsivePie() {
  const CenteredText = ({ centerX, centerY }) => (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "1.75em",
        fontWeight: "bold",
      }}
    >
      {"100%"}
    </text>
  );

  return (
    <GlossyBox
    sx={
      {
        flexDirection: 'column',
        paddingTop: 2,
        "& > div": {
          flexBasis: 'auto'
        }
      }
    }>
      <Typography component="h5" align="center">
        Success-Failure Overview
      </Typography>
      <ResponsivePie
        data={data}
        theme={{ legends: { text: { fontSize: 10 } } }}
        margin={{ top: 10, right: 0, bottom: 60, left: 0 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={1}
        fit={false}
        activeOuterRadiusOffset={2}
        colors={["#33f08a", "black"]}
        layers={["arcs", "arcLabels", "legends", CenteredText]}
        borderWidth={2}
        borderColor="transparent"
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={-3}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabelsSkipAngle={13}
        arcLabelsTextColor="white"
        defs={[]}
        fill={[]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 10,
            translateY: 40,
            itemsSpacing: 60,
            itemWidth: 100,
            itemHeight: 30,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 20,
            symbolShape: "square",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </GlossyBox>
  );
}
