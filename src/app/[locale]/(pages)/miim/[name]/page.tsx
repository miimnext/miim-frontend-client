import componentsMaps from "../components";
export default async function Miim({ params }: { params: { name: string } }) {
  const { name } = await params;
  const Component = componentsMaps[name as keyof typeof componentsMaps] || null;
  return <>{Component && <Component />}</>;
}
