export default function Page({ params }: { params: { slug: string } }) {
  return <div className="">Local: {params.slug}</div>;
}
