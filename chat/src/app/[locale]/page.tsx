import { redirect } from "@/i18n/routing";

export default async function Index({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  return redirect({ href: "/chat", locale: locale });
}
