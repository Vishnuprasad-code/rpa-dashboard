import { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { blue } from '@mui/material/colors';

import HomeSideBar from './components/HomeSideBar.tsx'

import {USAMap} from './components/MapComponent/MapChart.tsx'

import {MyResponsiveBar} from "./components/Charts/BarChart.tsx"

import {MyResponsivePie} from "./components/Charts/PieChartCircle.tsx"

import AnimatedMuiTable from "./components/Tables/Table.tsx"


import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";



function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
};


function Dashboard(){
  return (
    <Grid
      container
      sx={{height: "100vh"}}
    >
      <Grid
        size={{xl: 2, lg: 2, md: 0.75, sm: 0.75, xs: 0.75}}
        sx={
         {
          bgcolor: "transparent",
          minWidth: "50px"
         }
        }
      >
        <HomeSideBar/>
      </Grid>
      <Grid
        size="grow"
        direction="column"
        height="100%"
        sx={
            {
                overflowY: "scroll",
              }
          }
      >
        <HomeNavBar/>
        <HomeMain/>
      </Grid>
    </Grid>
  )
};


function HomeNavBar(){
  return (
  <Grid
  container
  justifyContent="center"
  spacing={2}
  alignItems="center"
  sx={{
    // border: "1px solid green",
    "& > .MuiGrid2-direction-xs-row": {
      // border: "1px solid blue",
      height: "2rem"
    }
  }}
>
    <Grid>
      Nav1
    </Grid>
  </Grid>
  );
}

function HomeMain() {
  return (
    <Grid
      container
      justifyContent="flex-start"
      margin="1rem"
      spacing="1rem"
      alignItems="center"
      sx={{
        // border: "1px solid red",
        "& > .MuiGrid2-direction-xs-row": {
          // border: "1px solid blue",
          // minHeight: "15vh"
        }
      }}
    >
      <Grid
        height="15rem"
        order={{xl: 1, lg: 1, md: 2, sm: 2, xs: 2}}
        size={{lg: 6, sm: 12, xs: 12}}>
        <USAMap/>
      </Grid>
      <Grid
        height="15rem"
        order={{xl: 2, lg: 2, md: 3, sm: 3, xs: 3}}
        size={{lg: 6, sm:12, xs: 12}}>
        <AnimatedMuiTable/>
      </Grid>
      <Grid
        height="18rem"
        order={{xl: 3, lg: 3, md: 1, sm: 1, xs: 1}}
        size={{lg:8, sm:12, xs: 12}}>
        <MyResponsiveBar/>
      </Grid>
      <Grid
        height="18rem"
        order={{xl: 4, lg: 4, md: 4, sm: 4, xs: 4}}
        size={{lg: 4}}>
        <MyResponsivePie/>
      </Grid>
      <Grid
        height="15rem"
        size={{lg: 4}}
        order={{xl: 5, lg: 5, md: 5, sm: 5, xs: 5}}
      >
        <MyResponsivePie/>
      </Grid>
    </Grid>
    )
}


export default App
