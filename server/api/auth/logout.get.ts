export default defineEventHandler((event) => {
  // Clear the auth cookie
  setCookie(event, 'auth_user', '', {
    maxAge: 0,
    path: '/',
  })

  return sendRedirect(event, '/login')
})
