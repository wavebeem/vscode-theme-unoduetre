import { BaseThemeLight } from "./Theme";

export class PeriwinkleTheme extends BaseThemeLight {
  colorBG0 = this.hsl(240, 40, 94);
  colorBG1 = this.hsl(240, 40, 90);
  colorBG2 = this.hsl(240, 40, 82);
  colorFG = this.hsl(240, 80, 25);

  colorSubtle = this.hsl(240, 20, 48);
  colorUno = this.hsl(330, 80, 35);
  colorDue = this.hsl(200, 80, 30);
  colorTre = this.hsl(110, 80, 25);

  colorBorder0 = this.hsl(240, 40, 70);
  colorBorder1 = this.hsl(240, 40, 50);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(240, 40, 98);
}
