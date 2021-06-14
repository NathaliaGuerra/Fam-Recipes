const express = require('express');

const AuthController = require('../controllers/AuthController');
const PasswordController = require('../controllers/PasswordController');
const validate = require('../middlewares/validate');
const { registerRulesAuth, loginRulesAuth, registerByPinRulesAuth, registerInviteRuleAuth } = require('../validators/authValidator');
const { recoverRulePassword, resetTokenRulePassword } = require('../validators/passwordValidator');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Register and Login
router.get('/',
    (req, res) => {res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     description: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      first_name:
 *                          type: string
 *                      last_name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                      level:
 *                          type: integer
 *                      active:
 *                          type: boolean
 *                  required:
 *                      - first_name
 *                      - last_name
 *                      - email
 *                      - password
 *                      - level
 *                      - active
 *     responses:
 *        200:
 *            description: Array of Providers objects.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      first_name:
 *                        type: string
 *                      last_name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                      level:
 *                          type: integer
 *                      active:
 *                          type: boolean
 */
router.post('/register',
    registerRulesAuth(),
    validate,
    async (req, res) => (new AuthController).register(req, res)
);

/**
 * @swagger
 * /auth/register-pin:
 *   post:
 *     tags: [Authentication]
 *     description: Register a user by PIN
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      pin:
 *                          type: string
 *                  required:
 *                      - pin
 *     security:
 *          - BearerAuth: []
 *     responses:
 *        200:
 *            description: Array of Providers objects.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      functional_unit_id:
 *                        type: integer
 *                      user_id:
 *                          type: integer
 *                      version:
 *                          type: string
 *                      active:
 *                          type: boolean
 *        422:
 *            description: Empty array. Unprocessable Entity.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  example: []
 */
router.post('/register-pin',
    authenticate,
    registerByPinRulesAuth(),
    validate,
    async (req, res) => (new AuthController).registerByPin(req, res)
);

/**
 * @swagger
 * /auth/register-invite/{token}:
 *   get:
 *     tags: [Authentication]
 *     description: Returns data of user and functional unit.
 *     parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: Token to reset password.
 *     responses:
 *        200:
 *            description: Array of user objects.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      user:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            first_name:
 *                                type: string
 *                            last_name:
 *                                type: string
 *                            email:
 *                                type: string
 *                            phone:
 *                                type: string
 *                            level:
 *                                type: integer
 *                            active:
 *                                type: boolean
 *                            avatar:
 *                                type: string
 *                            created_at:
 *                                type: date
 *                            updated_at:
 *                                type: date
 *                      functional_unit:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            administrable_id:
 *                                type: integer
 *                            name:
 *                                type: string
 *                            floor:
 *                                type: string
 *                            department:
 *                                type: integer
 *                            number:
 *                                type: integer
 *                            description:
 *                                type: string
 *                            forgive_interest:
 *                                type: string
 *                            expense_register_token:
 *                                type: string
 *                            alternative_id:
 *                                type: integer
 *                            package_id:
 *                                type: string
 *                            primary_contact:
 *                                type: string
 *                            created_at:
 *                                type: date
 *                            updated_at:
 *                                type: date
 */
router.get('/register-invite/:token',
    async (req, res) => (new AuthController).getRegisterByInvitation(req, res)
);

/**
 * @swagger
 * /auth/register-invite/{token}:
 *   post:
 *     tags: [Authentication]
 *     description: Register a user by invitation
 *     parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: Token to register by invitation.
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      password:
 *                          type: string
 *                      confirm_password:
 *                          type: string
 *                  required:
 *                      - password
 *                      - confirm_password
 *     responses:
 *        200:
 *            description: Array of Providers objects.
 */
router.post('/register-invite/:token',
    registerInviteRuleAuth(),
    validate,
    async (req, res) => (new AuthController).registerByInvitation(req, res)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     description: Returns the homepage
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *                  required:
 *                      - email
 *                      - password
 *     responses:
 *       200:
 *         description: token
 */
router.post("/login",
    loginRulesAuth(),
    validate,
    async (req, res) => (new AuthController).login(req, res)
);

// EMAIL Verification
router.get('/verify/:token', async (req, res) =>(new AuthController).verify(req, res));
router.post('/resend', async (req, res) => (new AuthController).resendToken(req, res));

// Password RESET

/**
 * @swagger
 * /auth/recover:
 *   post:
 *     tags: [Recover Password]
 *     description: Reset Password
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                  required:
 *                      - email
 *     responses:
 *       200:
 *         description: A reset password has been sent to your email address
 */
router.post('/recover',
    recoverRulePassword(),
    validate,
    async (req, res) => (new PasswordController).recover(req, res)
);

/**
 * @swagger
 * /auth/reset/{token}:
 *   get:
 *     tags: [Recover Password]
 *     description: Returns form for reset password.
 *     parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: Token to reset password.
 *     responses:
 *        200:
 *            description: Array of user objects.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      first_name:
 *                        type: string
 *                      last_name:
 *                        type: string
 *                      email:
 *                        type: string
 *                      phone:
 *                        type: string
 *                      level:
 *                         type: integer
 *                      is_verified:
 *                          type: boolean
 *                      token:
 *                          type: string
 *                      reset_password_token:
 *                          type: string
 *                      reset_password_expired:
 *                          type: date
 *                      active:
 *                          type: boolean
 *                      avatar:
 *                        type: string
 *                      created_at:
 *                          type: date
 *                      updated_at:
 *                          type: date
 *        204:
 *            description: Empty array. There is not user.
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  example: []
 *        404:
 *            description: There is not relationship for the token
 */
router.get('/reset/:token',
    async (req, res) => (new PasswordController).reset(req, res)
);

/**
 * @swagger
 * /auth/reset/{token}:
 *   post:
 *     tags: [Recover Password]
 *     description: Reset password
 *     parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *            required: true
 *            description: Token to reset password.
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  properties:
 *                      password:
 *                          type: string
 *                      confirm_password:
 *                          type: string
 *                  required:
 *                      - password
 *                      - confirm_password
 *     responses:
 *        200:
 *            description: Array of Providers objects.
 */
router.post('/reset/:token',
    resetTokenRulePassword(),
    validate,
    async (req, res) => (new PasswordController).resetPassword(req, res)
);


module.exports = router;
