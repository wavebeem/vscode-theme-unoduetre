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

type FontStyle = "normal" | "bold" | "italic" | "underline" | "strikethrough";

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

const hueBG = 160;
const hueUno = 60;
const hueDue = 30;
const hueTre = 310;

const colorBG0 = hsl(hueBG, 35, 15);
const colorBG1 = hsl(hueBG, 50, 10);
const colorBG2 = hsl(hueBG, 50, 20);
const colorFG = hsl(hueBG, 60, 80);

const colorSubtle = hsl(hueBG, 5, 62);
const colorUno = hsl(hueUno, 60, 60);
const colorDue = hsl(hueDue, 80, 75);
const colorTre = hsl(hueTre, 80, 80);

const colorBorder0 = hsl(hueBG, 40, 25);
const colorBorder1 = hsl(hueBG, 50, 50);
const colorWidgetBG = hsl(hueBG, 35, 12);

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

const cyan = "#00bcd4";
const red = "#cc0000";
const yellow = "#f1c40f";
const orange = "#e67e22";
const blue = "#3498db";
const purple = "#9b59b6";

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
    "activityBar.border": colorBorder0,
    "activityBar.background": colorBG1,
    "activityBar.foreground": colorFG,
    "activityBar.inactiveForeground": alpha(colorFG, 50),
    "activityBarBadge.background": colorFG,
    "activityBarBadge.foreground": colorBG0,
    "activityBar.activeBorder": colorFG,
    "activityBar.activeBackground": alpha(colorFG, 10),
  };
}

function themeNotifications() {
  return {
    "notificationCenter.border": undefined,
    "notificationCenterHeader.foreground": colorFG,
    "notificationCenterHeader.background": colorBG1,
    "notificationToast.border": colorBorder0,
    "notifications.foreground": colorFG,
    "notifications.background": colorBG1,
    "notifications.border": undefined,
    "notificationLink.foreground": colorSubtle,
  };
}

function themeList() {
  return {
    "quickInput.background": colorBG0,

    "list.errorForeground": mix(red, colorFG, 50),
    "list.warningForeground": mix(yellow, colorFG, 50),
    "list.highlightForeground": colorTre,

    "list.focusForeground": colorFG,
    "list.focusHighlightForeground": colorBG0,

    "list.activeSelectionIconForeground": colorBG0,
    "list.activeSelectionForeground": colorBG0,
    "list.activeSelectionBackground": colorFG,

    "list.inactiveSelectionIconForeground": colorFG,
    "list.inactiveSelectionForeground": colorFG,
    "list.inactiveSelectionBackground": colorBG2,

    "quickInputList.focusIconForeground": colorBG0,
    "quickInputList.focusForeground": colorBG0,
    "quickInputList.focusBackground": colorFG,

    "list.hoverBackground": alpha(colorFG, 5),
  };
}

function themeTerminal() {
  const tBlack = "#2b594a";
  const tRed = "#e4779d";
  const tGreen = "#dce279";
  const tYellow = "#e5c19e";
  const tBlue = "#77e8d4";
  const tMagenta = "#e5a4da";
  const tCyan = "#ade88d";
  const tWhite = "#e4f1ec";
  return {
    "terminal.foreground": colorFG,
    "terminal.background": colorBG0,
    "terminal.ansiBlack": tBlack,
    "terminal.ansiBlue": tBlue,
    "terminal.ansiBrightBlack": tBlack,
    "terminal.ansiBrightBlue": tBlue,
    "terminal.ansiBrightCyan": tCyan,
    "terminal.ansiBrightGreen": tGreen,
    "terminal.ansiBrightMagenta": tMagenta,
    "terminal.ansiBrightRed": tRed,
    "terminal.ansiBrightWhite": tWhite,
    "terminal.ansiBrightYellow": tYellow,
    "terminal.ansiCyan": tCyan,
    "terminal.ansiGreen": tGreen,
    "terminal.ansiMagenta": tMagenta,
    "terminal.ansiRed": tRed,
    "terminal.ansiWhite": tWhite,
    "terminal.ansiYellow": tYellow,
  };
}

function themeDiff() {
  return {};
}

function themeGit() {
  return {
    "gitDecoration.modifiedResourceForeground": mix(orange, colorFG, 20),
    "gitDecoration.deletedResourceForeground": mix(red, colorFG, 20),
    "gitDecoration.untrackedResourceForeground": mix(blue, colorFG, 20),
    "gitDecoration.conflictingResourceForeground": mix(cyan, colorFG, 20),
    "gitDecoration.ignoredResourceForeground": alpha(colorFG, 40),
  };
}

function darken(color: string, amount: number): string {
  const hsl = colord(color).toHsl();
  hsl.l -= amount;
  return colord(hsl).toHex();
}

function themeStatusBar() {
  return {
    "statusBar.border": colorBorder0,
    "statusBarItem.activeBackground": alpha(colorFG, 20),
    "statusBarItem.hoverBackground": alpha(colorFG, 10),
    "statusBarItem.prominentBackground": alpha(colorFG, 30),
    "statusBar.background": colorBG1,
    "statusBar.debuggingBackground": colorBG1,
    "statusBar.noFolderBackground": colorBG1,
    "statusBar.foreground": colorFG,
  };
}

function themeBadge() {
  return {
    "badge.foreground": colorBG0,
    "badge.background": colorFG,
  };
}

function themeMenu() {
  return {
    "menu.background": colorBG0,
    "menu.foreground": colorFG,
    "menu.separatorBackground": alpha(colorBorder0, 50),
  };
}

function themeKeybinding() {
  return {
    "keybindingLabel.background": transparent,
    "keybindingLabel.foreground": colorFG,
    "keybindingLabel.border": colorBorder0,
    "keybindingLabel.bottomBorder": colorBorder0,
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
    "scrollbarSlider.background": alpha(colorFG, 30),
    "scrollbarSlider.hoverBackground": alpha(colorFG, 60),
    "scrollbarSlider.activeBackground": alpha(colorFG, 70),
  };
}

function themeDropdown() {
  return {
    "dropdown.background": colorWidgetBG,
    "dropdown.listBackground": colorWidgetBG,
    "dropdown.border": colorBorder1,
    "dropdown.foreground": colorFG,
  };
}

function mix(a: string, b: string, percent: number): string {
  return colord(a)
    .mix(b, percent / 100)
    .toHex();
}

function themeDragAndDrop() {
  const color = alpha(colorTre, 30);
  return {
    "list.dropBackground": color,
    "sideBar.dropBackground": color,
    "editorGroup.dropBackground": color,
    "panel.border": colorBorder0,
    "panelSection.border": colorBorder0,
    "panelSectionHeader.border": colorBorder0,
  };
}

function themeButton() {
  return {
    "button.background": colorFG,
    "button.foreground": colorBG0,
    "button.hoverBackground": alpha(colorFG, 95),
    "button.separator": alpha(colorBG0, 30),
    "button.secondaryBackground": colorTre,
    "button.secondaryForeground": colorBG0,
    "button.secondaryHoverBackground": alpha(colorTre, 95),
  };
}

function tweakColor(color: string): string {
  return fixContrast({
    type: "text",
    fg: mix(color, colorBG0, 30),
    bg: colorBG0,
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
  const b1 = tweakColor(colorUno);
  const b2 = tweakColor(colorDue);
  const b3 = tweakColor(colorTre);
  return {
    "editorBracketHighlight.foreground1": b1,
    "editorBracketHighlight.foreground2": b2,
    "editorBracketHighlight.foreground3": b3,
    "editorBracketHighlight.foreground4": b1,
    "editorBracketHighlight.foreground5": b2,
    "editorBracketHighlight.foreground6": b3,
    "editorBracketHighlight.unexpectedBracket.foreground": red,
  };
}

function themeEditor() {
  return {
    "editorWidget.foreground": colorFG,
    "editorWidget.background": colorBG1,
    "editorWidget.border": colorBorder0,
    "editorWidget.resizeBorder": colorBorder1,
    "editorBracketMatch.background": alpha(colorTre, 15),
    "editorBracketMatch.border": alpha(colorTre, 50),
    "editor.findMatchBackground": alpha(orange, 50),
    "editor.findMatchHighlightBackground": alpha(yellow, 50),
    "editor.findRangeHighlightBackground": alpha(orange, 50),
    "editor.foreground": colorFG,
    "editor.background": colorBG0,
    "editor.foldBackground": transparent,
    "editorLink.activeForeground": colorSubtle,
    "editor.lineHighlightBackground": colorBG1,
    "editor.rangeHighlightBackground": alpha(orange, 10),
    "editor.selectionBackground": alpha(colorTre, 30),
    "editor.inactiveSelectionBackground": alpha(colorTre, 30),
    "editor.wordHighlightBackground": alpha(blue, 25),
    "editor.wordHighlightStrongBackground": alpha(purple, 30),
    "editorOverviewRuler.border": alpha(colorBorder0, 25),
    "editorCursor.foreground": colorTre,
    "editorGroup.border": colorBorder0,
    "editorRuler.foreground": alpha(colorBorder0, 25),
    "editorIndentGuide.background": alpha(colorBorder0, 50),
    "editorIndentGuide.activeBackground": colorBorder0,
    "editorLineNumber.foreground": alpha(colorFG, 30),
    "editorLineNumber.activeForeground": colorFG,
  };
}

function themeTitlebar() {
  return {
    "titleBar.activeBackground": colorBG1,
    "titleBar.activeForeground": colorFG,
    "titleBar.inactiveBackground": colorBG1,
    "titleBar.inactiveForeground": alpha(colorFG, 70),
    "titleBar.border": colorBorder0,
  };
}

function themeTabs() {
  return {
    "tab.border": colorBG1,
    "editorGroupHeader.tabsBorder": colorBorder0,
    "editorGroupHeader.border": colorBorder0,
    "breadcrumb.background": colorBG0,
    "editorGroupHeader.noTabsBackground": colorBG1,
    "editorGroupHeader.tabsBackground": colorBG1,
    "tab.activeBorder": colorBorder1,
    "tab.unfocusedActiveBorder": colorBorder1,
    "tab.activeBorderTop": undefined,
    "tab.unfocusedActiveBorderTop": undefined,
    "tab.activeBackground": colorBG2,
    "tab.activeForeground": colorFG,
    "tab.inactiveBackground": colorBG1,
    "tab.inactiveForeground": alpha(colorFG, 80),
  };
}

function colors() {
  return {
    focusBorder: colorTre,
    "icon.foreground": colorFG,
    "toolbar.hoverBackground": alpha(colorFG, 5),
    "toolbar.activeBackground": alpha(colorFG, 15),
    "widget.shadow": alpha(darken(colorBG1, 5), 50),
    ...themeScrollbar(),
    "input.border": colorBorder1,
    "input.background": colorWidgetBG,
    "input.placeholderForeground": alpha(colorFG, 40),
    "progressBar.background": colorFG,
    "inputOption.activeBorder": colorFG,
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
    foreground: colorFG,
    "panel.background": colorBG0,
    "panel.border": colorBorder0,
    "panelTitle.activeBorder": alpha(colorFG, 50),
    "panelTitle.activeForeground": colorFG,
    "panelTitle.inactiveForeground": alpha(colorFG, 60),
    "peekViewEditor.matchHighlightBackground": alpha(yellow, 50),
    "peekViewResult.matchHighlightBackground": alpha(yellow, 50),
    "sideBar.border": colorBorder0,
    "sideBar.background": colorBG1,
    "sideBarSectionHeader.background": colorBG1,
    "sideBarSectionHeader.border": colorBorder0,
    "tree.indentGuidesStroke": alpha(colorBorder0, 50),
    ...themeTabs(),
    "pickerGroup.border": alpha(colorBorder0, 50),
    ...themeDiff(),
    ...themeGit(),
    ...themeTitlebar(),
    "debugToolBar.background": colorWidgetBG,
    ...themeDropdown(),
    ...themeHighlightBorders(),
    ...themeTerminal(),
  };
}

function themeCommandCenter() {
  return {
    "commandCenter.foreground": colorFG,
    "commandCenter.inactiveForeground": alpha(colorFG, 50),
    "commandCenter.background": colorBG1,
    "commandCenter.border": colorBorder0,
    "commandCenter.inactiveBorder": colorBorder0,
    "commandCenter.activeBackground": colorBG0,
    "commandCenter.activeBorder": colorBorder0,
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
    fontStyle: FontStyle = "normal"
  ): TokenSettingColor {
    return { foreground, fontStyle };
  }

  const tokens = {
    default: createToken(colorFG),
    uno: createToken(colorUno),
    unoBold: createToken(colorUno, "bold"),
    due: createToken(colorDue),
    dueBold: createToken(colorDue, "bold"),
    tre: createToken(colorTre),
    subtle: createToken(colorSubtle),
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
      settings: tokens.uno,
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
        foreground: fixContrast({ fg: red, bg: colorBG0, type: "text" }),
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
        foreground: colorDue,
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
        foreground: colorDue,
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
      settings: tokens.tre,
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
      name: "self",
      scope: "variable.language",
      settings: tokens.uno,
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
      settings: tokens.due,
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
        "variable",
        "meta.definition.variable.name",
        "support.variable",
        "entity.name.variable",
        // placeholders in strings
        "constant.other.placeholder",
      ],
      settings: tokens.due,
    },
    {
      name: "Constants and enums",
      scope: [
        // "variable.other.constant",
        "variable.other.enummember",
      ],
      settings: tokens.default,
    },
    {
      name: "Object keys, TS grammar specific",
      scope: ["meta.object-literal.key"],
      settings: tokens.uno,
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
      settings: tokens.uno,
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

function save(): void {
  printContrastReport();
  const json = JSON.stringify(config(), null, 2);
  fs.writeFileSync("themes/miasma-color-theme.json", json);
}

function printContrastReport() {
  showContrast("text", colorFG, colorBG0, "colorFG", "colorBG0");
  showContrast("text", colorFG, colorBG1, "colorFG", "colorBG1");
  showContrast("text", colorFG, colorBG2, "colorFG", "colorBG2");
  showContrast("ui", colorBorder1, colorBG0, "colorBorder1", "colorBG0");
  showContrast("ui", colorBorder1, colorBG1, "colorBorder1", "colorBG1");
  showContrast("ui", colorBorder1, colorBG2, "colorBorder1", "colorBG2");
  showContrast("text", colorSubtle, colorBG0, "colorSubtle", "colorBG0");
  showContrast("text", colorUno, colorBG0, "colorUno", "colorBG0");
  showContrast("text", colorDue, colorBG0, "colorDue", "colorBG0");
  showContrast("text", colorTre, colorBG0, "colorTre", "colorBG0");
  for (const [name, color] of Object.entries(themeTerminal())) {
    if (
      name === "terminal.background" ||
      name === "terminal.ansiBlack" ||
      name === "terminal.ansiBrightBlack"
    ) {
      continue;
    }
    showContrast("text", color, colorBG0, name, "colorBG0");
  }
  // TODO: Check contrast of terminal colors
  // TODO: Check contrast of token colors
  for (const token of config().tokenColors) {
    if ("foreground" in token.settings) {
      const scope =
        typeof token.scope === "string" ? token.scope : token.scope.join(" ");
      showContrast(
        "text",
        token.settings.foreground,
        colorBG0,
        scope,
        "colorBG0"
      );
    }
  }
  const brackets = themeBracketColors();
  showContrast(
    "text",
    brackets["editorBracketHighlight.foreground1"],
    colorBG0,
    "editorBracketHighlight.foreground1",
    "colorBG0"
  );
  showContrast(
    "text",
    brackets["editorBracketHighlight.foreground2"],
    colorBG0,
    "editorBracketHighlight.foreground2",
    "colorBG0"
  );
  showContrast(
    "text",
    brackets["editorBracketHighlight.foreground3"],
    colorBG0,
    "editorBracketHighlight.foreground3",
    "colorBG0"
  );
}

save();
