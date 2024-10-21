from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class PerfumeBase(BaseModel):
    name: str
    price: float
    brand: str
    distributor: str
    ml: int
    stock: int

class PerfumeCreate(PerfumeBase):
    pass

class Perfume(PerfumeBase):
    id: int

    class Config:
        orm_mode = True


class DistribuidorBase(BaseModel):
    name: str
    phone: int
    email: str
    address: str

class DistribuidorCreate(DistribuidorBase):
    pass

class Distribuidor(DistribuidorBase):
    id: int

    class Config:
        orm_mode = True

class VentaBase(BaseModel):
    date: date
    client_name: str
    client_contact: int
    perfume_names: str
    discount: float
    total: int

class VentaCreate(VentaBase):
    pass

class Venta(VentaBase):
    id: int

    class Config:
        orm_mode = True
