from sqlalchemy import Column, Integer, String, Float, Date
from database import Base

class Perfume(Base):
    __tablename__ = "perfumes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    brand = Column(String(255))
    price = Column(Float)
    distributor = Column(String(255))
    ml = Column(Integer)
    stock = Column(Integer)


class Distribuidor(Base):
    __tablename__ = "distribuidores"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True)
    phone = Column(String(50))
    email = Column(String(255))
    address = Column(String(255))
    

class Venta(Base):
    __tablename__ = "ventas"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    client_name = Column(String(255))
    client_contact = Column(String(50))
    perfume_names = Column(String(255))
    discount = Column(Float)
    total = Column(Float) 
