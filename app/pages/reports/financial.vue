<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import { toast } from 'vue-sonner'

const { setHeader } = usePageHeader()
setHeader({ title: 'Financial Reports', description: 'Finance analytics & performance insights', icon: 'i-lucide-pie-chart' })

const { finance: financeRecords, userNameMap, projectMap, customerNameMap, init } = useDashboardStore()
init()
const { user } = useAuth()

const activeTab = ref('overview')
const sidebarCollapsed = ref(false)
const searchQuery = ref('')

// ── Filter State ─────────────────────────────────────
const selCompanies = ref<string[]>([])
const selTypes = ref<string[]>([])
const selStatuses = ref<string[]>([])
const selRTF = ref<string[]>([])
const selCreatedBy = ref<string[]>([])
const selMoneyRcvd = ref<string[]>([])
const dateFrom = ref('')
const dateTo = ref('')
const filterSearch = reactive({ company: '', type: '', status: '', rtf: '', createdBy: '', moneyRcvd: '' })

// ── Helpers ──────────────────────────────────────────
const _abbrevs = new Set(['pto', 'mpu', 'n/a', 'tbd', 'hvac', 'ntp', 'ahj', 'rtf'])
function titleCase(s: string): string {
  if (!s) return s
  return s.toLowerCase().split(/(\s+)/).map(w => _abbrevs.has(w) ? w.toUpperCase() : (w.charAt(0).toUpperCase() + w.slice(1))).join('')
}
function str(val: any): string { if (!val) return ''; if (typeof val === 'object' && val.value !== undefined) return String(val.value); return String(val) }
function parseDate(val: any): Date | null { if (!val) return null; try { const d = new Date(val?.value || val); return isNaN(d.getTime()) ? null : d } catch { return null } }
function parsePrice(val: any): number { if (!val) return 0; const n = Number.parseFloat(String(val?.value ?? val).replace(/[^0-9.-]/g, '')); return Number.isNaN(n) ? 0 : n }
function fmt(n: number): string { const a = Math.abs(n); if (a >= 1e6) return `${n < 0 ? '-' : ''}$${(a / 1e6).toFixed(1)}M`; if (a >= 1e3) return `${n < 0 ? '-' : ''}$${(a / 1e3).toFixed(0)}K`; return `$${n.toLocaleString('en-US')}` }
function fmtFull(n: number) { return `$${n.toLocaleString('en-US')}` }
function resolveName(email: any): string { const e = str(email); if (!e) return '—'; const m = userNameMap.value[e.toLowerCase()]; return m ? titleCase(m) : titleCase(e.split('@')[0]?.replace(/[._-]/g, ' ') || e) }
function fieldMatchesAny(fv: string | undefined | null, sel: string[]): boolean { if (!sel.length) return true; if (!fv) return false; return sel.some(s => str(fv).toLowerCase() === s.toLowerCase()) }
function getCustomerName(rec: any): string {
  const cid = rec['Customer'] || ''; if (cid && customerNameMap.value[cid]) return titleCase(customerNameMap.value[cid])
  const p = projectMap.value[rec['Project ID'] || '']; const ref2 = p?.['Customer name'] || p?.['Customer ID'] || ''
  if (ref2 && customerNameMap.value[ref2]) return titleCase(customerNameMap.value[ref2]); return '—'
}

// ── Cascading Filters ────────────────────────────────
function filterExcluding(excludeKey: string): any[] {
  let recs = [...financeRecords.value]
  if (excludeKey !== 'company' && selCompanies.value.length) recs = recs.filter(r => fieldMatchesAny(r['Finance Company'], selCompanies.value))
  if (excludeKey !== 'type' && selTypes.value.length) recs = recs.filter(r => fieldMatchesAny(r['Finance Type'], selTypes.value))
  if (excludeKey !== 'status' && selStatuses.value.length) recs = recs.filter(r => fieldMatchesAny(r['Finance Status'], selStatuses.value))
  if (excludeKey !== 'rtf' && selRTF.value.length) recs = recs.filter(r => fieldMatchesAny(r['RTF'], selRTF.value))
  if (excludeKey !== 'createdBy' && selCreatedBy.value.length) recs = recs.filter(r => fieldMatchesAny(r['Create By'], selCreatedBy.value))
  if (excludeKey !== 'moneyRcvd' && selMoneyRcvd.value.length) recs = recs.filter(r => fieldMatchesAny(r['Money RCVD'], selMoneyRcvd.value))
  if (dateFrom.value) { const f = new Date(dateFrom.value); f.setHours(0,0,0,0); recs = recs.filter(r => { const d = parseDate(r['TimeStamp'] || r['Fund Date']); return d && d >= f }) }
  if (dateTo.value) { const t = new Date(dateTo.value); t.setHours(23,59,59,999); recs = recs.filter(r => { const d = parseDate(r['TimeStamp'] || r['Fund Date']); return d && d <= t }) }
  return recs
}

function splitCountSorted(records: any[], field: string): { value: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of records) { const raw = str(r[field]); if (!raw) continue; const key = raw.toLowerCase(); counts[key] = (counts[key] || 0) + 1 }
  return Object.entries(counts).map(([k, count]) => ({ value: titleCase(k), count })).sort((a, b) => a.value.localeCompare(b.value, undefined, { sensitivity: 'base' }))
}
function emailCountSorted(records: any[], field: string): { email: string, name: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of records) { const raw = str(r[field]); if (!raw) continue; counts[raw.toLowerCase()] = (counts[raw.toLowerCase()] || 0) + 1 }
  return Object.entries(counts).map(([email, count]) => ({ email, name: resolveName(email), count })).sort((a, b) => a.name.localeCompare(b.name))
}

const companies = computed(() => splitCountSorted(filterExcluding('company'), 'Finance Company'))
const types = computed(() => splitCountSorted(filterExcluding('type'), 'Finance Type'))
const statuses = computed(() => splitCountSorted(filterExcluding('status'), 'Finance Status'))
const rtfOpts = computed(() => splitCountSorted(filterExcluding('rtf'), 'RTF'))
const moneyRcvdOpts = computed(() => splitCountSorted(filterExcluding('moneyRcvd'), 'Money RCVD'))
const createdByOpts = computed(() => emailCountSorted(filterExcluding('createdBy'), 'Create By'))

function filteredOpts(opts: { value: string, count: number }[], search: string) { if (!search.trim()) return opts; const q = search.toLowerCase(); return opts.filter(o => o.value.toLowerCase().includes(q)) }
function filteredEmailOpts(opts: { email: string, name: string, count: number }[], search: string) { if (!search.trim()) return opts; const q = search.toLowerCase(); return opts.filter(o => o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q)) }

const _filterRefs: Record<string, Ref<string[]>> = { company: selCompanies, type: selTypes, status: selStatuses, rtf: selRTF, createdBy: selCreatedBy, moneyRcvd: selMoneyRcvd }
function toggleFilter(key: string, val: string) { const arr = _filterRefs[key]; if (!arr) return; const idx = arr.value.indexOf(val); if (idx >= 0) arr.value = arr.value.filter(v => v !== val); else arr.value = [...arr.value, val] }
function resetFilters() { selCompanies.value = []; selTypes.value = []; selStatuses.value = []; selRTF.value = []; selCreatedBy.value = []; selMoneyRcvd.value = []; dateFrom.value = ''; dateTo.value = ''; searchQuery.value = ''; Object.keys(filterSearch).forEach(k => (filterSearch as any)[k] = '') }
const hasActiveFilters = computed(() => selCompanies.value.length || selTypes.value.length || selStatuses.value.length || selRTF.value.length || selCreatedBy.value.length || selMoneyRcvd.value.length || dateFrom.value || dateTo.value || searchQuery.value)

// ── Filtered Records ─────────────────────────────────
const filteredRecords = computed(() => {
  let recs = filterExcluding('__none__')
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    recs = recs.filter(r => [r['Finance Company'], r['Finance Type'], r['Finance Status'], r['Project ID'], r['Finance Terms']].filter(Boolean).some(v => String(v).toLowerCase().includes(q)) || getCustomerName(r).toLowerCase().includes(q))
  }
  return recs
})

// ── KPIs ─────────────────────────────────────────────
const kpis = computed(() => {
  const ps = filteredRecords.value; const total = ps.length
  const loanTotal = ps.reduce((s, r) => s + parsePrice(r['Loan Amount']), 0)
  const netTotal = ps.reduce((s, r) => s + parsePrice(r['Net Loan Amount']), 0)
  const dealerTotal = ps.reduce((s, r) => s + parsePrice(r['Dealer Amount']), 0)
  const funded = ps.filter(r => { const s = str(r['Finance Status']).toLowerCase(); return s.includes('fund') || s.includes('complete') || s.includes('approved') }).length
  const fundRate = total > 0 ? Math.round((funded / total) * 1000) / 10 : 0
  const avgLoan = total > 0 ? Math.round(loanTotal / total) : 0
  return [
    { label: 'Total Loan Volume', value: loanTotal, prefix: '$', suffix: '', icon: 'i-lucide-trending-up', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Net Loan Amount', value: netTotal, prefix: '$', suffix: '', icon: 'i-lucide-wallet', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Dealer Fees', value: dealerTotal, prefix: '$', suffix: '', icon: 'i-lucide-receipt', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Total Records', value: total, prefix: '', suffix: '', icon: 'i-lucide-file-text', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Funding Rate', value: fundRate, prefix: '', suffix: '%', icon: 'i-lucide-check-circle', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    { label: 'Avg Loan Size', value: avgLoan, prefix: '$', suffix: '', icon: 'i-lucide-bar-chart-3', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  ]
})

// ── Charts ───────────────────────────────────────────
const companyBreakdown = computed(() => {
  const g: Record<string, { count: number, amount: number }> = {}
  filteredRecords.value.forEach(r => { const c = str(r['Finance Company']) || 'Unknown'; if (!g[c]) g[c] = { count: 0, amount: 0 }; g[c].count++; g[c].amount += parsePrice(r['Loan Amount']) })
  return Object.entries(g).map(([name, d]) => ({ name: titleCase(name), count: d.count, amount: Math.round(d.amount) })).sort((a, b) => b.amount - a.amount)
})
const companyMax = computed(() => companyBreakdown.value[0]?.amount ?? 1)

const statusBreakdown = computed(() => {
  const g: Record<string, { count: number, amount: number }> = {}
  filteredRecords.value.forEach(r => { const s = str(r['Finance Status']) || 'Unknown'; if (!g[s]) g[s] = { count: 0, amount: 0 }; g[s].count++; g[s].amount += parsePrice(r['Loan Amount']) })
  return Object.entries(g).map(([name, d]) => ({ name: titleCase(name), count: d.count, amount: Math.round(d.amount) })).sort((a, b) => b.count - a.count)
})

const topCreators = computed(() => {
  const g: Record<string, { count: number, amount: number }> = {}
  filteredRecords.value.forEach(r => { const c = str(r['Create By']); if (!c) return; if (!g[c]) g[c] = { count: 0, amount: 0 }; g[c].count++; g[c].amount += parsePrice(r['Loan Amount']) })
  return Object.entries(g).map(([email, d]) => ({ name: resolveName(email), email, count: d.count, amount: Math.round(d.amount), avatar: resolveName(email).split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() })).sort((a, b) => b.amount - a.amount).slice(0, 10)
})

const typeData = computed(() => {
  const g: Record<string, number> = {}
  filteredRecords.value.forEach(r => { const t = str(r['Finance Type']) || 'Other'; g[t] = (g[t] || 0) + parsePrice(r['Loan Amount']) })
  return Object.entries(g).map(([name, value]) => ({ name, value: Math.round(value) })).sort((a, b) => b.value - a.value).slice(0, 6)
})

// ── Filter Templates ─────────────────────────────────
const savedTemplates = ref<any[]>([]); const showSaveDialog = ref(false); const showTemplatesPanel = ref(false)
const templateName = ref(''); const savingTemplate = ref(false); const loadingTemplates = ref(false)
function getCurrentFilters() { return { selCompanies: selCompanies.value, selTypes: selTypes.value, selStatuses: selStatuses.value, selRTF: selRTF.value, selCreatedBy: selCreatedBy.value, selMoneyRcvd: selMoneyRcvd.value, dateFrom: dateFrom.value, dateTo: dateTo.value } }
function applyTemplate(t: any) { try { const f = typeof t.filters === 'string' ? JSON.parse(t.filters) : t.filters; selCompanies.value = f.selCompanies || []; selTypes.value = f.selTypes || []; selStatuses.value = f.selStatuses || []; selRTF.value = f.selRTF || []; selCreatedBy.value = f.selCreatedBy || []; selMoneyRcvd.value = f.selMoneyRcvd || []; dateFrom.value = f.dateFrom || ''; dateTo.value = f.dateTo || ''; showTemplatesPanel.value = false; toast.success(`Template "${t.name}" applied`) } catch { toast.error('Failed to apply template') } }
async function loadTemplates() { if (!user.value?.email) return; loadingTemplates.value = true; try { const data = await $fetch<{ success: boolean, templates: any[] }>('/api/bigquery/filter-templates', { query: { route: '/reports/financial', userEmail: user.value.email } }); if (data.success) savedTemplates.value = data.templates } catch {} finally { loadingTemplates.value = false } }
async function saveTemplate() { if (!templateName.value.trim() || !user.value?.email) return; savingTemplate.value = true; try { await $fetch('/api/bigquery/filter-templates', { method: 'POST', body: { name: templateName.value.trim(), route: '/reports/financial', filters: getCurrentFilters(), userEmail: user.value.email, userName: user.value.name || user.value.email, isShared: false } }); toast.success('Template saved!'); showSaveDialog.value = false; templateName.value = ''; loadTemplates() } catch { toast.error('Failed to save template') } finally { savingTemplate.value = false } }
async function deleteTemplate(id: string) { try { await $fetch('/api/bigquery/filter-templates', { method: 'DELETE', body: { id } }); toast.success('Template deleted'); savedTemplates.value = savedTemplates.value.filter(t => t.id !== id) } catch { toast.error('Failed to delete template') } }
onMounted(() => loadTemplates())

function statusColor(s: string): string { const l = (s || '').toLowerCase(); if (['complete','done','approved','funded','rcvd','yes'].some(k => l.includes(k))) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400'; if (['active','open','in progress','in funding'].some(k => l.includes(k))) return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400'; if (['pending','new','submitted','waiting','not started'].some(k => l.includes(k))) return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'; if (['cancel','rejected','failed','expired'].some(k => l.includes(k))) return 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'; return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20' }
const barColors = ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#06b6d4','#84cc16']
const donutColors = ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ec4899','#06b6d4']
const avatarColors = ['bg-violet-500/15 text-violet-600 dark:text-violet-400','bg-pink-500/15 text-pink-600 dark:text-pink-400','bg-blue-500/15 text-blue-600 dark:text-blue-400','bg-emerald-500/15 text-emerald-600 dark:text-emerald-400','bg-amber-500/15 text-amber-600 dark:text-amber-400','bg-cyan-500/15 text-cyan-600 dark:text-cyan-400']
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex">
    <!-- ═══ FILTER SIDEBAR ═══ -->
    <div class="shrink-0 border-r bg-card/50 flex flex-col min-h-0 transition-all duration-300 overflow-hidden" :class="sidebarCollapsed ? 'w-[52px]' : 'w-[260px]'">
      <div class="flex items-center justify-between px-3 pt-3 pb-1">
        <p v-if="!sidebarCollapsed" class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Filters</p>
        <div class="flex items-center gap-1">
          <button v-if="!sidebarCollapsed" class="p-1 rounded-md hover:bg-muted transition-colors" title="Load Template" @click="showTemplatesPanel = !showTemplatesPanel"><Icon name="i-lucide-folder-open" class="size-3.5 text-muted-foreground" /></button>
          <button v-if="!sidebarCollapsed && hasActiveFilters" class="p-1 rounded-md hover:bg-muted transition-colors" title="Save Filters as Template" @click="showSaveDialog = true"><Icon name="i-lucide-save" class="size-3.5 text-muted-foreground" /></button>
          <button class="p-1 rounded-md hover:bg-muted transition-colors" @click="sidebarCollapsed = !sidebarCollapsed"><Icon :name="sidebarCollapsed ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'" class="size-3.5 text-muted-foreground" /></button>
        </div>
      </div>

      <!-- Templates Panel -->
      <div v-if="showTemplatesPanel && !sidebarCollapsed" class="px-3 pb-2 space-y-1.5">
        <div class="flex items-center justify-between"><span class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Saved Templates</span><button class="text-[10px] text-muted-foreground hover:text-foreground" @click="showTemplatesPanel = false">×</button></div>
        <div v-if="loadingTemplates" class="text-center py-3"><Icon name="i-lucide-loader-2" class="size-4 animate-spin text-muted-foreground/40" /></div>
        <div v-else-if="savedTemplates.length === 0" class="text-center py-3 text-[10px] text-muted-foreground/50">No saved templates</div>
        <div v-else class="space-y-1 max-h-[150px] overflow-y-auto">
          <div v-for="t in savedTemplates" :key="t.id" class="group flex items-center gap-1.5 p-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors" @click="applyTemplate(t)">
            <Icon name="i-lucide-bookmark" class="size-3 text-primary shrink-0" />
            <div class="flex-1 min-w-0"><p class="text-[11px] font-medium truncate">{{ t.name }}</p></div>
            <button class="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/10 transition-all" @click.stop="deleteTemplate(t.id)"><Icon name="i-lucide-trash-2" class="size-2.5 text-destructive" /></button>
          </div>
        </div>
        <Separator />
      </div>

      <div v-if="!sidebarCollapsed" class="flex flex-col gap-3.5 p-3 overflow-y-auto flex-1">
        <!-- Search -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-search" class="size-3" />Search</label>
          <div class="relative"><Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" /><input v-model="searchQuery" placeholder="Search records…" class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all" /></div>
        </div>

        <!-- Finance Company -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-building-2" class="size-3" />Finance Company<Badge v-if="selCompanies.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selCompanies.length }}</Badge></label>
          <div class="relative"><Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" /><input v-model="filterSearch.company" placeholder="Search…" class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all" /></div>
          <div class="max-h-[140px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in filteredOpts(companies, filterSearch.company)" :key="opt.value" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selCompanies.includes(opt.value) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selCompanies.includes(opt.value)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('company', opt.value)" /><span class="truncate flex-1">{{ opt.value }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
            <p v-if="filteredOpts(companies, filterSearch.company).length === 0" class="text-[10px] text-muted-foreground/50 text-center py-2">No matches</p>
          </div>
        </div>

        <!-- Finance Status -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-activity" class="size-3" />Status<Badge v-if="selStatuses.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selStatuses.length }}</Badge></label>
          <div class="relative"><Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" /><input v-model="filterSearch.status" placeholder="Search…" class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all" /></div>
          <div class="max-h-[140px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in filteredOpts(statuses, filterSearch.status)" :key="opt.value" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selStatuses.includes(opt.value) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selStatuses.includes(opt.value)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('status', opt.value)" /><span class="truncate flex-1">{{ opt.value }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
            <p v-if="filteredOpts(statuses, filterSearch.status).length === 0" class="text-[10px] text-muted-foreground/50 text-center py-2">No matches</p>
          </div>
        </div>

        <!-- Finance Type -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-layers" class="size-3" />Type<Badge v-if="selTypes.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selTypes.length }}</Badge></label>
          <div class="max-h-[120px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in filteredOpts(types, filterSearch.type)" :key="opt.value" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selTypes.includes(opt.value) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selTypes.includes(opt.value)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('type', opt.value)" /><span class="truncate flex-1">{{ opt.value }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
          </div>
        </div>

        <!-- RTF -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-check-square" class="size-3" />RTF<Badge v-if="selRTF.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selRTF.length }}</Badge></label>
          <div class="max-h-[100px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in rtfOpts" :key="opt.value" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selRTF.includes(opt.value) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selRTF.includes(opt.value)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('rtf', opt.value)" /><span class="truncate flex-1">{{ opt.value }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
          </div>
        </div>

        <!-- Money RCVD -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-banknote" class="size-3" />Money RCVD<Badge v-if="selMoneyRcvd.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selMoneyRcvd.length }}</Badge></label>
          <div class="max-h-[100px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in moneyRcvdOpts" :key="opt.value" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selMoneyRcvd.includes(opt.value) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selMoneyRcvd.includes(opt.value)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('moneyRcvd', opt.value)" /><span class="truncate flex-1">{{ opt.value }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
          </div>
        </div>

        <!-- Created By -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-user" class="size-3" />Created By<Badge v-if="selCreatedBy.length" variant="secondary" class="text-[9px] px-1 py-0 ml-auto">{{ selCreatedBy.length }}</Badge></label>
          <div class="relative"><Icon name="i-lucide-search" class="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/40" /><input v-model="filterSearch.createdBy" placeholder="Search…" class="w-full h-7 pl-7 pr-2 text-[11px] rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary/30 transition-all" /></div>
          <div class="max-h-[140px] overflow-y-auto space-y-0.5 rounded-lg border bg-background/50 p-1">
            <label v-for="opt in filteredEmailOpts(createdByOpts, filterSearch.createdBy)" :key="opt.email" class="flex items-center gap-2 px-2 py-1 rounded-md text-[11px] cursor-pointer transition-colors hover:bg-muted" :class="selCreatedBy.includes(opt.email) ? 'bg-primary/5 text-primary font-medium' : 'text-muted-foreground'"><input type="checkbox" :checked="selCreatedBy.includes(opt.email)" class="size-3 rounded accent-primary cursor-pointer" @change="toggleFilter('createdBy', opt.email)" /><span class="truncate flex-1">{{ opt.name }}</span><span class="text-[9px] tabular-nums text-muted-foreground/60 shrink-0">{{ opt.count }}</span></label>
          </div>
        </div>

        <Separator />

        <!-- Date Range -->
        <div class="space-y-1.5"><label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-calendar" class="size-3" />Date From</label><input v-model="dateFrom" type="date" class="w-full h-8 px-2.5 text-xs rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-all" /></div>
        <div class="space-y-1.5"><label class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5"><Icon name="i-lucide-calendar-check" class="size-3" />Date To</label><input v-model="dateTo" type="date" class="w-full h-8 px-2.5 text-xs rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/30 transition-all" /></div>

        <Separator />

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="space-y-2">
          <div class="flex items-center justify-between"><span class="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Active Filters</span><button class="text-[10px] text-primary hover:underline" @click="resetFilters">Clear All</button></div>
          <div class="flex flex-wrap gap-1">
            <Badge v-for="s in selCompanies" :key="'co-'+s" variant="secondary" class="text-[10px] gap-1">{{ s }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('company', s)">×</button></Badge>
            <Badge v-for="s in selStatuses" :key="'st-'+s" variant="secondary" class="text-[10px] gap-1">{{ s }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('status', s)">×</button></Badge>
            <Badge v-for="s in selTypes" :key="'ty-'+s" variant="secondary" class="text-[10px] gap-1">{{ s }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('type', s)">×</button></Badge>
            <Badge v-for="s in selRTF" :key="'rtf-'+s" variant="secondary" class="text-[10px] gap-1">{{ s }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('rtf', s)">×</button></Badge>
            <Badge v-for="s in selMoneyRcvd" :key="'mr-'+s" variant="secondary" class="text-[10px] gap-1">{{ s }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('moneyRcvd', s)">×</button></Badge>
            <Badge v-for="s in selCreatedBy" :key="'cb-'+s" variant="secondary" class="text-[10px] gap-1">{{ resolveName(s) }}<button class="ml-0.5 hover:text-destructive" @click="toggleFilter('createdBy', s)">×</button></Badge>
            <Badge v-if="dateFrom" variant="secondary" class="text-[10px] gap-1">From: {{ dateFrom }}<button class="ml-0.5 hover:text-destructive" @click="dateFrom = ''">×</button></Badge>
            <Badge v-if="dateTo" variant="secondary" class="text-[10px] gap-1">To: {{ dateTo }}<button class="ml-0.5 hover:text-destructive" @click="dateTo = ''">×</button></Badge>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="mt-auto pt-3 space-y-2">
          <Separator />
          <div class="rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-3 space-y-2 border border-primary/10">
            <div class="flex items-center gap-2"><div class="size-7 rounded-lg bg-primary/15 flex items-center justify-center"><Icon name="i-lucide-activity" class="size-3.5 text-primary" /></div><div><p class="text-[10px] text-muted-foreground">Filtered Results</p><p class="text-sm font-bold tabular-nums">{{ filteredRecords.length.toLocaleString() }}</p></div></div>
            <div class="flex items-center gap-2"><div class="size-7 rounded-lg bg-emerald-500/15 flex items-center justify-center"><Icon name="i-lucide-dollar-sign" class="size-3.5 text-emerald-600" /></div><div><p class="text-[10px] text-muted-foreground">Total Loan Volume</p><p class="text-sm font-bold tabular-nums">{{ fmt(filteredRecords.reduce((s, r) => s + parsePrice(r['Loan Amount']), 0)) }}</p></div></div>
          </div>
        </div>
      </div>

      <!-- Collapsed icons -->
      <div v-else class="flex flex-col items-center gap-2 py-3 flex-1">
        <div class="p-1.5 rounded-md" :class="selCompanies.length ? 'bg-primary/10' : ''"><Icon name="i-lucide-building-2" class="size-3.5 text-muted-foreground" /></div>
        <div class="p-1.5 rounded-md" :class="selStatuses.length ? 'bg-primary/10' : ''"><Icon name="i-lucide-activity" class="size-3.5 text-muted-foreground" /></div>
        <div class="p-1.5 rounded-md" :class="selTypes.length ? 'bg-primary/10' : ''"><Icon name="i-lucide-layers" class="size-3.5 text-muted-foreground" /></div>
        <div class="p-1.5 rounded-md" :class="dateFrom || dateTo ? 'bg-primary/10' : ''"><Icon name="i-lucide-calendar" class="size-3.5 text-muted-foreground" /></div>
      </div>
    </div>

    <!-- ═══ MAIN CONTENT ═══ -->
    <div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-auto">
      <div class="flex flex-col gap-5 p-4">
        <!-- Tabs -->
        <div class="flex items-center gap-1 border rounded-lg p-1 bg-muted/30 w-fit">
          <button v-for="tab in [{ id: 'overview', label: 'Overview', icon: 'i-lucide-layout-dashboard' }, { id: 'analytics', label: 'Analytics', icon: 'i-lucide-bar-chart-3' }, { id: 'data', label: 'Data Table', icon: 'i-lucide-table' }]" :key="tab.id" class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all" :class="activeTab === tab.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'" @click="activeTab = tab.id">
            <Icon :name="tab.icon" class="size-3.5" />{{ tab.label }}
          </button>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          <Card v-for="(kpi, i) in kpis" :key="i">
            <CardContent class="p-4 space-y-2">
              <div class="flex items-center justify-center rounded-lg p-1.5 w-fit" :class="kpi.bg"><Icon :name="kpi.icon" class="size-3.5" :class="kpi.color" /></div>
              <div>
                <p class="text-xl font-bold tabular-nums leading-tight">{{ kpi.prefix }}<NumberFlow :value="kpi.value" :format="{ notation: kpi.value > 99999 ? 'compact' : 'standard', maximumFractionDigits: 1 }" />{{ kpi.suffix }}</p>
                <p class="text-[10px] text-muted-foreground mt-0.5">{{ kpi.label }}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- OVERVIEW TAB -->
        <template v-if="activeTab === 'overview'">
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <!-- Company Breakdown -->
            <Card class="lg:col-span-2">
              <CardHeader class="pb-2"><CardTitle class="text-sm font-semibold">Loan Volume by Finance Company</CardTitle><CardDescription>Total loan amounts by provider</CardDescription></CardHeader>
              <CardContent class="space-y-3">
                <div v-for="(item, i) in companyBreakdown.slice(0, 8)" :key="item.name" class="space-y-1">
                  <div class="flex items-center justify-between text-xs"><span class="font-medium">{{ item.name }}</span><div class="flex items-center gap-2"><span class="text-muted-foreground tabular-nums">{{ item.count }} records</span><span class="font-semibold tabular-nums">{{ fmt(item.amount) }}</span></div></div>
                  <div class="h-3 rounded-full bg-muted/50 overflow-hidden"><div class="h-full rounded-full transition-all duration-700" :style="{ width: `${(item.amount / companyMax) * 100}%`, background: barColors[i % barColors.length] }" /></div>
                </div>
              </CardContent>
            </Card>
            <!-- Type Breakdown -->
            <Card>
              <CardHeader class="pb-2"><CardTitle class="text-sm font-semibold">By Finance Type</CardTitle><CardDescription>Loan distribution by type</CardDescription></CardHeader>
              <CardContent class="flex flex-col items-center">
                <DonutChart :data="typeData" index="name" category="value" :colors="donutColors" :value-formatter="(v: number) => fmt(v)" class="h-[180px]" />
                <div class="w-full mt-4 space-y-2">
                  <div v-for="(e, i) in typeData" :key="e.name" class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><div class="size-2.5 rounded-full" :style="{ background: donutColors[i % donutColors.length] }" /><span class="text-muted-foreground">{{ e.name }}</span></div><span class="font-semibold tabular-nums">{{ fmt(e.value) }}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Status Breakdown -->
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-semibold">Finance Status Distribution</CardTitle><CardDescription>Current status of all finance records</CardDescription></CardHeader>
            <CardContent>
              <div class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                <div v-for="item in statusBreakdown" :key="item.name" class="p-3 rounded-xl border space-y-1">
                  <Badge variant="outline" :class="statusColor(item.name)" class="text-[10px]">{{ item.name }}</Badge>
                  <p class="text-lg font-bold tabular-nums">{{ item.count }}</p>
                  <p class="text-[10px] text-muted-foreground tabular-nums">{{ fmt(item.amount) }}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </template>

        <!-- ANALYTICS TAB -->
        <template v-if="activeTab === 'analytics'">
          <Card>
            <CardHeader class="pb-2"><CardTitle class="text-sm font-semibold">Top Creators</CardTitle><CardDescription>Finance records created by team member</CardDescription></CardHeader>
            <CardContent class="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead class="text-right">Records</TableHead><TableHead class="text-right">Loan Volume</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow v-for="(person, i) in topCreators" :key="person.email">
                    <TableCell><div class="flex items-center gap-3"><div class="size-8 rounded-full flex items-center justify-center text-[11px] font-bold" :class="avatarColors[i % avatarColors.length]">{{ person.avatar }}</div><div><p class="font-medium text-sm">{{ person.name }}</p></div></div></TableCell>
                    <TableCell class="text-right tabular-nums font-medium">{{ person.count }}</TableCell>
                    <TableCell class="text-right tabular-nums font-bold">{{ fmt(person.amount) }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </template>

        <!-- DATA TABLE TAB -->
        <template v-if="activeTab === 'data'">
          <FinancesTable :records="filteredRecords" :loading="false" :user-name-map="userNameMap" :project-map="projectMap" :customer-name-map="customerNameMap" :show-project="true" :compact="false" :per-page="50" :hide-search="true" />
        </template>
      </div>
    </div>

    <!-- Save Template Dialog -->
    <Dialog v-model:open="showSaveDialog">
      <DialogContent class="max-w-sm">
        <DialogHeader><DialogTitle>Save Filter Template</DialogTitle><DialogDescription>Save your current filter configuration for quick access later.</DialogDescription></DialogHeader>
        <div class="space-y-3 py-2"><label class="text-xs font-medium">Template Name</label><Input v-model="templateName" placeholder="e.g., Lightreach Funded Q1" class="h-9" @keyup.enter="saveTemplate" /></div>
        <DialogFooter><Button variant="outline" @click="showSaveDialog = false">Cancel</Button><Button :disabled="!templateName.trim() || savingTemplate" @click="saveTemplate"><Icon v-if="savingTemplate" name="i-lucide-loader-2" class="size-3.5 animate-spin mr-1.5" />Save Template</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
