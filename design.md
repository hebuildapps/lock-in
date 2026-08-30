# ui-design

## Design System & Taste Guidelines

This document outlines the core visual identity, design tokens, button hierarchy, selector mechanics, layout rules, and component patterns of this product. Use these principles to reproduce this exact aesthetic and design sense across other projects.

---

### 1. Brand Essence & Visual Character

- **Aesthetic**: flocii — Deep Work Protocol & Editorial Technical Utility. Blends academic precision (Lora serifs, mathematical LaTeX-style touches) with modern engineering polish (Lexend, Geist / JetBrains monospace, tactile rounded surfaces, beveled metallic cockpit frames) and high-energy focus accents.
- **Palette**: Pure obsidian/black background with video hero in top frame; warm white `#ffffff` and subtle slate `#f8fafc` below the gradient; vibrant brand orange (`#f85121` / `#ff5722`) as the signature anchor accent.

---

### 2. Core Color System & Tokens

#### Light Theme / Content Surface (Clean Replit White & Pastel Accents)
- **Background (`--background`)**: `#FFFFFF` / `oklch(1 0 0)`
- **Foreground (`--foreground`)**: `#0F172A` (deep charcoal navy ink, high legibility)
- **Card Surface (`--card`)**: `#F8FAFC` / `#FFFFFF`
- **Muted Surface (`--muted`)**: `#F1F5F9`
- **Border (`--border`)**: `#E2E8F0` (clean, restrained slate line)
- **Muted Text (`--muted-foreground`)**: `#64748B` / `#475569`
- **Primary / Brand Orange (`--primary`)**: `#F85121` (vibrant focal orange)
- **Replit Orange Section**: `#F85121` background with crisp `#FFFFFF` text and beveled silver metallic frames.

#### Dark / Hero Theme (Obsidian & Video Canvas)
- **Background (`--background`)**: `#000000` / `#0B1419`
- **Foreground (`--foreground`)**: `#FFFFFF` (crisp white)
- **Card Surface (`--card`)**: `#080D14` (deep recessed cockpit)
- **Border (`--border`)**: `rgba(255, 255, 255, 0.1)`
- **Muted Text (`--muted-foreground`)**: `#94A3B8`
- **Primary Accent (`--primary`)**: `#F85121`
- **Metallic Bevel Gradient**: `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(185,195,205,0.7) 30%, rgba(240,245,250,0.9) 60%, rgba(140,155,170,0.6) 100%)`

---

### 3. Typography Architecture

- **Default UI / Sans**: `Lexend` (`--font-lexend`), ui-sans-serif, system-ui. Friendly, highly legible geometric sans.
- **Editorial / Serifs**: `Lora` (`--font-lora`) / `EB Garamond`. Used for hero headings on public utility pages (Report, Terms, Inspector, Blog) and academic touchpoints.
- **Technical / Monospace**: `Geist Mono` (`--font-geist-mono`) & `JetBrains Mono`. Used for hero copy, code badges, timestamps, slugs, and terminal accents.
- **Display Accents**:
  - `Grenze` (dramatically stylized serif brand glyph)
  - `Silkscreen` / `Press Start 2P` (subtle pixel / design flair)
  - `Caveat` (organic, playful creator moments)

---

### 4. Buttons & Interactive Controls Hierarchy

| Button Type | Styling & Behavior | Use Cases |
| :--- | :--- | :--- |
| **Default Action Button (`.btn-default`)** | Solid muted background (`--muted-foreground` in light, `hsl(60.01 7.32% 91.95% / 0.902)` white-ivory in dark), no outer outline, dark text in dark mode. Compact padding (`px-2.5 py-1.5`, `text-[10px] font-semibold`). | Primary actions: Save, Publish / Unpublish, Create Project, dialog confirmations. |
| **Ghost Button (`.btn-ghost`)** | Transparent background, subtle border (`border-border`), muted text that transitions to foreground on hover (`text-muted-foreground hover:text-foreground`). | Secondary / additive actions: "+ Add Link", "Cancel", toolbar toggles. |
| **Primary Pill Button (`.btn-primary`)** | Rounded-full or rounded-xl, deep botanical green (`#2d5a3d` / `#3D6F12`) or solid foreground, high contrast text. | Public CTAs: "Get Started", "Claim Link", "Sign Up". |
| **Destructive Button** | Solid red / destructive background (`--destructive`) with light text. Never use muted-foreground for destructive actions. | Delete project, remove link, revoke credentials. |

---

### 5. Special Selectors, Handles & Segmented Controls

#### A. The Word-Selector Highlight Handle (Signature Hero Pattern)
- A text highlight block rendered as an active editorial text selection.
- **Container**: `relative inline-block bg-[#8dfe7a]/50 px-2 py-1 text-foreground rounded-sm`.
- **Left Pin Handle**: An absolute bar `w-[2.5px] bg-[#3D6F12]` with a top circular dot `w-3.5 h-3.5 rounded-full bg-[#3D6F12] -top-[10px] -left-[5.5px]`.
- **Right Pin Handle**: An absolute bar `w-[2.5px] bg-[#3D6F12]` with a bottom circular dot `w-3.5 h-3.5 rounded-full bg-[#3D6F12] -bottom-[10px] -right-[5.5px]`.

#### B. Segmented Capsule Pill Bar
- An inline segmented pill combining status indicators and action items in one continuous strip.
- **Outer Shell**: `rounded-2xl sm:rounded-full border border-border bg-card/60 p-1.5 shadow-sm backdrop-blur`.
- **Items**: Horizontal flex row separated by thin vertical dividers (`h-4 w-px bg-border/60`).
- **Icons**: Phosphor-style filled SVGs or lightweight duotone icons (`18px`–`20px`) with high contrast.

#### C. Custom Dropdowns & Form Selectors (No Native `<select>`)
- Never use native browser `<select>` elements.
- **Custom Dropdown Pattern**:
  - Closed trigger: `rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm` with a right chevron rotating `180deg` on open.
  - Floating popover: `absolute top-full mt-1.5 z-50 rounded-xl border border-border bg-card p-1 shadow-lg backdrop-blur`.
  - Selected item: Subdued background highlight (`bg-secondary`), checkmark icon (`w-3 h-3`) on right.

#### D. Segmented Tab Switcher (Theme & Link-Type Selectors)
- Grid or flex track with clear active pill state.
- In dark mode, active tab **must** have clear contrast against the track (using `bg-secondary` or `border-foreground/30 ring-1 ring-foreground/15`), never blending into the background.

---

### 6. App Shell & Layout Rules

1. **Dashboard Shell**:
   - Fixed left sidebar navigation (no top header).
   - Sticky bottom account button with user avatar, name, and email chip.
   - Spacious right-hand content viewport wrapped in a rounded bordered container with soft backdrop-blur and subtle layered surfaces.
2. **Public Page Layout**:
   - Master container is compact (~`720px` max width) centered horizontally and vertically in the viewport.
   - Hero consists of a small categoric pill (`Safety`, `Inspector`, `Terms`) sitting above a serif heading (`Lora`/`EB Garamond`) and muted subhead, placed directly on the page background.
   - The interactive content (form, terms list, bento grid) is enclosed in an `overflow-hidden rounded-3xl border border-border bg-card` surface.
3. **Bento Tile Geometry**:
   - Pure width-derived square track math: `track = floor((width - gap * (cols - 1)) / cols)`.
   - Fixed 10px grid gaps (`gap-2.5`).
   - `1x1` (small square), `2x1` (half banner), `2x2` (large square preview), `4x1` (full width row).
   - Social posts (X, LinkedIn) must **always** remain square tiles, never pill-shaped.
   - Dark theme tiles keep light icon wells with dark SVG outlines to preserve instant recognition.

---

### 7. Core Rules & Guidelines

- **Keep changes minimal and scoped**: Never redesign or replace icon sets or component layouts wholesale unless explicitly requested.
- **Icon Aesthetic**: Prefer Phosphor-style single filled-path SVGs (`viewBox="0 0 256 256"`, `fill="currentColor"`, with negative space cutouts) or Lucide icons matching the app's established weight.
- **No Placeholders**: Never use generic placeholders; use authentic typography, Dicebear pixelbot avatars, or generated artwork.

---

### 8. Blog & Marketing Page Patterns

- **Navbar group dropdowns**: Secondary destinations collapse into hover dropdowns under a parent label (Tools → Inspector / Report tool; AI → Claude Code). Trigger is a pill button with a ChevronDown that rotates 180° on hover; the menu opens through an invisible padded bridge wrapper (`top-full pt-2`, revealed via `group-hover` / `group-focus-within`) so cursor travel doesn't close it; items are rounded-xl rows showing a medium-weight label plus a muted one-line hint, with the active child highlighted `bg-secondary`. Mobile menu renders the same groups as uppercase tracked section labels above plain links. Confidence: 0.6
- **Terminal snapshots**: Technical blog content uses a shared `TerminalSnapshot` component (`src/components/blog/terminal.tsx`): near-black (`#0b0b0c`) rounded-xl window with macOS traffic lights (`#ff5f57` / `#febc2e` / `#28c840`), optional mono title in the title bar, ~12.5px mono body with tone classes (cmd `# ui-design

## Design System & Taste Guidelines

This document outlines the core visual identity, design tokens, button hierarchy, selector mechanics, layout rules, and component patterns of this product. Use these principles to reproduce this exact aesthetic and design sense across other projects.

---

### 1. Brand Essence & Visual Character

- **Aesthetic**: Premium editorial and technical utility. Blends academic precision (serifs, mathematical LaTeX-style touches) with modern engineering polish (Geist / JetBrains monospace, tactile rounded surfaces, restrained border geometry) and tasteful creator warmth.
- **Palette**: Warm parchment paper background in light mode; muted slate/teal-charcoal in dark mode; deep botanical olive-green (`#3D6F12` / `#2d5a3d`) as the signature anchor accent.

---

### 2. Core Color System & Tokens

#### Light Theme (Warm Paper / Editorial)
- **Background (`--background`)**: `hsl(22 100% 98%)` / `#FAF6F0` (warm off-white / parchment)
- **Foreground (`--foreground`)**: `hsl(35 100% 8%)` / `#291D00` (deep warm ink, never pure `#000000`)
- **Card Surface (`--card`)**: `hsl(22 60% 96%)` / `#F8F3ED`
- **Muted Surface (`--card-muted`, `--muted`)**: `hsl(54 15% 92%)`
- **Subtle Surface (`--card-subtle`)**: `hsl(54 15% 88%)`
- **Border (`--border`)**: `hsl(54 15% 75%)` (restrained, warm slate-tan)
- **Muted Text (`--muted-foreground`)**: `hsl(35 30% 40%)`
- **Primary / Brand Green**: `#3D6F12` / `#2d5a3d` (deep botanical olive green)
- **Highlight Pill / Selector Glow**: `#8dfe7a` at 50% opacity, with `#3D6F12` pin handles.

#### Dark Theme (Slate Obsidian)
- **Background (`--background`)**: `hsl(180.06 8.12% 12.02%)` / `#1B2222`
- **Foreground (`--foreground`)**: `hsl(30 3% 76%)` / `#C5C2BF` (soft warm ivory)
- **Card Surface (`--card`)**: `hsl(180 8% 22%)` / `#333D3D`
- **Border (`--border`)**: `hsl(180 8% 30%)`
- **Muted Text (`--muted-foreground`)**: `hsl(30 3% 55%)`
- **Primary Accent (`--primary`)**: `hsl(30 3% 76%)`
- **Brand Green in Dark**: `#3D6F12` / `#5fa51f`

---

### 3. Typography Architecture

- **Default UI / Sans**: `Lexend` (`--font-lexend`), ui-sans-serif, system-ui. Friendly, highly legible geometric sans.
- **Editorial / Serifs**: `Lora` (`--font-lora`) / `EB Garamond`. Used for hero headings on public utility pages (Report, Terms, Inspector, Blog) and academic touchpoints.
- **Technical / Monospace**: `Geist Mono` (`--font-geist-mono`) & `JetBrains Mono`. Used for hero copy, code badges, timestamps, slugs, and terminal accents.
- **Display Accents**:
  - `Grenze` (dramatically stylized serif brand glyph)
  - `Silkscreen` / `Press Start 2P` (subtle pixel / design flair)
  - `Caveat` (organic, playful creator moments)

---

### 4. Buttons & Interactive Controls Hierarchy

| Button Type | Styling & Behavior | Use Cases |
| :--- | :--- | :--- |
| **Default Action Button (`.btn-default`)** | Solid muted background (`--muted-foreground` in light, `hsl(60.01 7.32% 91.95% / 0.902)` white-ivory in dark), no outer outline, dark text in dark mode. Compact padding (`px-2.5 py-1.5`, `text-[10px] font-semibold`). | Primary actions: Save, Publish / Unpublish, Create Project, dialog confirmations. |
| **Ghost Button (`.btn-ghost`)** | Transparent background, subtle border (`border-border`), muted text that transitions to foreground on hover (`text-muted-foreground hover:text-foreground`). | Secondary / additive actions: "+ Add Link", "Cancel", toolbar toggles. |
| **Primary Pill Button (`.btn-primary`)** | Rounded-full or rounded-xl, deep botanical green (`#2d5a3d` / `#3D6F12`) or solid foreground, high contrast text. | Public CTAs: "Get Started", "Claim Link", "Sign Up". |
| **Destructive Button** | Solid red / destructive background (`--destructive`) with light text. Never use muted-foreground for destructive actions. | Delete project, remove link, revoke credentials. |

---

### 5. Special Selectors, Handles & Segmented Controls

#### A. The Word-Selector Highlight Handle (Signature Hero Pattern)
- A text highlight block rendered as an active editorial text selection.
- **Container**: `relative inline-block bg-[#8dfe7a]/50 px-2 py-1 text-foreground rounded-sm`.
- **Left Pin Handle**: An absolute bar `w-[2.5px] bg-[#3D6F12]` with a top circular dot `w-3.5 h-3.5 rounded-full bg-[#3D6F12] -top-[10px] -left-[5.5px]`.
- **Right Pin Handle**: An absolute bar `w-[2.5px] bg-[#3D6F12]` with a bottom circular dot `w-3.5 h-3.5 rounded-full bg-[#3D6F12] -bottom-[10px] -right-[5.5px]`.

#### B. Segmented Capsule Pill Bar
- An inline segmented pill combining status indicators and action items in one continuous strip.
- **Outer Shell**: `rounded-2xl sm:rounded-full border border-border bg-card/60 p-1.5 shadow-sm backdrop-blur`.
- **Items**: Horizontal flex row separated by thin vertical dividers (`h-4 w-px bg-border/60`).
- **Icons**: Phosphor-style filled SVGs or lightweight duotone icons (`18px`–`20px`) with high contrast.

#### C. Custom Dropdowns & Form Selectors (No Native `<select>`)
- Never use native browser `<select>` elements.
- **Custom Dropdown Pattern**:
  - Closed trigger: `rounded-xl border border-border bg-background/60 px-3.5 py-2.5 text-sm` with a right chevron rotating `180deg` on open.
  - Floating popover: `absolute top-full mt-1.5 z-50 rounded-xl border border-border bg-card p-1 shadow-lg backdrop-blur`.
  - Selected item: Subdued background highlight (`bg-secondary`), checkmark icon (`w-3 h-3`) on right.

#### D. Segmented Tab Switcher (Theme & Link-Type Selectors)
- Grid or flex track with clear active pill state.
- In dark mode, active tab **must** have clear contrast against the track (using `bg-secondary` or `border-foreground/30 ring-1 ring-foreground/15`), never blending into the background.

---

### 6. App Shell & Layout Rules

1. **Dashboard Shell**:
   - Fixed left sidebar navigation (no top header).
   - Sticky bottom account button with user avatar, name, and email chip.
   - Spacious right-hand content viewport wrapped in a rounded bordered container with soft backdrop-blur and subtle layered surfaces.
2. **Public Page Layout**:
   - Master container is compact (~`720px` max width) centered horizontally and vertically in the viewport.
   - Hero consists of a small categoric pill (`Safety`, `Inspector`, `Terms`) sitting above a serif heading (`Lora`/`EB Garamond`) and muted subhead, placed directly on the page background.
   - The interactive content (form, terms list, bento grid) is enclosed in an `overflow-hidden rounded-3xl border border-border bg-card` surface.
3. **Bento Tile Geometry**:
   - Pure width-derived square track math: `track = floor((width - gap * (cols - 1)) / cols)`.
   - Fixed 10px grid gaps (`gap-2.5`).
   - `1x1` (small square), `2x1` (half banner), `2x2` (large square preview), `4x1` (full width row).
   - Social posts (X, LinkedIn) must **always** remain square tiles, never pill-shaped.
   - Dark theme tiles keep light icon wells with dark SVG outlines to preserve instant recognition.

---

### 7. Core Rules & Guidelines

- **Keep changes minimal and scoped**: Never redesign or replace icon sets or component layouts wholesale unless explicitly requested.
- **Icon Aesthetic**: Prefer Phosphor-style single filled-path SVGs (`viewBox="0 0 256 256"`, `fill="currentColor"`, with negative space cutouts) or Lucide icons matching the app's established weight.
 = emerald prompt + zinc text, user `>` = sky-300, out = zinc-400, ok = emerald-400, warn = amber-400, dim = zinc-600), horizontally scrollable long lines, and a dim centered mono caption below. Confidence: 0.6
- **Always-dark pages**: Pages whose reference design is inherently dark (e.g. the MCP × Claude Code post) pin the dark palette regardless of the site's light/dark toggle via a `.force-dark` class aliased beside `.dark` in globals.css — wrap the page subtree in it instead of fighting the theme provider. Confidence: 0.6
