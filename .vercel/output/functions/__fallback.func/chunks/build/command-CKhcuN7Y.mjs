import { _ as _sfc_main$1 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { s as useShortcuts, t as defineShortcuts, a as __nuxt_component_2, _ as _sfc_main$2$2 } from './server.mjs';
import { _ as _sfc_main$6, a as _sfc_main$1$1, b as _sfc_main$2, c as _sfc_main$4 } from './CardTitle-CEXidhwl.mjs';
import { _ as _sfc_main$8, a as _sfc_main$4$1, b as _sfc_main$2$1, c as _sfc_main$6$1, d as _sfc_main$5, e as _sfc_main$3, f as _sfc_main$1$2, g as _sfc_main$7, h as _sfc_main$7$1 } from './index-Kgt191xM.mjs';
import { a as _sfc_main$1$3 } from './KbdGroup-DAgL2v80.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "command",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(false);
    const { metaSymbol } = useShortcuts();
    defineShortcuts({
      Meta_J: () => handleOpenChange()
    });
    function handleOpenChange() {
      open.value = !open.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$2;
      const _component_CardContent = _sfc_main$4;
      const _component_Command = _sfc_main$8;
      const _component_CommandInput = _sfc_main$4$1;
      const _component_CommandList = _sfc_main$2$1;
      const _component_CommandEmpty = _sfc_main$6$1;
      const _component_CommandGroup = _sfc_main$5;
      const _component_CommandItem = _sfc_main$3;
      const _component_CommandSeparator = _sfc_main$1$2;
      const _component_CommandShortcut = _sfc_main$7;
      const _component_Kbd = _sfc_main$1$3;
      const _component_Button = _sfc_main$2$2;
      const _component_CommandDialog = _sfc_main$7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Command </h2><p class="text-muted-foreground"> Fast, composable, unstyled command menu. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/command",
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
                to: "https://www.shadcn-vue.com/docs/components/command",
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
              to: "https://www.reka-ui.com/docs/components/listbox",
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
                to: "https://www.reka-ui.com/docs/components/listbox",
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
                  _push3(ssrRenderComponent(_component_Command, { class: "max-w-[450px] border rounded-lg shadow-md" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CommandInput, { placeholder: "Type a command or search..." }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CommandList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CommandEmpty, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No results found.`);
                                  } else {
                                    return [
                                      createTextVNode("No results found.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Calendar" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:calendar",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Calendar</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:calendar",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Calendar")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Search Emoji" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:face",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Search Emoji</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:face",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Search Emoji")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Launch" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:rocket",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Launch</span>`);
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:rocket",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Launch")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CommandItem, { value: "Calendar" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:calendar",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Calendar")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "Search Emoji" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:face",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Search Emoji")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "Launch" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:rocket",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Launch")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Profile" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:person",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Profile</span>`);
                                          _push7(ssrRenderComponent(_component_CommandShortcut, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`⌘P`);
                                              } else {
                                                return [
                                                  createTextVNode("⌘P")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:person",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Profile"),
                                            createVNode(_component_CommandShortcut, null, {
                                              default: withCtx(() => [
                                                createTextVNode("⌘P")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Mail" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:envelope-closed",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Mail</span>`);
                                          _push7(ssrRenderComponent(_component_CommandShortcut, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`⌘B`);
                                              } else {
                                                return [
                                                  createTextVNode("⌘B")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:envelope-closed",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Mail"),
                                            createVNode(_component_CommandShortcut, null, {
                                              default: withCtx(() => [
                                                createTextVNode("⌘B")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "Settings" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "radix-icons:gear",
                                            class: "mr-2 h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span${_scopeId6}>Settings</span>`);
                                          _push7(ssrRenderComponent(_component_CommandShortcut, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`⌘S`);
                                              } else {
                                                return [
                                                  createTextVNode("⌘S")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_Icon, {
                                              name: "radix-icons:gear",
                                              class: "mr-2 h-4 w-4"
                                            }),
                                            createVNode("span", null, "Settings"),
                                            createVNode(_component_CommandShortcut, null, {
                                              default: withCtx(() => [
                                                createTextVNode("⌘S")
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
                                      createVNode(_component_CommandItem, { value: "Profile" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:person",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Profile"),
                                          createVNode(_component_CommandShortcut, null, {
                                            default: withCtx(() => [
                                              createTextVNode("⌘P")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "Mail" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:envelope-closed",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Mail"),
                                          createVNode(_component_CommandShortcut, null, {
                                            default: withCtx(() => [
                                              createTextVNode("⌘B")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "Settings" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "radix-icons:gear",
                                            class: "mr-2 h-4 w-4"
                                          }),
                                          createVNode("span", null, "Settings"),
                                          createVNode(_component_CommandShortcut, null, {
                                            default: withCtx(() => [
                                              createTextVNode("⌘S")
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
                                createVNode(_component_CommandEmpty, null, {
                                  default: withCtx(() => [
                                    createTextVNode("No results found.")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "Calendar" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:calendar",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Calendar")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "Search Emoji" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:face",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Search Emoji")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "Launch" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:rocket",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Launch")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandSeparator),
                                createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "Profile" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:person",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Profile"),
                                        createVNode(_component_CommandShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⌘P")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "Mail" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:envelope-closed",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Mail"),
                                        createVNode(_component_CommandShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⌘B")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "Settings" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_Icon, {
                                          name: "radix-icons:gear",
                                          class: "mr-2 h-4 w-4"
                                        }),
                                        createVNode("span", null, "Settings"),
                                        createVNode(_component_CommandShortcut, null, {
                                          default: withCtx(() => [
                                            createTextVNode("⌘S")
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
                          createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                          createVNode(_component_CommandList, null, {
                            default: withCtx(() => [
                              createVNode(_component_CommandEmpty, null, {
                                default: withCtx(() => [
                                  createTextVNode("No results found.")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "Calendar" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:calendar",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Calendar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Search Emoji" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:face",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Search Emoji")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Launch" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:rocket",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Launch")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandSeparator),
                              createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "Profile" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:person",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Profile"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘P")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Mail" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:envelope-closed",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Mail"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘B")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Settings" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:gear",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Settings"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘S")
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
                      createVNode(_component_Command, { class: "max-w-[450px] border rounded-lg shadow-md" }, {
                        default: withCtx(() => [
                          createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                          createVNode(_component_CommandList, null, {
                            default: withCtx(() => [
                              createVNode(_component_CommandEmpty, null, {
                                default: withCtx(() => [
                                  createTextVNode("No results found.")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "Calendar" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:calendar",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Calendar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Search Emoji" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:face",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Search Emoji")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Launch" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:rocket",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Launch")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandSeparator),
                              createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "Profile" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:person",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Profile"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘P")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Mail" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:envelope-closed",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Mail"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘B")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "Settings" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Icon, {
                                        name: "radix-icons:gear",
                                        class: "mr-2 h-4 w-4"
                                      }),
                                      createVNode("span", null, "Settings"),
                                      createVNode(_component_CommandShortcut, null, {
                                        default: withCtx(() => [
                                          createTextVNode("⌘S")
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
                    createVNode(_component_Command, { class: "max-w-[450px] border rounded-lg shadow-md" }, {
                      default: withCtx(() => [
                        createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                        createVNode(_component_CommandList, null, {
                          default: withCtx(() => [
                            createVNode(_component_CommandEmpty, null, {
                              default: withCtx(() => [
                                createTextVNode("No results found.")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                              default: withCtx(() => [
                                createVNode(_component_CommandItem, { value: "Calendar" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:calendar",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Calendar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandItem, { value: "Search Emoji" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:face",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Search Emoji")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandItem, { value: "Launch" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:rocket",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Launch")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CommandSeparator),
                            createVNode(_component_CommandGroup, { heading: "Settings" }, {
                              default: withCtx(() => [
                                createVNode(_component_CommandItem, { value: "Profile" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:person",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Profile"),
                                    createVNode(_component_CommandShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⌘P")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandItem, { value: "Mail" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:envelope-closed",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Mail"),
                                    createVNode(_component_CommandShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⌘B")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandItem, { value: "Settings" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_Icon, {
                                      name: "radix-icons:gear",
                                      class: "mr-2 h-4 w-4"
                                    }),
                                    createVNode("span", null, "Settings"),
                                    createVNode(_component_CommandShortcut, null, {
                                      default: withCtx(() => [
                                        createTextVNode("⌘S")
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
      _push(ssrRenderComponent(_component_Card, { class: "w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`With Dialog`);
                      } else {
                        return [
                          createTextVNode("With Dialog")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("With Dialog")
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
                  _push3(`<div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px"${_scopeId2}><div${_scopeId2}><div class="flex flex-col items-center gap-4"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}> Press `);
                  _push3(ssrRenderComponent(_component_Kbd, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(metaSymbol))}J`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(metaSymbol)) + "J", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</p><span class="text-sm text-muted-foreground"${_scopeId2}>or</span>`);
                  _push3(ssrRenderComponent(_component_Button, {
                    size: "sm",
                    onClick: handleOpenChange
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Click Here `);
                      } else {
                        return [
                          createTextVNode(" Click Here ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_CommandDialog, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CommandInput, { placeholder: "Type a command or search..." }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_CommandList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CommandEmpty, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`No results found.`);
                                  } else {
                                    return [
                                      createTextVNode("No results found.")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "calendar" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Calendar `);
                                        } else {
                                          return [
                                            createTextVNode(" Calendar ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "search-emoji" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Search Emoji `);
                                        } else {
                                          return [
                                            createTextVNode(" Search Emoji ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "calculator" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Calculator `);
                                        } else {
                                          return [
                                            createTextVNode(" Calculator ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CommandItem, { value: "calendar" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Calendar ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "search-emoji" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Search Emoji ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "calculator" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Calculator ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "profile" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Profile `);
                                        } else {
                                          return [
                                            createTextVNode(" Profile ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "billing" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Billing `);
                                        } else {
                                          return [
                                            createTextVNode(" Billing ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CommandItem, { value: "settings" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Settings `);
                                        } else {
                                          return [
                                            createTextVNode(" Settings ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CommandItem, { value: "profile" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Profile ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "billing" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Billing ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CommandItem, { value: "settings" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Settings ")
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
                                createVNode(_component_CommandEmpty, null, {
                                  default: withCtx(() => [
                                    createTextVNode("No results found.")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "calendar" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Calendar ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "search-emoji" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Search Emoji ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "calculator" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Calculator ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandSeparator),
                                createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "profile" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Profile ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "billing" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Billing ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "settings" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Settings ")
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
                          createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                          createVNode(_component_CommandList, null, {
                            default: withCtx(() => [
                              createVNode(_component_CommandEmpty, null, {
                                default: withCtx(() => [
                                  createTextVNode("No results found.")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "calendar" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Calendar ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "search-emoji" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Search Emoji ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "calculator" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Calculator ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandSeparator),
                              createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "profile" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Profile ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "billing" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Billing ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "settings" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Settings ")
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex flex-col items-center gap-4" }, [
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            createTextVNode(" Press "),
                            createVNode(_component_Kbd, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(metaSymbol)) + "J", 1)
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("span", { class: "text-sm text-muted-foreground" }, "or"),
                          createVNode(_component_Button, {
                            size: "sm",
                            onClick: handleOpenChange
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Click Here ")
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode(_component_CommandDialog, {
                          open: unref(open),
                          "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                            createVNode(_component_CommandList, null, {
                              default: withCtx(() => [
                                createVNode(_component_CommandEmpty, null, {
                                  default: withCtx(() => [
                                    createTextVNode("No results found.")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "calendar" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Calendar ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "search-emoji" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Search Emoji ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "calculator" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Calculator ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CommandSeparator),
                                createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CommandItem, { value: "profile" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Profile ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "billing" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Billing ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CommandItem, { value: "settings" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Settings ")
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
                      createTextVNode("With Dialog")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex flex-col items-center gap-4" }, [
                        createVNode("p", { class: "text-sm text-muted-foreground" }, [
                          createTextVNode(" Press "),
                          createVNode(_component_Kbd, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(metaSymbol)) + "J", 1)
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("span", { class: "text-sm text-muted-foreground" }, "or"),
                        createVNode(_component_Button, {
                          size: "sm",
                          onClick: handleOpenChange
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Click Here ")
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode(_component_CommandDialog, {
                        open: unref(open),
                        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CommandInput, { placeholder: "Type a command or search..." }),
                          createVNode(_component_CommandList, null, {
                            default: withCtx(() => [
                              createVNode(_component_CommandEmpty, null, {
                                default: withCtx(() => [
                                  createTextVNode("No results found.")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandGroup, { heading: "Suggestions" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "calendar" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Calendar ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "search-emoji" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Search Emoji ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "calculator" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Calculator ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CommandSeparator),
                              createVNode(_component_CommandGroup, { heading: "Settings" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CommandItem, { value: "profile" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Profile ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "billing" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Billing ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CommandItem, { value: "settings" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Settings ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/command.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=command-CKhcuN7Y.mjs.map
