import { BaseThemeLight } from "./Theme2";

export class LightTheme2 extends BaseThemeLight {
  colorBG0 = this.hsl(0, 0, 94);
  colorBG1 = this.hsl(0, 0, 92);
  colorBG2 = this.hsl(0, 0, 88);
  colorFG = this.hsl(0, 0, 20);

  colorSubtle = this.hsl(300, 20, 66);
  colorUno = this.hsl(320, 95, 35);
  colorDue = this.hsl(215, 95, 35);
  colorTre = this.hsl(125, 95, 25);

  colorBorder0 = this.hsl(0, 0, 80);
  colorBorder1 = this.hsl(0, 0, 55);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(0, 0, 98);
}
