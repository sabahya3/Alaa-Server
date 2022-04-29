const productServises = require("../servises/product.services");
const upload = require("../midlleware/upload");


exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            var model = {
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",
            };
            productServises.createProduct(model, (error, result) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Succes",
                        data: result,
                    });
                }
            });

        }
    })
}




exports.findAll = (req, res, next) => {
    var model = {
        productName: req.query.productName,
    };
    productServises.getProduct(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result,
            });
        }
    });
}





exports.findOne = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };
    productServises.getProductById(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result,
            });
        }
    });
}




exports.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const url = req.protocol + "://" + req.get("host");
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
            var model = {
                productId:req.params.id,
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                productImage: path != "" ? url + "/" + path : "",
            };
            productServises.updateProduct(model, (error, result) => {
                if (error) {
                    return next(error);
                } else {
                    return res.status(200).send({
                        message: "Succes",
                        data: result,
                    });
                }
            });

        }
    })
}


exports.delete = (req, res, next) => {
    var model = {
        productId: req.params.id,
    };
    productServises.deleteProduct(model, (error, result) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Succes",
                data: result,
            });
        }
    });
}
