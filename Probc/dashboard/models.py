from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    occupation = Column(String, nullable=False)
    email_id = Column(String, nullable=False, unique=True)  # Ensure email_id is unique
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default='User')

    # Define a relationship with the UploadedFile table
    files = relationship("UploadedFile", back_populates="user")

    # Define a UniqueConstraint to enforce uniqueness of email_id
    __table_args__ = (
        UniqueConstraint('email_id', name='unique_email'),
    )

class UploadedFile(Base):
    __tablename__ = 'files'

    file_id = Column(Integer, primary_key=True, autoincrement=True)
    filename = Column(String, nullable=False, unique=True)  # Ensure filename is unique
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    path = Column(String, nullable=False, unique=True)  # Ensure path is unique

    # Define a relationship with the User table
    user = relationship("User", back_populates="files")

    # Define a UniqueConstraint to enforce uniqueness of filename and path
    __table_args__ = (
        UniqueConstraint('filename', 'path', name='unique_file'),
    )

# Create the tables in the database
Base.metadata.create_all(engine)
