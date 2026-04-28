# ECE 4330 problem drill

## Goal
Provide a clean browser-based study platform for ECE 4330 problems, solutions, diagrams, guided hints, step-by-step work, and local mastery tracking.

## Entrypoint
Serve the folder and open `index.html` or `study.html`.

## How To Run
Run `py -3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Current Constraints
- The source PDFs still live under `02 Projects/Schoolwork/Linear Material`.
- `output/problems.json` is the canonical dataset used by the site.
- `output/problems.js` is the bundled launch dataset for GitHub Pages and direct file opens.
- Any data repair should preserve the current UI contract: `source`, `topic`, `problem`, `has_solution`, `solution`, `images`, `solution_images`, and generated `learning` metadata.
- After changing `output/problems.json`, run `python3 scripts/learning_enrichment.py` and `python3 scripts/validate_study_app.py`.
