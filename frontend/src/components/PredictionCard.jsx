function PredictionCard({ prediction }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Estimated Price</h2>

      {prediction !== null ? (
        <p className="text-4xl font-bold text-blue-600">
          £
          {prediction.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ) : (
        <p className="text-gray-500">
          Submit the form to see the predicted price.
        </p>
      )}
    </div>
  );
}

export default PredictionCard;
