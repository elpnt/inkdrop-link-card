import React, { useState, useEffect } from "react";
import { getImage, getTitle, getDescription } from "./get-data";

export default function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const { href, children } = props;
    const [label] = children instanceof Array ? children : [];

    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");
    const imageShape = inkdrop.config.get("link-card.imageShape");

    let [title, setTitle] = useState(null);
    let [image, setImage] = useState(null);
    let [description, setDescription] = useState(null);

    useEffect(() => {
      // To avoid too many requests while editing, sleep 1 second for each request
      const timer = setTimeout(() => {
        fetch(href)
          .then((response) => response.text())
          .then((text) => {
            const dom = new DOMParser().parseFromString(text, "text/html");
            console.log(dom);

            const image = getImage(href, dom);
            const title = getTitle(dom) || href;
            const description = getDescription(dom);
            setImage(image);
            setTitle(title);
            setDescription(description);
          });
      }, 1000);

      return () => clearTimeout(timer);
    });

    if (
      (typeof label === "string" && label === "card") ||
      (isAutoLinkEnabled && label === href)
    ) {
      return (
        <a href={href} className="link-card-anchor">
          <div className="link-card">
            <div className={`link-card-image ${imageShape}`}>
              {image ? <img src={image} /> : <span />}
            </div>
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
