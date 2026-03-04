import { _ as _sfc_main$3 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$4, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, createBlock, openBlock, Fragment, renderList, toDisplayString, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui';
import { _ as _sfc_main$5 } from './Separator-D0XHHfBk.mjs';
import 'class-variance-authority';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ScrollBar",
  __ssrInlineRender: true,
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaScrollbar), mergeProps({ "data-slot": "scroll-area-scrollbar" }, unref(delegatedProps), {
        class: unref(cn)(
          "flex touch-none p-px transition-colors select-none",
          __props.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
          __props.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaThumb), {
              "data-slot": "scroll-area-thumb",
              class: "bg-border relative flex-1 rounded-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaThumb), {
                "data-slot": "scroll-area-thumb",
                class: "bg-border relative flex-1 rounded-full"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/scroll-area/ScrollBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScrollArea",
  __ssrInlineRender: true,
  props: {
    type: {},
    dir: {},
    scrollHideDelay: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ScrollAreaRoot), mergeProps({ "data-slot": "scroll-area" }, unref(delegatedProps), {
        class: unref(cn)("relative", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ScrollAreaViewport), {
              "data-slot": "scroll-area-viewport",
              class: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ScrollAreaCorner), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ScrollAreaViewport), {
                "data-slot": "scroll-area-viewport",
                class: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(_sfc_main$2),
              createVNode(unref(ScrollAreaCorner))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/scroll-area/ScrollArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "scroll-area",
  __ssrInlineRender: true,
  setup(__props) {
    const tags = Array.from({ length: 50 }).map(
      (_, i, a) => `v1.2.0-beta.${a.length - i}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$4;
      const _component_CardContent = _sfc_main$4$1;
      const _component_ScrollArea = _sfc_main$1;
      const _component_Separator = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Scroll-area </h2><p class="text-muted-foreground"> Augments native scroll functionality for custom, cross-browser styling. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/scroll-area",
              external: "",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Component Source `);
                  _push3(ssrRenderComponent(_component_Icon, { name: "tabler:arrow-up-right" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Component Source "),
                    createVNode(_component_Icon, { name: "tabler:arrow-up-right" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "https://www.shadcn-vue.com/docs/components/scroll-area",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Component Source "),
                  createVNode(_component_Icon, { name: "tabler:arrow-up-right" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.reka-ui.com/docs/components/scroll-area",
              external: "",
              target: "_blank"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` API Reference `);
                  _push3(ssrRenderComponent(_component_Icon, { name: "tabler:arrow-up-right" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" API Reference "),
                    createVNode(_component_Icon, { name: "tabler:arrow-up-right" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "https://www.reka-ui.com/docs/components/scroll-area",
                external: "",
                target: "_blank"
              }, {
                default: withCtx(() => [
                  createTextVNode(" API Reference "),
                  createVNode(_component_Icon, { name: "tabler:arrow-up-right" })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid gap-4 md:grid-cols-2">`);
      _push(ssrRenderComponent(_component_Card, { class: "w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Basic`);
                      } else {
                        return [
                          createTextVNode("Basic")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Basic")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ScrollArea, { class: "h-72 w-48 border rounded-md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-4"${_scopeId3}><h4 class="mb-4 text-sm font-medium leading-none"${_scopeId3}> Tags </h4><!--[-->`);
                        ssrRenderList(unref(tags), (tag) => {
                          _push4(`<div${_scopeId3}><div class="text-sm"${_scopeId3}>${ssrInterpolate(tag)}</div>`);
                          _push4(ssrRenderComponent(_component_Separator, { class: "my-2" }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h4", { class: "mb-4 text-sm font-medium leading-none" }, " Tags "),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag) => {
                              return openBlock(), createBlock("div", { key: tag }, [
                                createVNode("div", { class: "text-sm" }, toDisplayString(tag), 1),
                                createVNode(_component_Separator, { class: "my-2" })
                              ]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode(_component_ScrollArea, { class: "h-72 w-48 border rounded-md" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-4" }, [
                            createVNode("h4", { class: "mb-4 text-sm font-medium leading-none" }, " Tags "),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag) => {
                              return openBlock(), createBlock("div", { key: tag }, [
                                createVNode("div", { class: "text-sm" }, toDisplayString(tag), 1),
                                createVNode(_component_Separator, { class: "my-2" })
                              ]);
                            }), 128))
                          ])
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
              createVNode(_component_CardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_CardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Basic")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                    createVNode(_component_ScrollArea, { class: "h-72 w-48 border rounded-md" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-4" }, [
                          createVNode("h4", { class: "mb-4 text-sm font-medium leading-none" }, " Tags "),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(tags), (tag) => {
                            return openBlock(), createBlock("div", { key: tag }, [
                              createVNode("div", { class: "text-sm" }, toDisplayString(tag), 1),
                              createVNode(_component_Separator, { class: "my-2" })
                            ]);
                          }), 128))
                        ])
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/scroll-area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=scroll-area-CIO3x-C0.mjs.map
