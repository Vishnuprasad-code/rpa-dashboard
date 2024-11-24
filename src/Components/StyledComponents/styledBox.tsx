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
  // "&:hover": {
  //   boxShadow: "0 0.5px 5px 1px #005295",
  // }
}

));


export const AltBox = styled(Box)(({ theme }) => ({
  // backgroundColor:  theme.palette.primary.dark,
  // borderRadius: theme.shape.borderRadius,
  // backgroundColor: "rgb(24,70,80)",
  // background: #59C173;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #5D26C1, #a17fe0, #59C173);  /* Chrome 10-25, Safari 5.1-6 */
  // background: "linear-gradient(to left, #757f9a, #d7dde8)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  // background: `linear-gradient(to top, ${theme.palette.primary.dark}1a, #3c10538d)`,  /* ROYAL */

  background: `linear-gradient(to top, ${theme.palette.primary.dark}66, ${theme.palette.primary.dark})`,  /* ROYAL */


  // background: `linear-gradient(to top, ${theme.palette.primary.dark}1a, #b8c4ff8d)`,  /* ROYAL */


  // background: 'linear-gradient(to right, #41295a66, #2f074366)', /* 80s Purple*/
  // background: 'linear-gradient(to left, #b3cde8, #f0f4f8)', /* DIGITAL WATER */

  // backgroundColor: "rgba(0, 0, 255, 0.1)",
  // backgroundColor: theme.palette.primary.dark,
  backdropFilter: 'saturate(100%) blur(4px)',  // Apply blur effect
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