import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Divider } from '@mui/material';


import { AltBox } from "../Components/StyledComponents/styledBox.tsx"
import CustomSwiperCarousel from "../Components/Carousel/SwiperCarousel.tsx"
import CustomSkeleton from "../Components/LoadingAnimation/Skeleton.tsx"


import capsolverIcon from '../assets/capsolver.png';
import { fetchCaptchaBalance } from "../Http/http.ts";



export interface CaptchaBalanceDataType {
  captchaSolver: string;
  balanceRemaining: string
}


export default function CaptchaBalance() {
  const [dataList, setDataList] = useState<CaptchaBalanceDataType[] | null>(null)

  const fetchData = async () => {
    try {
      const dataList = await fetchCaptchaBalance();
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

  const cardsToRender = dataList.map((data) => <CaptchaBalanceCard data={data} />)
  return <AltBox
    sx={{
      width: "100%",
      height: "100%",
    }}
  >

    <CustomSwiperCarousel slides={cardsToRender} slidesPerView={1} autoplayDelay={10000} />

  </AltBox >

}


function CaptchaBalanceCard(
  { data }: { data: CaptchaBalanceDataType }
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
      BALANCE REPORT
    </Typography>

    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        "& > .MuiBox-root": {
          display: "flex",
          width: "50%",
          height: "100%",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center"
        }
      }}
    >
      <Box
      >
        <img
          width={"50px"}
          height={"50px"}
          src={capsolverIcon} alt="" />
        <Typography variant='h4'>{data.captchaSolver}</Typography>
      </Box>
      <Divider orientation="vertical" variant='middle' sx={{ height: "80%", mr: "-2px", border: (theme) => `0.5px solid ${theme.palette.divider}`, }}></Divider>
      <Box>
        <Typography variant='h1'>{data.balanceRemaining} $</Typography>
        <Typography variant='h6'>Remaining</Typography>
      </Box>
    </Box>

  </Box>
};