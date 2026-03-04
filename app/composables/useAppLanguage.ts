/**
 * App Language Composable
 *
 * Manages the application's display language (English / Arabic).
 * When Arabic is selected:
 *  - Layout direction is RTL
 *  - Labels are resolved from the `arabic` column of etgLanguage
 * When English is selected:
 *  - Layout direction is LTR
 *  - Labels are resolved from the `eng` column of etgLanguage
 *
 * The etgLanguage table has: { ID, eng, arabic }
 * Any field code (like A7, A8, etc.) can be resolved to a readable label
 * using the `resolve(id)` function.
 */

export type AppLang = 'en' | 'ar'

// Global reactive state (shared across all components)
const _lang = ref<AppLang>('en')
const _langMap = ref<Record<string, { eng: string, arabic: string }>>({})
const _loaded = ref(false)
const _loading = ref(false)

export function useAppLanguage() {
    const lang = computed(() => _lang.value)
    const isRTL = computed(() => _lang.value === 'ar')
    const dir = computed(() => _lang.value === 'ar' ? 'rtl' : 'ltr')
    const langField = computed(() => _lang.value === 'ar' ? 'arabic' : 'eng')

    /**
     * Set the app language and apply RTL/LTR to the document
     */
    function setLang(newLang: AppLang) {
        _lang.value = newLang
        if (import.meta.client) {
            localStorage.setItem('etg_lang', newLang)
            const newDir = newLang === 'ar' ? 'rtl' : 'ltr'
            document.documentElement.dir = newDir
            document.documentElement.lang = newLang

            // Sync direction + sidebar side into the cookie-backed appSettings
            // so SidebarProvider, Sidebar, SidebarInset etc. all flip correctly
            const { updateAppSettings } = useAppSettings()
            updateAppSettings({
                direction: newDir,
                sidebar: { side: newLang === 'ar' ? 'right' : 'left' },
            })
        }
    }

    /**
     * Load the etgLanguage lookup table from BigQuery
     */
    async function loadLanguageMap() {
        if (_loaded.value || _loading.value) return
        _loading.value = true
        try {
            const data = await $fetch<{
                success: boolean
                language: Array<{ ID: string, eng: string, arabic: string }>
            }>('/api/bigquery/language')
            if (data.success && data.language) {
                const map: Record<string, { eng: string, arabic: string }> = {}
                for (const row of data.language) {
                    if (row.ID) {
                        map[row.ID] = { eng: row.eng || row.ID, arabic: row.arabic || row.ID }
                    }
                }
                _langMap.value = map
                _loaded.value = true
            }
        }
        catch (e) {
            console.warn('Failed to load language map:', e)
        }
        finally {
            _loading.value = false
        }
    }

    /**
     * Resolve an ID to its label in the current language.
     * Falls back to the ID itself if not found.
     */
    function resolve(id: string | undefined | null): string {
        if (!id) return ''
        const entry = _langMap.value[id]
        if (!entry) return id
        return _lang.value === 'ar' ? (entry.arabic || entry.eng || id) : (entry.eng || id)
    }

    /**
     * Resolve an ID to a specific language field
     */
    function resolveAs(id: string | undefined | null, field: 'eng' | 'arabic'): string {
        if (!id) return ''
        const entry = _langMap.value[id]
        if (!entry) return id
        return entry[field] || id
    }

    /**
     * Initialize: load from localStorage + fetch language map
     */
    function init() {
        if (import.meta.client) {
            const saved = localStorage.getItem('etg_lang') as AppLang | null
            if (saved === 'ar' || saved === 'en') {
                _lang.value = saved
                const dir = saved === 'ar' ? 'rtl' : 'ltr'
                document.documentElement.dir = dir
                document.documentElement.lang = saved

                // Sync into cookie-backed appSettings for sidebar components
                const { updateAppSettings } = useAppSettings()
                updateAppSettings({
                    direction: dir,
                    sidebar: { side: saved === 'ar' ? 'right' : 'left' },
                })
            }
        }
        loadLanguageMap()
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
        init,
    }
}
