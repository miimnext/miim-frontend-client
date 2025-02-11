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
      // Ensure proper cleanup only when the loading count is zero
      if (loadingRoot) {
        loadingRoot.unmount();
      }
      if (loadingContainer) {
        document.body.removeChild(loadingContainer);
      }
      loadingContainer = null;
      loadingRoot = null;
      loadingCount = 0; // Reset count
    };
  }, []);

  // Start loading
  const startLoading = useCallback(() => {
    // If the root doesn't exist, create it
    if (loadingCount === 0 && !loadingRoot && loadingContainer) {
      loadingRoot = ReactDOM.createRoot(loadingContainer); // Create root instance
    }

    // Render loading component if the root is available
    if (loadingRoot) {
      loadingRoot.render(<GlobalLoading />); // Render loading component
    }

    loadingCount++; // Increment count
  }, []);
  // Debounced close loading
  const debouncedCloseLoading = useDebounce(() => {
    if (loadingCount === 0 && loadingRoot) {
      loadingRoot.unmount(); // Unmount loading component
      loadingRoot = null; // Reset the root
    }
  }, CLOSE_DELAY);
  // Stop loading
  const stopLoading = useCallback(() => {
    loadingCount = Math.max(loadingCount - 1, 0); // Decrement count, ensure >= 0
    if (loadingCount === 0) {
      debouncedCloseLoading(); // Call debounced close loading
    }
  }, [debouncedCloseLoading]); // Include debouncedCloseLoading in the dependency array

  return { startLoading, stopLoading };
}
