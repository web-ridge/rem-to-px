#! /usr/bin/env node
const fs = require("fs");
const argv = require("yargs")
  .help()
  .option("file", {
    alias: "f",
    description: "File you want to replace",
    type: "string"
  })
  .option("multiplier", {
    alias: "m",
    description: "The rem value is * agains this number. (default is 10)",
    type: "number",
    default: 10
  })
  .alias("help", "h").argv;

if (!argv.file) {
  console.log("You should specify the file");
  return;
}
// read specified file
const contents = fs.readFileSync(argv.file, "utf8");

// split on new line
const lines = contents.split("\n");

// make regex which converts 'font-size: 1.15rem' to [1.15rem, 1.5, rem]
const remRegex = new RegExp("(\\d.?\\d?)(rem)");
let replacedCount = 0;
const finalLines = lines.map(line => {
  if (line.includes("rem")) {
    const matches = line.match(remRegex);
    if (matches && matches.length === 3) {
      replacedCount++;
      return line.replace(matches, matches[1] * argv.multiplier + "px");
    }
  }
  return line;
});

fs.writeFileSync(argv.file, finalLines.join("\n"), "utf8");
console.log("Replaced", replacedCount, "rem values to px");
