import { Theme, ThemeType, ThemePalette } from "./Theme";

const white = "#ffffff";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

const bgHue = 240;

export class PeriwinkleTheme extends Theme {
  uno = 330;
  due = 200;
  tre = 110;

  bg = this.gray(94);

  palette: ThemePalette = {
    yellow: yellow,
    orange: "#e67e22",
    blue: "#3498db",
    purple: "#9b59b6",
    white: white,
    red: red,
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tFG: this.hsl(bgHue, 80, 25),
    ...this.tintedAnsiLight(this.bg, this.hsl(bgHue, 80, 50)),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: this.hsl(320, 80, 40),
    fg: this.hsl(bgHue, 80, 25),
    bg: this.bg,
    titlebarBG: this.gray(88),
    sidebarBG: this.gray(92),
    statusbarBG: this.gray(20),
    statusbarFG: this.gray(96),
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    widgetBG: this.gray(98),
    widgetBorder: this.gray(50),
    ruler: this.hsla(bgHue, 60, 30, 10),
  };

  gray(l: number) {
    return this.hsl(bgHue, 30, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 45),
      this.hsl(hue, 50, 60),
      this.hsl(hue, 35, 70),
    ] as const;
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
