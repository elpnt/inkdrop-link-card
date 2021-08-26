"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRemarkAnchor;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _openGraphScraper = _interopRequireDefault(require("open-graph-scraper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function fetchTitleAndImage(url) {
  let title = null;
  let image = null;
  fetch(url).then(res => res.text()).then(text => {
    const dom = new DOMParser().parseFromString(text, "text/html"); // Extract title
    // If title doesn't exit, use URL instead

    const headTitle = dom.head.getElementsByTagName("title")[0].text;
    let ogTitle = dom.head.querySelector("meta[property='og:title']");
    ogTitle = ogTitle ? ogTitle.getAttribute("content") : headTitle;
    title = ogTitle || href; // Extract image

    const ogImage = dom.head.querySelector("meta[property='og:image']");
    image = ogImage ? ogImage.getAttribute("content").split("?")[0] : null;
  });
  console.log;
  return {
    title,
    image
  };
}

function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const {
      href,
      children
    } = props;
    const [label] = children instanceof Array ? children : [];
    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");
    let [title, setTitle] = (0, _react.useState)(null);
    let [image, setImage] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      fetch(href).then(res => res.text()).then(text => {
        const dom = new DOMParser().parseFromString(text, "text/html"); // Extract title
        // If title doesn't exit, use URL instead

        const headTitle = dom.head.getElementsByTagName("title")[0].text;
        let ogTitle = dom.head.querySelector("meta[property='og:title']");
        ogTitle = ogTitle ? ogTitle.getAttribute("content") : headTitle;
        title = ogTitle || href;
        setTitle(title); // Extract image

        const ogImage = dom.head.querySelector("meta[property='og:image']");
        image = ogImage ? ogImage.getAttribute("content").split("?")[0] : null;
        setImage(image);
      });
    });

    if (isAutoLinkEnabled && label === href) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "link-card"
      }, /*#__PURE__*/_react.default.createElement("img", {
        src: image,
        className: "link-card-image"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "link-card-title"
      }, title));
    }

    if (OrigA) {
      return /*#__PURE__*/_react.default.createElement(OrigA, props, children);
    } else {
      return /*#__PURE__*/_react.default.createElement("a", props, children);
    }
  };
}