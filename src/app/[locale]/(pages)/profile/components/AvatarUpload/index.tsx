import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import { Button } from "@/components";
import CommonApi from "@/api/Common";

interface AvatarUploadProps {
  children: React.ReactNode;
  onUploadSuccess: (url: string) => void; // 父组件传递的回调函数
}

const AvatarUpload = ({ children, onUploadSuccess }: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const resetState = useCallback(() => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setIsPreviewOpen(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsPreviewOpen(true);
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  const handleUpload = async () => {
    if (!selectedFile) return setError("No file selected.");
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await CommonApi.upload(formData);
      if (response?.code === 200) {
        const uploadedUrl = response.data.filePath;
        onUploadSuccess(uploadedUrl);
        resetState();
      } else {
        setError(response?.message || "Upload failed.");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label htmlFor="fileInput" className="cursor-pointer shadow-lg">
        {children}
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        ref={fileInputRef} // Use the ref here
        onChange={handleFileChange}
      />

      {isPreviewOpen && previewUrl && (
        <Modal onClose={resetState}>
          <div className="relative p-10 rounded-lg bg-white">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src={previewUrl}
                alt="Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button onClick={resetState}>Cancel</Button>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                variant="primary"
                className="text-gray-100"
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AvatarUpload;
