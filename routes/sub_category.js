const router = require('express').Router();
const controller = require('../controllers/sub_category');
const { SubCategorySchema, AllSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator');

router.get('/', controller.all);
router.post('/', [controller.add]);

// router.route('/:id')
//     .get(validateParam(AllSchema.id, 'id'), controller.get)
//     .patch(validateParam(AllSchema.id, 'id'), controller.patch)
//     .delete(validateParam(AllSchema.id, 'id'), controller.drop)
module.exports = router;