/* import axios from 'axios'
import TikTokScraper from 'tiktok-scraper' */

export const SOCIAL_MEDIA = {
  1: 'tiktok',
  2: 'instagram',
}

export const isEmpty = (obj) => {
  return JSON.stringify(obj) === '{}'
}

/* export const verifySocialMediaAccount = async (socialMediaData) => {
  const errors = {}

  for (let socialMedia of socialMediaData) {
    const { type, username, field } = socialMedia

    const platform = SOCIAL_MEDIA[type]

    const platforms = {
      instagram: `https://www.instagram.com/${username}/`,
      tiktok: `https://www.tiktok.com/@${username}`,
    }
    //console.log('Response verify username', username)
    const url = platforms[platform.toLowerCase()]
    if (!url) {
      throw new Error('Unsupported platform. Use "instagram" or "tiktok".')
    }

    const userProfileInfo = await TikTokScraper.getUserProfileInfo({
      username,
      sessionList:['sid_tt=39371a72b4fcd177a0b67cd233695f45'],
      number: 1, // Fetch only one post
      headless: true // Run browser in headless mode
    })

    console.log('Response verify', userProfileInfo)

   if (!$(document).text().includes(username)) {
      errors[field] = `Account with username ${username} does not exist on ${platform} `
    }
  }

  return errors
}
 */