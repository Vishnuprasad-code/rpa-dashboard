import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';

import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import Avatar from '@mui/material/Avatar';


import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import shLogo from '../assets/sh-logo-800.png';
import zbLogo from '../assets/circle-logo-teal.svg';
import companyLogo from '../assets/company.webp';

import rpaIcon from '../assets/rpa-icon.png';
import homeIcon from '../assets/home-icon.png';
import apiIcon from '../assets/api-icon.png';
import docsIcon from '../assets/docs-icon.png';


const Offset = styled("div")(({theme}) => theme.mixins.toolbar);
const routes = [
    {   
        "route": "Home",
        "icon": <Avatar sx={{border: "8px solid black", padding: "5px"}} src={homeIcon} alt="h" />
    },
    {
        "route": "RPAs",
        "icon": <Avatar sx={{border: "8px solid black", padding: "5px"}} src={rpaIcon} alt="h" />
    }
    ,
    {
        "route": "APIs",
        "icon": <Avatar sx={{border: "8px solid black", padding: "5px"}} src={apiIcon} alt="h" />
    },
    {
        "route": "Docs",
        "icon": <Avatar sx={{border: "8px solid black", padding: "5px"}} src={docsIcon} alt="h" />
    }
]


export default function HomeSideBar(){
    return (
    <Stack
        sx={{
            height: "100%",
        }}
        spacing={1}
        alignItems={'center'}
        justifyContent={'space-between'}
    >   
        <ProfileBox/>
        <Offset/>
        <SideMenu/>
        <Offset/>
        <CompanyBox/>
    </Stack>
    );
  }


function SideMenu(){

    const [selectedTab, setSelectedTab] = useState<string>("Home")
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
                paddingLeft: "0.5rem",
            }}
            >
                <Tabs
                variant="fullWidth"
                sx={{
                    flexGrow: 1,
                }}
                orientation="vertical"
                >
                    {routes.map(
                        ({route, icon}) => <Tab
                                    label={<Box sx={{
                                        display:{
                                            'xl': 'block',
                                            'lg':'block',
                                            'md': 'none',
                                            'sm': 'none',
                                            'xs': 'none'
                                        }
                                    }}>{route}</Box>}
                                    icon={icon}
                                    iconPosition='start'
                                    key={route}
                                    disableRipple
                                    onClick={() => setSelectedTab(route)}
                                    sx={{
                                        flexGrow: 1,
                                        height: "15px",
                                        padding: "0 1rem 0 0.5rem",
                                        columnGap: "1rem",
                                        justifyContent: "flex-start",
                                        borderTopLeftRadius: "50px",
                                        borderBottomLeftRadius: "50px",
                                        overflow: "visible",
                                        ...((route === selectedTab) && {
                                            bgcolor: "cyan",
                                            "&::before": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                bgcolor: "transparent",
                                                height: "20px",
                                                width: "20px",
                                                right: "0",
                                                top: "-20px",
                                                borderBottomRightRadius: "100%",
                                                boxShadow: "5px 5px 0 5px cyan",
                                            },
                                            "&::after": {
                                                content: '""',
                                                display: "block",
                                                position: "absolute",
                                                bgcolor: "transparent",
                                                height: "20px",
                                                width: "20px",
                                                right: "0",
                                                bottom: "-20px",
                                                borderTopRightRadius: "100%",
                                                boxShadow: "5px -5px 0 5px cyan",
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
            alignSelf: "flex-start",
            pt: "0.5rem",
            pb: "2rem",
        }}
        >
            <Typography
                ml="1rem"
                variant="h5"
                sx={{
                    "font-family": '"Protest Guerrilla", sans-serif',
                    "font-weight": "400",
                    "font-style": "normal",
                }}
            >
                ZB - Dash
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