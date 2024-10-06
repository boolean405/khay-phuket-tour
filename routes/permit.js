const router = require('express').Router();
const controller = require('../controllers/permit');
const { PermitSchema } = require('../utils/schema');
const { validateBody } = require('../utils/validator');

router.post('/', [validateBody(PermitSchema.add), controller.add]);

module.exports = router;