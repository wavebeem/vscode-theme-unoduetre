import { BaseThemeDark } from "./Theme2";

export class MidnightTheme2 extends BaseThemeDark {
  colorBG0 = this.hsl(260, 50, 20);
  colorBG1 = this.hsl(260, 50, 16);
  colorBG2 = this.hsl(260, 50, 26);
  colorFG = this.hsl(260, 80, 90);

  colorSubtle = this.hsl(260, 50, 68);
  colorUno = this.hsl(140, 80, 65);
  colorDue = this.hsl(190, 80, 65);
  colorTre = this.hsl(330, 80, 65);

  colorBorder0 = this.hsl(260, 50, 40);
  colorBorder1 = this.hsl(260, 50, 62);
  colorStatusBG = this.hsl(260, 50, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(260, 50, 15);
}
