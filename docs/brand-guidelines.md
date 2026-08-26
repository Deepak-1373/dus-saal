# Dus Saal — brand guidelines

## Where the brand actually lives

This file does **not** redefine colour, type or spacing. Those have one source of truth each, and duplicating them here would create a second one that silently drifts:

| What | Source of truth |
|---|---|
| Colour, type scale, spacing, radii | `dus-saal-design-system.html` → implemented in `tailwind.config.js` |
| Voice, prohibitions, hard constraints | `CLAUDE.md` and `dus-saal-build-plan.html` |
| Screen-by-screen layout | `dus-saal-design-system.html` (rendered at 360px) |

What follows is only the part no existing document covers: **the mark**.

## The mark

The logo is the product. It is the ten-year ledger reduced to three slots:

- **Slot one, filled** — years that count.
- **Slot two, part-filled** — a year partly counted.
- **Slot three, outlined** — years still ahead.

That is the entire argument of the app in one shape: a measure that is not full, and a reason it isn't. It is not decoration and should not be replaced with an abstract glyph, a rupee symbol, a shield, or a tick.

**Files**

| File | Use |
|---|---|
| `public/favicon.svg` | Browser tab. Static, hard-coded hex. |
| `src/components/BrandMark.tsx` | In-app. Uses Tailwind token classes, so it follows the theme. |

The two must stay visually identical. The favicon cannot use token classes because it is served as a static file outside the bundle — that is the only reason the hex is repeated, and it is the one place a raw hex is allowed.

## Construction

Built on a 32×32 grid. Indigo tile at `rx 7`. Three slots 6 wide, 16 tall, `rx 1.5`, at x = 6, 14, 22, all `y 8`.

Fills are `counted-bg` `#E8F0EB` rather than `counted` green — green on indigo goes muddy below 24px, and the tab icon has to survive at 16.

## Sizes and clear space

- **Minimum 16px.** Below that the third slot stops reading and the mark becomes a blue square.
- **24px in the app header**, paired with the wordmark at `body-l` / 800.
- **Clear space** on all sides equals one slot width (6/32 of the mark). Never crowd it against text.

## Pairing with the wordmark

"Dus Saal" is set in Anek Latin 800, `tracking-tight`, in `ink`. The mark sits to its left with a `gap-2`. The mark may appear alone; the wordmark may appear alone. Do not restack them vertically or letterspace the wordmark.

## Never

These are not stylistic preferences — the first four are project rules and breaking them puts the submission at risk.

- No saffron, white and green together, in any arrangement.
- No Ashoka Chakra, national emblem, ministry mark, or `.gov.in` visual language.
- Nothing that implies official status, endorsement, or a connection to EPFO.
- No real UANs, member IDs or personal data rendered as decoration.
- Do not recolour the tile outside `indigo`. Do not add a gradient, bevel, or shadow — the design system is borders-over-shadows throughout.
- Do not animate the mark. The ledger fill on the verdict screen is the only animation in the app.

## Voice, in one line

Write from the user's side of the screen: they are worried about their pension and may not be confident with digital services. Plain words first, EPFO's vocabulary only in parentheses afterwards so they can search for it later. Full guidance in `CLAUDE.md`.
