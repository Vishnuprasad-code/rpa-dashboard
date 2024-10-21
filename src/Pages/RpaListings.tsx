import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Grid from '@mui/material/Grid2';

import { data } from "./TpaListingsMockData";

import { Link } from 'react-router-dom';

import {GlossyBox} from '../components/StyledComponents/styledBox.tsx'


import { useState, useEffect } from 'react';
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
import {fetchLatestMainStatsData, fetchQueueCount} from '../Http/http.ts'
import {mainStatsDataType, QueueCountType} from '../Types/types.ts'


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
  const timeZone = 'America/Los_Angeles';
  const losAngelesTime = dayjs().tz(timeZone).startOf('day');
  const epochStartTime = losAngelesTime.unix();

  const [startDateTime, setStartDateTime] = useState<number>(epochStartTime);
  const [endDateTime, setEndDateTime] = useState<number>(epochStartTime + 86400);
  const [dateButtonText, setDateButtonText] = useState<string>("Today")
  const [mainStatsData, setMainStatsData] = useState<mainStatsDataType>(
    {
      "totalCount": 0,
      "successCount": 0,
      "failedCount": 0,
      "failedFilings": [],
      "graphData": []
    }
  )
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const latestMainStatsData = await fetchLatestMainStatsData(startDateTime, endDateTime);
          setMainStatsData(latestMainStatsData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
  
    }, [startDateTime, endDateTime]); // Empty dependency array ensures this runs only once  

    return (
      <MainStatsContext.Provider value={{ mainStatsData: mainStatsData,  setMainStatsData: setMainStatsData}}>
    <Stack
        sx={
            (theme) => ({
                // bgcolor: theme.palette.primary.dark,
                overflow: 'hidden'
            })
        }
        mx={1}
        spacing={1}
        alignItems={'center'}
        justifyContent={'space-between'}
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
        <Box
        sx={{
          height: "20rem",
          width: "100%",
        }}
        >
        <AllRpaBar/>
        </Box>
        <Table isPaused={true} isFullTable={true}/>
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


function RpaListings(){
  return  <Grid
  container
  justifyContent="flex-start"
  margin="1rem"
  spacing="1rem"
  alignItems="center"
>
{Object.keys(data).map((state) => (
  <Grid 
      size={{xl: 4, lg: 4, md: 6, sm: 6, xs: 6}}
      height="15rem"
      sx={{
          padding: 2,
          border: "1px solid yellow"
      }}
      key={state}
  >
    <Typography>{state}</Typography>
    <List
    sx={{
      // padding: 0,
      // margin: 0,
    }}>
    {data[state].map(item => (
      <ListItem
          component={Link}
          to=""
          sx={{
              padding: 0,
              margin: 1,
          }}
          >
          {item.label}
      </ListItem>
      ))}
    </List>
  </Grid>
))}
</Grid>
}