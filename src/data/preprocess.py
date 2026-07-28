from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler

import joblib


def preprocess_data(df):
    df = df.copy()

    # Handle missing values
    df = df.dropna()

    # drop duplicates
    df = df.drop_duplicates()

    # Fix data types
    df["year"] = df["year"].astype(int)
    df["mileage"] = df["mileage"].astype(float)

    # Encode categorical variables
    categorical_features = ["model", "transmission", "fuelType"]

    label_encoders = {}

    for col in categorical_features:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le

    return df
