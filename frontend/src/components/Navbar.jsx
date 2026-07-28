import bmwLogo from "../assets/bmw.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="text-center py-10">
        <img src={bmwLogo} alt="BMW Logo" className="mx-auto h-20 w-20 md:h-32 md:w-32" />
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800">
          BMW Car Price Prediction
        </h1>

        <p className="text-slate-600 mt-4 max-w-xl mx-auto">
          Estimate the value of a used BMW using a machine learning model built
          with React, FastAPI, and Scikit-learn.
        </p>
      </div>
    </header>
  );
}

export default Navbar;
