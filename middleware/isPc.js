export default function (context) {
  const userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  // context.userAgent = userAgent
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent)
  const isProduction = process.env.NODE_ENV === 'production'
  if (!isMobile && isProduction) {
    const path = 'https://www.herhairworld.com'
    context.redirect(path)
  }
}
