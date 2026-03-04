import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DJ9oAi63.mjs';
import { ShieldX, X, Loader2 } from 'lucide-vue-next';
import { u as useAuth, n as navigateTo, c as useRoute, d as useSeoMeta } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn.value) {
      navigateTo("/");
    }
    const route = useRoute();
    const isLoading = ref(false);
    const authError = computed(() => route.query.error);
    const rejectedEmail = computed(() => route.query.email);
    const showError = ref(!!route.query.error);
    useSeoMeta({
      title: "Sign In — ETG CRM",
      description: "Sign in with your Google account to access the ETG CRM platform."
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-982ca35e><div class="login-bg" data-v-982ca35e></div><div class="login-glow login-glow--1" data-v-982ca35e></div><div class="login-glow login-glow--2" data-v-982ca35e></div><div class="login-container" data-v-982ca35e><div class="login-brand" data-v-982ca35e><div class="login-brand__inner" data-v-982ca35e><div class="login-brand__hero" data-v-982ca35e><div class="login-logo-sun" data-v-982ca35e><div class="sun-rays" data-v-982ca35e><!--[-->`);
      ssrRenderList(12, (i) => {
        _push(`<div class="sun-ray" style="${ssrRenderStyle({ "--ray-index": i })}" data-v-982ca35e></div>`);
      });
      _push(`<!--]--></div><div class="sun-halo" data-v-982ca35e></div><div class="sun-halo sun-halo--outer" data-v-982ca35e></div><div class="sun-particles" data-v-982ca35e><!--[-->`);
      ssrRenderList(6, (i) => {
        _push(`<div class="sun-particle" style="${ssrRenderStyle({ "--p-index": i })}" data-v-982ca35e></div>`);
      });
      _push(`<!--]--></div><div class="sun-logo-ring" data-v-982ca35e><img${ssrRenderAttr("src", _imports_0)} alt="ETG CRM" class="sun-logo-img" data-v-982ca35e></div></div><div class="login-brand__title" data-v-982ca35e><h2 data-v-982ca35e>ETG CRM</h2><p data-v-982ca35e>Enterprise CRM Platform</p></div></div><div class="login-brand__quote" data-v-982ca35e><blockquote class="space-y-3" data-v-982ca35e><p class="text-lg leading-relaxed text-white/80 italic" data-v-982ca35e> “A comprehensive platform that streamlines every aspect of our business all in one place.” </p><footer class="text-sm text-white/50 font-medium" data-v-982ca35e> — ETG Management Team </footer></blockquote></div><div class="login-brand__grid" data-v-982ca35e></div></div></div><div class="login-form-panel" data-v-982ca35e><div class="login-form-wrapper" data-v-982ca35e><div class="login-mobile-logo" data-v-982ca35e><img${ssrRenderAttr("src", _imports_0)} alt="ETG CRM" class="size-10 rounded-lg" data-v-982ca35e></div>`);
      if (unref(showError) && unref(authError) === "unauthorized") {
        _push(`<div class="login-error" data-v-982ca35e><div class="login-error__icon" data-v-982ca35e>`);
        _push(ssrRenderComponent(unref(ShieldX), { class: "size-5" }, null, _parent));
        _push(`</div><div class="login-error__content" data-v-982ca35e><p class="login-error__title" data-v-982ca35e>Access Denied</p><p class="login-error__msg" data-v-982ca35e><strong data-v-982ca35e>${ssrInterpolate(unref(rejectedEmail))}</strong> is not authorized to access this platform. Please contact your administrator or try a different account. </p></div><button class="login-error__close" data-v-982ca35e>`);
        _push(ssrRenderComponent(unref(X), { class: "size-4" }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showError) && unref(authError) === "inactive") {
        _push(`<div class="login-error" data-v-982ca35e><div class="login-error__icon" data-v-982ca35e>`);
        _push(ssrRenderComponent(unref(ShieldX), { class: "size-5" }, null, _parent));
        _push(`</div><div class="login-error__content" data-v-982ca35e><p class="login-error__title" data-v-982ca35e>Account Deactivated</p><p class="login-error__msg" data-v-982ca35e><strong data-v-982ca35e>${ssrInterpolate(unref(rejectedEmail))}</strong> account is currently inactive. Please contact your administrator to reactivate your access. </p></div><button class="login-error__close" data-v-982ca35e>`);
        _push(ssrRenderComponent(unref(X), { class: "size-4" }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="login-form__header" data-v-982ca35e><h1 class="text-2xl font-bold tracking-tight text-foreground" data-v-982ca35e> Welcome back </h1><p class="text-sm text-muted-foreground mt-2" data-v-982ca35e> Sign in with your Google account to continue </p></div><button id="google-signin-btn" class="login-google-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-982ca35e>`);
      if (unref(isLoading)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Loader2), { class: "size-5 animate-spin" }, null, _parent));
        _push(`<span data-v-982ca35e>Redirecting...</span><!--]-->`);
      } else {
        _push(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5" data-v-982ca35e><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" data-v-982ca35e></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" data-v-982ca35e></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" data-v-982ca35e></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" data-v-982ca35e></path></svg><span data-v-982ca35e>Continue with Google</span><!--]-->`);
      }
      _push(`</button><div class="login-divider" data-v-982ca35e><div class="login-divider__line" data-v-982ca35e></div><span class="login-divider__text" data-v-982ca35e>Authorized users only</span><div class="login-divider__line" data-v-982ca35e></div></div><p class="text-xs text-muted-foreground text-center leading-relaxed" data-v-982ca35e> By signing in, you agree to our terms of service and privacy policy. Only authorized Google accounts can access this platform. </p></div><div class="login-footer" data-v-982ca35e><p class="text-xs text-muted-foreground" data-v-982ca35e> © 2026 ETG CRM. All rights reserved. </p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-982ca35e"]]);

export { login as default };
//# sourceMappingURL=login-CS7kWsDm.mjs.map
