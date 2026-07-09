"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  Zap,
  Globe,
  Sparkles,
  CreditCard,
  Lock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/hook/useAuth";
import { upgradeUserTier } from "@/services/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

type Tier = "free" | "pro" | "enterprise";

interface PlanCardProps {
  name: string;
  tier: Tier;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isPopular?: boolean;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  currentTier: Tier;
  isYearly: boolean;
  onSelect: (tier: Tier, price: number) => void;
}

export default function UpgradePage() {
  const { user, token, updateUser } = useAuth();
  const router = useRouter();

  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [formError, setFormError] = useState("");

  const currentTier = (user?.tier as Tier) || "free";

  useEffect(() => {
    if (user) {
      setCardName(user.name || "");
    }
  }, [user]);

  const handleOpenCheckout = (tier: Tier, price: number) => {
    setSelectedTier(tier);
    setSelectedPrice(price);
    setShowModal(true);
    setFormError("");
    setSuccess(false);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
      setFormError("Please enter a valid 16-digit credit card number.");
      return;
    }
    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      setFormError("Please enter expiry in MM/YY format.");
      return;
    }
    if (!cardCvc || cardCvc.length < 3) {
      setFormError("Please enter a valid CVC code.");
      return;
    }
    if (!cardName) {
      setFormError("Please enter the cardholder's name.");
      return;
    }

    setLoading(true);

    try {
      if (!token || !selectedTier) {
        throw new Error("Session invalid. Please re-authenticate.");
      }

      // Simulate network latency for high fidelity
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const response = await upgradeUserTier(token, selectedTier);

      if (response.success && response.user) {
        // Sync context
        updateUser({
          ...user!,
          tier: response.user.tier,
          role: response.user.role,
        });

        // Set success states
        setSuccess(true);
        setCardNumber("");
        setCardExpiry("");
        setCardCvc("");
      } else {
        throw new Error(response.message || "Failed to update subscription.");
      }
    } catch (err: any) {
      setFormError(err.message || "Transaction declined. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces every 4 digits
    const cleaned = value.replace(/\D/g, "");
    const matches = cleaned.match(/\d{1,4}/g);
    if (matches) {
      setCardNumber(matches.join(" ").slice(0, 19));
    } else {
      setCardNumber("");
    }
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 antialiased selection:bg-sky-500/20 pb-16">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer-move {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer-move 5s linear infinite;
        }
      `}} />
      {/* Top Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[450px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 right-[15%] -z-10 h-[350px] w-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row">
        <Sidebar />

        <main className="flex-1 space-y-8">
          {/* Header Dashboard Banner */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/20 p-6 md:p-8 backdrop-blur-xl">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors mb-4 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>RETURN_TO_CORE</span>
            </Link>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscription Module</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Upgrade Workspace Registry
              </h1>
              <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                Scale your technical database pipelines. Unlock unlimited article hosting, full-text semantic searching, and collaborative cluster options down below.
              </p>
            </div>
          </section>

          {/* Billing Cycle Toggle */}
          <section className="flex flex-col items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-900 bg-slate-950/60 p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-wide transition-all ${
                  !isYearly
                    ? "bg-slate-900 text-white border border-slate-800 shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium tracking-wide transition-all ${
                  isYearly
                    ? "bg-slate-900 text-white border border-slate-800 shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Annual Billing
              </button>
            </div>
            {isYearly && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                ★ 20% DISCOUNT_APPLIED
              </span>
            )}
          </section>

          {/* Pricing Grid */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Starter Plan */}
            <PlanCard
              name="Starter Sandbox"
              tier="free"
              priceMonthly={0}
              priceYearly={0}
              description="Basic parameters for local builders tracking their personal references."
              features={[
                "Host up to 10 Wiki Articles",
                "Standard keyword indexing search",
                "Single workspace instance",
                "Community discussion support",
              ]}
              icon={<Globe className="w-5 h-5" />}
              accentColor="text-slate-400"
              borderColor="border-slate-900"
              glowColor="hover:border-slate-800"
              currentTier={currentTier}
              isYearly={isYearly}
              onSelect={handleOpenCheckout}
            />

            {/* Pro Plan */}
            <PlanCard
              name="Workspace Professional"
              tier="pro"
              priceMonthly={12}
              priceYearly={10}
              description="Full operational knowledge base for growing engineering teams and active nodes."
              features={[
                "Infinite Wiki Article hosting",
                "Advanced Full-text search indexer",
                "Version tracking logs (30 days)",
                "Up to 5 collaborative team nodes",
                "Dynamic article categories & tags",
                "Personal API integrations",
              ]}
              icon={<Zap className="w-5 h-5 text-sky-400" />}
              isPopular={true}
              accentColor="text-sky-400"
              borderColor="border-sky-500/40"
              glowColor="shadow-[0_0_35px_-5px_rgba(14,165,233,0.25)] hover:border-sky-500/60 relative overflow-hidden group hover:shadow-[0_0_45px_0_rgba(14,165,233,0.35)] hover:-translate-y-2.5"
              currentTier={currentTier}
              isYearly={isYearly}
              onSelect={handleOpenCheckout}
              extraSpec="UPTIME: 99.99%"
              cardEffect={<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none opacity-40 group-hover:animate-pulse" />}
            />

            {/* Enterprise Plan */}
            <PlanCard
              name="Enterprise Engine"
              tier="enterprise"
              priceMonthly={49}
              priceYearly={39}
              description="Dedicated clustered nodes with robust control vectors and infinite limits."
              features={[
                "Infinite team member nodes",
                "Dedicated database scaling instances",
                "Custom domain mapping routing",
                "SSO/SAML enterprise login access",
                "SLA uptime guarantee contracts",
                "24/7 Premium direct dev support",
              ]}
              icon={<Sparkles className="w-5 h-5 text-violet-400" />}
              accentColor="text-violet-400"
              borderColor="border-violet-500/40"
              glowColor="shadow-[0_0_45px_-5px_rgba(168,85,247,0.35)] hover:border-violet-500/60 relative overflow-hidden group hover:shadow-[0_0_55px_0_rgba(168,85,247,0.45)] hover:-translate-y-2.5 ring-1 ring-violet-500/20 bg-gradient-to-b from-slate-950 via-[#100b21]/20 to-slate-950"
              currentTier={currentTier}
              isYearly={isYearly}
              onSelect={handleOpenCheckout}
              extraSpec="LATENCY: <8ms"
              cardEffect={<div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(168,85,247,0.08)_40%,rgba(168,85,247,0.15)_50%,rgba(168,85,247,0.08)_60%,transparent_70%)] bg-[length:200%_100%] animate-shimmer pointer-events-none" style={{ animationDuration: '4s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }} />}
            />
          </section>

          {/* Secure Trust Banner */}
          <section className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-900/60 bg-slate-950/20 p-4 text-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>TLS_SECURED // 256-BIT ENCRYPTION</span>
            </div>
            <p className="text-[10px] text-slate-600 font-mono">
              Prices shown in USD. Change plans, upgrade, or terminate parameters at any point.
            </p>
          </section>
        </main>
      </div>

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 p-6 shadow-2xl">
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-violet-500" />

            {!success ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-sky-400" />
                    <span>CHECKOUT_TRANSACTION</span>
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-slate-900 bg-slate-950/60 p-1 text-slate-500 hover:text-slate-300 hover:border-slate-800 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-5 rounded-2xl border border-slate-900 bg-slate-900/20 p-4 font-mono">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Active Selection:</span>
                    <span className="text-white font-bold uppercase text-[11px] tracking-wide">
                      {selectedTier} Plan
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>Billing Interval:</span>
                    <span>{isYearly ? "Annual Billed" : "Monthly Billed"}</span>
                  </div>
                  <div className="border-t border-slate-900 my-2.5" />
                  <div className="flex justify-between text-sm font-bold text-white">
                    <span>Due immediately:</span>
                    <span className="text-sky-400">
                      ${isYearly ? (selectedPrice * 12).toFixed(2) : selectedPrice.toFixed(2)}
                      <span className="text-[10px] text-slate-500 font-normal">
                        {isYearly ? "/yr" : "/mo"}
                      </span>
                    </span>
                  </div>
                </div>

                {formError && (
                  <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="e.g. Samuel L. Operator"
                      className="w-full rounded-xl border border-slate-900 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-500/50 focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-xl border border-slate-900 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-500/50 focus:outline-none transition-colors font-mono pr-10"
                      />
                      <CreditCard className="absolute right-3.5 top-3 w-4 h-4 text-slate-600" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                        Expiration
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border border-slate-900 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-500/50 focus:outline-none transition-colors font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                        CVC Code
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                        placeholder="•••"
                        className="w-full rounded-xl border border-slate-900 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-500/50 focus:outline-none transition-colors font-mono text-center"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-200 py-3 text-xs font-mono font-bold text-slate-950 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PROCESSING_TX...</span>
                      </>
                    ) : (
                      <span>COMMIT_PAYMENT</span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 font-mono space-y-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="absolute -inset-1 rounded-full border border-emerald-500/10 animate-ping duration-1000" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white uppercase tracking-wide">
                    TX_COMMITTED_SUCCESSFULLY
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your environment credentials have been updated.
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-slate-900 bg-slate-900/10 p-4 text-xs text-slate-500 text-left leading-relaxed">
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Registry Mode:</span>
                    <span className="text-emerald-400 uppercase font-bold">{selectedTier}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>Transaction ID:</span>
                    <span>tx_{Math.random().toString(36).slice(2, 10)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                    <span>Timestamp:</span>
                    <span>{new Date().toISOString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowModal(false);
                    router.push("/dashboard");
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 py-3 text-xs font-bold text-white transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanCard({
  name,
  tier,
  priceMonthly,
  priceYearly,
  description,
  features,
  icon,
  isPopular = false,
  accentColor,
  borderColor,
  glowColor,
  currentTier,
  isYearly,
  onSelect,
  extraSpec,
  cardEffect,
}: PlanCardProps) {
  const isCurrentPlan = currentTier === tier;
  const isFree = tier === "free";

  const price = isYearly ? priceYearly : priceMonthly;

  const renderCardButton = () => {
    if (isCurrentPlan) {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-3 text-xs font-mono font-bold text-emerald-400 cursor-default"
        >
          <Check className="w-3.5 h-3.5" />
          <span>CURRENT_ACTIVE_TIER</span>
        </button>
      );
    }

    if (isFree) {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center rounded-xl border border-slate-900 bg-slate-950/60 py-3 text-xs font-mono font-medium text-slate-500 cursor-default"
        >
          Default Tier
        </button>
      );
    }

    return (
      <button
        onClick={() => onSelect(tier, price)}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-200 py-3 text-xs font-mono font-bold text-slate-950 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-[1.02]"
      >
        <span>UPGRADE_TO_{tier.toUpperCase()}</span>
      </button>
    );
  };

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-slate-950/40 p-6 backdrop-blur-xl transition-all duration-300 ${borderColor} ${glowColor} ${
        isPopular ? "md:-translate-y-2 ring-1 ring-sky-500/20" : "hover:-translate-y-2"
      }`}
    >
      {cardEffect}

      {isPopular && (
        <div className="absolute top-0 right-6 translate-y-[-50%] bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-slate-950 shadow-md z-10">
          Recommended Plan
        </div>
      )}

      <div className="space-y-5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-900 bg-slate-950/50">
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono leading-none">{name}</h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1 block">
                TIER_LOG_{tier.toUpperCase()}
              </span>
            </div>
          </div>
          {extraSpec && (
            <span className="rounded-md border border-slate-900 bg-slate-950 px-2 py-0.5 text-[8px] font-mono text-slate-400 uppercase tracking-wider">
              {extraSpec}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[48px]">
          {description}
        </p>

        <div className="py-2">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-white font-mono">
              ${price}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {isFree ? "" : isYearly ? "/month" : "/month"}
            </span>
          </div>
          {!isFree && (
            <p className="text-[10px] text-slate-500 font-mono mt-1">
              {isYearly
                ? `Billed annually at $${(price * 12).toFixed(2)}/yr`
                : "Billed monthly, cancel anytime"}
            </p>
          )}
        </div>

        <div className="border-t border-slate-900/60 my-4" />

        <ul className="space-y-3 font-sans text-xs">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
              <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accentColor}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 relative z-10">{renderCardButton()}</div>
    </div>
  );
}
