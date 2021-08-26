import { markdownRenderer } from "inkdrop";
import createRemarkAnchor from "./remark-anchor";

module.exports = {
  origAComponent: null,

  config: {
    autolinks: {
      title: "Create link cards from standard URLs",
      type: "boolean",
      default: true,
    },
  },

  activate() {
    if (markdownRenderer) {
      const OrigA = markdownRenderer.remarkReactComponents.a;
      const RemarkAnchor = createRemarkAnchor(OrigA);
      markdownRenderer.remarkReactComponents.a = RemarkAnchor;
      this.origAComponent = OrigA;
    }
  },

  deactivate() {
    if (markdownRenderer) {
      markdownRenderer.remarkReactComponents.a = this.origAComponent;
    }
  },
};
