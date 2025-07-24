import json, re

def extract_clean_json(response_text: str) -> dict | None:
        if not response_text:
            return None
        response_text = response_text.strip()
        # If the response looks like a Python dict, convert single quotes to double quotes
        if response_text.startswith("{'urgency'"):
            response_text = response_text.replace("'", '"')
        # If wrapped in single or double quotes, strip them
        if (response_text.startswith("'") and response_text.endswith("'")) or (response_text.startswith('"') and response_text.endswith('"')):
            response_text = response_text[1:-1]
        try:
            return json.loads(response_text)
        except json.JSONDecodeError:
            # Try to extract JSON object from noisy output
            json_match = re.search(r"\{.*?\}", response_text, re.DOTALL)
            if json_match:
                try:
                    return json.loads(json_match.group(0))
                except Exception:
                    pass
            return None


def remove_think_blocks(text: str) -> str:
        # Remove <think>...</think> and everything inside
    cleaned = re.sub(r'<think>.*?</think>', '', text, flags=re.DOTALL)

    # Replace multiple spaces with one
    cleaned = re.sub(r'\s{2,}', ' ', cleaned)

    # Remove leading/trailing spaces
    return cleaned.strip()
