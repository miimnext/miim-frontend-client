import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import Button from "../Button";

interface UploadProps {
  uploadUrl: string;
  onUploadStart?: () => void;
  onUploadSuccess?: (data: { success: boolean; data?: string }) => void;
  onUploadError?: (error: string) => void;
}

const Upload: React.FC<UploadProps> = ({
  uploadUrl,
  onUploadStart,
  onUploadSuccess,
  onUploadError,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);

      const newPreviewUrls = filesArray.map((file) =>
        file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
      );
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("No files selected.");
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(false);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    onUploadStart?.();

    try {
      const response = await axios.post<{ success: boolean; data?: string }>(
        uploadUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.total && e.total > 0) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          },
        }
      );

      setUploading(false);
      setSuccess(true);
      onUploadSuccess?.(response.data);
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err: unknown) {
      setUploading(false);
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Upload failed.";
      setError(errorMessage);
      onUploadError?.(errorMessage);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <Button>
        <label htmlFor="fileInput">Choose files to upload</label>
      </Button>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        multiple
        className="hidden"
      />

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {previewUrls.map(
            (preview, index) =>
              preview && (
                <div key={index} className="relative group">
                  <Image
                    src={preview}
                    width={100}
                    height={100}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md shadow-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              )
          )}
        </div>
      )}

      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
      )}

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 text-sm mb-4">Upload successful!</div>
      )}

      <Button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default Upload;
