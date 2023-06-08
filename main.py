from app import app
import threading
import multiprocessing
from scraper_cp import scrapeandcleanData
from gen_grade import data_extraction
import asyncio
result = None
def resume_print(ap):
    print('2222222')
    while ap.resume == None:
        pass
    print(ap.resume.filename)
    de = data_extraction(ap.resume.filename)
    jd = '''Selected intern's day-to-day responsibilities include:

    1. Writing algorithms in Python (at an advanced level) for predictive healthcare
    2. Working on pre-processing data
    3. Testing various hypotheses using statistical measures
    4. Conducting scientific research
    5. Developing mathematical algorithms

    Additional Information:

    We are looking for exceptional interns with advanced programming skills and a good understanding of data science. In addition to the minimum assured stipend, the interns may also receive additional incentives of up to Rs. 2000 on the basis of their performance.'''
    de.jd_comparator(jd)
    global result
    result = de.output_grade()
    print(result)

def flask_app(ap):
    return ap.run_flask_app()

if __name__ == '__main__':
    ap = app()
    # score = ap.run_flask_app()
    thread1 = threading.Thread(target=resume_print, args=(ap,))
    loop = asyncio.get_event_loop()
    loop.run_until_complete(scrapeandcleanData())
    loop.close()
    # print(scrapeandcleanData())
    thread1.start()
    test_score = flask_app(ap)
    thread1.join()
    # result['Test Score'] = test_score
    # print(result)
    # print(scrapeandcleanData())
    #
    #First, upload resume then we scrape in background while user is giving test and finally present all grades to user and give tips on improving grades.