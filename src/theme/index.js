import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';
import { fade } from '@material-ui/core/styles/colorManipulator'

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#088e9d',
      default: colors.common.white,
      paper: colors.common.white,
      grey: fade('#707070', 0.17)
    },
    primary: {
      main: fade('#707070', 0.17)
    },
    secondary: {
      main: fade('#707070', 0.17)
    },
    text: {
      primary: '#404040',
      secondary: '#404040'
    }
  },
  shadows,
  typography
});

export default theme;
