"use client";

import { MessageSquare } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "919876543210",
  message = "Hello Pure VeggieCrush! I would like to order fresh farm crushes.",
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="Floating WhatsApp Help Desk">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Pure VeggieCrush Team"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#1EBE5D] group"
      >
        <div className="relative">
          <MessageSquare size={22} fill="white" />
        </div>
        <span className="text-xs font-bold font-body tracking-wide hidden sm:inline-block">
          Order on WhatsApp
        </span>
      </a>
    </aside>
  );
}
