import json
import re
from pathlib import Path
from typing import Iterable, List

from diagram_alignment import align_diagram_assets
from solution_asset_alignment import align_solution_assets


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


TOPIC_PRIORITY_RULES = [
    ("Butterworth", ["butterworth", "passband", "stopband", "low-pass", "high-pass"]),
    ("Bilinear Transform", ["bilinear", "tustin", "s = 2"]),
    ("Sampling/Nyquist", ["nyquist", "sampling", "alias", "sampled", "ts"]),
    ("Convolution", ["convolution"]),
    ("Fourier Series", ["fourier series", "coefficients", "parseval"]),
    ("Fourier Transform", ["fourier transform", "f(ω)", "h(ω)", "bandwidth"]),
    ("Difference Equations", ["difference equation", "y[k]", "f[k]", "y[n]", "x[n]"]),
    ("Z-Transform", ["z-transform", "z transform", "f(z)", "h(z)", "z^"]),
    ("ZIR/ZSR", ["zero-input", "zero state", "zero-state", "yzi", "yzs", "initial condition"]),
    ("PFE", ["partial fraction", "inverse laplace", "residue"]),
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


METHOD_CUES = {
    "Signals/Math": "Choose the algebra rule, identity, or calculus test that matches the expression before calculating.",
    "Fourier Series": "Find the period and symmetry first, then compute only the Fourier coefficients that are needed.",
    "Fourier Transform": "Match the signal to a transform pair or property, then track shifts, scaling, and bandwidth.",
    "PFE": "Factor the denominator, build the partial fractions, and invert each term separately.",
    "ZIR/ZSR": "Separate the natural response from the input-driven response before adding the valid parts.",
    "Z-Transform": "Rewrite the sequence using steps, shifts, or known pairs before taking the Z-transform.",
    "Butterworth": "Translate the magnitude specifications into filter order and cutoff conditions before solving.",
    "Convolution": "Find the overlap interval first; the integral or sum is only valid on that interval.",
    "Difference Equations": "Line up the sample indices carefully before solving recursively or by transform methods.",
    "Sampling/Nyquist": "Simplify the signal first, then identify the highest frequency that must be preserved.",
    "Bilinear Transform": "Substitute the bilinear map, collect powers of z^(-1), then read the difference equation.",
}


CHECK_CUES = {
    "Fourier Series": "Check the period, symmetry, and coefficient scaling against the original signal.",
    "Fourier Transform": "Check frequency shifts, bandwidth, and constants in radians per second.",
    "PFE": "Check by recombining the partial fractions to recover the original rational expression.",
    "ZIR/ZSR": "Check that initial conditions only affect the zero-input part and the input only drives the zero-state part.",
    "Z-Transform": "Check the time shifts and any region-of-convergence or causality assumptions.",
    "Butterworth": "Check the final filter against both passband and stopband requirements.",
    "Convolution": "Check the breakpoints where the overlap interval changes.",
    "Difference Equations": "Check the first few samples directly in the difference equation.",
    "Sampling/Nyquist": "Check that the chosen sampling rate is above twice the highest frequency after simplification.",
    "Bilinear Transform": "Check that the final expression is written in powers of z^(-1) before forming the recursion.",
}


SETUP_STEPS = {
    "Signals/Math": [
        "Write the identity, definition, or algebra rule that matches the expression.",
        "Substitute the specific values from the problem into that rule before simplifying.",
    ],
    "Fourier Series": [
        "Write the period and fundamental frequency before choosing coefficients.",
        "Use symmetry to decide which coefficient integrals are actually needed.",
    ],
    "Fourier Transform": [
        "Write the base transform pair or property that matches the signal.",
        "Mark every time shift, frequency shift, scaling factor, or multiplication before simplifying.",
    ],
    "PFE": [
        "Factor the denominator and write the unknown partial-fraction constants.",
        "Solve the constants before taking any inverse Laplace transforms.",
    ],
    "ZIR/ZSR": [
        "Write the homogeneous response for the zero-input part using the initial conditions.",
        "Write the forced or transfer-function setup for the zero-state part using the input.",
    ],
    "Z-Transform": [
        "Rewrite the sequence with unit steps, shifts, or known Z-transform pairs.",
        "Apply each shift or scaling property before simplifying the final expression.",
    ],
    "Butterworth": [
        "Convert the passband and stopband requirements into magnitude inequalities.",
        "Solve for the filter order and cutoff before writing the final transfer function.",
    ],
    "Convolution": [
        "Write the convolution definition and identify where the two signals overlap.",
        "Set the integration or summation limits from that overlap before evaluating.",
    ],
    "Difference Equations": [
        "Align every input and output sample index before substituting values.",
        "Compute the next sample from known earlier samples, then repeat the recursion.",
    ],
    "Sampling/Nyquist": [
        "Simplify products or modulation first so the true highest frequency is visible.",
        "Apply the Nyquist rule to that highest frequency, not to the unsimplified signal.",
    ],
    "Bilinear Transform": [
        "Write the substitution s = 2(1 - z^(-1)) / (T(1 + z^(-1))).",
        "Collect the result in powers of z^(-1) before reading off the recursion.",
    ],
}


WHY_RULES = [
    (["target:"], "Naming the target first keeps the work tied to the exact question being asked."),
    (["method:"], "Choosing the method up front makes the later algebra feel predictable instead of random."),
    (["check:"], "A final check catches sign, scale, unit, and indexing errors before you move on."),
    (["setup:"], "The setup step gives the calculation a concrete starting point before symbols start moving."),
    (["let ", "define", "set "], "This introduces variables or a target form so the rest of the work can be organized."),
    (["start", "begin"], "Starting from a known identity anchors the solution in a rule that is already valid."),
    (["write ", "rewrite"], "Rewriting puts the expression into a form where the next rule can be applied cleanly."),
    (["euler"], "Euler's identity connects complex exponentials with sine and cosine, which is why it unlocks this step."),
    (["add ", "subtract"], "Combining equations cancels unwanted terms and isolates the expression the problem asks for."),
    (["multiply", "divide"], "Clearing or scaling terms isolates the unknown while preserving the equation."),
    (["expand"], "Expanding exposes like terms so they can be combined or compared directly."),
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


def refine_topic(problem: dict) -> str:
    text = " ".join(
        [
            problem.get("source", ""),
            problem.get("problem", ""),
            problem.get("solution", ""),
        ]
    ).lower()
    if "convolution" in text or re.search(
        r"[\w𝑎-𝑧ℎ]\s*[\(\[]\s*[tk]\s*[\)\]]\s*∗|∗\s*[\w𝑎-𝑧ℎ]\s*[\(\[]\s*[tk]\s*[\)\]]",
        text,
    ):
        return "Convolution"
    for topic, keywords in TOPIC_PRIORITY_RULES:
        if any(keyword_matches(text, keyword.lower()) for keyword in keywords):
            return topic
    return "Signals/Math"


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


def split_by_pattern(parts: List[str], pattern: str) -> List[str]:
    result: List[str] = []
    for part in parts:
        result.extend(piece.strip() for piece in re.split(pattern, part) if piece.strip())
    return result


def split_dense_chunk(chunk: str) -> List[str]:
    parts = [chunk.strip()]
    parts = split_by_pattern(parts, r";\s+")
    parts = split_by_pattern(parts, r"(?<=[.;:])\s+(?=(?:\d+|[a-c])\)\s)")
    parts = split_by_pattern(parts, r"(?<=[.;:])\s+(?=[abc]\.\)\s)")
    parts = split_by_pattern(parts, r"\s+(?=For\s+K\s*=)")
    parts = split_by_pattern(parts, r"\s+(?=For\s+[a-z]\(t\)\s*=)")

    refined: List[str] = []
    for part in parts:
        if len(part) <= 260:
            refined.append(part)
            continue
        smaller = re.split(r",\s+(?=so\b|which gives\b|giving\b|hence\b|therefore\b)", part)
        if len(smaller) > 1:
            refined.extend(piece.strip() for piece in smaller if piece.strip())
        else:
            refined.append(part)
    return refined


def sentence_split(text: str) -> List[str]:
    cleaned = normalize_spaces(text)
    if not cleaned:
        return []
    cleaned = re.sub(r"(?<=[.;:])\s+([abc]\.\))\s+", r". \1 ", cleaned)
    cleaned = re.sub(r"(?<=[.;:])\s+(\d+\))\s+", r". \1 ", cleaned)
    cleaned = re.sub(r"(?<![.!?])\s+(Then|Therefore|Thus|Hence|Since|For the|With|Using)\b", r". \1", cleaned)
    cleaned = re.sub(
        r",\s+(so|which gives|giving|hence|therefore)\b",
        lambda match: f". {match.group(1).capitalize()}",
        cleaned,
    )
    chunks = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9Σ∫π√𝑎-𝑧])", cleaned)
    steps = []
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
        steps.extend(split_dense_chunk(chunk))
    return merge_tiny_steps(dedupe_steps(steps))[:14]


def dedupe_steps(steps: List[str]) -> List[str]:
    cleaned: List[str] = []
    seen = set()
    for step in steps:
        normalized = re.sub(r"[^a-z0-9]+", " ", step.lower()).strip()
        if not normalized or normalized in seen:
            continue
        seen.add(normalized)
        cleaned.append(step)
    return cleaned


def merge_tiny_steps(steps: List[str]) -> List[str]:
    merged: List[str] = []
    for step in steps:
        if len(step) < 28 and merged:
            merged[-1] = f"{merged[-1]} {step}"
        else:
            merged.append(step)
    return merged


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


def notebook_work(step: str) -> str:
    text = normalize_spaces(step)
    if not text:
        return "Write the next algebra line from the problem or solution scan."
    return text


def add_notebook_work(steps: List[dict]) -> List[dict]:
    for step in steps:
        step["notebook"] = notebook_work(step.get("work", ""))
    return steps


def build_steps(problem: dict) -> List[dict]:
    raw_solution = normalize_spaces(problem.get("solution", ""))
    if problem.get("solution_text_bad") and problem.get("solution_scan"):
        target = build_target_step(problem)
        return add_notebook_work([
            target,
            method_step(problem),
            {
                "work": "Confirm the attached solution scan belongs to this exact problem number.",
                "why": "The scan is the source of the worked math, so matching it to the problem prevents studying the wrong diagram.",
            },
            {
                "work": "Copy the givens from the problem statement before reading the solution line.",
                "why": "Writing the givens makes it easier to notice which symbols, inputs, frequencies, or initial conditions must appear later.",
            },
            {
                "work": "Identify the first setup line in the solution scan: definition, transform pair, equation, or coefficient formula.",
                "why": "The setup line tells you which course method is being used before the calculation starts.",
            },
            {
                "work": "Reproduce the algebra one line at a time instead of jumping to the final line.",
                "why": "Line-by-line copying exposes sign, scale, shift, and indexing changes that are easy to miss.",
            },
            {
                "work": "Pause at each equals sign and ask what rule changed the previous line into the next one.",
                "why": "This keeps the solution active: you are identifying the reason for each move, not just reading it.",
            },
            {
                "work": check_step(problem).get("work", "Check the final answer against the original problem."),
                "why": "The final check confirms that the answer satisfies the actual request rather than only the intermediate calculation.",
            },
        ])
    sentences = sentence_split(raw_solution)
    if not sentences:
        return add_notebook_work([
            build_target_step(problem),
            method_step(problem),
            {
                "work": "Use the exact solution scan attached to this problem.",
                "why": "The text extraction did not produce a reliable worked solution, so the original scan is the accurate source.",
            },
            final_form_step(problem),
            check_step(problem),
        ])
    work_steps = [
        {
            "work": sentence,
            "why": explain_step(sentence, problem.get("topic", "")),
        }
        for sentence in sentences
    ]
    return add_notebook_work(build_scaffolded_steps(problem, work_steps))


def build_target_step(problem: dict) -> dict:
    goal = infer_goal(problem.get("problem", ""))
    return {
        "work": f"Target: {goal}.",
        "why": "Naming the target first keeps every later line connected to what the problem actually asks for.",
    }


def method_step(problem: dict) -> dict:
    topic = problem.get("topic", "Signals/Math")
    return {
        "work": f"Method: {METHOD_CUES.get(topic, METHOD_CUES['Signals/Math'])}",
        "why": "Choosing the method before calculating gives the work a clear path and reduces guessing.",
    }


def setup_steps(problem: dict) -> List[dict]:
    topic = problem.get("topic", "Signals/Math")
    cues = SETUP_STEPS.get(topic, SETUP_STEPS["Signals/Math"])
    return [
        {
            "work": f"Setup: {cue}",
            "why": "This turns the problem statement into the exact calculation you are about to perform.",
        }
        for cue in cues
    ]


def check_step(problem: dict) -> dict:
    topic = problem.get("topic", "Signals/Math")
    return {
        "work": f"Check: {CHECK_CUES.get(topic, 'Substitute the result back into the original statement and check units, signs, and requested form.')}",
        "why": "The check is where small algebra, sign, unit, or indexing mistakes usually reveal themselves.",
    }


def final_form_step(problem: dict) -> dict:
    return {
        "work": "State the answer in the same notation, variables, and units used by the problem.",
        "why": "Putting the result back into the problem's language makes it easier to tell whether the question was fully answered.",
    }


def build_scaffolded_steps(problem: dict, work_steps: List[dict]) -> List[dict]:
    result = [build_target_step(problem), method_step(problem)]
    if len(work_steps) <= 2:
        result.extend(setup_steps(problem))
    result.extend(work_steps)
    if len(work_steps) == 1:
        result.append(final_form_step(problem))
    result.append(check_step(problem))
    return result


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
    problem["topic"] = refine_topic(problem)
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
    align_solution_assets(records)
    align_diagram_assets(records)
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
