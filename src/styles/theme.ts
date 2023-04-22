import { createTheme } from '@mui/material/styles';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { ColorPalette } from './color-palette';

let theme = createTheme({
    palette: ColorPalette,
    typography: {
        fontFamily: ['Poppins'].join(','),
        fontWeightRegular: '400',
        fontWeightMedium: '500',
        fontWeightBold: '600',
        h1: {
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 2
        },
        h2: {
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.85
        },
        h3: {
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 1.5
        },
        h4: {
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.25
        },

        h5: {
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '18px'
        },
        h6: {
            fontSize: 10,
            fontWeight: 600,
            lineHeight: '20px'
        },
        subtitle1: {
            fontSize: 18,
            fontWeight: 400,
            lineHeight: '24px'
        },
        subtitle2: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '24px'
        },
        body1: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: '20px'
        },
        body2: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px'
        },
        caption: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '16px',
            color: `${ColorPalette.grey?.[800]} !important`
        }
    },
    shadow: {
        shadow_5: '0px 2px 5px rgba(0, 0, 0, 0.05)',
        shadow_5_reverse: '0px -2px 5px rgba(0, 0, 0, 0.05)',
        shadow_10: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        shadow_10_reverse: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        shadow_20: '0px 4px 20px rgba(0, 0, 0, 0.2)'
    },
});


export { theme };
