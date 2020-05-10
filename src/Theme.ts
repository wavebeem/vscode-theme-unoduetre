import fs from "fs";
import tinycolor from "tinycolor2";

// WCAG AA minimum contrast values
// https://webaim.org/resources/contrastchecker/
const CONTRAST_TEXT = 4.5;
const CONTRAST_UI = 3;
const CONTRAST_UI_LOW = 2;

const USE_HIGH_CONTRAST = false;

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
  DARK = "dark",
}

export interface AnsiColors {
  tBlack: string;
  tRed: string;
  tGreen: string;
  tYellow: string;
  tBlue: string;
  tMagenta: string;
  tCyan: string;
  tWhite: string;
}

export interface Palette {
  yellow: string;
  orange: string;
  blue: string;
  purple: string;
  white: string;
  red: string;
  cyan: string;
  transparent: string;
  __NO__: string;
  // TODO: Remove this color?
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
  border0: string;
  border1: string;
  shadow0: string;
  shadow1: string;
  activeSelectionBG: string;
  inactiveSelectionBG: string;
  textSelectionBG: string;
  accentFocusBG: string;
  widgetBG: string;
  widgetBorder: string;
  bracketMatchBG: string;
  bracketMatchBorder: string;
  ruler: string;
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

export interface AlmostTokenColor {
  name: string;
  scopes: string[];
  settings: Style;
}

export default abstract class Theme {
  abstract uno: number;
  abstract due: number;
  abstract tre: number;
  abstract bg: string;
  abstract palette: Palette;
  abstract themeType(): ThemeType;
  abstract ramp(hue: number): string[];

  hsl(h: number, s: number, l: number) {
    return tinycolor({ h, s, l }).toHexString();
  }

  hsla(h: number, s: number, l: number, a: number) {
    return this.dilute(this.hsl(h, s, l), a);
  }

  gray(l: number) {
    return this.hsl(0, 0, l);
  }

  dilute(color: string, percent: number) {
    if (percent === 100) {
      return color;
    }
    return tinycolor(color)
      .setAlpha(percent / 100)
      .toHex8String();
  }

  config() {
    const p = this.palette;
    const uiColorKeys: (keyof Palette)[] = [
      "border1",
      "cyan",
      "yellow",
      "orange",
      "blue",
      "purple",
      "red",
      "cyan",
    ];
    for (const k of uiColorKeys) {
      p[k] = this.fixContrast(p[k], this.bg, CONTRAST_UI);
    }
    this.palette.border0 = this.fixContrast(
      this.palette.border0,
      this.palette.bg,
      USE_HIGH_CONTRAST ? CONTRAST_UI : CONTRAST_UI_LOW
    );
    this.palette.tFG = this.fixContrast(
      this.palette.tFG,
      this.palette.tBG,
      CONTRAST_TEXT
    );
    return {
      // This is the base theme from VSCode (light / dark / high contrast)
      type: this.themeType(),
      // These are the UI override colors
      colors: sortedObject(this.colors()),
      // These are the color for syntax highlighting
      tokenColors: this.tokenColors(),
    };
  }

  themeActivityBar() {
    const p = this.palette;
    return {
      "activityBar.border": p.border0,
      "activityBar.background": p.bg,
      "activityBar.foreground": p.fg,
      "activityBar.inactiveForeground": this.dilute(p.fg, 50),
      "activityBarBadge.background": p.accent0,
      "activityBarBadge.foreground": p.white,
      "activityBar.activeBorder": p.accent0,
      "tab.activeBorder": p.accent0,
      "activityBar.activeBackground": this.dilute(p.accent0, 10),
    };
  }

  themeNotifications() {
    const p = this.palette;
    return {
      // Notification Center border color.
      "notificationCenter.border": undefined,
      // Notification Center header foreground color.
      "notificationCenterHeader.foreground": p.fg,
      // Notification Center header background color.
      "notificationCenterHeader.background": p.widgetBG,
      // Notification toast border color.
      "notificationToast.border": p.widgetBorder,
      // Notifications foreground color.
      "notifications.foreground": p.fg,
      // Notifications background color.
      "notifications.background": p.widgetBG,
      // Notifications border color separating from other notifications in
      // the Notification Center.
      "notifications.border": undefined,
      // Notification links foreground color.
      "notificationLink.foreground": p.cyan,
    };
  }

  themeList() {
    const p = this.palette;
    return {
      "list.errorForeground": p.red,
      "list.warningForeground": p.yellow,
      "list.highlightForeground": p.accent1,
      "list.activeSelectionBackground": p.activeSelectionBG,
      "list.inactiveSelectionBackground": p.inactiveSelectionBG,
      "list.focusBackground": p.accentFocusBG,
      "list.hoverBackground": this.dilute(p.accent0, 10),
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
      "terminal.ansiYellow": p.tYellow,
    };
  }

  themeGit() {
    const p = this.palette;
    return {
      "gitDecoration.modifiedResourceForeground": this.mix(p.orange, p.fg, 20),
      "gitDecoration.deletedResourceForeground": this.mix(p.red, p.fg, 20),
      "gitDecoration.untrackedResourceForeground": this.mix(p.blue, p.fg, 20),
      "gitDecoration.conflictingResourceForeground": this.mix(p.cyan, p.fg, 20),
      "gitDecoration.ignoredResourceForeground": this.dilute(p.fg, 40),
    };
  }

  themeStatusBar() {
    const p = this.palette;
    return {
      "statusBar.border": p.border0,
      "statusBarItem.activeBackground": this.dilute(p.fg, 20),
      "statusBarItem.hoverBackground": this.dilute(p.fg, 10),
      "statusBarItem.prominentBackground": this.dilute(p.fg, 30),
      "statusBar.background": p.bg,
      "statusBar.debuggingBackground": p.bg,
      "statusBar.noFolderBackground": p.bg,
      "statusBar.foreground": p.fg,
    };
  }

  themeBadge() {
    const p = this.palette;
    return {
      "badge.foreground": p.white,
      "badge.background": p.accent0,
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
      "editor.rangeHighlightBorder": undefined,
    };
  }

  themeScrollbar() {
    const p = this.palette;
    return {
      "scrollbar.shadow": p.shadow0,
      "scrollbarSlider.background": this.dilute(p.fg, 30),
      "scrollbarSlider.hoverBackground": this.dilute(p.fg, 50),
      "scrollbarSlider.activeBackground": this.dilute(p.fg, 60),
    };
  }

  themeDropdown() {
    const p = this.palette;
    return {
      "dropdown.background": p.inputBG,
      "dropdown.listBackground": p.widgetBG,
      "dropdown.border": p.border1,
      "dropdown.foreground": p.fg,
    };
  }

  tintedAnsiLight(bg: string, color: string): AnsiColors {
    const tintedHsl = (h: number, s: number, l: number) => {
      return this.fixContrast(
        this.mix(this.hsl(h, s, l), color, 20),
        bg,
        CONTRAST_TEXT
      );
    };
    return {
      tBlack: tintedHsl(0, 0, 0),
      tRed: tintedHsl(0, 75, 45),
      tGreen: tintedHsl(135, 60, 40),
      tYellow: tintedHsl(30, 75, 55),
      tBlue: tintedHsl(250, 75, 55),
      tMagenta: tintedHsl(310, 70, 50),
      tCyan: tintedHsl(180, 75, 40),
      tWhite: this.hsl(0, 0, 95),
    };
  }

  tintedAnsiDark(bg: string, color: string): AnsiColors {
    const tintedHsl = (h: number, s: number, l: number) => {
      return this.fixContrast(
        this.mix(this.hsl(h, s, l), color, 20),
        bg,
        CONTRAST_TEXT
      );
    };
    return {
      tBlack: tintedHsl(0, 0, 20),
      tRed: tintedHsl(0, 75, 65),
      tGreen: tintedHsl(135, 65, 65),
      tYellow: tintedHsl(30, 75, 75),
      tBlue: tintedHsl(250, 75, 75),
      tMagenta: tintedHsl(310, 75, 75),
      tCyan: tintedHsl(180, 75, 65),
      tWhite: this.hsl(0, 0, 95),
    };
  }

  mix(a: string, b: string, x: number) {
    return tinycolor.mix(a, b, x).toHex8String();
  }

  themeDragAndDrop() {
    const p = this.palette;
    const color = this.dilute(p.accent0, 30);
    return {
      "list.dropBackground": color,
      "activityBar.dropBackground": color,
      "sideBar.dropBackground": color,
      "editorGroup.dropBackground": color,
      "panel.dropBackground": color,
    };
  }

  themeButton() {
    const p = this.palette;
    return {
      "button.background": p.accent0,
      "button.foreground": p.white,
      "button.hoverBackground": undefined,
    };
  }

  themeEditor() {
    const p = this.palette;
    return {
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
      "editor.lineHighlightBackground": this.dilute(p.fg, 4),
      "editor.rangeHighlightBackground": this.dilute(p.orange, 10),
      "editor.selectionBackground": p.textSelectionBG,
      "editor.inactiveSelectionBackground": p.textSelectionBG,
      "editor.wordHighlightBackground": this.dilute(p.blue, 15),
      "editor.wordHighlightStrongBackground": this.dilute(p.purple, 20),
      "editorOverviewRuler.border": p.ruler,
      "editorCursor.foreground": p.accent1,
      "editorGroup.border": p.border0,
      "editorGroupHeader.tabsBackground": p.bg,
      "editorRuler.foreground": p.ruler,
      "editorIndentGuide.background": p.ruler,
      "editorIndentGuide.activeBackground": this.dilute(p.fg, 30),
      "editorLineNumber.foreground": this.dilute(p.fg, 30),
      "editorLineNumber.activeForeground": p.fg,
    };
  }

  themeTitlebar() {
    const p = this.palette;
    return {
      "titleBar.activeBackground": p.bg,
      "titleBar.activeForeground": p.fg,
      "titleBar.inactiveBackground": p.bg,
      "titleBar.inactiveForeground": this.dilute(p.fg, 70),
      "titleBar.border": p.border0,
    };
  }

  themeTabs() {
    const p = this.palette;
    return {
      "tab.border": p.border0,
      "editorGroupHeader.tabsBorder": p.border0,
      "tab.activeBorder": p.accent0,
      "tab.unfocusedActiveBorder": p.accent0,
      "tab.activeBorderTop": undefined,
      "tab.unfocusedActiveBorderTop": undefined,
      "tab.activeBackground": this.dilute(p.accent0, 10),
      "tab.activeForeground": p.fg,
      "tab.inactiveBackground": p.transparent,
      "tab.inactiveForeground": this.dilute(p.fg, 50),
    };
  }

  colors() {
    const p = this.palette;
    return {
      contrastBorder: USE_HIGH_CONTRAST ? p.border0 : undefined,
      contrastActiveBorder: USE_HIGH_CONTRAST ? p.accent0 : undefined,
      focusBorder: p.accent0,
      "widget.shadow": p.shadow1,
      ...this.themeScrollbar(),
      "input.border": p.border1,
      "input.background": p.inputBG,
      "input.placeholderForeground": this.dilute(p.fg, 40),
      "progressBar.background": p.accent0,
      "inputOption.activeBorder": p.accent0,
      ...this.themeList(),
      ...this.themeStatusBar(),
      ...this.themeBadge(),
      ...this.themeActivityBar(),
      ...this.themeEditor(),
      ...this.themeNotifications(),
      ...this.themeDragAndDrop(),
      ...this.themeButton(),
      foreground: p.fg,
      "panel.background": p.bg,
      "panel.border": p.border0,
      "panelTitle.activeBorder": this.dilute(p.fg, 50),
      "panelTitle.activeForeground": p.fg,
      "panelTitle.inactiveForeground": this.dilute(p.fg, 60),
      "peekViewEditor.matchHighlightBackground": this.dilute(p.yellow, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(p.yellow, 50),
      "sideBar.border": p.border0,
      "sideBar.background": p.bg,
      "sideBarSectionHeader.background": this.dilute(p.fg, 3),
      ...this.themeTabs(),
      "pickerGroup.border": p.border0,
      ...this.themeGit(),
      ...this.themeTitlebar(),
      "debugToolBar.background": p.widgetBG,
      ...this.themeDropdown(),
      ...this.themeHighlightBorders(),
      ...this.themeTerminal(),
    };
  }

  fixContrast(color: string, bg: string, minimum: number): string {
    const isDark = tinycolor(bg).isDark();
    const step = 1;
    const fg = tinycolor(color);
    while (tinycolor.readability(fg, bg) < minimum) {
      if (isDark) {
        fg.lighten(step);
      } else {
        fg.darken(step);
      }
    }
    if (fg.getAlpha() < 1) {
      return fg.toHex8String();
    }
    return fg.toHexString();
  }

  safeRamp(hue: number): string[] {
    return this.ramp(hue).map((color) =>
      this.fixContrast(color, this.bg, CONTRAST_TEXT)
    );
  }

  tokenColors(): TokenColor[] {
    const [uno1, uno2, uno3, uno4] = this.safeRamp(this.uno);
    const [due1, due2] = this.safeRamp(this.due);
    const [tre1] = this.safeRamp(this.tre);
    const p = this.palette;
    const tc: AlmostTokenColor[] = [
      {
        name: "Default",
        settings: this.style(p.fg),
        scopes: [
          // Function call
          "meta.function-call entity.name.function",
          "source.go entity.name.function",
        ],
      },
      {
        name: "Uno1",
        settings: this.style(uno1),
        scopes: [
          // Operators
          "keyword.operator",
          "storage.type.function.arrow",
        ],
      },
      {
        name: "Uno2",
        settings: this.style(uno2),
        scopes: [
          // Code
          "markup.raw.inline",
          "markup.inline",
          "punctuation.definition.markdown",

          // Object keys
          "meta.object-literal.key",
          "support.type.property-name",
          "punctuation.curlybrace",
          "punctuation.squarebracket",
          "punctuation.parenthesis",
          "punctuation.definition.begin",
          "punctuation.definition.end",
          "punctuation.definition.bracket",

          // CSS properties
          "meta.property-name",

          // Interpolation stuff
          "punctuation.section.embedded",
          "variable.interpolation",

          // JSX tags
          "support.class.component",

          // Decorators
          "meta.decorator",
          "entity.name.function.decorator",

          // Regexp fancy stuff
          "punctuation.definition.character-class",
          "punctuation.definition.group",
          "keyword.control.anchor.regexp",
        ],
      },
      {
        name: "Uno3",
        settings: this.style(uno3),
        scopes: [
          // Escape characters
          "constant.character.escape",
          "punctuation.definition.template-expression",

          // Punctuation
          "punctuation.definition.imports",
          "punctuation.definition.scope",
          "punctuation.definition.dictionary",
          "punctuation.definition.tag",
          "punctuation.definition.binding-pattern.array",
          "punctuation.definition.binding-pattern.object",
          "punctuation.definition.block",
          "punctuation.definition.string",
          "punctuation.definition.variable",
          "punctuation.definition.string",
          "punctuation.definition.parameters",
          "punctuation.definition.string",
          "punctuation.definition.array",
          "punctuation.terminator",

          // Punctuation
          "punctuation.other.comma",
          "punctuation.separator",
          "punctuation.section",
          "meta.brace",
          "meta.delimiter",

          // Markdown link text
          "string.other.link",

          // Quotes
          "markup.quote",

          // Separator
          "meta.separator",
        ],
      },
      {
        name: "Uno4",
        settings: this.style(uno4),
        scopes: [
          // Comment
          "comment",
          "punctuation.definition.comment",
        ],
      },
      {
        name: "Uno1Bold",
        settings: this.style(uno1, "bold"),
        scopes: [
          // Keywords
          "keyword.control",
          "keyword.import",
          "keyword.function",
          "keyword.package",
          "keyword.interface",
          "keyword.map",
          "keyword.var",
          "keyword.other",
          "keyword.type",

          // Storage (var)
          "storage",
        ],
      },
      {
        name: "Uno2Bold",
        settings: this.style(uno2, "bold"),
        scopes: [
          // Bold
          "markup.bold",
          "punctuation.definition.bold",

          // CSS blocks
          "meta.selector entity.other.attribute-name.id",
          "meta.selector entity.other.attribute-name.class",
          "meta.selector entity.other.attribute-name.pseudo-class",
          "meta.selector entity.name.tag",
        ],
      },
      {
        name: "Uno2Italic",
        settings: this.style(uno2, "italic"),
        scopes: [
          // Italic
          "markup.italic",
        ],
      },
      {
        name: "Due1",
        settings: this.style(due1),
        scopes: [
          // Symbols
          "constant.other.symbol",

          // Numbers
          "constant.numeric",

          // Boolean
          "constant.language.boolean",

          // Constants
          "constant",
          "support.constant",
          "variable.language",

          // Tags
          "entity.name.tag",
          "punctuation.definition.tag",

          // Attributes
          "entity.other.attribute-name",
          "entity.other.attribute-name.id",
          "punctuation.definition.entity",

          // Link URL
          "meta.link",
          "markup.underline.link",
        ],
      },
      {
        name: "Due2",
        settings: this.style(due2),
        scopes: [
          // Variable definition
          "meta.definition",

          // Parameter
          "variable.parameter.function",

          // Variables
          "variable.declaration",
          "variable.parameter",
          "variable.other.assignment",

          // Lists
          "beginning.punctuation.definition.list",

          // Colors
          "constant.other.color",
        ],
      },
      {
        name: "Due1Bold",
        settings: this.style(due1, "bold"),
        scopes: [
          // Headings
          "markup.heading punctuation.definition.heading",
          "entity.name.section",

          // Functions
          "source.go entity.name.function",
          "meta.definition entity.name.function",
          "meta.function entity.name.function",
          "meta.require",

          // Classes
          "entity.name.class",
          "entity.name.type.class",
          "entity.name.type.module",
          "entity.other.inherited-class",
        ],
      },
      {
        name: "Tre1",
        settings: this.style(tre1),
        scopes: [
          // Strings
          "string",
          "punctuation.definition.string",
          "support.constant.property-value",
        ],
      },
      {
        name: "Default",
        settings: this.style(p.fg),
        scopes: [
          // String interpolation
          "meta.embedded",
        ],
      },
      {
        name: "Broken",
        settings: this.style(p.red, "bold"),
        scopes: [
          // Broken stuff
          "invalid.broken",
          "invalid.deprecated",
          "invalid.unimplemented",
        ],
      },
    ];
    return tc
      .map((x) => ({
        name: x.name,
        scope: x.scopes.join(", "),
        settings: x.settings,
      }))
      .filter((x) => x.scope);
  }

  style(color: string, ...fontStyle: string[]): Style {
    return {
      foreground: color,
      fontStyle: fontStyle.join(" "),
    };
  }

  saveAs(name: string) {
    const json = JSON.stringify(this.config(), null, 2);
    fs.writeFileSync(`themes/${name}.json`, json);
  }
}
