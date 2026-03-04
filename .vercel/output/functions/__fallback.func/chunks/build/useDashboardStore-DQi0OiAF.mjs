import { readonly, ref } from 'vue';

const _users = ref([]);
const _level1Map = ref({});
const _level2Map = ref({});
const _level3Map = ref({});
const _subCatMap = ref({});
const _assetDescMap = ref({});
const _furnitureUsersMap = ref({});
const _level1List = ref([]);
const _level2List = ref([]);
const _level3List = ref([]);
const _categories = ref([]);
const _subCategories = ref([]);
const _assetDescriptions = ref([]);
const _language = ref([]);
const _userNameMap = ref({});
const _ready = ref(false);
const _fetching = ref(false);
const _lastFetched = ref(0);
const _furnitureRows = ref([]);
const _furnitureRowsReady = ref(false);
const _furnitureRowsFetching = ref(false);
const _furnitureRowsProgress = ref(0);
const FURNITURE_BATCH = 5e3;
async function _fetchFurnitureRows() {
  if (_furnitureRowsFetching.value) return;
  _furnitureRowsFetching.value = true;
  _furnitureRowsProgress.value = 0;
  try {
    const first = await $fetch("/api/bigquery/furniture", { params: { limit: FURNITURE_BATCH, page: 1 } });
    const allRows = first.rows || [];
    const totalRows = first.total || 0;
    const totalPages = Math.ceil(totalRows / FURNITURE_BATCH);
    _furnitureRowsProgress.value = Math.round(1 / Math.max(totalPages, 1) * 100);
    if (totalPages > 1) {
      const WAVE = 6;
      for (let start = 2; start <= totalPages; start += WAVE) {
        const wave = [];
        for (let p = start; p <= Math.min(start + WAVE - 1, totalPages); p++) {
          wave.push(
            $fetch("/api/bigquery/furniture", { params: { limit: FURNITURE_BATCH, page: p } })
          );
        }
        const results = await Promise.all(wave);
        for (const pg of results) allRows.push(...pg.rows || []);
        _furnitureRowsProgress.value = Math.round(Math.min(start + WAVE - 1, totalPages) / totalPages * 100);
      }
    }
    _furnitureRows.value = allRows;
    _furnitureRowsProgress.value = 100;
  } catch (e) {
    console.error("Failed to fetch furniture rows:", e);
  } finally {
    _furnitureRowsFetching.value = false;
    _furnitureRowsReady.value = true;
  }
}
function _buildMaps() {
  _userNameMap.value = Object.fromEntries(
    _users.value.filter((u) => u.Email || u.A2).map((u) => {
      const key = (u.Email || u.A2 || "").toLowerCase();
      const name = u["First Name"] && u["Last Name"] ? [u["First Name"], u["Last Name"]].filter(Boolean).join(" ") : u.A2 || u.Email || key;
      return [key, name];
    })
  );
}
async function _fetchAll() {
  if (_fetching.value) return;
  _fetching.value = true;
  try {
    const [userData, levelsData, catData, descData, langData] = await Promise.all([
      $fetch("/api/bigquery/users").catch(() => ({ success: false, users: [] })),
      $fetch("/api/bigquery/levels").catch(() => ({ success: false, level1: [], level2: [], level3: [] })),
      $fetch("/api/bigquery/asset-categories").catch(() => ({ success: false, categories: [], subCategories: [] })),
      $fetch("/api/bigquery/asset-descriptions").catch(() => ({ success: false, descriptions: [] })),
      $fetch("/api/bigquery/language").catch(() => ({ success: false, language: [] }))
    ]);
    if (userData.success) _users.value = userData.users;
    if (levelsData.success) {
      _level1List.value = levelsData.level1 || [];
      _level2List.value = levelsData.level2 || [];
      _level3List.value = levelsData.level3 || [];
      const m1 = {};
      for (const r of levelsData.level1 || []) {
        if (r.A7) m1[r.A7] = { logo: r.image_url || r.logo || "", eng: r.eng || r.A7, arabic: r.arabic || r.A7 };
      }
      _level1Map.value = m1;
      const m2 = {};
      for (const r of levelsData.level2 || []) {
        if (r.A8) m2[r.A8] = { eng: r.eng || r.A8, arabic: r.arabic || r.A8 };
      }
      _level2Map.value = m2;
      const m3 = {};
      for (const r of levelsData.level3 || []) {
        if (r.A9) m3[r.A9] = { eng: r.eng || r.A9, arabic: r.arabic || r.A9 };
      }
      _level3Map.value = m3;
    }
    if (catData.success) {
      _categories.value = catData.categories || [];
      _subCategories.value = catData.subCategories || [];
      const m = {};
      for (const r of catData.subCategories || []) {
        if (r.A66) m[r.A66] = { eng: r.eng || r.A66, arabic: r.arabic || r.A66 };
      }
      _subCatMap.value = m;
    }
    if (descData.success) {
      _assetDescriptions.value = descData.descriptions || [];
      const m = {};
      for (const r of descData.descriptions || []) {
        if (r.A67) m[r.A67] = { eng: r.eng || r.A67, arabic: r.arabic || r.A67 };
      }
      _assetDescMap.value = m;
    }
    if (userData.success) {
      const m = {};
      for (const u of _users.value) {
        if (u.A201) m[u.A201] = u.A2 || u.A201;
      }
      _furnitureUsersMap.value = m;
    }
    if (langData.success) {
      _language.value = langData.language || [];
    }
    _buildMaps();
    _lastFetched.value = Date.now();
  } catch {
  } finally {
    _fetching.value = false;
    _ready.value = true;
  }
}
function useDashboardStore() {
  function init() {
    if (_ready.value || _fetching.value) return;
    _fetchAll();
  }
  async function refresh() {
    _ready.value = false;
    await _fetchAll();
  }
  function ensureFurnitureRows() {
    if (_furnitureRowsReady.value || _furnitureRowsFetching.value) return;
    _fetchFurnitureRows();
  }
  async function refreshFurnitureRows() {
    _furnitureRowsReady.value = false;
    await _fetchFurnitureRows();
  }
  return {
    // Reactive data
    users: readonly(_users),
    userNameMap: readonly(_userNameMap),
    // Furniture lookup maps
    level1Map: readonly(_level1Map),
    level2Map: readonly(_level2Map),
    level3Map: readonly(_level3Map),
    subCatMap: readonly(_subCatMap),
    assetDescMap: readonly(_assetDescMap),
    furnitureUsersMap: readonly(_furnitureUsersMap),
    // Furniture rows cache (lazy-loaded)
    furnitureRows: readonly(_furnitureRows),
    furnitureRowsReady: readonly(_furnitureRowsReady),
    furnitureRowsFetching: readonly(_furnitureRowsFetching),
    furnitureRowsProgress: readonly(_furnitureRowsProgress),
    // Raw lists for admin pages
    level1List: readonly(_level1List),
    level2List: readonly(_level2List),
    level3List: readonly(_level3List),
    categories: readonly(_categories),
    subCategories: readonly(_subCategories),
    assetDescriptions: readonly(_assetDescriptions),
    language: readonly(_language),
    // State
    ready: readonly(_ready),
    fetching: readonly(_fetching),
    lastFetched: readonly(_lastFetched),
    // Actions
    init,
    refresh,
    ensureFurnitureRows,
    refreshFurnitureRows
  };
}

export { useDashboardStore as u };
//# sourceMappingURL=useDashboardStore-DQi0OiAF.mjs.map
