from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import requests

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "llama3.2"
    
@app.route("/generate_quiz", methods=["POST"])
def generate_quiz():
    data = request.json
    topic = data.get("topic", "general knowledge")
    num_questions = data.get("numQuestions", 10)

    prompt = f"""You are an AI quiz generator.

    Create {num_questions} multiple-choice questions about **{topic}**.

    Each question must follow this strict format:
    Question: <question text>
    Correct: <correct answer>
    Wrong: <wrong answer 1>, <wrong answer 2>, <wrong answer 3>

    Rules:
    - NEVER ask the same fact more than once.
    - DO NOT include explanations.
    - DO NOT number the questions.
    - DO NOT include anything other than what is asked.
    - Each 'Wrong' line must contain exactly 3 comma-separated options.
    - Each question must be separated by TWO newline characters.
    """


    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()
    
    content = response.json()['message']['content']

    print("\n--- RAW LLM OUTPUT ---\n")
    print(content)
    print("\n----------------------\n")
    
    # Split by double newlines into each question block
    blocks = content.strip().split('\n\n')

    questions = []
    for block in blocks:
        lines = [line.strip() for line in block.strip().split('\n') if line.strip()]

        question_text = None
        correct_answer = None
        wrong_answers = []

        for line in lines:
            if line.startswith("Question:"):
                question_text = line.replace("Questions:", "").strip()
            elif line.startswith("Correct:"):
                correct_answer = line.replace("Correct:", "").strip()
            elif line.startswith("Wrong:"):
                wrong_answers = [w.strip() for w in line.replace("Wrong:", "").split(',')]

        if question_text and correct_answer and len(wrong_answers) == 3:
            all_answers = wrong_answers + [correct_answer]
            random.shuffle(all_answers)
            questions.append({
                "question": question_text, 
                "correct": correct_answer, 
                "options": all_answers
            })

    return jsonify({"questions": questions})

if __name__ == "__main__":
    app.run(debug=True)

