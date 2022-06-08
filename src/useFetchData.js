import { useEffect, useState } from "react";
import ogs from "open-graph-scraper";

const parser = new DOMParser();
const FETCH_DELAY = 500;

export function useFetchData(href) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Prevent too many requests while editing a URL
    const timer = setTimeout(async () => {
      const response = await fetch(href);
      const html = await response.text();

      const { result } = await ogs({ html });
      const {
        ogImage,
        ogTitle,
        ogDescription,
        twitterImage,
        twitterTitle,
        twitterDescription,
      } = result;

      const document = parser.parseFromString(html, "text/html");
      setTitle(document.title || ogTitle || twitterTitle || href);
      setDescription(ogDescription || twitterDescription || "");

      const imageRawUrl = ogImage?.url || twitterImage?.url;
      if (imageRawUrl === undefined) return;
      const imageAbsoluteUrl = new URL(imageRawUrl, href).href;
      const { ok, url } = await fetch(imageAbsoluteUrl);
      if (ok) setImage(url);
    }, FETCH_DELAY);

    return () => clearTimeout(timer);
  }, [href]);

  return {
    image,
    title,
    description,
  };
}
