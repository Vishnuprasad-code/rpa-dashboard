import Typography from '@mui/material/Typography';

import { AltBox } from "../Components/StyledComponents/styledBox.tsx"

import { CustomResponsivePie } from "../Components/Charts/PieChartCircle.tsx"

import { useContext } from 'react';

import { MainStatsContext } from '../Contexts/mainStatsContext.tsx';
import CustomSkeleton from '../Components/LoadingAnimation/Skeleton.tsx';

export default function RPAOverviewPie() {
  const { mainStatsData } = useContext(MainStatsContext);

  if (!mainStatsData) return <CustomSkeleton />

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
  return <AltBox
    sx={{
      display: "flex",
      width: "100%",
      height: "100%",
      flexDirection: 'column',
      paddingTop: 2,
      "& > div": {
        flexBasis: 'auto'
      }
    }
    }>
    <Typography variant="h4" m={"auto"} align="center">
      Success - Failure Overview
    </Typography>
    <CustomResponsivePie data={pieChartData} centeredText={centeredText} />
  </AltBox>
};