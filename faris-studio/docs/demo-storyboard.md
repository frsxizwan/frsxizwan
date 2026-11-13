# Demo storyboard

A shot list for a 60–75 second screen recording of the site. Record at 1440 × 900, 60 fps, cursor visible.
Each project also has its own in-site storyboard (the "Demo" section of every case study), generated from
`src/content/projects.ts`.

| # | Time | Shot | Action | What it demonstrates |
| --- | --- | --- | --- | --- |
| 1 | 0:00–0:07 | Hero, cold load | Load `/`. Hold still while the three tagline lines rise and the solid fades in. | Cinematic introduction; type hierarchy |
| 2 | 0:07–0:13 | Hero, pointer | Move the cursor slowly left to right. | The 3D object responds with restrained parallax |
| 3 | 0:13–0:20 | About | Click **About** in the header. | Smooth-scroll navigation; active-link highlight; the three principles |
| 4 | 0:20–0:30 | Work | Click **Work**. Scroll through the three disciplines; hover the SOC Sentinel card. | Sticky category labels; card lift and pointer-following light |
| 5 | 0:30–0:42 | Case study | Click the SOC Sentinel card. Scroll: problem → approach → architecture → screenshot. | Detail page; four-stage architecture diagram |
| 6 | 0:42–0:50 | Storyboard and limits | Continue to **Storyboard** and **Limitations**. Pause on limitations. | Honest scope statement |
| 7 | 0:50–0:55 | Next project | Click **Next case study**. | Project chaining |
| 8 | 0:55–1:02 | Skills | Header → **Skills**. | Three-level, evidence-based scale |
| 9 | 1:02–1:08 | Reduced motion | Toggle **Reduce motion**, then click **Resume**. | Instant jump, static hero — accessibility option |
| 10 | 1:08–1:15 | Contact | Header → **Contact**. Hover the email link. | Closing call to action |

## Mobile cut (optional, 20 seconds)

Use a 390 × 844 viewport.

1. Load `/` — hero with the object behind the headline.
2. Tap the menu button — full-screen menu.
3. Tap **Work** — menu closes, page scrolls.
4. Tap the Shadow Zero card — case study, architecture stacked vertically.

## Reference frames

| Frame | File |
| --- | --- |
| Hero, desktop | `screenshots/01-hero-desktop.png` |
| Home, desktop, full page | `screenshots/02-home-desktop-full.png` |
| Case study, desktop, full page | `screenshots/03-case-study-desktop-full.png` |
| Hero, mobile | `screenshots/04-hero-mobile.png` |
| Menu, mobile | `screenshots/05-menu-mobile.png` |
| Home, mobile, full page | `screenshots/06-home-mobile-full.png` |
| Case study, mobile, full page | `screenshots/07-case-study-mobile-full.png` |

Regenerate with `npm run build && npm start`, then `npm run screenshots` in a second terminal.
