# BeatTheHeat.global – MVP Website

## How to deploy on GitHub Pages

1. Fork this repo or upload the folder to your new GitHub repository.
2. Ensure all HTML pages are in the root, and CSS/JS/images in the assets folders.
3. Go to Settings → Pages → Source: Select main branch, root (`/`) directory.
4. Your site will appear at `https://yourusername.github.io/beattheheat.global/`
5. (Optional) To use a custom domain, follow [GitHub Pages guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## To add forum integration:

- Setup Discourse (recommended: managed hosting or DigitalOcean 1-click).
- Set a CNAME for `community.beattheheat.global`.
- Link directly from `forum.html` or embed latest posts via Discourse API (see [Discourse embedding docs](https://meta.discourse.org/t/embedding-discourse-comments-via-javascript/31963)).

## Editing content:
- Edit HTML files directly or use a simple static site CMS for markdown support (e.g., Netlify CMS).



beattheheat.global/
├── index.html
├── events.html
├── funding.html
├── resources.html
├── early-warning.html
├── research.html
├── blue-green.html
├── alliance.html
├── heat-risk.html
├── stories.html
├── about.html
├── contact.html
├── forum.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── main.css
│   │   └── components.css
│   ├── js/
│   │   ├── main.js
│   │   └── carousel.js
│   ├── images/
│   └── fonts/
└── README.md
