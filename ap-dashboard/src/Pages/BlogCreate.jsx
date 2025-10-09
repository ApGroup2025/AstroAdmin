import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { createBlog } from "../constants/api";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [author, setAuthor] = useState("");
  const [sections, setSections] = useState([
    { id: Date.now(), heading: "", content: "", video: [] },
  ]);
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  
  const handleSectionChange = (id, field, value) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, [field]: value } : sec))
    );
  };

 
  const handleVideoFileChange = (id, e) => {
    const files = Array.from(e.target.files);
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === id ? { ...sec, video: [...sec.video, ...files] } : sec
      )
    );
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), heading: "", content: "", video: [] },
    ]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((sec) => sec.id !== id));
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();


formData.append(
  "slugUrl",
  title
    .toLowerCase()
    .trim()
    .replace(/[:,'"&]/g, "") 
    .replace(/\s+/g, "-")  
    .replace(/-+/g, "-")    
);

    formData.append("title", title);
    formData.append("meta", meta || title);
    formData.append("author", author || "Admin");
    formData.append("date", new Date().toISOString());

   
    const fullSections = sections.map((sec) => ({
      id: sec.id,
      heading: sec.heading,
      content: sec.content,
    }));
    formData.append("sections", JSON.stringify(fullSections));

    sections.forEach((sec) => {
      if (sec.video && sec.video.length > 0) {
        sec.video.forEach((file) => {
          formData.append(`videos_${sec.id}`, file);
        });
      }
    });

 
    const parsedQuestions = questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    }));
    formData.append("questions", JSON.stringify(parsedQuestions));

   
    images.forEach((img) => formData.append("images", img));

    try {
      await createBlog(formData);
      setSuccessMessage(" Blog created successfully!");
      // reset form
      setTitle("");
      setMeta("");
      setAuthor("");
      setSections([{ id: Date.now(), heading: "", content: "", video: [] }]);
      setQuestions([{ question: "", answer: "" }]);
      setImages([]);
    } catch (err) {
      alert("Error creating blog: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "#006d4d" }}>
        Create Blog
      </h2>

      {successMessage && (
        <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Title*</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Meta */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Meta Description</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Author</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Sections */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Sections</h3>
          {sections.map((sec) => (
            <div key={sec.id} className="border rounded-md p-4 mb-3 bg-gray-50">
              <input
                type="text"
                placeholder="Heading"
                value={sec.heading}
                onChange={(e) => handleSectionChange(sec.id, "heading", e.target.value)}
                className="w-full border rounded-md px-3 py-2 mb-2"
                required
              />
              <textarea
                placeholder="Content"
                value={sec.content}
                onChange={(e) => handleSectionChange(sec.id, "content", e.target.value)}
                className="w-full border rounded-md px-3 py-2 mb-2"
                rows="4"
                required
              />

              <div>
                <label className="block font-medium mb-1">Upload Videos (optional)</label>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => handleVideoFileChange(sec.id, e)}
                />
              </div>

              <button
                type="button"
                onClick={() => removeSection(sec.id)}
                className="mt-3 text-red-600 hover:text-red-800"
              >
                <FaTrashAlt className="inline mr-1" /> Remove Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="mt-2 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            <FaPlus /> Add Section
          </button>
        </div>

        {/* Questions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Questions</h3>
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
                className="flex-1 border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
                className="flex-1 border rounded-md px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            <FaPlus /> Add Question
          </button>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md font-semibold"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
