"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    role: z.enum(["Coach", "Parent", "Player", "Other"], {
      required_error: "Please select a role",
    }),
    otherRole: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "Other") {
        return data.otherRole && data.otherRole.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify your role",
      path: ["otherRole"],
    }
  );

type FormData = {
  name: string;
  email: string;
  role: string;
  otherRole: string;
  website: string; // honeypot field
};

export function InterestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    otherRole: "",
    website: "", // honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | undefined;

    const initializeTurnstile = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        // Check if already rendered
        if (turnstileRef.current.children.length === 0) {
          widgetId = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            theme: "light",
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "error-callback": () => {
              setTurnstileToken(null);
            },
          });
        }
      }
    };

    // Check if Turnstile script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );

    if (existingScript) {
      // Script already loaded, initialize immediately if turnstile is available
      if ((window as any).turnstile) {
        initializeTurnstile();
      } else {
        // Wait for script to load
        existingScript.addEventListener("load", initializeTurnstile);
      }
    } else {
      // Load Turnstile script
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = initializeTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup widget on unmount
      if (widgetId !== undefined && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetId);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot check - silently fail if filled
    if (formData.website) {
      console.log("Bot detected - honeypot field filled");
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      return;
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      setErrors({ email: "Please complete the security check" });
      return;
    }

    try {
      const validatedData = formSchema.parse(formData);
      setIsSubmitting(true);

      // Verify Turnstile token with server
      const verifyResponse = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const verifyResult = await verifyResponse.json();

      if (!verifyResult.success) {
        setErrors({ email: "Security verification failed. Please try again." });
        setIsSubmitting(false);
        setTurnstileToken(null);
        // Reset Turnstile widget
        if ((window as any).turnstile) {
          (window as any).turnstile.reset();
        }
        return;
      }

      // Check if email already exists
      const { data: existingUser } = await supabase
        .from("waitlist_signups")
        .select("email")
        .eq("email", validatedData.email)
        .maybeSingle();

      if (existingUser) {
        setErrors({ email: "This email is already registered" });
        setIsSubmitting(false);
        setTurnstileToken(null);
        if ((window as any).turnstile) {
          (window as any).turnstile.reset();
        }
        return;
      }

      // Insert into Supabase
      const now = new Date().toISOString();
      const { error: insertError } = await supabase
        .from("waitlist_signups")
        .insert({
          id: crypto.randomUUID(),
          email: validatedData.email,
          name: validatedData.name,
          role: validatedData.role,
          otherRole:
            validatedData.role === "Other" ? validatedData.otherRole : null,
          consentGiven: true,
          consentDate: now,
          signupSource: "website",
          updatedAt: now,
        });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        setErrors({
          email:
            "An error occurred while submitting the form. Please try again.",
        });
        setIsSubmitting(false);
        setTurnstileToken(null);
        if ((window as any).turnstile) {
          (window as any).turnstile.reset();
        }
        return;
      }

      // Send email notification (don't wait for it to complete)
      fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          role: validatedData.role,
          otherRole: validatedData.otherRole,
        }),
      }).catch((error) => {
        console.error("Failed to send notification email:", error);
        // Don't show error to user as signup was successful
      });

      setSubmitted(true);
      setIsSubmitting(false);
      setTurnstileToken(null);
      setFormData({
        name: "",
        email: "",
        role: "",
        otherRole: "",
        website: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      setIsSubmitting(false);
      setTurnstileToken(null);
      if ((window as any).turnstile) {
        (window as any).turnstile.reset();
      }
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
        <p className="text-primary-foreground font-semibold">
          Thank you for registering your interest! We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder={focusedField === "name" ? "" : "Your Name"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
              errors.name ? "ring-2 ring-red-500" : "focus:ring-white"
            }`}
          />
          {errors.name && (
            <p className="text-red-200 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder={focusedField === "email" ? "" : "Your Email"}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
              errors.email ? "ring-2 ring-red-500" : "focus:ring-white"
            }`}
          />
          {errors.email && (
            <p className="text-red-200 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value, otherRole: "" })
            }
            onFocus={() => setFocusedField("role")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 ${
              errors.role ? "ring-2 ring-red-500" : "focus:ring-white"
            } ${formData.role === "" ? "text-gray-500" : ""}`}
          >
            <option value="" disabled>
              Select Your Role
            </option>
            <option value="Coach">Coach</option>
            <option value="Parent">Parent</option>
            <option value="Player">Player</option>
            <option value="Other">Other</option>
          </select>
          {errors.role && (
            <p className="text-red-200 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        {formData.role === "Other" && (
          <div>
            <input
              type="text"
              placeholder={
                focusedField === "otherRole" ? "" : "Please specify your role"
              }
              value={formData.otherRole}
              onChange={(e) =>
                setFormData({ ...formData, otherRole: e.target.value })
              }
              onFocus={() => setFocusedField("otherRole")}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                errors.otherRole ? "ring-2 ring-red-500" : "focus:ring-white"
              }`}
            />
            {errors.otherRole && (
              <p className="text-red-200 text-sm mt-1">{errors.otherRole}</p>
            )}
          </div>
        )}

        {/* Honeypot field - hidden from users but visible to bots */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Cloudflare Turnstile Widget */}
      <div className="flex justify-center">
        <div ref={turnstileRef} className="cf-turnstile"></div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-3"
      >
        {isSubmitting ? "Submitting..." : "Register Your Interest"}
      </Button>

      <p className="text-sm text-primary-foreground/80 leading-relaxed">
        By clicking "Register Your Interest", you consent to receive email
        updates from MatchTracker. View our{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        . You can unsubscribe at any time.
      </p>
    </form>
  );
}
