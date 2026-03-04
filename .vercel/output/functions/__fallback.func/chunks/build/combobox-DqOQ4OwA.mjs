import { _ as _sfc_main$1 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, e as cn } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$3, a as _sfc_main$5, b as _sfc_main$1$2 } from './PopoverTrigger-DHETyzxd.mjs';
import { _ as _sfc_main$8, a as _sfc_main$4$1, c as _sfc_main$6$1, b as _sfc_main$2$2, d as _sfc_main$5$1, e as _sfc_main$3$1 } from './index-Kgt191xM.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, isRef, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'class-variance-authority';
import 'reka-ui';
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
import './DialogTrigger-CSypdrx5.mjs';
import 'lucide-vue-next';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "combobox",
  __ssrInlineRender: true,
  setup(__props) {
    const frameworks = [
      { value: "next.js", label: "Next.js" },
      { value: "sveltekit", label: "SvelteKit" },
      { value: "nuxt.js", label: "Nuxt.js" },
      { value: "remix", label: "Remix" },
      { value: "astro", label: "Astro" }
    ];
    const open = ref(false);
    const value = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$2;
      const _component_CardContent = _sfc_main$4;
      const _component_Popover = _sfc_main$3;
      const _component_PopoverTrigger = _sfc_main$5;
      const _component_Button = _sfc_main$2$1;
      const _component_PopoverContent = _sfc_main$1$2;
      const _component_Command = _sfc_main$8;
      const _component_CommandInput = _sfc_main$4$1;
      const _component_CommandEmpty = _sfc_main$6$1;
      const _component_CommandList = _sfc_main$2$2;
      const _component_CommandGroup = _sfc_main$5$1;
      const _component_CommandItem = _sfc_main$3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Combobox </h2><p class="text-muted-foreground"> Autocomplete input and command palette with a list of suggestions. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/combobox",
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
                to: "https://www.shadcn-vue.com/docs/components/combobox",
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
              to: "https://www.reka-ui.com/docs/components/combobox",
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
                to: "https://www.reka-ui.com/docs/components/combobox",
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
                  _push3(ssrRenderComponent(_component_Popover, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_PopoverTrigger, { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Button, {
                                variant: "outline",
                                role: "combobox",
                                "aria-expanded": unref(open),
                                class: "w-[200px] justify-between"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...")} `);
                                    _push6(ssrRenderComponent(_component_Icon, {
                                      name: "radix-icons:caret-sort",
                                      class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...") + " ", 1),
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:caret-sort",
                                        class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Button, {
                                  variant: "outline",
                                  role: "combobox",
                                  "aria-expanded": unref(open),
                                  class: "w-[200px] justify-between"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...") + " ", 1),
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:caret-sort",
                                      class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["aria-expanded"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_PopoverContent, { class: "w-[200px] p-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_Command, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CommandInput, {
                                      class: "h-9",
                                      placeholder: "Search framework..."
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandEmpty, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`No framework found.`);
                                        } else {
                                          return [
                                            createTextVNode("No framework found.")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandList, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_CommandGroup, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<!--[-->`);
                                                ssrRenderList(frameworks, (framework) => {
                                                  _push8(ssrRenderComponent(_component_CommandItem, {
                                                    key: framework.value,
                                                    value: framework.value,
                                                    onSelect: (ev) => {
                                                      if (typeof ev.detail.value === "string") {
                                                        value.value = ev.detail.value;
                                                      }
                                                      open.value = false;
                                                    }
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(framework.label)} `);
                                                        _push9(ssrRenderComponent(_component_Icon, {
                                                          name: "radix-icons:check",
                                                          class: unref(cn)(
                                                            "ml-auto h-4 w-4",
                                                            unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                          createVNode(_component_Icon, {
                                                            name: "radix-icons:check",
                                                            class: unref(cn)(
                                                              "ml-auto h-4 w-4",
                                                              unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                            )
                                                          }, null, 8, ["class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                });
                                                _push8(`<!--]-->`);
                                              } else {
                                                return [
                                                  (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                                    return createVNode(_component_CommandItem, {
                                                      key: framework.value,
                                                      value: framework.value,
                                                      onSelect: (ev) => {
                                                        if (typeof ev.detail.value === "string") {
                                                          value.value = ev.detail.value;
                                                        }
                                                        open.value = false;
                                                      }
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                        createVNode(_component_Icon, {
                                                          name: "radix-icons:check",
                                                          class: unref(cn)(
                                                            "ml-auto h-4 w-4",
                                                            unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                          )
                                                        }, null, 8, ["class"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["value", "onSelect"]);
                                                  }), 64))
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_CommandGroup, null, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                                  return createVNode(_component_CommandItem, {
                                                    key: framework.value,
                                                    value: framework.value,
                                                    onSelect: (ev) => {
                                                      if (typeof ev.detail.value === "string") {
                                                        value.value = ev.detail.value;
                                                      }
                                                      open.value = false;
                                                    }
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                      createVNode(_component_Icon, {
                                                        name: "radix-icons:check",
                                                        class: unref(cn)(
                                                          "ml-auto h-4 w-4",
                                                          unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                        )
                                                      }, null, 8, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["value", "onSelect"]);
                                                }), 64))
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CommandInput, {
                                        class: "h-9",
                                        placeholder: "Search framework..."
                                      }),
                                      createVNode(_component_CommandEmpty, null, {
                                        default: withCtx(() => [
                                          createTextVNode("No framework found.")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandList, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_CommandGroup, null, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                                return createVNode(_component_CommandItem, {
                                                  key: framework.value,
                                                  value: framework.value,
                                                  onSelect: (ev) => {
                                                    if (typeof ev.detail.value === "string") {
                                                      value.value = ev.detail.value;
                                                    }
                                                    open.value = false;
                                                  }
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                    createVNode(_component_Icon, {
                                                      name: "radix-icons:check",
                                                      class: unref(cn)(
                                                        "ml-auto h-4 w-4",
                                                        unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                      )
                                                    }, null, 8, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["value", "onSelect"]);
                                              }), 64))
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_Command, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandInput, {
                                      class: "h-9",
                                      placeholder: "Search framework..."
                                    }),
                                    createVNode(_component_CommandEmpty, null, {
                                      default: withCtx(() => [
                                        createTextVNode("No framework found.")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandList, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_CommandGroup, null, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                              return createVNode(_component_CommandItem, {
                                                key: framework.value,
                                                value: framework.value,
                                                onSelect: (ev) => {
                                                  if (typeof ev.detail.value === "string") {
                                                    value.value = ev.detail.value;
                                                  }
                                                  open.value = false;
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                  createVNode(_component_Icon, {
                                                    name: "radix-icons:check",
                                                    class: unref(cn)(
                                                      "ml-auto h-4 w-4",
                                                      unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                    )
                                                  }, null, 8, ["class"])
                                                ]),
                                                _: 2
                                              }, 1032, ["value", "onSelect"]);
                                            }), 64))
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                role: "combobox",
                                "aria-expanded": unref(open),
                                class: "w-[200px] justify-between"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...") + " ", 1),
                                  createVNode(_component_Icon, {
                                    name: "radix-icons:caret-sort",
                                    class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                  })
                                ]),
                                _: 1
                              }, 8, ["aria-expanded"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_PopoverContent, { class: "w-[200px] p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_Command, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandInput, {
                                    class: "h-9",
                                    placeholder: "Search framework..."
                                  }),
                                  createVNode(_component_CommandEmpty, null, {
                                    default: withCtx(() => [
                                      createTextVNode("No framework found.")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandList, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CommandGroup, null, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                            return createVNode(_component_CommandItem, {
                                              key: framework.value,
                                              value: framework.value,
                                              onSelect: (ev) => {
                                                if (typeof ev.detail.value === "string") {
                                                  value.value = ev.detail.value;
                                                }
                                                open.value = false;
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                createVNode(_component_Icon, {
                                                  name: "radix-icons:check",
                                                  class: unref(cn)(
                                                    "ml-auto h-4 w-4",
                                                    unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "onSelect"]);
                                          }), 64))
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
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode(_component_Popover, {
                        open: unref(open),
                        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(_component_Button, {
                                variant: "outline",
                                role: "combobox",
                                "aria-expanded": unref(open),
                                class: "w-[200px] justify-between"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...") + " ", 1),
                                  createVNode(_component_Icon, {
                                    name: "radix-icons:caret-sort",
                                    class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                  })
                                ]),
                                _: 1
                              }, 8, ["aria-expanded"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_PopoverContent, { class: "w-[200px] p-0" }, {
                            default: withCtx(() => [
                              createVNode(_component_Command, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandInput, {
                                    class: "h-9",
                                    placeholder: "Search framework..."
                                  }),
                                  createVNode(_component_CommandEmpty, null, {
                                    default: withCtx(() => [
                                      createTextVNode("No framework found.")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandList, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CommandGroup, null, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                            return createVNode(_component_CommandItem, {
                                              key: framework.value,
                                              value: framework.value,
                                              onSelect: (ev) => {
                                                if (typeof ev.detail.value === "string") {
                                                  value.value = ev.detail.value;
                                                }
                                                open.value = false;
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(framework.label) + " ", 1),
                                                createVNode(_component_Icon, {
                                                  name: "radix-icons:check",
                                                  class: unref(cn)(
                                                    "ml-auto h-4 w-4",
                                                    unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                  )
                                                }, null, 8, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["value", "onSelect"]);
                                          }), 64))
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
                        ]),
                        _: 1
                      }, 8, ["open", "onUpdate:open"])
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
                    createVNode(_component_Popover, {
                      open: unref(open),
                      "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_PopoverTrigger, { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(_component_Button, {
                              variant: "outline",
                              role: "combobox",
                              "aria-expanded": unref(open),
                              class: "w-[200px] justify-between"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(value) ? frameworks.find((framework) => framework.value === unref(value))?.label : "Select framework...") + " ", 1),
                                createVNode(_component_Icon, {
                                  name: "radix-icons:caret-sort",
                                  class: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                })
                              ]),
                              _: 1
                            }, 8, ["aria-expanded"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_PopoverContent, { class: "w-[200px] p-0" }, {
                          default: withCtx(() => [
                            createVNode(_component_Command, null, {
                              default: withCtx(() => [
                                createVNode(_component_CommandInput, {
                                  class: "h-9",
                                  placeholder: "Search framework..."
                                }),
                                createVNode(_component_CommandEmpty, null, {
                                  default: withCtx(() => [
                                    createTextVNode("No framework found.")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandList, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandGroup, null, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(Fragment, null, renderList(frameworks, (framework) => {
                                          return createVNode(_component_CommandItem, {
                                            key: framework.value,
                                            value: framework.value,
                                            onSelect: (ev) => {
                                              if (typeof ev.detail.value === "string") {
                                                value.value = ev.detail.value;
                                              }
                                              open.value = false;
                                            }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(framework.label) + " ", 1),
                                              createVNode(_component_Icon, {
                                                name: "radix-icons:check",
                                                class: unref(cn)(
                                                  "ml-auto h-4 w-4",
                                                  unref(value) === framework.value ? "opacity-100" : "opacity-0"
                                                )
                                              }, null, 8, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["value", "onSelect"]);
                                        }), 64))
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
                      ]),
                      _: 1
                    }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/combobox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=combobox-DqOQ4OwA.mjs.map
