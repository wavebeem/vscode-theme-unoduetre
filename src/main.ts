import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import NatureTheme from "./NatureTheme";

console.log(new Date().toString());

new LightTheme().saveAs("light");
new DarkTheme().saveAs("dark");
new NatureTheme().saveAs("nature");
