import express from 'express'
import employeeController from '../controller/employee.controller.js'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('api', { title: 'Influencers management api' })
})

/* GET employees listing. */
router.get('/employees', employeeController.getEmployees)

router.get('/employees/:employeeId', employeeController.getEmployeeById)

export default router
