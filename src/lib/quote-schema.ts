import { z } from "zod";

export const needOptions = [
  { value: "bathroom", label: "Bathroom installation" },
  { value: "boiler-heating", label: "Boiler or heating" },
  { value: "repair-leak", label: "Repair or leak" },
  { value: "emergency", label: "Emergency" },
  { value: "other", label: "Something else" },
] as const;

export const propertyOptions = [
  { value: "house", label: "House" },
  { value: "flat", label: "Flat" },
  { value: "commercial", label: "Commercial" },
] as const;

export const timeframeOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "within-month", label: "Within a month" },
  { value: "1-3-months", label: "1 to 3 months" },
  { value: "planning", label: "Just planning" },
] as const;

export const budgetOptions = [
  { value: "under-1k", label: "Under £1,000" },
  { value: "1k-5k", label: "£1,000 to £5,000" },
  { value: "5k-15k", label: "£5,000 to £15,000" },
  { value: "15k-plus", label: "£15,000+" },
] as const;

const values = <T extends readonly { value: string }[]>(o: T) =>
  o.map((x) => x.value) as [T[number]["value"], ...T[number]["value"][]];

export const stepOneSchema = z.object({
  need: z.enum(values(needOptions), { error: "Please choose what you need" }),
  property: z.enum(values(propertyOptions), { error: "Please choose a property type" }),
  timeframe: z.enum(values(timeframeOptions), { error: "Please choose a timeframe" }),
  budget: z.enum(values(budgetOptions), { error: "Please choose a budget range" }),
});

const ukPhone = /^(?:\+44\s?\d{3,4}|\(?0\d{3,4}\)?)\s?\d{3}\s?\d{3,4}$|^(?:\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}$/;
const ukPostcode = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/;

export const stepTwoSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .regex(ukPhone, "Please enter a valid UK phone number"),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  postcode: z
    .string()
    .trim()
    .regex(ukPostcode, "Please enter a valid UK postcode")
    .transform((v) => v.toUpperCase().replace(/^(.+?)\s?(\d[A-Z]{2})$/, "$1 $2")),
  message: z.string().trim().max(2000, "Please keep your message under 2,000 characters").optional(),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(0).optional(),
});

export const quoteSchema = stepOneSchema.and(stepTwoSchema);

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;

export const labelFor = (
  options: readonly { value: string; label: string }[],
  value: string,
) => options.find((o) => o.value === value)?.label ?? value;
