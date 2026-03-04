import { _ as _sfc_main$1 } from './Input-DUkj5gv1.mjs';
import { e as cn, _ as _sfc_main$2, a as __nuxt_component_2 } from './server.mjs';
import { defineComponent, useModel, ref, mergeProps, unref, isRef, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PasswordInput",
  __ssrInlineRender: true,
  props: {
    class: {},
    disabled: { type: Boolean },
    componentField: {},
    autocomplete: {},
    modelValue: {},
    placeholder: {}
  },
  setup(__props) {
    const props = __props;
    const showModal = useModel(props, "modelValue");
    const showPassword = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Input = _sfc_main$1;
      const _component_Button = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Input, mergeProps({
        modelValue: unref(showModal),
        "onUpdate:modelValue": ($event) => isRef(showModal) ? showModal.value = $event : null,
        type: unref(showPassword) ? "text" : "password",
        class: unref(cn)("pr-10", props?.class),
        placeholder: props?.placeholder ? props.placeholder : "Enter your password",
        disabled: props?.disabled,
        autocomplete: props?.autocomplete
      }, props?.componentField), null, _parent));
      _push(ssrRenderComponent(_component_Button, {
        type: "button",
        variant: "ghost",
        size: "icon",
        class: "absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent",
        disabled: props?.disabled,
        onClick: ($event) => showPassword.value = !unref(showPassword)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(showPassword)) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-eye",
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-lucide-eye-off",
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(`<span class="sr-only"${_scopeId}>${ssrInterpolate(unref(showPassword) ? "Show password" : "Hide password")}</span>`);
          } else {
            return [
              unref(showPassword) ? (openBlock(), createBlock(_component_Icon, {
                key: 0,
                name: "i-lucide-eye",
                class: "size-4",
                "aria-hidden": "true"
              })) : (openBlock(), createBlock(_component_Icon, {
                key: 1,
                name: "i-lucide-eye-off",
                class: "size-4",
                "aria-hidden": "true"
              })),
              createVNode("span", { class: "sr-only" }, toDisplayString(unref(showPassword) ? "Show password" : "Hide password"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PasswordInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PasswordInput = Object.assign(_sfc_main, { __name: "PasswordInput" });

export { PasswordInput as P };
//# sourceMappingURL=PasswordInput-B7767qqZ.mjs.map
