import { _ as _sfc_main$1 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$3, a as _sfc_main$5, b as _sfc_main$1$2 } from './PopoverTrigger-DHETyzxd.mjs';
import { _ as _sfc_main$7 } from './Label-jo0RdEYb.mjs';
import { _ as _sfc_main$8 } from './Input-DUkj5gv1.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'class-variance-authority';
import 'reka-ui';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$1;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$2;
  const _component_CardContent = _sfc_main$4;
  const _component_Popover = _sfc_main$3;
  const _component_PopoverTrigger = _sfc_main$5;
  const _component_Button = _sfc_main$2$1;
  const _component_PopoverContent = _sfc_main$1$2;
  const _component_Label = _sfc_main$7;
  const _component_Input = _sfc_main$8;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Popover </h2><p class="text-muted-foreground"> Displays rich content in a portal, triggered by a button. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/popover",
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
            to: "https://www.shadcn-vue.com/docs/components/popover",
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
          to: "https://www.reka-ui.com/docs/components/popover",
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
            to: "https://www.reka-ui.com/docs/components/popover",
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
              _push3(ssrRenderComponent(_component_Popover, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PopoverTrigger, { "as-child": "" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_Button, { variant: "outline" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Open popover `);
                              } else {
                                return [
                                  createTextVNode(" Open popover ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_Button, { variant: "outline" }, {
                              default: withCtx(() => [
                                createTextVNode(" Open popover ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_PopoverContent, { class: "w-80" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="grid gap-4"${_scopeId4}><div class="space-y-2"${_scopeId4}><h4 class="font-medium leading-none"${_scopeId4}> Dimensions </h4><p class="text-sm text-muted-foreground"${_scopeId4}> Set the dimensions for the layer. </p></div><div class="grid gap-2"${_scopeId4}><div class="grid grid-cols-3 items-center gap-4"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_Label, { for: "width" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Width`);
                              } else {
                                return [
                                  createTextVNode("Width")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_Input, {
                            id: "width",
                            type: "text",
                            "default-value": "100%",
                            class: "col-span-2 h-8"
                          }, null, _parent5, _scopeId4));
                          _push5(`</div><div class="grid grid-cols-3 items-center gap-4"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_Label, { for: "maxWidth" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Max. width`);
                              } else {
                                return [
                                  createTextVNode("Max. width")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_Input, {
                            id: "maxWidth",
                            type: "text",
                            "default-value": "300px",
                            class: "col-span-2 h-8"
                          }, null, _parent5, _scopeId4));
                          _push5(`</div><div class="grid grid-cols-3 items-center gap-4"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_Label, { for: "height" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Height`);
                              } else {
                                return [
                                  createTextVNode("Height")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_Input, {
                            id: "height",
                            type: "text",
                            "default-value": "25px",
                            class: "col-span-2 h-8"
                          }, null, _parent5, _scopeId4));
                          _push5(`</div><div class="grid grid-cols-3 items-center gap-4"${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_Label, { for: "maxHeight" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Max. height`);
                              } else {
                                return [
                                  createTextVNode("Max. height")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_Input, {
                            id: "maxHeight",
                            type: "text",
                            "default-value": "none",
                            class: "col-span-2 h-8"
                          }, null, _parent5, _scopeId4));
                          _push5(`</div></div></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "grid gap-4" }, [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("h4", { class: "font-medium leading-none" }, " Dimensions "),
                                createVNode("p", { class: "text-sm text-muted-foreground" }, " Set the dimensions for the layer. ")
                              ]),
                              createVNode("div", { class: "grid gap-2" }, [
                                createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                  createVNode(_component_Label, { for: "width" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Width")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "width",
                                    type: "text",
                                    "default-value": "100%",
                                    class: "col-span-2 h-8"
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                  createVNode(_component_Label, { for: "maxWidth" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Max. width")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "maxWidth",
                                    type: "text",
                                    "default-value": "300px",
                                    class: "col-span-2 h-8"
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                  createVNode(_component_Label, { for: "height" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Height")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "height",
                                    type: "text",
                                    "default-value": "25px",
                                    class: "col-span-2 h-8"
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                  createVNode(_component_Label, { for: "maxHeight" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Max. height")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_Input, {
                                    id: "maxHeight",
                                    type: "text",
                                    "default-value": "none",
                                    class: "col-span-2 h-8"
                                  })
                                ])
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_Button, { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(" Open popover ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_PopoverContent, { class: "w-80" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("h4", { class: "font-medium leading-none" }, " Dimensions "),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Set the dimensions for the layer. ")
                            ]),
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "width" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Width")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "width",
                                  type: "text",
                                  "default-value": "100%",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "maxWidth" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Max. width")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "maxWidth",
                                  type: "text",
                                  "default-value": "300px",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "height" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Height")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "height",
                                  type: "text",
                                  "default-value": "25px",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "maxHeight" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Max. height")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "maxHeight",
                                  type: "text",
                                  "default-value": "none",
                                  class: "col-span-2 h-8"
                                })
                              ])
                            ])
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
                  createVNode(_component_Popover, null, {
                    default: withCtx(() => [
                      createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(_component_Button, { variant: "outline" }, {
                            default: withCtx(() => [
                              createTextVNode(" Open popover ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_PopoverContent, { class: "w-80" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "grid gap-4" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("h4", { class: "font-medium leading-none" }, " Dimensions "),
                              createVNode("p", { class: "text-sm text-muted-foreground" }, " Set the dimensions for the layer. ")
                            ]),
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "width" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Width")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "width",
                                  type: "text",
                                  "default-value": "100%",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "maxWidth" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Max. width")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "maxWidth",
                                  type: "text",
                                  "default-value": "300px",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "height" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Height")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "height",
                                  type: "text",
                                  "default-value": "25px",
                                  class: "col-span-2 h-8"
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                                createVNode(_component_Label, { for: "maxHeight" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Max. height")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Input, {
                                  id: "maxHeight",
                                  type: "text",
                                  "default-value": "none",
                                  class: "col-span-2 h-8"
                                })
                              ])
                            ])
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
                createVNode(_component_Popover, null, {
                  default: withCtx(() => [
                    createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                      default: withCtx(() => [
                        createVNode(_component_Button, { variant: "outline" }, {
                          default: withCtx(() => [
                            createTextVNode(" Open popover ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_PopoverContent, { class: "w-80" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "grid gap-4" }, [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("h4", { class: "font-medium leading-none" }, " Dimensions "),
                            createVNode("p", { class: "text-sm text-muted-foreground" }, " Set the dimensions for the layer. ")
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                              createVNode(_component_Label, { for: "width" }, {
                                default: withCtx(() => [
                                  createTextVNode("Width")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Input, {
                                id: "width",
                                type: "text",
                                "default-value": "100%",
                                class: "col-span-2 h-8"
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                              createVNode(_component_Label, { for: "maxWidth" }, {
                                default: withCtx(() => [
                                  createTextVNode("Max. width")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Input, {
                                id: "maxWidth",
                                type: "text",
                                "default-value": "300px",
                                class: "col-span-2 h-8"
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                              createVNode(_component_Label, { for: "height" }, {
                                default: withCtx(() => [
                                  createTextVNode("Height")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Input, {
                                id: "height",
                                type: "text",
                                "default-value": "25px",
                                class: "col-span-2 h-8"
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-3 items-center gap-4" }, [
                              createVNode(_component_Label, { for: "maxHeight" }, {
                                default: withCtx(() => [
                                  createTextVNode("Max. height")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Input, {
                                id: "maxHeight",
                                type: "text",
                                "default-value": "none",
                                class: "col-span-2 h-8"
                              })
                            ])
                          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/popover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const popover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { popover as default };
//# sourceMappingURL=popover-DCQo8aSg.mjs.map
