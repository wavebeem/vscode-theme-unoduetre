import { BaseThemeDark } from "./Theme2";

export class OceanTheme2 extends BaseThemeDark {
  colorBG0 = this.hsl(220, 40, 20);
  colorBG1 = this.hsl(220, 40, 16);
  colorBG2 = this.hsl(220, 40, 12);
  colorFG = this.hsl(220, 80, 90);

  colorSubtle = this.hsl(220, 20, 66);
  colorUno = this.hsl(160, 80, 65);
  colorDue = this.hsl(200, 80, 65);
  colorTre = this.hsl(30, 80, 65);

  colorBorder0 = this.hsl(220, 40, 40);
  colorBorder1 = this.hsl(220, 40, 52);
  colorStatusBG = this.hsl(220, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(220, 40, 15);
}
