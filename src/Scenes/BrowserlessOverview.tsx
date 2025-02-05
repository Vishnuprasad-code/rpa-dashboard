import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { AltBox } from "../Components/StyledComponents/styledBox.tsx"


import chromeIcon from '../assets/chrome.png';
import { fetchBrowserlessStats } from '../Http/http.ts';
import CustomSkeleton from '../Components/LoadingAnimation/Skeleton.tsx';
import CustomSwiperCarousel from '../Components/Carousel/SwiperCarousel.tsx';


export default function BrowserlessOverview() {
    const [dataList, setDataList] = useState<any[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataList = await fetchBrowserlessStats();
                setDataList(dataList);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData()
        const intervalId = setInterval(() => {
            fetchData();
        }, 120000); // 120 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs only once

    if (dataList === null) {
        return <CustomSkeleton />
    }

    const cardsToRender = dataList.map((data) => <BrowserlessOverviewCard data={data} />)
    return <AltBox
        sx={{
            width: "100%",
            height: "100%",
        }}
    >
        <CustomSwiperCarousel slides={cardsToRender} slidesPerView={1} autoplayDelay={10000} />

    </AltBox >
};


interface BrowserlessOverviewCardPropsType {
    ip: string,
    version: string,
    region: string,
    maxTime: string,
    minTime: string,
    avgTime: string,
}


function BrowserlessOverviewCard(
    { data }: { data: BrowserlessOverviewCardPropsType }
) {
    return <Box
        sx={{
            mx: "1rem",
            height: "100%",
            display: "flex",
            flexDirection: 'column',
            justifyContent: "space-between",
            alignContent: "space-between"
        }}
    >
        <Typography height={"20%"} variant="h4" m={"auto"} align="center">
            BROWSERLESS STATS
        </Typography>

        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: 'column',
                justifyContent: "space-between",
                alignItems: "space-between",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    height: "100%",
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 5,
                    order: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <img style={{ width: "30px", height: "30px", marginRight: "5px" }} src={chromeIcon} alt="" />
                    <Typography variant='h4'>{data.version}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "flex-end",
                        alignContent: "flex-end",
                        rowGap: 1,
                    }}
                >
                    <Typography noWrap variant="h5" align="left">Region: {data.region}</Typography>
                    <Typography
                        sx={(theme) => ({
                            position: "relative",
                            "&::before": {
                                position: "absolute",
                                content: '""',
                                inset: "10% 12% 10% 40%",
                                backgroundColor: theme.palette.text.primary,
                                backdropFilter: "blur(10px)",
                            }
                        })}
                        variant="h5" align="left">IP: {data.ip}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="h3" align="center">
                        {data.maxTime}
                    </Typography>
                    <Typography variant="h5" align="center">
                        Max Time
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h3" align="center">
                        {data.avgTime}
                    </Typography>
                    <Typography variant="h5" align="center">
                        Avg Time
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h3" align="center">
                        {data.minTime}
                    </Typography>
                    <Typography variant="h5" align="center">
                        Min Time
                    </Typography>
                </Box>
            </Box>
        </Box>

    </Box >
};