import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import {Divider} from '@mui/material';

import {AltBox} from "../components/StyledComponents/styledBox.tsx"

import capsolverIcon from '../assets/capsolver.png';


export default function CaptchaBalance(){
    const data = {
        captcha_solver: "CAPSOLVER",
        balance: "5"
    }
    return <AltBox
        sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: 'column',
        }}
        >
      <Typography height={"20%"} variant="h5" m={"auto"} align="center">
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
            <Typography variant='h4'>{data.captcha_solver}</Typography>
        </Box>
        <Divider orientation="vertical" variant='middle' sx={{ height: "80%", mr: "-2px",border: (theme) => `0.5px solid ${theme.palette.divider}`,}}></Divider>
        <Box>
            <Typography variant='h1'>{data.balance} $</Typography>
        </Box>
      </Box>

      </AltBox>
};