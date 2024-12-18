import express from 'express'
import employeeController from '../controller/employee.controller.js'
import influencerController from '../controller/influencer.controller.js'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('api', { title: 'Influencers management api' })
})

/* GET employees listing. */
router.get('/employees', employeeController.getEmployees)

router.get('/employees/:employeeId', employeeController.getEmployeeById)

/* POST new influencer. */
router.post('/influencer', influencerController.createInfluencer)

export default router
