from fastapi import APIRouter, HTTPException
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from pydantic import BaseModel
from app.client.arkline_ai_urgency import ArklineAI

client = ArklineAI()
router = APIRouter(
    prefix="/urgency",
   tags=["Urgency"]
)

class UrgencyRequest(BaseModel):
    message: str

class UrgencyResponse(BaseModel):
    urgency: str

@router.post("/get", tags=["Urgency"])
def get_urgency(request: UrgencyRequest) -> UrgencyResponse:
    try:
        response = client.get_response(request.message)
        if not response or 'urgency' not in response:
            raise HTTPException(
                status_code=HTTP_400_BAD_REQUEST,
                detail="Invalid response from urgency service."
            )
        return UrgencyResponse(urgency=response['urgency'])
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )