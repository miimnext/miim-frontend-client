import { useState, useCallback } from "react";

type AsyncFunction<T extends unknown[] = unknown[], R = unknown> = (
  ...args: T
) => Promise<R>;

const useLoading = <T extends unknown[] = unknown[], R = unknown>(
  asyncFunction: AsyncFunction<T, R>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: T) => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, loading, error };
};

export default useLoading;
