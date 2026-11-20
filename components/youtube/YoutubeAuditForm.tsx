"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  youtubeAuditSchema,
  type YoutubeAuditValues,
} from "@/lib/validations/youtube-audit";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-300">{message}</p>;
}

export function YoutubeAuditForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<YoutubeAuditValues>({
    // Same zod/@hookform/resolvers minor-version type mismatch as
    // components/contact/contact-form.tsx; runtime behaviour is unaffected.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(youtubeAuditSchema as any),
    defaultValues: { name: "", email: "", channelUrl: "", challenge: "" },
  });

  async function onSubmit(values: YoutubeAuditValues) {
    try {
      const response = await fetch("/api/youtube-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to send your request.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or email us directly.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div
        role="status"
        className="animate-scale-in flex flex-col items-center justify-center gap-4 py-10 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15">
          <CheckCircle2 className="h-7 w-7 text-brand-teal" />
        </div>
        <p className="text-xl font-semibold text-white">Audit request received</p>
        <p className="max-w-sm text-sm text-white/70">
          Thanks — we&rsquo;ll review your channel and get back to you within
          one business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="press-scale mt-2 border-white/25 bg-transparent text-white hover:bg-white/10"
          onClick={() => setIsSubmitted(false)}
        >
          Submit another channel
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="yt-name" className="text-white/80">
          Your name
        </Label>
        <Input
          id="yt-name"
          autoComplete="name"
          placeholder="John Doe"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yt-email" className="text-white/80">
          Email address
        </Label>
        <Input
          id="yt-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yt-channel" className="text-white/80">
          YouTube channel link (optional)
        </Label>
        <Input
          id="yt-channel"
          inputMode="url"
          placeholder="https://www.youtube.com/@yourchannel"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("channelUrl")}
        />
        <FieldError message={errors.channelUrl?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yt-challenge" className="text-white/80">
          Your biggest challenge right now (optional)
        </Label>
        <Textarea
          id="yt-challenge"
          rows={4}
          placeholder="e.g. views have plateaued, thumbnails aren't getting clicks…"
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("challenge")}
        />
        <FieldError message={errors.challenge?.message} />
      </div>

      <FieldError message={errors.root?.message} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="brand-cta press-scale h-12 w-full gap-2 rounded-lg text-base font-medium"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Book my free audit
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
