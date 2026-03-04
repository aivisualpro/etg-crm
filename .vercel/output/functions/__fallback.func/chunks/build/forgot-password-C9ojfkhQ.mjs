import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, d as _sfc_main$3, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$5 } from './Label-jo0RdEYb.mjs';
import { _ as _sfc_main$7 } from './Input-DUkj5gv1.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, ref, unref, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { Loader2 } from 'lucide-vue-next';
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
import 'reka-ui';
import 'vue-sonner';
import 'class-variance-authority';
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
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$5;
      const _component_Input = _sfc_main$7;
      const _component_Button = _sfc_main$2$1;
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="grid gap-4"><div class="grid gap-2">`);
      _push(ssrRenderComponent(_component_Label, { for: "email" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Email `);
          } else {
            return [
              createTextVNode(" Email ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Input, {
        id: "email",
        placeholder: "name@example.com",
        type: "email",
        "auto-capitalize": "none",
        "auto-complete": "email",
        "auto-correct": "off",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Button, { disabled: unref(isLoading) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Submit `);
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(unref(Loader2), {
                key: 0,
                class: "mr-2 h-4 w-4 animate-spin"
              })) : createCommentVNode("", true),
              createTextVNode(" Submit ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/ForgotPassword.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$1, { __name: "AuthForgotPassword" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$2;
      const _component_CardDescription = _sfc_main$3;
      const _component_CardContent = _sfc_main$4;
      const _component_AuthForgotPassword = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center gap-6 bg-muted p-6 min-h-svh md:p-10" }, _attrs))}><div class="max-w-sm w-full flex flex-col gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "#",
        class: "flex items-center self-center gap-2 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-6 w-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-gallery-vertical-end",
              "class-name": "size-4"
            }, null, _parent2, _scopeId));
            _push2(`</div> Acme Inc. `);
          } else {
            return [
              createVNode("div", { class: "h-6 w-6 flex items-center justify-center rounded-md bg-primary text-primary-foreground" }, [
                createVNode(_component_Icon, {
                  name: "i-lucide-gallery-vertical-end",
                  "class-name": "size-4"
                })
              ]),
              createTextVNode(" Acme Inc. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, { class: "text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Forgot Password `);
                      } else {
                        return [
                          createTextVNode(" Forgot Password ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Enter your email below to reset your password `);
                      } else {
                        return [
                          createTextVNode(" Enter your email below to reset your password ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot Password ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Enter your email below to reset your password ")
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
                  _push3(`<div class="grid mx-auto max-w-sm gap-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_AuthForgotPassword, null, null, _parent3, _scopeId2));
                  _push3(`<p class="text-center text-sm text-muted-foreground"${_scopeId2}> Already have an account? `);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/login",
                    class: "underline underline-offset-4 hover:text-primary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Login `);
                      } else {
                        return [
                          createTextVNode(" Login ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid mx-auto max-w-sm gap-6" }, [
                      createVNode(_component_AuthForgotPassword),
                      createVNode("p", { class: "text-center text-sm text-muted-foreground" }, [
                        createTextVNode(" Already have an account? "),
                        createVNode(_component_NuxtLink, {
                          to: "/login",
                          class: "underline underline-offset-4 hover:text-primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Login ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CardHeader, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(_component_CardTitle, { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot Password ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Enter your email below to reset your password ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid mx-auto max-w-sm gap-6" }, [
                    createVNode(_component_AuthForgotPassword),
                    createVNode("p", { class: "text-center text-sm text-muted-foreground" }, [
                      createTextVNode(" Already have an account? "),
                      createVNode(_component_NuxtLink, {
                        to: "/login",
                        class: "underline underline-offset-4 hover:text-primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Login ")
                        ]),
                        _: 1
                      })
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-password-C9ojfkhQ.mjs.map
