import "./extend-colord";
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
function sortedObject<T>(obj: Record<string, T>): Record<string, T> {
  const ret: Record<string, T> = {};
  for (const key of Object.keys(obj).sort()) {
    ret[key] = obj[key];
  }
  return ret;
}

type FontStyle = "bold" | "italic" | "underline" | "strikethrough";

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

const hue = {
  bg: 160,
  uno: 60,
  due: 30,
  tre: 310,
} as const;

const ui = {
  bg0: hsl(hue.bg, 50, 13),
  bg1: hsl(hue.bg, 50, 10),
  bg2: hsl(hue.bg, 50, 20),
  fg: hsl(hue.bg, 60, 80),
  border0: hsl(hue.bg, 40, 25),
  border1: hsl(hue.bg, 50, 50),
  widget: hsl(hue.bg, 35, 12),
} as const;

const syntax = {
  default: ui.fg,

  alt0: hsl(hue.bg, 15, 60),
  alt1: hsl(hue.bg, 30, 50),

  uno0: hsl(hue.uno, 50, 73),
  uno1: hsl(hue.uno, 60, 49),
  uno2: hsl(hue.uno, 30, 46.5),

  due0: hsl(hue.due, 100, 82),
  due1: hsl(hue.due, 90, 70.5),
  due2: hsl(hue.due, 80, 57),

  tre0: hsl(hue.tre, 100, 89.5),
  tre1: hsl(hue.tre, 90, 81.75),
  tre2: hsl(hue.tre, 70, 71),
} as const;

// TODO: These are cool, but it messes up how terminal programs look too much.
// In particular the yellow-green for "green" is way too yellow, and makes a lot
// of benign things look dangerous.
const terminal = {
  black: hsl(hue.bg, 35, 26),
  red: hsl(339, 67, 68),
  green: hsl(hue.uno, 64, 68),
  yellow: hsl(30, 58, 76),
  blue: hsl(169, 71, 69),
  magenta: hsl(hue.tre, 56, 77),
  cyan: hsl(99, 66, 73),
  white: hsl(hue.bg, 32, 92),
} as const;

function hsl(h: number, s: number, l: number): string {
  return colord({ h, s, l }).toHex();
}

function alpha(color: string, percent: number): string {
  if (percent >= 100) {
    return color;
  }
  const hsl = colord(color).toHsl();
  hsl.a = percent / 100;
  return colord(hsl).toHex();
}

// TODO: Stop using this
function mix(a: string, b: string, percent: number): string {
  return colord(a)
    .mix(b, percent / 100)
    .toHex();
}

// TODO: Don't make weird generic colors like this
const misc = {
  cyan: "#00bcd4",
  red: "#cc0000",
  yellow: "#f1c40f",
  orange: "#e67e22",
  blue: "#3498db",
  purple: "#9b59b6",
} as const;

function config(): {
  /** Base theme (e.g. light/dark/high contrast) */
  type: string;
  /** UI colors */
  colors: Record<string, string | undefined>;
  /** Syntax highlighting colors */
  tokenColors: TokenColor[];
} {
  return {
    type: "dark",
    colors: sortedObject(colors()),
    tokenColors: tokenColors(),
  };
}

function themeActivityBar() {
  return {
    "activityBar.border": ui.border0,
    "activityBar.background": ui.bg1,
    "activityBar.foreground": ui.fg,
    "activityBar.inactiveForeground": alpha(ui.fg, 50),
    "activityBarBadge.background": ui.fg,
    "activityBarBadge.foreground": ui.bg0,
    "activityBar.activeBorder": ui.fg,
    "activityBar.activeBackground": alpha(ui.fg, 10),
  };
}

function themeNotifications() {
  return {
    "notificationCenter.border": undefined,
    "notificationCenterHeader.foreground": ui.fg,
    "notificationCenterHeader.background": ui.bg1,
    "notificationToast.border": ui.border0,
    "notifications.foreground": ui.fg,
    "notifications.background": ui.bg1,
    "notifications.border": undefined,
    "notificationLink.foreground": syntax.alt1,
  };
}

function themeList() {
  return {
    "quickInput.background": ui.bg0,

    "list.errorForeground": mix(misc.red, ui.fg, 50),
    "list.warningForeground": mix(misc.yellow, ui.fg, 50),
    "list.highlightForeground": syntax.tre1,

    "list.focusForeground": ui.fg,
    "list.focusHighlightForeground": ui.bg0,

    "list.activeSelectionIconForeground": ui.bg0,
    "list.activeSelectionForeground": ui.bg0,
    "list.activeSelectionBackground": ui.fg,

    "list.inactiveSelectionIconForeground": ui.fg,
    "list.inactiveSelectionForeground": ui.fg,
    "list.inactiveSelectionBackground": ui.bg2,

    "quickInputList.focusIconForeground": ui.bg0,
    "quickInputList.focusForeground": ui.bg0,
    "quickInputList.focusBackground": ui.fg,

    "list.hoverBackground": alpha(ui.fg, 5),
  };
}

function themeTerminal() {
  return {
    "terminal.foreground": ui.fg,
    "terminal.background": ui.bg0,
    "terminal.ansiBlack": terminal.black,
    "terminal.ansiBlue": terminal.blue,
    "terminal.ansiBrightBlack": terminal.black,
    "terminal.ansiBrightBlue": terminal.blue,
    "terminal.ansiBrightCyan": terminal.cyan,
    "terminal.ansiBrightGreen": terminal.green,
    "terminal.ansiBrightMagenta": terminal.magenta,
    "terminal.ansiBrightRed": terminal.red,
    "terminal.ansiBrightWhite": terminal.white,
    "terminal.ansiBrightYellow": terminal.yellow,
    "terminal.ansiCyan": terminal.cyan,
    "terminal.ansiGreen": terminal.green,
    "terminal.ansiMagenta": terminal.magenta,
    "terminal.ansiRed": terminal.red,
    "terminal.ansiWhite": terminal.white,
    "terminal.ansiYellow": terminal.yellow,
  };
}

function themeDiff() {
  // TODO: Theme these
  return {};
}

function themeGit() {
  // TODO: Redesign these colors
  return {
    "gitDecoration.modifiedResourceForeground": mix(misc.orange, ui.fg, 20),
    "gitDecoration.deletedResourceForeground": mix(misc.red, ui.fg, 20),
    "gitDecoration.untrackedResourceForeground": mix(misc.blue, ui.fg, 20),
    "gitDecoration.conflictingResourceForeground": mix(misc.cyan, ui.fg, 20),
    "gitDecoration.ignoredResourceForeground": alpha(ui.fg, 40),
  };
}

function darken(color: string, amount: number): string {
  const hsl = colord(color).toHsl();
  hsl.l -= amount;
  return colord(hsl).toHex();
}

function themeStatusBar() {
  return {
    "statusBar.border": ui.border0,
    "statusBarItem.activeBackground": alpha(ui.fg, 20),
    "statusBarItem.hoverBackground": alpha(ui.fg, 10),
    "statusBarItem.prominentBackground": alpha(ui.fg, 30),
    "statusBar.background": ui.bg1,
    "statusBar.debuggingBackground": ui.bg1,
    "statusBar.noFolderBackground": ui.bg1,
    "statusBar.foreground": ui.fg,
  };
}

function themeBadge() {
  return {
    "badge.foreground": ui.bg0,
    "badge.background": ui.fg,
  };
}

function themeMenu() {
  return {
    "menu.background": ui.bg0,
    "menu.foreground": ui.fg,
    "menu.separatorBackground": alpha(ui.border0, 50),
  };
}

function themeKeybinding() {
  return {
    "keybindingLabel.background": transparent,
    "keybindingLabel.foreground": ui.fg,
    "keybindingLabel.border": ui.border0,
    "keybindingLabel.bottomBorder": ui.border0,
  };
}

function themeHighlightBorders() {
  return {
    "editor.selectionHighlightBorder": undefined,
    "editor.wordHighlightBorder": undefined,
    "editor.wordHighlightStrongBorder": undefined,
    "editor.findMatchBorder": undefined,
    "editor.findMatchHighlightBorder": undefined,
    "editor.findRangeHighlightBorder": undefined,
    "editor.rangeHighlightBorder": undefined,
  };
}

function themeScrollbar() {
  return {
    "scrollbar.shadow": transparent,
    "scrollbarSlider.background": alpha(ui.fg, 30),
    "scrollbarSlider.hoverBackground": alpha(ui.fg, 60),
    "scrollbarSlider.activeBackground": alpha(ui.fg, 70),
  };
}

function themeDropdown() {
  return {
    "dropdown.background": ui.widget,
    "dropdown.listBackground": ui.widget,
    "dropdown.border": ui.border1,
    "dropdown.foreground": ui.fg,
  };
}

function themeDragAndDrop() {
  const color = alpha(syntax.tre1, 30);
  return {
    "list.dropBackground": color,
    "sideBar.dropBackground": color,
    "editorGroup.dropBackground": color,
    "panel.border": ui.border0,
    "panelSection.border": ui.border0,
    "panelSectionHeader.border": ui.border0,
  };
}

function themeButton() {
  return {
    "button.background": ui.fg,
    "button.foreground": ui.bg0,
    "button.hoverBackground": alpha(ui.fg, 95),
    "button.separator": alpha(ui.bg0, 30),
    "button.secondaryBackground": syntax.tre1,
    "button.secondaryForeground": ui.bg0,
    "button.secondaryHoverBackground": alpha(syntax.tre1, 95),
  };
}

function tweakColor(color: string): string {
  return fixContrast({
    type: "text",
    fg: mix(color, ui.bg0, 30),
    bg: ui.bg0,
  });
}

function themeBracketColors() {
  ////////////////////////////////////////////////////////////////////////////
  //
  // Code just for looking at the colorized braces... sorry!
  //
  const x = 0;
  [x, [x, [x, [x, [x, [x, x], x], x], x], x], x];
  [x, [x, [x, [x, [x, [x]]]]]];
  //
  ////////////////////////////////////////////////////////////////////////////
  const b1 = tweakColor(syntax.uno1);
  const b2 = tweakColor(syntax.due1);
  const b3 = tweakColor(syntax.tre1);
  return {
    "editorBracketHighlight.foreground1": b1,
    "editorBracketHighlight.foreground2": b2,
    "editorBracketHighlight.foreground3": b3,
    "editorBracketHighlight.foreground4": b1,
    "editorBracketHighlight.foreground5": b2,
    "editorBracketHighlight.foreground6": b3,
    "editorBracketHighlight.unexpectedBracket.foreground": fixContrast({
      fg: misc.red,
      bg: ui.bg0,
      type: "text",
    }),
  };
}

function themeEditor() {
  return {
    "editorWidget.foreground": ui.fg,
    "editorWidget.background": ui.bg1,
    "editorWidget.border": ui.border0,
    "editorWidget.resizeBorder": ui.border1,
    "editorBracketMatch.background": alpha(syntax.tre1, 15),
    "editorBracketMatch.border": alpha(syntax.tre1, 50),
    "editor.findMatchBackground": alpha(misc.orange, 50),
    "editor.findMatchHighlightBackground": alpha(misc.yellow, 50),
    "editor.findRangeHighlightBackground": alpha(misc.orange, 50),
    "editor.foreground": ui.fg,
    "editor.background": ui.bg0,
    "editor.foldBackground": transparent,
    "editorLink.activeForeground": syntax.alt1,
    "editor.lineHighlightBackground": ui.bg1,
    "editor.rangeHighlightBackground": alpha(misc.orange, 10),
    "editor.selectionBackground": alpha(syntax.tre1, 30),
    "editor.inactiveSelectionBackground": alpha(syntax.tre1, 30),
    "editor.wordHighlightBackground": alpha(misc.blue, 25),
    "editor.wordHighlightStrongBackground": alpha(misc.purple, 30),
    "editorOverviewRuler.border": alpha(ui.border0, 25),
    "editorCursor.foreground": syntax.tre1,
    "editorGroup.border": ui.border0,
    "editorRuler.foreground": alpha(ui.border0, 25),
    "editorIndentGuide.background": alpha(ui.border0, 50),
    "editorIndentGuide.activeBackground": ui.border0,
    "editorLineNumber.foreground": alpha(ui.fg, 30),
    "editorLineNumber.activeForeground": ui.fg,
  };
}

function themeTitlebar() {
  return {
    "titleBar.activeBackground": ui.bg1,
    "titleBar.activeForeground": ui.fg,
    "titleBar.inactiveBackground": ui.bg1,
    "titleBar.inactiveForeground": alpha(ui.fg, 70),
    "titleBar.border": ui.border0,
  };
}

function themeTabs() {
  return {
    "tab.border": ui.bg1,
    "editorGroupHeader.tabsBorder": ui.border0,
    "editorGroupHeader.border": ui.border0,
    "breadcrumb.background": ui.bg0,
    "editorGroupHeader.noTabsBackground": ui.bg1,
    "editorGroupHeader.tabsBackground": ui.bg1,
    "tab.activeBorder": ui.border1,
    "tab.unfocusedActiveBorder": ui.border1,
    "tab.activeBorderTop": undefined,
    "tab.unfocusedActiveBorderTop": undefined,
    "tab.activeBackground": ui.bg2,
    "tab.activeForeground": ui.fg,
    "tab.inactiveBackground": ui.bg1,
    "tab.inactiveForeground": alpha(ui.fg, 80),
  };
}

function colors() {
  return {
    focusBorder: syntax.tre1,
    "icon.foreground": ui.fg,
    "toolbar.hoverBackground": alpha(ui.fg, 5),
    "toolbar.activeBackground": alpha(ui.fg, 15),
    "widget.shadow": alpha(darken(ui.bg1, 5), 50),
    ...themeScrollbar(),
    "input.border": ui.border1,
    "input.background": ui.widget,
    "input.placeholderForeground": alpha(ui.fg, 40),
    "progressBar.background": ui.fg,
    "inputOption.activeBorder": ui.fg,
    ...themeCommandCenter(),
    ...themeList(),
    ...themeStatusBar(),
    ...themeBadge(),
    ...themeMenu(),
    ...themeKeybinding(),
    ...themeActivityBar(),
    ...themeBracketColors(),
    ...themeEditor(),
    ...themeNotifications(),
    ...themeDragAndDrop(),
    ...themeButton(),
    foreground: ui.fg,
    "panel.background": ui.bg0,
    "panel.border": ui.border0,
    "panelTitle.activeBorder": alpha(ui.fg, 50),
    "panelTitle.activeForeground": ui.fg,
    "panelTitle.inactiveForeground": alpha(ui.fg, 60),
    "peekViewEditor.matchHighlightBackground": alpha(misc.yellow, 50),
    "peekViewResult.matchHighlightBackground": alpha(misc.yellow, 50),
    "sideBar.border": ui.border0,
    "sideBar.background": ui.bg1,
    "sideBarSectionHeader.background": ui.bg1,
    "sideBarSectionHeader.border": ui.border0,
    "tree.indentGuidesStroke": alpha(ui.border0, 50),
    ...themeTabs(),
    "pickerGroup.border": alpha(ui.border0, 50),
    ...themeDiff(),
    ...themeGit(),
    ...themeTitlebar(),
    "debugToolBar.background": ui.widget,
    ...themeDropdown(),
    ...themeHighlightBorders(),
    ...themeTerminal(),
  };
}

function themeCommandCenter() {
  return {
    "commandCenter.foreground": ui.fg,
    "commandCenter.inactiveForeground": alpha(ui.fg, 50),
    "commandCenter.background": ui.bg1,
    "commandCenter.border": ui.border0,
    "commandCenter.inactiveBorder": ui.border0,
    "commandCenter.activeBackground": ui.bg0,
    "commandCenter.activeBorder": ui.border0,
  };
}

function fixContrast({
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

function tokenColors(): TokenColor[] {
  function createToken(
    foreground: string,
    fontStyle?: FontStyle
  ): TokenSettingColor {
    return { foreground, fontStyle };
  }

  const tokens = {
    default: createToken(syntax.default),

    alt0: createToken(syntax.alt0),
    alt1: createToken(syntax.alt1),

    uno0: createToken(syntax.uno0),
    uno1: createToken(syntax.uno1),
    uno2: createToken(syntax.uno2),

    due0: createToken(syntax.due0),
    due1: createToken(syntax.due1),
    due2: createToken(syntax.due2),

    tre0: createToken(syntax.tre0),
    tre1: createToken(syntax.tre1),
    tre2: createToken(syntax.tre2),
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
      settings: tokens.uno1,
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      // TODO: Maybe a nicer color for comments?
      settings: tokens.alt0,
    },
    {
      scope: "constant.language",
      settings: tokens.tre2,
    },
    // {
    //   scope: [
    //     "variable.other.enummember",
    //     "keyword.operator.plus.exponent",
    //     "keyword.operator.minus.exponent",
    //   ],
    //   settings: tokens.default,
    // },
    {
      scope: "constant.regexp",
      settings: tokens.tre1,
    },
    {
      name: "JSX tags",
      scope: ["support.class.component", "entity.name.tag"],
      settings: tokens.uno0,
    },
    {
      scope: "entity.name.tag.css",
      settings: tokens.default,
    },
    {
      scope: "entity.other.attribute-name",
      settings: tokens.due1,
    },
    {
      scope: [
        "entity.other.attribute-name.class.css",
        "entity.other.attribute-name.class.mixin.css",
        "entity.other.attribute-name.id.css",
        "entity.other.attribute-name.parent-selector.css",
        "source.css.less entity.other.attribute-name.id",
        "entity.other.attribute-name.scss",
      ],
      settings: tokens.due1,
    },
    {
      scope: [
        "entity.other.attribute-name.pseudo-class.css",
        "entity.other.attribute-name.pseudo-element.css",
      ],
      settings: tokens.due2,
    },
    {
      scope: "invalid",
      settings: {
        // TODO: Don't do this...
        foreground: fixContrast({ fg: misc.red, bg: ui.bg0, type: "text" }),
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
        foreground: syntax.due1,
      },
    },
    {
      scope: "markup.heading",
      settings: {
        fontStyle: "bold",
        foreground: syntax.uno1,
      },
    },
    {
      scope: "markup.italic",
      settings: {
        fontStyle: "italic",
        foreground: syntax.due1,
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
        foreground: misc.cyan,
      },
    },
    {
      scope: "markup.deleted",
      settings: {
        foreground: misc.red,
      },
    },
    {
      scope: "markup.changed",
      settings: {
        foreground: misc.orange,
      },
    },
    {
      scope: "punctuation.definition.quote.begin.markdown",
      settings: tokens.alt1,
    },
    {
      scope: "punctuation.definition.list.begin.markdown",
      settings: tokens.alt1,
    },
    {
      scope: "markup.inline.raw",
      settings: tokens.due1,
    },
    {
      name: "brackets of XML/HTML tags",
      scope: "punctuation.definition.tag",
      settings: tokens.alt1,
    },
    {
      scope: ["meta.preprocessor", "entity.name.function.preprocessor"],
      settings: tokens.due1,
    },
    {
      scope: "meta.preprocessor.string",
      settings: tokens.tre1,
    },
    {
      scope: ["constant.numeric", "meta.preprocessor.numeric"],
      settings: tokens.tre0,
    },
    {
      scope: "meta.structure.dictionary.key.python",
      settings: tokens.uno1,
    },
    {
      scope: "meta.diff.header",
      settings: tokens.uno1,
    },
    {
      scope: "storage",
      settings: tokens.default,
    },
    {
      scope: ["source.java storage.type", "source.go storage.type"],
      settings: tokens.due1,
    },
    {
      scope: "storage.type",
      settings: tokens.uno1,
    },
    {
      scope: ["storage.modifier", "keyword.operator.noexcept"],
      settings: tokens.uno1,
    },
    {
      scope: ["string", "meta.embedded.assembly", "constant.other.symbol"],
      settings: tokens.tre1,
    },
    {
      scope: "string.tag",
      settings: tokens.tre1,
    },
    {
      scope: "string.value",
      settings: tokens.tre1,
    },
    {
      scope: "string.regexp",
      settings: tokens.tre1,
    },
    {
      name: "String interpolation",
      scope: [
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded",
      ],
      settings: tokens.alt1,
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
      settings: tokens.uno0,
    },
    {
      scope: "keyword",
      settings: tokens.uno1,
    },
    {
      scope: "keyword.control",
      settings: tokens.uno1,
    },
    {
      scope: ["keyword.operator.type.annotation"],
      settings: tokens.alt1,
    },
    {
      scope: "keyword.operator",
      settings: tokens.uno1,
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
      settings: tokens.uno1,
    },
    {
      scope: "keyword.other.unit",
      settings: tokens.tre2,
    },
    {
      scope: [
        "punctuation.section.embedded.begin.php",
        "punctuation.section.embedded.end.php",
      ],
      settings: tokens.alt1,
    },
    // {
    //   scope: "support.function.git-rebase",
    //   settings: {
    //     foreground: "#9cdcfe",
    //   },
    // },
    // {
    //   scope: "constant.sha.git-rebase",
    //   settings: {
    //     foreground: "#b5cea8",
    //   },
    // },
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
      name: "self",
      scope: "variable.language",
      settings: tokens.due2,
    },
    {
      name: "Functions",
      scope: [
        "entity.name.function",
        "meta.function-call.generic",
        "support.function",
        "support.constant.handlebars",
        "source.powershell variable.other.member",
        // See https://en.cppreference.com/w/cpp/language/user_literal
        "entity.name.operator.custom-literal",
      ],
      settings: tokens.due0,
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
        // "storage.type.numeric.go",
        // "storage.type.byte.go",
        // "storage.type.boolean.go",
        // "storage.type.string.go",
        // "storage.type.uintptr.go",
        // "storage.type.error.go",
        // "storage.type.rune.go",
        // "storage.type.cs",
        // "storage.type.generic.cs",
        // "storage.type.modifier.cs",
        // "storage.type.variable.cs",
        // "storage.type.annotation.java",
        // "storage.type.generic.java",
        // "storage.type.java",
        // "storage.type.object.array.java",
        // "storage.type.primitive.array.java",
        // "storage.type.primitive.java",
        // "storage.type.token.java",
        // "storage.type.groovy",
        // "storage.type.annotation.groovy",
        // "storage.type.parameters.groovy",
        // "storage.type.generic.groovy",
        // "storage.type.object.array.groovy",
        // "storage.type.primitive.array.groovy",
        // "storage.type.primitive.groovy",
      ],
      settings: tokens.due1,
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
      settings: tokens.due1,
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
      settings: tokens.uno1,
    },
    {
      name: "Variable and parameter name",
      scope: [
        "variable",
        "meta.definition.variable.name",
        "support.variable",
        "entity.name.variable",
      ],
      settings: tokens.default,
    },
    // {
    //   name: "Constants and enums",
    //   scope: [
    //     "variable.other.constant",
    //     "variable.other.enummember",
    //   ],
    //   settings: tokens.default,
    // },
    {
      name: "Object keys, TS grammar specific",
      scope: ["meta.object-literal.key"],
      settings: tokens.uno0,
    },
    {
      name: "CSS property value",
      scope: [
        "support.constant.property-value",
        "support.constant.font-name",
        "support.constant.media-type",
        "support.constant.media",
        "constant.other.color.rgb-value",
        "constant.other.rgb-value",
        "support.constant.color",
      ],
      settings: tokens.due0,
    },
    {
      name: "String placeholders",
      scope: [
        // placeholders in strings
        "constant.other.placeholder",
      ],
      settings: tokens.uno1,
    },
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
      settings: tokens.tre0,
    },
    {
      scope: [
        "constant.character.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "constant.other.character-class.regexp",
        "constant.character.set.regexp",
      ],
      settings: tokens.tre0,
    },
    {
      scope: ["keyword.operator.or.regexp", "keyword.control.anchor.regexp"],
      settings: tokens.alt1,
    },
    {
      scope: "keyword.operator.quantifier.regexp",
      settings: tokens.tre0,
    },
    {
      scope: ["constant.character", "constant.other.option"],
      settings: tokens.tre0,
    },
    {
      scope: "constant.character.escape",
      settings: tokens.tre0,
    },
    {
      scope: "entity.name.label",
      settings: tokens.default,
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: tokens.alt1,
    },
  ];
}

function showContrast(
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
    ANSI.bold.yellow(contrast.toFixed(1).toString().padStart(4)),
    ANSI.bold.magenta(" :: "),
    bgStr,
    ANSI.bold.magenta(" <- "),
    fgStr,
  ].join(" ");
  if (fail) {
    console.error(ANSI.bold.red(str));
    process.exit(1);
  } else {
    console.log(str);
  }
}

function save(): void {
  printContrastReport();
  const json = JSON.stringify(config(), null, 2);
  fs.writeFileSync("themes/miasma-color-theme.json", json);
}

function printContrastReport(): void {
  showContrast("text", ui.fg, ui.bg0, "ui.fg", "ui.bg0");
  showContrast("text", ui.fg, ui.bg1, "ui.fg", "ui.bg1");
  showContrast("text", ui.fg, ui.bg2, "ui.fg", "ui.bg2");
  showContrast("ui", ui.border1, ui.bg0, "ui.border1", "ui.bg0");
  showContrast("ui", ui.border1, ui.bg1, "ui.border1", "ui.bg1");
  showContrast("ui", ui.border1, ui.bg2, "ui.border1", "ui.bg2");
  for (const [name, color] of Object.entries(syntax)) {
    showContrast("text", color, ui.bg0, `syntax.${name}`, "ui.bg0");
  }
  for (const [name, color] of Object.entries(terminal)) {
    if (name === "black") {
      continue;
    }
    showContrast("text", color, ui.bg0, `terminal.${name}`, "ui.bg0");
  }
  // TODO
  // for (const [name, color] of Object.entries(themeBracketColors())) {
  //   showContrast("text", color, ui.bg0, name, "ui.bg0");
  // }
}

save();
