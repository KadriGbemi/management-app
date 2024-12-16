import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('api', { title: "Influencers api", influencers: '/influencers' });
});


/* GET users listing. */
router.get('/influencers', function(req, res, next) {
  res.send(JSON.stringify({

  }, null, 2));
});

export default router;
