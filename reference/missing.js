const keys = new Set(require("./all-keys.json"));
const colors = require("../themes/light.json").colors;

for (const k of keys) {
  if (!colors.hasOwnProperty(k)) {
    console.log(`missing key ${k}`);
  }
}
