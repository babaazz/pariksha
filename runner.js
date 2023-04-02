const path = require("path");

const fs = require("fs").promises;

class Runner {
  constructor() {
    this.testFiles = [];
  }
  async collectFiles(targetPath) {
    const files = await fs.readdir(targetPath);
    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stat = await fs.lstat(filepath);

      if (stat.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath });
      } else if (stat.isDirectory()) {
        const childFiles = await fs.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
