import React, { useState, useEffect } from "react";

export default function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const { href, children } = props;
    const [label] = children instanceof Array ? children : [];
    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");

    let [title, setTitle] = useState(null);
    let [image, setImage] = useState(null);
    let [description, setDescription] = useState(null);

    useEffect(() => {
      // To avoid too many requests while editing, sleep 1 second for each request
      const timer = setTimeout(() => {
        fetch(href)
          .then((res) => res.text())
          .then((text) => {
            const dom = new DOMParser().parseFromString(text, "text/html");

            // Extract title
            // If title doesn't exit, use URL instead
            const headTitle = dom.head.getElementsByTagName("title")[0].text;
            let ogTitle = dom.head.querySelector("meta[property='og:title']");
            ogTitle = ogTitle ? ogTitle.getAttribute("content") : headTitle;
            setTitle(ogTitle || href);

            // Extract description
            let ogDescription = dom.head.querySelector(
              "meta[property='og:description']"
            );
            ogDescription = ogDescription
              ? ogDescription.getAttribute("content")
              : null;
            setDescription(ogDescription);

            // Extract image
            const ogImage = dom.head.querySelector("meta[property='og:image']");
            image = ogImage
              ? ogImage.getAttribute("content").split("?")[0]
              : null;
            // If og:image is relative path, convert it to absolute one
            if (image && !isAbsoluteUrl(image)) {
              const origin = new URL(href).origin;
              image = origin + "/" + image;
            }
            setImage(image);
          });
      }, 1000);

      return () => clearTimeout(timer);
    });

    if (isAutoLinkEnabled && label === href && image) {
      return (
        <a href={href}>
          <div className="link-card">
            <img src={image} className="link-card-image" />
            <div className="link-card-text">
              <span className="link-card-title">{title}</span>
              <span className="link-card-description">{description}</span>
            </div>
          </div>
        </a>
      );
    }

    if (OrigA) {
      return <OrigA {...props}>{children}</OrigA>;
    } else {
      return <a {...props}>{children}</a>;
    }
  };
}

function isAbsoluteUrl(url) {
  return url.indexOf("://") > 0 || url.indexOf("//") > 0;
}
