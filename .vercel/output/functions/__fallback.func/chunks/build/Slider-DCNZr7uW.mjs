import { defineComponent, unref, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { useForwardPropsEmits, SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui';
import { m as reactiveOmit, e as cn } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Slider",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    disabled: { type: Boolean },
    orientation: {},
    dir: {},
    inverted: { type: Boolean },
    min: {},
    max: {},
    step: {},
    minStepsBetweenThumbs: {},
    thumbAlignment: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue", "valueCommit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = reactiveOmit(props, "class");
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SliderRoot), mergeProps({
        "data-slot": "slider",
        class: unref(cn)(
          "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          props.class
        )
      }, unref(forwarded), _attrs), {
        default: withCtx(({ modelValue }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SliderTrack), {
              "data-slot": "slider-track",
              class: "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SliderRange), {
                    "data-slot": "slider-range",
                    class: "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SliderRange), {
                      "data-slot": "slider-range",
                      class: "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(modelValue, (_, key) => {
              _push2(ssrRenderComponent(unref(SliderThumb), {
                key,
                "data-slot": "slider-thumb",
                class: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(unref(SliderTrack), {
                "data-slot": "slider-track",
                class: "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
              }, {
                default: withCtx(() => [
                  createVNode(unref(SliderRange), {
                    "data-slot": "slider-range",
                    class: "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                  })
                ]),
                _: 1
              }),
              (openBlock(true), createBlock(Fragment, null, renderList(modelValue, (_, key) => {
                return openBlock(), createBlock(unref(SliderThumb), {
                  key,
                  "data-slot": "slider-thumb",
                  class: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                });
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/slider/Slider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Slider-DCNZr7uW.mjs.map
