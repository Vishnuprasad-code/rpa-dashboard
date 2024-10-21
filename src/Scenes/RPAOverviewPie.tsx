import Typography from '@mui/material/Typography';

import {GlossyBox} from "../components/StyledComponents/styledBox.tsx"

import {CustomResponsivePie} from "../components/Charts/PieChartCircle.tsx"

import { useContext } from 'react';

import { MainStatsContext } from '../Contexts/mainStatsContext.tsx';

export default function RPAOverviewPie(){
    const {mainStatsData} = useContext(MainStatsContext);
    const { totalCount, successCount, failedCount } = mainStatsData;
    const pieChartData = [
        {
          id: "success",
          label: "success",
          value: successCount,
        },
        {
          id: "failed",
          label: "failed",
          value: failedCount,
        },
      ];
    
    const centeredText = `${(successCount * 100 / totalCount).toFixed(0) || 0}%`
    return <GlossyBox
        sx={
        {
            flexDirection: 'column',
            paddingTop: 2,
            "& > div": {
            flexBasis: 'auto'
            }
        }
        }>
      <Typography variant="h5" m={"auto"} align="center">
        Success-Failure Overview
      </Typography>
      <CustomResponsivePie data={pieChartData} centeredText={centeredText}/>
    </GlossyBox>
};