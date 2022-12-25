import { BaseThemeDark } from "./Theme";

export class SprinklesTheme extends BaseThemeDark {
  colorBG0 = this.hsl(280, 40, 20);
  colorBG1 = this.hsl(280, 40, 16);
  colorBG2 = this.hsl(280, 40, 26);
  colorFG = this.hsl(280, 80, 90);

  colorSubtle = this.hsl(280, 20, 62);
  colorUno = this.hsl(320, 80, 70);
  colorDue = this.hsl(45, 80, 70);
  colorTre = this.hsl(170, 70, 70);

  colorBorder0 = this.hsl(280, 35, 35);
  colorBorder1 = this.hsl(280, 35, 58);
  colorStatusBG = this.hsl(280, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(280, 35, 15);
}
