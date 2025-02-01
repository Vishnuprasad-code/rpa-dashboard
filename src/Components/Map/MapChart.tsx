import { useState, useEffect, useContext } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import CustomZoomPinchComponent from "../ZoomComponent/CustomZoomComponent.tsx"

import { MainStatsContext } from "../../Contexts/mainStatsContext.tsx"

import Stack from "@mui/system/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CustomSkeleton from "../LoadingAnimation/Skeleton.tsx";
import { DashboardContext } from "../../Contexts/DashboardContext.tsx";
import { Link } from "react-router-dom";
import CustomSwiperCarousel from "../Carousel/SwiperCarousel.tsx";
import { NavAltBox } from "../StyledComponents/styledBox.tsx";
import Button from "@mui/material/Button";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


interface StatsDataType {
  [k: string]: number
}


export function USAMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const { selectedState, handleStateSelectMap, mainStatsData } = useContext(MainStatsContext);
  const { rpaListings } = useContext(DashboardContext)

  useEffect(() => {
    if (!hoveredState) return

    const timeout = setTimeout(() => {
      setHoveredState!(null);
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [hoveredState]);

  if (!mainStatsData) return <CustomSkeleton />

  const statsData: StatsDataType = {};
  for (let item of mainStatsData.graphData) {
    statsData[item.state] = Math.round(
      Math.max(statsData[item.state] ?? 0, item.success * 100 / (item.success + item.failed))
    )
    statsData[item.rpa] = Math.round(
      Math.max(statsData[item.rpa] ?? 0, item.success * 100 / (item.success + item.failed))
    )
  }

  function handleStateHover(hoveredState: string): void {
    setHoveredState(hoveredState);
  }

  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: '1rem',
        position: "relative",
      }}>
      <CustomZoomPinchComponent>
        <MapChart
          onStateHover={handleStateHover}
          selectedState={selectedState!}
          onStateSelect={handleStateSelectMap!}
          statsData={statsData}
        />
      </CustomZoomPinchComponent>
      {!selectedState && !hoveredState && <GradientStrip />}
      {!selectedState && hoveredState && <Box sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "3em",
        padding: "10px",
        // backgroundColor: "rgba(0, 0, 255, .1)",
      }}>
        <Typography variant="h4" align="left">{hoveredState}</Typography>
      </Box>}
      {selectedState && <Box sx={{
        // width: "100%",
        // position: "absolute",
        // bottom: 0,
        height: "3em",
        // padding: "10px",
        backgroundColor: "rgba(0, 0, 0, .3)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 2,
        "& > div": {
          flex: "1",
        }
      }}>
        <Typography variant="h4" align="left">
          {selectedState}
        </Typography>
        {
          rpaListings && rpaListings[selectedState] &&
          <CustomSwiperCarousel
            slides={rpaListings[selectedState].map(({ label, slug }) => {
              return <NavAltBox sx={{ height: "100%" }}>
                <Button fullWidth component={Link} color="inherit" to={`rpas/${slug}`} >{label}{statsData[slug] && `: ${statsData[slug]}%`}</Button>
              </NavAltBox>
            })}
            slidesPerView={3}
          />
        }
      </Box>
      }
    </Stack >

  );

}


interface MapChartPropsType {
  selectedState: string | null,
  onStateHover: (hoveredState: string) => void,
  onStateSelect: (selectedState: string) => void,
  statsData: StatsDataType
}


const MapChart = (props: MapChartPropsType) => {
  const theme = useTheme();

  return (
    <ComposableMap
      style={{
        height: "100%",
        width: "100%",
      }} projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies,
          //  borders 
        }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => props.onStateHover(geo.properties.name)}
                onClick={() => props.onStateSelect(geo.properties.name)}
                style={{
                  default: {
                    fill: chooseStateColor(geo.properties.name, props.selectedState, props.statsData),
                    outline: "none",
                    stroke: theme.palette.text.primary, // Border color
                    strokeWidth: 0.75, // Border width
                  },
                  hover: {
                    fill: "#2F4F4F",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))}
            {/* <Geography geography={borders} fill="none" stroke={theme.palette.text.primary} /> */}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};


function GradientStrip() {
  // Generate gradient stops dynamically
  const generateGradient = () => {
    const stops = Array.from({ length: 11 }, (_, i) => {
      const percentage = i * 10; // 0%, 10%, ..., 100%
      return `${getColor(percentage)} ${percentage}%`;
    }).join(', ');

    return `linear-gradient(to right, ${stops})`;
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "10px"
    }}>
      0%
      <Box
        sx={{
          width: '25%',
          // margin: "auto",
          mx: "10px",
          height: '10px',
          background: generateGradient(),
          // border: '1px solid #ccc',
          // borderRadius: "5px"
        }}
      >
      </Box>
      100%
    </Box>

  );
};


function chooseStateColor(state: string, selectedState: string | null, statsData: StatsDataType) {
  if (state == selectedState) return "#3ca7dc"
  if (selectedState && state !== selectedState) return "grey"
  if (!statsData[state]) return "grey"
  // if ((statsData[state] ?? 0) > 90) return "green"
  // if ((statsData[state] ?? 0) > 70) return "orange"
  // return "red"
  return getColor(statsData[state] ?? 0)
}



function getColor(percentage_value: number): string {
  // // percentage_value is a number between 0 and 1
  // const hue = (percentage_value / 100) * 85; // Map 0% to 120 (green) and 100% to 0 (red)
  // return `hsl(${hue}, 75%, 40%)`; // Adjust saturation and lightness as needed

  // percentage_value is a number between 0 and 1
  const green = Math.round(percentage_value * 120 / 100); // Maximum green component (darker)
  const red = Math.round((100 - percentage_value) * 100 / 100); // Maximum red component
  return `rgb(${red - 30}, ${green}, 0)`; // Blue is fixed at 0 for red/green shades
}