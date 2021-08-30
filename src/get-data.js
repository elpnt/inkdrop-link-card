export function getImage(url, dom) {
  let image = "";
  const ogImage = dom.head.querySelector("meta[property='og:image']");
  if (ogImage) image = ogImage.getAttribute("content").split("?")[0];

  // If og:image is relative path, convert it to absolute one
  const isAbsoluteUrl = (url) =>
    url.indexOf("://") > 0 || url.indexOf("//") > 0;
  if (image && !isAbsoluteUrl(image)) {
    const origin = new URL(url).origin;
    image = origin + "/" + image;
  }

  return image;
}

export function getTitle(dom) {
  let title = "";
  const headTitle = dom.head.querySelector("title");
  if (headTitle) title = headTitle.text;
  let ogTitle = dom.head.querySelector("meta[property='og:title']");
  if (ogTitle) title = ogTitle.getAttribute("content");

  return title;
}

export function getDescription(dom) {
  let description = "";
  const ogDescription = dom.head.querySelector(
    "meta[property='og:description']"
  );
  if (ogDescription) description = ogDescription.getAttribute("content");

  return description;
}
