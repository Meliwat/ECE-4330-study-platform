import json
import re
from collections import defaultdict
from pathlib import Path

from solution_asset_alignment import solution_asset_identity, solution_identity_from_source


PROJECT_DIR = Path(__file__).resolve().parent.parent
PROBLEMS_PATH = PROJECT_DIR / "output" / "problems.json"
PROBLEMS_JS_PATH = PROJECT_DIR / "output" / "problems.js"
STUDY_PATH = PROJECT_DIR / "study.html"
INDEX_PATH = PROJECT_DIR / "index.html"


REQUIRED_PROBLEM_KEYS = {
    "id",
    "source",
    "topic",
    "problem",
    "has_solution",
    "solution",
    "images",
    "solution_images",
    "learning",
}

REQUIRED_LEARNING_KEYS = {
    "given",
    "goal",
    "concept",
    "hints",
    "steps",
    "final_answer",
    "check",
    "common_mistake",
    "needs_review",
}


def assert_file(path: Path) -> None:
    if not path.exists():
        raise AssertionError(f"Missing file: {path.relative_to(PROJECT_DIR)}")


def validate_problem(record: dict, index: int, ids: set) -> None:
    missing = REQUIRED_PROBLEM_KEYS - set(record)
    if missing:
        raise AssertionError(f"Problem {index} missing keys: {sorted(missing)}")
    if record["id"] in ids:
        raise AssertionError(f"Duplicate id: {record['id']}")
    ids.add(record["id"])
    learning = record["learning"]
    missing_learning = REQUIRED_LEARNING_KEYS - set(learning)
    if missing_learning:
        raise AssertionError(f"{record['source']} missing learning keys: {sorted(missing_learning)}")
    if not learning["hints"]:
        raise AssertionError(f"{record['source']} has no hints")
    if not learning["steps"]:
        raise AssertionError(f"{record['source']} has no worked steps")
    if len(learning["steps"]) < 5:
        raise AssertionError(f"{record['source']} should have at least five worked study steps")
    if not learning["steps"][0].get("work", "").startswith("Target:"):
        raise AssertionError(f"{record['source']} should start worked steps with a target")
    if not any(step.get("work", "").startswith("Method:") for step in learning["steps"][:3]):
        raise AssertionError(f"{record['source']} should show a method cue near the start")
    if not learning["steps"][-1].get("work", "").startswith("Check:"):
        raise AssertionError(f"{record['source']} should end worked steps with a check")
    for step in learning["steps"]:
        if not step.get("work") or not step.get("why"):
            raise AssertionError(f"{record['source']} has an incomplete step")


def validate_assets(record: dict) -> None:
    for key in ["images", "solution_images"]:
        for value in record.get(key) or []:
            path = PROJECT_DIR / value
            if not path.exists():
                raise AssertionError(f"{record['source']} references missing asset: {value}")
    for key in ["problem_scan", "solution_scan"]:
        value = record.get(key)
        if value and not (PROJECT_DIR / value).exists():
            raise AssertionError(f"{record['source']} references missing scan: {value}")


def validate_solution_asset_alignment(record: dict) -> None:
    expected = solution_identity_from_source(record["source"])
    for value in record.get("solution_images") or []:
        identity = solution_asset_identity(value)
        if not identity:
            raise AssertionError(f"{record['source']} references a non-solution image as a solution diagram: {value}")
        prefix, number, kind = identity
        if not expected or (prefix, number) != expected:
            raise AssertionError(f"{record['source']} references the wrong solution diagram: {value}")
        if not kind.startswith("img"):
            raise AssertionError(f"{record['source']} should keep full solution scans out of solution_images: {value}")

    scan = record.get("solution_scan")
    if scan:
        identity = solution_asset_identity(scan)
        if not identity:
            raise AssertionError(f"{record['source']} references a non-solution scan as a solution scan: {scan}")
        prefix, number, kind = identity
        if not expected or (prefix, number) != expected:
            raise AssertionError(f"{record['source']} references the wrong solution scan: {scan}")
        if kind not in {"scan", "page"}:
            raise AssertionError(f"{record['source']} uses an embedded image as solution_scan: {scan}")


def validate_unique_solution_assets(records: list) -> None:
    owners = defaultdict(set)
    for record in records:
        for value in record.get("solution_images") or []:
            owners[value].add(record["source"])
        scan = record.get("solution_scan")
        if scan:
            owners[scan].add(record["source"])

    duplicates = {asset: sorted(sources) for asset, sources in owners.items() if len(sources) > 1}
    if duplicates:
        asset, sources = next(iter(sorted(duplicates.items())))
        raise AssertionError(f"Solution asset is attached to multiple problems: {asset} -> {sources}")


def validate_html() -> None:
    study = STUDY_PATH.read_text(encoding="utf-8")
    index = INDEX_PATH.read_text(encoding="utf-8")
    for needle in [
        "output/problems.js",
        "window.ECE4330_PROBLEMS",
        "output/problems.json",
        "localStorage",
        "Reveal next step",
        "Review weak",
        "problem-number-badge",
        "problemSourceParts",
        "Step ${index + 1} of ${steps.length}",
        "applyFilterChange",
        "refreshLearningForFilteredProblems",
        "renderStepList",
        "Worked steps",
    ]:
        if needle not in study:
            raise AssertionError(f"study.html missing expected text: {needle}")
    if "scan-backed" in study:
        raise AssertionError("study.html should not render the scan-backed pill")
    if "Felt like" in study:
        raise AssertionError("study.html should not render the removed Felt like rating")
    for removed in ["Your work", "Attach work", "indexedDB", "notes", "attachment"]:
        if removed in study:
            raise AssertionError(f"study.html should not include user work input: {removed}")
    if re.search(r"return `/\\$\\{cleaned\\}", study):
        raise AssertionError("study.html still appears to use root-relative image URLs")
    if "./study.html" not in index:
        raise AssertionError("index.html should redirect to study.html")


def main() -> None:
    assert_file(PROBLEMS_PATH)
    assert_file(PROBLEMS_JS_PATH)
    assert_file(STUDY_PATH)
    assert_file(INDEX_PATH)
    records = json.loads(PROBLEMS_PATH.read_text(encoding="utf-8"))
    problems_js = PROBLEMS_JS_PATH.read_text(encoding="utf-8")
    if not problems_js.startswith("window.ECE4330_PROBLEMS = "):
        raise AssertionError("output/problems.js does not define window.ECE4330_PROBLEMS")
    embedded = json.loads(problems_js.removeprefix("window.ECE4330_PROBLEMS = ").removesuffix(";\n"))
    if embedded != records:
        raise AssertionError("output/problems.js is not in sync with output/problems.json")
    if len(records) < 150:
        raise AssertionError(f"Expected at least 150 problems, found {len(records)}")
    ids = set()
    for index, record in enumerate(records):
        validate_problem(record, index, ids)
        validate_assets(record)
        validate_solution_asset_alignment(record)
    validate_unique_solution_assets(records)
    validate_html()
    print(f"Validated {len(records)} problems, learning metadata, assets, and study UI.")


if __name__ == "__main__":
    main()
