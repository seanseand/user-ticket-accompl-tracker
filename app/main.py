from fastapi import FastAPI
from app.routers import rtr_urgency, rtr_chat
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.include_router(rtr_urgency.router)
app.include_router(rtr_chat.router)

origins = [
    "http://localhost:5173",
    "https://fruit-pieces-affiliate-louise.trycloudflare.com",  # optional, but safe to include
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Arkline AI API!"}










