from sqlalchemy import Column, Integer, String, Float
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
    phone = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True)
    address = Column(String(255))
    
