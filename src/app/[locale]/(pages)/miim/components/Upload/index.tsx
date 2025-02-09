"use client"
import Upload from "@/components/Upload";

export default function Example() {
    const handleUploadSuccess = (response: any) => {
        console.log("Upload Success:", response);
    };

    const handleUploadError = (error: string) => {
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
