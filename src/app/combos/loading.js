export default function CombosLoading() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 lg:px-10" aria-label="Loading combos">
      <div className="mx-auto max-w-[1440px] animate-pulse">
        <div className="h-3 w-44 rounded bg-[#EAF3E7]" />
        <div className="mt-4 h-10 w-72 max-w-full rounded bg-[#EAF3E7]" />
        <div className="mt-4 h-4 w-full max-w-2xl rounded bg-[#F2F7F0]" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-3xl border border-[#E5E7EB]">
              <div className="aspect-square bg-[#F2F7F0]" />
              <div className="space-y-3 p-5">
                <div className="h-3 w-24 rounded bg-[#EAF3E7]" />
                <div className="h-5 w-3/4 rounded bg-[#F2F7F0]" />
                <div className="h-4 w-1/2 rounded bg-[#F2F7F0]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
