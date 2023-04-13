const path = require("path");
const fs = require("fs/promises");
const chalk = require("chalk");
const render = require("./render");

const forbiddenDir = ["node_modules"];

class Runner {
  constructor() {
    this.testFiles = [];
    this.totalTests = 0;
    this.passed = 0;
    this.failed = 0;
  }

  async runTests() {
    for (let file of this.testFiles) {
      const beforeEachFns = [];
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEachFns.push(fn);
      };
      global.it = async (desc, fn) => {
        this.totalTests++;
        beforeEachFns.forEach((func) => func());
        try {
          await fn();
          this.passed++;
          console.log(chalk.green("\u2713", ` ${desc} went OK \n\n`));
        } catch (error) {
          this.failed++;
          console.log(chalk.red(`\n\n\t\tX ${desc}\n\n`));
          console.log(chalk.red(`${error.message}\n\n`));
        }
      };
      try {
        await require(file.name);
      } catch (error) {
        console.log(chalk.red("X - Error loading file", file.shortName));
        console.log(chalk(error.message));
      }
    }
    this.report();
  }

  async collectFiles(targetPath) {
    const files = await fs.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stat = await fs.lstat(filepath);

      if (stat.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stat.isDirectory() && !forbiddenDir.includes(file)) {
        const childFiles = await fs.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }

  report() {
    setTimeout(() => {
      console.log(
        chalk.green(`\u2713 ${this.passed} passed`),
        chalk.red(`X ${this.failed} failed`),
        chalk.grey(`of ${this.totalTests}`),
        `\n\n`
      );
    }, 300);
  }
}

module.exports = Runner;
