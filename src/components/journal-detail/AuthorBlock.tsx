import { UserIcon } from "./icons";
import type { ArticleAuthor } from "@/lib/article-slugs";

type AuthorBlockProps = {
  authors: ArticleAuthor[];
};

export default function AuthorBlock({ authors }: AuthorBlockProps) {
  if (authors.length === 0) return null;

  return (
    <div className="space-y-4">
      {authors.map((author) => (
        <div key={author.name} className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-slate-900 sm:text-base">
              {author.name}
            </p>
            {author.affiliation && (
              <p className="text-xs text-slate-600 sm:text-sm">
                {author.affiliation}
              </p>
            )}
            {author.email && (
              <p className="text-xs sm:text-sm">
                <a
                  href={`mailto:${author.email}`}
                  className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
                >
                  {author.email}
                </a>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
