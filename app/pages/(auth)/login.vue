<script setup lang="ts">
import { Loader2, ShieldX, X } from 'lucide-vue-next'

definePageMeta({
  layout: 'blank',
})

const { isLoggedIn } = useAuth()

// If already logged in, redirect to dashboard
if (isLoggedIn.value) {
  navigateTo('/')
}

const route = useRoute()
const isLoading = ref(false)

// ── Error state from rejected login ──
const authError = computed(() => route.query.error as string | undefined)
const rejectedEmail = computed(() => route.query.email as string | undefined)
const showError = ref(!!route.query.error)

function dismissError() {
  showError.value = false
}

// Auto-dismiss error after 8 seconds
let errorTimer: ReturnType<typeof setTimeout> | null = null
onMounted(() => {
  if (showError.value) {
    errorTimer = setTimeout(() => { showError.value = false }, 8000)
  }
})
onUnmounted(() => {
  if (errorTimer) clearTimeout(errorTimer)
})

function loginWithGoogle() {
  isLoading.value = true
  window.location.href = '/api/auth/google'
}

useSeoMeta({
  title: 'Sign In — ETG CRM',
  description: 'Sign in with your Google account to access the ETG CRM platform.',
})
</script>

<template>
  <div class="login-page">
    <!-- Background mesh gradient -->
    <div class="login-bg" />
    <div class="login-glow login-glow--1" />
    <div class="login-glow login-glow--2" />

    <!-- Content -->
    <div class="login-container">
      <!-- Left panel — branding -->
      <div class="login-brand">
        <div class="login-brand__inner">
          <!-- Centered hero logo -->
          <div class="login-brand__hero">
            <div class="login-logo-sun">
              <!-- Sun rays -->
              <div class="sun-rays">
                <div v-for="i in 12" :key="i" class="sun-ray" :style="{ '--ray-index': i }" />
              </div>
              <!-- Glow halo -->
              <div class="sun-halo" />
              <div class="sun-halo sun-halo--outer" />
              <!-- Floating particles -->
              <div class="sun-particles">
                <div v-for="i in 6" :key="i" class="sun-particle" :style="{ '--p-index': i }" />
              </div>
              <!-- Logo -->
              <div class="sun-logo-ring">
                <img src="/logo-192.png" alt="ETG CRM" class="sun-logo-img" />
              </div>
            </div>
            <div class="login-brand__title">
              <h2>ETG CRM</h2>
              <p>Enterprise CRM Platform</p>
            </div>
          </div>

          <div class="login-brand__quote">
            <blockquote class="space-y-3">
              <p class="text-lg leading-relaxed text-white/80 italic">
                &ldquo;A comprehensive platform that streamlines every aspect of our business all in one place.&rdquo;
              </p>
              <footer class="text-sm text-white/50 font-medium">
                — ETG Management Team
              </footer>
            </blockquote>
          </div>

          <!-- Decorative grid -->
          <div class="login-brand__grid" />
        </div>
      </div>

      <!-- Right panel — sign in -->
      <div class="login-form-panel">
        <div class="login-form-wrapper">
          <!-- Mobile logo -->
          <div class="login-mobile-logo">
            <img src="/logo-192.png" alt="ETG CRM" class="size-10 rounded-lg" />
          </div>

          <!-- Unauthorized error banner -->
          <Transition name="error-slide">
            <div v-if="showError && authError === 'unauthorized'" class="login-error">
              <div class="login-error__icon">
                <ShieldX class="size-5" />
              </div>
              <div class="login-error__content">
                <p class="login-error__title">Access Denied</p>
                <p class="login-error__msg">
                  <strong>{{ rejectedEmail }}</strong> is not authorized to access this platform. Please contact your administrator or try a different account.
                </p>
              </div>
              <button class="login-error__close" @click="dismissError">
                <X class="size-4" />
              </button>
            </div>
          </Transition>

          <div class="login-form__header">
            <h1 class="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p class="text-sm text-muted-foreground mt-2">
              Sign in with your Google account to continue
            </p>
          </div>

          <!-- Google Sign In Button -->
          <button
            id="google-signin-btn"
            class="login-google-btn"
            :disabled="isLoading"
            @click="loginWithGoogle"
          >
            <template v-if="isLoading">
              <Loader2 class="size-5 animate-spin" />
              <span>Redirecting...</span>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </template>
          </button>

          <div class="login-divider">
            <div class="login-divider__line" />
            <span class="login-divider__text">Authorized users only</span>
            <div class="login-divider__line" />
          </div>

          <p class="text-xs text-muted-foreground text-center leading-relaxed">
            By signing in, you agree to our terms of service and privacy policy. Only authorized Google accounts can access this platform.
          </p>
        </div>

        <!-- Footer -->
        <div class="login-footer">
          <p class="text-xs text-muted-foreground">
            &copy; 2026 ETG CRM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100dvh;
  width: 100%;
  overflow: hidden;
  background: var(--background);
}

.login-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    oklch(0.15 0.02 260) 0%,
    oklch(0.12 0.01 240) 50%,
    oklch(0.14 0.02 280) 100%
  );
  z-index: 0;
}

.dark .login-bg {
  background: linear-gradient(135deg,
    oklch(0.08 0.02 260) 0%,
    oklch(0.06 0.01 240) 50%,
    oklch(0.09 0.02 280) 100%
  );
}

.login-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  z-index: 1;
  pointer-events: none;
}

.login-glow--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -100px;
  background: oklch(0.5 0.15 260 / 30%);
  animation: float-1 8s ease-in-out infinite;
}

.login-glow--2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -50px;
  background: oklch(0.6 0.18 300 / 20%);
  animation: float-2 10s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.1); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -40px) scale(1.15); }
}

.login-container {
  position: relative;
  z-index: 10;
  display: flex;
  min-height: 100dvh;
}

/* Left branding panel */
.login-brand {
  display: none;
  flex: 1;
  position: relative;
  padding: 2.5rem;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .login-brand {
    display: flex;
  }
}

.login-brand__inner {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 3rem;
}

.login-brand__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* ── Sun-shine logo ── */
.login-logo-sun {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Rotating rays */
.sun-rays {
  position: absolute;
  inset: 0;
  animation: sun-spin 20s linear infinite;
}

.sun-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 90px;
  transform-origin: 50% 0;
  transform: rotate(calc(var(--ray-index) * 30deg));
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 215, 100, 0.35) 40%,
    rgba(255, 180, 50, 0.12) 80%,
    transparent 100%
  );
  border-radius: 2px;
  opacity: 0.8;
  animation: ray-pulse 3s ease-in-out infinite;
  animation-delay: calc(var(--ray-index) * 0.15s);
}

/* Halo glow */
.sun-halo {
  position: absolute;
  inset: 15px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 200, 80, 0.25) 0%,
    rgba(255, 180, 50, 0.08) 50%,
    transparent 70%
  );
  animation: halo-pulse 4s ease-in-out infinite;
}

.sun-halo--outer {
  inset: -10px;
  background: radial-gradient(
    circle,
    rgba(255, 200, 80, 0.08) 0%,
    rgba(255, 180, 50, 0.03) 40%,
    transparent 65%
  );
  animation-delay: 1s;
  animation-duration: 5s;
}

/* Floating particles */
.sun-particles {
  position: absolute;
  inset: 0;
}

.sun-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 220, 120, 0.7);
  box-shadow: 0 0 6px 2px rgba(255, 200, 80, 0.4);
  animation: particle-float 6s ease-in-out infinite;
  animation-delay: calc(var(--p-index) * 0.8s);
}

.sun-particle:nth-child(1) { top: 10%; left: 50%; }
.sun-particle:nth-child(2) { top: 30%; left: 85%; }
.sun-particle:nth-child(3) { top: 70%; left: 90%; }
.sun-particle:nth-child(4) { top: 88%; left: 55%; }
.sun-particle:nth-child(5) { top: 65%; left: 10%; }
.sun-particle:nth-child(6) { top: 25%; left: 12%; }

/* Logo ring */
.sun-logo-ring {
  position: relative;
  z-index: 10;
  width: 88px;
  height: 88px;
  border-radius: 1.25rem;
  padding: 3px;
  background: conic-gradient(
    from var(--shine-angle, 0deg),
    rgba(255, 220, 120, 0.15),
    rgba(255, 200, 80, 0.6),
    rgba(255, 255, 255, 0.95),
    rgba(255, 200, 80, 0.6),
    rgba(255, 220, 120, 0.15)
  );
  animation: shine-rotate 3s linear infinite;
  box-shadow:
    0 0 30px rgba(255, 200, 80, 0.25),
    0 0 60px rgba(255, 180, 50, 0.1);
}

.sun-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  background: oklch(0.12 0.02 260);
}

.dark .sun-logo-img {
  background: oklch(0.08 0.02 260);
}

/* Brand title */
.login-brand__title {
  text-align: center;
}

.login-brand__title h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(255, 200, 80, 0.15);
}

.login-brand__title p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.login-brand__quote {
  max-width: 420px;
  text-align: center;
}

.login-brand__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── Keyframes ── */
@keyframes sun-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ray-pulse {
  0%, 100% { opacity: 0.5; height: 80px; }
  50% { opacity: 1; height: 95px; }
}

@keyframes halo-pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.12); opacity: 1; }
}

@keyframes particle-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  25% {
    transform: translate(6px, -10px) scale(1.3);
    opacity: 1;
  }
  50% {
    transform: translate(-4px, -16px) scale(0.8);
    opacity: 0.3;
  }
  75% {
    transform: translate(-8px, -6px) scale(1.1);
    opacity: 0.8;
  }
}

@keyframes shine-rotate {
  from { --shine-angle: 0deg; }
  to { --shine-angle: 360deg; }
}

@property --shine-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

/* Right form panel */
.login-form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: var(--background);
  position: relative;
}

@media (min-width: 1024px) {
  .login-form-panel {
    max-width: 520px;
    border-left: 1px solid var(--border);
  }
}

.login-form-wrapper {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.login-mobile-logo {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .login-mobile-logo {
    display: none;
  }
}

.login-form__header {
  text-align: center;
}

/* Google Sign In Button */
.login-google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--foreground);
  color: var(--background);
  border: none;
  box-shadow:
    0 1px 3px rgba(0,0,0,0.1),
    0 4px 12px rgba(0,0,0,0.05),
    inset 0 1px 0 rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}

.login-google-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(255,255,255,0.08) 0%,
    transparent 50%
  );
  pointer-events: none;
}

.login-google-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow:
    0 2px 6px rgba(0,0,0,0.15),
    0 8px 24px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.15);
}

.login-google-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-google-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Divider */
.login-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-divider__line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.login-divider__text {
  font-size: 0.75rem;
  color: var(--muted-foreground);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.login-footer {
  position: absolute;
  bottom: 1.5rem;
  text-align: center;
}

/* Error banner */
.login-error {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: oklch(0.95 0.02 25);
  border: 1px solid oklch(0.85 0.08 25);
}

.dark .login-error {
  background: oklch(0.22 0.04 25);
  border-color: oklch(0.35 0.1 25);
}

.login-error__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: oklch(0.6 0.2 25);
  color: white;
}

.login-error__content {
  flex: 1;
  min-width: 0;
}

.login-error__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: oklch(0.45 0.15 25);
  margin-bottom: 0.25rem;
}

.dark .login-error__title {
  color: oklch(0.8 0.12 25);
}

.login-error__msg {
  font-size: 0.8125rem;
  color: oklch(0.5 0.08 25);
  line-height: 1.4;
}

.dark .login-error__msg {
  color: oklch(0.7 0.06 25);
}

.login-error__msg strong {
  word-break: break-all;
}

.login-error__close {
  flex-shrink: 0;
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: oklch(0.5 0.08 25);
  cursor: pointer;
  background: none;
  border: none;
  transition: background 0.15s;
}

.login-error__close:hover {
  background: oklch(0.9 0.02 25);
}

.dark .login-error__close {
  color: oklch(0.65 0.06 25);
}

.dark .login-error__close:hover {
  background: oklch(0.28 0.04 25);
}

/* Error slide transition */
.error-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.error-slide-leave-active {
  transition: all 0.2s ease-in;
}
.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
}
</style>
