import { _ as _sfc_main$6, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$5, a as _sfc_main$9, b as _sfc_main$4$1, c as _sfc_main$7$1 } from './index-C0kHiKSh.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$7 } from './PinInputSlot-CkmOS29O.mjs';
import { _ as _sfc_main$2$1 } from './server.mjs';
import { defineComponent, mergeProps, ref, withCtx, createVNode, createTextVNode, unref, isRef, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-A1gIWmIO.mjs';
import 'class-variance-authority';
import './Label-jo0RdEYb.mjs';
import 'reka-ui';
import './Separator-D0XHHfBk.mjs';
import 'lucide-vue-next';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OTPForm2",
  __ssrInlineRender: true,
  setup(__props) {
    const value = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Card = _sfc_main$6;
      const _component_CardContent = _sfc_main$4;
      const _component_FieldGroup = _sfc_main$5;
      const _component_Field = _sfc_main$9;
      const _component_FieldLabel = _sfc_main$4$1;
      const _component_PinInput = _sfc_main$3;
      const _component_PinInputGroup = _sfc_main$2;
      const _component_PinInputSlot = _sfc_main$7;
      const _component_FieldDescription = _sfc_main$7$1;
      const _component_Button = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6 md:min-h-[450px]" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Card, { class: "flex-1 overflow-hidden p-0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardContent, { class: "grid flex-1 p-0 md:grid-cols-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="flex flex-col items-center justify-center p-6 md:p-8"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FieldGroup, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Field, { class: "items-center text-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<h1 class="text-2xl font-bold"${_scopeId4}> Enter verification code </h1><p class="text-muted-foreground text-sm text-balance"${_scopeId4}> We sent a 6-digit code to your email </p>`);
                            } else {
                              return [
                                createVNode("h1", { class: "text-2xl font-bold" }, " Enter verification code "),
                                createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " We sent a 6-digit code to your email ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Field, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FieldLabel, {
                                "html-for": "otp",
                                class: "sr-only"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Verification code `);
                                  } else {
                                    return [
                                      createTextVNode(" Verification code ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_PinInput, {
                                id: "otp",
                                modelValue: unref(value),
                                "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                                class: "justify-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(6, (id, index) => {
                                            _push7(ssrRenderComponent(_component_PinInputSlot, {
                                              key: id,
                                              index
                                            }, null, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                              return createVNode(_component_PinInputSlot, {
                                                key: id,
                                                index
                                              }, null, 8, ["index"]);
                                            }), 64))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                            return createVNode(_component_PinInputSlot, {
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Enter the 6-digit code sent to your email. `);
                                  } else {
                                    return [
                                      createTextVNode(" Enter the 6-digit code sent to your email. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_FieldLabel, {
                                  "html-for": "otp",
                                  class: "sr-only"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Verification code ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_PinInput, {
                                  id: "otp",
                                  modelValue: unref(value),
                                  "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                                  class: "justify-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                          return createVNode(_component_PinInputSlot, {
                                            key: id,
                                            index
                                          }, null, 8, ["index"]);
                                        }), 64))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_FieldDescription, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Enter the 6-digit code sent to your email. ")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_Field, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, { type: "submit" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Verify `);
                                  } else {
                                    return [
                                      createTextVNode(" Verify ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Didn&#39;t receive the code? <a href="#"${_scopeId5}>Resend</a>`);
                                  } else {
                                    return [
                                      createTextVNode(" Didn't receive the code? "),
                                      createVNode("a", { href: "#" }, "Resend")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, { type: "submit" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Verify ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FieldDescription, { class: "text-center" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Didn't receive the code? "),
                                    createVNode("a", { href: "#" }, "Resend")
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
                          createVNode(_component_Field, { class: "items-center text-center" }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "text-2xl font-bold" }, " Enter verification code "),
                              createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " We sent a 6-digit code to your email ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Field, null, {
                            default: withCtx(() => [
                              createVNode(_component_FieldLabel, {
                                "html-for": "otp",
                                class: "sr-only"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Verification code ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_PinInput, {
                                id: "otp",
                                modelValue: unref(value),
                                "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                                class: "justify-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                        return createVNode(_component_PinInputSlot, {
                                          key: id,
                                          index
                                        }, null, 8, ["index"]);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Enter the 6-digit code sent to your email. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Field, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, { type: "submit" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Verify ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Didn't receive the code? "),
                                  createVNode("a", { href: "#" }, "Resend")
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
                  _push3(`</form><div class="bg-muted relative hidden md:block"${_scopeId2}><img${ssrRenderAttr("src", _imports_0)} alt="Image" class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("form", { class: "flex flex-col items-center justify-center p-6 md:p-8" }, [
                      createVNode(_component_FieldGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_Field, { class: "items-center text-center" }, {
                            default: withCtx(() => [
                              createVNode("h1", { class: "text-2xl font-bold" }, " Enter verification code "),
                              createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " We sent a 6-digit code to your email ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Field, null, {
                            default: withCtx(() => [
                              createVNode(_component_FieldLabel, {
                                "html-for": "otp",
                                class: "sr-only"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Verification code ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_PinInput, {
                                id: "otp",
                                modelValue: unref(value),
                                "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                                class: "justify-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                        return createVNode(_component_PinInputSlot, {
                                          key: id,
                                          index
                                        }, null, 8, ["index"]);
                                      }), 64))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Enter the 6-digit code sent to your email. ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_Field, null, {
                            default: withCtx(() => [
                              createVNode(_component_Button, { type: "submit" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Verify ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FieldDescription, { class: "text-center" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Didn't receive the code? "),
                                  createVNode("a", { href: "#" }, "Resend")
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
                    createVNode("div", { class: "bg-muted relative hidden md:block" }, [
                      createVNode("img", {
                        src: _imports_0,
                        alt: "Image",
                        class: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CardContent, { class: "grid flex-1 p-0 md:grid-cols-2" }, {
                default: withCtx(() => [
                  createVNode("form", { class: "flex flex-col items-center justify-center p-6 md:p-8" }, [
                    createVNode(_component_FieldGroup, null, {
                      default: withCtx(() => [
                        createVNode(_component_Field, { class: "items-center text-center" }, {
                          default: withCtx(() => [
                            createVNode("h1", { class: "text-2xl font-bold" }, " Enter verification code "),
                            createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " We sent a 6-digit code to your email ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Field, null, {
                          default: withCtx(() => [
                            createVNode(_component_FieldLabel, {
                              "html-for": "otp",
                              class: "sr-only"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Verification code ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_PinInput, {
                              id: "otp",
                              modelValue: unref(value),
                              "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
                              class: "justify-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_PinInputGroup, { class: "gap-2.5 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                                      return createVNode(_component_PinInputSlot, {
                                        key: id,
                                        index
                                      }, null, 8, ["index"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_FieldDescription, { class: "text-center" }, {
                              default: withCtx(() => [
                                createTextVNode(" Enter the 6-digit code sent to your email. ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Field, null, {
                          default: withCtx(() => [
                            createVNode(_component_Button, { type: "submit" }, {
                              default: withCtx(() => [
                                createTextVNode(" Verify ")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_FieldDescription, { class: "text-center" }, {
                              default: withCtx(() => [
                                createTextVNode(" Didn't receive the code? "),
                                createVNode("a", { href: "#" }, "Resend")
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
                  createVNode("div", { class: "bg-muted relative hidden md:block" }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "Image",
                      class: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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
      _push(ssrRenderComponent(_component_FieldDescription, { class: "text-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` By clicking continue, you agree to our <a href="#"${_scopeId}>Terms of Service</a> and <a href="#"${_scopeId}>Privacy Policy</a>. `);
          } else {
            return [
              createTextVNode(" By clicking continue, you agree to our "),
              createVNode("a", { href: "#" }, "Terms of Service"),
              createTextVNode(" and "),
              createVNode("a", { href: "#" }, "Privacy Policy"),
              createTextVNode(". ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/OTPForm2.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AuthOTPForm2" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "otp-2",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthOTPForm2 = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-svh w-full items-center justify-center p-6 md:p-10" }, _attrs))}><div class="w-full max-w-sm md:max-w-3xl">`);
      _push(ssrRenderComponent(_component_AuthOTPForm2, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/otp-2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=otp-2-CsW0T6yG.mjs.map
