import { _ as _sfc_main$5, a as _sfc_main$9, b as _sfc_main$4, c as _sfc_main$7 } from './index-C0kHiKSh.mjs';
import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$1$1 } from './PinInputSlot-CkmOS29O.mjs';
import { _ as _sfc_main$2$1 } from './server.mjs';
import { mergeProps, withCtx, createTextVNode, createBlock, openBlock, Fragment, renderList, createVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_FieldGroup = _sfc_main$5;
  const _component_Field = _sfc_main$9;
  const _component_FieldLabel = _sfc_main$4;
  const _component_PinInput = _sfc_main$3;
  const _component_PinInputGroup = _sfc_main$2;
  const _component_PinInputSlot = _sfc_main$1;
  const _component_PinInputSeparator = _sfc_main$1$1;
  const _component_FieldDescription = _sfc_main$7;
  const _component_Button = _sfc_main$2$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-6" }, _attrs))}><form>`);
  _push(ssrRenderComponent(_component_FieldGroup, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col items-center gap-1 text-center"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}> Enter verification code </h1><p class="text-muted-foreground text-sm text-balance"${_scopeId}> We sent a 6-digit code to your email. </p></div>`);
        _push2(ssrRenderComponent(_component_Field, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_FieldLabel, {
                "html-for": "otp",
                class: "sr-only"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Verification code `);
                  } else {
                    return [
                      createTextVNode(" Verification code ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_PinInput, {
                id: "otp",
                class: "justify-center"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_PinInputGroup, { class: "gap-1 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<!--[-->`);
                          ssrRenderList(6, (id, index) => {
                            _push5(`<!--[-->`);
                            _push5(ssrRenderComponent(_component_PinInputSlot, { index }, null, _parent5, _scopeId4));
                            if (index !== 5) {
                              _push5(ssrRenderComponent(_component_PinInputSeparator, null, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`<!--]-->`);
                          });
                          _push5(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                              return openBlock(), createBlock(Fragment, { key: id }, [
                                createVNode(_component_PinInputSlot, { index }, null, 8, ["index"]),
                                index !== 5 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                              ], 64);
                            }), 64))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_PinInputGroup, { class: "gap-1 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                            return openBlock(), createBlock(Fragment, { key: id }, [
                              createVNode(_component_PinInputSlot, { index }, null, 8, ["index"]),
                              index !== 5 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
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
              _push3(ssrRenderComponent(_component_FieldDescription, { class: "text-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Enter the 6-digit code sent to your email. `);
                  } else {
                    return [
                      createTextVNode(" Enter the 6-digit code sent to your email. ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
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
                  class: "justify-center"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_PinInputGroup, { class: "gap-1 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                          return openBlock(), createBlock(Fragment, { key: id }, [
                            createVNode(_component_PinInputSlot, { index }, null, 8, ["index"]),
                            index !== 5 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                          ], 64);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
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
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Button, { type: "submit" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Verify `);
            } else {
              return [
                createTextVNode(" Verify ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_FieldDescription, { class: "text-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Didn&#39;t receive the code? <a href="#"${_scopeId2}>Resend</a>`);
            } else {
              return [
                createTextVNode(" Didn't receive the code? "),
                createVNode("a", { href: "#" }, "Resend")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-center gap-1 text-center" }, [
            createVNode("h1", { class: "text-2xl font-bold" }, " Enter verification code "),
            createVNode("p", { class: "text-muted-foreground text-sm text-balance" }, " We sent a 6-digit code to your email. ")
          ]),
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
                class: "justify-center"
              }, {
                default: withCtx(() => [
                  createVNode(_component_PinInputGroup, { class: "gap-1 *:data-[slot=pin-input-slot]:rounded-md *:data-[slot=pin-input-slot]:border" }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (id, index) => {
                        return openBlock(), createBlock(Fragment, { key: id }, [
                          createVNode(_component_PinInputSlot, { index }, null, 8, ["index"]),
                          index !== 5 ? (openBlock(), createBlock(_component_PinInputSeparator, { key: 0 })) : createCommentVNode("", true)
                        ], 64);
                      }), 64))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_FieldDescription, { class: "text-center" }, {
                default: withCtx(() => [
                  createTextVNode(" Enter the 6-digit code sent to your email. ")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
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
  }, _parent));
  _push(`</form></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/OTPForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "AuthOTPForm" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=OTPForm-EY9krzu2.mjs.map
