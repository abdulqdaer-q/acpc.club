# icpc.club — apex landing page

A single self-contained static page for the `icpc.club` apex domain. Separate
from the Next app in this repo, which is deployed at `aleppo.icpc.club`.

## Why plain HTML and not Next

The apex needs one page. Running a second Node application on the same shared
hosting would compete for CPU with the club site and buy nothing — no routing, no
data, no image optimization required here. This is three files, no build step, and
no runtime.

Everything is inlined: no external stylesheets, fonts, scripts, or images. It
loads in one request.

## Deploy

Copy the contents of this folder into the document root that `icpc.club` serves
(in cPanel, the apex domain's own `public_html` — **not** the folder the Node app
uses for `aleppo.icpc.club`).

```
index.html
robots.txt
sitemap.xml
```

Then confirm:

```bash
curl -sI https://icpc.club/            # 200, text/html
curl -s  https://icpc.club/robots.txt
curl -s  https://icpc.club/sitemap.xml
```

## Adding a club

Edit the `.clubs` list in `index.html` — one `<a class="club">` per club. Add the
subdomain in DNS and point it at wherever that club hosts its site.

## Things to keep

- **The non-affiliation notice stays prominent.** A domain that hosts several
  clubs implies more authority than a single club's site does, so the disclaimer
  matters more here, not less. Do not move it below the fold.
- **Claims stay modest.** "A small home for independent, student-run clubs" — not
  a network, federation, or official directory of ICPC clubs.
- **Operator is named in the footer.** Anyone should be able to tell who runs this
  without asking.

## Open items

- The contact address is `hello@aleppo.icpc.club`. If you would rather use
  `hello@icpc.club`, create that mailbox first and update `index.html`.
- Before inviting other clubs, consider confirming with your ICPC regional
  contact that the domain being used as a multi-club host is acceptable to them.
- Hosting other clubs' subdomains means inheriting some responsibility for what
  they publish. Worth a one-paragraph written understanding with each club.
