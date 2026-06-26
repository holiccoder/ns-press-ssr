import Link from "next/link";
import Image from "next/image";
import books from "@/data/books.json";
import { getBookList, type BookListItem } from "@/lib/api";
import { resolveBookCover } from "@/lib/images";

function BookRow({ book }: { book: BookListItem }) {
  const href = `/books/${book.id}`;
  return (
    <article className="grid grid-cols-[140px_1fr] gap-6 border-b border-slate-200 py-8 first:pt-2 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8 md:grid-cols-[200px_1fr]">
      {/* Cover */}
      <Link
        href={href}
        className="block transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/10">
          <Image
            src={resolveBookCover(book.id, book.cover_image)}
            alt={book.title}
            fill
            sizes="(min-width: 768px) 200px, (min-width: 640px) 180px, 140px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* Text block */}
      <div className="min-w-0">
        <Link href={href} className="focus:outline-none focus-visible:underline">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-[#0b2545] hover:text-[#1d4ed8] sm:text-xl">
            {book.title}
          </h3>
        </Link>
        {book.ISSN && (
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">ISBN: </span>
            {book.ISSN}
          </p>
        )}
        {book.publication_time && (
          <p className="mt-1 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Published: </span>
            {book.publication_time}
          </p>
        )}
        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
          {book.introduction}
        </p>
      </div>
    </article>
  );
}

export default async function BooksList() {
  let lists: BookListItem[] = [];
  let failed = false;
  try {
    const data = await getBookList({ page: 1, pageSize: 8, lang: "中文" });
    lists = data.lists;
  } catch (err) {
    failed = true;
    console.error("[BooksList] failed to load bookList:", err);
  }

  return (
    <section className="bg-white pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            {books.breadcrumb.map((crumb, i) => {
              const isLast = i === books.breadcrumb.length - 1;
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#0b2545] hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-700">
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <span aria-hidden className="text-slate-400">
                      &gt;
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* List */}
        <div className="mt-6 divide-slate-200">
          {lists.length === 0 ? (
            <p className="py-8 text-sm text-slate-500">
              {failed
                ? "Unable to load books right now. Please try again later."
                : "No books available."}
            </p>
          ) : (
            lists.map((b) => <BookRow key={b.id} book={b} />)
          )}
        </div>
      </div>
    </section>
  );
}
