import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export const StyledToolTip = styled(Paper)(({ theme }) => ({
    padding: 10,
    margin: 3,
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    borderRadius: theme.shape.borderRadius,
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    },
  }));