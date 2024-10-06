// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

import { useTheme} from '@mui/material/styles';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CustomTooltip = ({ name, value, color }) => {
  const theme = useTheme();
  console.log(theme.palette.text.primary)
  return <div
      style={{
          padding: '6px 12px',
          background: theme.palette.background.default,
          borderRadius: '3px',
          color: theme.palette.text.primary,
          fontSize: '14px',  // Customize font size
          fontFamily: 'Arial, sans-serif',  // Customize font family
          fontWeight: 'bold',  // Customize font weight
      }}
    >
        <div style={{
          marginRight: "5px",
          display: "inline-block",
          background: color,
          width: "10px",
          height: "10px",
          border: `1px solid ${theme.palette.text.primary}`,  
        }}></div>{name}: {value}
    </div>
};



export function CustomResponsivePie({data, CenteredText}) {
  return (
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
      tooltip={({ datum }) => (
        <CustomTooltip
            name={datum.id}
            value={datum.value}
            color={datum.color}
        />
    )}
    />
);
}
