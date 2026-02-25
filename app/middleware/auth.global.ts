// Routes that do not require authentication
const PUBLIC_ROUTES = [
  '/login',
  '/login-basic',
  '/register',
  '/forgot-password',
  '/otp',
  '/otp-1',
  '/otp-2',
]

export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  // Allow access to public routes
  const isPublic = PUBLIC_ROUTES.some(route => to.path === route || to.path.startsWith('/api/auth'))
  if (isPublic) {
    // If logged in and visiting login page, redirect to dashboard
    if (isLoggedIn.value && to.path === '/login') {
      return navigateTo('/')
    }
    return
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
