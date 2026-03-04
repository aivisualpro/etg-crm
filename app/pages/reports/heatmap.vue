<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import 'leaflet/dist/leaflet.css'

const { setHeader } = usePageHeader()
setHeader({ title: 'Asset Map', icon: 'i-lucide-map', description: 'Geographic distribution of inventoried assets' })

const isMounted = ref(false)
onMounted(() => { isMounted.value = true })

const { resolve: resolveLang, lang: appLang } = useAppLanguage()
const {
  level1Map, level2Map, level3Map, subCatMap, assetDescMap,
  furnitureUsersMap: usersMap, init,
  furnitureRows, furnitureRowsReady, furnitureRowsFetching, furnitureRowsProgress,
  ensureFurnitureRows,
} = useDashboardStore()
init()
ensureFurnitureRows()

const loading = computed(() => furnitureRowsFetching.value && !furnitureRowsReady.value)
const rows = computed(() => furnitureRows.value)
const sidebarCollapsed = ref(false)
const searchQuery = ref('')

// ─── Helpers ────────────────────────────────────────────────
function rl(map: Record<string, { eng: string, arabic: string }>, key: string): string {
  const entry = map[key]
  if (!entry) return key
  return appLang.value === 'ar' ? (entry.arabic || entry.eng || key) : (entry.eng || key)
}
function resolveL1(key: string) { return rl(level1Map.value, key) }
function resolveL2(key: string) { return rl(level2Map.value, key) }
function resolveL3(key: string) { return rl(level3Map.value, key) }
function resolveSC(key: string) { return rl(subCatMap.value, key) }
function resolveUser(key: string) { return usersMap.value[key] || key }

// ─── Filter selections ──────────────────────────────────────
const selLevel1 = ref<string[]>([])
const selLevel2 = ref<string[]>([])
const selLevel3 = ref<string[]>([])
const selSubCat = ref<string[]>([])
const selCondition = ref<string[]>([])
const selUser = ref<string[]>([])
const dateFrom = ref('')
const dateTo = ref('')

const filterSearch = reactive({ level1: '', level2: '', level3: '', subCat: '', condition: '', user: '' })

function parseTS(val: string | undefined): Date | null {
  if (!val) return null
  const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/)
  if (!parts) return null
  return new Date(+parts[3]!, +parts[1]! - 1, +parts[2]!, +parts[4]!, +parts[5]!, +parts[6]!)
}

// Level 2 name merge
const level2NameToIds = computed(() => {
  const map: Record<string, Set<string>> = {}
  for (const r of rows.value) {
    const id = r.A8; if (!id) continue
    const name = resolveL2(id)
    if (!map[name]) map[name] = new Set()
    map[name].add(id)
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v]]))
})

// ─── Cross-filter logic ─────────────────────────────────────
function filterExcluding(excludeKey: string): any[] {
  let recs = [...rows.value]
  if (excludeKey !== 'level1' && selLevel1.value.length) recs = recs.filter(r => selLevel1.value.includes(r.A7))
  if (excludeKey !== 'level2' && selLevel2.value.length) {
    const ids = new Set<string>()
    for (const name of selLevel2.value) { for (const id of (level2NameToIds.value[name] || [])) ids.add(id) }
    recs = recs.filter(r => ids.has(r.A8))
  }
  if (excludeKey !== 'level3' && selLevel3.value.length) recs = recs.filter(r => selLevel3.value.includes(r.A9))
  if (excludeKey !== 'subCat' && selSubCat.value.length) recs = recs.filter(r => selSubCat.value.includes(r.A66))
  if (excludeKey !== 'condition' && selCondition.value.length) recs = recs.filter(r => selCondition.value.includes(r.A75))
  if (excludeKey !== 'user' && selUser.value.length) recs = recs.filter(r => selUser.value.includes(r.A2))
  return recs
}

function countSorted(recs: any[], field: string, resolverMap?: Record<string, { eng: string, arabic: string }>): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) { const v = r[field]; if (!v) continue; counts[v] = (counts[v] || 0) + 1 }
  return Object.entries(counts)
    .map(([value, count]) => ({ value, label: resolverMap ? rl(resolverMap, value) : value, count }))
    .sort((a, b) => b.count - a.count)
}

function level2Sorted(recs: any[]): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) {
    const id = r.A8; if (!id) continue
    const name = resolveL2(id)
    counts[name] = (counts[name] || 0) + 1
  }
  return Object.entries(counts).map(([value, count]) => ({ value, label: value, count })).sort((a, b) => b.count - a.count)
}

function condSorted(recs: any[]): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) { const v = r.A75; if (!v) continue; counts[v] = (counts[v] || 0) + 1 }
  return Object.entries(counts).map(([value, count]) => ({ value, label: resolveLang(value), count })).sort((a, b) => b.count - a.count)
}

function userSorted(recs: any[]): { value: string, label: string, count: number }[] {
  const counts: Record<string, number> = {}
  for (const r of recs) { const v = r.A2; if (!v) continue; counts[v] = (counts[v] || 0) + 1 }
  return Object.entries(counts).map(([value, count]) => ({ value, label: resolveUser(value), count })).sort((a, b) => b.count - a.count)
}

// Filter option sets
const level1Opts = computed(() => countSorted(filterExcluding('level1'), 'A7', level1Map.value))
const level2Opts = computed(() => level2Sorted(filterExcluding('level2')))
const level3Opts = computed(() => countSorted(filterExcluding('level3'), 'A9', level3Map.value))
const subCatOpts = computed(() => countSorted(filterExcluding('subCat'), 'A66', subCatMap.value))
const conditionOpts = computed(() => condSorted(filterExcluding('condition')))
const userOpts = computed(() => userSorted(filterExcluding('user')))

// Toggle / clear helpers
const filterRefs: Record<string, Ref<string[]>> = {
  level1: selLevel1, level2: selLevel2, level3: selLevel3,
  subCat: selSubCat, condition: selCondition, user: selUser,
}
function toggleFilter(key: string, val: string) {
  const arr = filterRefs[key]; if (!arr) return
  const idx = arr.value.indexOf(val)
  if (idx >= 0) arr.value.splice(idx, 1)
  else arr.value.push(val)
}
function clearFilter(key: string) { const arr = filterRefs[key]; if (arr) arr.value = [] }
function clearAllFilters() {
  selLevel1.value = []; selLevel2.value = []; selLevel3.value = []
  selSubCat.value = []; selCondition.value = []; selUser.value = []
  dateFrom.value = ''; dateTo.value = ''; searchQuery.value = ''
}
const hasFilters = computed(() =>
  selLevel1.value.length || selLevel2.value.length || selLevel3.value.length ||
  selSubCat.value.length || selCondition.value.length || selUser.value.length ||
  dateFrom.value || dateTo.value || searchQuery.value.trim(),
)

function filteredSearchOpts(opts: { value: string, label: string, count: number }[], search: string) {
  if (!search.trim()) return opts
  const q = search.toLowerCase()
  return opts.filter(o => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
}

// ─── Filtered data ──────────────────────────────────────────
const filteredRows = computed(() => {
  let recs = [...rows.value]
  if (selLevel1.value.length) recs = recs.filter(r => selLevel1.value.includes(r.A7))
  if (selLevel2.value.length) {
    const ids = new Set<string>()
    for (const name of selLevel2.value) { for (const id of (level2NameToIds.value[name] || [])) ids.add(id) }
    recs = recs.filter(r => ids.has(r.A8))
  }
  if (selLevel3.value.length) recs = recs.filter(r => selLevel3.value.includes(r.A9))
  if (selSubCat.value.length) recs = recs.filter(r => selSubCat.value.includes(r.A66))
  if (selCondition.value.length) recs = recs.filter(r => selCondition.value.includes(r.A75))
  if (selUser.value.length) recs = recs.filter(r => selUser.value.includes(r.A2))
  if (dateFrom.value) { const f = new Date(dateFrom.value); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d >= f }) }
  if (dateTo.value) { const t = new Date(dateTo.value); t.setHours(23, 59, 59, 999); recs = recs.filter(r => { const d = parseTS(r.A213); return d && d <= t }) }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    recs = recs.filter(r => [r.A70, r.A222, r.A77].filter(Boolean).some(v => String(v).toLowerCase().includes(q)))
  }
  return recs
})

// ─── Parse coords ───────────────────────────────────────────
interface MapPin {
  lat: number; lng: number; assetCode: string; entity: string; level2: string
  level3: string; condition: string; user: string; description: string
}

const mapPins = computed<MapPin[]>(() => {
  const pins: MapPin[] = []
  for (const r of filteredRows.value) {
    const raw = r.A79
    if (!raw || typeof raw !== 'string' || !raw.includes(',')) continue
    const parts = raw.replace(/\s/g, '').split(',')
    const lat = parseFloat(parts[0] || '')
    const lng = parseFloat(parts[1] || '')
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) continue
    pins.push({
      lat, lng,
      assetCode: r.A70 || '',
      entity: r.A7 || '',
      level2: r.A8 || '',
      level3: r.A9 || '',
      condition: r.A75 || '',
      user: r.A2 || '',
      description: r.A222 || r.A67 || '',
    })
  }
  return pins
})

const totalWithCoords = computed(() => mapPins.value.length)
const totalWithoutCoords = computed(() => filteredRows.value.length - mapPins.value.length)

// ─── Map management ─────────────────────────────────────────
const mapContainer = ref<HTMLDivElement | null>(null)
let map: any = null
let markerClusterGroup: any = null
let heatLayer: any = null
const mapMode = ref<'pins' | 'heat'>('pins')
const mapReady = ref(false)

// Condition color mapping
function condColor(cond: string): string {
  const c = cond.toLowerCase()
  if (c === 'good' || c === 'excellent' || c === '3') return '#10b981'
  if (c === 'fair' || c === '2' || c === 'average') return '#f59e0b'
  if (c === 'poor' || c === '1' || c === 'bad' || c === 'damaged') return '#ef4444'
  return '#6366f1'
}

function createIcon(color: string) {
  const L = (window as any).L
  return L.divIcon({
    html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
    className: 'custom-pin',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

async function initMap() {
  if (!mapContainer.value) return
  const L = await import('leaflet')
  ;(window as any).L = L

  map = L.map(mapContainer.value, {
    center: [24.7136, 46.6753], // Riyadh default
    zoom: 6,
    zoomControl: false,
    attributionControl: false,
  })

  // Dark-friendly tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
  }).addTo(map)

  // Zoom control bottom-right
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  // Attribution bottom-left
  L.control.attribution({ position: 'bottomleft', prefix: false })
    .addAttribution('© <a href="https://carto.com" target="_blank">CARTO</a> · © <a href="https://osm.org" target="_blank">OSM</a>')
    .addTo(map)

  mapReady.value = true
  updateMarkers()
}

function updateMarkers() {
  if (!map || !mapReady.value) return
  const L = (window as any).L

  // Clear existing
  if (markerClusterGroup) { map.removeLayer(markerClusterGroup); markerClusterGroup = null }
  if (heatLayer) { map.removeLayer(heatLayer); heatLayer = null }

  const pins = mapPins.value
  if (pins.length === 0) return

  if (mapMode.value === 'pins') {
    // Use simple marker layer group with custom icons
    markerClusterGroup = L.layerGroup()

    for (const pin of pins) {
      const color = condColor(pin.condition)
      const icon = createIcon(color)
      const marker = L.marker([pin.lat, pin.lng], { icon })
      const condLabel = pin.condition ? resolveLang(pin.condition) : '—'
      marker.bindPopup(`
        <div style="font-family:system-ui;min-width:180px;font-size:13px">
          <div style="font-weight:700;font-size:14px;margin-bottom:6px;color:#f8fafc">${pin.assetCode || 'Unknown'}</div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:12px;color:#94a3b8">
            <span>Entity</span><span style="color:#e2e8f0">${resolveL1(pin.entity)}</span>
            <span>Level 2</span><span style="color:#e2e8f0">${resolveL2(pin.level2)}</span>
            <span>Level 3</span><span style="color:#e2e8f0">${resolveL3(pin.level3)}</span>
            <span>Condition</span><span style="color:${color};font-weight:600">${condLabel}</span>
            <span>User</span><span style="color:#e2e8f0">${resolveUser(pin.user)}</span>
            ${pin.description ? `<span>Description</span><span style="color:#e2e8f0" dir="rtl">${pin.description}</span>` : ''}
          </div>
          <div style="margin-top:8px;text-align:right">
            <a href="https://www.google.com/maps?q=${pin.lat},${pin.lng}" target="_blank" style="color:#60a5fa;font-size:11px;text-decoration:none">Open in Maps ↗</a>
          </div>
        </div>
      `, {
        className: 'map-popup-dark',
        maxWidth: 280,
      })

      markerClusterGroup.addLayer(marker)
    }

    markerClusterGroup.addTo(map)
  }
  else {
    // Heat mode — circle markers with varying radius by density
    const points: [number, number][] = pins.map(p => [p.lat, p.lng])

    // Use circle markers with transparency for heat effect
    markerClusterGroup = L.layerGroup()
    for (const pin of pins) {
      const circle = L.circleMarker([pin.lat, pin.lng], {
        radius: 6,
        fillColor: condColor(pin.condition),
        fillOpacity: 0.5,
        stroke: false,
      })
      markerClusterGroup.addLayer(circle)
    }

    // Add larger "heat" circles at clustered positions
    const gridSize = 0.005
    const grid: Record<string, { lat: number, lng: number, count: number, conditions: Record<string, number> }> = {}
    for (const pin of pins) {
      const gx = Math.round(pin.lat / gridSize) * gridSize
      const gy = Math.round(pin.lng / gridSize) * gridSize
      const key = `${gx},${gy}`
      if (!grid[key]) grid[key] = { lat: gx, lng: gy, count: 0, conditions: {} }
      grid[key].count++
      grid[key].conditions[pin.condition] = (grid[key].conditions[pin.condition] || 0) + 1
    }

    for (const cell of Object.values(grid)) {
      const topCond = Object.entries(cell.conditions).sort((a, b) => b[1] - a[1])[0]?.[0] || ''
      const radius = Math.min(40, 8 + Math.sqrt(cell.count) * 4)
      L.circleMarker([cell.lat, cell.lng], {
        radius,
        fillColor: condColor(topCond),
        fillOpacity: 0.25,
        stroke: true,
        color: condColor(topCond),
        weight: 1,
        opacity: 0.4,
      }).addTo(markerClusterGroup)
    }

    markerClusterGroup.addTo(map)
  }

  // Fit bounds if pins exist
  if (pins.length > 0) {
    const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })
  }
}

// Watch for filter/mode changes
watch([mapPins, mapMode], () => {
  nextTick(() => updateMarkers())
}, { deep: true })

onMounted(async () => {
  isMounted.value = true
  // Wait for data then init map
  const stop = watch(furnitureRowsReady, (ready) => {
    if (ready) {
      nextTick(() => {
        initMap()
        stop()
      })
    }
  }, { immediate: true })
})

onBeforeUnmount(() => {
  if (map) { map.remove(); map = null }
})

// ─── Entrance animation ─────────────────────────────────────
const entered = ref(false)
onMounted(() => { requestAnimationFrame(() => { entered.value = true }) })

// ─── Filter sections config ─────────────────────────────────
const filterSections = computed(() => [
  { key: 'level1', title: 'Entity', opts: level1Opts.value, sel: selLevel1.value },
  { key: 'level2', title: 'Level 2', opts: level2Opts.value, sel: selLevel2.value },
  { key: 'level3', title: 'Level 3', opts: level3Opts.value, sel: selLevel3.value },
  { key: 'subCat', title: 'Subcategory', opts: subCatOpts.value, sel: selSubCat.value },
  { key: 'condition', title: 'Condition', opts: conditionOpts.value, sel: selCondition.value },
  { key: 'user', title: 'User', opts: userOpts.value, sel: selUser.value },
])
</script>

<template>
  <div class="w-full flex-1 min-h-0 flex">
    <!-- Toolbar -->
    <Teleport v-if="isMounted" to="#header-toolbar">
      <div class="flex items-center gap-2 w-full justify-end">
        <div class="relative max-w-[200px]">
          <Icon name="i-lucide-search" class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input v-model="searchQuery" placeholder="Search assets..." class="pl-8 h-8 text-xs" />
        </div>
        <p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">
          {{ totalWithCoords.toLocaleString() }} pins on map
        </p>
        <Button v-if="hasFilters" variant="ghost" size="sm" class="h-8 text-xs gap-1" @click="clearAllFilters">
          <Icon name="i-lucide-x" class="size-3" /> Clear
        </Button>
        <Button variant="ghost" size="sm" class="h-8" @click="sidebarCollapsed = !sidebarCollapsed">
          <Icon :name="sidebarCollapsed ? 'i-lucide-panel-right-open' : 'i-lucide-panel-right-close'" class="size-3.5" />
        </Button>
      </div>
    </Teleport>

    <!-- ═══ FILTER SIDEBAR ═══ -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="w-0 opacity-0"
      enter-to-class="w-[260px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="w-[260px] opacity-100"
      leave-to-class="w-0 opacity-0"
    >
      <aside v-if="!sidebarCollapsed" class="w-[260px] shrink-0 border-r overflow-y-auto overflow-x-hidden bg-card/50">
        <div class="p-3 space-y-3">

          <!-- Map stats -->
          <div class="rounded-lg border bg-gradient-to-br from-blue-500/5 to-violet-500/5 p-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="text-center">
                <p class="text-lg font-bold tabular-nums text-emerald-500">
                  <NumberFlow :value="totalWithCoords" :animated="true" />
                </p>
                <p class="text-[9px] text-muted-foreground uppercase tracking-wider">With GPS</p>
              </div>
              <div class="text-center">
                <p class="text-lg font-bold tabular-nums text-muted-foreground/60">
                  <NumberFlow :value="totalWithoutCoords" :animated="true" />
                </p>
                <p class="text-[9px] text-muted-foreground uppercase tracking-wider">No GPS</p>
              </div>
            </div>
          </div>

          <!-- Date range -->
          <div>
            <h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Date Range</h4>
            <div class="grid grid-cols-2 gap-1.5">
              <Input v-model="dateFrom" type="date" class="h-7 text-[11px]" />
              <Input v-model="dateTo" type="date" class="h-7 text-[11px]" />
            </div>
          </div>

          <!-- Filters (same as furniture) -->
          <template v-for="section in filterSections" :key="section.key">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">{{ section.title }}</h4>
                <button
                  v-if="section.sel.length"
                  class="text-[9px] text-primary hover:underline"
                  @click="clearFilter(section.key)"
                >
                  Clear ({{ section.sel.length }})
                </button>
              </div>
              <div v-if="section.opts.length > 6" class="mb-1">
                <Input v-model="filterSearch[section.key as keyof typeof filterSearch]" placeholder="Filter..." class="h-6 text-[10px]" />
              </div>
              <div class="max-h-[130px] overflow-y-auto space-y-0.5 custom-scrollbar">
                <button
                  v-for="opt in filteredSearchOpts(section.opts, filterSearch[section.key as keyof typeof filterSearch] || '')"
                  :key="opt.value"
                  class="w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] transition-colors"
                  :class="section.sel.includes(opt.value) ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground/80'"
                  @click="toggleFilter(section.key, opt.value)"
                >
                  <div
                    class="size-3 rounded border shrink-0 flex items-center justify-center transition-colors"
                    :class="section.sel.includes(opt.value) ? 'bg-primary border-primary' : 'border-border'"
                  >
                    <Icon v-if="section.sel.includes(opt.value)" name="i-lucide-check" class="size-2 text-primary-foreground" />
                  </div>
                  <span class="truncate flex-1">{{ opt.label }}</span>
                  <span class="text-[9px] tabular-nums text-muted-foreground shrink-0">{{ opt.count.toLocaleString() }}</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </aside>
    </Transition>

    <!-- ═══ MAP AREA ═══ -->
    <div class="flex-1 min-w-0 relative">

      <!-- Loading state -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-background z-10">
        <div class="flex flex-col items-center gap-4 text-muted-foreground">
          <div class="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
            <Icon name="i-lucide-loader-2" class="size-7 animate-spin text-blue-500" />
          </div>
          <p class="text-sm font-medium">Loading map data...</p>
          <div v-if="furnitureRowsProgress > 0" class="flex flex-col items-center gap-2">
            <div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out" :style="{ width: `${furnitureRowsProgress}%` }" />
            </div>
            <p class="text-xs tabular-nums text-muted-foreground">{{ furnitureRowsProgress }}%</p>
          </div>
        </div>
      </div>

      <!-- Map container -->
      <div ref="mapContainer" class="absolute inset-0" />

      <!-- Map mode toggle (overlaid on map) -->
      <div
        v-if="mapReady"
        class="absolute top-4 left-4 z-[400] flex rounded-lg overflow-hidden border shadow-lg bg-card/90 backdrop-blur-md transition-all duration-500"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
      >
        <button
          class="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"
          :class="mapMode === 'pins' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'"
          @click="mapMode = 'pins'"
        >
          <Icon name="i-lucide-map-pin" class="size-3" /> Pins
        </button>
        <button
          class="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"
          :class="mapMode === 'heat' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'"
          @click="mapMode = 'heat'"
        >
          <Icon name="i-lucide-flame" class="size-3" /> Heat
        </button>
      </div>

      <!-- Legend (overlaid on map) -->
      <div
        v-if="mapReady"
        class="absolute bottom-6 left-4 z-[400] rounded-lg border shadow-lg bg-card/90 backdrop-blur-md p-3 transition-all duration-500"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
      >
        <p class="text-[9px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Condition</p>
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-emerald-500 ring-1 ring-white/20" />
            <span class="text-[11px]">Good / Excellent</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-amber-500 ring-1 ring-white/20" />
            <span class="text-[11px]">Fair / Average</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-red-500 ring-1 ring-white/20" />
            <span class="text-[11px]">Poor / Damaged</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-indigo-500 ring-1 ring-white/20" />
            <span class="text-[11px]">Other</span>
          </div>
        </div>
      </div>

      <!-- Stats badge (overlaid on map) -->
      <div
        v-if="mapReady"
        class="absolute top-4 right-4 z-[400] rounded-lg border shadow-lg bg-card/90 backdrop-blur-md p-3 space-y-2 transition-all duration-500"
        :class="entered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
      >
        <div class="flex items-center gap-2">
          <div class="size-6 rounded-md bg-blue-500/10 flex items-center justify-center">
            <Icon name="i-lucide-map-pin" class="size-3 text-blue-500" />
          </div>
          <div>
            <p class="text-xs font-bold tabular-nums"><NumberFlow :value="totalWithCoords" :animated="true" /></p>
            <p class="text-[8px] text-muted-foreground">Geo-tagged</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="size-6 rounded-md bg-amber-500/10 flex items-center justify-center">
            <Icon name="i-lucide-box" class="size-3 text-amber-500" />
          </div>
          <div>
            <p class="text-xs font-bold tabular-nums"><NumberFlow :value="filteredRows.length" :animated="true" /></p>
            <p class="text-[8px] text-muted-foreground">Total filtered</p>
          </div>
        </div>
      </div>

      <!-- No pins message -->
      <div
        v-if="mapReady && totalWithCoords === 0 && !loading"
        class="absolute inset-0 z-[399] flex items-center justify-center pointer-events-none"
      >
        <div class="bg-card/95 backdrop-blur-xl rounded-2xl border shadow-2xl p-8 flex flex-col items-center gap-3 pointer-events-auto max-w-xs text-center">
          <div class="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Icon name="i-lucide-map-pin-off" class="size-7 text-blue-500/60" />
          </div>
          <h3 class="text-sm font-semibold">No Geo-Tagged Assets</h3>
          <p class="text-xs text-muted-foreground">
            {{ filteredRows.length > 0
              ? `${filteredRows.length.toLocaleString()} assets match your filters, but none have GPS coordinates (A79).`
              : 'No assets match current filters.' }}
          </p>
          <Button v-if="hasFilters" variant="outline" size="sm" class="gap-1" @click="clearAllFilters">
            <Icon name="i-lucide-x" class="size-3" /> Clear Filters
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Scoped map popup styling for dark theme */
.map-popup-dark .leaflet-popup-content-wrapper {
  background: hsl(222.2 84% 4.9%);
  color: hsl(210 40% 98%);
  border-radius: 12px;
  border: 1px solid hsl(217.2 32.6% 17.5%);
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
}
.map-popup-dark .leaflet-popup-tip {
  background: hsl(222.2 84% 4.9%);
  border: 1px solid hsl(217.2 32.6% 17.5%);
}
.map-popup-dark .leaflet-popup-close-button {
  color: hsl(215 20.2% 65.1%);
  font-size: 18px;
  padding: 6px 8px;
}
.map-popup-dark .leaflet-popup-close-button:hover {
  color: hsl(210 40% 98%);
}
/* Custom pin removes Leaflet defaults */
.custom-pin { background: none !important; border: none !important; }

/* Light mode popup */
:root:not(.dark) .map-popup-dark .leaflet-popup-content-wrapper {
  background: white;
  color: #0f172a;
  border-color: #e2e8f0;
}
:root:not(.dark) .map-popup-dark .leaflet-popup-tip {
  background: white;
  border-color: #e2e8f0;
}
:root:not(.dark) .map-popup-dark .leaflet-popup-close-button { color: #64748b; }
:root:not(.dark) .map-popup-dark .leaflet-popup-close-button:hover { color: #0f172a; }

/* Popup grid text in light mode */
:root:not(.dark) .map-popup-dark .leaflet-popup-content-wrapper span[style*="color:#e2e8f0"],
:root:not(.dark) .map-popup-dark .leaflet-popup-content-wrapper div[style*="color:#f8fafc"] {
  color: #0f172a !important;
}
:root:not(.dark) .map-popup-dark .leaflet-popup-content-wrapper span[style*="color:#94a3b8"] {
  color: #64748b !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 9999px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
