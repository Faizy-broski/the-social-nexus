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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  webBriefFormSchema,
  COUNTRY_CODES,
  YES_NO,
  type WebBriefFormValues,
} from "@/lib/validations/web-brief";

/** Small helper so every field's error message renders the same way. */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-300">{message}</p>;
}

const ACCEPTED_ATTACHMENT_TYPES =
  ".pdf,.pptx,.jpg,.jpeg,.png,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,image/jpeg,image/png";

export function WebBriefForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WebBriefFormValues>({
    // See components/contact/contact-form.tsx for the `as any` rationale —
    // @hookform/resolvers' zodResolver types lag the installed zod v4 minor.
    resolver: zodResolver(webBriefFormSchema as any),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "",
      phone: "",
      currentWebsiteUrl: "",
      currentWebHost: "",
      domainPurchased: "",
      providingImages: "" as unknown as WebBriefFormValues["providingImages"],
      hasContent: "" as unknown as WebBriefFormValues["hasContent"],
      companyDescription: "",
      themeFeel: "",
      colors: "",
      competitorSites: "",
      additionalInfo: "",
      pagesNeeded: "",
      servicesProducts: "",
      competitiveAdvantage: "",
      customerAcquisition: "",
      socialMedia: "",
    },
  });

  async function onSubmit(values: WebBriefFormValues) {
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

      const response = await fetch("/api/web-brief", {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80">
            Name*
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">
            Email*
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
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">Phone*</Label>
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
            id="phone"
            type="tel"
            placeholder="012 3456 789"
            className="glass-input h-11 text-white placeholder:text-white/50"
            {...register("phone")}
          />
        </div>
        <FieldError message={errors.countryCode?.message ?? errors.phone?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentWebsiteUrl" className="text-white/80">
          Current website URL
        </Label>
        <Input
          id="currentWebsiteUrl"
          placeholder="e.g. https://domain.com/"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("currentWebsiteUrl")}
        />
        <FieldError message={errors.currentWebsiteUrl?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentWebHost" className="text-white/80">
          What is your current web host?*
        </Label>
        <Input
          id="currentWebHost"
          placeholder="e.g. GoDaddy, Bluehost, SiteGround..."
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("currentWebHost")}
        />
        <FieldError message={errors.currentWebHost?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domainPurchased" className="text-white/80">
          Did you already purchase a domain? If yes, who with? (we will need
          access to that account later on)*
        </Label>
        <Textarea
          id="domainPurchased"
          placeholder="e.g. Yes, purchased via GoDaddy"
          rows={2}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("domainPurchased")}
        />
        <FieldError message={errors.domainPurchased?.message} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-2">
          <Label className="text-white/80">
            Will you be providing any images for the website?*
          </Label>
          <Controller
            control={control}
            name="providingImages"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? ""}
                className="flex gap-2.5"
              >
                {YES_NO.map((option) => (
                  <label
                    key={option}
                    htmlFor={`providingImages-${option}`}
                    className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/80 transition-colors duration-200 has-data-checked:border-brand-teal/60 has-data-checked:bg-brand-teal/10 has-data-checked:text-white"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`providingImages-${option}`}
                      className="shrink-0 border-white/40 text-brand-teal transition-colors duration-200 data-checked:border-brand-teal data-checked:bg-brand-teal"
                    />
                    <span className="leading-tight">{option}</span>
                  </label>
                ))}
              </RadioGroup>
            )}
          />
          <FieldError message={errors.providingImages?.message} />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">
            Do you have all the content (text, info, articles, copy)
            available for your pages?*
          </Label>
          <Controller
            control={control}
            name="hasContent"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? ""}
                className="flex gap-2.5"
              >
                {YES_NO.map((option) => (
                  <label
                    key={option}
                    htmlFor={`hasContent-${option}`}
                    className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white/80 transition-colors duration-200 has-data-checked:border-brand-teal/60 has-data-checked:bg-brand-teal/10 has-data-checked:text-white"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`hasContent-${option}`}
                      className="shrink-0 border-white/40 text-brand-teal transition-colors duration-200 data-checked:border-brand-teal data-checked:bg-brand-teal"
                    />
                    <span className="leading-tight">{option}</span>
                  </label>
                ))}
              </RadioGroup>
            )}
          />
          <FieldError message={errors.hasContent?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyDescription" className="text-white/80">
          Briefly describe your company*
        </Label>
        <Textarea
          id="companyDescription"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("companyDescription")}
        />
        <FieldError message={errors.companyDescription?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="themeFeel" className="text-white/80">
          Is there any specific theme/feel you want incorporated into your
          website?*
        </Label>
        <Textarea
          id="themeFeel"
          rows={4}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("themeFeel")}
        />
        <FieldError message={errors.themeFeel?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="colors" className="text-white/80">
          What colors were you looking to incorporate into the design?*
        </Label>
        <Input
          id="colors"
          placeholder="e.g. Navy, teal, gold"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("colors")}
        />
        <FieldError message={errors.colors?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitorSites" className="text-white/80">
          Websites of your competitors or business whose sites you admire*
        </Label>
        <Textarea
          id="competitorSites"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("competitorSites")}
        />
        <FieldError message={errors.competitorSites?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pagesNeeded" className="text-white/80">
          What are some pages you will need for your site?*
        </Label>
        <Textarea
          id="pagesNeeded"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("pagesNeeded")}
        />
        <FieldError message={errors.pagesNeeded?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="servicesProducts" className="text-white/80">
          What services do you provide, or how many products will you be
          selling through your website?*
        </Label>
        <Textarea
          id="servicesProducts"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("servicesProducts")}
        />
        <FieldError message={errors.servicesProducts?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="competitiveAdvantage" className="text-white/80">
          What makes you better than your competition?*
        </Label>
        <Textarea
          id="competitiveAdvantage"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("competitiveAdvantage")}
        />
        <FieldError message={errors.competitiveAdvantage?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerAcquisition" className="text-white/80">
          How do you currently attract new customers?*
        </Label>
        <Textarea
          id="customerAcquisition"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("customerAcquisition")}
        />
        <FieldError message={errors.customerAcquisition?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-white/80">
          Additional Information (to share any additional details)*
        </Label>
        <Textarea
          id="additionalInfo"
          rows={3}
          className="glass-input resize-none text-white placeholder:text-white/50"
          {...register("additionalInfo")}
        />
        <FieldError message={errors.additionalInfo?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="socialMedia" className="text-white/80">
          Social Media Platforms (e.g. Facebook, Instagram, Twitter, LinkedIn)
        </Label>
        <Input
          id="socialMedia"
          placeholder="e.g. Instagram: @yourbrand, Facebook: /yourbrand"
          className="glass-input h-11 text-white placeholder:text-white/50"
          {...register("socialMedia")}
        />
        <FieldError message={errors.socialMedia?.message} />
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
