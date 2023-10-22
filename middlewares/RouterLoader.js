const fs = require("fs");
const path = require("path");

class RouterLoader {
  constructor({ app = null, path = null }) {
    this.app = app;
    this.path = path;
    this.files = [];
    this.init();
  }
  async init() {
    const readFile = (dir) => {
      return new Promise(async (resolve, reject) => {
        const files = fs.readdirSync(dir);
        for (const _path of files) {
          const filePath = path.join(dir, _path),
            file = fs.statSync(filePath);
          if (file.isFile()) {
            const routeName = filePath
              .split(this.path)[1]
              .replace(/(\/index.js|\.js)/g, "");
            const path = filePath.replace(process.cwd(), "");
            this.files.push({
              path,
              route: (!!routeName.length && routeName) || "/",
            });
          } else if (file.isDirectory()) {
            readFile(path.join(dir, _path));
          }
        }
        resolve();
      });
    };
    await readFile(this.path);
  }
  async loadAllRoute() {
    return new Promise((resolve, reject) => {
        console.log(this.files)
      
      for (const file of this.files) {
        const router = require(process.cwd() + file.path);
        this.app.use("/api" + file.route, router);
      } 
      resolve();
    });
  }
}

module.exports = RouterLoader;
