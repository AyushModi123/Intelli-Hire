from flask import Flask, render_template, request, session, redirect, url_for, redirect
from pymongo import MongoClient
import asyncio
from scraper_cp import scrape, data_cleaning
from gen_grade import data_extraction
import threading
import multiprocessing
def scraping(links):
    print('scraping')
    while links['links'] == (None, None, None):
        pass
    print(links['links'])
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    codingData = loop.run_until_complete(scrape(links['links']))
    loop.close()
    print(codingData)
    if len(codingData)>0:
        cleaned_data = data_cleaning().clean_data(codingData)
        print(cleaned_data)
class app:
    def __init__(self) -> None:
        self.resume = None
        self.result = {}
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
        manager = multiprocessing.Manager()
        links = manager.dict()
        links['links'] = (None, None, None)
        

        def resume_print():
            print('resume_print')
            # print(self.resume.filename)
            de = data_extraction(self.resume.filename)
            print(de.context)
            # links['links'] = de.links
            links['links'] = ('https://auth.geeksforgeeks.org/user/aniketmishra2709/', 'https://codeforces.com/profile/Benq/', 'https://www.codechef.com/users/aniket_1245')
            # print(links['links'])
            # jd = '''Selected intern's day-to-day responsibilities include:

            # 1. Writing algorithms in Python (at an advanced level) for predictive healthcare
            # 2. Working on pre-processing data
            # 3. Testing various hypotheses using statistical measures
            # 4. Conducting scientific research
            # 5. Developing mathematical algorithms

            # Additional Information:

            # We are looking for exceptional interns with advanced programming skills and a good understanding of data science. In addition to the minimum assured stipend, the interns may also receive additional incentives of up to Rs. 2000 on the basis of their performance.'''
            # de.jd_comparator(jd)
            # self.result = de.output_grade()
            # print(self.result)

        thread1 = threading.Thread(target=resume_print)
        p = multiprocessing.Process(target=scraping, args=(links,))
        
        @app.route('/', methods=['GET', 'POST'])
        def upload():
            if request.method == 'POST':
                self.resume = request.files['resume']
                self.resume.save(self.resume.filename)
                thread1.start()
                p.start()
                
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
                return redirect('/result')

            current_question = questions[session['current_question']]
            return render_template('quiz.html', question=current_question['question'], choices=current_question['choices'],
                                current_question=session['current_question'])
        @app.route('/result', methods=['GET'])
        def result():
            thread1.join()
            p.join()    
            score = session['score']
            self.result['Test Score'] = score
            session.clear()
            if request.method == 'GET':
                return render_template('score.html', score=score, question_length=len(questions))

            
        app.run(debug=False)



if __name__ == '__main__':
    ap = app()
    ap.run_flask_app()