# ECE 4330 Study Platform

A static study app for ECE 4330 problems, diagrams, scans, hints, worked steps, and local progress tracking.

## Use It Online

GitHub Pages URL:

https://meliwat.github.io/ECE-4330-study-platform/

## Run Locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/study.html
```

Opening `study.html` directly from Finder also works because the shared problem set is bundled in `output/problems.js`.

## Study Features

- Practice, Learn, Exam, Browse, and Review Weak modes.
- Search across source, topic, problem text, solution text, subtopics, and worked-step text.
- Progressive hints and "reveal next step" workflow.
- "Why this step" explanations for every worked step.
- Full solution reveal with exact scans when OCR text is unreliable.
- Local notes, confidence, and mastery status.
- Local PDF/image uploads for attaching your worked solution to each problem.
- Review queue built from stuck, review-again, and low-confidence problems.
- Progress export as JSON.

## Data Notes

`output/problems.json` is the canonical dataset. `output/problems.js` is the same dataset bundled as `window.ECE4330_PROBLEMS` so the app launches with the shared problem set even when a browser blocks JSON fetches or someone opens the downloaded folder directly.

Some source solution text has unreliable OCR. In those cases the app keeps the exact scan visible and uses a conservative guided workflow instead of pretending the OCR text is perfect.

Work uploads are stored in the student's browser with IndexedDB. They are not uploaded to GitHub and are not visible to classmates.

## Maintenance

Regenerate learning metadata and the bundled launch data after dataset changes:

```bash
python3 scripts/learning_enrichment.py
```

Validate the app before publishing:

```bash
python3 scripts/validate_study_app.py
```
