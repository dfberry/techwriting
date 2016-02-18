var showdown = require('showdown')
    ,path = require('path')
    ,fs = require('fs')
    ,converter = new showdown.Converter();
    
//converter.setOption('omitExtraWLInCodeBlocks', true);
//var defaultOptions = showdown.getDefaultOptions();
//console.log(defaultOptions);

showdown.setOption('ghCodeBlocks', true);
var showdownGlobalOptions = showdown.getOptions();
console.log(showdownGlobalOptions);

// full path to file from 2nd argument
var markdownFileAndPath = path.join(__dirname + process.argv[2]);
//console.log(markdownFileAndPath);

// path to file minus file name itself
var markdownPath = markdownFileAndPath.substring(0, markdownFileAndPath.lastIndexOf("/"));
//console.log(markdownPath);

// new html file so X.md is now X.html
var newFileName = markdownPath + "/" + (path.basename(markdownFileAndPath)).replace('.md','.html');
//console.log(newFileName);

// read file, parse md to html, save to new file
fs.readFile(markdownFileAndPath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
  
  
  var newdata = converter.makeHtml(data);
  //console.log(newdata);
  
  fs.writeFile(newFileName, newdata, function (err) {
    if (err) return console.log(err);
    console.log('done with ' + newFileName);
  });
  
});

