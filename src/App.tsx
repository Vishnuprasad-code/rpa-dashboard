import { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { blue } from '@mui/material/colors';

import HomeSideBar from './components/HomeSideBar.tsx'


function App() {
  return (
    <Grid
      container
    >
      <Grid
        size={{xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
        sx={
         {
          bgcolor: "transparent",
          height: "100vh",
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
          height: "100vh",
          bgcolor: "cyan",
          // flexGrow: 1
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
          height: "2rem"
        }
      }}
    >
      <Grid size={{lg: 6, sm: 12, xs: 12}}>
        Item1
      </Grid>
      <Grid size={{lg: 6, sm:12, xs: 12}}>
        Item2
      </Grid>
      <Grid size={{lg:8, sm:12, xs: 12}}>
        Item3
      </Grid>
      <Grid size={{lg: 4}}>
        Item4
      </Grid>
      <Grid size={{lg: 4}}>
        Item5
      </Grid>
    </Grid>
    )
}


export default App
