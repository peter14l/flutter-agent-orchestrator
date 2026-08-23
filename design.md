# Design System & UI/UX Specification: PulseFit

## 1. Visual Theme & Color Palette
- **Brand Palette Concept**: OLED Pitch Black & Neon Emerald
- **Design Language**: Modern Material Design 3 (M3)
- **Surface Elevation**: Tonal elevation using `surfaceContainer`, `surfaceContainerHighest`, and subtle hairline borders (`outlineVariant.withValues(alpha: 0.3)`).

## 2. Typography Scale
- **Display / Headlines**: Bold geometric font (e.g. Plus Jakarta Sans / Inter), tracking -0.5px.
- **Body / Subtitles**: High-legibility sans-serif with 1.45 line-height for comfortable reading.
- **Monospace / Numbers**: Tabular figures for financial and metric data displays.

## 3. Navigation & Screen Ergonomics
- **Structure**: Bottom Navigation with Floating Action Center
- **Spatial Rhythm**: Strict 8-point spatial rhythm (4dp micro, 8dp standard, 16dp medium, 24dp screen gutters).
- **Interactive Tap Targets**: Minimum 48×48dp bounding boxes for all clickable elements.

## 4. Motion & Micro-Interactions
- **Entry Animations**: Staggered slide + fade (250–350ms with `Curves.easeOutCubic`).
- **Interactive Feedback**: Haptic feedback on primary button taps and pull-to-refresh.
