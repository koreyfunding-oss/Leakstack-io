/* Calculation logic extracted verbatim (renamed, not re-derived) from the
   original LeakStack production bundle. Do not "improve" the math here:
   the original's quirks (e.g. monthly revenue and business type are collected
   but unused by the leak formula; the excuse generator ignores the situation
   field) are preserved so results match the original tool. */

export const money = (n) => "$" + Math.round(n).toLocaleString();

export const pctOf = (value, total) => (total ? Math.round((value / total) * 100) : 0);

/* ---------------- Business Leak Detector ---------------- */

export const BUSINESS_TYPES = [
  "Agency",
  "Law Firm",
  "Medical Practice",
  "Real Estate",
  "Contractor",
  "Retail",
  "Restaurant",
  "SaaS",
  "Consulting",
  "Other",
];

export const RESPONSE_TIMES = [
  { label: "< 5 minutes", value: "fast" },
  { label: "1 – 24 hours", value: "medium" },
  { label: "> 24 hours", value: "slow" },
];

export function calcLeak(input) {
  const missedPerMonth = Number(input.missedLeads) * 4;
  const lostDeals = missedPerMonth * (Number(input.closeRate) / 100);
  const monthlyLeak = lostDeals * Number(input.leadValue);
  const yearlyLeak = monthlyLeak * 12;
  let severity = 50;
  if (input.responseTime === "medium") severity += 15;
  if (input.responseTime === "slow") severity += 30;
  if (!input.hasCRM) severity += 10;
  if (!input.hasFollowUp) severity += 10;
  severity = Math.min(100, severity);
  const problems = [];
  if (input.responseTime === "slow") problems.push("Response time > 24 hrs is killing conversions");
  if (input.responseTime === "medium") problems.push("Slow response time (1-24 hrs) — leads go cold fast");
  if (!input.hasCRM) problems.push("No CRM = lost contacts, lost deals");
  if (!input.hasFollowUp) problems.push("Zero automated follow-up means you forget money on the table");
  if (Number(input.missedLeads) > 5) problems.push("High volume of missed leads per week");
  if (problems.length === 0) problems.push("Your systems look solid — let's find hidden edge cases");
  return { missedPerMonth, lostDeals, monthlyLeak, yearlyLeak, severity, problems };
}

export function severityColor(severity) {
  if (severity >= 80) return "text-red-400";
  if (severity >= 60) return "text-orange-400";
  return "text-yellow-400";
}

/* ---------------- Honest Mortgage Calculator ---------------- */

export function calcMortgage(input) {
  const principal = Number(input.homePrice) - Number(input.downPayment);
  const monthlyRate = Number(input.interestRate) / 100 / 12;
  const months = Number(input.loanTerm) * 12;
  let pi = 0;
  if (monthlyRate === 0) {
    pi = principal / months;
  } else {
    pi =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }
  const taxes = Number(input.propertyTax) / 12;
  const insurance = Number(input.homeInsurance) / 12;
  const hoa = Number(input.hoa);
  const trueMonthly = pi + taxes + insurance + hoa;
  const totalPaid = pi * months;
  const totalInterest = totalPaid - principal;
  return { pi, taxes, insurance, hoa, trueMonthly, totalPaid, totalInterest, principal };
}

/* ---------------- Credit Damage Simulator ---------------- */

export const CREDIT_EVENTS = [
  { id: "late30", label: "30-Day Late Payment", recovery: "1-2 years" },
  { id: "collection", label: "Collection Account", recovery: "3-5 years" },
  { id: "chargeoff", label: "Charge-Off", recovery: "4-7 years" },
  { id: "bankruptcy", label: "Bankruptcy", recovery: "7-10 years" },
];

function dropRange(score, eventId) {
  if (eventId === "late30") {
    if (score >= 750) return { min: 90, max: 110 };
    if (score >= 700) return { min: 60, max: 80 };
    return { min: 40, max: 60 };
  }
  if (eventId === "collection") {
    if (score >= 750) return { min: 100, max: 125 };
    if (score >= 700) return { min: 70, max: 95 };
    return { min: 45, max: 65 };
  }
  if (eventId === "chargeoff") {
    if (score >= 750) return { min: 110, max: 140 };
    if (score >= 700) return { min: 80, max: 110 };
    return { min: 55, max: 75 };
  }
  if (eventId === "bankruptcy") {
    if (score >= 750) return { min: 160, max: 220 };
    if (score >= 700) return { min: 130, max: 175 };
    return { min: 100, max: 150 };
  }
  return { min: 0, max: 0 };
}

export function scoreRating(score) {
  if (score >= 750) return "Excellent";
  if (score >= 700) return "Good";
  if (score >= 650) return "Fair";
  if (score >= 580) return "Poor";
  return "Very Poor";
}

export function scoreColor(score) {
  if (score >= 750) return "#22c55e";
  if (score >= 700) return "#3b82f6";
  if (score >= 650) return "#eab308";
  if (score >= 580) return "#f97316";
  return "#ef4444";
}

export function scoreRatingColorClass(score) {
  if (score >= 750) return "text-green-400";
  if (score >= 700) return "text-blue-400";
  if (score >= 650) return "text-yellow-400";
  if (score >= 580) return "text-orange-400";
  return "text-red-400";
}

export function calcCreditDamage(score, eventIds, utilization) {
  let totalDrop = 0;
  const eventDetails = [];
  let recovery = { years: 0, label: "" };
  eventIds.forEach((id) => {
    const { min, max } = dropRange(score, id);
    const drop = Math.round((min + max) / 2);
    totalDrop += drop;
    const event = CREDIT_EVENTS.find((e) => e.id === id);
    eventDetails.push({ label: event.label, drop, recovery: event.recovery });
    const upper = parseInt(event.recovery.split("-")[1] || event.recovery, 10);
    if (upper > recovery.years) recovery = { years: upper, label: event.recovery };
  });
  if (utilization > 30) totalDrop += Math.round((utilization - 30) * 0.5);
  const newScore = Math.max(300, score - totalDrop);
  return {
    newScore,
    totalDrop,
    eventDetails,
    recovery: recovery.label || "N/A",
    rating: scoreRating(newScore),
    ratingColor: scoreRatingColorClass(newScore),
  };
}
