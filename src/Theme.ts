// Read the docs to see all the lovely color options!
//
// https://code.visualstudio.com/api/references/theme-color

import fs from "fs";
import { colord } from "colord";
import * as ANSI from "ansi-colors";

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

type FontStyle = "normal" | "bold" | "italic" | "underline" | "strikethrough";

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

interface TokenSettingColor {
  fontStyle?: FontStyle;
  foreground: string;
}

interface TokenSettingStyle {
  fontStyle: FontStyle;
}

type TokenSetting = TokenSettingColor | TokenSettingStyle;

interface TokenColor {
  name?: string;
  scope: string | string[];
  settings: TokenSetting;
}

abstract class Theme {
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

  private alpha(color: string, percent: number): string {
    if (percent >= 100) {
      return color;
    }
    const hsl = colord(color).toHsl();
    hsl.a = percent / 100;
    return colord(hsl).toHex();
  }

  private cyan = "#00bcd4";
  private red = "#cc0000";
  private yellow = "#f1c40f";
  private orange = "#e67e22";
  private blue = "#3498db";
  private purple = "#9b59b6";

  private config(): {
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

  private themeActivityBar() {
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

  private themeNotifications() {
    return {
      // Notification Center border color.
      "notificationCenter.border": undefined,
      // Notification Center header foreground color.
      "notificationCenterHeader.foreground": this.colorFG,
      // Notification Center header background color.
      "notificationCenterHeader.background": this.colorBG1,
      // Notification toast border color.
      "notificationToast.border": this.colorBorder0,
      // Notifications foreground color.
      "notifications.foreground": this.colorFG,
      // Notifications background color.
      "notifications.background": this.colorBG1,
      // Notifications border color separating from other notifications in
      // the Notification Center.
      "notifications.border": undefined,
      // Notification links foreground color.
      "notificationLink.foreground": this.colorSubtle,
    };
  }

  private themeList() {
    return {
      "quickInput.background": this.colorBG0,

      "list.errorForeground": this.mix(this.red, this.colorFG, 50),
      "list.warningForeground": this.mix(this.yellow, this.colorFG, 50),
      "list.highlightForeground": this.colorTre,

      "list.focusForeground": this.colorFG,
      "list.focusHighlightForeground": this.colorBG0,

      "list.activeSelectionIconForeground": this.colorBG0,
      "list.activeSelectionForeground": this.colorBG0,
      "list.activeSelectionBackground": this.colorFG,

      "list.inactiveSelectionIconForeground": this.colorFG,
      "list.inactiveSelectionForeground": this.colorFG,
      "list.inactiveSelectionBackground": this.colorBG2,

      "quickInputList.focusIconForeground": this.colorBG0,
      "quickInputList.focusForeground": this.colorBG0,
      "quickInputList.focusBackground": this.colorFG,

      "list.hoverBackground": this.alpha(this.colorFG, 5),
    };
  }

  private themeTerminal() {
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

  private themeDiff() {
    return {};
  }

  private themeGit() {
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

  private themeStatusBar() {
    const bg = this.colorBG1;
    const fg = this.colorFG;
    const border = this.colorBorder0;
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

  private themeBadge() {
    return {
      "badge.foreground": this.colorBG0,
      "badge.background": this.colorFG,
    };
  }

  private themeMenu() {
    return {
      "menu.background": this.colorBG0,
      "menu.foreground": this.colorFG,
      "menu.separatorBackground": this.alpha(this.colorBorder0, 50),
    };
  }

  private themeKeybinding() {
    return {
      "keybindingLabel.background": transparent,
      "keybindingLabel.foreground": this.colorFG,
      "keybindingLabel.border": this.colorBorder0,
      "keybindingLabel.bottomBorder": this.colorBorder0,
    };
  }

  private themeHighlightBorders() {
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

  private themeScrollbar() {
    return {
      "scrollbar.shadow": transparent,
      "scrollbarSlider.background": this.alpha(this.colorFG, 30),
      "scrollbarSlider.hoverBackground": this.alpha(this.colorFG, 60),
      "scrollbarSlider.activeBackground": this.alpha(this.colorFG, 70),
    };
  }

  private themeDropdown() {
    return {
      "dropdown.background": this.colorWidgetBG,
      "dropdown.listBackground": this.colorWidgetBG,
      "dropdown.border": this.colorBorder1,
      "dropdown.foreground": this.colorFG,
    };
  }

  private tintedAnsiLight(bg: string, color: string): AnsiColors {
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

  private tintedAnsiDark(bg: string, color: string): AnsiColors {
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

  private mix(a: string, b: string, percent: number): string {
    return colord(a)
      .mix(b, percent / 100)
      .toHex();
  }

  private themeDragAndDrop() {
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

  private themeButton() {
    return {
      "button.background": this.colorFG,
      "button.foreground": this.colorBG0,
      "button.hoverBackground": this.alpha(this.colorFG, 95),
      "button.separator": this.alpha(this.colorBG0, 30),
      "button.secondaryBackground": this.colorTre,
      "button.secondaryForeground": this.colorBG0,
      "button.secondaryHoverBackground": this.alpha(this.colorTre, 95),
    };
  }

  private themeBracketColors() {
    ////////////////////////////////////////////////////////////////////////////
    //
    // Code just for looking at the colorized braces... sorry!
    //
    const x = 0;
    [x, [x, [x, [x, [x, [x, x], x], x], x], x], x];
    [x, [x, [x, [x, [x, [x]]]]]];
    //
    ////////////////////////////////////////////////////////////////////////////
    const tweakColor = (color: string): string => {
      return this.fixContrast({
        type: "text",
        fg: this.mix(color, this.colorBG0, 30),
        bg: this.colorBG0,
      });
    };
    const b1 = tweakColor(this.colorUno);
    const b2 = tweakColor(this.colorDue);
    const b3 = tweakColor(this.colorTre);
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

  private themeEditor() {
    return {
      "editorWidget.foreground": this.colorFG,
      "editorWidget.background": this.colorBG1,
      "editorWidget.border": this.colorBorder0,
      "editorWidget.resizeBorder": this.colorBorder1,
      "editorBracketMatch.background": this.alpha(this.colorTre, 15),
      "editorBracketMatch.border": this.alpha(this.colorTre, 50),
      "editor.findMatchBackground": this.alpha(this.orange, 50),
      "editor.findMatchHighlightBackground": this.alpha(this.yellow, 50),
      "editor.findRangeHighlightBackground": this.alpha(this.orange, 50),
      "editor.foreground": this.colorFG,
      "editor.background": this.colorBG0,
      "editor.foldBackground": transparent,
      "editorLink.activeForeground": this.colorSubtle,
      "editor.lineHighlightBackground": this.colorBG1,
      "editor.rangeHighlightBackground": this.alpha(this.orange, 10),
      "editor.selectionBackground": this.alpha(this.colorTre, 30),
      "editor.inactiveSelectionBackground": this.alpha(this.colorTre, 30),
      "editor.wordHighlightBackground": this.alpha(this.blue, 25),
      "editor.wordHighlightStrongBackground": this.alpha(this.purple, 30),
      "editorOverviewRuler.border": this.alpha(this.colorBorder0, 25),
      "editorCursor.foreground": this.colorTre,
      "editorGroup.border": this.colorBorder0,
      "editorRuler.foreground": this.alpha(this.colorBorder0, 25),
      "editorIndentGuide.background": this.alpha(this.colorBorder0, 50),
      "editorIndentGuide.activeBackground": this.colorBorder0,
      "editorLineNumber.foreground": this.alpha(this.colorFG, 30),
      "editorLineNumber.activeForeground": this.colorFG,
    };
  }

  private themeTitlebar() {
    return {
      "titleBar.activeBackground": this.colorBG1,
      "titleBar.activeForeground": this.colorFG,
      "titleBar.inactiveBackground": this.colorBG1,
      "titleBar.inactiveForeground": this.alpha(this.colorFG, 70),
      "titleBar.border": this.colorBorder0,
    };
  }

  private themeTabs() {
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

  private colors(): Record<string, string | undefined> {
    return {
      focusBorder: this.colorTre,
      "icon.foreground": this.colorFG,
      "toolbar.hoverBackground": this.alpha(this.colorFG, 5),
      "toolbar.activeBackground": this.alpha(this.colorFG, 15),
      "widget.shadow":
        this.themeType === "light"
          ? this.alpha(this.colorFG, 50)
          : this.alpha(this.darken(this.colorBG1, 5), 50),
      ...this.themeScrollbar(),
      "input.border": this.colorBorder1,
      "input.background": this.colorWidgetBG,
      "input.placeholderForeground": this.alpha(this.colorFG, 40),
      "progressBar.background": this.colorFG,
      "inputOption.activeBorder": this.colorFG,
      ...this.themeCommandCenter(),
      ...this.themeList(),
      ...this.themeStatusBar(),
      ...this.themeBadge(),
      ...this.themeMenu(),
      ...this.themeKeybinding(),
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
      "pickerGroup.border": this.alpha(this.colorBorder0, 50),
      ...this.themeDiff(),
      ...this.themeGit(),
      ...this.themeTitlebar(),
      "debugToolBar.background": this.colorWidgetBG,
      ...this.themeDropdown(),
      ...this.themeHighlightBorders(),
      ...this.themeTerminal(),
    };
  }

  private themeCommandCenter(): Record<string, string | undefined> {
    return {
      "commandCenter.foreground": this.colorFG,
      "commandCenter.inactiveForeground": this.alpha(this.colorFG, 50),
      "commandCenter.background": this.colorBG1,
      "commandCenter.border": this.colorBorder0,
      "commandCenter.inactiveBorder": this.colorBorder0,
      "commandCenter.activeBackground": this.colorBG0,
      "commandCenter.activeBorder": this.colorBorder0,
    };
  }

  private fixContrast({
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

  private tokenColors(): TokenColor[] {
    function color(
      foreground: string,
      fontStyle: FontStyle = "normal"
    ): TokenSettingColor {
      return { foreground, fontStyle };
    }
    const tokens = {
      default: color(this.colorFG),
      uno: color(this.colorUno),
      unoBold: color(this.colorUno, "bold"),
      due: color(this.colorDue),
      dueBold: color(this.colorDue, "bold"),
      tre: color(this.colorTre),
      subtle: color(this.colorSubtle),
    } as const;
    return [
      {
        scope: [
          "meta.embedded",
          "source.groovy.embedded",
          "string meta.image.inline.markdown",
        ],
        settings: tokens.default,
      },
      {
        scope: "emphasis",
        settings: {
          fontStyle: "italic",
        },
      },
      {
        scope: "strong",
        settings: {
          fontStyle: "bold",
        },
      },
      {
        scope: "header",
        settings: {
          foreground: "#000080",
        },
      },
      {
        scope: "comment",
        settings: tokens.subtle,
      },
      {
        scope: "constant.language",
        settings: tokens.due,
      },
      {
        scope: [
          "variable.other.enummember",
          "keyword.operator.plus.exponent",
          "keyword.operator.minus.exponent",
        ],
        settings: tokens.default,
      },
      {
        scope: "constant.regexp",
        settings: tokens.due,
      },
      {
        scope: "entity.name.tag",
        settings: tokens.uno,
      },
      {
        scope: "entity.name.tag.css",
        settings: tokens.default,
      },
      {
        scope: "entity.other.attribute-name",
        settings: tokens.due,
      },
      {
        scope: [
          "entity.other.attribute-name.class.css",
          "entity.other.attribute-name.class.mixin.css",
          "entity.other.attribute-name.id.css",
          "entity.other.attribute-name.parent-selector.css",
          "entity.other.attribute-name.pseudo-class.css",
          "entity.other.attribute-name.pseudo-element.css",
          "source.css.less entity.other.attribute-name.id",
          "entity.other.attribute-name.scss",
        ],
        settings: tokens.due,
      },
      {
        scope: "invalid",
        settings: {
          foreground: this.red,
        },
      },
      {
        scope: "markup.underline",
        settings: {
          fontStyle: "underline",
        },
      },
      {
        scope: "markup.bold",
        settings: {
          fontStyle: "bold",
          foreground: this.colorDue,
        },
      },
      {
        scope: "markup.heading",
        settings: tokens.unoBold,
      },
      {
        scope: "markup.italic",
        settings: {
          fontStyle: "italic",
          foreground: this.colorDue,
        },
      },
      {
        scope: "markup.strikethrough",
        settings: {
          fontStyle: "strikethrough",
        },
      },
      {
        scope: "markup.inserted",
        settings: {
          // TODO
          foreground: "#b5cea8",
        },
      },
      {
        scope: "markup.deleted",
        settings: {
          // TODO
          foreground: "#ce9178",
        },
      },
      {
        scope: "markup.changed",
        settings: {
          // TODO
          foreground: "#569cd6",
        },
      },
      {
        scope: "punctuation.definition.quote.begin.markdown",
        settings: tokens.subtle,
      },
      {
        scope: "punctuation.definition.list.begin.markdown",
        settings: tokens.subtle,
      },
      {
        scope: "markup.inline.raw",
        settings: {
          // TODO
          foreground: "#ce9178",
        },
      },
      {
        name: "brackets of XML/HTML tags",
        scope: "punctuation.definition.tag",
        settings: tokens.subtle,
      },
      {
        scope: ["meta.preprocessor", "entity.name.function.preprocessor"],
        settings: tokens.due,
      },
      {
        scope: "meta.preprocessor.string",
        settings: tokens.tre,
      },
      {
        scope: ["constant.numeric", "meta.preprocessor.numeric"],
        settings: tokens.due,
      },
      {
        scope: "meta.structure.dictionary.key.python",
        settings: tokens.uno,
      },
      {
        scope: "meta.diff.header",
        settings: {
          // TODO
          foreground: "#569cd6",
        },
      },
      {
        scope: "storage",
        settings: {
          // TODO
          foreground: "#569cd6",
        },
      },
      {
        scope: "storage.type",
        settings: tokens.unoBold,
      },
      {
        scope: ["storage.modifier", "keyword.operator.noexcept"],
        settings: tokens.unoBold,
      },
      {
        scope: ["string", "meta.embedded.assembly"],
        settings: tokens.tre,
      },
      {
        scope: "string.tag",
        settings: tokens.tre,
      },
      {
        scope: "string.value",
        settings: tokens.tre,
      },
      {
        scope: "string.regexp",
        settings: tokens.due,
      },
      {
        name: "String interpolation",
        scope: [
          "punctuation.definition.template-expression.begin",
          "punctuation.definition.template-expression.end",
          "punctuation.section.embedded",
        ],
        settings: tokens.subtle,
      },
      {
        name: "Reset string interpolation expression",
        scope: ["meta.template.expression", "meta.interpolation"],
        settings: tokens.default,
      },
      {
        scope: [
          "support.type.vendored.property-name",
          "support.type.property-name",
          "variable.css",
          "variable.scss",
          "variable.other.less",
          "source.coffee.embedded",
        ],
        settings: tokens.uno,
      },
      {
        scope: "keyword",
        settings: tokens.unoBold,
      },
      {
        scope: "keyword.control",
        settings: tokens.unoBold,
      },
      {
        scope: ["keyword.operator.type.annotation"],
        settings: tokens.subtle,
      },
      {
        scope: "keyword.operator",
        settings: tokens.uno,
      },
      {
        scope: [
          "keyword.operator.new",
          "keyword.operator.expression",
          "keyword.operator.cast",
          "keyword.operator.sizeof",
          "keyword.operator.alignof",
          "keyword.operator.typeid",
          "keyword.operator.alignas",
          "keyword.operator.instanceof",
          "keyword.operator.logical.python",
          "keyword.operator.wordlike",
        ],
        settings: tokens.uno,
      },
      {
        scope: "keyword.other.unit",
        settings: tokens.uno,
      },
      {
        scope: [
          "punctuation.section.embedded.begin.php",
          "punctuation.section.embedded.end.php",
        ],
        settings: tokens.subtle,
      },
      {
        scope: "support.function.git-rebase",
        settings: {
          // TODO
          foreground: "#9cdcfe",
        },
      },
      {
        scope: "constant.sha.git-rebase",
        settings: {
          // TODO
          foreground: "#b5cea8",
        },
      },
      {
        name: "coloring of the Java import and package identifiers",
        scope: [
          "storage.modifier.import.java",
          "variable.language.wildcard.java",
          "storage.modifier.package.java",
        ],
        settings: tokens.default,
      },
      {
        name: "this.self",
        scope: "variable.language",
        settings: tokens.subtle,
      },
      {
        name: "Function declarations",
        scope: [
          "entity.name.function",
          "support.function",
          "support.constant.handlebars",
          "source.powershell variable.other.member",
          // See https://en.cppreference.com/w/cpp/language/user_literal
          "entity.name.operator.custom-literal",
        ],
        settings: tokens.due,
      },
      {
        name: "Types declaration and references",
        scope: [
          "support.class",
          "support.type",
          "entity.name.type",
          "entity.name.namespace",
          "entity.other.attribute",
          "entity.name.scope-resolution",
          "entity.name.class",
          "storage.type.numeric.go",
          "storage.type.byte.go",
          "storage.type.boolean.go",
          "storage.type.string.go",
          "storage.type.uintptr.go",
          "storage.type.error.go",
          "storage.type.rune.go",
          "storage.type.cs",
          "storage.type.generic.cs",
          "storage.type.modifier.cs",
          "storage.type.variable.cs",
          "storage.type.annotation.java",
          "storage.type.generic.java",
          "storage.type.java",
          "storage.type.object.array.java",
          "storage.type.primitive.array.java",
          "storage.type.primitive.java",
          "storage.type.token.java",
          "storage.type.groovy",
          "storage.type.annotation.groovy",
          "storage.type.parameters.groovy",
          "storage.type.generic.groovy",
          "storage.type.object.array.groovy",
          "storage.type.primitive.array.groovy",
          "storage.type.primitive.groovy",
        ],
        settings: tokens.dueBold,
      },
      {
        name: "Types declaration and references, TS grammar specific",
        scope: [
          "meta.type.cast.expr",
          "meta.type.new.expr",
          "support.constant.math",
          "support.constant.dom",
          "support.constant.json",
          "entity.other.inherited-class",
        ],
        settings: tokens.dueBold,
      },
      {
        name: "Control flow / Special keywords",
        scope: [
          "keyword.control",
          "source.cpp keyword.operator.new",
          "keyword.operator.delete",
          "keyword.other.using",
          "keyword.other.operator",
          "entity.name.operator",
        ],
        settings: tokens.unoBold,
      },
      {
        name: "Variable and parameter name",
        scope: [
          // "variable",
          "meta.definition.variable.name",
          // "support.variable",
          "entity.name.variable",
          // placeholders in strings
          "constant.other.placeholder",
        ],
        settings: tokens.due,
      },
      {
        name: "Constants and enums",
        scope: ["variable.other.constant", "variable.other.enummember"],
        settings: tokens.default,
      },
      {
        name: "Object keys, TS grammar specific",
        scope: ["meta.object-literal.key"],
        settings: tokens.uno,
      },
      // {
      //   name: "CSS property value",
      //   scope: [
      //     "support.constant.property-value",
      //     "support.constant.font-name",
      //     "support.constant.media-type",
      //     "support.constant.media",
      //     "constant.other.color.rgb-value",
      //     "constant.other.rgb-value",
      //     "support.constant.color",
      //   ],
      //   settings: tokens.uno,
      // },
      {
        name: "Regular expression groups",
        scope: [
          "punctuation.definition.group.regexp",
          "punctuation.definition.group.assertion.regexp",
          "punctuation.definition.character-class.regexp",
          "punctuation.character.set.begin.regexp",
          "punctuation.character.set.end.regexp",
          "keyword.operator.negation.regexp",
          "support.other.parenthesis.regexp",
        ],
        settings: tokens.subtle,
      },
      {
        scope: [
          "constant.character.character-class.regexp",
          "constant.other.character-class.set.regexp",
          "constant.other.character-class.regexp",
          "constant.character.set.regexp",
        ],
        settings: tokens.uno,
      },
      {
        scope: ["keyword.operator.or.regexp", "keyword.control.anchor.regexp"],
        settings: tokens.uno,
      },
      {
        scope: "keyword.operator.quantifier.regexp",
        settings: tokens.uno,
      },
      {
        scope: ["constant.character", "constant.other.option"],
        settings: tokens.uno,
      },
      {
        scope: "constant.character.escape",
        settings: tokens.uno,
      },
      {
        scope: "entity.name.label",
        settings: tokens.subtle,
      },
      {
        scope: ["punctuation", "meta.brace"],
        settings: tokens.subtle,
      },
    ];
  }

  private showContrast(
    level: ContrastLevel,
    fg: string,
    bg: string,
    fgStr: string,
    bgStr: string
  ): void {
    const contrast = colord(fg).contrast(bg);
    const fail = contrast < Contrast[level];
    const str = [
      fail ? "[!]" : "   ",
      ANSI.bold.cyan(contrast.toFixed(1).toString().padStart(6)),
      ":",
      fg,
      "[on]",
      bg,
      ":",
      fgStr,
      "[on]",
      bgStr,
    ].join(" ");
    if (fail) {
      console.error(ANSI.bold.red(str));
      process.exit(1);
    } else {
      console.log(str);
    }
  }

  saveAs(name: string): void {
    const config = this.config();
    this.printContrastReport(name);
    const json = JSON.stringify(config, null, 2);
    fs.writeFileSync(`themes/${name}-color-theme.json`, json);
  }

  private printContrastReport(name: string) {
    console.log(ANSI.bold(`--- ${name} `.padEnd(60, "-")));
    this.showContrast(
      "text",
      this.colorFG,
      this.colorBG0,
      "colorFG",
      "colorBG0"
    );
    this.showContrast(
      "text",
      this.colorFG,
      this.colorBG1,
      "colorFG",
      "colorBG1"
    );
    this.showContrast(
      "text",
      this.colorFG,
      this.colorBG2,
      "colorFG",
      "colorBG2"
    );
    this.showContrast(
      "ui",
      this.colorBorder1,
      this.colorBG0,
      "colorBorder1",
      "colorBG0"
    );
    this.showContrast(
      "ui",
      this.colorBorder1,
      this.colorBG1,
      "colorBorder1",
      "colorBG1"
    );
    this.showContrast(
      "ui",
      this.colorBorder1,
      this.colorBG2,
      "colorBorder1",
      "colorBG2"
    );
    this.showContrast(
      "text",
      this.colorSubtle,
      this.colorBG0,
      "colorSubtle",
      "colorBG0"
    );
    this.showContrast(
      "text",
      this.colorUno,
      this.colorBG0,
      "colorUno",
      "colorBG0"
    );
    this.showContrast(
      "text",
      this.colorDue,
      this.colorBG0,
      "colorDue",
      "colorBG0"
    );
    this.showContrast(
      "text",
      this.colorTre,
      this.colorBG0,
      "colorTre",
      "colorBG0"
    );
    const brackets = this.themeBracketColors();
    this.showContrast(
      "text",
      brackets["editorBracketHighlight.foreground1"],
      this.colorBG0,
      "editorBracketHighlight.foreground1",
      "colorBG0"
    );
    this.showContrast(
      "text",
      brackets["editorBracketHighlight.foreground2"],
      this.colorBG0,
      "editorBracketHighlight.foreground2",
      "colorBG0"
    );
    this.showContrast(
      "text",
      brackets["editorBracketHighlight.foreground3"],
      this.colorBG0,
      "editorBracketHighlight.foreground3",
      "colorBG0"
    );
  }
}

export abstract class BaseThemeLight extends Theme {
  themeType: ThemeType = "light";
}

export abstract class BaseThemeDark extends Theme {
  themeType: ThemeType = "dark";
}
