# Geany for front-end developer

## Introduction

[Geany](http://geany.org) is a lightweight & fast IDE that is based on Scintilla source code editing component and uses GTK2 toolkit for GUI. Geany can run on Linux, Windows & Mac OS.

By default, Geany has some basic code highlighting for JavaScript & other front-end languages (quite comparable with the acclaimed SublimeText 2) but it leaves a lot of room for improvement via user-defined configuration files.

This package is a collection of configuration files to enhance Geany's source code highlighting and autocompletion for HTML/CSS/JavaScript, languages of front-end developers. (ActionScript is to be considered later).

## Installing latest Geany build

These config files were tested with the dev build of Geany, version 1.22. Although they may also work for latest stable build 0.21.

Binary builds for latest Geany in Linux & Windows can be found [here](http://nightly.geany.org).

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

- **snippets.conf**: The javascript section of this file has been modified so that braces are inserted and alignments are made according to common Javascript convention.

### How To:

To insert snippets into code editor, type the snippet keywords and press Tab. (For current Geany, no hinting popup will be displayed).

Supported snippets in this package:
`if`, `else`, `for`, `forin`, `while`, `do`, `switch`, `try`, `function` (NEW), `copyright` (NEW), 
`author` (NEW). 

Please edit your 'author' name and 'copyright' at [Default] section in snippet.conf. If you use install.sh, it will prompt you to enter text for those snippets.

## 2. Keywords Highlighting

Language specific syntax highlighting are defined in filetype definition files in **filedefs** folder. For detailed guide on filetype definitions, refer to [this section](http://www.geany.org/manual/current/index.html#filetype-definition-files) of the manual.

### The files:

- **filedefs/filetypes.css**: This file lets Geany highlight latest CSS keywords properly. It contains up-to-date standard CSS1/2/3 as well as browser specific keywords. Besides, minor coloring rules have been patched to make CSS3 & prefixed keywords distinct from CSS1/2 ones.  
    ![Better CSS highlighting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/css-highlighting.png)

    Source of reference: [meiert.com](http://meiert.com/en/indices/css-properties/)

## 3. Code Hinting

Geany provide some dynamic context code hinting from opened files in the session. Besides, Geany allows users to create predefined global tag files that assist code hint and completion of symbols (e.g. function names, CSS properties...) for targeted file types. Global tag files are placed in  **geany/tags** folder and preloaded when Geany is started.

To learn more about Geany's tags, refer to [this section](http://www.geany.org/manual/current/index.html#tags) of the mannual.

### The files:

- **tags/std.css.tags**: As the name implied, this tag file enables code hinting for standard CSS (including CSS3) property names.
- **tags/prefixed.css.tags**: Code hinting for browser specific CSS property names.
- **tags/std.js.tags**: Code hinting for standard Javascript API. [incompleted]
- **tags/dom.js.tags**: Code hinting for Browser and DOM objects Javascript. [incompleted]
- **tags/styles.js.tags**: This file supplement JS property names of CSSStyleDeclaration object which are directly converted from the stadard CSS property names.
- **tags/mootools-core.js.tags**: (Extra) Code hinting for JS Mootools 1.4 framework

Source of references: [MDN](https://developer.mozilla.org/en/JavaScript/Reference), [JavaScript Kit](http://www.javascriptkit.com/jsref/), [Mootools Doc](http://mootools.net/docs/core)

### How To:

- Type at least 1 character and press Ctrl-Space to display the auto-completion popup. OR type in the first 4 characters of the keyword. (These number of characters can be changed in preference). 
- While the auto-completion popup appear, you can: 
  - press Up/Down to select a keyword; 
  - press Enter to complete the whole keyword;
  - press Tab to complete a word portion 
  - press press escape to close the pop  
    ![JS code hinting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/js-code-hinting.png)
- For function keywords, there is function parameters hint box to be displayed as soon as you type in function call bracket "(".
- You can call this parameters hint box by pressing Ctrl-Shift-Space while the cursor is within brackets.
- If a function keyword has duplicated entries, the hinting box will be shown with arrow button to select.  
  ![JS function parameter hinting](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/js-function-hinting.png)

## 4. Additional settings for ease of use

### Additional color schemes:
Visit [this github project](https://github.com/codebrainz/geany-themes) to download more color schemes for Geany 1.22+.  
I'm using the "Dark" color scheme from above theme sets to make the screenshots.

### Additional plugins:
I recommend you to enable these plugins in from the plugin manager (menu Tools > Plugin Manager):

- XML Snippets ([info](http://plugins.geany.org/xmlsnippets.html))
- HTML Characters (built-in)
- Tree Browser ([info](http://plugins.geany.org/treebrowser.html))
- Geany Lipsum ([info](http://plugins.geany.org/geanylipsum.html))

And [other plugins](http://plugins.geany.org) that you may find useful to yourself.

### Recommended preferences:
Go to Preferences of Geany (shortcut Ctrl-Alt-P), do:

- Editor > Completions > Character to type...: 2
- Editor > Completions > Auto close brackets: select all except '' (or your choice)
- Editor > Completions > Auto complete all words
- Editor > Features > Comment toggle marker: clear the text box

![Editor completion preferences](https://github.com/trongthanh/geany-for-front-end-dev/raw/master/ref/img/editor-completion-preferences.png)

You may also want to change these key binding to make Geany behave similarly to SublimeText or Webstorm

- Key Bindings > Format > Toggle line commentation: &lt;Primary&gt;slash
- Key Bindings > Editor > Move line(s) up: &lt;Primary&gt;&lt;Shift&gt;Up
- Key Bindings > Editor > Move line(s) down: &lt;Primary&gt;&lt;Shift&gt;Down

> Note: **&lt;Primary&gt;** is actually Ctrl on Linux/Windows

-----------------------------------

# Creator's Guide

My patching files generally comply to the [Geany mannual](http://www.geany.org/manual/current/index.html) except some tweaks in the tags files.

## Tags file

As explained in the mannual, each entry of the tag file:

> ```shell
> basename|string|(string path [, string suffix])|
> ```
> The first field is the tag name (usually a function name).  
> The second field is the type of the return value.  
> The third field is the argument list for this tag.  
> The fourth field is the description for this tag but currently unused and should be left empty.

I have come up with my own convention (or tweak) to show extra info of the JS functions:

```shell
function_name | [(library_name)] [[static]] [attached_symbol.] | ([param1[: Type1][, ..., paramN[: TypeN]]])[: Return_Type] |
```
Basically, the first field is still the property or function name.  
The second field comprises of: name of the library (e.g. Mootools), static or not, and lastly, the Class that function is attached to.  
The third field contains optional parameters with/without type and the function returned type. The ": Type" notation is borrowed from ActionScript. If you leave this field empty, the symbol is considered property, not function, and it has different color in the hinting list.

For example:

```
slice|Array.|(begin: number[, end: number]): Array|
```

The hint popup will show like this:

<table>
  <tr>
    <td>Array. slice (begin: number[, end: number]): Array</td>
  </tr>
</table>

And `setProperty|(Mootools 1.4) Element.|(name, value)|` will be output as:

<table>
  <tr>
    <td>(Mootools 1.4) Element. setProperty (name, value)</td>
  </tr>
</table>

That is the best notation format I can think of for the function hint with current limitations of Geany. For property names, there's no way to show extra info of them exept the name.

When Geany is improved and can handle tags better, I will revise and adapt this convention.