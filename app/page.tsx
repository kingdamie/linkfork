export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center font-sans">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          LinkFork
        </h1>
        <p className="mx-auto max-w-md text-balance text-lg text-zinc-600 dark:text-zinc-400">
          One link, every platform. Share a single URL and LinkFork sends each
          visitor to the right destination based on their device — App Store,
          Google Play, or your website.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <code className="rounded-lg border border-black/8 bg-black/4 px-4 py-2 font-mono text-sm dark:border-white/15 dark:bg-white/6">
          /go
        </code>
        <a
          href="/go"
          className="flex h-10 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Try it
        </a>
      </div>

      <p className="text-sm text-zinc-500">
        Apple devices → App Store · Android → Google Play · Everything else →
        fallback URL
      </p>
    </main>
  );
}
