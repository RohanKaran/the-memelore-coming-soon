"use client";

import { useState } from "react";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(
        "https://api.freewaitlists.com/waitlists/cmjwqyyax004801s4ulp6t6y1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            meta: {
              source: "landing-page",
            },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("You've been added to the waitlist!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Failed to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-in fade-in zoom-in duration-1000" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none animate-in fade-in zoom-in duration-1000 delay-300" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-8 relative z-10">
        {/* Logo / Brand Name */}
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-1000">
          <span className="px-3 py-1 rounded-full border border-border bg-sidebar/50 backdrop-blur-md text-sm font-medium text-muted-foreground uppercase tracking-wider">
            The Meme Lore
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-100">
          The Archive <br /> Opens Soon
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-200">
          We are curating the most comprehensive library of internet culture. Be
          the first to explore the history, meaning, and evolution of memes.
        </p>

        {/* Email Capture */}
        <div className="w-full max-w-md animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  required
                  disabled={loading || status === "success"}
                  className="w-full pl-10 h-10 rounded-md border border-input bg-sidebar/50 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading || status === "success"}
                className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shrink-0 shadow-lg shadow-primary/20 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "success" ? (
                  <>
                    Joined <CheckCircle2 className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Notify Me <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status !== "idle" && (
              <div
                className={`text-sm flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Social Proof / Footer */}
        <div className="pt-8 text-sm text-muted-foreground animate-in slide-in-from-bottom-5 fade-in duration-1000 delay-500">
          <p>Join the waitlist for early access.</p>
        </div>
      </div>
    </main>
  );
}
