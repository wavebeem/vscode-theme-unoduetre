import { BaseThemeDark } from "./Theme";

export class MidnightTheme extends BaseThemeDark {
  colorBG0 = this.hsl(260, 40, 20);
  colorBG1 = this.hsl(260, 40, 16);
  colorBG2 = this.hsl(260, 40, 26);
  colorFG = this.hsl(260, 80, 90);

  colorSubtle = this.hsl(260, 40, 68);
  colorUno = this.hsl(140, 60, 65);
  colorDue = this.hsl(190, 80, 65);
  colorTre = this.hsl(330, 100, 73);

  colorBorder0 = this.hsl(260, 40, 35);
  colorBorder1 = this.hsl(260, 40, 62);
  colorStatusBG = this.hsl(260, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(260, 40, 15);
}
