# ECE 4330 Study Platform

A static study app for ECE 4330 problems, diagrams, scans, hints, worked steps, and local progress tracking.

## Use It Online

GitHub Pages URL:

https://trale-77.github.io/ECE-4330-problem-drill/

## Run Locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/study.html
```

Opening `study.html` directly from Finder will not load `output/problems.json` because browsers block local `fetch()` calls.

## Study Features

- Practice, Learn, Exam, Browse, and Review Weak modes.
- Search across source, topic, problem text, solution text, subtopics, and worked-step text.
- Progressive hints and "reveal next step" workflow.
- "Why this step" explanations for every worked step.
- Full solution reveal with exact scans when OCR text is unreliable.
- Local notes, confidence, felt difficulty, and mastery status.
- Review queue built from stuck, review-again, low-confidence, and hard problems.
- Progress export as JSON.

## Data Notes

`output/problems.json` is the live dataset. Every record has generated `learning` metadata, including hints, worked steps, why explanations, checks, common mistakes, difficulty, and subtopics.

Some source solution text is marked scan-backed because OCR extraction is unreliable. In those cases the app keeps the exact scan visible and uses a conservative guided workflow instead of pretending the OCR text is perfect.

## Maintenance

Regenerate learning metadata after dataset changes:

```bash
python3 scripts/learning_enrichment.py
```

Validate the app before publishing:

```bash
python3 scripts/validate_study_app.py
```
