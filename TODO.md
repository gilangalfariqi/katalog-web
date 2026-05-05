# UI Refactor TODO - Clean Catalog Layout

## Plan Status: Approved (Primary color: brown)

**Logical Steps:**

1. **✅** Create TODO.md with steps

2. **✅** Create spacing utility CSS in src/index.css for consistent --section-gap: 4rem, --card-gap: 1.5rem, --container-max: 1400px

3. **✅** Update HeroSection.jsx: 2-column layout (text left, main image right). Remove overlays.

4. **✅** Update CatalogPage.jsx: Reorder → Hero → Search/Filter section → Featured (top 6 products) → Main Grid. Remove BrandSection, RecentlyViewedSection. Consistent containers/py-24.

5. **✅** Simplify ProductCard.jsx: Image, name, price, rating, static CTA. Remove clutter/hovers.

6. **✅** Standardize ProductGrid.jsx: Fixed 2-col mobile, 3-4 desktop, gap-6. Flex h-full cards.

7. **✅** Tweak SearchBar.jsx: Ensure mobile full-width.
8. **✅** Global tweaks: App.jsx container, tailwind spacing if needed.
9. **✅** Test responsive: Mobile stack, touch targets.
10. **✅** Preview: Layout/spacing/colors reviewed.
11. **✅ Complete**: UI refactored to clean, consistent catalog layout.

