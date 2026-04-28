import hashlib
import shutil
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set, Tuple

from solution_asset_alignment import solution_identity_from_source


PROJECT_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_DIR / "output" / "problem_images"
DIAGRAM_KEYS = ("solution_images",)

MANUAL_DIAGRAM_OVERRIDES = {
    "solution_images": {
        # The source solution page has the plot for Problem 6 and spectra for Problem 7,
        # but the first extraction saved both images under several wrong problem numbers.
        "Final Sample Problem 6": ["output/problem_images/FinalSample_Solution1_img1.png"],
        "Final Sample Problem 7": ["output/problem_images/FinalSample_Solution1_img2.png"],
    }
}


def file_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def asset_kind_for_key(key: str) -> str:
    return "Solution" if key == "solution_images" else "Problem"


def target_asset_path(source: str, key: str, index: int) -> Optional[str]:
    identity = solution_identity_from_source(source)
    if not identity:
        return None
    prefix, number = identity
    filename = f"{prefix}_{asset_kind_for_key(key)}{number}_img{index}.png"
    return (IMAGES_DIR / filename).relative_to(PROJECT_DIR).as_posix()


def copy_manual_asset(source: str, key: str, source_asset: str, index: int) -> Optional[str]:
    target = target_asset_path(source, key, index)
    if not target:
        return None
    src_path = PROJECT_DIR / source_asset
    dst_path = PROJECT_DIR / target
    if not src_path.exists():
        return None
    if src_path.resolve() != dst_path.resolve():
        shutil.copyfile(src_path, dst_path)
    return target


def existing_hash(asset: str) -> Optional[str]:
    path = PROJECT_DIR / asset
    if not path.exists():
        return None
    return file_hash(path)


def apply_manual_overrides(records_by_source: Dict[str, dict]) -> Dict[Tuple[str, str], str]:
    manual_owner: Dict[Tuple[str, str], str] = {}
    for key, source_map in MANUAL_DIAGRAM_OVERRIDES.items():
        for source, source_assets in source_map.items():
            record = records_by_source.get(source)
            if not record:
                continue
            aligned_assets: List[str] = []
            for index, source_asset in enumerate(source_assets, 1):
                target = copy_manual_asset(source, key, source_asset, index)
                if not target:
                    continue
                asset_hash = existing_hash(target)
                if asset_hash:
                    manual_owner[(key, asset_hash)] = source
                    aligned_assets.append(target)
            record[key] = aligned_assets
    return manual_owner


def asset_usage(records: Iterable[dict], key: str) -> Dict[str, Set[str]]:
    usage: Dict[str, Set[str]] = {}
    for record in records:
        source = record.get("source", "")
        for asset in record.get(key) or []:
            asset_hash = existing_hash(asset)
            if not asset_hash:
                continue
            usage.setdefault(asset_hash, set()).add(source)
    return usage


def filter_duplicate_content(records: Iterable[dict], key: str, manual_owner: Dict[Tuple[str, str], str]) -> None:
    records = list(records)
    usage = asset_usage(records, key)
    for record in records:
        source = record.get("source", "")
        kept: List[str] = []
        seen_hashes: Set[str] = set()
        for asset in record.get(key) or []:
            asset_hash = existing_hash(asset)
            if not asset_hash or asset_hash in seen_hashes:
                continue
            owner = manual_owner.get((key, asset_hash))
            if owner:
                if owner == source:
                    kept.append(asset)
                    seen_hashes.add(asset_hash)
                continue
            if len(usage.get(asset_hash, set())) == 1:
                kept.append(asset)
                seen_hashes.add(asset_hash)
        record[key] = kept


def align_diagram_assets(records: List[dict]) -> None:
    records_by_source = {record.get("source", ""): record for record in records}
    manual_owner = apply_manual_overrides(records_by_source)
    for key in DIAGRAM_KEYS:
        filter_duplicate_content(records, key, manual_owner)
