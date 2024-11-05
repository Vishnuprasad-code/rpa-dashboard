import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



export const GlossyBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    // backgroundColor: theme.palette.neutral.dark,
    // backgroundColor: "#2f3869",
    // backgroundColor: "#1e2938",
    // backgroundColor:  theme.palette.primary.dark,
    // borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    "&:hover": {
      boxShadow: "0 0.5px 5px 1px #005295",
    }
  }

));  


export const AltBox = styled(Box)(({ theme }) => ({
  backgroundColor:  theme.palette.primary.dark,
  // borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  padding: "10px",
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  "&:hover": {
    boxShadow: "0 0.5px 5px 1px #005295",
  }
}
));  