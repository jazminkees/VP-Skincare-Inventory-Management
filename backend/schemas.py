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

