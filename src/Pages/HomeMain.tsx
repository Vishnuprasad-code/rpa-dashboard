import { useEffect, useState } from "react";
import { fetchLatestMainStatsData } from "../Http/http";
import { MainStatsContext } from "../Contexts/mainStatsContext";

import Grid from '@mui/material/Grid2';
import { USAMap } from "../Components/Map/MapChart";
import Table from "../Scenes/Table";
import AllRpaBar from "../Scenes/BarChart";
import RPAOverviewPie from "../Scenes/RPAOverviewPie";
import CaptchaBalance from "../Scenes/CaptchaBalance";
import APIOverview from "../Scenes/APIOverview";
import BrowserlessOverview from "../Scenes/BrowserlessOverview";
import { MainStatsDataType } from "../Types/types";



export default function HomeMain() {
  const [mainStatsData, setMainStatsData] = useState<MainStatsDataType | null>(
    null
    // {
    //   "totalCount": 0,
    //   "successCount": 0,
    //   "failedCount": 0,
    //   "failedFilings": [],
    //   "graphData": []
    // }
  )
  const [selectedState, setSelectedState] = useState<string | null>(null);


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

  const rowOneHieght = "34%", rowTwoHeight = "38%", rowThreeHeight = "27%";

  return (
    <MainStatsContext.Provider value={{
      mainStatsData: mainStatsData,
      setMainStatsData: setMainStatsData,
      selectedState: selectedState,
      setSelectedState: setSelectedState,
    }}>
      <Grid
        container
        justifyContent="flex-start"
        mx={2}
        mt="10px"
        columnSpacing={2}
        rowSpacing={3}
        alignItems="center"
        height="90%"
        sx={{
          // border: "1px solid red",
          "& > .MuiGrid2-direction-xs-row": {
            // border: "1px solid blue",
            // minHeight: "15vh"
          }
        }}
      >
        <Grid
          height={rowOneHieght}
          order={{ xl: 1, lg: 1, md: 4, sm: 4, xs: 4 }}
          size={{ lg: 6, sm: 12, xs: 12 }}>
          <USAMap />
        </Grid>
        <Grid
          height={rowOneHieght}
          order={{ xl: 2, lg: 2, md: 3, sm: 3, xs: 3 }}
          size={{ lg: 6, sm: 12, xs: 12 }}>
          <Table />
        </Grid>
        <Grid
          height={rowTwoHeight}
          order={{ xl: 3, lg: 3, md: 1, sm: 1, xs: 1 }}
          size={{ lg: 8, sm: 12, xs: 12 }}>
          <AllRpaBar />
        </Grid>
        <Grid
          height={rowTwoHeight}
          order={{ xl: 4, lg: 4, md: 2, sm: 2, xs: 2 }}
          size={{ lg: 4, sm: 12, xs: 12 }}>
          <RPAOverviewPie />
        </Grid>
        <Grid
          height={rowThreeHeight}
          size={{ lg: 4, sm: 12, xs: 12 }}
          order={{ xl: 5, lg: 5, md: 5, sm: 5, xs: 5 }}
        >
          <CaptchaBalance />
        </Grid>
        <Grid
          height={rowThreeHeight}
          size={{ lg: 4, sm: 12, xs: 12 }}
          order={{ xl: 5, lg: 5, md: 5, sm: 5, xs: 5 }}
        >
          <APIOverview />
        </Grid>
        <Grid
          height={rowThreeHeight}
          size={{ lg: 4, sm: 12, xs: 12 }}
          order={{ xl: 5, lg: 5, md: 5, sm: 5, xs: 5 }}
        >
          <BrowserlessOverview />
        </Grid>
      </Grid>
    </MainStatsContext.Provider>
  )
}