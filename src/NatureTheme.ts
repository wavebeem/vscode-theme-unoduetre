import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

const bgHue = 160;

export default class NatureTheme extends Theme {
  uno = 200;
  due = 70;
  tre = 310;

  bg = this.gray(94);

  palette: Palette = {
    yellow: yellow,
    orange: "#e67e22",
    blue: "#3498db",
    purple: "#9b59b6",
    white: white,
    red: red,
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tBG: this.bg,
    tFG: this.hsl(bgHue, 75, 20),
    ...this.tintedAnsiLight(this.bg, this.hsl(bgHue, 80, 50)),
    accent0: this.hsl(this.due, 70, 40),
    accent1: this.hsl(200, 80, 40),
    fg: this.hsl(bgHue, 75, 20),
    bg: this.bg,
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    border0: this.gray(80),
    border1: this.gray(72),
    shadow0: this.dilute(this.gray(80), 70),
    shadow1: this.dilute(this.gray(60), 70),
    activeSelectionBG: this.hsla(this.due, 50, 50, 60),
    inactiveSelectionBG: this.hsla(this.due, 50, 50, 30),
    textSelectionBG: this.hsla(this.due, 50, 50, 30),
    accentFocusBG: this.hsl(this.due, 50, 80),
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
      this.hsl(hue + 4, 75, 45),
      this.hsl(hue + 12, 50, 60),
      this.hsl(hue + 16, 35, 70),
    ];
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
