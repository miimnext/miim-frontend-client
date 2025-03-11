import { cookies } from "next/headers";

export default async function SSSIDheader() {
  const cookieStore = await cookies();
  return {
    Authorization: `Bearer ${cookieStore.get("SSSID")?.value}`,
  };
}
