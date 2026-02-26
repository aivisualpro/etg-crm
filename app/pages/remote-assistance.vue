<script setup lang="ts">
const { setHeader } = usePageHeader()
setHeader({ title: 'Help & Support', icon: 'i-lucide-circle-help' })

const tools = [
  {
    title: 'Splashtop SOS',
    description: 'Instant remote support session. Click to download and launch the SOS client for quick assistance.',
    icon: 'i-lucide-monitor-smartphone',
    link: 'https://my.splashtop.com/sos/packages/download/WPY3RLP37XSZ',
    accent: 'from-blue-500 to-cyan-500',
    accentBg: 'bg-blue-500/10',
    accentText: 'text-blue-500',
  },
  {
    title: 'Chrome Remote Desktop',
    description: 'Access remote support through Google Chrome. Secure, fast and works directly in your browser.',
    icon: 'i-lucide-chrome',
    link: 'https://remotedesktop.google.com/support/',
    accent: 'from-emerald-500 to-teal-500',
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-500',
  },
  {
    title: 'TeamViewer',
    description: 'QuickSupport by TeamViewer — download the lightweight client for a guided remote assistance session.',
    icon: 'i-lucide-screen-share',
    link: 'https://www.teamviewer.com/en-us/solutions/use-cases/quicksupport/',
    accent: 'from-violet-500 to-purple-500',
    accentBg: 'bg-violet-500/10',
    accentText: 'text-violet-500',
  },
]
</script>

<template>
  <div class="w-full max-w-4xl mx-auto py-8 px-4">
    <div class="text-center mb-10">
      <div class="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 ring-1 ring-primary/10">
        <Icon name="i-lucide-headset" class="size-8 text-primary" />
      </div>
      <h2 class="text-xl font-bold tracking-tight mb-2">Need Remote Assistance?</h2>
      <p class="text-sm text-muted-foreground max-w-md mx-auto">
        Choose one of the tools below to start a remote support session with our team.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <a
        v-for="tool in tools"
        :key="tool.title"
        :href="tool.link"
        target="_blank"
        rel="noopener"
        class="group relative flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
      >
        <!-- Gradient accent bar -->
        <div class="h-1 w-full bg-gradient-to-r" :class="tool.accent" />

        <div class="flex flex-col items-center text-center p-6 flex-1">
          <!-- Icon -->
          <div
            class="size-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            :class="tool.accentBg"
          >
            <Icon :name="tool.icon" class="size-7" :class="tool.accentText" />
          </div>

          <!-- Title -->
          <h3 class="text-sm font-semibold mb-2">{{ tool.title }}</h3>

          <!-- Description -->
          <p class="text-xs text-muted-foreground leading-relaxed mb-5">
            {{ tool.description }}
          </p>

          <!-- CTA -->
          <div class="mt-auto">
            <span
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-gradient-to-r text-white transition-all duration-300 group-hover:shadow-lg"
              :class="tool.accent"
            >
              <Icon name="i-lucide-external-link" class="size-3.5" />
              Open
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
