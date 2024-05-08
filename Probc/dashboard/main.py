import json
import numpy as np
from fastapi.responses import JSONResponse
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import User, UploadedFile  # Ensure this import is correct
from database import get_db
import pandas as pd
import os
import uvicorn
from EDA import EDA
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow origins you want to access the API from
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001"
]


data = None

# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Helper function to handle non-serializable data
def handle_non_serializable(val):
    if isinstance(val, np.float64):
        if np.isnan(val):
            return None
        else:
            return float(val)
    elif isinstance(val, tuple):
        return list(val)
    return val


# Custom encoder
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.generic):
            return obj.item()
        return json.JSONEncoder.default(self, obj)


@app.post("/upload")
async def upload_file(userid: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userid).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    global data
    if file.filename.endswith('.csv'):
        encodings = ['utf-8', 'latin1', 'cp1252', 'ISO-8859-1', 'utf-16']
        for _ in encodings:
            try:
                data = pd.read_csv(file.file)
                break
            except UnicodeDecodeError:
                continue
    elif file.filename.endswith('.xlsx'):
        encodings = ['utf-8', 'latin1', 'cp1252', 'ISO-8859-1', 'utf-16']
        for _ in encodings:
            try:
                data = pd.read_csv(file.file)
                break
            except UnicodeDecodeError:
                continue
    else:
        return "Check the format!"

    parent_directory = 'User_Files'
    new_directory_name = str(userid)
    new_directory_path = os.path.join(parent_directory, new_directory_name)
    if not os.path.exists(new_directory_path):
        os.makedirs(new_directory_path)

    csv_file_path = os.path.join(new_directory_path, file.filename)
    file_obj = UploadedFile(filename=file.filename, user_id=userid, path=csv_file_path)

    db.add(file_obj)
    db.commit()

    data.to_csv(csv_file_path, index=False)

    return "File saved successfully as CSV!"


@app.get("/files/{userid}")
def get_files(userid: int, db: Session = Depends(get_db)):
    files = db.query(UploadedFile).filter(UploadedFile.user_id == userid).all()
    return files


@app.get("/Users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@app.post("/Register")
def register(username: str, occupation: str, password: str, email_id: str, db: Session = Depends(get_db)):
    user = User(username=username, occupation=occupation, password=password, email_id=email_id)
    db.add(user)
    db.commit()
    return "Registered Successfully!"


@app.delete("/RemoveUser")
def remove_user(userid: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userid).first()
    db.delete(user)
    db.commit()
    return "Deleted Successfully"


@app.delete("/RemoveFile")
def remove_file(fileid: int, db: Session = Depends(get_db)):
    file = db.query(UploadedFile).filter(UploadedFile.file_id == fileid).first()
    if file:
        # Get the path of the file
        file_path = file.path
        # Delete the file from the filesystem
        os.remove(file_path)
        # Delete the UploadedFile instance from the database
        db.delete(file)
        db.commit()
        return "File removed successfully"
    else:
        return "File not found"


@app.delete("/RemoveFiles")
def remove_files(userid: int, db: Session = Depends(get_db)):
    files = db.query(UploadedFile).filter(User.user_id == userid).all()
    for file in files:
        if file:
            # Get the path of the file
            file_path = file.path
            # Delete the file from the filesystem
            os.remove(file_path)
            # Delete the UploadedFile instance from the database
            db.delete(file)
            db.commit()
    return "All the files are deleted"


@app.get("/Visuals")
def visuals(fileid: int, clean: bool, db: Session = Depends(get_db)):
    file = db.query(UploadedFile).filter(UploadedFile.file_id == fileid).first()
    if file:
        path = file.path
        new_data = EDA(path)
        if clean:
            new_data.clean()
        results = new_data.insights()
        print(results)
        json_data = json.dumps(results, cls=JSONEncoder, default=handle_non_serializable, indent=2)
        print(json_data)
        return json_data
    return JSONResponse(content={"error": "File not found"}, status_code=404)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, port=8001)
