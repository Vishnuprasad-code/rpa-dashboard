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


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


interface StatsDataType {
  [k: string]: number
}


export function USAMap(){
  const [hoverdState, setHoveredState] = useState<string | null >(null);
  const {selectedState, setSelectedState, mainStatsData} = useContext(MainStatsContext);

  useEffect(()=> {
    if (!selectedState) return

    const timeout = setTimeout(() => {
      setSelectedState(null);
    }, 60000);
  
    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [selectedState]);

  if (!mainStatsData) return <CustomSkeleton/>

  const statsData: StatsDataType = {};
  for(let item of mainStatsData.graphData){
    statsData[item.state] = Math.max(statsData[item.state] ?? 0, item.success * 100 / (item.success + item.failed))
    statsData[item.rpa] = Math.max(statsData[item.rpa] ?? 0, item.success * 100 / (item.success + item.failed))
  }

  return (
    <Stack
    sx={
      (theme) => ({
        height: "100%",
        width: "100%",
        // bgcolor: theme.palette.primary.dark,
        borderRadius: '1rem',
        position: "relative",
      })
    }>
      <CustomZoomPinchComponent>
        <MapChart 
          setHoveredState={setHoveredState}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          statsData={statsData}
        />
      </CustomZoomPinchComponent>
      { !selectedState && hoverdState && <Box sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "3em",
        padding: "10px",
        // backgroundColor: "rgba(0, 0, 255, .1)",
      }}>
        <Typography variant="h4" align="left">{hoverdState}</Typography>
      </Box>}
      {selectedState && <Box sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "3em",
        padding: "10px",
        backgroundColor: "rgba(0, 0, 0, .3)",
      }}>
        <Typography variant="h4" align="left">{selectedState}: {statsData[selectedState]}</Typography>
      </Box>}
    </Stack>

  );
  
}

const MapChart = (
  { selectedState,
    setHoveredState,
    setSelectedState,
    statsData
  }:
  {
    selectedState: string | null,
    setHoveredState: (hoveredState: string) => void,
    setSelectedState: (selectedState: string) => void,
    statsData: StatsDataType
  }
) => {
  const theme = useTheme();

  return (
    <ComposableMap
    style={{
      height: "100%",
      width: "100%",
    }} projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies, borders }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => setHoveredState(geo.properties.name)}
                onClick={() => setSelectedState(geo.properties.name)}
                style={{
                  default: {
                    fill:  chooseStateColor(geo.properties.name, selectedState, statsData),
                    outline: "none",
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
            <Geography geography={borders} fill="none" stroke={theme.palette.primary.contrastText} />
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};


function chooseStateColor(state: string, selectedState: string | null, statsData: StatsDataType){
  if (state == selectedState) return "cyan"
  if (!statsData[state]) return "grey"
  if ((statsData[state] ?? 0) > 90) return "green"
  if ((statsData[state] ?? 0) > 70) return "orange"
  return "red"
}