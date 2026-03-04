import { _ as __nuxt_component_0 } from './OTPForm-EY9krzu2.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-A1gIWmIO.mjs';
import './index-C0kHiKSh.mjs';
import 'class-variance-authority';
import './server.mjs';
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
import 'clsx';
import 'tailwind-merge';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import './Label-jo0RdEYb.mjs';
import './Separator-D0XHHfBk.mjs';
import './PinInputSlot-CkmOS29O.mjs';
import 'lucide-vue-next';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "otp",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthOTPForm = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-svh w-full" }, _attrs))}><div class="flex w-full items-center justify-center p-6 lg:w-1/2"><div class="w-full max-w-xs">`);
      _push(ssrRenderComponent(_component_AuthOTPForm, null, null, _parent));
      _push(`</div></div><div class="relative hidden w-1/2 lg:block"><img alt="Authentication" class="absolute inset-0 h-full w-full object-cover" height="{1080}"${ssrRenderAttr("src", _imports_0)} width="{1920}"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/otp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=otp-DNNl-AnC.mjs.map
