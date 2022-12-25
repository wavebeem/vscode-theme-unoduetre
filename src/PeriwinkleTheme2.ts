import { BaseThemeLight } from "./Theme2";

export class PeriwinkleTheme2 extends BaseThemeLight {
  colorBG0 = this.hsl(240, 30, 94);
  colorBG1 = this.hsl(240, 40, 90);
  colorBG2 = this.hsl(240, 40, 82);
  colorFG = this.hsl(240, 80, 25);

  colorSubtle = this.hsl(240, 20, 50);
  colorUno = this.hsl(330, 80, 35);
  colorDue = this.hsl(200, 80, 30);
  colorTre = this.hsl(110, 80, 25);

  colorBorder0 = this.hsl(240, 40, 80);
  colorBorder1 = this.hsl(240, 40, 50);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(240, 40, 98);
}
