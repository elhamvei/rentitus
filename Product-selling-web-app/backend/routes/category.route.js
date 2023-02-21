const express = require('express')
const { categoryController } = require('../controller')
const validator = require('../middleware/validator')

const { categoryValidation } = require('../validation')

const router = express.Router()

router.route('/')
    .get(
        categoryController.getCategory
    )
    .post(
        validator(categoryValidation.category),
        categoryController.addCategory
    )

router.route('/:id')
      .put(validator(categoryValidation.category),
      categoryController.editCategory)
      .delete(
        categoryController.deleteCategory
      )
module.exports = router