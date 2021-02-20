import { Router } from 'express';

import * as todoController from '../controllers/todos';

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => todoController.fetchAll(req, res, next,{userId : req.authData.userId}));

/**
 * GET /api/todos/:id
 */
router.get('/:id', todoController.fetchById);

/**
 * POST /api/todos
 */
router.post('/', todoController.create);

/**
 * PUT /api/todos/:id
 */
router.put('/:id', todoController.update);

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', todoController.deleteTodo);

export default router;
