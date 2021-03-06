import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const cyan = "#5bf1ff";
const yellow = "#fcd435";
const transparent = "#00000000";
const red = "#ff6666";

export default class DarkTheme extends Theme {
  uno = 70;
  due = 175;
  tre = 30;

  bg = this.gray(18);

  palette: Palette = {
    yellow: yellow,
    orange: "#f79e51",
    blue: "#8cd1ff",
    purple: "#e1a2f9",
    white: white,
    red: red,
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tBG: this.bg,
    tFG: this.gray(80),
    ...this.tintedAnsiDark(this.bg, "#000000"),
    accent0: this.hsl(this.due, 70, 40),
    accent1: this.hsl(this.tre, 100, 60),
    fg: this.gray(90),
    bg: this.bg,
    inputBG: this.gray(14),
    bracketMatchBG: this.hsla(this.tre, 100, 60, 20),
    bracketMatchBorder: this.hsla(this.tre, 100, 60, 80),
    border0: this.gray(30),
    border1: this.gray(32),
    shadow0: this.dilute(this.gray(5), 70),
    shadow1: this.dilute(this.gray(5), 30),
    activeSelectionBG: this.hsl(this.due, 35, 35),
    inactiveSelectionBG: this.hsl(this.due, 10, 30),
    textSelectionBG: this.hsla(this.due, 50, 50, 30),
    accentFocusBG: this.hsl(this.due, 35, 35),
    widgetBG: this.gray(30),
    widgetBorder: this.gray(60),
    ruler: this.gray(24),
  };

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
