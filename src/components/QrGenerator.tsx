import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Copy, Sparkles, Loader2, QrCode, Link as LinkIcon } from "lucide-react";

function isValidUrl(value: string) {
  try {
    const u = new URL(value.includes("://") ? value : `https://${value}`);
    return !!u.hostname && u.hostname.includes(".");
  } catch {
    return false;
  }
}

export function QrGenerator() {
  const [url, setUrl] = useState("");
  const [qrData, setQrData] = useState<string | null>(null);
  const [generatedFor, setGeneratedFor] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a URL to generate a QR code.");
      return;
    }
    if (!isValidUrl(trimmed)) {
      setError("That doesn't look like a valid URL. Try something like https://example.com");
      return;
    }
    setError(null);
    setLoading(true);
    const normalized = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
    try {
      await new Promise((r) => setTimeout(r, 350));
      const dataUrl = await QRCode.toDataURL(normalized, {
        width: 720,
        margin: 2,
        color: { dark: "#3d1f2e", light: "#ffffff" },
        errorCorrectionLevel: "H",
      });
      setQrData(dataUrl);
      setGeneratedFor(normalized);
      toast.success("QR code generated", { description: "Scan it with your phone camera." });
    } catch {
      toast.error("Could not generate QR code");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrData) return;
    const a = document.createElement("a");
    a.href = qrData;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
    toast.success("Downloaded");
  };

  const handleCopy = async () => {
    if (!generatedFor) return;
    await navigator.clipboard.writeText(generatedFor);
    toast.success("Link copied to clipboard");
  };

  useEffect(() => {
    if (!qrData || !canvasRef.current) return;
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current!.getContext("2d");
      ctx?.drawImage(img, 0, 0, 280, 280);
    };
    img.src = qrData;
  }, [qrData]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-3xl bg-card border border-border/60 p-6 sm:p-10 shadow-[var(--shadow-card)] backdrop-blur-sm animate-[scale-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="absolute -inset-px rounded-3xl bg-[var(--gradient-primary)] opacity-20 blur-2xl -z-10" />

        <div className="flex items-center gap-2 mb-6">
          <div className="size-10 rounded-xl bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground shadow-[var(--shadow-glow)]">
            <QrCode className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">QR Generator</h2>
            <p className="text-sm text-muted-foreground">Paste a link, get a scannable QR instantly.</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/80">Website URL</label>
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => { setUrl(e.target.value); if (error) setError(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="https://yourwebsite.com"
              className="h-14 pl-11 pr-4 text-base rounded-2xl bg-input/40 border-border focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive animate-[fade-in_0.2s_ease-out]">{error}</p>
          )}

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-14 text-base font-semibold rounded-2xl bg-[var(--gradient-primary)] hover:opacity-95 hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all duration-300 text-primary-foreground"
          >
            {loading ? (
              <><Loader2 className="size-5 animate-spin" /> Generating…</>
            ) : (
              <><Sparkles className="size-5" /> Generate QR Code</>
            )}
          </Button>
        </div>

        <div className="mt-8 grid place-items-center">
          {qrData ? (
            <div className="animate-[scale-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center gap-5">
              <div className="relative p-5 rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-border">
                <canvas ref={canvasRef} width={280} height={280} className="rounded-lg" />
                <div className="absolute -inset-1 rounded-2xl bg-[var(--gradient-primary)] opacity-30 blur-xl -z-10" />
              </div>
              <p className="text-xs text-muted-foreground max-w-xs truncate text-center">{generatedFor}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleDownload} variant="default" className="rounded-xl h-11 bg-foreground text-background hover:bg-foreground/90">
                  <Download className="size-4" /> Download PNG
                </Button>
                <Button onClick={handleCopy} variant="outline" className="rounded-xl h-11">
                  <Copy className="size-4" /> Copy link
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-[280px] h-[280px] rounded-2xl border-2 border-dashed border-border grid place-items-center text-muted-foreground bg-muted/30">
              <div className="text-center px-6">
                <QrCode className="size-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Your QR code will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
