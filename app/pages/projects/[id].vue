<script setup lang="ts">
import { toast } from 'vue-sonner'

const route = useRoute()
const projectId = computed(() => route.params.id as string)

const { setHeader } = usePageHeader()
setHeader({ title: 'Project Details', icon: 'i-lucide-folder-kanban' })

// ─── State ──────────────────────────────────────────────────
const project = ref<any>(null)
const customer = ref<any>(null)
const loading = ref(true)
const error = ref('')
const activeTab = ref('overview')
const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

// Chat state
const chatMessages = ref<any[]>([])
const chatLoading = ref(false)
const chatLoaded = ref(false)
const activeChatId = ref('')

// ─── Lookup maps ────────────────────────────────────────────
const userNameMap = ref<Record<string, string>>({})
const customerNameMap = ref<Record<string, string>>({})

// ─── Fetch ──────────────────────────────────────────────────
async function fetchProject() {
  loading.value = true
  error.value = ''
  try {
    const data = await $fetch<{ success: boolean, projects: any[] }>('/api/bigquery/projects')
    if (data.success) {
      project.value = data.projects.find((p: any) => p['Project ID'] === projectId.value) || null
      if (!project.value) error.value = 'Project not found'
    }
  }
  catch (e: any) {
    error.value = e.data?.statusMessage || e.message || 'Failed to load project'
    toast.error('Failed to load project')
  }
  finally {
    loading.value = false
  }
  loadLookupData()
}

async function loadLookupData() {
  const [userData, customerData] = await Promise.all([
    $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users').catch(() => ({ success: false, users: [] })),
    $fetch<{ success: boolean, customers: any[] }>('/api/bigquery/customers').catch(() => ({ success: false, customers: [] })),
  ])
  if (userData.success) {
    userNameMap.value = Object.fromEntries(
      userData.users.filter((u: any) => u.Email).map((u: any) => [
        u.Email.toLowerCase(),
        [u['First Name'], u['Last Name']].filter(Boolean).join(' ') || u.Email,
      ]),
    )
  }
  if (customerData.success) {
    customerNameMap.value = Object.fromEntries(
      customerData.customers.filter((c: any) => c['Customer ID']).map((c: any) => [
        c['Customer ID'],
        [c['First Name'], c['Last Name']].filter(Boolean).join(' ') || c['Customer ID'],
      ]),
    )
    // Find full customer record
    if (project.value) {
      customer.value = customerData.customers.find((c: any) => c['Customer ID'] === project.value['Customer ID']) || null
    }
  }
}

onMounted(fetchProject)

// ─── Helpers ────────────────────────────────────────────────
function resolveName(email: string): string {
  if (!email) return '—'
  return userNameMap.value[email.toLowerCase()] || email
}

function resolveCustomer(): string {
  if (!project.value) return '—'
  const id = project.value['Customer ID']
  if (!id) return '—'
  return customerNameMap.value[id] || id
}

function customerInitials(): string {
  const name = resolveCustomer()
  return name.substring(0, 2).toUpperCase()
}

function formatDate(value: any): string {
  if (!value) return '—'
  try {
    const d = new Date(value?.value || value)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  catch { return String(value) }
}

function formatCurrency(value: any): string {
  if (!value && value !== 0) return '—'
  const n = Number.parseFloat(String(value).replace(/[^0-9.-]/g, ''))
  if (Number.isNaN(n)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (['completed', 'complete', 'done', 'finished', 'approved', 'rcvd', 'yes'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'ongoing', 'started', 'open'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'waiting', 'hold', 'scheduled', 'tbd', 'new'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancelled', 'canceled', 'rejected', 'failed', 'n/a'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

function typeIcon(type: string): string {
  const t = (type || '').toLowerCase()
  if (t.includes('solar')) return 'i-lucide-sun'
  if (t.includes('battery') || t.includes('batt')) return 'i-lucide-battery-charging'
  if (t.includes('roof')) return 'i-lucide-home'
  if (t.includes('mpu')) return 'i-lucide-zap'
  return 'i-lucide-folder-kanban'
}

function typeColor(type: string): { bg: string, text: string } {
  const t = (type || '').toLowerCase()
  if (t.includes('solar')) return { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' }
  if (t.includes('battery')) return { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' }
  if (t.includes('roof')) return { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' }
  return { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' }
}

// ─── Computed sections ──────────────────────────────────────
const financialCards = computed(() => {
  if (!project.value) return []
  const p = project.value
  const price = Number.parseFloat(String(p['Project Price'] || '0').replace(/[^0-9.-]/g, '')) || 0
  const contract = Number.parseFloat(String(p['Contract Price'] || '0').replace(/[^0-9.-]/g, '')) || 0
  const net = Number.parseFloat(String(p['Project Net Amount'] || '0').replace(/[^0-9.-]/g, '')) || 0
  const margin = price > 0 ? ((price - contract) / price * 100).toFixed(1) : '0.0'
  return [
    { label: 'Project Price', value: formatCurrency(price), icon: 'i-lucide-banknote', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Contract Price', value: formatCurrency(contract), icon: 'i-lucide-file-text', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Net Amount', value: formatCurrency(net), icon: 'i-lucide-trending-up', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Margin', value: `${margin}%`, icon: 'i-lucide-percent', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ]
})

const teamMembers = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { role: 'Project Manager', email: p['Project Manager'], icon: 'i-lucide-user-cog' },
    { role: 'PM VA', email: p['Project Manager VA'], icon: 'i-lucide-user-check' },
    { role: 'Finance Manager', email: p['Finance Manager'], icon: 'i-lucide-wallet' },
    { role: 'Finance Manager VA', email: p['Finance Manager VA'], icon: 'i-lucide-calculator' },
    { role: 'Engineer', email: p.Engineer, icon: 'i-lucide-hard-hat' },
    { role: 'Permit Coordinator', email: p['Permit Coordinator'], icon: 'i-lucide-clipboard-check' },
    { role: 'Sales Rep', email: p['Sales Rep'], icon: 'i-lucide-badge-dollar-sign' },
  ].filter(m => m.email)
})

const equipmentInfo = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Project Equipment', value: p['Project Equipment'], icon: 'i-lucide-wrench' },
    { label: 'Panels Amount', value: p['Panels Amount'], icon: 'i-lucide-layout-grid' },
    { label: 'KW', value: p.KW, icon: 'i-lucide-zap' },
    { label: 'Watt', value: p.Watt, icon: 'i-lucide-gauge' },
    { label: 'Solar Equipment', value: p['Solar Equipment'], icon: 'i-lucide-sun' },
    { label: 'Inverter Type', value: p['Inverter Type'], icon: 'i-lucide-cpu' },
    { label: 'Batteries Qty', value: p['Batteries Qty'], icon: 'i-lucide-battery-charging' },
    { label: 'Utility', value: p.Utillity, icon: 'i-lucide-plug' },
    { label: 'Vendor', value: p['Vendor Name'], icon: 'i-lucide-building' },
  ].filter(e => e.value)
})

const timelineEvents = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Project Start', date: p['Project Start'], icon: 'i-lucide-play', color: 'bg-blue-500' },
    { label: 'PM Approved', date: p['PM Approve Project'], icon: 'i-lucide-check-circle', color: 'bg-emerald-500' },
    { label: 'Finance Ready', date: p['Finance Ready'], icon: 'i-lucide-wallet', color: 'bg-violet-500' },
    { label: 'PTO Request', date: p['PTO Request'], icon: 'i-lucide-file-plus', color: 'bg-amber-500' },
    { label: 'PTO Submitted', date: p['PTO Submitted'], icon: 'i-lucide-send', color: 'bg-pink-500' },
    { label: 'PTO Received', date: p['PTO Received'], icon: 'i-lucide-check-check', color: 'bg-emerald-500' },
    { label: 'Completion Date', date: p['Completion Date'], icon: 'i-lucide-flag', color: 'bg-cyan-500' },
    { label: 'Final Date', date: p['Final Date'], icon: 'i-lucide-trophy', color: 'bg-amber-500' },
    { label: 'Project End', date: p['Project End'], icon: 'i-lucide-square', color: 'bg-red-500' },
  ].filter(e => e.date).sort((a, b) => {
    const da = new Date(a.date?.value || a.date)
    const db = new Date(b.date?.value || b.date)
    return da.getTime() - db.getTime()
  })
})

const statusFields = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Job Status', value: p['Job Status'] },
    { label: 'Project Status', value: p['Project Status'] },
    { label: 'SSA Status', value: p['SSA Status'] },
    { label: 'Solar Install', value: p['Solar Install Status'] },
    { label: 'MPU Status', value: p['MPU Installed Status'] },
    { label: 'Battery Status', value: p['Battery Installed Status'] },
    { label: 'Completion', value: p['Completion Status'] },
    { label: 'Final Status', value: p['Final Status'] },
    { label: 'PTO Status', value: p['PTO Status'] },
    { label: 'Fire Approval', value: p['Fire Approval Needed'] },
  ].filter(s => s.value)
})

const overviewFields = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Branch', value: p['Branch Name'], icon: 'i-lucide-building-2' },
    { label: 'Project Type', value: p['Project Type'], icon: 'i-lucide-layers' },
    { label: 'AHJ', value: p.AHJ, icon: 'i-lucide-landmark' },
    { label: 'Jurisdiction', value: p.Jurisdiction, icon: 'i-lucide-scale' },
    { label: 'Created By', value: p['Create By'] ? resolveName(p['Create By']) : null, icon: 'i-lucide-user-plus' },
    { label: 'Created', value: formatDate(p.TimeStamp), icon: 'i-lucide-calendar-plus' },
  ].filter(f => f.value && f.value !== '—')
})

// ─── Chat helpers ───────────────────────────────────────────
interface ChatConversation {
  chatId: string
  head: string
  secondary: string
  users: string
  source: 'active' | 'closed'
  messages: any[]
  lastTime: Date
}

async function fetchProjectChats() {
  if (chatLoaded.value || chatLoading.value) return
  chatLoading.value = true
  try {
    const data = await $fetch<{ success: boolean, messages: any[] }>('/api/bigquery/project-chats', {
      params: { projectId: projectId.value },
    })
    if (data.success) {
      chatMessages.value = data.messages
    }
  }
  catch {
    toast.error('Failed to load chat messages')
  }
  finally {
    chatLoading.value = false
    chatLoaded.value = true
  }
}

// Lazy-load chat data when tab is clicked
watch(activeTab, (tab) => {
  if (tab === 'chat') fetchProjectChats()
})

const chatConversations = computed(() => {
  const map = new Map<string, ChatConversation>()
  for (const msg of chatMessages.value) {
    const chatId = msg.ChatID
    if (!chatId) continue
    const ts = msg.TimeStamp?.value || msg.TimeStamp
    const date = ts ? new Date(ts) : new Date(0)
    if (!map.has(chatId)) {
      map.set(chatId, {
        chatId,
        head: msg['Chat Head'] || '',
        secondary: msg.Secondary || '',
        users: msg.Users || '',
        source: msg._source || 'active',
        messages: [],
        lastTime: date,
      })
    }
    const conv = map.get(chatId)!
    conv.messages.push({ ...msg, _date: date })
    if (date > conv.lastTime) conv.lastTime = date
  }
  for (const conv of map.values()) {
    conv.messages.sort((a: any, b: any) => a._date.getTime() - b._date.getTime())
  }
  return Array.from(map.values()).sort((a, b) => b.lastTime.getTime() - a.lastTime.getTime())
})

const activeConversation = computed(() => {
  return chatConversations.value.find(c => c.chatId === activeChatId.value) || null
})

// Auto-select first conversation
watch(chatConversations, (convs) => {
  if (convs.length > 0 && !activeConversation.value) {
    activeChatId.value = convs[0]!.chatId
  }
}, { immediate: true })

function chatConvTitle(conv: ChatConversation): string {
  if (conv.head) return conv.head.replace(/^Chat room create by\s*/i, '').trim() || conv.head
  if (conv.secondary) return conv.secondary.split('(')[0]?.trim() || conv.secondary
  return 'Conversation'
}

function chatInitials(name: string): string {
  return name.split(/[\s@]/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const chatAvatarColors = [
  'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500',
]

function chatAvatarColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return chatAvatarColors[Math.abs(hash) % chatAvatarColors.length]!
}

function chatFormatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function chatFormatDate(date: Date): string {
  const today = new Date()
  if (date.toDateString() === today.toDateString()) return 'Today'
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function chatShowDateSep(msgs: any[], idx: number): boolean {
  if (idx === 0) return true
  return msgs[idx - 1]._date.toDateString() !== msgs[idx]._date.toDateString()
}

function chatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(diff / 3600000)
  if (hrs < 24) return `${hrs}h`
  const days = Math.floor(diff / 86400000)
  if (days < 7) return `${days}d`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' },
  { id: 'team', label: 'Team', icon: 'i-lucide-users' },
  { id: 'equipment', label: 'Equipment', icon: 'i-lucide-cpu' },
  { id: 'timeline', label: 'Timeline', icon: 'i-lucide-clock' },
  { id: 'statuses', label: 'Statuses', icon: 'i-lucide-activity' },
  { id: 'chat', label: 'Chat', icon: 'i-lucide-message-circle' },
]
</script>

<template>
  <ProjectsLayout>
    <div class="w-full flex-1 flex flex-col min-h-0">
      <!-- Teleport back button -->
      <Teleport v-if="isMounted" to="#header-toolbar">
        <div class="flex items-center gap-2 w-full justify-end">
          <Button variant="ghost" size="sm" class="h-8" @click="navigateTo('/projects/all-projects')">
            <Icon name="i-lucide-arrow-left" class="mr-1 size-3.5" />
            Back to Projects
          </Button>
        </div>
      </Teleport>

      <!-- Error -->
      <div v-if="error" class="flex-1 flex items-center justify-center">
        <Card class="border-destructive p-8 max-w-md">
          <div class="flex flex-col items-center gap-4 text-center">
            <div class="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Icon name="i-lucide-alert-triangle" class="size-8 text-destructive" />
            </div>
            <div>
              <p class="font-semibold text-lg">{{ error }}</p>
              <p class="text-sm text-muted-foreground mt-1">The project you're looking for might not exist.</p>
            </div>
            <div class="flex gap-2">
              <Button variant="outline" @click="navigateTo('/projects/all-projects')">
                <Icon name="i-lucide-arrow-left" class="mr-1 size-4" /> Go Back
              </Button>
              <Button @click="fetchProject">
                <Icon name="i-lucide-refresh-cw" class="mr-1 size-4" /> Retry
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Loading -->
      <div v-else-if="loading" class="flex-1 flex items-center justify-center">
        <div class="flex flex-col items-center gap-3">
          <Icon name="i-lucide-loader-2" class="size-8 animate-spin text-primary" />
          <p class="text-sm text-muted-foreground">Loading project details…</p>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="project" class="flex-1 min-h-0 overflow-auto">
        <div class="max-w-6xl mx-auto p-4 md:p-6 space-y-6">

          <!-- ═══ HERO HEADER ═══ -->
          <div class="relative rounded-2xl border bg-gradient-to-br from-card via-card to-muted/30 overflow-hidden">
            <!-- Decorative glow -->
            <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03]" :class="typeColor(project['Project Type']).text" style="background: currentColor; filter: blur(80px); transform: translate(30%, -40%)" />

            <div class="relative p-5 md:p-8">
              <div class="flex flex-col md:flex-row md:items-start gap-5">
                <!-- Left: Project icon + details -->
                <div class="flex items-start gap-4 flex-1 min-w-0">
                  <div class="size-14 rounded-2xl flex items-center justify-center shrink-0" :class="[typeColor(project['Project Type']).bg]">
                    <Icon :name="typeIcon(project['Project Type'])" class="size-7" :class="typeColor(project['Project Type']).text" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <h1 class="text-xl md:text-2xl font-bold tracking-tight">
                        {{ project['Project Type'] || 'Project' }}
                      </h1>
                      <Badge v-if="project['Project Status']" variant="outline" :class="statusColor(project['Project Status'])" class="text-xs">
                        {{ project['Project Status'] }}
                      </Badge>
                      <Badge v-if="project['Job Status']" variant="outline" :class="statusColor(project['Job Status'])" class="text-xs">
                        {{ project['Job Status'] }}
                      </Badge>
                    </div>
                    <p class="text-sm text-muted-foreground mt-1 font-mono">
                      {{ project['Project ID'] }}
                    </p>

                    <!-- Quick info chips -->
                    <div class="flex items-center gap-3 mt-3 flex-wrap">
                      <div v-if="project['Customer Address']" class="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="i-lucide-map-pin" class="size-3.5 text-rose-400" />
                        <span class="truncate max-w-[300px]">{{ project['Customer Address'] }}</span>
                      </div>
                      <div v-if="project['Branch Name']" class="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="i-lucide-building-2" class="size-3.5 text-blue-400" />
                        {{ project['Branch Name'] }}
                      </div>
                      <div v-if="project['Vendor Name']" class="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="i-lucide-hard-hat" class="size-3.5 text-amber-400" />
                        {{ project['Vendor Name'] }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Customer info card -->
                <div class="flex items-center gap-3 p-3 rounded-xl border bg-background/60 backdrop-blur-sm shrink-0">
                  <Avatar class="size-10 border-2" :class="statusColor(project['Project Status']).replace('bg-', 'border-').split(' ')[0]">
                    <AvatarFallback class="text-sm font-semibold bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-700 dark:text-blue-300">
                      {{ customerInitials() }}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="text-sm font-semibold">{{ resolveCustomer() }}</p>
                    <p v-if="project['Customer Email']" class="text-[11px] text-muted-foreground">{{ project['Customer Email'] }}</p>
                    <p v-if="project['Customer Phone']" class="text-[11px] text-muted-foreground">{{ project['Customer Phone'] }}</p>
                  </div>
                </div>
              </div>

              <!-- Drive link -->
              <div v-if="project['Project Folder']" class="mt-4 pt-4 border-t flex items-center gap-2">
                <a
                  :href="project['Project Folder']"
                  target="_blank"
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-[#1da462]/10 border border-transparent hover:border-[#1da462]/20"
                >
                  <svg class="size-4" viewBox="0 0 24 24" fill="none">
                    <path d="M4.5 19.5l3-5.25H21l-3 5.25H4.5z" fill="#1da462" opacity=".7" />
                    <path d="M12 4.5L4.5 17.25l3 2.25L15 7.5 12 4.5z" fill="#1da462" opacity=".85" />
                    <path d="M21 15l-4.5-7.5L13.5 9l4.5 7.5L21 15z" fill="#1da462" />
                  </svg>
                  Open Project Folder
                  <Icon name="i-lucide-external-link" class="size-3 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          <!-- ═══ FINANCIAL KPI CARDS ═══ -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card v-for="kpi in financialCards" :key="kpi.label">
              <CardContent class="p-4 flex items-center gap-3">
                <div class="flex items-center justify-center size-10 rounded-xl shrink-0" :class="kpi.bg">
                  <Icon :name="kpi.icon" class="size-5" :class="kpi.color" />
                </div>
                <div class="min-w-0">
                  <p class="text-lg font-bold tabular-nums leading-tight truncate">{{ kpi.value }}</p>
                  <p class="text-[10px] text-muted-foreground mt-0.5">{{ kpi.label }}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- ═══ TAB NAVIGATION ═══ -->
          <div class="flex items-center gap-1 border rounded-lg p-1 bg-muted/30 w-fit">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="activeTab === tab.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
              @click="activeTab = tab.id"
            >
              <Icon :name="tab.icon" class="size-3.5" />
              {{ tab.label }}
            </button>
          </div>

          <!-- ═══ TAB CONTENT ═══ -->

          <!-- OVERVIEW TAB -->
          <template v-if="activeTab === 'overview'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Project Details -->
              <Card>
                <CardHeader class="pb-3">
                  <CardTitle class="text-sm font-semibold flex items-center gap-2">
                    <Icon name="i-lucide-info" class="size-4 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent class="space-y-3">
                  <div v-for="field in overviewFields" :key="field.label" class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <div class="flex items-center justify-center size-8 rounded-lg bg-muted shrink-0">
                      <Icon :name="field.icon" class="size-3.5 text-muted-foreground" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{{ field.label }}</p>
                      <p class="text-sm font-medium truncate">{{ field.value }}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <!-- Status Overview -->
              <Card>
                <CardHeader class="pb-3">
                  <CardTitle class="text-sm font-semibold flex items-center gap-2">
                    <Icon name="i-lucide-activity" class="size-4 text-primary" />
                    Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-2 gap-2">
                    <div v-for="status in statusFields" :key="status.label" class="p-2.5 rounded-lg border">
                      <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1.5">{{ status.label }}</p>
                      <Badge variant="outline" :class="statusColor(status.value)" class="text-[10px]">
                        {{ status.value }}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </template>

          <!-- TEAM TAB -->
          <template v-if="activeTab === 'team'">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Card v-for="member in teamMembers" :key="member.role" class="group hover:shadow-md transition-all">
                <CardContent class="p-4 flex items-center gap-3">
                  <Avatar class="size-10 border shrink-0">
                    <AvatarFallback class="text-xs font-medium bg-gradient-to-br from-primary/10 to-primary/5">
                      {{ resolveName(member.email).substring(0, 2).toUpperCase() }}
                    </AvatarFallback>
                  </Avatar>
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold truncate">{{ resolveName(member.email) }}</p>
                    <p class="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Icon :name="member.icon" class="size-3" />
                      {{ member.role }}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div v-if="teamMembers.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="i-lucide-users" class="size-10 text-muted-foreground/30 mb-3" />
              <p class="text-sm text-muted-foreground">No team members assigned</p>
            </div>
          </template>

          <!-- EQUIPMENT TAB -->
          <template v-if="activeTab === 'equipment'">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-for="item in equipmentInfo" :key="item.label" class="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-all">
                <div class="flex items-center justify-center size-10 rounded-xl bg-primary/5 shrink-0">
                  <Icon :name="item.icon" class="size-5 text-primary" />
                </div>
                <div class="min-w-0">
                  <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{{ item.label }}</p>
                  <p class="text-sm font-semibold truncate">{{ item.value }}</p>
                </div>
              </div>
            </div>
            <div v-if="equipmentInfo.length === 0" class="flex flex-col items-center justify-center py-12 text-center">
              <Icon name="i-lucide-cpu" class="size-10 text-muted-foreground/30 mb-3" />
              <p class="text-sm text-muted-foreground">No equipment information</p>
            </div>
          </template>

          <!-- TIMELINE TAB -->
          <template v-if="activeTab === 'timeline'">
            <Card>
              <CardContent class="p-6">
                <div v-if="timelineEvents.length > 0" class="relative">
                  <!-- Vertical line -->
                  <div class="absolute left-[19px] top-3 bottom-3 w-[2px] bg-border" />

                  <div v-for="(evt, idx) in timelineEvents" :key="evt.label" class="relative flex items-start gap-4 pb-6 last:pb-0">
                    <!-- Dot -->
                    <div class="relative z-10">
                      <div class="size-10 rounded-full border-2 border-background flex items-center justify-center" :class="evt.color">
                        <Icon :name="evt.icon" class="size-4 text-white" />
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0 pt-1.5">
                      <div class="flex items-center justify-between gap-2">
                        <p class="text-sm font-semibold">{{ evt.label }}</p>
                        <Badge variant="outline" class="text-[10px] tabular-nums shrink-0">
                          {{ formatDate(evt.date) }}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center py-12 text-center">
                  <Icon name="i-lucide-clock" class="size-10 text-muted-foreground/30 mb-3" />
                  <p class="text-sm text-muted-foreground">No timeline events</p>
                </div>
              </CardContent>
            </Card>
          </template>

          <!-- STATUSES TAB -->
          <template v-if="activeTab === 'statuses'">
            <Card>
              <CardContent class="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status Field</TableHead>
                      <TableHead>Current Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="status in statusFields" :key="status.label">
                      <TableCell class="font-medium text-sm">{{ status.label }}</TableCell>
                      <TableCell>
                        <Badge variant="outline" :class="statusColor(status.value)" class="text-xs">
                          {{ status.value }}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow v-if="statusFields.length === 0">
                      <TableCell colspan="2" class="h-32 text-center text-muted-foreground">
                        No status information available
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </template>

          <!-- CHAT TAB -->
          <template v-if="activeTab === 'chat'">
            <!-- Loading -->
            <div v-if="chatLoading" class="flex flex-col items-center justify-center py-12 gap-2">
              <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
              <p class="text-xs text-muted-foreground">Loading chat messages…</p>
            </div>

            <!-- No chats -->
            <div v-else-if="chatConversations.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
              <div class="size-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
                <Icon name="i-lucide-message-circle" class="size-7 text-muted-foreground/40" />
              </div>
              <p class="text-sm font-medium text-muted-foreground">No chat messages</p>
              <p class="text-xs text-muted-foreground/60 mt-1">No conversations found for this project</p>
            </div>

            <!-- Chat UI -->
            <div v-else class="flex gap-4 min-h-[500px]">
              <!-- Conversation List -->
              <Card class="w-[260px] shrink-0 flex flex-col overflow-hidden">
                <CardHeader class="pb-2 px-3 pt-3">
                  <CardTitle class="text-xs font-semibold flex items-center gap-1.5">
                    <Icon name="i-lucide-message-circle" class="size-3.5 text-primary" />
                    Threads
                    <Badge variant="outline" class="text-[9px] ml-auto">{{ chatConversations.length }}</Badge>
                  </CardTitle>
                </CardHeader>
                <div class="flex-1 overflow-y-auto">
                  <div
                    v-for="conv in chatConversations"
                    :key="conv.chatId"
                    class="px-3 py-2.5 cursor-pointer border-b border-border/20 transition-all duration-200"
                    :class="activeChatId === conv.chatId
                      ? 'bg-primary/8 border-l-2 border-l-primary'
                      : 'hover:bg-muted/40 border-l-2 border-l-transparent'"
                    @click="activeChatId = conv.chatId"
                  >
                    <div class="flex items-center gap-2">
                      <Avatar class="size-7 shrink-0">
                        <AvatarFallback
                          :class="chatAvatarColor(conv.chatId)"
                          class="text-[8px] font-bold text-white"
                        >
                          {{ chatInitials(chatConvTitle(conv)) }}
                        </AvatarFallback>
                      </Avatar>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                          <span class="text-[11px] font-semibold truncate max-w-[130px]">{{ chatConvTitle(conv) }}</span>
                          <span class="text-[9px] text-muted-foreground shrink-0 ml-1">{{ chatRelativeTime(conv.lastTime) }}</span>
                        </div>
                        <p class="text-[10px] text-muted-foreground truncate">{{ conv.messages.length }} messages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <!-- Messages -->
              <Card class="flex-1 flex flex-col overflow-hidden">
                <template v-if="activeConversation">
                  <!-- Header -->
                  <CardHeader class="pb-2 border-b">
                    <div class="flex items-center justify-between">
                      <CardTitle class="text-sm font-semibold flex items-center gap-2">
                        {{ chatConvTitle(activeConversation) }}
                        <Badge variant="outline" class="text-[9px]" :class="activeConversation.source === 'active' ? 'text-emerald-600 border-emerald-500/30 bg-emerald-500/10' : 'text-zinc-500 border-zinc-400/30 bg-zinc-400/10'">
                          {{ activeConversation.source === 'active' ? 'Active' : 'Closed' }}
                        </Badge>
                      </CardTitle>
                      <span class="text-[10px] text-muted-foreground">{{ activeConversation.messages.length }} messages</span>
                    </div>
                    <!-- Participants -->
                    <div v-if="activeConversation.users" class="flex items-center gap-1 mt-1 flex-wrap">
                      <Badge
                        v-for="email in activeConversation.users.split(',').map(e => e.trim()).filter(Boolean).slice(0, 6)"
                        :key="email"
                        variant="outline"
                        class="text-[8px] py-0 h-3.5"
                      >
                        {{ resolveName(email) }}
                      </Badge>
                      <span
                        v-if="activeConversation.users.split(',').filter(Boolean).length > 6"
                        class="text-[8px] text-muted-foreground"
                      >
                        +{{ activeConversation.users.split(',').filter(Boolean).length - 6 }} more
                      </span>
                    </div>
                  </CardHeader>

                  <!-- Message list -->
                  <CardContent class="flex-1 overflow-y-auto p-4 space-y-1">
                    <template v-for="(msg, idx) in activeConversation.messages" :key="msg.MessageID || idx">
                      <!-- Date separator -->
                      <div v-if="chatShowDateSep(activeConversation.messages, idx)" class="flex items-center justify-center py-2">
                        <span class="px-2.5 py-0.5 text-[9px] font-semibold text-muted-foreground bg-muted/60 rounded-full border border-border/30 uppercase tracking-wider">
                          {{ chatFormatDate(msg._date) }}
                        </span>
                      </div>

                      <!-- Message -->
                      <div class="flex items-start gap-2">
                        <div v-if="idx === 0 || activeConversation.messages[idx - 1]?.Email !== msg.Email" class="shrink-0 mt-0.5">
                          <Avatar class="size-6">
                            <AvatarFallback
                              :class="chatAvatarColor(msg.Email || '')"
                              class="text-[7px] font-bold text-white"
                            >
                              {{ chatInitials(resolveName(msg.Email)) }}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div v-else class="w-6 shrink-0" />

                        <div class="max-w-[75%]">
                          <div
                            v-if="idx === 0 || activeConversation.messages[idx - 1]?.Email !== msg.Email"
                            class="pl-0.5 pb-0.5 flex items-center gap-1.5"
                          >
                            <span class="text-[10px] font-semibold">{{ resolveName(msg.Email) }}</span>
                          </div>
                          <div class="rounded-xl px-3 py-1.5 text-xs leading-relaxed bg-muted/70 border border-border/30 rounded-bl-sm">
                            <!-- Attachment -->
                            <div v-if="msg.Attachment" class="flex items-center gap-1.5 mb-1">
                              <Icon name="lucide:paperclip" class="size-3 text-primary" />
                              <a
                                v-if="msg.Attachment.startsWith('http')"
                                :href="msg.Attachment"
                                target="_blank"
                                class="text-[10px] text-primary underline truncate max-w-[180px]"
                              >
                                Attachment
                              </a>
                              <span v-else class="text-[10px] text-muted-foreground truncate">{{ msg.Attachment }}</span>
                            </div>
                            <template v-if="msg.Chat">{{ msg.Chat }}</template>
                            <div class="flex items-center justify-end mt-0.5 -mb-0.5">
                              <span class="text-[8px] text-muted-foreground/50">{{ chatFormatTime(msg._date) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </CardContent>
                </template>
              </Card>
            </div>
          </template>

        </div>
      </div>
    </div>
  </ProjectsLayout>
</template>
