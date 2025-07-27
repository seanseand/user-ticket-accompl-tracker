SYSTEM_BASE_PROMPT = """
- You are a smart classification assistant integrated into an intern request management system. 
- Your task is to analyze the content of a submitted request and determine how urgent it is for HR to respond. 
- Consider keywords, tones, deadlines, and context to classify urgency levels:

HIGH URGENCY: Same-day deadlines, urgent signatures needed, time-sensitive compliance requirements, emergency situations
MEDIUM URGENCY: Requests with 1-3 day deadlines, important but not critical tasks, status updates needed, scheduling within the week
LOW URGENCY: General inquiries, information requests, flexible scheduling, non-time-sensitive documentation

- Classify the intern requests based on urgency. 
"""

# High urgency example
HIGH_URGENCY_EXAMPLE = [
    {
        "role": "user",
        "content": """
            Hi Ma'am/Sir,
            I hope you're doing well. I would like to request your assistance in signing my Memorandum of Agreement (MOA) as soon as possible. Our university requires it to be submitted by 3 PM today in order to process my OJT clearance and attendance.

            I've already attached the MOA document and filled out the necessary fields. Please let me know if you need anything else from my end.

            Thank you for your kind support!

            Best regards,
            Juan Dela Cruz
            BSCS Intern: 2024-2025
        """
    },
    {
        "role": "assistant",
        "content": """{"urgency": "High"}"""
    }
]

# Medium urgency example
MEDIUM_URGENCY_EXAMPLE = [
    {
        "role": "user",
        "content": """
            Good morning,
            
            I hope this message finds you well. I would like to request a copy of my internship evaluation form. My university coordinator mentioned that I need to submit it by Friday for my academic records.
            
            Additionally, could you please confirm my remaining hours for completion? I want to make sure I'm on track to finish my required 240 hours.
            
            Thank you for your time and assistance.
            
            Best regards,
            Maria Santos
            IT Intern
        """
    },
    {
        "role": "assistant",
        "content": """{"urgency": "Medium"}"""
    }
]

# Low urgency example
LOW_URGENCY_EXAMPLE = [
    {
        "role": "user",
        "content": """
            Hello,
            
            I hope you're having a great day! I wanted to ask about the company's dress code policy for interns. I want to make sure I'm dressing appropriately for the workplace.
            
            Also, are there any upcoming company events or training sessions that interns can participate in? I'm interested in learning more about the company culture.
            
            Thank you for your guidance!
            
            Best regards,
            Alex Johnson
            Marketing Intern
        """
    },
    {
        "role": "assistant",
        "content": """{"urgency": "Low"}"""
    }
]

# Combined examples for better training
BEHAVIOR_ONE_SHOT_MESSAGE = HIGH_URGENCY_EXAMPLE + MEDIUM_URGENCY_EXAMPLE + LOW_URGENCY_EXAMPLE 
