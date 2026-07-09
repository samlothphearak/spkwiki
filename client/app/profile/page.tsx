"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mail,
  User,
  Calendar,
  Shield,
  Verified,
  Lock,
  RefreshCw,
  Camera,
  Edit2,
  Check,
  X,
  Loader2,
  Info,
  Clock,
  Settings,
  Flame,
  Award,
  Zap,
  Terminal,
  Activity,
  Cpu,
  Database,
} from "lucide-react";
import { useAuth } from "@/hook/useAuth";
import { updateUserProfile } from "@/services/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

const PREMIUM_AVATARS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80", // Cyan flow
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80", // Purple sphere
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=150&auto=format&fit=crop&q=80", // Glowing neon wave
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150&auto=format&fit=crop&q=80", // Glassmorphism gradient
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80", // Abstract tech
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80", // Cyberpunk character
];

export default function ProfilePage() {
  const { user, token, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentTier = user?.tier || "free";

  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setAvatar(
        user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || "U",
          )}&background=0ea5e9&color=fff&bold=true`,
      );
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090a0f] text-slate-200">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSyncing(true);

    try {
      if (!token) throw new Error("No active session tokens found.");

      const response = await updateUserProfile(token, { bio, avatar });

      if (response.success && response.user) {
        updateUser({
          ...user,
          bio: response.user.bio,
          avatar: response.user.avatar,
        });
        setSuccessMessage("Profile parameters synchronized successfully.");
        setIsEditing(false);
      } else {
        throw new Error(
          response.message || "Failed to update profile parameters.",
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Unable to save parameters.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File is too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPresetAvatar = (url: string) => {
    setAvatar(url);
  };

  const getTierStyles = () => {
    switch (currentTier) {
      case "pro":
        return {
          border:
            "border-sky-500/40 hover:border-sky-500/70 shadow-[0_0_35px_-5px_rgba(14,165,233,0.25)] bg-[linear-gradient(45deg,rgba(9,10,15,0.95),rgba(3,7,18,0.95))] hover:shadow-[0_0_45px_0_rgba(14,165,233,0.35)] relative overflow-hidden group/card",
          glowText: "text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)]",
          badgeColor:
            "border-sky-500 bg-sky-500/10 text-sky-400 font-bold animate-pulse shadow-[0_0_12px_rgba(14,165,233,0.2)]",
          pulseColor: "bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.8)]",
          accentColor: "border-sky-500/30 bg-sky-950/10",
          bgGlow: "bg-sky-500/[0.08]",
          cardEffect: (
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none opacity-40 group-hover/card:animate-pulse" />
          ),
        };
      case "enterprise":
        return {
          border:
            "border-violet-500/50 hover:border-violet-500/85 shadow-[0_0_45px_-5px_rgba(168,85,247,0.35)] bg-[linear-gradient(135deg,rgba(9,10,15,0.95),rgba(88,28,135,0.05),rgba(3,7,18,0.95))] hover:shadow-[0_0_55px_0_rgba(168,85,247,0.45)] ring-1 ring-violet-500/20 relative overflow-hidden group/card",
          glowText:
            "text-violet-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]",
          badgeColor:
            "border-violet-500 bg-violet-500/15 text-violet-400 font-bold shadow-[0_0_15px_rgba(168,85,247,0.25)]",
          pulseColor: "bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]",
          accentColor: "border-violet-500/30 bg-violet-950/10",
          bgGlow: "bg-violet-500/[0.08]",
          cardEffect: (
            <div
              className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(168,85,247,0.08)_40%,rgba(168,85,247,0.15)_50%,rgba(168,85,247,0.08)_60%,transparent_70%)] bg-[length:200%_100%] animate-shimmer pointer-events-none"
              style={{
                animationDuration: "4s",
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              }}
            />
          ),
        };
      default:
        return {
          border: "border-slate-900 bg-slate-950/20 hover:border-slate-800/80",
          glowText: "text-slate-400",
          badgeColor: "border-slate-800 bg-slate-900/30 text-slate-400",
          pulseColor: "bg-slate-500",
          accentColor: "border-slate-900",
          bgGlow: "bg-slate-500/0",
          cardEffect: null,
        };
    }
  };

  const styles = getTierStyles();

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "January 12, 2026";

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-200 antialiased selection:bg-sky-500/20 pb-16">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer-move {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer-move 5s linear infinite;
        }
      `,
        }}
      />

      {/* Dynamic ambient background glow vectors based on subscription tier */}
      <div
        className={`absolute top-0 left-1/2 -z-10 h-[380px] w-full max-w-7xl -translate-x-1/2 ${styles.bgGlow} blur-[120px] transition-all duration-700 pointer-events-none`}
      />

      <Navbar />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row">
        <Sidebar />

        <main className="flex-1 space-y-6">
          {/* TOP PROFILE CARD BLOCK */}
          <section
            className={`relative overflow-hidden rounded-3xl border p-6 md:p-8 backdrop-blur-xl transition-all duration-500 ${styles.border}`}
          >
            {styles.cardEffect}

            {/* Ambient inner glow circles for premium users */}
            {currentTier !== "free" && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-gradient-to-br from-inherit to-transparent rounded-full blur-3xl opacity-25 pointer-events-none" />
            )}

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between relative z-10">
              {/* Identity layer layout */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar with dynamic pulsing outer ring indicators */}
                <div className="relative group shrink-0">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                    <img
                      src={avatar}
                      alt="User Profile Avatar"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/75 hover:bg-black/85 flex flex-col items-center justify-center gap-1 text-white transition-colors cursor-pointer"
                      >
                        <Camera className="w-5 h-5 text-sky-400" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-300">
                          Upload
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Glowing active pulse circle for Pro/Enterprise */}
                  {currentTier !== "free" && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.pulseColor}`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-4 w-4 border-2 border-slate-950 ${styles.pulseColor}`}
                      />
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {user.name}
                    </h1>
                    {user.isVerified && (
                      <Verified className="h-5 w-5 text-sky-400 fill-sky-950/20 animate-pulse" />
                    )}
                    <span
                      className={`rounded-lg border px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${styles.badgeColor}`}
                    >
                      {currentTier} Member
                    </span>
                  </div>

                  <p className="text-xs font-mono text-slate-500">
                    u/
                    {user.name?.toLowerCase().replace(/\s+/g, "") || "username"}{" "}
                    • {user.email}
                  </p>

                  {!isEditing ? (
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                      {user.bio ||
                        "No bio description configured. Customize your profile metadata down below."}
                    </p>
                  ) : (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-slate-600 block mb-1">
                        BIOGRAPHY_PARAMETER
                      </span>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={300}
                        placeholder="Write a brief bio about yourself..."
                        rows={3}
                        className="w-full max-w-xl rounded-xl border border-slate-900 bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-sky-500/50 focus:outline-none transition-colors font-mono resize-none"
                      />
                      <div className="flex justify-between max-w-xl text-[9px] font-mono text-slate-600 mt-1">
                        <span>Markdown support disabled</span>
                        <span>{bio.length}/300 chars</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center sm:justify-start gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-900 bg-slate-950/60 hover:bg-slate-900 px-4 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-800 transition-colors"
                  >
                    <Edit2 size={12} />
                    <span>EDIT_PROFILE</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setBio(user.bio || "");
                        setAvatar(
                          user.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name || "U",
                            )}&background=0ea5e9&color=fff&bold=true`,
                        );
                      }}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-900 bg-slate-950/60 hover:bg-slate-900 px-3 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <X size={12} />
                      <span>CANCEL</span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSyncing}
                      className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-white hover:bg-slate-200 px-4 text-xs font-mono font-bold text-slate-950 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSyncing ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check size={12} />
                      )}
                      <span>SAVE_CHANGES</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error and Success Notices */}
            {(errorMessage || successMessage) && (
              <div className="mt-6 max-w-xl relative z-10">
                {errorMessage && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 font-mono">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>
            )}

            {/* Avatar customization layer inside Edit Mode */}
            {isEditing && (
              <div className="mt-8 border-t border-slate-900/60 pt-6 space-y-4 relative z-10">
                <div>
                  <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500 flex items-center gap-1.5">
                    <Camera size={12} className="text-sky-500" />
                    <span>AVATAR_IMAGE_REGISTRY</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Upload a local photo, paste a custom image URL, or choose
                    one of our abstract presets below.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Local Uploader */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-600">
                      Local Image Uploader
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-900 bg-slate-950/60 hover:bg-slate-900 px-4 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                    >
                      <Camera size={14} className="text-sky-500" />
                      <span>Choose File...</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Remote URL */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-600">
                      Custom Avatar URL
                    </label>
                    <input
                      type="text"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full h-11 rounded-xl border border-slate-900 bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-750 focus:border-sky-500/50 focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  {/* Presets */}
                  <div>
                    <label className="block text-[9px] font-mono uppercase tracking-wider text-slate-600 mb-2">
                      Premium Preset Avatars
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {PREMIUM_AVATARS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectPresetAvatar(url)}
                          className={`h-11 w-11 rounded-lg overflow-hidden border transition-all duration-200 ${
                            avatar === url
                              ? "border-sky-500 scale-105 ring-2 ring-sky-500/20"
                              : "border-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Preset avatar ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ENVIRONMENT NODE DETAILS & STATS */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Core Info Bento Block */}
            <div
              className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl ${styles.accentColor} bg-slate-950/10`}
            >
              <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500 flex items-center gap-2">
                <Shield size={12} className={styles.glowText} />
                <span>Security Signatures</span>
              </h3>

              <div className="space-y-3.5 font-mono text-xs text-slate-400">
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Access Key:</span>
                  <span className="text-white text-right max-w-[130px] truncate">
                    {user.id}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Registry Role:</span>
                  <span className="text-sky-400 font-bold uppercase">
                    {user.role || "Operator"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Uptime:</span>
                  <span className="text-emerald-400 font-bold">100.00%</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Node Status:</span>
                  <span className="text-emerald-400 font-bold uppercase">
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Time Metrics Bento Block */}
            <div
              className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl ${styles.accentColor} bg-slate-950/10`}
            >
              <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500 flex items-center gap-2">
                <Clock size={12} className={styles.glowText} />
                <span>Chronometer Matrix</span>
              </h3>

              <div className="space-y-3.5 font-mono text-xs text-slate-400">
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Initial Boot:</span>
                  <span className="text-white text-right">{formattedDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Region Zone:</span>
                  <span className="text-white">SYS_LOCAL_T07</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900/60">
                  <span className="text-slate-500">Session Mode:</span>
                  <span className="text-white">persistent_jwt</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Local Offset:</span>
                  <span className="text-slate-400">UTC+07:00</span>
                </div>
              </div>
            </div>

            {/* Subscription Bento Action Block */}
            <div
              className={`rounded-3xl border p-6 flex flex-col justify-between backdrop-blur-xl ${styles.border} bg-slate-950/30`}
            >
              <div className="space-y-4">
                <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500 flex items-center gap-2">
                  <Award size={12} className={styles.glowText} />
                  <span>Deployment Tier</span>
                </h3>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-1.5">
                    {currentTier === "free"
                      ? "Starter Free"
                      : `${currentTier} workspace`}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {currentTier === "free"
                      ? "Currently running sandbox constraints. Unlock unlimited nodes & semantic search."
                      : `Enjoying premium ${currentTier} tier capacities. All environments nominal.`}
                  </p>
                </div>
              </div>

              {currentTier === "free" ? (
                <Link
                  href="/upgrade"
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-slate-200 py-3 text-xs font-mono font-bold text-slate-950 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-sky-500 fill-sky-500/20" />
                  <span>UPGRADE_ENVIRONMENT</span>
                </Link>
              ) : (
                <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-500 bg-slate-950/60 border border-slate-900 p-3 rounded-2xl font-mono">
                  <Lock className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                  <span>
                    Billing parameters handled securely via checkout engine.
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* PERFORMANCE DIAGNOSTICS TELEMETRY */}
          <section className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950/20 p-6 backdrop-blur-xl">
            {/* If Free Tier, render a lock overlay with blur */}
            {currentTier === "free" && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/70 p-6 text-center backdrop-blur-md">
                <Lock className="w-8 h-8 text-sky-500 mb-2.5 animate-bounce" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  DIAGNOSTICS_METRIC_POOL_LOCKED
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4 font-sans">
                  Upgrade your environment instance to Pro or Enterprise to
                  access real-time system performance node diagnostics.
                </p>
                <Link
                  href="/upgrade"
                  className="rounded-xl border border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20 px-4 py-2 text-xs font-mono font-bold text-sky-400 transition-colors"
                >
                  INITIALIZE_CORE_UPGRADE
                </Link>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-widest uppercase text-slate-500 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Node Telemetry diagnostics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
                {/* Latency Stats */}
                <div className="rounded-2xl border border-slate-900/60 bg-slate-950/40 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Query Latency:</span>
                    <span className="text-sky-400 font-bold font-sans">
                      {currentTier === "enterprise"
                        ? "< 8ms"
                        : currentTier === "pro"
                          ? "< 18ms"
                          : "N/A"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{
                        width:
                          currentTier === "enterprise"
                            ? "92%"
                            : currentTier === "pro"
                              ? "70%"
                              : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* API Request Loads */}
                <div className="rounded-2xl border border-slate-900/60 bg-slate-950/40 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Registry Limit:</span>
                    <span className="text-violet-400 font-bold font-sans">
                      {currentTier === "enterprise"
                        ? "Infinite"
                        : currentTier === "pro"
                          ? "5k req/m"
                          : "N/A"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-400 to-pink-500 rounded-full transition-all duration-1000"
                      style={{
                        width:
                          currentTier === "enterprise"
                            ? "100%"
                            : currentTier === "pro"
                              ? "75%"
                              : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* Storage allocations */}
                <div className="rounded-2xl border border-slate-900/60 bg-slate-950/40 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>Node Allocations:</span>
                    <span className="text-emerald-400 font-bold font-sans">
                      {currentTier === "enterprise"
                        ? "50 GB"
                        : currentTier === "pro"
                          ? "10 GB"
                          : "N/A"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full transition-all duration-1000"
                      style={{
                        width:
                          currentTier === "enterprise"
                            ? "88%"
                            : currentTier === "pro"
                              ? "55%"
                              : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick settings prompt */}
          <section className="flex items-center gap-3.5 rounded-3xl border border-slate-900/60 bg-slate-950/20 p-5 font-mono text-xs text-slate-500">
            <Info size={16} className={styles.glowText} />
            <span>
              To modify database parameters, passwords, or dark mode setups,
              navigate to the{" "}
              <Link href="/settings" className="text-white hover:underline">
                Account Settings
              </Link>{" "}
              matrix.
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}

interface CheckCircle2Props extends React.SVGProps<SVGSVGElement> {}

function CheckCircle2(props: CheckCircle2Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
