import { computed, ref } from 'vue';

const _lang = ref("en");
const _langMap = ref({});
const _loaded = ref(false);
const _loading = ref(false);
function useAppLanguage() {
  const lang = computed(() => _lang.value);
  const isRTL = computed(() => _lang.value === "ar");
  const dir = computed(() => _lang.value === "ar" ? "rtl" : "ltr");
  const langField = computed(() => _lang.value === "ar" ? "arabic" : "eng");
  function setLang(newLang) {
    _lang.value = newLang;
  }
  async function loadLanguageMap() {
    if (_loaded.value || _loading.value) return;
    _loading.value = true;
    try {
      const data = await $fetch("/api/bigquery/language");
      if (data.success && data.language) {
        const map = {};
        for (const row of data.language) {
          if (row.ID) {
            map[row.ID] = { eng: row.eng || row.ID, arabic: row.arabic || row.ID };
          }
        }
        _langMap.value = map;
        _loaded.value = true;
      }
    } catch (e) {
      console.warn("Failed to load language map:", e);
    } finally {
      _loading.value = false;
    }
  }
  function resolve(id) {
    if (!id) return "";
    const entry = _langMap.value[id];
    if (!entry) return id;
    return _lang.value === "ar" ? entry.arabic || entry.eng || id : entry.eng || id;
  }
  function resolveAs(id, field) {
    if (!id) return "";
    const entry = _langMap.value[id];
    if (!entry) return id;
    return entry[field] || id;
  }
  function init() {
    loadLanguageMap();
  }
  return {
    lang,
    isRTL,
    dir,
    langField,
    loaded: computed(() => _loaded.value),
    setLang,
    resolve,
    resolveAs,
    loadLanguageMap,
    init
  };
}

export { useAppLanguage as u };
//# sourceMappingURL=useAppLanguage-D9JerBy5.mjs.map
