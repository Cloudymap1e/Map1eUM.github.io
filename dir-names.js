"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function getDirectoryStructure(dirPath) {
  var stats = fs.statSync(dirPath);
  var info = {
    name: path.basename(dirPath),
    type: stats.isDirectory() ? "directory" : "file",
  };
  if (stats.isDirectory()) {
    info.children = fs.readdirSync(dirPath).map(function (child) {
      return getDirectoryStructure(path.join(dirPath, child));
    });
  }
  return info;
}
var rootDir = __dirname; // Use the current directory of the script
var structure = getDirectoryStructure(rootDir);
fs.writeFileSync("directory-structure.json", JSON.stringify(structure, null, 2), "utf-8");
console.log("Directory structure has been saved to directory-structure.json");
