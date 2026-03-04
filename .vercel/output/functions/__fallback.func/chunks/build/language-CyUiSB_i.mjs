import { _ as _sfc_main$2, a as __nuxt_component_2 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, createVNode, isRef, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
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

const pageSize = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "language",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Language", icon: "i-lucide-languages", description: "etgLanguage reference table" });
    const store = useDashboardStore();
    store.init();
    const loading = computed(() => !store.ready.value);
    const search = ref("");
    const rows = computed(() => [...store.language.value]);
    const editingRow = ref(null);
    const editDialog = ref(false);
    async function fetchLanguage() {
      await store.refresh();
    }
    const filteredRows = computed(() => {
      if (!search.value.trim()) return rows.value;
      const q = search.value.toLowerCase();
      return rows.value.filter(
        (r) => (r.ID || "").toLowerCase().includes(q) || (r.eng || "").toLowerCase().includes(q) || (r.arabic || "").toLowerCase().includes(q)
      );
    });
    const sortBy = ref("ID");
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
    const sortedRows = computed(() => {
      const col = sortBy.value;
      return [...filteredRows.value].sort((a, b) => {
        const cmp = String(a[col] ?? "").localeCompare(String(b[col] ?? ""));
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    function openEdit(row) {
      editingRow.value = { ...row };
      editDialog.value = true;
    }
    const page = ref(1);
    const totalPages = computed(() => Math.ceil(sortedRows.value.length / pageSize));
    const pagedRows = computed(() => {
      const start = (page.value - 1) * pageSize;
      return sortedRows.value.slice(start, start + pageSize);
    });
    watch(search, () => {
      page.value = 1;
    });
    const isMounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$1;
      const _component_Table = _sfc_main$8;
      const _component_TableHeader = _sfc_main$3;
      const _component_TableRow = _sfc_main$4;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$7;
      const _component_TableCell = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))}>`);
      if (unref(isMounted)) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="flex items-center gap-2 w-full justify-end">`);
          if (!unref(loading)) {
            _push2(`<p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap">${ssrInterpolate(unref(rows).length.toLocaleString())} entries </p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_Button, {
            variant: "ghost",
            size: "sm",
            class: "h-8 gap-1.5",
            onClick: fetchLanguage
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-refresh-cw",
                  class: ["size-3.5", unref(loading) ? "animate-spin" : ""]
                }, null, _parent2, _scopeId));
                _push3(`<span class="text-xs hidden sm:inline"${_scopeId}>Refresh</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-lucide-refresh-cw",
                    class: ["size-3.5", unref(loading) ? "animate-spin" : ""]
                  }, null, 8, ["class"]),
                  createVNode("span", { class: "text-xs hidden sm:inline" }, "Refresh")
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
      _push(`<div class="shrink-0 border-b px-4 py-2 flex items-center gap-3"><div class="relative max-w-[260px]">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-lucide-search",
        class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none"
      }, null, _parent));
      _push(ssrRenderComponent(_component_Input, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        placeholder: "Search ID, English, Arabic...",
        class: "pl-8 h-8 text-sm"
      }, null, _parent));
      if (unref(search)) {
        _push(`<button class="absolute right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-x",
          class: "size-2.5 text-muted-foreground"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-xs text-muted-foreground tabular-nums">${ssrInterpolate(unref(filteredRows).length.toLocaleString())} of ${ssrInterpolate(unref(rows).length.toLocaleString())}</p></div>`);
      if (unref(loading)) {
        _push(`<div class="flex-1 flex items-center justify-center"><div class="flex flex-col items-center gap-4 text-muted-foreground"><div class="size-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-6 animate-spin text-blue-500"
        }, null, _parent));
        _push(`</div><p class="text-sm font-medium">Loading language entries...</p></div></div>`);
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
                          _push4(ssrRenderComponent(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors w-[200px]",
                            onClick: ($event) => toggleSort("ID")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-1"${_scopeId4}> ID `);
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: sortIcon("ID"),
                                  class: "size-3 opacity-60"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createTextVNode(" ID "),
                                    createVNode(_component_Icon, {
                                      name: sortIcon("ID"),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort("eng")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-1"${_scopeId4}><span class="text-base leading-none mr-0.5"${_scopeId4}>🇬🇧</span> English `);
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: sortIcon("eng"),
                                  class: "size-3 opacity-60"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇬🇧"),
                                    createTextVNode(" English "),
                                    createVNode(_component_Icon, {
                                      name: sortIcon("eng"),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort("arabic")
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-1"${_scopeId4}><span class="text-base leading-none mr-0.5"${_scopeId4}>🇸🇦</span> Arabic `);
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: sortIcon("arabic"),
                                  class: "size-3 opacity-60"
                                }, null, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇸🇦"),
                                    createTextVNode(" Arabic "),
                                    createVNode(_component_Icon, {
                                      name: sortIcon("arabic"),
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
                              class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors w-[200px]",
                              onClick: ($event) => toggleSort("ID")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createTextVNode(" ID "),
                                  createVNode(_component_Icon, {
                                    name: sortIcon("ID"),
                                    class: "size-3 opacity-60"
                                  }, null, 8, ["name"])
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_TableHead, {
                              class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                              onClick: ($event) => toggleSort("eng")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇬🇧"),
                                  createTextVNode(" English "),
                                  createVNode(_component_Icon, {
                                    name: sortIcon("eng"),
                                    class: "size-3 opacity-60"
                                  }, null, 8, ["name"])
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_TableHead, {
                              class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                              onClick: ($event) => toggleSort("arabic")
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-1" }, [
                                  createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇸🇦"),
                                  createTextVNode(" Arabic "),
                                  createVNode(_component_Icon, {
                                    name: sortIcon("arabic"),
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
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors w-[200px]",
                            onClick: ($event) => toggleSort("ID")
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createTextVNode(" ID "),
                                createVNode(_component_Icon, {
                                  name: sortIcon("ID"),
                                  class: "size-3 opacity-60"
                                }, null, 8, ["name"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort("eng")
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇬🇧"),
                                createTextVNode(" English "),
                                createVNode(_component_Icon, {
                                  name: sortIcon("eng"),
                                  class: "size-3 opacity-60"
                                }, null, 8, ["name"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_TableHead, {
                            class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                            onClick: ($event) => toggleSort("arabic")
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-1" }, [
                                createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇸🇦"),
                                createTextVNode(" Arabic "),
                                createVNode(_component_Icon, {
                                  name: sortIcon("arabic"),
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
                    ssrRenderList(unref(pagedRows), (row, idx) => {
                      _push3(ssrRenderComponent(_component_TableRow, {
                        key: row.ID || idx,
                        class: "group hover:bg-muted/30 transition-colors cursor-pointer",
                        onClick: ($event) => openEdit(row)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(row.ID || "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(row.ID || "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, { class: "text-sm" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(row.eng || "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(row.eng || "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TableCell, {
                              class: "text-sm",
                              dir: "rtl"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(row.arabic || "—")}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(row.arabic || "—"), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.ID || "—"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, { class: "text-sm" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.eng || "—"), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_TableCell, {
                                class: "text-sm",
                                dir: "rtl"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(row.arabic || "—"), 1)
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
                    if (unref(pagedRows).length === 0 && !unref(loading)) {
                      _push3(ssrRenderComponent(_component_TableRow, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_TableCell, {
                              colspan: "3",
                              class: "h-40 text-center"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="flex flex-col items-center gap-3 text-muted-foreground"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "i-lucide-search-x",
                                    class: "size-8 text-muted-foreground/40"
                                  }, null, _parent5, _scopeId4));
                                  _push5(`<p class="font-medium"${_scopeId4}>No matching entries</p><p class="text-xs"${_scopeId4}>Try adjusting your search terms.</p></div>`);
                                } else {
                                  return [
                                    createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-search-x",
                                        class: "size-8 text-muted-foreground/40"
                                      }),
                                      createVNode("p", { class: "font-medium" }, "No matching entries"),
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
                                colspan: "3",
                                class: "h-40 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-search-x",
                                      class: "size-8 text-muted-foreground/40"
                                    }),
                                    createVNode("p", { class: "font-medium" }, "No matching entries"),
                                    createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(pagedRows), (row, idx) => {
                        return openBlock(), createBlock(_component_TableRow, {
                          key: row.ID || idx,
                          class: "group hover:bg-muted/30 transition-colors cursor-pointer",
                          onClick: ($event) => openEdit(row)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.ID || "—"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, { class: "text-sm" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.eng || "—"), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_TableCell, {
                              class: "text-sm",
                              dir: "rtl"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(row.arabic || "—"), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]);
                      }), 128)),
                      unref(pagedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, {
                            colspan: "3",
                            class: "h-40 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                                createVNode(_component_Icon, {
                                  name: "i-lucide-search-x",
                                  class: "size-8 text-muted-foreground/40"
                                }),
                                createVNode("p", { class: "font-medium" }, "No matching entries"),
                                createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
                        createVNode(_component_TableHead, {
                          class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors w-[200px]",
                          onClick: ($event) => toggleSort("ID")
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createTextVNode(" ID "),
                              createVNode(_component_Icon, {
                                name: sortIcon("ID"),
                                class: "size-3 opacity-60"
                              }, null, 8, ["name"])
                            ])
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_TableHead, {
                          class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                          onClick: ($event) => toggleSort("eng")
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇬🇧"),
                              createTextVNode(" English "),
                              createVNode(_component_Icon, {
                                name: sortIcon("eng"),
                                class: "size-3 opacity-60"
                              }, null, 8, ["name"])
                            ])
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_TableHead, {
                          class: "bg-card cursor-pointer select-none hover:bg-muted/50 transition-colors",
                          onClick: ($event) => toggleSort("arabic")
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode("span", { class: "text-base leading-none mr-0.5" }, "🇸🇦"),
                              createTextVNode(" Arabic "),
                              createVNode(_component_Icon, {
                                name: sortIcon("arabic"),
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(pagedRows), (row, idx) => {
                      return openBlock(), createBlock(_component_TableRow, {
                        key: row.ID || idx,
                        class: "group hover:bg-muted/30 transition-colors cursor-pointer",
                        onClick: ($event) => openEdit(row)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_TableCell, { class: "font-mono text-xs font-medium text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.ID || "—"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, { class: "text-sm" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.eng || "—"), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_TableCell, {
                            class: "text-sm",
                            dir: "rtl"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.arabic || "—"), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128)),
                    unref(pagedRows).length === 0 && !unref(loading) ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_TableCell, {
                          colspan: "3",
                          class: "h-40 text-center"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex flex-col items-center gap-3 text-muted-foreground" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-search-x",
                                class: "size-8 text-muted-foreground/40"
                              }),
                              createVNode("p", { class: "font-medium" }, "No matching entries"),
                              createVNode("p", { class: "text-xs" }, "Try adjusting your search terms.")
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
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="shrink-0 border-t px-4 py-2 flex items-center justify-between gap-4 bg-card/50"><p class="text-xs text-muted-foreground tabular-nums"> Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(totalPages))} · ${ssrInterpolate(unref(filteredRows).length.toLocaleString())} entries </p><div class="flex items-center gap-1">`);
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
        if (unref(editDialog) && unref(editingRow)) {
          _push2(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"><div class="w-full max-w-md mx-4 rounded-2xl border bg-card shadow-2xl overflow-hidden"><div class="px-6 py-5 border-b bg-gradient-to-r from-blue-500/5 to-violet-500/5"><div class="flex items-center gap-3"><div class="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center">`);
          _push2(ssrRenderComponent(_component_Icon, {
            name: "i-lucide-languages",
            class: "size-5 text-blue-500"
          }, null, _parent));
          _push2(`</div><div><h3 class="font-semibold text-foreground">Language Entry</h3><p class="text-xs text-muted-foreground font-mono">${ssrInterpolate(unref(editingRow).ID)}</p></div></div></div><div class="px-6 py-5 space-y-4"><div><label class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5"><span class="text-sm">🇬🇧</span> English </label>`);
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(editingRow).eng,
            "onUpdate:modelValue": ($event) => unref(editingRow).eng = $event,
            class: "h-9"
          }, null, _parent));
          _push2(`</div><div><label class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5"><span class="text-sm">🇸🇦</span> Arabic </label>`);
          _push2(ssrRenderComponent(_component_Input, {
            modelValue: unref(editingRow).arabic,
            "onUpdate:modelValue": ($event) => unref(editingRow).arabic = $event,
            dir: "rtl",
            class: "h-9"
          }, null, _parent));
          _push2(`</div></div><div class="px-6 py-4 border-t flex justify-end gap-2">`);
          _push2(ssrRenderComponent(_component_Button, {
            variant: "outline",
            size: "sm",
            onClick: ($event) => editDialog.value = false
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
          _push2(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/language.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=language-CyUiSB_i.mjs.map
