import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { db } from "../../../services/firebase/firebase";

const AddIssuePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isUser = user?.role === "user";
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    suggestionFix: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      alert("Please login first.");
      return;
    }

    if (!isUser) {
      alert("Only users can add issues.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        title: formData.title.trim(),
        descp: formData.description.trim(),
        suggestion: formData.suggestionFix.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
        createdBy: doc(db, "users", user.id),
      };

      await addDoc(collection(db, "issues"), payload);
      console.log("saved issue data", payload);
      navigate("/issues");
    } catch (error) {
      console.error("Error saving issue", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return "404";

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center px-4 py-10 bg-blue-50/50">
      <Card className="max-w-2xl">
        {!isUser && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            Only users can add new issues.
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/issues")}
              className="p-1 size-9 flex items-center justify-center border rounded-lg border-gray-200 hover:bg-gray-50 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Issue</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to report a new issue with a suggested
            fix.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter issue title"
            required
            disabled={isSaving || !isUser}
          />

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue"
              required
              disabled={isSaving || !isUser}
              className="min-h-28 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="suggestionFix"
              className="block text-sm font-medium text-gray-700"
            >
              Suggestion Fix
            </label>
            <textarea
              id="suggestionFix"
              name="suggestionFix"
              value={formData.suggestionFix}
              onChange={handleChange}
              placeholder="Suggest a fix"
              required
              disabled={isSaving || !isUser}
              className="min-h-28 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              onClick={() => navigate("/issues")}
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSaving || !isUser}>
              {isSaving ? "Saving..." : "Save Issue"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddIssuePage;
