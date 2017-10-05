import * as fs from "fs";
import * as tinycolor from "tinycolor2";

export interface Style {
  foreground: string;
  fontStyle: string;
}

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark"
}

export interface Palette {
  yellow: string;
  orange: string;
  blue: string;
  purple: string;
  white: string;
  black: string;
  red: string;
  cyan: string;
  transparent: string;
  __NO__: string;
  tBG: string;
  tFG: string;
  tBlack: string;
  tRed: string;
  tGreen: string;
  tYellow: string;
  tBlue: string;
  tMagenta: string;
  tCyan: string;
  tWhite: string;
  uiFG: string;
  uiAccent: string;
  fg: string;
  bg: string;
  inputBG: string;
  borderSoft: string;
  borderMedium: string;
  borderHard: string;
  shadow: string;
  activeSelectionBG: string;
  inactiveSelectionBG: string;
  accentFocusBG: string;
  statusBarBG: string;
  lineHighlightBG: string;
  widgetBG: string;
  widgetBorder: string;
}

export default abstract class Theme {
  abstract uno: number;
  abstract due: number;
  abstract tre: number;
  abstract palette: Palette;
  abstract themeType(): ThemeType;
  abstract filename(): string;
  abstract ramp(hue: number): string[];

  hsl(h: number, s: number, l: number) {
    return tinycolor({ h, s, l }).toHexString();
  }

  gray(l: number) {
    return this.hsl(0, 0, l);
  }

  dilute(color: string, percent: number) {
    if (percent === 100) {
      return color;
    }
    const ratio = percent / 100;
    const scaled = Math.floor(255 * ratio);
    const hex = scaled.toString(16);
    const alpha = hex.length < 2 ? `0${hex}` : hex;
    return color + alpha;
  }

  config() {
    return {
      type: this.themeType(),
      colors: this.colors(),
      tokenColors: this.tokenColors()
    };
  }

  colors() {
    const p = this.palette;
    return {
      focusBorder: p.uiAccent,
      "widget.shadow": p.shadow,
      "input.border": p.borderHard,
      "input.background": p.inputBG,
      "progressBar.background": p.uiAccent,
      "inputOption.activeBorder": p.uiAccent,
      "list.highlightForeground": p.red,
      "list.activeSelectionBackground": p.activeSelectionBG,
      "list.inactiveSelectionBackground": p.inactiveSelectionBG,
      "list.focusBackground": p.accentFocusBG,
      "list.hoverBackground": this.dilute(p.uiFG, 5),
      "statusBar.border": p.borderHard,
      "statusBar.background": p.statusBarBG,
      "statusBar.foreground": p.white,
      "activityBar.border": p.borderSoft,
      "activityBar.background": p.bg,
      "activityBar.foreground": p.uiFG,
      "activityBarBadge.background": p.uiAccent,
      "activityBarBadge.foreground": p.white,
      "editorWidget.foreground": p.uiFG,
      "editorWidget.background": p.widgetBG,
      "editorWidget.border": p.widgetBorder,
      "editorBracketMatch.background": this.dilute(p.cyan, 20),
      "editorBracketMatch.border": p.transparent,
      "editor.findMatchBackground": this.dilute(p.orange, 50),
      "editor.findMatchHighlightBackground": this.dilute(p.yellow, 50),
      "editor.findRangeHighlightBackground": this.dilute(p.__NO__, 50),
      "editor.foreground": p.fg,
      "editor.background": p.bg,
      "editor.lineHighlightBackground": p.lineHighlightBG,
      "editor.rangeHighlightBackground": this.dilute(p.orange, 10),
      "editor.selectionBackground": this.dilute(p.yellow, 30),
      "editor.inactiveSelectionBackground": this.dilute(p.yellow, 25),
      "editor.wordHighlightBackground": this.dilute(p.blue, 15),
      "editor.wordHighlightStrongBackground": this.dilute(p.purple, 20),
      "editorCursor.foreground": p.red,
      "editorGroupHeader.tabsBackground": p.bg,
      "editorIndentGuide.background": p.borderMedium,
      "editorRuler.foreground": p.borderMedium,
      "editorLineNumber.foreground": this.dilute(p.uiFG, 30),
      foreground: p.uiFG,
      "panel.background": p.tBG,
      "panel.border": p.borderMedium,
      "panelTitle.activeBorder": this.dilute(p.uiFG, 50),
      "panelTitle.activeForeground": p.uiFG,
      "panelTitle.inactiveForeground": this.dilute(p.uiFG, 60),
      "peekViewEditor.matchHighlightBackground": this.dilute(p.yellow, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(p.yellow, 50),
      "sideBar.border": p.borderSoft,
      "sideBar.background": p.bg,
      "sideBarSectionHeader.background": this.dilute(p.uiFG, 3),
      "tab.activeBackground": p.accentFocusBG,
      "tab.activeForeground": p.uiFG,
      "tab.inactiveBackground": p.transparent,
      "tab.inactiveForeground": this.dilute(p.uiFG, 50),
      "tab.border": p.transparent,
      "titleBar.activeBackground": p.bg,
      "titleBar.activeForeground": p.uiFG,
      "titleBar.inactiveBackground": p.bg,
      "titleBar.inactiveForeground": this.dilute(p.uiFG, 70),
      "titleBar.border": p.borderSoft,
      "terminal.foreground": p.tFG,
      "terminal.background": p.tBG,
      "terminal.ansiBlack": p.tBlack,
      "terminal.ansiBlue": p.tBlue,
      "terminal.ansiBrightBlack": p.tBlack,
      "terminal.ansiBrightBlue": p.tBlue,
      "terminal.ansiBrightCyan": p.tCyan,
      "terminal.ansiBrightGreen": p.tGreen,
      "terminal.ansiBrightMagenta": p.tMagenta,
      "terminal.ansiBrightRed": p.tRed,
      "terminal.ansiBrightWhite": p.tWhite,
      "terminal.ansiBrightYellow": p.tYellow,
      "terminal.ansiCyan": p.tCyan,
      "terminal.ansiGreen": p.tGreen,
      "terminal.ansiMagenta": p.tMagenta,
      "terminal.ansiRed": p.tRed,
      "terminal.ansiWhite": p.tWhite,
      "terminal.ansiYellow": p.tYellow
    };
  }

  tokenColors() {
    return this.scopes().reduce((arr, item) => {
      const [name, scopes] = item;
      const scope = scopes.join(", ");
      const settings = this.namedScopeToSettings(name);
      if (settings) {
        return [...arr, { name, scope, settings }];
      }
      return arr;
    }, []);
  }

  scopes(): [string, string[]][] {
    return [
      ["Parameter", ["variable.parameter.function"]],
      ["Comments", ["comment", "punctuation.definition.comment"]],
      [
        "Punctuation",
        [
          "punctuation.definition.string",
          "punctuation.definition.variable",
          "punctuation.definition.string",
          "punctuation.definition.parameters",
          "punctuation.definition.string",
          "punctuation.definition.array",
          "punctuation.terminator"
        ]
      ],
      [
        "Delimiters",
        [
          "punctuation.separator",
          "punctuation.section",
          "meta.brace",
          "meta.delimiter"
        ]
      ],
      ["Operators", ["keyword.operator"]],
      ["Keywords", ["keyword.control"]],
      [
        "Variables",
        ["variable.declaration", "variable.parameter", "variable.other"]
      ],
      ["Search", ["entity.name.filename.find-in-files"]],
      ["Search Line", ["constant.numeric.line-number.match.find-in-files"]],
      [
        "Functions",
        ["entity.name.function", "meta.require", "support.function.any-method"]
      ],
      [
        "Classes",
        [
          "support.class",
          "entity.name.class",
          "entity.name.type.class",
          "entity.name.type.module",
          "entity.other.inherited-class"
        ]
      ],
      ["Methods", ["keyword.other.special-method"]],
      ["Storage", ["storage"]],
      ["Support", ["support"]],
      [
        "Strings",
        [
          "string",
          "punctuation.definition.string",
          "support.constant.property-value"
        ]
      ],
      ["Numbers", ["constant.numeric"]],
      ["Symbols", ["constant.other.symbol"]],
      ["Boolean", ["constant.language.boolean"]],
      ["Constants", ["constant", "support.constant", "variable.language"]],
      ["Tags", ["entity.name.tag", "punctuation.definition.tag"]],
      ["Attributes", ["entity.other.attribute-name"]],
      [
        "Attribute IDs",
        ["entity.other.attribute-name.id", "punctuation.definition.entity"]
      ],
      ["Selector", ["meta.selector", "meta.object-literal.key"]],
      [
        "Headings",
        ["markup.heading punctuation.definition.heading", "entity.name.section"]
      ],
      ["Units", ["keyword.other.unit"]],
      ["Bold", ["markup.bold", "punctuation.definition.bold"]],
      ["Italic", ["markup.italic", "punctuation.definition.italic"]],
      ["Code", ["markup.raw.inline"]],
      ["Link Text", ["string.other.link"]],
      ["Link Url", ["meta.link"]],
      ["Lists", ["markup.list"]],
      ["Quotes", ["markup.quote"]],
      ["Separator", ["meta.separator"]],
      ["Inserted", ["markup.inserted"]],
      ["Deleted", ["markup.deleted"]],
      ["Changed", ["markup.changed"]],
      ["Colors", ["constant.other.color"]],
      ["Regular Expressions", ["string.regexp"]],
      ["Escape Characters", ["constant.character.escape"]],
      ["Embedded", ["punctuation.section.embedded", "variable.interpolation"]],
      ["Illegal", ["invalid", "invalid.illegal"]],
      ["Broken", ["invalid.broken"]],
      ["Deprecated", ["invalid.deprecated"]],
      ["Unimplemented", ["invalid.unimplemented"]]
    ];
  }

  namedScopeToSettings(name: string) {
    const [uno1, uno2, uno3, uno4, uno5] = this.ramp(this.uno);
    const [due1, due2, due3] = this.ramp(this.due);
    const [tre1] = this.ramp(this.tre);
    const p = this.palette;
    const obj: { [key: string]: Style } = {
      Call: this.style(uno2),
      Parameter: this.style(due3),
      Comments: this.style(uno5),
      Punctuation: this.style(uno4),
      Delimiters: this.style(uno5),
      Operators: this.style(uno3),
      Search: this.style(uno2, "bold"),
      "Search Line": this.style(due1, "bold"),
      Keywords: this.style(uno1, "bold"),
      Variables: this.style(due3),
      Functions: this.style(due2, "bold"),
      Classes: this.style(due2, "bold"),
      Methods: this.style(due2),
      Storage: this.style(uno1, "bold"),
      Strings: this.style(tre1),
      Symbols: this.style(due1),
      Numbers: this.style(due1),
      Boolean: this.style(due1),
      Constants: this.style(due1),
      Support: this.style(uno2),
      Tags: this.style(due1),
      Attributes: this.style(due1),
      "Attribute IDs": this.style(due1),
      Selector: this.style(uno2),
      Headings: this.style(due1, "bold"),
      Units: this.style(due3),
      Bold: this.style(uno2, "bold"),
      Italic: this.style(uno2, "italic"),
      Code: this.style(uno3),
      "Link Text": this.style(uno4, "bold"),
      "Link Url": this.style(due1),
      Lists: this.style(due3),
      Quotes: this.style(uno4),
      Separator: this.style(uno4),
      Inserted: this.style(due2),
      Deleted: this.style(p.red),
      Changed: this.style(uno4),
      Colors: this.style(due3),
      "Regular Expressions": this.style(uno3),
      "Escape Characters": this.style(uno3),
      Embedded: this.style(uno2),
      Broken: this.style(p.red, "bold"),
      Deprecated: this.style(p.red, "bold"),
      Unimplemented: this.style(p.red, "bold"),
      Illegal: this.style(p.red, "bold")
    };
    return obj[name];
  }

  style(color: string, ...fontStyle: string[]): Style {
    return {
      foreground: color,
      fontStyle: fontStyle.join(" ")
    };
  }

  build() {
    const json = JSON.stringify(this.config(), null, 2);
    const d = new Date().toString();
    console.log(`Saving theme "${this.filename()}" (${d})`);
    fs.writeFileSync(`themes/${this.filename()}.json`, json);
  }
}
