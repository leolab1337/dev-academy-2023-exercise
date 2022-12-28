const express = require("express");

const router = express.Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/', (req, res) => {
    res.send('Hello There!');
});

module.exports = router;
