const fs = require("fs");

exports.readFile = (path, cb) => {
  fs.readFile(path, (err, fileContent) => {
    if (err) {
      cb?.call(null, []);
    } else {
      cb?.call(null, JSON.parse(fileContent));
    }
  });
};
exports.writeFile = (path, data, cb) => {
  fs.writeFile(path, data, (err) => {
    if (!err) cb?.call(null);
    else console.log(err);
  });
};
