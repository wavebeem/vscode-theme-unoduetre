import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

export default class LightTheme extends Theme {
  uno = 320;
  due = 215;
  tre = 125;

  bg = this.gray(96);

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
    tFG: "#5c668e",
    ...this.tintedAnsiLight(this.bg, "#ffffff"),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: red,
    fg: this.gray(20),
    bg: this.bg,
    inputBG: white,
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    border0: this.gray(80),
    border1: this.gray(72),
    shadow0: this.dilute(this.gray(80), 70),
    shadow1: this.dilute(this.gray(60), 70),
    activeSelectionBG: this.hsl(this.tre, 50, 50),
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    widgetBG: white,
    widgetBorder: this.dilute(black, 50),
    ruler: this.dilute(black, 10),
  };

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 45),
      this.hsl(hue, 50, 60),
      this.hsl(hue, 35, 70),
    ];
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
