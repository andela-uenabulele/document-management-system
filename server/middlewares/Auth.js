import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'just another open secret';
const Auth = {

  /**
   * verifyToken - Verifies Token sent from the consumer
   * @param {object} req  request Object
   * @param {object} res  response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} token validity response | Void
   */
  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.decoded = decoded;
      next();
    });
  },
  /**
   * verifyAdmin - Verifies if user is an Admin
   * @param {object} req request Object
   * @param {object} res response Object
   * @param {callback} next callback to the next middleware or function
   * @returns {Object | void} Admin validity response | Void
   */
  verifyAdmin(req, res, next) {
    db.Roles.findById(req.decoded.RoleId)
       .then((role) => {
         if (role.title === 'Admin') {
           next();
         } else {
           return res.status(403)
           .send({ message: 'Admin access is required!' });
         }
       });
  }
};

export default Auth;