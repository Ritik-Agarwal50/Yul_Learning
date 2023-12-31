/** @format */

const path = require("path");
const fs = require("fs");
const solc = require("solc");

const outputPath = path.resolve(
  __dirname,
  "..",
  "build",
  "PureYul.bytecode.json"
);

const inputPath = path.resolve(__dirname, "..", "contracts", "PureYul.sol");
const source = fs.readFileSync(inputPath, "utf-8");

var input = {
  language: "Yul",
  sources: {
    "PureYul.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["evm.bytecode"],
      },
    },
  },
};

const compiledContract = solc.compile(JSON.stringify(input));
const bytecode =
  JSON.parse(compiledContract).contracts["PureYul.sol"].PureYul.evm.bytecode
    .object;

 fs.writeFile(outputPath, JSON.stringify(bytecode), (err) => {});
console.log(compiledContract);
console.log(bytecode)
console.log("done");
