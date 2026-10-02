import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { brand } from "@/lib/brand";
import { contactLead } from "@/lib/content";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get in Touch" subtitle={contactLead} videoSrc="/videos/trust.mp4" videoPoster="/videos/trust.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="space-y-6">
              <div className="cream-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-semibold text-emerald">Contact Imam</h2>
                <a
                  href={`mailto:${brand.emails.imam}`}
                  className="mt-2 block text-sm font-medium text-accent hover:underline"
                >
                  {brand.emails.imam}
                </a>
              </div>
              <div className="cream-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-semibold text-emerald">Call Us Now</h2>
                <a
                  href={brand.phoneHref}
                  className="mt-2 block text-sm font-medium text-accent hover:underline"
                >
                  {brand.phone} EXT 2
                </a>
              </div>
              <div className="cream-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-semibold text-emerald">Contact admin</h2>
                <a
                  href={`mailto:${brand.emails.admin}`}
                  className="mt-2 block text-sm font-medium text-accent hover:underline"
                >
                  {brand.emails.admin}
                </a>
              </div>
              <p className="text-sm text-muted">
                {brand.address.line1}, {brand.address.line2}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="cream-panel rounded-3xl p-6 md:p-8">
              <h2 className="font-display text-xl font-semibold text-emerald">Send a message</h2>
              <p className="mt-2 text-sm text-muted">
                Prefer email? This form opens your mail app addressed to our admin inbox.
              </p>
              <form
                className="mt-6 space-y-4"
                action={`mailto:${brand.emails.admin}`}
                method="get"
                encType="text/plain"
              >
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-charcoal">Full Name</span>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-emerald/20 bg-ivory px-4 py-2.5 outline-none ring-gold focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-charcoal">Phone Number</span>
                  <input
                    name="phone"
                    className="w-full rounded-xl border border-emerald/20 bg-ivory px-4 py-2.5 outline-none ring-gold focus:ring-2"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-charcoal">Email Address</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-emerald/20 bg-ivory px-4 py-2.5 outline-none ring-gold focus:ring-2"
                  />
                </label>
                <fieldset className="text-sm">
                  <legend className="mb-2 font-medium text-charcoal">
                    Just for general interest, Alfalah programs, and volunteering
                  </legend>
                  <div className="flex flex-wrap gap-4 text-muted">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" name="interest" value="Email Newsletter" /> Email
                      Newsletter
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" name="interest" value="WhatsApp Groups" /> WhatsApp
                      Groups
                    </label>
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" name="interest" value="Social Media" /> Social Media
                    </label>
                  </div>
                </fieldset>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-charcoal">Your Message</span>
                  <textarea
                    name="body"
                    rows={5}
                    required
                    className="w-full rounded-xl border border-emerald/20 bg-ivory px-4 py-2.5 outline-none ring-gold focus:ring-2"
                  />
                </label>
                <button type="submit" className="gold-btn rounded-full px-7 py-2.5 text-sm font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
          <div className="overflow-hidden rounded-3xl border border-gold/30 shadow-lg">
            <iframe
              title="Alfalah Center map"
              src={brand.address.mapsEmbed}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
