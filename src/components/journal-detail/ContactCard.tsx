import type { Contact } from "@/lib/journal-slugs";

export default function ContactCard({ contacts }: { contacts?: Contact[] }) {
  if (!contacts || contacts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#0b2545]">Contact</h2>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.email} className="text-sm">
            <p className="font-medium text-slate-700">{contact.label}</p>
            <p className="text-slate-600">{contact.name}</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              {contact.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
