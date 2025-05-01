An interactive quiz game where you ask the LLM to create quizzes on a specific topic or a realm of topics. Generates 4 different solutions and you get points by picking the right answer.
(later the idea is to turn this into a multiplayer game where the LLM generates questions about a specific user, that user selects the most correct answer out of the 4 options and the other players guess which answer that specific player chose)

# TO INSTALL REQUIRED PACKAGES

pip install -r requirements.txt

# DIRECTIONS (3 different terminals)

Terminal 1: Ollama Model
Command: ollama run llama3.2
Port: 11434

Terminal 2: Flask API
Command: python app.py
Port: 5000

Terminal 3: React App
Command: npm start
Port: 3000
