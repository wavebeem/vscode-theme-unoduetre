import { BaseThemeDark } from "./Theme";

export class SprinklesTheme extends BaseThemeDark {
  colorBG0 = this.hsl(280, 40, 20);
  colorBG1 = this.hsl(280, 40, 16);
  colorBG2 = this.hsl(280, 40, 26);
  colorFG = this.hsl(280, 80, 90);

  colorSubtle = this.hsl(280, 30, 65);
  colorUno = this.hsl(45, 70, 65);
  colorDue = this.hsl(320, 80, 75);
  colorTre = this.hsl(170, 60, 60);

  colorBorder0 = this.hsl(280, 35, 35);
  colorBorder1 = this.hsl(280, 35, 58);
  colorStatusBG = this.hsl(280, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(280, 35, 15);
}
