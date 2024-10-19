from pydantic import BaseModel

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