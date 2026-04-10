from typing import Optional
from datetime import datetime
from databases.db import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa
from sqlalchemy import String, Integer, DateTime, Boolean
from uuid import uuid4

class AdminItem(db.Model):
    __tablename__ = 'admin_account'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(30), nullable=False)
    fullname: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

class BloodDonorItem(db.Model):
    __tablename__ = 'blood_donor'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    userName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    fullName: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=True)
    phone: Mapped[str] = mapped_column(String(15), nullable=True)
    imageURL: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    bloodDonorType: Mapped[str] = mapped_column(String(20), nullable=True)
    lastDonation: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    additionalInfo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location_pincode: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)

class BloodRecieverItem(db.Model):
    __tablename__ = 'blood_receiver'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    userName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    firstName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    lastName: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    email: Mapped[Optional[str]] = mapped_column(String(100), unique=True, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(String(15), nullable=True)
    imageURL: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    bloodRecieverType: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    additionalInfo: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location_pincode: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)

class BloodRequestItem(db.Model):
    __tablename__ = "blood_request"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    fullName: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=False) # Switched unique to false to allow user to make multiple requests
    phonenumber: Mapped[str] = mapped_column(String(15), nullable=False)
    location: Mapped[str] = mapped_column(String(100), nullable=False)
    blood_type: Mapped[str] = mapped_column(String(5), nullable=False)
    units_needed: Mapped[int] = mapped_column(Integer, nullable=False)
    date_issued: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    urgency_level: Mapped[str] = mapped_column(String(20), nullable=False)  

class UserProfileItem(db.Model):
    __tablename__ = "userProfile"
    id: Mapped[str] = mapped_column(sa.String(32), primary_key=True, unique=True, default=lambda: uuid4().hex)
    username: Mapped[Optional[str]] = mapped_column(String(30), nullable=True, unique=True)
    fullName: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    google_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True, unique=True)
    
    # New Fields for Profile Completion
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    blood_type: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    profile_picture: Mapped[Optional[str]] = mapped_column(sa.Text, nullable=True) # URL or Base64
    joined_at: Mapped[datetime] = mapped_column(DateTime, default=sa.func.now())

    user = relationship("UserItem", back_populates="profile", uselist=False)

class UserItem(db.Model):
    __tablename__="user"
    id: Mapped[str] = mapped_column(sa.String(32), primary_key=True, unique=True, default=lambda: uuid4().hex)
    signupid: Mapped[str] = mapped_column(sa.String(32), sa.ForeignKey("userProfile.id"))
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    is_google_auth: Mapped[bool] = mapped_column(Boolean, default=False)
    
    profile = relationship("UserProfileItem", back_populates="user")

class MessageItem(db.Model):
    __tablename__ = 'messages'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    subject: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(sa.Text, nullable=False)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=sa.func.now())

class EventItem(db.Model):
    __tablename__ = 'events'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    date: Mapped[datetime] = mapped_column(sa.Date, nullable=False)
    time: Mapped[str] = mapped_column(String(20), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(sa.Text, nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default='upcoming')
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=sa.func.now())