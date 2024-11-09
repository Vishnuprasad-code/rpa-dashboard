import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import { Box } from "@mui/material";


import { Link } from 'react-router-dom';


export function RpaListings({data}){
    return  <Box sx={{
      width: "50vw", height: "600px",
      overflowY: "scroll"
      }}>
    <Masonry
      columns={{xl: 4, lg: 4, md: 1, sm: 1, xs: 1}} spacing={2}
      // sx={{overflow: "auto"}}
      >
      {Object.keys(data).map((state) => (
          <Box 
              key={state}
              sx={{
                padding: 1,
                color: "white",
                background: "rgba(0, 0, 255, 0.3)",
                backdropFilter: "blur(10px)",
                // height: "max-content",
              }}
          >
            <Typography>{state}</Typography>
            <List
            sx={{
              padding: 1,
              color: "black",
              listStyleType: 'disc',
              width: "200px",

            }}>
            {data[state].map(item => (
              <ListItem
                  component={Link}
                  to=""
                  sx={{
                      mx: 2,
                      "color": "white",
                      display: 'list-item',
                      "&:hover": {
                        textDecoration: "underline"
                      }
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