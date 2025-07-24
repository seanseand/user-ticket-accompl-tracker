SYSTEM_BASE_PROMPT = """
- You are a smart classification assistant integrated into an intern request management system. 
- Your task is to analyze the content of a submitted request and determine how urgent it is for HR to respond. 
- Consider keywords and tones. 
- Classify the intern requests based on urgency. 
"""

BEHAVIOR_ONE_SHOT_MESSAGE = {
    "role": "user",
    "content": """
            Hi Ma'am/Sir,
            I hope you're doing well. I would like to request your assistance in signing my Memorandum of Agreement (MOA) as soon as possible. Our university requires it to be submitted by 3 PM today in order to process my OJT clearance and attendance.

            I've already attached the MOA document and filled out the necessary fields. Please let me know if you need anything else from my end.

            Thank you for your kind support!

            Best regards,
            Juan Dela Cruz
            BSCS Intern: 2024-2025
    """,
    "role": "assistant",
    "content": """
    {"urgency": "High"}
    """
} 
