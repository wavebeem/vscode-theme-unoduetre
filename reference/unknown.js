const keys = new Set(require("./all-keys.json"));
const colors = require("../themes/light.json").colors;

for (const k of Object.keys(colors)) {
  if (!keys.has(k)) {
    console.log(`unknown key: ${k}`);
  }
}
