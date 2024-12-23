import influencerService from '../service/influencer.service.js'
import employeeService from '../service/employee.service.js'
import { isEmpty } from '../utils/index.js'

const maxLength = 50
const errorMessage = () => `Length should not be more than ${maxLength} characters`

const validateInputLength = (input) => (input?.length > maxLength ? errorMessage() : null)

function hasValues(obj) {
  return Object.values(obj).some((value) => value !== null)
}

const validateSocialMediaExists = (socialMediaData) => {
  const usernameTracker = new Set()

  const errors = {}

  socialMediaData.forEach((item) => {
    const { field, username } = item

    if (!username) {
      return (errors[field] = 'Username is requrired')
    } else if (usernameTracker.has(username)) {
      return (errors[field] = 'Duplicate username')
    } else {
      usernameTracker.add(username)
      return (errors[field] = null)
    }
  })

  return errors
}

const validateEmployee = async (employeeId) => {
  const isEmployeeInDatabase = await employeeService.getEmployeeById({ employeeId })
  return isEmpty(isEmployeeInDatabase) ? 'Enter valid employee' : null
}
export const hasInputErrors = async (req, res) => {
  const { first_name, last_name, employee, tiktok, instagram } = req.body

  const isEmployeeValidate = await validateEmployee(employee?.id)

  const errorObject = {
    first_name: first_name ? validateInputLength(first_name) : 'First name is required',
    last_name: last_name ? validateInputLength(last_name) : 'Last name is required',
    employee: employee?.id ? isEmployeeValidate : null,
  }

  const tiktokUsernameErrors = validateSocialMediaExists(tiktok)
  const instagramUsernameErrors = validateSocialMediaExists(instagram)

  const errors = { ...errorObject, ...tiktokUsernameErrors, ...instagramUsernameErrors }

  if (hasValues(errors)) {
    return res.status(400).json({
      errors,
    })
  }

  return null
}

export const createInfluencer = async (req, res) => {
  try {
    const isInputWithErrors = await hasInputErrors(req, res)

    if (!isInputWithErrors) {
      const influencer = await influencerService.createInfluencer(req.body)
      res.status(200).json(influencer)
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateInfluencer = async (req, res) => {
  try {
    const influencer = await influencerService.updateInfluencer(req.body, res)
    res.status(200).json(influencer)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteInfluencer = async (req, res) => {
  try {
    const response = await influencerService.deleteInfluencer(req.params, res)
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getInfluencers = async (req, res) => {
  try {
    const influencers = isEmpty(req?.query)
      ? await influencerService.getInfluencers()
      : await influencerService.getFilteredInfluencers(req?.query)

    res.status(200).json(influencers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getInfluencerById = async (req, res) => {
  try {
    const influencer = await influencerService.getInfluencerById(req.params)
    res.status(200).json(influencer)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default { getInfluencers, getInfluencerById, createInfluencer, updateInfluencer, deleteInfluencer }
