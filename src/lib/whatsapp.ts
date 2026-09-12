const WHATSAPP_NUMBER = "5592991989910"; // 92 99198-9910 (confirmado com o cliente em 2026-09-12)

export function buildWhatsappLink(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}
