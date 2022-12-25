import { BaseThemeDark } from "./Theme2";

export class SprinklesTheme2 extends BaseThemeDark {
  colorBG0 = this.hsl(280, 35, 20);
  colorBG1 = this.hsl(280, 35, 16);
  colorBG2 = this.hsl(280, 35, 12);
  colorFG = this.hsl(280, 80, 90);

  colorSubtle = this.hsl(280, 20, 62);
  colorUno = this.hsl(320, 80, 70);
  colorDue = this.hsl(45, 80, 70);
  colorTre = this.hsl(170, 80, 70);

  colorBorder0 = this.hsl(280, 35, 40);
  colorBorder1 = this.hsl(280, 35, 52);
  colorStatusBG = this.hsl(280, 35, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(280, 35, 15);
}
