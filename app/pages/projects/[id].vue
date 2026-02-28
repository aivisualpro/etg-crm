<script setup lang="ts">
import { toast } from 'vue-sonner'

const route = useRoute()
const router = useRouter()
const projectId = computed(() => route.params.id as string)

const { setHeader } = usePageHeader()
setHeader({ title: '', icon: '' })

// ─── Navigation ─────────────────────────────────────────────
function goBack() {
  // Store project ID so the list page can highlight & scroll to it
  sessionStorage.setItem('highlight-project', projectId.value)
  router.back()
}
// ─── State ──────────────────────────────────────────────────
const { user: authUser } = useAuth()
const currentEmail = computed(() => (authUser.value?.email || '').toLowerCase())

function isChatCurrentUser(email: string): boolean {
  if (!email || !currentEmail.value) return false
  return email.toLowerCase() === currentEmail.value
}

// Use global prefetched store — instant data, no loading
const store = useDashboardStore()
store.init()

const isMounted = ref(false)
const globalSearch = ref('')
const showFilesModal = ref(false)
onMounted(() => { isMounted.value = true })

// Project from store
const project = computed(() => store.projectMap.value?.[projectId.value] || null)
const loading = computed(() => !store.ready.value)
const error = computed(() => store.ready.value && !project.value ? 'Project not found' : '')

// Lookups from store
const userNameMap = computed(() => ({ ...store.userNameMap.value }))
const customerNameMap = computed(() => ({ ...store.customerNameMap.value }))
const salesRepMap = computed(() => {
  return Object.fromEntries(
    (store.salesReps.value || []).filter((r: any) => r['Row ID']).map((r: any) => [
      r['Row ID'],
      [r['First Name'], r['Last Name']].filter(Boolean).join(' ') || r['Row ID'],
    ]),
  )
})

// Project-specific data from store (filtered)
const projectEvents = computed(() =>
  (store.events.value || []).filter((e: any) => e['Project ID'] === projectId.value),
)
const financeRecords = computed(() =>
  (store.finance.value || []).filter((f: any) => f['Project ID'] === projectId.value),
)
const projectNotes = computed(() =>
  (store.notes.value || []).filter((n: any) => n.ProjectId === projectId.value || n['Project ID'] === projectId.value),
)
const projectPermits = computed(() =>
  (store.permits.value || []).filter((p: any) => p['Project ID'] === projectId.value),
)
const projectPayments = computed(() =>
  (store.payments.value || []).filter((p: any) => p['Project ID'] === projectId.value),
)

// Chat — project-specific, still fetched on demand (not in store)
const chatMessages = ref<any[]>([])
const chatLoading = ref(false)
const chatLoaded = ref(false)
const activeChatId = ref('')

async function fetchChats() {
  if (chatLoaded.value || chatLoading.value) return
  chatLoading.value = true
  try {
    const data = await $fetch<{ success: boolean, messages: any[] }>('/api/bigquery/project-chats', { params: { projectId: projectId.value } })
    if (data.success) chatMessages.value = data.messages
  }
  catch { toast.error('Failed to load chats') }
  finally { chatLoading.value = false; chatLoaded.value = true }
}

onMounted(() => { fetchChats() })

// ─── Header computed ────────────────────────────────────────
const customerName = computed(() => {
  if (!project.value) return ''
  const custId = project.value['Customer ID']
  return customerNameMap.value[custId] || project.value['Customer name'] || '—'
})

const customerAddress = computed(() => project.value?.['Customer Address'] || '')
const projectStatus = computed(() => project.value?.['Project Status'] || '')
const jobStatuses = computed(() => {
  const val = project.value?.['Job Status'] || ''
  return val.split(',').map((s: string) => s.trim()).filter(Boolean)
})

// ─── Helpers ────────────────────────────────────────────────
function resolveName(email: string): string {
  if (!email) return '—'
  return userNameMap.value[email.toLowerCase()] || email
}

function resolveSalesRep(id: string): string {
  if (!id) return '—'
  return salesRepMap.value[id] || id
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
  if (['completed', 'complete', 'done', 'approved', 'rcvd', 'yes'].some(k => s.includes(k)))
    return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'
  if (['in progress', 'active', 'ongoing', 'open'].some(k => s.includes(k)))
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'
  if (['pending', 'waiting', 'hold', 'scheduled', 'tbd', 'new'].some(k => s.includes(k)))
    return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
  if (['cancelled', 'canceled', 'rejected', 'failed'].some(k => s.includes(k)))
    return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
  return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
}

// ─── Title Case Helper ───────────────────────────────────────
// Capitalizes first letter of every word, including after hyphens
function toTitleCase(val: string | undefined | null): string {
  if (!val) return val ?? ''
  return String(val).toLowerCase().replace(/(?:^|[\s-])\w/g, c => c.toUpperCase())
}

// ─── Project Info Fields ────────────────────────────────────
const projectInfoFields = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Customer Name',      value: toTitleCase(p['Customer name']) },
    { label: 'Customer Email',     value: p['Customer Email'] },
    { label: 'Customer Phone',     value: p['Customer Phone'] },
    { label: 'Branch Name',        value: toTitleCase(p['Branch Name']) },
    { label: 'Vendor',             value: toTitleCase(p['Vendor Name']) },
    { label: 'Project Type',       value: toTitleCase(p['Project Type']) },
    { label: 'Project Manager',    value: toTitleCase(resolveName(p['Project Manager'])) },
    { label: 'Project Manager VA', value: toTitleCase(resolveName(p['Project Manager VA'])) },
    { label: 'Finance Manager',    value: toTitleCase(resolveName(p['Finance Manager'])) },
    { label: 'Finance Manager VA', value: toTitleCase(resolveName(p['Finance Manager VA'])) },
    { label: 'Engineer',           value: toTitleCase(resolveName(p.Engineer)) },
    { label: 'Permit Coordinator', value: toTitleCase(resolveName(p['Permit Coordinator'])) },
    { label: 'Sales Rep',          value: toTitleCase(resolveSalesRep(p['Sales Rep'])) },
    { label: 'Fire Approval',      value: toTitleCase(p['Fire Approval Needed']) },
    { label: 'Permits Status',     value: p['PTO Status'] },
    { label: 'Contract Sign',      value: formatDate(p['Project Start']) },
    { label: 'Project Price',      value: formatCurrency(p['Project Price']) },
    { label: 'Project Fees',       value: formatCurrency(p['Contract Price']) },
    { label: 'Project Net Amount', value: formatCurrency(p['Project Net Amount']) },
  ].filter(f => f.value && f.value !== '—')
})


// ─── Production Info Fields ─────────────────────────────────
const productionFields = computed(() => {
  if (!project.value) return []
  const p = project.value
  return [
    { label: 'Project Status', value: p['Project Status'], isStatus: true },
    { label: 'Project Equipment', value: p['Project Equipment'] },
    { label: 'Solar Equipment', value: p['Solar Equipment'] },
    { label: 'Panels Amount', value: p['Panels Amount'] },
    { label: 'KW', value: p.KW },
    { label: 'Watt', value: p.Watt },
    { label: 'Inverter Type', value: p['Inverter Type'] },
    { label: 'Batteries Qty', value: p['Batteries Qty'] },
    { label: 'SSA Status', value: p['SSA Status'], isStatus: true },
    { label: 'Solar Install', value: p['Solar Install Status'], isStatus: true },
    { label: 'MPU Status', value: p['MPU Installed Status'], isStatus: true },
    { label: 'Battery Status', value: p['Battery Installed Status'], isStatus: true },
    { label: 'Completion', value: p['Completion Status'], isStatus: true },
    { label: 'Final Status', value: p['Final Status'], isStatus: true },
    { label: 'PTO Status', value: p['PTO Status'], isStatus: true },
  ].filter(f => f.value)
})

// ─── Chat Conversations ─────────────────────────────────────
interface ChatConvo { chatId: string; head: string; users: string; source: string; messages: any[]; lastTime: Date }
const chatConversations = computed(() => {
  const map = new Map<string, ChatConvo>()
  for (const msg of chatMessages.value) {
    const chatId = msg.ChatID
    if (!chatId) continue
    const ts = msg.TimeStamp?.value || msg.TimeStamp
    const date = ts ? new Date(ts) : new Date(0)
    if (!map.has(chatId)) map.set(chatId, { chatId, head: msg['Chat Head'] || '', users: msg.Users || '', source: msg._source || 'active', messages: [], lastTime: date })
    const conv = map.get(chatId)!
    conv.messages.push({ ...msg, _date: date })
    if (date > conv.lastTime) conv.lastTime = date
  }
  for (const conv of map.values()) conv.messages.sort((a: any, b: any) => a._date.getTime() - b._date.getTime())
  return Array.from(map.values()).sort((a, b) => b.lastTime.getTime() - a.lastTime.getTime())
})
const activeConversation = computed(() => chatConversations.value.find(c => c.chatId === activeChatId.value) || null)
watch(chatConversations, (convs) => { if (convs.length > 0 && !activeConversation.value) activeChatId.value = convs[0]!.chatId }, { immediate: true })

function chatTitle(conv: ChatConvo): string { return conv.head ? conv.head.replace(/^Chat room create by\s*/i, '').trim() || conv.head : 'Conversation' }
function chatFormatTime(date: Date): string { return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }
function chatFormatDate(date: Date): string {
  const today = new Date()
  if (date.toDateString() === today.toDateString()) return 'Today'
  const y = new Date(today); y.setDate(y.getDate() - 1)
  if (date.toDateString() === y.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function chatShowDateSep(msgs: any[], idx: number): boolean { return idx === 0 || msgs[idx - 1]._date.toDateString() !== msgs[idx]._date.toDateString() }
const chatColors = ['bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500']

// All messages flat (sorted oldest first) for the bubble view
const allChatMessagesSorted = computed(() => {
  const all: any[] = []
  for (const conv of chatConversations.value) {
    all.push(...conv.messages)
  }
  return all.sort((a, b) => a._date.getTime() - b._date.getTime())
})

// People filter for chat card
const chatPersonFilter = ref('')
const chatCardPeople = computed(() => {
  const emailSet = new Set<string>()
  for (const msg of allChatMessagesSorted.value) {
    if (msg.Email) emailSet.add(msg.Email.trim().toLowerCase())
    if (msg.tag) {
      for (const e of msg.tag.split(',')) {
        const t = e.trim().toLowerCase()
        if (t) emailSet.add(t)
      }
    }
  }
  return Array.from(emailSet).sort((a, b) => resolveName(a).localeCompare(resolveName(b)))
})

const filteredChatMessages = computed(() => {
  if (!chatPersonFilter.value) return allChatMessagesSorted.value
  const p = chatPersonFilter.value.toLowerCase()
  return allChatMessagesSorted.value.filter(m => {
    if ((m.Email || '').toLowerCase() === p) return true
    if (m.tag) {
      const tags = m.tag.split(',').map((e: string) => e.trim().toLowerCase())
      if (tags.includes(p)) return true
    }
    return false
  })
})

// Compose for chat card
const chatCardMessage = ref('')
const chatCardSending = ref(false)
const chatCardAreaRef = ref<HTMLElement | null>(null)

async function chatCardSend() {
  if (!chatCardMessage.value.trim() || chatCardSending.value) return
  chatCardSending.value = true
  try {
    await $fetch('/api/bigquery/send-chat', {
      method: 'POST',
      body: {
        projectId: projectId.value,
        email: authUser.value?.email || '',
        message: chatCardMessage.value.trim(),
        chatId: projectId.value,
        users: chatCardPeople.value.join(','),
      },
    })
    const now = new Date()
    chatMessages.value.push({
      MessageID: `temp-${Date.now()}`,
      ChatID: projectId.value,
      'Project ID': projectId.value,
      Email: authUser.value?.email || '',
      Chat: chatCardMessage.value.trim(),
      TimeStamp: { value: now.toISOString() },
      _source: 'active',
    })
    chatCardMessage.value = ''
    nextTick(() => {
      if (chatCardAreaRef.value) chatCardAreaRef.value.scrollTop = chatCardAreaRef.value.scrollHeight
    })
  }
  catch { toast.error('Failed to send message') }
  finally { chatCardSending.value = false }
}

function eventStatusIcon(status: string): string {
  const s = (status || '').toLowerCase()
  if (s.includes('completed') || s.includes('done')) return 'i-lucide-check-circle'
  if (s.includes('confirmed')) return 'i-lucide-calendar-check'
  if (s.includes('cancelled')) return 'i-lucide-x-circle'
  return 'i-lucide-clock'
}

// ─── Fixed Grid Card Definitions ────────────────────────────
interface CardDef {
  id: string; title: string; icon: string; accent: string; color: string
}
// Bento: 3 rows of [25%, 25%, 50%]
// color = CSS color used for border accent (works in both light and dark mode)
const gridRows: [CardDef, CardDef, CardDef][] = [
  [
    { id: 'project-info',    title: 'Project Info',    icon: 'i-lucide-info',            accent: 'from-blue-500 to-indigo-500',   color: '#6366f1' },
    { id: 'production-info', title: 'Production Info', icon: 'i-lucide-cpu',             accent: 'from-amber-500 to-orange-500', color: '#f59e0b' },
    { id: 'project-finance', title: 'Project Finance', icon: 'i-lucide-banknote',        accent: 'from-emerald-500 to-teal-500', color: '#10b981' },
  ],
  [
    { id: 'documents',       title: 'Documents',       icon: 'i-lucide-file-text',       accent: 'from-violet-500 to-purple-500', color: '#8b5cf6' },
    { id: 'permits',         title: 'Permits',         icon: 'i-lucide-clipboard-check', accent: 'from-lime-500 to-green-500',   color: '#84cc16' },
    { id: 'payments',        title: 'Payments',        icon: 'i-lucide-credit-card',     accent: 'from-pink-500 to-rose-500',   color: '#f43f5e' },
  ],
  [
    { id: 'notes',           title: 'Notes',           icon: 'i-lucide-sticky-note',     accent: 'from-yellow-500 to-amber-500', color: '#eab308' },
    { id: 'events',          title: 'Events',          icon: 'i-lucide-calendar-days',   accent: 'from-fuchsia-500 to-pink-500', color: '#d946ef' },
    { id: 'chat-room',       title: 'Chat Room',       icon: 'i-lucide-message-circle',  accent: 'from-sky-500 to-cyan-500',    color: '#0ea5e9' },
  ],
]


// ─── Global Search ──────────────────────────────────────────
function highlightText(text: string): string {
  if (!globalSearch.value.trim() || !text) return text
  const q = globalSearch.value.trim()
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return String(text).replace(regex, '<mark class="search-highlight">$1</mark>')
}

function textMatches(text: string): boolean {
  if (!globalSearch.value.trim() || !text) return false
  return String(text).toLowerCase().includes(globalSearch.value.trim().toLowerCase())
}

function cardHasMatch(cardId: string): boolean {
  const q = globalSearch.value.trim().toLowerCase()
  if (!q) return false

  if (cardId === 'project-info') {
    return projectInfoFields.value.some(f => textMatches(f.label) || textMatches(f.value))
  }
  if (cardId === 'production-info') {
    return productionFields.value.some(f => textMatches(f.label) || textMatches(f.value))
  }
  if (cardId === 'project-finance') {
    return financeRecords.value.some((r: any) =>
      Object.values(r).some(v => textMatches(String(v ?? '')))
    )
  }
  if (cardId === 'chat-room') {
    return chatMessages.value.some((msg: any) =>
      textMatches(msg.Chat) || textMatches(msg.Email) || textMatches(resolveName(msg.Email))
    )
  }
  if (cardId === 'notes') {
    return projectNotes.value.some((n: any) =>
      textMatches(n.Note) || textMatches(n['Note Category']) || textMatches(n['Create By'])
    )
  }
  if (cardId === 'events') {
    return projectEvents.value.some((evt: any) =>
      textMatches(evt['Event Type']) || textMatches(evt['Event Description']) || textMatches(evt['Event Status'])
    )
  }
  if (cardId === 'permits') {
    return projectPermits.value.some((p: any) =>
      textMatches(p['Permit Type']) || textMatches(p['Permit Status']) || textMatches(p['Permit Number']) || textMatches(p['Permit Note'])
    )
  }
  return false
}
</script>

<template>
  <ProjectsLayout hide-sidebar>
    <div class="w-full flex-1 flex flex-col min-h-0">
      <!-- Teleport custom header content -->
      <Teleport v-if="isMounted && project" to="#header-toolbar">
        <div class="flex items-center gap-2 w-full overflow-hidden">
          <!-- Rich header info -->
          <div class="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto scrollbar-none">
            <button class="shrink-0 size-7 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors" @click="goBack">
              <Icon name="i-lucide-arrow-left" class="size-3.5 text-muted-foreground" />
            </button>
            <Separator orientation="vertical" class="h-4 shrink-0" />
            <span class="text-sm font-semibold truncate shrink-0">{{ customerName }}</span>
            <span class="text-muted-foreground text-xs shrink-0">/</span>
            <span v-if="customerAddress" class="text-xs text-muted-foreground truncate max-w-[200px] shrink-0">{{ customerAddress }}</span>
            <span v-if="customerAddress" class="text-muted-foreground text-xs shrink-0">/</span>
            <span class="text-xs font-mono text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10 shrink-0">{{ project['Project ID'] }}</span>
            <span class="text-muted-foreground text-xs shrink-0">/</span>
            <Badge v-if="projectStatus" variant="outline" :class="statusColor(projectStatus)" class="text-[10px] shrink-0">{{ projectStatus }}</Badge>
            <template v-for="js in jobStatuses" :key="js">
              <Badge variant="outline" :class="statusColor(js)" class="text-[10px] shrink-0">{{ js }}</Badge>
            </template>
          </div>
          <!-- Global Search -->
          <div class="relative shrink-0 ml-2">
            <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50 pointer-events-none" />
            <input
              v-model="globalSearch"
              placeholder="Search cards…"
              class="global-search-input"
            />
            <button
              v-if="globalSearch"
              class="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-muted-foreground/15 flex items-center justify-center hover:bg-muted-foreground/25 transition-colors"
              @click="globalSearch = ''"
            >
              <Icon name="i-lucide-x" class="size-2" />
            </button>
          </div>
        </div>
      </Teleport>

      <!-- Error -->
      <div v-if="error" class="flex-1 flex items-center justify-center">
        <Card class="border-destructive p-8 max-w-md">
          <div class="flex flex-col items-center gap-4 text-center">
            <div class="size-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Icon name="i-lucide-alert-triangle" class="size-8 text-destructive" />
            </div>
            <p class="font-semibold text-lg">{{ error }}</p>
            <div class="flex gap-2">
              <Button variant="outline" @click="goBack"><Icon name="i-lucide-arrow-left" class="mr-1 size-4" /> Go Back</Button>
              <Button @click="store.refresh"><Icon name="i-lucide-refresh-cw" class="mr-1 size-4" /> Retry</Button>
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
      <div v-else-if="project" class="flex-1 min-h-0 flex flex-col overflow-hidden">
        <!-- Sub-header Action Bar -->
        <div class="sticky top-0 z-10 border-b" style="background: linear-gradient(135deg, hsl(var(--primary) / 0.03), hsl(var(--background) / 0.9)); backdrop-filter: blur(12px); border-color: hsl(var(--primary) / 0.08);">
          <div class="flex items-center gap-1.5 px-4 py-2 overflow-x-auto scrollbar-none">
            <button
              class="action-btn action-btn-danger"
              title="Delete Project"
              @click="toast.info('Delete: set TempDeleted=true')"
            >
              <Icon name="i-lucide-trash-2" class="size-3.5" />
              <span>Delete</span>
            </button>
            <button
              class="action-btn"
              title="Edit Project"
              @click="toast.info('Edit Project – coming soon')"
            >
              <Icon name="i-lucide-pencil" class="size-3.5" />
              <span>Edit Project</span>
            </button>
            <div class="w-px h-5 mx-0.5 shrink-0" style="background: hsl(var(--primary) / 0.1);" />
            <button
              class="action-btn"
              title="Add Event"
              @click="toast.info('Add Event – coming soon')"
            >
              <Icon name="i-lucide-calendar-plus" class="size-3.5" />
              <span>Add Event</span>
            </button>
            <button
              class="action-btn"
              title="Add Notes"
              @click="toast.info('Add Notes – coming soon')"
            >
              <Icon name="i-lucide-sticky-note" class="size-3.5" />
              <span>Add Notes</span>
            </button>
            <button
              class="action-btn"
              title="Add Chat"
              @click="toast.info('Add Chat – coming soon')"
            >
              <Icon name="i-lucide-message-circle-plus" class="size-3.5" />
              <span>Add Chat</span>
            </button>
            <div class="w-px h-5 mx-0.5 shrink-0" style="background: hsl(var(--primary) / 0.1);" />
            <button
              class="action-btn"
              title="Project Status"
              @click="toast.info('Project Status – coming soon')"
            >
              <Icon name="i-lucide-signal" class="size-3.5" />
              <span>Project Status</span>
            </button>
            <button
              class="action-btn"
              title="New Payment"
              @click="toast.info('New Payment – coming soon')"
            >
              <Icon name="i-lucide-credit-card" class="size-3.5" />
              <span>New Payment</span>
            </button>
            <button
              class="action-btn"
              title="Add Finance"
              @click="toast.info('Add Finance – coming soon')"
            >
              <Icon name="i-lucide-banknote" class="size-3.5" />
              <span>Add Finance</span>
            </button>
            <div class="w-px h-5 mx-0.5 shrink-0" style="background: hsl(var(--primary) / 0.1);" />
            <button
              class="action-btn"
              title="Add Permit"
              @click="toast.info('Add Permit – coming soon')"
            >
              <Icon name="i-lucide-stamp" class="size-3.5" />
              <span>Add Permit</span>
            </button>
            <button
              class="action-btn"
              title="Add Document"
              @click="toast.info('Add Document – coming soon')"
            >
              <Icon name="i-lucide-file-plus" class="size-3.5" />
              <span>Add Document</span>
            </button>
            <button
              class="action-btn"
              title="Project Folder"
              @click="showFilesModal = true"
            >
              <Icon name="i-lucide-folder-open" class="size-3.5" />
              <span>Project Folder</span>
            </button>
          </div>
        </div>

        <div class="flex-1 min-h-0 overflow-hidden p-2" style="zoom: 0.82;">

          <!-- ═══ BENTO GRID ═══ -->
          <div class="dashboard-grid">

            <!-- ① Project Info — spans all 3 rows left -->
            <div class="dashboard-card bento-proj-info" :style="{ '--card-color': '#6366f1' }" :class="{ 'has-search-match': cardHasMatch('project-info'), 'no-search-match': globalSearch.trim() && !cardHasMatch('project-info') }">
              <div class="card-inner">
                <div class="card-header-bar"><div class="card-header-content">
                  <div class="card-icon-wrap bg-gradient-to-br from-blue-500 to-indigo-500"><Icon name="i-lucide-info" class="size-3.5 text-white" /></div>
                  <h3 class="card-title">Project Info</h3>
                </div></div>
                <div class="card-body">
                  <div class="divide-y divide-border/40">
                    <div v-for="field in projectInfoFields" :key="field.label" class="flex items-center justify-between py-2 px-1 hover:bg-muted/30 rounded transition-colors" :class="{ 'search-row-match': textMatches(field.label) || textMatches(field.value) }">
                      <span class="text-xs text-muted-foreground font-medium" v-html="highlightText(field.label)" />
                      <span class="text-xs font-semibold text-right max-w-[55%] truncate" v-html="highlightText(field.value)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ② Production Info — row 1, col 2 -->
            <div class="dashboard-card bento-prod-info" :style="{ '--card-color': '#f59e0b' }" :class="{ 'has-search-match': cardHasMatch('production-info'), 'no-search-match': globalSearch.trim() && !cardHasMatch('production-info') }">
              <div class="card-inner">
                <div class="card-header-bar"><div class="card-header-content">
                  <div class="card-icon-wrap bg-gradient-to-br from-amber-500 to-orange-500"><Icon name="i-lucide-cpu" class="size-3.5 text-white" /></div>
                  <h3 class="card-title">Production Info</h3>
                </div></div>
                <div class="card-body">
                  <div class="divide-y divide-border/40">
                    <div v-for="field in productionFields" :key="field.label" class="flex items-center justify-between py-2 px-1 hover:bg-muted/30 rounded transition-colors" :class="{ 'search-row-match': textMatches(field.label) || textMatches(field.value) }">
                      <span class="text-xs text-muted-foreground font-medium" v-html="highlightText(field.label)" />
                      <Badge v-if="field.isStatus" variant="outline" :class="statusColor(field.value)" class="text-[10px]"><span v-html="highlightText(field.value)" /></Badge>
                      <span v-else class="text-xs font-semibold text-right max-w-[55%] truncate" v-html="highlightText(field.value)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ③ Project Finance — row 1, col 3 (50%) -->
            <div class="dashboard-card bento-proj-finance" :style="{ '--card-color': '#10b981' }" :class="{ 'has-search-match': cardHasMatch('project-finance'), 'no-search-match': globalSearch.trim() && !cardHasMatch('project-finance') }">
              <div class="card-inner">
                <div class="card-header-bar"><div class="card-header-content">
                  <div class="card-icon-wrap bg-gradient-to-br from-emerald-500 to-teal-500"><Icon name="i-lucide-banknote" class="size-3.5 text-white" /></div>
                  <h3 class="card-title">Project Finance</h3>
                </div></div>
                <div class="card-body">
                  <FinancesTable :records="financeRecords" :loading="false" :user-name-map="userNameMap" :show-project="false" :compact="true" :per-page="10" :hide-search="true" :search-query="globalSearch" />
                </div>
              </div>
            </div>

            <!-- ④⑤ Documents + Payments — row 2, col 3 (side-by-side) -->
            <div class="bento-docs-pay">

              <!-- Documents -->
              <div class="dashboard-card" :style="{ '--card-color': '#8b5cf6' }" :class="{ 'has-search-match': cardHasMatch('documents'), 'no-search-match': globalSearch.trim() && !cardHasMatch('documents') }">
                <div class="card-inner">
                  <div class="card-header-bar"><div class="card-header-content">
                    <div class="card-icon-wrap bg-gradient-to-br from-violet-500 to-purple-500"><Icon name="i-lucide-file-text" class="size-3.5 text-white" /></div>
                    <h3 class="card-title">Documents</h3>
                    <Badge variant="secondary" class="text-[9px] ml-auto h-4 px-1.5">0</Badge>
                  </div></div>
                  <div class="card-body flex flex-col items-center justify-center text-center">
                    <Icon name="i-lucide-file-text" class="size-8 text-muted-foreground/15 mb-2" />
                    <p class="text-xs text-muted-foreground/60">Coming soon</p>
                  </div>
                </div>
              </div>

              <!-- Payments -->
              <div class="dashboard-card" :style="{ '--card-color': '#f43f5e' }" :class="{ 'has-search-match': cardHasMatch('payments'), 'no-search-match': globalSearch.trim() && !cardHasMatch('payments') }">
                <div class="card-inner">
                  <div class="card-header-bar"><div class="card-header-content">
                    <div class="card-icon-wrap bg-gradient-to-br from-pink-500 to-rose-500"><Icon name="i-lucide-credit-card" class="size-3.5 text-white" /></div>
                    <h3 class="card-title">Payments</h3>
                  </div></div>
                  <div class="card-body">
                    <PaymentsTable :records="projectPayments" :loading="false" :user-name-map="userNameMap" :show-project="false" :compact="true" :per-page="10" :hide-search="true" :search-query="globalSearch" />
                  </div>
                </div>
              </div>

            </div><!-- /bento-docs-pay -->

            <!-- ⑥ Events — row 3, col 2 -->
            <div class="dashboard-card bento-events" :style="{ '--card-color': '#d946ef' }" :class="{ 'has-search-match': cardHasMatch('events'), 'no-search-match': globalSearch.trim() && !cardHasMatch('events') }">
              <div class="card-inner">
                <div class="card-header-bar"><div class="card-header-content">
                  <div class="card-icon-wrap bg-gradient-to-br from-fuchsia-500 to-pink-500"><Icon name="i-lucide-calendar-days" class="size-3.5 text-white" /></div>
                  <h3 class="card-title">Events</h3>
                  <Badge v-if="projectEvents.length" variant="secondary" class="text-[9px] ml-auto h-4 px-1.5">{{ projectEvents.length }}</Badge>
                </div></div>
                <div class="card-body">
                  <div v-if="projectEvents.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                    <Icon name="i-lucide-calendar-days" class="size-9 text-muted-foreground/15 mb-2" />
                    <p class="text-xs text-muted-foreground/60">No events found</p>
                  </div>
                  <div v-else class="space-y-2">
                    <div v-for="evt in projectEvents" :key="evt['Event  ID']" class="p-2.5 rounded-lg border transition-all" :class="textMatches(evt['Event Type']) || textMatches(evt['Event Description']) || textMatches(evt['Event Status']) ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/30'">
                      <div class="flex items-start gap-2">
                        <div class="size-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" :class="statusColor(evt['Event Status'])">
                          <Icon :name="eventStatusIcon(evt['Event Status'])" class="size-3.5" />
                        </div>
                        <div class="min-w-0 flex-1">
                          <p class="text-xs font-semibold truncate" v-html="highlightText(evt['Event Type'] || 'Event')" />
                          <p v-if="evt['Event Description']" class="text-[10px] text-muted-foreground line-clamp-2 mt-0.5" v-html="highlightText(evt['Event Description'])" />
                          <div class="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge v-if="evt['Event Status']" variant="outline" :class="statusColor(evt['Event Status'])" class="text-[9px]"><span v-html="highlightText(evt['Event Status'])" /></Badge>
                            <span v-if="evt['Start Date']" class="text-[9px] text-muted-foreground flex items-center gap-0.5"><Icon name="i-lucide-calendar" class="size-2.5" /> {{ formatDate(evt['Start Date']) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ⑦ Bottom row — row 3, col 3 (50%) — Chat Room + Permits + Notes as sub-grid -->
            <div class="bento-bottom-row">

              <!-- Chat Room -->
              <div class="dashboard-card" :style="{ '--card-color': '#0ea5e9' }" :class="{ 'has-search-match': cardHasMatch('chat-room'), 'no-search-match': globalSearch.trim() && !cardHasMatch('chat-room') }">
                <div class="card-inner">
                  <div class="card-header-bar"><div class="card-header-content">
                    <div class="card-icon-wrap bg-gradient-to-br from-sky-500 to-cyan-500"><Icon name="i-lucide-message-circle" class="size-3.5 text-white" /></div>
                    <h3 class="card-title">Chat Room</h3>
                    <Badge v-if="allChatMessagesSorted.length" variant="secondary" class="text-[9px] ml-auto h-4 px-1.5">{{ allChatMessagesSorted.length }}</Badge>
                  </div></div>
                  <div class="card-body" style="padding:0; display:flex; flex-direction:column;">
                    <div v-if="chatLoading" class="flex items-center justify-center py-10"><Icon name="i-lucide-loader-2" class="size-5 animate-spin text-primary" /></div>
                    <div v-else-if="allChatMessagesSorted.length === 0" class="flex flex-col items-center justify-center py-10 text-center">
                      <Icon name="i-lucide-message-circle" class="size-9 text-muted-foreground/15 mb-2" />
                      <p class="text-xs text-muted-foreground/60">No chat messages</p>
                    </div>
                    <div v-else class="flex flex-col flex-1 min-h-0">
                      <div v-if="chatCardPeople.length > 0" class="px-3 py-2 border-b border-border/30 flex items-center justify-between gap-2">
                        <span class="text-[10px] text-muted-foreground">{{ filteredChatMessages.length }} messages</span>
                        <select v-model="chatPersonFilter" class="h-7 px-2 pr-6 rounded-md border border-border/40 bg-muted/40 text-[10px] text-foreground outline-none focus:ring-1 focus:ring-primary/30 transition-all appearance-none cursor-pointer max-w-[150px] truncate" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%2710%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%239ca3af%27 stroke-width=%272%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 4px center;">
                          <option value="">All People</option>
                          <option v-for="email in chatCardPeople" :key="email" :value="email">{{ resolveName(email) }}</option>
                        </select>
                      </div>
                      <div ref="chatCardAreaRef" class="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-1 chat-card-scroll">
                        <template v-for="(msg, idx) in filteredChatMessages" :key="msg.MessageID || idx">
                          <div v-if="chatShowDateSep(filteredChatMessages, idx)" class="flex justify-center py-2">
                            <span class="px-2 py-0.5 text-[8px] font-semibold text-muted-foreground bg-muted/60 rounded-full uppercase tracking-wider">{{ chatFormatDate(msg._date) }}</span>
                          </div>
                          <div class="flex items-end gap-1.5" :class="isChatCurrentUser(msg.Email) ? 'justify-end' : 'justify-start'">
                            <template v-if="!isChatCurrentUser(msg.Email)">
                              <Avatar v-if="idx === 0 || filteredChatMessages[idx - 1]?.Email !== msg.Email || isChatCurrentUser(filteredChatMessages[idx - 1]?.Email)" class="size-5 shrink-0 mb-0.5">
                                <AvatarFallback :class="chatColors[Math.abs([...msg.Email||''].reduce((h,c)=>c.charCodeAt(0)+((h<<5)-h),0)) % chatColors.length]" class="text-[6px] font-bold text-white">
                                  {{ (resolveName(msg.Email)).split(/[\s@]/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2) }}
                                </AvatarFallback>
                              </Avatar>
                              <div v-else class="w-5 shrink-0" />
                            </template>
                            <div class="max-w-[75%]">
                              <div v-if="!isChatCurrentUser(msg.Email) && (idx === 0 || filteredChatMessages[idx - 1]?.Email !== msg.Email || isChatCurrentUser(filteredChatMessages[idx - 1]?.Email))" class="pl-0.5 pb-0.5">
                                <span class="text-[9px] font-semibold" v-html="highlightText(resolveName(msg.Email))" />
                              </div>
                              <div class="rounded-xl px-2.5 py-1.5 text-[11px] leading-relaxed shadow-sm" :class="isChatCurrentUser(msg.Email) ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted/70 border border-border/30 text-foreground rounded-bl-sm'">
                                <span v-if="msg.Chat" v-html="highlightText(msg.Chat)" />
                                <div class="flex justify-end mt-0.5 -mb-0.5">
                                  <span class="text-[7px]" :class="isChatCurrentUser(msg.Email) ? 'text-primary-foreground/50' : 'text-muted-foreground/50'">{{ chatFormatTime(msg._date) }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                      <div class="px-3 py-2 border-t border-border/30">
                        <div class="flex items-end gap-1.5">
                          <textarea v-model="chatCardMessage" placeholder="Type a message…" rows="1" class="flex-1 resize-none rounded-lg border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50" style="max-height: 80px; min-height: 32px;" @keydown.enter.exact.prevent="chatCardSend" @input="(e: Event) => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 80) + 'px' }" />
                          <Button size="icon" class="size-8 rounded-lg shrink-0" :disabled="!chatCardMessage.trim() || chatCardSending" @click="chatCardSend">
                            <Icon v-if="chatCardSending" name="i-lucide-loader-2" class="size-3.5 animate-spin" />
                            <Icon v-else name="i-lucide-send" class="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Permits -->
              <div class="dashboard-card" :style="{ '--card-color': '#84cc16' }" :class="{ 'has-search-match': cardHasMatch('permits'), 'no-search-match': globalSearch.trim() && !cardHasMatch('permits') }">
                <div class="card-inner">
                  <div class="card-header-bar"><div class="card-header-content">
                    <div class="card-icon-wrap bg-gradient-to-br from-lime-500 to-green-500"><Icon name="i-lucide-clipboard-check" class="size-3.5 text-white" /></div>
                    <h3 class="card-title">Permits</h3>
                    <Badge v-if="projectPermits.length" variant="secondary" class="text-[9px] ml-auto h-4 px-1.5">{{ projectPermits.length }}</Badge>
                  </div></div>
                  <div class="card-body">
                    <PermitsTable :records="projectPermits" :loading="false" :user-name-map="userNameMap" :show-project="false" :compact="true" :per-page="10" :hide-search="true" :search-query="globalSearch" />
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div class="dashboard-card" :style="{ '--card-color': '#eab308' }" :class="{ 'has-search-match': cardHasMatch('notes'), 'no-search-match': globalSearch.trim() && !cardHasMatch('notes') }">
                <div class="card-inner">
                  <div class="card-header-bar"><div class="card-header-content">
                    <div class="card-icon-wrap bg-gradient-to-br from-yellow-500 to-amber-500"><Icon name="i-lucide-sticky-note" class="size-3.5 text-white" /></div>
                    <h3 class="card-title">Notes</h3>
                    <Badge v-if="projectNotes.length" variant="secondary" class="text-[9px] ml-auto h-4 px-1.5">{{ projectNotes.length }}</Badge>
                  </div></div>
                  <div class="card-body">
                    <NotesTable :records="projectNotes" :loading="false" :user-name-map="userNameMap" :customer-map="customerNameMap" :show-project="false" :compact="true" :per-page="10" :hide-search="true" :search-query="globalSearch" />
                  </div>
                </div>
              </div>

            </div><!-- /bento-bottom-row -->

          </div><!-- /dashboard-grid -->

        </div>
      </div>
    </div>
  </ProjectsLayout>

  <!-- Google Drive Files Modal -->
  <CustomerFilesModal
    v-if="project"
    v-model:open="showFilesModal"
    :customer-name="(customerNameMap[project['Customer ID']] || project['Customer name'] || '') + ' — ' + projectId"
    :drive-link="project['Project Folder'] || ''"
  />
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

/* ─── Bento Grid — viewport locked ───────────────────────── */
/*
  Columns: 1fr | 1fr | 2fr  →  25% | 25% | 50%
  Project Info spans all 3 rows on the far left.
  Bottom-right uses a nested sub-grid for Chat/Permits/Notes.
*/
.dashboard-grid {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 0.8fr 1fr 1fr;
  grid-template-areas:
    "proj-info  prod-info    proj-finance"
    "proj-info  prod-info    docs-pay"
    "proj-info  events       bottom-row";
  gap: 8px;
}

.bento-proj-info    { grid-area: proj-info; }
.bento-prod-info    { grid-area: prod-info; }
.bento-proj-finance { grid-area: proj-finance; }
.bento-docs-pay     { grid-area: docs-pay; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; min-height: 0; }
.bento-events       { grid-area: events; }
.bento-bottom-row   { grid-area: bottom-row; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; min-height: 0; }

/* All direct card wrappers fill their area */
.bento-proj-info,
.bento-prod-info,
.bento-proj-finance,
.bento-events {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: none;
    height: auto;
  }
  .bento-proj-info,
  .bento-proj-finance,
  .bento-docs-pay { grid-column: span 2; }
  .bento-bottom-row { grid-column: span 2; }
  .bento-docs-pay { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    height: auto;
  }
  .bento-proj-info,
  .bento-proj-finance,
  .bento-docs-pay,
  .bento-bottom-row { grid-column: 1; }
  .bento-docs-pay { grid-template-columns: 1fr; }
  .bento-bottom-row { grid-template-columns: 1fr; }
}


/* ─── Bento Card ─────────────────────────────────────────── */
.dashboard-card {
  --card-color: hsl(var(--primary));
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--card-color) 35%, transparent);
  background: hsl(var(--card));
  box-shadow: 0 1px 4px hsl(var(--foreground) / 0.04);
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  overflow: hidden;
  cursor: default;
  position: relative;
  user-select: text;
  -webkit-user-select: text;
}

.dashboard-card:hover {
  border-color: color-mix(in srgb, var(--card-color) 60%, transparent);
  box-shadow: 0 4px 18px color-mix(in srgb, var(--card-color) 14%, transparent);
  transform: translateY(-1px);
}


.card-inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}


.card-header-bar {
  padding: 7px 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--card-color) 15%, transparent);
  flex-shrink: 0;
  background: color-mix(in srgb, var(--card-color) 5%, hsl(var(--card)));
}

.card-header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}


.card-icon-wrap {
  width: 22px; height: 22px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.card-title {
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
}




.card-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 8px 12px;
}


.card-body::-webkit-scrollbar { width: 3px; }
.card-body::-webkit-scrollbar-track { background: transparent; }
.card-body::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.12); border-radius: 100px; }

/* ─── Staggered entrance ─────────────────────────────────── */
.dashboard-card { animation: cardIn 0.3s ease-out both; }
.dashboard-card:nth-child(1) { animation-delay: 0.02s; }
.dashboard-card:nth-child(2) { animation-delay: 0.05s; }
.dashboard-card:nth-child(3) { animation-delay: 0.08s; }
.dashboard-card:nth-child(4) { animation-delay: 0.11s; }
.dashboard-card:nth-child(5) { animation-delay: 0.14s; }
.dashboard-card:nth-child(6) { animation-delay: 0.17s; }
.dashboard-card:nth-child(7) { animation-delay: 0.20s; }
.dashboard-card:nth-child(8) { animation-delay: 0.23s; }
.dashboard-card:nth-child(9) { animation-delay: 0.26s; }

@keyframes cardIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}


/* ─── Global Search Input ────────────────────────────────── */
.global-search-input {
  width: 200px;
  height: 32px;
  padding: 0 28px 0 30px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--background) / 0.8);
  color: hsl(var(--foreground));
  outline: none;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}
.global-search-input::placeholder {
  color: hsl(var(--muted-foreground) / 0.4);
}
.global-search-input:focus {
  width: 260px;
  border-color: hsl(var(--primary) / 0.5);
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1), 0 2px 8px hsl(var(--primary) / 0.08);
  background: hsl(var(--background));
}

/* ─── Search Highlight Mark ──────────────────────────────── */
:deep(.search-highlight),
.search-highlight {
  background: #fbbf24 !important;
  color: #1a1a1a !important;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 700;
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.4), 0 1px 4px rgba(251, 191, 36, 0.3);
  text-decoration: none;
  display: inline;
  line-height: 1.4;
}

/* ─── Bento Search Match States ─────────────────────────── */
.dashboard-card.has-search-match {
  border-color: hsl(var(--primary) / 0.4);
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.1), 0 4px 16px hsl(var(--primary) / 0.08);
  animation: matchPulse 2s ease-in-out infinite;
}

.dashboard-card.no-search-match {
  opacity: 0.35;
  transform: scale(0.985);
  filter: grayscale(0.3);
}

@keyframes matchPulse {
  0%, 100% { border-color: hsl(var(--primary) / 0.3); }
  50% { border-color: hsl(var(--primary) / 0.55); }
}


/* ─── Row-level Match Highlight ──────────────────────────── */
.search-row-match {
  background: hsl(var(--primary) / 0.06) !important;
  border-left: 2px solid hsl(var(--primary) / 0.4);
  padding-left: 8px !important;
  border-radius: 4px;
}

/* ─── Action Bar Buttons ─────────────────────────────────── */
.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  border: 1px solid hsl(var(--primary) / 0.12);
  background: linear-gradient(135deg, hsl(var(--primary) / 0.03), hsl(var(--card)));
  color: hsl(var(--muted-foreground));
  transition: all 0.25s ease;
  cursor: pointer;
  flex-shrink: 0;
}
.action-btn:hover {
  background: linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--primary) / 0.02));
  color: hsl(var(--foreground));
  border-color: hsl(var(--primary) / 0.25);
}
.action-btn:active {
  transform: scale(0.97);
}
.action-btn-danger {
  color: hsl(var(--destructive));
  border-color: hsl(var(--destructive) / 0.15);
  background: linear-gradient(135deg, hsl(var(--destructive) / 0.04), hsl(var(--card)));
}
.action-btn-danger:hover {
  background: linear-gradient(135deg, hsl(var(--destructive) / 0.1), hsl(var(--destructive) / 0.03));
  color: hsl(var(--destructive));
  border-color: hsl(var(--destructive) / 0.3);
}

/* Chat card scrollbar */
.chat-card-scroll::-webkit-scrollbar { width: 3px; }
.chat-card-scroll::-webkit-scrollbar-track { background: transparent; }
.chat-card-scroll::-webkit-scrollbar-thumb { background: hsl(var(--muted-foreground) / 0.15); border-radius: 999px; }
</style>
