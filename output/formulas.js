/* ECE 4330 Formula Reference
 * Sourced from "All Formulas.pdf" (Prof. Mohamad Hassoun, 2016).
 * Each entry: { id, name, tex, category, page, triggers (regex strings) }
 * triggers are case-insensitive substrings or regex used to auto-tag steps.
 */
window.ECE4330_FORMULAS = [
  /* ============================================================
     Complex numbers & Euler (PDF pages 26-27)
     ============================================================ */
  {
    id: "euler_identity",
    name: "Euler's identity",
    tex: "e^{\\pm j\\theta} = \\cos\\theta \\pm j\\sin\\theta",
    category: "Complex numbers",
    page: 27,
    triggers: ["euler", "e\\^\\(j", "e\\^\\(-j", "e\\^j\\\\theta", "cos\\s*\\u03b8\\s*\\+\\s*j\\s*sin"],
  },
  {
    id: "euler_cos",
    name: "cosine in exponentials",
    tex: "\\cos x = \\tfrac{1}{2}\\bigl(e^{jx} + e^{-jx}\\bigr)",
    category: "Complex numbers",
    page: 27,
    triggers: ["e\\^\\(jx\\)\\s*\\+\\s*e\\^\\(-jx\\)", "e\\^\\(j.+?\\)\\s*\\+\\s*e\\^\\(-j", "2\\s*cos\\s*(\\u03b8|x|\\(x/2\\))"],
  },
  {
    id: "euler_sin",
    name: "sine in exponentials",
    tex: "\\sin x = \\tfrac{1}{2j}\\bigl(e^{jx} - e^{-jx}\\bigr)",
    category: "Complex numbers",
    page: 27,
    triggers: ["e\\^\\(jx\\)\\s*-\\s*e\\^\\(-jx\\)", "e\\^\\(j.+?\\)\\s*-\\s*e\\^\\(-j", "2j\\s*sin"],
  },
  {
    id: "complex_polar",
    name: "rectangular ↔ polar",
    tex: "a + jb = re^{j\\theta},\\;r=\\sqrt{a^2+b^2},\\;\\theta=\\tan^{-1}(b/a)",
    category: "Complex numbers",
    page: 26,
    triggers: ["a\\s*\\+\\s*jb", "polar form", "rectangular to polar", "phasor"],
  },
  {
    id: "complex_de_moivre",
    name: "de Moivre / power",
    tex: "(re^{j\\theta})^k = r^k e^{jk\\theta}",
    category: "Complex numbers",
    page: 26,
    triggers: ["de moivre", "\\(re\\^j", "r\\^k\\s*e\\^"],
  },
  {
    id: "complex_product",
    name: "product of complex numbers",
    tex: "(r_1 e^{j\\theta_1})(r_2 e^{j\\theta_2}) = r_1 r_2 e^{j(\\theta_1+\\theta_2)}",
    category: "Complex numbers",
    page: 26,
    triggers: ["multiply.*phasor", "product.*polar"],
  },
  {
    id: "complex_unit_circle",
    name: "unit-circle special angles",
    tex: "e^{\\pm j\\pi/2} = \\pm j,\\quad e^{\\pm jn\\pi}=(\\pm 1)^n",
    category: "Complex numbers",
    page: 26,
    triggers: ["e\\^\\(j\\\\pi", "e\\^\\(j\\s*\\\\?pi/2", "unit circle"],
  },

  /* ============================================================
     Trig identities (PDF page 27)
     ============================================================ */
  {
    id: "trig_pythagorean",
    name: "Pythagorean identity",
    tex: "\\sin^2 x + \\cos^2 x = 1",
    category: "Trig identities",
    page: 27,
    triggers: ["sin\\^2.*cos\\^2", "pythagorean", "sin\\u00b2.*cos\\u00b2"],
  },
  {
    id: "trig_double_angle_sin",
    name: "double-angle (sine)",
    tex: "2\\sin x\\cos x = \\sin 2x",
    category: "Trig identities",
    page: 27,
    triggers: ["2\\s*sin.*cos", "double angle", "sin\\s*2x"],
  },
  {
    id: "trig_double_angle_cos",
    name: "double-angle (cosine)",
    tex: "\\cos^2 x - \\sin^2 x = \\cos 2x",
    category: "Trig identities",
    page: 27,
    triggers: ["cos\\^2.*-.*sin\\^2", "cos 2x"],
  },
  {
    id: "trig_power_reduction_cos",
    name: "power reduction cos²",
    tex: "\\cos^2 x = \\tfrac{1}{2}(1+\\cos 2x)",
    category: "Trig identities",
    page: 27,
    triggers: ["cos\\^2 x = \\(1/2\\)\\(1\\s*\\+\\s*cos\\s*2x", "1\\+\\s*cos\\s*2x", "\\(1\\s*\\+\\s*cos2x\\)/2"],
  },
  {
    id: "trig_power_reduction_sin",
    name: "power reduction sin²",
    tex: "\\sin^2 x = \\tfrac{1}{2}(1-\\cos 2x)",
    category: "Trig identities",
    page: 27,
    triggers: ["sin\\^2 x = \\(1/2\\)\\(1\\s*-\\s*cos\\s*2x", "1\\s*-\\s*cos\\s*2x", "\\(1\\s*-\\s*cos2x\\)/2"],
  },
  {
    id: "trig_sum_sin",
    name: "sin sum/difference",
    tex: "\\sin(x\\pm y) = \\sin x\\cos y \\pm \\cos x\\sin y",
    category: "Trig identities",
    page: 27,
    triggers: ["sin\\(x\\s*\\+\\s*y\\)", "sin\\s*\\(.*?\\s*\\+\\s*.*?\\)\\s*=\\s*sin", "sin x cos y"],
  },
  {
    id: "trig_sum_cos",
    name: "cos sum/difference",
    tex: "\\cos(x\\pm y) = \\cos x\\cos y \\mp \\sin x\\sin y",
    category: "Trig identities",
    page: 27,
    triggers: ["cos\\(x\\s*\\+\\s*y\\)", "cos x cos y", "\\\\cos\\(x\\s*-\\s*y\\)"],
  },
  {
    id: "trig_product_to_sum_ss",
    name: "product-to-sum (sin·sin)",
    tex: "\\sin x\\sin y = \\tfrac{1}{2}\\bigl[\\cos(x-y)-\\cos(x+y)\\bigr]",
    category: "Trig identities",
    page: 27,
    triggers: ["sin x sin y", "product-to-sum", "product to sum"],
  },
  {
    id: "trig_product_to_sum_cc",
    name: "product-to-sum (cos·cos)",
    tex: "\\cos x\\cos y = \\tfrac{1}{2}\\bigl[\\cos(x-y)+\\cos(x+y)\\bigr]",
    category: "Trig identities",
    page: 27,
    triggers: ["cos x cos y", "cos\\s*\\(x-y\\)\\s*\\+\\s*cos\\s*\\(x\\+y\\)"],
  },
  {
    id: "trig_product_to_sum_sc",
    name: "product-to-sum (sin·cos)",
    tex: "\\sin x\\cos y = \\tfrac{1}{2}\\bigl[\\sin(x-y)+\\sin(x+y)\\bigr]",
    category: "Trig identities",
    page: 27,
    triggers: ["sin x cos y", "sin\\s*\\(x-y\\)\\s*\\+\\s*sin\\s*\\(x\\+y\\)"],
  },
  {
    id: "trig_phase_combine",
    name: "amplitude–phase form",
    tex: "a\\cos x + b\\sin x = C\\cos(x+\\theta),\\;C=\\sqrt{a^2+b^2},\\;\\theta=\\tan^{-1}(-b/a)",
    category: "Trig identities",
    page: 27,
    triggers: ["a cos x \\+ b sin x", "amplitude.*phase", "C\\s*cos\\(x\\s*\\+\\s*\\\\theta", "single sinusoid"],
  },
  {
    id: "trig_complement",
    name: "complementary angles",
    tex: "\\cos(x\\pm\\tfrac{\\pi}{2}) = \\mp\\sin x,\\quad \\sin(x\\pm\\tfrac{\\pi}{2}) = \\pm\\cos x",
    category: "Trig identities",
    page: 27,
    triggers: ["cos\\(x\\s*\\+\\s*\\\\pi/2", "sin\\(x\\s*\\+\\s*\\\\pi/2", "shift by pi/2"],
  },
  {
    id: "trig_periodicity",
    name: "trig periodicity & parity",
    tex: "\\sin(-x) = -\\sin x,\\;\\cos(-x)=\\cos x;\\;\\sin(x+2k\\pi)=\\sin x",
    category: "Trig identities",
    page: 27,
    triggers: ["even.*cos", "odd.*sin", "periodicity"],
  },

  /* ============================================================
     Power-of-sinusoid expansions (PDF page 28)
     ============================================================ */
  {
    id: "trig_sin2_expand",
    name: "sin²x expansion",
    tex: "\\sin^2 x = \\tfrac{1-\\cos 2x}{2}",
    category: "Trig power expansions",
    page: 28,
    triggers: ["sin\\^2.*=.*\\(1-cos\\s*2x\\)/2"],
  },
  {
    id: "trig_sin3_expand",
    name: "sin³x expansion",
    tex: "\\sin^3 x = \\tfrac{3\\sin x - \\sin 3x}{4}",
    category: "Trig power expansions",
    page: 28,
    triggers: ["sin\\^3", "sin cubed"],
  },
  {
    id: "trig_cos3_expand",
    name: "cos³x expansion",
    tex: "\\cos^3 x = \\tfrac{3\\cos x + \\cos 3x}{4}",
    category: "Trig power expansions",
    page: 28,
    triggers: ["cos\\^3", "cos cubed"],
  },
  {
    id: "binomial_coefficient",
    name: "binomial coefficient",
    tex: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}",
    category: "Trig power expansions",
    page: 28,
    triggers: ["binomial", "n choose k", "\\\\binom"],
  },

  /* ============================================================
     Unit-impulse and unit-step (PDF pages 2-3)
     ============================================================ */
  {
    id: "impulse_sample",
    name: "impulse sampling property",
    tex: "f(t)\\,\\delta(t-a) = f(a)\\,\\delta(t-a)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["f\\(t\\)\\s*\\\\?delta", "sampling property", "f\\(a\\)\\\\?delta", "f\\(t\\)\\s*\\u03b4\\(t"],
  },
  {
    id: "impulse_sift",
    name: "sifting (integral) property",
    tex: "\\int_{-\\infty}^{+\\infty} f(t)\\,\\delta(t-a)\\,dt = f(a)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["sifting", "\\\\int.*\\\\?delta\\(t-a\\)", "impulse integral"],
  },
  {
    id: "impulse_even",
    name: "δ is even",
    tex: "\\delta(t) = \\delta(-t),\\quad \\delta(t-a)=\\delta(a-t)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["delta is even", "\\\\delta\\(-t\\)", "\\\\delta\\(a-t\\)"],
  },
  {
    id: "impulse_scaling",
    name: "impulse scaling",
    tex: "\\delta(at) = \\tfrac{1}{|a|}\\delta(t)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["\\\\delta\\(at\\)", "delta scaling", "1/\\|a\\|\\s*\\\\delta"],
  },
  {
    id: "impulse_derivative_step",
    name: "δ as derivative of step",
    tex: "\\delta(t) = \\frac{d}{dt}u(t),\\quad \\int_{-\\infty}^{t}\\delta(\\tau)\\,d\\tau = u(t)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["d/dt\\s*u\\(t\\)", "derivative of u", "integrate.*delta", "step is integral of"],
  },
  {
    id: "impulse_derivative_pair",
    name: "impulse-doublet integral",
    tex: "\\int_{-\\infty}^{+\\infty} f(t)\\,\\dot{\\delta}(t)\\,dt = -\\dot{f}(0)",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["\\\\dot\\\\delta", "doublet", "delta'\\(t\\)", "derivative of impulse"],
  },
  {
    id: "impulse_composition",
    name: "δ of a function",
    tex: "\\delta(g(t)) = \\sum_{i=1}^{m}\\frac{\\delta(t-t_i)}{|g'(t_i)|}",
    category: "Unit impulse / step",
    page: 2,
    triggers: ["\\\\delta\\(g\\(t\\)\\)", "delta of a function", "delta\\(g\\("],
  },
  {
    id: "shifted_unitstep",
    name: "express via shifted unit-steps",
    tex: "f(t) = \\sum_i f_i(t-a_i)\\,u(t-a_i)",
    category: "Unit impulse / step",
    page: 3,
    triggers: ["unit-step", "shifted unit step", "express.*unit.?step", "u\\(t-a", "u\\(t-1\\)"],
  },
  {
    id: "shifted_unitstep_t",
    name: "tu(t-a) expansion",
    tex: "tu(t-a) = (t-a)u(t-a) + a\\,u(t-a)",
    category: "Unit impulse / step",
    page: 3,
    triggers: ["tu\\(t-a\\)", "t\\s*u\\(t\\s*-\\s*a\\)"],
  },
  {
    id: "shifted_unitstep_exp",
    name: "exp shifted u",
    tex: "e^{-bt}u(t-a) = e^{-ab}\\,e^{-b(t-a)}\\,u(t-a)",
    category: "Unit impulse / step",
    page: 3,
    triggers: ["e\\^\\(-bt\\)\\s*u\\(t-a\\)", "exponential.*shifted u"],
  },

  /* ============================================================
     Convolution (PDF pages 4-6)
     ============================================================ */
  {
    id: "conv_definition",
    name: "convolution definition",
    tex: "(f_1 * f_2)(t) = \\int_{-\\infty}^{+\\infty} f_1(\\tau)f_2(t-\\tau)\\,d\\tau",
    category: "Convolution",
    page: 5,
    triggers: ["convolution", "f_1\\s*\\*\\s*f_2", "\\\\int.*f_1.*f_2", "convolve"],
  },
  {
    id: "conv_commutative",
    name: "convolution: commutative",
    tex: "f_1 * f_2 = f_2 * f_1",
    category: "Convolution",
    page: 5,
    triggers: ["commutative.*convol", "f1 \\* f2 = f2 \\* f1"],
  },
  {
    id: "conv_distributive",
    name: "convolution: distributive",
    tex: "f_1 * (f_2 \\pm f_3) = f_1 * f_2 \\pm f_1 * f_3",
    category: "Convolution",
    page: 5,
    triggers: ["distributive", "convol.*distrib"],
  },
  {
    id: "conv_time_shift",
    name: "convolution time-shift",
    tex: "f_1(t-a) * f_2(t) = (f_1 * f_2)(t-a)",
    category: "Convolution",
    page: 5,
    triggers: ["time shift.*convol", "shift.*convolution"],
  },
  {
    id: "conv_with_delta",
    name: "convolution with δ",
    tex: "f(t) * \\delta(t) = f(t),\\quad f(t)*\\delta(t-T) = f(t-T)",
    category: "Convolution",
    page: 5,
    triggers: ["f.*\\*\\s*\\\\?delta", "convolution with impulse", "convol.*delta"],
  },
  {
    id: "conv_exp_exp",
    name: "convolution: e^{λ₁t}u * e^{λ₂t}u",
    tex: "e^{\\lambda_1 t}u(t) * e^{\\lambda_2 t}u(t) = \\frac{e^{\\lambda_1 t} - e^{\\lambda_2 t}}{\\lambda_1-\\lambda_2}\\,u(t),\\;\\lambda_1\\ne\\lambda_2",
    category: "Convolution",
    page: 4,
    triggers: ["e\\^\\(\\\\?lambda_?1.*\\*.*e\\^\\(\\\\?lambda", "convolution.*two exponentials"],
  },
  {
    id: "conv_u_u",
    name: "convolution: u * u",
    tex: "u(t) * u(t) = t\\,u(t)",
    category: "Convolution",
    page: 4,
    triggers: ["u\\(t\\)\\s*\\*\\s*u\\(t\\)"],
  },
  {
    id: "conv_eλt_u",
    name: "convolution: e^{λt}u * u",
    tex: "e^{\\lambda t}u(t) * u(t) = \\frac{1-e^{\\lambda t}}{-\\lambda}\\,u(t)",
    category: "Convolution",
    page: 4,
    triggers: ["e\\^\\(\\\\?lambda t\\)u\\(t\\)\\s*\\*\\s*u\\(t\\)"],
  },
  {
    id: "conv_discrete_def",
    name: "discrete convolution",
    tex: "f_1[k] * f_2[k] = \\sum_{n=-\\infty}^{+\\infty} f_1[n]\\,f_2[k-n]",
    category: "Convolution",
    page: 6,
    triggers: ["discrete convolution", "f_1\\[k\\]\\s*\\*\\s*f_2", "convol.*\\[k\\]"],
  },
  {
    id: "conv_geometric",
    name: "convolution: γᵏu * u",
    tex: "\\gamma^k u[k] * u[k] = \\frac{1-\\gamma^{k+1}}{1-\\gamma}\\,u[k]",
    category: "Convolution",
    page: 6,
    triggers: ["\\\\gamma\\^k u", "\\(1-\\\\?gamma\\^\\(k\\+1\\)\\)/\\(1-\\\\?gamma"],
  },

  /* ============================================================
     Fourier series (PDF pages 7-9)
     ============================================================ */
  {
    id: "fourier_series_exp",
    name: "exponential Fourier series",
    tex: "f(t) = \\sum_{n=-\\infty}^{+\\infty} D_n e^{jn\\omega_0 t},\\quad \\omega_0 = \\tfrac{2\\pi}{T_0}",
    category: "Fourier series",
    page: 7,
    triggers: ["exponential fourier series", "D_n e\\^", "\\\\sum.*D_n"],
  },
  {
    id: "fourier_series_dn",
    name: "Fourier coefficient D_n",
    tex: "D_n = \\frac{1}{T_0}\\int_{t_0}^{t_0+T_0} f(t)\\,e^{-jn\\omega_0 t}\\,dt",
    category: "Fourier series",
    page: 7,
    triggers: ["D_n\\s*=", "fourier coefficient", "\\\\int.*e\\^\\(-jn"],
  },
  {
    id: "fourier_series_trig",
    name: "trigonometric Fourier series",
    tex: "f(t) = a_0 + \\sum_{n=1}^{\\infty}\\bigl[a_n\\cos(n\\omega_0 t) + b_n\\sin(n\\omega_0 t)\\bigr]",
    category: "Fourier series",
    page: 7,
    triggers: ["trigonometric fourier", "a_0\\s*\\+\\s*\\\\sum", "a_n cos.*b_n sin"],
  },
  {
    id: "fourier_series_an",
    name: "Fourier coefficient a_n",
    tex: "a_n = \\frac{2}{T_0}\\int_{t_0}^{t_0+T_0} f(t)\\cos(n\\omega_0 t)\\,dt",
    category: "Fourier series",
    page: 7,
    triggers: ["a_n\\s*=", "(2/T_0).*cos\\(n"],
  },
  {
    id: "fourier_series_bn",
    name: "Fourier coefficient b_n",
    tex: "b_n = \\frac{2}{T_0}\\int_{t_0}^{t_0+T_0} f(t)\\sin(n\\omega_0 t)\\,dt",
    category: "Fourier series",
    page: 7,
    triggers: ["b_n\\s*=", "(2/T_0).*sin\\(n"],
  },
  {
    id: "fourier_series_compact",
    name: "compact trig series",
    tex: "f(t) = C_0 + \\sum_{n=1}^{\\infty} C_n\\cos(n\\omega_0 t + \\theta_n),\\;C_n = \\sqrt{a_n^2+b_n^2}",
    category: "Fourier series",
    page: 7,
    triggers: ["compact.*fourier", "C_n\\s*cos", "C_n\\s*=\\s*\\\\?sqrt"],
  },
  {
    id: "fourier_dn_to_trig",
    name: "D_n ↔ a_n, b_n",
    tex: "a_n = 2\\,\\Re\\{D_n\\},\\;b_n = -2\\,\\Im\\{D_n\\}",
    category: "Fourier series",
    page: 7,
    triggers: ["a_n\\s*=\\s*2\\s*Re", "b_n\\s*=\\s*-2\\s*Im"],
  },
  {
    id: "parseval_series",
    name: "Parseval (series)",
    tex: "P = \\frac{1}{T_0}\\int_{t_0}^{t_0+T_0}|f(t)|^2\\,dt = D_0^2 + 2\\sum_{n=1}^{\\infty}|D_n|^2",
    category: "Fourier series",
    page: 8,
    triggers: ["parseval", "average power", "signal power", "\\\\sum.*\\|D_n\\|\\^2"],
  },
  {
    id: "fourier_even_odd",
    name: "even/odd decomposition",
    tex: "f_{\\rm even}(t) = \\tfrac{1}{2}[f(t)+f(-t)],\\;f_{\\rm odd}(t) = \\tfrac{1}{2}[f(t)-f(-t)]",
    category: "Fourier series",
    page: 8,
    triggers: ["even.*odd.*decomposition", "f\\(t\\)\\s*\\+\\s*f\\(-t\\)", "even part"],
  },

  /* ============================================================
     Standard waveform Fourier series (PDF page 9)
     ============================================================ */
  {
    id: "fs_square_wave",
    name: "Fourier series: square wave",
    tex: "x(t) = \\sum_{n=1}^{\\infty}\\frac{4A}{n\\pi}\\sin\\bigl(\\tfrac{n\\pi}{2}\\bigr)\\cos\\bigl(\\tfrac{2n\\pi t}{T_0}\\bigr)",
    category: "Standard Fourier series",
    page: 9,
    triggers: ["square wave"],
  },
  {
    id: "fs_pulse_train",
    name: "Fourier series: pulse train",
    tex: "x(t) = \\frac{A\\tau}{T_0} + \\sum_{n=1}^{\\infty}\\frac{2A}{n\\pi}\\sin\\bigl(\\tfrac{n\\pi\\tau}{T_0}\\bigr)\\cos\\bigl(\\tfrac{2n\\pi t}{T_0}\\bigr)",
    category: "Standard Fourier series",
    page: 9,
    triggers: ["pulse train", "rectangular pulse train"],
  },
  {
    id: "fs_sawtooth",
    name: "Fourier series: sawtooth",
    tex: "x(t) = \\sum_{n=1}^{\\infty}(-1)^{n+1}\\,\\frac{2A}{n\\pi}\\sin\\bigl(\\tfrac{2n\\pi t}{T_0}\\bigr)",
    category: "Standard Fourier series",
    page: 9,
    triggers: ["sawtooth"],
  },
  {
    id: "fs_triangle",
    name: "Fourier series: triangle wave",
    tex: "x(t) = \\sum_{n=1,\\text{odd}}^{\\infty}\\frac{8A}{n^2\\pi^2}\\cos\\bigl(\\tfrac{2n\\pi t}{T_0}\\bigr)",
    category: "Standard Fourier series",
    page: 9,
    triggers: ["triangular wave", "triangle wave"],
  },

  /* ============================================================
     Fourier transform pairs (PDF page 10)
     ============================================================ */
  {
    id: "ft_def",
    name: "Fourier transform definition",
    tex: "F(\\omega) = \\int_{-\\infty}^{+\\infty} f(t)\\,e^{-j\\omega t}\\,dt",
    category: "Fourier transform",
    page: 1,
    triggers: ["fourier transform", "F\\(\\\\omega\\)\\s*=\\s*\\\\int", "fourier integral"],
  },
  {
    id: "ft_exp_decay",
    name: "FT pair: e^(-at)u(t)",
    tex: "e^{-at}u(t) \\;\\longleftrightarrow\\; \\dfrac{1}{a+j\\omega},\\;a>0",
    category: "Fourier transform",
    page: 10,
    triggers: ["e\\^\\(-at\\)u\\(t\\).*F\\(\\\\omega", "1/\\(a\\s*\\+\\s*j\\\\?omega\\)"],
  },
  {
    id: "ft_pair_delta",
    name: "FT pair: δ(t)",
    tex: "\\delta(t) \\;\\longleftrightarrow\\; 1",
    category: "Fourier transform",
    page: 10,
    triggers: ["\\\\delta\\(t\\).*1", "FT.*delta"],
  },
  {
    id: "ft_pair_one",
    name: "FT pair: 1",
    tex: "1 \\;\\longleftrightarrow\\; 2\\pi\\delta(\\omega)",
    category: "Fourier transform",
    page: 10,
    triggers: ["2\\\\?pi\\\\?delta\\(\\\\?omega\\)"],
  },
  {
    id: "ft_pair_cos",
    name: "FT pair: cos(ω₀t)",
    tex: "\\cos(\\omega_0 t) \\;\\longleftrightarrow\\; \\pi[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)]",
    category: "Fourier transform",
    page: 10,
    triggers: ["FT.*cos\\(\\\\omega_0", "\\\\delta\\(\\\\?omega-\\\\?omega_0\\)\\s*\\+\\s*\\\\delta"],
  },
  {
    id: "ft_pair_sin",
    name: "FT pair: sin(ω₀t)",
    tex: "\\sin(\\omega_0 t) \\;\\longleftrightarrow\\; j\\pi[\\delta(\\omega+\\omega_0)-\\delta(\\omega-\\omega_0)]",
    category: "Fourier transform",
    page: 10,
    triggers: ["FT.*sin\\(\\\\omega_0", "j\\\\?pi.*\\\\delta\\(\\\\?omega"],
  },
  {
    id: "ft_pair_u",
    name: "FT pair: u(t)",
    tex: "u(t) \\;\\longleftrightarrow\\; \\pi\\delta(\\omega) + \\dfrac{1}{j\\omega}",
    category: "Fourier transform",
    page: 10,
    triggers: ["FT.*u\\(t\\)", "\\\\?pi\\\\?delta.*1/\\(j\\\\?omega\\)"],
  },
  {
    id: "ft_pair_rect",
    name: "FT pair: rect(t/τ)",
    tex: "\\text{rect}(t/\\tau) \\;\\longleftrightarrow\\; \\tau\\,\\text{sinc}(\\omega\\tau/2)",
    category: "Fourier transform",
    page: 10,
    triggers: ["rect\\(t/\\\\?tau\\)", "rectangular pulse.*sinc"],
  },
  {
    id: "ft_pair_sinc",
    name: "FT pair: sinc(Wt)",
    tex: "\\tfrac{W}{\\pi}\\,\\text{sinc}(Wt) \\;\\longleftrightarrow\\; \\text{rect}\\bigl(\\tfrac{\\omega}{2W}\\bigr)",
    category: "Fourier transform",
    page: 10,
    triggers: ["sinc\\(Wt\\)", "ideal lowpass"],
  },
  {
    id: "ft_pair_gaussian",
    name: "FT pair: Gaussian",
    tex: "e^{-t^2/\\sigma^2} \\;\\longleftrightarrow\\; \\sigma\\sqrt{2\\pi}\\,e^{-\\sigma^2\\omega^2/2}",
    category: "Fourier transform",
    page: 10,
    triggers: ["gaussian", "e\\^\\(-t\\^2"],
  },

  /* ============================================================
     Fourier transform operations (PDF page 11)
     ============================================================ */
  {
    id: "ft_op_addition",
    name: "FT linearity",
    tex: "f_1(t)+f_2(t) \\;\\longleftrightarrow\\; F_1(\\omega)+F_2(\\omega)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["FT.*linearity", "linearity.*fourier"],
  },
  {
    id: "ft_op_scaling",
    name: "FT scaling",
    tex: "f(at) \\;\\longleftrightarrow\\; \\tfrac{1}{|a|}F\\bigl(\\tfrac{\\omega}{a}\\bigr)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["FT.*scaling", "f\\(at\\).*F\\(\\\\omega/a"],
  },
  {
    id: "ft_op_time_shift",
    name: "FT time shift",
    tex: "f(t-t_0) \\;\\longleftrightarrow\\; F(\\omega)e^{-j\\omega t_0}",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["FT.*time shift", "f\\(t-t_0\\).*e\\^\\(-j\\\\omega t_0\\)"],
  },
  {
    id: "ft_op_freq_shift",
    name: "FT frequency shift (modulation)",
    tex: "f(t)e^{j\\omega_0 t} \\;\\longleftrightarrow\\; F(\\omega-\\omega_0)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["frequency shift", "modulation theorem"],
  },
  {
    id: "ft_op_time_conv",
    name: "FT: time convolution",
    tex: "f_1(t)*f_2(t) \\;\\longleftrightarrow\\; F_1(\\omega)F_2(\\omega)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["time convolution.*F_1.*F_2", "time-domain convolution"],
  },
  {
    id: "ft_op_freq_conv",
    name: "FT: frequency convolution",
    tex: "f_1(t)f_2(t) \\;\\longleftrightarrow\\; \\tfrac{1}{2\\pi}F_1(\\omega)*F_2(\\omega)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["frequency convolution", "multiplication.*time"],
  },
  {
    id: "ft_op_diff_time",
    name: "FT: time differentiation",
    tex: "\\frac{d^n f}{dt^n} \\;\\longleftrightarrow\\; (j\\omega)^n F(\\omega)",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["FT.*differentiat", "\\(j\\\\omega\\)\\^n"],
  },
  {
    id: "ft_op_modulation",
    name: "FT: modulation by cos",
    tex: "f(t)\\cos(\\omega_0 t) \\;\\longleftrightarrow\\; \\tfrac{1}{2}[F(\\omega-\\omega_0)+F(\\omega+\\omega_0)]",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["f\\(t\\)cos\\(\\\\omega_0", "modulation by cosine"],
  },
  {
    id: "parseval_ft",
    name: "Parseval (Fourier)",
    tex: "E_f = \\int_{-\\infty}^{\\infty}|f(t)|^2\\,dt = \\tfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty}|F(\\omega)|^2\\,d\\omega",
    category: "Fourier transform ops",
    page: 11,
    triggers: ["parseval.*fourier", "energy.*F\\(\\\\?omega", "rayleigh"],
  },

  /* ============================================================
     Laplace transform pairs (PDF pages 13, 15-19)
     ============================================================ */
  {
    id: "laplace_def",
    name: "Laplace transform definition",
    tex: "F(s) = \\int_{0^-}^{\\infty} f(t)\\,e^{-st}\\,dt",
    category: "Laplace transform",
    page: 1,
    triggers: ["laplace transform", "F\\(s\\)\\s*=\\s*\\\\int", "laplace integral"],
  },
  {
    id: "laplace_pair_delta",
    name: "Laplace pair: δ(t)",
    tex: "\\delta(t) \\;\\longleftrightarrow\\; 1",
    category: "Laplace transform",
    page: 13,
    triggers: ["L.*\\\\delta\\(t\\)", "laplace.*delta"],
  },
  {
    id: "laplace_pair_step",
    name: "Laplace pair: u(t)",
    tex: "u(t) \\;\\longleftrightarrow\\; \\dfrac{1}{s}",
    category: "Laplace transform",
    page: 13,
    triggers: ["L.*u\\(t\\)", "1/s", "L\\{u"],
  },
  {
    id: "laplace_pair_t",
    name: "Laplace pair: tu(t)",
    tex: "t\\,u(t) \\;\\longleftrightarrow\\; \\dfrac{1}{s^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["tu\\(t\\).*1/s\\^2", "1/s\\^2"],
  },
  {
    id: "laplace_pair_tn",
    name: "Laplace pair: tⁿu(t)",
    tex: "t^n u(t) \\;\\longleftrightarrow\\; \\dfrac{n!}{s^{n+1}}",
    category: "Laplace transform",
    page: 13,
    triggers: ["t\\^n\\s*u\\(t\\).*s\\^\\(n\\+1\\)", "n!/s\\^"],
  },
  {
    id: "laplace_pair_exp",
    name: "Laplace pair: e^(λt)u(t)",
    tex: "e^{\\lambda t}u(t) \\;\\longleftrightarrow\\; \\dfrac{1}{s-\\lambda}",
    category: "Laplace transform",
    page: 13,
    triggers: ["1/\\(s-\\\\?lambda", "e\\^\\(\\\\?lambda t\\)\\s*u", "e\\^\\(-?at\\)\\s*u"],
  },
  {
    id: "laplace_pair_t_exp",
    name: "Laplace pair: te^(λt)u(t)",
    tex: "t\\,e^{\\lambda t}u(t) \\;\\longleftrightarrow\\; \\dfrac{1}{(s-\\lambda)^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["te\\^.*u\\(t\\).*\\(s-\\\\?lambda\\)\\^2", "1/\\(s-\\\\?lambda\\)\\^2"],
  },
  {
    id: "laplace_pair_cos",
    name: "Laplace pair: cos(bt)u(t)",
    tex: "\\cos(bt)\\,u(t) \\;\\longleftrightarrow\\; \\dfrac{s}{s^2+b^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["s/\\(s\\^2\\s*\\+\\s*b\\^2", "cos\\s*bt\\s*u\\(t\\)"],
  },
  {
    id: "laplace_pair_sin",
    name: "Laplace pair: sin(bt)u(t)",
    tex: "\\sin(bt)\\,u(t) \\;\\longleftrightarrow\\; \\dfrac{b}{s^2+b^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["b/\\(s\\^2\\s*\\+\\s*b\\^2", "sin\\s*bt\\s*u\\(t\\)"],
  },
  {
    id: "laplace_pair_e_cos",
    name: "Laplace pair: e^(-at)cos(bt)u(t)",
    tex: "e^{-at}\\cos(bt)u(t) \\;\\longleftrightarrow\\; \\dfrac{s+a}{(s+a)^2+b^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["e\\^\\(-at\\)\\s*cos.*\\(s\\+a\\)\\^2\\s*\\+\\s*b\\^2"],
  },
  {
    id: "laplace_pair_e_sin",
    name: "Laplace pair: e^(-at)sin(bt)u(t)",
    tex: "e^{-at}\\sin(bt)u(t) \\;\\longleftrightarrow\\; \\dfrac{b}{(s+a)^2+b^2}",
    category: "Laplace transform",
    page: 13,
    triggers: ["e\\^\\(-at\\)\\s*sin.*\\(s\\+a\\)\\^2\\s*\\+\\s*b\\^2"],
  },
  {
    id: "laplace_pair_underdamped",
    name: "Laplace pair: 2nd-order underdamped",
    tex: "\\dfrac{1}{s^2+2\\zeta\\omega_n s+\\omega_n^2} \\;\\longleftrightarrow\\; \\dfrac{1}{\\omega_n\\sqrt{1-\\zeta^2}}\\,e^{-\\zeta\\omega_n t}\\sin(\\omega_n\\sqrt{1-\\zeta^2}\\,t)",
    category: "Laplace transform",
    page: 16,
    triggers: ["damping ratio", "\\\\zeta", "natural frequency", "underdamped"],
  },

  /* ============================================================
     Laplace properties (PDF page 14)
     ============================================================ */
  {
    id: "laplace_op_diff",
    name: "Laplace: time differentiation",
    tex: "\\dfrac{df}{dt} \\;\\longleftrightarrow\\; sF(s) - f(0^-)",
    category: "Laplace properties",
    page: 14,
    triggers: ["sF\\(s\\)\\s*-\\s*f\\(0", "differentiat.*laplace", "L.*derivative"],
  },
  {
    id: "laplace_op_diff2",
    name: "Laplace: 2nd derivative",
    tex: "\\dfrac{d^2 f}{dt^2} \\;\\longleftrightarrow\\; s^2F(s) - sf(0^-) - \\dot f(0^-)",
    category: "Laplace properties",
    page: 14,
    triggers: ["s\\^2\\s*F\\(s\\)\\s*-\\s*s\\s*f\\(0", "second derivative.*laplace"],
  },
  {
    id: "laplace_op_int",
    name: "Laplace: time integration",
    tex: "\\int_{0^-}^{t} f(\\tau)\\,d\\tau \\;\\longleftrightarrow\\; \\dfrac{1}{s}F(s)",
    category: "Laplace properties",
    page: 14,
    triggers: ["F\\(s\\)/s", "integration.*laplace", "L.*integral.*f"],
  },
  {
    id: "laplace_op_time_shift",
    name: "Laplace: time shift",
    tex: "f(t-t_0)u(t-t_0) \\;\\longleftrightarrow\\; F(s)e^{-st_0}",
    category: "Laplace properties",
    page: 14,
    triggers: ["F\\(s\\)\\s*e\\^\\(-s\\s*t_0", "delay.*laplace", "time shift.*laplace"],
  },
  {
    id: "laplace_op_freq_shift",
    name: "Laplace: frequency shift",
    tex: "f(t)e^{s_0 t} \\;\\longleftrightarrow\\; F(s-s_0)",
    category: "Laplace properties",
    page: 14,
    triggers: ["F\\(s-s_0", "frequency shift.*laplace", "shift in s"],
  },
  {
    id: "laplace_op_conv",
    name: "Laplace: time convolution",
    tex: "f_1(t)*f_2(t) \\;\\longleftrightarrow\\; F_1(s)F_2(s)",
    category: "Laplace properties",
    page: 14,
    triggers: ["F_1\\(s\\)F_2\\(s\\)", "convolution.*laplace"],
  },
  {
    id: "laplace_op_initial_value",
    name: "initial-value theorem",
    tex: "f(0^+) = \\lim_{s\\to\\infty} sF(s)",
    category: "Laplace properties",
    page: 14,
    triggers: ["initial value theorem", "lim.*sF\\(s\\)", "f\\(0\\^\\+\\)"],
  },
  {
    id: "laplace_op_final_value",
    name: "final-value theorem",
    tex: "f(\\infty) = \\lim_{s\\to 0} sF(s),\\;\\text{poles of }sF(s)\\text{ in LHP}",
    category: "Laplace properties",
    page: 14,
    triggers: ["final value theorem", "lim_{s\\\\?to 0}", "f\\(\\\\?infty\\)"],
  },
  {
    id: "laplace_op_scaling",
    name: "Laplace: scaling",
    tex: "f(at) \\;\\longleftrightarrow\\; \\tfrac{1}{a}F\\bigl(\\tfrac{s}{a}\\bigr),\\;a\\ge 0",
    category: "Laplace properties",
    page: 14,
    triggers: ["scaling.*laplace", "f\\(at\\).*F\\(s/a"],
  },

  /* ============================================================
     s-domain circuits (PDF page 12)
     ============================================================ */
  {
    id: "circuit_capacitor",
    name: "capacitor in s-domain",
    tex: "Z_C(s) = \\dfrac{1}{sC},\\quad V_C(s) = \\dfrac{I_C(s)}{sC} + \\dfrac{v_C(0^-)}{s}",
    category: "s-domain circuits",
    page: 12,
    triggers: ["capacitor.*s-domain", "1/\\(sC\\)", "v_C\\(0", "Z_C"],
  },
  {
    id: "circuit_inductor",
    name: "inductor in s-domain",
    tex: "Z_L(s) = sL,\\quad V_L(s) = sL\\,I_L(s) - L\\,i_L(0^-)",
    category: "s-domain circuits",
    page: 12,
    triggers: ["inductor.*s-domain", "sL", "i_L\\(0", "Z_L"],
  },
  {
    id: "circuit_transfer_function",
    name: "transfer function H(s)",
    tex: "H(s) = \\dfrac{Y(s)}{F(s)},\\quad H(\\omega) = H(s)\\big|_{s=j\\omega}",
    category: "s-domain circuits",
    page: 1,
    triggers: ["transfer function", "H\\(s\\)\\s*=\\s*Y", "frequency response"],
  },
  {
    id: "stability_lti",
    name: "stability of LTI",
    tex: "\\text{Stable iff }\\Re(s_i) < 0\\text{ for every pole }s_i\\text{ of }H(s)",
    category: "s-domain circuits",
    page: 1,
    triggers: ["stability.*LHP", "\\\\Re\\(s_i\\)\\s*<\\s*0", "pole.*left.*half"],
  },

  /* ============================================================
     z-Transform (PDF pages 20-21)
     ============================================================ */
  {
    id: "z_def",
    name: "z-transform definition",
    tex: "F(z) = \\sum_{k=-\\infty}^{\\infty} f[k]\\,z^{-k}",
    category: "z-transform",
    page: 1,
    triggers: ["z-transform", "F\\(z\\)\\s*=\\s*\\\\sum", "z transform definition"],
  },
  {
    id: "z_pair_delta",
    name: "z pair: δ[k-n]",
    tex: "\\delta[k-n] \\;\\longleftrightarrow\\; \\dfrac{1}{z^n}",
    category: "z-transform",
    page: 20,
    triggers: ["\\\\delta\\[k-n\\]", "1/z\\^n"],
  },
  {
    id: "z_pair_step",
    name: "z pair: u[k]",
    tex: "u[k] \\;\\longleftrightarrow\\; \\dfrac{z}{z-1}",
    category: "z-transform",
    page: 20,
    triggers: ["u\\[k\\].*z/\\(z-1", "Z\\{u\\["],
  },
  {
    id: "z_pair_geometric",
    name: "z pair: γᵏu[k]",
    tex: "\\gamma^k u[k] \\;\\longleftrightarrow\\; \\dfrac{z}{z-\\gamma}",
    category: "z-transform",
    page: 20,
    triggers: ["\\\\gamma\\^k\\s*u\\[k\\].*z/\\(z-\\\\?gamma", "geometric.*z"],
  },
  {
    id: "z_pair_kgamma",
    name: "z pair: kγᵏu[k]",
    tex: "k\\gamma^k u[k] \\;\\longleftrightarrow\\; \\dfrac{\\gamma z}{(z-\\gamma)^2}",
    category: "z-transform",
    page: 20,
    triggers: ["k\\\\?gamma\\^k", "\\(z-\\\\?gamma\\)\\^2"],
  },
  {
    id: "z_op_right_shift",
    name: "z: right-shift",
    tex: "f[k-m]u[k-m] \\;\\longleftrightarrow\\; \\dfrac{1}{z^m}F(z)",
    category: "z-transform ops",
    page: 21,
    triggers: ["right-shift", "f\\[k-m\\]"],
  },
  {
    id: "z_op_left_shift",
    name: "z: left-shift",
    tex: "f[k+m]u[k] \\;\\longleftrightarrow\\; z^m F(z) - z^m\\sum_{i=0}^{m-1}f[i]z^{-i}",
    category: "z-transform ops",
    page: 21,
    triggers: ["left-shift", "f\\[k\\+m\\]"],
  },
  {
    id: "z_op_mult_gamma",
    name: "z: multiplication by γᵏ",
    tex: "\\gamma^k f[k]u[k] \\;\\longleftrightarrow\\; F\\bigl(\\tfrac{z}{\\gamma}\\bigr)",
    category: "z-transform ops",
    page: 21,
    triggers: ["F\\(z/\\\\?gamma", "\\\\gamma\\^k\\s*f\\[k\\]"],
  },
  {
    id: "z_op_initial",
    name: "z initial-value",
    tex: "f[0] = \\lim_{z\\to\\infty} F(z)",
    category: "z-transform ops",
    page: 21,
    triggers: ["initial value.*z", "f\\[0\\]\\s*=\\s*\\\\?lim"],
  },
  {
    id: "z_op_final",
    name: "z final-value",
    tex: "\\lim_{N\\to\\infty} f[N] = \\lim_{z\\to 1}(z-1)F(z)",
    category: "z-transform ops",
    page: 21,
    triggers: ["final value.*z", "\\(z-1\\)\\s*F\\(z\\)"],
  },
  {
    id: "z_op_conv",
    name: "z time convolution",
    tex: "f_1[k]*f_2[k] \\;\\longleftrightarrow\\; F_1(z)F_2(z)",
    category: "z-transform ops",
    page: 21,
    triggers: ["F_1\\(z\\)\\s*F_2\\(z\\)", "convolution.*z-transform"],
  },
  {
    id: "z_stability",
    name: "stability (DT)",
    tex: "\\text{Stable iff }|\\gamma_i|<1\\text{ for every pole }\\gamma_i\\text{ of }H(z)",
    category: "z-transform",
    page: 1,
    triggers: ["\\\\?gamma_i", "\\|\\\\?gamma\\|\\s*<\\s*1", "inside unit circle"],
  },

  /* ============================================================
     DTFT (PDF pages 22-23)
     ============================================================ */
  {
    id: "dtft_pair_delta",
    name: "DTFT: δ[k]",
    tex: "\\delta[k] \\;\\longleftrightarrow\\; 1",
    category: "DTFT",
    page: 22,
    triggers: ["DTFT.*\\\\delta\\[k\\]"],
  },
  {
    id: "dtft_pair_step",
    name: "DTFT: u[k]",
    tex: "u[k] \\;\\longleftrightarrow\\; \\dfrac{e^{j\\Omega}}{e^{j\\Omega}-1} + \\pi\\sum_{n=-\\infty}^{\\infty}\\delta(\\Omega - 2\\pi n)",
    category: "DTFT",
    page: 22,
    triggers: ["DTFT.*u\\[k\\]"],
  },
  {
    id: "dtft_pair_geom",
    name: "DTFT: γᵏu[k]",
    tex: "\\gamma^k u[k] \\;\\longleftrightarrow\\; \\dfrac{1}{1-\\gamma e^{-j\\Omega}},\\;|\\gamma|<1",
    category: "DTFT",
    page: 22,
    triggers: ["1/\\(1-\\\\?gamma e\\^\\(-j\\\\?Omega"],
  },
  {
    id: "dtft_op_time_shift",
    name: "DTFT time shift",
    tex: "f[k-n] \\;\\longleftrightarrow\\; F(\\Omega)e^{-jn\\Omega}",
    category: "DTFT ops",
    page: 23,
    triggers: ["F\\(\\\\?Omega\\)\\s*e\\^\\(-j\\s*n", "DTFT.*time shift"],
  },
  {
    id: "dtft_op_freq_shift",
    name: "DTFT frequency shift",
    tex: "e^{j\\Omega_0 k}f[k] \\;\\longleftrightarrow\\; F(\\Omega-\\Omega_0)",
    category: "DTFT ops",
    page: 23,
    triggers: ["F\\(\\\\?Omega\\s*-\\s*\\\\?Omega_0", "DTFT.*frequency shift"],
  },
  {
    id: "dtft_periodicity",
    name: "DTFT periodicity",
    tex: "F(\\Omega) = F(\\Omega \\pm 2n\\pi)",
    category: "DTFT ops",
    page: 23,
    triggers: ["DTFT.*period", "2n\\\\?pi", "periodic.*DTFT"],
  },
  {
    id: "parseval_dtft",
    name: "Parseval (DTFT)",
    tex: "E_f = \\sum_{k=-\\infty}^{\\infty}|f[k]|^2 = \\tfrac{1}{2\\pi}\\int_{2\\pi}|F(\\Omega)|^2\\,d\\Omega",
    category: "DTFT ops",
    page: 23,
    triggers: ["parseval.*DTFT", "energy.*F\\(\\\\?Omega"],
  },

  /* ============================================================
     Sampling theorem (PDF page 1)
     ============================================================ */
  {
    id: "sampling_theorem",
    name: "Nyquist sampling theorem",
    tex: "f_s = \\dfrac{1}{T_s} > 2B,\\;B = \\text{bandwidth of }f(t)",
    category: "Sampling",
    page: 1,
    triggers: ["sampling theorem", "nyquist", "f_s\\s*>\\s*2B", "T_s.*B"],
  },

  /* ============================================================
     Filter design / impulse-invariance (PDF pages 24-25)
     ============================================================ */
  {
    id: "impulse_invariance",
    name: "impulse-invariance mapping",
    tex: "\\dfrac{1}{s+a} \\;\\Rightarrow\\; \\dfrac{z}{z-e^{-aT}}",
    category: "Filter design",
    page: 24,
    triggers: ["impulse[- ]invariance", "z/\\(z\\s*-\\s*exp", "digitize.*analog"],
  },
  {
    id: "butterworth_lowpass",
    name: "Butterworth low-pass form",
    tex: "H_{LP}(s) = \\dfrac{K}{a_n(s/\\omega_o)^n + a_{n-1}(s/\\omega_o)^{n-1} + \\cdots + 1}",
    category: "Filter design",
    page: 25,
    triggers: ["butterworth", "low-pass.*butter", "butterworth filter"],
  },

  /* ============================================================
     Calculus (PDF pages 31-32)
     ============================================================ */
  {
    id: "diff_chain",
    name: "chain rule",
    tex: "\\dfrac{d}{dx}f(u) = \\dfrac{df}{du}\\,\\dfrac{du}{dx}",
    category: "Calculus",
    page: 31,
    triggers: ["chain rule"],
  },
  {
    id: "diff_product",
    name: "product rule",
    tex: "\\dfrac{d}{dx}(uv) = u\\dfrac{dv}{dx} + v\\dfrac{du}{dx}",
    category: "Calculus",
    page: 31,
    triggers: ["product rule"],
  },
  {
    id: "diff_quotient",
    name: "quotient rule",
    tex: "\\dfrac{d}{dx}\\!\\left(\\dfrac{u}{v}\\right) = \\dfrac{v\\,du/dx - u\\,dv/dx}{v^2}",
    category: "Calculus",
    page: 31,
    triggers: ["quotient rule"],
  },
  {
    id: "diff_exp",
    name: "derivative of e^(bx)",
    tex: "\\dfrac{d}{dx}e^{bx} = b\\,e^{bx}",
    category: "Calculus",
    page: 31,
    triggers: ["d/dx\\s*e\\^", "derivative.*exponential"],
  },
  {
    id: "int_by_parts",
    name: "integration by parts",
    tex: "\\int u\\,dv = uv - \\int v\\,du",
    category: "Calculus",
    page: 32,
    triggers: ["integration by parts", "\\\\int u dv"],
  },
  {
    id: "int_exp_sin",
    name: "∫e^(ax)sin(bx)dx",
    tex: "\\int e^{ax}\\sin(bx)\\,dx = \\dfrac{e^{ax}}{a^2+b^2}\\bigl(a\\sin bx - b\\cos bx\\bigr)",
    category: "Calculus",
    page: 32,
    triggers: ["e\\^\\(ax\\)\\s*sin\\(bx\\)", "integral.*e\\^.*sin"],
  },
  {
    id: "int_exp_cos",
    name: "∫e^(ax)cos(bx)dx",
    tex: "\\int e^{ax}\\cos(bx)\\,dx = \\dfrac{e^{ax}}{a^2+b^2}\\bigl(a\\cos bx + b\\sin bx\\bigr)",
    category: "Calculus",
    page: 32,
    triggers: ["e\\^\\(ax\\)\\s*cos\\(bx\\)", "integral.*e\\^.*cos"],
  },
  {
    id: "int_inverse_tan",
    name: "∫1/(x²+a²) dx",
    tex: "\\int \\dfrac{dx}{x^2+a^2} = \\tfrac{1}{a}\\tan^{-1}\\!\\bigl(\\tfrac{x}{a}\\bigr)",
    category: "Calculus",
    page: 32,
    triggers: ["1/\\(x\\^2\\s*\\+\\s*a\\^2", "tan\\^\\(-1\\)"],
  },
  {
    id: "lhopital",
    name: "L'Hôpital's rule",
    tex: "\\lim \\dfrac{f(x)}{g(x)} = \\lim \\dfrac{f'(x)}{g'(x)}\\;\\;(\\tfrac{0}{0}\\text{ or }\\tfrac{\\infty}{\\infty})",
    category: "Calculus",
    page: 37,
    triggers: ["l'?h.?pital", "indeterminate", "0/0", "\\\\infty/\\\\infty"],
  },

  /* ============================================================
     Series (PDF pages 29, 35-36)
     ============================================================ */
  {
    id: "taylor_series",
    name: "Taylor / Maclaurin series",
    tex: "f(x) = f(a) + \\dfrac{(x-a)}{1!}f'(a) + \\dfrac{(x-a)^2}{2!}f''(a) + \\cdots",
    category: "Series",
    page: 29,
    triggers: ["taylor series", "maclaurin", "f\\(a\\)\\s*\\+\\s*\\(x-a\\)"],
  },
  {
    id: "series_exp",
    name: "Taylor: eˣ",
    tex: "e^x = \\sum_{n=0}^{\\infty}\\dfrac{x^n}{n!} = 1 + x + \\dfrac{x^2}{2!} + \\cdots",
    category: "Series",
    page: 29,
    triggers: ["e\\^x.*=.*\\\\sum", "x\\^n/n!", "expand.*e\\^"],
  },
  {
    id: "series_sin",
    name: "Taylor: sin x",
    tex: "\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots",
    category: "Series",
    page: 29,
    triggers: ["sin x.*=.*x\\s*-\\s*x\\^3", "expand.*sin"],
  },
  {
    id: "series_cos",
    name: "Taylor: cos x",
    tex: "\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots",
    category: "Series",
    page: 29,
    triggers: ["cos x.*=.*1\\s*-\\s*x\\^2", "expand.*cos"],
  },
  {
    id: "series_geometric",
    name: "geometric series",
    tex: "\\sum_{k=0}^{\\infty} a^k = \\dfrac{1}{1-a},\\;|a|<1",
    category: "Series",
    page: 35,
    triggers: ["geometric series", "1/\\(1-a", "\\\\sum.*a\\^k"],
  },
  {
    id: "series_finite_geometric",
    name: "finite geometric sum",
    tex: "\\sum_{k=0}^{n} a^k = \\dfrac{a^{n+1}-1}{a-1}",
    category: "Series",
    page: 35,
    triggers: ["finite geometric", "\\(a\\^\\(n\\+1\\)\\s*-\\s*1\\)/\\(a\\s*-\\s*1\\)"],
  },
  {
    id: "series_arithmetic",
    name: "arithmetic series",
    tex: "\\sum_{k=1}^{n} k = \\tfrac{n(n+1)}{2}",
    category: "Series",
    page: 35,
    triggers: ["arithmetic series", "n\\(n\\+1\\)/2"],
  },
  {
    id: "binomial_expansion",
    name: "binomial expansion",
    tex: "(1+x)^n = 1 + nx + \\dfrac{n(n-1)}{2!}x^2 + \\cdots",
    category: "Series",
    page: 29,
    triggers: ["binomial expansion", "\\(1\\+x\\)\\^n"],
  },
];

/* Lookup helpers */
window.ECE4330_FORMULA_INDEX = (() => {
  const byId = {};
  window.ECE4330_FORMULAS.forEach((f) => (byId[f.id] = f));
  return byId;
})();

/* Pre-compile triggers once. We support both regex sources and plain substrings. */
window.ECE4330_FORMULA_TRIGGERS = window.ECE4330_FORMULAS.map((f) => {
  const compiled = (f.triggers || []).map((src) => {
    try {
      return new RegExp(src, "i");
    } catch {
      return new RegExp(src.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"), "i");
    }
  });
  return { id: f.id, regs: compiled };
});

/* Match step text → formula IDs.
 * `text` is the step's work/notebook string.
 * `topicHint` and `subtopicHints` (arrays of strings) bias which categories matter.
 * Returns ordered array of formula ids.
 */
window.ECE4330_MATCH_FORMULAS = function (text, topicHint, subtopicHints) {
  if (!text) return [];
  const haystack = String(text);
  const matched = new Set();
  window.ECE4330_FORMULA_TRIGGERS.forEach(({ id, regs }) => {
    if (regs.some((re) => re.test(haystack))) matched.add(id);
  });
  return Array.from(matched);
};
