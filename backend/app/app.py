import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from huggingface_hub import hf_hub_download
import joblib


model_path = hf_hub_download(
    repo_id="alibro005/BMW-Car-Price-Predictor",
    filename="pipeline.pkl"
)

pipeline = joblib.load(model_path)



app = FastAPI(
    title="Car Price Prediction API",
    description="Predicts used BMW car prices using a trained machine learning pipeline.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CarInput(BaseModel):
    model: str

    year: int = Field(..., ge=1990, le=2030)

    mileage: float = Field(..., ge=0)

    transmission: Literal["Manual", "Automatic", "Semi-Auto"]

    fuelType: Literal["Petrol", "Diesel", "Hybrid", "Electric", "Other"]

    tax: int = Field(..., ge=0, le=10000, description="Vechile Tax")

    mpg: float = Field(..., gt=0, le=200, description="Miles Per Gallon")

    engineSize: float = Field(..., gt=0, le=10, description="Engine size in liters")


# Describe what we send back
class PredictionResponse(BaseModel):
    price: float = Field(..., ge=0)


@app.get("/")
def root():
    return {"message": "Welcome to the Car Price Prediction API!"}


@app.post("/predict")
def predict(car: CarInput):
    try:
        input_df = pd.DataFrame([car.model_dump()])

        prediction = pipeline.predict(input_df)

        prediction = max(0, prediction)

        return PredictionResponse(price=float(prediction[0]))

    except Exception as e:
        print(f"Error occurred during prediction: {e}")
        return {"error": str(e)}
