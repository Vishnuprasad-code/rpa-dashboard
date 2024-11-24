import { useState, useEffect } from 'react'
import { ColorModeContext, useMode } from "./theme.ts";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Grid from '@mui/material/Grid2';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

import { DashboardContext } from './Contexts/DashboardContext.tsx';
import RpasOverview from "./Pages/RpasOverview.tsx"
import HomeMain from './Pages/HomeMain.tsx';

import HomeSideBar from './Scenes/HomeSideBar.tsx'
import HomeNavBar from './Scenes/HomeNavBar.tsx';

import { fetchRPAListingsData } from './Http/http.ts';
import { RpaListingsType } from './Types/types.ts';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { index: true, element: <HomeMain /> },
      { path: 'rpas/:rpaSlug', element: <RpasOverview /> },
      { path: 'apis', element: <HelloWorld /> },
      { path: 'docs', element: <HelloWorld /> },
    ],
  },
]);


function HelloWorld() {
  return <div>Hello World</div>
}


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
};


function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<string>("Home")
  const [rpaListings, setRPAListings] = useState<RpaListingsType>({})

  const fetchData = async () => {
    try {
      const rpaListingsData = await fetchRPAListingsData();
      setRPAListings(rpaListingsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <DashboardContext.Provider value={{
      selectedTab: selectedTab,
      setSelectedTab: setSelectedTab,
      rpaListings: rpaListings
    }}>

      <Grid
        container
        sx={{ height: "100vh" }}
      >
        <Grid
          size={{ xl: 1.75, lg: 1.75, md: 0.75, sm: 0.75, xs: 0.75 }}
          sx={
            {
              bgcolor: "transparent",
              minWidth: "70px"
            }
          }
        >
          <HomeSideBar />
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
          <HomeNavBar />
          <Outlet />
        </Grid>
      </Grid>
    </DashboardContext.Provider>
  )
};


export default App
