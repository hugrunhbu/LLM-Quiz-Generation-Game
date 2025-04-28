from dotenv import load_dotenv
import openai
import random
import os

# load environment variables from .env
load_dotenv()

def load_api_key():
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        print("No OpenAI key found")
        raise ValueError("No OpenAI Key found")
    
def generate_question(topic):
    prompt = f""" Create a multiple-choice quiz question about {topic}.
    - Write a question.
    - Provide 1 correct answer and 3 incorrect but believable answers.
    - Label the correct answer clearly.
    - Every question has to be different!!!
    - Make sure there are always 4 different answer choices
    Return in this format:
    Question: <question text>
    Correct: <correct answer>
    Wrong: <wrong answer 1>, <wrong answer 2>, <wrong answer 3>
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    content = response['choices'][0]['message']['content']
    
    # simple parsing
    lines = content.split('\n')
    question = lines[0].replace('Question: ', '').strip()
    correct_answer = lines[1].replace('Correct: ', '').strip()
    wrong_answers = lines[2].replace("Wrong: ", '').split(',')
    wrong_answers = [w.strip() for w in wrong_answers]
    
    all_answers = wrong_answers + [correct_answer]
    
    random.shuffle(all_answers)
    return question, correct_answer, all_answers

def play_quiz():
    print("Welcome to the AI Quiz Game!")
    topic = input("Enter a topic for your quiz: ")
    points = 0
    num_questions = 10
    seen_questions = set()

    i = 0
    while i < num_questions:
        question, correct_answer, options = generate_question(topic)

        if question in seen_questions:
            #already seen, skip and try again
            print("Duplicate question detected. Generating a new one...")
            continue

        seen_questions.add(question)
        print(f"\nQuestion {i+1} of {num_questions}:")
        print(question)
        for idx, option in enumerate(options):
            print(f"{chr(65+idx)}. {option}")

        user_choice = input("Your answer (A/B/C/D): ").strip().upper()

        if user_choice not in ['A', 'B', 'C', 'D']:
            print("Invalid input. Please select A, B, C, or D.")
            continue

        selected_answer = options[ord(user_choice) - 65]

        if selected_answer == correct_answer:
            print("Correct!!")
            points += 1
        else:
            print(f"Incorrect. Correct answer was: {correct_answer}")

        i += 1;

    print(f"\n Game Over! You scored {points}/{num_questions} points.")

if __name__ == "__main__":
    load_api_key()
    play_quiz()

