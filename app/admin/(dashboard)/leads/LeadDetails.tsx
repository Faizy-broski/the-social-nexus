import type { LeadRow } from "@/lib/types/content";

const LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  fullName: "Full name",
  name: "Name",
  contactName: "Contact name",
  email: "Email",
  contactEmail: "Email",
  phone: "Phone",
  contactPhone: "Phone",
  countryCode: "Country code",
  companyName: "Company",
  companyUrl: "Company URL",
  region: "Region",
  service: "Service",
  message: "Message",
  currentWebsiteUrl: "Current website URL",
  currentWebHost: "Current web host",
  domainPurchased: "Domain purchased?",
  providingImages: "Providing images?",
  hasContent: "Content ready?",
  companyDescription: "Company description",
  themeFeel: "Theme / feel",
  colors: "Preferred colors",
  competitorSites: "Competitor / admired sites",
  additionalInfo: "Additional info",
  pagesNeeded: "Pages needed",
  servicesProducts: "Services / products",
  competitiveAdvantage: "Competitive advantage",
  customerAcquisition: "Customer acquisition",
  socialMedia: "Social media",
  logoName: "Logo name",
  companySlogan: "Company slogan",
  competitorsReference: "Competitors / references",
  businessDescription: "Business description",
  logoRequirements: "Logo requirements",
  primaryColor: "Primary color",
  secondaryColor: "Secondary color",
};

function labelFor(key: string) {
  return LABELS[key] ?? key;
}

export function LeadDetails({ lead }: { lead: LeadRow }) {
  const entries = Object.entries(lead.payload).filter(([, value]) => value !== undefined && value !== "");

  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Submitted {new Date(lead.created_at).toLocaleString()} via the{" "}
        <span className="font-medium text-foreground">{lead.source.replace("_", " ")}</span> form
      </div>
      <div className="overflow-hidden rounded-lg border">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={`px-4 py-3 ${index % 2 === 0 ? "bg-background" : "bg-muted/30"} ${
              index !== entries.length - 1 ? "border-b" : ""
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {labelFor(key)}
            </p>
            <p className="mt-0.5 whitespace-pre-wrap text-sm">{String(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
