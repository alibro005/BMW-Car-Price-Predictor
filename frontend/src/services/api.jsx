const API_URL = import.meta.env.VITE_API_URL;

export async function predictCarPrice(carData) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ? data.detail[0].msg : "Prediction failed");
  }

  return data;
}
