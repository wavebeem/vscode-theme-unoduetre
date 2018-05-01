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
    tBG: white,
    tFG: "#5c668e",
    tBlack: "#31364a",
    tRed: "#a91b1c",
    tGreen: "#00a337",
    tYellow: "#cc8410",
    tBlue: "#39b898",
    tMagenta: "#d95278",
    tCyan: "#7f9608",
    tWhite: "#e6e6e6",
    accent0: this.hsl(this.tre, 70, 40),
    accent1: red,
    fg: this.hsl(this.uno, 20, 20),
    bg: this.gray(98),
    inputBG: white,
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    borderSoft: this.dilute(black, 5),
    borderMedium: this.dilute(black, 10),
    borderHard: this.dilute(black, 15),
    shadow: this.dilute(black, 20),
    activeSelectionBG: this.hsl(this.tre, 50, 50),
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    statusBarBG: this.gray(96),
    statusBarFG: this.gray(40),
    lineHighlightBG: this.dilute(cyan, 10),
    editorLine: this.dilute(this.gray(30), 10),
    widgetBG: white,
    widgetBorder: this.dilute(black, 50)
  };

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
    return "light";
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
