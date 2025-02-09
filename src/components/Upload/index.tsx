import React, { useState } from "react";
import axios from "axios";
import Button from "../Button";
import Input from "../Input";

interface UploadProps {
    uploadUrl: string;
    onUploadStart?: () => void;
    onUploadSuccess?: (data: any) => void;
    onUploadError?: (error: string) => void;
}

const Upload: React.FC<UploadProps> = ({ uploadUrl, onUploadStart, onUploadSuccess, onUploadError }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Store preview URLs for multiple files

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFiles(files);

            // Generate preview URLs for each selected file
            const newPreviewUrls = Array.from(files).map((file) =>
                file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
            );
            setPreviewUrls(newPreviewUrls);
        }
    };

    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            setError("No files selected.");
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
            formData.append("files", file); // Append each file
        });

        onUploadStart?.();

        try {
            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (e) => {
                    if (e.total && e.total > 0) {
                        setProgress(Math.round((e.loaded / e.total) * 100));
                    }
                },
            });

            setUploading(false);
            setSuccess(true);
            onUploadSuccess?.(response.data);
        } catch (err: any) {
            setUploading(false);
            setError(err.response?.data?.message || "Upload failed.");
            onUploadError?.(err.response?.data?.message || "Upload failed.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <input
                type="file"
                onChange={handleFileChange}
                multiple // Allow selecting multiple files
                className="block w-full text-sm text-gray-700 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:hover:bg-blue-100 file:focus:outline-none mb-4"
            />

            {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {previewUrls.map((preview, index) => (
                        preview && (
                            <div key={index} className="relative">
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-md shadow-md"
                                />
                            </div>
                        )
                    ))}
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
            {success && <div className="text-green-500 text-sm mb-4">Upload successful!</div>}

            <Button
                onClick={handleUpload}
                disabled={uploading || !selectedFiles || selectedFiles.length === 0}
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {uploading ? "Uploading..." : "Upload"}
            </Button>
        </div>
    );
};

export default Upload;
