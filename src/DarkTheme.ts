import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";

export default class DarkTheme extends Theme {
  uno = 70;
  due = 30;
  tre = 160;
  palette: Palette = {
    YELLOW: "#f1c40f",
    ORANGE: "#e67e22",
    BLUE: "#3498db",
    PURPLE: "#9b59b6",
    WHITE: white,
    BLACK: black,
    RED: "#ff8888",
    CYAN: "#00bcd4",
    TRANSPARENT: "#00000000",
    NO_: "#ff00ff",
    T_BG: this.gray(20),
    T_FG: this.hsl(this.uno, 40, 90),
    T_BLACK: this.gray(15),
    T_RED: this.hsl(0, 60, 60),
    T_GREEN: this.hsl(140, 60, 60),
    T_YELLOW: this.hsl(40, 60, 60),
    T_BLUE: this.hsl(200, 60, 60),
    T_MAGENTA: this.hsl(330, 60, 60),
    T_CYAN: this.hsl(80, 60, 60),
    T_WHITE: white,
    UI_FG: white,
    UI_ACCENT: this.hsl(this.tre, 70, 40),
    FG: white,
    BG: this.gray(25),
    INPUT_BG: this.gray(20),
    BORDER_SOFT: this.dilute(white, 10),
    BORDER_HARD: this.dilute(white, 15),
    BORDER_HARDER: this.dilute(white, 25),
    SHADOW: this.dilute(black, 70),
    activeSelectionBG: this.hsl(this.tre, 35, 35),
    inactiveSelectionBG: this.hsl(this.tre, 10, 30),
    accentFocusBG: this.hsl(this.tre, 35, 35),
    statusBarBG: this.gray(15),
    lineHighlightBG: this.dilute(white, 7),
    widgetBG: this.gray(30),
    widgetBorder: this.gray(50)
  };

  ramp(hue: number) {
    const s = 100;
    const l = 75;
    return [
      this.hsl(hue, s, l),
      this.hsl(hue + 5, s, l),
      this.hsl(hue + 10, s, l),
      this.hsl(hue + 15, s, l),
      this.hsl(hue + 20, s, l)
    ];
  }

  filename() {
    return "dark";
  }

  themeType() {
    return ThemeType.DARK;
  }
}
