import { cva } from 'class-variance-authority';
import { defineComponent, useSSRContext, mergeProps, unref, withCtx, createTextVNode, createVNode, renderSlot, computed, resolveDynamicComponent, createBlock, openBlock, Fragment, toDisplayString, ref, watch, isRef, createCommentVNode, renderList } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$8$1, b as _sfc_main$5$1, c as _sfc_main$2$1, d as _sfc_main$1$1, e as _sfc_main$4$1 } from './SheetTrigger-B3w9gqSV.mjs';
import { y as useAppSettings, e as cn, m as reactiveOmit, z as useMediaQuery, o as useVModel, A as useEventListener, _ as _sfc_main$2$3, B as useLocale, c as useRoute, a as __nuxt_component_2, s as useShortcuts, b as useRouter, t as defineShortcuts, p as useColorMode, u as useAuth } from './server.mjs';
import { createContext, Primitive, TooltipProvider } from 'reka-ui';
import { _ as _sfc_main$y } from './Input-DUkj5gv1.mjs';
import { a as _sfc_main$3$1, b as _sfc_main$z, c as _sfc_main$2$2 } from './TooltipTrigger-BCWhKMhM.mjs';
import { _ as _sfc_main$A } from './Skeleton-0gGjFW0U.mjs';
import { _ as _sfc_main$B } from './Separator-D0XHHfBk.mjs';
import { PanelLeft } from 'lucide-vue-next';
import { _ as _sfc_main$2$4, a as _sfc_main$C, b as _sfc_main$1$2 } from './CollapsibleTrigger-CDNfZ-Zw.mjs';
import { _ as __nuxt_component_3$2 } from './nuxt-link-DWlala-j.mjs';
import { _ as _imports_0 } from './virtual_public-DJ9oAi63.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { a as _sfc_main$1$3 } from './KbdGroup-DAgL2v80.mjs';
import { h as _sfc_main$7$1, a as _sfc_main$4$2, b as _sfc_main$2$5, c as _sfc_main$6$1, d as _sfc_main$5$2, e as _sfc_main$3$2, f as _sfc_main$1$4 } from './index-Kgt191xM.mjs';
import { _ as _sfc_main$d$1, a as _sfc_main$E, b as _sfc_main$b$1, d as _sfc_main$8$2, e as _sfc_main$5$3, c as _sfc_main$9$1 } from './DropdownMenuTrigger-Bjd-JwWI.mjs';
import { _ as _sfc_main$2$6, b as _sfc_main$F, a as _sfc_main$1$5 } from './AvatarImage-B6YLb4UI.mjs';
import { _ as _sfc_main$9$2, b as _sfc_main$6$2, c as _sfc_main$3$3, d as _sfc_main$1$6, e as _sfc_main$5$4 } from './DialogTrigger-CSypdrx5.mjs';
import { _ as _sfc_main$D } from './Label-jo0RdEYb.mjs';
import { u as useDashboardStore } from './useDashboardStore-DQi0OiAF.mjs';
import { u as useAppLanguage } from './useAppLanguage-D9JerBy5.mjs';
import { u as useSyncProgress } from './useSyncProgress-DTUElile.mjs';
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
import 'vue-sonner';
import 'clsx';
import 'tailwind-merge';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "13rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    side: { default: "left" },
    variant: { default: "sidebar" },
    collapsible: { default: "offcanvas" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    const { direction } = useAppSettings();
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.collapsible === "none") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          "data-slot": "sidebar",
          class: unref(cn)("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", props.class)
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (unref(isMobile)) {
        _push(ssrRenderComponent(unref(_sfc_main$8$1), mergeProps({ open: unref(openMobile) }, _ctx.$attrs, { "onUpdate:open": unref(setOpenMobile) }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$5$1), {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar",
                "data-mobile": "true",
                side: __props.side,
                class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$2$1, { class: "sr-only" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$1$1, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Sidebar`);
                              } else {
                                return [
                                  createTextVNode("Sidebar")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_sfc_main$4$1, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Displays the mobile sidebar.`);
                              } else {
                                return [
                                  createTextVNode("Displays the mobile sidebar.")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$1$1, null, {
                              default: withCtx(() => [
                                createTextVNode("Sidebar")
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$4$1, null, {
                              default: withCtx(() => [
                                createTextVNode("Displays the mobile sidebar.")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex h-full w-full flex-col"${ssrRenderAttr("dir", unref(direction))}${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode(_sfc_main$2$1, { class: "sr-only" }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$1$1, null, {
                            default: withCtx(() => [
                              createTextVNode("Sidebar")
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4$1, null, {
                            default: withCtx(() => [
                              createTextVNode("Displays the mobile sidebar.")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", {
                        class: "flex h-full w-full flex-col",
                        dir: unref(direction)
                      }, [
                        renderSlot(_ctx.$slots, "default")
                      ], 8, ["dir"])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$5$1), {
                  "data-sidebar": "sidebar",
                  "data-slot": "sidebar",
                  "data-mobile": "true",
                  side: __props.side,
                  class: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
                  style: {
                    "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                  }
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$2$1, { class: "sr-only" }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$1$1, null, {
                          default: withCtx(() => [
                            createTextVNode("Sidebar")
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4$1, null, {
                          default: withCtx(() => [
                            createTextVNode("Displays the mobile sidebar.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", {
                      class: "flex h-full w-full flex-col",
                      dir: unref(direction)
                    }, [
                      renderSlot(_ctx.$slots, "default")
                    ], 8, ["dir"])
                  ]),
                  _: 3
                }, 8, ["side", "style"])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "group peer text-sidebar-foreground hidden md:block",
          "data-slot": "sidebar",
          "data-state": unref(state),
          "data-collapsible": unref(state) === "collapsed" ? __props.collapsible : "",
          "data-variant": __props.variant,
          "data-side": __props.side
        }, _attrs))}><div class="${ssrRenderClass(unref(cn)(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          __props.variant === "floating" || __props.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        ))}"></div><div${ssrRenderAttrs(mergeProps({
          class: unref(cn)(
            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
            __props.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            __props.variant === "floating" || __props.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            props.class
          )
        }, _ctx.$attrs, { dir: unref(direction) }))}><div data-sidebar="sidebar" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/Sidebar.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "SidebarContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-content",
        "data-sidebar": "content",
        class: unref(cn)("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarContent.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "SidebarFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-footer",
        "data-sidebar": "footer",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarFooter.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-group",
        "data-sidebar": "group",
        class: unref(cn)("relative flex w-full min-w-0 flex-col p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarGroup.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-group-action",
        "data-sidebar": "group-action",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 md:after:hidden",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarGroupAction.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-group-content",
        "data-sidebar": "group-content",
        class: unref(cn)("w-full text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarGroupContent.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-group-label",
        "data-sidebar": "group-label",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(
          "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarGroupLabel.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "SidebarHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-header",
        "data-sidebar": "header",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarHeader.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "SidebarInput",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$y), mergeProps({
        "data-slot": "sidebar-input",
        "data-sidebar": "input",
        class: unref(cn)(
          "bg-background h-8 w-full shadow-none",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarInput.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "SidebarInset",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { direction } = useAppSettings();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-inset",
        dir: unref(direction),
        class: unref(cn)(
          "bg-background relative flex w-full flex-1 flex-col min-h-0 overflow-hidden",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:peer-data-[side=left]:ml-0 md:peer-data-[variant=inset]:peer-data-[side=right]:mr-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",
          "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[side=left]:ml-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[side=right]:mr-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarInset.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenu",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu",
        "data-sidebar": "menu",
        class: unref(cn)("flex w-full min-w-0 flex-col gap-1", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenu.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "button" },
    showOnHover: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-action",
        "data-sidebar": "menu-action",
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 md:after:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          __props.showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
          props.class
        ),
        as: __props.as,
        "as-child": __props.asChild
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuAction.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuBadge",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-badge",
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
          "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuBadge.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuButtonChild",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-button",
        "data-sidebar": "menu-button",
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(unref(sidebarMenuButtonVariants)({ variant: __props.variant, size: __props.size }), props.class),
        as: __props.as,
        "as-child": __props.asChild
      }, _ctx.$attrs, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuButtonChild.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SidebarMenuButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    tooltip: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state } = useSidebar();
    const { direction } = useAppSettings();
    const tooltipSide = computed(() => direction.value === "rtl" ? "left" : "right");
    const delegatedProps = reactiveOmit(props, "tooltip");
    return (_ctx, _push, _parent, _attrs) => {
      if (!__props.tooltip) {
        _push(ssrRenderComponent(_sfc_main$k, mergeProps({ ...unref(delegatedProps), ..._ctx.$attrs }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(_sfc_main$3$1), _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$z), { "as-child": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$k, { ...unref(delegatedProps), ..._ctx.$attrs }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$k, { ...unref(delegatedProps), ..._ctx.$attrs }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 16)
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$2$2), {
                side: unref(tooltipSide),
                align: "center",
                hidden: unref(state) !== "collapsed" || unref(isMobile)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (typeof __props.tooltip === "string") {
                      _push3(`<!--[-->${ssrInterpolate(__props.tooltip)}<!--]-->`);
                    } else {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(__props.tooltip), null, null), _parent3, _scopeId2);
                    }
                  } else {
                    return [
                      typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(__props.tooltip), 1)
                      ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$z), { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$k, { ...unref(delegatedProps), ..._ctx.$attrs }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)
                  ]),
                  _: 3
                }),
                createVNode(unref(_sfc_main$2$2), {
                  side: unref(tooltipSide),
                  align: "center",
                  hidden: unref(state) !== "collapsed" || unref(isMobile)
                }, {
                  default: withCtx(() => [
                    typeof __props.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(__props.tooltip), 1)
                    ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(__props.tooltip), { key: 1 }))
                  ]),
                  _: 1
                }, 8, ["side", "hidden"])
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuButton.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-item",
        "data-sidebar": "menu-item",
        class: unref(cn)("group/menu-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuItem.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSkeleton",
  __ssrInlineRender: true,
  props: {
    showIcon: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const width = computed(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-skeleton",
        "data-sidebar": "menu-skeleton",
        class: unref(cn)("flex h-8 items-center gap-2 rounded-md px-2", props.class)
      }, _attrs))}>`);
      if (__props.showIcon) {
        _push(ssrRenderComponent(unref(_sfc_main$A), {
          class: "size-4 rounded-md",
          "data-sidebar": "menu-skeleton-icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$A), {
        class: "h-4 max-w-(--skeleton-width) flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: { "--skeleton-width": width.value }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuSkeleton.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSub",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-sub",
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-s px-2.5 py-0.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuSub.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "a" },
    size: { default: "md" },
    isActive: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "sidebar-menu-sub-button",
        "data-sidebar": "menu-sub-button",
        as: __props.as,
        "as-child": __props.asChild,
        "data-size": __props.size,
        "data-active": __props.isActive,
        class: unref(cn)(
          "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          "data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-medium",
          __props.size === "sm" && "text-xs",
          __props.size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuSubButton.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "sidebar-menu-sub-item",
        "data-sidebar": "menu-sub-item",
        class: unref(cn)("group/menu-sub-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarMenuSubItem.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "SidebarProvider",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    class: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const { direction } = useAppSettings();
    const props = __props;
    const emits = __emit;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const openMobile = ref(false);
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen ?? false,
      passive: props.open === void 0
    });
    function setOpen(value) {
      open.value = value;
      (void 0).cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
    function setOpenMobile(value) {
      openMobile.value = value;
    }
    function toggleSidebar() {
      return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
    }
    useEventListener("keydown", (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    });
    const state = computed(() => open.value ? "expanded" : "collapsed");
    provideSidebarContext({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ "delay-duration": 0 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({
              "data-slot": "sidebar-wrapper",
              dir: unref(direction),
              style: {
                "--sidebar-width": unref(SIDEBAR_WIDTH),
                "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
              },
              class: unref(cn)("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex h-svh overflow-hidden w-full", props.class)
            }, _ctx.$attrs))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", mergeProps({
                "data-slot": "sidebar-wrapper",
                dir: unref(direction),
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH),
                  "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
                },
                class: unref(cn)("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex h-svh overflow-hidden w-full", props.class)
              }, _ctx.$attrs), [
                renderSlot(_ctx.$slots, "default")
              ], 16, ["dir"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarProvider.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "SidebarRail",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "data-sidebar": "rail",
        "data-slot": "sidebar-rail",
        "aria-label": "Toggle Sidebar",
        tabindex: -1,
        title: "Toggle Sidebar",
        class: unref(cn)(
          "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
          "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarRail.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "SidebarSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$B), mergeProps({
        "data-slot": "sidebar-separator",
        "data-sidebar": "separator",
        class: unref(cn)("bg-sidebar-border mx-2 w-auto", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarSeparator.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "SidebarTrigger",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$2$3), mergeProps({
        "data-sidebar": "trigger",
        "data-slot": "sidebar-trigger",
        variant: "ghost",
        size: "icon",
        class: unref(cn)("h-7 w-7", props.class),
        onClick: unref(toggleSidebar)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PanelLeft), null, null, _parent2, _scopeId));
            _push2(`<span class="sr-only"${_scopeId}>Toggle Sidebar</span>`);
          } else {
            return [
              createVNode(unref(PanelLeft)),
              createVNode("span", { class: "sr-only" }, "Toggle Sidebar")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sidebar/SidebarTrigger.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "SidebarNavGroup",
  __ssrInlineRender: true,
  props: {
    item: {},
    size: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const { setOpenMobile } = useSidebar();
    const { t } = useLocale();
    const displayTitle = computed(
      () => props.item.titleKey ? t(props.item.titleKey) : props.item.title
    );
    function getChildTitle(child) {
      return child.titleKey ? t(child.titleKey) : child.title;
    }
    const openCollapsible = ref(false);
    const route = useRoute();
    const hasActiveChild = computed(
      () => props.item.children?.some((c) => c.link === route.path) ?? false
    );
    watch(hasActiveChild, (active) => {
      if (active) openCollapsible.value = true;
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarMenu = _sfc_main$n;
      const _component_Collapsible = _sfc_main$2$4;
      const _component_SidebarMenuItem = _sfc_main$i;
      const _component_CollapsibleTrigger = _sfc_main$C;
      const _component_SidebarMenuButton = _sfc_main$j;
      const _component_Icon = __nuxt_component_2;
      const _component_CollapsibleContent = _sfc_main$1$2;
      const _component_SidebarMenuSub = _sfc_main$g;
      const _component_SidebarMenuSubItem = _sfc_main$e;
      const _component_SidebarMenuSubButton = _sfc_main$f;
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(ssrRenderComponent(_component_SidebarMenu, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Collapsible, {
              key: __props.item.title,
              open: unref(openCollapsible),
              "onUpdate:open": ($event) => isRef(openCollapsible) ? openCollapsible.value = $event : null,
              "as-child": "",
              class: "group/collapsible"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SidebarMenuItem, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CollapsibleTrigger, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SidebarMenuButton, {
                                tooltip: unref(displayTitle),
                                size: __props.size,
                                "data-active": unref(hasActiveChild)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Icon, {
                                      name: __props.item.icon || "",
                                      mode: "svg"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<span${_scopeId5}>${ssrInterpolate(unref(displayTitle))}</span>`);
                                    if (__props.item.new) {
                                      _push6(`<span class="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"${_scopeId5}> New </span>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(ssrRenderComponent(_component_Icon, {
                                      name: "i-lucide-chevron-right",
                                      class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Icon, {
                                        name: __props.item.icon || "",
                                        mode: "svg"
                                      }, null, 8, ["name"]),
                                      createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                                      __props.item.new ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                      }, " New ")) : createCommentVNode("", true),
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-chevron-right",
                                        class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SidebarMenuButton, {
                                  tooltip: unref(displayTitle),
                                  size: __props.size,
                                  "data-active": unref(hasActiveChild)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: __props.item.icon || "",
                                      mode: "svg"
                                    }, null, 8, ["name"]),
                                    createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                                    __props.item.new ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                    }, " New ")) : createCommentVNode("", true),
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-chevron-right",
                                      class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["tooltip", "size", "data-active"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CollapsibleContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SidebarMenuSub, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.item.children, (subItem) => {
                                      _push6(ssrRenderComponent(_component_SidebarMenuSubItem, {
                                        key: subItem.title
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_SidebarMenuSubButton, {
                                              "as-child": "",
                                              "data-active": subItem.link === _ctx.$route.path
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(_component_NuxtLink, {
                                                    to: subItem.link,
                                                    onClick: ($event) => unref(setOpenMobile)(false)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<span${_scopeId8}>${ssrInterpolate(getChildTitle(subItem))}</span>`);
                                                        if (subItem.new) {
                                                          _push9(`<span class="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"${_scopeId8}> New </span>`);
                                                        } else {
                                                          _push9(`<!---->`);
                                                        }
                                                      } else {
                                                        return [
                                                          createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                          subItem.new ? (openBlock(), createBlock("span", {
                                                            key: 0,
                                                            class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                          }, " New ")) : createCommentVNode("", true)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(_component_NuxtLink, {
                                                      to: subItem.link,
                                                      onClick: ($event) => unref(setOpenMobile)(false)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                        subItem.new ? (openBlock(), createBlock("span", {
                                                          key: 0,
                                                          class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                        }, " New ")) : createCommentVNode("", true)
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["to", "onClick"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_SidebarMenuSubButton, {
                                                "as-child": "",
                                                "data-active": subItem.link === _ctx.$route.path
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtLink, {
                                                    to: subItem.link,
                                                    onClick: ($event) => unref(setOpenMobile)(false)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                      subItem.new ? (openBlock(), createBlock("span", {
                                                        key: 0,
                                                        class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                      }, " New ")) : createCommentVNode("", true)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["to", "onClick"])
                                                ]),
                                                _: 2
                                              }, 1032, ["data-active"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (subItem) => {
                                        return openBlock(), createBlock(_component_SidebarMenuSubItem, {
                                          key: subItem.title
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_SidebarMenuSubButton, {
                                              "as-child": "",
                                              "data-active": subItem.link === _ctx.$route.path
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtLink, {
                                                  to: subItem.link,
                                                  onClick: ($event) => unref(setOpenMobile)(false)
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                    subItem.new ? (openBlock(), createBlock("span", {
                                                      key: 0,
                                                      class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                    }, " New ")) : createCommentVNode("", true)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["to", "onClick"])
                                              ]),
                                              _: 2
                                            }, 1032, ["data-active"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SidebarMenuSub, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (subItem) => {
                                      return openBlock(), createBlock(_component_SidebarMenuSubItem, {
                                        key: subItem.title
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SidebarMenuSubButton, {
                                            "as-child": "",
                                            "data-active": subItem.link === _ctx.$route.path
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtLink, {
                                                to: subItem.link,
                                                onClick: ($event) => unref(setOpenMobile)(false)
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                  subItem.new ? (openBlock(), createBlock("span", {
                                                    key: 0,
                                                    class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                  }, " New ")) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1032, ["to", "onClick"])
                                            ]),
                                            _: 2
                                          }, 1032, ["data-active"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CollapsibleTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_SidebarMenuButton, {
                                tooltip: unref(displayTitle),
                                size: __props.size,
                                "data-active": unref(hasActiveChild)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: __props.item.icon || "",
                                    mode: "svg"
                                  }, null, 8, ["name"]),
                                  createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                                  __props.item.new ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                  }, " New ")) : createCommentVNode("", true),
                                  createVNode(_component_Icon, {
                                    name: "i-lucide-chevron-right",
                                    class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                  })
                                ]),
                                _: 1
                              }, 8, ["tooltip", "size", "data-active"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CollapsibleContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_SidebarMenuSub, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (subItem) => {
                                    return openBlock(), createBlock(_component_SidebarMenuSubItem, {
                                      key: subItem.title
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SidebarMenuSubButton, {
                                          "as-child": "",
                                          "data-active": subItem.link === _ctx.$route.path
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtLink, {
                                              to: subItem.link,
                                              onClick: ($event) => unref(setOpenMobile)(false)
                                            }, {
                                              default: withCtx(() => [
                                                createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                                subItem.new ? (openBlock(), createBlock("span", {
                                                  key: 0,
                                                  class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                                }, " New ")) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1032, ["to", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1032, ["data-active"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SidebarMenuItem, null, {
                      default: withCtx(() => [
                        createVNode(_component_CollapsibleTrigger, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_SidebarMenuButton, {
                              tooltip: unref(displayTitle),
                              size: __props.size,
                              "data-active": unref(hasActiveChild)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: __props.item.icon || "",
                                  mode: "svg"
                                }, null, 8, ["name"]),
                                createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                                __props.item.new ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                }, " New ")) : createCommentVNode("", true),
                                createVNode(_component_Icon, {
                                  name: "i-lucide-chevron-right",
                                  class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                })
                              ]),
                              _: 1
                            }, 8, ["tooltip", "size", "data-active"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CollapsibleContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_SidebarMenuSub, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (subItem) => {
                                  return openBlock(), createBlock(_component_SidebarMenuSubItem, {
                                    key: subItem.title
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SidebarMenuSubButton, {
                                        "as-child": "",
                                        "data-active": subItem.link === _ctx.$route.path
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, {
                                            to: subItem.link,
                                            onClick: ($event) => unref(setOpenMobile)(false)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                              subItem.new ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                              }, " New ")) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1032, ["to", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1032, ["data-active"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
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
          } else {
            return [
              (openBlock(), createBlock(_component_Collapsible, {
                key: __props.item.title,
                open: unref(openCollapsible),
                "onUpdate:open": ($event) => isRef(openCollapsible) ? openCollapsible.value = $event : null,
                "as-child": "",
                class: "group/collapsible"
              }, {
                default: withCtx(() => [
                  createVNode(_component_SidebarMenuItem, null, {
                    default: withCtx(() => [
                      createVNode(_component_CollapsibleTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_SidebarMenuButton, {
                            tooltip: unref(displayTitle),
                            size: __props.size,
                            "data-active": unref(hasActiveChild)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Icon, {
                                name: __props.item.icon || "",
                                mode: "svg"
                              }, null, 8, ["name"]),
                              createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                              __props.item.new ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                              }, " New ")) : createCommentVNode("", true),
                              createVNode(_component_Icon, {
                                name: "i-lucide-chevron-right",
                                class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                              })
                            ]),
                            _: 1
                          }, 8, ["tooltip", "size", "data-active"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CollapsibleContent, null, {
                        default: withCtx(() => [
                          createVNode(_component_SidebarMenuSub, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.item.children, (subItem) => {
                                return openBlock(), createBlock(_component_SidebarMenuSubItem, {
                                  key: subItem.title
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SidebarMenuSubButton, {
                                      "as-child": "",
                                      "data-active": subItem.link === _ctx.$route.path
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, {
                                          to: subItem.link,
                                          onClick: ($event) => unref(setOpenMobile)(false)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", null, toDisplayString(getChildTitle(subItem)), 1),
                                            subItem.new ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                            }, " New ")) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["to", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1032, ["data-active"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SidebarNavGroup.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$9, { __name: "LayoutSidebarNavGroup" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "SidebarNavLink",
  __ssrInlineRender: true,
  props: {
    item: {},
    size: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const { setOpenMobile } = useSidebar();
    const { t } = useLocale();
    const route = useRoute();
    const displayTitle = computed(
      () => props.item.titleKey ? t(props.item.titleKey) : props.item.title
    );
    const isActive = computed(() => {
      const currentPath = route.path;
      const linkPath = props.item.link;
      if (!linkPath) return false;
      if (currentPath === linkPath) return true;
      const segments = linkPath.split("/").filter(Boolean);
      if (segments.length === 1) {
        return currentPath.startsWith(linkPath + "/");
      }
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarMenu = _sfc_main$n;
      const _component_SidebarMenuItem = _sfc_main$i;
      const _component_SidebarMenuButton = _sfc_main$j;
      const _component_NuxtLink = __nuxt_component_3$2;
      const _component_Icon = __nuxt_component_2;
      _push(ssrRenderComponent(_component_SidebarMenu, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SidebarMenuItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SidebarMenuButton, {
                    "as-child": "",
                    tooltip: unref(displayTitle),
                    size: __props.size,
                    "data-active": unref(isActive)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: __props.item.link,
                          onClick: ($event) => unref(setOpenMobile)(false)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: __props.item.icon || ""
                              }, null, _parent5, _scopeId4));
                              _push5(`<span${_scopeId4}>${ssrInterpolate(unref(displayTitle))}</span>`);
                              if (__props.item.new) {
                                _push5(`<span class="rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"${_scopeId4}> New </span>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_Icon, {
                                  name: __props.item.icon || ""
                                }, null, 8, ["name"]),
                                createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                                __props.item.new ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                                }, " New ")) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, {
                            to: __props.item.link,
                            onClick: ($event) => unref(setOpenMobile)(false)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Icon, {
                                name: __props.item.icon || ""
                              }, null, 8, ["name"]),
                              createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                              __props.item.new ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                              }, " New ")) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["to", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SidebarMenuButton, {
                      "as-child": "",
                      tooltip: unref(displayTitle),
                      size: __props.size,
                      "data-active": unref(isActive)
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: __props.item.link,
                          onClick: ($event) => unref(setOpenMobile)(false)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: __props.item.icon || ""
                            }, null, 8, ["name"]),
                            createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                            __props.item.new ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                            }, " New ")) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["to", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["tooltip", "size", "data-active"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SidebarMenuItem, null, {
                default: withCtx(() => [
                  createVNode(_component_SidebarMenuButton, {
                    "as-child": "",
                    tooltip: unref(displayTitle),
                    size: __props.size,
                    "data-active": unref(isActive)
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: __props.item.link,
                        onClick: ($event) => unref(setOpenMobile)(false)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: __props.item.icon || ""
                          }, null, 8, ["name"]),
                          createVNode("span", null, toDisplayString(unref(displayTitle)), 1),
                          __props.item.new ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs text-black leading-none no-underline group-hover:no-underline"
                          }, " New ")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["to", "onClick"])
                    ]),
                    _: 1
                  }, 8, ["tooltip", "size", "data-active"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SidebarNavLink.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$8, { __name: "LayoutSidebarNavLink" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "SidebarNavHeader",
  __ssrInlineRender: true,
  props: {
    teams: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarMenu = _sfc_main$n;
      const _component_SidebarMenuItem = _sfc_main$i;
      const _component_SidebarMenuButton = _sfc_main$j;
      const _component_NuxtLink = __nuxt_component_3$2;
      _push(ssrRenderComponent(_component_SidebarMenu, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SidebarMenuItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SidebarMenuButton, {
                    size: "lg",
                    "as-child": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, {
                          to: "/",
                          class: "flex items-center gap-2 group/brand"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="logo-shine-wrapper" data-v-4acaa709${_scopeId4}><div class="logo-shine-border" data-v-4acaa709${_scopeId4}></div><div class="logo-shine-content" data-v-4acaa709${_scopeId4}><img${ssrRenderAttr("src", _imports_0)} alt="ETG CRM" class="size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300" data-v-4acaa709${_scopeId4}></div></div><div class="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden" data-v-4acaa709${_scopeId4}><div class="flex items-center gap-1.5" data-v-4acaa709${_scopeId4}><span class="truncate font-bold tracking-tight" data-v-4acaa709${_scopeId4}>ETG CRM</span><span class="text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none" data-v-4acaa709${_scopeId4}>v1.0</span></div><span class="text-[10px] text-muted-foreground truncate" data-v-4acaa709${_scopeId4}>Enterprise Platform</span></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "logo-shine-wrapper" }, [
                                  createVNode("div", { class: "logo-shine-border" }),
                                  createVNode("div", { class: "logo-shine-content" }, [
                                    createVNode("img", {
                                      src: _imports_0,
                                      alt: "ETG CRM",
                                      class: "size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300"
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden" }, [
                                  createVNode("div", { class: "flex items-center gap-1.5" }, [
                                    createVNode("span", { class: "truncate font-bold tracking-tight" }, "ETG CRM"),
                                    createVNode("span", { class: "text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none" }, "v1.0")
                                  ]),
                                  createVNode("span", { class: "text-[10px] text-muted-foreground truncate" }, "Enterprise Platform")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, {
                            to: "/",
                            class: "flex items-center gap-2 group/brand"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "logo-shine-wrapper" }, [
                                createVNode("div", { class: "logo-shine-border" }),
                                createVNode("div", { class: "logo-shine-content" }, [
                                  createVNode("img", {
                                    src: _imports_0,
                                    alt: "ETG CRM",
                                    class: "size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300"
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden" }, [
                                createVNode("div", { class: "flex items-center gap-1.5" }, [
                                  createVNode("span", { class: "truncate font-bold tracking-tight" }, "ETG CRM"),
                                  createVNode("span", { class: "text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none" }, "v1.0")
                                ]),
                                createVNode("span", { class: "text-[10px] text-muted-foreground truncate" }, "Enterprise Platform")
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
                  return [
                    createVNode(_component_SidebarMenuButton, {
                      size: "lg",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: "/",
                          class: "flex items-center gap-2 group/brand"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "logo-shine-wrapper" }, [
                              createVNode("div", { class: "logo-shine-border" }),
                              createVNode("div", { class: "logo-shine-content" }, [
                                createVNode("img", {
                                  src: _imports_0,
                                  alt: "ETG CRM",
                                  class: "size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300"
                                })
                              ])
                            ]),
                            createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden" }, [
                              createVNode("div", { class: "flex items-center gap-1.5" }, [
                                createVNode("span", { class: "truncate font-bold tracking-tight" }, "ETG CRM"),
                                createVNode("span", { class: "text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none" }, "v1.0")
                              ]),
                              createVNode("span", { class: "text-[10px] text-muted-foreground truncate" }, "Enterprise Platform")
                            ])
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
          } else {
            return [
              createVNode(_component_SidebarMenuItem, null, {
                default: withCtx(() => [
                  createVNode(_component_SidebarMenuButton, {
                    size: "lg",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: "/",
                        class: "flex items-center gap-2 group/brand"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "logo-shine-wrapper" }, [
                            createVNode("div", { class: "logo-shine-border" }),
                            createVNode("div", { class: "logo-shine-content" }, [
                              createVNode("img", {
                                src: _imports_0,
                                alt: "ETG CRM",
                                class: "size-8 object-cover group-hover/brand:scale-105 transition-transform duration-300"
                              })
                            ])
                          ]),
                          createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden" }, [
                            createVNode("div", { class: "flex items-center gap-1.5" }, [
                              createVNode("span", { class: "truncate font-bold tracking-tight" }, "ETG CRM"),
                              createVNode("span", { class: "text-[8px] font-semibold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full leading-none" }, "v1.0")
                            ]),
                            createVNode("span", { class: "text-[10px] text-muted-foreground truncate" }, "Enterprise Platform")
                          ])
                        ]),
                        _: 1
                      })
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
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SidebarNavHeader.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-4acaa709"]]), { __name: "LayoutSidebarNavHeader" });
const navMenu = [
  {
    heading: "General",
    headingKey: "nav.general",
    items: [
      {
        title: "Home",
        titleKey: "nav.dashboard",
        icon: "i-lucide-layout-dashboard",
        link: "/"
      },
      {
        title: "Language",
        icon: "i-lucide-languages",
        link: "/admin/language"
      }
    ]
  },
  {
    heading: "Administration",
    headingKey: "nav.administration",
    items: [
      {
        title: "Users",
        titleKey: "nav.users",
        icon: "i-lucide-user-cog",
        link: "/admin/users"
      },
      {
        title: "Categories",
        icon: "i-lucide-tags",
        link: "/admin/categories"
      },
      {
        title: "Furniture",
        icon: "i-lucide-armchair",
        link: "/admin/furniture"
      },
      {
        title: "Entities",
        icon: "i-lucide-building-2",
        link: "/admin/entities"
      }
    ]
  },
  {
    heading: "Reports",
    headingKey: "nav.reports",
    items: [
      {
        title: "Furniture",
        icon: "i-lucide-armchair",
        link: "/reports/furniture"
      },
      {
        title: "Employee Performance",
        icon: "i-lucide-trophy",
        link: "/reports/employee-performance"
      },
      {
        title: "Asset Map",
        icon: "i-lucide-map",
        link: "/reports/heatmap"
      }
    ]
  }
];
const navMenuBottom = [];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Search",
  __ssrInlineRender: true,
  setup(__props) {
    const { metaSymbol } = useShortcuts();
    const { t } = useLocale();
    const openCommand = ref(false);
    const router = useRouter();
    defineShortcuts({
      Meta_K: () => openCommand.value = true
    });
    const navSections = computed(
      () => navMenu.map((section) => ({
        heading: section.headingKey ? t(section.headingKey) : section.heading,
        items: section.items.filter((item) => item.link).map((item) => ({
          title: item.titleKey ? t(item.titleKey) : item.title,
          icon: item.icon,
          link: item.link
        }))
      })).filter((section) => section.items.length > 0)
    );
    function handleSelectLink(link) {
      router.push(link);
      openCommand.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarMenuButton = _sfc_main$j;
      const _component_Button = _sfc_main$2$3;
      const _component_Icon = __nuxt_component_2;
      const _component_Kbd = _sfc_main$1$3;
      const _component_CommandDialog = _sfc_main$7$1;
      const _component_CommandInput = _sfc_main$4$2;
      const _component_CommandList = _sfc_main$2$5;
      const _component_CommandEmpty = _sfc_main$6$1;
      const _component_CommandGroup = _sfc_main$5$2;
      const _component_CommandItem = _sfc_main$3$2;
      const _component_CommandSeparator = _sfc_main$1$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_SidebarMenuButton, {
        "as-child": "",
        tooltip: unref(t)("common.search")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Button, {
              variant: "outline",
              size: "sm",
              class: "text-xs",
              onClick: ($event) => openCommand.value = !unref(openCommand)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, { name: "i-lucide-search" }, null, _parent3, _scopeId2));
                  _push3(`<span class="font-normal group-data-[collapsible=icon]:hidden"${_scopeId2}>${ssrInterpolate(unref(t)("common.search"))}</span><div class="ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Kbd, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(metaSymbol))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(metaSymbol)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Kbd, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`K`);
                      } else {
                        return [
                          createTextVNode("K")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_Icon, { name: "i-lucide-search" }),
                    createVNode("span", { class: "font-normal group-data-[collapsible=icon]:hidden" }, toDisplayString(unref(t)("common.search")), 1),
                    createVNode("div", { class: "ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden" }, [
                      createVNode(_component_Kbd, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(metaSymbol)), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Kbd, null, {
                        default: withCtx(() => [
                          createTextVNode("K")
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
              createVNode(_component_Button, {
                variant: "outline",
                size: "sm",
                class: "text-xs",
                onClick: ($event) => openCommand.value = !unref(openCommand)
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, { name: "i-lucide-search" }),
                  createVNode("span", { class: "font-normal group-data-[collapsible=icon]:hidden" }, toDisplayString(unref(t)("common.search")), 1),
                  createVNode("div", { class: "ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden" }, [
                    createVNode(_component_Kbd, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(metaSymbol)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Kbd, null, {
                      default: withCtx(() => [
                        createTextVNode("K")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_CommandDialog, {
        open: unref(openCommand),
        "onUpdate:open": ($event) => isRef(openCommand) ? openCommand.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CommandInput, {
              placeholder: unref(t)("common.search") + " menu..."
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CommandList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CommandEmpty, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(t)("common.noResults"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(t)("common.noResults")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(navSections), (section) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_CommandGroup, {
                      heading: section.heading
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(section.items, (item) => {
                            _push4(ssrRenderComponent(_component_CommandItem, {
                              key: item.link,
                              value: `${section.heading} ${item.title}`,
                              class: "gap-2",
                              onSelect: ($event) => handleSelectLink(item.link)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: item.icon,
                                    class: "size-4 text-muted-foreground shrink-0"
                                  }, null, _parent5, _scopeId4));
                                  _push5(` ${ssrInterpolate(item.title)}`);
                                } else {
                                  return [
                                    createVNode(_component_Icon, {
                                      name: item.icon,
                                      class: "size-4 text-muted-foreground shrink-0"
                                    }, null, 8, ["name"]),
                                    createTextVNode(" " + toDisplayString(item.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(section.items, (item) => {
                              return openBlock(), createBlock(_component_CommandItem, {
                                key: item.link,
                                value: `${section.heading} ${item.title}`,
                                class: "gap-2",
                                onSelect: ($event) => handleSelectLink(item.link)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: item.icon,
                                    class: "size-4 text-muted-foreground shrink-0"
                                  }, null, 8, ["name"]),
                                  createTextVNode(" " + toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["value", "onSelect"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_CommandSeparator, null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_CommandEmpty, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("common.noResults")), 1)
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(navSections), (section) => {
                      return openBlock(), createBlock(Fragment, {
                        key: section.heading
                      }, [
                        createVNode(_component_CommandGroup, {
                          heading: section.heading
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(section.items, (item) => {
                              return openBlock(), createBlock(_component_CommandItem, {
                                key: item.link,
                                value: `${section.heading} ${item.title}`,
                                class: "gap-2",
                                onSelect: ($event) => handleSelectLink(item.link)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, {
                                    name: item.icon,
                                    class: "size-4 text-muted-foreground shrink-0"
                                  }, null, 8, ["name"]),
                                  createTextVNode(" " + toDisplayString(item.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["value", "onSelect"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["heading"]),
                        createVNode(_component_CommandSeparator)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CommandInput, {
                placeholder: unref(t)("common.search") + " menu..."
              }, null, 8, ["placeholder"]),
              createVNode(_component_CommandList, null, {
                default: withCtx(() => [
                  createVNode(_component_CommandEmpty, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("common.noResults")), 1)
                    ]),
                    _: 1
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(navSections), (section) => {
                    return openBlock(), createBlock(Fragment, {
                      key: section.heading
                    }, [
                      createVNode(_component_CommandGroup, {
                        heading: section.heading
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(section.items, (item) => {
                            return openBlock(), createBlock(_component_CommandItem, {
                              key: item.link,
                              value: `${section.heading} ${item.title}`,
                              class: "gap-2",
                              onSelect: ($event) => handleSelectLink(item.link)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: item.icon,
                                  class: "size-4 text-muted-foreground shrink-0"
                                }, null, 8, ["name"]),
                                createTextVNode(" " + toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value", "onSelect"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["heading"]),
                      createVNode(_component_CommandSeparator)
                    ], 64);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Search.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$6, { __name: "Search" });
const THEME_COLORS = [
  {
    name: "default",
    value: "oklch(0.205 0 0)"
  },
  {
    name: "blue",
    value: "oklch(0.623 0.214 259.815)"
  },
  {
    name: "green",
    value: "oklch(0.723 0.219 149.579)"
  },
  {
    name: "red",
    value: "oklch(0.637 0.237 25.331)"
  },
  {
    name: "rose",
    value: "oklch(0.645 0.246 16.439)"
  },
  {
    name: "violet",
    value: "oklch(0.606 0.25 292.717)"
  },
  {
    name: "orange",
    value: "oklch(0.705 0.213 47.604)"
  },
  {
    name: "yellow",
    value: "oklch(0.795 0.184 86.047)"
  },
  {
    name: "teal",
    value: "oklch(0.60 0.118 184.704)"
  }
];
const THEME_TYPE = ["default", "scaled", "mono"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ThemeCustomize",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme, updateAppSettings } = useAppSettings();
    const allColors = THEME_COLORS.map((color) => color.name);
    const allTypes = THEME_TYPE;
    watch(() => theme.value?.color, () => {
      setClassColor();
    });
    function setClassColor() {
      (void 0).body.classList.remove(
        ...allColors.map((color) => `color-${color}`)
      );
      (void 0).body.classList.add(`color-${theme.value?.color || "default"}`);
    }
    watch(() => theme.value?.type, () => {
      setClassType();
    });
    function setClassType() {
      (void 0).body.classList.remove(
        ...allTypes.map((type) => `theme-${type}`)
      );
      (void 0).body.classList.add(`theme-${theme.value?.type || "default"}`);
    }
    function backgroundColor(color) {
      const bg = THEME_COLORS.find((theme2) => theme2.name === color);
      return bg?.value;
    }
    const colorMode = useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$D;
      const _component_Button = _sfc_main$2$3;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-6" }, _attrs))}><div class="space-y-1.5">`);
      _push(ssrRenderComponent(_component_Label, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Color`);
          } else {
            return [
              createTextVNode("Color")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-3 gap-2"><!--[-->`);
      ssrRenderList(unref(allColors), (col) => {
        _push(ssrRenderComponent(_component_Button, {
          class: ["justify-start gap-2", { "!border-primary border-2 !bg-primary/10": unref(theme)?.color === col }],
          variant: "outline",
          onClick: ($event) => unref(updateAppSettings)({ theme: { color: col } })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="h-5 w-5 flex items-center justify-center rounded-full border border-white" style="${ssrRenderStyle({ backgroundColor: backgroundColor(col) })}"${_scopeId}>`);
              if (col === unref(theme)?.color) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-radix-icons-check",
                  size: "16",
                  class: "text-white"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span class="text-xs capitalize"${_scopeId}>${ssrInterpolate(col)}</span>`);
            } else {
              return [
                createVNode("span", {
                  class: "h-5 w-5 flex items-center justify-center rounded-full border border-white",
                  style: { backgroundColor: backgroundColor(col) }
                }, [
                  col === unref(theme)?.color ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    name: "i-radix-icons-check",
                    size: "16",
                    class: "text-white"
                  })) : createCommentVNode("", true)
                ], 4),
                createVNode("span", { class: "text-xs capitalize" }, toDisplayString(col), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="space-y-1.5">`);
      _push(ssrRenderComponent(_component_Label, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Type`);
          } else {
            return [
              createTextVNode("Type")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-3 gap-2"><!--[-->`);
      ssrRenderList(unref(allTypes), (themeType) => {
        _push(ssrRenderComponent(_component_Button, {
          class: ["justify-center gap-2", { "!border-primary border-2 !bg-primary/10": unref(theme)?.type === themeType }],
          variant: "outline",
          onClick: ($event) => unref(updateAppSettings)({ theme: { type: themeType } })
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-xs capitalize"${_scopeId}>${ssrInterpolate(themeType)}</span>`);
            } else {
              return [
                createVNode("span", { class: "text-xs capitalize" }, toDisplayString(themeType), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="space-y-1.5">`);
      _push(ssrRenderComponent(_component_Label, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Theme`);
          } else {
            return [
              createTextVNode("Theme")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-3 gap-2">`);
      _push(ssrRenderComponent(_component_Button, {
        class: ["justify-center gap-2", { "!border-primary border-2 !bg-primary/10": unref(colorMode).preference === "light" }],
        variant: "outline",
        onClick: ($event) => unref(colorMode).preference = "light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-ph-sun-dim-duotone",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs capitalize"${_scopeId}>Light</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-ph-sun-dim-duotone",
                size: "16"
              }),
              createVNode("span", { class: "text-xs capitalize" }, "Light")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        class: ["justify-center gap-2", { "!border-primary border-2 !bg-primary/10": unref(colorMode).preference === "dark" }],
        variant: "outline",
        onClick: ($event) => unref(colorMode).preference = "dark"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-ph-moon-stars-duotone",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs capitalize"${_scopeId}>Dark</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-ph-moon-stars-duotone",
                size: "16"
              }),
              createVNode("span", { class: "text-xs capitalize" }, "Dark")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        class: ["justify-center gap-2", { "!border-primary border-2 !bg-primary/10": unref(colorMode).preference === "system" }],
        variant: "outline",
        onClick: ($event) => unref(colorMode).preference = "system"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-monitor",
              size: "16"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs capitalize"${_scopeId}>System</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-lucide-monitor",
                size: "16"
              }),
              createVNode("span", { class: "text-xs capitalize" }, "System")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeCustomize.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_18 = Object.assign(_sfc_main$5, { __name: "ThemeCustomize" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SidebarNavFooter",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  setup(__props) {
    const { isMobile, setOpenMobile } = useSidebar();
    const { direction } = useAppSettings();
    const { logout } = useAuth();
    function handleLogout() {
      logout();
    }
    const showModalTheme = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarMenu = _sfc_main$n;
      const _component_SidebarMenuItem = _sfc_main$i;
      const _component_SidebarMenuButton = _sfc_main$j;
      const _component_Icon = __nuxt_component_2;
      const _component_DropdownMenu = _sfc_main$d$1;
      const _component_DropdownMenuTrigger = _sfc_main$E;
      const _component_Avatar = _sfc_main$2$6;
      const _component_AvatarImage = _sfc_main$F;
      const _component_AvatarFallback = _sfc_main$1$5;
      const _component_DropdownMenuContent = _sfc_main$b$1;
      const _component_DropdownMenuLabel = _sfc_main$8$2;
      const _component_DropdownMenuSeparator = _sfc_main$5$3;
      const _component_DropdownMenuItem = _sfc_main$9$1;
      const _component_Dialog = _sfc_main$9$2;
      const _component_DialogContent = _sfc_main$6$2;
      const _component_DialogHeader = _sfc_main$3$3;
      const _component_DialogTitle = _sfc_main$1$6;
      const _component_DialogDescription = _sfc_main$5$4;
      const _component_ThemeCustomize = __nuxt_component_18;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_SidebarMenu, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SidebarMenuItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_SidebarMenuButton, {
                    size: "sm",
                    onClick: ($event) => showModalTheme.value = true,
                    class: "text-muted-foreground hover:text-foreground"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "i-lucide-paintbrush",
                          class: "size-4"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Theme</span>`);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "i-lucide-paintbrush",
                            class: "size-4"
                          }),
                          createVNode("span", null, "Theme")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_SidebarMenuButton, {
                      size: "sm",
                      onClick: ($event) => showModalTheme.value = true,
                      class: "text-muted-foreground hover:text-foreground"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-lucide-paintbrush",
                          class: "size-4"
                        }),
                        createVNode("span", null, "Theme")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SidebarMenuItem, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DropdownMenu, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DropdownMenuTrigger, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_SidebarMenuButton, {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_AvatarImage, {
                                            src: __props.user.avatar,
                                            alt: __props.user.name
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_AvatarFallback, { class: "rounded-lg" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(__props.user.name.split(" ").map((n) => n[0]).join(""))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_AvatarImage, {
                                              src: __props.user.avatar,
                                              alt: __props.user.name
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="grid flex-1 text-start text-sm leading-tight"${_scopeId5}><span class="truncate font-semibold"${_scopeId5}>${ssrInterpolate(__props.user.name)}</span>`);
                                    if (__props.user.role) {
                                      _push6(`<span class="truncate text-[10px] text-muted-foreground"${_scopeId5}>${ssrInterpolate(__props.user.role)}</span>`);
                                    } else {
                                      _push6(`<span class="truncate text-[10px] text-muted-foreground"${_scopeId5}>${ssrInterpolate(__props.user.email)}</span>`);
                                    }
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(_component_Icon, {
                                      name: "i-lucide-chevrons-up-down",
                                      class: "ms-auto size-4"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_AvatarImage, {
                                            src: __props.user.avatar,
                                            alt: __props.user.name
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                        createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                        __props.user.role ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "truncate text-[10px] text-muted-foreground"
                                        }, toDisplayString(__props.user.role), 1)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "truncate text-[10px] text-muted-foreground"
                                        }, toDisplayString(__props.user.email), 1))
                                      ]),
                                      createVNode(_component_Icon, {
                                        name: "i-lucide-chevrons-up-down",
                                        class: "ms-auto size-4"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_SidebarMenuButton, {
                                  size: "lg",
                                  class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_AvatarImage, {
                                          src: __props.user.avatar,
                                          alt: __props.user.name
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                      createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                      __props.user.role ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "truncate text-[10px] text-muted-foreground"
                                      }, toDisplayString(__props.user.role), 1)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "truncate text-[10px] text-muted-foreground"
                                      }, toDisplayString(__props.user.email), 1))
                                    ]),
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-chevrons-up-down",
                                      class: "ms-auto size-4"
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DropdownMenuContent, {
                          class: "min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg",
                          side: unref(isMobile) ? "bottom" : unref(direction) === "rtl" ? "left" : "right",
                          align: "end"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_DropdownMenuLabel, { class: "p-0 font-normal" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_AvatarImage, {
                                            src: __props.user.avatar,
                                            alt: __props.user.name
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_AvatarFallback, { class: "rounded-lg" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`${ssrInterpolate(__props.user.name.split(" ").map((n) => n[0]).join(""))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_AvatarImage, {
                                              src: __props.user.avatar,
                                              alt: __props.user.name
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="grid flex-1 text-start text-sm leading-tight"${_scopeId5}><span class="truncate font-semibold"${_scopeId5}>${ssrInterpolate(__props.user.name)}</span><span class="truncate text-xs text-muted-foreground"${_scopeId5}>${ssrInterpolate(__props.user.email)}</span>`);
                                    if (__props.user.role) {
                                      _push6(`<span class="truncate text-[10px] text-muted-foreground/70"${_scopeId5}>${ssrInterpolate(__props.user.role)}</span>`);
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-start text-sm" }, [
                                        createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_AvatarImage, {
                                              src: __props.user.avatar,
                                              alt: __props.user.name
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                          createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                          createVNode("span", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(__props.user.email), 1),
                                          __props.user.role ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "truncate text-[10px] text-muted-foreground/70"
                                          }, toDisplayString(__props.user.role), 1)) : createCommentVNode("", true)
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_DropdownMenuItem, { onClick: handleLogout }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Icon, { name: "i-lucide-log-out" }, null, _parent6, _scopeId5));
                                    _push6(` Log out `);
                                  } else {
                                    return [
                                      createVNode(_component_Icon, { name: "i-lucide-log-out" }),
                                      createTextVNode(" Log out ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_DropdownMenuLabel, { class: "p-0 font-normal" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-start text-sm" }, [
                                      createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_AvatarImage, {
                                            src: __props.user.avatar,
                                            alt: __props.user.name
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                        createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                        createVNode("span", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(__props.user.email), 1),
                                        __props.user.role ? (openBlock(), createBlock("span", {
                                          key: 0,
                                          class: "truncate text-[10px] text-muted-foreground/70"
                                        }, toDisplayString(__props.user.role), 1)) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_DropdownMenuSeparator),
                                createVNode(_component_DropdownMenuItem, { onClick: handleLogout }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, { name: "i-lucide-log-out" }),
                                    createTextVNode(" Log out ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_SidebarMenuButton, {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: __props.user.avatar,
                                        alt: __props.user.name
                                      }, null, 8, ["src", "alt"]),
                                      createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                    createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                    __props.user.role ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "truncate text-[10px] text-muted-foreground"
                                    }, toDisplayString(__props.user.role), 1)) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "truncate text-[10px] text-muted-foreground"
                                    }, toDisplayString(__props.user.email), 1))
                                  ]),
                                  createVNode(_component_Icon, {
                                    name: "i-lucide-chevrons-up-down",
                                    class: "ms-auto size-4"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DropdownMenuContent, {
                            class: "min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg",
                            side: unref(isMobile) ? "bottom" : unref(direction) === "rtl" ? "left" : "right",
                            align: "end"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuLabel, { class: "p-0 font-normal" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-start text-sm" }, [
                                    createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_AvatarImage, {
                                          src: __props.user.avatar,
                                          alt: __props.user.name
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                      createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                      createVNode("span", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(__props.user.email), 1),
                                      __props.user.role ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "truncate text-[10px] text-muted-foreground/70"
                                      }, toDisplayString(__props.user.role), 1)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_DropdownMenuSeparator),
                              createVNode(_component_DropdownMenuItem, { onClick: handleLogout }, {
                                default: withCtx(() => [
                                  createVNode(_component_Icon, { name: "i-lucide-log-out" }),
                                  createTextVNode(" Log out ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["side"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DropdownMenu, null, {
                      default: withCtx(() => [
                        createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_SidebarMenuButton, {
                              size: "lg",
                              class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: __props.user.avatar,
                                      alt: __props.user.name
                                    }, null, 8, ["src", "alt"]),
                                    createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                  createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                  __props.user.role ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "truncate text-[10px] text-muted-foreground"
                                  }, toDisplayString(__props.user.role), 1)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "truncate text-[10px] text-muted-foreground"
                                  }, toDisplayString(__props.user.email), 1))
                                ]),
                                createVNode(_component_Icon, {
                                  name: "i-lucide-chevrons-up-down",
                                  class: "ms-auto size-4"
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DropdownMenuContent, {
                          class: "min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg",
                          side: unref(isMobile) ? "bottom" : unref(direction) === "rtl" ? "left" : "right",
                          align: "end"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_DropdownMenuLabel, { class: "p-0 font-normal" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-start text-sm" }, [
                                  createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: __props.user.avatar,
                                        alt: __props.user.name
                                      }, null, 8, ["src", "alt"]),
                                      createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                    createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                    createVNode("span", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(__props.user.email), 1),
                                    __props.user.role ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "truncate text-[10px] text-muted-foreground/70"
                                    }, toDisplayString(__props.user.role), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_DropdownMenuSeparator),
                            createVNode(_component_DropdownMenuItem, { onClick: handleLogout }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, { name: "i-lucide-log-out" }),
                                createTextVNode(" Log out ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["side"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SidebarMenuItem, null, {
                default: withCtx(() => [
                  createVNode(_component_SidebarMenuButton, {
                    size: "sm",
                    onClick: ($event) => showModalTheme.value = true,
                    class: "text-muted-foreground hover:text-foreground"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "i-lucide-paintbrush",
                        class: "size-4"
                      }),
                      createVNode("span", null, "Theme")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_SidebarMenuItem, null, {
                default: withCtx(() => [
                  createVNode(_component_DropdownMenu, null, {
                    default: withCtx(() => [
                      createVNode(_component_DropdownMenuTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_SidebarMenuButton, {
                            size: "lg",
                            class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, {
                                    src: __props.user.avatar,
                                    alt: __props.user.name
                                  }, null, 8, ["src", "alt"]),
                                  createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                __props.user.role ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "truncate text-[10px] text-muted-foreground"
                                }, toDisplayString(__props.user.role), 1)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "truncate text-[10px] text-muted-foreground"
                                }, toDisplayString(__props.user.email), 1))
                              ]),
                              createVNode(_component_Icon, {
                                name: "i-lucide-chevrons-up-down",
                                class: "ms-auto size-4"
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DropdownMenuContent, {
                        class: "min-w-56 w-[--radix-dropdown-menu-trigger-width] rounded-lg",
                        side: unref(isMobile) ? "bottom" : unref(direction) === "rtl" ? "left" : "right",
                        align: "end"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenuLabel, { class: "p-0 font-normal" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-start text-sm" }, [
                                createVNode(_component_Avatar, { class: "h-8 w-8 rounded-lg" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: __props.user.avatar,
                                      alt: __props.user.name
                                    }, null, 8, ["src", "alt"]),
                                    createVNode(_component_AvatarFallback, { class: "rounded-lg" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(__props.user.name.split(" ").map((n) => n[0]).join("")), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "grid flex-1 text-start text-sm leading-tight" }, [
                                  createVNode("span", { class: "truncate font-semibold" }, toDisplayString(__props.user.name), 1),
                                  createVNode("span", { class: "truncate text-xs text-muted-foreground" }, toDisplayString(__props.user.email), 1),
                                  __props.user.role ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "truncate text-[10px] text-muted-foreground/70"
                                  }, toDisplayString(__props.user.role), 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DropdownMenuSeparator),
                          createVNode(_component_DropdownMenuItem, { onClick: handleLogout }, {
                            default: withCtx(() => [
                              createVNode(_component_Icon, { name: "i-lucide-log-out" }),
                              createTextVNode(" Log out ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["side"])
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
      }, _parent));
      _push(ssrRenderComponent(_component_Dialog, {
        open: unref(showModalTheme),
        "onUpdate:open": ($event) => isRef(showModalTheme) ? showModalTheme.value = $event : null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_DialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_DialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Customize`);
                            } else {
                              return [
                                createTextVNode("Customize")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_DialogDescription, { class: "text-xs text-muted-foreground" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Customize &amp; Preview in Real Time `);
                            } else {
                              return [
                                createTextVNode(" Customize & Preview in Real Time ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_DialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Customize")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_DialogDescription, { class: "text-xs text-muted-foreground" }, {
                            default: withCtx(() => [
                              createTextVNode(" Customize & Preview in Real Time ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ThemeCustomize, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_DialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Customize")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_DialogDescription, { class: "text-xs text-muted-foreground" }, {
                          default: withCtx(() => [
                            createTextVNode(" Customize & Preview in Real Time ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ThemeCustomize)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_DialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_DialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_DialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Customize")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_DialogDescription, { class: "text-xs text-muted-foreground" }, {
                        default: withCtx(() => [
                          createTextVNode(" Customize & Preview in Real Time ")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_ThemeCustomize)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SidebarNavFooter.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$4, { __name: "LayoutSidebarNavFooter" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    function resolveNavItemComponent(item) {
      if ("children" in item)
        return __nuxt_component_0;
      return __nuxt_component_1$1;
    }
    const { t } = useLocale();
    function getHeading(nav) {
      return nav.headingKey ? t(nav.headingKey) : nav.heading;
    }
    const teams = [
      {
        name: "ETG CRM",
        logo: "i-lucide-gallery-vertical-end",
        plan: "Enterprise"
      },
      {
        name: "Full Stack CRM",
        logo: "i-lucide-audio-waveform",
        plan: "Professional"
      },
      {
        name: "Demo Workspace",
        logo: "i-lucide-command",
        plan: "Free"
      }
    ];
    const { user: authUser } = useAuth();
    const store = useDashboardStore();
    store.init();
    const { resolve: resolveLang } = useAppLanguage();
    const userRole = computed(() => {
      const email = (authUser.value?.email || "").toLowerCase();
      const name = (authUser.value?.name || "").trim();
      if (!email && !name) return "";
      const found = store.users.value.find(
        (u) => email && (u.email || "").toLowerCase() === email || name && (u.A2 || "").trim() === name
      );
      if (!found) return "";
      const rawCode = found.A200_raw || found.A200;
      return rawCode ? resolveLang(rawCode) : "";
    });
    const user = computed(() => ({
      name: authUser.value?.name || "User",
      email: authUser.value?.email || "",
      role: userRole.value,
      avatar: authUser.value?.picture || ""
    }));
    const { sidebar } = useAppSettings();
    const { lang: appLang, setLang, init: initLang } = useAppLanguage();
    initLang();
    function setAppLang(l) {
      setLang(l);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Sidebar = _sfc_main$x;
      const _component_SidebarHeader = _sfc_main$q;
      const _component_LayoutSidebarNavHeader = __nuxt_component_4;
      const _component_Search = __nuxt_component_5;
      const _component_SidebarContent = _sfc_main$w;
      const _component_SidebarGroup = _sfc_main$u;
      const _component_SidebarGroupLabel = _sfc_main$r;
      const _component_SidebarFooter = _sfc_main$v;
      const _component_LayoutSidebarNavFooter = __nuxt_component_10;
      const _component_SidebarRail = _sfc_main$c;
      _push(ssrRenderComponent(_component_Sidebar, mergeProps({
        collapsible: unref(sidebar)?.collapsible,
        side: unref(sidebar)?.side,
        variant: unref(sidebar)?.variant
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_SidebarHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSidebarNavHeader, { teams }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Search, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutSidebarNavHeader, { teams }),
                    createVNode(_component_Search)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SidebarContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(navMenu), (nav, indexGroup) => {
                    _push3(ssrRenderComponent(_component_SidebarGroup, { key: indexGroup }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (nav.heading) {
                            _push4(ssrRenderComponent(_component_SidebarGroupLabel, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(getHeading(nav))}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(getHeading(nav)), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<!--[-->`);
                          ssrRenderList(nav.items, (item, index) => {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(resolveNavItemComponent(item)), {
                              key: index,
                              item
                            }, null), _parent4, _scopeId3);
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            nav.heading ? (openBlock(), createBlock(_component_SidebarGroupLabel, { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getHeading(nav)), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(nav.items, (item, index) => {
                              return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                                key: index,
                                item
                              }, null, 8, ["item"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_SidebarGroup, { class: "mt-auto" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="px-3 py-2" dir="ltr"${_scopeId3}><div class="relative flex rounded-lg bg-muted/60 p-1 ring-1 ring-border/40"${_scopeId3}><div class="${ssrRenderClass([unref(appLang) === "ar" ? "left-[calc(50%+2px)]" : "left-1", "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 ease-out"])}"${_scopeId3}></div><button class="${ssrRenderClass([unref(appLang) === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70", "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200"])}"${_scopeId3}><span class="text-base leading-none"${_scopeId3}>🇬🇧</span><span${_scopeId3}>EN</span></button><button class="${ssrRenderClass([unref(appLang) === "ar" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70", "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200"])}"${_scopeId3}><span class="text-base leading-none"${_scopeId3}>🇸🇦</span><span${_scopeId3}>AR</span></button></div></div><!--[-->`);
                        ssrRenderList(unref(navMenuBottom), (item, index) => {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(resolveNavItemComponent(item)), {
                            key: index,
                            item,
                            size: "sm"
                          }, null), _parent4, _scopeId3);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "px-3 py-2",
                            dir: "ltr"
                          }, [
                            createVNode("div", { class: "relative flex rounded-lg bg-muted/60 p-1 ring-1 ring-border/40" }, [
                              createVNode("div", {
                                class: ["absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 ease-out", unref(appLang) === "ar" ? "left-[calc(50%+2px)]" : "left-1"]
                              }, null, 2),
                              createVNode("button", {
                                class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                                onClick: ($event) => setAppLang("en")
                              }, [
                                createVNode("span", { class: "text-base leading-none" }, "🇬🇧"),
                                createVNode("span", null, "EN")
                              ], 10, ["onClick"]),
                              createVNode("button", {
                                class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "ar" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                                onClick: ($event) => setAppLang("ar")
                              }, [
                                createVNode("span", { class: "text-base leading-none" }, "🇸🇦"),
                                createVNode("span", null, "AR")
                              ], 10, ["onClick"])
                            ])
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(navMenuBottom), (item, index) => {
                            return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                              key: index,
                              item,
                              size: "sm"
                            }, null, 8, ["item"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(navMenu), (nav, indexGroup) => {
                      return openBlock(), createBlock(_component_SidebarGroup, { key: indexGroup }, {
                        default: withCtx(() => [
                          nav.heading ? (openBlock(), createBlock(_component_SidebarGroupLabel, { key: 0 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getHeading(nav)), 1)
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(nav.items, (item, index) => {
                            return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                              key: index,
                              item
                            }, null, 8, ["item"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    createVNode(_component_SidebarGroup, { class: "mt-auto" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "px-3 py-2",
                          dir: "ltr"
                        }, [
                          createVNode("div", { class: "relative flex rounded-lg bg-muted/60 p-1 ring-1 ring-border/40" }, [
                            createVNode("div", {
                              class: ["absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 ease-out", unref(appLang) === "ar" ? "left-[calc(50%+2px)]" : "left-1"]
                            }, null, 2),
                            createVNode("button", {
                              class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                              onClick: ($event) => setAppLang("en")
                            }, [
                              createVNode("span", { class: "text-base leading-none" }, "🇬🇧"),
                              createVNode("span", null, "EN")
                            ], 10, ["onClick"]),
                            createVNode("button", {
                              class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "ar" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                              onClick: ($event) => setAppLang("ar")
                            }, [
                              createVNode("span", { class: "text-base leading-none" }, "🇸🇦"),
                              createVNode("span", null, "AR")
                            ], 10, ["onClick"])
                          ])
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(navMenuBottom), (item, index) => {
                          return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                            key: index,
                            item,
                            size: "sm"
                          }, null, 8, ["item"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SidebarFooter, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSidebarNavFooter, { user: unref(user) }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutSidebarNavFooter, { user: unref(user) }, null, 8, ["user"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_SidebarRail, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_SidebarHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSidebarNavHeader, { teams }),
                  createVNode(_component_Search)
                ]),
                _: 1
              }),
              createVNode(_component_SidebarContent, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(navMenu), (nav, indexGroup) => {
                    return openBlock(), createBlock(_component_SidebarGroup, { key: indexGroup }, {
                      default: withCtx(() => [
                        nav.heading ? (openBlock(), createBlock(_component_SidebarGroupLabel, { key: 0 }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getHeading(nav)), 1)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(nav.items, (item, index) => {
                          return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                            key: index,
                            item
                          }, null, 8, ["item"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  createVNode(_component_SidebarGroup, { class: "mt-auto" }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "px-3 py-2",
                        dir: "ltr"
                      }, [
                        createVNode("div", { class: "relative flex rounded-lg bg-muted/60 p-1 ring-1 ring-border/40" }, [
                          createVNode("div", {
                            class: ["absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 ease-out", unref(appLang) === "ar" ? "left-[calc(50%+2px)]" : "left-1"]
                          }, null, 2),
                          createVNode("button", {
                            class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                            onClick: ($event) => setAppLang("en")
                          }, [
                            createVNode("span", { class: "text-base leading-none" }, "🇬🇧"),
                            createVNode("span", null, "EN")
                          ], 10, ["onClick"]),
                          createVNode("button", {
                            class: ["relative z-10 flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200", unref(appLang) === "ar" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"],
                            onClick: ($event) => setAppLang("ar")
                          }, [
                            createVNode("span", { class: "text-base leading-none" }, "🇸🇦"),
                            createVNode("span", null, "AR")
                          ], 10, ["onClick"])
                        ])
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(navMenuBottom), (item, index) => {
                        return openBlock(), createBlock(resolveDynamicComponent(resolveNavItemComponent(item)), {
                          key: index,
                          item,
                          size: "sm"
                        }, null, 8, ["item"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_SidebarFooter, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSidebarNavFooter, { user: unref(user) }, null, 8, ["user"])
                ]),
                _: 1
              }),
              createVNode(_component_SidebarRail)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/AppSidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$3, { __name: "LayoutAppSidebar" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SyncProgress",
  __ssrInlineRender: true,
  setup(__props) {
    const { syncState } = useSyncProgress();
    const elapsed = ref("");
    const statusIcon = computed(() => {
      if (syncState.error) return "i-lucide-alert-triangle";
      if (syncState.percent >= 100) return "i-lucide-check-circle-2";
      return "i-lucide-loader";
    });
    const statusColor = computed(() => {
      if (syncState.error) return "text-red-500";
      if (syncState.percent >= 100) return "text-emerald-500";
      return "text-blue-500";
    });
    const barColor = computed(() => {
      if (syncState.error) return "bg-red-500";
      if (syncState.percent >= 100) return "bg-emerald-500";
      return "bg-blue-500";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_2;
      if (unref(syncState).active) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2.5 px-3 py-1.5 rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm max-w-md" }, _attrs))} data-v-6545b02b>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(statusIcon),
          class: ["size-4 shrink-0", [unref(statusColor), { "animate-spin": !unref(syncState).error && unref(syncState).percent < 100 }]]
        }, null, _parent));
        _push(`<div class="flex-1 min-w-0" data-v-6545b02b><div class="flex items-center gap-1.5" data-v-6545b02b><span class="text-[11px] font-semibold truncate" data-v-6545b02b>${ssrInterpolate(unref(syncState).currentStep + 1)}/${ssrInterpolate(unref(syncState).totalSteps)}: ${ssrInterpolate(unref(syncState).currentLabel)}</span><span class="${ssrRenderClass([unref(statusColor), "text-[10px] font-bold tabular-nums shrink-0"])}" data-v-6545b02b>${ssrInterpolate(unref(syncState).percent)}% </span></div><div class="h-1 bg-muted rounded-full overflow-hidden mt-1 w-full min-w-[120px]" data-v-6545b02b><div class="${ssrRenderClass([unref(barColor), "h-full rounded-full transition-all duration-500 ease-out"])}" style="${ssrRenderStyle({ width: `${unref(syncState).percent}%` })}" data-v-6545b02b></div></div><div class="flex items-center gap-2 mt-0.5" data-v-6545b02b><span class="text-[9px] text-muted-foreground tabular-nums" data-v-6545b02b>${ssrInterpolate(unref(syncState).rowsFetched.toLocaleString())} rows </span>`);
        if (unref(elapsed)) {
          _push(`<span class="text-[9px] text-muted-foreground/60 tabular-nums" data-v-6545b02b>${ssrInterpolate(unref(elapsed))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(syncState).error) {
          _push(`<span class="text-[9px] text-red-500 truncate" data-v-6545b02b>${ssrInterpolate(unref(syncState).error)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SyncProgress.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-6545b02b"]]), { __name: "LayoutSyncProgress" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { headerState, clearHeader } = usePageHeader();
    const { t } = useLocale();
    watch(() => route.fullPath, () => {
      clearHeader();
    });
    const fallbackTitle = computed(() => {
      if (route.fullPath === "/")
        return t("nav.dashboard");
      const segments = route.fullPath.split("/").filter((s) => s !== "");
      const last = segments[segments.length - 1] || "";
      return last.replace(/-/g, " ").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    });
    const displayTitle = computed(() => {
      if (headerState.titleKey)
        return t(headerState.titleKey);
      return headerState.title || fallbackTitle.value;
    });
    const displayDescription = computed(() => {
      if (headerState.descriptionKey)
        return t(headerState.descriptionKey);
      return headerState.description || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarTrigger = _sfc_main$a;
      const _component_Separator = _sfc_main$B;
      const _component_Icon = __nuxt_component_2;
      const _component_LayoutSyncProgress = __nuxt_component_3$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 md:peer-data-[variant=inset]:top-2 z-10 flex items-center gap-4 border-b bg-background px-4 md:px-6 md:rounded-tl-xl md:rounded-tr-xl min-h-(--header-height)" }, _attrs))}><div class="flex items-center gap-4 min-w-0 shrink-0">`);
      _push(ssrRenderComponent(_component_SidebarTrigger, null, null, _parent));
      _push(ssrRenderComponent(_component_Separator, {
        orientation: "vertical",
        class: "h-4"
      }, null, _parent));
      _push(`<div class="flex items-center gap-2.5 min-w-0">`);
      if (unref(headerState).icon) {
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(headerState).icon,
          class: "size-5 shrink-0 text-primary"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="min-w-0"><div class="flex items-center gap-1.5"><h1 class="text-sm font-semibold leading-tight truncate">${ssrInterpolate(unref(displayTitle))}</h1>`);
      if (unref(displayDescription)) {
        _push(`<!--[--><span class="text-muted-foreground text-sm hidden md:inline">/</span><p class="text-sm text-muted-foreground leading-tight truncate hidden md:block">${ssrInterpolate(unref(displayDescription))}</p><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div id="header-toolbar" class="flex-1 flex items-center justify-end gap-2 min-w-0">`);
      _push(ssrRenderComponent(_component_LayoutSyncProgress, null, null, _parent));
      _push(`</div><div class="flex items-center gap-2 shrink-0">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "LayoutHeader" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SidebarProvider = _sfc_main$d;
  const _component_LayoutAppSidebar = __nuxt_component_1;
  const _component_SidebarInset = _sfc_main$o;
  const _component_LayoutHeader = __nuxt_component_3;
  _push(ssrRenderComponent(_component_SidebarProvider, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_LayoutAppSidebar, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_SidebarInset, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_LayoutHeader, null, null, _parent3, _scopeId2));
              _push3(`<div class="flex flex-col flex-1 min-h-0 overflow-hidden"${_scopeId2}><div class="@container/main flex-1 min-h-0 p-4 flex flex-col"${_scopeId2}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
              _push3(`</div></div>`);
            } else {
              return [
                createVNode(_component_LayoutHeader),
                createVNode("div", { class: "flex flex-col flex-1 min-h-0 overflow-hidden" }, [
                  createVNode("div", { class: "@container/main flex-1 min-h-0 p-4 flex flex-col" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ])
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_LayoutAppSidebar),
          createVNode(_component_SidebarInset, null, {
            default: withCtx(() => [
              createVNode(_component_LayoutHeader),
              createVNode("div", { class: "flex flex-col flex-1 min-h-0 overflow-hidden" }, [
                createVNode("div", { class: "@container/main flex-1 min-h-0 p-4 flex flex-col" }, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ])
            ]),
            _: 3
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-aTa6HplK.mjs.map
