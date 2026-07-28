import { useState } from "react";
import { predictCarPrice } from "../services/api";

function CarForm({ onPrediction }) {
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    mileage: "",
    transmission: "Manual",
    fuelType: "Petrol",
    tax: "",
    mpg: "",
    engineSize: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }

    if (Number(formData.year) < 1990 || Number(formData.year) > 2030) {
      newErrors.year = "Year must be between 1990 and 2030";
    }

    if (Number(formData.mileage) < 0) {
      newErrors.mileage = "Mileage cannot be negative";
    }

    if (Number(formData.tax) < 0 || Number(formData.tax) > 1000) {
      newErrors.tax = "Tax must be between 0 and 1000";
    }

    if (Number(formData.mpg) <= 0 || Number(formData.mpg) > 200) {
      newErrors.mpg = "MPG must be between 0 and 200";
    }

    if (Number(formData.engineSize) <= 0 || Number(formData.engineSize) > 10) {
      newErrors.engineSize = "Invalid engine size";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await predictCarPrice({
        ...formData,
        year: Number(formData.year),
        mileage: Number(formData.mileage),
        tax: Number(formData.tax),
        mpg: Number(formData.mpg),
        engineSize: Number(formData.engineSize),
      });

      onPrediction(result.price);
    } catch (error) {
      alert("Prediction failed.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Car Details</h2>

      <p className="text-gray-500 mb-6">
        Enter the specifications of the BMW to estimate its market price.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            name="model"
            placeholder="e.g. Ford, Fiesta"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            name="year"
            type="number"
            min="1990"
            max="2030"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Mileage
          </label>
          <input
            name="mileage"
            type="number"
            min="0"
            value={formData.mileage}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mileage && (
            <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tax
          </label>
          <input
            name="tax"
            type="number"
            min="0"
            value={formData.tax}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.tax && (
            <p className="text-red-500 text-sm mt-1">{errors.tax}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Transmission
          </label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Manual</option>
            <option>Automatic</option>
            <option>Semi-Auto</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Fuel Type
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            MPG
          </label>
          <input
            name="mpg"
            type="number"
            value={formData.mpg}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mpg && (
            <p className="text-red-500 text-sm mt-1">{errors.mpg}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Engine Size (L)
          </label>
          <input
            name="engineSize"
            type="number"
            step="0.1"
            min="1.0"
            value={formData.engineSize}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.engineSize && (
            <p className="text-red-500 text-sm mt-1">{errors.engineSize}</p>
          )}
        </div>

        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 transition duration-200"
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CarForm;
