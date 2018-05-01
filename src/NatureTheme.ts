import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

// TODO:
// - All the terminal colors
// - Use transparency for the editor guides to fix selection strangeness

export default class LightTheme extends Theme {
  bgHue = 80;
  fgHue = 287;

  uno = 287;
  due = 327;
  tre = 179;

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
    tBG: this.gray(98),
    tFG: this.hsl(this.fgHue, 80, 30),
    tBlack: "#31364a",
    tRed: "#a91b1c",
    tGreen: "#00a337",
    tYellow: "#cc8410",
    tBlue: "#39b898",
    tMagenta: "#d95278",
    tCyan: "#7f9608",
    tWhite: this.gray(96),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: red,
    fg: this.hsl(this.bgHue, 70, 20),
    bg: this.gray(94),
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    borderSoft: this.gray(90),
    borderMedium: this.gray(86),
    borderHard: this.gray(82),
    shadow: this.dilute(black, 20),
    activeSelectionBG: this.hsl(this.tre, 50, 50),
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    statusBarBG: this.gray(96),
    statusBarFG: this.gray(40),
    lineHighlightBG: this.dilute(yellow, 10),
    widgetBG: this.gray(98),
    widgetBorder: this.dilute(black, 15)
  };

  gray(l: number) {
    return this.hsl(this.bgHue, 30, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 45),
      this.hsl(hue, 55, 55),
      this.hsl(hue, 35, 65),
      this.hsl(hue, 25, 70)
    ];
  }

  filename() {
    return "nature";
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
