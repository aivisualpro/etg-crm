<script setup>
const { theme } = useAppSettings()

useHead({
  bodyAttrs: {
    class: computed(() => `color-${theme.value?.color || 'default'} theme-${theme.value?.type || 'default'}`),
  },
})

const router = useRouter()
const props = defineProps({
  error: Object,
})

const errorCode = computed(() => props.error?.statusCode || 404)
const errorMessage = computed(() => {
  if (errorCode.value === 404) return 'Page Not Found'
  if (errorCode.value === 500) return 'Internal Server Error'
  return props.error?.message || 'Something went wrong'
})

const errorDescription = computed(() => {
  if (errorCode.value === 404) return 'The page you\'re looking for doesn\'t exist or may have been moved.'
  if (errorCode.value === 500) return 'We encountered an unexpected error. Please try again later.'
  return 'An unexpected error occurred. Please try again.'
})

const entered = ref(false)
onMounted(() => {
  requestAnimationFrame(() => {
    entered.value = true
  })
})
</script>

<template>
  <div class="h-svh bg-background relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/5 rounded-full" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary/5 rounded-full" />
    </div>

    <div class="relative z-10 m-auto h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <div
        class="transition-all duration-700"
        :class="entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'"
      >
        <div class="text-center">
          <!-- Error code -->
          <h1 class="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter bg-gradient-to-br from-primary/80 via-primary/40 to-primary/10 bg-clip-text text-transparent select-none">
            {{ errorCode }}
          </h1>

          <!-- Error message -->
          <h2
            class="text-lg md:text-xl font-bold -mt-2 transition-all duration-700 delay-100"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ errorMessage }}
          </h2>

          <!-- Description -->
          <p
            class="text-sm text-muted-foreground mt-2 max-w-md mx-auto transition-all duration-700 delay-200"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ errorDescription }}
          </p>

          <!-- Actions -->
          <div
            class="mt-8 flex items-center justify-center gap-3 transition-all duration-700 delay-300"
            :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <Button variant="outline" size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow" @click="router.back()">
              <Icon name="i-lucide-arrow-left" class="size-3.5" />
              Go Back
            </Button>
            <Button size="sm" class="gap-1.5 shadow-sm hover:shadow-md transition-shadow" @click="router.push('/')">
              <Icon name="i-lucide-home" class="size-3.5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
