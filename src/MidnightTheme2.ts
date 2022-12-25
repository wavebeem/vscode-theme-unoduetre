import { BaseThemeDark } from "./Theme2";

export class MidnightTheme2 extends BaseThemeDark {
  colorBG0 = this.hsl(260, 40, 20);
  colorBG1 = this.hsl(260, 40, 16);
  colorBG2 = this.hsl(260, 40, 12);
  colorFG = this.hsl(260, 80, 90);

  colorSubtle = this.hsl(260, 40, 62);
  colorUno = this.hsl(140, 80, 65);
  colorDue = this.hsl(190, 80, 65);
  colorTre = this.hsl(330, 80, 65);

  colorBorder0 = this.hsl(260, 40, 40);
  colorBorder1 = this.hsl(260, 40, 52);
  colorStatusBG = this.hsl(260, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(260, 40, 15);
}
