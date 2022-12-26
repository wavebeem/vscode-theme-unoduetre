import { BaseThemeLight } from "./Theme";

export class NatureTheme extends BaseThemeLight {
  colorBG0 = this.hsl(160, 40, 94);
  colorBG1 = this.hsl(160, 40, 90);
  colorBG2 = this.hsl(160, 40, 82);
  colorFG = this.hsl(160, 75, 20);

  colorSubtle = this.hsl(160, 40, 34);
  colorUno = this.hsl(205, 85, 37);
  colorDue = this.hsl(50, 80, 27);
  colorTre = this.hsl(310, 95, 35);

  colorBorder0 = this.hsl(160, 40, 60);
  colorBorder1 = this.hsl(160, 40, 30);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(160, 40, 98);
}
