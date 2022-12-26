// Read the docs to see all the lovely color options!
//
// https://code.visualstudio.com/api/references/theme-color

import fs from "fs";
import { colord } from "colord";

const transparent = "#00000000";

// WCAG AA minimum contrast values
// https://webaim.org/resources/contrastchecker/
const Contrast = {
  text: 4.5,
  ui: 3,
  decoration: 1.75,
} as const;
type ContrastLevel = keyof typeof Contrast;

// Sort the JSON object so things always come out in the same order, and minor
// refactoring doesn't cause the build files to change
function sortedObject<T>(obj: Record<string, T>) {
  const ret: Record<string, T> = {};
  for (const key of Object.keys(obj).sort()) {
    ret[key] = obj[key];
  }
  return ret;
}

interface Style {
  foreground: string;
  fontStyle: string;
}

export type ThemeType = "light" | "dark";

interface AnsiColors {
  tBlack: string;
  tRed: string;
  tGreen: string;
  tYellow: string;
  tBlue: string;
  tMagenta: string;
  tCyan: string;
  tWhite: string;
}

interface TokenColor {
  name: string;
  scope: string;
  settings: Style;
}

interface AlmostTokenColor {
  name: string;
  scopes: string[];
  settings: Style;
}

export abstract class Theme {
  abstract themeType: ThemeType;

  abstract colorBG0: string;
  abstract colorBG1: string;
  abstract colorBG2: string;

  abstract colorFG: string;

  abstract colorSubtle: string;

  abstract colorUno: string;
  abstract colorDue: string;
  abstract colorTre: string;

  abstract colorBorder0: string;
  abstract colorBorder1: string;

  abstract colorStatusBG: string;
  abstract colorStatusFG: string;

  abstract colorWidgetBG: string;

  hsl(h: number, s: number, l: number): string {
    return colord({ h, s, l }).toHex();
  }

  alpha(color: string, percent: number): string {
    if (percent >= 100) {
      return color;
    }
    const hsl = colord(color).toHsl();
    hsl.a = percent / 100;
    return colord(hsl).toHex();
  }

  cyan = "#00bcd4";
  red = "#cc0000";
  yellow = "#f1c40f";
  orange = "#e67e22";
  blue = "#3498db";
  purple = "#9b59b6";

  inactiveSelectionBG() {
    return this.alpha(this.colorFG, 15);
  }

  config(): {
    /** Base theme (e.g. light/dark/high contrast) */
    type: ThemeType;
    /** UI colors */
    colors: Record<string, string | undefined>;
    /** Syntax highlighting colors */
    tokenColors: TokenColor[];
  } {
    return {
      type: this.themeType,
      colors: sortedObject(this.colors()),
      tokenColors: this.tokenColors(),
    };
  }

  themeActivityBar() {
    return {
      "activityBar.border": this.colorBorder0,
      "activityBar.background": this.colorBG1,
      "activityBar.foreground": this.colorFG,
      "activityBar.inactiveForeground": this.alpha(this.colorFG, 50),
      "activityBarBadge.background": this.colorFG,
      "activityBarBadge.foreground": this.colorBG0,
      "activityBar.activeBorder": this.colorFG,
      "activityBar.activeBackground": this.alpha(this.colorFG, 10),
    };
  }

  themeNotifications() {
    return {
      // Notification Center border color.
      "notificationCenter.border": undefined,
      // Notification Center header foreground color.
      "notificationCenterHeader.foreground": this.colorFG,
      // Notification Center header background color.
      "notificationCenterHeader.background": this.colorWidgetBG,
      // Notification toast border color.
      "notificationToast.border": this.colorBorder1,
      // Notifications foreground color.
      "notifications.foreground": this.colorFG,
      // Notifications background color.
      "notifications.background": this.colorWidgetBG,
      // Notifications border color separating from other notifications in
      // the Notification Center.
      "notifications.border": undefined,
      // Notification links foreground color.
      "notificationLink.foreground": this.cyan,
    };
  }

  themeList() {
    return {
      "quickInput.background": this.colorBG0,
      "list.errorForeground": this.red,
      "list.warningForeground": this.yellow,
      "list.highlightForeground": this.colorTre,
      "list.focusHighlightForeground": this.colorBG0,
      "list.activeSelectionIconForeground": this.colorBG0,
      "list.activeSelectionForeground": this.colorBG0,
      "list.activeSelectionBackground": this.colorFG,
      "list.inactiveSelectionForeground": this.colorFG,
      "list.inactiveSelectionBackground": this.colorBG2,
      "quickInputList.focusBackground": this.colorFG,
      "quickInputList.focusForeground": this.colorBG0,
      "quickInputList.focusIconForeground": this.colorBG0,
      "list.hoverBackground": this.alpha(this.colorTre, 10),
    };
  }

  themeTerminal() {
    const p =
      this.themeType === "light"
        ? this.tintedAnsiLight(this.colorBG0, this.colorFG)
        : this.tintedAnsiDark(this.colorBG0, this.colorFG);
    return {
      "terminal.foreground": this.colorFG,
      "terminal.background": this.colorBG0,
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
    return {
      "gitDecoration.modifiedResourceForeground": this.mix(
        this.orange,
        this.colorFG,
        20
      ),
      "gitDecoration.deletedResourceForeground": this.mix(
        this.red,
        this.colorFG,
        20
      ),
      "gitDecoration.untrackedResourceForeground": this.mix(
        this.blue,
        this.colorFG,
        20
      ),
      "gitDecoration.conflictingResourceForeground": this.mix(
        this.cyan,
        this.colorFG,
        20
      ),
      "gitDecoration.ignoredResourceForeground": this.alpha(this.colorFG, 40),
    };
  }

  darken(color: string, amount: number): string {
    const hsl = colord(color).toHsl();
    hsl.l -= amount;
    return colord(hsl).toHex();
  }

  themeStatusBar() {
    const bg = this.colorStatusBG;
    const fg = this.colorStatusFG;
    const border =
      this.themeType === "light"
        ? this.darken(this.colorStatusBG, 5)
        : this.colorBorder0;
    return {
      "statusBar.border": border,
      "statusBarItem.activeBackground": this.alpha(fg, 20),
      "statusBarItem.hoverBackground": this.alpha(fg, 10),
      "statusBarItem.prominentBackground": this.alpha(fg, 30),
      "statusBar.background": bg,
      "statusBar.debuggingBackground": bg,
      "statusBar.noFolderBackground": bg,
      "statusBar.foreground": fg,
    };
  }

  themeBadge() {
    return {
      "badge.foreground": this.colorBG0,
      "badge.background": this.colorFG,
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
    return {
      "scrollbar.shadow": transparent,
      "scrollbarSlider.background": this.alpha(this.colorFG, 50),
      "scrollbarSlider.hoverBackground": this.alpha(this.colorFG, 60),
      "scrollbarSlider.activeBackground": this.alpha(this.colorFG, 70),
    };
  }

  themeDropdown() {
    return {
      "dropdown.background": this.colorWidgetBG,
      "dropdown.listBackground": this.colorWidgetBG,
      "dropdown.border": this.colorBorder1,
      "dropdown.foreground": this.colorFG,
    };
  }

  tintedAnsiLight(bg: string, color: string): AnsiColors {
    const tintedHsl = (h: number, s: number, l: number) => {
      return this.fixContrast({
        fg: this.mix(this.hsl(h, s, l), color, 20),
        bg,
        type: "text",
      });
    };
    return {
      tBlack: tintedHsl(0, 0, 0),
      tRed: tintedHsl(0, 75, 45),
      tGreen: tintedHsl(135, 60, 40),
      tYellow: tintedHsl(30, 75, 55),
      tBlue: tintedHsl(250, 75, 55),
      tMagenta: tintedHsl(310, 70, 50),
      tCyan: tintedHsl(180, 75, 40),
      tWhite: this.hsl(0, 0, 90),
    };
  }

  tintedAnsiDark(bg: string, color: string): AnsiColors {
    const tintedHsl = (h: number, s: number, l: number) => {
      return this.fixContrast({
        fg: this.mix(this.hsl(h, s, l), color, 20),
        bg,
        type: "text",
      });
    };
    return {
      tBlack: this.hsl(0, 0, 20),
      tRed: tintedHsl(0, 75, 65),
      tGreen: tintedHsl(135, 65, 65),
      tYellow: tintedHsl(30, 75, 75),
      tBlue: tintedHsl(250, 75, 75),
      tMagenta: tintedHsl(310, 75, 75),
      tCyan: tintedHsl(180, 75, 65),
      tWhite: tintedHsl(0, 0, 95),
    };
  }

  mix(a: string, b: string, percent: number): string {
    return colord(a)
      .mix(b, percent / 100)
      .toHex();
  }

  themeDragAndDrop() {
    const color = this.alpha(this.colorTre, 30);
    return {
      "list.dropBackground": color,
      "sideBar.dropBackground": color,
      "editorGroup.dropBackground": color,
      "panel.border": this.colorBorder0,
      "panelSection.border": this.colorBorder0,
      "panelSectionHeader.border": this.colorBorder0,
    };
  }

  themeButton() {
    return {
      "button.background": this.colorFG,
      "button.foreground": this.colorBG0,
      "button.hoverBackground": undefined,
    };
  }

  themeBracketColors() {
    ////////////////////////////////////////////////////////////////////////////
    //
    // Code just for looking at the colorized braces... sorry!
    //
    const x = 0;
    [x, [x, [x, [x, [x, [x, x], x], x], x], x], x];
    [x, [x, [x, [x, [x, [x]]]]]];
    //
    ////////////////////////////////////////////////////////////////////////////
    const b1 = this.colorUno;
    const b2 = this.colorDue;
    const b3 = this.colorTre;
    return {
      "editorBracketHighlight.foreground1": b1,
      "editorBracketHighlight.foreground2": b2,
      "editorBracketHighlight.foreground3": b3,
      "editorBracketHighlight.foreground4": b1,
      "editorBracketHighlight.foreground5": b2,
      "editorBracketHighlight.foreground6": b3,
      "editorBracketHighlight.unexpectedBracket.foreground": this.red,
    };
  }

  themeEditor() {
    return {
      "editorWidget.background": this.colorWidgetBG,
      "editorWidget.border": this.colorBorder1,
      "editorBracketMatch.background": this.alpha(this.colorTre, 15),
      "editorBracketMatch.border": this.alpha(this.colorTre, 50),
      "editor.findMatchBackground": this.alpha(this.orange, 50),
      "editor.findMatchHighlightBackground": this.alpha(this.yellow, 50),
      "editor.findRangeHighlightBackground": this.alpha(this.orange, 50),
      "editor.foreground": this.colorFG,
      "editor.background": this.colorBG0,
      "editorLink.activeForeground": this.cyan,
      "editor.lineHighlightBackground": this.colorBG1,
      "editor.rangeHighlightBackground": this.alpha(this.orange, 10),
      "editor.selectionBackground": this.alpha(this.colorBorder0, 50),
      "editor.inactiveSelectionBackground": this.alpha(this.colorBorder0, 50),
      "editor.wordHighlightBackground": this.alpha(this.blue, 15),
      "editor.wordHighlightStrongBackground": this.alpha(this.purple, 20),
      "editorOverviewRuler.border": this.alpha(this.colorBorder0, 50),
      "editorCursor.foreground": this.colorTre,
      "editorGroup.border": this.colorBorder0,
      "editorRuler.foreground": this.alpha(this.colorBorder0, 50),
      "editorIndentGuide.background": this.alpha(this.colorBorder0, 50),
      "editorIndentGuide.activeBackground": this.colorBorder0,
      "editorLineNumber.foreground": this.alpha(this.colorFG, 30),
      "editorLineNumber.activeForeground": this.colorFG,
    };
  }

  themeTitlebar() {
    return {
      "titleBar.activeBackground": this.colorBG1,
      "titleBar.activeForeground": this.colorFG,
      "titleBar.inactiveBackground": this.colorBG1,
      "titleBar.inactiveForeground": this.alpha(this.colorFG, 70),
      "titleBar.border": this.colorBorder0,
    };
  }

  themeTabs() {
    return {
      "tab.border": this.colorBG1,
      "editorGroupHeader.tabsBorder": this.colorBorder0,
      "editorGroupHeader.border": this.colorBorder0,
      "breadcrumb.background": this.colorBG0,
      "editorGroupHeader.noTabsBackground": this.colorBG1,
      "editorGroupHeader.tabsBackground": this.colorBG1,
      "tab.activeBorder": this.colorBorder1,
      "tab.unfocusedActiveBorder": this.colorBorder1,
      "tab.activeBorderTop": undefined,
      "tab.unfocusedActiveBorderTop": undefined,
      "tab.activeBackground": this.colorBG2,
      "tab.activeForeground": this.colorFG,
      "tab.inactiveBackground": this.colorBG1,
      "tab.inactiveForeground": this.alpha(this.colorFG, 80),
    };
  }

  colors(): Record<string, string | undefined> {
    return {
      focusBorder: this.colorTre,
      "icon.foreground": this.colorFG,
      "toolbar.hoverBackground": this.alpha(this.colorFG, 10),
      "toolbar.activeBackground": this.alpha(this.colorFG, 15),
      "widget.shadow":
        this.themeType === "light"
          ? this.alpha(this.colorFG, 50)
          : this.alpha(this.darken(this.colorBG1, 10), 90),
      ...this.themeScrollbar(),
      "input.border": this.colorBorder1,
      "input.background": this.colorWidgetBG,
      "input.placeholderForeground": this.alpha(this.colorFG, 40),
      "progressBar.background": this.colorFG,
      "inputOption.activeBorder": this.colorFG,
      ...this.themeList(),
      ...this.themeStatusBar(),
      ...this.themeBadge(),
      ...this.themeActivityBar(),
      ...this.themeBracketColors(),
      ...this.themeEditor(),
      ...this.themeNotifications(),
      ...this.themeDragAndDrop(),
      ...this.themeButton(),
      foreground: this.colorFG,
      "panel.background": this.colorBG0,
      "panel.border": this.colorBorder0,
      "panelTitle.activeBorder": this.alpha(this.colorFG, 50),
      "panelTitle.activeForeground": this.colorFG,
      "panelTitle.inactiveForeground": this.alpha(this.colorFG, 60),
      "peekViewEditor.matchHighlightBackground": this.alpha(this.yellow, 50),
      "peekViewResult.matchHighlightBackground": this.alpha(this.yellow, 50),
      "sideBar.border": this.colorBorder0,
      "sideBar.background": this.colorBG1,
      "sideBarSectionHeader.background": this.colorBG1,
      "sideBarSectionHeader.border": this.colorBorder0,
      "tree.indentGuidesStroke": this.alpha(this.colorBorder0, 50),
      ...this.themeTabs(),
      "pickerGroup.border": this.colorBorder0,
      ...this.themeGit(),
      ...this.themeTitlebar(),
      "debugToolBar.background": this.colorWidgetBG,
      ...this.themeDropdown(),
      ...this.themeHighlightBorders(),
      ...this.themeTerminal(),
    };
  }

  fixContrast({
    fg,
    bg,
    type,
  }: {
    fg: string;
    bg: string;
    type: keyof typeof Contrast;
  }): string {
    const isDark = colord(bg).isDark();
    const step = 1;
    const hsl = colord(fg).toHsl();
    if (isDark) {
      while (colord(hsl).contrast(bg) < Contrast[type] && hsl.l < 100) {
        hsl.l += step;
      }
    } else {
      while (colord(hsl).contrast(bg) < Contrast[type] && hsl.l > 0) {
        hsl.l -= step;
      }
    }
    return colord(hsl).toHex();
  }

  tokenColors(): TokenColor[] {
    const tc: AlmostTokenColor[] = [
      {
        name: "Default",
        settings: this.style(this.colorFG),
        scopes: [
          // Function call
          "meta.function-call entity.name.function",
          "source.go entity.name.function",
        ],
      },
      {
        name: "Uno1",
        settings: this.style(this.colorUno),
        scopes: [
          // Operators
          "keyword.operator",
          "storage.type.function.arrow",
        ],
      },
      {
        name: "Uno2",
        settings: this.style(this.colorUno),
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
        settings: this.style(this.colorSubtle),
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
        settings: this.style(this.colorSubtle),
        scopes: [
          // Comment
          "comment",
          "punctuation.definition.comment",
        ],
      },
      {
        name: "Uno1Bold",
        settings: this.style(this.colorUno, "bold"),
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
        settings: this.style(this.colorUno, "bold"),
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
        settings: this.style(this.colorUno, "italic"),
        scopes: [
          // Italic
          "markup.italic",
        ],
      },
      {
        name: "Due1",
        settings: this.style(this.colorDue),
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
        settings: this.style(this.colorDue),
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
        settings: this.style(this.colorDue, "bold"),
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
        settings: this.style(this.colorTre),
        scopes: [
          // Strings
          "string",
          "punctuation.definition.string",
          "support.constant.property-value",
        ],
      },
      {
        name: "Default",
        settings: this.style(this.colorFG),
        scopes: [
          // String interpolation
          "meta.embedded",
        ],
      },
      {
        name: "Broken",
        settings: this.style(this.red, "bold"),
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

  showContrast(level: ContrastLevel, fg: keyof this, bg: keyof this): void {
    const contrast = colord(this[fg] as any).contrast(this[bg] as any);
    const fail = contrast < Contrast[level];
    console.log(
      fail ? "[!]" : "   ",
      contrast.toFixed(1).toString().padStart(6),
      ":",
      this[fg],
      "[on]",
      this[bg],
      ":",
      fg,
      "[on]",
      bg
    );
  }

  saveAs(name: string): void {
    const config = this.config();
    console.log(`--- ${name} `.padEnd(60, "-"));
    this.showContrast("text", "colorFG", "colorBG0");
    this.showContrast("text", "colorFG", "colorBG1");
    this.showContrast("text", "colorFG", "colorBG2");
    this.showContrast("ui", "colorBorder1", "colorBG0");
    this.showContrast("ui", "colorBorder1", "colorBG1");
    this.showContrast("ui", "colorBorder1", "colorBG2");
    this.showContrast("text", "colorSubtle", "colorBG0");
    this.showContrast("text", "colorUno", "colorBG0");
    this.showContrast("text", "colorDue", "colorBG0");
    this.showContrast("text", "colorTre", "colorBG0");
    const json = JSON.stringify(config, null, 2);
    fs.writeFileSync(`themes/${name}-color-theme.json`, json);
  }
}

export abstract class BaseThemeLight extends Theme {
  themeType = "light" as ThemeType;
}

export abstract class BaseThemeDark extends Theme {
  themeType = "dark" as ThemeType;
}

// function countColors(data: any): number {
//   const map = new Map<string, number>();
//   for (const color of findColors(data)) {
//     const n = map.get(color) ?? 0;
//     map.set(color, n + 1);
//   }
//   return [...map.keys()].length;
// }

// function* findColors(data: any): Generator<string> {
//   if (!data) {
//     return;
//   } else if (Array.isArray(data)) {
//     for (const d of data) {
//       yield* findColors(d);
//     }
//   } else if (typeof data === "object") {
//     for (const d of Object.values(data)) {
//       yield* findColors(d);
//     }
//   } else if (typeof data === "string") {
//     if (getFormat(data)) {
//       // Yield color without alpha channel since that's not a "unique" color
//       const color = colord(data).toRgb();
//       color.a = 1;
//       yield colord(color).toHex();
//     }
//   }
// }
