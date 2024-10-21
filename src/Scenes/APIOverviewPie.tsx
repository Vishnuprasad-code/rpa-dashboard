import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import {AltBox} from "../components/StyledComponents/styledBox.tsx"

import {CustomResponsivePie} from "../components/Charts/PieChartCircle.tsx"


export default function APIOverviewPie(){
    const data = {
        total_success_calls: 200,
        total_failed_calls: 2,
        avg_response_time: "2m 60s",
    }
    const successCount = data.total_success_calls ?? 0
    const failedCount = data.total_failed_calls ?? 0
    const avg_response_time = data.avg_response_time ?? 0
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
    return <AltBox
        display={"flex"}
        width={"100%"} height={"100%"}
        sx={{
            flexDirection: 'column',
        }}
        >
      <Typography height={"20%"} variant="h5" m={"auto"} align="center">
        LLC FORMATION API
      </Typography>
      <Box
        display={"flex"}
        width={"100%"} height={"80%"}
        sx={{
            flexDirection: 'row',
            justifyContent: "flex-start",
            alignItems: "center"
        }}
        >
            <Box 
                sx={{
                    flex: "0 0 50%",
                    width: "50%",
                    height: "100%",
                }}
            >
              <CustomResponsivePie data={pieChartData} centeredText={centeredText} bottomMargin={30}/>
            </Box>
            <Box 
                display={"flex"}
                py={2}
                sx={{
                    flex: "0 0 50%",
                    width: "50%",
                    height: "100%",
                    flexDirection: 'row',
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 2,
                }}
            >
                <Box>
                    <Typography variant="h3" align="center">
                    {totalCount}
                    </Typography>
                    <Typography variant="h5" align="center">
                    Total Calls
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h3" align="center">
                        {avg_response_time}
                    </Typography>
                    <Typography variant="h5" align="center">
                        Avg Time
                    </Typography>
                </Box>
            </Box>
      </Box>
    </AltBox>
};