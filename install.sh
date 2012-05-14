#!/bin/sh

#DEFINE VARIABLES AND CONSTANTS
base_dir="./config/geany"
g_config_dir="$HOME/.config/geany"


copy_config_file() 
{
  _f_or_i=$1
  _file=$2
  _path="$base_dir/$_file"
  _sleep=0

  if [ "$_f_or_i" = "i" ]
  then
    read -p " Confirm (y/n)" confirm_copy;

    if [ "$confirm_copy" != "y" ]
    then
      echo "Aborted!"
      return
    fi
  else
    _sleep=1
    echo ""
  fi

  if [ -f $_path ]
  then
    #copy file over user's config folder
    cp -rv -$_f_or_i $_path "$g_config_dir/$_file"
  else
    echo "The file $_path not found"
  fi
  #delay to let user read what happened
  sleep $_sleep
}

#copy mode
m=i

read -p "Do you want to copy all files without asking? (y/n) " force_write;

if [ "$force_write" = "y" ]
then
  m=f
fi

#Common

echo -n "\nCopying: snippets (with conventional js alignment)"
copy_config_file $m "snippets.conf"

#if snippet is copied, let user change copyright & author
snippet_path="$g_config_dir/snippets.conf"
if [ -f $snippet_path ]
then
  echo "***** Open $snippet_path to edit your own copyright & author snippets *****"
  sleep 1
  #echo "\nPlease enter your line for the 'copyright' snippet:"
  #read sn_copyright

  #sed -i "s/\${copyright}/$sn_copyright/" "$snippet_path"
  #echo "Copyright written"

  #echo "\nPlease enter your line for the 'author' snippet:"
  #read sn_author

  #sed -i "s/\${author}/$sn_author/" "$snippet_path"
  #echo "Author written"
fi

#HTML
echo -n "\n-------------------- HTML --------------------"
##HTML syntax highlighting
echo -n "\nCopying: latest HTML properties highlighting"
copy_config_file $m "filedefs/filetypes.html"
#CSS
echo -n "\n-------------------- CSS --------------------"
##CSS highlighting
echo -n "\nCopying: latest css properties highlighting"
copy_config_file $m "filedefs/filetypes.css"
##standard css tags (with CSS3)
echo -n "\nCopying: standard css property tags (with latest CSS3)"
copy_config_file $m "tags/std.css.tags"
##prefixed CSS properties tags
echo -n "\nCopying: vendor's prefixed css property tags (without leading -)"
copy_config_file $m "tags/prefixed.css.tags"

#Javascript
echo "\n-------------------- Javascript --------------------"
##Javascript highlighting (the patch to allow $ as word character doesn't work)
#echo "\nCopying: patches to Javascript highlighting"
#copy_config_file $m "filedefs/filetypes.javascript"
##standard js tags
echo -n "\nCopying: standard js property & function tags"
copy_config_file $m "tags/std.js.tags"
##Browser's DOM objects tags
echo -n "\nCopying: browser's DOM objects tags"
copy_config_file $m "tags/dom.js.tags"
##standard style's name
echo -n "\nCopying: standard js Style object property tags (equivalent to CSS properties list)"
copy_config_file $m "tags/styles.js.tags"

#Optional
##Mootools Core
echo -n "\nOPTIONAL: Copying core Mootools API tags (y/n)"
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
