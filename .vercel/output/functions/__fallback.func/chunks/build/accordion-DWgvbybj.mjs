import { _ as _sfc_main$5 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$7, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, defineComponent, toDisplayString, createBlock, openBlock, Fragment, renderList, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits, AccordionRoot, useForwardProps, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from 'reka-ui';
import { ChevronDown } from 'lucide-vue-next';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Accordion",
  __ssrInlineRender: true,
  props: {
    collapsible: { type: Boolean },
    disabled: { type: Boolean },
    dir: {},
    orientation: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    type: {},
    modelValue: {},
    defaultValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionRoot), mergeProps({ "data-slot": "accordion" }, unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/Accordion.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AccordionContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionContent), mergeProps({ "data-slot": "accordion-content" }, unref(delegatedProps), { class: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(unref(cn)("pt-0 pb-4", props.class))}"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: unref(cn)("pt-0 pb-4", props.class)
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    value: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AccordionItem), mergeProps({ "data-slot": "accordion-item" }, unref(forwardedProps), {
        class: unref(cn)("border-b last:border-b-0", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccordionTrigger",
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
      _push(ssrRenderComponent(unref(AccordionHeader), mergeProps({ class: "flex" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(AccordionTrigger), mergeProps({ "data-slot": "accordion-trigger" }, unref(delegatedProps), {
              class: unref(cn)(
                "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
                    _push3(ssrRenderComponent(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" }, null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    renderSlot(_ctx.$slots, "icon", {}, () => [
                      createVNode(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(AccordionTrigger), mergeProps({ "data-slot": "accordion-trigger" }, unref(delegatedProps), {
                class: unref(cn)(
                  "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(unref(ChevronDown), { class: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
                  ])
                ]),
                _: 3
              }, 16, ["class"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/accordion/AccordionTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$5;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$7;
  const _component_CardContent = _sfc_main$4$1;
  const _component_Accordion = _sfc_main$4;
  const _component_AccordionItem = _sfc_main$2;
  const _component_AccordionTrigger = _sfc_main$1;
  const _component_AccordionContent = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Accordion </h2><p class="text-muted-foreground"> A vertically stacked set of interactive headings that each reveal a section of content. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/accordion",
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
            to: "https://www.shadcn-vue.com/docs/components/accordion",
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
          to: "https://www.reka-ui.com/docs/components/accordion",
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
            to: "https://www.reka-ui.com/docs/components/accordion",
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
  _push(`</div></div><div class="flex flex-col gap-4 md:flex-row">`);
  _push(ssrRenderComponent(_component_Card, { class: "flex-1" }, {
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
              _push3(ssrRenderComponent(_component_Accordion, {
                type: "single",
                collapsible: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(4, (i) => {
                      _push4(ssrRenderComponent(_component_AccordionItem, {
                        key: i,
                        value: `item-${i}`
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_AccordionTrigger, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Item ${ssrInterpolate(i)}`);
                                } else {
                                  return [
                                    createTextVNode("Item " + toDisplayString(i), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                            _push5(ssrRenderComponent(_component_AccordionContent, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. `);
                                } else {
                                  return [
                                    createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_AccordionTrigger, null, {
                                default: withCtx(() => [
                                  createTextVNode("Item " + toDisplayString(i), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_AccordionContent, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                        return createVNode(_component_AccordionItem, {
                          key: i,
                          value: `item-${i}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccordionTrigger, null, {
                              default: withCtx(() => [
                                createTextVNode("Item " + toDisplayString(i), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_AccordionContent, null, {
                              default: withCtx(() => [
                                createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Accordion, {
                  type: "single",
                  collapsible: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                      return createVNode(_component_AccordionItem, {
                        key: i,
                        value: `item-${i}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_AccordionTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("Item " + toDisplayString(i), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_AccordionContent, null, {
                            default: withCtx(() => [
                              createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
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
              createVNode(_component_Accordion, {
                type: "single",
                collapsible: ""
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                    return createVNode(_component_AccordionItem, {
                      key: i,
                      value: `item-${i}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_AccordionTrigger, null, {
                          default: withCtx(() => [
                            createTextVNode("Item " + toDisplayString(i), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_AccordionContent, null, {
                          default: withCtx(() => [
                            createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
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
  _push(ssrRenderComponent(_component_Card, { class: "flex-1" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CardHeader, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CardTitle, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Expand Multiple`);
                  } else {
                    return [
                      createTextVNode("Expand Multiple")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CardTitle, null, {
                  default: withCtx(() => [
                    createTextVNode("Expand Multiple")
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
              _push3(ssrRenderComponent(_component_Accordion, {
                type: "multiple",
                collapsible: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList(4, (i) => {
                      _push4(ssrRenderComponent(_component_AccordionItem, {
                        key: i,
                        value: `item-${i}`
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_AccordionTrigger, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Item ${ssrInterpolate(i)}`);
                                } else {
                                  return [
                                    createTextVNode("Item " + toDisplayString(i), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                            _push5(ssrRenderComponent(_component_AccordionContent, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(` Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. `);
                                } else {
                                  return [
                                    createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_AccordionTrigger, null, {
                                default: withCtx(() => [
                                  createTextVNode("Item " + toDisplayString(i), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_AccordionContent, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                        return createVNode(_component_AccordionItem, {
                          key: i,
                          value: `item-${i}`
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_AccordionTrigger, null, {
                              default: withCtx(() => [
                                createTextVNode("Item " + toDisplayString(i), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_AccordionContent, null, {
                              default: withCtx(() => [
                                createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 64))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_Accordion, {
                  type: "multiple",
                  collapsible: ""
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                      return createVNode(_component_AccordionItem, {
                        key: i,
                        value: `item-${i}`
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_AccordionTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("Item " + toDisplayString(i), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(_component_AccordionContent, null, {
                            default: withCtx(() => [
                              createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1032, ["value"]);
                    }), 64))
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
          createVNode(_component_CardHeader, null, {
            default: withCtx(() => [
              createVNode(_component_CardTitle, null, {
                default: withCtx(() => [
                  createTextVNode("Expand Multiple")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CardContent, null, {
            default: withCtx(() => [
              createVNode(_component_Accordion, {
                type: "multiple",
                collapsible: ""
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                    return createVNode(_component_AccordionItem, {
                      key: i,
                      value: `item-${i}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_AccordionTrigger, null, {
                          default: withCtx(() => [
                            createTextVNode("Item " + toDisplayString(i), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_AccordionContent, null, {
                          default: withCtx(() => [
                            createTextVNode(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at aut cum dolorem mollitia praesentium quis quo! Id officia, veniam. ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["value"]);
                  }), 64))
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
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/accordion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const accordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { accordion as default };
//# sourceMappingURL=accordion-DWgvbybj.mjs.map
