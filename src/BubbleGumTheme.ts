import { BaseThemeLight } from "./Theme";

export class BubbleGumTheme extends BaseThemeLight {
  colorBG0 = this.hsl(300, 40, 94);
  colorBG1 = this.hsl(300, 40, 90);
  colorBG2 = this.hsl(300, 40, 82);
  colorFG = this.hsl(300, 80, 25);

  colorSubtle = this.hsl(300, 20, 45);
  colorUno = this.hsl(270, 70, 45);
  colorDue = this.hsl(350, 80, 35);
  colorTre = this.hsl(180, 80, 26);

  colorBorder0 = this.hsl(300, 40, 70);
  colorBorder1 = this.hsl(300, 40, 45);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(300, 40, 98);
}
