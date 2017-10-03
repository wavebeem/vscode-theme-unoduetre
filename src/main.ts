import * as fs from "fs";
import * as tinycolor from "tinycolor2";

interface Style {
  foreground: string;
  fontStyle: string;
}

enum ThemeType {
  LIGHT = "light",
  DARK = "dark"
}

abstract class Theme {
  // TODO: This kills a lot of type checking, so let's try to remove it later.
  // The way we attach all the properties can't be analyzed by TS.
  [key: string]: any;

  abstract themeType(): ThemeType;
  abstract filename(): string;

  hsl(h: number, s: number, l: number) {
    return tinycolor({ h, s, l }).toHexString();
  }

  gray(l: number) {
    return this.hsl(0, 0, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 45),
      this.hsl(hue, 55, 55),
      this.hsl(hue, 35, 65),
      this.hsl(hue, 25, 70)
    ];
  }

  dilute(color: string, percent: number) {
    if (percent === 100) {
      return color;
    }
    const scaled = Math.floor(255 * (percent / 100));
    const alpha = (scaled.toString(16) as any).padStart(2, "0");
    return color + alpha;
  }

  constructor() {
    this.UNO = 320;
    this.DUE = 215;
    this.TRE = 125;
    [this.UNO_1, this.UNO_2, this.UNO_3, this.UNO_4, this.UNO_5] = this.ramp(
      this.UNO
    );
    [this.DUE_1, this.DUE_2, this.DUE_3] = this.ramp(this.DUE);
    [this.TRE_1] = this.ramp(this.TRE);
    this.YELLOW = "#f1c40f";
    this.ORANGE = "#e67e22";
    this.BLUE = "#3498db";
    this.PURPLE = "#9b59b6";
    this.WHITE = "#ffffff";
    this.BLACK = "#000000";
    this.RED = "#cc0000";
    this.CYAN = "#00bcd4";
    this.TRANSPARENT = "#00000000";
    this.NO_ = "#ff00ff";
    this.T_BG = this.WHITE;
    this.T_FG = "#5c668e";
    this.T_BLACK = "#31364a";
    this.T_RED = "#a91b1c";
    this.T_GREEN = "#00a337";
    this.T_YELLOW = "#cc8410";
    this.T_BLUE = "#39b898";
    this.T_MAGENTA = "#d95278";
    this.T_CYAN = "#7f9608";
    this.T_WHITE = "#e6e6e6";
    this.UI_FG = "#222222";
    this.UI_ACCENT = this.hsl(this.TRE, 70, 40);
    this.FG = this.hsl(this.UNO, 20, 20);
    this.BG = this.gray(98);
    this.BORDER_SOFT = this.dilute(this.BLACK, 5);
    this.BORDER_HARD = this.dilute(this.BLACK, 10);
  }

  config() {
    return {
      type: this.themeType(),
      colors: this.colors(),
      tokenColors: this.tokenColors()
    };
  }

  colors() {
    return {
      focusBorder: this.UI_ACCENT,
      "widget.shadow": this.dilute(this.BLACK, 30),
      "input.border": this.gray(80),
      "progressBar.background": this.UI_ACCENT,
      "list.activeSelectionBackground": this.hsl(this.TRE, 50, 50),
      "list.inactiveSelectionBackground": this.hsl(this.TRE, 40, 80),
      "list.focusBackground": this.hsl(this.TRE, 50, 80),
      "list.hoverBackground": this.dilute(this.BLACK, 5),
      "statusBar.border": this.BORDER_HARD,
      "statusBar.background": this.gray(25),
      "statusBar.foreground": this.WHITE,
      "activityBar.border": this.BORDER_SOFT,
      "activityBar.background": this.BG,
      "activityBar.foreground": this.BLACK,
      "activityBarBadge.background": this.UI_ACCENT,
      "activityBarBadge.foreground": this.WHITE,
      "editorWidget.background": this.gray(98),
      editorWidgetBorder: this.gray(80),
      "editorBracketMatch.background": this.dilute(this.CYAN, 20),
      "editorBracketMatch.border": this.TRANSPARENT,
      "editor.findMatchBackground": this.dilute(this.ORANGE, 50),
      "editor.findMatchHighlightBackground": this.dilute(this.YELLOW, 50),
      "editor.findRangeHighlightBackground": this.dilute(this.NO_, 50),
      "editor.foreground": this.FG,
      "editor.background": this.BG,
      "editor.lineHighlightBackground": this.dilute(this.YELLOW, 10),
      "editor.rangeHighlightBackground": this.dilute(this.ORANGE, 10),
      "editor.selectionBackground": this.dilute(this.YELLOW, 30),
      "editor.inactiveSelectionBackground": this.dilute(this.YELLOW, 25),
      "editor.wordHighlightBackground": this.dilute(this.BLUE, 15),
      "editor.wordHighlightStrongBackground": this.dilute(this.PURPLE, 20),
      "editorCursor.foreground": this.RED,
      "editorGroupHeader.tabsBackground": this.BG,
      "editorIndentGuide.background": this.BORDER_HARD,
      "editorRuler.foreground": this.BORDER_HARD,
      "editorLineNumber.foreground": this.dilute(this.BLACK, 30),
      foreground: this.UI_FG,
      "notification.background": this.UI_FG,
      "notification.foreground": this.WHITE,
      "panel.background": this.T_BG,
      "panel.border": this.BORDER_HARD,
      "panelTitle.activeBorder": this.gray(50),
      "panelTitle.activeForeground": this.BLACK,
      "panelTitle.inactiveForeground": this.gray(60),
      "peekViewEditor.matchHighlightBackground": this.dilute(this.YELLOW, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(this.YELLOW, 50),
      "sideBar.border": this.BORDER_SOFT,
      "sideBar.background": this.BG,
      "sideBarSectionHeader.background": this.dilute(this.BLACK, 3),
      "tab.activeBackground": this.hsl(this.TRE, 50, 80),
      "tab.activeForeground": this.BLACK,
      "tab.inactiveBackground": this.TRANSPARENT,
      "tab.inactiveForeground": this.gray(50),
      "tab.border": this.TRANSPARENT,
      "titleBar.activeBackground": this.BG,
      "titleBar.activeForeground": this.BLACK,
      "titleBar.inactiveBackground": this.BG,
      "titleBar.inactiveForeground": this.gray(70),
      "titleBar.border": this.BORDER_SOFT,
      "terminal.foreground": this.T_FG,
      "terminal.background": this.T_BG,
      "terminal.ansiBlack": this.T_BLACK,
      "terminal.ansiBlue": this.T_BLUE,
      "terminal.ansiBrightBlack": this.T_BLACK,
      "terminal.ansiBrightBlue": this.T_BLUE,
      "terminal.ansiBrightCyan": this.T_CYAN,
      "terminal.ansiBrightGreen": this.T_GREEN,
      "terminal.ansiBrightMagenta": this.T_MAGENTA,
      "terminal.ansiBrightRed": this.T_RED,
      "terminal.ansiBrightWhite": this.T_WHITE,
      "terminal.ansiBrightYellow": this.T_YELLOW,
      "terminal.ansiCyan": this.T_CYAN,
      "terminal.ansiGreen": this.T_GREEN,
      "terminal.ansiMagenta": this.T_MAGENTA,
      "terminal.ansiRed": this.T_RED,
      "terminal.ansiWhite": this.T_WHITE,
      "terminal.ansiYellow": this.T_YELLOW
    };
  }

  tokenColors() {
    return this.scopes().reduce((arr, item) => {
      let [x, y] = item;
      if (Array.isArray(y)) {
        y = y.join(", ");
      }
      const name = x as string;
      const scope = y as string;
      const settings = this.namedScopeToSettings(name);
      if (settings) {
        return [...arr, { name, scope, settings }];
      }
      return arr;
    }, []);
  }

  scopes() {
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
    const obj: { [key: string]: Style } = {
      Call: this.style(this.UNO_2),
      Parameter: this.style(this.DUE_3),
      Comments: this.style(this.UNO_5),
      Punctuation: this.style(this.UNO_4),
      Delimiters: this.style(this.UNO_5),
      Operators: this.style(this.UNO_3),
      Search: this.style(this.UNO_2, "bold"),
      "Search Line": this.style(this.DUE_1, "bold"),
      Keywords: this.style(this.UNO_1, "bold"),
      Variables: this.style(this.DUE_3),
      Functions: this.style(this.DUE_2, "bold"),
      Classes: this.style(this.DUE_2, "bold"),
      Methods: this.style(this.DUE_2),
      Storage: this.style(this.UNO_1, "bold"),
      Strings: this.style(this.TRE_1),
      Symbols: this.style(this.DUE_1),
      Numbers: this.style(this.DUE_1),
      Boolean: this.style(this.DUE_1),
      Constants: this.style(this.DUE_1),
      Support: this.style(this.UNO_2),
      Tags: this.style(this.DUE_1),
      Attributes: this.style(this.DUE_1),
      "Attribute IDs": this.style(this.DUE_1),
      Selector: this.style(this.UNO_2),
      Headings: this.style(this.DUE_1, "bold"),
      Units: this.style(this.DUE_3),
      Bold: this.style(this.UNO_2, "bold"),
      Italic: this.style(this.UNO_2, "italic"),
      Code: this.style(this.UNO_3),
      "Link Text": this.style(this.UNO_4, "bold"),
      "Link Url": this.style(this.DUE_1),
      Lists: this.style(this.DUE_3),
      Quotes: this.style(this.UNO_4),
      Separator: this.style(this.UNO_4),
      Inserted: this.style(this.DUE_2),
      Deleted: this.style(this.RED),
      Changed: this.style(this.UNO_4),
      Colors: this.style(this.DUE_3),
      "Regular Expressions": this.style(this.UNO_3),
      "Escape Characters": this.style(this.UNO_3),
      Embedded: this.style(this.UNO_2),
      Broken: this.style(this.RED, "bold"),
      Deprecated: this.style(this.RED, "bold"),
      Unimplemented: this.style(this.RED, "bold"),
      Illegal: this.style(this.RED, "bold")
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

class LightTheme extends Theme {
  filename() {
    return "light";
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}

new LightTheme().build();
// new DarkTheme().build();
