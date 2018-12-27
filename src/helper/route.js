const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const promisify = require("util").promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const tplPath = path.join(__dirname, "../template/dir.tpl");
const source = fs.readFileSync(tplPath, "utf8");
const template = Handlebars.compile(source);

const compress = require("./compress");

const mime = require("./mime");

module.exports = async function(req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader("Content-Type", mime(filePath));
            let rs = fs.createReadStream(filePath);
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : dir,
                files
            };
            res.end(template(data));
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end(`${filePath} is not a file or derectory!\nerrors is ${err}`);
    }
};
