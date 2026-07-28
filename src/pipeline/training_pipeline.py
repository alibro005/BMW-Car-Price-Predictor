from src.data.load_data import load_data
from src.data.preprocess import preprocess_data
from src.model.train import train_model


def run_pipeline():

    df = load_data("data/raw/used_car.csv")

    df = preprocess_data(df)

    df.to_csv("data/preprocessed/processed_data.csv", index=False)

    X = df.drop(columns=["price"])
    y = df["price"]

    train_model(X, y)
