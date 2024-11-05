import {useContext, useEffect, useState} from 'react';


import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useParams } from 'react-router-dom';

import {GlossyBox} from '../Components/StyledComponents/styledBox.tsx'


import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { TextField } from '@mui/material';
// import {Button} from "@mui/material";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



import AllRpaBar from "../Scenes/BarChart.tsx"
import Table from "../Scenes/Table.tsx"

import {formatDateFromEpoch} from "../Utils/utils.ts"


import { MainStatsContext } from '../Contexts/mainStatsContext.tsx';
import { DashboardContext } from "../Contexts/DashboardContext.tsx"
import {fetchLatestMainStatsData, fetchQueueCount} from '../Http/http.ts'
import {MainStatsDataType, QueueCountType} from '../Types/types.ts'
import CustomSkeleton from '../Components/LoadingAnimation/Skeleton.tsx';


dayjs.extend(utc);
dayjs.extend(timezone);



const MUIDateTimeRangePicker = ({handleStartDateTimeChange, handleEndDateTimeChange, timeZone}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.tz.setDefault(timeZone)}>
        <DateTimePicker
          // label="Start Date & Time"
          // value={startDateTime}
          onChange={handleStartDateTimeChange}
          sx={{
            "& input":{
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
            "& input":{
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

export default function RpasOverview(){
  const params = useParams();
  const {setSelectedTab}= useContext(DashboardContext);
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
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const latestMainStatsData = await fetchLatestMainStatsData(params.rpaId, startDateTime, endDateTime);
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
      <MainStatsContext.Provider value={{ mainStatsData: mainStatsData,  setMainStatsData: setMainStatsData}}>
    <Stack
        sx={
            (theme) => ({
                // bgcolor: theme.palette.primary.dark,
                // overflow: 'hidden',
                // minHeight: "80vh",
            "& .MuiAccordion-root":{
              width: "100%",
              backgroundColor: "transparent"
            },
            "& .MuiAccordionDetails-root":{
              padding: "0",
            }
            })
        }
        m="20px 10px"
        spacing={1}
        alignItems={'center'}
        justifyContent={'flex-start'}
    >  
      <QueueBar/>
      <Divider
      variant='middle'
      flexItem
      sx={{
        m: 2,
        border: (theme) => `1px solid ${theme.palette.divider}`,}}>
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
          <Typography textAlign={"center"}>GRAPH</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box
          sx={{
            height: "20rem",
            width: "100%",
          }}
      >
        {(mainStatsData && !isLoading)? <AllRpaBar/> : <Box sx={{width: "100%", height: "60px"}}><CustomSkeleton/></Box>}
      </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography textAlign={"center"}>TABLE</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {mainStatsData? <Table isPaused={true} isFullTable={true}/> : <Box sx={{width: "100%", height: "60px"}}><CustomSkeleton/></Box>}
        </AccordionDetails>
      </Accordion>
        </Stack>
      </MainStatsContext.Provider>
    )
  }

function QueueBar(){
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
      width={"80%"}
      m={"auto"}
    >
      <Typography mx={2}>
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

function TimePeriodBar(
  {
    startDateTime, endDateTime,
    setStartDateTime, setEndDateTime,
    dateButtonText, setDateButtonText
  }){

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

    if (buttonText == "Today"){
      setStartDateTime(epochStartTime);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("Today");
    }
    else if (buttonText == "2d") {
      setStartDateTime(epochStartTime - 86400);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("2d");
    }
    else if (buttonText == "7w") {
      setStartDateTime(epochStartTime - (6 * 86400));
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("7w");
    }
    else {
      setStartDateTime(epochStartTime);
      setEndDateTime(epochStartTime + 86400);
      setDateButtonText("Today");
    }

  }
    return  (
      <Box
      display={"flex"}
      sx={{
        flexDirection: { xl: "row", lg: "row", md: "column", sm: "column", xs: "column"},
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
                maxHeight: "35px",
                borderRadius: "10px",
                textAlign: "center",
                p: 0.5,
                border: "1px solid transparent",
              },
              "&> div:hover": {
                border: "1px solid cyan",
              },
              "&> div:active": {
                backgroundColor: "blue",
              },
            }}
        >
          <Box sx={{
            ...(dateButtonText === "Today") && {backgroundColor: "blue",}
          }} 
          onClick={()=> handleSingleDateTimeChange("Today")}>Today</Box>
          <Box sx={{
            ...(dateButtonText === "2d") && {backgroundColor: "blue",}
          }} 

          onClick={()=> handleSingleDateTimeChange("2d")}>2d</Box>
          <Box sx={{
            ...(dateButtonText === "7w") && {backgroundColor: "blue",}
          }} 
          onClick={()=> handleSingleDateTimeChange("7w")}>7w</Box>
          <Box sx={{
            ...(dateButtonText === "dateRange") && {backgroundColor: "blue",}
          }} 
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
