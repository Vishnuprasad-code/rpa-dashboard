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
import { AltBox } from '../Components/StyledComponents/styledBox.tsx';


dayjs.extend(utc);
dayjs.extend(timezone);


export default function RpasOverview() {
  const params = useParams();
  const { setSelectedTab, rpaListings } = useContext(DashboardContext);
  const currentUrlRpaId = params.rpaSlug ?? "all";
  // const [currentUrlState, setCurrentUrlState] = useState<string>("all")
  setSelectedTab("RPAs");

  const timeZone = 'America/Los_Angeles';

  const losAngelesTime = dayjs().tz(timeZone).startOf('day');
  const epochStartTime = losAngelesTime.unix();
  const currentRpaData = getCurrentRpaData(rpaListings, currentUrlRpaId)

  const [startDateTime, setStartDateTime] = useState<number>(epochStartTime);
  const [endDateTime, setEndDateTime] = useState<number>(epochStartTime + 86400);
  const [dateButtonText, setDateButtonText] = useState<string>("Today")
  const [mainStatsData, setMainStatsData] = useState<MainStatsDataType | null>(null)

  const fetchData = async () => {
    try {
      const latestMainStatsData = await fetchLatestMainStatsData(currentUrlRpaId, startDateTime, endDateTime);
      setMainStatsData(latestMainStatsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMainStatsData(null);
    fetchData();

  }, [startDateTime, endDateTime, currentUrlRpaId]); // Empty dependency array ensures this runs only once  

  const handleStartDateTimeChange = (newValue: dayjs.Dayjs | null) => {
    setStartDateTime(newValue!.unix());
    setDateButtonText("dateRange");
  };

  const handleEndDateTimeChange = (newValue: dayjs.Dayjs | null) => {
    setEndDateTime(newValue!.unix());
    setDateButtonText("dateRange");
    // setMainStatsData(null);
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

    // setMainStatsData(null);
  }

  return (
    <MainStatsContext.Provider value={{ mainStatsData: mainStatsData, setMainStatsData: setMainStatsData }}>
      <Stack
        sx={{
          "& .MuiAccordion-root": {
            width: "100%",
            backgroundColor: "transparent"
          },
          "& .MuiAccordionDetails-root": {
            padding: "0",
          }
        }}
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
            width: "95%",
            height: "50px"
          }}
        >
          <Typography variant='h4' textAlign="left" sx={{}}>
            Summary of {currentUrlRpaId?.toUpperCase()}
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
        <QueueBar rpaId={currentUrlRpaId} />
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
          handleStartDateTimeChange={handleStartDateTimeChange}
          endDateTime={endDateTime}
          handleEndDateTimeChange={handleEndDateTimeChange}
          dateButtonText={dateButtonText}
          handleSingleDateTimeChange={handleSingleDateTimeChange}
          timeZone={timeZone}
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
              {(!mainStatsData) ? <Box sx={{ width: "100%", height: "60px" }}><CustomSkeleton /></Box> : <AllRpaBar />}
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

function QueueBar({ rpaId }: { rpaId: string }) {
  const [queueList, setQueueList] = useState<QueueCountType[] | null>(null)

  const fetchData = async () => {
    try {
      const latestQueueList = await fetchQueueCount(rpaId);
      setQueueList(latestQueueList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(() => {
      console.log("Sending request......")
      fetchData();
    }, 45000); // 45 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [rpaId]); // Empty dependency array ensures this runs only once

  if (!queueList) return <Box sx={{ width: "100%", height: "5rem" }}><CustomSkeleton /></Box>

  let totalQueueCount = getTotalQueueCount(queueList)
  return <Box
    display={"flex"}
    flexDirection={"column"}
    justifyContent="flex-start"
    alignItems="flex-start"
    width={"99%"}
    m={"auto"}
  >
    <Box
      display={"flex"}
      justifyContent="flex-start"
      alignItems="center"
      columnGap={2}
      flexWrap={"wrap"}
      // mx={2}
      sx={{
      }}
    >
      <Typography variant='h1'
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5rem",
          minWidth: "5rem",
          borderRadius: "50%",
          border: `1px solid ${theme.palette.text.primary}`,
        })}>
        {totalQueueCount ?? 0}
      </Typography>
      <Typography sx={{
        width: "3rem",
        textAlign: "center"
      }}>
        Waiting In Queue
      </Typography>
      {queueList.map(
        (data) => {
          return <AltBox
            display={"flex"}
            flexDirection={"column"}
            justifyContent="flex-start"
            alignItems="center"
            sx={(theme) => ({
              px: "0 !important",
              py: "5px !important",
              height: "5rem",
              width: "7rem",
              borderRadius: "5px",
              border: `0.01px dotted ${theme.palette.text.primary}`,
              rowGap: "10px"
            })}
          >
            <Box
              sx={(theme) => ({
                width: "100%",
                borderBottom: `0.25px solid ${theme.palette.text.primary}`,
                overflow: "hidden",
              })}>
              <Typography sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                px: "1rem",
                m: "auto",
                textAlign: "center",
                flex: "0 1",
                textTransform: 'uppercase',
                "@keyframes to-and-fro": {
                  "0%": {
                    transform: "translateX(0)"
                  },
                  "50%": {
                    transform: "translateX(-100%)"
                  },
                  "100%": {
                    transform: "translateX(0)"
                  }
                },
                "&:hover": {
                  overflow: "visible",
                  textOverflow: "normal",
                  animation: "to-and-fro 10s linear infinite"
                }
              }}
              >
                {data.state}-{data.filingType}
              </Typography>
            </Box>
            <Typography
              variant='h2'
              sx={{
                flex: "1 0"
              }}>
              {data.count}
            </Typography>
          </AltBox>
        }
      )}
    </Box>
  </Box >
}


const selectedDateFilerStyle = (theme: any) => ({
  "backgroundColor": theme.palette.company.zb_main,
  "color": "black",
  "& button": {
    "color": "black",
  }
});


interface TimePeriodBarPropsType {
  startDateTime: number;
  endDateTime: number;
  handleStartDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
  handleEndDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
  dateButtonText: string;
  handleSingleDateTimeChange: (newValue: string) => void;
  timeZone: string
}

function TimePeriodBar(
  {
    startDateTime, endDateTime,
    handleStartDateTimeChange, handleEndDateTimeChange,
    dateButtonText, handleSingleDateTimeChange,
    timeZone
  }: TimePeriodBarPropsType) {

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


interface MUIDateTimeRangePickerPropsType {
  handleStartDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
  handleEndDateTimeChange: (newValue: dayjs.Dayjs | null) => void;
  timeZone: string;
}

const MUIDateTimeRangePicker = (
  { handleStartDateTimeChange,
    handleEndDateTimeChange,
    timeZone
  }: MUIDateTimeRangePickerPropsType) => {
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


function getTotalQueueCount(queueList: QueueCountType[]) {
  let result = queueList.reduce((acc, obj) => { return acc + (obj.count ?? 0); }, 0);
  return result

}