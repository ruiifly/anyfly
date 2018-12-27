const http = require("http");
const chalk = require("chalk");
const path = require("path");

const route = require("./helper/route");
const conf = require("./config/defaultConfig");
const openUrl = require("./helper/openUrl");

class Service {
    constructor(config) {
        this.config = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.config.root, req.url);
            route(req, res, filePath, this.config);
        });

        const { hostname, port } = this.config;
        server.listen(port, hostname, () => {
            const address = `http://${hostname}:${port}`;
            console.info(`Server stared at ${chalk.green(address)}`);
            openUrl(address);
        });
    }
}

module.exports = Service;
