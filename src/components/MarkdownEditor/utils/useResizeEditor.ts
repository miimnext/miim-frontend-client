import { useRef, useEffect } from "react";

export const useResizeEditor = (
  editorRef: React.RefObject<HTMLTextAreaElement | null>,
  previewRef: React.RefObject<HTMLDivElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const isResizing = useRef(false);
  const separatorRef = useRef<HTMLDivElement>(null);

  const startResize = () => {
    isResizing.current = true;
  };

  const stopResize = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    const resizeEditor = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current || !separatorRef.current)
        return;

      const rect = containerRef.current.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      const minWidth = 100;
      offsetX = Math.min(
        Math.max(offsetX, minWidth),
        rect.width - minWidth - separatorRef.current.offsetWidth
      );
      const percent = (offsetX / rect.width) * 100;

      if (editorRef.current) {
        editorRef.current.style.flexBasis = `${percent}%`;
      }
      if (previewRef.current) {
        previewRef.current.style.flexBasis = `${100 - percent}%`;
      }
    };

    const separator = separatorRef.current;
    if (!separator) return;

    separator.addEventListener("mousedown", startResize);
    document.addEventListener("mousemove", resizeEditor);
    document.addEventListener("mouseup", stopResize);

    return () => {
      separator.removeEventListener("mousedown", startResize);
      document.removeEventListener("mousemove", resizeEditor);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [containerRef, editorRef, previewRef]); // Only include necessary dependencies

  return separatorRef;
};
