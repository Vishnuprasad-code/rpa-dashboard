import Grid from '@mui/material/Grid2';
import NavBar from '../Components/Navbar/Navbar';


export default function HomeNavBar(){
    return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      alignItems="center"
    sx={{
      // border: "1px solid green",
      "& > .MuiGrid2-direction-xs-row": {
        // border: "1px solid green",
        height: "10%"
      }
    }}
  >
      <Grid size={{lg: 12, sm: 12, xs: 12}}>
        <NavBar />
      </Grid>
    </Grid>
    );
  }