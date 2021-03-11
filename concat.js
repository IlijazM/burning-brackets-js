const fs = require("fs");
const path = require("path");

const buildDirectory = "build";

let concatenatedCode = "";

fs.readdirSync(buildDirectory).forEach((file) => {
  const fileContent = fs.readFileSync(path.join(buildDirectory, file));
  concatenatedCode += fileContent + "\n";
});

fs.writeFileSync("index.js", concatenatedCode);
