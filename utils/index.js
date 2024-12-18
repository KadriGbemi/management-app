import axios from 'axios'
export const SOCIAL_MEDIA = {
  1: 'tiktok',
  2: 'instagram',
}

export const isEmpty = (obj) => {
  return JSON.stringify(obj) === '{}'
}

export const verifySocialMediaAccount = async (socialMediaData) => {
  const errors = {}

  for (let socialMedia of socialMediaData) {
    const { type, username, field } = socialMedia

    const platform = SOCIAL_MEDIA[type]

    const platforms = {
      instagram: `https://www.instagram.com/${username}/`,
      tiktok: `https://www.tiktok.com/@${username}`,
    }
    console.log('Response verify username', username)
    const url = platforms[platform.toLowerCase()]
    if (!url) {
      throw new Error('Unsupported platform. Use "instagram" or "tiktok".')
    }

    const response = await axios.get(url, { responseType: 'arraybuffer' })
    console.log('Response verify', response.status, response.data)
    if (response.data.includes("unexpectedErrorPage") || response.data.includes('Couldn’t find this account')) {
      errors[field] = `Account with username ${username} does not exist on ${platform} `
    }
  }

  return errors
}
