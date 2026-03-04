import { _ as _sfc_main$b } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, e as cn } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$c, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { cva } from 'class-variance-authority';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { _ as _sfc_main$e } from './Separator-D0XHHfBk.mjs';
import { _ as _sfc_main$2$2, b as _sfc_main$d, a as _sfc_main$1$2 } from './AvatarImage-B6YLb4UI.mjs';
import { BadgeCheckIcon, ChevronRightIcon, Plus } from 'lucide-vue-next';
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

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "div" },
    class: {},
    variant: {},
    size: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "item",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(unref(itemVariants)({ variant: __props.variant, size: __props.size }), props.class)
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/Item.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "ItemActions",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-actions",
        class: unref(cn)("flex items-center gap-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemActions.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ItemContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-content",
        class: unref(cn)("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemContent.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ItemDescription",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        "data-slot": "item-description",
        class: unref(cn)(
          "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
          "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemDescription.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ItemFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-footer",
        class: unref(cn)("flex basis-full items-center justify-between gap-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemFooter.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ItemGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "list",
        "data-slot": "item-group",
        class: unref(cn)("group/item-group flex flex-col", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemGroup.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ItemHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-header",
        class: unref(cn)("flex basis-full items-center justify-between gap-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ItemMedia",
  __ssrInlineRender: true,
  props: {
    class: {},
    variant: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-media",
        "data-variant": props.variant,
        class: unref(cn)(unref(itemMediaVariants)({ variant: __props.variant }), props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemMedia.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ItemSeparator",
  __ssrInlineRender: true,
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$e), mergeProps({
        "data-slot": "item-separator",
        orientation: "horizontal",
        class: unref(cn)("my-0", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemSeparator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ItemTitle",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "item-title",
        class: unref(cn)("flex w-fit items-center gap-2 text-sm leading-snug font-medium", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/item/ItemTitle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const itemVariants = cva(
  "group/item flex items-center border border-transparent text-sm rounded-md transition-colors [a]:hover:bg-accent/50 [a]:transition-colors duration-100 flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50"
      },
      size: {
        default: "p-4 gap-4 ",
        sm: "py-3 px-4 gap-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$b;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6$1;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$c;
      const _component_CardContent = _sfc_main$4$1;
      const _component_Item = _sfc_main$a;
      const _component_ItemContent = _sfc_main$8;
      const _component_ItemTitle = _sfc_main$1;
      const _component_ItemDescription = _sfc_main$7;
      const _component_ItemActions = _sfc_main$9;
      const _component_Button = _sfc_main$2$1;
      const _component_ItemMedia = _sfc_main$3;
      const _component_Avatar = _sfc_main$2$2;
      const _component_AvatarImage = _sfc_main$d;
      const _component_AvatarFallback = _sfc_main$1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Item </h2><p class="text-muted-foreground"> A versatile component that you can use to display any content. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/item",
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
                to: "https://www.shadcn-vue.com/docs/components/item",
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
                  _push3(`<div class="flex w-full max-w-md flex-col gap-6 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Item, { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Basic Item`);
                                  } else {
                                    return [
                                      createTextVNode("Basic Item")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` A simple item with title and description. `);
                                  } else {
                                    return [
                                      createTextVNode(" A simple item with title and description. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Basic Item")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" A simple item with title and description. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Action `);
                                  } else {
                                    return [
                                      createTextVNode(" Action ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Action ")
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
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Basic Item")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" A simple item with title and description. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Action ")
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
                  _push3(ssrRenderComponent(_component_Item, {
                    variant: "outline",
                    size: "sm",
                    "as-child": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a href="#"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_ItemMedia, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(BadgeCheckIcon), { class: "size-5" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Your profile has been verified.`);
                                  } else {
                                    return [
                                      createTextVNode("Your profile has been verified.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(ChevronRightIcon), { class: "size-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</a>`);
                      } else {
                        return [
                          createVNode("a", { href: "#" }, [
                            createVNode(_component_ItemMedia, null, {
                              default: withCtx(() => [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemActions, null, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex w-full max-w-md flex-col gap-6 mx-auto" }, [
                      createVNode(_component_Item, { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Basic Item")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" A simple item with title and description. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Action ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Item, {
                        variant: "outline",
                        size: "sm",
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode("a", { href: "#" }, [
                            createVNode(_component_ItemMedia, null, {
                              default: withCtx(() => [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemActions, null, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ]),
                              _: 1
                            })
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
                  createVNode("div", { class: "flex w-full max-w-md flex-col gap-6 mx-auto" }, [
                    createVNode(_component_Item, { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Basic Item")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" A simple item with title and description. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Action ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Item, {
                      variant: "outline",
                      size: "sm",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode("a", { href: "#" }, [
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Your profile has been verified.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(unref(ChevronRightIcon), { class: "size-4" })
                            ]),
                            _: 1
                          })
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
      _push(ssrRenderComponent(_component_Card, { class: "w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Variants`);
                      } else {
                        return [
                          createTextVNode("Variants")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Variants")
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
                  _push3(`<div class="flex flex-col gap-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Default Variant`);
                                  } else {
                                    return [
                                      createTextVNode("Default Variant")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Standard styling with subtle background and borders. `);
                                  } else {
                                    return [
                                      createTextVNode(" Standard styling with subtle background and borders. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Default Variant")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Standard styling with subtle background and borders. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Open `);
                                  } else {
                                    return [
                                      createTextVNode(" Open ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Open ")
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
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Default Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Standard styling with subtle background and borders. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
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
                  _push3(ssrRenderComponent(_component_Item, { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Outline Variant`);
                                  } else {
                                    return [
                                      createTextVNode("Outline Variant")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Outlined style with clear borders and transparent background. `);
                                  } else {
                                    return [
                                      createTextVNode(" Outlined style with clear borders and transparent background. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Outline Variant")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Outlined style with clear borders and transparent background. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Open `);
                                  } else {
                                    return [
                                      createTextVNode(" Open ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Open ")
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
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Outline Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Outlined style with clear borders and transparent background. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
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
                  _push3(ssrRenderComponent(_component_Item, { variant: "muted" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Muted Variant`);
                                  } else {
                                    return [
                                      createTextVNode("Muted Variant")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Subdued appearance with muted colors for secondary content. `);
                                  } else {
                                    return [
                                      createTextVNode(" Subdued appearance with muted colors for secondary content. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Muted Variant")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Subdued appearance with muted colors for secondary content. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Open `);
                                  } else {
                                    return [
                                      createTextVNode(" Open ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Open ")
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
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Muted Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Subdued appearance with muted colors for secondary content. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-6" }, [
                      createVNode(_component_Item, null, {
                        default: withCtx(() => [
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Default Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Standard styling with subtle background and borders. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Item, { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Outline Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Outlined style with clear borders and transparent background. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Item, { variant: "muted" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Muted Variant")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Subdued appearance with muted colors for secondary content. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Open ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
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
                      createTextVNode("Variants")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-6" }, [
                    createVNode(_component_Item, null, {
                      default: withCtx(() => [
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Default Variant")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Standard styling with subtle background and borders. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Open ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Item, { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Outline Variant")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Outlined style with clear borders and transparent background. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Open ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Item, { variant: "muted" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Muted Variant")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Subdued appearance with muted colors for secondary content. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Open ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
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
      _push(ssrRenderComponent(_component_Card, { class: "w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Size`);
                      } else {
                        return [
                          createTextVNode("Size")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Size")
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
                  _push3(`<div class="flex w-full max-w-md flex-col gap-6 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Item, { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Basic Item`);
                                  } else {
                                    return [
                                      createTextVNode("Basic Item")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` A simple item with title and description. `);
                                  } else {
                                    return [
                                      createTextVNode(" A simple item with title and description. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Basic Item")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" A simple item with title and description. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Action `);
                                  } else {
                                    return [
                                      createTextVNode(" Action ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Action ")
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
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Basic Item")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" A simple item with title and description. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Action ")
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
                  _push3(ssrRenderComponent(_component_Item, {
                    variant: "outline",
                    size: "sm",
                    "as-child": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<a href="#"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_ItemMedia, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(BadgeCheckIcon), { class: "size-5" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Your profile has been verified.`);
                                  } else {
                                    return [
                                      createTextVNode("Your profile has been verified.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(ChevronRightIcon), { class: "size-4" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</a>`);
                      } else {
                        return [
                          createVNode("a", { href: "#" }, [
                            createVNode(_component_ItemMedia, null, {
                              default: withCtx(() => [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemActions, null, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex w-full max-w-md flex-col gap-6 mx-auto" }, [
                      createVNode(_component_Item, { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Basic Item")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" A simple item with title and description. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Action ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Item, {
                        variant: "outline",
                        size: "sm",
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode("a", { href: "#" }, [
                            createVNode(_component_ItemMedia, null, {
                              default: withCtx(() => [
                                createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Your profile has been verified.")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemActions, null, {
                              default: withCtx(() => [
                                createVNode(unref(ChevronRightIcon), { class: "size-4" })
                              ]),
                              _: 1
                            })
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
                      createTextVNode("Size")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex w-full max-w-md flex-col gap-6 mx-auto" }, [
                    createVNode(_component_Item, { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Basic Item")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" A simple item with title and description. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Action ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Item, {
                      variant: "outline",
                      size: "sm",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode("a", { href: "#" }, [
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode(unref(BadgeCheckIcon), { class: "size-5" })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Your profile has been verified.")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(unref(ChevronRightIcon), { class: "size-4" })
                            ]),
                            _: 1
                          })
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
      _push(ssrRenderComponent(_component_Card, { class: "w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Avatar`);
                      } else {
                        return [
                          createTextVNode("Avatar")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Avatar")
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
                  _push3(`<div class="flex w-full max-w-lg flex-col gap-6 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Item, { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemMedia, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Avatar, { class: "size-10" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_AvatarFallback, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`ER`);
                                        } else {
                                          return [
                                            createTextVNode("ER")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("ER")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Avatar, { class: "size-10" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("ER")
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Evil Rabbit`);
                                  } else {
                                    return [
                                      createTextVNode("Evil Rabbit")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Last seen 5 months ago`);
                                  } else {
                                    return [
                                      createTextVNode("Last seen 5 months ago")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Evil Rabbit")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Last seen 5 months ago")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                size: "icon-sm",
                                variant: "outline",
                                class: "rounded-full",
                                "aria-label": "Invite"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Plus), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Plus))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  size: "icon-sm",
                                  variant: "outline",
                                  class: "rounded-full",
                                  "aria-label": "Invite"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus))
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
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode(_component_Avatar, { class: "size-10" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode("ER")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Evil Rabbit")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Last seen 5 months ago")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                size: "icon-sm",
                                variant: "outline",
                                class: "rounded-full",
                                "aria-label": "Invite"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus))
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
                  _push3(ssrRenderComponent(_component_Item, { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ItemMedia, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="*:ring-background flex -space-x-2 *:ring-2 *:grayscale"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Avatar, { class: "hidden sm:flex" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 1"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_AvatarFallback, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`CN`);
                                        } else {
                                          return [
                                            createTextVNode("CN")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 1"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("CN")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Avatar, { class: "hidden sm:flex" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 2"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_AvatarFallback, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`LR`);
                                        } else {
                                          return [
                                            createTextVNode("LR")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 2"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("LR")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Avatar, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 3"
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_AvatarFallback, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`ER`);
                                        } else {
                                          return [
                                            createTextVNode("ER")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 3"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("ER")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "*:ring-background flex -space-x-2 *:ring-2 *:grayscale" }, [
                                  createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 1"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("CN")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 2"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("LR")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Avatar, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_AvatarImage, {
                                        src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                        alt: "User 3"
                                      }),
                                      createVNode(_component_AvatarFallback, null, {
                                        default: withCtx(() => [
                                          createTextVNode("ER")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemContent, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ItemTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No Team Members`);
                                  } else {
                                    return [
                                      createTextVNode("No Team Members")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_ItemDescription, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Invite your team to collaborate on this project. `);
                                  } else {
                                    return [
                                      createTextVNode(" Invite your team to collaborate on this project. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("No Team Members")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ItemDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Invite your team to collaborate on this project. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ItemActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                size: "sm",
                                variant: "outline"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Invite `);
                                  } else {
                                    return [
                                      createTextVNode(" Invite ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  size: "sm",
                                  variant: "outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Invite ")
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
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "*:ring-background flex -space-x-2 *:ring-2 *:grayscale" }, [
                                createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 1"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("CN")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 2"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("LR")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Avatar, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 3"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("ER")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("No Team Members")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Invite your team to collaborate on this project. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                size: "sm",
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Invite ")
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
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex w-full max-w-lg flex-col gap-6 mx-auto" }, [
                      createVNode(_component_Item, { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode(_component_Avatar, { class: "size-10" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode("ER")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Evil Rabbit")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode("Last seen 5 months ago")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                size: "icon-sm",
                                variant: "outline",
                                class: "rounded-full",
                                "aria-label": "Invite"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Plus))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Item, { variant: "outline" }, {
                        default: withCtx(() => [
                          createVNode(_component_ItemMedia, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "*:ring-background flex -space-x-2 *:ring-2 *:grayscale" }, [
                                createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 1"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("CN")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 2"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("LR")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Avatar, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_AvatarImage, {
                                      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                      alt: "User 3"
                                    }),
                                    createVNode(_component_AvatarFallback, null, {
                                      default: withCtx(() => [
                                        createTextVNode("ER")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_ItemTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("No Team Members")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ItemDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Invite your team to collaborate on this project. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ItemActions, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                size: "sm",
                                variant: "outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Invite ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
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
                      createTextVNode("Avatar")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex w-full max-w-lg flex-col gap-6 mx-auto" }, [
                    createVNode(_component_Item, { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemMedia, null, {
                          default: withCtx(() => [
                            createVNode(_component_Avatar, { class: "size-10" }, {
                              default: withCtx(() => [
                                createVNode(_component_AvatarImage, { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80" }),
                                createVNode(_component_AvatarFallback, null, {
                                  default: withCtx(() => [
                                    createTextVNode("ER")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Evil Rabbit")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode("Last seen 5 months ago")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              size: "icon-sm",
                              variant: "outline",
                              class: "rounded-full",
                              "aria-label": "Invite"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Plus))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Item, { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode(_component_ItemMedia, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "*:ring-background flex -space-x-2 *:ring-2 *:grayscale" }, [
                              createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, {
                                    src: "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?&w=128&h=128&dpr=2&q=80",
                                    alt: "User 1"
                                  }),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode("CN")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Avatar, { class: "hidden sm:flex" }, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, {
                                    src: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?&w=128&h=128&dpr=2&q=80",
                                    alt: "User 2"
                                  }),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode("LR")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Avatar, null, {
                                default: withCtx(() => [
                                  createVNode(_component_AvatarImage, {
                                    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=128&h=128&dpr=2&q=80",
                                    alt: "User 3"
                                  }),
                                  createVNode(_component_AvatarFallback, null, {
                                    default: withCtx(() => [
                                      createTextVNode("ER")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_ItemTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("No Team Members")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ItemDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Invite your team to collaborate on this project. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ItemActions, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              size: "sm",
                              variant: "outline"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Invite ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=item-BtUypNyq.mjs.map
