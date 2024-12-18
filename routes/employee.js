import express from 'express'
import cors from 'cors'
import employeeController from '../controller/employee.controller.js'
import influencerController from '../controller/influencer.controller.js'

const corsOptions = {
  origin: function (origin, callback) {
    if (['http://localhost:5050'].indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('api', { title: 'Influencers management api' })
})

/* GET employees listing. */
router.get('/employees',  employeeController.getEmployees)

router.get('/employees/:employeeId', employeeController.getEmployeeById)

/* POST new influencer. */
router.post('/influencer', influencerController.createInfluencer)

export default router
