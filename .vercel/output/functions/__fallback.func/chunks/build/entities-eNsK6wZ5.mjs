import { a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { _ as _sfc_main$6 } from './index-GIPsDWUk.mjs';
import { defineComponent, ref, computed, watchEffect, watch, mergeProps, unref, isRef, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
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

const CHUNK_SIZE = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "entities",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Entities", icon: "i-lucide-building-2", description: "Manage organizational levels" });
    const isMounted = ref(false);
    const activeTab = ref("level1");
    const search = ref("");
    const syncing = ref(false);
    const level1 = ref([]);
    const level2 = ref([]);
    const level3 = ref([]);
    const store = useDashboardStore();
    store.init();
    const loading = computed(() => !store.ready.value);
    watchEffect(() => {
      level1.value = [...store.level1List.value];
      level2.value = [...store.level2List.value];
      level3.value = [...store.level3List.value];
    });
    async function syncLevels() {
      syncing.value = true;
      try {
        const data = await $fetch("/api/bigquery/sync-levels", { method: "POST" });
        toast.success(data.message || "Synced successfully");
        await store.refresh();
      } catch (e) {
        toast.error(e.data?.statusMessage || "Sync failed");
      } finally {
        syncing.value = false;
      }
    }
    const tabs = computed(() => [
      { key: "level1", label: "Level 1", count: level1.value.length, icon: "i-lucide-map-pin" },
      { key: "level2", label: "Level 2", count: level2.value.length, icon: "i-lucide-building" },
      { key: "level3", label: "Level 3", count: level3.value.length, icon: "i-lucide-map" }
    ]);
    const level1Columns = [
      { key: "logo", label: "Logo", width: "60px" },
      { key: "eng", label: "Name (English)", width: "200px" },
      { key: "arabic", label: "Name (Arabic)", width: "200px" },
      { key: "A276", label: "Verified", width: "100px" },
      { key: "A15", label: "Activity Report", width: "120px" },
      { key: "Related_level2s", label: "Related Level 2", width: "200px" }
    ];
    const level2Columns = [
      { key: "eng", label: "Name (English)", width: "200px" },
      { key: "arabic", label: "Name (Arabic)", width: "200px" },
      { key: "A7", label: "Level 1", width: "160px" },
      { key: "Manager_Name", label: "Manager", width: "160px" },
      { key: "A276", label: "Verified", width: "100px" },
      { key: "Related_Level3s", label: "Related Level 3", width: "200px" }
    ];
    const level3Columns = [
      { key: "eng", label: "Name (English)", width: "200px" },
      { key: "arabic", label: "Name (Arabic)", width: "200px" },
      { key: "A7", label: "Level 1", width: "160px" },
      { key: "A8", label: "Level 2", width: "160px" },
      { key: "A276", label: "Verified", width: "100px" },
      { key: "Counts", label: "Asset Counts", width: "220px" }
    ];
    const currentColumns = computed(() => {
      if (activeTab.value === "level1") return level1Columns;
      if (activeTab.value === "level2") return level2Columns;
      return level3Columns;
    });
    const currentData = computed(() => {
      if (activeTab.value === "level1") return level1.value;
      if (activeTab.value === "level2") return level2.value;
      return level3.value;
    });
    const sortBy = ref("eng");
    const sortDir = ref("asc");
    function toggleSort(col) {
      if (sortBy.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      else {
        sortBy.value = col;
        sortDir.value = "asc";
      }
    }
    function sortIcon(col) {
      if (sortBy.value !== col) return "i-lucide-chevrons-up-down";
      return sortDir.value === "asc" ? "i-lucide-chevron-up" : "i-lucide-chevron-down";
    }
    const visibleCount = ref(CHUNK_SIZE);
    watch([activeTab, search], () => {
      visibleCount.value = CHUNK_SIZE;
    });
    const filteredRows = computed(() => {
      let rows = currentData.value;
      if (search.value) {
        const q = search.value.toLowerCase();
        rows = rows.filter(
          (r) => Object.values(r).some((v) => v && String(v).toLowerCase().includes(q))
        );
      }
      return rows;
    });
    const sortedRows = computed(() => {
      const arr = [...filteredRows.value];
      const col = sortBy.value;
      return arr.sort((a, b) => {
        const av = String(a[col] ?? "").toLowerCase();
        const bv = String(b[col] ?? "").toLowerCase();
        const cmp = av.localeCompare(bv);
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    const visibleRows = computed(() => sortedRows.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < sortedRows.value.length);
    const sentinelRef = ref(null);
    function cellValue(row, key) {
      const val = row[key];
      if (val === null || val === void 0 || val === "") return "—";
      return String(val);
    }
    function verifiedColor(val) {
      const s = (val || "").toLowerCase();
      if (s === "true" || s === "verified" || s === "yes") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      if (s === "false" || s === "no") return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
      return "bg-muted text-muted-foreground";
    }
    function logoUrl(row) {
      if (row.image_url && typeof row.image_url === "string") {
        if (row.image_url.startsWith("http")) return row.image_url;
        return `/api/gcs/${row.image_url}`;
      }
      return "";
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
      const _component_Badge = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))} data-v-92252cab>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end" data-v-92252cab><div class="relative max-w-[220px]" data-v-92252cab>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(search),
            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
            placeholder: "Search entities...",
            class: "pl-8 h-8 text-sm"
          }, null, _parent));
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-92252cab>${ssrInterpolate(unref(filteredRows).length)} record${ssrInterpolate(unref(filteredRows).length !== 1 ? "s" : "")}</p>`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "ghost",
            size: "sm",
            class: "h-8",
            disabled: unref(syncing),
            onClick: ($event) => syncLevels()
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-refresh-cw",
                  class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                }, null, _parent2, _scopeId));
                if (unref(syncing)) {
                  _push3(`<span class="ml-1 text-xs" data-v-92252cab${_scopeId}>Syncing...</span>`);
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-refresh-cw",
                    class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                  }, null, 8, ["class"]),
                  unref(syncing) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "ml-1 text-xs"
                  }, "Syncing...")) : createCommentVNode("", true)
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
      _push(`<div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin" data-v-92252cab><!--[-->`);
      ssrRenderList(unref(tabs), (tab) => {
        _push(`<button class="${ssrRenderClass([unref(activeTab) === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted", "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5"])}" data-v-92252cab>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: tab.icon,
          class: "size-3.5"
        }, null, _parent));
        _push(` ${ssrInterpolate(tab.label)} <span class="${ssrRenderClass([unref(activeTab) === tab.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground/60", "ml-0.5 text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"])}" data-v-92252cab>${ssrInterpolate(tab.count)}</span></button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-92252cab><div class="flex flex-col items-center gap-3 text-muted-foreground" data-v-92252cab>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-8 animate-spin"
        }, null, _parent));
        _push(`<p class="text-sm" data-v-92252cab>Loading entities...</p></div></div>`);
      } else {
        _push(`<div class="flex-1 min-h-0 overflow-auto" data-v-92252cab>`);
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
                          ssrRenderList(unref(currentColumns), (col) => {
                            _push4(ssrRenderComponent(_component_TableHead, {
                              key: col.key,
                              class: "bg-card cursor-pointer select-none whitespace-nowrap",
                              style: { minWidth: col.width },
                              onClick: ($event) => toggleSort(col.key)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-1" data-v-92252cab${_scopeId4}>${ssrInterpolate(col.label)} `);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: sortIcon(col.key),
                                    class: "size-3 opacity-60"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createTextVNode(toDisplayString(col.label) + " ", 1),
                                      createVNode(_component_Icon, {
                                        name: sortIcon(col.key),
                                        class: "size-3 opacity-60"
                                      }, null, 8, ["name"])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                              return openBlock(), createBlock(_component_TableHead, {
                                key: col.key,
                                class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                style: { minWidth: col.width },
                                onClick: ($event) => toggleSort(col.key)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createTextVNode(toDisplayString(col.label) + " ", 1),
                                    createVNode(_component_Icon, {
                                      name: sortIcon(col.key),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["style", "onClick"]);
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                            return openBlock(), createBlock(_component_TableHead, {
                              key: col.key,
                              class: "bg-card cursor-pointer select-none whitespace-nowrap",
                              style: { minWidth: col.width },
                              onClick: ($event) => toggleSort(col.key)
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createTextVNode(toDisplayString(col.label) + " ", 1),
                                  createVNode(_component_Icon, {
                                    name: sortIcon(col.key),
                                    class: "size-3 opacity-60"
                                  }, null, 8, ["name"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["style", "onClick"]);
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
                    ssrRenderList(unref(visibleRows), (row, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: row.A7 || row.A8 || row.A9 || idx,
                        class: "group"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(currentColumns), (col) => {
                              _push4(ssrRenderComponent(_component_TableCell, {
                                key: col.key
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    if (col.key === "logo") {
                                      _push5(`<div class="size-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0" data-v-92252cab${_scopeId4}>`);
                                      if (logoUrl(row)) {
                                        _push5(`<img${ssrRenderAttr("src", logoUrl(row))}${ssrRenderAttr("alt", row.eng)} class="size-8 object-contain" data-v-92252cab${_scopeId4}>`);
                                      } else {
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: "i-lucide-image",
                                          class: "size-4 text-muted-foreground/40"
                                        }, null, _parent5, _scopeId4));
                                      }
                                      _push5(`</div>`);
                                    } else if (col.key === "eng") {
                                      _push5(`<div class="flex items-center gap-2" data-v-92252cab${_scopeId4}>`);
                                      if (unref(activeTab) !== "level1") {
                                        _push5(`<div class="size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0" data-v-92252cab${_scopeId4}>`);
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: unref(activeTab) === "level2" ? "i-lucide-building" : "i-lucide-map",
                                          class: "size-3.5 text-blue-600 dark:text-blue-400"
                                        }, null, _parent5, _scopeId4));
                                        _push5(`</div>`);
                                      } else {
                                        _push5(`<!---->`);
                                      }
                                      _push5(`<span class="font-medium" data-v-92252cab${_scopeId4}>${ssrInterpolate(row.eng || "—")}</span></div>`);
                                    } else if (col.key === "arabic") {
                                      _push5(`<span dir="rtl" class="text-sm text-muted-foreground" data-v-92252cab${_scopeId4}>${ssrInterpolate(row.arabic || "—")}</span>`);
                                    } else if (col.key === "A276") {
                                      _push5(`<!--[-->`);
                                      if (row.A276) {
                                        _push5(ssrRenderComponent(_component_Badge, {
                                          variant: "outline",
                                          class: [verifiedColor(row.A276), "text-[10px]"]
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<span class="text-muted-foreground/40" data-v-92252cab${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else if (col.key === "A7" && unref(activeTab) !== "level1") {
                                      _push5(`<!--[-->`);
                                      if (row.A7_label || row.A7) {
                                        _push5(ssrRenderComponent(_component_Badge, {
                                          variant: "outline",
                                          class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(row.A7_label || row.A7)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(row.A7_label || row.A7), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<span class="text-muted-foreground/40" data-v-92252cab${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else if (col.key === "A8" && unref(activeTab) === "level3") {
                                      _push5(`<!--[-->`);
                                      if (row.A8_label || row.A8) {
                                        _push5(ssrRenderComponent(_component_Badge, {
                                          variant: "outline",
                                          class: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]"
                                        }, {
                                          default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              _push6(`${ssrInterpolate(row.A8_label || row.A8)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(row.A8_label || row.A8), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent5, _scopeId4));
                                      } else {
                                        _push5(`<span class="text-muted-foreground/40" data-v-92252cab${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else {
                                      _push5(`<span class="text-sm whitespace-nowrap" data-v-92252cab${_scopeId4}>${ssrInterpolate(cellValue(row, col.key))}</span>`);
                                    }
                                  } else {
                                    return [
                                      col.key === "logo" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "size-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0"
                                      }, [
                                        logoUrl(row) ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: logoUrl(row),
                                          alt: row.eng,
                                          class: "size-8 object-contain",
                                          onError: ($event) => $event.target.style.display = "none"
                                        }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-image",
                                          class: "size-4 text-muted-foreground/40"
                                        }))
                                      ])) : col.key === "eng" ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex items-center gap-2"
                                      }, [
                                        unref(activeTab) !== "level1" ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0"
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: unref(activeTab) === "level2" ? "i-lucide-building" : "i-lucide-map",
                                            class: "size-3.5 text-blue-600 dark:text-blue-400"
                                          }, null, 8, ["name"])
                                        ])) : createCommentVNode("", true),
                                        createVNode("span", { class: "font-medium" }, toDisplayString(row.eng || "—"), 1)
                                      ])) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        dir: "rtl",
                                        class: "text-sm text-muted-foreground"
                                      }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A276" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                        row.A276 ? (openBlock(), createBlock(_component_Badge, {
                                          key: 0,
                                          variant: "outline",
                                          class: [verifiedColor(row.A276), "text-[10px]"]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground/40"
                                        }, "—"))
                                      ], 64)) : col.key === "A7" && unref(activeTab) !== "level1" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                                        row.A7_label || row.A7 ? (openBlock(), createBlock(_component_Badge, {
                                          key: 0,
                                          variant: "outline",
                                          class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(row.A7_label || row.A7), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground/40"
                                        }, "—"))
                                      ], 64)) : col.key === "A8" && unref(activeTab) === "level3" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                                        row.A8_label || row.A8 ? (openBlock(), createBlock(_component_Badge, {
                                          key: 0,
                                          variant: "outline",
                                          class: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(row.A8_label || row.A8), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground/40"
                                        }, "—"))
                                      ], 64)) : (openBlock(), createBlock("span", {
                                        key: 6,
                                        class: "text-sm whitespace-nowrap"
                                      }, toDisplayString(cellValue(row, col.key)), 1))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                                return openBlock(), createBlock(_component_TableCell, {
                                  key: col.key
                                }, {
                                  default: withCtx(() => [
                                    col.key === "logo" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "size-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0"
                                    }, [
                                      logoUrl(row) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: logoUrl(row),
                                        alt: row.eng,
                                        class: "size-8 object-contain",
                                        onError: ($event) => $event.target.style.display = "none"
                                      }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                        key: 1,
                                        name: "i-lucide-image",
                                        class: "size-4 text-muted-foreground/40"
                                      }))
                                    ])) : col.key === "eng" ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex items-center gap-2"
                                    }, [
                                      unref(activeTab) !== "level1" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0"
                                      }, [
                                        createVNode(_component_Icon, {
                                          name: unref(activeTab) === "level2" ? "i-lucide-building" : "i-lucide-map",
                                          class: "size-3.5 text-blue-600 dark:text-blue-400"
                                        }, null, 8, ["name"])
                                      ])) : createCommentVNode("", true),
                                      createVNode("span", { class: "font-medium" }, toDisplayString(row.eng || "—"), 1)
                                    ])) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      dir: "rtl",
                                      class: "text-sm text-muted-foreground"
                                    }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A276" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                      row.A276 ? (openBlock(), createBlock(_component_Badge, {
                                        key: 0,
                                        variant: "outline",
                                        class: [verifiedColor(row.A276), "text-[10px]"]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground/40"
                                      }, "—"))
                                    ], 64)) : col.key === "A7" && unref(activeTab) !== "level1" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                                      row.A7_label || row.A7 ? (openBlock(), createBlock(_component_Badge, {
                                        key: 0,
                                        variant: "outline",
                                        class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(row.A7_label || row.A7), 1)
                                        ]),
                                        _: 2
                                      }, 1024)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground/40"
                                      }, "—"))
                                    ], 64)) : col.key === "A8" && unref(activeTab) === "level3" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                                      row.A8_label || row.A8 ? (openBlock(), createBlock(_component_Badge, {
                                        key: 0,
                                        variant: "outline",
                                        class: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(row.A8_label || row.A8), 1)
                                        ]),
                                        _: 2
                                      }, 1024)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground/40"
                                      }, "—"))
                                    ], 64)) : (openBlock(), createBlock("span", {
                                      key: 6,
                                      class: "text-sm whitespace-nowrap"
                                    }, toDisplayString(cellValue(row, col.key)), 1))
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
                    if (unref(visibleRows).length === 0 && !unref(loading)) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: unref(currentColumns).length,
                              class: "h-32 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-92252cab${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p data-v-92252cab${_scopeId4}>No entities found</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-inbox",
                                        class: "size-8"
                                      }),
                                      createVNode("p", null, "No entities found")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: unref(currentColumns).length,
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-inbox",
                                      class: "size-8"
                                    }),
                                    createVNode("p", null, "No entities found")
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
                    if (unref(hasMore)) {
                      _push3(`<tr data-v-92252cab${_scopeId2}><td${ssrRenderAttr("colspan", unref(currentColumns).length)} class="h-10 text-center text-xs text-muted-foreground" data-v-92252cab${_scopeId2}> Loading more… </td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (row, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: row.A7 || row.A8 || row.A9 || idx,
                          class: "group"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                              return openBlock(), createBlock(_component_TableCell, {
                                key: col.key
                              }, {
                                default: withCtx(() => [
                                  col.key === "logo" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "size-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0"
                                  }, [
                                    logoUrl(row) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: logoUrl(row),
                                      alt: row.eng,
                                      class: "size-8 object-contain",
                                      onError: ($event) => $event.target.style.display = "none"
                                    }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                      key: 1,
                                      name: "i-lucide-image",
                                      class: "size-4 text-muted-foreground/40"
                                    }))
                                  ])) : col.key === "eng" ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "flex items-center gap-2"
                                  }, [
                                    unref(activeTab) !== "level1" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0"
                                    }, [
                                      createVNode(_component_Icon, {
                                        name: unref(activeTab) === "level2" ? "i-lucide-building" : "i-lucide-map",
                                        class: "size-3.5 text-blue-600 dark:text-blue-400"
                                      }, null, 8, ["name"])
                                    ])) : createCommentVNode("", true),
                                    createVNode("span", { class: "font-medium" }, toDisplayString(row.eng || "—"), 1)
                                  ])) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    dir: "rtl",
                                    class: "text-sm text-muted-foreground"
                                  }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A276" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                    row.A276 ? (openBlock(), createBlock(_component_Badge, {
                                      key: 0,
                                      variant: "outline",
                                      class: [verifiedColor(row.A276), "text-[10px]"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground/40"
                                    }, "—"))
                                  ], 64)) : col.key === "A7" && unref(activeTab) !== "level1" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                                    row.A7_label || row.A7 ? (openBlock(), createBlock(_component_Badge, {
                                      key: 0,
                                      variant: "outline",
                                      class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.A7_label || row.A7), 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground/40"
                                    }, "—"))
                                  ], 64)) : col.key === "A8" && unref(activeTab) === "level3" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                                    row.A8_label || row.A8 ? (openBlock(), createBlock(_component_Badge, {
                                      key: 0,
                                      variant: "outline",
                                      class: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(row.A8_label || row.A8), 1)
                                      ]),
                                      _: 2
                                    }, 1024)) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground/40"
                                    }, "—"))
                                  ], 64)) : (openBlock(), createBlock("span", {
                                    key: 6,
                                    class: "text-sm whitespace-nowrap"
                                  }, toDisplayString(cellValue(row, col.key)), 1))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(visibleRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: unref(currentColumns).length,
                            class: "h-32 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-inbox",
                                  class: "size-8"
                                }),
                                createVNode("p", null, "No entities found")
                              ])
                            ]),
                            _: 1
                          }, 8, ["colspan"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(hasMore) ? (openBlock(), createBlock("tr", {
                        key: 1,
                        ref_key: "sentinelRef",
                        ref: sentinelRef
                      }, [
                        createVNode("td", {
                          colspan: unref(currentColumns).length,
                          class: "h-10 text-center text-xs text-muted-foreground"
                        }, " Loading more… ", 8, ["colspan"])
                      ], 512)) : createCommentVNode("", true)
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                          return openBlock(), createBlock(_component_TableHead, {
                            key: col.key,
                            class: "bg-card cursor-pointer select-none whitespace-nowrap",
                            style: { minWidth: col.width },
                            onClick: ($event) => toggleSort(col.key)
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createTextVNode(toDisplayString(col.label) + " ", 1),
                                createVNode(_component_Icon, {
                                  name: sortIcon(col.key),
                                  class: "size-3 opacity-60"
                                }, null, 8, ["name"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["style", "onClick"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_TableBody, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (row, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: row.A7 || row.A8 || row.A9 || idx,
                        class: "group"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(currentColumns), (col) => {
                            return openBlock(), createBlock(_component_TableCell, {
                              key: col.key
                            }, {
                              default: withCtx(() => [
                                col.key === "logo" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "size-8 rounded-lg overflow-hidden bg-muted flex items-center justify-center shrink-0"
                                }, [
                                  logoUrl(row) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: logoUrl(row),
                                    alt: row.eng,
                                    class: "size-8 object-contain",
                                    onError: ($event) => $event.target.style.display = "none"
                                  }, null, 40, ["src", "alt", "onError"])) : (openBlock(), createBlock(_component_Icon, {
                                    key: 1,
                                    name: "i-lucide-image",
                                    class: "size-4 text-muted-foreground/40"
                                  }))
                                ])) : col.key === "eng" ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "flex items-center gap-2"
                                }, [
                                  unref(activeTab) !== "level1" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "size-7 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center shrink-0"
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: unref(activeTab) === "level2" ? "i-lucide-building" : "i-lucide-map",
                                      class: "size-3.5 text-blue-600 dark:text-blue-400"
                                    }, null, 8, ["name"])
                                  ])) : createCommentVNode("", true),
                                  createVNode("span", { class: "font-medium" }, toDisplayString(row.eng || "—"), 1)
                                ])) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  dir: "rtl",
                                  class: "text-sm text-muted-foreground"
                                }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A276" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                  row.A276 ? (openBlock(), createBlock(_component_Badge, {
                                    key: 0,
                                    variant: "outline",
                                    class: [verifiedColor(row.A276), "text-[10px]"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(row.A276 === "true" || row.A276 === "Verified" ? "Verified" : row.A276), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground/40"
                                  }, "—"))
                                ], 64)) : col.key === "A7" && unref(activeTab) !== "level1" ? (openBlock(), createBlock(Fragment, { key: 4 }, [
                                  row.A7_label || row.A7 ? (openBlock(), createBlock(_component_Badge, {
                                    key: 0,
                                    variant: "outline",
                                    class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(row.A7_label || row.A7), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground/40"
                                  }, "—"))
                                ], 64)) : col.key === "A8" && unref(activeTab) === "level3" ? (openBlock(), createBlock(Fragment, { key: 5 }, [
                                  row.A8_label || row.A8 ? (openBlock(), createBlock(_component_Badge, {
                                    key: 0,
                                    variant: "outline",
                                    class: "bg-violet-500/10 text-violet-600 border-violet-500/20 text-[10px]"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(row.A8_label || row.A8), 1)
                                    ]),
                                    _: 2
                                  }, 1024)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground/40"
                                  }, "—"))
                                ], 64)) : (openBlock(), createBlock("span", {
                                  key: 6,
                                  class: "text-sm whitespace-nowrap"
                                }, toDisplayString(cellValue(row, col.key)), 1))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(visibleRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: unref(currentColumns).length,
                          class: "h-32 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-inbox",
                                class: "size-8"
                              }),
                              createVNode("p", null, "No entities found")
                            ])
                          ]),
                          _: 1
                        }, 8, ["colspan"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(hasMore) ? (openBlock(), createBlock("tr", {
                      key: 1,
                      ref_key: "sentinelRef",
                      ref: sentinelRef
                    }, [
                      createVNode("td", {
                        colspan: unref(currentColumns).length,
                        class: "h-10 text-center text-xs text-muted-foreground"
                      }, " Loading more… ", 8, ["colspan"])
                    ], 512)) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/entities.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const entities = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92252cab"]]);

export { entities as default };
//# sourceMappingURL=entities-eNsK6wZ5.mjs.map
