"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRemarkAnchor;

var _react = _interopRequireDefault(require("react"));

var _useFetchData = _interopRequireDefault(require("./useFetchData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const {
      href,
      children
    } = props;
    const [label] = children instanceof Array ? children : [];
    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");
    const imageShape = inkdrop.config.get("link-card.imageShape");
    const {
      image,
      title,
      description
    } = (0, _useFetchData.default)(href);

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