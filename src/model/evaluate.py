import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


def evaluate_model(y_true, y_pred):
    """Evaluate regression model performance."""

    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_true, y_pred)

    return {
        "MAE": round(mae, 3),
        "MSE": round(mse, 3),
        "RMSE": round(rmse, 3),
        "R2": round(r2, 3),
    }


def print_evaluation(results):
    """Print evaluation metrics."""

    print("\nModel Evaluation Metrics")
    print("-" * 30)

    for metric, value in results.items():
        print(f"{metric:<6}: {value}")