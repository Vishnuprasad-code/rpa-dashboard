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

const CenteredText = (
  innerRadius, centerX, centerY, centeredText
) => {
    const theme = useTheme();
    return (<text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fill: theme.palette.text.primary,
        fontSize: `${innerRadius * 0.6}px`,
        fontWeight: "bold",
      }}
    >
      {centeredText}
    </text>
);

}

export function CustomResponsivePie({data, centeredText, bottomMargin=60}) {
  return (
    <ResponsivePie
      data={data}
      theme={{ legends: { text: { fontSize: 12 } } }}
      margin={{ top: 5, right: 0, bottom: bottomMargin, left: 0 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={1}
      fit={false}
      activeOuterRadiusOffset={2}
      colors={["#33f08a", "black"]}
      layers={[
        "arcs", 
        "arcLabels", 
        "legends",
        ({innerRadius, centerX, centerY}) => CenteredText(innerRadius, centerX, centerY, centeredText)
      ]}
      borderWidth={2}
      borderColor="transparent"
      enableArcLinkLabels={false}
      enableArcLabels={false}
      arcLabelsSkipAngle={13}
      arcLabelsTextColor="white"
      defs={[]}
      fill={[]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 1,
          translateY: 50,
          itemsSpacing: 30,
          itemWidth: 50,
          itemHeight: 50,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: "square",
          effects: [
            // {
            //   on: "hover",
            //   style: {
            //     itemTextColor: "#000",
            //   },
            // },
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
