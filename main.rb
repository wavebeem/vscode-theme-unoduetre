#!/usr/bin/env ruby
require "json"
require "color"

module Theme
  extend self

  def hsl(h, s, l)
    Color::HSL.new(h, s, l).html
  end

  def ramp(hue)
    [
      hsl(hue, 95, 35),
      hsl(hue, 75, 45),
      hsl(hue, 55, 55),
      hsl(hue, 35, 65),
      hsl(hue, 25, 70),
    ]
  end

  UNO = 320 # purple
  DUE = 215 # blue
  TRE = 125 # green

  UNO_1,
  UNO_2,
  UNO_3,
  UNO_4,
  UNO_5, = ramp(UNO)

  DUE_1,
  DUE_2,
  DUE_3, = ramp(DUE)

  TRE_1, = ramp(TRE)

  YELLOW = "#f1c40f"
  ORANGE = "#e67e22"
  BLUE = "#3498db"
  PURPLE = "#9b59b6"
  WHITE = "#ffffff"
  BLACK = "#000000"
  RED = "#cc0000"
  TRANSPARENT = "#00000000"
  NO_ = "#ff00ff"

  T_BLACK = "#5c668e"
  T_RED = "#a91b1c"
  T_GREEN = "#00a337"
  T_YELLOW = "#cc8410"
  T_BLUE = "#39b898"
  T_MAGENTA = "#d95278"
  T_CYAN = "#7f9608"
  T_WHITE = "#fafafa"

  UI_FG = "#222222"
  FG = hsl(UNO, 20, 20)
  BG = WHITE

  FILE_NAME = "uno-due-tre"

  def dilute(color, percent)
    scaled = 255 * (percent / 100.0)
    alpha = format("%02x", scaled)
    "#{color}#{alpha}"
  end

  def config
    {
      type: "light",
      colors: colors,
      tokenColors: token_colors
    }
  end

  def colors
    {
      "activityBar.background": "#e8e8e8",
      "activityBar.foreground": UI_FG,
      "editor.background": WHITE,
      "editor.findMatchBackground": dilute(ORANGE, 50),
      "editor.findMatchHighlightBackground": dilute(YELLOW, 50),
      "editor.foreground": "#3d2936",
      "editor.inactiveSelectionBackground": dilute(YELLOW, 25),
      "editor.lineHighlightBackground": dilute(YELLOW, 10),
      "editor.rangeHighlightBackground": dilute(ORANGE, 10),
      "editor.selectionBackground": dilute(YELLOW, 30),
      "editor.wordHighlightBackground": dilute(BLUE, 15),
      "editor.wordHighlightStrongBackground": dilute(PURPLE, 20),
      "editorCursor.foreground": BLACK,
      "editorGroupHeader.tabsBackground": WHITE,
      "editorIndentGuide.background": dilute(BLACK, 15),
      "editorLineNumber.foreground": "#cccccc",
      "foreground": UI_FG,
      "notification.background": UI_FG,
      "notification.foreground": WHITE,
      "panel.background": WHITE,
      "panel.border": "#dddddd",
      "panelTitle.activeBorder": "#888888",
      "panelTitle.activeForeground": BLACK,
      "panelTitle.inactiveForeground": "#666666",
      "peekViewEditor.matchHighlightBackground": dilute(YELLOW, 50),
      "peekViewResult.matchHighlightBackground": dilute(YELLOW, 50),
      "sideBar.background": "#f4f4f4",
      "sideBarSectionHeader.background": "#e0e0e0",
      "tab.activeBackground": "#cccedb",
      "tab.activeForeground": BLACK,
      "tab.border": TRANSPARENT,
      "tab.inactiveBackground": TRANSPARENT,
      "tab.inactiveForeground": "#666666",
      "titleBar.activeBackground": WHITE,
      "titleBar.activeForeground": BLACK,
      "titleBar.inactiveBackground": WHITE,
      "titleBar.inactiveForeground": "#888888",
      "widget.shadow": "#00000066",
      "terminal.foreground": UI_FG,
      "terminal.background": WHITE,
      "terminal.ansiBlack": T_BLACK,
      "terminal.ansiBlue": T_BLUE,
      "terminal.ansiBrightBlack": T_BLACK,
      "terminal.ansiBrightBlue": T_BLUE,
      "terminal.ansiBrightCyan": T_CYAN,
      "terminal.ansiBrightGreen": T_GREEN,
      "terminal.ansiBrightMagenta": T_MAGENTA,
      "terminal.ansiBrightRed": T_RED,
      "terminal.ansiBrightWhite": T_WHITE,
      "terminal.ansiBrightYellow": T_YELLOW,
      "terminal.ansiCyan": T_CYAN,
      "terminal.ansiGreen": T_GREEN,
      "terminal.ansiMagenta": T_MAGENTA,
      "terminal.ansiRed": T_RED,
      "terminal.ansiWhite": T_WHITE,
      "terminal.ansiYellow": T_YELLOW,
    }
  end

  def token_colors
    scopes.map{|name, scope|
      scope = scope.join(", ") if scope.is_a?(Array)
      settings = named_scope_to_settings(name)
      if settings
        {
          name: name,
          scope: scope,
          settings: named_scope_to_settings(name)
        }
      else
        nil
      end
    }.compact
  end

  def style(color, *font_style)
    {
      foreground: color,
      fontStyle: font_style.join(" "),
    }
  end

  def scopes
    [
      ["Parameter", [
        "variable.parameter.function"
      ]],
      ["Comments", [
        "comment",
        "punctuation.definition.comment"
      ]],
      ["Punctuation", [
        "punctuation.definition.string",
        "punctuation.definition.variable",
        "punctuation.definition.string",
        "punctuation.definition.parameters",
        "punctuation.definition.string",
        "punctuation.definition.array",
        "punctuation.terminator"
      ]],
      ["Delimiters", [
        "punctuation.separator",
        "punctuation.section",
        "meta.brace",
        "meta.delimiter"
      ]],
      ["Operators", [
        "keyword.operator"
      ]],
      ["Keywords", [
        "keyword.control"
      ]],
      ["Variables", [
        "variable.declaration",
        "variable.parameter",
        "variable.other"
      ]],
      ["Search", [
        "entity.name.filename.find-in-files"
      ]],
      ["Search Line", [
        "constant.numeric.line-number.match.find-in-files"
      ]],
      ["Functions", [
        "entity.name.function",
        "meta.require",
        "support.function.any-method"
      ]],
      ["Classes", [
        "support.class",
        "entity.name.class",
        "entity.name.type.class",
        "entity.name.type.module",
        "entity.other.inherited-class",
      ]],
      ["Methods", [
        "keyword.other.special-method"
      ]],
      ["Storage", [
        "storage"
      ]],
      ["Support", [
        "support"
      ]],
      ["Strings", [
        "string",
        "punctuation.definition.string",
        "support.constant.property-value"
      ]],
      ["Numbers", [
        "constant.numeric"
      ]],
      ["Symbols", [
        "constant.other.symbol"
      ]],
      ["Boolean", [
        "constant.language.boolean"
      ]],
      ["Constants", [
        "constant",
        "support.constant",
        "variable.language"
      ]],
      ["Tags", [
        "entity.name.tag",
        "punctuation.definition.tag"
      ]],
      ["Attributes", "entity.other.attribute-name"],
      ["Attribute IDs", [
        "entity.other.attribute-name.id",
        "punctuation.definition.entity"
      ]],
      ["Selector", [
        "meta.selector",
        "meta.object-literal.key"
      ]],
      ["Headings", [
        "markup.heading punctuation.definition.heading",
        "entity.name.section"
      ]],
      ["Units", [
        "keyword.other.unit"
      ]],
      ["Bold", [
        "markup.bold",
        "punctuation.definition.bold"
      ]],
      ["Italic", [
        "markup.italic",
        "punctuation.definition.italic"
      ]],
      ["Code", [
        "markup.raw.inline"
      ]],
      ["Link Text", [
        "string.other.link"
      ]],
      ["Link Url", [
        "meta.link"
      ]],
      ["Lists", [
        "markup.list"
      ]],
      ["Quotes", [
        "markup.quote"
      ]],
      ["Separator", [
        "meta.separator"
      ]],
      ["Inserted", [
        "markup.inserted"
      ]],
      ["Deleted", [
        "markup.deleted"
      ]],
      ["Changed", [
        "markup.changed"
      ]],
      ["Colors", [
        "constant.other.color"
      ]],
      ["Regular Expressions", [
        "string.regexp"
      ]],
      ["Escape Characters", [
        "constant.character.escape",
      ]],
      ["Embedded", [
        "punctuation.section.embedded",
        "variable.interpolation"
      ]],
      ["Illegal", [
        "invalid",
        "invalid.illegal"
      ]],
      ["Broken", [
        "invalid.broken"
      ]],
      ["Deprecated", [
        "invalid.deprecated"
      ]],
      ["Unimplemented", [
        "invalid.unimplemented"
      ]],
    ]
  end

  @_settings = {
    "Call" => style(UNO_2),
    "Parameter" => style(DUE_3),
    "Comments" => style(UNO_5),
    "Punctuation" => style(UNO_4),
    "Delimiters" => style(UNO_5),
    "Operators" => style(UNO_3),
    "Search" => style(UNO_2, "bold"),
    "Search Line" => style(DUE_1, "bold"),
    "Keywords" => style(UNO_1, "bold"),
    "Variables" => style(DUE_3),
    "Functions" => style(DUE_2, "bold"),
    "Classes" => style(DUE_2, "bold"),
    "Methods" => style(DUE_2),
    "Storage" => style(UNO_1, "bold"),
    "Strings" => style(TRE_1),
    "Symbols" => style(DUE_1),
    "Numbers" => style(DUE_1),
    "Boolean" => style(DUE_1),
    "Constants" => style(DUE_1),
    "Support" => style(UNO_2),
    "Tags" => style(DUE_1),
    "Attributes" => style(DUE_1),
    "Attribute IDs" => style(DUE_1),
    "Selector" => style(UNO_2),
    "Headings" => style(DUE_1, "bold"),
    "Units" => style(DUE_3),
    "Bold" => style(UNO_2, "bold"),
    "Italic" => style(UNO_2, "italic"),
    "Code" => style(UNO_3),
    "Link Text" => style(UNO_4, "bold"),
    "Link Url" => style(DUE_1),
    "Lists" => style(DUE_3),
    "Quotes" => style(UNO_4),
    "Separator" => style(UNO_4),
    "Inserted" => style(DUE_2),
    "Deleted" => style(RED),
    "Changed" => style(UNO_4),
    "Colors" => style(DUE_3),
    "Regular Expressions" => style(UNO_3),
    "Escape Characters" => style(UNO_3),
    "Embedded" => style(UNO_2),
    "Broken" => style(RED, "bold"),
    "Deprecated" => style(RED, "bold"),
    "Unimplemented" => style(RED, "bold"),
    "Illegal" => style(RED, "bold"),
  }

  def named_scope_to_settings(name)
    @_settings[name]
  end

  def build
    json = JSON.pretty_generate(config)
    puts "Saving theme! (#{Time.now})"
    File.write("themes/#{FILE_NAME}.json", json)
  end
end

Theme.build
