import { readonly, reactive } from 'vue';

const headerState = reactive({
  title: "",
  titleKey: void 0,
  description: "",
  descriptionKey: void 0,
  icon: ""
});
function usePageHeader() {
  function setHeader(opts) {
    headerState.title = opts.title || "";
    headerState.titleKey = opts.titleKey;
    headerState.description = opts.description || "";
    headerState.descriptionKey = opts.descriptionKey;
    headerState.icon = opts.icon || "";
  }
  function clearHeader() {
    headerState.title = "";
    headerState.titleKey = void 0;
    headerState.description = "";
    headerState.descriptionKey = void 0;
    headerState.icon = "";
  }
  return {
    headerState: readonly(headerState),
    setHeader,
    clearHeader
  };
}

export { usePageHeader as u };
//# sourceMappingURL=usePageHeader-cF7vvdEC.mjs.map
