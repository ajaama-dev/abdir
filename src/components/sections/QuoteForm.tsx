"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, Loader2, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  budgetOptions,
  needOptions,
  propertyOptions,
  stepOneSchema,
  stepTwoSchema,
  timeframeOptions,
} from "@/lib/quote-schema";
import { useQuote } from "@/components/ui/QuoteContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { btnPrimary } from "@/components/ui/styles";

type Errors = Record<string, string>;

interface FormState {
  need: string;
  property: string;
  timeframe: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  message: string;
  company: string;
}

const initial: FormState = {
  need: "",
  property: "",
  timeframe: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  postcode: "",
  message: "",
  company: "",
};

function collectErrors(issues: { path: PropertyKey[]; message: string }[]): Errors {
  const out: Errors = {};
  for (const i of issues) out[String(i.path[0])] ??= i.message;
  return out;
}

function TileGroup({
  legend,
  name,
  options,
  value,
  error,
  onChange,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
  columns?: string;
}) {
  const errId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errId : undefined}>
      <legend className="mb-3 font-heading text-2xl text-navy">{legend}</legend>
      <div className={`grid gap-3 ${columns}`}>
        {options.map((o) => (
          <label key={o.value} className="relative block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="block rounded-sm border border-navy/20 bg-white px-5 py-4 text-base text-charcoal transition-all duration-200 hover:border-brass peer-checked:border-brass peer-checked:bg-navy peer-checked:text-white peer-checked:shadow-md peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errId} role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {optional && <span className="font-normal text-charcoal/60"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full rounded-sm border bg-white px-4 py-3.5 text-base text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-brass ${
    error ? "border-red-600" : "border-navy/25"
  }`;

export function QuoteForm() {
  const router = useRouter();
  const { preselect } = useQuote();
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const submittingRef = useRef(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // A service card can pre-select the "need" tile.
  useEffect(() => {
    if (!preselect) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing external (context) selection into local form state
    setData((d) => ({ ...d, need: preselect.need }));
    setStep(1);
    setErrors((e) => ({ ...e, need: "" }));
  }, [preselect]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  const set = (key: keyof FormState) => (value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: "" } : e));
  };

  const goNext = () => {
    const result = stepOneSchema.safeParse(data);
    if (!result.success) {
      setErrors(collectErrors(result.error.issues));
      return;
    }
    setErrors({});
    setStep(2);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const one = stepOneSchema.safeParse(data);
    if (!one.success) {
      setErrors(collectErrors(one.error.issues));
      setStep(1);
      return;
    }
    const two = stepTwoSchema.safeParse(data);
    if (!two.success) {
      setErrors(collectErrors(two.error.issues));
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        fieldErrors?: Errors;
      };
      if (res.ok && json.ok) {
        const first = data.name.trim().split(/\s+/)[0] ?? "";
        router.push(`/thank-you?name=${encodeURIComponent(first)}`);
        return; // keep the button disabled while navigating
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setFormError(
        json.fieldErrors
          ? "Please check the highlighted fields."
          : `Something went wrong sending your request. Please try again or call ${siteConfig.phone}.`,
      );
    } catch {
      setFormError(`We could not send your request. Please try again or call ${siteConfig.phone}.`);
    }
    submittingRef.current = false;
    setSubmitting(false);
  };

  const describe = (id: string) => (errors[id] ? `${id}-error` : undefined);

  return (
    <section id="quote" className="scroll-mt-16 bg-ivory py-24 md:py-32" aria-labelledby="quote-heading">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          headingId="quote-heading"
          eyebrow="Request a quote"
          title="Tell us about your project"
          intro={`Two short steps. We respond ${siteConfig.responseTime}, and every quote is fixed and itemised.`}
        />

        <div className="mx-auto mt-14 max-w-3xl rounded-sm border border-navy/10 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,28,46,0.25)] md:p-12">
          {/* Progress */}
          <ol className="mb-10 flex items-center gap-4" aria-label="Progress">
            {[
              { n: 1, label: "Your project" },
              { n: 2, label: "Your details" },
            ].map(({ n, label }, i) => (
              <li
                key={n}
                className="flex flex-1 items-center gap-3"
                aria-current={step === n ? "step" : undefined}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    step >= n ? "border-brass bg-brass text-navy" : "border-navy/25 text-charcoal/60"
                  }`}
                >
                  {n}
                </span>
                <span className={`text-sm font-medium ${step >= n ? "text-navy" : "text-charcoal/60"}`}>
                  <span className="sr-only">Step {n} of 2: </span>
                  {label}
                </span>
                {i === 0 && <span className="h-px flex-1 bg-navy/15" aria-hidden="true" />}
              </li>
            ))}
          </ol>

          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company (leave blank)</label>
              <input
                id="company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={data.company}
                onChange={(e) => set("company")(e.target.value)}
              />
            </div>

            {step === 1 && (
              <div className="space-y-10">
                <h3 ref={stepHeadingRef} tabIndex={-1} className="sr-only">
                  Step 1 of 2: Your project
                </h3>
                <TileGroup
                  legend="What do you need?"
                  name="need"
                  options={needOptions}
                  value={data.need}
                  error={errors.need}
                  onChange={set("need")}
                />

                {data.need === "emergency" && (
                  <div
                    role="status"
                    className="rounded-sm border-2 border-brass bg-navy p-6 text-white md:flex md:items-center md:justify-between md:gap-8"
                  >
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-brass-light" aria-hidden="true" />
                      <div>
                        <p className="font-heading text-2xl">For emergencies, call us now</p>
                        <p className="mt-1 text-sm text-white/75">
                          An engineer is on the line 24 hours a day. You are welcome to continue the form too.
                        </p>
                      </div>
                    </div>
                    <a
                      href={`tel:${siteConfig.phoneTel}`}
                      className={`${btnPrimary} on-dark mt-5 w-full whitespace-nowrap md:mt-0 md:w-auto`}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {siteConfig.phone}
                    </a>
                  </div>
                )}

                <TileGroup
                  legend="Property type"
                  name="property"
                  options={propertyOptions}
                  value={data.property}
                  error={errors.property}
                  onChange={set("property")}
                  columns="sm:grid-cols-3"
                />
                <TileGroup
                  legend="When would you like to start?"
                  name="timeframe"
                  options={timeframeOptions}
                  value={data.timeframe}
                  error={errors.timeframe}
                  onChange={set("timeframe")}
                  columns="sm:grid-cols-2"
                />
                <TileGroup
                  legend="Approximate budget"
                  name="budget"
                  options={budgetOptions}
                  value={data.budget}
                  error={errors.budget}
                  onChange={set("budget")}
                  columns="sm:grid-cols-2"
                />

                <button type="button" onClick={goNext} className={`${btnPrimary} w-full sm:w-auto`}>
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 ref={stepHeadingRef} tabIndex={-1} className="font-heading text-3xl text-navy">
                  Where should we send your quote?
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field id="name" label="Full name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={data.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={describe("name")}
                      className={inputClass(errors.name)}
                    />
                  </Field>
                  <Field id="phone" label="Phone number" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="07700 900123"
                      value={data.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={describe("phone")}
                      className={inputClass(errors.phone)}
                    />
                  </Field>
                  <Field id="email" label="Email address" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => set("email")(e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={describe("email")}
                      className={inputClass(errors.email)}
                    />
                  </Field>
                  <Field id="postcode" label="Postcode" error={errors.postcode}>
                    <input
                      id="postcode"
                      name="postcode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="SW19 5AE"
                      value={data.postcode}
                      onChange={(e) => set("postcode")(e.target.value)}
                      aria-invalid={!!errors.postcode}
                      aria-describedby={describe("postcode")}
                      className={`${inputClass(errors.postcode)} uppercase`}
                    />
                  </Field>
                </div>
                <Field id="message" label="Anything we should know?" optional error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={data.message}
                    onChange={(e) => set("message")(e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={describe("message")}
                    className={inputClass(errors.message)}
                  />
                </Field>

                {formError && (
                  <p role="alert" className="rounded-sm border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-800">
                    {formError}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy hover:text-brass-dark"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${btnPrimary} disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending
                      </>
                    ) : (
                      "Get My Free Quote"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
          <p className="mt-6 text-center text-sm text-charcoal/70">
            No obligation. Your details are never shared.
          </p>
        </div>
      </div>
    </section>
  );
}
