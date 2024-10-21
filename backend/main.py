from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, database
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

models.Base.metadata.create_all(bind=database.engine)

@app.post("/perfumes/", response_model=schemas.Perfume)
def create_perfume(perfume: schemas.PerfumeCreate, db: Session = Depends(database.get_db)):
    db_perfume = models.Perfume(**perfume.dict())
    db.add(db_perfume)
    db.commit()
    db.refresh(db_perfume)
    return db_perfume

@app.get("/perfumes/", response_model=list[schemas.Perfume])
def read_perfumes(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    perfumes = db.query(models.Perfume).offset(skip).limit(limit).all()
    return perfumes

@app.put("/perfumes/{perfume_id}", response_model=schemas.Perfume)
def update_perfume(perfume_id: int, perfume: schemas.PerfumeCreate, db: Session = Depends(database.get_db)):
    db_perfume = db.query(models.Perfume).filter(models.Perfume.id == perfume_id).first()
    if db_perfume is None:
        raise HTTPException(status_code=404, detail="Perfume not found")
    for key, value in perfume.dict().items():
        setattr(db_perfume, key, value)
    db.commit()
    db.refresh(db_perfume)
    return db_perfume

@app.delete("/perfumes/{perfume_id}")
def delete_perfume(perfume_id: int, db: Session = Depends(database.get_db)):
    db_perfume = db.query(models.Perfume).filter(models.Perfume.id == perfume_id).first()
    if db_perfume is None:
        raise HTTPException(status_code=404, detail="Perfume not found")
    db.delete(db_perfume)
    db.commit()
    return {"message": "Perfume deleted"}

@app.post("/distribuidores/", response_model=schemas.Distribuidor)
def create_distribuidor(distribuidor: schemas.DistribuidorCreate, db: Session = Depends(database.get_db)):
    db_distribuidor = models.Distribuidor(**distribuidor.dict())
    db.add(db_distribuidor)
    db.commit()
    db.refresh(db_distribuidor)
    return db_distribuidor

@app.get("/distribuidores/", response_model=list[schemas.Distribuidor])
def read_distribuidores(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    distribuidores = db.query(models.Distribuidor).offset(skip).limit(limit).all()
    return distribuidores

@app.put("/distribuidores/{distribuidor_id}", response_model=schemas.Distribuidor)
def update_distribuidor(distribuidor_id: int, distribuidor: schemas.DistribuidorCreate, db: Session = Depends(database.get_db)):
    db_distribuidor = db.query(models.Distribuidor).filter(models.Distribuidor.id == distribuidor_id).first()
    if db_distribuidor is None:
        raise HTTPException(status_code=404, detail="Distribuidor not found")
    for key, value in distribuidor.dict().items():
        setattr(db_distribuidor, key, value)
    db.commit()
    db.refresh(db_distribuidor)
    return db_distribuidor

@app.delete("/distribuidores/{distribuidor_id}")
def delete_distribuidor(distribuidor_id: int, db: Session = Depends(database.get_db)):
    db_distribuidor = db.query(models.Distribuidor).filter(models.Distribuidor.id == distribuidor_id).first()
    if db_distribuidor is None:
        raise HTTPException(status_code=404, detail="Distribuidor not found")
    db.delete(db_distribuidor)
    db.commit()
    return {"message": "Distribuidor deleted"}

@app.post("/ventas/", response_model=schemas.Venta)
def create_sale(venta: schemas.VentaCreate, db: Session = Depends(database.get_db)):
    db_sale = models.Venta(**venta.dict())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@app.get("/ventas/", response_model=list[schemas.Venta])
def read_sales(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    sales = db.query(models.Venta).offset(skip).limit(limit).all()
    return sales

@app.put("/ventas/{venta_id}", response_model=schemas.Venta)
def update_sale(venta_id: int, sale: schemas.VentaCreate, db: Session = Depends(database.get_db)):
    db_sale = db.query(models.Venta).filter(models.Venta.id == venta_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Venta not found")
    for key, value in sale.dict().items():
        setattr(db_sale, key, value)
    db.commit()
    db.refresh(db_sale)
    return db_sale

@app.delete("/ventas/{venta_id}")
def delete_sale(venta_id: int, db: Session = Depends(database.get_db)):
    db_sale = db.query(models.Venta).filter(models.Venta.id == venta_id).first()
    if db_sale is None:
        raise HTTPException(status_code=404, detail="Sale not found")
    db.delete(db_sale)
    db.commit()
    return {"message": "Sale deleted"}