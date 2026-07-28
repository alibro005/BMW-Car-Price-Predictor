import { useState } from "react";
import Navbar from "./components/Navbar";
import CarForm from "./components/CarForm";
import PredictionCard from "./components/PredictionCard";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen from-slate-100 via-blue-50 to-slate-200 ">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ml-5.5">
        <CarForm onPrediction={setPrediction} />
        <PredictionCard prediction={prediction} />
      </div>
    </div>
  );
}

export default App;
