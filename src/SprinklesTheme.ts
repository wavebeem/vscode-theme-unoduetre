import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const cyan = "#5bf1ff";
const yellow = "#fcd435";
const transparent = "#00000000";
const hueAccent2 = 170;

const bgHue = 280;

export default class SprinklesTheme extends Theme {
  uno = 320;
  due = 45;
  tre = 170;

  bg = this.gray(18);

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
    tBG: this.bg,
    tFG: this.hsl(bgHue, 90, 90),
    ...this.tintedAnsiDark(this.bg, this.hsl(bgHue, 80, 50)),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: this.hsl(hueAccent2, 100, 60),
    fg: this.hsl(bgHue, 80, 90),
    bg: this.bg,
    inputBG: this.gray(14),
    bracketMatchBG: this.hsla(this.tre, 100, 60, 20),
    bracketMatchBorder: this.hsla(this.tre, 100, 60, 80),
    border0: this.gray(30),
    border1: this.gray(38),
    shadow0: this.dilute(this.gray(5), 70),
    shadow1: this.dilute(this.gray(5), 30),
    activeSelectionBG: this.hsla(this.tre, 50, 50, 60),
    inactiveSelectionBG: this.hsla(this.tre, 50, 50, 30),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    accentFocusBG: this.hsl(this.tre, 35, 35),
    widgetBG: this.gray(25),
    widgetBorder: this.gray(60),
    ruler: this.hsla(bgHue, 60, 70, 10),
  };

  gray(l: number) {
    return this.hsl(bgHue, 35, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 80, 70),
      this.hsl(hue, 60, 65),
      this.hsl(hue, 50, 55),
      this.hsl(hue, 40, 50),
    ];
  }

  themeType() {
    return ThemeType.DARK;
  }
}
