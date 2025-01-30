import { useState, useEffect } from "react";

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import { AltBox } from "../Components/StyledComponents/styledBox.tsx"
import CustomSkeleton from "../Components/LoadingAnimation/Skeleton.tsx"

import { CustomResponsivePie } from "../Components/Charts/PieChartCircle.tsx"
import CustomSwiperCarousel from "../Components/Carousel/SwiperCarousel.tsx"
import { fetchAPIStatsData } from '../Http/http.ts';


export interface APIOverviewCardDataType {
    apiName: string
    totalSuccessCalls: number;
    totalFailedCalls: number;
    avgResponseTime: string;
}


export default function APIOverview() {
    const [dataList, setDataList] = useState<APIOverviewCardDataType[] | null>(null)

    const fetchData = async () => {
        try {
            const dataList = await fetchAPIStatsData();
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

    const cardsToRender = dataList.map((data) => <APIOverviewCard data={data} />)

    return <AltBox
        sx={{
            width: "100%",
            height: "100%",
        }}
    >

        <CustomSwiperCarousel slides={cardsToRender} slidesPerView={1} autoplayDelay={10000} />

    </AltBox >

}

export function APIOverviewCard(
    { data }: { data: APIOverviewCardDataType }
) {
    const apiName = data.apiName ?? "unknown"
    const successCount = data.totalSuccessCalls ?? 0
    const failedCount = data.totalFailedCalls ?? 0
    const avg_response_time = data.avgResponseTime ?? 0
    const totalCount = successCount + failedCount
    const pieChartData = [
        {
            id: "success",
            label: "200",
            value: successCount,
        },
        {
            id: "failed",
            label: "non-200",
            value: failedCount,
        },
    ];

    const centeredText = `${(successCount * 100 / totalCount).toFixed(0) || 0}%`
    return <Box
        display={"flex"}
        width={"100%"} height={"100%"}
        sx={{
            flexDirection: 'row',
            justifyContent: "flex-start",
            alignItems: "center"
        }}
    >
        <Box
            sx={{
                flex: "1 0 auto",
                width: "50%",
                height: "100%",
            }}
        >
            <Typography height={"20%"} variant="h4" margin="auto" align="center">
                {apiName}
            </Typography>
            <CustomResponsivePie data={pieChartData} centeredText={centeredText} topMargin={5} bottomMargin={80} />
        </Box>
        <Box
            sx={{
                // my: "auto",
                // marginLeft: "-35px",
                display: "flex",
                p: "3px",
                flex: "0 1 50%",
                width: "50%",
                height: "100%",
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                columnGap: 2,
            }}
        >
            <Box>
                <Typography variant="h2" align="center">
                    {totalCount}
                </Typography>
                <Typography variant="h5" align="center">
                    Total Calls
                </Typography>
            </Box>
            <Box>
                <Typography variant="h2" align="center">
                    {avg_response_time}
                </Typography>
                <Typography variant="h5" align="center">
                    Avg Time
                </Typography>
            </Box>
        </Box>
    </Box>
};