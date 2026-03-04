import { a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { defineComponent, ref, computed, watchEffect, watch, mergeProps, unref, isRef, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

const CHUNK_SIZE = 60;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Categories", icon: "i-lucide-tags", description: "Asset categories, subcategories & descriptions" });
    const isMounted = ref(false);
    const { lang: appLang } = useAppLanguage();
    const store = useDashboardStore();
    store.init();
    const loading = computed(() => !store.ready.value);
    const categories2 = computed(() => [...store.categories.value]);
    const allSubCategories = computed(() => [...store.subCategories.value]);
    const allDescriptions = computed(() => [...store.assetDescriptions.value]);
    const selectedCatId = ref("");
    const selectedSubCatId = ref("");
    const search = ref("");
    const syncing = ref(false);
    function lang(row) {
      if (!row) return "";
      return appLang.value === "ar" ? row.arabic || row.eng || "" : row.eng || row.arabic || "";
    }
    watchEffect(() => {
      if (categories2.value.length && !selectedCatId.value) {
        selectedCatId.value = categories2.value[0].A51;
      }
    });
    const filteredSubCategories = computed(() => {
      if (!selectedCatId.value) return [];
      return allSubCategories.value.filter((s) => s.A51 === selectedCatId.value);
    });
    watch(selectedCatId, () => {
      selectedSubCatId.value = "";
    });
    const filteredDescriptions = computed(() => {
      const q = search.value.toLowerCase();
      let descs = allDescriptions.value;
      if (selectedSubCatId.value) {
        descs = descs.filter((d) => d.A66 === selectedSubCatId.value);
      } else if (selectedCatId.value) {
        const subIds = new Set(filteredSubCategories.value.map((s) => s.A66));
        descs = descs.filter((d) => subIds.has(d.A66));
      }
      if (q) {
        descs = descs.filter(
          (d) => (d.eng || "").toLowerCase().includes(q) || (d.arabic || "").toLowerCase().includes(q) || (d.A67 || "").toLowerCase().includes(q)
        );
      }
      return descs;
    });
    function subCountForCategory(catId) {
      return allSubCategories.value.filter((s) => s.A51 === catId).length;
    }
    function descCountForSub(subId) {
      return allDescriptions.value.filter((d) => d.A66 === subId).length;
    }
    function totalDescsForCategory() {
      const subIds = new Set(filteredSubCategories.value.map((s) => s.A66));
      return allDescriptions.value.filter((d) => subIds.has(d.A66)).length;
    }
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
    const sortedDescriptions = computed(() => {
      const col = sortBy.value;
      return [...filteredDescriptions.value].sort((a, b) => {
        const av = String(a[col] ?? "").toLowerCase();
        const bv = String(b[col] ?? "").toLowerCase();
        const cmp = av.localeCompare(bv);
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    async function syncData() {
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
    const visibleCount = ref(CHUNK_SIZE);
    watch([selectedSubCatId, selectedCatId, search], () => {
      visibleCount.value = CHUNK_SIZE;
    });
    const visibleRows = computed(() => sortedDescriptions.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < sortedDescriptions.value.length);
    const sentinelRef = ref(null);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))} data-v-f8748b4b>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end" data-v-f8748b4b><div class="relative max-w-[220px]" data-v-f8748b4b>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(search),
            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
            placeholder: "Search descriptions...",
            class: "pl-8 h-8 text-sm"
          }, null, _parent));
          if (unref(search)) {
            _push2(`<button class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors" data-v-f8748b4b>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-x",
              class: "size-2.5 text-muted-foreground"
            }, null, _parent));
            _push2(`</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-f8748b4b>${ssrInterpolate(unref(filteredDescriptions).length.toLocaleString())} record${ssrInterpolate(unref(filteredDescriptions).length !== 1 ? "s" : "")}</p>`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "ghost",
            size: "sm",
            class: "h-8",
            disabled: unref(syncing),
            onClick: ($event) => syncData()
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-refresh-cw",
                  class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                }, null, _parent2, _scopeId));
                if (unref(syncing)) {
                  _push3(`<span class="ml-1 text-xs" data-v-f8748b4b${_scopeId}>Syncing...</span>`);
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
      _push(`<div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin" data-v-f8748b4b><!--[-->`);
      ssrRenderList(unref(categories2), (cat) => {
        _push(`<button class="${ssrRenderClass([unref(selectedCatId) === cat.A51 ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted", "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5"])}" data-v-f8748b4b>${ssrInterpolate(lang(cat))} <span class="${ssrRenderClass([unref(selectedCatId) === cat.A51 ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground/60", "ml-0.5 text-[10px] tabular-nums px-1.5 py-0.5 rounded-full"])}" data-v-f8748b4b>${ssrInterpolate(subCountForCategory(cat.A51))}</span></button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-f8748b4b><div class="flex flex-col items-center gap-3 text-muted-foreground" data-v-f8748b4b>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-8 animate-spin"
        }, null, _parent));
        _push(`<p class="text-sm" data-v-f8748b4b>Loading categories...</p></div></div>`);
      } else {
        _push(`<div class="flex-1 min-h-0 flex" data-v-f8748b4b><div class="${ssrRenderClass([unref(appLang) === "ar" ? "order-2 border-r-0 border-l" : "", "w-[300px] shrink-0 border-r flex flex-col min-h-0 bg-card"])}" data-v-f8748b4b><button class="${ssrRenderClass([!unref(selectedSubCatId) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50", "w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b transition-colors"])}" data-v-f8748b4b>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-layers",
          class: "size-3.5 shrink-0"
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([unref(appLang) === "ar" ? "text-right" : "text-left", "flex-1"])}" data-v-f8748b4b>${ssrInterpolate(unref(appLang) === "ar" ? "عرض الكل" : "All")}</span><span class="text-[10px] tabular-nums px-1.5 py-0.5 rounded-full bg-muted text-foreground/70" data-v-f8748b4b>${ssrInterpolate(totalDescsForCategory())}</span></button><div class="flex-1 overflow-y-auto scrollbar-thin" data-v-f8748b4b><!--[-->`);
        ssrRenderList(unref(filteredSubCategories), (sub) => {
          _push(`<button class="${ssrRenderClass([unref(selectedSubCatId) === sub.A66 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/30", "w-full flex items-center gap-2 px-4 py-2 text-[13px] transition-colors border-b border-border/30"])}" data-v-f8748b4b>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-chevron-right",
            class: ["size-3 shrink-0 transition-transform", [
              unref(selectedSubCatId) === sub.A66 ? "text-primary rotate-90" : "text-muted-foreground",
              unref(appLang) === "ar" ? "rotate-180" : ""
            ]]
          }, null, _parent));
          _push(`<span class="${ssrRenderClass([unref(appLang) === "ar" ? "text-right" : "text-left", "truncate flex-1"])}" data-v-f8748b4b>${ssrInterpolate(lang(sub) || sub.A66)}</span><span class="${ssrRenderClass([unref(selectedSubCatId) === sub.A66 ? "bg-primary/20 text-primary" : "bg-muted text-foreground/70", "text-[10px] tabular-nums shrink-0 px-1.5 py-0.5 rounded-full"])}" data-v-f8748b4b>${ssrInterpolate(descCountForSub(sub.A66))}</span></button>`);
        });
        _push(`<!--]-->`);
        if (unref(filteredSubCategories).length === 0) {
          _push(`<div class="py-8 text-center text-muted-foreground" data-v-f8748b4b>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-folder-open",
            class: "size-6 mx-auto mb-2 opacity-40"
          }, null, _parent));
          _push(`<p class="text-xs" data-v-f8748b4b>No subcategories</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="${ssrRenderClass([unref(appLang) === "ar" ? "order-1" : "", "flex-1 min-h-0 overflow-auto"])}" data-v-f8748b4b>`);
        _push(ssrRenderComponent(_component_Table, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_TableRow, { class: "border-b-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort(unref(appLang) === "ar" ? "arabic" : "eng")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-1" data-v-f8748b4b${_scopeId4}>${ssrInterpolate(unref(appLang) === "ar" ? "الوصف" : "Description")} `);
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: sortIcon(unref(appLang) === "ar" ? "arabic" : "eng"),
                                  class: "size-3 opacity-60"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createTextVNode(toDisplayString(unref(appLang) === "ar" ? "الوصف" : "Description") + " ", 1),
                                    createVNode(_component_Icon, {
                                      name: sortIcon(unref(appLang) === "ar" ? "arabic" : "eng"),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_TableHead, {
                              class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                              onClick: ($event) => toggleSort(unref(appLang) === "ar" ? "arabic" : "eng")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createTextVNode(toDisplayString(unref(appLang) === "ar" ? "الوصف" : "Description") + " ", 1),
                                  createVNode(_component_Icon, {
                                    name: sortIcon(unref(appLang) === "ar" ? "arabic" : "eng"),
                                    class: "size-3 opacity-60"
                                  }, null, 8, ["name"])
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TableRow, { class: "border-b-0" }, {
                        default: withCtx(() => [
                          createVNode(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort(unref(appLang) === "ar" ? "arabic" : "eng")
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createTextVNode(toDisplayString(unref(appLang) === "ar" ? "الوصف" : "Description") + " ", 1),
                                createVNode(_component_Icon, {
                                  name: sortIcon(unref(appLang) === "ar" ? "arabic" : "eng"),
                                  class: "size-3 opacity-60"
                                }, null, 8, ["name"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["onClick"])
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
                    ssrRenderList(unref(visibleRows), (desc, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: desc.A67 || idx,
                        class: "group hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<span class="text-sm"${ssrRenderAttr("dir", unref(appLang) === "ar" ? "rtl" : "ltr")} data-v-f8748b4b${_scopeId4}>${ssrInterpolate(lang(desc) || "—")}</span>`);
                                } else {
                                  return [
                                    createVNode("span", {
                                      class: "text-sm",
                                      dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                    }, toDisplayString(lang(desc) || "—"), 9, ["dir"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, null, {
                                default: withCtx(() => [
                                  createVNode("span", {
                                    class: "text-sm",
                                    dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                  }, toDisplayString(lang(desc) || "—"), 9, ["dir"])
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
                    if (unref(visibleRows).length === 0) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, { class: "h-32 text-center" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-f8748b4b${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p data-v-f8748b4b${_scopeId4}>${ssrInterpolate(unref(appLang) === "ar" ? "لا توجد نتائج" : "No descriptions found")}</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-inbox",
                                        class: "size-8"
                                      }),
                                      createVNode("p", null, toDisplayString(unref(appLang) === "ar" ? "لا توجد نتائج" : "No descriptions found"), 1)
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, { class: "h-32 text-center" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-inbox",
                                      class: "size-8"
                                    }),
                                    createVNode("p", null, toDisplayString(unref(appLang) === "ar" ? "لا توجد نتائج" : "No descriptions found"), 1)
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
                    if (unref(hasMore)) {
                      _push3(`<tr data-v-f8748b4b${_scopeId2}><td class="h-10 text-center text-xs text-muted-foreground" data-v-f8748b4b${_scopeId2}> Loading more… </td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (desc, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: desc.A67 || idx,
                          class: "group hover:bg-muted/30 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_TableCell, null, {
                              default: withCtx(() => [
                                createVNode("span", {
                                  class: "text-sm",
                                  dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                                }, toDisplayString(lang(desc) || "—"), 9, ["dir"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(visibleRows).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, { class: "h-32 text-center" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-inbox",
                                  class: "size-8"
                                }),
                                createVNode("p", null, toDisplayString(unref(appLang) === "ar" ? "لا توجد نتائج" : "No descriptions found"), 1)
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(hasMore) ? (openBlock(), createBlock("tr", {
                        key: 1,
                        ref_key: "sentinelRef",
                        ref: sentinelRef
                      }, [
                        createVNode("td", { class: "h-10 text-center text-xs text-muted-foreground" }, " Loading more… ")
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
                        createVNode(_component_TableHead, {
                          class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                          onClick: ($event) => toggleSort(unref(appLang) === "ar" ? "arabic" : "eng")
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createTextVNode(toDisplayString(unref(appLang) === "ar" ? "الوصف" : "Description") + " ", 1),
                              createVNode(_component_Icon, {
                                name: sortIcon(unref(appLang) === "ar" ? "arabic" : "eng"),
                                class: "size-3 opacity-60"
                              }, null, 8, ["name"])
                            ])
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_TableBody, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (desc, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: desc.A67 || idx,
                        class: "group hover:bg-muted/30 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, null, {
                            default: withCtx(() => [
                              createVNode("span", {
                                class: "text-sm",
                                dir: unref(appLang) === "ar" ? "rtl" : "ltr"
                              }, toDisplayString(lang(desc) || "—"), 9, ["dir"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(visibleRows).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, { class: "h-32 text-center" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-inbox",
                                class: "size-8"
                              }),
                              createVNode("p", null, toDisplayString(unref(appLang) === "ar" ? "لا توجد نتائج" : "No descriptions found"), 1)
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(hasMore) ? (openBlock(), createBlock("tr", {
                      key: 1,
                      ref_key: "sentinelRef",
                      ref: sentinelRef
                    }, [
                      createVNode("td", { class: "h-10 text-center text-xs text-muted-foreground" }, " Loading more… ")
                    ], 512)) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8748b4b"]]);

export { categories as default };
//# sourceMappingURL=categories-BwqSAdU3.mjs.map
