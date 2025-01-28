import { useState, useContext } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';

import { RpaListings } from '../Masonry/RPAListings.tsx'
import { DashboardContext } from "../../Contexts/DashboardContext.tsx"
import { ColorModeContext } from "../../theme.ts";
import { useTheme } from "@emotion/react";


export default function NavBar() {
  const theme = useTheme();
  const { rpaListings } = useContext(DashboardContext);
  const colorMode = useContext(ColorModeContext)
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function handleSearch(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get('search'));
    setSearchInput(data.get('search'))
  }
  return <Box
    sx={{
      display: "flex",
      // justifyContent: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      rowGap: "5px",
      // mx: "auto",
      mt: "2px",
      width: "100%",
    }}
  >
    <Box
      sx={{
        flex: "0 0 66%",
        width: "66%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        order: 2,
      }}
    >
      <SearchBar handleSearch={handleSearch} />
    </Box>
    <Box
      sx={{
        flex: "1 0",
        width: "33%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        columnGap: 2,
        marginRight: "50px",
        order: 1
        // border: "1px solid red"
      }}
    >
      {
        theme.palette.mode === "dark" ?
          <LightModeIcon onClick={colorMode.toggleColorMode} /> :
          <DarkModeIcon onClick={colorMode.toggleColorMode} />
      }
      <NotificationImportantIcon />
      <MenuIcon onClick={handleOpen}>modal</MenuIcon>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <RpaListings onLinkClick={handleClose} data={rpaListings} />
        </div>
      </Modal>
    </Box>

  </Box >
}


const SearchBar = ({ handleSearch }: { handleSearch: (event: React.FormEvent<HTMLFormElement>) => void }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // border: "1px solid red"
    }}
    mt="2px"
    component={"form"}
    onSubmit={(event) => handleSearch(event)}
  >
    <TextField
      id="search-bar"
      name="search"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={(theme) => ({
        width: "300px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "100px",
        },
        "& + button": {
          marginLeft: "-40px",
          // backgroundColor: "red"
        },
        "& + button > .MuiSvgIcon-root": {
          fill: `${theme.palette.neutral.light}!important`
        }
      })}
    />
    <IconButton
      type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </Box >
);
