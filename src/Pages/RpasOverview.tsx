import { useContext, useEffect, useState } from 'react';


import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useParams } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { TextField } from '@mui/material';
// import {Button} from "@mui/material";

import nestLogo from '../assets/nest.png';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



import AllRpaBar from "../Scenes/BarChart.tsx"
import Table from "../Scenes/Table.tsx"

import { formatDateFromEpoch } from "../Utils/utils.ts"


import { MainStatsContext } from '../Contexts/mainStatsContext.tsx';
import { DashboardContext } from "../Contexts/DashboardContext.tsx"
import { fetchLatestMainStatsData, fetchQueueCount } from '../Http/http.ts'
import { MainStatsDataType, QueueCountType, RpaListingsType } from '../Types/types.ts'
import CustomCircularProgress from '../Components/LoadingAnimation/Progress.tsx';
import CustomSkeleton from '../Components/LoadingAnimation/Skeleton.tsx';


dayjs.extend(utc);
dayjs.extend(timezone);



const MUIDateTimeRangePicker = ({ handleStartDateTimeChange, handleEndDateTimeChange, timeZone }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.tz.setDefault(timeZone)}>
      <DateTimePicker
        // label="Start Date & Time"
        // value={startDateTime}
        onChange={handleStartDateTimeChange}
        sx={{
          "& input": {
            display: "none"
          },
          "& .MuiFormControl-root": {
            padding: 0,
          },
        }}
      />
      <span> - </span>
      <DateTimePicker
        // label="End Date & Time"
        // value={endDateTime}
        onChange={handleEndDateTimeChange}
        sx={{
          "& input": {
            display: "none"
          },
          "& .MuiFormControl-root": {
            padding: 0,
          },
        }}
      // minDateTime={startDateTime}
      />
    </LocalizationProvider>
  );
};

export default function RpasOverview() {
  const params = useParams();
  const { setSelectedTab, rpaListings } = useContext(DashboardContext);
  setSelectedTab("RPAs");

  const timeZone = 'America/Los_Angeles';
  const losAngelesTime = dayjs().tz(timeZone).startOf('day');
  const epochStartTime = losAngelesTime.unix();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDateTime, setStartDateTime] = useState<number>(epochStartTime);
  const [endDateTime, setEndDateTime] = useState<number>(epochStartTime + 86400);
  const [dateButtonText, setDateButtonText] = useState<string>("Today")
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

  const currentRpaData = getCurrentRpaData(rpaListings, params.rpaSlug)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestMainStatsData = await fetchLatestMainStatsData(params.rpaSlug, startDateTime, endDateTime);
        setMainStatsData(latestMainStatsData);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [startDateTime, endDateTime]); // Empty dependency array ensures this runs only once  

  return (
    <MainStatsContext.Provider value={{ mainStatsData: mainStatsData, setMainStatsData: setMainStatsData }}>
      <Stack
        sx={
          (theme) => ({
            // bgcolor: theme.palette.primary.dark,
            // overflow: 'hidden',
            // minHeight: "80vh",
            "& .MuiAccordion-root": {
              width: "100%",
              backgroundColor: "transparent"
            },
            "& .MuiAccordionDetails-root": {
              padding: "0",
            }
          })
        }
        m="20px 10px"
        spacing={1}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            columnGap: 2,
            width: "90%",
            height: "50px"
          }}
        >
          <Typography variant='h4' textAlign="left" sx={{}}>
            {params.rpaSlug?.toUpperCase()}
            {/* {JSON.stringify(currentRpaData)} */}
          </Typography>
          <a
            href={`https://nest.scrapehero.com/nest/api/${currentRpaData.rpa_id ?? "?apitags=13"}`}
            target='blank'>
            <img
              alt="nest_link"
              // width="30px"
              // height="30px"
              src={nestLogo}
              style={{ cursor: "pointer" }}
            /></a>
        </Box>
        <QueueBar />
        <Divider
          variant='middle'
          flexItem
          sx={{
            m: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}>
        </Divider>
        <TimePeriodBar
          startDateTime={startDateTime}
          setStartDateTime={setStartDateTime}
          endDateTime={endDateTime}
          setEndDateTime={setEndDateTime}
          dateButtonText={dateButtonText}
          setDateButtonText={setDateButtonText}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant='h5' margin="auto" textAlign={"center"}>GRAPH</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                height: "20rem",
                width: "100%",
              }}
            >
              {(mainStatsData && !isLoading) ?
                <AllRpaBar /> :
                <Box sx={{ width: "100%", height: "60px" }}><CustomSkeleton /></Box>}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant='h5' margin="auto" textAlign={"center"}>TABLE</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {mainStatsData ?
              <Table isPaused={true}
                isFullTable={true} /> :
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%", height: "60px" }}><CustomCircularProgress /></Box>
            }
          </AccordionDetails>
        </Accordion>
      </Stack>
    </MainStatsContext.Provider >
  )
}

function QueueBar() {
  const [queueList, setQueueList] = useState<QueueCountType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestQueueList = await fetchQueueCount();
        setQueueList([...Array(5).fill(latestQueueList).flat()]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, []); // Empty dependency array ensures this runs only once  

  return <Box
    display={"flex"}
    flexDirection={"column"}
    justifyContent="flex-start"
    alignItems="flex-start"
    width={"90%"}
    m={"auto"}
  >
    <Typography>
      Waiting In Queue
    </Typography>
    <Box
      display={"flex"}
      justifyContent="flex-start"
      alignItems="center"
      columnGap={2}
      flexWrap={"wrap"}
      mx={2}
      sx={{
      }}
    >
      {queueList.map(
        (data) => {
          return <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent="flex-start"
            alignItems="center"
            padding={2}
          >
            <Typography>
              {data.count}
            </Typography>
            <Typography>
              {data.state}-{data.filingType}
            </Typography>
          </Box>
        }
      )}
    </Box>
  </Box>
}


const selectedDateFilerStyle = (theme: any) => ({
  "backgroundColor": theme.palette.company.zb_main,
  "color": "black",
  "& button": {
    "color": "black",
  }
});


function TimePeriodBar(
  {
    startDateTime, endDateTime,
    setStartDateTime, setEndDateTime,
    dateButtonText, setDateButtonText
  }) {

  const timeZone = 'America/Los_Angeles';

  const handleStartDateTimeChange = (newValue) => {
    setStartDateTime(newValue.unix());
    setDateButtonText("dateRange");
  };

  const handleEndDateTimeChange = (newValue) => {
    setEndDateTime(newValue.unix());
    setDateButtonText("dateRange");
  };

  const handleSingleDateTimeChange = (buttonText: string) => {
    const losAngelesTime = dayjs().tz(timeZone).startOf('day');
    const epochStartTime = losAngelesTime.unix();

    if (buttonText == "Today") {
      setStartDateTime(epochStartTime);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("Today");
    }
    else if (buttonText == "2d") {
      setStartDateTime(epochStartTime - 86400);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("2d");
    }
    else if (buttonText == "7d") {
      setStartDateTime(epochStartTime - (6 * 86400));
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("7d");
    }
    else {
      setStartDateTime(epochStartTime);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("Today");
    }

  }
  return (
    <Box
      display={"flex"}
      sx={{
        flexDirection: { xl: "row", lg: "row", md: "column", sm: "column", xs: "column" },
        width: "100%",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        sx={{
          p: 1,
          borderRadius: "10px"
        }}
      >
        <Typography variant="h5">{formatDateFromEpoch(startDateTime)} - {formatDateFromEpoch(endDateTime)}</Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent="flex-start"
        alignItems="center"
        columnGap={0.75}
        sx={{
          "& > div": {
            maxHeight: "50px",
            borderRadius: "15px",
            textAlign: "center",
            px: 1,
            py: 0.5,
            border: "1px solid transparent",
          },
          "&> div:hover": {
            border: "1px solid cyan",
            cursor: "pointer"
          },
        }}
      >
        <Box sx={(theme) => ({
          ...(dateButtonText === "Today") && selectedDateFilerStyle(theme)
        })}
          onClick={() => handleSingleDateTimeChange("Today")}>
          <Typography variant='h5' textAlign={"center"}>Today</Typography>
        </Box>
        <Box sx={(theme) => ({
          ...(dateButtonText === "2d") && selectedDateFilerStyle(theme)
        })}

          onClick={() => handleSingleDateTimeChange("2d")}>
          <Typography variant='h5' textAlign={"center"}>2d</Typography>
        </Box>
        <Box sx={(theme) => ({
          ...(dateButtonText === "7d") && selectedDateFilerStyle(theme)
        })}
          onClick={() => handleSingleDateTimeChange("7d")}>
          <Typography variant='h5' textAlign={"center"}>7d</Typography>
        </Box>
        <Box sx={(theme) => ({
          ...(dateButtonText === "dateRange") && selectedDateFilerStyle(theme)
        })}
        >
          <MUIDateTimeRangePicker
            handleEndDateTimeChange={handleEndDateTimeChange}
            handleStartDateTimeChange={handleStartDateTimeChange}
            timeZone={timeZone}
          />
        </Box>
      </Box>
    </Box>
  );
}


function getCurrentRpaData(rpaListings: RpaListingsType, rpaSlug: string | undefined) {
  for (const [_, rpasList] of Object.entries(rpaListings)) {
    // console.log("state, rpasList", state, rpasList)
    for (const rpaData of rpasList) {
      if (rpaData.slug === rpaSlug) {
        return rpaData
      }
    }
  }

  return {}
}