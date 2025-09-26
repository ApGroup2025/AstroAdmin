import React, { useState } from "react";
import { addPooja } from "../constants/api";

const PoojaForm = () => {
  const [formData, setFormData] = useState({
    heading: "",
    rate: "",
    introduction: "",
    deities: "",
    keyComponents: "",
    benefits: "",
    whenAndWhere: "",
    conclusion: ""
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImage(e.target.files[0]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.log(" No image selected");
      return setMessage("Image is required");
    }

    const data = new FormData();
    data.append("image", image);
    console.log("Image appended:", image);

    for (let key in formData) {
      if (key === "keyComponents" || key === "benefits") {
        const arr = formData[key]
          .split(",")
          .map(item => item.trim())
          .filter(Boolean);
        data.append(key, JSON.stringify(arr));
        console.log(`${key}:`, arr);
      } else {
        data.append(key, formData[key]);
        console.log(`${key}:`, formData[key]);
      }
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("⏳ Sending data to backend...");
      const res = await addPooja(data);
      console.log(" Response from backend:", res);

      setMessage(res.message);
      setFormData({
        heading: "",
        rate: "",
        introduction: "",
        deities: "",
        keyComponents: "",
        benefits: "",
        whenAndWhere: "",
        conclusion: ""
      });
      setImage(null);
    } catch (err) {
      console.error(" Error submitting pooja:", err);
      setMessage(err.message || "Error adding pooja");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Pooja
          </h1>
          <p className="text-gray-600 text-lg">
            Create a detailed pooja listing for devotees
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto mt-4 rounded-full"></div>
        </div>

       
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
            message.includes("Error") || message.includes("required")
              ? "bg-red-100 border border-red-300 text-red-700"
              : "bg-green-100 border border-green-300 text-green-700"
          }`}>
            {message}
          </div>
        )}

   
        <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Pooja Details Form
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Pooja Heading *
                </label>
                <input
                  type="text"
                  name="heading"
                  placeholder="Enter pooja name"
                  value={formData.heading}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                Rate (₹) *
                </label>
                <input
                  type="number"
                  name="rate"
                  placeholder="Enter rate in rupees"
                  value={formData.rate}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>


            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Introduction
              </label>
              <textarea
                name="introduction"
                placeholder="Brief introduction about the pooja..."
                value={formData.introduction}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
              />
            </div>

            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                 Deities
              </label>
              <input
                type="text"
                name="deities"
                placeholder="e.g., Lord Ganesha, Goddess Lakshmi"
                value={formData.deities}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                   Key Components *
                </label>
                <textarea
                  name="keyComponents"
                  placeholder="Enter components separated by commas..."
                  value={formData.keyComponents}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
                  required
                />
                <p className="text-xs text-gray-500">Separate multiple items with commas</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Benefits *
                </label>
                <textarea
                  name="benefits"
                  placeholder="Enter benefits separated by commas..."
                  value={formData.benefits}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
                  required
                />
                <p className="text-xs text-gray-500">Separate multiple benefits with commas</p>
              </div>
            </div>

      
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                When and Where
              </label>
              <textarea
                name="whenAndWhere"
                placeholder="Specify timing, location, or special occasions..."
                value={formData.whenAndWhere}
                onChange={handleChange}
                rows="3"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
              />
            </div>

    
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                 Conclusion
              </label>
              <textarea
                name="conclusion"
                placeholder="Concluding thoughts about the pooja..."
                value={formData.conclusion}
                onChange={handleChange}
                rows="3"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical"
              />
            </div>

        
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Pooja Image *
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 bg-gray-50 hover:bg-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  required
                />
                {image && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </div>

          
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Add Pooja</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

     
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            * Required fields must be filled to submit the form
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoojaForm;