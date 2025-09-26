import React, { useState, useRef } from "react";
import { uploadBanners } from "../constants/api";

const UploadBanner = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(imageFiles);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!title.trim()) {
      setMessage("Please enter a banner title");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (files.length === 0) {
      setMessage("Please select at least one image");
      setMessageType("error");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("titles", title);
    formData.append("subtitles", subtitle);

    try {
      const response = await uploadBanners(formData);
      console.log("Success:", response);
      setMessage("Banner uploaded successfully!");
      setMessageType("success");
      setTitle("");
      setSubtitle("");
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("Upload failed. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#006d4d' }}>
        Upload New Banner
      </h2>

      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Banner Title
          </label>
          <input
            type="text"
            placeholder="Enter banner title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ 
              borderColor: '#ddd',
              focusRingColor: '#006d4d'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006d4d'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* Subtitle Input */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Banner Subtitle
          </label>
          <input
            type="text"
            placeholder="Enter banner subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ 
              borderColor: '#ddd'
            }}
            onFocus={(e) => e.target.style.borderColor = '#006d4d'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Upload Images
          </label>
          
          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              dragActive ? 'bg-orange-50' : 'hover:bg-gray-50'
            }`}
            style={{
              borderColor: dragActive ? 'orange' : '#ddd'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center space-y-3">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-gray-600 font-medium">
                  {dragActive ? 'Drop your images here' : 'Drop images here or click to browse'}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-700">
                  {files.length} file(s) selected
                </p>
                <button
                  type="button"
                  onClick={() => setFiles([])}
                  className="text-xs font-medium px-2 py-1 rounded hover:bg-orange-50 transition-colors"
                  style={{ color: 'orange' }}
                >
                  Clear all
                </button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#006d4d' }}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 truncate" style={{ maxWidth: '200px' }}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-3 rounded text-white font-semibold transition-all mt-6"
          style={{
            background: loading 
              ? '#9ca3af' 
              : 'linear-gradient(135deg, #006d4d 0%, orange 100%)',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 109, 77, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload Banner</span>
              </>
            )}
          </div>
        </button>

        {/* Message Display */}
        {message && (
          <div 
            className="mt-4 p-3 rounded border-l-4"
            style={{
              backgroundColor: messageType === "success" ? '#f0fdf4' : '#fef2f2',
              borderColor: messageType === "success" ? '#22c55e' : '#ef4444',
              color: messageType === "success" ? '#166534' : '#dc2626'
            }}
          >
            <div className="flex items-center space-x-2">
              {messageType === "success" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              )}
              <p className="font-medium text-sm">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBanner;