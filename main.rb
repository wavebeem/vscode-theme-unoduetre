#!/usr/bin/env ruby
require "nokogiri"
require "color"

module Theme
  extend self

  def hsl(h, s, l)
    Color::HSL.new(h, s, l).html
  end

  def rotate(hue, delta)
    (hue + delta) + 360 % 360
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

  UNO = 310 # purple
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

  WHITE = "#ffffff"
  BLACK = "#000000"
  RED = "#cc0000"
  NO_ = "#ff00ff"

  FG = hsl(UNO, 20, 20)
  BG = WHITE

  THEME_NAME = "Uno Due Tre"
  FILE_NAME = "uno-due-tre"

  def dilute(color, percent)
    scaled = 255 * (percent / 100.0)
    alpha = format("%02x", scaled)
    "#{color}#{alpha}"
  end

  def plistify(xml, data)
    case [data.class]
    when [Hash]
      plistify_dict(xml, data)
    when [Array]
      plistify_array(xml, data)
    when [Fixnum], [String], [Symbol]
      plistify_string(xml, data)
    else
      fail
    end
  end

  def plistify_array(xml, list)
    xml.array {
      list.each {|x|
        plistify(xml, x)
      }
    }
  end

  def plistify_dict(xml, hash)
    xml.dict {
      hash.each {|k, v|
        xml.key(k)
        plistify(xml, v)
      }
    }
  end

  def plistify_string(xml, str)
    xml.string(str.to_s)
  end

  def config
    {
      author: "Brian Mock <brian@mockbrian.com>",
      name: "#{THEME_NAME}",
      colorSpaceName: "sRGB",
      comment: "https://github.com/wavebeem/vscode-theme-unoduetre",
      uuid: "d84a7e4e-3de9-4a5a-a2ef-db9169168f62",
      settings: [{settings: settings}, *scopes],
    }
  end

  def settings
    {
      background: BG,
      divider: UNO_4,
      foreground: FG,
      invisible: dilute(UNO_5, 10),
      caret: BLACK,
      # lineHighlight: dilute(UNO_4, 15),
      selection: dilute(FG, 20),
      guide: dilute(FG, 10),
    }
  end

  def scopes
    scopes = [
      ["Parameter", "variable.parameter.function"],
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
      ["Operators", "keyword.operator"],
      ["Keywords", "keyword.control"],
      ["Variables", [
        "variable.declaration",
        "variable.parameter",
        "variable.other"
      ]],
      ["Search", "entity.name.filename.find-in-files"],
      ["Search Line", "constant.numeric.line-number.match.find-in-files"],
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
      ["Methods", "keyword.other.special-method"],
      ["Storage", "storage"],
      ["Support", "support"],
      ["Strings", [
        "string",
        "punctuation.definition.string",
        "support.constant.property-value"
      ]],
      ["Numbers", "constant.numeric"],
      ["Symbols", "constant.other.symbol"],
      ["Boolean", "constant.language.boolean"],
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
      ["Units", "keyword.other.unit"],
      ["Bold", [
        "markup.bold",
        "punctuation.definition.bold"
      ]],
      ["Italic", [
        "markup.italic",
        "punctuation.definition.italic"
      ]],
      ["Code", "markup.raw.inline"],
      ["Link Text", "string.other.link"],
      ["Link Url", "meta.link"],
      ["Lists", "markup.list"],
      ["Quotes", "markup.quote"],
      ["Separator", "meta.separator"],
      ["Inserted", "markup.inserted"],
      ["Deleted", "markup.deleted"],
      ["Changed", "markup.changed"],
      ["Colors", "constant.other.color"],
      ["Regular Expressions", "string.regexp"],
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
      ["Broken", "invalid.broken"],
      ["Deprecated", "invalid.deprecated"],
      ["Unimplemented", "invalid.unimplemented"],
    ]
    scopes.map {|name, scope|
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
end

doc = Nokogiri::XML::Builder.new(encoding: "UTF-8") do |xml|
  xml.doc.create_internal_subset(
    "plist",
    "-//Apple//DTD PLIST 1.0//EN",
    "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
  )
  xml.plist { Theme.plistify(xml, Theme.config) }
end
xml = doc.to_xml

puts "Saving theme!"
File.write("themes/#{Theme::FILE_NAME}.tmTheme", xml)
