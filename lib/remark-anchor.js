"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRemarkAnchor;

var _react = _interopRequireWildcard(require("react"));

var _getData = require("./get-data");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const {
      href,
      children
    } = props;
    const [label] = children instanceof Array ? children : [];
    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");
    const imageShape = inkdrop.config.get("link-card.imageShape");
    let [title, setTitle] = (0, _react.useState)(null);
    let [image, setImage] = (0, _react.useState)(null);
    let [description, setDescription] = (0, _react.useState)(null);
    (0, _react.useEffect)(() => {
      // To avoid too many requests while editing, sleep 1 second for each request
      const timer = setTimeout(() => {
        fetch(href).then(response => response.text()).then(text => {
          const dom = new DOMParser().parseFromString(text, "text/html");
          console.log(dom);
          const image = (0, _getData.getImage)(href, dom);
          const title = (0, _getData.getTitle)(dom) || href;
          const description = (0, _getData.getDescription)(dom);
          setImage(image);
          setTitle(title);
          setDescription(description);
        });
      }, 1000);
      return () => clearTimeout(timer);
    });

    if (typeof label === "string" && label === "card" || isAutoLinkEnabled && label === href) {
      return /*#__PURE__*/_react.default.createElement("a", {
        href: href,
        className: "link-card-anchor"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "link-card"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: `link-card-image ${imageShape}`
      }, image ? /*#__PURE__*/_react.default.createElement("img", {
        src: image
      }) : /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("div", {
        className: "link-card-text"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "link-card-title"
      }, title), /*#__PURE__*/_react.default.createElement("span", {
        className: "link-card-description"
      }, description))));
    }

    if (OrigA) {
      return /*#__PURE__*/_react.default.createElement(OrigA, props, children);
    } else {
      return /*#__PURE__*/_react.default.createElement("a", props, children);
    }
  };
}

function isAbsoluteUrl(url) {
  return url.indexOf("://") > 0 || url.indexOf("//") > 0;
}