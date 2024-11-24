import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { Box } from '@mui/material';
import { AltBox } from "../Components/StyledComponents/styledBox.tsx"


import chromeIcon from '../assets/chrome.png';
import { fetchBrowserlessStats } from '../Http/http.ts';
import CustomSkeleton from '../Components/LoadingAnimation/Skeleton.tsx';
import CustomSwiperCarousel from '../Components/Carousel/SwiperCarousel.tsx';


export default function BrowserlessOverview() {
    const [dataList, setDataList] = useState<any[] | null>(null)

    const fetchData = async () => {
        try {
            const dataList = await fetchBrowserlessStats();
            setDataList(dataList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
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
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: 'column',
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
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography>IP: {data.ip}</Typography>
                <Box
                    sx={{ display: "flex", }}>
                    <img style={{ display: "inline-block", width: "20px", height: "20px" }} src={chromeIcon} alt="" />
                    <Typography>: {data.version}</Typography>
                </Box>
                <Typography>Region: {data.region}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
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

    </Box>
};