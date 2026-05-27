import { createFileRoute } from "@tanstack/react-router";
import { QrCode, Github, Twitter, Zap, Shield, Smartphone } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { QrGenerator } from "@/components/QrGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QRift — Beautiful QR codes in one click" },
      { name: "description", content: "Generate high-quality, scannable QR codes for any URL instantly. Free, fast, and privacy-friendly." },
      { property: "og:title", content: "QRift — Beautiful QR codes in one click" },
      { property: "og:description", content: "Generate high-quality, scannable QR codes for any URL instantly." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <Toaster richColors position="top-center" />

      {/* floating blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full opacity-40 blur-3xl animate-[float_8s_ease-in-out_infinite]" style={{ background: "var(--gradient-primary)" }} />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 size-96 rounded-full opacity-30 blur-3xl animate-[float_10s_ease-in-out_infinite]" style={{ background: "var(--gradient-mesh)" }} />

      {/* nav */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground shadow-[var(--shadow-soft)]">
            <QrCode className="size-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">QRift</span>
        </div>
        <ThemeToggle />
      </header>

      {/* hero */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-20">
        <section className="text-center max-w-3xl mx-auto mb-12 animate-[fade-in_0.6s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-6 ring-1 ring-border">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Free • No signup • Privacy-first
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-6">
            Turn any link into a{" "}
            <span className="bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              beautiful QR code
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Paste a URL, get a high-resolution QR you can print, share, or download. Scans open instantly on any phone.
          </p>
        </section>

        <QrGenerator />

        {/* features */}
        <section className="mt-24 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Zap, title: "Instant", desc: "Generated in your browser the moment you hit enter." },
            { icon: Shield, title: "Private", desc: "Your links never leave your device. Zero tracking." },
            { icon: Smartphone, title: "Scannable", desc: "High error-correction works on any modern camera." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-sm hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div className="size-10 rounded-xl bg-accent text-accent-foreground grid place-items-center mb-4">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* footer */}
      <footer className="relative z-10 border-t border-border/60 bg-background/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} QRift. Crafted with care.</p>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="GitHub" className="size-9 grid place-items-center rounded-full hover:bg-accent transition-colors">
              <Github className="size-4" />
            </a>
            <a href="#" aria-label="Twitter" className="size-9 grid place-items-center rounded-full hover:bg-accent transition-colors">
              <Twitter className="size-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
