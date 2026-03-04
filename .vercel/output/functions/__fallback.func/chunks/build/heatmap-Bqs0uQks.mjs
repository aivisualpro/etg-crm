import { p as useColorMode, a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { defineComponent, ref, computed, reactive, watch, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import NumberFlow from '@number-flow/vue';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
import { u as useAppLanguage } from './useAppLanguage-D9JerBy5.mjs';
import { u as useDashboardStore } from './useDashboardStore-DQi0OiAF.mjs';
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
import 'vue-sonner';
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
  __name: "heatmap",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Asset Map", icon: "i-lucide-map", description: "Geographic distribution of inventoried assets" });
    const isMounted = ref(false);
    const { resolve: resolveLang, lang: appLang } = useAppLanguage();
    const {
      level1Map,
      level2Map,
      level3Map,
      subCatMap,
      furnitureUsersMap: usersMap,
      init,
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
    const sidebarCollapsed = ref(false);
    const searchQuery = ref("");
    function rl(map2, key) {
      const entry = map2[key];
      if (!entry) return key;
      return appLang.value === "ar" ? entry.arabic || entry.eng || key : entry.eng || key;
    }
    function resolveL2(key) {
      return rl(level2Map.value, key);
    }
    function resolveUser(key) {
      return usersMap.value[key] || key;
    }
    const selLevel1 = ref([]);
    const selLevel2 = ref([]);
    const selLevel3 = ref([]);
    const selSubCat = ref([]);
    const selCondition = ref([]);
    const selUser = ref([]);
    const dateFrom = ref("");
    const dateTo = ref("");
    const filterSearch = reactive({ level1: "", level2: "", level3: "", subCat: "", condition: "", user: "" });
    function parseTS(val) {
      if (!val) return null;
      const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/);
      if (!parts) return null;
      return new Date(+parts[3], +parts[1] - 1, +parts[2], +parts[4], +parts[5], +parts[6]);
    }
    const level2NameToIds = computed(() => {
      const map2 = {};
      for (const r of rows.value) {
        const id = r.A8;
        if (!id) continue;
        const name = resolveL2(id);
        if (!map2[name]) map2[name] = /* @__PURE__ */ new Set();
        map2[name].add(id);
      }
      return Object.fromEntries(Object.entries(map2).map(([k, v]) => [k, [...v]]));
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
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolverMap ? rl(resolverMap, value) : value, count })).sort((a, b) => b.count - a.count);
    }
    function level2Sorted(recs) {
      const counts = {};
      for (const r of recs) {
        const id = r.A8;
        if (!id) continue;
        counts[resolveL2(id)] = (counts[resolveL2(id)] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({ value, label: value, count })).sort((a, b) => b.count - a.count);
    }
    function condSorted(recs) {
      const counts = {};
      for (const r of recs) {
        const v = r.A75;
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolveLang(value), count })).sort((a, b) => b.count - a.count);
    }
    function userSorted(recs) {
      const counts = {};
      for (const r of recs) {
        const v = r.A2;
        if (!v) continue;
        counts[v] = (counts[v] || 0) + 1;
      }
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolveUser(value), count })).sort((a, b) => b.count - a.count);
    }
    const level1Opts = computed(() => countSorted(filterExcluding("level1"), "A7", level1Map.value));
    const level2Opts = computed(() => level2Sorted(filterExcluding("level2")));
    const level3Opts = computed(() => countSorted(filterExcluding("level3"), "A9", level3Map.value));
    const subCatOpts = computed(() => countSorted(filterExcluding("subCat"), "A66", subCatMap.value));
    const conditionOpts = computed(() => condSorted(filterExcluding("condition")));
    const userOpts = computed(() => userSorted(filterExcluding("user")));
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
    const hasFilters = computed(() => selLevel1.value.length || selLevel2.value.length || selLevel3.value.length || selSubCat.value.length || selCondition.value.length || selUser.value.length || dateFrom.value || dateTo.value || searchQuery.value.trim());
    function filteredSearchOpts(opts, search) {
      if (!search.trim()) return opts;
      const q = search.toLowerCase();
      return opts.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
    }
    const filteredRows = computed(() => {
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
    const geoPoints = computed(() => {
      const pts = [];
      for (const r of filteredRows.value) {
        const raw = r.A79;
        if (!raw || typeof raw !== "string" || !raw.includes(",")) continue;
        const parts = raw.replace(/\s/g, "").split(",");
        const lat = parseFloat(parts[0] || "");
        const lng = parseFloat(parts[1] || "");
        if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) continue;
        pts.push({ lat, lng, cond: r.A75 || "", entity: r.A7 || "", code: r.A70 || "", l2: r.A8 || "", l3: r.A9 || "", user: r.A2 || "", desc: r.A222 || r.A67 || "" });
      }
      return pts;
    });
    const totalWithCoords = computed(() => geoPoints.value.length);
    const totalWithoutCoords = computed(() => filteredRows.value.length - geoPoints.value.length);
    ref(null);
    const mapReady = ref(false);
    const mapMode = ref("clusters");
    const colorMode = useColorMode();
    const isDark = computed(() => colorMode.value === "dark");
    let renderTimeout = null;
    watch([geoPoints, mapMode], () => {
      if (renderTimeout) clearTimeout(renderTimeout);
      renderTimeout = setTimeout(() => {
      }, 200);
    }, { deep: true });
    watch(isDark, () => {
    });
    const entered = ref(false);
    const filterSections = computed(() => [
      { key: "level1", title: "Entity", opts: level1Opts.value, sel: selLevel1.value },
      { key: "level2", title: "Level 2", opts: level2Opts.value, sel: selLevel2.value },
      { key: "level3", title: "Level 3", opts: level3Opts.value, sel: selLevel3.value },
      { key: "subCat", title: "Subcategory", opts: subCatOpts.value, sel: selSubCat.value },
      { key: "condition", title: "Condition", opts: conditionOpts.value, sel: selCondition.value },
      { key: "user", title: "User", opts: userOpts.value, sel: selUser.value }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex" }, _attrs))}>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end"><div class="relative max-w-[200px]">`);
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
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">${ssrInterpolate(unref(totalWithCoords).toLocaleString())} pins on map </p>`);
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
      if (!unref(sidebarCollapsed)) {
        _push(`<aside class="w-[260px] shrink-0 border-r overflow-y-auto overflow-x-hidden bg-card/50"><div class="p-3 space-y-3"><div class="rounded-lg border bg-gradient-to-br from-blue-500/5 to-violet-500/5 p-3"><div class="grid grid-cols-2 gap-2"><div class="text-center"><p class="text-lg font-bold tabular-nums text-emerald-500">`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(totalWithCoords),
          animated: true
        }, null, _parent));
        _push(`</p><p class="text-[9px] text-muted-foreground uppercase tracking-wider">With GPS</p></div><div class="text-center"><p class="text-lg font-bold tabular-nums text-muted-foreground/60">`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(totalWithoutCoords),
          animated: true
        }, null, _parent));
        _push(`</p><p class="text-[9px] text-muted-foreground uppercase tracking-wider">No GPS</p></div></div></div><div><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Date Range</h4><div class="grid grid-cols-2 gap-1.5">`);
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
        ssrRenderList(unref(filterSections), (section) => {
          _push(`<div><div class="flex items-center justify-between mb-1.5"><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">${ssrInterpolate(section.title)}</h4>`);
          if (section.sel.length) {
            _push(`<button class="text-[9px] text-primary hover:underline">Clear (${ssrInterpolate(section.sel.length)})</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (section.opts.length > 6) {
            _push(`<div class="mb-1">`);
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
          _push(`<div class="max-h-[130px] overflow-y-auto space-y-0.5 custom-scrollbar"><!--[-->`);
          ssrRenderList(filteredSearchOpts(section.opts, unref(filterSearch)[section.key] || ""), (opt) => {
            _push(`<button class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80", "w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] transition-colors"])}"><div class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary border-primary" : "border-border", "size-3 rounded border shrink-0 flex items-center justify-center transition-colors"])}">`);
            if (section.sel.includes(opt.value)) {
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-check",
                class: "size-2 text-primary-foreground"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><span class="truncate flex-1">${ssrInterpolate(opt.label)}</span><span class="text-[9px] tabular-nums text-muted-foreground shrink-0">${ssrInterpolate(opt.count.toLocaleString())}</span></button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 min-w-0 relative">`);
      if (unref(loading)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-background z-10"><div class="flex flex-col items-center gap-4 text-muted-foreground"><div class="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-7 animate-spin text-blue-500"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium">Loading map data...</p>`);
        if (unref(furnitureRowsProgress) > 0) {
          _push(`<div class="flex flex-col items-center gap-2"><div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${unref(furnitureRowsProgress)}%` })}"></div></div><p class="text-xs tabular-nums text-muted-foreground">${ssrInterpolate(unref(furnitureRowsProgress))}%</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0"></div>`);
      if (unref(mapReady)) {
        _push(`<div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4", "absolute top-4 left-4 z-[400] flex rounded-lg overflow-hidden border shadow-lg bg-card/90 backdrop-blur-md transition-all duration-500"])}"><button class="${ssrRenderClass([unref(mapMode) === "clusters" ? "bg-primary text-primary-foreground" : "hover:bg-muted", "px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-map-pin",
          class: "size-3"
        }, null, _parent));
        _push(` Clusters </button><button class="${ssrRenderClass([unref(mapMode) === "heat" ? "bg-primary text-primary-foreground" : "hover:bg-muted", "px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-flame",
          class: "size-3"
        }, null, _parent));
        _push(` Heat </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(mapReady)) {
        _push(`<div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "absolute bottom-6 left-4 z-[400] rounded-lg border shadow-lg bg-card/90 backdrop-blur-md p-3 transition-all duration-500"])}"><p class="text-[9px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">Condition</p><div class="space-y-1.5"><div class="flex items-center gap-2"><div class="size-3 rounded-full bg-emerald-500 ring-1 ring-white/20"></div><span class="text-[11px]">Good / Excellent</span></div><div class="flex items-center gap-2"><div class="size-3 rounded-full bg-amber-500 ring-1 ring-white/20"></div><span class="text-[11px]">Fair / Average</span></div><div class="flex items-center gap-2"><div class="size-3 rounded-full bg-red-500 ring-1 ring-white/20"></div><span class="text-[11px]">Poor / Damaged</span></div><div class="flex items-center gap-2"><div class="size-3 rounded-full bg-indigo-500 ring-1 ring-white/20"></div><span class="text-[11px]">Other</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(mapReady)) {
        _push(`<div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4", "absolute top-4 right-4 z-[400] rounded-lg border shadow-lg bg-card/90 backdrop-blur-md p-3 space-y-2 transition-all duration-500"])}"><div class="flex items-center gap-2"><div class="size-6 rounded-md bg-blue-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-map-pin",
          class: "size-3 text-blue-500"
        }, null, _parent));
        _push(`</div><div><p class="text-xs font-bold tabular-nums">`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(totalWithCoords),
          animated: true
        }, null, _parent));
        _push(`</p><p class="text-[8px] text-muted-foreground">Geo-tagged</p></div></div><div class="flex items-center gap-2"><div class="size-6 rounded-md bg-amber-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-box",
          class: "size-3 text-amber-500"
        }, null, _parent));
        _push(`</div><div><p class="text-xs font-bold tabular-nums">`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: unref(filteredRows).length,
          animated: true
        }, null, _parent));
        _push(`</p><p class="text-[8px] text-muted-foreground">Total filtered</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(mapReady) && unref(totalWithCoords) === 0 && !unref(loading)) {
        _push(`<div class="absolute inset-0 z-[399] flex items-center justify-center pointer-events-none"><div class="bg-card/95 backdrop-blur-xl rounded-2xl border shadow-2xl p-8 flex flex-col items-center gap-3 pointer-events-auto max-w-xs text-center"><div class="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-map-pin-off",
          class: "size-7 text-blue-500/60"
        }, null, _parent));
        _push(`</div><h3 class="text-sm font-semibold">No Geo-Tagged Assets</h3><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(filteredRows).length > 0 ? `${unref(filteredRows).length.toLocaleString()} assets match your filters, but none have GPS coordinates.` : "No assets match current filters.")}</p>`);
        if (unref(hasFilters)) {
          _push(ssrRenderComponent(_component_Button, {
            variant: "outline",
            size: "sm",
            class: "gap-1",
            onClick: clearAllFilters
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-x",
                  class: "size-3"
                }, null, _parent2, _scopeId));
                _push2(` Clear Filters`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-x",
                    class: "size-3"
                  }),
                  createTextVNode(" Clear Filters")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/heatmap.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=heatmap-Bqs0uQks.mjs.map
