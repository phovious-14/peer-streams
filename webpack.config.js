const Dotenv = require("dotenv-webpack")

module.exports = {
    plugins : [
        new Dotenv({
            path : './env',
            systemvars : true
        })
    ]
}