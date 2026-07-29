import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from src.model.evaluate import evaluate_model, print_evaluation
from pathlib import Path


def train_model(X, y):

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    numerical_features = ["year", "mileage", "tax", "mpg", "engineSize"]

    categorical_features = ["model", "transmission", "fuelType"]

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), numerical_features),
            ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
        ]
    )

    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(n_estimators=50,max_depth=15,random_state=42,),
    }

    best_pipeline = None
    best_score = -float("inf")

    for name, model in models.items():

        pipeline = Pipeline([("preprocessor", preprocessor), ("model", model)])

        pipeline.fit(X_train, y_train)

        y_pred = pipeline.predict(X_test)

        results = evaluate_model(y_test, y_pred)

        print("\n", name)
        print_evaluation(results)

        # Select best model based on R2
        if results["R2"] > best_score:
            best_score = results["R2"]
            best_pipeline = pipeline

    MODEL_PATH = Path("model/pipeline.pkl")
    MODEL_PATH.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    # Save only the best pipeline
    joblib.dump(best_pipeline, MODEL_PATH)

    print(f"\nBest model saved with R2 score: {best_score}")
