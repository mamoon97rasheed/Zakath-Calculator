import { useState, useEffect } from "react";

const NISAB_GOLD_GRAMS = 85; // 85 grams of gold
const GOLD_PRICE_PER_GRAM_USD = 98; // approximate current gold price
const NISAB_THRESHOLD = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM_USD; // ~$8,330
const ZAKAT_RATE = 0.025; // 2.5%

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
];

const conversionRates = {
  USD: 1, EUR: 0.92, GBP: 0.79, SAR: 3.75,
  MYR: 4.72, PKR: 278, BDT: 110, IDR: 16200,
};

const fields = [
  { id: "cash", label: "Cash & Bank Savings", icon: "💵", category: "assets", tooltip: "Money in hand, current & savings accounts" },
  { id: "gold", label: "Gold & Silver Value", icon: "🥇", category: "assets", tooltip: "Market value of all gold and silver owned" },
  { id: "investments", label: "Investments & Stocks", icon: "📈", category: "assets", tooltip: "Stocks, bonds, mutual funds, crypto" },
  { id: "businessAssets", label: "Business Assets", icon: "🏪", category: "assets", tooltip: "Inventory, receivables, liquid business assets" },
  { id: "rentalIncome", label: "Rental Income (annual)", icon: "🏠", category: "income", tooltip: "Annual income from rental properties" },
  { id: "salary", label: "Annual Salary", icon: "💼", category: "income", tooltip: "Gross annual salary/wages" },
  { id: "otherIncome", label: "Other Annual Income", icon: "💰", category: "income", tooltip: "Freelance, dividends, any other income" },
  { id: "debts", label: "Debts & Liabilities", icon: "📋", category: "deductions", tooltip: "Outstanding loans, mortgages, credit card debt due" },
  { id: "expenses", label: "Annual Basic Expenses", icon: "🧾", category: "deductions", tooltip: "Essential living expenses for the year" },
];

export default function ZakatCalculator() {
  const [values, setValues] = useState({
    cash: "", gold: "", investments: "", businessAssets: "",
    rentalIncome: "", salary: "", otherIncome: "",
    debts: "", expenses: "",
  });
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [animateResult, setAnimateResult] = useState(false);

  const sym = currencies.find(c => c.code === currency)?.symbol || "$";
  const rate = conversionRates[currency] || 1;
  const nisabLocal = NISAB_THRESHOLD * rate;

  const parse = (v) => parseFloat(v) || 0;

  const calculate = () => {
    const totalAssets =
      parse(values.cash) + parse(values.gold) +
      parse(values.investments) + parse(values.businessAssets);

    const totalIncome =
      parse(values.rentalIncome) + parse(values.salary) + parse(values.otherIncome);

    const totalDeductions =
      parse(values.debts) + parse(values.expenses);

    const netWorth = totalAssets + totalIncome - totalDeductions;
    const zakatable = Math.max(0, netWorth);
    const meetsNisab = zakatable >= nisabLocal;
    const zakatDue = meetsNisab ? zakatable * ZAKAT_RATE : 0;

    setResult({ totalAssets, totalIncome, totalDeductions, netWorth, zakatable, meetsNisab, zakatDue });
    setAnimateResult(false);
    setTimeout(() => setAnimateResult(true), 50);
  };

  const reset = () => {
    setValues({
      cash: "", gold: "", investments: "", businessAssets: "",
      rentalIncome: "", salary: "", otherIncome: "",
      debts: "", expenses: "",
    });
    setResult(null);
  };

  const fmt = (n) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const categories = [
    { key: "assets", label: "Assets & Wealth", color: "#c8a96e" },
    { key: "income", label: "Annual Income", color: "#7eb8a4" },
    { key: "deductions", label: "Deductions", color: "#c47a6a" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8dcc8",
      padding: "0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background geometric pattern */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(200,169,110,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(126,184,164,0.06) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(196,122,106,0.04) 0%, transparent 60%)
        `,
      }} />

      {/* Geometric SVG overlay */}
      <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 0, pointerEvents: "none" }}>
        <defs>
          <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,5 47,25 68,25 52,38 58,60 40,47 22,60 28,38 12,25 33,25" fill="none" stroke="#c8a96e" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "40px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 8, filter: "drop-shadow(0 0 20px rgba(200,169,110,0.4))" }}>☽</div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: "normal",
            letterSpacing: "0.12em",
            color: "#c8a96e",
            margin: "0 0 6px",
            textShadow: "0 0 40px rgba(200,169,110,0.3)",
          }}>
            ZAKAT CALCULATOR
          </h1>
          <div style={{ width: 120, height: 1, background: "linear-gradient(90deg, transparent, #c8a96e, transparent)", margin: "12px auto" }} />
          <p style={{ color: "#8a7d6a", fontSize: 14, letterSpacing: "0.08em", margin: 0 }}>
            RAMADAN CHARITABLE GIVING · 2.5% OF ANNUAL WEALTH
          </p>
        </div>

        {/* Currency selector */}
        <div style={{
          background: "rgba(200,169,110,0.06)",
          border: "1px solid rgba(200,169,110,0.2)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}>
          <span style={{ color: "#8a7d6a", fontSize: 13, letterSpacing: "0.06em" }}>CURRENCY</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {currencies.map(c => (
              <button key={c.code} onClick={() => setCurrency(c.code)} style={{
                padding: "6px 14px",
                borderRadius: 20,
                border: currency === c.code ? "1px solid #c8a96e" : "1px solid rgba(200,169,110,0.2)",
                background: currency === c.code ? "rgba(200,169,110,0.15)" : "transparent",
                color: currency === c.code ? "#c8a96e" : "#6a5f50",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "inherit",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}>{c.code}</button>
            ))}
          </div>
          <span style={{ marginLeft: "auto", color: "#6a5f50", fontSize: 12 }}>
            Nisab: {sym}{fmt(nisabLocal)}
          </span>
        </div>

        {/* Input sections */}
        {categories.map(cat => {
          const catFields = fields.filter(f => f.category === cat.key);
          return (
            <div key={cat.key} style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid rgba(${cat.color === "#c8a96e" ? "200,169,110" : cat.color === "#7eb8a4" ? "126,184,164" : "196,122,106"},0.2)`,
              borderRadius: 14,
              padding: "24px",
              marginBottom: 20,
            }}>
              <h2 style={{
                margin: "0 0 20px",
                fontSize: 13,
                letterSpacing: "0.14em",
                color: cat.color,
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <span style={{ width: 24, height: 1, background: cat.color, display: "inline-block" }} />
                {cat.label.toUpperCase()}
                <span style={{ width: 24, height: 1, background: cat.color, display: "inline-block" }} />
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                {catFields.map(field => (
                  <div key={field.id} style={{ position: "relative" }}>
                    <label style={{
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 6, fontSize: 12, color: "#8a7d6a", letterSpacing: "0.06em"
                    }}>
                      <span>{field.icon}</span>
                      <span>{field.label.toUpperCase()}</span>
                      <span
                        onMouseEnter={() => setActiveTooltip(field.id)}
                        onMouseLeave={() => setActiveTooltip(null)}
                        style={{ cursor: "help", color: "#4a4035", fontSize: 11, border: "1px solid #4a4035", borderRadius: "50%", width: 14, height: 14, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>?</span>
                    </label>
                    {activeTooltip === field.id && (
                      <div style={{
                        position: "absolute", top: -40, left: 0, zIndex: 10,
                        background: "#1a1610", border: "1px solid rgba(200,169,110,0.3)",
                        borderRadius: 8, padding: "8px 12px", fontSize: 11,
                        color: "#a89880", whiteSpace: "nowrap", pointerEvents: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                      }}>
                        {field.tooltip}
                      </div>
                    )}
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                        color: "#6a5f50", fontSize: 14, pointerEvents: "none",
                      }}>{sym}</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        value={values[field.id]}
                        onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "12px 14px 12px 28px",
                          background: "rgba(200,169,110,0.04)",
                          border: "1px solid rgba(200,169,110,0.15)",
                          borderRadius: 8,
                          color: "#e8dcc8",
                          fontSize: 15,
                          fontFamily: "'Georgia', serif",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor = cat.color}
                        onBlur={e => e.target.style.borderColor = "rgba(200,169,110,0.15)"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Buttons */}
        <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
          <button onClick={calculate} style={{
            flex: 1, minWidth: 180,
            padding: "16px 28px",
            background: "linear-gradient(135deg, #c8a96e 0%, #a8893e 100%)",
            border: "none",
            borderRadius: 10,
            color: "#0f1117",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "inherit",
            letterSpacing: "0.12em",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 4px 20px rgba(200,169,110,0.3)",
          }}
            onMouseEnter={e => e.target.style.boxShadow = "0 6px 30px rgba(200,169,110,0.5)"}
            onMouseLeave={e => e.target.style.boxShadow = "0 4px 20px rgba(200,169,110,0.3)"}
          >
            ✦ CALCULATE ZAKAT
          </button>
          <button onClick={reset} style={{
            padding: "16px 24px",
            background: "transparent",
            border: "1px solid rgba(200,169,110,0.25)",
            borderRadius: 10,
            color: "#6a5f50",
            fontSize: 13,
            fontFamily: "inherit",
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(200,169,110,0.5)"; e.target.style.color = "#c8a96e"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(200,169,110,0.25)"; e.target.style.color = "#6a5f50"; }}
          >
            RESET
          </button>
        </div>

        {/* Result panel */}
        {result && (
          <div style={{
            background: "rgba(200,169,110,0.04)",
            border: `2px solid ${result.meetsNisab ? "rgba(200,169,110,0.5)" : "rgba(196,122,106,0.4)"}`,
            borderRadius: 16,
            padding: "32px",
            opacity: animateResult ? 1 : 0,
            transform: animateResult ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
            boxShadow: result.meetsNisab ? "0 0 60px rgba(200,169,110,0.08)" : "0 0 60px rgba(196,122,106,0.06)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{result.meetsNisab ? "🌙" : "📿"}</div>
              <h3 style={{
                margin: 0, fontSize: 11,
                letterSpacing: "0.18em",
                color: result.meetsNisab ? "#c8a96e" : "#c47a6a",
                fontWeight: "normal",
              }}>
                {result.meetsNisab ? "ZAKAT IS DUE" : "BELOW NISAB THRESHOLD"}
              </h3>
            </div>

            {/* Breakdown */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Total Assets", value: result.totalAssets, color: "#c8a96e" },
                { label: "Total Income", value: result.totalIncome, color: "#7eb8a4" },
                { label: "Deductions", value: result.totalDeductions, color: "#c47a6a" },
                { label: "Net Zakatable Wealth", value: result.zakatable, color: "#e8dcc8" },
              ].map(row => (
                <div key={row.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(200,169,110,0.1)",
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 11, color: "#6a5f50", letterSpacing: "0.08em", marginBottom: 6 }}>
                    {row.label.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 18, color: row.color, fontWeight: "normal" }}>
                    {sym}{fmt(row.value)}
                  </div>
                </div>
              ))}
            </div>

            {/* Nisab indicator */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 10, padding: "14px 18px",
              marginBottom: 20,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
            }}>
              <span style={{ color: "#6a5f50", fontSize: 12, letterSpacing: "0.06em" }}>
                NISAB THRESHOLD ({NISAB_GOLD_GRAMS}g of gold)
              </span>
              <span style={{ color: result.meetsNisab ? "#7eb8a4" : "#c47a6a", fontSize: 13 }}>
                {sym}{fmt(nisabLocal)} — {result.meetsNisab ? `✓ Your wealth exceeds nisab by ${sym}${fmt(result.zakatable - nisabLocal)}` : `✗ ${sym}${fmt(nisabLocal - result.zakatable)} below threshold`}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ height: 4, background: "rgba(200,169,110,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min(100, (result.zakatable / nisabLocal) * 100)}%`,
                  background: result.meetsNisab
                    ? "linear-gradient(90deg, #c8a96e, #7eb8a4)"
                    : "linear-gradient(90deg, #c47a6a, #a85a50)",
                  borderRadius: 2,
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>

            {/* Main result */}
            {result.meetsNisab && (
              <div style={{
                textAlign: "center",
                padding: "28px",
                background: "linear-gradient(135deg, rgba(200,169,110,0.08), rgba(200,169,110,0.02))",
                border: "1px solid rgba(200,169,110,0.25)",
                borderRadius: 14,
              }}>
                <div style={{ fontSize: 11, color: "#8a7d6a", letterSpacing: "0.14em", marginBottom: 8 }}>
                  YOUR ZAKAT DUE (2.5%)
                </div>
                <div style={{
                  fontSize: "clamp(36px, 8vw, 54px)",
                  color: "#c8a96e",
                  textShadow: "0 0 40px rgba(200,169,110,0.4)",
                  letterSpacing: "0.02em",
                }}>
                  {sym}{fmt(result.zakatDue)}
                </div>
                <div style={{ marginTop: 12, color: "#6a5f50", fontSize: 12 }}>
                  = {sym}{fmt(result.zakatable)} × 2.5%
                </div>
              </div>
            )}

            {!result.meetsNisab && (
              <div style={{ textAlign: "center", padding: 20, color: "#6a5f50", fontSize: 13, lineHeight: 1.7 }}>
                Your current wealth does not meet the Nisab threshold.<br />
                Zakat is not obligatory at this time, but voluntary Sadaqah is always encouraged.
              </div>
            )}

            {/* Disclaimer */}
            <p style={{
              marginTop: 24, padding: "12px 16px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: 8,
              fontSize: 11, color: "#4a4035", lineHeight: 1.7, textAlign: "center",
            }}>
              ✦ This calculator provides an estimate based on standard Hanafi/general principles. Gold price used: {sym}{fmt(GOLD_PRICE_PER_GRAM_USD * rate)}/g.
              For precise rulings, please consult a qualified Islamic scholar.
            </p>
          </div>
        )}
      </div>

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
