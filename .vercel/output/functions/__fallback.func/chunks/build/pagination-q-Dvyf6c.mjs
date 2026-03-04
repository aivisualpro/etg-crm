import { _ as _sfc_main$9 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, m as reactiveOmit, e as cn, w as buttonVariants } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$a, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, defineComponent, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, PaginationRoot, useForwardProps, PaginationFirst, PaginationEllipsis, PaginationNext, PaginationLast, PaginationList, PaginationListItem, PaginationPrev } from 'reka-ui';
import { ChevronLeftIcon, MoreHorizontal, ChevronRightIcon } from 'lucide-vue-next';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    page: {},
    defaultPage: {},
    itemsPerPage: {},
    total: {},
    siblingCount: {},
    disabled: { type: Boolean },
    showEdges: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:page"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationRoot), mergeProps({ "data-slot": "pagination" }, unref(forwarded), {
        class: unref(cn)("mx-auto flex w-full justify-center", props.class)
      }, _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/Pagination.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PaginationContent",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationList), mergeProps({ "data-slot": "pagination-content" }, unref(delegatedProps), {
        class: unref(cn)("flex flex-row items-center gap-1", props.class)
      }, _attrs), {
        default: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", slotProps, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", slotProps)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "PaginationEllipsis",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationEllipsis), mergeProps({ "data-slot": "pagination-ellipsis" }, unref(delegatedProps), {
        class: unref(cn)("flex size-9 items-center justify-center", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(MoreHorizontal), { class: "size-4" }, null, _parent2, _scopeId));
              _push2(`<span class="sr-only"${_scopeId}>More pages</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(MoreHorizontal), { class: "size-4" }),
                createVNode("span", { class: "sr-only" }, "More pages")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationEllipsis.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PaginationFirst",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    size: { default: "default" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationFirst), mergeProps({
        "data-slot": "pagination-first",
        class: unref(cn)(unref(buttonVariants)({ variant: "ghost", size: __props.size }), "gap-1 px-2.5 sm:pr-2.5", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent2, _scopeId));
              _push2(`<span class="hidden sm:block"${_scopeId}>First</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronLeftIcon)),
                createVNode("span", { class: "hidden sm:block" }, "First")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationFirst.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PaginationItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    asChild: { type: Boolean },
    as: {},
    size: { default: "icon" },
    class: {},
    isActive: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size", "isActive");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationListItem), mergeProps({ "data-slot": "pagination-item" }, unref(delegatedProps), {
        class: unref(cn)(
          unref(buttonVariants)({
            variant: __props.isActive ? "outline" : "ghost",
            size: __props.size
          }),
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PaginationLast",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    size: { default: "default" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationLast), mergeProps({
        "data-slot": "pagination-last",
        class: unref(cn)(unref(buttonVariants)({ variant: "ghost", size: __props.size }), "gap-1 px-2.5 sm:pr-2.5", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`<span class="hidden sm:block"${_scopeId}>Last</span>`);
              _push2(ssrRenderComponent(unref(ChevronRightIcon), null, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode("span", { class: "hidden sm:block" }, "Last"),
                createVNode(unref(ChevronRightIcon))
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationLast.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PaginationNext",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    size: { default: "default" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationNext), mergeProps({
        "data-slot": "pagination-next",
        class: unref(cn)(unref(buttonVariants)({ variant: "ghost", size: __props.size }), "gap-1 px-2.5 sm:pr-2.5", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`<span class="hidden sm:block"${_scopeId}>Next</span>`);
              _push2(ssrRenderComponent(unref(ChevronRightIcon), null, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode("span", { class: "hidden sm:block" }, "Next"),
                createVNode(unref(ChevronRightIcon))
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationNext.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaginationPrevious",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    size: { default: "default" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "size");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(PaginationPrev), mergeProps({
        "data-slot": "pagination-previous",
        class: unref(cn)(unref(buttonVariants)({ variant: "ghost", size: __props.size }), "gap-1 px-2.5 sm:pr-2.5", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronLeftIcon), null, null, _parent2, _scopeId));
              _push2(`<span class="hidden sm:block"${_scopeId}>Previous</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronLeftIcon)),
                createVNode("span", { class: "hidden sm:block" }, "Previous")
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/pagination/PaginationPrevious.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$9;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6$1;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$a;
  const _component_CardContent = _sfc_main$4$1;
  const _component_Pagination = _sfc_main$8;
  const _component_PaginationList = resolveComponent("PaginationList");
  const _component_PaginationFirst = _sfc_main$5;
  const _component_PaginationPrev = resolveComponent("PaginationPrev");
  const _component_PaginationListItem = resolveComponent("PaginationListItem");
  const _component_Button = _sfc_main$2$1;
  const _component_PaginationEllipsis = _sfc_main$6;
  const _component_PaginationNext = _sfc_main$2;
  const _component_PaginationLast = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Pagination </h2><p class="text-muted-foreground"> Displays data in paged format and provides navigation between pages. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/pagination",
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
            to: "https://www.shadcn-vue.com/docs/components/pagination",
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
          to: "https://www.reka-ui.com/docs/components/pagination",
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
            to: "https://www.reka-ui.com/docs/components/pagination",
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
              _push3(ssrRenderComponent(_component_Pagination, {
                total: 100,
                "sibling-count": 1,
                "show-edges": "",
                "default-page": 2
              }, {
                default: withCtx(({ page }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PaginationList, { class: "flex items-center gap-1" }, {
                      default: withCtx(({ items }, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_PaginationFirst, null, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_PaginationPrev, null, null, _parent5, _scopeId4));
                          _push5(`<!--[-->`);
                          ssrRenderList(items, (item, index) => {
                            _push5(`<!--[-->`);
                            if (item.type === "page") {
                              _push5(ssrRenderComponent(_component_PaginationListItem, {
                                key: index,
                                value: item.value,
                                "as-child": ""
                              }, {
                                default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Button, {
                                      class: "h-9 w-9 p-0",
                                      variant: item.value === page ? "default" : "outline"
                                    }, {
                                      default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(item.value)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(item.value), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Button, {
                                        class: "h-9 w-9 p-0",
                                        variant: item.value === page ? "default" : "outline"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.value), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              _push5(ssrRenderComponent(_component_PaginationEllipsis, {
                                key: item.type,
                                index
                              }, null, _parent5, _scopeId4));
                            }
                            _push5(`<!--]-->`);
                          });
                          _push5(`<!--]-->`);
                          _push5(ssrRenderComponent(_component_PaginationNext, null, null, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_PaginationLast, null, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_PaginationFirst),
                            createVNode(_component_PaginationPrev),
                            (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                              return openBlock(), createBlock(Fragment, null, [
                                item.type === "page" ? (openBlock(), createBlock(_component_PaginationListItem, {
                                  key: index,
                                  value: item.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      class: "h-9 w-9 p-0",
                                      variant: item.value === page ? "default" : "outline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.value), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant"])
                                  ]),
                                  _: 2
                                }, 1032, ["value"])) : (openBlock(), createBlock(_component_PaginationEllipsis, {
                                  key: item.type,
                                  index
                                }, null, 8, ["index"]))
                              ], 64);
                            }), 256)),
                            createVNode(_component_PaginationNext),
                            createVNode(_component_PaginationLast)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PaginationList, { class: "flex items-center gap-1" }, {
                        default: withCtx(({ items }) => [
                          createVNode(_component_PaginationFirst),
                          createVNode(_component_PaginationPrev),
                          (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                            return openBlock(), createBlock(Fragment, null, [
                              item.type === "page" ? (openBlock(), createBlock(_component_PaginationListItem, {
                                key: index,
                                value: item.value,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    class: "h-9 w-9 p-0",
                                    variant: item.value === page ? "default" : "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.value), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                _: 2
                              }, 1032, ["value"])) : (openBlock(), createBlock(_component_PaginationEllipsis, {
                                key: item.type,
                                index
                              }, null, 8, ["index"]))
                            ], 64);
                          }), 256)),
                          createVNode(_component_PaginationNext),
                          createVNode(_component_PaginationLast)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_Pagination, {
                    total: 100,
                    "sibling-count": 1,
                    "show-edges": "",
                    "default-page": 2
                  }, {
                    default: withCtx(({ page }) => [
                      createVNode(_component_PaginationList, { class: "flex items-center gap-1" }, {
                        default: withCtx(({ items }) => [
                          createVNode(_component_PaginationFirst),
                          createVNode(_component_PaginationPrev),
                          (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                            return openBlock(), createBlock(Fragment, null, [
                              item.type === "page" ? (openBlock(), createBlock(_component_PaginationListItem, {
                                key: index,
                                value: item.value,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    class: "h-9 w-9 p-0",
                                    variant: item.value === page ? "default" : "outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.value), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant"])
                                ]),
                                _: 2
                              }, 1032, ["value"])) : (openBlock(), createBlock(_component_PaginationEllipsis, {
                                key: item.type,
                                index
                              }, null, 8, ["index"]))
                            ], 64);
                          }), 256)),
                          createVNode(_component_PaginationNext),
                          createVNode(_component_PaginationLast)
                        ]),
                        _: 2
                      }, 1024)
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
                createVNode(_component_Pagination, {
                  total: 100,
                  "sibling-count": 1,
                  "show-edges": "",
                  "default-page": 2
                }, {
                  default: withCtx(({ page }) => [
                    createVNode(_component_PaginationList, { class: "flex items-center gap-1" }, {
                      default: withCtx(({ items }) => [
                        createVNode(_component_PaginationFirst),
                        createVNode(_component_PaginationPrev),
                        (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                          return openBlock(), createBlock(Fragment, null, [
                            item.type === "page" ? (openBlock(), createBlock(_component_PaginationListItem, {
                              key: index,
                              value: item.value,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Button, {
                                  class: "h-9 w-9 p-0",
                                  variant: item.value === page ? "default" : "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.value), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["variant"])
                              ]),
                              _: 2
                            }, 1032, ["value"])) : (openBlock(), createBlock(_component_PaginationEllipsis, {
                              key: item.type,
                              index
                            }, null, 8, ["index"]))
                          ], 64);
                        }), 256)),
                        createVNode(_component_PaginationNext),
                        createVNode(_component_PaginationLast)
                      ]),
                      _: 2
                    }, 1024)
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { pagination as default };
//# sourceMappingURL=pagination-q-Dvyf6c.mjs.map
