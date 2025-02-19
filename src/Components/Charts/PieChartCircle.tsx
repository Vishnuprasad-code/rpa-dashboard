// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

import { useTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";
import { StyledToolTip } from "../StyledComponents/styledToolTip.tsx"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CustomTooltip = (props: any) => {
  return <StyledToolTip>
    <Typography variant="h4">{props.name}: {props.value}</Typography>
  </StyledToolTip>
  // <div
  //     style={{
  //         padding: '6px 12px',
  //         background: theme.palette.background.default,
  //         borderRadius: '3px',
  //         color: theme.palette.text.primary,
  //         fontSize: '14px',  // Customize font size
  //         fontFamily: 'Arial, sans-serif',  // Customize font family
  //         fontWeight: 'bold',  // Customize font weight
  //     }}
  //   >
  //       <div style={{
  //         marginRight: "5px",
  //         display: "inline-block",
  //         background: color,
  //         width: "10px",
  //         height: "10px",
  //         border: `1px solid ${theme.palette.text.primary}`,  
  //       }}></div>
  //   </div>
};

const CenteredText = (props: any) => {
  if (!props.centeredText) return
  const theme = useTheme();
  return (<text
    x={props.centerX}
    y={props.centerY}
    textAnchor="middle"
    dominantBaseline="central"
    style={{
      fill: theme.palette.text.primary,
      fontSize: `${props.innerRadius * 0.6}px`,
      fontWeight: "bold",
    }}
  >
    {props.centeredText}
  </text>
  );

}

export function CustomResponsivePie(props: any) {
  const theme = useTheme();
  return (
    <ResponsivePie
      data={props.data}
      margin={{ top: props.topMargin ?? 20, right: 0, bottom: props.bottomMargin ?? 60, left: 0 }}
      innerRadius={props.innerRadius ?? 0.6}
      padAngle={0.7}
      cornerRadius={1}
      fit={false}
      activeOuterRadiusOffset={2}
      colors={props.colors}
      layers={[
        "arcs",
        "arcLabels",
        "legends",
        ({ innerRadius, centerX, centerY }) => CenteredText({ innerRadius, centerX, centerY, centeredText: props.centeredText })
      ]}
      borderWidth={2}
      borderColor="transparent"
      enableArcLinkLabels={false}
      enableArcLabels={props.enableArcLabels ?? false}
      arcLabelsRadiusOffset={props.data.length == 1 ? 0 : 0.5}
      arcLabelsSkipAngle={0}
      arcLabelsTextColor="black"
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
          itemTextColor: theme.palette.text.primary,
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
      theme={{
        legends: { text: { fontSize: 12 } },
        labels: {
          text: {
            fontSize: 20, // Set label font size
            fontWeight: "bold", // Optional: Make labels bold
          },
        },
      }}
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
