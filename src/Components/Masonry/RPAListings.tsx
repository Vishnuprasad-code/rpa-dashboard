import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';
import { Box } from "@mui/material";


import { Link } from 'react-router-dom';
import { AltBox, GlossyBox } from '../StyledComponents/styledBox';


export function RpaListings({ data }) {
  return <Box sx={(theme) => ({
    width: "50vw", height: "680px",
    overflowY: "scroll",
    backgroundColor: `${theme.palette.background.default}f2`,

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    border: '2px solid #000',
    boxShadow: 24,
    backdropFilter: "blur(10px)",
    p: 4,
  })}>
    <Masonry
      columns={{ xl: 4, lg: 4, md: 1, sm: 1, xs: 1 }} spacing={2}
    >
      {Object.keys(data).map((state) => (
        <AltBox
          key={state}
          sx={{
            padding: 1,
            fontSize: "0.8rem",
            fontWeight: "300",
            // color: "white",
            // background: "rgba(0, 0, 255, 0.3)",
            // backdropFilter: "blur(10px)",
            height: "max-content",
          }}
        >
          <Typography variant='h5'>{state}</Typography>
          <List
            sx={{
              padding: 0.5,
              color: "black",
              listStyleType: 'disc',
              width: "100%",
              textWrap: "wrap"

            }}>
            {data[state].map(item => (
              <ListItem
                component={Link}
                to={`rpas/${item.slug}`}
                sx={(theme) => ({
                  mx: 2,
                  "color": theme.palette.text.primary,
                  display: 'list-item',
                  wordWrap: "break-word",
                  "&:hover": {
                    textDecoration: "underline"
                  }
                })
                }
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        </AltBox>
      ))
      }
    </Masonry >
  </Box >
}