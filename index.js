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

const splitOn = ":";
// split on new line
const lines = contents.split(splitOn);

// make regex which converts 'font-size: 1.15rem' to [1.15rem, 1.5, rem]
const remRegex = new RegExp("(\\d.?\\d?)(rem)");
let replacedCount = 0;
const finalLines = lines.map(line => {
  if (line.includes("rem")) {
    const matches = line.match(remRegex);
    if (matches && matches.length === 3) {
      replacedCount++;
      const newLine = line.replace(
        matches[0],
        matches[1] * argv.multiplier + "px"
      );
      //   console.log("replaced", line, "with", newLine);
      return newLine;
    }
  }
  return line;
});

const finalContent = finalLines.join(splitOn);
// console.log(finalContent);
try {
  fs.writeFileSync(argv.file, finalContent);
} catch (error) {
  console.log("[rem-to-px] Error while persisting file", error);
  return;
}

console.log("[rem-to-px] Replaced", replacedCount, "rem values to px");
