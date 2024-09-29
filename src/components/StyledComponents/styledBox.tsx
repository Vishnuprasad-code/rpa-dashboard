import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



export const GlossyBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    // backgroundColor: theme.palette.neutral.dark,
    backgroundColor: "#36445e",
    // backgroundColor: theme.palette.primary.main,
    border: "1px solid green",
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  }

));  