// eslint-disable-next-line @typescript-eslint/no-unused-imports
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;
    }

    interface Palette {
        // Added tertiary to have a palette colour in the app (theme.ts)
        // don't need to extend types for others
        tertiary: PaletteColor;
    }
}
