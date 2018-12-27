const { createGzip, createDeflate } = require("zlib");

module.exports = (rs, req, res) => {
    const acceptEncoding = req.headers["accept-encoding"];
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return res;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader("Content-Encoding", "gzip");
        return rs.pipe(createGzip());
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader("Content-Enconding", "deflate");
        return rs.pipe(createDeflate());
    }
};
