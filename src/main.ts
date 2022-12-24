import { BubbleGumTheme } from "./BubbleGumTheme";
import { DarkTheme } from "./DarkTheme";
import "./extend-colord";
import { LightTheme } from "./LightTheme";
import { MidnightTheme } from "./MidnightTheme";
import { NatureTheme } from "./NatureTheme";
import { OceanTheme } from "./OceanTheme";
import { PeriwinkleTheme } from "./PeriwinkleTheme";
import { SprinklesTheme } from "./SprinklesTheme";

new LightTheme().saveAs("light");
new DarkTheme().saveAs("dark");
new NatureTheme().saveAs("nature");
new BubbleGumTheme().saveAs("bubblegum");
new MidnightTheme().saveAs("midnight");
new OceanTheme().saveAs("ocean");
new PeriwinkleTheme().saveAs("periwinkle");
new SprinklesTheme().saveAs("sprinkles");
