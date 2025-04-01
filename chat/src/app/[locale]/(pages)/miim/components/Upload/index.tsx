"use client";
import Upload from "@/components/Upload";
interface UploadSuccessResponse {
  success: boolean;
  data?: string;
}

interface UploadError {
  message: string;
}
export default function Example() {
  const handleUploadSuccess = (response: UploadSuccessResponse) => {
    console.log("Upload Success:", response);
  };

  const handleUploadError = (error: UploadError) => {
    console.error("Upload Error:", error);
  };

  const handleUploadStart = () => {
    console.log("Upload Started");
  };

  return (
    <>
      <Upload
        uploadUrl="/api/upload"
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        onUploadStart={handleUploadStart}
      />
    </>
  );
}
