import { useRouter } from "@/i18n/routing";

function useSafeBack() {
  const router = useRouter();

  const safeBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/");
      window.location.href = "/";
    }
  };

  return safeBack;
}

export default useSafeBack;
