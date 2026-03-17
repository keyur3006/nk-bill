import { Building2, Pencil } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [showInput, setShowInput] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  const navigate = useNavigate();

  const API = "http://localhost:5000/api/categories";

  // FETCH BLOCKS
  const fetchCategories = async () => {
    const res = await axios.get(API);
    setCategories(res.data);

    if (res.data.length > 0) {
      setShowBlock(true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ADD BLOCK
  const handleAdd = async () => {
    if (!newCategory.trim()) return;

    await axios.post(API, {
      name: newCategory,
    });

    setNewCategory("");
    setShowInput(false);
    setShowBlock(true);

    fetchCategories();
  };

  // EDIT BLOCK
  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setNewCategory(name);
    setShowInput(true);
  };

  // UPDATE BLOCK
  const handleUpdate = async () => {
    await axios.put(`${API}/${editingId}`, {
      name: newCategory,
    });

    setEditingId(null);
    setNewCategory("");
    setShowInput(false);

    fetchCategories();
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Shop Blocks</h1>

        {/* BUTTON SECTION */}
        <div className="flex gap-4 mb-6">
          
          {/* ADD BLOCK BUTTON */}
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Add Block
            </button>
          )}

          {/* INPUT FIELD */}
          {showInput && (
            <>
              <input
                type="text"
                placeholder="Enter Block Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value.toUpperCase())}
                className="border p-3 rounded-lg uppercase"
              />

              {editingId ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Save Block
                </button>
              )}
            </>
          )}

          {/* BOTTLE VARIETY BUTTON */}
          <button
            onClick={() => navigate("/bottle-variety")}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Add Bottle Variety
          </button>
        </div>

        {/* BLOCK LIST */}
        {showBlock && (
          <div className="space-y-3">
            {categories.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="text-blue-600" />
                  <span className="font-semibold">{item.name}</span>
                </div>

                <button
                  onClick={() => handleEdit(item.id, item.name)}
                  className="text-blue-600"
                >
                  <Pencil size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Categories;