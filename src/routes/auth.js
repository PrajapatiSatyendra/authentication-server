const router = require('express').Router();
const authControllers = require('../controllers/auth');
const { body } = require("express-validator");
const User = require("../models/users");
const isAuth = require("../middlewares/is-auth");

/**
 * @openapi 
 * /api/v1/auth/signup:
 *  put:
 *    tags:
 *       - Sign Up
 *    description: This api is for user signup
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema: 
 *                $ref: '#components/schemas/UserSignUp'
 *    responses:
 *       201:
 *          description: Success
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/UserSignUpResponse201'
 *       400:
 *          description: Bad Request
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error400'
 *       500:
 *          description: Internal Server Error
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/Error500'
 *    
 */

router.put('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value,{req})=>{
        return User.findOne({email:value}).then(userDoc=>{
            if (userDoc) {
                return Promise.reject('E-mail address already exists');
            }
            
        });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5})
], authControllers.signup);

/**
 * @openapi
 * /api/v1/auth/login:
 *    post:
 *       tags:
 *          - Login
 *       description: API for user login
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   $ref: '#components/schemas/LoginRequest'
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/LoginResponse200'
 *          400:
 *             description: Bad Request
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error400'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   Schema:
 *                      $ref: '#components/schemas/Error500'
 * 
 *       
 */

router.post('/login', authControllers.login);

/**
 * @openapi
 * /api/v1/auth/refreshAccessToken:
 *    get:
 *       tags:
 *          - Refresh Access Token
 *       description: API for refreshing access token
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/LoginResponse200'
 *          498:
 *             description: Invalid Refresh Token
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/Error498'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   Schema:
 *                      $ref: '#components/schemas/Error500'
 * 
 *       
 */

router.get('/refreshAccessToken', authControllers.refreshAccessToken);

/**
 * @openapi
 * /api/v1/auth/logout:
 *    delete:
 *       tags:
 *          - Log Out
 *       description: API for logging out
 *       responses:
 *          200:
 *             description: Success
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#components/schemas/LoginResponse200'
 *          500:
 *             description: Internal Server Error
 *             content:
 *                application/json:
 *                   Schema:
 *                      $ref: '#components/schemas/Error500'
 * 
 *       
 */
router.delete('/logout', authControllers.logout);

module.exports=router;