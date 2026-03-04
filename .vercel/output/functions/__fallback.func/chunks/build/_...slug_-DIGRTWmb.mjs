import { c as useRoute, a as __nuxt_component_2, _ as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$2, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { defineComponent, computed, watch, ref, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
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
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slugParts = computed(() => {
      const s = route.params.slug;
      return Array.isArray(s) ? s : s ? [s] : [];
    });
    const filterA7 = computed(() => slugParts.value[0] || "");
    const filterA8 = computed(() => slugParts.value[1] || "");
    const filterA9 = computed(() => slugParts.value[2] || "");
    const pageTitle = computed(() => {
      if (filterA9.value) return `${filterA7.value} / ${filterA8.value} / ${filterA9.value}`;
      if (filterA8.value) return `${filterA7.value} / ${filterA8.value}`;
      return filterA7.value;
    });
    const { setHeader } = usePageHeader();
    setHeader({ title: "Furniture", icon: "i-lucide-armchair", description: pageTitle.value });
    watch(pageTitle, (t) => setHeader({ title: "Furniture", icon: "i-lucide-armchair", description: t }));
    const loading = ref(true);
    const search = ref("");
    const page = ref(1);
    const limit = ref(100);
    const rows = ref([]);
    const total = ref(0);
    const totalPages = ref(0);
    async function fetchData() {
      loading.value = true;
      try {
        const params = { page: page.value, limit: limit.value };
        if (filterA7.value) params.a7 = filterA7.value;
        if (filterA8.value) params.a8 = filterA8.value;
        if (filterA9.value) params.a9 = filterA9.value;
        if (search.value.trim()) params.search = search.value.trim();
        const data = await $fetch("/api/bigquery/furniture", { params });
        if (data.success) {
          rows.value = data.rows;
          total.value = data.total;
          totalPages.value = data.totalPages;
        }
      } catch (e) {
        if (!e.message?.includes("Not found")) toast.error("Failed to load data");
      } finally {
        loading.value = false;
      }
    }
    fetchData();
    watch(() => route.params.slug, () => {
      page.value = 1;
      fetchData();
    });
    watch(page, () => fetchData());
    let searchDebounce;
    watch(search, () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        page.value = 1;
        fetchData();
      }, 400);
    });
    const IMAGE_COLS = ["A69", "A71", "A72"];
    const columns = [
      { key: "A69", label: "Photo 1", width: "60px", isImage: true },
      { key: "ID", label: "ID", width: "90px" },
      { key: "A70", label: "Asset Code", width: "120px" },
      { key: "A7", label: "Level 1", width: "120px" },
      { key: "A8", label: "Level 2", width: "100px" },
      { key: "A9", label: "Level 3", width: "100px" },
      { key: "A66", label: "A66", width: "100px" },
      { key: "A67", label: "A67", width: "100px" },
      { key: "A222", label: "Description", width: "180px" },
      { key: "A68", label: "Condition", width: "120px" },
      { key: "A71", label: "Photo 2", width: "60px", isImage: true },
      { key: "A72", label: "Photo 3", width: "60px", isImage: true },
      { key: "A75", label: "A75", width: "100px" },
      { key: "A76", label: "A76", width: "100px" },
      { key: "A77", label: "A77", width: "100px" },
      { key: "A78", label: "A78", width: "100px" },
      { key: "A2", label: "A2", width: "100px" },
      { key: "A79", label: "A79", width: "100px" },
      { key: "A213", label: "A213", width: "100px" }
    ];
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
    function imageUrl(row, col) {
      const gcsPath = row[col + "_url"];
      if (gcsPath && typeof gcsPath === "string" && gcsPath.trim()) {
        return gcsPath.startsWith("http") ? gcsPath : `/api/gcs/${gcsPath}`;
      }
      const rawPath = row[col];
      if (rawPath && typeof rawPath === "string" && rawPath.includes("/")) {
        return `/api/gcs/${rawPath}`;
      }
      return "";
    }
    const lightboxSrc = ref("");
    const showLightbox = ref(false);
    function openLightbox(src) {
      if (src) {
        lightboxSrc.value = src;
        showLightbox.value = true;
      }
    }
    const failedImages = ref(/* @__PURE__ */ new Set());
    function onImageError(key) {
      failedImages.value.add(key);
    }
    function isImageFailed(key) {
      return failedImages.value.has(key);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$1;
      const _component_Table = _sfc_main$8;
      const _component_TableHeader = _sfc_main$2;
      const _component_TableRow = _sfc_main$4;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$7;
      const _component_TableCell = _sfc_main$5;
      const _component_Button = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))}><div class="shrink-0 border-b px-4 py-2 flex items-center gap-3"><div class="relative max-w-[220px]">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-lucide-search",
        class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Input, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Search...",
        class: "pl-8 h-8 text-sm"
      }, null, _parent));
      _push(`</div><p class="text-xs text-muted-foreground tabular-nums whitespace-nowrap">${ssrInterpolate(unref(total).toLocaleString())} record${ssrInterpolate(unref(total) !== 1 ? "s" : "")}</p></div>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center"><div class="flex flex-col items-center gap-3 text-muted-foreground">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-8 animate-spin"
        }, null, _parent));
        _push(`<p class="text-sm">Loading...</p></div></div>`);
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
                          ssrRenderList(columns, (col) => {
                            _push4(ssrRenderComponent(_component_TableHead, {
                              key: col.key,
                              class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none" : ""],
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
                            (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                              return createVNode(_component_TableHead, {
                                key: col.key,
                                class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none" : ""],
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
                            }), 64))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_TableRow, { class: "border-b-0" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                            return createVNode(_component_TableHead, {
                              key: col.key,
                              class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none" : ""],
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
                          }), 64))
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
                            ssrRenderList(columns, (col) => {
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
                                      _push5(`<span class="font-medium font-mono text-xs"${_scopeId4}>${ssrInterpolate(row.A70 || "—")}</span>`);
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
                                        }, "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"])}"${_scopeId4}>${ssrInterpolate(row.A68)}</span>`);
                                      } else {
                                        _push5(`<span class="text-sm text-muted-foreground"${_scopeId4}>—</span>`);
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
                                      ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "font-medium font-mono text-xs"
                                      }, toDisplayString(row.A70 || "—"), 1)) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        dir: "rtl",
                                        class: "text-sm"
                                      }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                        row.A68 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                            "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                            "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                            "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                          }]
                                        }, toDisplayString(row.A68), 3)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : (openBlock(), createBlock("span", {
                                        key: 4,
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
                              (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                                return createVNode(_component_TableCell, {
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
                                    ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "font-medium font-mono text-xs"
                                    }, toDisplayString(row.A70 || "—"), 1)) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      dir: "rtl",
                                      class: "text-sm"
                                    }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                      row.A68 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                          "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                          "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                          "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                        }]
                                      }, toDisplayString(row.A68), 3)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-sm text-muted-foreground"
                                      }, "—"))
                                    ], 64)) : (openBlock(), createBlock("span", {
                                      key: 4,
                                      class: "text-sm whitespace-nowrap"
                                    }, toDisplayString(row[col.key] || "—"), 1))
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
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
                              colspan: columns.length,
                              class: "h-40 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-3 text-muted-foreground"${_scopeId4}><div class="size-16 rounded-2xl bg-muted/50 flex items-center justify-center"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8 text-muted-foreground/40"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div><p class="font-medium text-foreground/60"${_scopeId4}>No matching records</p><p class="text-xs"${_scopeId4}>Try adjusting your search terms.</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                      createVNode("div", { class: "size-16 rounded-2xl bg-muted/50 flex items-center justify-center" }, [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-inbox",
                                          class: "size-8 text-muted-foreground/40"
                                        })
                                      ]),
                                      createVNode("p", { class: "font-medium text-foreground/60" }, "No matching records"),
                                      createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
                                    ])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, {
                                colspan: columns.length,
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
                                    createVNode("p", { class: "font-medium text-foreground/60" }, "No matching records"),
                                    createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
                            (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                              return createVNode(_component_TableCell, {
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
                                  ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "font-medium font-mono text-xs"
                                  }, toDisplayString(row.A70 || "—"), 1)) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    dir: "rtl",
                                    class: "text-sm"
                                  }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                    row.A68 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                        "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                        "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                        "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                      }]
                                    }, toDisplayString(row.A68), 3)) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-sm text-muted-foreground"
                                    }, "—"))
                                  ], 64)) : (openBlock(), createBlock("span", {
                                    key: 4,
                                    class: "text-sm whitespace-nowrap"
                                  }, toDisplayString(row[col.key] || "—"), 1))
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(sortedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: columns.length,
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
                                createVNode("p", { class: "font-medium text-foreground/60" }, "No matching records"),
                                createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
                        (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                          return createVNode(_component_TableHead, {
                            key: col.key,
                            class: ["bg-card whitespace-nowrap", !col.isImage ? "cursor-pointer select-none" : ""],
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
                        }), 64))
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
                          (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                            return createVNode(_component_TableCell, {
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
                                ], 8, ["onClick"])) : col.key === "A70" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "font-medium font-mono text-xs"
                                }, toDisplayString(row.A70 || "—"), 1)) : col.key === "A222" ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  dir: "rtl",
                                  class: "text-sm"
                                }, toDisplayString(row.A222 || "—"), 1)) : col.key === "A68" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                  row.A68 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: ["inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", {
                                      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": row.A68 === "Good" || row.A68 === "3",
                                      "bg-amber-500/10 text-amber-600 dark:text-amber-400": row.A68 === "Fair" || row.A68 === "2",
                                      "bg-red-500/10 text-red-600 dark:text-red-400": row.A68 === "Poor" || row.A68 === "1",
                                      "bg-muted text-muted-foreground": !["Good", "Fair", "Poor", "1", "2", "3"].includes(row.A68)
                                    }]
                                  }, toDisplayString(row.A68), 3)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-sm text-muted-foreground"
                                  }, "—"))
                                ], 64)) : (openBlock(), createBlock("span", {
                                  key: 4,
                                  class: "text-sm whitespace-nowrap"
                                }, toDisplayString(row[col.key] || "—"), 1))
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(sortedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: columns.length,
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
                              createVNode("p", { class: "font-medium text-foreground/60" }, "No matching records"),
                              createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
        _push(`</div>`);
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4"><p class="text-xs text-muted-foreground tabular-nums"> Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(totalPages))} · ${ssrInterpolate(unref(total).toLocaleString())} total </p><div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "outline",
          size: "sm",
          class: "h-7 px-2 text-xs",
          disabled: unref(page) <= 1,
          onClick: ($event) => page.value--
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-chevron-left",
                class: "size-3.5"
              }, null, _parent2, _scopeId));
              _push2(` Prev `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-lucide-chevron-left",
                  class: "size-3.5"
                }),
                createTextVNode(" Prev ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--[-->`);
        ssrRenderList(Array.from({ length: Math.min(5, unref(totalPages)) }, (_, i) => {
          const start = Math.max(1, Math.min(unref(page) - 2, unref(totalPages) - 4));
          return start + i;
        }), (p) => {
          _push(ssrRenderComponent(_component_Button, {
            variant: p === unref(page) ? "default" : "outline",
            size: "sm",
            class: "h-7 w-7 p-0 text-xs",
            onClick: ($event) => page.value = p
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(p)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(p), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_Button, {
          variant: "outline",
          size: "sm",
          class: "h-7 px-2 text-xs",
          disabled: unref(page) >= unref(totalPages),
          onClick: ($event) => page.value++
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Next `);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-chevron-right",
                class: "size-3.5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Next "),
                createVNode(_component_Icon, {
                  name: "i-lucide-chevron-right",
                  class: "size-3.5"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(showLightbox) && unref(lightboxSrc)) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"><button class="absolute top-4 right-4 size-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors z-10">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-x",
            class: "size-5 text-white"
          }, null, _parent));
          _push2(`</button><img${ssrRenderAttr("src", unref(lightboxSrc))} alt="Preview" class="max-w-[90vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/furniture/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DIGRTWmb.mjs.map
