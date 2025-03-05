"use client";
import { ReactNode, useState, useEffect } from "react";

interface KeepAliveProps {
  id: string;
  children: ReactNode;
}

const cache = new Map<string, ReactNode>();

export const KeepAlive = ({ id, children }: KeepAliveProps) => {
  const [cached, setCached] = useState<ReactNode | null>(cache.get(id) || null);

  useEffect(() => {
    cache.set(id, children);
    setCached(children);
  }, [id, children]);

  return <div style={{ display: cached ? "none" : "block" }}>{cached}</div>;
};
