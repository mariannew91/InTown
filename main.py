from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mariannew91.github.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from the InTown backend!"}

@app.get("/listings")
async def get_listings():
    return [
        {
            "id": 1,
            "title": "Running Club",
            "type": "Group",
            "day": "Tuesday"
        },
        {
            "id": 2,
            "title": "Choir",
            "type": "Group",
            "day": "Thursday"
        }
    ]