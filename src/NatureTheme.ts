import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

const bgHue = 70;

export default class NatureTheme extends Theme {
  uno = 30;
  due = 320;
  tre = 180;

  palette: Palette = {
    yellow: yellow,
    orange: "#e67e22",
    blue: "#3498db",
    purple: "#9b59b6",
    white: white,
    black: black,
    red: red,
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tBG: this.gray(96),
    tFG: this.hsl(bgHue, 75, 20),
    ...this.tintedAnsiLight(this.hsl(bgHue, 80, 50)),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: this.hsl(200, 80, 40),
    fg: this.hsl(bgHue, 75, 20),
    bg: this.gray(96),
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    border0: this.gray(90),
    border1: this.gray(80),
    shadow0: this.dilute(this.gray(90), 70),
    shadow1: this.dilute(this.gray(60), 70),
    activeSelectionBG: this.hsla(this.tre, 50, 50, 60),
    inactiveSelectionBG: this.hsla(this.tre, 50, 50, 30),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    widgetBG: this.gray(98),
    widgetBorder: this.gray(50),
    ruler: this.hsla(bgHue, 60, 30, 10)
  };

  gray(l: number) {
    return this.hsl(bgHue, 30, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 40),
      this.hsl(hue, 50, 55),
      this.hsl(hue, 25, 65)
    ];
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
