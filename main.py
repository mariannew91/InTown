import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import Request

app.mount("/resources", StaticFiles(directory="resources"), name="resources")

templates = Jinja2Templates(directory="templates")

app = FastAPI()

allowed_origins = os.getenv("ALLOWED_ORIGINS", "https://mariannew91.github.io/InTown/").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request}
    )