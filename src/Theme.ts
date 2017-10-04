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
  YELLOW: string;
  ORANGE: string;
  BLUE: string;
  PURPLE: string;
  WHITE: string;
  BLACK: string;
  RED: string;
  CYAN: string;
  TRANSPARENT: string;
  NO_: string;
  T_BG: string;
  T_FG: string;
  T_BLACK: string;
  T_RED: string;
  T_GREEN: string;
  T_YELLOW: string;
  T_BLUE: string;
  T_MAGENTA: string;
  T_CYAN: string;
  T_WHITE: string;
  UI_FG: string;
  UI_ACCENT: string;
  FG: string;
  BG: string;
  INPUT_BG: string;
  BORDER_SOFT: string;
  BORDER_HARD: string;
  BORDER_HARDER: string;
  SHADOW: string;
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
      focusBorder: p.UI_ACCENT,
      "widget.shadow": p.SHADOW,
      "input.border": p.BORDER_HARDER,
      "input.background": p.INPUT_BG,
      "progressBar.background": p.UI_ACCENT,
      "inputOption.activeBorder": p.UI_ACCENT,
      "list.highlightForeground": p.RED,
      "list.activeSelectionBackground": p.activeSelectionBG,
      "list.inactiveSelectionBackground": p.inactiveSelectionBG,
      "list.focusBackground": p.accentFocusBG,
      "list.hoverBackground": this.dilute(p.UI_FG, 5),
      "statusBar.border": p.BORDER_HARDER,
      "statusBar.background": p.statusBarBG,
      "statusBar.foreground": p.WHITE,
      "activityBar.border": p.BORDER_SOFT,
      "activityBar.background": p.BG,
      "activityBar.foreground": p.UI_FG,
      "activityBarBadge.background": p.UI_ACCENT,
      "activityBarBadge.foreground": p.WHITE,
      "editorWidget.foreground": p.UI_FG,
      "editorWidget.background": p.widgetBG,
      "editorWidget.border": p.widgetBorder,
      "editorBracketMatch.background": this.dilute(p.CYAN, 20),
      "editorBracketMatch.border": p.TRANSPARENT,
      "editor.findMatchBackground": this.dilute(p.ORANGE, 50),
      "editor.findMatchHighlightBackground": this.dilute(p.YELLOW, 50),
      "editor.findRangeHighlightBackground": this.dilute(p.NO_, 50),
      "editor.foreground": p.FG,
      "editor.background": p.BG,
      "editor.lineHighlightBackground": p.lineHighlightBG,
      "editor.rangeHighlightBackground": this.dilute(p.ORANGE, 10),
      "editor.selectionBackground": this.dilute(p.YELLOW, 30),
      "editor.inactiveSelectionBackground": this.dilute(p.YELLOW, 25),
      "editor.wordHighlightBackground": this.dilute(p.BLUE, 15),
      "editor.wordHighlightStrongBackground": this.dilute(p.PURPLE, 20),
      "editorCursor.foreground": p.RED,
      "editorGroupHeader.tabsBackground": p.BG,
      "editorIndentGuide.background": p.BORDER_HARD,
      "editorRuler.foreground": p.BORDER_HARD,
      "editorLineNumber.foreground": this.dilute(p.UI_FG, 30),
      foreground: p.UI_FG,
      "notification.background": p.UI_FG,
      "notification.foreground": p.WHITE,
      "panel.background": p.T_BG,
      "panel.border": p.BORDER_HARD,
      "panelTitle.activeBorder": this.dilute(p.UI_FG, 50),
      "panelTitle.activeForeground": p.UI_FG,
      "panelTitle.inactiveForeground": this.dilute(p.UI_FG, 60),
      "peekViewEditor.matchHighlightBackground": this.dilute(p.YELLOW, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(p.YELLOW, 50),
      "sideBar.border": p.BORDER_SOFT,
      "sideBar.background": p.BG,
      "sideBarSectionHeader.background": this.dilute(p.UI_FG, 3),
      "tab.activeBackground": p.accentFocusBG,
      "tab.activeForeground": p.UI_FG,
      "tab.inactiveBackground": p.TRANSPARENT,
      "tab.inactiveForeground": this.dilute(p.UI_FG, 50),
      "tab.border": p.TRANSPARENT,
      "titleBar.activeBackground": p.BG,
      "titleBar.activeForeground": p.UI_FG,
      "titleBar.inactiveBackground": p.BG,
      "titleBar.inactiveForeground": this.dilute(p.UI_FG, 70),
      "titleBar.border": p.BORDER_SOFT,
      "terminal.foreground": p.T_FG,
      "terminal.background": p.T_BG,
      "terminal.ansiBlack": p.T_BLACK,
      "terminal.ansiBlue": p.T_BLUE,
      "terminal.ansiBrightBlack": p.T_BLACK,
      "terminal.ansiBrightBlue": p.T_BLUE,
      "terminal.ansiBrightCyan": p.T_CYAN,
      "terminal.ansiBrightGreen": p.T_GREEN,
      "terminal.ansiBrightMagenta": p.T_MAGENTA,
      "terminal.ansiBrightRed": p.T_RED,
      "terminal.ansiBrightWhite": p.T_WHITE,
      "terminal.ansiBrightYellow": p.T_YELLOW,
      "terminal.ansiCyan": p.T_CYAN,
      "terminal.ansiGreen": p.T_GREEN,
      "terminal.ansiMagenta": p.T_MAGENTA,
      "terminal.ansiRed": p.T_RED,
      "terminal.ansiWhite": p.T_WHITE,
      "terminal.ansiYellow": p.T_YELLOW
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
      Deleted: this.style(p.RED),
      Changed: this.style(uno4),
      Colors: this.style(due3),
      "Regular Expressions": this.style(uno3),
      "Escape Characters": this.style(uno3),
      Embedded: this.style(uno2),
      Broken: this.style(p.RED, "bold"),
      Deprecated: this.style(p.RED, "bold"),
      Unimplemented: this.style(p.RED, "bold"),
      Illegal: this.style(p.RED, "bold")
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
