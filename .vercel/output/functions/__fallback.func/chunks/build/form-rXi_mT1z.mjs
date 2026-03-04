import { _ as _sfc_main$6 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, e as cn } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$7, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { defineComponent, h, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, provide, renderSlot, toValue, inject, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useId, Slot } from 'reka-ui';
import { useForm, Field, ErrorMessage, FieldContextKey } from 'vee-validate';
import { _ as _sfc_main$e } from './Label-jo0RdEYb.mjs';
import { _ as _sfc_main$8 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$a, a as _sfc_main$1$2, b as _sfc_main$9, c as _sfc_main$9$1, e as _sfc_main$8$1, d as _sfc_main$7$1 } from './SelectValue-PiGLy7fU.mjs';
import { _ as _sfc_main$b } from './Checkbox-DMj6RxcO.mjs';
import { _ as _sfc_main$1$3, a as _sfc_main$c } from './RadioGroupItem-B8jnVbDg.mjs';
import { _ as _sfc_main$d } from './Slider-DCNZr7uW.mjs';
import { toTypedSchema } from '@vee-validate/zod';
import { toast } from 'vue-sonner';
import * as z from 'zod';
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
import 'clsx';
import 'tailwind-merge';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'lucide-vue-next';

const FORM_ITEM_INJECTION_KEY = Symbol("FORM_ITEM_INJECTION_KEY");
function useFormField() {
  const fieldContext = inject(FieldContextKey);
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);
  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");
  const { name, errorMessage: error, meta } = fieldContext;
  const id = fieldItemContext;
  const fieldState = {
    valid: computed(() => meta.valid),
    isDirty: computed(() => meta.dirty),
    isTouched: computed(() => meta.touched),
    error
  };
  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FormControl",
  __ssrInlineRender: true,
  setup(__props) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Slot), mergeProps({
        id: unref(formItemId),
        "data-slot": "form-control",
        "aria-describedby": !unref(error) ? `${unref(formDescriptionId)}` : `${unref(formDescriptionId)} ${unref(formMessageId)}`,
        "aria-invalid": !!unref(error)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormControl.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FormDescription",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { formDescriptionId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        id: unref(formDescriptionId),
        "data-slot": "form-description",
        class: unref(cn)("text-muted-foreground text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormDescription.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FormItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const id = useId();
    provide(FORM_ITEM_INJECTION_KEY, id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "form-item",
        class: unref(cn)("grid gap-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormItem.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FormLabel",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { error, formItemId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$e), mergeProps({
        "data-slot": "form-label",
        "data-error": !!unref(error),
        class: unref(cn)(
          "data-[error=true]:text-destructive",
          props.class
        ),
        for: unref(formItemId)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormLabel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FormMessage",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { name, formMessageId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorMessage), mergeProps({
        id: unref(formMessageId),
        "data-slot": "form-message",
        as: "p",
        name: toValue(unref(name)),
        class: unref(cn)("text-destructive text-sm", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormMessage.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  setup(__props) {
    const formSchema = toTypedSchema(z.object({
      username: z.string().min(2).max(50),
      email: z.string({ required_error: "Please select an email to display." }).email(),
      mobile: z.boolean(),
      type: z.enum(["all", "mentions", "none"], {
        required_error: "You need to select a notification type."
      }),
      duration: z.array(z.number().min(0).max(60))
    }));
    const { isFieldDirty, handleSubmit } = useForm({
      validationSchema: formSchema,
      initialValues: {
        duration: [30]
      }
    });
    const onSubmit = handleSubmit((values) => {
      toast("You submitted the following values:", {
        description: h("pre", { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" }, h("code", { class: "text-white" }, JSON.stringify(values, null, 2)))
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$6;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6$1;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$7;
      const _component_CardContent = _sfc_main$4$1;
      const _component_FormField = Field;
      const _component_FormItem = _sfc_main$3;
      const _component_FormLabel = _sfc_main$2;
      const _component_FormControl = _sfc_main$5;
      const _component_Input = _sfc_main$8;
      const _component_FormDescription = _sfc_main$4;
      const _component_FormMessage = _sfc_main$1;
      const _component_Select = _sfc_main$a;
      const _component_SelectTrigger = _sfc_main$1$2;
      const _component_SelectValue = _sfc_main$9;
      const _component_SelectContent = _sfc_main$9$1;
      const _component_SelectGroup = _sfc_main$8$1;
      const _component_SelectItem = _sfc_main$7$1;
      const _component_Checkbox = _sfc_main$b;
      const _component_RadioGroup = _sfc_main$1$3;
      const _component_RadioGroupItem = _sfc_main$c;
      const _component_Slider = _sfc_main$d;
      const _component_Button = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Form </h2><p class="text-muted-foreground"> Building forms with VeeValidate and Zod. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/form",
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
                to: "https://www.shadcn-vue.com/docs/components/form",
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
              to: "https://vee-validate.logaretm.com/v4/guide/overview/",
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
                to: "https://vee-validate.logaretm.com/v4/guide/overview/",
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
                  _push3(`<div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px"${_scopeId2}><form class="w-full md:w-2/3 space-y-6"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FormField, {
                    name: "username",
                    "validate-on-blur": !unref(isFieldDirty)
                  }, {
                    default: withCtx(({ componentField }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_FormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FormLabel, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Username`);
                                  } else {
                                    return [
                                      createTextVNode("Username")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormControl, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Input, mergeProps({
                                      type: "text",
                                      placeholder: "shadcn"
                                    }, componentField), null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Input, mergeProps({
                                        type: "text",
                                        placeholder: "shadcn"
                                      }, componentField), null, 16)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormDescription, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` This is your public display name. `);
                                  } else {
                                    return [
                                      createTextVNode(" This is your public display name. ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormMessage, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Username")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Input, mergeProps({
                                      type: "text",
                                      placeholder: "shadcn"
                                    }, componentField), null, 16)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" This is your public display name. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Username")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Input, mergeProps({
                                    type: "text",
                                    placeholder: "shadcn"
                                  }, componentField), null, 16)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" This is your public display name. ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormField, { name: "email" }, {
                    default: withCtx(({ componentField }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_FormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FormLabel, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Email`);
                                  } else {
                                    return [
                                      createTextVNode("Email")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_Select, componentField, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_FormControl, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_SelectTrigger, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_SelectValue, { placeholder: "Select a verified email to display" }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_SelectTrigger, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_SelectContent, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_SelectGroup, null, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_SelectItem, { value: "m@example.com" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` m@example.com `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" m@example.com ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_SelectItem, { value: "m@google.com" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` m@google.com `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" m@google.com ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_SelectItem, { value: "m@support.com" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` m@support.com `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" m@support.com ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" m@example.com ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" m@google.com ")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" m@support.com ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_SelectGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" m@example.com ")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" m@google.com ")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" m@support.com ")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_FormControl, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectTrigger, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_SelectContent, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" m@example.com ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" m@google.com ")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" m@support.com ")
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
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormDescription, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` You can manage email addresses in your <a href="/examples/forms"${_scopeId5}>email settings</a>. `);
                                  } else {
                                    return [
                                      createTextVNode(" You can manage email addresses in your "),
                                      createVNode("a", { href: "/examples/forms" }, "email settings"),
                                      createTextVNode(". ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormMessage, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Select, componentField, {
                                  default: withCtx(() => [
                                    createVNode(_component_FormControl, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectTrigger, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectContent, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@example.com ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@google.com ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@support.com ")
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
                                }, 16),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" You can manage email addresses in your "),
                                    createVNode("a", { href: "/examples/forms" }, "email settings"),
                                    createTextVNode(". ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Select, componentField, {
                                default: withCtx(() => [
                                  createVNode(_component_FormControl, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectTrigger, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SelectContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@example.com ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@google.com ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@support.com ")
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
                              }, 16),
                              createVNode(_component_FormDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" You can manage email addresses in your "),
                                  createVNode("a", { href: "/examples/forms" }, "email settings"),
                                  createTextVNode(". ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormField, {
                    type: "checkbox",
                    name: "mobile"
                  }, {
                    default: withCtx(({ value, handleChange }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_FormItem, { class: "flex flex-row items-start gap-x-3 border rounded-md p-4 shadow space-y-0" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FormControl, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Checkbox, {
                                      checked: value,
                                      "onUpdate:checked": handleChange
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Checkbox, {
                                        checked: value,
                                        "onUpdate:checked": handleChange
                                      }, null, 8, ["checked", "onUpdate:checked"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div class="leading-none space-y-1"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_FormLabel, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Use different settings for my mobile devices`);
                                  } else {
                                    return [
                                      createTextVNode("Use different settings for my mobile devices")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormDescription, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` You can manage your mobile notifications in the <a href="/examples/forms"${_scopeId5}>mobile settings</a> page. `);
                                  } else {
                                    return [
                                      createTextVNode(" You can manage your mobile notifications in the "),
                                      createVNode("a", { href: "/examples/forms" }, "mobile settings"),
                                      createTextVNode(" page. ")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormMessage, null, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Checkbox, {
                                      checked: value,
                                      "onUpdate:checked": handleChange
                                    }, null, 8, ["checked", "onUpdate:checked"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "leading-none space-y-1" }, [
                                  createVNode(_component_FormLabel, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Use different settings for my mobile devices")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_FormDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" You can manage your mobile notifications in the "),
                                      createVNode("a", { href: "/examples/forms" }, "mobile settings"),
                                      createTextVNode(" page. ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_FormMessage)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_FormItem, { class: "flex flex-row items-start gap-x-3 border rounded-md p-4 shadow space-y-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Checkbox, {
                                    checked: value,
                                    "onUpdate:checked": handleChange
                                  }, null, 8, ["checked", "onUpdate:checked"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", { class: "leading-none space-y-1" }, [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Use different settings for my mobile devices")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" You can manage your mobile notifications in the "),
                                    createVNode("a", { href: "/examples/forms" }, "mobile settings"),
                                    createTextVNode(" page. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormField, {
                    type: "radio",
                    name: "type"
                  }, {
                    default: withCtx(({ componentField }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_FormItem, { class: "space-y-3" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FormLabel, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Notify me about...`);
                                  } else {
                                    return [
                                      createTextVNode("Notify me about...")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormControl, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_FormControl, null, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_RadioGroupItem, { value: "all" }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_RadioGroupItem, { value: "all" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` All new messages `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" All new messages ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_FormControl, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_RadioGroupItem, { value: "all" })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" All new messages ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_FormControl, null, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_RadioGroupItem, { value: "mentions" }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_RadioGroupItem, { value: "mentions" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Direct messages and mentions `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Direct messages and mentions ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_FormControl, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_RadioGroupItem, { value: "mentions" })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Direct messages and mentions ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_FormControl, null, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(_component_RadioGroupItem, { value: "none" }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(_component_RadioGroupItem, { value: "none" })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Nothing `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Nothing ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_FormControl, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_RadioGroupItem, { value: "none" })
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Nothing ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_FormControl, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_RadioGroupItem, { value: "all" })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" All new messages ")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_FormControl, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_RadioGroupItem, { value: "mentions" })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Direct messages and mentions ")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_FormControl, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_RadioGroupItem, { value: "none" })
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Nothing ")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                        default: withCtx(() => [
                                          createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_FormControl, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_RadioGroupItem, { value: "all" })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" All new messages ")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_FormControl, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_RadioGroupItem, { value: "mentions" })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Direct messages and mentions ")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_FormControl, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_RadioGroupItem, { value: "none" })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_FormLabel, { class: "font-normal" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Nothing ")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }, 16)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormMessage, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Notify me about...")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                      default: withCtx(() => [
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "all" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" All new messages ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "mentions" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Direct messages and mentions ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "none" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Nothing ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 16)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormMessage)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_FormItem, { class: "space-y-3" }, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Notify me about...")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                    default: withCtx(() => [
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "all" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" All new messages ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "mentions" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Direct messages and mentions ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "none" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Nothing ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 16)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormField, { name: "duration" }, {
                    default: withCtx(({ componentField, value }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_FormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_FormLabel, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Duration`);
                                  } else {
                                    return [
                                      createTextVNode("Duration")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormControl, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_Slider, mergeProps(componentField, {
                                      "default-value": [30],
                                      max: 100,
                                      min: 0,
                                      step: 5
                                    }), null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_FormDescription, { class: "flex justify-between" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span${_scopeId6}>How many minutes are you available?</span><span${_scopeId6}>${ssrInterpolate(value?.[0])} min</span>`);
                                        } else {
                                          return [
                                            createVNode("span", null, "How many minutes are you available?"),
                                            createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_Slider, mergeProps(componentField, {
                                        "default-value": [30],
                                        max: 100,
                                        min: 0,
                                        step: 5
                                      }), null, 16),
                                      createVNode(_component_FormDescription, { class: "flex justify-between" }, {
                                        default: withCtx(() => [
                                          createVNode("span", null, "How many minutes are you available?"),
                                          createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_FormMessage, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Duration")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Slider, mergeProps(componentField, {
                                      "default-value": [30],
                                      max: 100,
                                      min: 0,
                                      step: 5
                                    }), null, 16),
                                    createVNode(_component_FormDescription, { class: "flex justify-between" }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, "How many minutes are you available?"),
                                        createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormMessage)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Duration")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Slider, mergeProps(componentField, {
                                    "default-value": [30],
                                    max: 100,
                                    min: 0,
                                    step: 5
                                  }), null, 16),
                                  createVNode(_component_FormDescription, { class: "flex justify-between" }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, "How many minutes are you available?"),
                                      createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Button, { type: "submit" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Submit `);
                      } else {
                        return [
                          createTextVNode(" Submit ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form></div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode("form", {
                        class: "w-full md:w-2/3 space-y-6",
                        onSubmit: unref(onSubmit)
                      }, [
                        createVNode(_component_FormField, {
                          name: "username",
                          "validate-on-blur": !unref(isFieldDirty)
                        }, {
                          default: withCtx(({ componentField }) => [
                            createVNode(_component_FormItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Username")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Input, mergeProps({
                                      type: "text",
                                      placeholder: "shadcn"
                                    }, componentField), null, 16)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" This is your public display name. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }, 8, ["validate-on-blur"]),
                        createVNode(_component_FormField, { name: "email" }, {
                          default: withCtx(({ componentField }) => [
                            createVNode(_component_FormItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_Select, componentField, {
                                  default: withCtx(() => [
                                    createVNode(_component_FormControl, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectTrigger, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_SelectContent, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_SelectGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@example.com ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@google.com ")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" m@support.com ")
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
                                }, 16),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" You can manage email addresses in your "),
                                    createVNode("a", { href: "/examples/forms" }, "email settings"),
                                    createTextVNode(". ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_FormField, {
                          type: "checkbox",
                          name: "mobile"
                        }, {
                          default: withCtx(({ value, handleChange }) => [
                            createVNode(_component_FormItem, { class: "flex flex-row items-start gap-x-3 border rounded-md p-4 shadow space-y-0" }, {
                              default: withCtx(() => [
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Checkbox, {
                                      checked: value,
                                      "onUpdate:checked": handleChange
                                    }, null, 8, ["checked", "onUpdate:checked"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", { class: "leading-none space-y-1" }, [
                                  createVNode(_component_FormLabel, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Use different settings for my mobile devices")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_FormDescription, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" You can manage your mobile notifications in the "),
                                      createVNode("a", { href: "/examples/forms" }, "mobile settings"),
                                      createTextVNode(" page. ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_FormMessage)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_FormField, {
                          type: "radio",
                          name: "type"
                        }, {
                          default: withCtx(({ componentField }) => [
                            createVNode(_component_FormItem, { class: "space-y-3" }, {
                              default: withCtx(() => [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Notify me about...")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                      default: withCtx(() => [
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "all" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" All new messages ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "mentions" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Direct messages and mentions ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_FormControl, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_RadioGroupItem, { value: "none" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_FormLabel, { class: "font-normal" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Nothing ")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }, 16)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormMessage)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_FormField, { name: "duration" }, {
                          default: withCtx(({ componentField, value }) => [
                            createVNode(_component_FormItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Duration")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormControl, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_Slider, mergeProps(componentField, {
                                      "default-value": [30],
                                      max: 100,
                                      min: 0,
                                      step: 5
                                    }), null, 16),
                                    createVNode(_component_FormDescription, { class: "flex justify-between" }, {
                                      default: withCtx(() => [
                                        createVNode("span", null, "How many minutes are you available?"),
                                        createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_FormMessage)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Button, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit ")
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])
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
                    createVNode("form", {
                      class: "w-full md:w-2/3 space-y-6",
                      onSubmit: unref(onSubmit)
                    }, [
                      createVNode(_component_FormField, {
                        name: "username",
                        "validate-on-blur": !unref(isFieldDirty)
                      }, {
                        default: withCtx(({ componentField }) => [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Username")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Input, mergeProps({
                                    type: "text",
                                    placeholder: "shadcn"
                                  }, componentField), null, 16)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" This is your public display name. ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }, 8, ["validate-on-blur"]),
                      createVNode(_component_FormField, { name: "email" }, {
                        default: withCtx(({ componentField }) => [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_Select, componentField, {
                                default: withCtx(() => [
                                  createVNode(_component_FormControl, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectTrigger, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectValue, { placeholder: "Select a verified email to display" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_SelectContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_SelectGroup, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_SelectItem, { value: "m@example.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@example.com ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "m@google.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@google.com ")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_SelectItem, { value: "m@support.com" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" m@support.com ")
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
                              }, 16),
                              createVNode(_component_FormDescription, null, {
                                default: withCtx(() => [
                                  createTextVNode(" You can manage email addresses in your "),
                                  createVNode("a", { href: "/examples/forms" }, "email settings"),
                                  createTextVNode(". ")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormField, {
                        type: "checkbox",
                        name: "mobile"
                      }, {
                        default: withCtx(({ value, handleChange }) => [
                          createVNode(_component_FormItem, { class: "flex flex-row items-start gap-x-3 border rounded-md p-4 shadow space-y-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Checkbox, {
                                    checked: value,
                                    "onUpdate:checked": handleChange
                                  }, null, 8, ["checked", "onUpdate:checked"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", { class: "leading-none space-y-1" }, [
                                createVNode(_component_FormLabel, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Use different settings for my mobile devices")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormDescription, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" You can manage your mobile notifications in the "),
                                    createVNode("a", { href: "/examples/forms" }, "mobile settings"),
                                    createTextVNode(" page. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_FormMessage)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormField, {
                        type: "radio",
                        name: "type"
                      }, {
                        default: withCtx(({ componentField }) => [
                          createVNode(_component_FormItem, { class: "space-y-3" }, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Notify me about...")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_RadioGroup, mergeProps({ class: "flex flex-col space-y-1" }, componentField), {
                                    default: withCtx(() => [
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "all" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" All new messages ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "mentions" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Direct messages and mentions ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_FormItem, { class: "flex items-center gap-x-3 space-y-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_FormControl, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_RadioGroupItem, { value: "none" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_FormLabel, { class: "font-normal" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Nothing ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 16)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_FormField, { name: "duration" }, {
                        default: withCtx(({ componentField, value }) => [
                          createVNode(_component_FormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_FormLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Duration")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_FormControl, null, {
                                default: withCtx(() => [
                                  createVNode(_component_Slider, mergeProps(componentField, {
                                    "default-value": [30],
                                    max: 100,
                                    min: 0,
                                    step: 5
                                  }), null, 16),
                                  createVNode(_component_FormDescription, { class: "flex justify-between" }, {
                                    default: withCtx(() => [
                                      createVNode("span", null, "How many minutes are you available?"),
                                      createVNode("span", null, toDisplayString(value?.[0]) + " min", 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_FormMessage)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Button, { type: "submit" }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-rXi_mT1z.mjs.map
