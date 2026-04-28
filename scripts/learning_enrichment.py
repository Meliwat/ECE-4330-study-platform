import json
import re
from pathlib import Path
from typing import Iterable, List


PROJECT_DIR = Path(__file__).resolve().parent.parent
PROBLEMS_PATH = PROJECT_DIR / "output" / "problems.json"
PROBLEMS_JS_PATH = PROJECT_DIR / "output" / "problems.js"


SUBTOPIC_RULES = [
    ("Euler identity", ["euler", "e^(j", "e^(-j", "e^{j"]),
    ("Trigonometric identities", ["cos", "sin", "tan", "trig"]),
    ("Complex numbers", ["complex", "ln(-1)", "irrational", "jπ", "i^"]),
    ("Series and sums", ["sum", "series", "Σ", "converge", "geometric"]),
    ("Delta functions", ["delta", "δ", "impulse"]),
    ("Convolution", ["convolution", "h(t)", "impulse response"]),
    ("Laplace transform", ["laplace", "s-domain", "h(s)", "f(s)", "partial fraction"]),
    ("Partial fractions", ["partial fraction", "pfe", "residue"]),
    ("Zero-input response", ["zero-input", "yzi", "initial condition"]),
    ("Zero-state response", ["zero-state", "yzs", "unit step", "u(t)"]),
    ("Steady-state response", ["steady-state", "yss", "frequency response"]),
    ("Fourier series", ["fourier series", "coefficients", "a_n", "b_n", "c_n", "parseval"]),
    ("Fourier transform", ["fourier transform", "f(ω)", "h(ω)", "omega", "bandwidth"]),
    ("Sampling", ["sampling", "nyquist", "alias", "sampled", "ts"]),
    ("Z-transform", ["z-transform", "z transform", "z^", "f(z)", "h(z)"]),
    ("Difference equations", ["difference equation", "y[k]", "f[k]", "y[n]", "x[n]"]),
    ("Bilinear transform", ["bilinear", "tustin", "s = 2", "mapping"]),
    ("Filter design", ["butterworth", "filter", "passband", "stopband", "low-pass", "high-pass"]),
    ("Differential equations", ["differential equation", "ode45", "characteristic equation"]),
    ("Circuit response", ["circuit", "resistor", "capacitor", "inductor"]),
]


TOPIC_HINTS = {
    "Signals/Math": [
        "Identify the algebra, calculus, or complex-number identity the problem is testing.",
        "Rewrite the expression in a form where a standard identity applies.",
        "Check the final result by substituting it back into the original statement.",
    ],
    "Fourier Series": [
        "Start by identifying the period, symmetry, and fundamental frequency.",
        "Choose the Fourier coefficient formula that matches the signal representation.",
        "Use symmetry and system frequency response to simplify before calculating terms.",
    ],
    "Fourier Transform": [
        "Identify the transform pair or property that matches the signal.",
        "Track scaling, shifting, and multiplication/convolution effects in frequency.",
        "Check support, bandwidth, and units after the transform operation.",
    ],
    "PFE": [
        "Move the expression into a rational form in s.",
        "Factor the denominator and set up partial fractions.",
        "Invert each term with the matching Laplace transform pair.",
    ],
    "ZIR/ZSR": [
        "Separate the response into zero-input and zero-state parts.",
        "Use initial conditions for the natural response and the input for the forced response.",
        "Add the valid response parts and check the initial/final behavior.",
    ],
    "Z-Transform": [
        "Write the sequence using unit steps, shifts, or known transform pairs.",
        "Apply the Z-transform property one piece at a time.",
        "Check the region of convergence and any time-shift factors.",
    ],
    "Butterworth": [
        "Translate the passband and stopband requirements into magnitude inequalities.",
        "Use the Butterworth order and cutoff formulas.",
        "Check that the final filter satisfies both specifications.",
    ],
    "Convolution": [
        "Identify the interval where the two shifted signals overlap.",
        "Set up the convolution integral or sum only over that overlap.",
        "Check breakpoints where the overlap changes.",
    ],
    "Difference Equations": [
        "Convert the system relation into samples indexed by k or n.",
        "Solve recursively or use transform methods as appropriate.",
        "Check the first few samples directly from the equation.",
    ],
    "Sampling/Nyquist": [
        "Find the highest frequency component after simplifying the signal.",
        "Use the Nyquist rate as twice the highest frequency.",
        "Check for frequency shifts or products that create new components.",
    ],
    "Bilinear Transform": [
        "Substitute the bilinear mapping between s and z.",
        "Collect powers of z^(-1) to form a digital transfer function.",
        "Convert the transfer function into a difference equation if needed.",
    ],
}


COMMON_MISTAKES = {
    "Signals/Math": "Do not skip the identity or domain condition that makes the algebra valid.",
    "Fourier Series": "Do not miss symmetry; it can remove half the coefficient work.",
    "Fourier Transform": "Do not lose scaling constants or confuse multiplication in time with multiplication in frequency.",
    "PFE": "Do not invert before factoring and matching each denominator term to a transform pair.",
    "ZIR/ZSR": "Do not mix zero-input initial-condition terms with zero-state input-driven terms.",
    "Z-Transform": "Do not ignore time-shift factors or the region of convergence.",
    "Butterworth": "Do not use frequency in hertz when the formula expects radians per second.",
    "Convolution": "Do not integrate over an interval where the two signals do not overlap.",
    "Difference Equations": "Do not shift the input and output indices inconsistently.",
    "Sampling/Nyquist": "Do not use the original frequencies before simplifying products or modulation.",
    "Bilinear Transform": "Do not forget to collect terms in z^(-1) before reading the difference equation.",
}


WHY_RULES = [
    (["let ", "define", "set "], "This introduces variables or a target form so the rest of the work can be organized."),
    (["start", "begin"], "Starting from a known identity anchors the solution in a rule that is already valid."),
    (["euler"], "Euler's identity connects complex exponentials with sine and cosine, which is why it unlocks this step."),
    (["add ", "subtract"], "Combining equations cancels unwanted terms and isolates the expression the problem asks for."),
    (["differentiate", "derivative"], "Differentiating exposes extrema, rates of change, or transform properties needed by the problem."),
    (["integrate", "integral", "∫"], "The integral applies the definition or computes the accumulated response over the valid interval."),
    (["factor"], "Factoring reveals standard pieces that can be simplified or matched to known transform pairs."),
    (["substitute", "plug"], "Substitution evaluates the expression using the known condition or transform mapping."),
    (["solve"], "Solving isolates the unknown quantity so the final result can be stated directly."),
    (["compare"], "Comparison with a known reference problem establishes convergence, bounds, or relative size."),
    (["fourier"], "The Fourier representation rewrites the signal by frequency components, which is the useful basis here."),
    (["laplace", "s-domain", "h(s)", "f(s)"], "The Laplace-domain form turns differential-system behavior into algebraic manipulation."),
    (["z-transform", "z transform", "z^"], "The Z-transform turns sequence operations and shifts into algebraic factors."),
    (["bilinear"], "The bilinear transform maps a continuous-time design into the z-plane while preserving stability structure."),
    (["nyquist", "sampling"], "Sampling decisions depend on the highest frequency that must be reconstructed without aliasing."),
    (["delta", "δ", "impulse"], "The impulse property samples or differentiates a function at the impulse location."),
    (["therefore", "so ", "thus", "hence"], "This follows from the previous algebra and states the conclusion in the requested form."),
]


def normalize_spaces(value: str) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def keyword_matches(text: str, keyword: str) -> bool:
    if re.fullmatch(r"[a-z0-9]+", keyword):
        return re.search(rf"\b{re.escape(keyword)}\b", text) is not None
    return keyword in text


def stable_id(source: str, index: int, seen: dict) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", source.lower()).strip("-")
    slug = slug or f"problem-{index + 1}"
    count = seen.get(slug, 0)
    seen[slug] = count + 1
    if count:
        return f"{slug}-{count + 1}"
    return slug


def infer_subtopics(problem: dict) -> List[str]:
    text = " ".join(
        [
            problem.get("source", ""),
            problem.get("topic", ""),
            problem.get("problem", ""),
            problem.get("solution", ""),
        ]
    ).lower()
    found = []
    for label, keywords in SUBTOPIC_RULES:
        if any(keyword_matches(text, keyword.lower()) for keyword in keywords):
            found.append(label)
    if not found and problem.get("topic"):
        found.append(problem["topic"])
    return found[:6]


def infer_difficulty(problem: dict, subtopics: Iterable[str]) -> str:
    score = 0
    text_len = len(normalize_spaces(problem.get("problem", ""))) + len(normalize_spaces(problem.get("solution", "")))
    score += min(text_len // 900, 3)
    if problem.get("problem_text_bad") or problem.get("solution_text_bad"):
        score += 1
    if len(problem.get("images") or []) + len(problem.get("solution_images") or []) >= 3:
        score += 1
    topic = problem.get("topic", "")
    if topic in {"Butterworth", "Bilinear Transform", "Difference Equations", "Fourier Transform"}:
        score += 1
    if len(list(subtopics)) >= 3:
        score += 1
    if score <= 1:
        return "Core"
    if score <= 3:
        return "Medium"
    return "Challenge"


def infer_goal(problem_text: str) -> str:
    text = normalize_spaces(problem_text)
    text = re.sub(r"^\d+\s*[\.\):\-]\s*", "", text)
    patterns = [
        r"\b(determine|find|compute|evaluate|show|prove|solve|derive|express|obtain|give)\b[^.?!]*[.?!]?",
        r"\bwhat\b[^.?!]*[.?!]?",
    ]
    for pattern in patterns:
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if match:
            return match.group(0).strip(" .")
    return "Work through the requested calculation and state the final result."


def sentence_split(text: str) -> List[str]:
    cleaned = normalize_spaces(text)
    if not cleaned:
        return []
    cleaned = re.sub(r"(?<![.!?])\s+(Then|Therefore|Thus|Hence|Since|For the|With|Using)\b", r". \1", cleaned)
    chunks = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9Σ∫π√𝑎-𝑧])", cleaned)
    steps = []
    buffer = ""
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
        if len(chunk) < 34 and buffer:
            buffer = f"{buffer} {chunk}"
        else:
            if buffer:
                steps.append(buffer)
            buffer = chunk
    if buffer:
        steps.append(buffer)
    if len(steps) > 8:
        head = steps[:6]
        tail = " ".join(steps[6:])
        steps = head + [tail]
    return steps


def explain_step(step: str, topic: str) -> str:
    lowered = step.lower()
    for needles, reason in WHY_RULES:
        if any(needle in lowered for needle in needles):
            return reason
    if "=" in step:
        return "This algebraic relation keeps the solution tied to the quantities the problem asks for."
    if topic in TOPIC_HINTS:
        return f"This applies the core {topic.lower()} idea before moving to the next calculation."
    return "This step advances the calculation while keeping the result connected to the original problem."


def build_steps(problem: dict) -> List[dict]:
    raw_solution = normalize_spaces(problem.get("solution", ""))
    if problem.get("solution_text_bad") and problem.get("solution_scan"):
        return [
            {
                "work": "Open the exact solution scan attached below before trusting the extracted text.",
                "why": "This record is flagged for unreliable OCR, so the scan is the authoritative worked solution.",
            },
            {
                "work": "Identify the setup line in the scan: definitions, transform pair, equation, or coefficient formula.",
                "why": "The setup determines which course method applies and prevents using a correct formula on the wrong quantity.",
            },
            {
                "work": "Follow each algebraic or transform line and compare it with the original problem statement.",
                "why": "Most mistakes in these problems come from sign, scaling, shift, or indexing errors between adjacent lines.",
            },
            {
                "work": "Use the final line of the scan as the answer and verify it against units, frequency, region, or initial conditions.",
                "why": "The final check confirms that the answer satisfies the actual request rather than only the intermediate calculation.",
            },
        ]
    sentences = sentence_split(raw_solution)
    if not sentences:
        return [
            {
                "work": "Use the exact solution scan attached to this problem.",
                "why": "The text extraction did not produce a reliable worked solution, so the original scan is the accurate source.",
            }
        ]
    return [
        {
            "work": sentence,
            "why": explain_step(sentence, problem.get("topic", "")),
        }
        for sentence in sentences
    ]


def build_hints(problem: dict, subtopics: List[str]) -> List[str]:
    topic = problem.get("topic", "Signals/Math")
    hints = list(TOPIC_HINTS.get(topic, TOPIC_HINTS["Signals/Math"]))
    if subtopics:
        hints[0] = f"Start by recognizing this as a {', '.join(subtopics[:2])} problem."
    if problem.get("problem_text_bad"):
        hints.append("Use the exact problem scan before solving; the text version may omit formatting.")
    return hints[:4]


def final_answer(problem: dict, steps: List[dict]) -> str:
    solution = normalize_spaces(problem.get("solution", ""))
    if not solution:
        return "See the attached solution scan."
    sentences = sentence_split(solution)
    if sentences:
        return sentences[-1]
    return solution[-350:]


def enrich_record(problem: dict, index: int, seen: dict) -> dict:
    problem["id"] = problem.get("id") or stable_id(problem.get("source", ""), index, seen)
    subtopics = infer_subtopics(problem)
    steps = build_steps(problem)
    problem["subtopics"] = subtopics
    problem["difficulty"] = infer_difficulty(problem, subtopics)
    problem["learning"] = {
        "given": normalize_spaces(problem.get("problem", ""))[:500]
        or "Use the problem scan and diagrams as the given information.",
        "goal": infer_goal(problem.get("problem", "")),
        "concept": f"{problem.get('topic', 'Signals/Math')} with {', '.join(subtopics) if subtopics else 'core course methods'}",
        "hints": build_hints(problem, subtopics),
        "steps": steps,
        "final_answer": final_answer(problem, steps),
        "check": "Verify the result against the original problem statement, units/indexing, and the provided solution scan when available.",
        "common_mistake": COMMON_MISTAKES.get(
            problem.get("topic", "Signals/Math"),
            "Do not skip the setup; most errors come from applying the right formula to the wrong quantity.",
        ),
        "needs_review": bool(problem.get("problem_text_bad") or problem.get("solution_text_bad")),
    }
    return problem


def enrich_records(records: List[dict]) -> List[dict]:
    seen = {}
    return [enrich_record(record, index, seen) for index, record in enumerate(records)]


def main() -> None:
    records = json.loads(PROBLEMS_PATH.read_text(encoding="utf-8"))
    enriched = enrich_records(records)
    PROBLEMS_PATH.write_text(json.dumps(enriched, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    PROBLEMS_JS_PATH.write_text(
        "window.ECE4330_PROBLEMS = "
        + json.dumps(enriched, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    print(f"Enriched {len(enriched)} problems with learning metadata.")


if __name__ == "__main__":
    main()
