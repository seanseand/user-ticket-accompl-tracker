from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from starlette import status
import sys
import os

from app.client.arkline_ai_chat import answer_question

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str

@router.post("/response", response_model=ChatResponse)
async def rtr_chat(request: ChatRequest):
    try:
        answer = answer_question(request.question)  
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))   