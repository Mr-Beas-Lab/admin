import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
import { db } from "../../firebase/firebase-config";  
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

interface Category {
  name: string;
  description: string;
}

const CategoryForm: React.FC = () => {
  const { id } = useParams(); // If `id` exists, we're editing
  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch existing category data if editing
      (async () => {
        const categoryRef = doc(db, "categories", id);
        const categorySnap = await getDoc(categoryRef);
        if (categorySnap.exists()) {
          setCategoryData(categorySnap.data() as Category);
        } else {
          console.error("Category not found!");
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // Update an existing category
        const categoryRef = doc(db, "categories", id);
        await setDoc(categoryRef, categoryData, { merge: true });
        toast.success("Category updated successfully!"); // Show success toast
      } else {
        // Add a new category
        const categoryCollection = collection(db, "categories");
        await addDoc(categoryCollection, {
          ...categoryData,
          createdAt: new Date(),
        });
        toast.success("Category added successfully!"); // Show success toast
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category!"); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {id ? "Edit Category" : "Add Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                description: e.target.value,
              })
            }
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm text-sm transition-colors duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {isLoading ? "Saving..." : id ? "Update" : "Add"}
        </button>
      </form>

      {/* ToastContainer to display the toasts */}
      <ToastContainer />
    </div>
  );
};

export default CategoryForm;
