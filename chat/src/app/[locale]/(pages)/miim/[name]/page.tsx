import componentsMaps from "../components";

export default async function Miim({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const Component = componentsMaps[name as keyof typeof componentsMaps] || null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {Component ? <Component /> : <p>Component not found</p>}
    </div>
  );
}
