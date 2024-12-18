import express from 'express'
import employeeController from '../controller/employee.controller.js'
import influencerController from '../controller/influencer.controller.js'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('api', { title: 'Influencers management api' })
})

/* GET employees listing. */
router.get('/employees', employeeController.getEmployees)

router.get('/employees/:employeeId', employeeController.getEmployeeById)

/* GET influencers listing. */
router.get('/influencers', influencerController.getInfluencers)

router.get('/influencers/:influencerId', influencerController.getInfluencerById)

/* POST new influencer. */
router.post('/influencers', influencerController.createInfluencer)

export default router
