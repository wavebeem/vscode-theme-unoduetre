import { BaseThemeLight } from "./Theme2";

export class NatureTheme2 extends BaseThemeLight {
  colorBG0 = this.hsl(160, 30, 94);
  colorBG1 = this.hsl(160, 30, 92);
  colorBG2 = this.hsl(160, 30, 88);
  colorFG = this.hsl(160, 75, 20);

  colorSubtle = this.hsl(160, 30, 52);
  colorUno = this.hsl(200, 95, 35);
  colorDue = this.hsl(70, 60, 29);
  colorTre = this.hsl(310, 95, 35);

  colorBorder0 = this.hsl(160, 30, 70);
  colorBorder1 = this.hsl(160, 30, 46);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(160, 30, 98);
}
