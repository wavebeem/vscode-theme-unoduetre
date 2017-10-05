import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";

export default class DarkTheme extends Theme {
  uno = 70;
  due = 30;
  tre = 160;
  palette: Palette = {
    yellow: "#f1c40f",
    orange: "#e67e22",
    blue: "#3498db",
    purple: "#9b59b6",
    white: white,
    black: black,
    red: "#ff8888",
    cyan: "#00bcd4",
    transparent: "#00000000",
    __NO__: "#ff00ff",
    tBG: this.gray(20),
    tFG: this.hsl(this.uno, 40, 90),
    tBlack: this.gray(15),
    tRed: this.hsl(0, 60, 60),
    tGreen: this.hsl(140, 60, 60),
    tYellow: this.hsl(40, 60, 60),
    tBlue: this.hsl(200, 60, 60),
    tMagenta: this.hsl(330, 60, 60),
    tCyan: this.hsl(80, 60, 60),
    tWhite: white,
    uiFG: white,
    uiAccent: this.hsl(this.tre, 70, 40),
    fg: white,
    bg: this.gray(25),
    inputBG: this.gray(20),
    borderSoft: this.dilute(white, 10),
    borderMedium: this.dilute(white, 15),
    borderHard: this.dilute(white, 25),
    shadow: this.dilute(black, 70),
    activeSelectionBG: this.hsl(this.tre, 35, 35),
    inactiveSelectionBG: this.hsl(this.tre, 10, 30),
    accentFocusBG: this.hsl(this.tre, 35, 35),
    statusBarBG: this.gray(15),
    lineHighlightBG: this.dilute(white, 7),
    widgetBG: this.gray(30),
    widgetBorder: this.gray(50)
  };

  ramp(hue: number) {
    return [
      this.hsl(hue, 100, 70),
      this.hsl(hue + 5, 100, 70),
      this.hsl(hue + 10, 95, 75),
      this.hsl(hue + 15, 80, 75),
      this.hsl(hue + 20, 70, 80)
    ];
  }

  filename() {
    return "dark";
  }

  themeType() {
    return ThemeType.DARK;
  }
}
