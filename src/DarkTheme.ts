import Theme, { ThemeType } from "./Theme";

export default class DarkTheme extends Theme {
  constructor() {
    super();
    this.UNO = 70;
    this.DUE = 30;
    this.TRE = 160;
    [this.UNO_1, this.UNO_2, this.UNO_3, this.UNO_4, this.UNO_5] = this.ramp(
      this.UNO
    );
    [this.DUE_1, this.DUE_2, this.DUE_3] = this.ramp(this.DUE);
    [this.TRE_1] = this.ramp(this.TRE);
    this.YELLOW = "#f1c40f";
    this.ORANGE = "#e67e22";
    this.BLUE = "#3498db";
    this.PURPLE = "#9b59b6";
    this.WHITE = "#ffffff";
    this.BLACK = "#000000";
    this.RED = "#ff8888";
    this.CYAN = "#00bcd4";
    this.TRANSPARENT = "#00000000";
    this.NO_ = "#ff00ff";
    this.T_BG = this.gray(20);
    this.T_FG = this.hsl(this.UNO, 40, 90);
    this.T_BLACK = "#31364a";
    this.T_RED = "#a91b1c";
    this.T_GREEN = "#00a337";
    this.T_YELLOW = "#cc8410";
    this.T_BLUE = "#39b898";
    this.T_MAGENTA = "#d95278";
    this.T_CYAN = "#7f9608";
    this.T_WHITE = "#e6e6e6";
    this.UI_FG = this.WHITE;
    this.UI_ACCENT = this.hsl(this.TRE, 70, 40);
    this.FG = this.WHITE;
    this.BG = this.gray(25);
    this.INPUT_BG = this.gray(20);
    this.BORDER_SOFT = this.dilute(this.WHITE, 10);
    this.BORDER_HARD = this.dilute(this.WHITE, 15);
    this.BORDER_HARDER = this.dilute(this.WHITE, 25);
    this.SHADOW = this.dilute(this.BLACK, 70);
  }

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

  activeSelectionBG() {
    return this.hsl(this.TRE, 40, 50);
  }

  inactiveSelectionBG() {
    return this.hsl(this.TRE, 20, 40);
  }

  accentFocusBG() {
    return this.hsl(this.TRE, 40, 50);
  }

  statusBarBG() {
    return this.gray(15);
  }

  lineHighlightBG() {
    return this.dilute(this.UI_FG, 7);
  }

  widgetBG() {
    return this.gray(30);
  }

  widgetBorder() {
    return this.gray(50);
  }
}
