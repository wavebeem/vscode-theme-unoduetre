import * as fs from "fs";
import * as tinycolor from "tinycolor2";

function sortedObject<T>(obj: Record<string, T>) {
  const ret: Record<string, T> = {};
  for (const key of Object.keys(obj).sort()) {
    ret[key] = obj[key];
  }
  return ret;
}

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
  accent0: string;
  accent1: string;
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
  statusBarFG: string;
  lineHighlightBG: string;
  widgetBG: string;
  widgetBorder: string;
  bracketMatchBG: string;
  bracketMatchBorder: string;
  editorLine: string;
}

export interface Scope {
  name: string;
  scopes: string[];
}

export interface TokenColor {
  name: string;
  scope: string;
  settings: Style;
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
      // This is the base theme from VSCode (light / dark / high contrast)
      type: this.themeType(),
      // These are the UI override colors
      colors: sortedObject(this.colors()),
      // These are the color for syntax highlighting
      tokenColors: this.tokenColors()
    };
  }

  themeActivityBar() {
    const p = this.palette;
    return {
      "activityBar.border": p.borderSoft,
      "activityBar.background": p.bg,
      "activityBar.foreground": p.fg,
      "activityBarBadge.background": p.accent0,
      "activityBarBadge.foreground": p.white
    };
  }

  themeNotifications() {
    const p = this.palette;
    return {
      // Notification Center border color.
      "notificationCenter.border": p.bg,
      // Notification Center header foreground color.
      "notificationCenterHeader.foreground": p.fg,
      // Notification Center header background color.
      "notificationCenterHeader.background": p.inputBG,
      // Notification toast border color.
      "notificationToast.border": p.bg,
      // Notifications foreground color.
      "notifications.foreground": p.fg,
      // Notifications background color.
      "notifications.background": p.inputBG,
      // Notifications border color separating from other notifications in
      // the Notification Center.
      "notifications.border": p.borderMedium,
      // Notification links foreground color.
      "notificationLink.foreground": p.cyan
    };
  }

  themeList() {
    const p = this.palette;
    return {
      "list.highlightForeground": p.accent1,
      "list.activeSelectionBackground": p.activeSelectionBG,
      "list.inactiveSelectionBackground": p.inactiveSelectionBG,
      "list.focusBackground": p.accentFocusBG,
      "list.hoverBackground": this.dilute(p.accent0, 10)
    };
  }

  themeTerminal() {
    const p = this.palette;
    return {
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

  themeGit() {
    const p = this.palette;
    return {
      "gitDecoration.modifiedResourceForeground": p.orange,
      "gitDecoration.deletedResourceForeground": p.red,
      "gitDecoration.untrackedResourceForeground": p.blue,
      "gitDecoration.ignoredResourceForeground": this.dilute(p.fg, 40),
      "gitDecoration.conflictingResourceForeground": p.cyan
    };
  }

  themeStatusBar() {
    const p = this.palette;
    return {
      "statusBar.border": p.borderMedium,
      "statusBarItem.activeBackground": this.dilute(p.fg, 15),
      "statusBarItem.hoverBackground": this.dilute(p.fg, 5),
      "statusBarItem.prominentBackground": this.dilute(p.fg, 20),
      "statusBar.background": p.statusBarBG,
      "statusBar.debuggingBackground": p.statusBarBG,
      "statusBar.noFolderBackground": p.statusBarBG,
      "statusBar.foreground": p.statusBarFG
    };
  }

  themeHighlightBorders() {
    return {
      // Border color for regions with the same content as the selection.
      "editor.selectionHighlightBorder": undefined,
      // Border color of a symbol during read-access, for example when reading a
      // variable.
      "editor.wordHighlightBorder": undefined,
      // Border color of a symbol during write-access, for example when writing
      // to a variable.
      "editor.wordHighlightStrongBorder": undefined,
      // Border color of the current search match.
      "editor.findMatchBorder": undefined,
      // Border color of the other search matches.
      "editor.findMatchHighlightBorder": undefined,
      // Border color the range limiting the search (Enable 'Find in Selection'
      // in the find widget).
      "editor.findRangeHighlightBorder": undefined,
      // Background color of the border around highlighted ranges.
      "editor.rangeHighlightBorder": undefined
    };
  }

  themeScrollbar() {
    const p = this.palette;
    return {
      "scrollbar.shadow": p.shadow,
      "scrollbarSlider.background": this.dilute(p.fg, 30),
      "scrollbarSlider.hoverBackground": this.dilute(p.fg, 50),
      "scrollbarSlider.activeBackground": this.dilute(p.fg, 60)
    };
  }

  colors() {
    const p = this.palette;
    return {
      focusBorder: p.accent0,
      "widget.shadow": p.shadow,
      ...this.themeScrollbar(),
      "input.border": p.borderHard,
      "input.background": p.inputBG,
      "progressBar.background": p.accent0,
      "inputOption.activeBorder": p.accent0,
      ...this.themeList(),
      ...this.themeStatusBar(),
      ...this.themeActivityBar(),
      "editorWidget.foreground": p.fg,
      "editorWidget.background": p.widgetBG,
      "editorWidget.border": p.widgetBorder,
      "editorBracketMatch.background": p.bracketMatchBG,
      "editorBracketMatch.border": p.bracketMatchBorder,
      "editor.findMatchBackground": this.dilute(p.orange, 50),
      "editor.findMatchHighlightBackground": this.dilute(p.yellow, 50),
      "editor.findRangeHighlightBackground": this.dilute(p.__NO__, 50),
      "editor.foreground": p.fg,
      "editor.background": p.bg,
      "editorLink.activeForeground": p.cyan,
      "editor.lineHighlightBackground": p.lineHighlightBG,
      "editor.rangeHighlightBackground": this.dilute(p.orange, 10),
      "editor.selectionBackground": this.dilute(p.cyan, 30),
      "editor.inactiveSelectionBackground": this.dilute(p.cyan, 25),
      "editor.wordHighlightBackground": this.dilute(p.blue, 15),
      "editor.wordHighlightStrongBackground": this.dilute(p.purple, 20),
      "editorCursor.foreground": p.accent1,
      "editorGroupHeader.tabsBackground": p.bg,
      "editorIndentGuide.background": p.editorLine,
      "editorRuler.foreground": p.editorLine,
      "editorLineNumber.foreground": this.dilute(p.fg, 30),
      "editorActiveLineNumber.foreground": p.fg,
      ...this.themeNotifications(),
      foreground: p.fg,
      "panel.background": p.tBG,
      "panel.border": p.borderMedium,
      "panelTitle.activeBorder": this.dilute(p.fg, 50),
      "panelTitle.activeForeground": p.fg,
      "panelTitle.inactiveForeground": this.dilute(p.fg, 60),
      "peekViewEditor.matchHighlightBackground": this.dilute(p.yellow, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(p.yellow, 50),
      "sideBar.border": p.borderSoft,
      "sideBar.background": p.bg,
      "sideBarSectionHeader.background": this.dilute(p.fg, 3),
      "tab.activeBackground": this.dilute(p.accent0, 10),
      "tab.activeForeground": p.fg,
      "tab.inactiveBackground": p.transparent,
      "tab.inactiveForeground": this.dilute(p.fg, 50),
      "tab.border": p.transparent,
      ...this.themeGit(),
      "titleBar.activeBackground": p.bg,
      "titleBar.activeForeground": p.fg,
      "titleBar.inactiveBackground": p.bg,
      "titleBar.inactiveForeground": this.dilute(p.fg, 70),
      "titleBar.border": p.borderSoft,
      ...this.themeHighlightBorders(),
      ...this.themeTerminal()
    };
  }

  tokenColors() {
    return this.scopes().reduce(
      (arr, item) => {
        const { name, scopes } = item;
        const scope = scopes.join(", ");
        const settings = this.namedScopeToSettings(name);
        if (settings) {
          return [...arr, { name, scope, settings }];
        }
        return arr;
      },
      [] as TokenColor[]
    );
  }

  scopes(): Scope[] {
    return [
      {
        name: "Parameter",
        scopes: ["variable.parameter.function"]
      },
      {
        name: "Comments",
        scopes: ["comment", "punctuation.definition.comment"]
      },
      {
        name: "Punctuation",
        scopes: [
          "punctuation.definition.string",
          "punctuation.definition.variable",
          "punctuation.definition.string",
          "punctuation.definition.parameters",
          "punctuation.definition.string",
          "punctuation.definition.array",
          "punctuation.terminator"
        ]
      },
      {
        name: "Delimiters",
        scopes: [
          "punctuation.separator",
          "punctuation.section",
          "meta.brace",
          "meta.delimiter"
        ]
      },
      {
        name: "Operators",
        scopes: ["keyword.operator"]
      },
      {
        name: "Keywords",
        scopes: ["keyword.control"]
      },
      {
        name: "Variables",
        scopes: ["variable.declaration", "variable.parameter", "variable.other"]
      },
      {
        name: "Search",
        scopes: ["entity.name.filename.find-in-files"]
      },
      {
        name: "Search Line",
        scopes: ["constant.numeric.line-number.match.find-in-files"]
      },
      {
        name: "Functions",
        scopes: [
          "entity.name.function",
          "meta.require",
          "support.function.any-method"
        ]
      },
      {
        name: "Classes",
        scopes: [
          "support.class",
          "entity.name.class",
          "entity.name.type.class",
          "entity.name.type.module",
          "entity.other.inherited-class"
        ]
      },
      {
        name: "Methods",
        scopes: ["keyword.other.special-method"]
      },
      {
        name: "Storage",
        scopes: ["storage"]
      },
      {
        name: "Support",
        scopes: ["support"]
      },
      {
        name: "Strings",
        scopes: [
          "string",
          "punctuation.definition.string",
          "support.constant.property-value"
        ]
      },
      {
        name: "Numbers",
        scopes: ["constant.numeric"]
      },
      {
        name: "Symbols",
        scopes: ["constant.other.symbol"]
      },
      {
        name: "Boolean",
        scopes: ["constant.language.boolean"]
      },
      {
        name: "Constants",
        scopes: ["constant", "support.constant", "variable.language"]
      },
      {
        name: "Tags",
        scopes: ["entity.name.tag", "punctuation.definition.tag"]
      },
      {
        name: "Attributes",
        scopes: ["entity.other.attribute-name"]
      },
      {
        name: "Attribute IDs",
        scopes: [
          "entity.other.attribute-name.id",
          "punctuation.definition.entity"
        ]
      },
      {
        name: "Selector",
        scopes: ["meta.selector", "meta.object-literal.key"]
      },
      {
        name: "Headings",
        scopes: [
          "markup.heading punctuation.definition.heading",
          "entity.name.section"
        ]
      },
      {
        name: "Units",
        scopes: ["keyword.other.unit"]
      },
      {
        name: "Bold",
        scopes: ["markup.bold", "punctuation.definition.bold"]
      },
      {
        name: "Italic",
        scopes: ["markup.italic", "punctuation.definition.italic"]
      },
      {
        name: "Code",
        scopes: ["markup.raw.inline"]
      },
      {
        name: "Link Text",
        scopes: ["string.other.link"]
      },
      {
        name: "Link Url",
        scopes: ["meta.link"]
      },
      {
        name: "Lists",
        scopes: ["markup.list"]
      },
      {
        name: "Quotes",
        scopes: ["markup.quote"]
      },
      {
        name: "Separator",
        scopes: ["meta.separator"]
      },
      {
        name: "Inserted",
        scopes: ["markup.inserted"]
      },
      {
        name: "Deleted",
        scopes: ["markup.deleted"]
      },
      {
        name: "Changed",
        scopes: ["markup.changed"]
      },
      {
        name: "Colors",
        scopes: ["constant.other.color"]
      },
      {
        name: "Regular Expressions",
        scopes: ["string.regexp"]
      },
      {
        name: "Escape Characters",
        scopes: ["constant.character.escape"]
      },
      {
        name: "Embedded",
        scopes: ["punctuation.section.embedded", "variable.interpolation"]
      },
      {
        name: "Illegal",
        scopes: ["invalid", "invalid.illegal"]
      },
      {
        name: "Broken",
        scopes: ["invalid.broken"]
      },
      {
        name: "Deprecated",
        scopes: ["invalid.deprecated"]
      },
      {
        name: "Unimplemented",
        scopes: ["invalid.unimplemented"]
      }
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
    return obj.hasOwnProperty(name) ? obj[name] : undefined;
  }

  style(color: string, ...fontStyle: string[]): Style {
    return {
      foreground: color,
      fontStyle: fontStyle.join(" ")
    };
  }

  saveAs(name: string) {
    const json = JSON.stringify(this.config(), null, 2);
    console.log(`Saving theme "${name}"`);
    fs.writeFileSync(`themes/${name}.json`, json);
  }
}
