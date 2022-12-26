import { BaseThemeLight } from "./Theme";

export class PeriwinkleTheme extends BaseThemeLight {
  colorBG0 = this.hsl(240, 40, 94);
  colorBG1 = this.hsl(240, 40, 90);
  colorBG2 = this.hsl(240, 40, 82);
  colorFG = this.hsl(240, 80, 25);

  colorSubtle = this.hsl(310, 40, 45);
  colorUno = this.hsl(310, 80, 35);
  colorDue = this.hsl(195, 80, 30);
  colorTre = this.hsl(120, 80, 22);

  colorBorder0 = this.hsl(240, 40, 70);
  colorBorder1 = this.hsl(240, 40, 50);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(240, 40, 98);
}
