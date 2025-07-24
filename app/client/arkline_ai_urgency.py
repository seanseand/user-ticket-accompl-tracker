from groq import Groq
from dotenv import load_dotenv
from app.utils.util import extract_clean_json
from app.client.prompts.arkline_urgency_prompts import SYSTEM_BASE_PROMPT, BEHAVIOR_ONE_SHOT_MESSAGE
import os

load_dotenv()

class ArklineAI:

    CATEGORY_FUNCTION_DEFINITION = {
        "type": "function",
        "function": {
            "name": "classify_urgency",
            "description": "Classify urgency of intern request",
            "parameters": {
                "type": "object",
                "properties": {
                    "urgency": {
                        "type": "string",
                        "enum": ["High", "Medium", "Low"]
                    }
                },
                "required": ["urgency"]
            }
        }
    }

    def __init__(self) -> None:
        self.client = Groq(
            api_key=os.environ.get("GROQ_API_KEY")
        )

    def get_response(self, prompt: str):
        response = self.client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": SYSTEM_BASE_PROMPT},
                BEHAVIOR_ONE_SHOT_MESSAGE, # type: ignore
                {"role": "user", "content": prompt}
            ],
            tools=[ArklineAI.CATEGORY_FUNCTION_DEFINITION], # type: ignore
            tool_choice="auto"
        )
        if not response.choices:
            return None
        
        return extract_clean_json(response.choices[0].message.tool_calls[0].function.arguments) if response.choices[0].message.tool_calls else None
