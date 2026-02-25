<script setup lang="ts">
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Project Chat', icon: 'i-lucide-message-circle' })

// ─── Date range (default = current week Mon-Sun) ────────────
function getWeekRange(date: Date): { from: string, to: string } {
  const d = new Date(date)
  const day = d.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(d)
  monday.setDate(d.getDate() + mondayOffset)
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return {
    from: monday.toISOString().split('T')[0]!,
    to: sunday.toISOString().split('T')[0]!,
  }
}

const currentWeekAnchor = ref(new Date())
const dateRange = computed(() => getWeekRange(currentWeekAnchor.value))

function prevWeek() {
  const d = new Date(currentWeekAnchor.value)
  d.setDate(d.getDate() - 7)
  currentWeekAnchor.value = d
  fetchChats()
}

function nextWeek() {
  const d = new Date(currentWeekAnchor.value)
  d.setDate(d.getDate() + 7)
  currentWeekAnchor.value = d
  fetchChats()
}

function goThisWeek() {
  currentWeekAnchor.value = new Date()
  fetchChats()
}

const dateLabel = computed(() => {
  const from = new Date(dateRange.value.from + 'T00:00:00')
  const to = new Date(dateRange.value.to + 'T00:00:00')
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${from.toLocaleDateString('en-US', opts)} – ${to.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`
})

// ─── State ──────────────────────────────────────────────────
const loading = ref(true)
const allMessages = ref<any[]>([])
const activeContactId = ref('')
const searchQuery = ref('')
const filterTab = ref<'all' | 'active' | 'closed'>('all')
const chatAreaRef = ref<HTMLElement | null>(null)

// ─── Lookup ─────────────────────────────────────────────────
const userNameMap = ref<Record<string, string>>({})

async function fetchUsers() {
  try {
    const data = await $fetch<{ success: boolean, users: any[] }>('/api/bigquery/users').catch(() => ({ success: false, users: [] }))
    if (data.success) {
      userNameMap.value = Object.fromEntries(
        data.users.filter((u: any) => u.Email).map((u: any) => [
          u.Email.toLowerCase(),
          [u['First Name'], u['Last Name']].filter(Boolean).join(' ') || u.Email,
        ]),
      )
    }
  }
  catch {}
}

function resolveName(email: string): string {
  if (!email) return ''
  return userNameMap.value[email.toLowerCase()] || email.split('@')[0] || email
}

// ─── Fetch Chats ────────────────────────────────────────────
async function fetchChats() {
  loading.value = true
  activeContactId.value = ''
  try {
    const [chatData] = await Promise.all([
      $fetch<{ success: boolean, active: any[], closed: any[] }>('/api/bigquery/chats', {
        params: { from: dateRange.value.from, to: dateRange.value.to },
      }),
      fetchUsers(),
    ])
    if (chatData.success) {
      const active = chatData.active.map((m: any) => ({ ...m, _source: 'active' as const }))
      const closed = chatData.closed.map((m: any) => ({ ...m, _source: 'closed' as const }))
      allMessages.value = [...active, ...closed]
    }
  }
  catch {
    toast.error('Failed to load chats')
  }
  finally {
    loading.value = false
  }
}

onMounted(fetchChats)

// ─── Group messages into conversations ──────────────────────
interface Conversation {
  chatId: string
  head: string
  secondary: string
  users: string
  projectId: string
  lastMessage: string
  lastEmail: string
  lastTime: Date
  messageCount: number
  source: 'active' | 'closed'
  messages: any[]
}

const conversations = computed(() => {
  const map = new Map<string, Conversation>()

  for (const msg of allMessages.value) {
    const chatId = msg.ChatID
    if (!chatId) continue

    const ts = msg.TimeStamp?.value || msg['USA TimeStamp']?.value || msg.TimeStamp
    const date = ts ? new Date(ts) : new Date(0)

    if (!map.has(chatId)) {
      map.set(chatId, {
        chatId,
        head: msg['Chat Head'] || '',
        secondary: msg.Secondary || '',
        users: msg.Users || '',
        projectId: msg['Project ID'] || '',
        lastMessage: msg.Chat || '',
        lastEmail: msg.Email || '',
        lastTime: date,
        messageCount: 0,
        source: msg._source,
        messages: [],
      })
    }

    const conv = map.get(chatId)!
    conv.messageCount++
    conv.messages.push({ ...msg, _date: date })

    // Update last message if this is newer
    if (date > conv.lastTime) {
      conv.lastTime = date
      conv.lastMessage = msg.Chat || ''
      conv.lastEmail = msg.Email || ''
    }
  }

  // Sort messages within each conversation by time ascending
  for (const conv of map.values()) {
    conv.messages.sort((a: any, b: any) => a._date.getTime() - b._date.getTime())
  }

  return Array.from(map.values()).sort((a, b) => b.lastTime.getTime() - a.lastTime.getTime())
})

// ─── Filtering ──────────────────────────────────────────────
const filteredConversations = computed(() => {
  let list = conversations.value

  // Tab filter
  if (filterTab.value === 'active') list = list.filter(c => c.source === 'active')
  else if (filterTab.value === 'closed') list = list.filter(c => c.source === 'closed')

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.head.toLowerCase().includes(q)
      || c.secondary.toLowerCase().includes(q)
      || c.lastMessage.toLowerCase().includes(q)
      || c.users.toLowerCase().includes(q)
      || c.projectId.toLowerCase().includes(q),
    )
  }

  return list
})

// ─── Active conversation ────────────────────────────────────
const activeConversation = computed(() => {
  return conversations.value.find(c => c.chatId === activeContactId.value) || null
})

// Auto-select first conversation when loaded
watch(filteredConversations, (convs) => {
  if (convs.length > 0 && !activeConversation.value) {
    activeContactId.value = convs[0]!.chatId
  }
}, { immediate: true })

function selectConversation(chatId: string) {
  activeContactId.value = chatId
  nextTick(() => scrollToBottom())
}

// ─── Helpers ────────────────────────────────────────────────
function scrollToBottom() {
  if (chatAreaRef.value) {
    chatAreaRef.value.scrollTop = chatAreaRef.value.scrollHeight
  }
}

function getInitials(name: string) {
  return name.split(/[\s@]/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = [
  'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500',
  'bg-rose-500', 'bg-indigo-500', 'bg-teal-500', 'bg-pink-500',
  'bg-cyan-500', 'bg-orange-500', 'bg-lime-500', 'bg-fuchsia-500',
]

function getAvatarColor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'now'
  if (diffMin < 60) return `${diffMin}m`
  if (diffHr < 24) return `${diffHr}h`
  if (diffDay < 7) return `${diffDay}d`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDateLabel(date: Date): string {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
}

function shouldShowDateSeparator(messages: any[], idx: number): boolean {
  if (idx === 0) return true
  const prev = messages[idx - 1]._date
  const curr = messages[idx]._date
  return prev.toDateString() !== curr.toDateString()
}

function conversationTitle(conv: Conversation): string {
  // Extract a readable title from Chat Head or Secondary
  if (conv.head) {
    return conv.head.replace(/^Chat room create by\s*/i, '').trim() || conv.head
  }
  if (conv.secondary) {
    return conv.secondary.split('(')[0]?.trim() || conv.secondary
  }
  return conv.projectId || 'Conversation'
}

// Stats
const activeCount = computed(() => conversations.value.filter(c => c.source === 'active').length)
const closedCount = computed(() => conversations.value.filter(c => c.source === 'closed').length)
</script>

<template>
  <div class="flex h-[calc(100dvh-54px-3rem)] overflow-hidden rounded-xl border border-border/50 bg-background">

    <!-- ═══════════ LEFT SIDEBAR ═══════════ -->
    <div class="w-[340px] shrink-0 border-r border-border/50 flex flex-col bg-card/40">
      <!-- Week Navigation -->
      <div class="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/30">
        <Button variant="ghost" size="icon" class="size-7" @click="prevWeek">
          <Icon name="i-lucide-chevron-left" class="size-4" />
        </Button>
        <button
          class="text-xs font-semibold text-center hover:text-primary transition-colors"
          @click="goThisWeek"
        >
          {{ dateLabel }}
        </button>
        <Button variant="ghost" size="icon" class="size-7" @click="nextWeek">
          <Icon name="i-lucide-chevron-right" class="size-4" />
        </Button>
      </div>

      <!-- Search -->
      <div class="p-3 border-b border-border/30">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
          <Input
            v-model="searchQuery"
            placeholder="Search conversations…"
            class="pl-8 h-9 bg-muted/40 border-border/40 focus:bg-background transition-colors"
          />
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex items-center gap-1 px-3 py-2 border-b border-border/30">
        <button
          v-for="tab in [
            { id: 'all' as const, label: 'All', count: conversations.length },
            { id: 'active' as const, label: 'Active', count: activeCount },
            { id: 'closed' as const, label: 'Closed', count: closedCount },
          ]"
          :key="tab.id"
          class="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all duration-200"
          :class="filterTab === tab.id
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'"
          @click="filterTab = tab.id"
        >
          {{ tab.label }}
          <span
            class="text-[9px] px-1 py-0 rounded-full min-w-[1.25rem] text-center"
            :class="filterTab === tab.id ? 'bg-primary-foreground/20' : 'bg-muted'"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <div class="flex flex-col items-center gap-2">
          <Icon name="i-lucide-loader-2" class="size-6 animate-spin text-primary" />
          <p class="text-xs text-muted-foreground">Loading chats…</p>
        </div>
      </div>

      <!-- Conversation List -->
      <div v-else class="flex-1 overflow-y-auto chat-scrollbar">
        <div
          v-for="conv in filteredConversations"
          :key="conv.chatId"
          class="flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-200 border-b border-border/20"
          :class="activeContactId === conv.chatId
            ? 'bg-primary/8 border-l-2 border-l-primary'
            : 'hover:bg-muted/40 border-l-2 border-l-transparent'"
          @click="selectConversation(conv.chatId)"
        >
          <!-- Avatar -->
          <div class="relative shrink-0">
            <Avatar class="size-10">
              <AvatarFallback
                :class="getAvatarColor(conv.chatId)"
                class="text-[11px] font-bold text-white"
              >
                {{ getInitials(conversationTitle(conv)) }}
              </AvatarFallback>
            </Avatar>
            <!-- Source indicator -->
            <span
              class="absolute -bottom-0 -right-0 size-3 rounded-full border-2 border-background"
              :class="conv.source === 'active' ? 'bg-emerald-500' : 'bg-zinc-400'"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold truncate max-w-[170px]">
                {{ conversationTitle(conv) }}
              </span>
              <div class="flex items-center gap-1 shrink-0 ml-2">
                <span class="text-[10px] text-muted-foreground">{{ formatRelativeTime(conv.lastTime) }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between mt-0.5">
              <p class="text-xs truncate text-muted-foreground">
                <span class="font-medium">{{ resolveName(conv.lastEmail) }}:</span>
                {{ conv.lastMessage }}
              </p>
              <Badge
                v-if="conv.messageCount > 1"
                class="ml-2 shrink-0 h-[18px] min-w-[18px] px-1.5 rounded-full bg-muted text-muted-foreground text-[9px] font-bold flex items-center justify-center"
              >
                {{ conv.messageCount }}
              </Badge>
            </div>
            <!-- Project ID -->
            <p v-if="conv.projectId" class="text-[10px] text-muted-foreground/60 mt-0.5 font-mono truncate">
              {{ conv.projectId }}
            </p>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredConversations.length === 0" class="flex flex-col items-center justify-center py-16 text-center px-6">
          <Icon name="i-lucide-message-circle" class="size-10 text-muted-foreground/30 mb-3" />
          <p class="text-sm text-muted-foreground">No conversations found</p>
          <p class="text-xs text-muted-foreground/60 mt-1">Try a different search or filter</p>
        </div>
      </div>
    </div>

    <!-- ═══════════ CHAT AREA ═══════════ -->
    <div class="flex-1 flex flex-col min-w-0">
      <template v-if="activeConversation">
        <!-- Chat Header -->
        <div class="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div class="flex items-center gap-3 min-w-0">
            <Avatar class="size-9 shrink-0">
              <AvatarFallback
                :class="getAvatarColor(activeConversation.chatId)"
                class="text-[10px] font-bold text-white"
              >
                {{ getInitials(conversationTitle(activeConversation)) }}
              </AvatarFallback>
            </Avatar>
            <div class="min-w-0">
              <h3 class="text-sm font-semibold leading-tight truncate">{{ conversationTitle(activeConversation) }}</h3>
              <p class="text-[11px] text-muted-foreground truncate max-w-[400px]">
                <Badge variant="outline" class="text-[9px] mr-1.5 py-0 h-4" :class="activeConversation.source === 'active' ? 'text-emerald-600 border-emerald-500/30 bg-emerald-500/10' : 'text-zinc-500 border-zinc-400/30 bg-zinc-400/10'">
                  {{ activeConversation.source === 'active' ? 'Active' : 'Closed' }}
                </Badge>
                {{ activeConversation.messageCount }} messages
                <template v-if="activeConversation.projectId">
                  · Project: <span class="font-mono">{{ activeConversation.projectId }}</span>
                </template>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" class="size-8 text-muted-foreground hover:text-foreground" @click="fetchChats">
              <Icon name="lucide:refresh-cw" class="size-4" :class="{ 'animate-spin': loading }" />
            </Button>
          </div>
        </div>

        <!-- Messages Area -->
        <div ref="chatAreaRef" class="flex-1 overflow-y-auto px-5 py-4 space-y-1 chat-scrollbar bg-gradient-to-b from-background to-muted/10">
          <template v-for="(msg, idx) in activeConversation.messages" :key="msg.MessageID || idx">
            <!-- Date separator -->
            <div v-if="shouldShowDateSeparator(activeConversation.messages, idx)" class="flex items-center justify-center py-3">
              <span class="px-3 py-1 text-[10px] font-semibold text-muted-foreground bg-muted/60 rounded-full border border-border/30 uppercase tracking-wider">
                {{ formatDateLabel(msg._date) }}
              </span>
            </div>

            <!-- Message bubble -->
            <div class="flex items-end gap-2 justify-start message-appear" :style="{ animationDelay: `${Math.min(idx, 20) * 15}ms` }">
              <!-- Avatar (show on first msg or sender change) -->
              <div
                v-if="idx === 0 || activeConversation.messages[idx - 1]?.Email !== msg.Email"
                class="shrink-0 mb-1"
              >
                <Avatar class="size-7">
                  <AvatarFallback
                    :class="getAvatarColor(msg.Email || '')"
                    class="text-[8px] font-bold text-white"
                  >
                    {{ getInitials(resolveName(msg.Email)) }}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div v-else class="w-7 shrink-0" />

              <!-- Bubble -->
              <div class="relative max-w-[70%] group">
                <!-- Sender label on first or changed -->
                <div
                  v-if="idx === 0 || activeConversation.messages[idx - 1]?.Email !== msg.Email"
                  class="pl-1 pb-0.5 flex items-center gap-2"
                >
                  <span class="text-[11px] font-semibold text-foreground">{{ resolveName(msg.Email) }}</span>
                  <span v-if="msg.tag" class="text-[9px] text-muted-foreground">→ {{ resolveName(msg.tag.split(',')[0]?.trim() || '') }}</span>
                </div>

                <div class="rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm bg-muted/70 border border-border/30 text-foreground rounded-bl-md">
                  <!-- Attachment -->
                  <div v-if="msg.Attachment" class="flex items-center gap-2 mb-1.5">
                    <div class="flex items-center justify-center size-8 rounded-lg bg-primary/10 shrink-0">
                      <Icon name="lucide:paperclip" class="size-3.5 text-primary" />
                    </div>
                    <a
                      v-if="msg.Attachment.startsWith('http')"
                      :href="msg.Attachment"
                      target="_blank"
                      class="text-xs text-primary underline truncate max-w-[200px]"
                    >
                      Attachment
                    </a>
                    <span v-else class="text-xs text-muted-foreground truncate">{{ msg.Attachment }}</span>
                  </div>

                  <!-- Chat text -->
                  <template v-if="msg.Chat">
                    {{ msg.Chat }}
                  </template>

                  <!-- Time -->
                  <div class="flex items-center gap-1 justify-end mt-1 -mb-0.5 text-muted-foreground/50">
                    <span class="text-[9px]">{{ formatTime(msg._date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Participants footer -->
        <div class="px-4 py-2.5 border-t border-border/50 bg-card/20">
          <div v-if="activeConversation.users" class="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <Icon name="i-lucide-users" class="size-3.5 text-muted-foreground shrink-0" />
            <div class="flex items-center gap-1">
              <Badge
                v-for="email in activeConversation.users.split(',').map(e => e.trim()).filter(Boolean).slice(0, 8)"
                :key="email"
                variant="outline"
                class="text-[9px] py-0 h-4 shrink-0 whitespace-nowrap"
              >
                {{ resolveName(email) }}
              </Badge>
              <span
                v-if="activeConversation.users.split(',').filter(Boolean).length > 8"
                class="text-[9px] text-muted-foreground shrink-0"
              >
                +{{ activeConversation.users.split(',').filter(Boolean).length - 8 }} more
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- No conversation selected -->
      <div v-else class="flex-1 flex items-center justify-center">
        <div class="flex flex-col items-center gap-3 text-center">
          <div class="size-16 rounded-2xl bg-primary/5 flex items-center justify-center">
            <Icon name="i-lucide-message-circle" class="size-8 text-primary/40" />
          </div>
          <p class="text-sm font-medium text-muted-foreground">Select a conversation</p>
          <p class="text-xs text-muted-foreground/60">Choose a chat from the sidebar to view messages</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for chat */
.chat-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.chat-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.chat-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.15);
  border-radius: 999px;
}
.chat-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.3);
}

/* Message appear animation */
.message-appear {
  animation: msg-slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes msg-slide-in {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
