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

var files = ['DOMCore.xml', 'DOMEvents.xml', 'DHTML.xml', 'AJAX.xml', 'HTML5.xml'],
    path = 'webstorm/', // path to files
    jsLib = '',
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
  fs.writeFile('browser.js.tags', fileLines, function (err) {
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
      classes = xmlDoc.find('//class'),
      lines = '',
      i,il;

  il = classes.length;
  for (i = 0; i < il; i++) {
    lines += parseClass(classes[i]);
  }
  
  console.log(lines);
  return lines;
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

