import { BaseThemeLight } from "./Theme2";

export class BubbleGumTheme2 extends BaseThemeLight {
  colorBG0 = this.hsl(300, 30, 94);
  colorBG1 = this.hsl(300, 30, 92);
  colorBG2 = this.hsl(300, 30, 88);
  colorFG = this.hsl(300, 80, 25);

  colorSubtle = this.hsl(300, 20, 66);
  colorUno = this.hsl(270, 70, 45);
  colorDue = this.hsl(350, 80, 35);
  colorTre = this.hsl(180, 80, 26);

  colorBorder0 = this.hsl(300, 30, 80);
  colorBorder1 = this.hsl(300, 30, 55);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.hsl(300, 30, 98);
}
