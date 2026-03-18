import { BottleWine, Pencil } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";
import api from "../../utils/api";

interface Bottle {
  id: number;
  name: string;
  price: number;
}

const BottleVariety = () => {
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [newBottle, setNewBottle] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // FETCH BOTTLES
  const fetchBottles = async () => {
    try {
      const res = await api.get("/bottles"); // ✅ FIX
      setBottles(res.data);
    } catch (error) {
      console.error("Error fetching bottles:", error);
    }
  };

  useEffect(() => {
    fetchBottles();
  }, []);

  // ADD BOTTLE
  const handleAdd = async () => {
    if (!newBottle.trim() || !price) return;

    try {
      await api.post("/bottles", { // ✅ FIX
        name: newBottle,
        price: Number(price),
      });

      setNewBottle("");
      setPrice("");
      fetchBottles();
    } catch (error) {
      console.error("Error adding bottle:", error);
    }
  };

  // EDIT
  const handleEdit = (id: number, name: string, price: number) => {
    setEditingId(id);
    setNewBottle(name);
    setPrice(price.toString());
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      await api.put(`/bottles/${editingId}`, { // ✅ FIX
        name: newBottle,
        price: Number(price),
      });

      setEditingId(null);
      setNewBottle("");
      setPrice("");
      fetchBottles();
    } catch (error) {
      console.error("Error updating bottle:", error);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Bottle Variety</h1>

        {/* Input Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Bottle Name"
            value={newBottle}
            onChange={(e) => setNewBottle(e.target.value.toUpperCase())}
            className="border p-3 rounded-lg uppercase"
          />

          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded-lg"
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
              Add Bottle
            </button>
          )}
        </div>

        {/* Bottle List */}
        <div className="space-y-3">
          {bottles.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
            >
              <div className="flex items-center gap-3">
                <BottleWine className="text-blue-600" />
                <span className="font-semibold">{item.name}</span>
                <span className="font-bold text-green-600">
                  ₹{item.price}
                </span>
              </div>

              <button
                onClick={() =>
                  handleEdit(item.id, item.name, item.price)
                }
                className="text-blue-600"
              >
                <Pencil size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default BottleVariety;