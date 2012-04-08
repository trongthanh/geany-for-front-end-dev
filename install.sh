#!/bin/sh

#DEFINE VARIABLES AND CONSTANTS
base_dir="./config/geany"
g_config_dir="$HOME/.config/geany"


copy_config_file() 
{
  _f_or_i=$1
  _file=$2
  _path="$base_dir/$_file"

  if [ -f $_path ]; then
    #copy file over user's config folder
    cp -rv $_f_or_i $_path "$g_config_dir/$_file"
  else
    echo "The file $_path not found"
  fi
}

#copy mode
m=-i

echo -n "Do you want to copy all files without asking? (y/n) "
read force_write;

if [ $force_write = "y" ]
then
  m=-f
fi

#Common

echo "\nCopying: snippets (with conventional js alignment)"
copy_config_file $m "snippets.conf"

#CSS
echo "\n-------------------- CSS --------------------"
##CSS highlighting
echo "\nCopying: latest css properties highlighting"
copy_config_file $m "filedefs/filetypes.css"
##standard css tags (with CSS3)
echo "\nCopying: standard css property tags (with latest CSS3)"
copy_config_file $m "tags/std.css.tags"
##prefixed CSS properties tags
echo "\nCopying: vendor's prefixed css property tags (without leading -)"
copy_config_file $m "tags/prefixed.css.tags"

#Javascript
echo "\n-------------------- Javascript --------------------"
##Javascript highlighting (the patch to allow $ as word character doesn't work)
#echo "\nCopying: patches to Javascript highlighting"
#copy_config_file $m "filedefs/filetypes.javascript"
##standard js tags
echo "\nCopying: standard js property & function tags"
copy_config_file $m "tags/std.js.tags"
##Browser's DOM objects tags
echo "\nCopying: browser's DOM objects tags"
copy_config_file $m "tags/dom.js.tags"
##standard style's name
echo "\nCopying: standard js Style object property tags (equivalent to CSS properties list)"
copy_config_file $m "tags/styles.js.tags"

#Optional
##Mootools Core
echo -n "\nCopying: core Mootools API (y/n)"
read mootools_core;

if [ $mootools_core = "y" ]
then
  copy_config_file $m "tags/mootools-core.js.tags"
else
  echo "Aborted!"
fi

#Skip action script for now echo "Copying: standard flash.* Classes highlighting"
#copy_config_file $m "filedefs/filetypes.actionscript"

echo "\nDONE"
