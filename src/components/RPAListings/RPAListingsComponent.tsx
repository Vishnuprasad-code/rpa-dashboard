import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import { Box } from "@mui/material";


import { Link } from 'react-router-dom';


export function RpaListings({data}){
    return  <Box sx={{ width: 500, minHeight: 393 }}>
      <Masonry columns={4} spacing={2}>
      {Object.keys(data).map((state) => (
          <Box 
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
          </Box>
        ))}
      </Masonry>
  </Box> 
  }