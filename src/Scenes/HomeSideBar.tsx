import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { DashboardContext } from "../Contexts/DashboardContext.tsx"

import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import Avatar from '@mui/material/Avatar';


import { useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import shLogo from '../assets/sh-logo-800.png';
import zbLogo from '../assets/circle-logo-teal.svg';
import companyLogo from '../assets/company.webp';

import SmartToyIcon from '@mui/icons-material/SmartToy';
import HomeIcon from '@mui/icons-material/Home';
import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';


import { Link } from 'react-router-dom';


const routes = [
    {   
        "route": "Home",
        "path": "/",
        "icon": <Avatar sx={
            {
                // bgcolor: "pink",
            }
        }>
            <HomeIcon fontSize="large" />
        </Avatar>
    },
    {
        "route": "RPAs",
        "path": "/rpas/all",
        "icon": <Avatar>
            <SmartToyIcon fontSize="large" />
        </Avatar>    }
    ,
    {
        "route": "APIs",
        "path": "/apis",
        "icon": <Avatar sx={
            {
                bgcolor: "pink",
            }
        }>
            <ApiIcon fontSize="large" />
        </Avatar>
    },
    {
        "route": "Docs",
        "path": "/docs",
        "icon": <Avatar sx={
            {
                bgcolor: "pink",
            }
        }>
            <ArticleIcon fontSize="large" />
        </Avatar>
    },
]


export default function HomeSideBar(){
    return (
    <Stack
        sx={
            (theme) => ({
                height: "100vh",
                pt: "5px",
                background: `linear-gradient(to top, ${theme.palette.primary.dark}66, ${theme.palette.primary.dark})`,  /* ROYAL */
                backdropFilter: 'saturate(100%) blur(4px)',  // Apply blur effect
                overflow: 'hidden'
            })
        }
        // mx={1}
        spacing={1}
        alignItems={'center'}
        justifyContent={'space-between'}
    >   
        <ProfileBox/>
        <SideMenu/>
        <CompanyBox/>
    </Stack>
    );
  }


function SideMenu(){
    const theme = useTheme();
  
    const {selectedTab, setSelectedTab}= useContext(DashboardContext);

    return (
        <AppBar
            position='relative'
            elevation={0}
            sx={{
                bgcolor: "transparent",
            }}
            >
            <Toolbar
                disableGutters
                sx={{
                    p: 0,
                }}
            >
                <Tabs
                    variant="fullWidth"
                    value={selectedTab}
                    sx={{
                        width: "100%",
                        '& .MuiTabs-indicator': { display: 'none' }
                    }}
                    orientation="vertical"
                >
                    {routes.map(
                        ({route, path, icon}) => <Tab
                                    component={Link}
                                    to={path}
                                    label={route}
                                    icon={icon}
                                    iconPosition='start'
                                    key={route}
                                    value={route}
                                    disableRipple
                                    onClick={() => {
                                        setSelectedTab(route);
                                    }}
                                    sx={{
                                        "& > .MuiTab-iconWrapper": {
                                            backgroundColor: theme.palette.text.primary,
                                            // border: "8px solid red"
                                        },
                                        "&.MuiTabs-indicator": {
                                            height: 0
                                        },
                                        "&.MuiTab-root": {
                                            fontSize: 14,
                                            fontWeight: "900",
                                            
                                        },
                                        "&.Mui-selected": {
                                            color: theme.palette.text.primary,
                                        },
                                        minWidth: "100%",
                                        justifyContent: "flex-start",
                                        columnGap: 2,
                                        pl: 2,
                                        overflow: "visible",
                                        position: 'relative',
                                        borderBottomLeftRadius: "50px",
                                        borderTopLeftRadius: "50px",
                                        ...((route === selectedTab) && {
                                            bgcolor: theme.palette.background.default,
                                            "&::before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                // bgcolor: "red",
                                                bgcolor: "transparent",
                                                height: "20px",
                                                width: "20px",
                                                right: "0",
                                                top: "-20px",
                                                borderBottomRightRadius: "20px",
                                                boxShadow: `5px 5px 0 5px ${theme.palette.background.default}`,
                                            },
                                            "&::after": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                // bgcolor: "red",
                                                bgcolor: "transparent",
                                                height: "20px",
                                                width: "20px",
                                                right: "0",
                                                bottom: "-20px",
                                                borderTopRightRadius: "20px",
                                                boxShadow: `5px -5px 0 5px ${theme.palette.background.default}`,
                                            }
                                        })
                                    }}
                                    />)
                    }
                </Tabs>
            </Toolbar>
        </AppBar>
    );
}

function ProfileBox(){
    return (
        <Box
        sx={{
            // border: "1px solid cyan",
            borderRadius: "1px",
            width: '100%',
        }}
        >
            <Typography
                variant="h2"
                sx={(theme)=>({
                    "mx": "auto",
                    "mt": "10px",
                    "pb": "10px",
                    "font-family": '"Protest Guerrilla", sans-serif',
                    "font-weight": "900",
                    "font-style": "normal",
                    "textAlign": "center",
                    "WebkitTextStroke": "0.5px",
                    "WebkitTextStrokeColor": theme.palette.primary.dark,
                    // "textShadow": "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    "textOrientation": {lg: 'sideways', md: 'upright', sm: "upright", xs: "upright"},
                    "writingMode": {lg: 'horizontal-tb', md: 'vertical-rl', sm: "vertical-rl", xs: "vertical-rl"},
                    "letter-spacing": {lg: "2px", md: '"2px"', sm: "-10px", xs: "-10px"}
                })}
            >
                <span
                    style={{
                        "color":"green",
                        "WebkitTextFillColor": "green",
                        // "WebkitTextStrokeColor": "white",

                    }}
                >
                    ZB
                </span>
                -
                <span style={{
                    "color":"blue",
                    "WebkitTextFillColor": "blue",
                    // "WebkitTextStrokeColor": "white",


                }}>
                    DASH</span>
            </Typography>
        </Box>
    );

}

function CompanyBox(){
    
    const theme = useTheme();
    const belowLG = useMediaQuery(theme.breakpoints.down('lg'))
    return (
    <Stack
        width="100%"
        direction={belowLG ? 'column': 'row'}
        alignItems={belowLG ? 'center': 'end'}
        justifyContent={'space-between'}
        pb={belowLG? "none": "15px"}
        pt={belowLG? "none": "15px"}
        sx={
            {
                backgroundImage: `url(${companyLogo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                ...(belowLG && {
                    backgroundImage: "none",
                    background: "linear-gradient(to bottom, white 50%, #33f28b 50%)",
                })
            }
        }
    >
        <Stack
        width="50%"
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <img
                alt="sh"
                width="30px"
                height="30px"
                src={shLogo}
                style={{ cursor: "pointer", borderRadius: "50%" }}
            />
            <Typography>{belowLG ? "SH": "ScrapeHero"}</Typography>
        </Stack>
        {belowLG && <Stack>➕</Stack>}
        <Stack
        width="50%"
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <img
                alt="zb"
                width="30px"
                height="30px"
                src={zbLogo}
                style={{ cursor: "pointer", borderRadius: "50%" }}
            />
            <Typography>{belowLG ? "ZB": "ZenBusiness"}</Typography>

        </Stack>
    </Stack>
    );
}