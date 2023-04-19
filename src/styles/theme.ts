import { createTheme } from '@mui/material/styles';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { ColorPalette } from './color-palette';

let theme = createTheme({
    palette: ColorPalette,
});


export { theme };
