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
    // Cast to any to avoid Zod version mismatch between packages
    resolver: zodResolver(contactFormSchema as any),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      companyUrl: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      // Replace this with your real endpoint, e.g. an API route that
      // forwards to email (Resend), a CRM, or a webhook.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send message.");
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      setError("root", {
        message:
          "Something went wrong sending your message. Please try again or email us directly.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl py-16 text-center">
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
          className="mt-2 border-white/25 bg-transparent text-white hover:bg-white/10"
          onClick={() => setIsSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="region"
                className="glass-input h-11 w-full text-white data-[placeholder]:text-white/50"
              >
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
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
        <Label className="text-white/80">Services you&apos;re looking for</Label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
            >
              {SERVICES.map((service) => (
                <label
                  key={service}
                  htmlFor={service}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/80 transition-colors has-[[data-state=checked]]:border-brand-teal/60 has-[[data-state=checked]]:bg-brand-teal/10 has-[[data-state=checked]]:text-white"
                >
                  <RadioGroupItem
                    value={service}
                    id={service}
                    className="border-white/40 text-brand-teal"
                  />
                  {service}
                </label>
              ))}
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
        className="brand-cta h-12 w-full gap-2 rounded-lg text-base font-medium sm:w-auto sm:px-8"
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