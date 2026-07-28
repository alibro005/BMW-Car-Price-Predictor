import joblib
import pandas as pd

# Load saved artifacts
pipeline = joblib.load("model/pipeline.pkl")


def predict_price(input_data):
    """
    Predict the price of a car.

    Parameters:
        input_data (dict): Dictionary containing car features.

    Returns:
        float: Predicted car price.
    """

    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])

    # Make prediction using the loaded pipeline
    predicted_price = pipeline.predict(input_df)

    return predicted_price[0]
