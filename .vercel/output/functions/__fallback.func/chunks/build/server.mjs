import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, computed, toValue, unref, mergeProps, withCtx, renderSlot, h, hasInjectionContext, inject, getCurrentInstance, onServerPrefetch, ref, Suspense, watch, nextTick, shallowRef, effectScope, watchEffect, getCurrentScope, onScopeDispose, provide, shallowReactive, Fragment, toRef, isRef, readonly, customRef, reactive, createElementBlock, cloneVNode, defineAsyncComponent, toRefs, toRaw, useSSRContext, createApp, createVNode, onErrorCaptured, resolveDynamicComponent, isReadonly, isShallow, isReactive, createTextVNode, markRaw } from 'vue';
import { B as hasProtocol, C as isScriptProtocol, D as joinURL, E as withQuery, F as createDefu, y as destr, G as klona, H as defuFn, I as sanitizeStatusCode, a as getRequestHeader, J as isEqual, K as getContext, b as setCookie, L as getCookie, M as deleteCookie, c as createError$1, $ as $fetch$1, N as baseURL, O as createHooks, P as executeAsync, Q as toRouteMatcher, R as createRouter$1, S as defu } from '../nitro/nitro.mjs';
import { RouterView, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderSuspense, ssrRenderVNode, ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { Primitive, ConfigProvider } from 'reka-ui';
import { Toaster } from 'vue-sonner';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { debounce } from 'perfect-debounce';
import { u as useSeoMeta$1, h as headSymbol, a as useHead$1 } from '../routes/renderer.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.2.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function defineAppConfig(config) {
  return config;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_72ymMDvWUqPL7Hxh0ZIVKWE0qJlhsxhLMocQ5UW5CVo = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const __nuxt_page_meta$d = {
  layout: "blank"
};
const __nuxt_page_meta$c = {
  layout: "blank"
};
const __nuxt_page_meta$b = {
  layout: "blank"
};
const __nuxt_page_meta$a = {
  layout: "blank"
};
const __nuxt_page_meta$9 = {
  layout: "blank"
};
const __nuxt_page_meta$8 = {
  layout: "blank"
};
const __nuxt_page_meta$7 = {
  layout: "blank"
};
const __nuxt_page_meta$6 = {
  layout: "blank"
};
const __nuxt_page_meta$5 = {
  layout: "blank"
};
const __nuxt_page_meta$4 = {
  layout: "blank"
};
const __nuxt_page_meta$3 = null;
const __nuxt_page_meta$2 = {
  layout: "blank"
};
const __nuxt_page_meta$1 = {
  layout: "blank"
};
const __nuxt_page_meta = null;
const component_45stubq0xFwhKck_CFNPAwgRemNP_mozl2qVErtue6wRYThAw = {};
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-0QOMKww7.mjs')
  },
  {
    name: "otp",
    path: "/otp",
    meta: __nuxt_page_meta$d || {},
    component: () => import('./otp-DNNl-AnC.mjs')
  },
  {
    name: "401",
    path: "/401",
    meta: __nuxt_page_meta$c || {},
    component: () => import('./401-o8mvnSLZ.mjs')
  },
  {
    name: "403",
    path: "/403",
    meta: __nuxt_page_meta$b || {},
    component: () => import('./403-oN-qPK2d.mjs')
  },
  {
    name: "404",
    path: "/404",
    meta: __nuxt_page_meta$a || {},
    component: () => import('./404-CaH2ybly.mjs')
  },
  {
    name: "500",
    path: "/500",
    meta: __nuxt_page_meta$9 || {},
    component: () => import('./500-DZQWJjfm.mjs')
  },
  {
    name: "503",
    path: "/503",
    meta: __nuxt_page_meta$8 || {},
    component: () => import('./503-BpOaV56n.mjs')
  },
  {
    name: "admin-users",
    path: "/admin/users",
    component: () => import('./users-XAFqTtik.mjs')
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$7 || {},
    component: () => import('./login-CS7kWsDm.mjs')
  },
  {
    name: "otp-1",
    path: "/otp-1",
    meta: __nuxt_page_meta$6 || {},
    component: () => import('./otp-1-DQM2QA6N.mjs')
  },
  {
    name: "otp-2",
    path: "/otp-2",
    meta: __nuxt_page_meta$5 || {},
    component: () => import('./otp-2-CsW0T6yG.mjs')
  },
  {
    name: "admin-entities",
    path: "/admin/entities",
    component: () => import('./entities-eNsK6wZ5.mjs')
  },
  {
    name: "admin-language",
    path: "/admin/language",
    component: () => import('./language-CyUiSB_i.mjs')
  },
  {
    name: "components-kbd",
    path: "/components/kbd",
    component: () => import('./kbd-3gF5jTU0.mjs')
  },
  {
    name: "register",
    path: "/register",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./register-Bzu1tvJV.mjs')
  },
  {
    name: __nuxt_page_meta$3?.name,
    path: "/admin/furniture",
    component: () => import('./furniture-CFgzWVoV.mjs'),
    children: [
      {
        name: "admin-furniture",
        path: "",
        component: () => import('./index-ULQ7Esmf.mjs')
      },
      {
        name: "admin-furniture-slug",
        path: ":slug(.*)*",
        component: () => import('./_...slug_-DIGRTWmb.mjs')
      }
    ]
  },
  {
    name: "components-card",
    path: "/components/card",
    component: () => import('./card-SFcd6kqZ.mjs')
  },
  {
    name: "components-form",
    path: "/components/form",
    component: () => import('./form-rXi_mT1z.mjs')
  },
  {
    name: "components-item",
    path: "/components/item",
    component: () => import('./item-BtUypNyq.mjs')
  },
  {
    name: "components-tabs",
    path: "/components/tabs",
    component: () => import('./tabs-Bf-CQOZb.mjs')
  },
  {
    name: "reports-heatmap",
    path: "/reports/heatmap",
    component: () => import('./heatmap-Bqs0uQks.mjs')
  },
  {
    name: "admin-categories",
    path: "/admin/categories",
    component: () => import('./categories-BwqSAdU3.mjs')
  },
  {
    name: "components-alert",
    path: "/components/alert",
    component: () => import('./alert-DPN1SpmI.mjs')
  },
  {
    name: "components-badge",
    path: "/components/badge",
    component: () => import('./badge-BHa0Laf8.mjs')
  },
  {
    name: "components-input",
    path: "/components/input",
    component: () => import('./input-BqzrH7z2.mjs')
  },
  {
    name: "components-label",
    path: "/components/label",
    component: () => import('./label-C-CwLQ2N.mjs')
  },
  {
    name: "components-sheet",
    path: "/components/sheet",
    component: () => import('./sheet-Cj06K7pV.mjs')
  },
  {
    name: "components-table",
    path: "/components/table",
    component: () => import('./table-D_gPr74m.mjs')
  },
  {
    name: "components-avatar",
    path: "/components/avatar",
    component: () => import('./avatar-2FPoX4Iq.mjs')
  },
  {
    name: "components-button",
    path: "/components/button",
    component: () => import('./button-ElXT_k4Y.mjs')
  },
  {
    name: "components-dialog",
    path: "/components/dialog",
    component: () => import('./dialog-NsPqhPMd.mjs')
  },
  {
    name: "components-drawer",
    path: "/components/drawer",
    component: () => import('./drawer-B7_cpq75.mjs')
  },
  {
    name: "components-select",
    path: "/components/select",
    component: () => import('./select-jcOoJDC2.mjs')
  },
  {
    name: "components-slider",
    path: "/components/slider",
    component: () => import('./slider-B9wtjM4p.mjs')
  },
  {
    name: "components-sonner",
    path: "/components/sonner",
    component: () => import('./sonner-Bgm-1PsW.mjs')
  },
  {
    name: "components-switch",
    path: "/components/switch",
    component: () => import('./switch-BW8OxsGb.mjs')
  },
  {
    name: "components-toggle",
    path: "/components/toggle",
    component: () => import('./toggle-CTG6EjvR.mjs')
  },
  {
    name: "reports-furniture",
    path: "/reports/furniture",
    component: () => import('./furniture-D37pxA69.mjs')
  },
  {
    name: "login-basic",
    path: "/login-basic",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./login-basic-JNPY-WJw.mjs')
  },
  {
    name: "components-command",
    path: "/components/command",
    component: () => import('./command-CKhcuN7Y.mjs')
  },
  {
    name: "components-menubar",
    path: "/components/menubar",
    component: () => import('./menubar-I59fM2lx.mjs')
  },
  {
    name: "components-popover",
    path: "/components/popover",
    component: () => import('./popover-DCQo8aSg.mjs')
  },
  {
    name: "components-stepper",
    path: "/components/stepper",
    component: () => import('./stepper-Bs5-U881.mjs')
  },
  {
    name: "components-tooltip",
    path: "/components/tooltip",
    component: () => import('./tooltip-C-xwPl5T.mjs')
  },
  {
    name: "components-calendar",
    path: "/components/calendar",
    component: () => import('./calendar-BXgD9o60.mjs')
  },
  {
    name: "components-carousel",
    path: "/components/carousel",
    component: () => import('./carousel-gPIla0DN.mjs')
  },
  {
    name: "components-checkbox",
    path: "/components/checkbox",
    component: () => import('./checkbox-5KyndLfX.mjs')
  },
  {
    name: "components-combobox",
    path: "/components/combobox",
    component: () => import('./combobox-DqOQ4OwA.mjs')
  },
  {
    name: "components-progress",
    path: "/components/progress",
    component: () => import('./progress-BFQH0Fi0.mjs')
  },
  {
    name: "components-skeleton",
    path: "/components/skeleton",
    component: () => import('./skeleton-BqBL671t.mjs')
  },
  {
    name: "components-textarea",
    path: "/components/textarea",
    component: () => import('./textarea-CujM_yZA.mjs')
  },
  {
    name: "components-accordion",
    path: "/components/accordion",
    component: () => import('./accordion-DWgvbybj.mjs')
  },
  {
    name: "components-pin-input",
    path: "/components/pin-input",
    component: () => import('./pin-input-DxG26f29.mjs')
  },
  {
    name: "components-resizable",
    path: "/components/resizable",
    component: () => import('./resizable-BcXCPWsY.mjs')
  },
  {
    name: "components-separator",
    path: "/components/separator",
    component: () => import('./separator-DGyugkVz.mjs')
  },
  {
    name: "components-breadcrumb",
    path: "/components/breadcrumb",
    component: () => import('./breadcrumb-D4C7FXNE.mjs')
  },
  {
    name: "components-hover-card",
    path: "/components/hover-card",
    component: () => import('./hover-card-DVxARtm_.mjs')
  },
  {
    name: "components-pagination",
    path: "/components/pagination",
    component: () => import('./pagination-q-Dvyf6c.mjs')
  },
  {
    name: "components-tags-input",
    path: "/components/tags-input",
    component: () => import('./tags-input-DiDs2MGz.mjs')
  },
  {
    name: "forgot-password",
    path: "/forgot-password",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./forgot-password-C9ojfkhQ.mjs')
  },
  {
    name: "admin-asset-categories",
    path: "/admin/asset-categories",
    component: () => import('./asset-categories-D0kUAAyH.mjs')
  },
  {
    name: "components-collapsible",
    path: "/components/collapsible",
    component: () => import('./collapsible-SefVDXKZ.mjs')
  },
  {
    name: "components-radio-group",
    path: "/components/radio-group",
    component: () => import('./radio-group-n8wOBwdO.mjs')
  },
  {
    name: "components-scroll-area",
    path: "/components/scroll-area",
    component: () => import('./scroll-area-CIO3x-C0.mjs')
  },
  {
    name: "components-alert-dialog",
    path: "/components/alert-dialog",
    component: () => import('./alert-dialog-CCL0mVzm.mjs')
  },
  {
    name: "components-aspect-ratio",
    path: "/components/aspect-ratio",
    component: () => import('./aspect-ratio-BibFo1kD.mjs')
  },
  {
    name: "components-context-menu",
    path: "/components/context-menu",
    component: () => import('./context-menu-BghsVnKE.mjs')
  },
  {
    name: "components-number-field",
    path: "/components/number-field",
    component: () => import('./number-field-BvkJTICI.mjs')
  },
  {
    name: "components-toggle-group",
    path: "/components/toggle-group",
    component: () => import('./toggle-group-BdskHMX1.mjs')
  },
  {
    name: "admin-asset-descriptions",
    path: "/admin/asset-descriptions",
    component: () => import('./asset-descriptions-C9YhkwvX.mjs')
  },
  {
    name: "components-dropdown-menu",
    path: "/components/dropdown-menu",
    component: () => import('./dropdown-menu-BbWxnIAI.mjs')
  },
  {
    name: "components-range-calendar",
    path: "/components/range-calendar",
    component: () => import('./range-calendar-C5VJ_2o0.mjs')
  },
  {
    name: "components-navigation-menu",
    path: "/components/navigation-menu",
    component: () => import('./navigation-menu-GvaBnJs7.mjs')
  },
  {
    name: "reports-employee-performance",
    path: "/reports/employee-performance",
    component: () => import('./employee-performance-C-ylvy3c.mjs')
  },
  {
    name: __nuxt_page_meta?.name,
    path: "/components",
    component: component_45stubq0xFwhKck_CFNPAwgRemNP_mozl2qVErtue6wRYThAw
  },
  {
    name: __nuxt_page_meta?.name,
    path: "/settings",
    component: component_45stubq0xFwhKck_CFNPAwgRemNP_mozl2qVErtue6wRYThAw
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => comp.components && comp.components.default === from.matched[index2]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useSeoMeta$1(input, { head, ...options });
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function useAuth() {
  const user = useCookie("auth_user", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    // 30 days
    path: "/",
    sameSite: "lax"
  });
  const isLoggedIn = computed(() => !!user.value?.googleId);
  const logout = async () => {
    user.value = null;
    await navigateTo("/login");
  };
  return { user, isLoggedIn, logout };
}
const PUBLIC_ROUTES = [
  "/login",
  "/login-basic",
  "/register",
  "/forgot-password",
  "/otp",
  "/otp-1",
  "/otp-2"
];
const auth_45global = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth();
  const isPublic = PUBLIC_ROUTES.some((route) => to.path === route || to.path.startsWith("/api/auth"));
  if (isPublic) {
    if (isLoggedIn.value && to.path === "/login") {
      return navigateTo("/");
    }
    return;
  }
  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  auth_45global,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[to.matched.length - 1]?.components?.default === from.matched[from.matched.length - 1]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_PNeJGQkb28x7Oj6JmbTLHMSOZcM0G0VOo9FBfJRFAOI = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return;
        }
        if (asyncData._abortController?.signal.aborted) {
          return;
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return;
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true });
  }
  return controller.signal;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const cfg0 = defineAppConfig({
  appSettings: {
    sidebar: {
      collapsible: "offcanvas",
      // 'offcanvas' | 'icon' | 'none'
      side: "left",
      // 'left' | 'right'
      variant: "inset"
      // 'sidebar' | 'floating' | 'inset'
    },
    theme: {
      color: "teal",
      // 'default' | 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal' | 'yellow' | 'rose'
      type: "scaled"
      // 'default' | 'mono' | 'scaled'
    }
  }
});
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};
const __appConfig = /* @__PURE__ */ defuFn(cfg0, inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => index).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const preference = "light";
const plugin_server_LlmVocchW81w0V5SsaJLemsIvF2IHoteTyzHWZjumlg = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate2, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate2 && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate2 && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate2 && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
  // Check name: cannot be empty
  ((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
const defaultIconDimensions$1 = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations$1 = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps$1 = Object.freeze({
  ...defaultIconDimensions$1,
  ...defaultIconTransformations$1
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps$1,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations$1) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations$1[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse2(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse2(name);
  tree.forEach(parse2);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions$1
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (
      // Name cannot be empty
      !name || // Must have body
      typeof icon.body !== "string" || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (
      // Name cannot be empty
      !name || // Parent must be set and point to existing icon
      typeof parent !== "string" || !icons[parent] && !aliases[parent] || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function getIcon(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps$1,
    ...result
  } : result;
}
const defaultIconSizeCustomisations$1 = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations$1 = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations$1,
  // Transformations
  ...defaultIconTransformations$1
});
const unitsSplit$1 = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest$1 = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit$1);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest$1.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs$1(content, tag = "defs") {
  let defs = "";
  const index2 = content.indexOf("<" + tag);
  while (index2 >= 0) {
    const start = content.indexOf(">", index2);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index2).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent$1(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent$1(body, start, end) {
  const split = splitSVGDefs$1(body);
  return mergeDefsAndContent$1(split.defs, start + split.content + end);
}
const isUnsetKeyword$1 = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG$1(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps$1,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations$1,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent$1(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize$1(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword$1(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index2) => {
    length += name.length + 1;
    if (length >= maxLength && index2 > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate2 = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate2, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index2 = config.resources.indexOf(item.resource);
      if (index2 !== -1 && index2 !== config.index) {
        config.index = index2;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index2) => {
      config.index = index2;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage2, icons, data) {
  function checkMissing() {
    const pending = storage2.pendingIcons;
    icons.forEach((name) => {
      if (pending) {
        pending.delete(name);
      }
      if (!storage2.icons[name]) {
        storage2.missing.add(name);
      }
    });
  }
  if (data && typeof data === "object") {
    try {
      const parsed = addIconSet(storage2, data);
      if (!parsed.length) {
        checkMissing();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }
  checkMissing();
  loadedNewIcons(storage2);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) {
    response.then((data) => {
      callback(data);
    }).catch(() => {
      callback(null);
    });
  } else {
    callback(response);
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      if (!icons2 || !icons2.length) {
        return;
      }
      const customIconLoader = storage2.loadIcon;
      if (storage2.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(
          storage2.loadIcons(icons2, prefix, provider),
          (data) => {
            parseLoaderResponse(storage2, icons2, data);
          }
        );
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          const response = customIconLoader(name, prefix, provider);
          parsePossiblyAsyncResponse(response, (data) => {
            const iconSet = data ? {
              prefix,
              icons: {
                [name]: data
              }
            } : null;
            parseLoaderResponse(storage2, [name], iconSet);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) {
        parseLoaderResponse(storage2, invalid, null);
      }
      if (!valid.length) {
        return;
      }
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage2, valid, null);
        return;
      }
      const params = api.prepare(provider, prefix, valid);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage2, item.icons, data);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const list = newIcons[storage2.provider][storage2.prefix];
    if (list.length) {
      loadNewIcons(storage2, list);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon$1 = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps$1,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};
function setCustomIconsLoader(loader, prefix, provider) {
  getStorage("", prefix).loadIcons = loader;
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations$1) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML$1(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL$1(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData$1(svg) {
  return "data:image/svg+xml," + encodeSVGforURL$1(svg);
}
function svgToURL$1(svg) {
  return 'url("' + svgToData$1(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations$1,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  backgroundColor: "currentColor"
};
const coloredProps = {
  backgroundColor: "transparent"
};
const propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
const propsToAddTo = {
  webkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
const customisationAliases = {};
["horizontal", "vertical"].forEach((prefix) => {
  const attr = prefix.slice(0, 1) + "Flip";
  customisationAliases[prefix + "-flip"] = attr;
  customisationAliases[prefix.slice(0, 1) + "-flip"] = attr;
  customisationAliases[prefix + "Flip"] = attr;
});
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
const render = (icon, props) => {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const componentProps = { ...svgDefaults };
  const mode = props.mode || "svg";
  const style = {};
  const propsStyle = props.style;
  const customStyle = typeof propsStyle === "object" && !(propsStyle instanceof Array) ? propsStyle : {};
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      // Properties to ignore
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
        break;
      // Boolean attributes
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      // Flip as string: 'horizontal,vertical'
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      // Color: override style
      case "color":
        style.color = value;
        break;
      // Rotation as string
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      // Remove aria-hidden
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default: {
        const alias = customisationAliases[key];
        if (alias) {
          if (value === true || value === "true" || value === 1) {
            customisations[alias] = true;
          }
        } else if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
      }
    }
  }
  const item = iconToSVG$1(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    componentProps["innerHTML"] = replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyVue");
    return h("svg", componentProps);
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML$1(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL$1(html),
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return h("span", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
const emptyIcon = {
  ...defaultIconProps$1,
  body: ""
};
const Icon = defineComponent((props, { emit }) => {
  const loader = ref(null);
  function abortLoading() {
    if (loader.value) {
      loader.value.abort?.();
      loader.value = null;
    }
  }
  const rendering = ref(!!props.ssr);
  const lastRenderedIconName = ref("");
  const iconData = shallowRef(null);
  function getIcon2() {
    const icon = props.icon;
    if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
      lastRenderedIconName.value = "";
      return {
        data: icon
      };
    }
    let iconName;
    if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
      return null;
    }
    let data = getIconData(iconName);
    if (!data) {
      const oldState = loader.value;
      if (!oldState || oldState.name !== icon) {
        if (data === null) {
          loader.value = {
            name: icon
          };
        } else {
          loader.value = {
            name: icon,
            abort: loadIcons([iconName], updateIconData)
          };
        }
      }
      return null;
    }
    abortLoading();
    if (lastRenderedIconName.value !== icon) {
      lastRenderedIconName.value = icon;
      nextTick(() => {
        emit("load", icon);
      });
    }
    const customise = props.customise;
    if (customise) {
      data = Object.assign({}, data);
      const customised = customise(data.body, iconName.name, iconName.prefix, iconName.provider);
      if (typeof customised === "string") {
        data.body = customised;
      }
    }
    const classes = ["iconify"];
    if (iconName.prefix !== "") {
      classes.push("iconify--" + iconName.prefix);
    }
    if (iconName.provider !== "") {
      classes.push("iconify--" + iconName.provider);
    }
    return { data, classes };
  }
  function updateIconData() {
    const icon = getIcon2();
    if (!icon) {
      iconData.value = null;
    } else if (icon.data !== iconData.value?.data) {
      iconData.value = icon;
    }
  }
  if (rendering.value) {
    updateIconData();
  }
  watch(() => props.icon, updateIconData);
  return () => {
    const icon = iconData.value;
    if (!icon) {
      return render(emptyIcon, props);
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        class: icon.classes.join(" ")
      };
    }
    return render({
      ...defaultIconProps$1,
      ...icon.data
    }, newProps);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
});
const _api = {
  getAPIConfig,
  setAPIModule,
  sendAPIQuery,
  setFetch,
  getFetch,
  listAPIProviders
};
const plugin__nAH4OzIuEOOARG1zNsgEf9sxr8V21jdmjn2QqhhE8o = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    const configs = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = configs.app?.baseURL?.replace(/\/$/, "") ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else if (options.provider === "none") {
      _api.setFetch(() => Promise.resolve(new Response()));
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    async function customIconLoader(icons, prefix) {
      try {
        const data = await $fetch(resources[0] + "/" + prefix + ".json", {
          query: {
            icons: icons.join(",")
          }
        });
        if (!data || data.prefix !== prefix || !data.icons)
          throw new Error("Invalid data" + JSON.stringify(data));
        return data;
      } catch (e) {
        console.error("Failed to load custom icons", e);
        return null;
      }
    }
    addAPIProvider("", { resources });
    for (const prefix of options.customCollections || []) {
      if (prefix)
        setCustomIconsLoader(customIconLoader, prefix);
    }
  }
  // For type portability
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
function computedWithControl(source, fn) {
  let v = void 0;
  let track;
  let trigger;
  const dirty = shallowRef(true);
  const update = () => {
    dirty.value = true;
    trigger();
  };
  watch(source, update, { flush: "sync" });
  const get2 = typeof fn === "function" ? fn : fn.get;
  const set2 = typeof fn === "function" ? void 0 : fn.set;
  const result = customRef((_track, _trigger) => {
    track = _track;
    trigger = _trigger;
    return {
      get() {
        if (dirty.value) {
          v = get2(v);
          dirty.value = false;
        }
        track();
        return v;
      },
      set(v2) {
        set2 == null ? void 0 : set2(v2);
      }
    };
  });
  if (Object.isExtensible(result))
    result.trigger = update;
  return result;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
const localProvidedStateMap = /* @__PURE__ */ new WeakMap();
const injectLocal = (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy;
  if (instance == null && !hasInjectionContext())
    throw new Error("injectLocal must be called in setup");
  if (instance && localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return inject(...args);
};
const provideLocal = (key, value) => {
  var _a;
  const instance = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy;
  if (instance == null)
    throw new Error("provideLocal must be called in setup");
  if (!localProvidedStateMap.has(instance))
    localProvidedStateMap.set(instance, /* @__PURE__ */ Object.create(null));
  const localProvidedState = localProvidedStateMap.get(instance);
  localProvidedState[key] = value;
  provide(key, value);
};
function createInjectionState(composable, options) {
  const key = Symbol(composable.name || "InjectionState");
  const defaultValue = void 0;
  const useProvidingState = (...args) => {
    const state = composable(...args);
    provideLocal(key, state);
    return state;
  };
  const useInjectedState = () => injectLocal(key, defaultValue);
  return [useProvidingState, useInjectedState];
}
function createSharedComposable(composable) {
  let subscribers = 0;
  let state;
  let scope;
  const dispose = () => {
    subscribers -= 1;
    if (scope && subscribers <= 0) {
      scope.stop();
      state = void 0;
      scope = void 0;
    }
  };
  return (...args) => {
    subscribers += 1;
    if (!scope) {
      scope = effectScope(true);
      state = scope.run(() => composable(...args));
    }
    tryOnScopeDispose(dispose);
    return state;
  };
}
function toReactive(objectRef) {
  if (!isRef(objectRef))
    return reactive(objectRef);
  const proxy = new Proxy({}, {
    get(_, p, receiver) {
      return unref(Reflect.get(objectRef.value, p, receiver));
    },
    set(_, p, value) {
      if (isRef(objectRef.value[p]) && !isRef(value))
        objectRef.value[p].value = value;
      else
        objectRef.value[p] = value;
      return true;
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(objectRef.value, p);
    },
    has(_, p) {
      return Reflect.has(objectRef.value, p);
    },
    ownKeys() {
      return Object.keys(objectRef.value);
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    }
  });
  return reactive(proxy);
}
function reactiveComputed(fn) {
  return toReactive(computed(fn));
}
function reactiveOmit(obj, ...keys) {
  const flatKeys = keys.flat();
  const predicate = flatKeys[0];
  return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => !predicate(toValue(v), k))) : Object.fromEntries(Object.entries(toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
const notNullish = (val) => val != null;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke2) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke2());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke2;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(lastInvoker());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke2());
      }, duration);
    });
  };
  return filter;
}
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    ;
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  const isPending = shallowRef(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    if (immediateCallback)
      cb();
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}
const defaultWindow = void 0;
const defaultDocument = void 0;
const defaultNavigator = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useMounted() {
  const isMounted = shallowRef(false);
  getCurrentInstance();
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
function onElementRemoval(target, callback, options = {}) {
  const {
    window: window2 = defaultWindow,
    document: document2 = window2 == null ? void 0 : window2.document,
    flush = "sync"
  } = options;
  if (!window2 || !document2)
    return noop;
  let stopFn;
  const cleanupAndUpdate = (fn) => {
    stopFn == null ? void 0 : stopFn();
    stopFn = fn;
  };
  const stopWatch = watchEffect(() => {
    const el = unrefElement(target);
    if (el) {
      const { stop } = useMutationObserver(
        document2,
        (mutationsList) => {
          const targetRemoved = mutationsList.map((mutation) => [...mutation.removedNodes]).flat().some((node) => node === el || node.contains(el));
          if (targetRemoved) {
            callback(mutationsList);
          }
        },
        {
          window: window2,
          childList: true,
          subtree: true
        }
      );
      cleanupAndUpdate(stop);
    }
  }, { flush });
  const stopHandle = () => {
    stopWatch();
    cleanupAndUpdate();
  };
  tryOnScopeDispose(stopHandle);
  return stopHandle;
}
function useActiveElement(options = {}) {
  var _a;
  const {
    window: window2 = defaultWindow,
    deep = true,
    triggerOnRemoval = false
  } = options;
  const document2 = (_a = options.document) != null ? _a : window2 == null ? void 0 : window2.document;
  const getDeepActiveElement = () => {
    var _a2;
    let element = document2 == null ? void 0 : document2.activeElement;
    if (deep) {
      while (element == null ? void 0 : element.shadowRoot)
        element = (_a2 = element == null ? void 0 : element.shadowRoot) == null ? void 0 : _a2.activeElement;
    }
    return element;
  };
  const activeElement = shallowRef();
  const trigger = () => {
    activeElement.value = getDeepActiveElement();
  };
  if (window2) {
    const listenerOptions = {
      capture: true,
      passive: true
    };
    useEventListener(
      window2,
      "blur",
      (event) => {
        if (event.relatedTarget !== null)
          return;
        trigger();
      },
      listenerOptions
    );
    useEventListener(
      window2,
      "focus",
      trigger,
      listenerOptions
    );
  }
  if (triggerOnRemoval) {
    onElementRemoval(activeElement, trigger, { document: document2 });
  }
  trigger();
  return activeElement;
}
const ssrWidthSymbol = Symbol("vueuse-ssr-width");
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function provideSSRWidth(width, app) {
  if (app !== void 0) {
    app.provide(ssrWidthSymbol, width);
  } else {
    provideLocal(ssrWidthSymbol, width);
  }
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow, ssrWidth = useSSRWidth() } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) {
          res = ssrWidth >= pxValue(minWidth[1]);
        }
        if (maxWidth && res) {
          res = ssrWidth <= pxValue(maxWidth[1]);
        }
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value)
      return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator: navigator2 = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator2 && "permissions" in navigator2);
  const permissionStatus = shallowRef();
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = shallowRef();
  const update = () => {
    var _a, _b;
    state.value = (_b = (_a = permissionStatus.value) == null ? void 0 : _a.state) != null ? _b : "prompt";
  };
  useEventListener(permissionStatus, "change", update, { passive: true });
  const query = createSingletonPromise(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus.value) {
      try {
        permissionStatus.value = await navigator2.permissions.query(desc);
      } catch (e) {
        permissionStatus.value = void 0;
      } finally {
        update();
      }
    }
    if (controls)
      return toRaw(permissionStatus.value);
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator2 && "clipboard" in navigator2);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = computed(() => isClipboardApiSupported.value || legacy);
  const text = shallowRef("");
  const copied = shallowRef(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
  async function updateText() {
    let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value));
    if (!useLegacy) {
      try {
        text.value = await navigator2.clipboard.readText();
      } catch (e) {
        useLegacy = true;
      }
    }
    if (useLegacy) {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText, { passive: true });
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value));
      if (!useLegacy) {
        try {
          await navigator2.clipboard.writeText(value);
        } catch (e) {
          useLegacy = true;
        }
      }
      if (useLegacy)
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = (void 0).createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    (void 0).body.appendChild(ta);
    ta.select();
    (void 0).execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = void 0) == null ? void 0 : _a.call(void 0)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useCurrentElement(rootComponent) {
  const vm = getCurrentInstance();
  const currentElement = computedWithControl(
    () => null,
    () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el
  );
  return currentElement;
}
function useTextDirection(options = {}) {
  const {
    document: document2 = defaultDocument,
    selector = "html",
    observe = false,
    initialValue = "ltr"
  } = options;
  function getValue2() {
    var _a, _b;
    return (_b = (_a = document2 == null ? void 0 : document2.querySelector(selector)) == null ? void 0 : _a.getAttribute("dir")) != null ? _b : initialValue;
  }
  const dir = ref(getValue2());
  tryOnMounted(() => dir.value = getValue2());
  if (observe && document2) {
    useMutationObserver(
      document2.querySelector(selector),
      () => dir.value = getValue2(),
      { attributes: true }
    );
  }
  return computed({
    get() {
      return dir.value;
    },
    set(v) {
      var _a, _b;
      dir.value = v;
      if (!document2)
        return;
      if (dir.value)
        (_a = document2.querySelector(selector)) == null ? void 0 : _a.setAttribute("dir", dir.value);
      else
        (_b = document2.querySelector(selector)) == null ? void 0 : _b.removeAttribute("dir");
    }
  });
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    key = "modelValue";
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue2();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue2();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
const ssrWidth_AhG7aRzYfPqAe2_d3oa6EmyjmdQu1jOPM3xIqRDkEkM = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp);
});
const plugins = [
  unhead_72ymMDvWUqPL7Hxh0ZIVKWE0qJlhsxhLMocQ5UW5CVo,
  plugin$1,
  revive_payload_server_PNeJGQkb28x7Oj6JmbTLHMSOZcM0G0VOo9FBfJRFAOI,
  plugin,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  plugin_server_LlmVocchW81w0V5SsaJLemsIvF2IHoteTyzHWZjumlg,
  plugin__nAH4OzIuEOOARG1zNsgEf9sxr8V21jdmjn2QqhhE8o,
  ssrWidth_AhG7aRzYfPqAe2_d3oa6EmyjmdQu1jOPM3xIqRDkEkM
];
const HeadComponentCtxSymbol = Symbol("head-component");
const TagPositionProps = {
  /**
   * @deprecated Use tagPosition
   */
  body: { type: Boolean, default: void 0 },
  tagPosition: { type: String }
};
const normalizeProps = (_props) => {
  const props = Object.fromEntries(
    Object.entries(_props).filter(([_, value]) => value !== void 0)
  );
  if (typeof props.body !== "undefined") {
    props.tagPosition = props.body ? "bodyClose" : "head";
  }
  if (typeof props.renderPriority !== "undefined") {
    props.tagPriority = props.renderPriority;
  }
  return props;
};
function useHeadComponentCtx() {
  return inject(HeadComponentCtxSymbol, createHeadComponentCtx, true);
}
function createHeadComponentCtx() {
  const prev = inject(HeadComponentCtxSymbol, null);
  if (prev) {
    return prev;
  }
  const input = reactive({});
  const entry2 = useHead(input);
  const ctx = { input, entry: entry2 };
  provide(HeadComponentCtxSymbol, ctx);
  return ctx;
}
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: { type: [String, Object, Array], default: void 0 },
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: { type: [String, Object, Array], default: void 0 },
  tabindex: String,
  title: String,
  translate: String,
  /**
   * @deprecated Use tagPriority
   */
  renderPriority: [String, Number],
  /**
   * Unhead prop to modify the priority of the tag.
   */
  tagPriority: { type: [String, Number] }
};
defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    title: String
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.noscript ||= [];
    const idx = input.noscript.push({}) - 1;
    return () => {
      const noscript = normalizeProps(props);
      const slotVnodes = slots.default?.();
      const textContent = [];
      if (slotVnodes) {
        for (const vnode of slotVnodes) {
          if (vnode.children) {
            textContent.push(vnode.children);
          }
        }
      }
      if (textContent.length > 0) {
        noscript.innerHTML = textContent.join("");
      }
      input.noscript[idx] = noscript;
      return null;
    };
  }
});
defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    /** @deprecated **/
    methods: String,
    /** @deprecated **/
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.link ||= [];
    const idx = input.link.push({}) - 1;
    return () => {
      input.link[idx] = normalizeProps(props);
      return null;
    };
  }
});
defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.base = normalizeProps(props);
      return null;
    };
  }
});
defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup(_, { slots }) {
    const { input } = useHeadComponentCtx();
    return () => {
      const defaultSlot = slots.default?.();
      input.title = defaultSlot?.[0]?.children ? String(defaultSlot?.[0]?.children) : void 0;
      return null;
    };
  }
});
defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    property: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.meta ||= [];
    const idx = input.meta.push({}) - 1;
    return () => {
      const meta = { "http-equiv": props.httpEquiv, ...normalizeProps(props) };
      if ("httpEquiv" in meta) {
        delete meta.httpEquiv;
      }
      input.meta[idx] = meta;
      return null;
    };
  }
});
defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    /** @deprecated **/
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.style ||= [];
    const idx = input.style.push({}) - 1;
    return () => {
      const style = normalizeProps(props);
      const textContent = slots.default?.()?.[0]?.children;
      if (textContent) {
        input.style[idx] = style;
        style.textContent = textContent;
      }
      return null;
    };
  }
});
defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => {
    createHeadComponentCtx();
    return () => ctx.slots.default?.();
  }
});
defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.htmlAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.bodyAttrs = { ..._props, ...ctx.attrs };
      return ctx.slots.default?.();
    };
  }
});
const layouts = {
  blank: defineAsyncComponent(() => import('./blank-CUfiiuQ1.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./default-aTa6HplK.mjs').then((m) => m.default || m))
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_1$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Sonner",
  __ssrInlineRender: true,
  props: {
    id: {},
    invert: { type: Boolean },
    theme: {},
    position: {},
    closeButtonPosition: {},
    hotkey: {},
    richColors: { type: Boolean },
    expand: { type: Boolean },
    duration: {},
    gap: {},
    visibleToasts: {},
    closeButton: { type: Boolean },
    toastOptions: {},
    class: {},
    style: {},
    offset: {},
    mobileOffset: {},
    dir: {},
    swipeDirections: {},
    icons: {},
    containerAriaLabel: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Toaster), mergeProps({ class: "toaster group" }, props, { style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      } }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/sonner/Sonner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const customDefu = createDefu((obj, key, value) => {
  if (Array.isArray(value) && value.every((x) => typeof x === "string")) {
    obj[key] = value;
    return true;
  }
});
const defaultAppSettings = {
  sidebar: {
    collapsible: "offcanvas",
    side: "left",
    variant: "sidebar"
  },
  theme: {
    color: "teal",
    type: "default"
  },
  direction: "ltr",
  locale: "en"
};
function useAppSettings() {
  const { appSettings } = useAppConfig();
  const processedConfig = customDefu(appSettings, defaultAppSettings);
  const cookieAppSettings = useCookie("app_settings", {
    default: () => processedConfig
  });
  const updateAppSettings = (settings) => {
    cookieAppSettings.value = customDefu(settings, cookieAppSettings.value);
  };
  return {
    updateAppSettings,
    sidebar: computed(() => cookieAppSettings.value.sidebar),
    theme: computed(() => cookieAppSettings.value.theme),
    direction: computed(() => cookieAppSettings.value.direction || "ltr"),
    locale: computed(() => cookieAppSettings.value.locale || "en")
  };
}
const en = {
  // Navigation Headings
  "nav.administration": "Administration",
  "nav.general": "General",
  "nav.apps": "Apps",
  "nav.crm": "CRM",
  "nav.salesCommerce": "Sales & Commerce",
  "nav.inventoryWarehouse": "Inventory & Warehouse",
  "nav.hrWorkforce": "HR & Workforce",
  "nav.financeAccounting": "Finance & Accounting",
  "nav.projectManagement": "Project Management",
  "nav.support": "Support",
  "nav.marketing": "Marketing",
  "nav.reports": "Reports",
  "nav.pages": "Pages",
  "nav.components": "Components",
  "nav.documentation": "Documentation",
  // Nav Items — Administration
  "nav.users": "Users",
  "nav.rolesPermissions": "Roles & Permissions",
  // Nav Items — General
  "nav.dashboard": "Dashboard",
  "nav.email": "Email",
  "nav.tasks": "Tasks",
  // Nav Items — Apps
  "nav.kanbanBoard": "Kanban Board",
  "nav.ganttChart": "Gantt Chart",
  // Nav Items — CRM
  "nav.contacts": "Contacts",
  "nav.leads": "Leads",
  "nav.dealsPipeline": "Deals Pipeline",
  "nav.companies": "Companies",
  "nav.activities": "Activities",
  // Nav Items — Sales & Commerce
  "nav.quotes": "Quotes",
  "nav.invoices": "Invoices",
  "nav.orders": "Orders",
  "nav.products": "Products",
  "nav.customers": "Customers",
  // Nav Items — Inventory
  "nav.stockOverview": "Stock Overview",
  "nav.transfers": "Transfers",
  "nav.purchaseOrders": "Purchase Orders",
  "nav.vendors": "Vendors",
  // Nav Items — HR
  "nav.employees": "Employees",
  "nav.attendance": "Attendance",
  "nav.payroll": "Payroll",
  "nav.recruitment": "Recruitment",
  "nav.leaveMgmt": "Leave Mgmt",
  // Nav Items — Finance
  "nav.accounts": "Accounts",
  "nav.transactions": "Transactions",
  "nav.expenses": "Expenses",
  "nav.taxManagement": "Tax Management",
  "nav.balanceSheet": "Balance Sheet",
  "nav.incomeStatement": "Income Statement",
  "nav.financialRatios": "Financial Ratios",
  "nav.businessHealth": "Business Health",
  // Nav Items — Project Management
  "nav.projects": "Projects",
  "nav.timesheets": "Timesheets",
  "nav.milestones": "Milestones",
  // Nav Items — Support
  "nav.tickets": "Tickets",
  "nav.knowledgeBase": "Knowledge Base",
  "nav.liveChat": "Live Chat",
  // Nav Items — Marketing
  "nav.campaigns": "Campaigns",
  "nav.emailBlasts": "Email Blasts",
  "nav.analytics": "Analytics",
  // Nav Items — Reports
  "nav.salesReports": "Sales Reports",
  "nav.financialReports": "Financial Reports",
  "nav.hrReports": "HR Reports",
  // Nav Items — Pages
  "nav.authentication": "Authentication",
  "nav.login": "Login",
  "nav.loginBasic": "Login Basic",
  "nav.register": "Register",
  "nav.forgotPassword": "Forgot Password",
  "nav.otp": "OTP",
  "nav.errors": "Errors",
  "nav.settings": "Settings",
  "nav.profile": "Profile",
  "nav.account": "Account",
  "nav.appearance": "Appearance",
  "nav.notifications": "Notifications",
  "nav.display": "Display",
  // Nav Bottom
  "nav.helpSupport": "Help & Support",
  "nav.feedback": "Feedback",
  // Dashboard
  "dashboard.title": "Dashboard",
  "dashboard.description": "Overview of key metrics and performance",
  "dashboard.totalRevenue": "Total Revenue",
  "dashboard.newCustomers": "New Customers",
  "dashboard.activeAccounts": "Active Accounts",
  "dashboard.growthRate": "Growth Rate",
  "dashboard.trendingUp": "Trending up this month",
  "dashboard.down20": "Down 20% this period",
  "dashboard.acquisitionAttention": "Acquisition needs attention",
  "dashboard.strongRetention": "Strong user retention",
  "dashboard.engagementExceed": "Engagement exceed targets",
  "dashboard.steadyPerformance": "Steady performance increase",
  "dashboard.meetsGrowth": "Meets growth projections",
  "dashboard.totalVisitors": "Total Visitors",
  "dashboard.totalLast3Months": "Total for the last 3 months",
  "dashboard.last3Months": "Last 3 months",
  "dashboard.last30Days": "Last 30 days",
  "dashboard.last7Days": "Last 7 days",
  "dashboard.visitorsLast6Months": "Visitors for the last 6 months",
  "dashboard.download": "Download",
  // Tasks
  "tasks.title": "Tasks",
  "tasks.description": "Here's a list of your tasks for this month!",
  "tasks.allTasks": "All Tasks",
  "tasks.task": "task",
  "tasks.tasks": "tasks",
  "tasks.projects": "Projects",
  "tasks.all": "All",
  "tasks.allProjects": "All Projects",
  "tasks.filterPlaceholder": "Filter tasks...",
  "tasks.loadingMore": "Loading more…",
  "tasks.noResults": "No results.",
  "tasks.col.sno": "#",
  "tasks.col.title": "Title",
  "tasks.col.status": "Status",
  "tasks.col.assignees": "Assignees",
  "tasks.col.priority": "Priority",
  "tasks.col.createdAt": "Created",
  "tasks.col.dueDate": "Due Date",
  "tasks.label.bug": "Bug",
  "tasks.label.feature": "Feature",
  "tasks.label.documentation": "Documentation",
  "tasks.status.backlog": "Backlog",
  "tasks.status.todo": "Todo",
  "tasks.status.inProgress": "In Progress",
  "tasks.status.done": "Done",
  "tasks.status.canceled": "Canceled",
  "tasks.priority.low": "Low",
  "tasks.priority.medium": "Medium",
  "tasks.priority.high": "High",
  "tasks.addTask": "Add Task",
  "tasks.reset": "Reset",
  "tasks.clearFilters": "Clear filters",
  "tasks.view": "View",
  "tasks.toggleColumns": "Toggle columns",
  "tasks.sortAsc": "Asc",
  "tasks.sortDesc": "Desc",
  "tasks.hide": "Hide",
  "tasks.nSelected": "selected",
  "tasks.actions.edit": "Edit",
  "tasks.actions.copy": "Make a copy",
  "tasks.actions.favorite": "Favorite",
  "tasks.actions.labels": "Labels",
  "tasks.actions.delete": "Delete",
  "tasks.actions.openMenu": "Open menu",
  "tasks.addTask.title": "New Task",
  "tasks.addTask.desc": "Fill in the details to create a new task.",
  "tasks.addTask.projectLabel": "Project",
  "tasks.addTask.selectProject": "Select project",
  "tasks.addTask.phaseLabel": "Phase",
  "tasks.addTask.selectPhase": "Select phase",
  "tasks.addTask.categoryLabel": "Category",
  "tasks.addTask.selectCategory": "Select category",
  "tasks.addTask.titleLabel": "Task",
  "tasks.addTask.titlePlaceholder": "Enter task title...",
  "tasks.addTask.assigneesLabel": "Assignees",
  "tasks.addTask.selectAssignees": "Select assignees",
  "tasks.addTask.statusLabel": "Status",
  "tasks.addTask.priorityLabel": "Priority",
  "tasks.addTask.selectStatus": "Select status",
  "tasks.addTask.selectPriority": "Select priority",
  "tasks.addTask.dueDateLabel": "Due Date",
  "tasks.addTask.create": "Create Task",
  "tasks.due.overdue": "Overdue",
  "tasks.due.dueToday": "Due today",
  "tasks.due.dueSoon": "Due soon",
  "tasks.due.left": "left",
  "tasks.due.ago": "ago",
  "tasks.due.today": "Today",
  // Email
  "email.title": "Email",
  "email.description": "Inbox & communications",
  "email.inbox": "Inbox",
  "email.allMail": "All mail",
  "email.unread": "Unread",
  "email.search": "Search",
  // Kanban
  "kanban.title": "Kanban Board",
  "kanban.description": "Manage your projects with drag and drop",
  // Settings/Customizer
  "customizer.title": "Template Customizer",
  "customizer.description": "Customize & Preview in Real Time",
  "customizer.theming": "Theming",
  "customizer.layout": "Layout",
  "customizer.navbarType": "Navbar Type",
  "customizer.sidebar": "Sidebar",
  "customizer.floating": "Floating",
  "customizer.inset": "Inset",
  "customizer.direction": "Direction",
  "customizer.language": "Language",
  "customizer.default": "Default",
  // Common
  "common.search": "Search",
  "common.noResults": "No results.",
  "common.download": "Download",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.delete": "Delete",
  "common.edit": "Edit",
  "common.add": "Add",
  "common.close": "Close",
  "common.back": "Back",
  "common.next": "Next",
  "common.previous": "Previous",
  "common.loading": "Loading...",
  "common.rowsPerPage": "Rows per page",
  "common.of": "of",
  "common.page": "Page",
  "common.selected": "selected",
  "common.selectAll": "Select all"
};
const es = {
  // Navigation Headings
  "nav.general": "General",
  "nav.apps": "Aplicaciones",
  "nav.crm": "CRM",
  "nav.salesCommerce": "Ventas y Comercio",
  "nav.inventoryWarehouse": "Inventario y Almacén",
  "nav.hrWorkforce": "RRHH y Personal",
  "nav.financeAccounting": "Finanzas y Contabilidad",
  "nav.projectManagement": "Gestión de Proyectos",
  "nav.support": "Soporte",
  "nav.marketing": "Marketing",
  "nav.reports": "Informes",
  "nav.pages": "Páginas",
  "nav.components": "Componentes",
  "nav.documentation": "Documentación",
  // Nav Items — General
  "nav.dashboard": "Panel",
  "nav.email": "Correo",
  "nav.tasks": "Tareas",
  // Nav Items — Apps
  "nav.kanbanBoard": "Tablero Kanban",
  "nav.ganttChart": "Diagrama de Gantt",
  // Nav Items — CRM
  "nav.contacts": "Contactos",
  "nav.leads": "Prospectos",
  "nav.dealsPipeline": "Pipeline de Negocios",
  "nav.companies": "Empresas",
  "nav.activities": "Actividades",
  // Nav Items — Sales
  "nav.quotes": "Cotizaciones",
  "nav.invoices": "Facturas",
  "nav.orders": "Pedidos",
  "nav.products": "Productos",
  "nav.customers": "Clientes",
  // Nav Items — Inventory
  "nav.stockOverview": "Resumen de Stock",
  "nav.transfers": "Transferencias",
  "nav.purchaseOrders": "Órdenes de Compra",
  "nav.vendors": "Proveedores",
  // Nav Items — HR
  "nav.employees": "Empleados",
  "nav.attendance": "Asistencia",
  "nav.payroll": "Nómina",
  "nav.recruitment": "Reclutamiento",
  "nav.leaveMgmt": "Gestión de Ausencias",
  // Nav Items — Finance
  "nav.accounts": "Cuentas",
  "nav.transactions": "Transacciones",
  "nav.expenses": "Gastos",
  "nav.taxManagement": "Gestión de Impuestos",
  "nav.balanceSheet": "Balance General",
  "nav.incomeStatement": "Estado de Resultados",
  "nav.financialRatios": "Ratios Financieros",
  "nav.businessHealth": "Salud del Negocio",
  // Nav Items — Project Management
  "nav.projects": "Proyectos",
  "nav.timesheets": "Hojas de Tiempo",
  "nav.milestones": "Hitos",
  // Nav Items — Support
  "nav.tickets": "Tickets",
  "nav.knowledgeBase": "Base de Conocimiento",
  "nav.liveChat": "Chat en Vivo",
  // Nav Items — Marketing
  "nav.campaigns": "Campañas",
  "nav.emailBlasts": "Correos Masivos",
  "nav.analytics": "Analíticas",
  // Nav Items — Reports
  "nav.salesReports": "Informes de Ventas",
  "nav.financialReports": "Informes Financieros",
  "nav.hrReports": "Informes de RRHH",
  // Nav Items — Pages
  "nav.authentication": "Autenticación",
  "nav.login": "Iniciar Sesión",
  "nav.loginBasic": "Inicio de Sesión Básico",
  "nav.register": "Registrarse",
  "nav.forgotPassword": "Olvidé mi Contraseña",
  "nav.otp": "OTP",
  "nav.errors": "Errores",
  "nav.settings": "Configuración",
  "nav.profile": "Perfil",
  "nav.account": "Cuenta",
  "nav.appearance": "Apariencia",
  "nav.notifications": "Notificaciones",
  "nav.display": "Pantalla",
  // Nav Bottom
  "nav.helpSupport": "Ayuda y Soporte",
  "nav.feedback": "Comentarios",
  // Dashboard
  "dashboard.title": "Panel",
  "dashboard.description": "Resumen de métricas clave y rendimiento",
  "dashboard.totalRevenue": "Ingresos Totales",
  "dashboard.newCustomers": "Nuevos Clientes",
  "dashboard.activeAccounts": "Cuentas Activas",
  "dashboard.growthRate": "Tasa de Crecimiento",
  "dashboard.trendingUp": "Tendencia al alza este mes",
  "dashboard.down20": "Bajó 20% este período",
  "dashboard.acquisitionAttention": "La adquisición necesita atención",
  "dashboard.strongRetention": "Fuerte retención de usuarios",
  "dashboard.engagementExceed": "Compromiso supera los objetivos",
  "dashboard.steadyPerformance": "Aumento constante de rendimiento",
  "dashboard.meetsGrowth": "Cumple proyecciones de crecimiento",
  "dashboard.totalVisitors": "Visitantes Totales",
  "dashboard.totalLast3Months": "Total de los últimos 3 meses",
  "dashboard.last3Months": "Últimos 3 meses",
  "dashboard.last30Days": "Últimos 30 días",
  "dashboard.last7Days": "Últimos 7 días",
  "dashboard.visitorsLast6Months": "Visitantes de los últimos 6 meses",
  "dashboard.download": "Descargar",
  // Tasks
  "tasks.title": "Tareas",
  "tasks.description": "¡Aquí está la lista de tus tareas para este mes!",
  "tasks.allTasks": "Todas las Tareas",
  "tasks.task": "tarea",
  "tasks.tasks": "tareas",
  "tasks.projects": "Proyectos",
  "tasks.all": "Todas",
  "tasks.allProjects": "Todos los Proyectos",
  "tasks.filterPlaceholder": "Filtrar tareas...",
  "tasks.loadingMore": "Cargando más…",
  "tasks.noResults": "Sin resultados.",
  "tasks.col.sno": "#",
  "tasks.col.title": "Título",
  "tasks.col.status": "Estado",
  "tasks.col.assignees": "Asignados",
  "tasks.col.priority": "Prioridad",
  "tasks.col.createdAt": "Creado",
  "tasks.col.dueDate": "Vencimiento",
  "tasks.label.bug": "Error",
  "tasks.label.feature": "Funcionalidad",
  "tasks.label.documentation": "Documentación",
  "tasks.status.backlog": "Pendiente",
  "tasks.status.todo": "Por hacer",
  "tasks.status.inProgress": "En progreso",
  "tasks.status.done": "Completado",
  "tasks.status.canceled": "Cancelado",
  "tasks.priority.low": "Baja",
  "tasks.priority.medium": "Media",
  "tasks.priority.high": "Alta",
  "tasks.addTask": "Agregar tarea",
  "tasks.reset": "Restablecer",
  "tasks.clearFilters": "Limpiar filtros",
  "tasks.view": "Ver",
  "tasks.toggleColumns": "Alternar columnas",
  "tasks.sortAsc": "Asc",
  "tasks.sortDesc": "Desc",
  "tasks.hide": "Ocultar",
  "tasks.nSelected": "seleccionados",
  "tasks.actions.edit": "Editar",
  "tasks.actions.copy": "Hacer una copia",
  "tasks.actions.favorite": "Favorito",
  "tasks.actions.labels": "Etiquetas",
  "tasks.actions.delete": "Eliminar",
  "tasks.actions.openMenu": "Abrir menú",
  "tasks.addTask.title": "Nueva Tarea",
  "tasks.addTask.desc": "Completa los detalles para crear una nueva tarea.",
  "tasks.addTask.projectLabel": "Proyecto",
  "tasks.addTask.selectProject": "Seleccionar proyecto",
  "tasks.addTask.phaseLabel": "Fase",
  "tasks.addTask.selectPhase": "Seleccionar fase",
  "tasks.addTask.categoryLabel": "Categoría",
  "tasks.addTask.selectCategory": "Seleccionar categoría",
  "tasks.addTask.titleLabel": "Tarea",
  "tasks.addTask.titlePlaceholder": "Ingresa el título de la tarea...",
  "tasks.addTask.assigneesLabel": "Asignados",
  "tasks.addTask.selectAssignees": "Seleccionar asignados",
  "tasks.addTask.statusLabel": "Estado",
  "tasks.addTask.priorityLabel": "Prioridad",
  "tasks.addTask.selectStatus": "Seleccionar estado",
  "tasks.addTask.selectPriority": "Seleccionar prioridad",
  "tasks.addTask.dueDateLabel": "Vencimiento",
  "tasks.addTask.create": "Crear Tarea",
  "tasks.due.overdue": "Vencida",
  "tasks.due.dueToday": "Vence hoy",
  "tasks.due.dueSoon": "Vence pronto",
  "tasks.due.left": "restantes",
  "tasks.due.ago": "atrás",
  "tasks.due.today": "Hoy",
  // Email
  "email.title": "Correo",
  "email.description": "Bandeja de entrada y comunicaciones",
  "email.inbox": "Bandeja de Entrada",
  "email.allMail": "Todo el correo",
  "email.unread": "No leído",
  "email.search": "Buscar",
  // Kanban
  "kanban.title": "Tablero Kanban",
  "kanban.description": "Gestiona tus proyectos con arrastrar y soltar",
  // Settings/Customizer
  "customizer.title": "Personalizador",
  "customizer.description": "Personalizar y Previsualizar en Tiempo Real",
  "customizer.theming": "Temas",
  "customizer.layout": "Diseño",
  "customizer.navbarType": "Tipo de Barra",
  "customizer.sidebar": "Barra Lateral",
  "customizer.floating": "Flotante",
  "customizer.inset": "Integrado",
  "customizer.direction": "Dirección",
  "customizer.language": "Idioma",
  "customizer.default": "Predeterminado",
  // Common
  "common.search": "Buscar",
  "common.noResults": "Sin resultados.",
  "common.download": "Descargar",
  "common.save": "Guardar",
  "common.cancel": "Cancelar",
  "common.delete": "Eliminar",
  "common.edit": "Editar",
  "common.add": "Agregar",
  "common.close": "Cerrar",
  "common.back": "Atrás",
  "common.next": "Siguiente",
  "common.previous": "Anterior",
  "common.loading": "Cargando...",
  "common.rowsPerPage": "Filas por página",
  "common.of": "de",
  "common.page": "Página",
  "common.selected": "seleccionados",
  "common.selectAll": "Seleccionar todo"
};
const fr = {
  // Navigation Headings
  "nav.general": "Général",
  "nav.apps": "Applications",
  "nav.crm": "CRM",
  "nav.salesCommerce": "Ventes et Commerce",
  "nav.inventoryWarehouse": "Inventaire et Entrepôt",
  "nav.hrWorkforce": "RH et Personnel",
  "nav.financeAccounting": "Finance et Comptabilité",
  "nav.projectManagement": "Gestion de Projets",
  "nav.support": "Support",
  "nav.marketing": "Marketing",
  "nav.reports": "Rapports",
  "nav.pages": "Pages",
  "nav.components": "Composants",
  "nav.documentation": "Documentation",
  // Nav Items — General
  "nav.dashboard": "Tableau de Bord",
  "nav.email": "E-mail",
  "nav.tasks": "Tâches",
  // Nav Items — Apps
  "nav.kanbanBoard": "Tableau Kanban",
  "nav.ganttChart": "Diagramme de Gantt",
  // Nav Items — CRM
  "nav.contacts": "Contacts",
  "nav.leads": "Prospects",
  "nav.dealsPipeline": "Pipeline des Affaires",
  "nav.companies": "Entreprises",
  "nav.activities": "Activités",
  // Nav Items — Sales
  "nav.quotes": "Devis",
  "nav.invoices": "Factures",
  "nav.orders": "Commandes",
  "nav.products": "Produits",
  "nav.customers": "Clients",
  // Nav Items — Inventory
  "nav.stockOverview": "Aperçu des Stocks",
  "nav.transfers": "Transferts",
  "nav.purchaseOrders": "Bons de Commande",
  "nav.vendors": "Fournisseurs",
  // Nav Items — HR
  "nav.employees": "Employés",
  "nav.attendance": "Présence",
  "nav.payroll": "Paie",
  "nav.recruitment": "Recrutement",
  "nav.leaveMgmt": "Gestion des Congés",
  // Nav Items — Finance
  "nav.accounts": "Comptes",
  "nav.transactions": "Transactions",
  "nav.expenses": "Dépenses",
  "nav.taxManagement": "Gestion Fiscale",
  "nav.balanceSheet": "Bilan",
  "nav.incomeStatement": "Compte de Résultat",
  "nav.financialRatios": "Ratios Financiers",
  "nav.businessHealth": "Santé de l'Entreprise",
  // Nav Items — Project Management
  "nav.projects": "Projets",
  "nav.timesheets": "Feuilles de Temps",
  "nav.milestones": "Jalons",
  // Nav Items — Support
  "nav.tickets": "Tickets",
  "nav.knowledgeBase": "Base de Connaissances",
  "nav.liveChat": "Chat en Direct",
  // Nav Items — Marketing
  "nav.campaigns": "Campagnes",
  "nav.emailBlasts": "Envois Massifs",
  "nav.analytics": "Analytiques",
  // Nav Items — Reports
  "nav.salesReports": "Rapports de Ventes",
  "nav.financialReports": "Rapports Financiers",
  "nav.hrReports": "Rapports RH",
  // Nav Items — Pages
  "nav.authentication": "Authentification",
  "nav.login": "Connexion",
  "nav.loginBasic": "Connexion Basique",
  "nav.register": "Inscription",
  "nav.forgotPassword": "Mot de Passe Oublié",
  "nav.otp": "OTP",
  "nav.errors": "Erreurs",
  "nav.settings": "Paramètres",
  "nav.profile": "Profil",
  "nav.account": "Compte",
  "nav.appearance": "Apparence",
  "nav.notifications": "Notifications",
  "nav.display": "Affichage",
  // Nav Bottom
  "nav.helpSupport": "Aide et Support",
  "nav.feedback": "Commentaires",
  // Dashboard
  "dashboard.title": "Tableau de Bord",
  "dashboard.description": "Aperçu des métriques clés et performances",
  "dashboard.totalRevenue": "Revenus Totaux",
  "dashboard.newCustomers": "Nouveaux Clients",
  "dashboard.activeAccounts": "Comptes Actifs",
  "dashboard.growthRate": "Taux de Croissance",
  "dashboard.trendingUp": "Tendance à la hausse ce mois",
  "dashboard.down20": "En baisse de 20% cette période",
  "dashboard.acquisitionAttention": "L'acquisition nécessite attention",
  "dashboard.strongRetention": "Forte rétention des utilisateurs",
  "dashboard.engagementExceed": "L'engagement dépasse les objectifs",
  "dashboard.steadyPerformance": "Augmentation constante des performances",
  "dashboard.meetsGrowth": "Conforme aux projections de croissance",
  "dashboard.totalVisitors": "Visiteurs Totaux",
  "dashboard.totalLast3Months": "Total des 3 derniers mois",
  "dashboard.last3Months": "3 derniers mois",
  "dashboard.last30Days": "30 derniers jours",
  "dashboard.last7Days": "7 derniers jours",
  "dashboard.visitorsLast6Months": "Visiteurs des 6 derniers mois",
  "dashboard.download": "Télécharger",
  // Tasks
  "tasks.title": "Tâches",
  "tasks.description": "Voici la liste de vos tâches pour ce mois !",
  "tasks.allTasks": "Toutes les Tâches",
  "tasks.task": "tâche",
  "tasks.tasks": "tâches",
  "tasks.projects": "Projets",
  "tasks.all": "Toutes",
  "tasks.allProjects": "Tous les Projets",
  "tasks.filterPlaceholder": "Filtrer les tâches...",
  "tasks.loadingMore": "Chargement…",
  "tasks.noResults": "Aucun résultat.",
  "tasks.col.sno": "#",
  "tasks.col.title": "Titre",
  "tasks.col.status": "Statut",
  "tasks.col.assignees": "Assignés",
  "tasks.col.priority": "Priorité",
  "tasks.col.createdAt": "Créé",
  "tasks.col.dueDate": "Échéance",
  "tasks.label.bug": "Bug",
  "tasks.label.feature": "Fonctionnalité",
  "tasks.label.documentation": "Documentation",
  "tasks.status.backlog": "En attente",
  "tasks.status.todo": "À faire",
  "tasks.status.inProgress": "En cours",
  "tasks.status.done": "Terminé",
  "tasks.status.canceled": "Annulé",
  "tasks.priority.low": "Basse",
  "tasks.priority.medium": "Moyenne",
  "tasks.priority.high": "Haute",
  "tasks.addTask": "Ajouter une tâche",
  "tasks.reset": "Réinitialiser",
  "tasks.clearFilters": "Effacer les filtres",
  "tasks.view": "Afficher",
  "tasks.toggleColumns": "Basculer les colonnes",
  "tasks.sortAsc": "Asc",
  "tasks.sortDesc": "Desc",
  "tasks.hide": "Masquer",
  "tasks.nSelected": "sélectionné(s)",
  "tasks.actions.edit": "Modifier",
  "tasks.actions.copy": "Faire une copie",
  "tasks.actions.favorite": "Favori",
  "tasks.actions.labels": "Étiquettes",
  "tasks.actions.delete": "Supprimer",
  "tasks.actions.openMenu": "Ouvrir le menu",
  "tasks.addTask.title": "Nouvelle Tâche",
  "tasks.addTask.desc": "Remplissez les détails pour créer une nouvelle tâche.",
  "tasks.addTask.projectLabel": "Projet",
  "tasks.addTask.selectProject": "Sélectionner le projet",
  "tasks.addTask.phaseLabel": "Phase",
  "tasks.addTask.selectPhase": "Sélectionner la phase",
  "tasks.addTask.categoryLabel": "Catégorie",
  "tasks.addTask.selectCategory": "Sélectionner la catégorie",
  "tasks.addTask.titleLabel": "Tâche",
  "tasks.addTask.titlePlaceholder": "Entrez le titre de la tâche...",
  "tasks.addTask.assigneesLabel": "Assignés",
  "tasks.addTask.selectAssignees": "Sélectionner les assignés",
  "tasks.addTask.statusLabel": "Statut",
  "tasks.addTask.priorityLabel": "Priorité",
  "tasks.addTask.selectStatus": "Sélectionner le statut",
  "tasks.addTask.selectPriority": "Sélectionner la priorité",
  "tasks.addTask.dueDateLabel": "Échéance",
  "tasks.addTask.create": "Créer la Tâche",
  "tasks.due.overdue": "En retard",
  "tasks.due.dueToday": "Échéance aujourd'hui",
  "tasks.due.dueSoon": "Échéance proche",
  "tasks.due.left": "restants",
  "tasks.due.ago": "passés",
  "tasks.due.today": "Aujourd'hui",
  // Email
  "email.title": "E-mail",
  "email.description": "Boîte de réception et communications",
  "email.inbox": "Boîte de Réception",
  "email.allMail": "Tous les e-mails",
  "email.unread": "Non lus",
  "email.search": "Rechercher",
  // Kanban
  "kanban.title": "Tableau Kanban",
  "kanban.description": "Gérez vos projets par glisser-déposer",
  // Settings/Customizer
  "customizer.title": "Personnalisateur",
  "customizer.description": "Personnaliser et Prévisualiser en Temps Réel",
  "customizer.theming": "Thèmes",
  "customizer.layout": "Disposition",
  "customizer.navbarType": "Type de Barre",
  "customizer.sidebar": "Barre Latérale",
  "customizer.floating": "Flottant",
  "customizer.inset": "Intégré",
  "customizer.direction": "Direction",
  "customizer.language": "Langue",
  "customizer.default": "Défaut",
  // Common
  "common.search": "Rechercher",
  "common.noResults": "Aucun résultat.",
  "common.download": "Télécharger",
  "common.save": "Enregistrer",
  "common.cancel": "Annuler",
  "common.delete": "Supprimer",
  "common.edit": "Modifier",
  "common.add": "Ajouter",
  "common.close": "Fermer",
  "common.back": "Retour",
  "common.next": "Suivant",
  "common.previous": "Précédent",
  "common.loading": "Chargement...",
  "common.rowsPerPage": "Lignes par page",
  "common.of": "de",
  "common.page": "Page",
  "common.selected": "sélectionné(s)",
  "common.selectAll": "Tout sélectionner"
};
const ar = {
  // Navigation Headings
  "nav.general": "عام",
  "nav.apps": "التطبيقات",
  "nav.crm": "إدارة العلاقات",
  "nav.salesCommerce": "المبيعات والتجارة",
  "nav.inventoryWarehouse": "المخزون والمستودعات",
  "nav.hrWorkforce": "الموارد البشرية",
  "nav.financeAccounting": "المالية والمحاسبة",
  "nav.projectManagement": "إدارة المشاريع",
  "nav.support": "الدعم",
  "nav.marketing": "التسويق",
  "nav.reports": "التقارير",
  "nav.pages": "الصفحات",
  "nav.components": "المكونات",
  "nav.documentation": "التوثيق",
  // Nav Items — General
  "nav.dashboard": "لوحة التحكم",
  "nav.email": "البريد الإلكتروني",
  "nav.tasks": "المهام",
  // Nav Items — Apps
  "nav.kanbanBoard": "لوحة كانبان",
  "nav.ganttChart": "مخطط جانت",
  // Nav Items — CRM
  "nav.contacts": "جهات الاتصال",
  "nav.leads": "العملاء المحتملين",
  "nav.dealsPipeline": "أنبوب الصفقات",
  "nav.companies": "الشركات",
  "nav.activities": "الأنشطة",
  // Nav Items — Sales
  "nav.quotes": "عروض الأسعار",
  "nav.invoices": "الفواتير",
  "nav.orders": "الطلبات",
  "nav.products": "المنتجات",
  "nav.customers": "العملاء",
  // Nav Items — Inventory
  "nav.stockOverview": "نظرة عامة على المخزون",
  "nav.transfers": "التحويلات",
  "nav.purchaseOrders": "أوامر الشراء",
  "nav.vendors": "الموردين",
  // Nav Items — HR
  "nav.employees": "الموظفين",
  "nav.attendance": "الحضور",
  "nav.payroll": "الرواتب",
  "nav.recruitment": "التوظيف",
  "nav.leaveMgmt": "إدارة الإجازات",
  // Nav Items — Finance
  "nav.accounts": "الحسابات",
  "nav.transactions": "المعاملات",
  "nav.expenses": "المصروفات",
  "nav.taxManagement": "إدارة الضرائب",
  "nav.balanceSheet": "الميزانية العمومية",
  "nav.incomeStatement": "قائمة الدخل",
  "nav.financialRatios": "النسب المالية",
  "nav.businessHealth": "صحة الأعمال",
  // Nav Items — Project Management
  "nav.projects": "المشاريع",
  "nav.timesheets": "سجلات الوقت",
  "nav.milestones": "المعالم",
  // Nav Items — Support
  "nav.tickets": "التذاكر",
  "nav.knowledgeBase": "قاعدة المعرفة",
  "nav.liveChat": "الدردشة المباشرة",
  // Nav Items — Marketing
  "nav.campaigns": "الحملات",
  "nav.emailBlasts": "الرسائل الجماعية",
  "nav.analytics": "التحليلات",
  // Nav Items — Reports
  "nav.salesReports": "تقارير المبيعات",
  "nav.financialReports": "التقارير المالية",
  "nav.hrReports": "تقارير الموارد البشرية",
  // Nav Items — Pages
  "nav.authentication": "المصادقة",
  "nav.login": "تسجيل الدخول",
  "nav.loginBasic": "تسجيل دخول بسيط",
  "nav.register": "إنشاء حساب",
  "nav.forgotPassword": "نسيت كلمة المرور",
  "nav.otp": "رمز التحقق",
  "nav.errors": "الأخطاء",
  "nav.settings": "الإعدادات",
  "nav.profile": "الملف الشخصي",
  "nav.account": "الحساب",
  "nav.appearance": "المظهر",
  "nav.notifications": "الإشعارات",
  "nav.display": "العرض",
  // Nav Bottom
  "nav.helpSupport": "المساعدة والدعم",
  "nav.feedback": "الملاحظات",
  // Dashboard
  "dashboard.title": "لوحة التحكم",
  "dashboard.description": "نظرة عامة على المقاييس الرئيسية والأداء",
  "dashboard.totalRevenue": "إجمالي الإيرادات",
  "dashboard.newCustomers": "عملاء جدد",
  "dashboard.activeAccounts": "الحسابات النشطة",
  "dashboard.growthRate": "معدل النمو",
  "dashboard.trendingUp": "اتجاه تصاعدي هذا الشهر",
  "dashboard.down20": "انخفاض 20% هذه الفترة",
  "dashboard.acquisitionAttention": "الاستحواذ يحتاج اهتمام",
  "dashboard.strongRetention": "احتفاظ قوي بالمستخدمين",
  "dashboard.engagementExceed": "التفاعل يتجاوز الأهداف",
  "dashboard.steadyPerformance": "زيادة مستمرة في الأداء",
  "dashboard.meetsGrowth": "يلبي توقعات النمو",
  "dashboard.totalVisitors": "إجمالي الزوار",
  "dashboard.totalLast3Months": "الإجمالي لآخر 3 أشهر",
  "dashboard.last3Months": "آخر 3 أشهر",
  "dashboard.last30Days": "آخر 30 يوم",
  "dashboard.last7Days": "آخر 7 أيام",
  "dashboard.visitorsLast6Months": "الزوار خلال 6 أشهر الأخيرة",
  "dashboard.download": "تحميل",
  // Tasks
  "tasks.title": "المهام",
  "tasks.description": "إليك قائمة مهامك لهذا الشهر!",
  "tasks.allTasks": "جميع المهام",
  "tasks.task": "مهمة",
  "tasks.tasks": "مهام",
  "tasks.projects": "المشاريع",
  "tasks.all": "الكل",
  "tasks.allProjects": "كل المشاريع",
  "tasks.filterPlaceholder": "تصفية المهام...",
  "tasks.loadingMore": "جاري تحميل المزيد…",
  "tasks.noResults": "لا توجد نتائج.",
  "tasks.col.sno": "#",
  "tasks.col.title": "العنوان",
  "tasks.col.status": "الحالة",
  "tasks.col.assignees": "المكلفون",
  "tasks.col.priority": "الأولوية",
  "tasks.col.createdAt": "تاريخ الإنشاء",
  "tasks.col.dueDate": "تاريخ الاستحقاق",
  "tasks.label.bug": "خطأ",
  "tasks.label.feature": "ميزة",
  "tasks.label.documentation": "توثيق",
  "tasks.status.backlog": "قائمة الانتظار",
  "tasks.status.todo": "للتنفيذ",
  "tasks.status.inProgress": "قيد التنفيذ",
  "tasks.status.done": "مكتمل",
  "tasks.status.canceled": "ملغي",
  "tasks.priority.low": "منخفضة",
  "tasks.priority.medium": "متوسطة",
  "tasks.priority.high": "عالية",
  "tasks.addTask": "إضافة مهمة",
  "tasks.reset": "إعادة تعيين",
  "tasks.clearFilters": "مسح الفلاتر",
  "tasks.view": "عرض",
  "tasks.toggleColumns": "تبديل الأعمدة",
  "tasks.sortAsc": "تصاعدي",
  "tasks.sortDesc": "تنازلي",
  "tasks.hide": "إخفاء",
  "tasks.nSelected": "محدد",
  "tasks.actions.edit": "تعديل",
  "tasks.actions.copy": "إنشاء نسخة",
  "tasks.actions.favorite": "مفضلة",
  "tasks.actions.labels": "التصنيفات",
  "tasks.actions.delete": "حذف",
  "tasks.actions.openMenu": "فتح القائمة",
  "tasks.addTask.title": "مهمة جديدة",
  "tasks.addTask.desc": "املأ التفاصيل لإنشاء مهمة جديدة.",
  "tasks.addTask.projectLabel": "المشروع",
  "tasks.addTask.selectProject": "اختر مشروع",
  "tasks.addTask.phaseLabel": "المرحلة",
  "tasks.addTask.selectPhase": "اختر مرحلة",
  "tasks.addTask.categoryLabel": "الفئة",
  "tasks.addTask.selectCategory": "اختر فئة",
  "tasks.addTask.titleLabel": "المهمة",
  "tasks.addTask.titlePlaceholder": "أدخل عنوان المهمة...",
  "tasks.addTask.assigneesLabel": "المكلفون",
  "tasks.addTask.selectAssignees": "اختر المكلفين",
  "tasks.addTask.statusLabel": "الحالة",
  "tasks.addTask.priorityLabel": "الأولوية",
  "tasks.addTask.selectStatus": "اختر الحالة",
  "tasks.addTask.selectPriority": "اختر الأولوية",
  "tasks.addTask.dueDateLabel": "تاريخ الاستحقاق",
  "tasks.addTask.create": "إنشاء مهمة",
  "tasks.due.overdue": "متأخر",
  "tasks.due.dueToday": "مستحق اليوم",
  "tasks.due.dueSoon": "مستحق قريباً",
  "tasks.due.left": "متبقي",
  "tasks.due.ago": "مضى",
  "tasks.due.today": "اليوم",
  // Email
  "email.title": "البريد الإلكتروني",
  "email.description": "البريد الوارد والاتصالات",
  "email.inbox": "البريد الوارد",
  "email.allMail": "كل البريد",
  "email.unread": "غير مقروء",
  "email.search": "بحث",
  // Kanban
  "kanban.title": "لوحة كانبان",
  "kanban.description": "إدارة مشاريعك بالسحب والإفلات",
  // Settings/Customizer
  "customizer.title": "مخصص القالب",
  "customizer.description": "تخصيص ومعاينة في الوقت الحقيقي",
  "customizer.theming": "السمات",
  "customizer.layout": "التخطيط",
  "customizer.navbarType": "نوع الشريط",
  "customizer.sidebar": "شريط جانبي",
  "customizer.floating": "عائم",
  "customizer.inset": "مدمج",
  "customizer.direction": "الاتجاه",
  "customizer.language": "اللغة",
  "customizer.default": "افتراضي",
  // Common
  "common.search": "بحث",
  "common.noResults": "لا توجد نتائج.",
  "common.download": "تحميل",
  "common.save": "حفظ",
  "common.cancel": "إلغاء",
  "common.delete": "حذف",
  "common.edit": "تعديل",
  "common.add": "إضافة",
  "common.close": "إغلاق",
  "common.back": "رجوع",
  "common.next": "التالي",
  "common.previous": "السابق",
  "common.loading": "جاري التحميل...",
  "common.rowsPerPage": "صفوف لكل صفحة",
  "common.of": "من",
  "common.page": "صفحة",
  "common.selected": "محدد",
  "common.selectAll": "تحديد الكل"
};
const he = {
  // Navigation Headings
  "nav.general": "כללי",
  "nav.apps": "אפליקציות",
  "nav.crm": "ניהול לקוחות",
  "nav.salesCommerce": "מכירות ומסחר",
  "nav.inventoryWarehouse": "מלאי ומחסן",
  "nav.hrWorkforce": "משאבי אנוש",
  "nav.financeAccounting": "כספים וחשבונאות",
  "nav.projectManagement": "ניהול פרויקטים",
  "nav.support": "תמיכה",
  "nav.marketing": "שיווק",
  "nav.reports": "דוחות",
  "nav.pages": "דפים",
  "nav.components": "רכיבים",
  "nav.documentation": "תיעוד",
  // Nav Items — General
  "nav.dashboard": "לוח בקרה",
  "nav.email": "דוא״ל",
  "nav.tasks": "משימות",
  // Nav Items — Apps
  "nav.kanbanBoard": "לוח קנבן",
  "nav.ganttChart": "תרשים גנט",
  // Nav Items — CRM
  "nav.contacts": "אנשי קשר",
  "nav.leads": "לידים",
  "nav.dealsPipeline": "צינור עסקאות",
  "nav.companies": "חברות",
  "nav.activities": "פעילויות",
  // Nav Items — Sales
  "nav.quotes": "הצעות מחיר",
  "nav.invoices": "חשבוניות",
  "nav.orders": "הזמנות",
  "nav.products": "מוצרים",
  "nav.customers": "לקוחות",
  // Nav Items — Inventory
  "nav.stockOverview": "סקירת מלאי",
  "nav.transfers": "העברות",
  "nav.purchaseOrders": "הזמנות רכש",
  "nav.vendors": "ספקים",
  // Nav Items — HR
  "nav.employees": "עובדים",
  "nav.attendance": "נוכחות",
  "nav.payroll": "שכר",
  "nav.recruitment": "גיוס",
  "nav.leaveMgmt": "ניהול חופשות",
  // Nav Items — Finance
  "nav.accounts": "חשבונות",
  "nav.transactions": "עסקאות",
  "nav.expenses": "הוצאות",
  "nav.taxManagement": "ניהול מיסים",
  "nav.balanceSheet": "מאזן",
  "nav.incomeStatement": "דוח רווח והפסד",
  "nav.financialRatios": "יחסים פיננסיים",
  "nav.businessHealth": "בריאות עסקית",
  // Nav Items — Project Management
  "nav.projects": "פרויקטים",
  "nav.timesheets": "גיליונות זמן",
  "nav.milestones": "אבני דרך",
  // Nav Items — Support
  "nav.tickets": "פניות",
  "nav.knowledgeBase": "מאגר ידע",
  "nav.liveChat": "צ'אט חי",
  // Nav Items — Marketing
  "nav.campaigns": "קמפיינים",
  "nav.emailBlasts": "דיוור המוני",
  "nav.analytics": "אנליטיקה",
  // Nav Items — Reports
  "nav.salesReports": "דוחות מכירות",
  "nav.financialReports": "דוחות כספיים",
  "nav.hrReports": "דוחות משאבי אנוש",
  // Nav Items — Pages
  "nav.authentication": "אימות",
  "nav.login": "התחברות",
  "nav.loginBasic": "התחברות בסיסית",
  "nav.register": "הרשמה",
  "nav.forgotPassword": "שכחתי סיסמה",
  "nav.otp": "קוד אימות",
  "nav.errors": "שגיאות",
  "nav.settings": "הגדרות",
  "nav.profile": "פרופיל",
  "nav.account": "חשבון",
  "nav.appearance": "מראה",
  "nav.notifications": "התראות",
  "nav.display": "תצוגה",
  // Nav Bottom
  "nav.helpSupport": "עזרה ותמיכה",
  "nav.feedback": "משוב",
  // Dashboard
  "dashboard.title": "לוח בקרה",
  "dashboard.description": "סקירת מדדים מרכזיים וביצועים",
  "dashboard.totalRevenue": "סה״כ הכנסות",
  "dashboard.newCustomers": "לקוחות חדשים",
  "dashboard.activeAccounts": "חשבונות פעילים",
  "dashboard.growthRate": "קצב צמיחה",
  "dashboard.trendingUp": "מגמת עלייה החודש",
  "dashboard.down20": "ירידה של 20% בתקופה זו",
  "dashboard.acquisitionAttention": "הרכישה דורשת תשומת לב",
  "dashboard.strongRetention": "שימור חזק של משתמשים",
  "dashboard.engagementExceed": "המעורבות עולה על היעדים",
  "dashboard.steadyPerformance": "עלייה יציבה בביצועים",
  "dashboard.meetsGrowth": "עומד בתחזיות הצמיחה",
  "dashboard.totalVisitors": "סה״כ מבקרים",
  "dashboard.totalLast3Months": "סה״כ ל-3 חודשים אחרונים",
  "dashboard.last3Months": "3 חודשים אחרונים",
  "dashboard.last30Days": "30 ימים אחרונים",
  "dashboard.last7Days": "7 ימים אחרונים",
  "dashboard.visitorsLast6Months": "מבקרים ב-6 חודשים אחרונים",
  "dashboard.download": "הורדה",
  // Tasks
  "tasks.title": "משימות",
  "tasks.description": "הנה רשימת המשימות שלך לחודש זה!",
  "tasks.allTasks": "כל המשימות",
  "tasks.task": "משימה",
  "tasks.tasks": "משימות",
  "tasks.projects": "פרויקטים",
  "tasks.all": "הכל",
  "tasks.allProjects": "כל הפרויקטים",
  "tasks.filterPlaceholder": "סינון משימות...",
  "tasks.loadingMore": "טוען עוד…",
  "tasks.noResults": "אין תוצאות.",
  "tasks.col.sno": "#",
  "tasks.col.title": "כותרת",
  "tasks.col.status": "סטטוס",
  "tasks.col.assignees": "משויכים",
  "tasks.col.priority": "עדיפות",
  "tasks.col.createdAt": "תאריך יצירה",
  "tasks.col.dueDate": "תאריך יעד",
  "tasks.label.bug": "באג",
  "tasks.label.feature": "פיצ'ר",
  "tasks.label.documentation": "תיעוד",
  "tasks.status.backlog": "ממתין",
  "tasks.status.todo": "לביצוע",
  "tasks.status.inProgress": "בתהליך",
  "tasks.status.done": "הושלם",
  "tasks.status.canceled": "בוטל",
  "tasks.priority.low": "נמוכה",
  "tasks.priority.medium": "בינונית",
  "tasks.priority.high": "גבוהה",
  "tasks.addTask": "הוסף משימה",
  "tasks.reset": "איפוס",
  "tasks.clearFilters": "נקה מסננים",
  "tasks.view": "תצוגה",
  "tasks.toggleColumns": "החלפת עמודות",
  "tasks.sortAsc": "עולה",
  "tasks.sortDesc": "יורד",
  "tasks.hide": "הסתר",
  "tasks.nSelected": "נבחרו",
  "tasks.actions.edit": "עריכה",
  "tasks.actions.copy": "צור עותק",
  "tasks.actions.favorite": "מועדף",
  "tasks.actions.labels": "תגיות",
  "tasks.actions.delete": "מחיקה",
  "tasks.actions.openMenu": "פתח תפריט",
  "tasks.addTask.title": "משימה חדשה",
  "tasks.addTask.desc": "מלא את הפרטים ליצירת משימה חדשה.",
  "tasks.addTask.projectLabel": "פרויקט",
  "tasks.addTask.selectProject": "בחר פרויקט",
  "tasks.addTask.phaseLabel": "שלב",
  "tasks.addTask.selectPhase": "בחר שלב",
  "tasks.addTask.categoryLabel": "קטגוריה",
  "tasks.addTask.selectCategory": "בחר קטגוריה",
  "tasks.addTask.titleLabel": "משימה",
  "tasks.addTask.titlePlaceholder": "הזן כותרת משימה...",
  "tasks.addTask.assigneesLabel": "מבצעים",
  "tasks.addTask.selectAssignees": "בחר מבצעים",
  "tasks.addTask.statusLabel": "סטטוס",
  "tasks.addTask.priorityLabel": "עדיפות",
  "tasks.addTask.selectStatus": "בחר סטטוס",
  "tasks.addTask.selectPriority": "בחר עדיפות",
  "tasks.addTask.dueDateLabel": "תאריך יעד",
  "tasks.addTask.create": "צור משימה",
  "tasks.due.overdue": "באיחור",
  "tasks.due.dueToday": "מועד היום",
  "tasks.due.dueSoon": "מועד בקרוב",
  "tasks.due.left": "נותרו",
  "tasks.due.ago": "עברו",
  "tasks.due.today": "היום",
  // Email
  "email.title": "דוא״ל",
  "email.description": "תיבת דואר ותקשורת",
  "email.inbox": "תיבת דואר נכנס",
  "email.allMail": "כל הדואר",
  "email.unread": "לא נקרא",
  "email.search": "חיפוש",
  // Kanban
  "kanban.title": "לוח קנבן",
  "kanban.description": "נהל את הפרויקטים שלך בגרירה ושחרור",
  // Settings/Customizer
  "customizer.title": "מותאם אישית",
  "customizer.description": "התאמה אישית ותצוגה מקדימה בזמן אמת",
  "customizer.theming": "ערכות נושא",
  "customizer.layout": "פריסה",
  "customizer.navbarType": "סוג סרגל",
  "customizer.sidebar": "סרגל צד",
  "customizer.floating": "צף",
  "customizer.inset": "משובץ",
  "customizer.direction": "כיוון",
  "customizer.language": "שפה",
  "customizer.default": "ברירת מחדל",
  // Common
  "common.search": "חיפוש",
  "common.noResults": "אין תוצאות.",
  "common.download": "הורדה",
  "common.save": "שמירה",
  "common.cancel": "ביטול",
  "common.delete": "מחיקה",
  "common.edit": "עריכה",
  "common.add": "הוספה",
  "common.close": "סגירה",
  "common.back": "חזרה",
  "common.next": "הבא",
  "common.previous": "הקודם",
  "common.loading": "טוען...",
  "common.rowsPerPage": "שורות לעמוד",
  "common.of": "מתוך",
  "common.page": "עמוד",
  "common.selected": "נבחרו",
  "common.selectAll": "בחר הכל"
};
const messages = { en, es, fr, ar, he };
function useLocale() {
  const localeCookie = useCookie("app_locale", { default: () => "en" });
  function setLocale(locale) {
    localeCookie.value = locale;
  }
  function t(key) {
    const locale = localeCookie.value;
    return messages[locale]?.[key] ?? messages.en[key] ?? key;
  }
  return {
    locale: computed(() => localeCookie.value),
    setLocale,
    t
  };
}
function logicAnd(...args) {
  return computed(() => args.every((i) => toValue(i)));
}
function logicNot(v) {
  return computed(() => !toValue(v));
}
function _useShortcuts() {
  const macOS = computed(() => false);
  const metaSymbol = ref(" ");
  const activeElement = useActiveElement();
  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;
    const usingInput2 = tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable === "true" || contentEditable === "plaintext-only";
    if (usingInput2) {
      return activeElement.value?.name || true;
    }
    return false;
  });
  return {
    macOS,
    metaSymbol,
    activeElement,
    usingInput
  };
}
const useShortcuts = createSharedComposable(_useShortcuts);
const chainedShortcutRegex = /^[^-]+(?:-[^-]+)*-.*(?:[\n\r\u2028\u2029][^-]*|[^-\n\r\u2028\u2029])$/;
const combinedShortcutRegex = /^[^_]+(?:_[^_]+)*_.*(?:[\n\r\u2028\u2029][^_]*|[^\n\r_\u2028\u2029])$/;
function defineShortcuts(config, options = {}) {
  const { macOS, usingInput } = useShortcuts();
  let shortcuts = [];
  const chainedInputs = ref([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, options.chainDelay ?? 800);
  const onKeyDown = (e) => {
    if (!e.key) {
      return;
    }
    const alphabeticalKey = /^[a-z]$/i.test(e.key);
    let chainedKey;
    chainedInputs.value.push(e.key);
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join("-");
      for (const shortcut of shortcuts.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }
        if (shortcut.condition.value) {
          e.preventDefault();
          shortcut.handler();
        }
        clearChainedInput();
        return;
      }
    }
    for (const shortcut of shortcuts.filter((s) => !s.chained)) {
      if (e.key.toLowerCase() !== shortcut.key) {
        continue;
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      if (alphabeticalKey && e.shiftKey !== shortcut.shiftKey) {
        continue;
      }
      if (shortcut.condition.value) {
        e.preventDefault();
        shortcut.handler();
      }
      clearChainedInput();
      return;
    }
    debouncedClearChainedInput();
  };
  shortcuts = Object.entries(config).map(([key, shortcutConfig]) => {
    if (!shortcutConfig) {
      return null;
    }
    let shortcut;
    if (key.includes("-") && key !== "-" && !key.match(chainedShortcutRegex)?.length) {
      console.trace(`[Shortcut] Invalid key: "${key}"`);
    }
    if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
      console.trace(`[Shortcut] Invalid key: "${key}"`);
    }
    const chained = key.includes("-") && key !== "-";
    if (chained) {
      shortcut = {
        key: key.toLowerCase(),
        metaKey: false,
        ctrlKey: false,
        shiftKey: false,
        altKey: false
      };
    } else {
      const keySplit = key.toLowerCase().split("_").map((k) => k);
      shortcut = {
        key: keySplit.filter((k) => !["meta", "ctrl", "shift", "alt"].includes(k)).join("_"),
        metaKey: keySplit.includes("meta"),
        ctrlKey: keySplit.includes("ctrl"),
        shiftKey: keySplit.includes("shift"),
        altKey: keySplit.includes("alt")
      };
    }
    shortcut.chained = chained;
    if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
      shortcut.metaKey = false;
      shortcut.ctrlKey = true;
    }
    if (typeof shortcutConfig === "function") {
      shortcut.handler = shortcutConfig;
    } else if (typeof shortcutConfig === "object") {
      shortcut = { ...shortcut, handler: shortcutConfig.handler };
    }
    if (!shortcut.handler) {
      console.trace("[Shortcut] Invalid value");
      return null;
    }
    const conditions = [];
    if (!shortcutConfig.usingInput) {
      conditions.push(logicNot(usingInput));
    } else if (typeof shortcutConfig.usingInput === "string") {
      conditions.push(computed(() => usingInput.value === shortcutConfig.usingInput));
    }
    shortcut.condition = logicAnd(...conditions, ...shortcutConfig.whenever || []);
    return shortcut;
  }).filter(Boolean);
  useEventListener("keydown", onKeyDown);
}
const title = "ETG CRM — Enterprise CRM Platform";
const description = "A comprehensive enterprise CRM platform. ETG CRM — featuring full CRUD, dark mode, BigQuery integration, and multi-module support.";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const color = computed(() => colorMode.value === "dark" ? "#09090b" : "#ffffff");
    const { theme, direction: savedDirection } = useAppSettings();
    const { locale } = useLocale();
    const dir = computed(() => savedDirection.value === "rtl" ? "rtl" : "ltr");
    const textDirection = useTextDirection();
    watch(dir, (newDir) => {
      textDirection.value = newDir;
    });
    useHead({
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { key: "theme-color", name: "theme-color", content: color }
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/logo-180.png" },
        { rel: "manifest", href: "/manifest.json" }
      ],
      htmlAttrs: {
        lang: computed(() => locale.value || "en"),
        dir: computed(() => dir.value)
      },
      bodyAttrs: {
        class: computed(() => `color-${theme.value?.color || "default"} theme-${theme.value?.type || "default"}`)
      }
    });
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: "/",
      ogImage: "/logo-512.png",
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: "/logo-512.png",
      twitterCard: "summary_large_image"
    });
    const router = useRouter();
    defineShortcuts({
      "G-H": () => router.push("/"),
      "G-E": () => router.push("/email")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Body = Body;
      const _component_NuxtLayout = __nuxt_component_1$1;
      const _component_NuxtPage = __nuxt_component_1;
      _push(ssrRenderComponent(_component_Body, mergeProps({ class: "overscroll-none antialiased bg-background text-foreground" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ConfigProvider), { dir: unref(dir) }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div id="app" vaul-drawer-wrapper class="relative h-screen overflow-hidden"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLayout, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPage)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$4), {
                    theme: unref(colorMode).preference || "system"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", {
                      id: "app",
                      "vaul-drawer-wrapper": "",
                      class: "relative h-screen overflow-hidden"
                    }, [
                      createVNode(_component_NuxtLayout, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtPage)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(_sfc_main$4), {
                      theme: unref(colorMode).preference || "system"
                    }, null, 8, ["theme"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ConfigProvider), { dir: unref(dir) }, {
                default: withCtx(() => [
                  createVNode("div", {
                    id: "app",
                    "vaul-drawer-wrapper": "",
                    class: "relative h-screen overflow-hidden"
                  }, [
                    createVNode(_component_NuxtLayout, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPage)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(_sfc_main$4), {
                    theme: unref(colorMode).preference || "system"
                  }, null, 8, ["theme"])
                ]),
                _: 1
              }, 8, ["dir"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "button",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: __props.variant, size: __props.size }), props.class)
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        "default": "h-9 px-4 py-2 has-[>svg]:px-3",
        "sm": "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
function makeViewBoxSquare(viewBox) {
  const [left, top, width, height] = viewBox;
  if (width !== height) {
    const max = Math.max(width, height);
    return [left - (max - width) / 2, top - (max - height) / 2, max, max];
  }
  return viewBox;
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index2 = content.indexOf("<" + tag);
  while (index2 >= 0) {
    const start = content.indexOf(">", index2);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index2).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
function getCommonCSSRules(options) {
  const result = {
    display: "inline-block",
    width: "1em",
    height: "1em"
  };
  const varName = options.varName;
  if (options.pseudoSelector) {
    result["content"] = "''";
  }
  switch (options.mode) {
    case "background":
      if (varName) {
        result["background-image"] = "var(--" + varName + ")";
      }
      result["background-repeat"] = "no-repeat";
      result["background-size"] = "100% 100%";
      break;
    case "mask":
      result["background-color"] = "currentColor";
      if (varName) {
        result["mask-image"] = result["-webkit-mask-image"] = "var(--" + varName + ")";
      }
      result["mask-repeat"] = result["-webkit-mask-repeat"] = "no-repeat";
      result["mask-size"] = result["-webkit-mask-size"] = "100% 100%";
      break;
  }
  return result;
}
function generateItemCSSRules(icon, options) {
  const result = {};
  const varName = options.varName;
  const buildResult = iconToSVG(icon);
  let viewBox = buildResult.viewBox;
  if (viewBox[2] !== viewBox[3]) {
    if (options.forceSquare) {
      viewBox = makeViewBoxSquare(viewBox);
    } else {
      result["width"] = calculateSize("1em", viewBox[2] / viewBox[3]);
    }
  }
  const svg = iconToHTML(
    buildResult.body.replace(/currentColor/g, options.color || "black"),
    {
      viewBox: `${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}`,
      width: `${viewBox[2]}`,
      height: `${viewBox[3]}`
    }
  );
  const url = svgToURL(svg);
  if (varName) {
    result["--" + varName] = url;
  } else {
    switch (options.mode) {
      case "background":
        result["background-image"] = url;
        break;
      case "mask":
        result["mask-image"] = result["-webkit-mask-image"] = url;
        break;
    }
  }
  return result;
}
const format = {
  selectorStart: {
    compressed: "{",
    compact: " {",
    expanded: " {"
  },
  selectorEnd: {
    compressed: "}",
    compact: "; }\n",
    expanded: ";\n}\n"
  },
  rule: {
    compressed: "{key}:",
    compact: " {key}: ",
    expanded: "\n  {key}: "
  }
};
function formatCSS(data, mode = "expanded") {
  const results = [];
  for (let i = 0; i < data.length; i++) {
    const { selector, rules } = data[i];
    const fullSelector = selector instanceof Array ? selector.join(mode === "compressed" ? "," : ", ") : selector;
    let entry2 = fullSelector + format.selectorStart[mode];
    let firstRule = true;
    for (const key in rules) {
      if (!firstRule) {
        entry2 += ";";
      }
      entry2 += format.rule[mode].replace("{key}", key) + rules[key];
      firstRule = false;
    }
    entry2 += format.selectorEnd[mode];
    results.push(entry2);
  }
  return results.join(mode === "compressed" ? "" : "\n");
}
function getIconCSS(icon, options = {}) {
  const body = options.customise ? options.customise(icon.body) : icon.body;
  const mode = options.mode || (options.color || !body.includes("currentColor") ? "background" : "mask");
  let varName = options.varName;
  if (varName === void 0 && mode === "mask") {
    varName = "svg";
  }
  const newOptions = {
    ...options,
    // Override mode and varName
    mode,
    varName
  };
  if (mode === "background") {
    delete newOptions.varName;
  }
  const rules = {
    ...options.rules,
    ...getCommonCSSRules(newOptions),
    ...generateItemCSSRules(
      {
        ...defaultIconProps,
        ...icon,
        body
      },
      newOptions
    )
  };
  const selector = options.iconSelector || ".icon";
  return formatCSS(
    [
      {
        selector,
        rules
      }
    ],
    newOptions.format
  );
}
async function loadIcon(name, timeout) {
  if (!name)
    return null;
  const _icon = getIcon(name);
  if (_icon)
    return _icon;
  let timeoutWarn;
  const load = loadIcon$1(name).catch(() => {
    console.warn(`[Icon] failed to load icon \`${name}\``);
    return null;
  });
  if (timeout > 0)
    await Promise.race([
      load,
      new Promise((resolve) => {
        timeoutWarn = setTimeout(() => {
          console.warn(`[Icon] loading icon \`${name}\` timed out after ${timeout}ms`);
          resolve();
        }, timeout);
      })
    ]).finally(() => clearTimeout(timeoutWarn));
  else
    await load;
  return getIcon(name);
}
function useResolvedName(getName) {
  const options = useAppConfig().icon;
  const collections = (options.collections || []).sort((a, b) => b.length - a.length);
  return computed(() => {
    const name = getName();
    const bare = name.startsWith(options.cssSelectorPrefix) ? name.slice(options.cssSelectorPrefix.length) : name;
    const resolved = options.aliases?.[bare] || bare;
    if (!resolved.includes(":")) {
      const collection = collections.find((c) => resolved.startsWith(c + "-"));
      return collection ? collection + ":" + resolved.slice(collection.length + 1) : resolved;
    }
    return resolved;
  });
}
function resolveCustomizeFn(customize, globalCustomize) {
  if (customize === false) return void 0;
  if (customize === true || customize === null) return globalCustomize;
  return customize;
}
const SYMBOL_SERVER_CSS = "NUXT_ICONS_SERVER_CSS";
function escapeCssSelector(selector) {
  return selector.replace(/([^\w-])/g, "\\$1");
}
const NuxtIconCss = /* @__PURE__ */ defineComponent({
  name: "NuxtIconCss",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props) {
    const nuxt = useNuxtApp();
    const options = useAppConfig().icon;
    const cssClass = computed(() => props.name ? options.cssSelectorPrefix + props.name : "");
    const selector = computed(() => "." + escapeCssSelector(cssClass.value));
    function getCSS(icon, withLayer = true) {
      let iconSelector = selector.value;
      if (options.cssWherePseudo) {
        iconSelector = `:where(${iconSelector})`;
      }
      const css = getIconCSS(icon, {
        iconSelector,
        format: "compressed",
        customise: resolveCustomizeFn(props.customize, options.customize)
      });
      if (options.cssLayer && withLayer) {
        return `@layer ${options.cssLayer} { ${css} }`;
      }
      return css;
    }
    onServerPrefetch(async () => {
      {
        const configs = (/* @__PURE__ */ useRuntimeConfig()).icon || {};
        if (!configs?.serverKnownCssClasses?.includes(cssClass.value)) {
          const icon = await loadIcon(props.name, options.fetchTimeout).catch(() => null);
          if (!icon)
            return null;
          let ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS];
          if (!ssrCSS) {
            ssrCSS = nuxt.vueApp._context.provides[SYMBOL_SERVER_CSS] = /* @__PURE__ */ new Map();
            nuxt.runWithContext(() => {
              useHead({
                style: [
                  () => {
                    const sep = "";
                    let css = Array.from(ssrCSS.values()).sort().join(sep);
                    if (options.cssLayer) {
                      css = `@layer ${options.cssLayer} {${sep}${css}${sep}}`;
                    }
                    return { innerHTML: css };
                  }
                ]
              }, {
                tagPriority: "low"
              });
            });
          }
          if (props.name && !ssrCSS.has(props.name)) {
            const css = getCSS(icon, false);
            ssrCSS.set(props.name, css);
          }
          return null;
        }
      }
    });
    return () => h("span", { class: ["iconify", cssClass.value] });
  }
});
const NuxtIconSvg = /* @__PURE__ */ defineComponent({
  name: "NuxtIconSvg",
  props: {
    name: {
      type: String,
      required: true
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    useNuxtApp();
    const options = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const storeKey = "i-" + name.value;
    if (name.value) {
      onServerPrefetch(async () => {
        {
          await useAsyncData(
            storeKey,
            async () => await loadIcon(name.value, options.fetchTimeout),
            { deep: false }
          );
        }
      });
    }
    return () => h(Icon, {
      icon: name.value,
      ssr: true,
      // Iconify uses `customise`, where we expose `customize` for consistency
      customise: resolveCustomizeFn(props.customize, options.customize)
    }, slots);
  }
});
const __nuxt_component_2 = defineComponent({
  name: "NuxtIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: null
    },
    customize: {
      type: [Function, Boolean, null],
      default: null,
      required: false
    }
  },
  setup(props, { slots }) {
    const nuxtApp = useNuxtApp();
    const runtimeOptions = useAppConfig().icon;
    const name = useResolvedName(() => props.name);
    const component = computed(
      () => nuxtApp.vueApp?.component(name.value) || ((props.mode || runtimeOptions.mode) === "svg" ? NuxtIconSvg : NuxtIconCss)
    );
    const style = computed(() => {
      const size = props.size || runtimeOptions.size;
      return size ? { fontSize: Number.isNaN(+size) ? size : size + "px" } : null;
    });
    return () => h(
      component.value,
      {
        ...runtimeOptions.attrs,
        name: name.value,
        class: runtimeOptions.class,
        style: style.value,
        customize: props.customize
      },
      slots
    );
  }
});
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const { theme } = useAppSettings();
    useHead({
      bodyAttrs: {
        class: computed(() => `color-${theme.value?.color || "default"} theme-${theme.value?.type || "default"}`)
      }
    });
    const router = useRouter();
    const props = __props;
    const errorCode = computed(() => props.error?.statusCode || 404);
    const errorMessage = computed(() => {
      if (errorCode.value === 404) return "Page Not Found";
      if (errorCode.value === 500) return "Internal Server Error";
      return props.error?.message || "Something went wrong";
    });
    const errorDescription = computed(() => {
      if (errorCode.value === 404) return "The page you're looking for doesn't exist or may have been moved.";
      if (errorCode.value === 500) return "We encountered an unexpected error. Please try again later.";
      return "An unexpected error occurred. Please try again.";
    });
    const entered = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-svh bg-background relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 overflow-hidden"><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div><div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/5 rounded-full"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary/5 rounded-full"></div></div><div class="relative z-10 m-auto h-full w-full flex flex-col items-center justify-center gap-4 p-6"><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95", "transition-all duration-700"])}"><div class="text-center"><h1 class="text-[8rem] md:text-[10rem] font-black leading-none tracking-tighter bg-gradient-to-br from-primary/80 via-primary/40 to-primary/10 bg-clip-text text-transparent select-none">${ssrInterpolate(unref(errorCode))}</h1><h2 class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "text-lg md:text-xl font-bold -mt-2 transition-all duration-700 delay-100"])}">${ssrInterpolate(unref(errorMessage))}</h2><p class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "text-sm text-muted-foreground mt-2 max-w-md mx-auto transition-all duration-700 delay-200"])}">${ssrInterpolate(unref(errorDescription))}</p><div class="${ssrRenderClass([unref(entered) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", "mt-8 flex items-center justify-center gap-3 transition-all duration-700 delay-300"])}">`);
      _push(ssrRenderComponent(_component_Button, {
        variant: "outline",
        size: "sm",
        class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow",
        onClick: ($event) => unref(router).back()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-arrow-left",
              class: "size-3.5"
            }, null, _parent2, _scopeId));
            _push2(` Go Back `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-lucide-arrow-left",
                class: "size-3.5"
              }),
              createTextVNode(" Go Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Button, {
        size: "sm",
        class: "gap-1.5 shadow-sm hover:shadow-md transition-shadow",
        onClick: ($event) => unref(router).push("/")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-lucide-home",
              class: "size-3.5"
            }, null, _parent2, _scopeId));
            _push2(` Back to Home `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-lucide-home",
                class: "size-3.5"
              }),
              createTextVNode(" Back to Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/nuxt@4.2.0_@parcel+watcher@2.5.1_@types+node@25.3.0_@vue+compiler-sfc@3.5.22_db0@0.3.4__8f68a0c10a3327b7ccee4b0de6beb988/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { useEventListener as A, useLocale as B, _sfc_main$2 as _, __nuxt_component_2 as a, useRouter as b, useRoute as c, useSeoMeta as d, entry$1 as default, cn as e, fetchDefaults as f, useAsyncData as g, useRequestFetch as h, __nuxt_component_1 as i, useNuxtApp as j, useRuntimeConfig as k, nuxtLinkDefaults as l, reactiveOmit as m, navigateTo as n, useVModel as o, useColorMode as p, useClipboard as q, resolveRouteObject as r, useShortcuts as s, defineShortcuts as t, useAuth as u, useCurrentElement as v, buttonVariants as w, createInjectionState as x, useAppSettings as y, useMediaQuery as z };
//# sourceMappingURL=server.mjs.map
