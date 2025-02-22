import { useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GlobalLoading from "../components/GlobalLoading";
import useDebounce from "./useDebounce";

// Global state
let loadingCount = 0;
let loadingContainer: HTMLDivElement | null = null;
let loadingRoot: ReactDOM.Root | null = null;

export function useLoading() {
  const CLOSE_DELAY = 300; // Debounce delay for closing

  // Create loading container and React Root instance on mount
  useEffect(() => {
    if (!loadingContainer) {
      loadingContainer = document.createElement("div");
      document.body.appendChild(loadingContainer);
    }

    // Cleanup on unmount
    return () => {
      setTimeout(() => {
        if (loadingRoot) {
          loadingRoot.unmount();
          loadingRoot = null;
        }
        if (loadingContainer) {
          document.body.removeChild(loadingContainer);
          loadingContainer = null;
        }
        loadingCount = 0;
      }, 0);
    };
  }, []);

  // Start loading
  const startLoading = useCallback(() => {
    if (loadingCount === 0 && !loadingRoot && loadingContainer) {
      loadingRoot = ReactDOM.createRoot(loadingContainer);
    }
    if (loadingRoot) {
      loadingRoot.render(<GlobalLoading />);
    }
    loadingCount++;
  }, []);

  // Debounced close loading
  const debouncedCloseLoading = useDebounce(() => {
    if (loadingCount === 0 && loadingRoot) {
      queueMicrotask(() => {
        if (loadingRoot) {
          loadingRoot.unmount();
          loadingRoot = null;
        }
      });
    }
  }, CLOSE_DELAY);

  // Stop loading
  const stopLoading = useCallback(() => {
    loadingCount = Math.max(loadingCount - 1, 0);
    if (loadingCount === 0) {
      debouncedCloseLoading();
    }
  }, [debouncedCloseLoading]);

  return { startLoading, stopLoading };
}
