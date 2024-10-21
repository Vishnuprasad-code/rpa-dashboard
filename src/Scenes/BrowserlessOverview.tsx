import Typography from '@mui/material/Typography';
import {Divider} from '@mui/material';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import {AltBox} from "../components/StyledComponents/styledBox.tsx"


import chromeIcon from '../assets/chrome.png';


export default function BrowserlessOverview(){
    const data = {
        ip: "172.16.220.134:3000",
        version: "chrome107",
        region: "Failover",
        max_time: "12",
        min_time: "1",
        avg_time: "6",
    }
    
    return (
    <Grid
        container
        sx={{
            height: "100%",
          }}
    >
        <Grid
          size={12}
          sx={{
            height: "10%",
          }}
        >
            <Typography align='center'>BROWSERLESS</Typography>
        </Grid>
        <Grid
          size={6}
          sx={{
            height: "90%",
            // border: "1px solid red"
          }}
        >
            <Stack
                sx={{
                    py: "25px",
                    height: "100%",
                    justifyContent: "space-between",
                    "& > div": {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }
                }}
            >
                <Box
                >
                    {/* <Typography align='center'>Region:</Typography> */}
                    <Typography align='center'>{data.region}</Typography>
                </Box>
                <Box
                >
                    <img style={{marginRight: "5px"}} src={chromeIcon} width="30px" height="30px" alt="" />
                    <Typography align='center'>{data.version}</Typography>
                </Box>
                <Box
                >
                    {/* <Typography align='center'>IP:</Typography> */}
                    <Typography align='center'>{data.ip}</Typography>
                </Box>
            </Stack>
        </Grid>
        <Divider orientation="vertical" variant='middle' sx={{ height: "80%", mr: "-2px", border: (theme) => `0.5px solid ${theme.palette.divider}`,}}></Divider>
        <Grid
          size={6}
          sx={{
            height: "90%",
            // border: "1px solid red"
          }}
        >
            <Stack
                sx={{
                    py: "25px",
                    height: "100%",
                    justifyContent: "space-between",
                    "& > div": {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }
                }}
            >
                <Box
                >
                    <Typography align='center'>Max Time</Typography>
                    <Typography align='center'>{data.max_time}</Typography>
                </Box>
                <Divider variant='middle' sx={{mb: "-2px", border: (theme) => `0.5px solid ${theme.palette.divider}`,}}></Divider>
                <Box
                >
                    <Typography align='center'>Average Time</Typography>
                    <Typography align='center'>{data.avg_time}</Typography>
                </Box>
                <Divider variant='middle' sx={{mb: "-2px", border: (theme) => `0.5px solid ${theme.palette.divider}`,}}></Divider>
                <Box
                >
                    <Typography align='center'>Min Time</Typography>
                    <Typography align='center'>{data.min_time}</Typography>
                </Box>
            </Stack>
        </Grid>
  </Grid>
    );
};