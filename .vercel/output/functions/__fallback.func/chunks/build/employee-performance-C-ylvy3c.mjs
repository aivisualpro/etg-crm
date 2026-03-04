import { a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$3 } from './index-GIPsDWUk.mjs';
import { _ as _sfc_main$8, a as _sfc_main$4, b as _sfc_main$4$1, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { _ as _sfc_main$2$1, a as _sfc_main$1$2 } from './AvatarImage-B6YLb4UI.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import NumberFlow from '@number-flow/vue';
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
  __name: "employee-performance",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Employee Performance", icon: "i-lucide-trophy", description: "Track productivity & asset coverage" });
    const isMounted = ref(false);
    const { resolve: resolveLang, lang: appLang } = useAppLanguage();
    const {
      level1Map,
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
    const searchQuery = ref("");
    const sidebarCollapsed = ref(false);
    function rl(map, key) {
      const entry = map[key];
      if (!entry) return key;
      return appLang.value === "ar" ? entry.arabic || entry.eng || key : entry.eng || key;
    }
    function resolveL1(key) {
      return rl(level1Map.value, key);
    }
    function resolveUser(key) {
      return usersMap.value[key] || key;
    }
    function parseTS(val) {
      if (!val) return null;
      const parts = val.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})$/);
      if (!parts) return null;
      return new Date(+parts[3], +parts[1] - 1, +parts[2], +parts[4], +parts[5], +parts[6]);
    }
    const selLevel1 = ref([]);
    const selCondition = ref([]);
    const selUser = ref([]);
    const dateFrom = ref("");
    const dateTo = ref("");
    const filterSearch = reactive({ level1: "", condition: "", user: "" });
    function filterExcluding(excludeKey) {
      let recs = [...rows.value];
      if (excludeKey !== "level1" && selLevel1.value.length) recs = recs.filter((r) => selLevel1.value.includes(r.A7));
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
      return Object.entries(counts).map(([value, count]) => ({ value, label: resolveUser(value), count })).sort((a, b) => b.count - a.count);
    }
    const level1Opts = computed(() => countSorted(filterExcluding("level1"), "A7", level1Map.value));
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
      selCondition.value = [];
      selUser.value = [];
      dateFrom.value = "";
      dateTo.value = "";
      searchQuery.value = "";
    }
    const hasFilters = computed(
      () => selLevel1.value.length || selCondition.value.length || selUser.value.length || dateFrom.value || dateTo.value || searchQuery.value.trim()
    );
    function filteredSearchOpts(opts, search) {
      if (!search.trim()) return opts;
      const q = search.toLowerCase();
      return opts.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
    }
    const filteredRows = computed(() => {
      let recs = [...rows.value];
      if (selLevel1.value.length) recs = recs.filter((r) => selLevel1.value.includes(r.A7));
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
      return recs;
    });
    const employeeStats = computed(() => {
      const statsMap = {};
      for (const r of filteredRows.value) {
        const userId = r.A2;
        if (!userId) continue;
        if (!statsMap[userId]) {
          statsMap[userId] = { id: userId, name: resolveUser(userId), totalAssets: 0, locations: /* @__PURE__ */ new Set(), conditions: {}, dailyCounts: {}, firstActivity: null, lastActivity: null, activeDays: /* @__PURE__ */ new Set(), subcategories: /* @__PURE__ */ new Set() };
        }
        const stat = statsMap[userId];
        stat.totalAssets++;
        if (r.A7) stat.locations.add(r.A7);
        if (r.A66) stat.subcategories.add(r.A66);
        if (r.A75) {
          const cond = resolveLang(r.A75);
          stat.conditions[cond] = (stat.conditions[cond] || 0) + 1;
        }
        const ts = parseTS(r.A213);
        if (ts) {
          const dateKey = ts.toISOString().slice(0, 10);
          stat.dailyCounts[dateKey] = (stat.dailyCounts[dateKey] || 0) + 1;
          stat.activeDays.add(dateKey);
          if (!stat.firstActivity || ts < stat.firstActivity) stat.firstActivity = ts;
          if (!stat.lastActivity || ts > stat.lastActivity) stat.lastActivity = ts;
        }
      }
      return Object.values(statsMap).sort((a, b) => b.totalAssets - a.totalAssets);
    });
    const totalEmployees = computed(() => employeeStats.value.length);
    const totalAssetsProcessed = computed(() => filteredRows.value.length);
    const avgPerEmployee = computed(() => totalEmployees.value > 0 ? Math.round(totalAssetsProcessed.value / totalEmployees.value) : 0);
    const topPerformer = computed(() => employeeStats.value[0] || null);
    const totalLocations = computed(() => {
      const s = /* @__PURE__ */ new Set();
      for (const e of employeeStats.value) e.locations.forEach((l) => s.add(l));
      return s.size;
    });
    const leaderboard = computed(() => employeeStats.value.slice(0, 10));
    const maxAssets = computed(() => leaderboard.value[0]?.totalAssets || 1);
    const heatmapData = computed(() => {
      const counts = {};
      for (const r of filteredRows.value) {
        const ts = parseTS(r.A213);
        if (ts) {
          counts[ts.toISOString().slice(0, 10)] = (counts[ts.toISOString().slice(0, 10)] || 0) + 1;
        }
      }
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 83; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        days.push({ date: key, count: counts[key] || 0, dayOfWeek: d.getDay(), weekIdx: Math.floor((83 - i) / 7) });
      }
      return days;
    });
    const heatmapMax = computed(() => Math.max(...heatmapData.value.map((d) => d.count), 1));
    function heatmapColor(count) {
      if (count === 0) return "bg-muted/40";
      const ratio = count / heatmapMax.value;
      if (ratio < 0.25) return "bg-emerald-500/20";
      if (ratio < 0.5) return "bg-emerald-500/40";
      if (ratio < 0.75) return "bg-emerald-500/60";
      return "bg-emerald-500/90";
    }
    const conditionSummary = computed(() => {
      const counts = {};
      for (const r of filteredRows.value) {
        if (r.A75) {
          const label = resolveLang(r.A75);
          counts[label] = (counts[label] || 0) + 1;
        }
      }
      const total = Object.values(counts).reduce((s, c) => s + c, 0) || 1;
      return Object.entries(counts).map(([label, count]) => ({ label, count, pct: Math.round(count / total * 100) })).sort((a, b) => b.count - a.count);
    });
    function condBadgeClass(label) {
      const l = label.toLowerCase();
      if (l === "good" || l === "excellent" || l === "3") return "bg-emerald-500 text-white";
      if (l === "fair" || l === "2") return "bg-amber-500 text-white";
      if (l === "poor" || l === "damaged" || l === "1") return "bg-red-500 text-white";
      return "bg-zinc-500 text-white";
    }
    function condRingClass(label) {
      const l = label.toLowerCase();
      if (l === "good" || l === "excellent" || l === "3") return "text-emerald-500";
      if (l === "fair" || l === "2") return "text-amber-500";
      if (l === "poor" || l === "damaged" || l === "1") return "text-red-500";
      return "text-zinc-500";
    }
    const dailyTrend = computed(() => {
      const counts = {};
      for (const r of filteredRows.value) {
        const ts = parseTS(r.A213);
        if (ts) {
          const key = ts.toISOString().slice(0, 10);
          counts[key] = (counts[key] || 0) + 1;
        }
      }
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        days.push({ date: key, label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), count: counts[key] || 0 });
      }
      return days;
    });
    const trendMax = computed(() => Math.max(...dailyTrend.value.map((d) => d.count), 1));
    const entered = ref(false);
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_Badge = _sfc_main$3;
      const _component_Table = _sfc_main$8;
      const _component_TableHeader = _sfc_main$4;
      const _component_TableRow = _sfc_main$4$1;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$7;
      const _component_TableCell = _sfc_main$5;
      const _component_Avatar = _sfc_main$2$1;
      const _component_AvatarFallback = _sfc_main$1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex" }, _attrs))} data-v-d2fd05a4>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end" data-v-d2fd05a4><div class="relative max-w-[200px]" data-v-d2fd05a4>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(searchQuery),
            "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
            placeholder: "Search employees...",
            class: "pl-8 h-8 text-xs"
          }, null, _parent));
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-d2fd05a4>${ssrInterpolate(unref(filteredRows).length.toLocaleString())} of ${ssrInterpolate(unref(rows).length.toLocaleString())}</p>`);
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
        _push(`<aside class="w-[260px] shrink-0 border-r overflow-y-auto overflow-x-hidden bg-card/50" data-v-d2fd05a4><div class="p-3 space-y-3" data-v-d2fd05a4><div data-v-d2fd05a4><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider mb-2" data-v-d2fd05a4>Date Range</h4><div class="grid grid-cols-2 gap-1.5" data-v-d2fd05a4>`);
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
          { key: "user", title: "Employee", opts: unref(userOpts), sel: unref(selUser) },
          { key: "level1", title: "Entity", opts: unref(level1Opts), sel: unref(selLevel1) },
          { key: "condition", title: "Condition", opts: unref(conditionOpts), sel: unref(selCondition) }
        ], (section) => {
          _push(`<div data-v-d2fd05a4><div class="flex items-center justify-between mb-1.5" data-v-d2fd05a4><h4 class="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider" data-v-d2fd05a4>${ssrInterpolate(section.title)}</h4>`);
          if (section.sel.length) {
            _push(`<button class="text-[9px] text-primary hover:underline" data-v-d2fd05a4> Clear (${ssrInterpolate(section.sel.length)}) </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (section.opts.length > 6) {
            _push(`<div class="mb-1" data-v-d2fd05a4>`);
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
          _push(`<div class="max-h-[140px] overflow-y-auto space-y-0.5 custom-scrollbar" data-v-d2fd05a4><!--[-->`);
          ssrRenderList(filteredSearchOpts(section.opts, unref(filterSearch)[section.key] || ""), (opt) => {
            _push(`<button class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground/80", "w-full flex items-center gap-2 px-2 py-1 rounded text-left text-[11px] transition-colors"])}" data-v-d2fd05a4><div class="${ssrRenderClass([section.sel.includes(opt.value) ? "bg-primary border-primary" : "border-border", "size-3 rounded border shrink-0 flex items-center justify-center transition-colors"])}" data-v-d2fd05a4>`);
            if (section.sel.includes(opt.value)) {
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-check",
                class: "size-2 text-primary-foreground"
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div><span class="truncate flex-1" data-v-d2fd05a4>${ssrInterpolate(opt.label)}</span><span class="text-[9px] tabular-nums text-muted-foreground shrink-0" data-v-d2fd05a4>${ssrInterpolate(opt.count.toLocaleString())}</span></button>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex-1 min-w-0 overflow-y-auto" data-v-d2fd05a4>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center py-40" data-v-d2fd05a4><div class="flex flex-col items-center gap-4 text-muted-foreground" data-v-d2fd05a4><div class="size-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-7 animate-spin text-amber-500"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium" data-v-d2fd05a4>Loading performance data...</p>`);
        if (unref(furnitureRowsProgress) > 0) {
          _push(`<div class="flex flex-col items-center gap-2" data-v-d2fd05a4><div class="h-1.5 w-48 rounded-full bg-muted overflow-hidden" data-v-d2fd05a4><div class="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${unref(furnitureRowsProgress)}%` })}" data-v-d2fd05a4></div></div><p class="text-xs tabular-nums text-muted-foreground" data-v-d2fd05a4>${ssrInterpolate(unref(furnitureRowsProgress))}%</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="p-4 space-y-4" data-v-d2fd05a4><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" data-v-d2fd05a4><!--[-->`);
        ssrRenderList([
          { label: "Employees", value: unref(totalEmployees), icon: "i-lucide-users", gradient: "from-blue-500/15 to-transparent", iconBg: "bg-blue-500/15", iconColor: "text-blue-500", border: "border-blue-500/10" },
          { label: "Assets Processed", value: unref(totalAssetsProcessed), icon: "i-lucide-box", gradient: "from-violet-500/15 to-transparent", iconBg: "bg-violet-500/15", iconColor: "text-violet-500", border: "border-violet-500/10" },
          { label: "Avg per Employee", value: unref(avgPerEmployee), icon: "i-lucide-bar-chart-3", gradient: "from-emerald-500/15 to-transparent", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-500", border: "border-emerald-500/10" },
          { label: "Locations Covered", value: unref(totalLocations), icon: "i-lucide-map-pin", gradient: "from-amber-500/15 to-transparent", iconBg: "bg-amber-500/15", iconColor: "text-amber-500", border: "border-amber-500/10" },
          { label: "Top Performer", value: unref(topPerformer)?.totalAssets || 0, icon: "i-lucide-trophy", gradient: "from-orange-500/15 to-transparent", iconBg: "bg-orange-500/15", iconColor: "text-orange-500", border: "border-orange-500/10", sub: unref(topPerformer)?.name || "—" }
        ], (kpi, idx) => {
          _push(`<div class="${ssrRenderClass([[kpi.border, unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"], "group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"])}" style="${ssrRenderStyle({ transitionDelay: `${100 + idx * 80}ms` })}" data-v-d2fd05a4><div class="${ssrRenderClass([kpi.gradient, "absolute inset-0 bg-gradient-to-br opacity-60"])}" data-v-d2fd05a4></div><div class="relative z-10" data-v-d2fd05a4><div class="flex items-center justify-between mb-2" data-v-d2fd05a4><span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground" data-v-d2fd05a4>${ssrInterpolate(kpi.label)}</span><div class="${ssrRenderClass([kpi.iconBg, "flex items-center justify-center size-7 rounded-lg transition-transform group-hover:scale-110"])}" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: kpi.icon,
            class: ["size-3.5", kpi.iconColor]
          }, null, _parent));
          _push(`</div></div><div class="text-2xl font-bold tabular-nums tracking-tight" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(unref(NumberFlow), {
            value: kpi.value,
            animated: true
          }, null, _parent));
          _push(`</div>`);
          if (kpi.sub) {
            _push(`<p class="text-[10px] text-muted-foreground mt-0.5 truncate" data-v-d2fd05a4>${ssrInterpolate(kpi.sub)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-4" data-v-d2fd05a4><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "lg:col-span-2 rounded-xl border bg-card overflow-hidden transition-all duration-600"])}" style="${ssrRenderStyle({ transitionDelay: "500ms" })}" data-v-d2fd05a4><div class="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-amber-500/5 to-orange-500/5" data-v-d2fd05a4><div class="flex items-center gap-2.5" data-v-d2fd05a4><div class="flex items-center justify-center size-8 rounded-lg bg-amber-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-trophy",
          class: "size-4 text-amber-500"
        }, null, _parent));
        _push(`</div><div data-v-d2fd05a4><h3 class="text-sm font-semibold" data-v-d2fd05a4>Performance Leaderboard</h3><p class="text-[10px] text-muted-foreground" data-v-d2fd05a4>Top performers by assets inventoried</p></div></div>`);
        _push(ssrRenderComponent(_component_Badge, {
          variant: "outline",
          class: "text-[10px] tabular-nums"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(employeeStats).length)} employees`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(employeeStats).length) + " employees", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="divide-y" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(unref(leaderboard), (emp, idx) => {
          _push(`<div class="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors group" data-v-d2fd05a4><div class="${ssrRenderClass([idx === 0 ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20" : idx === 1 ? "bg-gradient-to-br from-zinc-300 to-zinc-400 text-white dark:from-zinc-500 dark:to-zinc-600" : idx === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" : "bg-muted text-muted-foreground", "flex items-center justify-center size-8 rounded-full shrink-0"])}" data-v-d2fd05a4><span class="text-xs font-bold" data-v-d2fd05a4>${ssrInterpolate(idx + 1)}</span></div><div class="flex-1 min-w-0" data-v-d2fd05a4><div class="flex items-center gap-2" data-v-d2fd05a4><p class="text-sm font-semibold truncate" data-v-d2fd05a4>${ssrInterpolate(emp.name)}</p>`);
          if (idx === 0) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-crown",
              class: "size-3.5 text-amber-500 shrink-0"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center gap-3 mt-0.5" data-v-d2fd05a4><span class="text-[10px] text-muted-foreground flex items-center gap-1" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-map-pin",
            class: "size-2.5"
          }, null, _parent));
          _push(` ${ssrInterpolate(emp.locations.size)} locations </span><span class="text-[10px] text-muted-foreground flex items-center gap-1" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-calendar",
            class: "size-2.5"
          }, null, _parent));
          _push(` ${ssrInterpolate(emp.activeDays.size)} active days </span><span class="text-[10px] text-muted-foreground flex items-center gap-1" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-tags",
            class: "size-2.5"
          }, null, _parent));
          _push(` ${ssrInterpolate(emp.subcategories.size)} categories </span></div></div><div class="flex items-center gap-3 w-[220px] shrink-0" data-v-d2fd05a4><div class="flex-1 h-2.5 bg-muted rounded-full overflow-hidden" data-v-d2fd05a4><div class="${ssrRenderClass([idx === 0 ? "bg-gradient-to-r from-amber-400 to-orange-500" : idx === 1 ? "bg-gradient-to-r from-zinc-400 to-zinc-500" : idx === 2 ? "bg-gradient-to-r from-amber-600 to-amber-700" : "bg-primary/60", "h-full rounded-full transition-all duration-1000 ease-out"])}" style="${ssrRenderStyle({ width: unref(entered) ? `${emp.totalAssets / unref(maxAssets) * 100}%` : "0%" })}" data-v-d2fd05a4></div></div><span class="text-sm font-bold tabular-nums w-16 text-right" data-v-d2fd05a4>${ssrInterpolate(emp.totalAssets.toLocaleString())}</span></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(leaderboard).length === 0) {
          _push(`<div class="py-12 text-center" data-v-d2fd05a4>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-users",
            class: "size-10 text-muted-foreground/20 mx-auto mb-3"
          }, null, _parent));
          _push(`<p class="text-sm text-muted-foreground" data-v-d2fd05a4>No employee data</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="space-y-4" data-v-d2fd05a4><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"])}" style="${ssrRenderStyle({ transitionDelay: "550ms" })}" data-v-d2fd05a4><div class="flex items-center gap-2 mb-3" data-v-d2fd05a4><div class="flex items-center justify-center size-6 rounded-md bg-emerald-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-activity",
          class: "size-3.5 text-emerald-500"
        }, null, _parent));
        _push(`</div><h3 class="text-xs font-semibold" data-v-d2fd05a4>Activity Heatmap</h3><span class="text-[9px] text-muted-foreground ml-auto" data-v-d2fd05a4>Last 12 weeks</span></div><div class="flex gap-0.5" data-v-d2fd05a4><div class="flex flex-col gap-0.5 mr-1" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(weekDays, (day, i) => {
          _push(`<div class="size-3 flex items-center justify-center" data-v-d2fd05a4><span class="text-[7px] text-muted-foreground/60 leading-none" data-v-d2fd05a4>${ssrInterpolate(i % 2 === 1 ? day : "")}</span></div>`);
        });
        _push(`<!--]--></div><div class="flex gap-0.5 flex-1 overflow-hidden" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(12, (week) => {
          _push(`<div class="flex flex-col gap-0.5" data-v-d2fd05a4><!--[-->`);
          ssrRenderList(7, (day) => {
            _push(`<div class="${ssrRenderClass([heatmapColor(unref(heatmapData)[(week - 1) * 7 + (day - 1)]?.count || 0), "size-3 rounded-[2px] transition-colors duration-300"])}"${ssrRenderAttr("title", `${unref(heatmapData)[(week - 1) * 7 + (day - 1)]?.date || ""}: ${unref(heatmapData)[(week - 1) * 7 + (day - 1)]?.count || 0} assets`)} data-v-d2fd05a4></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></div><div class="flex items-center justify-end gap-1 mt-2" data-v-d2fd05a4><span class="text-[8px] text-muted-foreground/50" data-v-d2fd05a4>Less</span><div class="size-2.5 rounded-[2px] bg-muted/40" data-v-d2fd05a4></div><div class="size-2.5 rounded-[2px] bg-emerald-500/20" data-v-d2fd05a4></div><div class="size-2.5 rounded-[2px] bg-emerald-500/40" data-v-d2fd05a4></div><div class="size-2.5 rounded-[2px] bg-emerald-500/60" data-v-d2fd05a4></div><div class="size-2.5 rounded-[2px] bg-emerald-500/90" data-v-d2fd05a4></div><span class="text-[8px] text-muted-foreground/50" data-v-d2fd05a4>More</span></div></div><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"])}" style="${ssrRenderStyle({ transitionDelay: "650ms" })}" data-v-d2fd05a4><div class="flex items-center gap-2 mb-3" data-v-d2fd05a4><div class="flex items-center justify-center size-6 rounded-md bg-violet-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-heart-pulse",
          class: "size-3.5 text-violet-500"
        }, null, _parent));
        _push(`</div><h3 class="text-xs font-semibold" data-v-d2fd05a4>Condition Breakdown</h3></div><div class="space-y-2.5" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(unref(conditionSummary), (cond) => {
          _push(`<div class="flex items-center gap-2.5" data-v-d2fd05a4><div class="${ssrRenderClass([condBadgeClass(cond.label), "flex items-center justify-center size-5 rounded-md"])}" data-v-d2fd05a4><span class="text-[8px] font-bold" data-v-d2fd05a4>${ssrInterpolate(cond.pct)}%</span></div><div class="flex-1 min-w-0" data-v-d2fd05a4><div class="flex items-center justify-between mb-0.5" data-v-d2fd05a4><span class="text-[11px] font-medium truncate" data-v-d2fd05a4>${ssrInterpolate(cond.label)}</span><span class="text-[10px] tabular-nums text-muted-foreground" data-v-d2fd05a4>${ssrInterpolate(cond.count.toLocaleString())}</span></div><div class="h-1.5 bg-muted rounded-full overflow-hidden" data-v-d2fd05a4><div class="${ssrRenderClass([condRingClass(cond.label).replace("text-", "bg-"), "h-full rounded-full transition-all duration-1000"])}" style="${ssrRenderStyle({ width: `${cond.pct}%`, opacity: 0.7 })}" data-v-d2fd05a4></div></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(conditionSummary).length === 0) {
          _push(`<div class="py-4 text-center text-[11px] text-muted-foreground" data-v-d2fd05a4>No data</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "rounded-xl border bg-card p-4 transition-all duration-600 hover:shadow-md"])}" style="${ssrRenderStyle({ transitionDelay: "750ms" })}" data-v-d2fd05a4><div class="flex items-center gap-2 mb-3" data-v-d2fd05a4><div class="flex items-center justify-center size-6 rounded-md bg-blue-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-map-pin",
          class: "size-3.5 text-blue-500"
        }, null, _parent));
        _push(`</div><h3 class="text-xs font-semibold" data-v-d2fd05a4>Location Coverage</h3></div><div class="space-y-1" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(unref(leaderboard).slice(0, 5), (emp) => {
          _push(`<div class="flex items-center gap-2 py-1" data-v-d2fd05a4><span class="text-[10px] font-medium w-24 truncate shrink-0" data-v-d2fd05a4>${ssrInterpolate(emp.name)}</span><div class="flex-1 flex flex-wrap gap-0.5" data-v-d2fd05a4><!--[-->`);
          ssrRenderList([...emp.locations].slice(0, 4), (loc) => {
            _push(`<span class="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400" data-v-d2fd05a4>${ssrInterpolate(resolveL1(loc))}</span>`);
          });
          _push(`<!--]-->`);
          if (emp.locations.size > 4) {
            _push(`<span class="inline-flex items-center px-1 py-0.5 rounded text-[8px] font-medium bg-muted text-muted-foreground" data-v-d2fd05a4>+${ssrInterpolate(emp.locations.size - 4)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div></div><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "rounded-xl border bg-card overflow-hidden transition-all duration-600"])}" style="${ssrRenderStyle({ transitionDelay: "800ms" })}" data-v-d2fd05a4><div class="flex items-center gap-2.5 px-5 py-4 border-b" data-v-d2fd05a4><div class="flex items-center justify-center size-7 rounded-lg bg-cyan-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-trending-up",
          class: "size-4 text-cyan-500"
        }, null, _parent));
        _push(`</div><div data-v-d2fd05a4><h3 class="text-sm font-semibold" data-v-d2fd05a4>Daily Productivity</h3><p class="text-[10px] text-muted-foreground" data-v-d2fd05a4>Assets processed per day — last 30 days</p></div></div><div class="px-5 pt-4 pb-5" data-v-d2fd05a4><div class="flex items-end gap-[3px] h-[120px]" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(unref(dailyTrend), (day, idx) => {
          _push(`<div class="flex-1 group relative flex flex-col items-center justify-end" data-v-d2fd05a4><div class="${ssrRenderClass([day.count > 0 ? "bg-gradient-to-t from-cyan-500/60 to-cyan-400/80" : "bg-muted/30", "w-full rounded-t transition-all duration-700 ease-out cursor-pointer hover:opacity-80"])}" style="${ssrRenderStyle({ height: unref(entered) ? `${Math.max(day.count > 0 ? 4 : 2, day.count / unref(trendMax) * 100)}%` : "0%", transitionDelay: `${idx * 15}ms` })}" data-v-d2fd05a4></div><div class="absolute bottom-full mb-2 px-2 py-1 rounded-md bg-popover border shadow-lg text-[9px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 tabular-nums" data-v-d2fd05a4>${ssrInterpolate(day.label)}: ${ssrInterpolate(day.count.toLocaleString())} assets</div></div>`);
        });
        _push(`<!--]--></div><div class="flex gap-[3px] mt-1.5" data-v-d2fd05a4><!--[-->`);
        ssrRenderList(unref(dailyTrend), (day, idx) => {
          _push(`<div class="flex-1 text-center" data-v-d2fd05a4>`);
          if (idx % 5 === 0) {
            _push(`<span class="text-[8px] text-muted-foreground/50 tabular-nums" data-v-d2fd05a4>${ssrInterpolate(day.label)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "rounded-xl border bg-card overflow-hidden transition-all duration-600"])}" style="${ssrRenderStyle({ transitionDelay: "900ms" })}" data-v-d2fd05a4><div class="flex items-center gap-2.5 px-5 py-4 border-b" data-v-d2fd05a4><div class="flex items-center justify-center size-7 rounded-lg bg-violet-500/10" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-table",
          class: "size-4 text-violet-500"
        }, null, _parent));
        _push(`</div><div data-v-d2fd05a4><h3 class="text-sm font-semibold" data-v-d2fd05a4>Detailed Breakdown</h3><p class="text-[10px] text-muted-foreground" data-v-d2fd05a4>All employees with full performance metrics</p></div></div><div class="overflow-auto max-h-[400px]" data-v-d2fd05a4>`);
        _push(ssrRenderComponent(_component_Table, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TableRow, { class: "border-b-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[40px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`#`);
                              } else {
                                return [
                                  createTextVNode("#")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[160px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Employee`);
                              } else {
                                return [
                                  createTextVNode("Employee")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Assets`);
                              } else {
                                return [
                                  createTextVNode("Assets")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[80px] text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Locations`);
                              } else {
                                return [
                                  createTextVNode("Locations")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Active Days`);
                              } else {
                                return [
                                  createTextVNode("Active Days")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Categories`);
                              } else {
                                return [
                                  createTextVNode("Categories")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Avg/Day`);
                              } else {
                                return [
                                  createTextVNode("Avg/Day")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Last Active`);
                              } else {
                                return [
                                  createTextVNode("Last Active")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[40px]" }, {
                              default: withCtx(() => [
                                createTextVNode("#")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[160px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Employee")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Assets")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[80px] text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Locations")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Active Days")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Categories")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                              default: withCtx(() => [
                                createTextVNode("Avg/Day")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                              default: withCtx(() => [
                                createTextVNode("Last Active")
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
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[40px]" }, {
                            default: withCtx(() => [
                              createTextVNode("#")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[160px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Employee")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Assets")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[80px] text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Locations")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Active Days")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Categories")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                            default: withCtx(() => [
                              createTextVNode("Avg/Day")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                            default: withCtx(() => [
                              createTextVNode("Last Active")
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
                    ssrRenderList(unref(searchQuery) ? unref(employeeStats).filter((e) => e.name.toLowerCase().includes(unref(searchQuery).toLowerCase())) : unref(employeeStats), (emp, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: emp.id,
                        class: "hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, { class: "tabular-nums text-xs text-muted-foreground font-medium" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(idx + 1)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(idx + 1), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-2" data-v-d2fd05a4${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Avatar, { class: "size-6 shrink-0" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase())}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<span class="text-xs font-medium truncate" data-v-d2fd05a4${_scopeId4}>${ssrInterpolate(emp.name)}</span>`);
                                  if (idx === 0) {
                                    _push5(ssrRenderComponent(_component_Icon, {
                                      name: "i-lucide-crown",
                                      class: "size-3 text-amber-500 shrink-0"
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_Avatar, { class: "size-6 shrink-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", { class: "text-xs font-medium truncate" }, toDisplayString(emp.name), 1),
                                      idx === 0 ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: "i-lucide-crown",
                                        class: "size-3 text-amber-500 shrink-0"
                                      })) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-right text-xs font-semibold tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(emp.totalAssets.toLocaleString())}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(emp.totalAssets.toLocaleString()), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(emp.locations.size)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(emp.locations.size), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(emp.activeDays.size)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(emp.activeDays.size), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(emp.subcategories.size)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(emp.subcategories.size), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-right" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<span class="text-xs font-medium tabular-nums" data-v-d2fd05a4${_scopeId4}>${ssrInterpolate(emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : "—")}</span>`);
                                } else {
                                  return [
                                    createVNode("span", { class: "text-xs font-medium tabular-nums" }, toDisplayString(emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(emp.lastActivity ? emp.lastActivity.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(emp.lastActivity ? emp.lastActivity.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, { class: "tabular-nums text-xs text-muted-foreground font-medium" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(idx + 1), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_Avatar, { class: "size-6 shrink-0" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("span", { class: "text-xs font-medium truncate" }, toDisplayString(emp.name), 1),
                                    idx === 0 ? (openBlock(), createBlock(_component_Icon, {
                                      key: 0,
                                      name: "i-lucide-crown",
                                      class: "size-3 text-amber-500 shrink-0"
                                    })) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-right text-xs font-semibold tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(emp.totalAssets.toLocaleString()), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(emp.locations.size), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(emp.activeDays.size), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(emp.subcategories.size), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-right" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-xs font-medium tabular-nums" }, toDisplayString(emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : "—"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(emp.lastActivity ? emp.lastActivity.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"), 1)
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
                    if (unref(employeeStats).length === 0) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: "8",
                              class: "h-32 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-d2fd05a4${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-users",
                                    class: "size-8 text-muted-foreground/40"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p class="font-medium" data-v-d2fd05a4${_scopeId4}>No employee data</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-users",
                                        class: "size-8 text-muted-foreground/40"
                                      }),
                                      createVNode("p", { class: "font-medium" }, "No employee data")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: "8",
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-users",
                                      class: "size-8 text-muted-foreground/40"
                                    }),
                                    createVNode("p", { class: "font-medium" }, "No employee data")
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(searchQuery) ? unref(employeeStats).filter((e) => e.name.toLowerCase().includes(unref(searchQuery).toLowerCase())) : unref(employeeStats), (emp, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: emp.id,
                          class: "hover:bg-muted/30 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_TableCell, { class: "tabular-nums text-xs text-muted-foreground font-medium" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(idx + 1), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_Avatar, { class: "size-6 shrink-0" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("span", { class: "text-xs font-medium truncate" }, toDisplayString(emp.name), 1),
                                  idx === 0 ? (openBlock(), createBlock(_component_Icon, {
                                    key: 0,
                                    name: "i-lucide-crown",
                                    class: "size-3 text-amber-500 shrink-0"
                                  })) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right text-xs font-semibold tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(emp.totalAssets.toLocaleString()), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(emp.locations.size), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(emp.activeDays.size), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(emp.subcategories.size), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-right" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-xs font-medium tabular-nums" }, toDisplayString(emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : "—"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(emp.lastActivity ? emp.lastActivity.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(employeeStats).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: "8",
                            class: "h-32 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-users",
                                  class: "size-8 text-muted-foreground/40"
                                }),
                                createVNode("p", { class: "font-medium" }, "No employee data")
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
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[40px]" }, {
                          default: withCtx(() => [
                            createTextVNode("#")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[160px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Employee")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Assets")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[80px] text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Locations")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Active Days")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[90px] text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Categories")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[100px] text-right" }, {
                          default: withCtx(() => [
                            createTextVNode("Avg/Day")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TableHead, { class: "bg-card text-[11px] w-[120px]" }, {
                          default: withCtx(() => [
                            createTextVNode("Last Active")
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(searchQuery) ? unref(employeeStats).filter((e) => e.name.toLowerCase().includes(unref(searchQuery).toLowerCase())) : unref(employeeStats), (emp, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: emp.id,
                        class: "hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, { class: "tabular-nums text-xs text-muted-foreground font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(idx + 1), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(_component_Avatar, { class: "size-6 shrink-0" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarFallback, { class: "text-[8px] font-bold bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(emp.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("span", { class: "text-xs font-medium truncate" }, toDisplayString(emp.name), 1),
                                idx === 0 ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "i-lucide-crown",
                                  class: "size-3 text-amber-500 shrink-0"
                                })) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right text-xs font-semibold tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emp.totalAssets.toLocaleString()), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emp.locations.size), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emp.activeDays.size), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right text-xs tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emp.subcategories.size), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-right" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-xs font-medium tabular-nums" }, toDisplayString(emp.activeDays.size > 0 ? Math.round(emp.totalAssets / emp.activeDays.size).toLocaleString() : "—"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-[11px] text-muted-foreground tabular-nums" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(emp.lastActivity ? emp.lastActivity.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(employeeStats).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: "8",
                          class: "h-32 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-users",
                                class: "size-8 text-muted-foreground/40"
                              }),
                              createVNode("p", { class: "font-medium" }, "No employee data")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/employee-performance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const employeePerformance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2fd05a4"]]);

export { employeePerformance as default };
//# sourceMappingURL=employee-performance-C-ylvy3c.mjs.map
