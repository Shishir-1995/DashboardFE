import { createTheme } from '@mui/material/styles';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { ColorPalette } from './color-palette';

let theme = createTheme({
    palette: ColorPalette,
    shadow: {
        shadow_5: '0px 2px 5px rgba(0, 0, 0, 0.05)',
        shadow_5_reverse: '0px -2px 5px rgba(0, 0, 0, 0.05)',
        shadow_10: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        shadow_10_reverse: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        shadow_20: '0px 4px 20px rgba(0, 0, 0, 0.2)'
    },
});


export { theme };
