import { BaseThemeDark } from "./Theme2";

export class DarkTheme2 extends BaseThemeDark {
  colorBG0 = this.hsl(0, 0, 20);
  colorBG1 = this.hsl(0, 0, 16);
  colorBG2 = this.hsl(0, 0, 12);
  colorFG = this.hsl(0, 0, 90);

  colorSubtle = this.hsl(0, 0, 62);
  colorUno = this.hsl(70, 80, 65);
  colorDue = this.hsl(175, 80, 65);
  colorTre = this.hsl(30, 80, 65);

  colorBorder0 = this.hsl(0, 0, 30);
  colorBorder1 = this.hsl(0, 0, 52);
  colorStatusBG = this.hsl(0, 0, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(0, 0, 15);
}
