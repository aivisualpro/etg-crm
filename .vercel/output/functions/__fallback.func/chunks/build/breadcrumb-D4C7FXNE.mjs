import { _ as _sfc_main$9 } from './index-GIPsDWUk.mjs';
import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { a as __nuxt_component_2, e as cn } from './server.mjs';
import { _ as _sfc_main$6$1, a as _sfc_main$1$1, b as _sfc_main$a, c as _sfc_main$4$1 } from './CardTitle-CEXidhwl.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, renderSlot, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Slash, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-vue-next';
import { Primitive } from 'reka-ui';
import { _ as _sfc_main$d, a as _sfc_main$b, b as _sfc_main$b$1, c as _sfc_main$9$1 } from './DropdownMenuTrigger-Bjd-JwWI.mjs';
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

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        "aria-label": "breadcrumb",
        "data-slot": "breadcrumb",
        class: props.class
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/Breadcrumb.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbEllipsis",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        "data-slot": "breadcrumb-ellipsis",
        role: "presentation",
        "aria-hidden": "true",
        class: unref(cn)("flex size-9 items-center justify-center", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(ssrRenderComponent(unref(MoreHorizontal), { class: "size-4" }, null, _parent));
      }, _push, _parent);
      _push(`<span class="sr-only">More</span></span>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbEllipsis.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "breadcrumb-item",
        class: unref(cn)("inline-flex items-center gap-1.5", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbItem.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbLink",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "a" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-slot": "breadcrumb-link",
        as: __props.as,
        "as-child": __props.asChild,
        class: unref(cn)("hover:text-foreground transition-colors", props.class)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbLink.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbList",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ol${ssrRenderAttrs(mergeProps({
        "data-slot": "breadcrumb-list",
        class: unref(cn)("text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ol>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbList.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbPage",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        "data-slot": "breadcrumb-page",
        role: "link",
        "aria-disabled": "true",
        "aria-current": "page",
        class: unref(cn)("text-foreground font-normal", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbPage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-slot": "breadcrumb-separator",
        role: "presentation",
        "aria-hidden": "true",
        class: unref(cn)("[&>svg]:size-3.5", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(ssrRenderComponent(unref(ChevronRight), null, null, _parent));
      }, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbSeparator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BreadcrumbCustom",
  __ssrInlineRender: true,
  props: {
    links: {},
    separator: { default: "i-lucide-chevron-right" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumb = _sfc_main$8;
      const _component_BreadcrumbList = _sfc_main$4;
      const _component_BreadcrumbItem = _sfc_main$6;
      const _component_BreadcrumbLink = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_BreadcrumbPage = _sfc_main$3;
      const _component_BreadcrumbSeparator = _sfc_main$2;
      const _component_Icon = __nuxt_component_2;
      _push(ssrRenderComponent(_component_Breadcrumb, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BreadcrumbList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(__props.links, (link, index) => {
                    _push3(`<!--[-->`);
                    _push3(ssrRenderComponent(_component_BreadcrumbItem, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (index !== __props.links.length - 1) {
                            _push4(ssrRenderComponent(_component_BreadcrumbLink, { "as-child": "" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_NuxtLink, {
                                    to: link.href
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(link.title)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(link.title), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_NuxtLink, {
                                      to: link.href
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(link.title), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["to"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(_component_BreadcrumbPage, null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(link.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(link.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            index !== __props.links.length - 1 ? (openBlock(), createBlock(_component_BreadcrumbLink, {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtLink, {
                                  to: link.href
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(link.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(_component_BreadcrumbPage, { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.title), 1)
                              ]),
                              _: 2
                            }, 1024))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (index < __props.links.length - 1) {
                      _push3(ssrRenderComponent(_component_BreadcrumbSeparator, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: __props.separator,
                              mode: "svg"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: __props.separator,
                                mode: "svg"
                              }, null, 8, ["name"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index) => {
                      return openBlock(), createBlock(Fragment, { key: index }, [
                        createVNode(_component_BreadcrumbItem, null, {
                          default: withCtx(() => [
                            index !== __props.links.length - 1 ? (openBlock(), createBlock(_component_BreadcrumbLink, {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtLink, {
                                  to: link.href
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(link.title), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]),
                              _: 2
                            }, 1024)) : (openBlock(), createBlock(_component_BreadcrumbPage, { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.title), 1)
                              ]),
                              _: 2
                            }, 1024))
                          ]),
                          _: 2
                        }, 1024),
                        index < __props.links.length - 1 ? (openBlock(), createBlock(_component_BreadcrumbSeparator, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: __props.separator,
                              mode: "svg"
                            }, null, 8, ["name"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BreadcrumbList, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.links, (link, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      createVNode(_component_BreadcrumbItem, null, {
                        default: withCtx(() => [
                          index !== __props.links.length - 1 ? (openBlock(), createBlock(_component_BreadcrumbLink, {
                            key: 0,
                            "as-child": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtLink, {
                                to: link.href
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(link.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ]),
                            _: 2
                          }, 1024)) : (openBlock(), createBlock(_component_BreadcrumbPage, { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(link.title), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      index < __props.links.length - 1 ? (openBlock(), createBlock(_component_BreadcrumbSeparator, { key: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: __props.separator,
                            mode: "svg"
                          }, null, 8, ["name"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/BreadcrumbCustom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_18 = Object.assign(_sfc_main$1, { __name: "BaseBreadcrumbCustom" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "breadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbLinks = ref([
      {
        title: "Home",
        href: "/"
      },
      {
        title: "Components",
        href: "#"
      },
      {
        title: "Breadcrumb",
        href: "/components/breadcrumb"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Badge = _sfc_main$9;
      const _component_NuxtLink = __nuxt_component_3;
      const _component_Icon = __nuxt_component_2;
      const _component_Card = _sfc_main$6$1;
      const _component_CardHeader = _sfc_main$1$1;
      const _component_CardTitle = _sfc_main$a;
      const _component_CardContent = _sfc_main$4$1;
      const _component_Breadcrumb = _sfc_main$8;
      const _component_BreadcrumbList = _sfc_main$4;
      const _component_BreadcrumbItem = _sfc_main$6;
      const _component_BreadcrumbLink = _sfc_main$5;
      const _component_BreadcrumbSeparator = _sfc_main$2;
      const _component_BreadcrumbPage = _sfc_main$3;
      const _component_DropdownMenu = _sfc_main$d;
      const _component_DropdownMenuTrigger = _sfc_main$b;
      const _component_DropdownMenuContent = _sfc_main$b$1;
      const _component_DropdownMenuItem = _sfc_main$9$1;
      const _component_BreadcrumbEllipsis = _sfc_main$7;
      const _component_BaseBreadcrumbCustom = __nuxt_component_18;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4" }, _attrs))}><div class="grid gap-2"><div><h2 class="text-2xl font-bold tracking-tight"> Breadcrumb </h2><p class="text-muted-foreground"> Displays the path to the current resource using a hierarchy of links. </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Badge, {
        variant: "secondary",
        class: "rounded-full",
        "as-child": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "https://www.shadcn-vue.com/docs/components/breadcrumb",
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
                to: "https://www.shadcn-vue.com/docs/components/breadcrumb",
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
                  _push3(`<div class="h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Breadcrumb, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_BreadcrumbList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Home `);
                                        } else {
                                          return [
                                            createTextVNode(" Home ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Home ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { href: "/components" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Components `);
                                        } else {
                                          return [
                                            createTextVNode(" Components ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbPage, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Breadcrumb`);
                                        } else {
                                          return [
                                            createTextVNode("Breadcrumb")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbPage, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Breadcrumb")
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
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Home ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Components ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbPage, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Breadcrumb")
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
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Components ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                    createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                      createVNode(_component_Breadcrumb, null, {
                        default: withCtx(() => [
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Components ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                  createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                    createVNode(_component_Breadcrumb, null, {
                      default: withCtx(() => [
                        createVNode(_component_BreadcrumbList, null, {
                          default: withCtx(() => [
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Home ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Components ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbPage, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Breadcrumb")
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
                        _push4(`Custom Separator`);
                      } else {
                        return [
                          createTextVNode("Custom Separator")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Custom Separator")
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
                  _push3(`<div class="h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Breadcrumb, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_BreadcrumbList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Home `);
                                        } else {
                                          return [
                                            createTextVNode(" Home ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Home ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Slash), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Slash))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { href: "/components" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Components `);
                                        } else {
                                          return [
                                            createTextVNode(" Components ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Slash), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Slash))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbPage, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Breadcrumb`);
                                        } else {
                                          return [
                                            createTextVNode("Breadcrumb")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbPage, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Breadcrumb")
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
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Home ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Slash))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Components ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Slash))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbPage, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Breadcrumb")
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
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Components ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                    createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                      createVNode(_component_Breadcrumb, null, {
                        default: withCtx(() => [
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Components ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                      createTextVNode("Custom Separator")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                    createVNode(_component_Breadcrumb, null, {
                      default: withCtx(() => [
                        createVNode(_component_BreadcrumbList, null, {
                          default: withCtx(() => [
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Home ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator, null, {
                              default: withCtx(() => [
                                createVNode(unref(Slash))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { href: "/components" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Components ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator, null, {
                              default: withCtx(() => [
                                createVNode(unref(Slash))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbPage, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Breadcrumb")
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
                        _push4(`Dropdown`);
                      } else {
                        return [
                          createTextVNode("Dropdown")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Dropdown")
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
                  _push3(`<div class="h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Breadcrumb, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_BreadcrumbList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Home `);
                                        } else {
                                          return [
                                            createTextVNode(" Home ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Home ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Slash), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Slash))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_DropdownMenu, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Components `);
                                                _push8(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createTextVNode(" Components "),
                                                  createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(_component_DropdownMenuContent, { align: "start" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Documentation`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Documentation")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Themes`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Themes")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(_component_DropdownMenuItem, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Source`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Source")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Documentation")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Themes")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(_component_DropdownMenuItem, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Source")
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
                                            createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Components "),
                                                createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Documentation")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Themes")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(_component_DropdownMenuItem, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Source")
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
                                  } else {
                                    return [
                                      createVNode(_component_DropdownMenu, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Components "),
                                              createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Documentation")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Themes")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(_component_DropdownMenuItem, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Source")
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(Slash), null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(Slash))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbPage, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Breadcrumb`);
                                        } else {
                                          return [
                                            createTextVNode("Breadcrumb")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbPage, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Breadcrumb")
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
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Home ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Slash))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenu, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Components "),
                                            createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Documentation")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Themes")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(_component_DropdownMenuItem, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Source")
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
                                }),
                                createVNode(_component_BreadcrumbSeparator, null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Slash))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbPage, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Breadcrumb")
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
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenu, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components "),
                                          createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Documentation")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Themes")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Source")
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
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                    createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                      createVNode(_component_Breadcrumb, null, {
                        default: withCtx(() => [
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_DropdownMenu, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components "),
                                          createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Documentation")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Themes")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(_component_DropdownMenuItem, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Source")
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
                              }),
                              createVNode(_component_BreadcrumbSeparator, null, {
                                default: withCtx(() => [
                                  createVNode(unref(Slash))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                      createTextVNode("Dropdown")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                    createVNode(_component_Breadcrumb, null, {
                      default: withCtx(() => [
                        createVNode(_component_BreadcrumbList, null, {
                          default: withCtx(() => [
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { href: "/" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Home ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator, null, {
                              default: withCtx(() => [
                                createVNode(unref(Slash))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_DropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_DropdownMenuTrigger, { class: "flex items-center gap-1" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Components "),
                                        createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_DropdownMenuContent, { align: "start" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Documentation")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Themes")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_DropdownMenuItem, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Source")
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
                            }),
                            createVNode(_component_BreadcrumbSeparator, null, {
                              default: withCtx(() => [
                                createVNode(unref(Slash))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbPage, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Breadcrumb")
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
                        _push4(`Collapsed`);
                      } else {
                        return [
                          createTextVNode("Collapsed")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Collapsed")
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
                  _push3(`<div class="h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Breadcrumb, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_BreadcrumbList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<a href="/"${_scopeId6}> Home </a>`);
                                        } else {
                                          return [
                                            createVNode("a", { href: "/" }, " Home ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode("a", { href: "/" }, " Home ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbEllipsis, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbEllipsis)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbLink, { "as-child": "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/components" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` Components `);
                                              } else {
                                                return [
                                                  createTextVNode(" Components ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_NuxtLink, { to: "/components" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" Components ")
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
                                      createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtLink, { to: "/components" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" Components ")
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
                              _push5(ssrRenderComponent(_component_BreadcrumbSeparator, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_BreadcrumbItem, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_BreadcrumbPage, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Breadcrumb`);
                                        } else {
                                          return [
                                            createTextVNode("Breadcrumb")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_BreadcrumbPage, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Breadcrumb")
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
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode("a", { href: "/" }, " Home ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbEllipsis)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtLink, { to: "/components" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Components ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_BreadcrumbSeparator),
                                createVNode(_component_BreadcrumbItem, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_BreadcrumbPage, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Breadcrumb")
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
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode("a", { href: "/" }, " Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbEllipsis)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, { to: "/components" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                    createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                      createVNode(_component_Breadcrumb, null, {
                        default: withCtx(() => [
                          createVNode(_component_BreadcrumbList, null, {
                            default: withCtx(() => [
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode("a", { href: "/" }, " Home ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbEllipsis)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtLink, { to: "/components" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Components ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_BreadcrumbSeparator),
                              createVNode(_component_BreadcrumbItem, null, {
                                default: withCtx(() => [
                                  createVNode(_component_BreadcrumbPage, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Breadcrumb")
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
                      createTextVNode("Collapsed")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                    createVNode(_component_Breadcrumb, null, {
                      default: withCtx(() => [
                        createVNode(_component_BreadcrumbList, null, {
                          default: withCtx(() => [
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode("a", { href: "/" }, " Home ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbEllipsis)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbLink, { "as-child": "" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtLink, { to: "/components" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Components ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_BreadcrumbSeparator),
                            createVNode(_component_BreadcrumbItem, null, {
                              default: withCtx(() => [
                                createVNode(_component_BreadcrumbPage, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Breadcrumb")
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
                        _push4(`Breadcrumb Custom`);
                      } else {
                        return [
                          createTextVNode("Breadcrumb Custom")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Breadcrumb Custom")
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
                  _push3(`<div class="h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_BaseBreadcrumbCustom, { links: unref(breadcrumbLinks) }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                      createVNode(_component_BaseBreadcrumbCustom, { links: unref(breadcrumbLinks) }, null, 8, ["links"])
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
                      createTextVNode("Breadcrumb Custom")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-100px w-full flex items-center justify-center gap-4 overflow-hidden sm:h-200px" }, [
                    createVNode(_component_BaseBreadcrumbCustom, { links: unref(breadcrumbLinks) }, null, 8, ["links"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/components/breadcrumb.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=breadcrumb-D4C7FXNE.mjs.map
