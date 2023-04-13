const path = require("path");
const jsdom = require("jsdom");
const { resolve } = require("path");
const { JSDOM } = jsdom;

const render = async (fileName) => {
  const filePath = path.join(process.cwd(), fileName);

  const dom = await JSDOM.fromFile(filePath, {
    runScripts: "dangerously",
    resources: "usable",
  });

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};

module.exports = render;
