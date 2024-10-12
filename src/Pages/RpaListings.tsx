import { Box } from "@mui/material";

import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Grid from '@mui/material/Grid2';

import { data } from "./TpaListingsMockData";

import { Link } from 'react-router-dom';


import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField } from '@mui/material';

const MUIDateTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Date & Time"
        value={selectedDateTime}
        onChange={handleDateTimeChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default function RpasOverview(){
    return  
}


function RpaListings(){
  return  <Grid
  container
  justifyContent="flex-start"
  margin="1rem"
  spacing="1rem"
  alignItems="center"
>
{Object.keys(data).map((state) => (
  <Grid 
      size={{xl: 4, lg: 4, md: 6, sm: 6, xs: 6}}
      height="15rem"
      sx={{
          padding: 2,
          border: "1px solid yellow"
      }}
      key={state}
  >
    <Typography>{state}</Typography>
    <List
    sx={{
      // padding: 0,
      // margin: 0,
    }}>
    {data[state].map(item => (
      <ListItem
          component={Link}
          to=""
          sx={{
              padding: 0,
              margin: 1,
          }}
          >
          {item.label}
      </ListItem>
      ))}
    </List>
  </Grid>
))}
</Grid>
}