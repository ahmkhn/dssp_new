export default async function Index() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-12 text-center">
        <a
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
          href="https://linkedin.com/in/ahmkhn"
        >
          developed by @ahmkhn
        </a>
        <h1 className="font-sans text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Decolonizing Social Sciences in Pakistan
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          An application that fosters a global community where users can share their research and collaborate, promoting a sense of unity and mutual support.
        </p>




        <div className="space-x-4">
          <a
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground h-11 px-8 rounded-md hover:bg-white hover:text-black hover:shadow hover:shadow-slate-600"
            href="/login"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
