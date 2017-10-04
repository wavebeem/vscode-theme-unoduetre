import Theme, { ThemeType } from "./Theme";

export default class LightTheme extends Theme {
  constructor() {
    super();
    this.UNO = 320;
    this.DUE = 215;
    this.TRE = 125;
    this.YELLOW = "#f1c40f";
    this.ORANGE = "#e67e22";
    this.BLUE = "#3498db";
    this.PURPLE = "#9b59b6";
    this.WHITE = "#ffffff";
    this.BLACK = "#000000";
    this.RED = "#cc0000";
    this.CYAN = "#00bcd4";
    this.TRANSPARENT = "#00000000";
    this.NO_ = "#ff00ff";
    this.T_BG = this.WHITE;
    this.T_FG = "#5c668e";
    this.T_BLACK = "#31364a";
    this.T_RED = "#a91b1c";
    this.T_GREEN = "#00a337";
    this.T_YELLOW = "#cc8410";
    this.T_BLUE = "#39b898";
    this.T_MAGENTA = "#d95278";
    this.T_CYAN = "#7f9608";
    this.T_WHITE = "#e6e6e6";
    this.UI_FG = this.BLACK;
    this.UI_ACCENT = this.hsl(this.TRE, 70, 40);
    this.FG = this.hsl(this.UNO, 20, 20);
    this.BG = this.gray(98);
    this.INPUT_BG = this.WHITE;
    this.BORDER_SOFT = this.dilute(this.BLACK, 5);
    this.BORDER_HARD = this.dilute(this.BLACK, 10);
    this.BORDER_HARDER = this.dilute(this.BLACK, 15);
    this.SHADOW = this.dilute(this.BLACK, 30);
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
    return "light";
  }

  themeType() {
    return ThemeType.LIGHT;
  }

  activeSelectionBG() {
    return this.hsl(this.TRE, 50, 50);
  }

  inactiveSelectionBG() {
    return this.hsl(this.TRE, 40, 80);
  }

  accentFocusBG() {
    return this.hsl(this.TRE, 50, 80);
  }

  statusBarBG() {
    return this.gray(25);
  }

  lineHighlightBG() {
    return this.dilute(this.YELLOW, 10);
  }

  widgetBG() {
    return this.WHITE;
  }

  widgetBorder() {
    return this.BORDER_HARDER;
  }
}
