/* eslint-disable no-unused-vars */
import { Theme as MuiTheme } from '@mui/material/styles'
import '@emotion/react'

declare module '@emotion/react' {
    interface Theme extends MuiTheme { }
}
