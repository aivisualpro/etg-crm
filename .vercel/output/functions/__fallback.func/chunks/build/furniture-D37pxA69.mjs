import { u as useAuth, a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, createBlock, openBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import NumberFlow from '@number-flow/vue';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
import { u as useAppLanguage } from './useAppLanguage-D9JerBy5.mjs';
import { u as useDashboardStore } from './useDashboardStore-DQi0OiAF.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
import '@google-cloud/bigquery';
import 'googleapis';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import 'reka-ui';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "furniture",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Furniture Report", icon: "i-lucide-bar-chart-3", description: "Furniture analytics & insights" });
    const isMounted = ref(false);
    const { user: authUser } = useAuth();
    const { resolve: resolveLang, lang: appLang } = useAppLanguage();
    const {
      level1Map,
      level2Map,
      level3Map,
      subCatMap,
      assetDescMap,
      furnitureUsersMap: usersMap,
      init,
      // Furniture rows cache — lazy-loaded, persists across navigations
      furnitureRows,
      furnitureRowsReady,
      furnitureRowsFetching,
      furnitureRowsProgress,
      ensureFurnitureRows
    } = useDashboardStore();
    init();
    ensureFurnitureRows();
    const loading = computed(() => furnitureRowsFetching.value && !furnitureRowsReady.value);
    const rows = computed(() => furnitureRows.value);
    const searchQuery = ref("");
    const sidebarCollapsed = ref(false);
    const selLevel1 = ref([]);
    const selLevel2 = ref([]);
    const selLevel3 = ref([]);
    const selSubCat = ref([]);
    const selCondition = ref([]);
    const selUser = ref([]);
    const dateFrom = ref("");
    const dateTo = ref("");
    const filterSearch = reactive({ level1: "", level2: "", level3: "", subCat: "", condition: "", user: "" });
    function rl(map, key) {
      const entry = map[key];
      if (!entry) return key;
      return appLang.value === "ar" ? entry.arabic || entry.eng || key : entry.eng || key;
    }
    function resolveL1(key) {
      return rl(level1Map.value, key);
    }
    function resolveL2(key) {
      return rl(level2Map.value, key);
    }
    function resolveL3(key) {
      return rl(level3Map.value, key);
    }
    function resolveSC(key) {
      return rl(subCatMap.value, key);
    }
    function resolveAD(key) {
      return rl(assetDescMap.value, key);
    }
    function resolveUser(key) {
      return usersMap.value[key] || key;
    }
    const level2NameToIds = computed(() => {
      const map = {};
      for (const r of rows.value) {
        const id = r.A8;
        if (!id) continue;
        const name = resolveL2(id);
        if (!map[name]) map[name] = /* @__PURE__ */ new Set();
        map[name].add(id);
      }
      return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v]]));
    });
    function filterExcluding(excludeKey) {
      let recs = [...rows.value];
      if (excludeKey !== "level1" && selLevel1.value.length) recs = recs.filter((r) => selLevel1.value.includes(r.A7));
      if (excludeKey !== "level2" && selLevel2.value.length) {
        const ids = /* @__PURE__ */ new Set();
        for (const name of selLevel2.value) {
          for (const id of level2NameToIds.value[name] || []) ids.add(id);
        }
        recs = recs.filter((r) => ids.has(r.A8));
      }
      if (excludeKey !== "level3" && selLevel3.value.length) recs = recs.filter((r) => selLevel3.value.includes(r.A9));
      if (excludeKey !== "subCat" && selSubCat.value.length) recs = recs.filter((r) => selSubCat.value.includes(r.A66));
      if (excludeKey !== "condition" && selCondition.value.length) recs = recs.filter((r) => selCondition.value.includes(r.A75));
      if (excludeKey !== "user" && selUser.value.length) recs = recs.filter((r) => selUser.value.includes(r.A2));
      return recs;
    }
    function countSorted(recs, field, resolverMap) {
      const counts = {};
      for (const r of recs) {
        const v = r[field];
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({
        value,
        label: resolverMap ? rl(resolverMap, value) : value,
        count
      })).sort((a, b) => b.count - a.count);
    }
    function userCountSorted(recs) {
      const counts = {};
      for (const r of recs) {
        const v = r.A2;
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolveUser(value), count })).sort((a, b) => a.label.localeCompare(b.label));
    }
    const level1Opts = computed(() => countSorted(filterExcluding("level1"), "A7", level1Map.value));
    const level2Opts = computed(() => {
      const recs = filterExcluding("level2");
      const nameCounts = {};
      for (const r of recs) {
        const v = r.A8;
        if (!v) continue;
        const name = resolveL2(v);
        nameCounts[name] = (nameCounts[name] || 0) + 1;
      }
      return Object.entries(nameCounts).map(([label, count]) => ({ value: label, label, count })).sort((a, b) => b.count - a.count);
    });
    const level3Opts = computed(() => countSorted(filterExcluding("level3"), "A9", level3Map.value));
    const subCatOpts = computed(() => countSorted(filterExcluding("subCat"), "A66", subCatMap.value));
    const conditionOpts = computed(() => {
      const recs = filterExcluding("condition");
      const counts = {};
      for (const r of recs) {
        const v = r.A75;
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolveLang(value), count })).sort((a, b) => b.count - a.count);
    });
    const userOpts = computed(() => userCountSorted(filterExcluding("user")));
    function clearAllFilters() {
      selLevel1.value = [];
      selLevel2.value = [];
      selLevel3.value = [];
      selSubCat.value = [];
      selCondition.value = [];
      selUser.value = [];
      dateFrom.value = "";
      dateTo.value = "";
      searchQuery.value = "";
    }
    const hasFilters = computed(
      () => selLevel1.value.length || selLevel2.value.length || selLevel3.value.length || selSubCat.value.length || selCondition.value.length || selUser.value.length || dateFrom.value || dateTo.value || searchQuery.value.trim()
    );
    function filteredSearchOpts(opts, search) {
      if (!search.trim()) return opts;
      const q = search.toLowerCase();
      return opts.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
    }
    const savedTemplates = ref([]);
    const loadingTemplates = ref(false);
    const showSaveDialog = ref(false);
    const templateName = ref("");
    const savingTemplate = ref(false);
    const showTemplatesDropdown = ref(false);
    function getCurrentFilters() {
      return {
        selLevel1: selLevel1.value,
        selLevel2: selLevel2.value,
        selLevel3: selLevel3.value,
        selSubCat: selSubCat.value,
        selCondition: selCondition.value,
        selUser: selUser.value,
        dateFrom: dateFrom.value,
        dateTo: dateTo.value
      };
    }
    async function saveTemplate() {
      const email = authUser.value?.email;
      if (!templateName.value.trim() || !email) return;
      savingTemplate.value = true;
      try {
        const res = await $fetch("/api/bigquery/user-filter-templates", {
          method: "POST",
          body: {
            email,
            name: templateName.value.trim(),
            route: "/reports/furniture",
            filters: getCurrentFilters()
          }
        });
        if (res.success) {
          toast.success(`Template "${templateName.value.trim()}" saved!`);
          showSaveDialog.value = false;
          templateName.value = "";
          savedTemplates.value.push(res.template);
        }
      } catch {
        toast.error("Failed to save template");
      } finally {
        savingTemplate.value = false;
      }
    }
    ref(null);
    function parseTS(val) {
      if (!val) return null;
      const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/);
      if (!parts) return null;
      return new Date(+parts[3], +parts[1] - 1, +parts[2], +parts[4], +parts[5], +parts[6]);
    }
    const filtered = computed(() => {
      let recs = [...rows.value];
      if (selLevel1.value.length) recs = recs.filter((r) => selLevel1.value.includes(r.A7));
      if (selLevel2.value.length) {
        const ids = /* @__PURE__ */ new Set();
        for (const name of selLevel2.value) {
          for (const id of level2NameToIds.value[name] || []) ids.add(id);
        }
        recs = recs.filter((r) => ids.has(r.A8));
      }
      if (selLevel3.value.length) recs = recs.filter((r) => selLevel3.value.includes(r.A9));
      if (selSubCat.value.length) recs = recs.filter((r) => selSubCat.value.includes(r.A66));
      if (selCondition.value.length) recs = recs.filter((r) => selCondition.value.includes(r.A75));
      if (selUser.value.length) recs = recs.filter((r) => selUser.value.includes(r.A2));
      if (dateFrom.value) {
        const f = new Date(dateFrom.value);
        recs = recs.filter((r) => {
          const d = parseTS(r.A213);
          return d && d >= f;
        });
      }
      if (dateTo.value) {
        const t = new Date(dateTo.value);
        t.setHours(23, 59, 59, 999);
        recs = recs.filter((r) => {
          const d = parseTS(r.A213);
          return d && d <= t;
        });
      }
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        recs = recs.filter((r) => [r.A70, r.A222, r.A77].filter(Boolean).some((v) => String(v).toLowerCase().includes(q)));
      }
      return recs;
    });
    const kpis = computed(() => {
      const recs = filtered.value;
      const total = recs.length;
      const conditions = {};
      const entities = /* @__PURE__ */ new Set();
      const users = /* @__PURE__ */ new Set();
      for (const r of recs) {
        if (r.A75) {
          const label = resolveLang(r.A75);
          conditions[label] = (conditions[label] || 0) + 1;
        }
        if (r.A7) entities.add(r.A7);
        if (r.A2) users.add(r.A2);
      }
      const goodCount = (conditions["Good"] || 0) + (conditions["Excellent"] || 0) + (conditions["3"] || 0);
      const fairCount = (conditions["Fair"] || 0) + (conditions["2"] || 0);
      const poorCount = (conditions["Poor"] || 0) + (conditions["Damaged"] || 0) + (conditions["1"] || 0);
      return { total, goodCount, fairCount, poorCount, entityCount: entities.size, userCount: users.size };
    });
    const topSubCats = computed(() => {
      const counts = {};
      for (const r of filtered.value) {
        if (r.A66) {
          const label = resolveSC(r.A66);
          counts[label] = (counts[label] || 0) + 1;
        }
      }
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const max = sorted[0]?.[1] || 1;
      return sorted.map(([name, count]) => ({ name, count, pct: Math.round(count / max * 100) }));
    });
    const byEntity = computed(() => {
      const counts = {};
      for (const r of filtered.value) {
        if (r.A7) {
          const label = resolveL1(r.A7);
          counts[label] = (counts[label] || 0) + 1;
        }
      }
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
    });
    function condColor(c) {
      const label = resolveLang(c);
      if (label === "Good" || label === "Excellent" || label === "3") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20";
      if (label === "Fair" || label === "2") return "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20";
      if (label === "Poor" || label === "Damaged" || label === "1") return "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20";
      return "bg-muted text-muted-foreground ring-border";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_Table = _sfc_main$8;
      const _component_TableHeader = _sfc_main$3;
      const _component_TableRow = _sfc_main$4;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$7;
      const _component_TableCell = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex" }, _attrs))} data-v-7188463d>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end" data-v-7188463d><div class="relative max-w-[200px]" data-v-7188463d>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(searchQuery),
            "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
            placeholder: "Search assets...",
            class: "pl-8 h-8 text-xs"
          }, null, _parent));
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-7188463d>${ssrInterpolate(unref(filtered).length.toLocaleString())} of ${ssrInterpolate(unref(rows).length.toLocaleString())}</p><div class="relative" data-v-7188463d>`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "outline",
            size: "sm",
            class: "h-8 text-xs gap-1.5",
            onClick: ($event) => showTemplatesDropdown.value = !unref(showTemplatesDropdown)
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-bookmark",
                  class: "size-3"
                }, null, _parent2, _scopeId));
                _push3(` Templates `);
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-chevron-down",
                  class: "size-3 text-muted-foreground"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-bookmark",
                    class: "size-3"
                  }),
                  createTextVNode(" Templates "),
                  createVNode(_component_Icon, {
                    name: "i-lucide-chevron-down",
                    class: "size-3 text-muted-foreground"
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          if (unref(showTemplatesDropdown)) {
            _push2(`<div class="absolute right-0 top-10 z-50 w-[280px] rounded-xl border bg-popover shadow-xl overflow-hidden" data-v-7188463d><div class="flex items-center justify-between px-3 py-2.5 border-b bg-muted/30" data-v-7188463d><span class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-7188463d>Saved Templates</span>`);
            if (unref(hasFilters)) {
              _push2(`<button class="flex items-center gap-1 text-[10px] text-primary hover:text-primary/80 font-medium transition-colors" data-v-7188463d>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-plus",
                class: "size-3"
              }, null, _parent));
              _push2(` Save Current </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(loadingTemplates)) {
              _push2(`<div class="flex items-center justify-center py-6" data-v-7188463d>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-loader-2",
                class: "size-4 animate-spin text-muted-foreground/40"
              }, null, _parent));
              _push2(`</div>`);
            } else if (unref(savedTemplates).length === 0) {
              _push2(`<div class="py-6 text-center" data-v-7188463d><div class="flex items-center justify-center size-10 rounded-xl bg-muted/50 mx-auto mb-2" data-v-7188463d>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-bookmark-x",
                class: "size-5 text-muted-foreground/30"
              }, null, _parent));
              _push2(`</div><p class="text-[11px] text-muted-foreground" data-v-7188463d>No saved templates yet</p><p class="text-[10px] text-muted-foreground/50 mt-0.5" data-v-7188463d>Set filters, then click &quot;Save Current&quot;</p></div>`);
            } else {
              _push2(`<div class="max-h-[240px] overflow-y-auto" data-v-7188463d><!--[-->`);
              ssrRenderList(unref(savedTemplates), (t) => {
                _push2(`<div role="button" tabindex="0" class="group w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left border-b border-border/30 last:border-b-0 cursor-pointer" data-v-7188463d><div class="flex items-center justify-center size-7 rounded-lg bg-primary/10 shrink-0" data-v-7188463d>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-bookmark",
                  class: "size-3.5 text-primary"
                }, null, _parent));
                _push2(`</div><div class="flex-1 min-w-0" data-v-7188463d><p class="text-xs font-medium truncate" data-v-7188463d>${ssrInterpolate(t.name)}</p><p class="text-[10px] text-muted-foreground/60" data-v-7188463d>${ssrInterpolate(t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "")}</p></div><button class="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/10 transition-all shrink-0" title="Delete template" data-v-7188463d>`);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-trash-2",
                  class: "size-3 text-destructive"
                }, null, _parent));
                _push2(`</button></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (unref(hasFilters)) {
            _push2(ssrRenderComponent(_component_Button, {
              variant: "ghost",
              size: "sm",
              class: "h-8 text-xs gap-1",
              onClick: clearAllFilters
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-x",
                    class: "size-3"
                  }, null, _parent2, _scopeId));
                  _push3(` Clear `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "i-lucide-x",
                      class: "size-3"
                    }),
                    createTextVNode(" Clear ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_Button, {
            variant: "ghost",
            size: "sm",
            class: "h-8",
            onClick: ($event) => sidebarCollapsed.value = !unref(sidebarCollapsed)
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: unref(sidebarCollapsed) ? "i-lucide-panel-right-open" : "i-lucide-panel-right-close",
                  class: "size-3.5"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: unref(sidebarCollapsed) ? "i-lucide-panel-right-open" : "i-lucide-panel-right-close",
                    class: "size-3.5"
                  }, null, 8, ["name"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div>`);
        }, "#header-toolbar", false, _parent);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showSaveDialog)) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center" data-v-7188463d><div class="absolute inset-0 bg-black/40 backdrop-blur-sm" data-v-7188463d></div><div class="relative w-[380px] bg-card rounded-2xl shadow-2xl border overflow-hidden" data-v-7188463d><div class="px-5 pt-5 pb-3" data-v-7188463d><div class="flex items-center gap-3 mb-1" data-v-7188463d><div class="flex items-center justify-center size-9 rounded-xl bg-primary/10" data-v-7188463d>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-bookmark-plus",
            class: "size-4.5 text-primary"
          }, null, _parent));
          _push2(`</div><div data-v-7188463d><h3 class="text-sm font-semibold" data-v-7188463d>Save Filter Template</h3><p class="text-[11px] text-muted-foreground" data-v-7188463d>Save your current filter settings for quick access later</p></div></div></div><div class="px-5 pb-3" data-v-7188463d><label class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5" data-v-7188463d>Template Name</label>`);
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(templateName),
            "onUpdate:modelValue": ($event) => isRef(templateName) ? templateName.value = $event : null,
            placeholder: "e.g. Building A — Good condition",
            class: "h-9 text-sm",
            autofocus: "",
            onKeydown: saveTemplate
          }, null, _parent));
          _push2(`<div class="mt-3 p-3 rounded-lg bg-muted/40 border border-border/30" data-v-7188463d><p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2" data-v-7188463d>Active Filters</p><div class="flex flex-wrap gap-1" data-v-7188463d><!--[-->`);
          ssrRenderList(unref(selLevel1), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(resolveL1(v))}</span>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(selLevel2), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(v)}</span>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(selLevel3), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(resolveL3(v))}</span>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(selSubCat), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(resolveSC(v))}</span>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(selCondition), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(unref(resolveLang)(v))}</span>`);
          });
          _push2(`<!--]--><!--[-->`);
          ssrRenderList(unref(selUser), (v) => {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-600 text-[9px] font-medium" data-v-7188463d>${ssrInterpolate(resolveUser(v))}</span>`);
          });
          _push2(`<!--]-->`);
          if (unref(dateFrom)) {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-medium" data-v-7188463d>From: ${ssrInterpolate(unref(dateFrom))}</span>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(dateTo)) {
            _push2(`<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[9px] font-medium" data-v-7188463d>To: ${ssrInterpolate(unref(dateTo))}</span>`);
          } else {
            _push2(`<!---->`);
          }
          if (!unref(hasFilters)) {
            _push2(`<span class="text-[10px] text-muted-foreground/50 italic" data-v-7188463d>No filters active</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div><div class="flex items-center justify-end gap-2 px-5 py-4 border-t bg-muted/20" data-v-7188463d>`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "outline",
            size: "sm",
            class: "h-8 text-xs",
            onClick: ($event) => showSaveDialog.value = false
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Cancel`);
              } else {
                return [
                  createTextVNode("Cancel")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_Button, {
            size: "sm",
            class: "h-8 text-xs gap-1.5",
            disabled: !unref(templateName).trim() || unref(savingTemplate),
            onClick: saveTemplate
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                if (unref(savingTemplate)) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-loader-2",
                    class: "size-3 animate-spin"
                  }, null, _parent2, _scopeId));
                } else {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-save",
                    class: "size-3"
                  }, null, _parent2, _scopeId));
                }
                _push3(` ${ssrInterpolate(unref(savingTemplate) ? "Saving..." : "Save Template")}`);
              } else {
                return [
                  unref(savingTemplate) ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: "i-lucide-loader-2",
                    class: "size-3 animate-spin"
                  })) : (openBlock(), createBlock(_component_Icon, {
                    key: 1,
                    name: "i-lucide-save",
                    class: "size-3"
                  })),
                  createTextVNode(" " + toDisplayString(unref(savingTemplate) ? "Saving..." : "Save Template"), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      if (!unref(sidebarCollapsed)) {
        _push(`<aside class="w-[260px] shrink-0 border-r overflow-y-auto overflow-x-hidden bg-card/50" data-v-7188463d><div class="p-3 space-y-3" data-v-7188463d><div data-v-7188463d><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2" data-v-7188463d>Date Range</h4><div class="grid grid-cols-2 gap-1.5" data-v-7188463d>`);
        _push(ssrRenderComponent(_component_Input, {
          modelValue: unref(dateFrom),
          "onUpdate:modelValue": ($event) => isRef(dateFrom) ? dateFrom.value = $event : null,
          type: "date",
          class: "h-7 text-[11px]"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Input, {
          modelValue: unref(dateTo),
          "onUpdate:modelValue": ($event) => isRef(dateTo) ? dateTo.value = $event : null,
          type: "date",
          class: "h-7 text-[11px]"
        }, null, _parent));
        _push(`</div></div><!--[-->`);
        ssrRenderList([
          { key: "level1", title: "Entity", opts: unref(level1Opts), sel: unref(selLevel1) },
          { key: "level2", title: "Level 2", opts: unref(level2Opts), sel: unref(selLevel2) },
          { key: "level3", title: "Level 3", opts: unref(level3Opts), sel: unref(selLevel3) },
          { key: "subCat", title: "Subcategory", opts: unref(subCatOpts), sel: unref(selSubCat) },
          { key: "condition", title: "Condition", opts: unref(conditionOpts), sel: unref(selCondition) },
          { key: "user", title: "User", opts: unref(userOpts), sel: unref(selUser) }
        ], (section) => {
          _push(`<div data-v-7188463d><div class="flex items-center justify-between mb-1.5" data-v-7188463d><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider" data-v-7188463d>${ssrInterpolate(section.title)}</h4>`);
          if (section.sel.length) {
            _push(`<button class="text-[9px] text-primary hover:underline" data-v-7188463d> Clear (${ssrInterpolate(section.sel.length)}) </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (section.opts.length > 6) {
            _push(`<div class="mb-1" data-v-7188463d>`);
            _push(ssrRenderComponent(_component_Input, {
              modelValue: unref(filterSearch)[section.key],
              "onUpdate:modelValue": ($event) => unref(filterSearch)[section.key] = $event,
              placeholder: "Filter...",
              class: "h-6 text-[10px]"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="max-h-[140px] overflow-y-auto space-y-0.5 custom-scrollbar" data-v-7188463d><!--[-->`);
          ssrRenderList(filteredSearchOpts(section.opts, unref(filterSearch)[section.key] || ""), (opt) => {
            _push(`<button class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80", "w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] transition-colors"])}" data-v-7188463d><div class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary border-primary" : "border-border", "size-3 rounded border shrink-0 flex items-center justify-center transition-colors"])}" data-v-7188463d>`);
            if (section.sel.includes(opt.value)) {
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-check",
                class: "size-2 text-primary-foreground"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><span class="truncate flex-1" data-v-7188463d>${ssrInterpolate(opt.label)}</span><span class="text-[9px] tabular-nums text-muted-foreground shrink-0" data-v-7188463d>${ssrInterpolate(opt.count.toLocaleString())}</span></button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 min-w-0 overflow-y-auto" data-v-7188463d>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center py-40" data-v-7188463d><div class="flex flex-col items-center gap-4 text-muted-foreground" data-v-7188463d><div class="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center" data-v-7188463d>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-7 animate-spin text-blue-500"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium" data-v-7188463d>Loading furniture report...</p>`);
        if (unref(furnitureRowsProgress) > 0) {
          _push(`<div class="flex flex-col items-center gap-2" data-v-7188463d><div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden" data-v-7188463d><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${unref(furnitureRowsProgress)}%` })}" data-v-7188463d></div></div><p class="text-xs tabular-nums text-muted-foreground" data-v-7188463d>${ssrInterpolate(unref(furnitureRows).length.toLocaleString())} rows loaded · ${ssrInterpolate(unref(furnitureRowsProgress))}%</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-[10px] text-muted-foreground/60" data-v-7188463d>This only happens once — subsequent visits are instant.</p></div></div>`);
      } else {
        _push(`<!--[--><div class="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" data-v-7188463d><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider" data-v-7188463d>Total Assets</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).total,
          class: "text-2xl font-bold tabular-nums"
        }, null, _parent));
        _push(`</div><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-emerald-500 uppercase tracking-wider" data-v-7188463d>Good</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).goodCount,
          class: "text-2xl font-bold tabular-nums text-emerald-600"
        }, null, _parent));
        _push(`</div><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-amber-500 uppercase tracking-wider" data-v-7188463d>Fair</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).fairCount,
          class: "text-2xl font-bold tabular-nums text-amber-600"
        }, null, _parent));
        _push(`</div><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-red-500 uppercase tracking-wider" data-v-7188463d>Poor</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).poorCount,
          class: "text-2xl font-bold tabular-nums text-red-600"
        }, null, _parent));
        _push(`</div><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider" data-v-7188463d>Entities</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).entityCount,
          class: "text-2xl font-bold tabular-nums"
        }, null, _parent));
        _push(`</div><div class="rounded-xl border bg-card p-4 space-y-1" data-v-7188463d><p class="text-[10px] font-medium text-muted-foreground uppercase tracking-wider" data-v-7188463d>Users</p>`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(kpis).userCount,
          class: "text-2xl font-bold tabular-nums"
        }, null, _parent));
        _push(`</div></div><div class="px-4 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-4" data-v-7188463d><div class="rounded-xl border bg-card p-4" data-v-7188463d><h3 class="text-xs font-semibold text-foreground mb-3 flex items-center gap-2" data-v-7188463d>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-bar-chart-3",
          class: "size-3.5 text-blue-500"
        }, null, _parent));
        _push(` Top Subcategories </h3><div class="space-y-2" data-v-7188463d><!--[-->`);
        ssrRenderList(unref(topSubCats), (item) => {
          _push(`<div class="flex items-center gap-3" data-v-7188463d><span class="text-[11px] text-muted-foreground w-[140px] truncate shrink-0"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")} data-v-7188463d>${ssrInterpolate(item.name)}</span><div class="flex-1 h-5 bg-muted/50 rounded overflow-hidden" data-v-7188463d><div class="h-full rounded bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700 ease-out flex items-center justify-end pr-1.5" style="${ssrRenderStyle({ width: `${item.pct}%` })}" data-v-7188463d>`);
          if (item.pct > 20) {
            _push(`<span class="text-[9px] font-medium text-white tabular-nums" data-v-7188463d>${ssrInterpolate(item.count.toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (item.pct <= 20) {
            _push(`<span class="text-[10px] font-medium tabular-nums text-muted-foreground shrink-0" data-v-7188463d>${ssrInterpolate(item.count.toLocaleString())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        if (unref(topSubCats).length === 0) {
          _push(`<p class="text-xs text-muted-foreground text-center py-4" data-v-7188463d>No data</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="rounded-xl border bg-card p-4" data-v-7188463d><h3 class="text-xs font-semibold text-foreground mb-3 flex items-center gap-2" data-v-7188463d>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-building-2",
          class: "size-3.5 text-violet-500"
        }, null, _parent));
        _push(` By Entity </h3><div class="space-y-1.5 max-h-[280px] overflow-y-auto custom-scrollbar" data-v-7188463d><!--[-->`);
        ssrRenderList(unref(byEntity), (item) => {
          _push(`<div class="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-muted/50 transition-colors" data-v-7188463d><span class="text-[11px] font-medium truncate flex-1"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")} data-v-7188463d>${ssrInterpolate(item.name)}</span><span class="text-[11px] font-semibold tabular-nums text-foreground ml-3" data-v-7188463d>${ssrInterpolate(item.count.toLocaleString())}</span></div>`);
        });
        _push(`<!--]-->`);
        if (unref(byEntity).length === 0) {
          _push(`<p class="text-xs text-muted-foreground text-center py-4" data-v-7188463d>No data</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="px-4 pb-4" data-v-7188463d><div class="rounded-xl border bg-card overflow-hidden" data-v-7188463d><div class="overflow-auto max-h-[400px]" data-v-7188463d>`);
        _push(ssrRenderComponent(_component_Table, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TableRow, { class: "border-b-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Asset Code`);
                              } else {
                                return [
                                  createTextVNode("Asset Code")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[50px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Entity`);
                              } else {
                                return [
                                  createTextVNode("Entity")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[140px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Level 2`);
                              } else {
                                return [
                                  createTextVNode("Level 2")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Level 3`);
                              } else {
                                return [
                                  createTextVNode("Level 3")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[130px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Subcategory`);
                              } else {
                                return [
                                  createTextVNode("Subcategory")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[150px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Asset Description`);
                              } else {
                                return [
                                  createTextVNode("Asset Description")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[90px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Condition`);
                              } else {
                                return [
                                  createTextVNode("Condition")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`User`);
                              } else {
                                return [
                                  createTextVNode("User")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Date`);
                              } else {
                                return [
                                  createTextVNode("Date")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Asset Code")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[50px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Entity")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[140px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Level 2")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Level 3")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[130px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Subcategory")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[150px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Asset Description")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Condition")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                              default: withCtx(() => [
                                createTextVNode("User")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Date")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TableRow, { class: "border-b-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Asset Code")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[50px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Entity")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[140px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Level 2")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Level 3")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[130px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Subcategory")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[150px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Asset Description")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Condition")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx(() => [
                              createTextVNode("User")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Date")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_TableBody, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(filtered).slice(0, 100), (row, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: row.ID || idx,
                        class: "hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(row.A70 || "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(row.A70 || "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (unref(level1Map)[row.A7]?.logo) {
                                    _push5(`<img${ssrRenderAttr("src", unref(level1Map)[row.A7].logo.startsWith("http") ? unref(level1Map)[row.A7].logo : `/api/gcs/${unref(level1Map)[row.A7].logo}`)} class="size-6 rounded-full object-cover ring-1 ring-border/30" loading="lazy" data-v-7188463d${_scopeId4}>`);
                                  } else {
                                    _push5(`<span class="text-xs text-muted-foreground" data-v-7188463d${_scopeId4}>—</span>`);
                                  }
                                } else {
                                  return [
                                    unref(level1Map)[row.A7]?.logo ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: unref(level1Map)[row.A7].logo.startsWith("http") ? unref(level1Map)[row.A7].logo : `/api/gcs/${unref(level1Map)[row.A7].logo}`,
                                      class: "size-6 rounded-full object-cover ring-1 ring-border/30",
                                      loading: "lazy"
                                    }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-xs text-muted-foreground"
                                    }, "—"))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(resolveL2(row.A8))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(resolveL2(row.A8)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(resolveL3(row.A9))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(resolveL3(row.A9)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(resolveSC(row.A66))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(resolveSC(row.A66)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(resolveAD(row.A67))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(resolveAD(row.A67)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (row.A75) {
                                    _push5(`<span class="${ssrRenderClass([condColor(row.A75), "inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1"])}" data-v-7188463d${_scopeId4}>${ssrInterpolate(unref(resolveLang)(row.A75))}</span>`);
                                  } else {
                                    _push5(`<span class="text-muted-foreground text-[11px]" data-v-7188463d${_scopeId4}>—</span>`);
                                  }
                                } else {
                                  return [
                                    row.A75 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1", condColor(row.A75)]
                                    }, toDisplayString(unref(resolveLang)(row.A75)), 3)) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground text-[11px]"
                                    }, "—"))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-[11px]" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(resolveUser(row.A2) || "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(resolveUser(row.A2) || "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(row.A213 ? row.A213.split(" ")[0] : "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(row.A213 ? row.A213.split(" ")[0] : "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.A70 || "—"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  unref(level1Map)[row.A7]?.logo ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: unref(level1Map)[row.A7].logo.startsWith("http") ? unref(level1Map)[row.A7].logo : `/api/gcs/${unref(level1Map)[row.A7].logo}`,
                                    class: "size-6 rounded-full object-cover ring-1 ring-border/30",
                                    loading: "lazy"
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-xs text-muted-foreground"
                                  }, "—"))
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, {
                                class: "text-[11px]",
                                dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(resolveL2(row.A8)), 1)
                                ]),
                                _: 2
                              }, 1032, ["dir"]),
                              createVNode(_component_TableCell, {
                                class: "text-[11px]",
                                dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(resolveL3(row.A9)), 1)
                                ]),
                                _: 2
                              }, 1032, ["dir"]),
                              createVNode(_component_TableCell, {
                                class: "text-[11px]",
                                dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(resolveSC(row.A66)), 1)
                                ]),
                                _: 2
                              }, 1032, ["dir"]),
                              createVNode(_component_TableCell, {
                                class: "text-[11px]",
                                dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(resolveAD(row.A67)), 1)
                                ]),
                                _: 2
                              }, 1032, ["dir"]),
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  row.A75 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1", condColor(row.A75)]
                                  }, toDisplayString(unref(resolveLang)(row.A75)), 3)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground text-[11px]"
                                  }, "—"))
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-[11px]" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(resolveUser(row.A2) || "—"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.A213 ? row.A213.split(" ")[0] : "—"), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (unref(filtered).length === 0) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: "9",
                              class: "h-32 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-7188463d${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-search-x",
                                    class: "size-8 text-muted-foreground/40"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p class="font-medium" data-v-7188463d${_scopeId4}>No matching assets</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-search-x",
                                        class: "size-8 text-muted-foreground/40"
                                      }),
                                      createVNode("p", { class: "font-medium" }, "No matching assets")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: "9",
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-search-x",
                                      class: "size-8 text-muted-foreground/40"
                                    }),
                                    createVNode("p", { class: "font-medium" }, "No matching assets")
                                  ])
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filtered).slice(0, 100), (row, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: row.ID || idx,
                          class: "hover:bg-muted/30 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.A70 || "—"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                unref(level1Map)[row.A7]?.logo ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: unref(level1Map)[row.A7].logo.startsWith("http") ? unref(level1Map)[row.A7].logo : `/api/gcs/${unref(level1Map)[row.A7].logo}`,
                                  class: "size-6 rounded-full object-cover ring-1 ring-border/30",
                                  loading: "lazy"
                                }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-xs text-muted-foreground"
                                }, "—"))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(resolveL2(row.A8)), 1)
                              ]),
                              _: 2
                            }, 1032, ["dir"]),
                            createVNode(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(resolveL3(row.A9)), 1)
                              ]),
                              _: 2
                            }, 1032, ["dir"]),
                            createVNode(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(resolveSC(row.A66)), 1)
                              ]),
                              _: 2
                            }, 1032, ["dir"]),
                            createVNode(_component_TableCell, {
                              class: "text-[11px]",
                              dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(resolveAD(row.A67)), 1)
                              ]),
                              _: 2
                            }, 1032, ["dir"]),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                row.A75 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ["inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1", condColor(row.A75)]
                                }, toDisplayString(unref(resolveLang)(row.A75)), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-muted-foreground text-[11px]"
                                }, "—"))
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-[11px]" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(resolveUser(row.A2) || "—"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.A213 ? row.A213.split(" ")[0] : "—"), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(filtered).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: "9",
                            class: "h-32 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-search-x",
                                  class: "size-8 text-muted-foreground/40"
                                }),
                                createVNode("p", { class: "font-medium" }, "No matching assets")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                  default: withCtx(() => [
                    createVNode(_component_TableRow, { class: "border-b-0" }, {
                      default: withCtx(() => [
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Asset Code")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[50px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Entity")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[140px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Level 2")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Level 3")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[130px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Subcategory")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[150px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Asset Description")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Condition")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                          default: withCtx(() => [
                            createTextVNode("User")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Date")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_TableBody, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(filtered).slice(0, 100), (row, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: row.ID || idx,
                        class: "hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.A70 || "—"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              unref(level1Map)[row.A7]?.logo ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: unref(level1Map)[row.A7].logo.startsWith("http") ? unref(level1Map)[row.A7].logo : `/api/gcs/${unref(level1Map)[row.A7].logo}`,
                                class: "size-6 rounded-full object-cover ring-1 ring-border/30",
                                loading: "lazy"
                              }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-xs text-muted-foreground"
                              }, "—"))
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, {
                            class: "text-[11px]",
                            dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resolveL2(row.A8)), 1)
                            ]),
                            _: 2
                          }, 1032, ["dir"]),
                          createVNode(_component_TableCell, {
                            class: "text-[11px]",
                            dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resolveL3(row.A9)), 1)
                            ]),
                            _: 2
                          }, 1032, ["dir"]),
                          createVNode(_component_TableCell, {
                            class: "text-[11px]",
                            dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resolveSC(row.A66)), 1)
                            ]),
                            _: 2
                          }, 1032, ["dir"]),
                          createVNode(_component_TableCell, {
                            class: "text-[11px]",
                            dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resolveAD(row.A67)), 1)
                            ]),
                            _: 2
                          }, 1032, ["dir"]),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              row.A75 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ["inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ring-1", condColor(row.A75)]
                              }, toDisplayString(unref(resolveLang)(row.A75)), 3)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted-foreground text-[11px]"
                              }, "—"))
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-[11px]" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resolveUser(row.A2) || "—"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.A213 ? row.A213.split(" ")[0] : "—"), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(filtered).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: "9",
                          class: "h-32 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-search-x",
                                class: "size-8 text-muted-foreground/40"
                              }),
                              createVNode("p", { class: "font-medium" }, "No matching assets")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(filtered).length > 100) {
          _push(`<div class="border-t px-4 py-2 text-xs text-muted-foreground" data-v-7188463d> Showing 100 of ${ssrInterpolate(unref(filtered).length.toLocaleString())} results. Use filters to narrow down. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/furniture.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const furniture = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7188463d"]]);

export { furniture as default };
//# sourceMappingURL=furniture-D37pxA69.mjs.map
