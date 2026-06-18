"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Button } from "@/components/ui/button";

const SERVICE_CATEGORIES = [
  "Hardware Repair & Maintenance",
  "IT Consulting & Strategy",
  "Managed IT Services",
];

export default function ServicesPage() {
  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology services from hardware repair to managed IT solutions for businesses of all sizes.
          </p>
        </div>
      </section>

      {SERVICE_CATEGORIES.map((category, catIndex) => {
        const categoryServices = SERVICES.filter((s) => s.category === category);
        return (
          <section key={category} className={catIndex % 2 === 0 ? "py-16" : "py-16 bg-muted/30"}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
                        {service.pricing}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" asChild>
                        <Link href={`/contact?subject=service&service=${encodeURIComponent(service.name)}`}>
                          Request Service <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
