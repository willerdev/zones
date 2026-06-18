import Image from "next/image";
import {
  ACHIEVEMENTS, TEAM_MEMBERS, CERTIFICATIONS, PARTNER_LOGOS, SITE_CONFIG,
} from "@/lib/data";

export default function AboutPage() {
  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">About {SITE_CONFIG.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Building trust through technology excellence in Rwanda since 2015.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Our office"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2015, ITZONE began as Kigali&apos;s dedicated IT hardware supplier with a vision to make
                premium technology accessible across Rwanda. What started with laptop sales has grown into a
                full-service IT partner serving businesses, NGOs, schools, and government institutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today we stock 168+ products spanning laptops, smartphones, networking, servers, and accessories
                from world-leading brands — always maintaining our commitment to genuine products and expert service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals and businesses with reliable technology solutions,
                exceptional service, and expert guidance — making technology work for everyone.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted technology partner in the region, known for integrity,
                innovation, and an unwavering commitment to customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <p className="text-3xl font-bold text-primary">{a.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="text-center p-6 rounded-2xl bg-card border border-border/50">
                <div className="relative h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Certifications & Partnerships</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert} className="p-4 rounded-xl bg-card border border-border/50 text-center text-sm font-medium">
                {cert}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PARTNER_LOGOS.map((partner) => (
              <div key={partner.name} className="flex items-center gap-2 text-2xl opacity-60 hover:opacity-100 transition-opacity">
                <span>{partner.logo}</span>
                <span className="text-sm font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
