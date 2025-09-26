import React, { useState } from "react";
import { uploadVideos } from "../constants/api";

const UploadVideos = () => {
  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFilesChange = (files) => {
    const fileArray = Array.from(files);
    setVideos(fileArray);
    setTitles(Array(fileArray.length).fill(""));
    setSummaries(Array(fileArray.length).fill(""));
  };

  const handleFileInput = (e) => {
    handleFilesChange(e.target.files);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFilesChange(e.dataTransfer.files);
    }
  };

  const handleTitleChange = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const handleSummaryChange = (index, value) => {
    const newSummaries = [...summaries];
    newSummaries[index] = value;
    setSummaries(newSummaries);
  };

  const removeVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    const newTitles = titles.filter((_, i) => i !== index);
    const newSummaries = summaries.filter((_, i) => i !== index);
    
    setVideos(newVideos);
    setTitles(newTitles);
    setSummaries(newSummaries);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videos.length === 0) {
      setMessage("Please select at least one video to upload.");
      return;
    }

    const formData = new FormData();
    videos.forEach((file) => formData.append("videos", file));
    formData.append("titles", JSON.stringify(titles));
    formData.append("summaries", JSON.stringify(summaries));

    try {
      setLoading(true);
      setMessage("");
      
      const res = await uploadVideos(formData);
      
      setMessage(res.message || "Videos uploaded successfully!");
      console.log(res.videos);
      

      setVideos([]);
      setTitles([]);
      setSummaries([]);
    } catch (err) {
      console.error(err);
      setMessage(err?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
     
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Upload Videos
          </h1>
          <p className="text-gray-600">
            Upload multiple videos with titles and summaries
          </p>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
          
            <div className="relative">
              <div
                className={`
                  border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300
                  ${dragActive 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 hover:border-orange-400 hover:bg-orange-25'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                 
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  <div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      Drop your videos here, or browse
                    </p>
                    <p className="text-gray-500">
                      Select multiple video files (MP4, MOV, AVI, etc.)
                    </p>
                  </div>
                  
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

          
            {videos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Selected Videos ({videos.length})
                  </h3>
                  <div className="text-sm text-gray-500">
                    Total size: {formatFileSize(videos.reduce((acc, file) => acc + file.size, 0))}
                  </div>
                </div>

                <div className="grid gap-6">
                  {videos.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
                    >
                   
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h8l4 4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-lg">
                              {file.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Remove video"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                  
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Video Title
                          </label>
                          <input
                            type="text"
                            placeholder="Enter video title..."
                            value={titles[index]}
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Video Summary
                          </label>
                          <textarea
                            placeholder="Enter video summary..."
                            value={summaries[index]}
                            onChange={(e) => handleSummaryChange(index, e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

         
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading || videos.length === 0}
                className={`
                  inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform
                  ${loading || videos.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-orange-500 text-white hover:from-teal-700 hover:to-orange-600 hover:scale-105 shadow-xl hover:shadow-2xl'
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading Videos...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload {videos.length > 0 ? `${videos.length} Video${videos.length > 1 ? 's' : ''}` : 'Videos'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>


        {message && (
          <div className={`
            rounded-xl p-6 mb-6 border-l-4 shadow-lg
            ${message.includes('success') || message.includes('uploaded')
              ? 'bg-green-50 border-green-500 text-green-800'
              : message.includes('failed') || message.includes('error')
              ? 'bg-red-50 border-red-500 text-red-800'
              : 'bg-blue-50 border-blue-500 text-blue-800'
            }
          `}>
            <div className="flex items-center">
              {message.includes('success') || message.includes('uploaded') ? (
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : message.includes('failed') || message.includes('error') ? (
                <svg className="w-6 h-6 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <p className="font-semibold text-lg">{message}</p>
            </div>
          </div>
        )}

     
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
              <div className="animate-spin mx-auto mb-4 w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Uploading Videos
              </h3>
              <p className="text-gray-600">
                Please wait while we process your files...
              </p>
            </div>
          </div>
        )}

        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Upload Guidelines</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Supported formats: MP4, MOV, AVI, WMV, and more</li>
                <li>• You can upload multiple videos at once</li>
                <li>• Title and summary are optional but recommended</li>
                <li>• Large files may take longer to upload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;