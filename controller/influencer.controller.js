import influencerService from '../service/influencer.service.js'
import { isEmpty } from '../utils/index.js'

export const hasInputNameErrors = (req, res) => {
  const { first_name, last_name } = req.body

  const maxLength = 50
  const errorMessage = () => `Length should be limited to ${maxLength} characters`

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name is required' })
  }

  if (first_name?.length > maxLength && last_name?.length > maxLength) {
    return res.status(400).json({
      error: {
        first_name: errorMessage(),
        last_name: errorMessage(),
      },
    })
  }

  if (first_name?.length > maxLength) {
    return res.status(400).json({ error: { first_name: errorMessage() } })
  }

  if (last_name?.length > maxLength) {
    return res.status(400).json({ error: { last_name: errorMessage() } })
  }

  return null
}

export const createInfluencer = async (req, res) => {
  try {
    const isInputNamesWithErrors = hasInputNameErrors(req, res)

    if (!isInputNamesWithErrors) {
      const influencer = await influencerService.createInfluencer(req.body)
      res.status(200).json(influencer)
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getInfluencers = async (req, res) => {
  try {
  
    const influencers = isEmpty(req?.query)
      ? await influencerService.getInfluencers()
      : await influencerService.getFilteredInfluencers(req?.query)

     // console.log('Get influencers final', influencers)

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

export default { getInfluencers, getInfluencerById, createInfluencer }
