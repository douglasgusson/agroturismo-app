export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {params.slug}
    </div>
  );
}
