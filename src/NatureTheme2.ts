import { Theme2, ThemeType } from "./Theme2";

const hueBG = 160;
const hueUno = 200;
const hueDue = 70;
const hueTre = 310;

export class NatureTheme2 extends Theme2 {
  override themeType(): ThemeType {
    return "light";
  }

  override colorBG0(): string {
    return this.hsl(hueBG, 30, 94);
  }
  override colorBG1(): string {
    return this.hsl(hueBG, 30, 92);
  }
  override colorBG2(): string {
    return this.hsl(hueBG, 30, 88);
  }

  override colorFG(): string {
    return this.hsl(hueBG, 75, 20);
  }

  override colorSubtle(): string {
    return this.hsl(hueBG, 75, 28);
  }

  override colorUno(): string {
    return this.hsl(hueUno, 95, 35);
  }
  override colorDue(): string {
    return this.hsl(hueDue, 60, 29);
  }
  override colorTre(): string {
    return this.hsl(hueTre, 95, 35);
  }

  override colorBorder0(): string {
    return this.hsl(hueBG, 30, 70);
  }
  override colorBorder1(): string {
    return this.hsl(hueBG, 30, 46);
  }

  override colorStatusBG(): string {
    return this.colorFG();
  }
  override colorStatusFG(): string {
    return this.colorBG0();
  }
  override colorStatusBorder(): string {
    return this.colorStatusBG();
  }

  override colorShadow0(): string {
    return this.dilute(this.colorFG(), 10);
  }
  override colorShadow1(): string {
    return this.dilute(this.colorFG(), 50);
  }

  override colorWidgetBG(): string {
    return this.hsl(hueBG, 30, 98);
  }
  override colorWidgetBorder(): string {
    return this.colorBorder1();
  }
}
