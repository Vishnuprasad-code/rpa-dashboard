import { useState, useContext } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListIcon from '@mui/icons-material/List';

import {RpaListings} from '../Masonry/RPAListings.tsx'
import { DashboardContext } from "../../Contexts/DashboardContext.tsx"
import { ColorModeContext, useMode } from "../../theme.ts";
import { useTheme } from "@emotion/react";


export default function NavBar(){
    const theme = useTheme();
    const {rpaListings}= useContext(DashboardContext);
    const colorMode = useContext(ColorModeContext)
    const [searchInput, setSearchInput] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function handleSearch(event){
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('search'));
        setSearchInput(data.get('search'))
    }
    return <Box
        sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mx: "auto",
            mt: "2px",
            width: "90%",
            columnGap: 4,
        }}
    >  
        <SearchBar handleSearch={handleSearch}/>
        {/* <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                columnGap: 2,
                // border: "1px solid red"
            }}
        > */}
        {
        theme.palette.mode === "dark" ? 
        <LightModeIcon onClick={colorMode.toggleColorMode}/>:
        <DarkModeIcon onClick={colorMode.toggleColorMode}/>
        }
        <NotificationImportantIcon/>
        <ListIcon onClick={handleOpen}>modal</ListIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            // background: "rgba(20, 20, 20, 0.83)",
            backdropFilter: "blur(10px)",
            p: 4,
        }}>
          <RpaListings data={rpaListings}/>
        </Box>
      </Modal>
      {/* </Box> */}

    </Box>
}


const SearchBar = ({handleSearch}) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // border: "1px solid red"
        }}
        mt="2px"
        component={"form"}
        onSubmit={(event) => {
            handleSearch(event);
        }}
    >
      <TextField
        id="search-bar"
        name="search"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </Box>
  );
  