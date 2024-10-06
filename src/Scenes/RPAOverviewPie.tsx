import Typography from '@mui/material/Typography';
import { useTheme} from '@mui/material/styles';


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

    const CenteredText = ({ centerX, centerY }) => {
        const theme = useTheme();
        return (<text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: theme.palette.text.primary,
            fontSize: "1.75em",
            fontWeight: "bold",
          }}
        >
          {`${(successCount * 100 / totalCount).toFixed(0) || 0}`}%
        </text>
    );
    
    }
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
      <Typography component="h5" align="center">
        Success-Failure Overview
      </Typography>
      <CustomResponsivePie data={pieChartData} CenteredText={CenteredText}/>
    </GlossyBox>
};