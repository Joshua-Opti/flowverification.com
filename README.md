# flowverification.com

Product site for **FlowVerification**, OPTI Engineering's flow measurement and analytics products for mines and industrial plants.

- **Capture**: portable measurement kits (clamp-on ultrasonic, thermal mass gas probes, three-phase power loggers)
- **Analytics**: dashboards, shift-aware baselines, waste and cost reporting (live Power BI demo embedded on the homepage)
- **Twin**: digital twins of compressed air and water networks

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Homepage: products, platform, use cases, live demo, FAQ, demo request |
| `gallery.html` | Deployments: field photos with filters |
| `styles.css` | All styling (shared by both pages) |
| `script.js` | Mobile menu and demo-request form (opens a pre-filled email to info@opti-eng.co.za) |
| `gallery.js` | Deployment filters |
| `gallery/` | Field photos (JPEGs without file extensions) |

Plain static HTML, no build step. Hosted on GitHub Pages from `main` with the custom domain in `CNAME`, so **a push to `main` goes live**.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
