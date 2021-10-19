"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetchData = useFetchData;

var _react = require("react");

function fetchImage(url, dom) {
  let image = "";
  const ogImage = dom.querySelector("meta[property='og:image']");
  if (ogImage) image = ogImage.getAttribute("content").split("?")[0];
  const twitterImage = dom.querySelector("meta[name='twitter:image']");

  if (!image && twitterImage) {
    image = twitterImage.getAttribute("content").split("?")[0];
  } // If the image path is relative, convert it to absolute one


  const isAbsoluteUrl = url => url.indexOf("://") > 0 || url.indexOf("//") > 0;

  if (image && !isAbsoluteUrl(image)) {
    const origin = new URL(url).origin;

    if (url[0] === ".") {
      // relative to the current URL
      image = url + "/" + image;
    } else {
      // relative to the origin
      image = origin + "/" + image;
    }
  }

  return image;
}

function fetchTitle(dom) {
  let title = "";
  const headTitle = dom.querySelector("title");
  if (headTitle) title = headTitle.text;
  const ogTitle = dom.querySelector("meta[property='og:title']");
  if (!title && ogTitle) title = ogTitle.getAttribute("content");
  const twitterTitle = dom.querySelector("meta[name='twitter:title']");
  if (!title && twitterTitle) title = twitterTitle.getAttribute("content");
  return title;
}

function fetchDescription(dom) {
  let description = "";
  const ogDescription = dom.querySelector("meta[property='og:description']");
  if (ogDescription) description = ogDescription.getAttribute("content");
  return description;
}

function useFetchData(href) {
  const [image, setImage] = (0, _react.useState)("");
  const [title, setTitle] = (0, _react.useState)("");
  const [description, setDescription] = (0, _react.useState)(""); // To avoid too many requests, sleep 1 second after editing

  (0, _react.useEffect)(() => {
    const timer = setTimeout(() => {
      fetch(href).then(response => response.text()).then(text => {
        const dom = new DOMParser().parseFromString(text, "text/html");
        setImage(fetchImage(href, dom));
        setTitle(fetchTitle(dom));
        setDescription(fetchDescription(dom) || href);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [href]);
  return {
    image,
    title,
    description
  };
}