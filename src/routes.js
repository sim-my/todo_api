import { Router } from 'express';

import swaggerSpec from './utils/swagger';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const jwt = require('jsonwebtoken');

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

//router.use('/users', userRoutes);

function authenticateToken(req, res, next) {

  const token = req.headers['authorization']
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'secretkey', (err,data) => {
    if (err) return res.sendStatus(403)
    req.authData = data;
    next()
  })
}

function authorize(req, res, next){
  if(parseInt(req.params.userId) === req.authData.userId){
    next()
  }else{
    res.json({msg: 'Unauthorized'})
  }
}

router.use('/auth', authRoutes)

router.use('/todos/:userId', authenticateToken, authorize, todoRoutes);

router.use((err, req, res, next) => {
  res.json({
    msg: err.detail
  })
})

export default router;
