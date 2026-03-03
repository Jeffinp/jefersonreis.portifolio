const ensureProtocol = (url?: string) => {
  if (!url) return ''
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

const sanitizePhoneNumber = (value?: string) =>
  value ? value.replace(/\D/g, '') : ''

const rawSiteUrl =
  process.env['NEXT_PUBLIC_SITE_URL'] || 'https://jefersonreis.dev'
const normalizedSiteUrl = rawSiteUrl.replace(/\/$/, '')

const siteName =
  process.env['NEXT_PUBLIC_SITE_NAME'] ||
  'Jeferson Reis | Desenvolvedor Full-Stack'
const siteDescription =
  process.env['NEXT_PUBLIC_SITE_DESCRIPTION'] ||
  'Portfólio profissional de Jeferson Reis - Desenvolvedor Full Stack'
const contactEmail =
  process.env['NEXT_PUBLIC_CONTACT_EMAIL'] ||
  'jefersonreisalmeida8356@gmail.com'

const whatsappDisplay =
  process.env['NEXT_PUBLIC_WHATSAPP_NUMBER'] || '+55 (71) 98439-3235'
const whatsappDial = sanitizePhoneNumber(whatsappDisplay) || '5571984393235'

const discordInvite =
  process.env['NEXT_PUBLIC_DISCORD_INVITE'] ||
  'https://discord.gg/563186981962776577'

export const siteConfig = {
  url: normalizedSiteUrl,
  rawUrl: rawSiteUrl,
  name: siteName,
  description: siteDescription,
  contactEmail,
  whatsapp: {
    display: whatsappDisplay,
    dial: whatsappDial,
    link: `https://wa.me/${whatsappDial}`,
  },
  social: {
    github: ensureProtocol(
      process.env['NEXT_PUBLIC_GITHUB_URL'] || 'https://github.com/jeffinp'
    ),
    linkedin: ensureProtocol(
      process.env['NEXT_PUBLIC_LINKEDIN_URL'] ||
        'https://linkedin.com/in/jeferson-reis-877a942b7'
    ),
    discord: discordInvite,
    instagram: 'https://instagram.com/jefersonreis.dev',
    twitter: 'https://twitter.com/jefersonreis',
  },
}

export const siteHelpers = {
  ensureProtocol,
  sanitizePhoneNumber,
}
