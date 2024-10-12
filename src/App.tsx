import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2';


import HomeSideBar from './components/HomeSideBar.tsx'

import {USAMap} from './components/MapComponent/MapChart.tsx'

import AllRpaBar from "./Scenes/BarChart.tsx"
import Table from "./Scenes/Table.tsx"

import RPAOverviewPie from "./Scenes/RPAOverviewPie.tsx"

import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import { BrowserRouter as Router, Routes, Route, useLoaderData} from 'react-router-dom';
import { RouterProvider, createBrowserRouter, useLoaderData, Outlet } from 'react-router-dom';


import { MainStatsContext } from './Contexts/mainStatsContext.tsx';
import {fetchLatestMainStatsData} from './Http/http.ts'
import {mainStatsDataType} from './Types/types.ts'


import RpaListings from "./Pages/RpaListings.tsx"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard/>,
    children: [
      { index: true, element: <HomeMain />},
      { path: 'rpas', element: <RpaListings />},
    ],
  },
]);

function HelloWorld(){
  return <div>Hello World</div>
}


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {/* <Dashboard/> */}
          <RouterProvider router={router} />
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
          minWidth: "70px"
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
        <Outlet />
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
  // const iniatialStatsData = useLoaderData() as mainStatsDataType;
  const [mainStatsData, setMainStatsData] = useState<mainStatsDataType>(
    // useLoaderData() as mainStatsDataType
    // iniatialStatsData
    {
      "totalCount": 0,
      "successCount": 0,
      "failedCount": 0,
      "failedFilings": [],
      "graphData": []
    }
  )

  const fetchData = async () => {
    try {
      const latestMainStatsData = await fetchLatestMainStatsData();
      setMainStatsData(latestMainStatsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(() => {
      console.log("Sending request......")
      fetchData();
    }, 45000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once


  return (
    <MainStatsContext.Provider value={{ mainStatsData: mainStatsData,  setMainStatsData: setMainStatsData}}>
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
        <Table/>
      </Grid>
      <Grid
        height="18rem"
        order={{xl: 3, lg: 3, md: 1, sm: 1, xs: 1}}
        size={{lg:8, sm:12, xs: 12}}>
        <AllRpaBar/>
      </Grid>
      <Grid
        height="18rem"
        order={{xl: 4, lg: 4, md: 4, sm: 4, xs: 4}}
        size={{lg: 4}}>
        <RPAOverviewPie/>
      </Grid>
      <Grid
        height="15rem"
        size={{lg: 4}}
        order={{xl: 5, lg: 5, md: 5, sm: 5, xs: 5}}
      >
        <RPAOverviewPie/>
      </Grid>
    </Grid>
    </MainStatsContext.Provider>
    )
}


export default App
