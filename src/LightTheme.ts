import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";

export default class LightTheme extends Theme {
  uno = 320;
  due = 215;
  tre = 125;
  palette: Palette = {
    YELLOW: yellow,
    ORANGE: "#e67e22",
    BLUE: "#3498db",
    PURPLE: "#9b59b6",
    WHITE: white,
    BLACK: black,
    RED: "#cc0000",
    CYAN: "#00bcd4",
    TRANSPARENT: "#00000000",
    NO_: "#ff00ff",
    T_BG: white,
    T_FG: "#5c668e",
    T_BLACK: "#31364a",
    T_RED: "#a91b1c",
    T_GREEN: "#00a337",
    T_YELLOW: "#cc8410",
    T_BLUE: "#39b898",
    T_MAGENTA: "#d95278",
    T_CYAN: "#7f9608",
    T_WHITE: "#e6e6e6",
    UI_FG: black,
    UI_ACCENT: this.hsl(this.tre, 70, 40),
    FG: this.hsl(this.uno, 20, 20),
    BG: this.gray(98),
    INPUT_BG: white,
    BORDER_SOFT: this.dilute(black, 5),
    BORDER_HARD: this.dilute(black, 10),
    BORDER_HARDER: this.dilute(black, 15),
    SHADOW: this.dilute(black, 30),
    activeSelectionBG: this.hsl(this.tre, 50, 50),
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    statusBarBG: this.gray(25),
    lineHighlightBG: this.dilute(yellow, 10),
    widgetBG: white,
    widgetBorder: this.dilute(black, 15)
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
