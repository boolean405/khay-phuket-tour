const router = require('express').Router();
const controller = require('../controllers/child_category');
const { ChildCategorySchema, AllSchema } = require('../utils/schema');
const { validateBody, validateParam } = require('../utils/validator');

router.get('/', controller.all);
router.post('/', [validateBody(ChildCategorySchema.add), controller.add]);

router.route('/:id')
    .get(validateParam(AllSchema.id, 'id'), controller.get)
    .patch([validateParam(AllSchema.id, 'id'), validateBody(ChildCategorySchema.patch)], controller.patch)
    .delete(validateParam(AllSchema.id, 'id'), controller.drop)
module.exports = router;