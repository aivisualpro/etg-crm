import { defineComponent, withCtx, createTextVNode, createVNode, mergeProps, ref, unref, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DJ9oAi63.mjs';
import { _ as _sfc_main$3 } from './Label-jo0RdEYb.mjs';
import { _ as _sfc_main$4 } from './Input-DUkj5gv1.mjs';
import { e as cn, _ as _sfc_main$2$1 } from './server.mjs';
import { _ as _sfc_main$5 } from './Separator-D0XHHfBk.mjs';
import { Loader2 } from 'lucide-vue-next';
import { P as PasswordInput } from './PasswordInput-B7767qqZ.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
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
import 'reka-ui';
import 'vue-router';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Auth",
  __ssrInlineRender: true,
  props: {
    reverse: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative flex items-center justify-center px-4 h-dvh lg:max-w-none lg:px-0", { "flex-row-reverse": __props.reverse }]
      }, _attrs))}><div class="relative hidden h-full flex-1 flex-col bg-muted p-10 text-white lg:flex dark:border-r"><div class="absolute inset-0 bg-zinc-900"></div><div class="relative z-20 flex items-center text-lg font-medium gap-2"><img${ssrRenderAttr("src", _imports_0)} alt="ETG CRM" class="size-7 rounded-md"> ETG CRM </div><div class="relative z-20 mt-auto"><blockquote class="space-y-2"><p class="text-lg"> “ETG CRM has transformed how we manage our entire business — a comprehensive CRM platform all in one place.” </p><footer class="text-sm"> Yosi Nuri, Founder </footer></blockquote></div></div><div class="mx-auto flex-1 lg:p-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Auth.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "LayoutAuth" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SignUp",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Label = _sfc_main$3;
      const _component_Input = _sfc_main$4;
      const _component_Button = _sfc_main$2$1;
      const _component_Separator = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("grid gap-6", _ctx.$attrs.class ?? "")
      }, _attrs))}><form><div class="grid gap-4"><div class="grid gap-2">`);
      _push(ssrRenderComponent(_component_Label, { for: "name" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Name `);
          } else {
            return [
              createTextVNode(" Name ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Input, {
        id: "name",
        placeholder: "Enter your name",
        type: "text",
        "auto-capitalize": "none",
        "auto-complete": "name",
        "auto-correct": "off",
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div><div class="grid gap-2">`);
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
      _push(`</div><div class="grid gap-2">`);
      _push(ssrRenderComponent(_component_Label, { for: "password" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Password `);
          } else {
            return [
              createTextVNode(" Password ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PasswordInput, { id: "password" }, null, _parent));
      _push(`</div><div class="grid gap-2">`);
      _push(ssrRenderComponent(_component_Label, { for: "confirm-password" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Confirm Password `);
          } else {
            return [
              createTextVNode(" Confirm Password ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PasswordInput, { id: "confirm-password" }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_Button, { disabled: unref(isLoading) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoading)) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "mr-2 h-4 w-4 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` Sign In with Email `);
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(unref(Loader2), {
                key: 0,
                class: "mr-2 h-4 w-4 animate-spin"
              })) : createCommentVNode("", true),
              createTextVNode(" Sign In with Email ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
      _push(ssrRenderComponent(_component_Separator, { label: "Or continue with" }, null, _parent));
      _push(`<div class="flex items-center gap-4 flex-col">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "outline",
        class: "w-full gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4"${_scopeId}><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor"${_scopeId}></path></svg> Apple `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                class: "size-4"
              }, [
                createVNode("path", {
                  d: "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
                  fill: "currentColor"
                })
              ])),
              createTextVNode(" Apple ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        variant: "outline",
        class: "w-full gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4"${_scopeId}><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor"${_scopeId}></path></svg> Google `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                class: "size-4"
              }, [
                createVNode("path", {
                  d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
                  fill: "currentColor"
                })
              ])),
              createTextVNode(" Google ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/SignUp.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AuthSignUp" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutAuth = __nuxt_component_0;
      const _component_AuthSignUp = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_3;
      _push(ssrRenderComponent(_component_LayoutAuth, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid mx-auto max-w-sm gap-6"${_scopeId}><div class="flex flex-col text-center space-y-2"${_scopeId}><h1 class="text-2xl font-semibold tracking-tight"${_scopeId}> Create an account </h1><p class="text-sm text-muted-foreground"${_scopeId}> Enter your email below to create your account </p></div>`);
            _push2(ssrRenderComponent(_component_AuthSignUp, null, null, _parent2, _scopeId));
            _push2(`<p class="text-center text-sm text-muted-foreground"${_scopeId}> Already have an account? `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/login",
              class: "underline underline-offset-4 hover:text-primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Login `);
                } else {
                  return [
                    createTextVNode(" Login ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p><p class="px-8 text-center text-sm text-muted-foreground"${_scopeId}> By clicking continue, you agree to our <a href="/terms" class="underline underline-offset-4 hover:text-primary"${_scopeId}> Terms of Service </a> and <a href="/privacy" class="underline underline-offset-4 hover:text-primary"${_scopeId}> Privacy Policy </a> . </p></div>`);
          } else {
            return [
              createVNode("div", { class: "grid mx-auto max-w-sm gap-6" }, [
                createVNode("div", { class: "flex flex-col text-center space-y-2" }, [
                  createVNode("h1", { class: "text-2xl font-semibold tracking-tight" }, " Create an account "),
                  createVNode("p", { class: "text-sm text-muted-foreground" }, " Enter your email below to create your account ")
                ]),
                createVNode(_component_AuthSignUp),
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
                ]),
                createVNode("p", { class: "px-8 text-center text-sm text-muted-foreground" }, [
                  createTextVNode(" By clicking continue, you agree to our "),
                  createVNode("a", {
                    href: "/terms",
                    class: "underline underline-offset-4 hover:text-primary"
                  }, " Terms of Service "),
                  createTextVNode(" and "),
                  createVNode("a", {
                    href: "/privacy",
                    class: "underline underline-offset-4 hover:text-primary"
                  }, " Privacy Policy "),
                  createTextVNode(" . ")
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-Bzu1tvJV.mjs.map
