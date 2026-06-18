"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Monitor, Battery, Droplets, HardDrive, Shield, Cpu,
  Upload, Calendar, Search, CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { REPAIR_SERVICES, DEVICE_TYPES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor, Battery, Droplets, HardDrive, Shield, Cpu,
};

export default function RepairPage() {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    deviceType: "",
    deviceBrand: "",
    deviceModel: "",
    problem: "",
    appointmentDate: "",
  });
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<{ status: string; device: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/repair", {
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

  const handleTrack = () => {
    if (trackingId) {
      setTrackingResult({
        status: "In Progress",
        device: "Laptop - Screen Replacement",
      });
    }
  };

  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Repair Services</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional device repair with certified technicians, genuine parts, and 90-day warranty.
          </p>
        </div>
      </section>

      {/* Common Repairs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Common Repair Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {REPAIR_SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Monitor;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-2xl bg-card border border-border/50 text-center hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm">{service.name}</h3>
                  <p className="text-xs text-primary mt-1">{service.price}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{service.duration}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Book a Repair</h2>
              {submitted ? (
                <div className="p-8 rounded-2xl bg-card border border-border/50 text-center">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Repair Request Submitted!</h3>
                  <p className="text-muted-foreground mt-2">
                    We&apos;ll contact you within 2 hours with a cost estimate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Full Name *</label>
                      <Input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone *</label>
                      <Input required type="tel" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email *</label>
                    <Input required type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Device Type *</label>
                    <select
                      required
                      value={form.deviceType}
                      onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
                      className="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm"
                    >
                      <option value="">Select device type</option>
                      {DEVICE_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Brand</label>
                      <Input value={form.deviceBrand} onChange={(e) => setForm({ ...form, deviceBrand: e.target.value })} placeholder="e.g. Apple, Dell" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Model</label>
                      <Input value={form.deviceModel} onChange={(e) => setForm({ ...form, deviceModel: e.target.value })} placeholder="e.g. MacBook Pro 16" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Describe the Problem *</label>
                    <Textarea required rows={4} value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} placeholder="Please describe the issue in detail..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Preferred Appointment Date</label>
                    <Input type="date" value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Upload Images (optional)</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Drag & drop images or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Submitting..." : "Request Repair Estimate"}
                  </Button>
                </form>
              )}
            </div>

            {/* Tracking */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Track Your Repair</h2>
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter repair tracking ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                  <Button onClick={handleTrack}>
                    <Search className="h-4 w-4" /> Track
                  </Button>
                </div>
                {trackingResult && (
                  <div className="mt-6 p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">Status: {trackingResult.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Device: {trackingResult.device}</p>
                    <div className="mt-4 flex gap-2">
                      {["Submitted", "Diagnosing", "In Progress", "Completed"].map((step, i) => (
                        <div key={step} className={`flex-1 h-2 rounded-full ${i <= 2 ? "bg-primary" : "bg-muted"}`} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 relative h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
                  alt="Repair workshop"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-semibold">ISO-Certified Repair Center</p>
                    <p className="text-sm text-white/80">90-day warranty on all repairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
