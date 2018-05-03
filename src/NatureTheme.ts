import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

const bgHue = 60;

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
    tBlack: "#31364a",
    tRed: "#a91b1c",
    tGreen: "#00a337",
    tYellow: "#cc8410",
    tBlue: "#39b898",
    tMagenta: "#d95278",
    tCyan: "#7f9608",
    tWhite: this.gray(96),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: this.hsl(200, 80, 40),
    fg: this.hsl(bgHue, 75, 20),
    bg: this.gray(94),
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    borderSoft: this.gray(88),
    borderMedium: this.gray(84),
    borderHard: this.gray(80),
    shadow: this.dilute(this.gray(20), 20),
    activeSelectionBG: this.hsla(this.tre, 50, 50, 60),
    inactiveSelectionBG: this.hsla(this.tre, 50, 50, 30),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    lineHighlightBG: this.hsla(this.tre, 50, 50, 10),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    statusBarBG: this.gray(94),
    statusBarFG: this.gray(30),
    editorLine: this.dilute(this.gray(30), 10),
    activeEditorLine: this.dilute(this.gray(30), 20),
    widgetBG: this.gray(98),
    widgetBorder: this.gray(50)
  };

  gray(l: number) {
    return this.hsl(bgHue, 30, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 40),
      this.hsl(hue, 55, 50),
      this.hsl(hue, 35, 60),
      this.hsl(hue, 25, 65)
    ];
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
