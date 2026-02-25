export interface AuthUser {
  googleId: string
  email: string
  name: string
  picture: string
}

export function useAuth() {
  const user = useCookie<AuthUser | null>('auth_user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    sameSite: 'lax',
  })

  const isLoggedIn = computed(() => !!user.value?.googleId)

  const logout = async () => {
    user.value = null
    await navigateTo('/login')
  }

  return { user, isLoggedIn, logout }
}
