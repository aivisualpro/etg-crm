import { _ as _sfc_main$1 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$1$2, a as _sfc_main$3 } from './RadioGroupItem-B8jnVbDg.mjs';
import { _ as _sfc_main$5 } from './Label-jo0RdEYb.mjs';
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
import 'lucide-vue-next';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$1;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$2;
  const _component_CardContent = _sfc_main$4;
  const _component_RadioGroup = _sfc_main$1$2;
  const _component_RadioGroupItem = _sfc_main$3;
  const _component_Label = _sfc_main$5;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Radio Group </h2><p class="text-muted-foreground"> A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/radio-group",
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
            to: "https://www.shadcn-vue.com/docs/components/radio-group",
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
          to: "https://www.reka-ui.com/docs/components/radio-group",
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
            to: "https://www.reka-ui.com/docs/components/radio-group",
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
              _push3(ssrRenderComponent(_component_RadioGroup, {
                "default-value": "comfortable",
                orientation: "vertical"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="flex items-center space-x-2"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_RadioGroupItem, {
                      id: "r1",
                      value: "default"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_Label, { for: "r1" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Default`);
                        } else {
                          return [
                            createTextVNode("Default")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div><div class="flex items-center space-x-2"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_RadioGroupItem, {
                      id: "r2",
                      value: "comfortable"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_Label, { for: "r2" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Comfortable`);
                        } else {
                          return [
                            createTextVNode("Comfortable")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div><div class="flex items-center space-x-2"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_RadioGroupItem, {
                      id: "r3",
                      value: "compact"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_Label, { for: "r3" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`Compact`);
                        } else {
                          return [
                            createTextVNode("Compact")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r1",
                          value: "default"
                        }),
                        createVNode(_component_Label, { for: "r1" }, {
                          default: withCtx(() => [
                            createTextVNode("Default")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r2",
                          value: "comfortable"
                        }),
                        createVNode(_component_Label, { for: "r2" }, {
                          default: withCtx(() => [
                            createTextVNode("Comfortable")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r3",
                          value: "compact"
                        }),
                        createVNode(_component_Label, { for: "r3" }, {
                          default: withCtx(() => [
                            createTextVNode("Compact")
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
                createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                  createVNode(_component_RadioGroup, {
                    "default-value": "comfortable",
                    orientation: "vertical"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r1",
                          value: "default"
                        }),
                        createVNode(_component_Label, { for: "r1" }, {
                          default: withCtx(() => [
                            createTextVNode("Default")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r2",
                          value: "comfortable"
                        }),
                        createVNode(_component_Label, { for: "r2" }, {
                          default: withCtx(() => [
                            createTextVNode("Comfortable")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode(_component_RadioGroupItem, {
                          id: "r3",
                          value: "compact"
                        }),
                        createVNode(_component_Label, { for: "r3" }, {
                          default: withCtx(() => [
                            createTextVNode("Compact")
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
              createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                createVNode(_component_RadioGroup, {
                  "default-value": "comfortable",
                  orientation: "vertical"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode(_component_RadioGroupItem, {
                        id: "r1",
                        value: "default"
                      }),
                      createVNode(_component_Label, { for: "r1" }, {
                        default: withCtx(() => [
                          createTextVNode("Default")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode(_component_RadioGroupItem, {
                        id: "r2",
                        value: "comfortable"
                      }),
                      createVNode(_component_Label, { for: "r2" }, {
                        default: withCtx(() => [
                          createTextVNode("Comfortable")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode(_component_RadioGroupItem, {
                        id: "r3",
                        value: "compact"
                      }),
                      createVNode(_component_Label, { for: "r3" }, {
                        default: withCtx(() => [
                          createTextVNode("Compact")
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
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/radio-group.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const radioGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { radioGroup as default };
//# sourceMappingURL=radio-group-n8wOBwdO.mjs.map
