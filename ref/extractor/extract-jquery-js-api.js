/**
 * (c) 2012 int3ractive.com
 * Author: Thanh Tran
 * 
 * Script to extract tags from Webstorm's predefined language API
 *
 * Executed with NodeJS
 **/

/**
 * import
 *
 **/
var fs = require('fs');
var libxmljs = require('libxmljs');

var files = ['jquery-api.xml'],
    path = 'jquery/', // path to files
    jsLib = 'jQuery',
    idx = 0; //name of the JS library, empty for core classes

var tagFileLines = '# format=pipe\n';

fs.readFile(path + files[idx], 'utf8', fileReadHandler);

/**
 * Handle fs.readFile callback
 **/
function fileReadHandler(err, data) {
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  
  if(jsLib) {
    tagFileLines += '# Library: ' + jsLib + '\n';
  }
  tagFileLines += '# Extract from: ' + files[idx] + '\n';
  
  tagFileLines += parseData(data);

  idx += 1;
  
  if (idx < files.length) {
    fs.readFile(path + files[idx], 'utf8', fileReadHandler);
  } else {
    writeFile(tagFileLines);
  }
}

function writeFile(fileLines) {
  fs.writeFile('jquery.js.tags', fileLines, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}

/**
 * Parse XML data
 **/
function parseData (data) {

  //console.log(data);
  var xmlDoc = libxmljs.parseXmlString(data),
      entries = xmlDoc.find('/api/entries/entry'),
      lines = '',
      i,il;

  il = entries.length;
  for (i = 0; i < il; i++) {
    lines += parseEntry(entries[i]);
  }
  
  console.log(lines);
  return lines;
}

function parseEntry(node) {
  var tagLine,
      tagLines = '',
      name = node.attr('name').value(),
      type = node.attr('type').value(),
      returnType = (node.attr('return')) ? node.attr('return').value() : '',
      signatures = node.find('signature'),
      signature,
      isStatic = false,
      className,
      classNameLength;
  
  if(name.indexOf('jQuery.') >= 0) {
    isStatic = true;
    name = name.substr(7);
  }

  classNameLength = name.indexOf('.');
  if(classNameLength == -1) {
    className = 'jQuery';
  } else {
    className = name.substr(0, classNameLength);
    name = name.substr(classNameLength + 1);
  }

  for (var i = 0, il = signatures.length; i < il; i++) {
    signature = signatures[i];
    //the name of property or method
    tagLine = name + '|';

    //library specific
    if(jsLib) {
      tagLine += '(' + jsLib + ' ' + signature.get('added').text() + '+';
    }

    //if deprecated
    if(node.get('deprecated') || signature.get('deprecated')) {
      tagLine += 'deprecated';
    }

    tagLine += ') '; //end of library spec

    //if static prop/method
    if(isStatic) {
      tagLine += '[static] ';
    }

    //class
    tagLine += className + '.|';

    
    if(type === 'property') {
      //the rest
      if(returnType) {
        tagLine += '|Type: ' + returnType;
      } else {
        tagLine += '|';
      }
    }

    if(type === 'method') {
      var params = signature.find('argument'),
          param;

      tagLine += '(';
      //iterate param list
      for (var j = 0, jl = params.length; j< jl; j++) {
        param = params[j];
        if (j > 0) {
          tagLine += ', ';
        }
        tagLine += param.attr('name').value();
        //type
        tagLine += ': ';
        tagLine += param.attr('type') ? param.attr('type').value() : '*';
      }

      if(!returnType || returnType == 'undefined') {
        returnType = 'void';
      }
      
      tagLine += '): ' + returnType + '|';
    }
    
    tagLines += tagLine  + '\n';
  }

  return tagLines;
}


/**
 * Parse a class element and return Geany's tags lines
 **/
function parseClass(xml) {
  var className = xml.attr('name').value(),
      children = xml.childNodes(),
      tagLine,
      tagLines;
  //console.log(className);

  tagLines = '## ' + className + '\n';
  
  for (var i = 0, il = children.length; i< il; i++) {
    var node = children[i],
        nodeName = node.name(),
        browser = node.attr('browser'),
        isStatic;
    
    if(nodeName != 'property' && nodeName != 'method') {
      continue;
    }
    
    //the property/method name
    tagLine = node.attr('name').value() + '|';

    //library specific (if any)
    if(jsLib) {
      tagLine += '(' + jsLib + ') ';
    }
    
    //browser specific (if any)
    if (browser) {
      tagLine += '(browser ' + browser.value() + ') ';
    }

    //static or not
    if(nodeName === 'property') {
      isStatic = node.attr('static') && node.attr('static').value() === 'true'; 
    } else if (nodeName === 'method') {
      isStatic = node.attr('type') && node.attr('type').value() === 'static';
    }

    if(isStatic) {
      tagLine += '[static] ';
    }

    //class
    tagLine += className + '.|';

    if(nodeName === 'property') {
      //the rest
      if (node.attr('type')) {
        tagLine += '|Type: ' + node.attr('type').value();
      } else {
        tagLine += '|';
      }
      
    }

    if(nodeName === 'method') {
      var returnTypeAttr = node.attr('returnType'),
          returnType = returnTypeAttr ? returnTypeAttr.value() : 'void',
          params = node.find('param'),
          param;

      tagLine += '(';
      //iterate param list
      for (var j = 0, jl = params.length; j< jl; j++) {
        param = params[j];
        if (j > 0) {
          tagLine += ', ';
        }
        tagLine += param.attr('name').value();
        //type
        tagLine += ': ';
        tagLine += param.attr('type') ? param.attr('type').value() : '*';
      }
      tagLine += '): ' + returnType + '|';
    }

    tagLines += tagLine + '\n';
    
  }

  return tagLines;

}

