# Geany for front-end developer

## Introduction

[Geany](http://geany.org) is a lightweight & fast IDE that is based on Scintilla source code editing component and uses GTK2 toolkit for GUI. Geany can run on Linux, Windows & Mac OS.

By default, Geany has some basic code highlighting for JavaScript & other front-end languages (quite comparable with the acclaimed SublimeText 2) but it leaves a lot of room for improvement via user-defined configuration files.

This package is a collection of configuration files to enhance Geany's source code highlighting and autocompletion for HTML/CSS/JavaScript, languages of front-end developers. (ActionScript is to be considered later).

## Installing latest Geany build

These config files were tested with the latest version of Geany, 1.22.

Binary builds for latest Geany in Linux & Windows can be found [here](http://www.geany.org/Download/Releases).

## How to install these supplement files

- Copy the files in 'config/geany' folder to equivalent Geany's user config folder.
- On Linux, the Geany's user config folder is at **/home/username/.config/geany**
    - I have written an **install.sh** script to conveniently install the files on Linux:

        Open terminal and cd to the source of this project. Then

        ```shell
        chmod +x install.sh
        ./install.sh
        ```
- For other OS, refer to [this manual](http://www.geany.org/manual/current/index.html#configuration-file-paths) to identify user's config folder.

-----------------------------------

# The Enhancement

## 1. Snippets

With snippets, you can complete a whole block of code from short string like `if` or `for`. More on Geany's snippets configuration file at [this link](http://www.geany.org/manual/current/index.html#user-definable-snippets).

### The file:

- **snippets.conf**: The javascript section of this file has been modified so that braces are inserted and alignments are made according to common Javascript conventions. In addition, a few commonly used snippets are added. ([See snippets.conf](https://github.com/trongthanh/geany-for-front-end-dev/blob/master/config/geany/snippets.conf) for available entries.) I'm considering adding more snippets for HTML and CSS as well.

### How To:

To insert snippets into code editor, type the snippet keywords and press **Tab**. (For current Geany, no hinting popup will be displayed).

For best use of snippets, you should set the keybinding "Move cursor in snippet" in Preference. Suggestion: &lt;Primary&gt;bracketright "]"

Some snippets (for e.g. `header`) make use of the Template items in Preferences (developer name, year...), so it is advised that you fill them up with your details.

## 2. Keywords Highlighting

Language specific syntax highlighting are defined in filetype definition files in **filedefs** folder. For detailed guide on filetype definitions, refer to [this section](http://www.geany.org/manual/current/index.html#filetype-definition-files) of the manual.

### The files:

- **filedefs/filetypes.css**: This file lets Geany highlight latest CSS keywords properly. It contains up-to-date standard CSS1/2/3 as well as browser specific keywords. Besides, minor coloring rules have been patched to make CSS3 & prefixed keywords distinct from CSS1/2 ones.
    ![Better CSS highlighting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/css-highlighting.png)

    Source of reference: [CSS properties](http://meiert.com/en/indices/css-properties/)

- **filedefs/filetypes.html**: This file justify coloring of HTML tags.
- **filedefs/filetypes.javascript**: This file justify coloring of JavaScript keywords. **[NEW]** I have hacked it to use ActionScript lexer to achieve more variety in the keywords coloring and enhance the syntax highlighting.
- **filedefs/filetypes.common**: [Experiment] Removing dash (-) and sollar sign ($) from whispace characters. So in some filetype definitions, if adding those charaters to wordchars property, it will be treated as part of word. For e.g. you can now double click to select whole string like "background-color" in CSS.

## 3. Code Hinting

Geany provide some dynamic context code hinting from opened files in the session. Besides, Geany allows users to create predefined global tag files that assist code hint and completion of symbols (e.g. function names, CSS properties...) for targeted file types. Global tag files are placed in  **geany/tags** folder and preloaded when Geany is started.

To learn more about Geany's tags, refer to [this section](http://www.geany.org/manual/current/index.html#tags) of the mannual.

### The files:

- **tags/std.css.tags**: As the name implied, this tag file enables code hinting for standard CSS (including CSS3) property names.
- **tags/prefixed.css.tags**: Code hinting for browser specific CSS property names.
- **tags/std.js.tags**: Code hinting for standard Javascript API. [incompleted]
- **tags/browser.js.tags**: Code hinting for Browser and DOM objects Javascript (with latest HTML5 specs). (renamed from dom.js.tags)
- **tags/styles.js.tags**: This file supplement JS property names of CSSStyleDeclaration object which are directly converted from the stadard CSS property names.
- **tags/mootools-core.js.tags**: (Optional) Code hinting for JS Mootools 1.4 framework
- **tags/jquery.js.tags**: (Optional) Code hinting for jQuery 1.7 framework

Source of references: [MDN](https://developer.mozilla.org/en/JavaScript/Reference), [JavaScript Kit](http://www.javascriptkit.com/jsref/), [Mootools Doc](http://mootools.net/docs/core), [jQuery API](http://api.jquery.com/)

### How To:

- Type at least 1 character and press Ctrl-Space to display the auto-completion popup. OR type in the first 4 characters of the keyword. (These number of characters can be changed in preference).
- While the auto-completion popup appear, you can:
  - press Up/Down to select a keyword;
  - press Enter to complete the whole keyword;
  - press Tab to complete a word portion
  - press Escape to close the popup
    ![JS code hinting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/js-code-hinting.png)
- For function keywords, there is function parameters hint box to be displayed as soon as you type in function call bracket "(".
- You can call this parameters hint box by pressing Ctrl-Shift-Space while the cursor is within brackets.
- If a function keyword has duplicated entries, the hinting box will be shown with arrow button to select.
  ![JS function parameter hinting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/js-function-hinting.png)

## 4. Additional settings for ease of use

### Additional color schemes:
Visit [this github project](https://github.com/codebrainz/geany-themes) to download more color schemes for Geany 1.22+.

Besides, I have adapted my favorite color scheme - Monokai - to Geany and committed to the bundle. You can find it in the config/geany/colorschemes folder. Here's a [sample screenshot](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/monokai-colorscheme.png)

### Additional plugins:
I recommend you to enable these plugins in from the plugin manager (menu Tools > Plugin Manager):

- Addons ([info](http://plugins.geany.org/addons.html)) - possible useful features: tasks list, mark word occurences, bookmark lines, enclose selection
- XML Snippets ([info](http://plugins.geany.org/xmlsnippets.html))
- HTML Characters (built-in)
- Tree Browser ([info](http://plugins.geany.org/treebrowser.html)
Note: Remember to access the plugin settings to change its "External open command" to the file explorer of your OS (Nautilus/Finder/Explorer...)
- Geany Lipsum ([info](http://plugins.geany.org/geanylipsum.html))

And [other plugins](http://plugins.geany.org) that you may find useful to yourself.

### Recommended preferences:
Go to Preferences of Geany (shortcut Ctrl-Alt-P), do:

- Editor > Completions > Character to type...: 2
- Editor > Completions > Auto close brackets: select all except '' (or your choice)
- Editor > Completions > Auto complete all words
- Editor > Features > Comment toggle marker: clear the text box

![Editor completion preferences](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/editor-completion-preferences.png)

You may also want to change these key bindings to make Geany behave similarly to other popular editors: Key Bindings >

- File > Save as: &lt;Primary&gt;&lt;Shift&gt;s
- File > Save all: &lt;Primary&gt;&lt;Alt&gt;s
- Format > Toggle line commentation: &lt;Primary&gt;slash
- Editor > Delete Current Line(s): &lt;Primary&gt;&lt;Shift&gt;k
- Editor > Transpose Current Line(s): &lt;Primary&gt;t
- Editor > Move line(s) up: &lt;Primary&gt;&lt;Shift&gt;Up
- Editor > Move line(s) down: &lt;Primary&gt;&lt;Shift&gt;Down
- Search > Find Next: F3
- Search > Find Previous: &lt;Shift&gt;F3
- Go to > Go to Line: &lt;Primary&gt;g

> Note: **&lt;Primary&gt;** is actually Ctrl on Linux/Windows

More key bindings from my own settings is in the file `keybindings.conf`. (Copy it to your Geany's user folder)

### Using [JSHint](http://www.jshint.com) with Geany:
- Visit this [Wiki page](https://github.com/trongthanh/geany-for-front-end-dev/wiki/Using-JSHint-with-Geany).

-----------------------------------

# Contribution
If you'd like to help adding more tags file, snippets and enhancement to this bundle, feel free to fork and send me pull request.
For adding tags files, please read my [creator's guide](https://github.com/trongthanh/geany-for-front-end-dev/wiki/Creator's-Guide) first.
