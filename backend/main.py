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

