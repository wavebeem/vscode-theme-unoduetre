import { BaseThemeDark } from "./Theme";

export class MiasmaTheme extends BaseThemeDark {
  colorBG0 = this.hsl(160, 35, 15);
  colorBG1 = this.hsl(160, 50, 10);
  colorBG2 = this.hsl(160, 50, 20);
  colorFG = this.hsl(160, 60, 80);

  colorSubtle = this.hsl(160, 5, 62);
  colorUno = this.hsl(60, 60, 60);
  colorDue = this.hsl(30, 80, 75);
  colorTre = this.hsl(310, 80, 80);

  colorBorder0 = this.hsl(160, 40, 25);
  colorBorder1 = this.hsl(160, 50, 50);
  colorStatusBG = this.hsl(160, 40, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(160, 35, 12);
}
