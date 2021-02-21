import { Router } from 'express';
import * as userController from '../controllers/users';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const router = Router();

router.post('/register', userController.create);

router.post('/login', (req, res, next) => {
  userController
    .fetchOne(req, res, next, { email: req.body.email })
    .then((data) => {
      if (data.err) {
        res.json({ msg: 'No such user' });
      }
      if (data.data) {
        if(bcrypt.compareSync(req.body.password, data.data.attributes.password))    {
          const token = generateAccessToken({ userId: data.data.attributes.id, email: data.data.attributes.email });
          res.json({token});
        }else{          
          res.json({msg:'Password mismatch'})
        }        
      }
    })
    .catch((err) => {
      next(err);
    });
});

function generateAccessToken(email) {
  return jwt.sign(email, 'secretkey');
}

export default router;
