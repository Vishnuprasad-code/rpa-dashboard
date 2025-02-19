import {
    Box, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography
    // Accordion,AccordionDetails, AccordionSummary 
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CustomLineChart from "../Components/Charts/LineChart";
import CustomHeatMap from "../Components/Charts/HeatMap";
import { fetchsolveCaptchaHeatMapData, fetchsolveCaptchaOverallData } from "../Http/http";

import shLogo from '../assets/sh_1_optimized.png';

import dayjs from 'dayjs';


import SolveCaptchaTotalPie from "../Scenes/SolveCaptchaTotalPie";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimePeriodBar from "../Components/TimePeriodBar/CustomTimePeriodBar";
import { GlossyBox } from "../Components/StyledComponents/styledBox";
import { DashboardContext } from "../Contexts/DashboardContext";
import CustomSkeleton from "../Components/LoadingAnimation/Skeleton";
import { interval } from "date-fns";

export default function SolveCaptchaOverview() {

    const { setSelectedTab } = useContext(DashboardContext);
    useEffect(() => {
        setSelectedTab("MCS");
    }, []);

    const timeZone = 'America/Chicago';
    const losAngelesTime = dayjs().tz(timeZone).startOf('day');
    const epochStartTime = losAngelesTime.unix();
    const [startDateTime, setStartDateTime] = useState<number>(epochStartTime);
    const [selectedDateButtonText, setSelectedDateButtonText] = useState<string>("Today")

    const handleStartDateTimeChange = (newValue: dayjs.Dayjs | null) => {
        setStartDateTime(newValue!.unix());
        setSelectedDateButtonText("dateRange");
    };

    const handleSingleDateTimeChange = (buttonText: string) => {
        const losAngelesTime = dayjs().tz(timeZone).startOf('day');
        const epochStartTime = losAngelesTime.unix();

        if (buttonText == "Today") {
            setStartDateTime(epochStartTime);
            setSelectedDateButtonText("Today");
        }
    }

    return <Stack
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
        spacing={2}
        alignItems={'center'}
        justifyContent={'flex-start'}
    >
        <TopBar startDateTime={startDateTime}
            handleStartDateTimeChange={handleStartDateTimeChange}
            selectedDateButtonText={selectedDateButtonText}
            handleSingleDateTimeChange={handleSingleDateTimeChange}
        />
        <Divider
            variant='middle'
            flexItem
            sx={{
                m: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
            }}>
        </Divider>
        <OverallStats startDateTime={startDateTime} />
        <Divider
            variant='middle'
            flexItem
            sx={{
                m: 2,
                border: (theme) => `1px solid ${theme.palette.divider}`,
            }}>
        </Divider>
        <ActivityHeatMap startDateTime={startDateTime} />
        {/* <Accordion defaultExpanded>
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
                        height: "22rem",
                        width: "100%",
                    }}
                >
                    {solveCaptchaData && <CustomHeatMap data={solveCaptchaData} />}
                </Box>
            </AccordionDetails>
        </Accordion> */}
    </Stack >
};


function TopBar(props: any) {
    const timeZone = 'America/Chicago';
    const buttonTextsArray = [
        "Today",
    ]
    return <Box
        sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            columnGap: 2,
            width: "100%",
            height: "50px",

            flex: "0 0",
        }}
    >
        <Typography
            variant='h4' textAlign="center" sx={{
                flex: "0 0 auto",
                width: "30rem",
                // margin: "auto",
            }}>
            Manual Captcha Solver Stats
            <a
                href="https://solvecaptcha.scrapehero.com/"
                target='blank'
            >
                <img
                    alt="nest_link"
                    width="20px"
                    height="20px"
                    src={shLogo}
                    style={{ marginLeft: "2rem", cursor: "pointer" }}
                /></a>
        </Typography>
        <TimePeriodBar
            startDateTime={props.startDateTime}
            handleStartDateTimeChange={props.handleStartDateTimeChange}
            endDateTime={props.startDateTime + 86400}
            handleEndDateTimeChange={null}
            selectedDateButtonText={props.selectedDateButtonText}
            buttonTextsArray={buttonTextsArray}
            handleSingleDateTimeChange={props.handleSingleDateTimeChange}
            timeZone={timeZone}
        />
    </Box>
}


function OverallStats(props: any) {
    const [solveCaptchaData, setSolveCaptchaData] = useState<any | null>(null)
    const [isLoading, setIsloading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true);
                const latestSolveCaptchaData = await fetchsolveCaptchaOverallData(props.startDateTime);
                setSolveCaptchaData(latestSolveCaptchaData);
            } catch (error) {
                console.log(error);
            }
            setIsloading(false);
        };

        fetchData();

    }, [props.startDateTime]);

    return <>
        <Box
            sx={{
                height: "20rem",
                width: "100%",
                display: "flex",
                alignItems: 'flex-start',
                justifyContent: 'flex-start',

            }}>
            <Box
                sx={{
                    height: "20rem",
                    width: "30rem",
                }}
            >
                {!isLoading ? <SolveCaptchaTotalPie data={solveCaptchaData} /> : <CustomSkeleton />}
            </Box>
            <Divider
                variant='middle'
                orientation="vertical"
                flexItem
                sx={{
                    margin: "0 1rem",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                }}>
            </Divider>
            <Box
                sx={{
                    height: "20rem",
                    // maxWidth: "66%",

                    flex: "1 0 auto",

                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: "column"
                }}
            >
                {!isLoading ? <>
                    <Typography variant="h5" align="center">
                        Solve Time Variations
                    </Typography>
                    <GlossyBox
                        sx={{
                            height: "100%",
                        }}>
                        {solveCaptchaData && (solveCaptchaData.lineGraphData.length ?? 0) > 0 ? <CustomLineChart data={solveCaptchaData.lineGraphData} /> : "N/A"}
                    </GlossyBox></> : <CustomSkeleton />
                }

            </Box>
        </Box>
    </>
}


function ActivityHeatMap({ startDateTime }: { startDateTime: number }) {

    const [heatMapData, setheatMapData] = useState<any>(null)
    const [heatmapTimeInterval, setHeatmapTimeInterval] = useState<string>("0.5")
    const [isLoading, setIsloading] = useState<boolean>(true);

    const optionsValueLabelMap: { [k: string]: string } = {
        "0.5": "30 min",
        "1": "1 hr",
        "2": "2 hrs",
        "4": "4 hrs",
        "8": "8 hrs",
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true);
                const fetchedHeatMapData = await fetchsolveCaptchaHeatMapData(startDateTime, Number(heatmapTimeInterval));
                setheatMapData(fetchedHeatMapData);
            } catch (error) {
                console.log(error);
            }
            setIsloading(false);
        };

        fetchData();

    }, [startDateTime, heatmapTimeInterval]);

    const handleChange = (event: SelectChangeEvent) => {
        setHeatmapTimeInterval(event.target.value as string);
    };

    return <Box
        sx={{
            height: "26rem",
            width: "100%",

            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: "column",

            position: "relative",
            // border: "1px solid grey"
        }}
    >
        {!isLoading ? <>
            <IntervalSelectComponent value={heatmapTimeInterval} label={optionsValueLabelMap[heatmapTimeInterval]} onSelect={handleChange} />
            <Typography variant="h5" align="center">
                Solve Captcha Activity Heatmap
            </Typography>
            <GlossyBox
                sx={{
                    height: "100%",
                }}>
                {heatMapData && (heatMapData.heatMapData.length ?? 0) > 0 ? <CustomHeatMap data={heatMapData.heatMapData} /> : "N/A"}
            </GlossyBox>
        </> : <CustomSkeleton />}
    </Box >
}

interface IntervalSelectComponentType {
    label: string,
    value: string,
    onSelect: (event: SelectChangeEvent) => void
}


function IntervalSelectComponent(props: IntervalSelectComponentType) {

    return (
        <FormControl sx={(theme) => ({
            m: 0,
            minWidth: 120,

            position: "absolute",
            top: -5,
            right: -5,

            zIndex: 1000,

            "& .MuiInputLabel-root": {
                color: theme.palette.text.primary
            }
        })} size="small">
            <InputLabel id="interval-input">Interval</InputLabel>
            <Select
                labelId="interval-input"
                id="interval-input-select"
                value={props.value}
                label={props.label}  // "Age"
                onChange={props.onSelect}
            >
                <MenuItem value={0.5}>30 min</MenuItem>
                <MenuItem value={1}>1 hr</MenuItem>
                <MenuItem value={2}>2 hrs</MenuItem>
                <MenuItem value={4}>4 hrs</MenuItem>
                <MenuItem value={8}>8 hrs</MenuItem>
            </Select>
        </FormControl>
    );
}