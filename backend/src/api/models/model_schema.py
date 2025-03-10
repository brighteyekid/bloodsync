from typing import Optional
from datetime import datetime
from databases.db import db
from sqlalchemy.orm import Mapped, DeclarativeBase, mapped_column
from sqlalchemy import String, Integer , DateTime

class AdminItem(db.Model):
    __tablename__ = 'admin_account'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(30), nullable=False)
    fullname: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    def __repr__(self) -> str:
        return f"AdminItem(id={self.id!r}, username={self.username!r}, fullname={self.fullname!r})"

class BloodDonorItem(db.Model):
    "Blood Donor Table"
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
    
    def __repr__(self) -> str:
        return f"BloodDo    orItem(id={self.id!r}, userName={self.userName!r}, email={self.email!r})"

class BloodRecieverItem(db.Model):
    "Blood Receiver Table"
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

    def __repr__(self) -> str:
        return f"BloodRecieverItem(id={self.id!r}, userName={self.userName!r}, email={self.email!r})"

class BloodRequestItem(db.Model):
    __tablename__ = "blood_request"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    fullName: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(35), unique=True, nullable=False)
    phonenumber: Mapped[str] = mapped_column(String(15), unique=True, nullable=False)  # ✅ Fixed type
    location: Mapped[str] = mapped_column(String(100), nullable=False)  # ✅ Fixed type
    blood_type: Mapped[str] = mapped_column(String(5), nullable=False)
    units_needed: Mapped[int] = mapped_column(Integer, nullable=False)
    date_issued: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    urgency_level: Mapped[str] = mapped_column(String(20), nullable=False)  # ✅ Added length

    def __repr__(self):
        return f"Name: {self.fullName} Email: {self.email} Phone Number: {self.phonenumber}  Blood Type: {self.blood_type}"