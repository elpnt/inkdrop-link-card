import React from "react";
import { useFetchData } from "./useFetchData";

export function createRemarkAnchor(OrigA) {
  return function RemarkAnchor(props) {
    const { href, children } = props;
    const [label] = children instanceof Array ? children : [];

    const isAutoLinkEnabled = inkdrop.config.get("link-card.autolinks");
    const imageShape = inkdrop.config.get("link-card.imageShape");

    const { image, title, description } = useFetchData(href);

    if (
      (typeof label === "string" && label === "card") ||
      (isAutoLinkEnabled && label === href)
    ) {
      return (
        <a href={href} className="link-card-anchor">
          <div className="link-card">
            <div
              className={`link-card-image ${imageShape}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
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
