"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: searchParams.get("subject") || searchParams.get("service") ? "Service Request" : "",
    message: searchParams.get("service") ? `I'm interested in: ${searchParams.get("service")}` : "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
        <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold">Message Sent!</h3>
        <p className="text-muted-foreground mt-2">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Name *</label>
          <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email *</label>
          <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Phone</label>
          <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Subject *</label>
          <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Message *</label>
        <Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">We&apos;d love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {[
            { icon: Phone, label: "Phone", value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
            { icon: Mail, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
            { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">{label}</p>
                {href ? (
                  <a href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{value}</a>
                ) : (
                  <p className="text-sm text-muted-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <p className="font-medium text-sm">Working Hours</p>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{SITE_CONFIG.hours.weekdays}</p>
              <p>{SITE_CONFIG.hours.saturday}</p>
              <p>{SITE_CONFIG.hours.sunday}</p>
            </div>
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
            <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </Button>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm />
          </Suspense>

          <div className="mt-8 rounded-2xl overflow-hidden h-64 bg-muted">
            <iframe
              title="ITZONE Rwanda Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.0619!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUsKwNTYnMzguOCJTIDMwwrAwMyc0Mi44IkU!5e0!3m2!1sen!2srw!4v1620000000000!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
