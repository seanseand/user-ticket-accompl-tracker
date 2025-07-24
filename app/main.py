from fastapi import FastAPI
from app.routers import rtr_urgency, rtr_chat

app = FastAPI()

app.include_router(rtr_urgency.router)
app.include_router(rtr_chat.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Arkline AI API!"}










