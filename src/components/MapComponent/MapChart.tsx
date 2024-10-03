import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


import Stack from "@mui/system/Stack";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';


import "./MapChart.scss"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


export function USAMap(){
  const [hoverdState, setHoveredState] = useState<string>("");
  return (
    <Stack
    sx={
      (theme) => ({
        height: "100%",
        width: "100%",
        bgcolor: theme.palette.primary.dark,
        borderRadius: '1rem'
      })
    }>
      <TransformWrapper>
        <TransformComponent wrapperClass="zoom-component" contentClass="zoom-component">
          <MapChart hoverdState={setHoveredState}/>\
        </TransformComponent>
      </TransformWrapper>
      <Box sx={{
        height: "2rem",
        padding: "10px"
      }}>
        {hoverdState}
      </Box>
    </Stack>

  );
  
}

const MapChart = ({hoverdState}) => {
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
                onMouseEnter={() => hoverdState(geo.properties.name)}
                style={{
                  default: {
                    fill: geo.properties.name === "Texas" ? "green" : "grey",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
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