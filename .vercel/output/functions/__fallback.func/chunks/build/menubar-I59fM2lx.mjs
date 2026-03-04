import { _ as _sfc_main$g } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, m as reactiveOmit, e as cn } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$h, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, defineComponent, unref, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, MenubarRoot, MenubarMenu, useForwardProps, MenubarTrigger, MenubarPortal, MenubarContent, MenubarItem, MenubarSeparator, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarCheckboxItem, MenubarItemIndicator, MenubarGroup, MenubarLabel, MenubarRadioGroup, MenubarRadioItem } from 'reka-ui';
import { ChevronRight, Check, Circle } from 'lucide-vue-next';
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

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Menubar",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    defaultValue: {},
    dir: {},
    loop: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarRoot), mergeProps({ "data-slot": "menubar" }, unref(forwarded), {
        class: unref(cn)(
          "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
          props.class
        )
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/Menubar.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "MenubarCheckboxItem",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarCheckboxItem), mergeProps({ "data-slot": "menubar-checkbox-item" }, unref(forwarded), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MenubarItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Check), { class: "size-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Check), { class: "size-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" }, [
                createVNode(unref(MenubarItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Check), { class: "size-4" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarCheckboxItem.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "MenubarContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 8 },
    sideFlip: { type: Boolean },
    align: { default: "start" },
    alignOffset: { default: -4 },
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenubarContent), mergeProps({ "data-slot": "menubar-content" }, unref(forwardedProps), {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MenubarContent), mergeProps({ "data-slot": "menubar-content" }, unref(forwardedProps), {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarContent.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "MenubarGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarGroup), mergeProps({ "data-slot": "menubar-group" }, props, _attrs), {
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarGroup.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "MenubarItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean },
    variant: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class", "inset", "variant");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarItem), mergeProps({
        "data-slot": "menubar-item",
        "data-inset": __props.inset ? "" : void 0,
        "data-variant": __props.variant
      }, unref(forwarded), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          props.class
        )
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
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarItem.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "MenubarLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "inset");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarLabel), mergeProps({
        "data-inset": __props.inset ? "" : void 0
      }, unref(delegatedProps), {
        class: unref(cn)("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", props.class)
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarLabel.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "MenubarMenu",
  __ssrInlineRender: true,
  props: {
    value: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarMenu), mergeProps({ "data-slot": "menubar-menu" }, props, _attrs), {
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarMenu.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "MenubarRadioGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarRadioGroup), mergeProps({ "data-slot": "menubar-radio-group" }, unref(forwarded), _attrs), {
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
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarRadioGroup.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MenubarRadioItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarRadioItem), mergeProps({ "data-slot": "menubar-radio-item" }, unref(forwarded), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MenubarItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Circle), { class: "size-2 fill-current" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Circle), { class: "size-2 fill-current" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center" }, [
                createVNode(unref(MenubarItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Circle), { class: "size-2 fill-current" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarRadioItem.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MenubarSeparator",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarSeparator), mergeProps({
        "data-slot": "menubar-separator",
        class: unref(cn)("bg-border -mx-1 my-1 h-px", props.class)
      }, unref(forwardedProps), _attrs), null, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarSeparator.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MenubarShortcut",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        "data-slot": "menubar-shortcut",
        class: unref(cn)("text-muted-foreground ml-auto text-xs tracking-widest", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarShortcut.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MenubarSub",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarSub), mergeProps({ "data-slot": "menubar-sub" }, unref(forwarded), _attrs), {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarSub.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MenubarSubContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    sideFlip: { type: Boolean },
    alignOffset: {},
    alignFlip: { type: Boolean },
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenubarSubContent), mergeProps({ "data-slot": "menubar-sub-content" }, unref(forwarded), {
              class: unref(cn)(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
                props.class
              )
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MenubarSubContent), mergeProps({ "data-slot": "menubar-sub-content" }, unref(forwarded), {
                class: unref(cn)(
                  "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--reka-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
                  props.class
                )
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarSubContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MenubarSubTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class", "inset");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarSubTrigger), mergeProps({
        "data-slot": "menubar-sub-trigger",
        "data-inset": __props.inset ? "" : void 0
      }, unref(forwardedProps), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto size-4" }, null, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(ChevronRight), { class: "ml-auto size-4" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarSubTrigger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MenubarTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = reactiveOmit(props, "class");
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(MenubarTrigger), mergeProps({ "data-slot": "menubar-trigger" }, unref(forwardedProps), {
        class: unref(cn)(
          "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
          props.class
        )
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/menubar/MenubarTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Badge = _sfc_main$g;
  const _component_NuxtLink = __nuxt_component_3;
  const _component_Icon = __nuxt_component_2;
  const _component_Card = _sfc_main$6$1;
  const _component_CardHeader = _sfc_main$1$1;
  const _component_CardTitle = _sfc_main$h;
  const _component_CardContent = _sfc_main$4$1;
  const _component_Menubar = _sfc_main$f;
  const _component_MenubarMenu = _sfc_main$9;
  const _component_MenubarTrigger = _sfc_main$1;
  const _component_MenubarContent = _sfc_main$d;
  const _component_MenubarItem = _sfc_main$b;
  const _component_MenubarShortcut = _sfc_main$5;
  const _component_MenubarSeparator = _sfc_main$6;
  const _component_MenubarSub = _sfc_main$4;
  const _component_MenubarSubTrigger = _sfc_main$2;
  const _component_MenubarSubContent = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Menubar </h2><p class="text-muted-foreground"> A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands. </p></div><div class="flex gap-2">`);
  _push(ssrRenderComponent(_component_Badge, {
    variant: "secondary",
    class: "rounded-full",
    "as-child": ""
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtLink, {
          to: "https://www.shadcn-vue.com/docs/components/menubar",
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
            to: "https://www.shadcn-vue.com/docs/components/menubar",
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
          to: "https://www.reka-ui.com/docs/components/menubar",
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
            to: "https://www.reka-ui.com/docs/components/menubar",
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
              _push3(ssrRenderComponent(_component_Menubar, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_MenubarMenu, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_MenubarTrigger, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`File`);
                              } else {
                                return [
                                  createTextVNode("File")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_MenubarContent, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` New Tab `);
                                      _push7(ssrRenderComponent(_component_MenubarShortcut, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`⌘T`);
                                          } else {
                                            return [
                                              createTextVNode("⌘T")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createTextVNode(" New Tab "),
                                        createVNode(_component_MenubarShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⌘T")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`New Window`);
                                    } else {
                                      return [
                                        createTextVNode("New Window")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarSeparator, null, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Share`);
                                    } else {
                                      return [
                                        createTextVNode("Share")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarSeparator, null, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Print`);
                                    } else {
                                      return [
                                        createTextVNode("Print")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" New Tab "),
                                      createVNode(_component_MenubarShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘T")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("New Window")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSeparator),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Share")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSeparator),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Print")
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
                            createVNode(_component_MenubarTrigger, null, {
                              default: withCtx(() => [
                                createTextVNode("File")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" New Tab "),
                                    createVNode(_component_MenubarShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⌘T")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("New Window")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarSeparator),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Share")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarSeparator),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Print")
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
                    _push4(ssrRenderComponent(_component_MenubarMenu, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_MenubarTrigger, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Edit`);
                              } else {
                                return [
                                  createTextVNode("Edit")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(_component_MenubarContent, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` Undo `);
                                      _push7(ssrRenderComponent(_component_MenubarShortcut, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`⌘Z`);
                                          } else {
                                            return [
                                              createTextVNode("⌘Z")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createTextVNode(" Undo "),
                                        createVNode(_component_MenubarShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⌘Z")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(` Redo `);
                                      _push7(ssrRenderComponent(_component_MenubarShortcut, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`⇧⌘Z`);
                                          } else {
                                            return [
                                              createTextVNode("⇧⌘Z")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createTextVNode(" Redo "),
                                        createVNode(_component_MenubarShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⇧⌘Z")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarSeparator, null, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarSub, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_MenubarSubTrigger, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`Find`);
                                          } else {
                                            return [
                                              createTextVNode("Find")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_MenubarSubContent, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_MenubarItem, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(`Search the web`);
                                                } else {
                                                  return [
                                                    createTextVNode("Search the web")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_MenubarSeparator, null, null, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_MenubarItem, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(`Find...`);
                                                } else {
                                                  return [
                                                    createTextVNode("Find...")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_MenubarItem, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(`Find Next`);
                                                } else {
                                                  return [
                                                    createTextVNode("Find Next")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                            _push8(ssrRenderComponent(_component_MenubarItem, null, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(`Find Previous`);
                                                } else {
                                                  return [
                                                    createTextVNode("Find Previous")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_MenubarItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Search the web")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_MenubarSeparator),
                                              createVNode(_component_MenubarItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Find...")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_MenubarItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Find Next")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_MenubarItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Find Previous")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_MenubarSubTrigger, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Find")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_MenubarSubContent, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_MenubarItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Search the web")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_MenubarSeparator),
                                            createVNode(_component_MenubarItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Find...")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_MenubarItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Find Next")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_MenubarItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Find Previous")
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarSeparator, null, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Cut`);
                                    } else {
                                      return [
                                        createTextVNode("Cut")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Copy`);
                                    } else {
                                      return [
                                        createTextVNode("Copy")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_MenubarItem, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Paste`);
                                    } else {
                                      return [
                                        createTextVNode("Paste")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Undo "),
                                      createVNode(_component_MenubarShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘Z")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Redo "),
                                      createVNode(_component_MenubarShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⇧⌘Z")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSeparator),
                                  createVNode(_component_MenubarSub, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_MenubarSubTrigger, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarSubContent, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_MenubarItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Search the web")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_MenubarSeparator),
                                          createVNode(_component_MenubarItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Find...")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_MenubarItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Find Next")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_MenubarItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Find Previous")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSeparator),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Cut")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Copy")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarItem, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Paste")
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
                            createVNode(_component_MenubarTrigger, null, {
                              default: withCtx(() => [
                                createTextVNode("Edit")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Undo "),
                                    createVNode(_component_MenubarShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⌘Z")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Redo "),
                                    createVNode(_component_MenubarShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⇧⌘Z")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarSeparator),
                                createVNode(_component_MenubarSub, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_MenubarSubTrigger, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Find")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_MenubarSubContent, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_MenubarItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Search the web")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_MenubarSeparator),
                                        createVNode(_component_MenubarItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Find...")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_MenubarItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Find Next")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_MenubarItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Find Previous")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarSeparator),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Cut")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Copy")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarItem, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Paste")
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
                      createVNode(_component_MenubarMenu, null, {
                        default: withCtx(() => [
                          createVNode(_component_MenubarTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("File")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_MenubarContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" New Tab "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⌘T")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("New Window")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Share")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Print")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_MenubarMenu, null, {
                        default: withCtx(() => [
                          createVNode(_component_MenubarTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_MenubarContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Undo "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⌘Z")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Redo "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⇧⌘Z")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarSub, null, {
                                default: withCtx(() => [
                                  createVNode(_component_MenubarSubTrigger, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Find")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSubContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Search the web")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarSeparator),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find...")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find Next")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find Previous")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Cut")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Copy")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Paste")
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
                  createVNode(_component_Menubar, null, {
                    default: withCtx(() => [
                      createVNode(_component_MenubarMenu, null, {
                        default: withCtx(() => [
                          createVNode(_component_MenubarTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("File")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_MenubarContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" New Tab "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⌘T")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("New Window")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Share")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Print")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_MenubarMenu, null, {
                        default: withCtx(() => [
                          createVNode(_component_MenubarTrigger, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_MenubarContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Undo "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⌘Z")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Redo "),
                                  createVNode(_component_MenubarShortcut, null, {
                                    default: withCtx(() => [
                                      createTextVNode("⇧⌘Z")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarSub, null, {
                                default: withCtx(() => [
                                  createVNode(_component_MenubarSubTrigger, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Find")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_MenubarSubContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Search the web")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarSeparator),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find...")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find Next")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_MenubarItem, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Find Previous")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarSeparator),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Cut")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Copy")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_MenubarItem, null, {
                                default: withCtx(() => [
                                  createTextVNode("Paste")
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
                createVNode(_component_Menubar, null, {
                  default: withCtx(() => [
                    createVNode(_component_MenubarMenu, null, {
                      default: withCtx(() => [
                        createVNode(_component_MenubarTrigger, null, {
                          default: withCtx(() => [
                            createTextVNode("File")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_MenubarContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode(" New Tab "),
                                createVNode(_component_MenubarShortcut, null, {
                                  default: withCtx(() => [
                                    createTextVNode("⌘T")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("New Window")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarSeparator),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("Share")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarSeparator),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("Print")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_MenubarMenu, null, {
                      default: withCtx(() => [
                        createVNode(_component_MenubarTrigger, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_MenubarContent, null, {
                          default: withCtx(() => [
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode(" Undo "),
                                createVNode(_component_MenubarShortcut, null, {
                                  default: withCtx(() => [
                                    createTextVNode("⌘Z")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode(" Redo "),
                                createVNode(_component_MenubarShortcut, null, {
                                  default: withCtx(() => [
                                    createTextVNode("⇧⌘Z")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarSeparator),
                            createVNode(_component_MenubarSub, null, {
                              default: withCtx(() => [
                                createVNode(_component_MenubarSubTrigger, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Find")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_MenubarSubContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_MenubarItem, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Search the web")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_MenubarSeparator),
                                    createVNode(_component_MenubarItem, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Find...")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_MenubarItem, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Find Next")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_MenubarItem, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Find Previous")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarSeparator),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("Cut")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("Copy")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_MenubarItem, null, {
                              default: withCtx(() => [
                                createTextVNode("Paste")
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
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/menubar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const menubar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { menubar as default };
//# sourceMappingURL=menubar-I59fM2lx.mjs.map
