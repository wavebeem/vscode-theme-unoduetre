import { BaseThemeDark } from "./Theme";

export class OceanTheme extends BaseThemeDark {
  colorBG0 = this.hsl(220, 45, 20);
  colorBG1 = this.hsl(220, 45, 16);
  colorBG2 = this.hsl(220, 45, 26);
  colorFG = this.hsl(220, 80, 90);

  colorSubtle = this.hsl(220, 40, 66);
  colorUno = this.hsl(160, 60, 50);
  colorDue = this.hsl(200, 80, 65);
  colorTre = this.hsl(30, 80, 65);

  colorBorder0 = this.hsl(220, 45, 35);
  colorBorder1 = this.hsl(220, 45, 58);
  colorStatusBG = this.hsl(220, 45, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(220, 45, 15);
}
