import pandas as pd
import numpy as np
import itertools


class EDA:
    def __init__(self, path):
        self.data = pd.read_csv(path)

    def clean(self):
        # Remove rows with any missing values
        self.data.dropna(inplace=True)

        # Convert non-numeric columns to numeric if possible
        self.data = self.data.apply(pd.to_numeric, errors='ignore')

        # Remove duplicate rows
        self.data.drop_duplicates(inplace=True)

        # Handle any additional cleaning tasks specific to your dataset

        # Example: Remove outliers from numeric columns
        numeric_columns = self.data.select_dtypes(include='number').columns
        for col in numeric_columns:
            # Calculate 1st and 99th percentiles
            q1 = self.data[col].quantile(0.01)
            q3 = self.data[col].quantile(0.99)
            # Replace outliers with NaN
            self.data.loc[(self.data[col] < q1) | (self.data[col] > q3), col] = np.mean(self.data[col])

        # Example: Convert date columns to datetime objects
        date_columns = self.data.select_dtypes(include='object').columns
        for col in date_columns:
            try:
                self.data[col] = pd.to_datetime(self.data[col])
            except:
                pass  # Ignore columns that can't be converted to datetime

        # Example: Normalize text data
        text_columns = self.data.select_dtypes(include='object').columns
        for col in text_columns:
            self.data[col] = self.data[col].str.lower().str.strip()

    def insights(self):
        # Summary of the dataset
        summary = self.data.describe(include='all')
        json_data = self.data.to_json()
        summary_dict = summary.to_dict()
        return {"summary": summary_dict, "data": json_data}

