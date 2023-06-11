from flask import Flask, render_template, request, session, redirect, url_for, redirect, jsonify
from bson import ObjectId
from flask_cors import CORS
import json
from pymongo import MongoClient
import asyncio
from scraper_cp import scrape, data_cleaning
from gen_grade import data_extraction
import threading
import multiprocessing
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv('MONGODB_URL')
APP_SECRET_KEY = os.getenv('APP_SECRET_KEY')

def scraping(links):
    print('scraping')
    while links['fetched'] == False:
        pass
    print(links['links'])
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    codingData = loop.run_until_complete(scrape(links['links']))
    loop.close()
    print(codingData)
    if len(codingData) > 0:
        cleaned_data = data_cleaning().clean_data(codingData)
        print(cleaned_data)
        grade = data_cleaning().grade_coding_profiles(codingData)
        print(grade)



class app:
    def __init__(self) -> None:
        self.resume = None
        self.correct_answer = 0
        self.result = {}

    def run_flask_app(self):
        app = Flask(__name__)
        cors = CORS(app, origins='http://localhost:3000', supports_credentials=True, expose_headers=['Content-Type'])
        app.secret_key = APP_SECRET_KEY

        mongodb_url = MONGODB_URL
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
        links['links'] = (None, None, None, None)
        links['fetched'] = False

        def resume_print():
            print('resume_print')
            # print(self.resume.filename)
            de = data_extraction(self.resume.filename)
            print(de.context)
            links['links'] = de.links
            links['fetched'] = True
            # links['links'] = ('https://auth.geeksforgeeks.org/user/aniketmishra2709/', 'https://codeforces.com/profile/Benq/', 'https://www.codechef.com/users/aniket_1245', None)
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

        @app.route('/upload', methods=['GET', 'POST'])
        def upload():
            if request.method == 'POST':
                self.resume = request.files['resume']
                self.resume.save(self.resume.filename)
                thread1.start()
                p.start()
                return {'message': 'Resume uploaded successfully and scraping started.'}

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
            if request.method == 'POST':
                score = request.get_json()['score']
                self.correct_answer = int(score)
                return jsonify({'score': score})

            if request.method == 'GET':
                serialized_questions = [json.loads(json.dumps(q, default=str)) for q in questions]
                return jsonify(serialized_questions)

        @app.route('/result', methods=['GET'])
        def result():
            thread1.join()
            p.join()
            self.result['Test Score'] = self.correct_answer
            result_data = {'score': self.correct_answer}
            return jsonify(result_data)

        app.run(debug=False)


if __name__ == '__main__':
    ap = app()
    ap.run_flask_app()
