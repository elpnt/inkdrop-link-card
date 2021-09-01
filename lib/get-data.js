"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImage = getImage;
exports.getTitle = getTitle;
exports.getDescription = getDescription;

function getImage(url, dom) {
  let image = "";
  const ogImage = dom.querySelector("meta[property='og:image']");
  if (ogImage) image = ogImage.getAttribute("content").split("?")[0];
  const twitterImage = dom.querySelector("meta[name='twitter:image']");
  if (!image && twitterImage) image = twitterImage.getAttribute("content").split("?")[0]; // If the image path is relative, convert it to absolute one

  const isAbsoluteUrl = url => url.indexOf("://") > 0 || url.indexOf("//") > 0;

  if (image && !isAbsoluteUrl(image)) {
    const origin = new URL(url).origin;
    image = origin + "/" + image;
  }

  return image;
}

function getTitle(dom) {
  let title = "";
  const headTitle = dom.querySelector("title");
  if (headTitle) title = headTitle.text;
  const ogTitle = dom.querySelector("meta[property='og:title']");
  if (!title && ogTitle) title = ogTitle.getAttribute("content");
  const twitterTitle = dom.querySelector("meta[property='twitter:title']");
  if (!title && twitterTitle) title = twitterTitle.getAttribute("content");
  return title;
}

function getDescription(dom) {
  let description = "";
  const ogDescription = dom.querySelector("meta[property='og:description']");
  if (ogDescription) description = ogDescription.getAttribute("content");
  return description;
}