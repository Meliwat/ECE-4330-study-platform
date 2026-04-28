# ECE 4330 Study Platform Design

Autopilot note: the user explicitly requested autonomous end-to-end execution, so the normal brainstorming approval gate is treated as pre-authorized.

## Goal
Turn the existing static problem drill into a shareable GitHub Pages study platform that helps students attempt problems, reveal hints and worked steps gradually, understand why each step is done, track mastery locally, and review weak areas.

## Approach
Use a dependency-light static app hosted from the repository root. Keep `output/problems.json` as the source of truth, enrich every problem with generated learning metadata, and make the UI progressively disclose hints, steps, explanations, scans, and full solutions.

## User Experience
- Default to attempt-first study: show the problem, workspace, mastery controls, and hint/step buttons before the full answer.
- Support Learn, Practice, Exam, Browse, and Review Weak modes.
- Add search across source, topic, problem, solution, subtopics, and generated learning text.
- Store local progress, confidence, difficulty, notes, and step reveal state in `localStorage`.
- Keep solution scans available for accuracy when OCR text is poor.

## Data
Each problem receives:
- stable `id`
- `subtopics`
- `difficulty`
- `learning.given`
- `learning.goal`
- `learning.concept`
- `learning.hints`
- `learning.steps[]` with `work` and `why`
- `learning.final_answer`
- `learning.check`
- `learning.common_mistake`
- `learning.needs_review`

Generated step explanations are conservative and based on the existing solution text. Records flagged with poor OCR keep that warning and link back to the exact scan.

## Deployment
Publish the existing public GitHub repository through GitHub Pages from `master` and `/`. Fix asset URLs so images load under a GitHub Pages project path, not only at localhost root.

## Verification
- Validate JSON schema and local image paths.
- Serve locally with `python3 -m http.server 8000`.
- Use a browser check against `http://localhost:8000/study.html`.
- Confirm GitHub repository visibility and Pages status after push.
