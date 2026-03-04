import { _ as __nuxt_component_3 } from './nuxt-link-DWlala-j.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, withModifiers, Teleport, Transition, withKeys, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderTeleport, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { a as __nuxt_component_2, _ as _sfc_main$2$1, c as useRoute } from './server.mjs';
import { _ as _sfc_main$2 } from './Input-DUkj5gv1.mjs';
import { _ as _sfc_main$8, a as _sfc_main$3, b as _sfc_main$4, c as _sfc_main$1$1, d as _sfc_main$7, e as _sfc_main$5 } from './TableHeader-CMbEjHm8.mjs';
import { _ as _sfc_main$2$2, a as _sfc_main$1$2 } from './AvatarImage-B6YLb4UI.mjs';
import { _ as _sfc_main$6 } from './index-GIPsDWUk.mjs';
import { toast } from 'vue-sonner';
import { u as usePageHeader } from './usePageHeader-cF7vvdEC.mjs';
import { u as useDashboardStore } from './useDashboardStore-DQi0OiAF.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  props: {
    roles: {},
    activeRole: {}
  },
  emits: ["update:activeRole"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const route = useRoute();
    const staticTabs = [
      { key: "", label: "All Users", href: "/admin/users" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full flex-1 min-h-0 flex flex-col" }, _attrs))}><div class="shrink-0 border-b px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-thin"><!--[-->`);
      ssrRenderList(staticTabs, (tab) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: tab.key,
          to: tab.href,
          class: ["px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all", unref(route).path === tab.href && !__props.activeRole ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"],
          onClick: ($event) => emit("update:activeRole", "")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(tab.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(tab.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (__props.roles && __props.roles.length > 0) {
        _push(`<div class="w-px h-5 bg-border shrink-0 mx-1"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.roles, (role) => {
        _push(`<button class="${ssrRenderClass([__props.activeRole === role ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted", "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all"])}">${ssrInterpolate(role)}</button>`);
      });
      _push(`<!--]--></div><div class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/Layout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AdminLayout" });
const CHUNK_SIZE = 30;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { setHeader } = usePageHeader();
    setHeader({ title: "Users", icon: "i-lucide-user-cog" });
    const search = ref("");
    const visibleCount = ref(CHUNK_SIZE);
    const activeRole = ref("");
    const syncing = ref(false);
    const isMounted = ref(false);
    const { users: users2, init, refresh } = useDashboardStore();
    init();
    const columnDefs = [
      { key: "A2", label: "User", width: "180px" },
      { key: "email", label: "Email", width: "200px" },
      { key: "A200", label: "Role", width: "130px" },
      { key: "A201", label: "Phone", width: "140px" },
      { key: "A203", label: "Preferred Language", width: "140px" },
      { key: "Status", label: "Status", width: "100px" },
      { key: "A7", label: "Level 1", width: "140px" },
      { key: "A8", label: "Level 2", width: "140px" },
      { key: "A9", label: "Level 3", width: "140px" },
      { key: "A209", label: "Home", width: "130px" },
      { key: "A205", label: "Module Permissions", width: "160px" },
      { key: "A206", label: "Furniture Control", width: "130px" },
      { key: "A207", label: "Equipment Control", width: "130px" },
      { key: "A208", label: "Vehicles Control", width: "130px" },
      { key: "A84", label: "Language", width: "100px" }
    ];
    async function syncUsers() {
      syncing.value = true;
      try {
        const data = await $fetch("/api/bigquery/sync-users", { method: "POST" });
        toast.success(data.message || `Synced ${data.count} users`);
        await refresh();
      } catch (e) {
        toast.error(e.data?.statusMessage || "Sync failed");
      } finally {
        syncing.value = false;
      }
    }
    const sortBy = ref("A2");
    const sortDir = ref("asc");
    function toggleSort(col) {
      if (sortBy.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
      else {
        sortBy.value = col;
        sortDir.value = "asc";
      }
    }
    function sortIcon(col) {
      if (sortBy.value !== col) return "i-lucide-chevrons-up-down";
      return sortDir.value === "asc" ? "i-lucide-chevron-up" : "i-lucide-chevron-down";
    }
    const uniqueRoles = computed(() => {
      const rolesSet = /* @__PURE__ */ new Set();
      users2.value.forEach((u) => {
        if (u.A200) rolesSet.add(u.A200);
      });
      return [...rolesSet].sort();
    });
    const filteredUsers = computed(() => {
      let result = users2.value;
      if (activeRole.value) {
        result = result.filter((u) => u.A200 === activeRole.value);
      }
      if (search.value) {
        const q = search.value.toLowerCase();
        result = result.filter((u) => {
          return [u.A2, u.email, u.A200, u.A201, u.Status, u.A7, u.A8, u.A9].filter(Boolean).some((val) => String(val).toLowerCase().includes(q));
        });
      }
      return result;
    });
    const sortedUsers = computed(() => {
      const arr = [...filteredUsers.value];
      const col = sortBy.value;
      return arr.sort((a, b) => {
        const av = String(a[col] ?? "").toLowerCase();
        const bv = String(b[col] ?? "").toLowerCase();
        const cmp = av.localeCompare(bv);
        return sortDir.value === "asc" ? cmp : -cmp;
      });
    });
    const visibleUsers = computed(() => sortedUsers.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < sortedUsers.value.length);
    watch(search, () => {
      visibleCount.value = CHUNK_SIZE;
    });
    watch(activeRole, () => {
      visibleCount.value = CHUNK_SIZE;
    });
    const sentinelRef = ref(null);
    function getInitials(name) {
      if (!name) return "??";
      const parts = name.trim().split(/\s+/);
      return parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
    }
    function statusColor(status) {
      const s = (status || "").toLowerCase();
      if (s === "active" || s === "true") return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      if (s === "inactive" || s === "false") return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
      return "bg-muted text-muted-foreground";
    }
    function statusLabel(status) {
      const s = (status || "").toLowerCase();
      if (s === "active" || s === "true") return "Active";
      if (s === "inactive" || s === "false") return "Inactive";
      return status || "—";
    }
    function cellValue(row, key) {
      const val = row[key];
      if (val === null || val === void 0 || val === "") return "—";
      return String(val);
    }
    const editDialog = ref(false);
    const editingUser = ref(null);
    const editEmail = ref("");
    const saving = ref(false);
    function openEditDialog(user) {
      editingUser.value = user;
      editEmail.value = user.email || "";
      editDialog.value = true;
    }
    async function saveEmail() {
      if (!editingUser.value) return;
      saving.value = true;
      try {
        await $fetch("/api/bigquery/users/update", {
          method: "POST",
          body: {
            key: editingUser.value.A2,
            field: "email",
            value: editEmail.value.trim()
          }
        });
        editingUser.value.email = editEmail.value.trim();
        toast.success(`Email updated for ${editingUser.value.A2}`);
        editDialog.value = false;
      } catch (e) {
        toast.error(e.data?.statusMessage || "Failed to update email");
      } finally {
        saving.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminLayout = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2;
      const _component_Input = _sfc_main$2;
      const _component_Button = _sfc_main$2$1;
      const _component_Table = _sfc_main$8;
      const _component_TableHeader = _sfc_main$3;
      const _component_TableRow = _sfc_main$4;
      const _component_TableHead = _sfc_main$1$1;
      const _component_TableBody = _sfc_main$7;
      const _component_TableCell = _sfc_main$5;
      const _component_Avatar = _sfc_main$2$2;
      const _component_AvatarFallback = _sfc_main$1$2;
      const _component_Badge = _sfc_main$6;
      _push(ssrRenderComponent(_component_AdminLayout, mergeProps({
        roles: unref(uniqueRoles),
        "active-role": unref(activeRole),
        "onUpdate:activeRole": ($event) => isRef(activeRole) ? activeRole.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex-1 flex flex-col min-h-0" data-v-90d72f37${_scopeId}>`);
            if (unref(isMounted)) {
              ssrRenderTeleport(_push2, (_push3) => {
                _push3(`<div class="flex items-center gap-2 w-full justify-end" data-v-90d72f37${_scopeId}><div class="relative max-w-[220px]" data-v-90d72f37${_scopeId}>`);
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-search",
                  class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
                }, null, _parent2, _scopeId));
                _push3(ssrRenderComponent(_component_Input, {
                  modelValue: unref(search),
                  "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                  placeholder: "Search users...",
                  class: "pl-8 h-8 text-sm"
                }, null, _parent2, _scopeId));
                _push3(`</div><p class="text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" data-v-90d72f37${_scopeId}>${ssrInterpolate(unref(filteredUsers).length)} record${ssrInterpolate(unref(filteredUsers).length !== 1 ? "s" : "")}</p>`);
                _push3(ssrRenderComponent(_component_Button, {
                  variant: "ghost",
                  size: "sm",
                  class: "h-8",
                  disabled: unref(syncing),
                  onClick: ($event) => syncUsers()
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_Icon, {
                        name: "i-lucide-refresh-cw",
                        class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                      }, null, _parent3, _scopeId2));
                      if (unref(syncing)) {
                        _push4(`<span class="ml-1 text-xs" data-v-90d72f37${_scopeId2}>Syncing...</span>`);
                      } else {
                        _push4(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode(_component_Icon, {
                          name: "i-lucide-refresh-cw",
                          class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                        }, null, 8, ["class"]),
                        unref(syncing) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1 text-xs"
                        }, "Syncing...")) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push3(`</div>`);
              }, "#header-toolbar", false, _parent2);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-1 min-h-0 overflow-auto" data-v-90d72f37${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Table, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_TableRow, { class: "border-b-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(columnDefs, (col) => {
                                _push5(ssrRenderComponent(_component_TableHead, {
                                  key: col.key,
                                  class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                  style: { minWidth: col.width },
                                  onClick: ($event) => toggleSort(col.key)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex items-center gap-1" data-v-90d72f37${_scopeId5}>${ssrInterpolate(col.label)} `);
                                      _push6(ssrRenderComponent(_component_Icon, {
                                        name: sortIcon(col.key),
                                        class: "size-3 opacity-60"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createTextVNode(toDisplayString(col.label) + " ", 1),
                                          createVNode(_component_Icon, {
                                            name: sortIcon(col.key),
                                            class: "size-3 opacity-60"
                                          }, null, 8, ["name"])
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                  return createVNode(_component_TableHead, {
                                    key: col.key,
                                    class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                    style: { minWidth: col.width },
                                    onClick: ($event) => toggleSort(col.key)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createTextVNode(toDisplayString(col.label) + " ", 1),
                                        createVNode(_component_Icon, {
                                          name: sortIcon(col.key),
                                          class: "size-3 opacity-60"
                                        }, null, 8, ["name"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["style", "onClick"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_TableRow, { class: "border-b-0" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                return createVNode(_component_TableHead, {
                                  key: col.key,
                                  class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                  style: { minWidth: col.width },
                                  onClick: ($event) => toggleSort(col.key)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createTextVNode(toDisplayString(col.label) + " ", 1),
                                      createVNode(_component_Icon, {
                                        name: sortIcon(col.key),
                                        class: "size-3 opacity-60"
                                      }, null, 8, ["name"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["style", "onClick"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_TableBody, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(visibleUsers), (user, idx) => {
                          _push4(ssrRenderComponent(_component_TableRow, {
                            key: user.A2 || idx,
                            class: "group cursor-pointer hover:bg-muted/30 transition-colors",
                            onClick: ($event) => openEditDialog(user)
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(columnDefs, (col) => {
                                  _push5(ssrRenderComponent(_component_TableCell, {
                                    key: col.key
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (col.key === "A2") {
                                          _push6(`<div class="flex items-center gap-2" data-v-90d72f37${_scopeId5}>`);
                                          _push6(ssrRenderComponent(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(getInitials(user.A2))}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                          _push6(`<span class="font-medium" data-v-90d72f37${_scopeId5}>${ssrInterpolate(user.A2 || "—")}</span></div>`);
                                        } else if (col.key === "A200") {
                                          _push6(`<!--[-->`);
                                          if (user.A200) {
                                            _push6(ssrRenderComponent(_component_Badge, {
                                              variant: "outline",
                                              class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                            }, {
                                              default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`${ssrInterpolate(user.A200)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(user.A200), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            _push6(`<span class="text-muted-foreground" data-v-90d72f37${_scopeId5}>—</span>`);
                                          }
                                          _push6(`<!--]-->`);
                                        } else if (col.key === "email") {
                                          _push6(`<div class="flex items-center gap-1.5" data-v-90d72f37${_scopeId5}>`);
                                          if (user.email) {
                                            _push6(ssrRenderComponent(_component_Icon, {
                                              name: "i-lucide-mail",
                                              class: "size-3 text-muted-foreground shrink-0"
                                            }, null, _parent6, _scopeId5));
                                          } else {
                                            _push6(`<!---->`);
                                          }
                                          if (user.email) {
                                            _push6(`<span class="text-sm" data-v-90d72f37${_scopeId5}>${ssrInterpolate(user.email)}</span>`);
                                          } else {
                                            _push6(`<span class="text-xs text-muted-foreground/50 italic" data-v-90d72f37${_scopeId5}>No email</span>`);
                                          }
                                          _push6(`<button class="size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all" data-v-90d72f37${_scopeId5}>`);
                                          _push6(ssrRenderComponent(_component_Icon, {
                                            name: "i-lucide-pencil",
                                            class: "size-2.5 text-muted-foreground"
                                          }, null, _parent6, _scopeId5));
                                          _push6(`</button></div>`);
                                        } else if (col.key === "Status") {
                                          _push6(ssrRenderComponent(_component_Badge, {
                                            variant: "outline",
                                            class: [statusColor(user.Status), "text-[10px]"]
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`${ssrInterpolate(statusLabel(user.Status))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<span class="text-sm whitespace-nowrap" data-v-90d72f37${_scopeId5}>${ssrInterpolate(cellValue(user, col.key))}</span>`);
                                        }
                                      } else {
                                        return [
                                          col.key === "A2" ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "flex items-center gap-2"
                                          }, [
                                            createVNode(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                              default: withCtx(() => [
                                                createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode("span", { class: "font-medium" }, toDisplayString(user.A2 || "—"), 1)
                                          ])) : col.key === "A200" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                            user.A200 ? (openBlock(), createBlock(_component_Badge, {
                                              key: 0,
                                              variant: "outline",
                                              class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(user.A200), 1)
                                              ]),
                                              _: 2
                                            }, 1024)) : (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-muted-foreground"
                                            }, "—"))
                                          ], 64)) : col.key === "email" ? (openBlock(), createBlock("div", {
                                            key: 2,
                                            class: "flex items-center gap-1.5"
                                          }, [
                                            user.email ? (openBlock(), createBlock(_component_Icon, {
                                              key: 0,
                                              name: "i-lucide-mail",
                                              class: "size-3 text-muted-foreground shrink-0"
                                            })) : createCommentVNode("", true),
                                            user.email ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-sm"
                                            }, toDisplayString(user.email), 1)) : (openBlock(), createBlock("span", {
                                              key: 2,
                                              class: "text-xs text-muted-foreground/50 italic"
                                            }, "No email")),
                                            createVNode("button", {
                                              class: "size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all",
                                              onClick: withModifiers(($event) => openEditDialog(user), ["stop"])
                                            }, [
                                              createVNode(_component_Icon, {
                                                name: "i-lucide-pencil",
                                                class: "size-2.5 text-muted-foreground"
                                              })
                                            ], 8, ["onClick"])
                                          ])) : col.key === "Status" ? (openBlock(), createBlock(_component_Badge, {
                                            key: 3,
                                            variant: "outline",
                                            class: [statusColor(user.Status), "text-[10px]"]
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                            key: 4,
                                            class: "text-sm whitespace-nowrap"
                                          }, toDisplayString(cellValue(user, col.key)), 1))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                    return createVNode(_component_TableCell, {
                                      key: col.key
                                    }, {
                                      default: withCtx(() => [
                                        col.key === "A2" ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                            default: withCtx(() => [
                                              createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode("span", { class: "font-medium" }, toDisplayString(user.A2 || "—"), 1)
                                        ])) : col.key === "A200" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                          user.A200 ? (openBlock(), createBlock(_component_Badge, {
                                            key: 0,
                                            variant: "outline",
                                            class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(user.A200), 1)
                                            ]),
                                            _: 2
                                          }, 1024)) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-muted-foreground"
                                          }, "—"))
                                        ], 64)) : col.key === "email" ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          class: "flex items-center gap-1.5"
                                        }, [
                                          user.email ? (openBlock(), createBlock(_component_Icon, {
                                            key: 0,
                                            name: "i-lucide-mail",
                                            class: "size-3 text-muted-foreground shrink-0"
                                          })) : createCommentVNode("", true),
                                          user.email ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-sm"
                                          }, toDisplayString(user.email), 1)) : (openBlock(), createBlock("span", {
                                            key: 2,
                                            class: "text-xs text-muted-foreground/50 italic"
                                          }, "No email")),
                                          createVNode("button", {
                                            class: "size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all",
                                            onClick: withModifiers(($event) => openEditDialog(user), ["stop"])
                                          }, [
                                            createVNode(_component_Icon, {
                                              name: "i-lucide-pencil",
                                              class: "size-2.5 text-muted-foreground"
                                            })
                                          ], 8, ["onClick"])
                                        ])) : col.key === "Status" ? (openBlock(), createBlock(_component_Badge, {
                                          key: 3,
                                          variant: "outline",
                                          class: [statusColor(user.Status), "text-[10px]"]
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                          key: 4,
                                          class: "text-sm whitespace-nowrap"
                                        }, toDisplayString(cellValue(user, col.key)), 1))
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                        if (unref(visibleUsers).length === 0) {
                          _push4(ssrRenderComponent(_component_TableRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_TableCell, {
                                  colspan: columnDefs.length,
                                  class: "h-32 text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<div class="flex flex-col items-center gap-2 text-muted-foreground" data-v-90d72f37${_scopeId5}>`);
                                      _push6(ssrRenderComponent(_component_Icon, {
                                        name: "i-lucide-inbox",
                                        class: "size-8"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`<p data-v-90d72f37${_scopeId5}>No users found</p></div>`);
                                    } else {
                                      return [
                                        createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                          createVNode(_component_Icon, {
                                            name: "i-lucide-inbox",
                                            class: "size-8"
                                          }),
                                          createVNode("p", null, "No users found")
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_TableCell, {
                                    colspan: columnDefs.length,
                                    class: "h-32 text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-inbox",
                                          class: "size-8"
                                        }),
                                        createVNode("p", null, "No users found")
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["colspan"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(hasMore)) {
                          _push4(`<tr data-v-90d72f37${_scopeId3}><td${ssrRenderAttr("colspan", columnDefs.length)} class="h-10 text-center text-xs text-muted-foreground" data-v-90d72f37${_scopeId3}> Loading more… </td></tr>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleUsers), (user, idx) => {
                            return openBlock(), createBlock(_component_TableRow, {
                              key: user.A2 || idx,
                              class: "group cursor-pointer hover:bg-muted/30 transition-colors",
                              onClick: ($event) => openEditDialog(user)
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                  return createVNode(_component_TableCell, {
                                    key: col.key
                                  }, {
                                    default: withCtx(() => [
                                      col.key === "A2" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", { class: "font-medium" }, toDisplayString(user.A2 || "—"), 1)
                                      ])) : col.key === "A200" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                        user.A200 ? (openBlock(), createBlock(_component_Badge, {
                                          key: 0,
                                          variant: "outline",
                                          class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(user.A200), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : col.key === "email" ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "flex items-center gap-1.5"
                                      }, [
                                        user.email ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-mail",
                                          class: "size-3 text-muted-foreground shrink-0"
                                        })) : createCommentVNode("", true),
                                        user.email ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm"
                                        }, toDisplayString(user.email), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: "text-xs text-muted-foreground/50 italic"
                                        }, "No email")),
                                        createVNode("button", {
                                          class: "size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all",
                                          onClick: withModifiers(($event) => openEditDialog(user), ["stop"])
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: "i-lucide-pencil",
                                            class: "size-2.5 text-muted-foreground"
                                          })
                                        ], 8, ["onClick"])
                                      ])) : col.key === "Status" ? (openBlock(), createBlock(_component_Badge, {
                                        key: 3,
                                        variant: "outline",
                                        class: [statusColor(user.Status), "text-[10px]"]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                        key: 4,
                                        class: "text-sm whitespace-nowrap"
                                      }, toDisplayString(cellValue(user, col.key)), 1))
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128)),
                          unref(visibleUsers).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_TableCell, {
                                colspan: columnDefs.length,
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-inbox",
                                      class: "size-8"
                                    }),
                                    createVNode("p", null, "No users found")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(hasMore) ? (openBlock(), createBlock("tr", {
                            key: 1,
                            ref_key: "sentinelRef",
                            ref: sentinelRef
                          }, [
                            createVNode("td", {
                              colspan: columnDefs.length,
                              class: "h-10 text-center text-xs text-muted-foreground"
                            }, " Loading more… ", 8, ["colspan"])
                          ], 512)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                      default: withCtx(() => [
                        createVNode(_component_TableRow, { class: "border-b-0" }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                              return createVNode(_component_TableHead, {
                                key: col.key,
                                class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                style: { minWidth: col.width },
                                onClick: ($event) => toggleSort(col.key)
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-1" }, [
                                    createTextVNode(toDisplayString(col.label) + " ", 1),
                                    createVNode(_component_Icon, {
                                      name: sortIcon(col.key),
                                      class: "size-3 opacity-60"
                                    }, null, 8, ["name"])
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["style", "onClick"]);
                            }), 64))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_TableBody, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleUsers), (user, idx) => {
                          return openBlock(), createBlock(_component_TableRow, {
                            key: user.A2 || idx,
                            class: "group cursor-pointer hover:bg-muted/30 transition-colors",
                            onClick: ($event) => openEditDialog(user)
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                return createVNode(_component_TableCell, {
                                  key: col.key
                                }, {
                                  default: withCtx(() => [
                                    col.key === "A2" ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-2"
                                    }, [
                                      createVNode(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode("span", { class: "font-medium" }, toDisplayString(user.A2 || "—"), 1)
                                    ])) : col.key === "A200" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      user.A200 ? (openBlock(), createBlock(_component_Badge, {
                                        key: 0,
                                        variant: "outline",
                                        class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(user.A200), 1)
                                        ]),
                                        _: 2
                                      }, 1024)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted-foreground"
                                      }, "—"))
                                    ], 64)) : col.key === "email" ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "flex items-center gap-1.5"
                                    }, [
                                      user.email ? (openBlock(), createBlock(_component_Icon, {
                                        key: 0,
                                        name: "i-lucide-mail",
                                        class: "size-3 text-muted-foreground shrink-0"
                                      })) : createCommentVNode("", true),
                                      user.email ? (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-sm"
                                      }, toDisplayString(user.email), 1)) : (openBlock(), createBlock("span", {
                                        key: 2,
                                        class: "text-xs text-muted-foreground/50 italic"
                                      }, "No email")),
                                      createVNode("button", {
                                        class: "size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all",
                                        onClick: withModifiers(($event) => openEditDialog(user), ["stop"])
                                      }, [
                                        createVNode(_component_Icon, {
                                          name: "i-lucide-pencil",
                                          class: "size-2.5 text-muted-foreground"
                                        })
                                      ], 8, ["onClick"])
                                    ])) : col.key === "Status" ? (openBlock(), createBlock(_component_Badge, {
                                      key: 3,
                                      variant: "outline",
                                      class: [statusColor(user.Status), "text-[10px]"]
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                      key: 4,
                                      class: "text-sm whitespace-nowrap"
                                    }, toDisplayString(cellValue(user, col.key)), 1))
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 2
                          }, 1032, ["onClick"]);
                        }), 128)),
                        unref(visibleUsers).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_TableCell, {
                              colspan: columnDefs.length,
                              class: "h-32 text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                  createVNode(_component_Icon, {
                                    name: "i-lucide-inbox",
                                    class: "size-8"
                                  }),
                                  createVNode("p", null, "No users found")
                                ])
                              ]),
                              _: 1
                            }, 8, ["colspan"])
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        unref(hasMore) ? (openBlock(), createBlock("tr", {
                          key: 1,
                          ref_key: "sentinelRef",
                          ref: sentinelRef
                        }, [
                          createVNode("td", {
                            colspan: columnDefs.length,
                            class: "h-10 text-center text-xs text-muted-foreground"
                          }, " Loading more… ", 8, ["colspan"])
                        ], 512)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            ssrRenderTeleport(_push2, (_push3) => {
              if (unref(editDialog) && unref(editingUser)) {
                _push3(`<div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" data-v-90d72f37${_scopeId}><div class="w-full max-w-md mx-4 rounded-2xl border bg-card shadow-2xl overflow-hidden" data-v-90d72f37${_scopeId}><div class="px-6 py-5 border-b bg-gradient-to-r from-violet-500/5 to-indigo-500/5" data-v-90d72f37${_scopeId}><div class="flex items-center gap-3" data-v-90d72f37${_scopeId}>`);
                _push3(ssrRenderComponent(_component_Avatar, { class: "size-10 border" }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_AvatarFallback, { class: "text-sm font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                        default: withCtx((_3, _push5, _parent4, _scopeId3) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(getInitials(unref(editingUser).A2))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(getInitials(unref(editingUser).A2)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_AvatarFallback, { class: "text-sm font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getInitials(unref(editingUser).A2)), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push3(`<div data-v-90d72f37${_scopeId}><h3 class="font-semibold text-foreground" data-v-90d72f37${_scopeId}>${ssrInterpolate(unref(editingUser).A2)}</h3><p class="text-xs text-muted-foreground" data-v-90d72f37${_scopeId}>${ssrInterpolate(unref(editingUser).A200 || "User")} · ${ssrInterpolate(unref(editingUser).A201 || "—")}</p></div></div></div><div class="px-6 py-5 space-y-4" data-v-90d72f37${_scopeId}><div data-v-90d72f37${_scopeId}><label class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5" data-v-90d72f37${_scopeId}>`);
                _push3(ssrRenderComponent(_component_Icon, {
                  name: "i-lucide-mail",
                  class: "size-3"
                }, null, _parent2, _scopeId));
                _push3(` Email Address </label>`);
                _push3(ssrRenderComponent(_component_Input, {
                  modelValue: unref(editEmail),
                  "onUpdate:modelValue": ($event) => isRef(editEmail) ? editEmail.value = $event : null,
                  type: "email",
                  placeholder: "user@example.com",
                  class: "h-9",
                  onKeydown: saveEmail
                }, null, _parent2, _scopeId));
                _push3(`<p class="text-[10px] text-muted-foreground mt-1.5" data-v-90d72f37${_scopeId}>This email is used for Google authentication login.</p></div></div><div class="px-6 py-4 border-t flex justify-end gap-2" data-v-90d72f37${_scopeId}>`);
                _push3(ssrRenderComponent(_component_Button, {
                  variant: "outline",
                  size: "sm",
                  onClick: ($event) => editDialog.value = false
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      _push4(`Cancel`);
                    } else {
                      return [
                        createTextVNode("Cancel")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push3(ssrRenderComponent(_component_Button, {
                  size: "sm",
                  disabled: unref(saving),
                  onClick: saveEmail
                }, {
                  default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                    if (_push4) {
                      if (unref(saving)) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "i-lucide-loader-2",
                          class: "size-3.5 animate-spin mr-1"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(` ${ssrInterpolate(unref(saving) ? "Saving..." : "Save Email")}`);
                    } else {
                      return [
                        unref(saving) ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          name: "i-lucide-loader-2",
                          class: "size-3.5 animate-spin mr-1"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(unref(saving) ? "Saving..." : "Save Email"), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push3(`</div></div></div>`);
              } else {
                _push3(`<!---->`);
              }
            }, "body", false, _parent2);
          } else {
            return [
              createVNode("div", { class: "w-full flex-1 flex flex-col min-h-0" }, [
                unref(isMounted) ? (openBlock(), createBlock(Teleport, {
                  key: 0,
                  to: "#header-toolbar"
                }, [
                  createVNode("div", { class: "flex items-center gap-2 w-full justify-end" }, [
                    createVNode("div", { class: "relative max-w-[220px]" }, [
                      createVNode(_component_Icon, {
                        name: "i-lucide-search",
                        class: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
                      }),
                      createVNode(_component_Input, {
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                        placeholder: "Search users...",
                        class: "pl-8 h-8 text-sm"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("p", { class: "text-xs text-muted-foreground tabular-nums hidden lg:block whitespace-nowrap" }, toDisplayString(unref(filteredUsers).length) + " record" + toDisplayString(unref(filteredUsers).length !== 1 ? "s" : ""), 1),
                    createVNode(_component_Button, {
                      variant: "ghost",
                      size: "sm",
                      class: "h-8",
                      disabled: unref(syncing),
                      onClick: ($event) => syncUsers()
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "i-lucide-refresh-cw",
                          class: ["size-3.5", unref(syncing) ? "animate-spin" : ""]
                        }, null, 8, ["class"]),
                        unref(syncing) ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1 text-xs"
                        }, "Syncing...")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex-1 min-h-0 overflow-auto" }, [
                  createVNode(_component_Table, null, {
                    default: withCtx(() => [
                      createVNode(_component_TableHeader, { class: "sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]" }, {
                        default: withCtx(() => [
                          createVNode(_component_TableRow, { class: "border-b-0" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                return createVNode(_component_TableHead, {
                                  key: col.key,
                                  class: "bg-card cursor-pointer select-none whitespace-nowrap",
                                  style: { minWidth: col.width },
                                  onClick: ($event) => toggleSort(col.key)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createTextVNode(toDisplayString(col.label) + " ", 1),
                                      createVNode(_component_Icon, {
                                        name: sortIcon(col.key),
                                        class: "size-3 opacity-60"
                                      }, null, 8, ["name"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["style", "onClick"]);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_TableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(visibleUsers), (user, idx) => {
                            return openBlock(), createBlock(_component_TableRow, {
                              key: user.A2 || idx,
                              class: "group cursor-pointer hover:bg-muted/30 transition-colors",
                              onClick: ($event) => openEditDialog(user)
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(columnDefs, (col) => {
                                  return createVNode(_component_TableCell, {
                                    key: col.key
                                  }, {
                                    default: withCtx(() => [
                                      col.key === "A2" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode(_component_Avatar, { class: "size-7 border shrink-0" }, {
                                          default: withCtx(() => [
                                            createVNode(_component_AvatarFallback, { class: "text-[10px] font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(getInitials(user.A2)), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode("span", { class: "font-medium" }, toDisplayString(user.A2 || "—"), 1)
                                      ])) : col.key === "A200" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                        user.A200 ? (openBlock(), createBlock(_component_Badge, {
                                          key: 0,
                                          variant: "outline",
                                          class: "bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(user.A200), 1)
                                          ]),
                                          _: 2
                                        }, 1024)) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-muted-foreground"
                                        }, "—"))
                                      ], 64)) : col.key === "email" ? (openBlock(), createBlock("div", {
                                        key: 2,
                                        class: "flex items-center gap-1.5"
                                      }, [
                                        user.email ? (openBlock(), createBlock(_component_Icon, {
                                          key: 0,
                                          name: "i-lucide-mail",
                                          class: "size-3 text-muted-foreground shrink-0"
                                        })) : createCommentVNode("", true),
                                        user.email ? (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-sm"
                                        }, toDisplayString(user.email), 1)) : (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: "text-xs text-muted-foreground/50 italic"
                                        }, "No email")),
                                        createVNode("button", {
                                          class: "size-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-muted transition-all",
                                          onClick: withModifiers(($event) => openEditDialog(user), ["stop"])
                                        }, [
                                          createVNode(_component_Icon, {
                                            name: "i-lucide-pencil",
                                            class: "size-2.5 text-muted-foreground"
                                          })
                                        ], 8, ["onClick"])
                                      ])) : col.key === "Status" ? (openBlock(), createBlock(_component_Badge, {
                                        key: 3,
                                        variant: "outline",
                                        class: [statusColor(user.Status), "text-[10px]"]
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(statusLabel(user.Status)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : (openBlock(), createBlock("span", {
                                        key: 4,
                                        class: "text-sm whitespace-nowrap"
                                      }, toDisplayString(cellValue(user, col.key)), 1))
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128)),
                          unref(visibleUsers).length === 0 ? (openBlock(), createBlock(_component_TableRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_TableCell, {
                                colspan: columnDefs.length,
                                class: "h-32 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "flex flex-col items-center gap-2 text-muted-foreground" }, [
                                    createVNode(_component_Icon, {
                                      name: "i-lucide-inbox",
                                      class: "size-8"
                                    }),
                                    createVNode("p", null, "No users found")
                                  ])
                                ]),
                                _: 1
                              }, 8, ["colspan"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          unref(hasMore) ? (openBlock(), createBlock("tr", {
                            key: 1,
                            ref_key: "sentinelRef",
                            ref: sentinelRef
                          }, [
                            createVNode("td", {
                              colspan: columnDefs.length,
                              class: "h-10 text-center text-xs text-muted-foreground"
                            }, " Loading more… ", 8, ["colspan"])
                          ], 512)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ])
              ]),
              (openBlock(), createBlock(Teleport, { to: "body" }, [
                createVNode(Transition, {
                  "enter-active-class": "transition duration-200 ease-out",
                  "enter-from-class": "opacity-0",
                  "enter-to-class": "opacity-100",
                  "leave-active-class": "transition duration-150 ease-in",
                  "leave-from-class": "opacity-100",
                  "leave-to-class": "opacity-0"
                }, {
                  default: withCtx(() => [
                    unref(editDialog) && unref(editingUser) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
                      onClick: withModifiers(($event) => editDialog.value = false, ["self"])
                    }, [
                      createVNode("div", { class: "w-full max-w-md mx-4 rounded-2xl border bg-card shadow-2xl overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-5 border-b bg-gradient-to-r from-violet-500/5 to-indigo-500/5" }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode(_component_Avatar, { class: "size-10 border" }, {
                              default: withCtx(() => [
                                createVNode(_component_AvatarFallback, { class: "text-sm font-medium bg-gradient-to-br from-violet-500/20 to-indigo-500/20 text-violet-700 dark:text-violet-300" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getInitials(unref(editingUser).A2)), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("div", null, [
                              createVNode("h3", { class: "font-semibold text-foreground" }, toDisplayString(unref(editingUser).A2), 1),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(unref(editingUser).A200 || "User") + " · " + toDisplayString(unref(editingUser).A201 || "—"), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "px-6 py-5 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5" }, [
                              createVNode(_component_Icon, {
                                name: "i-lucide-mail",
                                class: "size-3"
                              }),
                              createTextVNode(" Email Address ")
                            ]),
                            createVNode(_component_Input, {
                              modelValue: unref(editEmail),
                              "onUpdate:modelValue": ($event) => isRef(editEmail) ? editEmail.value = $event : null,
                              type: "email",
                              placeholder: "user@example.com",
                              class: "h-9",
                              onKeydown: withKeys(saveEmail, ["enter"])
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", { class: "text-[10px] text-muted-foreground mt-1.5" }, "This email is used for Google authentication login.")
                          ])
                        ]),
                        createVNode("div", { class: "px-6 py-4 border-t flex justify-end gap-2" }, [
                          createVNode(_component_Button, {
                            variant: "outline",
                            size: "sm",
                            onClick: ($event) => editDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_Button, {
                            size: "sm",
                            disabled: unref(saving),
                            onClick: saveEmail
                          }, {
                            default: withCtx(() => [
                              unref(saving) ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "i-lucide-loader-2",
                                class: "size-3.5 animate-spin mr-1"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(saving) ? "Saving..." : "Save Email"), 1)
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ])
                      ])
                    ], 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const users = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90d72f37"]]);

export { users as default };
//# sourceMappingURL=users-XAFqTtik.mjs.map
