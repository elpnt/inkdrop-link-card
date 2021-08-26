import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ogs from "open-graph-scraper";

function fetchTitleAndImage(url) {
  let title = null;
  let image = null;

  fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const dom = new DOMParser().parseFromString(text, "text/html");

      // Extract title
      // If title doesn't exit, use URL instead
      const headTitle = dom.head.getElementsByTagName("title")[0].text;
      let ogTitle = dom.head.querySelector("meta[property='og:title']");
      ogTitle = ogTitle ? ogTitle.getAttribute("content") : headTitle;
      title = ogTitle || href;

      // Extract image
      const ogImage = dom.head.querySelector("meta[property='og:image']");
      image = ogImage ? ogImage.getAttribute("content").split("?")[0] : null;
    });

  console.log;

  return { title, image };
}

export default function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const { href, children } = props;
    const [label] = children instanceof Array ? children : [];
    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");

    let [title, setTitle] = useState(null);
    let [image, setImage] = useState(null);

    useEffect(() => {
      fetch(href)
        .then((res) => res.text())
        .then((text) => {
          const dom = new DOMParser().parseFromString(text, "text/html");

          // Extract title
          // If title doesn't exit, use URL instead
          const headTitle = dom.head.getElementsByTagName("title")[0].text;
          let ogTitle = dom.head.querySelector("meta[property='og:title']");
          ogTitle = ogTitle ? ogTitle.getAttribute("content") : headTitle;
          title = ogTitle || href;
          setTitle(title);

          // Extract image
          const ogImage = dom.head.querySelector("meta[property='og:image']");
          image = ogImage
            ? ogImage.getAttribute("content").split("?")[0]
            : null;
          setImage(image);
        });
    });

    if (isAutoLinkEnabled && label === href) {
      return (
        <div className="link-card">
          <img src={image} className="link-card-image" />
          <span className="link-card-title">{title}</span>
        </div>
      );
    }

    if (OrigA) {
      return <OrigA {...props}>{children}</OrigA>;
    } else {
      return <a {...props}>{children}</a>;
    }
  };
}
