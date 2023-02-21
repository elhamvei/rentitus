const express = require('express')
const auth = require('../middleware/auth')
const validator = require('../middleware/validator')
const {productController} = require('../controller')
const {productValidation} = require('../validation')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname);
    }
  });

const upload = multer({ storage: storage });

router.route('/products')
    .get(
        auth,
        productController.getProducts
    )
    .post(
        auth,
        validator(productValidation.product),
        upload.single('image'),
        productController.addProducts
    )

router.route('/my-products')
      .get(
        auth,
        productController.getMyProduct
      )

router.route('/buy/:id')
        .put(auth, productController.buyProduct)
      
router.route('/:id')
      .get(
        auth,
        productController.getProduct
      )
      .patch(
        auth,
        productController.editProduct
      )
      .delete(
        auth,
        productController.deleteProduct
      )
module.exports = router