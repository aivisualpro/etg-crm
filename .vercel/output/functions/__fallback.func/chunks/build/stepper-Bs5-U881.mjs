import { _ as _sfc_main$8 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$9, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, StepperRoot, useForwardProps, StepperItem, StepperTrigger, StepperIndicator, StepperTitle, StepperDescription, StepperSeparator } from 'reka-ui';
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

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Stepper",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    modelValue: {},
    linear: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperRoot), mergeProps({
        class: unref(cn)(
          "flex gap-2",
          props.class
        )
      }, unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/Stepper.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "StepperDescription",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperDescription), mergeProps(unref(forwarded), {
        class: unref(cn)("text-xs text-muted-foreground", props.class)
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperDescription.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "StepperIndicator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperIndicator), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "inline-flex items-center justify-center rounded-full text-muted-foreground/50 w-8 h-8",
          // Disabled
          "group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50",
          // Active
          "group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground",
          // Completed
          "group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground",
          props.class
        )
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperIndicator.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StepperItem",
  __ssrInlineRender: true,
  props: {
    step: {},
    disabled: { type: Boolean },
    completed: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperItem), mergeProps(unref(forwarded), {
        class: unref(cn)("flex items-center gap-2 group data-[disabled]:pointer-events-none", props.class)
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StepperSeparator",
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
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperSeparator), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "bg-muted",
          // Disabled
          "group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50",
          // Completed
          "group-data-[state=completed]:bg-accent-foreground",
          props.class
        )
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperSeparator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StepperTitle",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperTitle), mergeProps(unref(forwarded), {
        class: unref(cn)("text-md font-semibold whitespace-nowrap", props.class)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperTitle.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StepperTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperTrigger), mergeProps(unref(forwarded), {
        class: unref(cn)("p-1 flex flex-col items-center text-center gap-1 rounded-md", props.class)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/stepper/StepperTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stepper",
  __ssrInlineRender: true,
  setup(__props) {
    const stepsBasic = [{
      step: 1,
      title: "Address",
      description: "Add your address here",
      icon: "i-lucide-book-user"
    }, {
      step: 2,
      title: "Shipping",
      description: "Set your preferred shipping method",
      icon: "i-lucide-truck"
    }, {
      step: 3,
      title: "Payment",
      description: "Add any payment information you have",
      icon: "i-lucide-credit-card"
    }, {
      step: 4,
      title: "Checkout",
      description: "Confirm your order",
      icon: "i-lucide-check"
    }];
    const steps = [
      {
        step: 1,
        title: "Your details",
        description: "Provide your name and email"
      },
      {
        step: 2,
        title: "Company details",
        description: "A few details about your company"
      },
      {
        step: 3,
        title: "Invite your team",
        description: "Start collaborating with your team"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6$1;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$9;
      const _component_CardContent = _sfc_main$4$1;
      const _component_Stepper = _sfc_main$7;
      const _component_StepperItem = _sfc_main$4;
      const _component_StepperTrigger = _sfc_main$1;
      const _component_StepperIndicator = _sfc_main$5;
      const _component_StepperTitle = _sfc_main$2;
      const _component_StepperDescription = _sfc_main$6;
      const _component_StepperSeparator = _sfc_main$3;
      const _component_Button = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Stepper </h2><p class="text-muted-foreground"> A set of steps that are used to indicate progress through a multi-step process. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/stepper",
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
                to: "https://www.shadcn-vue.com/docs/components/stepper",
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
              to: "https://www.reka-ui.com/docs/components/stepper",
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
                to: "https://www.reka-ui.com/docs/components/stepper",
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
                  _push3(ssrRenderComponent(_component_Stepper, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(stepsBasic, (item) => {
                          _push4(ssrRenderComponent(_component_StepperItem, {
                            key: item.step,
                            class: "basis-1/4",
                            step: item.step
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_StepperTrigger, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_StepperIndicator, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(_component_Icon, {
                                              name: item.icon,
                                              class: "h-4 w-4"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(_component_Icon, {
                                                name: item.icon,
                                                class: "h-4 w-4"
                                              }, null, 8, ["name"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`<div class="flex flex-col"${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_StepperTitle, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(item.title)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_StepperDescription, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(item.description)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(item.description), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode(_component_StepperIndicator, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_Icon, {
                                              name: item.icon,
                                              class: "h-4 w-4"
                                            }, null, 8, ["name"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("div", { class: "flex flex-col" }, [
                                          createVNode(_component_StepperTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_StepperDescription, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.description), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (item.step !== stepsBasic[stepsBasic.length - 1].step) {
                                  _push5(ssrRenderComponent(_component_StepperSeparator, { class: "h-px w-full" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode(_component_StepperTrigger, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_StepperIndicator, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: item.icon,
                                            class: "h-4 w-4"
                                          }, null, 8, ["name"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("div", { class: "flex flex-col" }, [
                                        createVNode(_component_StepperTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.title), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_StepperDescription, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.description), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  item.step !== stepsBasic[stepsBasic.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                    key: 0,
                                    class: "h-px w-full"
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(stepsBasic, (item) => {
                            return createVNode(_component_StepperItem, {
                              key: item.step,
                              class: "basis-1/4",
                              step: item.step
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_StepperTrigger, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_StepperIndicator, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: item.icon,
                                          class: "h-4 w-4"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode(_component_StepperTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_StepperDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.description), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                item.step !== stepsBasic[stepsBasic.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "h-px w-full"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode(_component_Stepper, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(stepsBasic, (item) => {
                            return createVNode(_component_StepperItem, {
                              key: item.step,
                              class: "basis-1/4",
                              step: item.step
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_StepperTrigger, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_StepperIndicator, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: item.icon,
                                          class: "h-4 w-4"
                                        }, null, 8, ["name"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", { class: "flex flex-col" }, [
                                      createVNode(_component_StepperTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_StepperDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.description), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                item.step !== stepsBasic[stepsBasic.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "h-px w-full"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
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
                    createVNode(_component_Stepper, null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(stepsBasic, (item) => {
                          return createVNode(_component_StepperItem, {
                            key: item.step,
                            class: "basis-1/4",
                            step: item.step
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_StepperTrigger, null, {
                                default: withCtx(() => [
                                  createVNode(_component_StepperIndicator, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: item.icon,
                                        class: "h-4 w-4"
                                      }, null, 8, ["name"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", { class: "flex flex-col" }, [
                                    createVNode(_component_StepperTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.title), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_StepperDescription, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.description), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              item.step !== stepsBasic[stepsBasic.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                key: 0,
                                class: "h-px w-full"
                              })) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["step"]);
                        }), 64))
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
                        _push4(`Horizontal`);
                      } else {
                        return [
                          createTextVNode("Horizontal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Horizontal")
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
                  _push3(ssrRenderComponent(_component_Stepper, { class: "w-full flex items-start gap-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(steps, (step) => {
                          _push4(ssrRenderComponent(_component_StepperItem, {
                            key: step.step,
                            class: "relative w-full flex flex-col items-center justify-center",
                            step: step.step
                          }, {
                            default: withCtx(({ state }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (step.step !== steps[steps.length - 1].step) {
                                  _push5(ssrRenderComponent(_component_StepperSeparator, { class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(ssrRenderComponent(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Button, {
                                        variant: state === "completed" || state === "active" ? "default" : "outline",
                                        size: "icon",
                                        class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (state === "completed") {
                                              _push7(ssrRenderComponent(_component_Icon, {
                                                name: "i-lucide-check",
                                                class: "size-5"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (state === "active") {
                                              _push7(ssrRenderComponent(_component_Icon, { name: "i-lucide-circle" }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (state === "inactive") {
                                              _push7(ssrRenderComponent(_component_Icon, { name: "i-lucide-dot" }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 0,
                                                name: "i-lucide-check",
                                                class: "size-5"
                                              })) : createCommentVNode("", true),
                                              state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 1,
                                                name: "i-lucide-circle"
                                              })) : createCommentVNode("", true),
                                              state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 2,
                                                name: "i-lucide-dot"
                                              })) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Button, {
                                          variant: state === "completed" || state === "active" ? "default" : "outline",
                                          size: "icon",
                                          class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                        }, {
                                          default: withCtx(() => [
                                            state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 0,
                                              name: "i-lucide-check",
                                              class: "size-5"
                                            })) : createCommentVNode("", true),
                                            state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 1,
                                              name: "i-lucide-circle"
                                            })) : createCommentVNode("", true),
                                            state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 2,
                                              name: "i-lucide-dot"
                                            })) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "class"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div class="mt-5 flex flex-col items-center text-center"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_StepperTitle, {
                                  class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(step.title)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(step.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_StepperDescription, {
                                  class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(step.description)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(step.description), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                    key: 0,
                                    class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, {
                                        variant: state === "completed" || state === "active" ? "default" : "outline",
                                        size: "icon",
                                        class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                      }, {
                                        default: withCtx(() => [
                                          state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 0,
                                            name: "i-lucide-check",
                                            class: "size-5"
                                          })) : createCommentVNode("", true),
                                          state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 1,
                                            name: "i-lucide-circle"
                                          })) : createCommentVNode("", true),
                                          state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 2,
                                            name: "i-lucide-dot"
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "class"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                                    createVNode(_component_StepperTitle, {
                                      class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(step.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]),
                                    createVNode(_component_StepperDescription, {
                                      class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(step.description), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
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
                          (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                            return createVNode(_component_StepperItem, {
                              key: step.step,
                              class: "relative w-full flex flex-col items-center justify-center",
                              step: step.step
                            }, {
                              default: withCtx(({ state }) => [
                                step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                })) : createCommentVNode("", true),
                                createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: state === "completed" || state === "active" ? "default" : "outline",
                                      size: "icon",
                                      class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                    }, {
                                      default: withCtx(() => [
                                        state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-check",
                                          class: "size-5"
                                        })) : createCommentVNode("", true),
                                        state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-circle"
                                        })) : createCommentVNode("", true),
                                        state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 2,
                                          name: "i-lucide-dot"
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant", "class"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                                  createVNode(_component_StepperTitle, {
                                    class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]),
                                  createVNode(_component_StepperDescription, {
                                    class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode(_component_Stepper, { class: "w-full flex items-start gap-2" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                            return createVNode(_component_StepperItem, {
                              key: step.step,
                              class: "relative w-full flex flex-col items-center justify-center",
                              step: step.step
                            }, {
                              default: withCtx(({ state }) => [
                                step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                })) : createCommentVNode("", true),
                                createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: state === "completed" || state === "active" ? "default" : "outline",
                                      size: "icon",
                                      class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                    }, {
                                      default: withCtx(() => [
                                        state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-check",
                                          class: "size-5"
                                        })) : createCommentVNode("", true),
                                        state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-circle"
                                        })) : createCommentVNode("", true),
                                        state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 2,
                                          name: "i-lucide-dot"
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant", "class"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                                  createVNode(_component_StepperTitle, {
                                    class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]),
                                  createVNode(_component_StepperDescription, {
                                    class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
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
                      createTextVNode("Horizontal")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                    createVNode(_component_Stepper, { class: "w-full flex items-start gap-2" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                          return createVNode(_component_StepperItem, {
                            key: step.step,
                            class: "relative w-full flex flex-col items-center justify-center",
                            step: step.step
                          }, {
                            default: withCtx(({ state }) => [
                              step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                key: 0,
                                class: "absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                              })) : createCommentVNode("", true),
                              createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: state === "completed" || state === "active" ? "default" : "outline",
                                    size: "icon",
                                    class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                  }, {
                                    default: withCtx(() => [
                                      state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: "i-lucide-check",
                                        class: "size-5"
                                      })) : createCommentVNode("", true),
                                      state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 1,
                                        name: "i-lucide-circle"
                                      })) : createCommentVNode("", true),
                                      state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 2,
                                        name: "i-lucide-dot"
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant", "class"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", { class: "mt-5 flex flex-col items-center text-center" }, [
                                createVNode(_component_StepperTitle, {
                                  class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(step.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"]),
                                createVNode(_component_StepperDescription, {
                                  class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(step.description), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["step"]);
                        }), 64))
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
                        _push4(`Vertical`);
                      } else {
                        return [
                          createTextVNode("Vertical")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Vertical")
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
                  _push3(ssrRenderComponent(_component_Stepper, {
                    orientation: "vertical",
                    class: "mx-auto max-w-md w-full flex flex-col justify-start gap-10"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(steps, (step) => {
                          _push4(ssrRenderComponent(_component_StepperItem, {
                            key: step.step,
                            class: "relative w-full flex items-start gap-6",
                            step: step.step
                          }, {
                            default: withCtx(({ state }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (step.step !== steps[steps.length - 1].step) {
                                  _push5(ssrRenderComponent(_component_StepperSeparator, { class: "absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(ssrRenderComponent(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_Button, {
                                        variant: state === "completed" || state === "active" ? "default" : "outline",
                                        size: "icon",
                                        class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            if (state === "completed") {
                                              _push7(ssrRenderComponent(_component_Icon, {
                                                name: "i-lucide-check",
                                                class: "size-5"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (state === "active") {
                                              _push7(ssrRenderComponent(_component_Icon, { name: "i-lucide-circle" }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                            if (state === "inactive") {
                                              _push7(ssrRenderComponent(_component_Icon, { name: "i-lucide-dot" }, null, _parent7, _scopeId6));
                                            } else {
                                              _push7(`<!---->`);
                                            }
                                          } else {
                                            return [
                                              state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 0,
                                                name: "i-lucide-check",
                                                class: "size-5"
                                              })) : createCommentVNode("", true),
                                              state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 1,
                                                name: "i-lucide-circle"
                                              })) : createCommentVNode("", true),
                                              state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 2,
                                                name: "i-lucide-dot"
                                              })) : createCommentVNode("", true)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_Button, {
                                          variant: state === "completed" || state === "active" ? "default" : "outline",
                                          size: "icon",
                                          class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                        }, {
                                          default: withCtx(() => [
                                            state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 0,
                                              name: "i-lucide-check",
                                              class: "size-5"
                                            })) : createCommentVNode("", true),
                                            state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 1,
                                              name: "i-lucide-circle"
                                            })) : createCommentVNode("", true),
                                            state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 2,
                                              name: "i-lucide-dot"
                                            })) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant", "class"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div class="flex flex-col gap-1"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_StepperTitle, {
                                  class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(step.title)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(step.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_StepperDescription, {
                                  class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(step.description)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(step.description), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              } else {
                                return [
                                  step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                    key: 0,
                                    class: "absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, {
                                        variant: state === "completed" || state === "active" ? "default" : "outline",
                                        size: "icon",
                                        class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                      }, {
                                        default: withCtx(() => [
                                          state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 0,
                                            name: "i-lucide-check",
                                            class: "size-5"
                                          })) : createCommentVNode("", true),
                                          state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 1,
                                            name: "i-lucide-circle"
                                          })) : createCommentVNode("", true),
                                          state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 2,
                                            name: "i-lucide-dot"
                                          })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant", "class"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", { class: "flex flex-col gap-1" }, [
                                    createVNode(_component_StepperTitle, {
                                      class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(step.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]),
                                    createVNode(_component_StepperDescription, {
                                      class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(step.description), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])
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
                          (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                            return createVNode(_component_StepperItem, {
                              key: step.step,
                              class: "relative w-full flex items-start gap-6",
                              step: step.step
                            }, {
                              default: withCtx(({ state }) => [
                                step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                })) : createCommentVNode("", true),
                                createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: state === "completed" || state === "active" ? "default" : "outline",
                                      size: "icon",
                                      class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                    }, {
                                      default: withCtx(() => [
                                        state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-check",
                                          class: "size-5"
                                        })) : createCommentVNode("", true),
                                        state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-circle"
                                        })) : createCommentVNode("", true),
                                        state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 2,
                                          name: "i-lucide-dot"
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant", "class"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode(_component_StepperTitle, {
                                    class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]),
                                  createVNode(_component_StepperDescription, {
                                    class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode(_component_Stepper, {
                        orientation: "vertical",
                        class: "mx-auto max-w-md w-full flex flex-col justify-start gap-10"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                            return createVNode(_component_StepperItem, {
                              key: step.step,
                              class: "relative w-full flex items-start gap-6",
                              step: step.step
                            }, {
                              default: withCtx(({ state }) => [
                                step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                  key: 0,
                                  class: "absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                                })) : createCommentVNode("", true),
                                createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, {
                                      variant: state === "completed" || state === "active" ? "default" : "outline",
                                      size: "icon",
                                      class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                    }, {
                                      default: withCtx(() => [
                                        state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-check",
                                          class: "size-5"
                                        })) : createCommentVNode("", true),
                                        state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 1,
                                          name: "i-lucide-circle"
                                        })) : createCommentVNode("", true),
                                        state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                          key: 2,
                                          name: "i-lucide-dot"
                                        })) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1032, ["variant", "class"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "flex flex-col gap-1" }, [
                                  createVNode(_component_StepperTitle, {
                                    class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.title), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]),
                                  createVNode(_component_StepperDescription, {
                                    class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(step.description), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["step"]);
                          }), 64))
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
                      createTextVNode("Vertical")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                    createVNode(_component_Stepper, {
                      orientation: "vertical",
                      class: "mx-auto max-w-md w-full flex flex-col justify-start gap-10"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(steps, (step) => {
                          return createVNode(_component_StepperItem, {
                            key: step.step,
                            class: "relative w-full flex items-start gap-6",
                            step: step.step
                          }, {
                            default: withCtx(({ state }) => [
                              step.step !== steps[steps.length - 1].step ? (openBlock(), createBlock(_component_StepperSeparator, {
                                key: 0,
                                class: "absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                              })) : createCommentVNode("", true),
                              createVNode(_component_StepperTrigger, { "as-child": "" }, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, {
                                    variant: state === "completed" || state === "active" ? "default" : "outline",
                                    size: "icon",
                                    class: ["z-10 shrink-0 rounded-full", [state === "active" && "ring-2 ring-ring ring-offset-2 ring-offset-background"]]
                                  }, {
                                    default: withCtx(() => [
                                      state === "completed" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: "i-lucide-check",
                                        class: "size-5"
                                      })) : createCommentVNode("", true),
                                      state === "active" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 1,
                                        name: "i-lucide-circle"
                                      })) : createCommentVNode("", true),
                                      state === "inactive" ? (openBlock(), createBlock(_component_Icon, {
                                        key: 2,
                                        name: "i-lucide-dot"
                                      })) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1032, ["variant", "class"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", { class: "flex flex-col gap-1" }, [
                                createVNode(_component_StepperTitle, {
                                  class: [[state === "active" && "text-primary"], "text-sm font-semibold transition lg:text-base"]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(step.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"]),
                                createVNode(_component_StepperDescription, {
                                  class: [[state === "active" && "text-primary"], "sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(step.description), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["step"]);
                        }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/stepper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=stepper-Bs5-U881.mjs.map
