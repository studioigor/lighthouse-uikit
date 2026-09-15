# Generated artwork

Mode: built-in `image_gen__imagegen` using the `imagegen` skill. No API or CLI fallback.

## lighthouse.png

Used as: an independent transparent illustration in hero and item previews. Text, controls, panels, states, and frames are native HTML/CSS/SVG components.

Exact generation prompt:

```text
Use case: stylized-concept
Asset type: isolated transparent PNG lighthouse illustration for a playful nautical game UIKit
Primary request: Paint one charming small red and warm cream striped lighthouse on a tiny rocky island with bright grass, a warm glowing golden lantern room and scarlet roof, surrounded at its base by a small turquoise watercolor splash of sea.
Reference images: the two provided game UI reference screenshots define the desired friendly handpainted cartoon art style. Draw only the lighthouse/island art asset, no UI.
Style/medium: polished handpainted casual mobile game illustration, playful chunky proportions, confident soft navy contours, sculpted painted shading, subtle gouache texture, warm sunlit highlights, rich aqua, coral red, cream and grass green.
Composition/framing: single centered full lighthouse, three-quarter view, compact upright silhouette, entire small island visible; approximately square composition with transparent breathing room around the silhouette. Crisp readable shapes at small UI size.
Lighting/mood: joyful bright summer harbor, lantern glows warm yellow.
Text: none.
Constraints: genuinely transparent background with real alpha channel; no sky rectangle, no opaque background, no checkered pattern, no card border, no text, no letters, no badges, no other buildings, no large sea scene. Retain light watercolor foam and a few small waves attached to the base of the island only.
```

Output: `assets/lighthouse.png`. The original is retained in the Codex generated images directory.

## sea-background.png

Used as: a separate scenic background for live item previews and modal playground. All text and interface elements are independent DOM elements.

Exact generation prompt:

```text
Use case: stylized-concept
Asset type: landscape background painting for reusable nautical game item preview cards.
Primary request: A wide simple joyful turquoise summer ocean backdrop, warm pale blue sky above, a low soft silhouette of a small green rocky island far in the distance toward the right. Soft cumulus clouds near the horizon. At the bottom gentle turquoise waves and a few pale foam strokes.
Style/medium: friendly handpainted casual mobile game illustration, bright soft gouache, chunky rounded cloud shapes, subtle painterly texture, rich aqua ocean, powder blue sky, warm ivory cloud highlights, cheerful polished game art.
Composition/framing: landscape 3:2. Horizon at roughly 60 percent from top. Plenty of clean uncluttered sky and sea space in center for a separate item illustration to be overlaid. A background environment only.
Constraints: no lighthouse, no building, no boat, no focal object, no birds, no text, no UI, no labels, no borders, no logo, no shadows from invisible objects. Opaque full-bleed painting.
```

Output: `assets/sea-background.png`. The original is retained in the Codex generated images directory.

## harbor-background.png

Mode: built-in ImageGen edit; edit target `1.png`. The existing harbor background was retained and the areas covered by UI were reconstructed. No UI is baked into this artwork.

Exact edit prompt:

```text
Use case: precise-object-edit
Asset type: game harbor background, exact reference restoration, landscape.
Edit target: provided image 1.png. This is the original game artwork; preserve its background style, palette, perspective, and composition.
Primary request: Remove ALL user interface from the image and reconstruct the original harbor scenery behind the removed overlays. Remove the entire large upper ACHIEVEMENTS panel including frame, text, rows, buttons and header lighthouse; remove the entire bottom LIGHTHOUSES & EQUIPMENT panel including frame, tabs, cards, buttons and miniature foreground lighthouses. Nothing from the user interface may remain.
Keep unchanged: the visible large softly blurred red-and-cream lighthouse at upper left, its grassy rocky island at left, sunny bright cyan sky and big soft white clouds, blue ocean horizon, golden wooden dock perspective across the foreground, dock timber posts, rope, right red-and-white lifebuoy, lower-left blue crate and wooden crates, and existing green foliage. Preserve their exact positions, colors, gentle depth-of-field blur, and original friendly handpainted cartoon mobile-game style.
Reconstruct only the areas previously hidden by the two huge panels, making continuous plausible sky, ocean, island shore, and golden dock boards that connect seamlessly to the already visible scenery. The left background lighthouse must stay distant and softly blurred, not become large or centered.
Composition: retain the original image's landscape aspect ratio and camera angle. Full-bleed background, no framing.
Text: none.
Avoid: all UI, panels, buttons, title banners, typography, icons, foreground hero lighthouse, new major objects, altered camera, realistic photographic textures.
```

Output: `assets/harbor-background.png`.

## Original artwork sprites

The original icon and portrait assets in `assets/sprites/` are mechanical Pillow crops of user-provided `1.png` and `2.png`, explicitly requested to preserve exact source artwork. These direct crops use no image generation. Coordinates, pixel sizes, and any preprocessing exceptions are recorded per item in `assets/sprites/manifest.json`. The three edited wide lighthouse backgrounds are documented separately below.

## Wide lighthouse artwork without rarity badges

The three `assets/sprites/harbor-art.png`, `classic-art.png`, and `frost-art.png` are crops of a built-in ImageGen edit of `1.png`. The edit removes the three baked-in rarity badges so the card can use real DOM badges and live text. No card text or controls are included in the final artwork crops.

Exact edit prompt:

```text
Use case: precise-object-edit
Edit target: provided original 1.png screenshot.
Primary request: Remove ONLY the three small rarity label pills in the upper-left corners of the three lighthouse illustration thumbnails along the bottom of the image: the gray COMMON pill inside the first Harbor lighthouse thumbnail, the gray COMMON pill inside the middle Classic lighthouse thumbnail, and the green UNCOMMON pill inside the right Frost lighthouse thumbnail.
The three pills occupy approximately source rectangles [399,759,510,798], [752,759,861,798], and [1110,755,1246,797] in this 1528×1029 image.
Replace those three pill areas only with matching clean light-blue sky from the illustrated thumbnail background. Preserve all the existing artwork within each thumbnail exactly: the towers, roofs, rocks, little islands, ocean waves, clouds, white birds, colors, painterly outlines, framing and original pixel positions.
ABSOLUTE INVARIANTS: Keep every other part of the full original screenshot unchanged, including all other interface panels, titles, text, buttons, achievement rows, frames, and background. Do not redraw or restyle the lighthouse illustrations. Do not change the image size, crop, or aspect ratio. This is only a removal of three tiny rarity badges.
No new text or objects.
```

## header-brush.png

Mode: built-in ImageGen edit using `1.png` as the visual source, extracting/reconstructing the blank blue watercolor title underlay. The output has real RGBA transparency. Transparent margins were mechanically cropped with original alpha values preserved. The crop excludes distant near-invisible generation specks (alpha at most 8).

Exact edit prompt:

```text
Use case: background-extraction
Asset type: one isolated transparent handpainted watercolor header brush stroke for a game UI, intended for three-slice scalable rendering.
Input image: 1.png is the exact visual reference. Focus on the large blue paint stroke directly behind the top ACHIEVEMENTS title.
Primary request: Extract and faithfully reconstruct that single blue watercolor title underlay as its own blank transparent artwork. Remove all text, lighthouse artwork, white seagulls, white panel, blue panel border, landscape background, and every other interface element. Reconstruct continuous blue painted pigment where the removed letters and objects were.
Shape: one broad left-to-right horizontal blue watercolor swipe about 6 times as wide as it is tall, softly rounded somewhat irregular left cap, very slightly rising upper edge, lobed and torn pointed right end with a few broad brush-tip protrusions. Match the reference's confident casual-game brush silhouette; do not turn it into a perfect rounded rectangle. Keep a good broad solid continuous central blue area for white heading text.
Paint: bright azure and cobalt blue, uneven opaque gouache/watercolor pigment in a few broad overlapping strokes and patches, irregular edges and a small few pale cyan pigment flecks inside. Preserve the reference's handpainted flat-color texture and playful chunky shapes. No silky gradient, no airbrush glow, no realistic wet ink, no paper texture.
Composition: only one wide blue header brush, centered with transparent margin. No shadows around the brush. It will sit over independently rendered cream game panels.
Text: none.
Constraints: genuinely transparent background with alpha; no white background, no checkerboard, no icon, no birds, no letters, no border, no lighthouse, no panel. Avoid disconnected splatters far away from the brush; keep the whole shape compact.
```

Output: `assets/header-brush.png`; optional convenience slices `header-brush-left.png`, `header-brush-middle.png`, `header-brush-right.png`. Full slice coordinates and a CSS border-image example are recorded in `assets/header-brush.slices.json`. Scale the two caps proportionally to height; stretch only the middle horizontally so titles remain fully live text and edge shapes retain their proportions.
