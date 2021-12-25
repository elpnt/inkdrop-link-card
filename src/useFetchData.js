import { useEffect, useState } from "react";
import ogs from "open-graph-scraper";

const SLEEP_AFTER_FETCH = 1000;

export function useFetchData(href) {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(href)
        .then((response) => response.text())
        .then((html) => ogs({ html }))
        .then(({ result }) => {
          const {
            ogImage,
            ogTitle,
            ogDescription,
            twitterImage,
            twitterTitle,
            twitterDescription,
          } = result;

          setTitle(ogTitle || twitterTitle);
          setDescription(ogDescription || twitterDescription);
          return ogImage?.url || twitterImage?.url;
        })
        .then((rawImageUrl) => {
          const imageUrl = new URL(rawImageUrl, href).href; // Absorb the difference between absolute and relative URLs
          return fetch(imageUrl);
        })
        .then(({ ok, url }) => {
          if (ok) {
            setImage(url);
          }
        });
    }, SLEEP_AFTER_FETCH);

    return () => clearTimeout(timer);
  }, [href]);

  return {
    image,
    title,
    description,
  };
}
