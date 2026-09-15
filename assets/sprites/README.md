# Original reference artwork

These are independent rectangular artwork crops. Most use the original `1.png` and `2.png` with original source pixels preserved. The three `*-art` backgrounds use a built-in ImageGen edit of `1.png` with its rarity badges removed. No text, labels, complete controls, or UI cards are used as the artwork.

- `wave`, `moon`, `wind`, `wind2`, `cloud`, `owl`, `storm`: achievement artwork, including the original illustrated badge.
- `turret`, `mine`, `bolt`: equipment portraits including their original blue portrait background.
- `harbor`, `classic`, `frost`: lighthouse portraits. The crop starts after the rarity badge, preserving the entire tower; some surrounding rocks are outside the crop.
- `header-lighthouse`: the lighthouse art in the original blue header.
- `gem-reward`, `drop-reward`, `lantern-reward`: original reward medallions, with no labels.
- `harbor-art`, `classic-art`, `frost-art`: wide card artwork with original baked-in rarity badges removed through built-in ImageGen. Use these for full-width card previews with dynamic DOM rarity badges.
- `turret-art`: the original wide turret-and-sea artwork from the BUILD detail preview, without text.
- `turret-card`, `mine-card`: the larger original equipment portraits from BUILD cards, without labels or controls.

All crop rectangles and source names are recorded in `manifest.json`; coordinates are `[left, top, right, bottom]` with exclusive right and bottom edges.

Use these as small independent `<img>` art elements. Live labels, layouts, card frames, controls, badges, focus rings, and states must remain separate DOM elements.

`contact-sheet.png` is a review sheet, not a UI background.
