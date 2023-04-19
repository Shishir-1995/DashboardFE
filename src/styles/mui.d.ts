import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        shadow: {
            shadow_5: string;
            shadow_5_reverse: string;
            shadow_10: string;
            shadow_10_reverse: string;
            shadow_20: string;
        };
    }
    interface ThemeOptions {
        shadow: {
            shadow_5: string;
            shadow_5_reverse: string;
            shadow_10: string;
            shadow_10_reverse: string;
            shadow_20: string;
        };
    }
}