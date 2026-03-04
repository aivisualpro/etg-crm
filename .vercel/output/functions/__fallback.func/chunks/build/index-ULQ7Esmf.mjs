import { a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { defineComponent, ref, reactive, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, createBlock, openBlock, createTextVNode, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
import { u as useDashboardStore } from './useDashboardStore-DQi0OiAF.mjs';
import { u as useSyncProgress } from './useSyncProgress-DTUElile.mjs';
import { u as useAppLanguage } from './useAppLanguage-D9JerBy5.mjs';
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

function useQRCode() {
  function qrUrl(value, size = 80) {
    if (!value) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=${size}x${size}&bgcolor=transparent&format=svg`;
  }
  return { qrUrl };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Furniture", icon: "i-lucide-armchair", description: "Asset furniture inventory" });
    const isMounted = ref(false);
    const search = ref("");
    const loading = ref(true);
    const loadingMore = ref(false);
    const page = ref(1);
    const limit = ref(500);
    const rows = ref([]);
    const total = ref(0);
    const totalPages = ref(0);
    const allLoaded = ref(false);
    const syncing = ref(false);
    const syncAction = ref("");
    const showActions = ref(false);
    const actionsRef = ref();
    const showHealthPanel = ref(false);
    const healthLoading = ref(false);
    const healthData = ref(null);
    const showDedupResults = ref(false);
    const dedupResults = ref(null);
    const syncBtnRef = ref(null);
    const dropdownPos = reactive({ top: 0, right: 0 });
    function toggleActions() {
      if (!showActions.value) {
        const el = syncBtnRef.value?.$el || actionsRef.value;
        if (el) {
          const rect = el.getBoundingClientRect();
          dropdownPos.top = rect.bottom + 6;
          dropdownPos.right = (void 0).innerWidth - rect.right;
        }
      }
      showActions.value = !showActions.value;
    }
    const dropdownStyle = computed(() => ({
      top: `${dropdownPos.top}px`,
      right: `${dropdownPos.right}px`
    }));
    const dateFilter = ref("all");
    const dateCounts = ref({});
    const dateTabs = [
      { key: "all", label: "All" },
      { key: "today", label: "Today" },
      { key: "week", label: "This Week" },
      { key: "month", label: "This Month" },
      { key: "lastMonth", label: "Last Month" },
      { key: "year", label: "This Year" }
    ];
    async function fetchData(append = false) {
      if (append) loadingMore.value = true;
      else loading.value = true;
      try {
        const params = { page: page.value, limit: limit.value };
        if (search.value.trim()) params.search = search.value.trim();
        if (dateFilter.value && dateFilter.value !== "all") params.dateFilter = dateFilter.value;
        const data = await $fetch("/api/bigquery/furniture", { params });
        if (data.success) {
          if (append) {
            rows.value.push(...data.rows || []);
          } else {
            rows.value = data.rows;
          }
          total.value = data.total;
          totalPages.value = data.totalPages;
          allLoaded.value = page.value >= data.totalPages;
          if (data.dateCounts) dateCounts.value = data.dateCounts;
        }
      } catch (e) {
        if (!e.message?.includes("Not found")) toast.error("Failed to load data");
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    }
    function loadMore() {
      if (allLoaded.value || loadingMore.value) return;
      page.value++;
      fetchData(true);
    }
    fetchData();
    const scrollContainerRef = ref();
    const scrollSentinelRef = ref();
    let scrollObserver = null;
    function setupScrollObserver() {
      scrollObserver?.disconnect();
      nextTick(() => {
        if (!scrollSentinelRef.value || !scrollContainerRef.value) return;
        scrollObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              loadMore();
            }
          },
          { root: scrollContainerRef.value, rootMargin: "400px" }
        );
        scrollObserver.observe(scrollSentinelRef.value);
      });
    }
    watch(loading, (val) => {
      if (!val) setupScrollObserver();
    });
    const {
      level1Map,
      level2Map,
      level3Map,
      subCatMap,
      assetDescMap,
      furnitureUsersMap,
      init,
      ensureFurnitureRows
    } = useDashboardStore();
    init();
    ensureFurnitureRows();
    function resolveSubCat(a66) {
      if (!a66) return "";
      const entry = subCatMap.value[a66];
      if (!entry) return a66;
      return appLang.value === "ar" ? entry.arabic || entry.eng || a66 : entry.eng || a66;
    }
    function resolveAssetDesc(a67) {
      if (!a67) return "";
      const entry = assetDescMap.value[a67];
      if (!entry) return a67;
      return appLang.value === "ar" ? entry.arabic || entry.eng || a67 : entry.eng || a67;
    }
    function resolveLevel1Logo(a7) {
      if (!a7) return "";
      const entry = level1Map.value[a7];
      if (!entry || !entry.logo) return "";
      return entry.logo.startsWith("http") ? entry.logo : `/api/gcs/${entry.logo}`;
    }
    function resolveLevel2(a8) {
      if (!a8) return "";
      const entry = level2Map.value[a8];
      if (!entry) return a8;
      return appLang.value === "ar" ? entry.arabic || entry.eng || a8 : entry.eng || a8;
    }
    function resolveLevel3(a9) {
      if (!a9) return "";
      const entry = level3Map.value[a9];
      if (!entry) return a9;
      return appLang.value === "ar" ? entry.arabic || entry.eng || a9 : entry.eng || a9;
    }
    function resolveUser(a2) {
      if (!a2) return "";
      return furnitureUsersMap.value[a2] || a2;
    }
    watch(dateFilter, () => {
      page.value = 1;
      allLoaded.value = false;
      fetchData();
    });
    let searchDebounce;
    watch(search, () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        page.value = 1;
        allLoaded.value = false;
        fetchData();
      }, 400);
    });
    const { runSmartSync, runHealthCheck, syncState } = useSyncProgress();
    async function checkHealth() {
      showActions.value = false;
      healthLoading.value = true;
      showHealthPanel.value = true;
      try {
        healthData.value = await runHealthCheck();
      } catch (e) {
        toast.error("Health check failed");
      } finally {
        healthLoading.value = false;
      }
    }
    async function smartSync() {
      syncing.value = true;
      syncAction.value = "smart";
      showActions.value = false;
      showHealthPanel.value = false;
      try {
        const result = await runSmartSync();
        if (result.synced === 0 && result.skipped > 0) {
          toast.success(`All ${result.skipped} partitions already in sync — nothing to do! ✨`);
        } else {
          toast.success(`Smart sync complete: ${result.synced?.toLocaleString()} rows synced, ${result.skipped} skipped`);
        }
        await fetchData();
      } catch (e) {
        toast.error(e?.data?.statusMessage || e?.message || "Smart sync failed");
      } finally {
        syncing.value = false;
        syncAction.value = "";
      }
    }
    const { resolve: resolveLang, lang: appLang } = useAppLanguage();
    const { qrUrl } = useQRCode();
    const qrPopup = ref({ show: false, value: "", label: "" });
    function showQR(value, label) {
      qrPopup.value = { show: true, value, label };
    }
    const IMAGE_COLS = ["A69", "A71", "A72"];
    const columnDefs = [
      { key: "A69", fallback: "Photo 1", width: "60px", isImage: true },
      { key: "A70", fallback: "Asset Code", width: "120px" },
      { key: "A7", fallback: "Level 1", width: "50px" },
      { key: "A8", fallback: "Level 2", width: "150px" },
      { key: "A9", fallback: "Level 3", width: "140px" },
      { key: "A66", fallback: "Subcategory", width: "140px" },
      { key: "A67", fallback: "Asset Description", width: "160px" },
      { key: "A222", fallback: "Description", width: "180px" },
      { key: "A68", fallback: "Condition", width: "120px" },
      { key: "A71", fallback: "Photo 2", width: "60px", isImage: true },
      { key: "A72", fallback: "Photo 3", width: "60px", isImage: true },
      { key: "A75", fallback: "Asset Condition", width: "120px" },
      { key: "A76", fallback: "A76", width: "100px" },
      { key: "A77", fallback: "A77", width: "100px" },
      { key: "A78", fallback: "A78", width: "100px" },
      { key: "A2", fallback: "User", width: "140px" },
      { key: "A79", fallback: "Coordinates", width: "60px" },
      { key: "A213", fallback: "A213", width: "100px" }
    ];
    const columns = computed(
      () => columnDefs.map((def) => {
        const resolved = resolveLang(def.key);
        return {
          key: def.key,
          label: resolved !== def.key ? resolved : def.fallback,
          width: def.width,
          isImage: def.isImage
        };
      })
    );
    const sortBy = ref("A70");
    const sortDir = ref("asc");
    function toggleSort(col) {
      if (IMAGE_COLS.includes(col)) return;
      if (sortBy.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      else {
        sortBy.value = col;
        sortDir.value = "asc";
      }
    }
    function sortIcon(col) {
      if (IMAGE_COLS.includes(col)) return "";
      if (sortBy.value !== col) return "i-lucide-chevrons-up-down";
      return sortDir.value === "asc" ? "i-lucide-chevron-up" : "i-lucide-chevron-down";
    }
    const sortedRows = computed(() => {
      const arr = [...rows.value];
      const col = sortBy.value;
      return arr.sort((a, b) => {
        const cmp = String(a[col] ?? "").toLowerCase().localeCompare(String(b[col] ?? "").toLowerCase());
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    const lightboxSrc = ref("");
    const showLightbox = ref(false);
    function openLightbox(src) {
      if (src) {
        lightboxSrc.value = src;
        showLightbox.value = true;
      }
    }
    function imageUrl(row, col) {
      const gcsPath = row[col + "_url"];
      if (gcsPath && typeof gcsPath === "string" && gcsPath.trim()) {
        if (gcsPath.startsWith("http")) return gcsPath;
        if (gcsPath.includes("/")) return `/api/gcs/${gcsPath}`;
      }
      return "";
    }
    const failedImages = ref(/* @__PURE__ */ new Set());
    function onImageError(key) {
      failedImages.value.add(key);
    }
    function isImageFailed(key) {
      return failedImages.value.has(key);
    }
    function statusColor(status) {
      if (status === "synced") return "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20";
      if (status === "behind") return "bg-blue-500/10 text-blue-500 ring-blue-500/20";
      return "bg-red-500/10 text-red-500 ring-red-500/20";
    }
    function statusLabel(status) {
      if (status === "synced") return "✓ Synced";
      if (status === "behind") return "↑ Needs Rows";
      return "⚠ Excess";
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))}>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end"><div class="relative max-w-[200px]">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(search),
            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
            placeholder: "Search code, desc...",
            class: "pl-8 h-8 text-xs"
          }, null, _parent));
          if (unref(search)) {
            _push2(`<button class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-x",
              class: "size-2.5 text-muted-foreground"
            }, null, _parent));
            _push2(`</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (!unref(loading) && unref(total) > 0) {
            _push2(`<p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">${ssrInterpolate(unref(total).toLocaleString())} records </p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_Button, {
            variant: "ghost",
            size: "sm",
            class: "h-8 gap-1.5",
            disabled: unref(syncing),
            onClick: checkHealth
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-heart-pulse",
                  class: ["size-3.5", unref(healthLoading) ? "animate-pulse" : ""]
                }, null, _parent2, _scopeId));
                _push3(`<span class="text-xs hidden sm:inline"${_scopeId}>Health</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-heart-pulse",
                    class: ["size-3.5", unref(healthLoading) ? "animate-pulse" : ""]
                  }, null, 8, ["class"]),
                  createVNode("span", { class: "text-xs hidden sm:inline" }, "Health")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`<div class="relative">`);
          _push2(ssrRenderComponent(_component_Button, {
            ref_key: "syncBtnRef",
            ref: syncBtnRef,
            variant: "outline",
            size: "sm",
            class: "h-8 gap-1.5",
            disabled: unref(syncing),
            onClick: toggleActions
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                if (unref(syncing)) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-loader-2",
                    class: "size-3.5 animate-spin"
                  }, null, _parent2, _scopeId));
                } else {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-zap",
                    class: "size-3.5"
                  }, null, _parent2, _scopeId));
                }
                _push3(`<span class="text-xs hidden sm:inline"${_scopeId}>Sync</span>`);
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-chevron-down",
                  class: "size-3"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  unref(syncing) ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: "i-lucide-loader-2",
                    class: "size-3.5 animate-spin"
                  })) : (openBlock(), createBlock(_component_Icon, {
                    key: 1,
                    name: "i-lucide-zap",
                    class: "size-3.5"
                  })),
                  createVNode("span", { class: "text-xs hidden sm:inline" }, "Sync"),
                  createVNode(_component_Icon, {
                    name: "i-lucide-chevron-down",
                    class: "size-3"
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div>`);
        }, "#header-toolbar", false, _parent);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showActions)) {
          _push2(`<div class="fixed w-72 rounded-xl border bg-popover/95 backdrop-blur-xl shadow-xl shadow-black/10 z-[200] overflow-hidden" data-dropdown-sync style="${ssrRenderStyle(unref(dropdownStyle))}"><div class="px-3 py-2.5 border-b bg-muted/30"><p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Sync Operations</p></div><div class="p-1"><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""}><div class="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-zap",
            class: "size-4 text-emerald-500"
          }, null, _parent));
          _push2(`</div><div class="min-w-0"><p class="font-medium text-foreground">Smart Sync</p><p class="text-[11px] text-muted-foreground leading-tight">Only syncs changed partitions — fast!</p></div><span class="ml-auto text-[10px] text-emerald-500 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">FAST</span></button><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""}><div class="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-refresh-cw",
            class: "size-4 text-blue-500"
          }, null, _parent));
          _push2(`</div><div class="min-w-0"><p class="font-medium text-foreground">Full Re-sync</p><p class="text-[11px] text-muted-foreground leading-tight">Re-fetches all 14 sheets from scratch</p></div><span class="ml-auto text-[10px] text-amber-500 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">SLOW</span></button><div class="h-px bg-border mx-2 my-1"></div><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""}><div class="size-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-copy-minus",
            class: "size-4 text-amber-500"
          }, null, _parent));
          _push2(`</div><div class="min-w-0"><p class="font-medium text-foreground">Remove Duplicates</p><p class="text-[11px] text-muted-foreground leading-tight">Dedup by A70 — removes excess rows</p></div></button><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm hover:bg-muted transition-colors group"${ssrIncludeBooleanAttr(unref(syncing)) ? " disabled" : ""}><div class="size-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-image-plus",
            class: "size-4 text-violet-500"
          }, null, _parent));
          _push2(`</div><div class="min-w-0"><p class="font-medium text-foreground">Sync Images</p><p class="text-[11px] text-muted-foreground leading-tight">Drive → Cloud Storage, updates URLs</p></div></button></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      if (unref(showHealthPanel)) {
        _push(`<div class="shrink-0 border-b overflow-hidden"><div class="bg-gradient-to-r from-card to-muted/20 p-4"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-2.5"><div class="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-heart-pulse",
          class: "size-4 text-blue-500"
        }, null, _parent));
        _push(`</div><div><h3 class="text-sm font-semibold text-foreground">Data Health Check</h3><p class="text-[11px] text-muted-foreground">Google Sheets vs BigQuery — live comparison</p></div></div><div class="flex items-center gap-2">`);
        if (unref(healthData) && !unref(healthData).allSynced) {
          _push(ssrRenderComponent(_component_Button, {
            variant: "default",
            size: "sm",
            class: "h-7 text-xs gap-1",
            onClick: ($event) => {
              smartSync();
              showHealthPanel.value = false;
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-zap",
                  class: "size-3"
                }, null, _parent2, _scopeId));
                _push2(` Sync Changes `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-zap",
                    class: "size-3"
                  }),
                  createTextVNode(" Sync Changes ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="size-6 rounded-md hover:bg-muted flex items-center justify-center transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-x",
          class: "size-3.5 text-muted-foreground"
        }, null, _parent));
        _push(`</button></div></div>`);
        if (unref(healthLoading)) {
          _push(`<div class="flex items-center justify-center py-8"><div class="flex items-center gap-3 text-muted-foreground">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-loader-2",
            class: "size-5 animate-spin"
          }, null, _parent));
          _push(`<p class="text-sm">Checking partition counts...</p></div></div>`);
        } else if (unref(healthData)) {
          _push(`<div><div class="grid grid-cols-4 gap-3 mb-4"><div class="rounded-lg bg-card/80 border p-3 text-center"><p class="text-lg font-bold tabular-nums text-foreground">${ssrInterpolate(unref(healthData).sheetTotal?.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Sheets Total</p></div><div class="rounded-lg bg-card/80 border p-3 text-center"><p class="text-lg font-bold tabular-nums text-foreground">${ssrInterpolate(unref(healthData).bqTotal?.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">BigQuery Total</p></div><div class="rounded-lg bg-card/80 border p-3 text-center"><p class="${ssrRenderClass([unref(healthData).diff === 0 ? "text-emerald-500" : "text-amber-500", "text-lg font-bold tabular-nums"])}">${ssrInterpolate(unref(healthData).diff === 0 ? "✓" : (unref(healthData).diff > 0 ? "+" : "") + unref(healthData).diff?.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Difference</p></div><div class="rounded-lg bg-card/80 border p-3 text-center"><p class="${ssrRenderClass([unref(healthData).allSynced ? "text-emerald-500" : "text-blue-500", "text-lg font-bold tabular-nums"])}">${ssrInterpolate(unref(healthData).allSynced ? "✓ All" : unref(healthData).needsSyncCount)}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">${ssrInterpolate(unref(healthData).allSynced ? "In Sync" : "Need Sync")}</p></div></div><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2"><!--[-->`);
          ssrRenderList(unref(healthData).partitions, (p) => {
            _push(`<div class="rounded-lg border bg-card/60 p-2.5 hover:bg-card transition-colors group"><div class="flex items-center justify-between mb-1.5"><span class="text-[10px] font-mono font-medium text-muted-foreground truncate">${ssrInterpolate(p.sheet.replace("Furniture_", ""))}</span><span class="${ssrRenderClass([statusColor(p.status), "text-[9px] font-medium px-1.5 py-0.5 rounded-full ring-1"])}">${ssrInterpolate(statusLabel(p.status))}</span></div><div class="space-y-0.5"><div class="flex justify-between text-[10px]"><span class="text-muted-foreground">Sheet</span><span class="tabular-nums font-medium">${ssrInterpolate(p.sheetCount?.toLocaleString())}</span></div><div class="flex justify-between text-[10px]"><span class="text-muted-foreground">BQ</span><span class="tabular-nums font-medium">${ssrInterpolate(p.bqCount?.toLocaleString())}</span></div>`);
            if (p.diff !== 0) {
              _push(`<div class="flex justify-between text-[10px]"><span class="text-muted-foreground">Diff</span><span class="${ssrRenderClass([p.diff > 0 ? "text-blue-500" : "text-red-500", "tabular-nums font-bold"])}">${ssrInterpolate(p.diff > 0 ? "+" : "")}${ssrInterpolate(p.diff?.toLocaleString())}</span></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (p.needsSync) {
              _push(`<button class="w-full mt-2 text-[10px] font-medium text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 rounded py-1 transition-colors opacity-0 group-hover:opacity-100"> Sync This </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="shrink-0 border-b px-4 py-0 flex items-center gap-1 overflow-x-auto"><!--[-->`);
      ssrRenderList(dateTabs, (tab) => {
        _push(`<button class="${ssrRenderClass([unref(dateFilter) === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border", "flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors"])}">${ssrInterpolate(tab.label)} `);
        if (unref(dateCounts)[tab.key] !== void 0) {
          _push(`<span class="${ssrRenderClass([unref(dateFilter) === tab.key ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground", "text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"])}">${ssrInterpolate(unref(dateCounts)[tab.key]?.toLocaleString())}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]-->`);
      if (unref(syncState).active) {
        _push(`<div class="ml-auto flex items-center gap-2.5 min-w-0 shrink-0"><div class="flex items-center gap-1.5">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-3 animate-spin text-blue-500 shrink-0"
        }, null, _parent));
        _push(`<span class="text-[10px] text-muted-foreground capitalize whitespace-nowrap">${ssrInterpolate(unref(syncState).type)}</span></div><div class="h-1.5 w-24 sm:w-40 rounded-full bg-muted overflow-hidden shrink-0"><div class="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${unref(syncState).percent}%` })}"></div></div><span class="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">${ssrInterpolate(unref(syncState).percent)}% </span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center"><div class="flex flex-col items-center gap-4 text-muted-foreground"><div class="size-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-6 animate-spin text-blue-500"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium">Loading furniture data...</p></div></div>`);
      } else {
        _push(`<div class="flex-1 min-h-0 overflow-auto">`);
        _push(ssrRenderComponent(_component_Table, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TableRow, { class: "border-b-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(columns), (col) => {
                            _push4(ssrRenderComponent(_component_TableHead, {
                              key: col.key,
                              class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none hover:bg-muted/50 transition-colors" : ""],
                              style: { minWidth: col.width },
                              onClick: ($event) => toggleSort(col.key)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-1"${_scopeId4}>${ssrInterpolate(col.label)} `);
                                  if (sortIcon(col.key)) {
                                    _push5(ssrRenderComponent(_component_Icon, {
                                      name: sortIcon(col.key),
                                      class: "size-3 opacity-60"
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createTextVNode(toDisplayString(col.label) + " ", 1),
                                      sortIcon(col.key) ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: sortIcon(col.key),
                                        class: "size-3 opacity-60"
                                      }, null, 8, ["name"])) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                              return openBlock(), createBlock(_component_TableHead, {
                                key: col.key,
                                class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none hover:bg-muted/50 transition-colors" : ""],
                                style: { minWidth: col.width },
                                onClick: ($event) => toggleSort(col.key)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createTextVNode(toDisplayString(col.label) + " ", 1),
                                    sortIcon(col.key) ? (openBlock(), createBlock(_component_Icon, {
                                      key: 0,
                                      name: sortIcon(col.key),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["class", "style", "onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TableRow, { class: "border-b-0" }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                            return openBlock(), createBlock(_component_TableHead, {
                              key: col.key,
                              class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none hover:bg-muted/50 transition-colors" : ""],
                              style: { minWidth: col.width },
                              onClick: ($event) => toggleSort(col.key)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createTextVNode(toDisplayString(col.label) + " ", 1),
                                  sortIcon(col.key) ? (openBlock(), createBlock(_component_Icon, {
                                    key: 0,
                                    name: sortIcon(col.key),
                                    class: "size-3 opacity-60"
                                  }, null, 8, ["name"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class", "style", "onClick"]);
                          }), 128))
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
                    ssrRenderList(unref(sortedRows), (row, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: row.ID || idx,
                        class: "group hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(columns), (col) => {
                              _push4(ssrRenderComponent(_component_TableCell, {
                                key: col.key
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    if (col.isImage) {
                                      _push5(`<div class="size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105"${_scopeId4}>`);
                                      if (imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`)) {
                                        _push5(`<img${ssrRenderAttr("src", imageUrl(row, col.key))}${ssrRenderAttr("alt", row.A70)} class="size-9 object-cover" loading="lazy"${_scopeId4}>`);
                                      } else {
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: "i-lucide-image-off",
                                          class: "size-3.5 text-muted-foreground/30"
                                        }, null, _parent5, _scopeId4));
                                      }
                                      _push5(`</div>`);
                                    } else if (col.key === "A70") {
                                      _push5(`<div class="flex items-center gap-1.5"${_scopeId4}>`);
                                      if (row.A70) {
                                        _push5(`<button class="size-6 shrink-0 rounded border border-border/40 hover:border-primary/50 p-0.5 transition-colors bg-white"${ssrRenderAttr("title", `QR: ${row.A70}`)}${_scopeId4}><img${ssrRenderAttr("src", unref(qrUrl)(row.A70, 48))} class="size-full" loading="lazy"${_scopeId4}></button>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`<span class="font-medium font-mono text-xs"${_scopeId4}>${ssrInterpolate(row.A70 || "—")}</span></div>`);
                                    } else if (col.key === "A7") {
                                      _push5(`<div class="flex items-center justify-center"${_scopeId4}>`);
                                      if (resolveLevel1Logo(row.A7)) {
                                        _push5(`<img${ssrRenderAttr("src", resolveLevel1Logo(row.A7))}${ssrRenderAttr("alt", row.A7)} class="size-7 rounded-full object-cover ring-1 ring-border/30" loading="lazy"${_scopeId4}>`);
                                      } else {
                                        _push5(`<span class="text-xs text-muted-foreground"${_scopeId4}>—</span>`);
                                      }
                                      _push5(`</div>`);
                                    } else if (col.key === "A8") {
                                      _push5(`<span class="text-sm whitespace-nowrap"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>${ssrInterpolate(resolveLevel2(row.A8) || "—")}</span>`);
                                    } else if (col.key === "A9") {
                                      _push5(`<span class="text-sm whitespace-nowrap"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>${ssrInterpolate(resolveLevel3(row.A9) || "—")}</span>`);
                                    } else if (col.key === "A66") {
                                      _push5(`<span class="text-sm whitespace-nowrap"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>${ssrInterpolate(resolveSubCat(row.A66) || "—")}</span>`);
                                    } else if (col.key === "A67") {
                                      _push5(`<span class="text-sm whitespace-nowrap"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>${ssrInterpolate(resolveAssetDesc(row.A67) || "—")}</span>`);
                                    } else if (col.key === "A222") {
                                      _push5(`<span dir="rtl" class="text-sm"${_scopeId4}>${ssrInterpolate(row.A222 || "—")}</span>`);
                                    } else if (col.key === "A68") {
                                      _push5(`<!--[-->`);
                                      if (row.A68) {
                                        _push5(`<span class="${ssrRenderClass([{
                                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                          "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                          "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                          "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                        }, "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"])}"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>${ssrInterpolate(unref(resolveLang)(row.A68))}</span>`);
                                      } else {
                                        _push5(`<span class="text-sm text-muted-foreground"${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else if (col.key === "A2") {
                                      _push5(`<span class="text-sm whitespace-nowrap flex items-center gap-1.5"${_scopeId4}>`);
                                      if (resolveUser(row.A2) && resolveUser(row.A2) !== row.A2) {
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: "i-lucide-user",
                                          class: "size-3 text-muted-foreground shrink-0"
                                        }, null, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(` ${ssrInterpolate(resolveUser(row.A2) || "—")}</span>`);
                                    } else if (col.key === "A75") {
                                      _push5(`<!--[-->`);
                                      if (row.A75) {
                                        _push5(`<span class="${ssrRenderClass([{
                                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20": row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent",
                                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20": row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average",
                                          "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20": row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged",
                                          "bg-muted text-muted-foreground ring-border": !["Good", "Fair", "Poor", "Excellent", "Average", "Bad", "Damaged", "1", "2", "3"].includes(row.A75)
                                        }, "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1"])}"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")}${_scopeId4}>`);
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent" ? "i-lucide-check-circle-2" : row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average" ? "i-lucide-alert-triangle" : row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged" ? "i-lucide-x-circle" : "i-lucide-help-circle",
                                          class: "size-3 shrink-0"
                                        }, null, _parent5, _scopeId4));
                                        _push5(` ${ssrInterpolate(unref(resolveLang)(row.A75))}</span>`);
                                      } else {
                                        _push5(`<span class="text-sm text-muted-foreground"${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else if (col.key === "A79") {
                                      _push5(`<!--[-->`);
                                      if (row.A79 && row.A79.includes(",")) {
                                        _push5(`<a${ssrRenderAttr("href", `https://www.google.com/maps?q=${row.A79.replace(/\s/g, "")}`)} target="_blank" class="inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map" title="Open in Google Maps"${_scopeId4}>`);
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: "i-lucide-map-pin",
                                          class: "size-4 text-blue-500 group-hover/map:scale-110 transition-transform"
                                        }, null, _parent5, _scopeId4));
                                        _push5(`</a>`);
                                      } else {
                                        _push5(`<span class="text-muted-foreground"${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else {
                                      _push5(`<span class="text-sm whitespace-nowrap"${_scopeId4}>${ssrInterpolate(row[col.key] || "—")}</span>`);
                                    }
                                  } else {
                                    return [
                                      col.isImage ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105",
                                        onClick: ($event) => openLightbox(imageUrl(row, col.key))
                                      }, [
                                        imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`) ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: imageUrl(row, col.key),
                                          alt: row.A70,
                                          class: "size-9 object-cover",
                                          loading: "lazy",
                                          onError: ($event) => onImageError(`${row.ID}-${col.key}`)
                                        }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-image-off",
                                          class: "size-3.5 text-muted-foreground/30"
                                        }))
                                      ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex items-center gap-1.5"
                                      }, [
                                        row.A70 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "size-6 shrink-0 rounded border border-border/40 hover:border-primary/50 p-0.5 transition-colors bg-white",
                                          title: `QR: ${row.A70}`,
                                          onClick: withModifiers(($event) => showQR(row.A70, "Tag Number"), ["stop"])
                                        }, [
                                          createVNode("img", {
                                            src: unref(qrUrl)(row.A70, 48),
                                            class: "size-full",
                                            loading: "lazy"
                                          }, null, 8, ["src"])
                                        ], 8, ["title", "onClick"])) : createCommentVNode("", true),
                                        createVNode("span", { class: "font-medium font-mono text-xs" }, toDisplayString(row.A70 || "—"), 1)
                                      ])) : col.key === "A7" ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "flex items-center justify-center"
                                      }, [
                                        resolveLevel1Logo(row.A7) ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: resolveLevel1Logo(row.A7),
                                          alt: row.A7,
                                          class: "size-7 rounded-full object-cover ring-1 ring-border/30",
                                          loading: "lazy"
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-xs text-muted-foreground"
                                        }, "—"))
                                      ])) : col.key === "A8" ? (openBlock(), createBlock("span", {
                                        key: 3,
                                        class: "text-sm whitespace-nowrap",
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, toDisplayString(resolveLevel2(row.A8) || "—"), 9, ["dir"])) : col.key === "A9" ? (openBlock(), createBlock("span", {
                                        key: 4,
                                        class: "text-sm whitespace-nowrap",
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, toDisplayString(resolveLevel3(row.A9) || "—"), 9, ["dir"])) : col.key === "A66" ? (openBlock(), createBlock("span", {
                                        key: 5,
                                        class: "text-sm whitespace-nowrap",
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, toDisplayString(resolveSubCat(row.A66) || "—"), 9, ["dir"])) : col.key === "A67" ? (openBlock(), createBlock("span", {
                                        key: 6,
                                        class: "text-sm whitespace-nowrap",
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, toDisplayString(resolveAssetDesc(row.A67) || "—"), 9, ["dir"])) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                        key: 7,
                                        dir: "rtl",
                                        class: "text-sm"
                                      }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                                        row.A68 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                            "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                            "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                            "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                          }],
                                          dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                        }, toDisplayString(unref(resolveLang)(row.A68)), 11, ["dir"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : col.key === "A2" ? (openBlock(), createBlock("span", {
                                        key: 9,
                                        class: "text-sm whitespace-nowrap flex items-center gap-1.5"
                                      }, [
                                        resolveUser(row.A2) && resolveUser(row.A2) !== row.A2 ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-user",
                                          class: "size-3 text-muted-foreground shrink-0"
                                        })) : createCommentVNode("", true),
                                        createTextVNode(" " + toDisplayString(resolveUser(row.A2) || "—"), 1)
                                      ])) : col.key === "A75" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                                        row.A75 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: ["inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1", {
                                            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20": row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent",
                                            "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20": row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average",
                                            "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20": row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged",
                                            "bg-muted text-muted-foreground ring-border": !["Good", "Fair", "Poor", "Excellent", "Average", "Bad", "Damaged", "1", "2", "3"].includes(row.A75)
                                          }],
                                          dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent" ? "i-lucide-check-circle-2" : row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average" ? "i-lucide-alert-triangle" : row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged" ? "i-lucide-x-circle" : "i-lucide-help-circle",
                                            class: "size-3 shrink-0"
                                          }, null, 8, ["name"]),
                                          createTextVNode(" " + toDisplayString(unref(resolveLang)(row.A75)), 1)
                                        ], 10, ["dir"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : col.key === "A79" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                                        row.A79 && row.A79.includes(",") ? (openBlock(), createBlock("a", {
                                          key: 0,
                                          href: `https://www.google.com/maps?q=${row.A79.replace(/\s/g, "")}`,
                                          target: "_blank",
                                          class: "inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map",
                                          title: "Open in Google Maps",
                                          onClick: withModifiers(() => {
                                          }, ["stop"])
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: "i-lucide-map-pin",
                                            class: "size-4 text-blue-500 group-hover/map:scale-110 transition-transform"
                                          })
                                        ], 8, ["href", "onClick"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : (openBlock(), createBlock("span", {
                                        key: 12,
                                        class: "text-sm whitespace-nowrap"
                                      }, toDisplayString(row[col.key] || "—"), 1))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                                return openBlock(), createBlock(_component_TableCell, {
                                  key: col.key
                                }, {
                                  default: withCtx(() => [
                                    col.isImage ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105",
                                      onClick: ($event) => openLightbox(imageUrl(row, col.key))
                                    }, [
                                      imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: imageUrl(row, col.key),
                                        alt: row.A70,
                                        class: "size-9 object-cover",
                                        loading: "lazy",
                                        onError: ($event) => onImageError(`${row.ID}-${col.key}`)
                                      }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                        key: 1,
                                        name: "i-lucide-image-off",
                                        class: "size-3.5 text-muted-foreground/30"
                                      }))
                                    ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex items-center gap-1.5"
                                    }, [
                                      row.A70 ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        class: "size-6 shrink-0 rounded border border-border/40 hover:border-primary/50 p-0.5 transition-colors bg-white",
                                        title: `QR: ${row.A70}`,
                                        onClick: withModifiers(($event) => showQR(row.A70, "Tag Number"), ["stop"])
                                      }, [
                                        createVNode("img", {
                                          src: unref(qrUrl)(row.A70, 48),
                                          class: "size-full",
                                          loading: "lazy"
                                        }, null, 8, ["src"])
                                      ], 8, ["title", "onClick"])) : createCommentVNode("", true),
                                      createVNode("span", { class: "font-medium font-mono text-xs" }, toDisplayString(row.A70 || "—"), 1)
                                    ])) : col.key === "A7" ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "flex items-center justify-center"
                                    }, [
                                      resolveLevel1Logo(row.A7) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: resolveLevel1Logo(row.A7),
                                        alt: row.A7,
                                        class: "size-7 rounded-full object-cover ring-1 ring-border/30",
                                        loading: "lazy"
                                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-xs text-muted-foreground"
                                      }, "—"))
                                    ])) : col.key === "A8" ? (openBlock(), createBlock("span", {
                                      key: 3,
                                      class: "text-sm whitespace-nowrap",
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(resolveLevel2(row.A8) || "—"), 9, ["dir"])) : col.key === "A9" ? (openBlock(), createBlock("span", {
                                      key: 4,
                                      class: "text-sm whitespace-nowrap",
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(resolveLevel3(row.A9) || "—"), 9, ["dir"])) : col.key === "A66" ? (openBlock(), createBlock("span", {
                                      key: 5,
                                      class: "text-sm whitespace-nowrap",
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(resolveSubCat(row.A66) || "—"), 9, ["dir"])) : col.key === "A67" ? (openBlock(), createBlock("span", {
                                      key: 6,
                                      class: "text-sm whitespace-nowrap",
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(resolveAssetDesc(row.A67) || "—"), 9, ["dir"])) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                      key: 7,
                                      dir: "rtl",
                                      class: "text-sm"
                                    }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                                      row.A68 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                          "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                          "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                          "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                        }],
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, toDisplayString(unref(resolveLang)(row.A68)), 11, ["dir"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-sm text-muted-foreground"
                                      }, "—"))
                                    ], 64)) : col.key === "A2" ? (openBlock(), createBlock("span", {
                                      key: 9,
                                      class: "text-sm whitespace-nowrap flex items-center gap-1.5"
                                    }, [
                                      resolveUser(row.A2) && resolveUser(row.A2) !== row.A2 ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: "i-lucide-user",
                                        class: "size-3 text-muted-foreground shrink-0"
                                      })) : createCommentVNode("", true),
                                      createTextVNode(" " + toDisplayString(resolveUser(row.A2) || "—"), 1)
                                    ])) : col.key === "A75" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                                      row.A75 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: ["inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1", {
                                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20": row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent",
                                          "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20": row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average",
                                          "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20": row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged",
                                          "bg-muted text-muted-foreground ring-border": !["Good", "Fair", "Poor", "Excellent", "Average", "Bad", "Damaged", "1", "2", "3"].includes(row.A75)
                                        }],
                                        dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                      }, [
                                        createVNode(_component_Icon, {
                                          name: row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent" ? "i-lucide-check-circle-2" : row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average" ? "i-lucide-alert-triangle" : row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged" ? "i-lucide-x-circle" : "i-lucide-help-circle",
                                          class: "size-3 shrink-0"
                                        }, null, 8, ["name"]),
                                        createTextVNode(" " + toDisplayString(unref(resolveLang)(row.A75)), 1)
                                      ], 10, ["dir"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-sm text-muted-foreground"
                                      }, "—"))
                                    ], 64)) : col.key === "A79" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                                      row.A79 && row.A79.includes(",") ? (openBlock(), createBlock("a", {
                                        key: 0,
                                        href: `https://www.google.com/maps?q=${row.A79.replace(/\s/g, "")}`,
                                        target: "_blank",
                                        class: "inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map",
                                        title: "Open in Google Maps",
                                        onClick: withModifiers(() => {
                                        }, ["stop"])
                                      }, [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-map-pin",
                                          class: "size-4 text-blue-500 group-hover/map:scale-110 transition-transform"
                                        })
                                      ], 8, ["href", "onClick"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground"
                                      }, "—"))
                                    ], 64)) : (openBlock(), createBlock("span", {
                                      key: 12,
                                      class: "text-sm whitespace-nowrap"
                                    }, toDisplayString(row[col.key] || "—"), 1))
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (unref(sortedRows).length === 0 && !unref(loading)) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: unref(columns).length,
                              class: "h-40 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-3 text-muted-foreground"${_scopeId4}><div class="size-16 rounded-2xl bg-muted/50 flex items-center justify-center"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8 text-muted-foreground/40"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><div${_scopeId4}><p class="font-medium text-foreground/60"${_scopeId4}>${ssrInterpolate(unref(total) === 0 ? "No furniture data" : "No matching records")}</p><p class="text-xs mt-0.5"${_scopeId4}>${ssrInterpolate(unref(total) === 0 ? "Click sync to import data from Google Sheets." : "Try adjusting your search terms.")}</p></div>`);
                                  if (unref(total) === 0) {
                                    _push5(ssrRenderComponent(_component_Button, {
                                      variant: "outline",
                                      size: "sm",
                                      class: "mt-1",
                                      onClick: ($event) => smartSync()
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(_component_Icon, {
                                            name: "i-lucide-zap",
                                            class: "size-3.5 mr-1.5"
                                          }, null, _parent6, _scopeId5));
                                          _push6(` Smart Sync `);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "i-lucide-zap",
                                              class: "size-3.5 mr-1.5"
                                            }),
                                            createTextVNode(" Smart Sync ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                      createVNode("div", { class: "size-16 rounded-2xl bg-muted/50 flex items-center justify-center" }, [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-inbox",
                                          class: "size-8 text-muted-foreground/40"
                                        })
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("p", { class: "font-medium text-foreground/60" }, toDisplayString(unref(total) === 0 ? "No furniture data" : "No matching records"), 1),
                                        createVNode("p", { class: "text-xs mt-0.5" }, toDisplayString(unref(total) === 0 ? "Click sync to import data from Google Sheets." : "Try adjusting your search terms."), 1)
                                      ]),
                                      unref(total) === 0 ? (openBlock(), createBlock(_component_Button, {
                                        key: 0,
                                        variant: "outline",
                                        size: "sm",
                                        class: "mt-1",
                                        onClick: ($event) => smartSync()
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "i-lucide-zap",
                                            class: "size-3.5 mr-1.5"
                                          }),
                                          createTextVNode(" Smart Sync ")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])) : createCommentVNode("", true)
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: unref(columns).length,
                                class: "h-40 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                    createVNode("div", { class: "size-16 rounded-2xl bg-muted/50 flex items-center justify-center" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-inbox",
                                        class: "size-8 text-muted-foreground/40"
                                      })
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("p", { class: "font-medium text-foreground/60" }, toDisplayString(unref(total) === 0 ? "No furniture data" : "No matching records"), 1),
                                      createVNode("p", { class: "text-xs mt-0.5" }, toDisplayString(unref(total) === 0 ? "Click sync to import data from Google Sheets." : "Try adjusting your search terms."), 1)
                                    ]),
                                    unref(total) === 0 ? (openBlock(), createBlock(_component_Button, {
                                      key: 0,
                                      variant: "outline",
                                      size: "sm",
                                      class: "mt-1",
                                      onClick: ($event) => smartSync()
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-zap",
                                          class: "size-3.5 mr-1.5"
                                        }),
                                        createTextVNode(" Smart Sync ")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(loadingMore)) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: unref(columns).length,
                              class: "h-12 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center justify-center gap-2 text-muted-foreground"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-loader-2",
                                    class: "size-4 animate-spin text-primary"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<span class="text-xs"${_scopeId4}>Loading more...</span></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center justify-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-loader-2",
                                        class: "size-4 animate-spin text-primary"
                                      }),
                                      createVNode("span", { class: "text-xs" }, "Loading more...")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: unref(columns).length,
                                class: "h-12 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center justify-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-loader-2",
                                      class: "size-4 animate-spin text-primary"
                                    }),
                                    createVNode("span", { class: "text-xs" }, "Loading more...")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["colspan"])
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(sortedRows), (row, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: row.ID || idx,
                          class: "group hover:bg-muted/30 transition-colors"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                              return openBlock(), createBlock(_component_TableCell, {
                                key: col.key
                              }, {
                                default: withCtx(() => [
                                  col.isImage ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105",
                                    onClick: ($event) => openLightbox(imageUrl(row, col.key))
                                  }, [
                                    imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: imageUrl(row, col.key),
                                      alt: row.A70,
                                      class: "size-9 object-cover",
                                      loading: "lazy",
                                      onError: ($event) => onImageError(`${row.ID}-${col.key}`)
                                    }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                      key: 1,
                                      name: "i-lucide-image-off",
                                      class: "size-3.5 text-muted-foreground/30"
                                    }))
                                  ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex items-center gap-1.5"
                                  }, [
                                    row.A70 ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      class: "size-6 shrink-0 rounded border border-border/40 hover:border-primary/50 p-0.5 transition-colors bg-white",
                                      title: `QR: ${row.A70}`,
                                      onClick: withModifiers(($event) => showQR(row.A70, "Tag Number"), ["stop"])
                                    }, [
                                      createVNode("img", {
                                        src: unref(qrUrl)(row.A70, 48),
                                        class: "size-full",
                                        loading: "lazy"
                                      }, null, 8, ["src"])
                                    ], 8, ["title", "onClick"])) : createCommentVNode("", true),
                                    createVNode("span", { class: "font-medium font-mono text-xs" }, toDisplayString(row.A70 || "—"), 1)
                                  ])) : col.key === "A7" ? (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "flex items-center justify-center"
                                  }, [
                                    resolveLevel1Logo(row.A7) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: resolveLevel1Logo(row.A7),
                                      alt: row.A7,
                                      class: "size-7 rounded-full object-cover ring-1 ring-border/30",
                                      loading: "lazy"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-xs text-muted-foreground"
                                    }, "—"))
                                  ])) : col.key === "A8" ? (openBlock(), createBlock("span", {
                                    key: 3,
                                    class: "text-sm whitespace-nowrap",
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(resolveLevel2(row.A8) || "—"), 9, ["dir"])) : col.key === "A9" ? (openBlock(), createBlock("span", {
                                    key: 4,
                                    class: "text-sm whitespace-nowrap",
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(resolveLevel3(row.A9) || "—"), 9, ["dir"])) : col.key === "A66" ? (openBlock(), createBlock("span", {
                                    key: 5,
                                    class: "text-sm whitespace-nowrap",
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(resolveSubCat(row.A66) || "—"), 9, ["dir"])) : col.key === "A67" ? (openBlock(), createBlock("span", {
                                    key: 6,
                                    class: "text-sm whitespace-nowrap",
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(resolveAssetDesc(row.A67) || "—"), 9, ["dir"])) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                    key: 7,
                                    dir: "rtl",
                                    class: "text-sm"
                                  }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                                    row.A68 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                        "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                        "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                        "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                      }],
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(unref(resolveLang)(row.A68)), 11, ["dir"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-sm text-muted-foreground"
                                    }, "—"))
                                  ], 64)) : col.key === "A2" ? (openBlock(), createBlock("span", {
                                    key: 9,
                                    class: "text-sm whitespace-nowrap flex items-center gap-1.5"
                                  }, [
                                    resolveUser(row.A2) && resolveUser(row.A2) !== row.A2 ? (openBlock(), createBlock(_component_Icon, {
                                      key: 0,
                                      name: "i-lucide-user",
                                      class: "size-3 text-muted-foreground shrink-0"
                                    })) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(resolveUser(row.A2) || "—"), 1)
                                  ])) : col.key === "A75" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                                    row.A75 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1", {
                                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20": row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent",
                                        "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20": row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average",
                                        "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20": row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged",
                                        "bg-muted text-muted-foreground ring-border": !["Good", "Fair", "Poor", "Excellent", "Average", "Bad", "Damaged", "1", "2", "3"].includes(row.A75)
                                      }],
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent" ? "i-lucide-check-circle-2" : row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average" ? "i-lucide-alert-triangle" : row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged" ? "i-lucide-x-circle" : "i-lucide-help-circle",
                                        class: "size-3 shrink-0"
                                      }, null, 8, ["name"]),
                                      createTextVNode(" " + toDisplayString(unref(resolveLang)(row.A75)), 1)
                                    ], 10, ["dir"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-sm text-muted-foreground"
                                    }, "—"))
                                  ], 64)) : col.key === "A79" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                                    row.A79 && row.A79.includes(",") ? (openBlock(), createBlock("a", {
                                      key: 0,
                                      href: `https://www.google.com/maps?q=${row.A79.replace(/\s/g, "")}`,
                                      target: "_blank",
                                      class: "inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map",
                                      title: "Open in Google Maps",
                                      onClick: withModifiers(() => {
                                      }, ["stop"])
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-map-pin",
                                        class: "size-4 text-blue-500 group-hover/map:scale-110 transition-transform"
                                      })
                                    ], 8, ["href", "onClick"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground"
                                    }, "—"))
                                  ], 64)) : (openBlock(), createBlock("span", {
                                    key: 12,
                                    class: "text-sm whitespace-nowrap"
                                  }, toDisplayString(row[col.key] || "—"), 1))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(sortedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: unref(columns).length,
                            class: "h-40 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                createVNode("div", { class: "size-16 rounded-2xl bg-muted/50 flex items-center justify-center" }, [
                                  createVNode(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8 text-muted-foreground/40"
                                  })
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-medium text-foreground/60" }, toDisplayString(unref(total) === 0 ? "No furniture data" : "No matching records"), 1),
                                  createVNode("p", { class: "text-xs mt-0.5" }, toDisplayString(unref(total) === 0 ? "Click sync to import data from Google Sheets." : "Try adjusting your search terms."), 1)
                                ]),
                                unref(total) === 0 ? (openBlock(), createBlock(_component_Button, {
                                  key: 0,
                                  variant: "outline",
                                  size: "sm",
                                  class: "mt-1",
                                  onClick: ($event) => smartSync()
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-zap",
                                      class: "size-3.5 mr-1.5"
                                    }),
                                    createTextVNode(" Smart Sync ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 1
                          }, 8, ["colspan"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(loadingMore) ? (openBlock(), createBlock(_component_TableRow, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: unref(columns).length,
                            class: "h-12 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center justify-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-loader-2",
                                  class: "size-4 animate-spin text-primary"
                                }),
                                createVNode("span", { class: "text-xs" }, "Loading more...")
                              ])
                            ]),
                            _: 1
                          }, 8, ["colspan"])
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                          return openBlock(), createBlock(_component_TableHead, {
                            key: col.key,
                            class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none hover:bg-muted/50 transition-colors" : ""],
                            style: { minWidth: col.width },
                            onClick: ($event) => toggleSort(col.key)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createTextVNode(toDisplayString(col.label) + " ", 1),
                                sortIcon(col.key) ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: sortIcon(col.key),
                                  class: "size-3 opacity-60"
                                }, null, 8, ["name"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["class", "style", "onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_TableBody, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(sortedRows), (row, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: row.ID || idx,
                        class: "group hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(columns), (col) => {
                            return openBlock(), createBlock(_component_TableCell, {
                              key: col.key
                            }, {
                              default: withCtx(() => [
                                col.isImage ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "size-9 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center ring-1 ring-border/50 cursor-pointer hover:ring-primary/50 transition-all hover:scale-105",
                                  onClick: ($event) => openLightbox(imageUrl(row, col.key))
                                }, [
                                  imageUrl(row, col.key) && !isImageFailed(`${row.ID}-${col.key}`) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: imageUrl(row, col.key),
                                    alt: row.A70,
                                    class: "size-9 object-cover",
                                    loading: "lazy",
                                    onError: ($event) => onImageError(`${row.ID}-${col.key}`)
                                  }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                    key: 1,
                                    name: "i-lucide-image-off",
                                    class: "size-3.5 text-muted-foreground/30"
                                  }))
                                ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex items-center gap-1.5"
                                }, [
                                  row.A70 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    class: "size-6 shrink-0 rounded border border-border/40 hover:border-primary/50 p-0.5 transition-colors bg-white",
                                    title: `QR: ${row.A70}`,
                                    onClick: withModifiers(($event) => showQR(row.A70, "Tag Number"), ["stop"])
                                  }, [
                                    createVNode("img", {
                                      src: unref(qrUrl)(row.A70, 48),
                                      class: "size-full",
                                      loading: "lazy"
                                    }, null, 8, ["src"])
                                  ], 8, ["title", "onClick"])) : createCommentVNode("", true),
                                  createVNode("span", { class: "font-medium font-mono text-xs" }, toDisplayString(row.A70 || "—"), 1)
                                ])) : col.key === "A7" ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  class: "flex items-center justify-center"
                                }, [
                                  resolveLevel1Logo(row.A7) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: resolveLevel1Logo(row.A7),
                                    alt: row.A7,
                                    class: "size-7 rounded-full object-cover ring-1 ring-border/30",
                                    loading: "lazy"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-xs text-muted-foreground"
                                  }, "—"))
                                ])) : col.key === "A8" ? (openBlock(), createBlock("span", {
                                  key: 3,
                                  class: "text-sm whitespace-nowrap",
                                  dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                }, toDisplayString(resolveLevel2(row.A8) || "—"), 9, ["dir"])) : col.key === "A9" ? (openBlock(), createBlock("span", {
                                  key: 4,
                                  class: "text-sm whitespace-nowrap",
                                  dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                }, toDisplayString(resolveLevel3(row.A9) || "—"), 9, ["dir"])) : col.key === "A66" ? (openBlock(), createBlock("span", {
                                  key: 5,
                                  class: "text-sm whitespace-nowrap",
                                  dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                }, toDisplayString(resolveSubCat(row.A66) || "—"), 9, ["dir"])) : col.key === "A67" ? (openBlock(), createBlock("span", {
                                  key: 6,
                                  class: "text-sm whitespace-nowrap",
                                  dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                }, toDisplayString(resolveAssetDesc(row.A67) || "—"), 9, ["dir"])) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                  key: 7,
                                  dir: "rtl",
                                  class: "text-sm"
                                }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 8 }, [
                                  row.A68 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                      "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                      "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                      "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                    }],
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(unref(resolveLang)(row.A68)), 11, ["dir"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "—"))
                                ], 64)) : col.key === "A2" ? (openBlock(), createBlock("span", {
                                  key: 9,
                                  class: "text-sm whitespace-nowrap flex items-center gap-1.5"
                                }, [
                                  resolveUser(row.A2) && resolveUser(row.A2) !== row.A2 ? (openBlock(), createBlock(_component_Icon, {
                                    key: 0,
                                    name: "i-lucide-user",
                                    class: "size-3 text-muted-foreground shrink-0"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(resolveUser(row.A2) || "—"), 1)
                                ])) : col.key === "A75" ? (openBlock(), createBlock(Fragment, { key: 10 }, [
                                  row.A75 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ring-1", {
                                      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20": row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent",
                                      "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20": row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average",
                                      "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20": row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged",
                                      "bg-muted text-muted-foreground ring-border": !["Good", "Fair", "Poor", "Excellent", "Average", "Bad", "Damaged", "1", "2", "3"].includes(row.A75)
                                    }],
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: row.A75 === "Good" || row.A75 === "3" || row.A75 === "Excellent" ? "i-lucide-check-circle-2" : row.A75 === "Fair" || row.A75 === "2" || row.A75 === "Average" ? "i-lucide-alert-triangle" : row.A75 === "Poor" || row.A75 === "1" || row.A75 === "Bad" || row.A75 === "Damaged" ? "i-lucide-x-circle" : "i-lucide-help-circle",
                                      class: "size-3 shrink-0"
                                    }, null, 8, ["name"]),
                                    createTextVNode(" " + toDisplayString(unref(resolveLang)(row.A75)), 1)
                                  ], 10, ["dir"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "—"))
                                ], 64)) : col.key === "A79" ? (openBlock(), createBlock(Fragment, { key: 11 }, [
                                  row.A79 && row.A79.includes(",") ? (openBlock(), createBlock("a", {
                                    key: 0,
                                    href: `https://www.google.com/maps?q=${row.A79.replace(/\s/g, "")}`,
                                    target: "_blank",
                                    class: "inline-flex items-center justify-center size-8 rounded-lg hover:bg-blue-500/10 transition-colors group/map",
                                    title: "Open in Google Maps",
                                    onClick: withModifiers(() => {
                                    }, ["stop"])
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-map-pin",
                                      class: "size-4 text-blue-500 group-hover/map:scale-110 transition-transform"
                                    })
                                  ], 8, ["href", "onClick"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground"
                                  }, "—"))
                                ], 64)) : (openBlock(), createBlock("span", {
                                  key: 12,
                                  class: "text-sm whitespace-nowrap"
                                }, toDisplayString(row[col.key] || "—"), 1))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(sortedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: unref(columns).length,
                          class: "h-40 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                              createVNode("div", { class: "size-16 rounded-2xl bg-muted/50 flex items-center justify-center" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-inbox",
                                  class: "size-8 text-muted-foreground/40"
                                })
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "font-medium text-foreground/60" }, toDisplayString(unref(total) === 0 ? "No furniture data" : "No matching records"), 1),
                                createVNode("p", { class: "text-xs mt-0.5" }, toDisplayString(unref(total) === 0 ? "Click sync to import data from Google Sheets." : "Try adjusting your search terms."), 1)
                              ]),
                              unref(total) === 0 ? (openBlock(), createBlock(_component_Button, {
                                key: 0,
                                variant: "outline",
                                size: "sm",
                                class: "mt-1",
                                onClick: ($event) => smartSync()
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: "i-lucide-zap",
                                    class: "size-3.5 mr-1.5"
                                  }),
                                  createTextVNode(" Smart Sync ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 1
                        }, 8, ["colspan"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(loadingMore) ? (openBlock(), createBlock(_component_TableRow, { key: 1 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: unref(columns).length,
                          class: "h-12 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center justify-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-loader-2",
                                class: "size-4 animate-spin text-primary"
                              }),
                              createVNode("span", { class: "text-xs" }, "Loading more...")
                            ])
                          ]),
                          _: 1
                        }, 8, ["colspan"])
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
        _push(`<div class="h-1"></div></div>`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showLightbox) && unref(lightboxSrc)) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"><button class="absolute top-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors z-10">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-x",
            class: "size-5 text-white"
          }, null, _parent));
          _push2(`</button>`);
          if (unref(showLightbox)) {
            _push2(`<img${ssrRenderAttr("src", unref(lightboxSrc))} alt="Preview" class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain">`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showDedupResults) && unref(dedupResults)) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"><div class="w-full max-w-lg mx-4 rounded-2xl border bg-card shadow-2xl shadow-black/20 overflow-hidden"><div class="px-6 py-5 border-b bg-gradient-to-r from-emerald-500/5 to-blue-500/5"><div class="flex items-center gap-3"><div class="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-check-circle-2",
            class: "size-5 text-emerald-500"
          }, null, _parent));
          _push2(`</div><div><h3 class="font-semibold text-foreground">Deduplication Complete</h3><p class="text-sm text-muted-foreground">`);
          if (unref(dedupResults).removed > 0) {
            _push2(`<!--[--> Removed <strong class="text-emerald-500">${ssrInterpolate(unref(dedupResults).removed.toLocaleString())}</strong> duplicate rows <!--]-->`);
          } else {
            _push2(`<!--[--> No duplicates found — data is clean! <!--]-->`);
          }
          _push2(`</p></div></div></div><div class="px-6 py-4 grid grid-cols-3 gap-4"><div class="text-center"><p class="text-2xl font-bold tabular-nums text-red-400">${ssrInterpolate(unref(dedupResults).before.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Before</p></div><div class="text-center"><p class="text-2xl font-bold tabular-nums text-amber-400">${ssrInterpolate(unref(dedupResults).removed.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Removed</p></div><div class="text-center"><p class="text-2xl font-bold tabular-nums text-emerald-400">${ssrInterpolate(unref(dedupResults).after.toLocaleString())}</p><p class="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">After</p></div></div><div class="px-6 pb-4"><h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Partition Breakdown</h4><div class="max-h-48 overflow-y-auto space-y-1.5 pr-1"><!--[-->`);
          ssrRenderList(unref(dedupResults).partitionCountsAfter, (afterCount, key) => {
            _push2(`<div class="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"><span class="font-medium font-mono">${ssrInterpolate(key)}</span><div class="flex items-center gap-3 tabular-nums">`);
            if (unref(dedupResults).partitionCountsBefore[key] !== afterCount) {
              _push2(`<span class="text-red-400 line-through opacity-60">${ssrInterpolate(unref(dedupResults).partitionCountsBefore[key]?.toLocaleString())}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="text-emerald-500 font-medium">${ssrInterpolate(afterCount.toLocaleString())}</span></div></div>`);
          });
          _push2(`<!--]--></div></div><div class="px-6 py-4 border-t flex justify-end">`);
          _push2(ssrRenderComponent(_component_Button, {
            size: "sm",
            onClick: ($event) => showDedupResults.value = false
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` Done `);
              } else {
                return [
                  createTextVNode(" Done ")
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
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(qrPopup).show) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"><div class="bg-card rounded-2xl border shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[280px]"><p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">${ssrInterpolate(unref(qrPopup).label)}</p><div class="bg-white rounded-xl p-4"><img${ssrRenderAttr("src", unref(qrUrl)(unref(qrPopup).value, 200))} class="size-[200px]"></div><p class="text-lg font-bold font-mono tabular-nums">${ssrInterpolate(unref(qrPopup).value)}</p>`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "outline",
            size: "sm",
            onClick: ($event) => unref(qrPopup).show = false
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Close`);
              } else {
                return [
                  createTextVNode("Close")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/furniture/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ULQ7Esmf.mjs.map
