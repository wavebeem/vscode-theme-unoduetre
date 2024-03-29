# v5.11.1

- Fixed incorrect highlighting for Swift class bodies

# v5.11.0

- Added support for patch/diff files

# v5.10.0

- More subtle styling of the command center

# v5.9.0

- Fixed issue with sidebar selected items not being highlighted
- Changed statusbar to match general UI color

# v5.8.2

- Fixed some missing syntax rules for Python (dict, list, tuple)
- Fixed a missing syntax rule for generator asterisks in JS

# v5.8.1

- Fix bug where Markdown links were using the same color as comments

# v5.8.0

- Highlight shell builtins since shell script doesn't get very colorful

# v5.7.0

- Improve CSS styles a bit with more color variation
- Improve shell styles a bit too

# v5.6.0

- Correctly mark more items as punctuation for syntax highlighting

# v5.5.0

- Improved colors for HTML/JSX tags

# v5.4.0

- Fix Miasma widget background
- Changed editor completion background for contrast
- Changed notifications background for contrast
  h

# v5.3.0

- Added new theme: Miasma

# v5.2.0

- Reverted menu changes because they're even worse
- Fixed some of the wrong colors due to high contrast menu items

# v5.1.0

- Improved menu styles (for Windows)
- Improved styles for keyboard shortcut previews
- Subtler selection state for menus since VS Code forces bad foreground color choices completely ruining readability... sigh

# v5.0.1

- Fixed an issue where hover styles weren't showing for the quick picker

# v5.0.0

- Simplified syntax highlighting and tweaked colors slightly for contrast
- Reworked UI theme to be more understated and consistent

# v4.1.0

- Add borders to sidebar section headers
- Remove shadow from tab bar

# v4.0.2

- Update README images to stay up to date automatically

# v4.0.1

- Failed to publish because SVGs aren't allowed in

# v4.0.0

- Adds more colors to the UI
  - Especially noticeable for light themes, which feel more colorful now
- Improve contrast for buttons and selected list items
- The status bar is now dark, even for light themes
- Changed the tab bar and breadcrumbs bar a lot
- Changed some colors in the Bubble Gum and Periwinkle themes

# v3.22.1

- Last deployment was botched

# v3.22.0

- Tweaked shadows and borders a bit

# v3.21.5

- Fixes color issues in lists and popup menus

# v3.21.4

- Security updates

# v3.21.3

- No changes, re-publishing due to an extension publishing bug

# v3.21.2

- Fixes a bug where the list item foreground color is now assumed to be white,
  regardless of background color, for active selection items, causing unreadable
  text for light themes

# v3.21.1

- Fixes list background to match new theme format

# v3.21.0

- Slightly decreases secondary UI border contrast
- Adds additional UI borders, such as between sidebar views

# v3.20.0

- Workbench tree indent guides are the correct color now

# v3.19.0

- The Light and Dark themes have more standard terminal color palettes now

# v3.18.0

- More automatic contrast fixes

# v3.17.0

- Light theme code comments are a little easier to differentiate from plain text
  now

# v3.16.0

- Nature theme had become very dull and boring looking after the accessibility
  update, so I changed the hues around a bit; hopefully it's still thematically
  appropriate and fun

# v3.15.2

- Fixes transparent colors very slightly

# v3.15.1

- Fixed overcorrected contrast

# v3.15.0

- Ensures WCAG AA small contrast compliance on text for better accessibility

# v3.14.0

- Better activity sidebar and tab colors

# v3.13.0

- No more dark status bars, back to just the regular theme colors

# v3.12.0

- Back to dark border on light theme status bars

# v3.11.0

- Darkens backgrounds on light themes
- Raises contrast on all borders
- Light border on light theme status borders

# v3.10.0

- Changes the colors for the Nature theme to be much more blue tinted

# v3.9.4

- Fixes bug where "errored" files in the sidebar had the wrong color

# v3.9.0

- Back to a dark status bar to avoid theme clashes

# v3.8.0

- More subtle shadows
- Better tab bar theming (adds borders, uses bottom border)

# v3.7.0

- Better support for Go, C++, C#, Haskell, Rust
- Adds new "Sprinkles" theme
- Switch line highlight BG to use text color instead of accent color since it
  made diff views hard to understand when the accent color is green
- Tweaks and rearranges some colors in Periwinkle
- Stop tinting the "white" color in the terminal themes since it affects
  readability on colored backgrounds
- Inactive activity bar icons are now much lighter

# v3.6.0

- Adds an active indent guide color

# v3.5.1

- Updates package description
- Removes custom extension background color for Visual Studio Marketplace

# v3.5.0

- New extension icon

# v3.4.0

- More legible shadows on dark themes
- Adds new theme Periwinkle

# v3.3.0

- Buttons and drag and drop effects now match the theme accent color

# v3.2.0

- Hides the scrollbar border
- More prominent status bar hover colors
- Fixes badge colors for search results counts
- Removes red tint from UI text for default theme
- Stop making the bottom panel a different color
- Softened some border colors
- Increase theme contrast slightly

# v3.1.0

- Improves Markdown highlighting

# v3.0.0

- Adds new themes (Bubble Gum, Midnight, Ocean, Nature)
- Many many fixes to highlighting where things were being highlighted in special
  colors when they shouldn't have been, and more

# v2.0.1

- Adds theme icon

# v2.0.0

- Adds dark version
- Minimal tweaks to light version

# v1.4.0

- Workbench theme overhaul

# v1.3.0

- Adds terminal colors

# v1.2.0

- Adds workbench colors
