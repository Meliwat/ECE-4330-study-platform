import re
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple


PROJECT_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_DIR / "output" / "problem_images"

SOLUTION_ASSET_RE = re.compile(r"(?P<prefix>.+)_Solution(?P<number>\d+)_(?P<kind>img\d+|page|scan)\.png$")


@dataclass(frozen=True)
class ExactSolutionAssets:
    images: List[str]
    scan: str


def solution_identity_from_source(source: str) -> Optional[Tuple[str, int]]:
    patterns = [
        (r"^Assignment\s+(\d+)\s+Extra\s+Problem\s+(\d+)$", lambda m: (f"Assignment{m.group(1)}Extra", int(m.group(2)))),
        (r"^Assignment\s+(\d+)\s+Problem\s+(\d+)$", lambda m: (f"Assignment{m.group(1)}", int(m.group(2)))),
        (r"^Exam\s+(\d+)\s+W(\d+)\s+Problem\s+(\d+)$", lambda m: (f"Exam{m.group(1)}W{m.group(2)}", int(m.group(3)))),
        (r"^Final\s+Sample\s+Problem\s+(\d+)$", lambda m: ("FinalSample", int(m.group(1)))),
        (r"^Test\s+(\d+)\s+Sample\s+(\d+)\s+Problem\s+(\d+)$", lambda m: (f"Test{m.group(1)}Sample{m.group(2)}", int(m.group(3)))),
        (r"^Test\s+(\d+)\s+Sample\s+Problem\s+(\d+)$", lambda m: (f"Test{m.group(1)}Sample", int(m.group(2)))),
    ]
    for pattern, build in patterns:
        match = re.match(pattern, source)
        if match:
            return build(match)
    return None


def solution_asset_identity(asset_path: str) -> Optional[Tuple[str, int, str]]:
    name = Path(asset_path).name
    match = SOLUTION_ASSET_RE.match(name)
    if not match:
        return None
    return match.group("prefix"), int(match.group("number")), match.group("kind")


def build_solution_asset_index(images_dir: Path = IMAGES_DIR) -> Dict[Tuple[str, int], Dict[str, List[str]]]:
    index: Dict[Tuple[str, int], Dict[str, List[str]]] = defaultdict(lambda: {"images": [], "scans": []})
    for path in images_dir.glob("*_Solution*_*.png"):
        identity = solution_asset_identity(path.name)
        if not identity:
            continue
        prefix, number, kind = identity
        rel_path = path.relative_to(PROJECT_DIR).as_posix()
        if kind.startswith("img"):
            index[(prefix, number)]["images"].append(rel_path)
        elif kind in {"scan", "page"}:
            index[(prefix, number)]["scans"].append(rel_path)
    for entry in index.values():
        entry["images"].sort(key=asset_sort_key)
        entry["scans"].sort(key=scan_sort_key)
    return index


def asset_sort_key(value: str) -> Tuple[str, int]:
    match = re.search(r"_img(\d+)\.png$", value)
    stem = re.sub(r"_img\d+\.png$", "_img.png", value)
    return stem, int(match.group(1)) if match else 0


def scan_sort_key(value: str) -> Tuple[int, str]:
    # Cropped scans are more likely to contain only the target solution. Full page renders are a fallback.
    return (0 if value.endswith("_scan.png") else 1, value)


def exact_solution_assets(
    source: str, asset_index: Optional[Dict[Tuple[str, int], Dict[str, List[str]]]] = None
) -> ExactSolutionAssets:
    identity = solution_identity_from_source(source)
    if not identity:
        return ExactSolutionAssets(images=[], scan="")
    if asset_index is None:
        asset_index = build_solution_asset_index()
    entry = asset_index.get(identity, {"images": [], "scans": []})
    scans = entry.get("scans") or []
    return ExactSolutionAssets(images=list(entry.get("images") or []), scan=scans[0] if scans else "")


def align_solution_assets(records: Iterable[dict]) -> None:
    asset_index = build_solution_asset_index()
    for record in records:
        assets = exact_solution_assets(record.get("source", ""), asset_index)
        record["solution_images"] = assets.images
        record["solution_scan"] = assets.scan
        record["has_solution"] = bool(str(record.get("solution", "")).strip() or assets.images or assets.scan)
