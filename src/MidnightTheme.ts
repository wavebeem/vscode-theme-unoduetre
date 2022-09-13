import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const cyan = "#5bf1ff";
const yellow = "#fcd435";
const transparent = "#00000000";
const hueAccent2 = 40;

const bgHue = 260;

export default class MidnightTheme extends Theme {
  uno = 140;
  due = 190;
  tre = 330;

  bg = this.gray(20);

  palette: Palette = {
    yellow: yellow,
    orange: "#f79e51",
    blue: "#8cd1ff",
    purple: "#e1a2f9",
    white: white,
    red: "#ff6666",
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tFG: this.hsl(bgHue, 90, 90),
    ...this.tintedAnsiDark(this.bg, this.hsl(bgHue, 80, 50)),
    accent0: this.hsl(this.due, 70, 40),
    accent1: this.hsl(hueAccent2, 100, 60),
    fg: this.hsl(bgHue, 80, 90),
    bg: this.bg,
    titlebarBG: this.gray(12),
    sidebarBG: this.gray(16),
    activityBarBG: this.gray(14),
    statusbarBG: this.gray(12),
    statusbarFG: this.gray(96),
    inputBG: this.gray(14),
    bracketMatchBG: this.hsla(this.tre, 100, 60, 20),
    bracketMatchBorder: this.hsla(this.tre, 100, 60, 80),
    activeSelectionBG: this.hsla(this.due, 50, 50, 60),
    inactiveSelectionBG: this.hsla(this.due, 50, 50, 30),
    textSelectionBG: this.hsla(this.due, 50, 50, 30),
    accentFocusBG: this.hsl(this.due, 35, 35),
    widgetBG: this.gray(25),
    widgetBorder: this.gray(60),
    ruler: this.hsla(bgHue, 60, 70, 10),
  };

  gray(l: number) {
    return this.hsl(bgHue, 40, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 80, 65),
      this.hsl(hue + 4, 70, 60),
      this.hsl(hue + 12, 40, 50),
      this.hsl(hue + 16, 30, 45),
    ];
  }

  themeType() {
    return ThemeType.DARK;
  }
}
