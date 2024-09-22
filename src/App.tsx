import { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { blue } from '@mui/material/colors';

import HomeSideBar from './components/HomeSideBar.tsx'
import {USAMap} from './components/MapComponent/MapChart.tsx'

import {MyResponsiveBar} from "./components/Charts/BarChart.tsx"


function App() {
  return (
    <Grid
      container
      sx={{height: "100vh"}}
    >
      <Grid
        size={{xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
        sx={
         {
          bgcolor: "transparent",
          minWidth: "90px"
         }
        }
      >
        <HomeSideBar/>
      </Grid>
      <Grid
        size="grow"
        direction="column"
        sx={{
          bgcolor: "cyan",
         }}
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
    border: "1px solid green",
    "& > .MuiGrid2-direction-xs-row": {
      border: "1px solid blue",
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
      margin={1}
      spacing={2}
      alignItems="center"
      sx={{
        border: "1px solid red",
        "& > .MuiGrid2-direction-xs-row": {
          border: "1px solid blue",
          // minHeight: "15vh"
        }
      }}
    >
      <Grid
        height="30vh"
        order={{xl: 1, lg: 1, md: 2, sm: 2, xs: 2}}
        size={{lg: 6, sm: 12, xs: 12}}>
        Item1
      </Grid>
      <Grid
        height="30vh"
        order={{xl: 2, lg: 2, md: 3, sm: 3, xs: 3}}
        size={{lg: 6, sm:12, xs: 12}}>
        <USAMap/>
      </Grid>
      <Grid
        height="40vh"
        order={{xl: 3, lg: 3, md: 1, sm: 1, xs: 1}}
        size={{lg:8, sm:12, xs: 12}}>
        <MyResponsiveBar/>
      </Grid>
      <Grid
        height="40vh"
        order={{xl: 4, lg: 4, md: 4, sm: 4, xs: 4}}
        size={{lg: 4}}>
        Item4
      </Grid>
      <Grid
        height="19vh"
        size={{lg: 4}}
        order={{xl: 5, lg: 5, md: 5, sm: 5, xs: 5}}
      >
        Item5
      </Grid>
    </Grid>
    )
}


export default App
