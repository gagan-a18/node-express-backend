import express from 'express';

const router: express.Router = express.Router();

router.route('/').get((req, res) => {
    res.send('all items');
})

export default router;