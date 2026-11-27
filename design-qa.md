# RAJ Defence & Aerospace visual verification

The visual target was the 680 × 1000 homepage panel of the supplied 1536 × 1024 design board at `C:/Users/choud/AppData/Local/Temp/codex-clipboard-000ac414-e701-4d18-bb51-90c99069f6cf.png`.

The desktop comparison used the homepage at its initial scroll position and a 1360 × 2000 CSS pixel viewport. The browser generated a 1345 × 1978 image at `C:/Users/choud/AppData/Local/Temp/raj-desktop-qa.jpg`. The comparison preserves aspect ratio and normalises the two images to a 680-pixel-wide panel. Side-by-side evidence is at `C:/Users/choud/AppData/Local/Temp/raj-comparison.jpg`.

## Findings and corrections

- The first mobile capture showed the following section covering the lower half of the hydrogen panel. Raising the hero stacking context restored the intended overlap. The subsequent desktop capture shows the full subtitle against the olive panel.
- The first full-page comparison caught the systems cards at reduced opacity. Removing opacity from their scroll transition retained the movement and restored the orange panel and white text in the final capture.
- The final comparison shows the same three-line headline, offset checker marker, header divisions, hydrogen panel, two-column introduction, three-part systems grid and footer sequence. The supplied official logo uses a light backing for legibility. Montserrat approximates the reference lettering. Aircraft and industrial scenes are generated interpretations.

## Interaction checks

The in-app browser exercised the product view, configuration selector, contact navigation, required-field validation and video dialogs. Both videos loaded and played. The aircraft overview reported 1920 × 1080 at 15 seconds. The engineering overview advanced beyond five seconds. Browser error logs were empty. Empty-selector animation warnings observed on secondary routes were corrected by testing for rendered targets.

The enquiry form creates an email draft. Partner access directs visitors to the contact team.

final result: passed
