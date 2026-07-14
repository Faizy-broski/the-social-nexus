"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, Paperclip } from "lucide-react";

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

import {
  logoBriefFormSchema,
  COUNTRY_CODES,
  type LogoBriefFormValues,
} from "@/lib/validations/logo-brief";

/** Small helper so every field's error message renders the same way. */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-300">{message}</p>;
}

const ACCEPTED_ATTACHMENT_TYPES =
  ".pdf,.pptx,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/jpeg,image/png";

export function LogoBriefForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LogoBriefFormValues>({
    // See components/contact/contact-form.tsx for the `as any` rationale —
    // @hookform/resolvers' zodResolver types lag the installed zod v4 minor.
    resolver: zodResolver(logoBriefFormSchema as any),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      countryCode: "",
      contactPhone: "",
      logoName: "",
      companySlogan: "",
      competitorsReference: "",
      businessDescription: "",
      logoRequirements: "",
      primaryColor: "",
      secondaryColor: "",
    },
  });

  async function onSubmit(values: LogoBriefFormValues) {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "attachment" || value === undefined) return;
        formData.append(key, String(value));
      });

      const fileList = values.attachment as FileList | undefined;
      if (fileList && fileList.length > 0) {
        formData.append("attachment", fileList[0]);
      }

      const response = await fetch("/api/logo-brief", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to send your brief.");
      }

      setIsSubmitted(true);
      setAttachmentName(null);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong sending your brief. Please try again or email us directly.",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="animate-scale-in flex flex-col items-center justify-center gap-4 rounded-2xl py-12 text-center sm:py-16">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15">
          <CheckCircle2 className="h-7 w-7 text-brand-teal" />
        </div>
        <h3 className="text-xl font-semibold text-white">Brief received</h3>
        <p className="max-w-sm text-sm text-white/70">
          Thanks for sharing the details — a member of the team will review
          your brief and get back to you within one business day.
        </p>
        <Button
          type="button"
          variant="outline"
          className="press-scale mt-2 border-white/25 bg-transparent text-white hover:bg-white/10"
          onClick={() => setIsSubmitted(false)}
        >
          Submit another brief
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
      <div className="space-y-2">
        <Label htmlFor="contactName" className="text-white/80">
          Contact Person Name*
        </Label>
        <Input
          id="contactName"
          placeholder="John Doe"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("contactName")}
        />
        <FieldError message={errors.contactName?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail" className="text-white/80">
          Contact Email Address*
        </Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="you@example.com"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("contactEmail")}
        />
        <FieldError message={errors.contactEmail?.message} />
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">Contact Phone Number*</Label>
        <div className="grid grid-cols-[minmax(4.5rem,5.5rem)_1fr] gap-2 sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:gap-3">
          <Controller
            control={control}
            name="countryCode"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger
                  id="countryCode"
                  className="glass-input h-11! w-full text-white data-[placeholder]:text-white/50"
                >
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-brand-navy-light text-white">
                  {COUNTRY_CODES.map(({ country, code }) => (
                    <SelectItem
                      key={country}
                      value={code}
                      className="text-white focus:bg-brand-teal/20 focus:text-white data-[state=checked]:text-brand-teal-light"
                    >
                      {country} ({code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Input
            id="contactPhone"
            type="tel"
            placeholder="012 3456 789"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("contactPhone")}
          />
        </div>
        <FieldError
          message={errors.countryCode?.message ?? errors.contactPhone?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logoName" className="text-white/80">
          Logo Name*
        </Label>
        <Input
          id="logoName"
          placeholder="The name your logo should feature"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("logoName")}
        />
        <FieldError message={errors.logoName?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companySlogan" className="text-white/80">
          Company Slogan
        </Label>
        <Input
          id="companySlogan"
          placeholder="e.g. Where ideas transform into digital power"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("companySlogan")}
        />
        <FieldError message={errors.companySlogan?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitorsReference" className="text-white/80">
          Competitors Reference (Optional)
        </Label>
        <Textarea
          id="competitorsReference"
          rows={3}
          placeholder="Share logos or brands you'd like us to reference"
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("competitorsReference")}
        />
        <FieldError message={errors.competitorsReference?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessDescription" className="text-white/80">
          Describe your business*
        </Label>
        <Textarea
          id="businessDescription"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("businessDescription")}
        />
        <FieldError message={errors.businessDescription?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logoRequirements" className="text-white/80">
          What you want in your logo (Any additional details)
        </Label>
        <Textarea
          id="logoRequirements"
          rows={4}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("logoRequirements")}
        />
        <FieldError message={errors.logoRequirements?.message} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-2">
          <Label htmlFor="primaryColor" className="text-white/80">
            Primary Color
          </Label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              aria-label="Primary color picker"
              className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border border-white/15 bg-transparent p-1"
              onChange={(event) =>
                setValue("primaryColor", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            <Input
              id="primaryColor"
              placeholder="e.g. Navy blue or #0B1020"
              className="glass-input h-11 text-white placeholder:text-white/50"
              {...register("primaryColor")}
            />
          </div>
          <FieldError message={errors.primaryColor?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor" className="text-white/80">
            Secondary Color
          </Label>
          <div className="flex items-center gap-2.5">
            <input
              type="color"
              aria-label="Secondary color picker"
              className="h-11 w-11 shrink-0 cursor-pointer rounded-lg border border-white/15 bg-transparent p-1"
              onChange={(event) =>
                setValue("secondaryColor", event.target.value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
            <Input
              id="secondaryColor"
              placeholder="e.g. Gold or #F8C300"
              className="glass-input h-11 text-white placeholder:text-white/50"
              {...register("secondaryColor")}
            />
          </div>
          <FieldError message={errors.secondaryColor?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachment" className="text-white/80">
          Select Attachment (PDF, PPTX, JPG, PNG)
        </Label>
        <label
          htmlFor="attachment"
          className="glass-input flex h-11 cursor-pointer items-center gap-2.5 rounded-lg px-3 text-sm text-white/70 transition-colors hover:text-white"
        >
          <Paperclip className="h-4 w-4 shrink-0 text-brand-teal" />
          <span className="truncate">
            {attachmentName ?? "Choose a file to attach..."}
          </span>
        </label>
        <input
          id="attachment"
          type="file"
          accept={ACCEPTED_ATTACHMENT_TYPES}
          className="sr-only"
          {...register("attachment", {
            onChange: (event) => {
              const file = event.target.files?.[0];
              setAttachmentName(file?.name ?? null);
            },
          })}
        />
        <FieldError message={errors.attachment?.message as string | undefined} />
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
            Submit brief
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
