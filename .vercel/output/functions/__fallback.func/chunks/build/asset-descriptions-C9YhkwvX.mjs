import { a as __nuxt_component_2, _ as _sfc_main$2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { _ as _sfc_main$6 } from './index-GIPsDWUk.mjs';
import { defineComponent, ref, watch, computed, mergeProps, unref, isRef, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
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
  __name: "asset-descriptions",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Asset Descriptions", icon: "i-lucide-list", description: "Asset description catalog" });
    const isMounted = ref(false);
    const search = ref("");
    const syncing = ref(false);
    const loading = ref(true);
    const descriptions = ref([]);
    async function fetchData() {
      loading.value = true;
      try {
        const data = await $fetch("/api/bigquery/asset-descriptions");
        if (data.success) {
          descriptions.value = data.descriptions;
        }
      } catch (e) {
        toast.error("Failed to load asset descriptions");
      } finally {
        loading.value = false;
      }
    }
    fetchData();
    async function syncData() {
      syncing.value = true;
      try {
        const data = await $fetch("/api/bigquery/sync-levels", { method: "POST" });
        toast.success(data.message || "Synced successfully");
        await fetchData();
      } catch (e) {
        toast.error(e.data?.statusMessage || "Sync failed");
      } finally {
        syncing.value = false;
      }
    }
    const columns = [
      { key: "image_url", label: "Image", width: "60px" },
      { key: "eng", label: "Name (English)", width: "240px" },
      { key: "arabic", label: "Name (Arabic)", width: "200px" },
      { key: "A66_label", label: "Sub Categories", width: "200px" },
      { key: "A67", label: "ID", width: "100px" }
    ];
    const sortBy = ref("eng");
    const sortDir = ref("asc");
    function toggleSort(col) {
      if (col === "image_url") return;
      if (sortBy.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      else {
        sortBy.value = col;
        sortDir.value = "asc";
      }
    }
    function sortIcon(col) {
      if (col === "image_url") return "";
      if (sortBy.value !== col) return "i-lucide-chevrons-up-down";
      return sortDir.value === "asc" ? "i-lucide-chevron-up" : "i-lucide-chevron-down";
    }
    const visibleCount = ref(CHUNK_SIZE);
    watch(search, () => {
      visibleCount.value = CHUNK_SIZE;
    });
    const filteredRows = computed(() => {
      let rows = descriptions.value;
      if (search.value) {
        const q = search.value.toLowerCase();
        rows = rows.filter(
          (r) => r.eng && r.eng.toLowerCase().includes(q) || r.arabic && r.arabic.toLowerCase().includes(q) || r.A67 && r.A67.toLowerCase().includes(q) || r.A66_label && r.A66_label.toLowerCase().includes(q)
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
    function imageUrl(row) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))} data-v-f87b1f81>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end" data-v-f87b1f81><div class="relative max-w-[220px]" data-v-f87b1f81>`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-search",
            class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
          }, null, _parent));
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(search),
            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
            placeholder: "Search...",
            class: "pl-8 h-8 text-sm"
          }, null, _parent));
          _push2(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-f87b1f81>${ssrInterpolate(unref(filteredRows).length)} record${ssrInterpolate(unref(filteredRows).length !== 1 ? "s" : "")}</p>`);
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
                  _push3(`<span class="ml-1 text-xs" data-v-f87b1f81${_scopeId}>Syncing...</span>`);
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
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center" data-v-f87b1f81><div class="flex flex-col items-center gap-3 text-muted-foreground" data-v-f87b1f81>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-8 animate-spin"
        }, null, _parent));
        _push(`<p class="text-sm" data-v-f87b1f81>Loading asset descriptions...</p></div></div>`);
      } else {
        _push(`<div class="flex-1 min-h-0 overflow-auto" data-v-f87b1f81>`);
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
                              class: ["bg-card whitespace-nowrap", col.key !== "image_url" ? "cursor-pointer select-none" : ""],
                              style: { minWidth: col.width },
                              onClick: ($event) => toggleSort(col.key)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex items-center gap-1" data-v-f87b1f81${_scopeId4}>${ssrInterpolate(col.label)} `);
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
                                class: ["bg-card whitespace-nowrap", col.key !== "image_url" ? "cursor-pointer select-none" : ""],
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
                              class: ["bg-card whitespace-nowrap", col.key !== "image_url" ? "cursor-pointer select-none" : ""],
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
                    ssrRenderList(unref(visibleRows), (row, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: row.A67 || idx,
                        class: "group"
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
                                    if (col.key === "image_url") {
                                      _push5(`<div class="size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center" data-v-f87b1f81${_scopeId4}>`);
                                      if (imageUrl(row)) {
                                        _push5(`<img${ssrRenderAttr("src", imageUrl(row))}${ssrRenderAttr("alt", row.eng)} class="size-8 object-cover" loading="lazy" data-v-f87b1f81${_scopeId4}>`);
                                      } else {
                                        _push5(ssrRenderComponent(_component_Icon, {
                                          name: "i-lucide-image-off",
                                          class: "size-3.5 text-muted-foreground/40"
                                        }, null, _parent5, _scopeId4));
                                      }
                                      _push5(`</div>`);
                                    } else if (col.key === "eng") {
                                      _push5(`<span class="font-medium" data-v-f87b1f81${_scopeId4}>${ssrInterpolate(row.eng || "—")}</span>`);
                                    } else if (col.key === "arabic") {
                                      _push5(`<span dir="rtl" class="text-sm text-muted-foreground" data-v-f87b1f81${_scopeId4}>${ssrInterpolate(row.arabic || "—")}</span>`);
                                    } else if (col.key === "A66_label") {
                                      _push5(`<!--[-->`);
                                      if (row.A66_label) {
                                        _push5(`<div class="flex flex-wrap gap-1" data-v-f87b1f81${_scopeId4}><!--[-->`);
                                        ssrRenderList(row.A66_label.split(",").slice(0, 3), (cat, ci) => {
                                          _push5(ssrRenderComponent(_component_Badge, {
                                            key: ci,
                                            variant: "outline",
                                            class: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                                          }, {
                                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                _push6(`${ssrInterpolate(cat.trim())}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(cat.trim()), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent5, _scopeId4));
                                        });
                                        _push5(`<!--]-->`);
                                        if (row.A66_label.split(",").length > 3) {
                                          _push5(`<span class="text-[10px] text-muted-foreground" data-v-f87b1f81${_scopeId4}> +${ssrInterpolate(row.A66_label.split(",").length - 3)}</span>`);
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                        _push5(`</div>`);
                                      } else {
                                        _push5(`<span class="text-muted-foreground/40" data-v-f87b1f81${_scopeId4}>—</span>`);
                                      }
                                      _push5(`<!--]-->`);
                                    } else {
                                      _push5(`<span class="text-sm text-muted-foreground" data-v-f87b1f81${_scopeId4}>${ssrInterpolate(row[col.key] || "—")}</span>`);
                                    }
                                  } else {
                                    return [
                                      col.key === "image_url" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center"
                                      }, [
                                        imageUrl(row) ? (openBlock(), createBlock("img", {
                                          key: 0,
                                          src: imageUrl(row),
                                          alt: row.eng,
                                          class: "size-8 object-cover",
                                          loading: "lazy"
                                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-image-off",
                                          class: "size-3.5 text-muted-foreground/40"
                                        }))
                                      ])) : col.key === "eng" ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "font-medium"
                                      }, toDisplayString(row.eng || "—"), 1)) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                        key: 2,
                                        dir: "rtl",
                                        class: "text-sm text-muted-foreground"
                                      }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A66_label" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                        row.A66_label ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "flex flex-wrap gap-1"
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(row.A66_label.split(",").slice(0, 3), (cat, ci) => {
                                            return openBlock(), createBlock(_component_Badge, {
                                              key: ci,
                                              variant: "outline",
                                              class: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(cat.trim()), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128)),
                                          row.A66_label.split(",").length > 3 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-[10px] text-muted-foreground"
                                          }, " +" + toDisplayString(row.A66_label.split(",").length - 3), 1)) : createCommentVNode("", true)
                                        ])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground/40"
                                        }, "—"))
                                      ], 64)) : (openBlock(), createBlock("span", {
                                        key: 4,
                                        class: "text-sm text-muted-foreground"
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
                                    col.key === "image_url" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center"
                                    }, [
                                      imageUrl(row) ? (openBlock(), createBlock("img", {
                                        key: 0,
                                        src: imageUrl(row),
                                        alt: row.eng,
                                        class: "size-8 object-cover",
                                        loading: "lazy"
                                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_Icon, {
                                        key: 1,
                                        name: "i-lucide-image-off",
                                        class: "size-3.5 text-muted-foreground/40"
                                      }))
                                    ])) : col.key === "eng" ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "font-medium"
                                    }, toDisplayString(row.eng || "—"), 1)) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      dir: "rtl",
                                      class: "text-sm text-muted-foreground"
                                    }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A66_label" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                      row.A66_label ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex flex-wrap gap-1"
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(row.A66_label.split(",").slice(0, 3), (cat, ci) => {
                                          return openBlock(), createBlock(_component_Badge, {
                                            key: ci,
                                            variant: "outline",
                                            class: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cat.trim()), 1)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128)),
                                        row.A66_label.split(",").length > 3 ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "text-[10px] text-muted-foreground"
                                        }, " +" + toDisplayString(row.A66_label.split(",").length - 3), 1)) : createCommentVNode("", true)
                                      ])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground/40"
                                      }, "—"))
                                    ], 64)) : (openBlock(), createBlock("span", {
                                      key: 4,
                                      class: "text-sm text-muted-foreground"
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
                    if (unref(visibleRows).length === 0 && !unref(loading)) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: columns.length,
                              class: "h-32 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-f87b1f81${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p data-v-f87b1f81${_scopeId4}>No asset descriptions found</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-inbox",
                                        class: "size-8"
                                      }),
                                      createVNode("p", null, "No asset descriptions found")
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
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-inbox",
                                      class: "size-8"
                                    }),
                                    createVNode("p", null, "No asset descriptions found")
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
                      _push3(`<tr data-v-f87b1f81${_scopeId2}><td${ssrRenderAttr("colspan", columns.length)} class="h-10 text-center text-xs text-muted-foreground" data-v-f87b1f81${_scopeId2}> Loading more… </td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (row, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: row.A67 || idx,
                          class: "group"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                              return createVNode(_component_TableCell, {
                                key: col.key
                              }, {
                                default: withCtx(() => [
                                  col.key === "image_url" ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center"
                                  }, [
                                    imageUrl(row) ? (openBlock(), createBlock("img", {
                                      key: 0,
                                      src: imageUrl(row),
                                      alt: row.eng,
                                      class: "size-8 object-cover",
                                      loading: "lazy"
                                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_Icon, {
                                      key: 1,
                                      name: "i-lucide-image-off",
                                      class: "size-3.5 text-muted-foreground/40"
                                    }))
                                  ])) : col.key === "eng" ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "font-medium"
                                  }, toDisplayString(row.eng || "—"), 1)) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    dir: "rtl",
                                    class: "text-sm text-muted-foreground"
                                  }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A66_label" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                    row.A66_label ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex flex-wrap gap-1"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(row.A66_label.split(",").slice(0, 3), (cat, ci) => {
                                        return openBlock(), createBlock(_component_Badge, {
                                          key: ci,
                                          variant: "outline",
                                          class: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat.trim()), 1)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128)),
                                      row.A66_label.split(",").length > 3 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-[10px] text-muted-foreground"
                                      }, " +" + toDisplayString(row.A66_label.split(",").length - 3), 1)) : createCommentVNode("", true)
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "text-muted-foreground/40"
                                    }, "—"))
                                  ], 64)) : (openBlock(), createBlock("span", {
                                    key: 4,
                                    class: "text-sm text-muted-foreground"
                                  }, toDisplayString(row[col.key] || "—"), 1))
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128)),
                      unref(visibleRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: columns.length,
                            class: "h-32 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-inbox",
                                  class: "size-8"
                                }),
                                createVNode("p", null, "No asset descriptions found")
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
                          colspan: columns.length,
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
                        (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                          return createVNode(_component_TableHead, {
                            key: col.key,
                            class: ["bg-card whitespace-nowrap", col.key !== "image_url" ? "cursor-pointer select-none" : ""],
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleRows), (row, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: row.A67 || idx,
                        class: "group"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(columns, (col) => {
                            return createVNode(_component_TableCell, {
                              key: col.key
                            }, {
                              default: withCtx(() => [
                                col.key === "image_url" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "size-8 rounded-md overflow-hidden bg-muted flex items-center justify-center"
                                }, [
                                  imageUrl(row) ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: imageUrl(row),
                                    alt: row.eng,
                                    class: "size-8 object-cover",
                                    loading: "lazy"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_Icon, {
                                    key: 1,
                                    name: "i-lucide-image-off",
                                    class: "size-3.5 text-muted-foreground/40"
                                  }))
                                ])) : col.key === "eng" ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "font-medium"
                                }, toDisplayString(row.eng || "—"), 1)) : col.key === "arabic" ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  dir: "rtl",
                                  class: "text-sm text-muted-foreground"
                                }, toDisplayString(row.arabic || "—"), 1)) : col.key === "A66_label" ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                  row.A66_label ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex flex-wrap gap-1"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(row.A66_label.split(",").slice(0, 3), (cat, ci) => {
                                      return openBlock(), createBlock(_component_Badge, {
                                        key: ci,
                                        variant: "outline",
                                        class: "bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cat.trim()), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128)),
                                    row.A66_label.split(",").length > 3 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-[10px] text-muted-foreground"
                                    }, " +" + toDisplayString(row.A66_label.split(",").length - 3), 1)) : createCommentVNode("", true)
                                  ])) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted-foreground/40"
                                  }, "—"))
                                ], 64)) : (openBlock(), createBlock("span", {
                                  key: 4,
                                  class: "text-sm text-muted-foreground"
                                }, toDisplayString(row[col.key] || "—"), 1))
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(visibleRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: columns.length,
                          class: "h-32 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-inbox",
                                class: "size-8"
                              }),
                              createVNode("p", null, "No asset descriptions found")
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
                        colspan: columns.length,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/asset-descriptions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const assetDescriptions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f87b1f81"]]);

export { assetDescriptions as default };
//# sourceMappingURL=asset-descriptions-C9YhkwvX.mjs.map
