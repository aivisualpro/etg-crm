import { _ as _sfc_main$5 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$7, c as _sfc_main$4$1, d as _sfc_main$3$1, e as _sfc_main$2$1 } from './CardTitle-CEXidhwl.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, defineComponent, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, TabsRoot, TabsList, useForwardProps, TabsTrigger, TabsContent } from 'reka-ui';
import { _ as _sfc_main$8 } from './Label-jo0RdEYb.mjs';
import { _ as _sfc_main$9 } from './Input-DUkj5gv1.mjs';
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
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    unmountOnHide: { type: Boolean },
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
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps({ "data-slot": "tabs" }, unref(forwarded), {
        class: unref(cn)("flex flex-col gap-2", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/Tabs.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  __ssrInlineRender: true,
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsContent), mergeProps({
        "data-slot": "tabs-content",
        class: unref(cn)("flex-1 outline-none", props.class)
      }, unref(delegatedProps), _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  __ssrInlineRender: true,
  props: {
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsList), mergeProps({ "data-slot": "tabs-list" }, unref(delegatedProps), {
        class: unref(cn)(
          "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsTrigger), mergeProps({ "data-slot": "tabs-trigger" }, unref(forwardedProps), {
        class: unref(cn)(
          "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/tabs/TabsTrigger.vue");
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
  const _component_Tabs = _sfc_main$4;
  const _component_TabsList = _sfc_main$2;
  const _component_TabsTrigger = _sfc_main$1;
  const _component_TabsContent = _sfc_main$3;
  const _component_CardDescription = _sfc_main$3$1;
  const _component_Label = _sfc_main$8;
  const _component_Input = _sfc_main$9;
  const _component_CardFooter = _sfc_main$2$1;
  const _component_Button = _sfc_main$2$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Tabs </h2><p class="text-muted-foreground"> A set of layered sections of content—known as tab panels—that are displayed one at a time. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/tabs",
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
            to: "https://www.shadcn-vue.com/docs/components/tabs",
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
          to: "https://www.reka-ui.com/docs/components/tabs",
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
            to: "https://www.reka-ui.com/docs/components/tabs",
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
              _push3(`<div class="flex w-full max-w-sm flex-col gap-4 mx-auto"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_Tabs, { "default-value": "account" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_TabsList, { class: "grid grid-cols-2" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_TabsTrigger, { value: "account" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Account `);
                              } else {
                                return [
                                  createTextVNode(" Account ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_TabsTrigger, { value: "password" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Password `);
                              } else {
                                return [
                                  createTextVNode(" Password ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_TabsTrigger, { value: "account" }, {
                              default: withCtx(() => [
                                createTextVNode(" Account ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TabsTrigger, { value: "password" }, {
                              default: withCtx(() => [
                                createTextVNode(" Password ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_TabsContent, { value: "account" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Card, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CardHeader, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CardTitle, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Account`);
                                          } else {
                                            return [
                                              createTextVNode("Account")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CardDescription, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(` Make changes to your account here. Click save when you&#39;re done. `);
                                          } else {
                                            return [
                                              createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Account")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CardDescription, null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CardContent, { class: "space-y-2" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<div class="space-y-1"${_scopeId6}>`);
                                      _push7(ssrRenderComponent(_component_Label, { for: "name" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Name`);
                                          } else {
                                            return [
                                              createTextVNode("Name")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_Input, {
                                        id: "name",
                                        "default-value": "Pedro Duarte"
                                      }, null, _parent7, _scopeId6));
                                      _push7(`</div><div class="space-y-1"${_scopeId6}>`);
                                      _push7(ssrRenderComponent(_component_Label, { for: "username" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Username`);
                                          } else {
                                            return [
                                              createTextVNode("Username")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_Input, {
                                        id: "username",
                                        "default-value": "@peduarte"
                                      }, null, _parent7, _scopeId6));
                                      _push7(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "space-y-1" }, [
                                          createVNode(_component_Label, { for: "name" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Name")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_Input, {
                                            id: "name",
                                            "default-value": "Pedro Duarte"
                                          })
                                        ]),
                                        createVNode("div", { class: "space-y-1" }, [
                                          createVNode(_component_Label, { for: "username" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Username")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_Input, {
                                            id: "username",
                                            "default-value": "@peduarte"
                                          })
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CardFooter, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_Button, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Save changes`);
                                          } else {
                                            return [
                                              createTextVNode("Save changes")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_Button, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Save changes")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CardHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CardTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Account")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CardDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardContent, { class: "space-y-2" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode(_component_Label, { for: "name" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Name")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_Input, {
                                          id: "name",
                                          "default-value": "Pedro Duarte"
                                        })
                                      ]),
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode(_component_Label, { for: "username" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Username")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_Input, {
                                          id: "username",
                                          "default-value": "@peduarte"
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardFooter, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Save changes")
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
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Card, null, {
                              default: withCtx(() => [
                                createVNode(_component_CardHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Account")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CardDescription, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardContent, { class: "space-y-2" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-1" }, [
                                      createVNode(_component_Label, { for: "name" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Name")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_Input, {
                                        id: "name",
                                        "default-value": "Pedro Duarte"
                                      })
                                    ]),
                                    createVNode("div", { class: "space-y-1" }, [
                                      createVNode(_component_Label, { for: "username" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Username")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_Input, {
                                        id: "username",
                                        "default-value": "@peduarte"
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardFooter, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Save changes")
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
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_TabsContent, { value: "password" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Card, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CardHeader, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CardTitle, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Password`);
                                          } else {
                                            return [
                                              createTextVNode("Password")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CardDescription, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(` Change your password here. After saving, you&#39;ll be logged out. `);
                                          } else {
                                            return [
                                              createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Password")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CardDescription, null, {
                                          default: withCtx(() => [
                                            createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CardContent, { class: "space-y-2" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<div class="space-y-1"${_scopeId6}>`);
                                      _push7(ssrRenderComponent(_component_Label, { for: "current" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Current password`);
                                          } else {
                                            return [
                                              createTextVNode("Current password")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_Input, {
                                        id: "current",
                                        type: "password"
                                      }, null, _parent7, _scopeId6));
                                      _push7(`</div><div class="space-y-1"${_scopeId6}>`);
                                      _push7(ssrRenderComponent(_component_Label, { for: "new" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`New password`);
                                          } else {
                                            return [
                                              createTextVNode("New password")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_Input, {
                                        id: "new",
                                        type: "password"
                                      }, null, _parent7, _scopeId6));
                                      _push7(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "space-y-1" }, [
                                          createVNode(_component_Label, { for: "current" }, {
                                            default: withCtx(() => [
                                              createTextVNode("Current password")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_Input, {
                                            id: "current",
                                            type: "password"
                                          })
                                        ]),
                                        createVNode("div", { class: "space-y-1" }, [
                                          createVNode(_component_Label, { for: "new" }, {
                                            default: withCtx(() => [
                                              createTextVNode("New password")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_Input, {
                                            id: "new",
                                            type: "password"
                                          })
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CardFooter, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_Button, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Save password`);
                                          } else {
                                            return [
                                              createTextVNode("Save password")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_Button, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Save password")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CardHeader, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CardTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Password")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CardDescription, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardContent, { class: "space-y-2" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode(_component_Label, { for: "current" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Current password")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_Input, {
                                          id: "current",
                                          type: "password"
                                        })
                                      ]),
                                      createVNode("div", { class: "space-y-1" }, [
                                        createVNode(_component_Label, { for: "new" }, {
                                          default: withCtx(() => [
                                            createTextVNode("New password")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_Input, {
                                          id: "new",
                                          type: "password"
                                        })
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardFooter, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_Button, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Save password")
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
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Card, null, {
                              default: withCtx(() => [
                                createVNode(_component_CardHeader, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Password")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CardDescription, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardContent, { class: "space-y-2" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "space-y-1" }, [
                                      createVNode(_component_Label, { for: "current" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Current password")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_Input, {
                                        id: "current",
                                        type: "password"
                                      })
                                    ]),
                                    createVNode("div", { class: "space-y-1" }, [
                                      createVNode(_component_Label, { for: "new" }, {
                                        default: withCtx(() => [
                                          createTextVNode("New password")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_Input, {
                                        id: "new",
                                        type: "password"
                                      })
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardFooter, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Button, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Save password")
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_TabsList, { class: "grid grid-cols-2" }, {
                        default: withCtx(() => [
                          createVNode(_component_TabsTrigger, { value: "account" }, {
                            default: withCtx(() => [
                              createTextVNode(" Account ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TabsTrigger, { value: "password" }, {
                            default: withCtx(() => [
                              createTextVNode(" Password ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsContent, { value: "account" }, {
                        default: withCtx(() => [
                          createVNode(_component_Card, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Account")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardContent, { class: "space-y-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Name")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "name",
                                      "default-value": "Pedro Duarte"
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "username" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Username")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "username",
                                      "default-value": "@peduarte"
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Save changes")
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
                      }),
                      createVNode(_component_TabsContent, { value: "password" }, {
                        default: withCtx(() => [
                          createVNode(_component_Card, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Password")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardContent, { class: "space-y-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "current" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Current password")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "current",
                                      type: "password"
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "new" }, {
                                      default: withCtx(() => [
                                        createTextVNode("New password")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "new",
                                      type: "password"
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Save password")
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
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex w-full max-w-sm flex-col gap-4 mx-auto" }, [
                  createVNode(_component_Tabs, { "default-value": "account" }, {
                    default: withCtx(() => [
                      createVNode(_component_TabsList, { class: "grid grid-cols-2" }, {
                        default: withCtx(() => [
                          createVNode(_component_TabsTrigger, { value: "account" }, {
                            default: withCtx(() => [
                              createTextVNode(" Account ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TabsTrigger, { value: "password" }, {
                            default: withCtx(() => [
                              createTextVNode(" Password ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TabsContent, { value: "account" }, {
                        default: withCtx(() => [
                          createVNode(_component_Card, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Account")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardContent, { class: "space-y-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "name" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Name")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "name",
                                      "default-value": "Pedro Duarte"
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "username" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Username")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "username",
                                      "default-value": "@peduarte"
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Save changes")
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
                      }),
                      createVNode(_component_TabsContent, { value: "password" }, {
                        default: withCtx(() => [
                          createVNode(_component_Card, null, {
                            default: withCtx(() => [
                              createVNode(_component_CardHeader, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Password")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CardDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardContent, { class: "space-y-2" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "current" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Current password")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "current",
                                      type: "password"
                                    })
                                  ]),
                                  createVNode("div", { class: "space-y-1" }, [
                                    createVNode(_component_Label, { for: "new" }, {
                                      default: withCtx(() => [
                                        createTextVNode("New password")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_Input, {
                                      id: "new",
                                      type: "password"
                                    })
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CardFooter, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Button, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Save password")
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
                  createTextVNode("Basic")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CardContent, null, {
            default: withCtx(() => [
              createVNode("div", { class: "flex w-full max-w-sm flex-col gap-4 mx-auto" }, [
                createVNode(_component_Tabs, { "default-value": "account" }, {
                  default: withCtx(() => [
                    createVNode(_component_TabsList, { class: "grid grid-cols-2" }, {
                      default: withCtx(() => [
                        createVNode(_component_TabsTrigger, { value: "account" }, {
                          default: withCtx(() => [
                            createTextVNode(" Account ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_TabsTrigger, { value: "password" }, {
                          default: withCtx(() => [
                            createTextVNode(" Password ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TabsContent, { value: "account" }, {
                      default: withCtx(() => [
                        createVNode(_component_Card, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_CardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Account")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Make changes to your account here. Click save when you're done. ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardContent, { class: "space-y-2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode(_component_Label, { for: "name" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Name")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "name",
                                    "default-value": "Pedro Duarte"
                                  })
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode(_component_Label, { for: "username" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Username")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "username",
                                    "default-value": "@peduarte"
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardFooter, null, {
                              default: withCtx(() => [
                                createVNode(_component_Button, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Save changes")
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
                    }),
                    createVNode(_component_TabsContent, { value: "password" }, {
                      default: withCtx(() => [
                        createVNode(_component_Card, null, {
                          default: withCtx(() => [
                            createVNode(_component_CardHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_CardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Password")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CardDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Change your password here. After saving, you'll be logged out. ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardContent, { class: "space-y-2" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode(_component_Label, { for: "current" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Current password")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "current",
                                    type: "password"
                                  })
                                ]),
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode(_component_Label, { for: "new" }, {
                                    default: withCtx(() => [
                                      createTextVNode("New password")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "new",
                                    type: "password"
                                  })
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CardFooter, null, {
                              default: withCtx(() => [
                                createVNode(_component_Button, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Save password")
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/tabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tabs = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { tabs as default };
//# sourceMappingURL=tabs-Bf-CQOZb.mjs.map
