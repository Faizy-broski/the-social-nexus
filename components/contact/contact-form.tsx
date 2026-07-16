"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  contactFormSchema,
  REGIONS,
  SERVICES,
  type ContactFormValues,
} from "@/lib/validations/contact";

/** Small helper so every field's error message renders the same way. */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-300">{message}</p>;
}

// HTML `id` attributes can't contain spaces — "AI Bots (Automations,
// Voicebots)" used directly as an id/htmlFor pair is invalid HTML. Browsers
// handle malformed ids inconsistently, but the practical effect here was
// that clicking the label text (the large, obvious click target — the
// actual <input type="radio"> is small) didn't reliably select the radio,
// which is exactly what "radio buttons are not working" describes.
const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    // Confirmed dependency version mismatch: @hookform/resolvers' zodResolver
    // types are compiled against zod v4.0.x internals (_zod.version.minor: 0),
    // but the installed zod is a later v4 minor (reported as 4). The real
    // fix is updating the package, not this cast:
    //
    //   npm install @hookform/resolvers@latest
    //
    // After that, remove `as any` and this should type-check cleanly — the
    // runtime behavior (schema.safeParseAsync under the hood) is unaffected
    // by the cast either way, so the form works correctly right now even
    // with the type error silenced.
    resolver: zodResolver(contactFormSchema as any),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      companyUrl: "",
      // Base UI's own docs say the controlled/uncontrolled check is
      // "is the value `undefined` on first render" — so `region: undefined`
      // still counts as uncontrolled at mount, then flips to controlled
      // the moment a value is picked, which is exactly the warning you're
      // seeing. An empty string is `!== undefined`, so it's controlled
      // from the very first render and stays that way for the component's
      // whole lifetime. No REGIONS/SERVICES entry is ever "", so it just
      // renders as "nothing selected" until the user picks one — Zod's
      // required_error correctly rejects "" on submit if they never do.
      region: "" as unknown as ContactFormValues["region"],
      service: "" as unknown as ContactFormValues["service"],
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to send message.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong sending your message. Please try again or email us directly.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="animate-scale-in flex flex-col items-center justify-center gap-4 rounded-2xl py-12 text-center sm:py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15">
          <CheckCircle2 className="h-7 w-7 text-brand-teal" />
        </div>
        <h3 className="text-xl font-semibold text-white">Message sent</h3>
        <p className="max-w-sm text-sm text-white/70">
          Thanks for reaching out — a member of the team will get back to you
          within one business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="press-scale mt-2 border-white/25 bg-transparent text-white hover:bg-white/10"
          onClick={() => setIsSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/80">
            First name
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("firstName")}
          />
          <FieldError message={errors.firstName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/80">
            Last name
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("lastName")}
          />
          <FieldError message={errors.lastName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white/80">
            Phone number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 012 3456 789"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-white/80">
            Company name
          </Label>
          <Input
            id="companyName"
            placeholder="e.g. The Social Nexus"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("companyName")}
          />
          <FieldError message={errors.companyName?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyUrl" className="text-white/80">
            Company URL
          </Label>
          <Input
            id="companyUrl"
            placeholder="e.g. thesocialnexus.co.uk"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("companyUrl")}
          />
          <FieldError message={errors.companyUrl?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="region" className="text-white/80">
          Region
        </Label>
        <Controller
          control={control}
          name="region"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value ?? ""}>
              <SelectTrigger
                id="region"
                className="glass-input h-11 w-full text-white data-placeholder:text-white/50"
              >
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-brand-navy-light text-white">
                {REGIONS.map((region) => (
                  <SelectItem
                    key={region}
                    value={region}
                    className="text-white focus:bg-brand-teal/20 focus:text-white data-[state=checked]:text-brand-teal-light"
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError message={errors.region?.message} />
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">
          Services you&apos;re looking for
        </Label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value ?? ""}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {SERVICES.map((service) => {
                const inputId = toId(service);
                return (
                  <label
                    key={service}
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/80 transition-colors duration-200 has-data-checked:border-brand-teal/60 has-data-checked:bg-brand-teal/10 has-data-checked:text-white"
                  >
                    <RadioGroupItem
                      value={service}
                      id={inputId}
                      className="shrink-0 border-white/40 text-brand-teal transition-colors duration-200 data-checked:border-brand-teal data-checked:bg-brand-teal"
                    />
                    <span className="leading-tight">{service}</span>
                  </label>
                );
              })}
            </RadioGroup>
          )}
        />
        <FieldError message={errors.service?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white/80">
          Project details
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us a little about what you're building..."
          rows={4}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <FieldError message={errors.root?.message} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="brand-cta press-scale h-12 w-full gap-2 rounded-lg text-base font-medium sm:w-auto sm:px-8"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
