import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { u as useAuth, _ as _sfc_main$2, a as __nuxt_component_2 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1, b as _sfc_main$3, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$5 } from './index-GIPsDWUk.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import NumberFlow from '@number-flow/vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Home", icon: "i-lucide-layout-dashboard", description: "Overview of your operations" });
    const {
      users,
      ready,
      init,
      furnitureRows,
      furnitureRowsReady,
      furnitureRowsFetching,
      furnitureRowsProgress,
      ensureFurnitureRows,
      level1Map,
      level2Map
    } = useDashboardStore();
    init();
    ensureFurnitureRows();
    const { user: authUser } = useAuth();
    const greeting = computed(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      if (h < 12) return "Good morning";
      if (h < 17) return "Good afternoon";
      return "Good evening";
    });
    const firstName = computed(() => {
      const name = authUser.value?.name || "";
      return name.split(" ")[0] || "there";
    });
    const totalAssets = computed(() => furnitureRows.value.length);
    const totalUsers = computed(() => users.value.length);
    const totalLocations = computed(() => Object.keys(level1Map.value).length);
    const totalFloors = computed(() => Object.keys(level2Map.value).length);
    const kpiCards = computed(() => [
      {
        label: "Total Assets",
        value: totalAssets.value,
        icon: "i-lucide-box",
        gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
        iconBg: "bg-blue-500/15",
        iconColor: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500/10"
      },
      {
        label: "Locations",
        value: totalLocations.value,
        icon: "i-lucide-map-pin",
        gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        iconBg: "bg-emerald-500/15",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-500/10"
      },
      {
        label: "Floors",
        value: totalFloors.value,
        icon: "i-lucide-layers",
        gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
        iconBg: "bg-violet-500/15",
        iconColor: "text-violet-600 dark:text-violet-400",
        border: "border-violet-500/10"
      },
      {
        label: "Users",
        value: totalUsers.value,
        icon: "i-lucide-users",
        gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
        iconBg: "bg-amber-500/15",
        iconColor: "text-amber-600 dark:text-amber-400",
        border: "border-amber-500/10"
      }
    ]);
    const quickLinks = computed(() => [
      { label: "Furniture Report", count: totalAssets.value, icon: "i-lucide-clipboard-list", link: "/reports/furniture", color: "text-blue-500", bg: "bg-blue-500/10", hoverBg: "hover:bg-blue-500/15" },
      { label: "Admin Furniture", count: null, icon: "i-lucide-settings", link: "/admin/furniture", color: "text-violet-500", bg: "bg-violet-500/10", hoverBg: "hover:bg-violet-500/15" },
      { label: "Categories", count: null, icon: "i-lucide-tag", link: "/admin/categories", color: "text-amber-500", bg: "bg-amber-500/10", hoverBg: "hover:bg-amber-500/15" },
      { label: "Users", count: totalUsers.value, icon: "i-lucide-users", link: "/admin/users", color: "text-cyan-500", bg: "bg-cyan-500/10", hoverBg: "hover:bg-cyan-500/15" }
    ]);
    const locationBreakdown = computed(() => {
      const counts = {};
      furnitureRows.value.forEach((r) => {
        const loc = r.A7 || "Unknown";
        counts[loc] = (counts[loc] || 0) + 1;
      });
      return Object.entries(counts).map(([id, count]) => ({
        id,
        name: level1Map.value[id]?.eng || id,
        count,
        pct: totalAssets.value > 0 ? (count / totalAssets.value * 100).toFixed(1) : "0"
      })).sort((a, b) => b.count - a.count).slice(0, 6);
    });
    const maxLocationCount = computed(() => Math.max(...locationBreakdown.value.map((i) => i.count), 1));
    const entered = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Button = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1;
      const _component_CardTitle = _sfc_main$3;
      const _component_CardContent = _sfc_main$4;
      const _component_Badge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 overflow-auto" }, _attrs))}><div class="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-5"><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/8 via-primary/3 to-transparent border border-primary/10 p-5 md:p-6 transition-all duration-700"])}"><div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div><div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/8 to-transparent rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div><div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><h2 class="text-xl md:text-2xl font-bold tracking-tight">${ssrInterpolate(unref(greeting))}, ${ssrInterpolate(unref(firstName))} 👋 </h2><p class="text-sm text-muted-foreground mt-1"> Here&#39;s what&#39;s happening across your assets today. </p></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/reports/furniture" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              variant: "outline",
              size: "sm",
              class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-clipboard-list",
                    class: "size-3.5"
                  }, null, _parent3, _scopeId2));
                  _push3(` Furniture Report `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "i-lucide-clipboard-list",
                      class: "size-3.5"
                    }),
                    createTextVNode(" Furniture Report ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                variant: "outline",
                size: "sm",
                class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "i-lucide-clipboard-list",
                    class: "size-3.5"
                  }),
                  createTextVNode(" Furniture Report ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/admin/furniture" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              size: "sm",
              class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "i-lucide-settings",
                    class: "size-3.5"
                  }, null, _parent3, _scopeId2));
                  _push3(` Manage Assets `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "i-lucide-settings",
                      class: "size-3.5"
                    }),
                    createTextVNode(" Manage Assets ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Button, {
                size: "sm",
                class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "i-lucide-settings",
                    class: "size-3.5"
                  }),
                  createTextVNode(" Manage Assets ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (unref(furnitureRowsFetching) && !unref(furnitureRowsReady)) {
        _push(`<div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3", "rounded-xl border bg-card p-4 transition-all duration-500"])}"><div class="flex items-center gap-3 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-lucide-loader-2",
          class: "size-4 text-primary animate-spin"
        }, null, _parent));
        _push(`<span class="text-sm font-medium">Loading furniture data…</span><span class="text-xs text-muted-foreground tabular-nums ml-auto">${ssrInterpolate(unref(furnitureRowsProgress))}%</span></div><div class="h-2 rounded-full bg-muted overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500" style="${ssrRenderStyle({ width: `${unref(furnitureRowsProgress)}%` })}"></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-3"><!--[-->`);
      ssrRenderList(unref(kpiCards), (kpi, idx) => {
        _push(`<div class="${ssrRenderClass([[kpi.border, unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"], "group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"])}" style="${ssrRenderStyle({ transitionDelay: `${150 + idx * 80}ms` })}"><div class="${ssrRenderClass([kpi.gradient, "absolute inset-0 bg-gradient-to-br opacity-60"])}"></div><div class="relative z-10"><div class="flex items-center justify-between mb-3"><span class="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">${ssrInterpolate(kpi.label)}</span><div class="${ssrRenderClass([kpi.iconBg, "flex items-center justify-center size-8 rounded-lg transition-transform group-hover:scale-110"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: kpi.icon,
          class: ["size-4", kpi.iconColor]
        }, null, _parent));
        _push(`</div></div><div class="text-2xl font-bold tracking-tight tabular-nums">`);
        _push(ssrRenderComponent(unref(NumberFlow), {
          value: kpi.value,
          animated: true
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "grid grid-cols-2 md:grid-cols-4 gap-2.5 transition-all duration-600"])}" style="${ssrRenderStyle({ transitionDelay: "500ms" })}"><!--[-->`);
      ssrRenderList(unref(quickLinks), (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.label,
          to: link.link,
          class: ["flex items-center gap-3 p-3.5 rounded-xl border bg-card hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5", link.hoverBg]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([link.bg, "flex items-center justify-center size-10 rounded-xl shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: link.icon,
                class: ["size-5", link.color]
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="min-w-0"${_scopeId}><p class="text-xs font-semibold truncate"${_scopeId}>${ssrInterpolate(link.label)}</p>`);
              if (link.count !== null) {
                _push2(`<p class="text-[10px] text-muted-foreground tabular-nums mt-0.5"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(NumberFlow), {
                  value: link.count,
                  animated: true,
                  class: "inline"
                }, null, _parent2, _scopeId));
                _push2(` items </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-chevron-right",
                class: "ml-auto size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", {
                  class: ["flex items-center justify-center size-10 rounded-xl shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3", link.bg]
                }, [
                  createVNode(_component_Icon, {
                    name: link.icon,
                    class: ["size-5", link.color]
                  }, null, 8, ["name", "class"])
                ], 2),
                createVNode("div", { class: "min-w-0" }, [
                  createVNode("p", { class: "text-xs font-semibold truncate" }, toDisplayString(link.label), 1),
                  link.count !== null ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-[10px] text-muted-foreground tabular-nums mt-0.5"
                  }, [
                    createVNode(unref(NumberFlow), {
                      value: link.count,
                      animated: true,
                      class: "inline"
                    }, null, 8, ["value"]),
                    createTextVNode(" items ")
                  ])) : createCommentVNode("", true)
                ]),
                createVNode(_component_Icon, {
                  name: "i-lucide-chevron-right",
                  class: "ml-auto size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-4"><div class="lg:col-span-2 space-y-4">`);
      _push(ssrRenderComponent(_component_Card, {
        class: ["transition-all duration-600 hover:shadow-md", unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
        style: { transitionDelay: "600ms" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-center size-6 rounded-md bg-blue-500/10"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "i-lucide-map-pin",
                          class: "size-3.5 text-blue-500"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div> Assets by Location `);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-blue-500/10" }, [
                            createVNode(_component_Icon, {
                              name: "i-lucide-map-pin",
                              class: "size-3.5 text-blue-500"
                            })
                          ]),
                          createTextVNode(" Assets by Location ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-blue-500/10" }, [
                          createVNode(_component_Icon, {
                            name: "i-lucide-map-pin",
                            class: "size-3.5 text-blue-500"
                          })
                        ]),
                        createTextVNode(" Assets by Location ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-2.5 px-4 pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(locationBreakdown), (item) => {
                    _push3(`<div class="group flex items-center gap-3"${_scopeId2}><span class="text-xs font-medium w-28 truncate shrink-0"${ssrRenderAttr("title", item.name)}${_scopeId2}>${ssrInterpolate(item.name)}</span><div class="flex-1 h-2.5 bg-muted rounded-full overflow-hidden"${_scopeId2}><div class="h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out" style="${ssrRenderStyle({ width: unref(entered) ? `${item.count / unref(maxLocationCount) * 100}%` : "0%", opacity: 0.7 })}"${_scopeId2}></div></div><span class="text-xs font-bold tabular-nums w-12 text-right"${_scopeId2}>${ssrInterpolate(item.count)}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                  if (unref(locationBreakdown).length === 0 && unref(furnitureRowsReady)) {
                    _push3(`<div class="py-8 text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "i-lucide-inbox",
                      class: "size-8 text-muted-foreground/20 mx-auto mb-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-xs text-muted-foreground"${_scopeId2}>No asset data available</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(locationBreakdown), (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.id,
                        class: "group flex items-center gap-3"
                      }, [
                        createVNode("span", {
                          class: "text-xs font-medium w-28 truncate shrink-0",
                          title: item.name
                        }, toDisplayString(item.name), 9, ["title"]),
                        createVNode("div", { class: "flex-1 h-2.5 bg-muted rounded-full overflow-hidden" }, [
                          createVNode("div", {
                            class: "h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out",
                            style: { width: unref(entered) ? `${item.count / unref(maxLocationCount) * 100}%` : "0%", opacity: 0.7 }
                          }, null, 4)
                        ]),
                        createVNode("span", { class: "text-xs font-bold tabular-nums w-12 text-right" }, toDisplayString(item.count), 1)
                      ]);
                    }), 128)),
                    unref(locationBreakdown).length === 0 && unref(furnitureRowsReady) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "py-8 text-center"
                    }, [
                      createVNode(_component_Icon, {
                        name: "i-lucide-inbox",
                        class: "size-8 text-muted-foreground/20 mx-auto mb-2"
                      }),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "No asset data available")
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-blue-500/10" }, [
                        createVNode(_component_Icon, {
                          name: "i-lucide-map-pin",
                          class: "size-3.5 text-blue-500"
                        })
                      ]),
                      createTextVNode(" Assets by Location ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, { class: "space-y-2.5 px-4 pb-4" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(locationBreakdown), (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.id,
                      class: "group flex items-center gap-3"
                    }, [
                      createVNode("span", {
                        class: "text-xs font-medium w-28 truncate shrink-0",
                        title: item.name
                      }, toDisplayString(item.name), 9, ["title"]),
                      createVNode("div", { class: "flex-1 h-2.5 bg-muted rounded-full overflow-hidden" }, [
                        createVNode("div", {
                          class: "h-full rounded-full bg-blue-500 transition-all duration-1000 ease-out",
                          style: { width: unref(entered) ? `${item.count / unref(maxLocationCount) * 100}%` : "0%", opacity: 0.7 }
                        }, null, 4)
                      ]),
                      createVNode("span", { class: "text-xs font-bold tabular-nums w-12 text-right" }, toDisplayString(item.count), 1)
                    ]);
                  }), 128)),
                  unref(locationBreakdown).length === 0 && unref(furnitureRowsReady) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-8 text-center"
                  }, [
                    createVNode(_component_Icon, {
                      name: "i-lucide-inbox",
                      class: "size-8 text-muted-foreground/20 mx-auto mb-2"
                    }),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "No asset data available")
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4"><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-4 transition-all duration-600"])}" style="${ssrRenderStyle({ transitionDelay: "650ms" })}"><div class="flex items-center gap-3"><div class="flex items-center justify-center size-10 rounded-xl bg-primary/10">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-lucide-calendar-days",
        class: "size-5 text-primary"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-muted-foreground font-medium">Today</p><p class="text-sm font-bold">${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }))}</p></div></div></div>`);
      _push(ssrRenderComponent(_component_Card, {
        class: ["transition-all duration-600 hover:shadow-md", unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"],
        style: { transitionDelay: "750ms" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, { class: "pb-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-center size-6 rounded-md bg-emerald-500/10"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "i-lucide-activity",
                          class: "size-3.5 text-emerald-500"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div> System Status `);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-emerald-500/10" }, [
                            createVNode(_component_Icon, {
                              name: "i-lucide-activity",
                              class: "size-3.5 text-emerald-500"
                            })
                          ]),
                          createTextVNode(" System Status ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-emerald-500/10" }, [
                          createVNode(_component_Icon, {
                            name: "i-lucide-activity",
                            class: "size-3.5 text-emerald-500"
                          })
                        ]),
                        createTextVNode(" System Status ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardContent, { class: "space-y-3 px-4 pb-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="${ssrRenderClass([unref(ready) ? "bg-emerald-500" : "bg-amber-500 animate-pulse", "size-2 rounded-full"])}"${_scopeId2}></span><span class="text-xs"${_scopeId2}>Dashboard Store</span></div>`);
                  _push3(ssrRenderComponent(_component_Badge, {
                    variant: "outline",
                    class: [unref(ready) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(ready) ? "Ready" : "Loading")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(ready) ? "Ready" : "Loading"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="${ssrRenderClass([unref(furnitureRowsReady) ? "bg-emerald-500" : unref(furnitureRowsFetching) ? "bg-amber-500 animate-pulse" : "bg-zinc-400", "size-2 rounded-full"])}"${_scopeId2}></span><span class="text-xs"${_scopeId2}>Furniture Data</span></div>`);
                  _push3(ssrRenderComponent(_component_Badge, {
                    variant: "outline",
                    class: [unref(furnitureRowsReady) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(furnitureRowsReady) ? "Cached" : unref(furnitureRowsFetching) ? `${unref(furnitureRowsProgress)}%` : "Idle")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(furnitureRowsReady) ? "Cached" : unref(furnitureRowsFetching) ? `${unref(furnitureRowsProgress)}%` : "Idle"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="size-2 rounded-full bg-emerald-500"${_scopeId2}></span><span class="text-xs"${_scopeId2}>Users Loaded</span></div>`);
                  _push3(ssrRenderComponent(_component_Badge, {
                    variant: "outline",
                    class: "text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(users).length)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(users).length), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("span", {
                          class: ["size-2 rounded-full", unref(ready) ? "bg-emerald-500" : "bg-amber-500 animate-pulse"]
                        }, null, 2),
                        createVNode("span", { class: "text-xs" }, "Dashboard Store")
                      ]),
                      createVNode(_component_Badge, {
                        variant: "outline",
                        class: [unref(ready) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(ready) ? "Ready" : "Loading"), 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("span", {
                          class: ["size-2 rounded-full", unref(furnitureRowsReady) ? "bg-emerald-500" : unref(furnitureRowsFetching) ? "bg-amber-500 animate-pulse" : "bg-zinc-400"]
                        }, null, 2),
                        createVNode("span", { class: "text-xs" }, "Furniture Data")
                      ]),
                      createVNode(_component_Badge, {
                        variant: "outline",
                        class: [unref(furnitureRowsReady) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(furnitureRowsReady) ? "Cached" : unref(furnitureRowsFetching) ? `${unref(furnitureRowsProgress)}%` : "Idle"), 1)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("span", { class: "size-2 rounded-full bg-emerald-500" }),
                        createVNode("span", { class: "text-xs" }, "Users Loaded")
                      ]),
                      createVNode(_component_Badge, {
                        variant: "outline",
                        class: "text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(users).length), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CardHeader, { class: "pb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_CardTitle, { class: "text-sm font-semibold flex items-center gap-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-center size-6 rounded-md bg-emerald-500/10" }, [
                        createVNode(_component_Icon, {
                          name: "i-lucide-activity",
                          class: "size-3.5 text-emerald-500"
                        })
                      ]),
                      createTextVNode(" System Status ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, { class: "space-y-3 px-4 pb-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", {
                        class: ["size-2 rounded-full", unref(ready) ? "bg-emerald-500" : "bg-amber-500 animate-pulse"]
                      }, null, 2),
                      createVNode("span", { class: "text-xs" }, "Dashboard Store")
                    ]),
                    createVNode(_component_Badge, {
                      variant: "outline",
                      class: [unref(ready) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(ready) ? "Ready" : "Loading"), 1)
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", {
                        class: ["size-2 rounded-full", unref(furnitureRowsReady) ? "bg-emerald-500" : unref(furnitureRowsFetching) ? "bg-amber-500 animate-pulse" : "bg-zinc-400"]
                      }, null, 2),
                      createVNode("span", { class: "text-xs" }, "Furniture Data")
                    ]),
                    createVNode(_component_Badge, {
                      variant: "outline",
                      class: [unref(furnitureRowsReady) ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20", "text-[10px]"]
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(furnitureRowsReady) ? "Cached" : unref(furnitureRowsFetching) ? `${unref(furnitureRowsProgress)}%` : "Idle"), 1)
                      ]),
                      _: 1
                    }, 8, ["class"])
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("span", { class: "size-2 rounded-full bg-emerald-500" }),
                      createVNode("span", { class: "text-xs" }, "Users Loaded")
                    ]),
                    createVNode(_component_Badge, {
                      variant: "outline",
                      class: "text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(users).length), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0QOMKww7.mjs.map
