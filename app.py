from flask import Flask, render_template, request, session, redirect, url_for, redirect
from pymongo import MongoClient
import io
class app:
    def __init__(self) -> None:
        self.resume = None

    def run_flask_app(self):
        app = Flask(__name__)
        app.secret_key = 'your_secret_key'

        mongodb_url = 'mongodb+srv://admin:1234@cluster0.o0dcqvb.mongodb.net/?retryWrites=true&w=majority'
        client = MongoClient(mongodb_url)
        db = client['test']

        domain_options = [
            'Machine Learning',
            'Data Science',
            'Backend',
            'Frontend',
            # Add more domain options as needed
        ]

        @app.route('/', methods=['GET', 'POST'])
        def upload():
            if request.method == 'POST':
                self.resume = request.files['resume']
                self.resume.save(self.resume.filename)
                return redirect('/quiz')
            if request.method == 'GET':
                return render_template('upload.html')

        def get_questions_from_collection(collection_name, limit):
            collection = db[collection_name]
            total_questions = collection.count_documents({})
            if total_questions <= limit:
                questions = list(collection.find())
            else:
                questions = list(collection.aggregate([{'$sample': {'size': limit}}]))
            return questions[:limit]

        frontend_questions = get_questions_from_collection('frontend', 5)
        backend_questions = get_questions_from_collection('backend', 5)

        questions = frontend_questions[:5] + backend_questions[:5]  # Retrieve 5 questions from each collection

        @app.route('/quiz', methods=['GET', 'POST'])
        def quiz():
            if 'score' not in session:
                session['score'] = 0
                session['current_question'] = 0

            if request.method == 'POST':
                submitted_answer = request.form.get('answer')
                current_question = questions[session['current_question']]
                if submitted_answer == current_question['answer']:
                    session['score'] += 1
                session['current_question'] += 1

            if 'start' in request.form:
                session.clear()
                return redirect(url_for('quiz'))

            if session['current_question'] >= len(questions):
                score = session['score']
                session.clear()
                return render_template('score.html', score=score, question_length=len(questions))

            current_question = questions[session['current_question']]
            return render_template('quiz.html', question=current_question['question'], choices=current_question['choices'],
                                current_question=session['current_question'])

        app.run(debug=True)
        return session['score']



if __name__ == '__main__':
    ap = app()
    ap.run_flask_app()

