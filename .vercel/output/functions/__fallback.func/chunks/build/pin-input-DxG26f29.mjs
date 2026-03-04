import { _ as _sfc_main$1 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2$1, c as _sfc_main$1$2 } from './PinInputSlot-CkmOS29O.mjs';
import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, unref, isRef, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { toast } from 'vue-sonner';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pin-input",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref([]);
    function handleComplete(e) {
      toast(`PIN Input : ${e.join("")}`);
    }
    const valueSeparator = ref([]);
    function handleCompleteSeparator(e) {
      toast(`PIN Input : ${e.join("")}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$2;
      const _component_CardContent = _sfc_main$4;
      const _component_PinInput = _sfc_main$3;
      const _component_PinInputGroup = _sfc_main$2$1;
      const _component_PinInputInput = resolveComponent("PinInputInput");
      const _component_PinInputSeparator = _sfc_main$1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> PIN Input </h2><p class="text-muted-foreground"> Allows users to input a sequence of one-character alphanumeric inputs. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/pin-input",
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
                to: "https://www.shadcn-vue.com/docs/components/pin-input",
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
              to: "https://www.reka-ui.com/docs/components/pin-input",
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
                to: "https://www.reka-ui.com/docs/components/pin-input",
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
                  _push3(ssrRenderComponent(_component_PinInput, {
                    id: "pin-input",
                    modelValue: unref(value),
                    "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                    placeholder: "○",
                    onComplete: handleComplete
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_PinInputGroup, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(5, (id, index) => {
                                _push5(ssrRenderComponent(_component_PinInputInput, {
                                  key: id,
                                  index
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                  return createVNode(_component_PinInputInput, {
                                    key: id,
                                    index
                                  }, null, 8, ["index"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_PinInputGroup, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                return createVNode(_component_PinInputInput, {
                                  key: id,
                                  index
                                }, null, 8, ["index"]);
                              }), 64))
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
                      createVNode(_component_PinInput, {
                        id: "pin-input",
                        modelValue: unref(value),
                        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                        placeholder: "○",
                        onComplete: handleComplete
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_PinInputGroup, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                return createVNode(_component_PinInputInput, {
                                  key: id,
                                  index
                                }, null, 8, ["index"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode(_component_PinInput, {
                      id: "pin-input",
                      modelValue: unref(value),
                      "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                      placeholder: "○",
                      onComplete: handleComplete
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_PinInputGroup, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                              return createVNode(_component_PinInputInput, {
                                key: id,
                                index
                              }, null, 8, ["index"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
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
                        _push4(`With Separator`);
                      } else {
                        return [
                          createTextVNode("With Separator")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("With Separator")
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
                  _push3(ssrRenderComponent(_component_PinInput, {
                    id: "pin-input",
                    modelValue: unref(valueSeparator),
                    "onUpdate:modelValue": ($event) => isRef(valueSeparator) ? valueSeparator.value = $event : null,
                    placeholder: "○",
                    onComplete: handleCompleteSeparator
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_PinInputGroup, { class: "gap-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(5, (id, index) => {
                                _push5(`<!--[-->`);
                                _push5(ssrRenderComponent(_component_PinInputInput, {
                                  class: "border rounded-md",
                                  index
                                }, null, _parent5, _scopeId4));
                                if (index !== 4) {
                                  _push5(ssrRenderComponent(_component_PinInputSeparator, null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                  return openBlock(), createBlock(Fragment, { key: id }, [
                                    createVNode(_component_PinInputInput, {
                                      class: "border rounded-md",
                                      index
                                    }, null, 8, ["index"]),
                                    index !== 4 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                                  ], 64);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_PinInputGroup, { class: "gap-1" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                return openBlock(), createBlock(Fragment, { key: id }, [
                                  createVNode(_component_PinInputInput, {
                                    class: "border rounded-md",
                                    index
                                  }, null, 8, ["index"]),
                                  index !== 4 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                                ], 64);
                              }), 64))
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
                      createVNode(_component_PinInput, {
                        id: "pin-input",
                        modelValue: unref(valueSeparator),
                        "onUpdate:modelValue": ($event) => isRef(valueSeparator) ? valueSeparator.value = $event : null,
                        placeholder: "○",
                        onComplete: handleCompleteSeparator
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_PinInputGroup, { class: "gap-1" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                                return openBlock(), createBlock(Fragment, { key: id }, [
                                  createVNode(_component_PinInputInput, {
                                    class: "border rounded-md",
                                    index
                                  }, null, 8, ["index"]),
                                  index !== 4 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                                ], 64);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createTextVNode("With Separator")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                    createVNode(_component_PinInput, {
                      id: "pin-input",
                      modelValue: unref(valueSeparator),
                      "onUpdate:modelValue": ($event) => isRef(valueSeparator) ? valueSeparator.value = $event : null,
                      placeholder: "○",
                      onComplete: handleCompleteSeparator
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_PinInputGroup, { class: "gap-1" }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (id, index) => {
                              return openBlock(), createBlock(Fragment, { key: id }, [
                                createVNode(_component_PinInputInput, {
                                  class: "border rounded-md",
                                  index
                                }, null, 8, ["index"]),
                                index !== 4 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                              ], 64);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/pin-input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pin-input-DxG26f29.mjs.map
