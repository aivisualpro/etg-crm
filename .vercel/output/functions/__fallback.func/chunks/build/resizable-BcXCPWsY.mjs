import { _ as _sfc_main$4 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$5, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, defineComponent, unref, renderSlot, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { GripVertical } from 'lucide-vue-next';
import { useForwardPropsEmits, SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ResizableHandle",
  __ssrInlineRender: true,
  props: {
    id: {},
    hitAreaMargins: {},
    tabindex: {},
    disabled: { type: Boolean },
    nonce: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    withHandle: { type: Boolean }
  },
  emits: ["dragging"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class", "withHandle");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SplitterResizeHandle), mergeProps({ "data-slot": "resizable-handle" }, unref(forwarded), {
        class: unref(cn)("bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90", props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.withHandle) {
              _push2(`<div class="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(GripVertical), { class: "size-2.5" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.withHandle ? (openBlock(), createBlock("div", {
                key: 0,
                class: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border"
              }, [
                createVNode(unref(GripVertical), { class: "size-2.5" })
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/resizable/ResizableHandle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ResizablePanel",
  __ssrInlineRender: true,
  props: {
    collapsedSize: {},
    collapsible: { type: Boolean },
    defaultSize: {},
    id: {},
    maxSize: {},
    minSize: {},
    order: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["collapse", "expand", "resize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SplitterPanel), mergeProps({ "data-slot": "resizable-panel" }, unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/resizable/ResizablePanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ResizablePanelGroup",
  __ssrInlineRender: true,
  props: {
    id: {},
    autoSaveId: {},
    direction: {},
    keyboardResizeBy: {},
    storage: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["layout"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SplitterGroup), mergeProps({ "data-slot": "resizable-panel-group" }, unref(forwarded), {
        class: unref(cn)("flex h-full w-full data-[orientation=vertical]:flex-col", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/resizable/ResizablePanelGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$4;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$5;
  const _component_CardContent = _sfc_main$4$1;
  const _component_ResizablePanelGroup = _sfc_main$1;
  const _component_ResizablePanel = _sfc_main$2;
  const _component_ResizableHandle = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Resizable </h2><p class="text-muted-foreground"> Accessible resizable panel groups and layouts with keyboard support. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/resizable",
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
            to: "https://www.shadcn-vue.com/docs/components/resizable",
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
          to: "https://www.reka-ui.com/docs/components/resizable",
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
            to: "https://www.reka-ui.com/docs/components/resizable",
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
              _push3(ssrRenderComponent(_component_ResizablePanelGroup, {
                id: "demo-group-1",
                direction: "horizontal",
                class: "max-w-md border rounded-lg"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_ResizablePanel, {
                      id: "demo-panel-1",
                      "default-size": 50
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="h-[200px] flex items-center justify-center p-6"${_scopeId4}><span class="font-semibold"${_scopeId4}>One</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "h-[200px] flex items-center justify-center p-6" }, [
                              createVNode("span", { class: "font-semibold" }, "One")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ResizableHandle, { id: "demo-handle-1" }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ResizablePanel, {
                      id: "demo-panel-2",
                      "default-size": 50
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_ResizablePanelGroup, {
                            id: "demo-group-2",
                            direction: "vertical"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_ResizablePanel, {
                                  id: "demo-panel-3",
                                  "default-size": 25
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<div class="h-full flex items-center justify-center p-6"${_scopeId6}><span class="font-semibold"${_scopeId6}>Two</span></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                          createVNode("span", { class: "font-semibold" }, "Two")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_ResizableHandle, { id: "demo-handle-2" }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_ResizablePanel, {
                                  id: "demo-panel-4",
                                  "default-size": 75
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<div class="h-full flex items-center justify-center p-6"${_scopeId6}><span class="font-semibold"${_scopeId6}>Three</span></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                          createVNode("span", { class: "font-semibold" }, "Three")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_ResizablePanel, {
                                    id: "demo-panel-3",
                                    "default-size": 25
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                        createVNode("span", { class: "font-semibold" }, "Two")
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_ResizableHandle, { id: "demo-handle-2" }),
                                  createVNode(_component_ResizablePanel, {
                                    id: "demo-panel-4",
                                    "default-size": 75
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                        createVNode("span", { class: "font-semibold" }, "Three")
                                      ])
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
                            createVNode(_component_ResizablePanelGroup, {
                              id: "demo-group-2",
                              direction: "vertical"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_ResizablePanel, {
                                  id: "demo-panel-3",
                                  "default-size": 25
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                      createVNode("span", { class: "font-semibold" }, "Two")
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_ResizableHandle, { id: "demo-handle-2" }),
                                createVNode(_component_ResizablePanel, {
                                  id: "demo-panel-4",
                                  "default-size": 75
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                      createVNode("span", { class: "font-semibold" }, "Three")
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_ResizablePanel, {
                        id: "demo-panel-1",
                        "default-size": 50
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-[200px] flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "One")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ResizableHandle, { id: "demo-handle-1" }),
                      createVNode(_component_ResizablePanel, {
                        id: "demo-panel-2",
                        "default-size": 50
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ResizablePanelGroup, {
                            id: "demo-group-2",
                            direction: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ResizablePanel, {
                                id: "demo-panel-3",
                                "default-size": 25
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                    createVNode("span", { class: "font-semibold" }, "Two")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ResizableHandle, { id: "demo-handle-2" }),
                              createVNode(_component_ResizablePanel, {
                                id: "demo-panel-4",
                                "default-size": 75
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                    createVNode("span", { class: "font-semibold" }, "Three")
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
              }, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_ResizablePanelGroup, {
                    id: "demo-group-1",
                    direction: "horizontal",
                    class: "max-w-md border rounded-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ResizablePanel, {
                        id: "demo-panel-1",
                        "default-size": 50
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-[200px] flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "One")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ResizableHandle, { id: "demo-handle-1" }),
                      createVNode(_component_ResizablePanel, {
                        id: "demo-panel-2",
                        "default-size": 50
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ResizablePanelGroup, {
                            id: "demo-group-2",
                            direction: "vertical"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ResizablePanel, {
                                id: "demo-panel-3",
                                "default-size": 25
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                    createVNode("span", { class: "font-semibold" }, "Two")
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_ResizableHandle, { id: "demo-handle-2" }),
                              createVNode(_component_ResizablePanel, {
                                id: "demo-panel-4",
                                "default-size": 75
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                    createVNode("span", { class: "font-semibold" }, "Three")
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
                createVNode(_component_ResizablePanelGroup, {
                  id: "demo-group-1",
                  direction: "horizontal",
                  class: "max-w-md border rounded-lg"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ResizablePanel, {
                      id: "demo-panel-1",
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-[200px] flex items-center justify-center p-6" }, [
                          createVNode("span", { class: "font-semibold" }, "One")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ResizableHandle, { id: "demo-handle-1" }),
                    createVNode(_component_ResizablePanel, {
                      id: "demo-panel-2",
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ResizablePanelGroup, {
                          id: "demo-group-2",
                          direction: "vertical"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ResizablePanel, {
                              id: "demo-panel-3",
                              "default-size": 25
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                  createVNode("span", { class: "font-semibold" }, "Two")
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_ResizableHandle, { id: "demo-handle-2" }),
                            createVNode(_component_ResizablePanel, {
                              id: "demo-panel-4",
                              "default-size": 75
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                                  createVNode("span", { class: "font-semibold" }, "Three")
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
              _push3(ssrRenderComponent(_component_ResizablePanelGroup, {
                id: "vertical-demo-group-1",
                direction: "vertical",
                class: "max-w-md min-h-[200px] border rounded-lg"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_ResizablePanel, {
                      id: "vertical-demo-panel-1",
                      "default-size": 25
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="h-full flex items-center justify-center p-6"${_scopeId4}><span class="font-semibold"${_scopeId4}>Header</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                              createVNode("span", { class: "font-semibold" }, "Header")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ResizableHandle, { id: "vertical-demo-handle-1" }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_ResizablePanel, {
                      id: "vertical-demo-panel-2",
                      "default-size": 75
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="h-full flex items-center justify-center p-6"${_scopeId4}><span class="font-semibold"${_scopeId4}>Content</span></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                              createVNode("span", { class: "font-semibold" }, "Content")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_ResizablePanel, {
                        id: "vertical-demo-panel-1",
                        "default-size": 25
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "Header")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ResizableHandle, { id: "vertical-demo-handle-1" }),
                      createVNode(_component_ResizablePanel, {
                        id: "vertical-demo-panel-2",
                        "default-size": 75
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "Content")
                          ])
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
                  createVNode(_component_ResizablePanelGroup, {
                    id: "vertical-demo-group-1",
                    direction: "vertical",
                    class: "max-w-md min-h-[200px] border rounded-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ResizablePanel, {
                        id: "vertical-demo-panel-1",
                        "default-size": 25
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "Header")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_ResizableHandle, { id: "vertical-demo-handle-1" }),
                      createVNode(_component_ResizablePanel, {
                        id: "vertical-demo-panel-2",
                        "default-size": 75
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                            createVNode("span", { class: "font-semibold" }, "Content")
                          ])
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
                createVNode(_component_ResizablePanelGroup, {
                  id: "vertical-demo-group-1",
                  direction: "vertical",
                  class: "max-w-md min-h-[200px] border rounded-lg"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ResizablePanel, {
                      id: "vertical-demo-panel-1",
                      "default-size": 25
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                          createVNode("span", { class: "font-semibold" }, "Header")
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ResizableHandle, { id: "vertical-demo-handle-1" }),
                    createVNode(_component_ResizablePanel, {
                      id: "vertical-demo-panel-2",
                      "default-size": 75
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "h-full flex items-center justify-center p-6" }, [
                          createVNode("span", { class: "font-semibold" }, "Content")
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/resizable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resizable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { resizable as default };
//# sourceMappingURL=resizable-BcXCPWsY.mjs.map
