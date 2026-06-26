import { EyeIcon, PdfIcon } from "./icons";

type PdfPreviewCardProps = {
  pdfUrl?: string;
};

export default function PdfPreviewCard({ pdfUrl = "#pdf" }: PdfPreviewCardProps) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
        Preview
      </h2>

      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <PdfIcon className="h-20 w-20 text-slate-300" />
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md">
            <EyeIcon className="h-4 w-4" />
          </div>
        </div>

        <a
          href={pdfUrl}
          className="inline-flex items-center gap-2 rounded-sm border border-[#0b2545] px-5 py-2 text-sm font-semibold text-[#0b2545] transition-colors hover:bg-[#0b2545] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          <EyeIcon className="h-4 w-4" />
          VIEW PDF
        </a>
      </div>
    </div>
  );
}
