# Link Card

![Inkdrop Plugin Version](https://inkdrop-plugin-badge.vercel.app/api/version/link-card?style=flat)
![Inkdrop Plugin Downloads](https://inkdrop-plugin-badge.vercel.app/api/downloads/link-card?style=flat)

Create link cards from URLs.

![demo](img/sample.png)

## How to use

Write a link with "`card`" caption

```md
[card](https://github.com/elpnt/inkdrop-link-card)
```

Or just write a URL

```md
https://github.com/elpnt/inkdrop-link-card
```

Links without an HTML meta tag having `og:image` property are not converted to cards.

## Settings

- **autolinks**: Creates link cards from standard URLs (default: **true**)
