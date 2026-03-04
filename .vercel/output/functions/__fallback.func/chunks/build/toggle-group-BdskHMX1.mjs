import { _ as _sfc_main$3 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$4, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, defineComponent, provide, unref, renderSlot, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, ToggleGroupRoot, useForwardProps, ToggleGroupItem } from 'reka-ui';
import { t as toggleVariants } from './index-DeU0A1MZ.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ToggleGroup",
  __ssrInlineRender: true,
  props: {
    rovingFocus: { type: Boolean },
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    type: {},
    modelValue: {},
    defaultValue: {},
    class: {},
    variant: {},
    size: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    provide("toggleGroup", {
      variant: props.variant,
      size: props.size
    });
    const delegatedProps = reactiveOmit(props, "class", "size", "variant");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToggleGroupRoot), mergeProps({
        "data-slot": "toggle-group",
        "data-size": __props.size,
        "data-variant": __props.variant
      }, unref(forwarded), {
        class: unref(cn)("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", props.class)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/toggle-group/ToggleGroup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToggleGroupItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {},
    variant: {},
    size: {}
  },
  setup(__props) {
    const props = __props;
    const context = inject("toggleGroup");
    const delegatedProps = reactiveOmit(props, "class", "size", "variant");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ToggleGroupItem), mergeProps({
        "data-slot": "toggle-group-item",
        "data-variant": unref(context)?.variant || __props.variant,
        "data-size": unref(context)?.size || __props.size
      }, unref(forwardedProps), {
        class: unref(cn)(
          unref(toggleVariants)({
            variant: unref(context)?.variant || __props.variant,
            size: unref(context)?.size || __props.size
          }),
          "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:!rounded-l-md last:!rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/toggle-group/ToggleGroupItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$3;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$4;
  const _component_CardContent = _sfc_main$4$1;
  const _component_ToggleGroup = _sfc_main$2;
  const _component_ToggleGroupItem = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Toggle Group </h2><p class="text-muted-foreground"> A set of two-state buttons that can be toggled on or off. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/toggle-group",
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
            to: "https://www.shadcn-vue.com/docs/components/toggle-group",
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
          to: "https://www.reka-ui.com/docs/components/toggle-group",
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
            to: "https://www.reka-ui.com/docs/components/toggle-group",
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
              _push3(ssrRenderComponent(_component_ToggleGroup, { type: "multiple" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-bold",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-italic",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-underline",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_ToggleGroup, { type: "multiple" }, {
                    default: withCtx(() => [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
              createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                createVNode(_component_ToggleGroup, { type: "multiple" }, {
                  default: withCtx(() => [
                    createVNode(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-bold",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-italic",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-underline",
                          class: "h-4 w-4"
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
                    _push4(`Outline`);
                  } else {
                    return [
                      createTextVNode("Outline")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CardTitle, null, {
                  default: withCtx(() => [
                    createTextVNode("Outline")
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
              _push3(ssrRenderComponent(_component_ToggleGroup, {
                type: "multiple",
                variant: "outline"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-bold",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-italic",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-underline",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_ToggleGroup, {
                    type: "multiple",
                    variant: "outline"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
                  createTextVNode("Outline")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CardContent, null, {
            default: withCtx(() => [
              createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                createVNode(_component_ToggleGroup, {
                  type: "multiple",
                  variant: "outline"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-bold",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-italic",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-underline",
                          class: "h-4 w-4"
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
                    _push4(`Single`);
                  } else {
                    return [
                      createTextVNode("Single")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CardTitle, null, {
                  default: withCtx(() => [
                    createTextVNode("Single")
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
              _push3(ssrRenderComponent(_component_ToggleGroup, { type: "single" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-bold",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-font-italic",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Icon, {
                              name: "i-radix-icons-underline",
                              class: "h-4 w-4"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_ToggleGroup, { type: "single" }, {
                    default: withCtx(() => [
                      createVNode(_component_ToggleGroupItem, {
                        value: "bold",
                        "aria-label": "Toggle bold"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-bold",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "italic",
                        "aria-label": "Toggle italic"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-font-italic",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ToggleGroupItem, {
                        value: "underline",
                        "aria-label": "Toggle underline"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "i-radix-icons-underline",
                            class: "h-4 w-4"
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
                  createTextVNode("Single")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CardContent, null, {
            default: withCtx(() => [
              createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                createVNode(_component_ToggleGroup, { type: "single" }, {
                  default: withCtx(() => [
                    createVNode(_component_ToggleGroupItem, {
                      value: "bold",
                      "aria-label": "Toggle bold"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-bold",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "italic",
                      "aria-label": "Toggle italic"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-font-italic",
                          class: "h-4 w-4"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ToggleGroupItem, {
                      value: "underline",
                      "aria-label": "Toggle underline"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-radix-icons-underline",
                          class: "h-4 w-4"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/toggle-group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const toggleGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { toggleGroup as default };
//# sourceMappingURL=toggle-group-BdskHMX1.mjs.map
