import asyncio
from pyppeteer import launch
import re
import requests


async def scrape(links = (None, None, None)):
    browser = await launch(headless=True)  # change headless to True to run in headless mode
    page = await browser.newPage()
    # gfg = 'https://auth.geeksforgeeks.org/user/aniketmishra2709/'
    # cf = 'https://codeforces.com/profile/Benq/'
    # cc = 'https://www.codechef.com/users/aniket_1245'
    gfg, cf, cc = links
    print(gfg, cf, cc)
    lc = 'https://leetcode.com/aniketmishra2709/'
    codingData = []
    if lc:
        try:
            username = lc.split('/')[-2]

            url = "https://leetcode.com/graphql"

            # Create a GraphQL client
            query = f'''
            {{
              userContestRanking(username: "{username}") {{
                rating
                topPercentage
              }}
              matchedUser(username: "{username}") {{
                submitStats: submitStatsGlobal {{
                  acSubmissionNum {{
                    difficulty
                    count
                  }}
                }}
              }}
            }}
            '''

            headers = {
                "Content-Type": "application/json",
            }

            payload = {
               "query": query
            }
            response = requests.post(url, json=payload, headers=headers)
            data = response.json()

            print(data)
            # user_contest_ranking = data['data']['userContestRanking']
            # matched_user = data['data']['matchedUser']

        except Exception as e:
            print("Couldn't fetch data: ", e)

    if gfg:
        try:
            await page.goto(gfg, {'waitUntil': 'load'})
            # institute_rank = await page.evaluate('el => el.textContent.trim()', await page.querySelector('span.rankNum'))
            # lang_used = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div.basic_details div:last-child div.basic_details_data:last-child'))
            # overall_coding_score = await page.evaluate('el => el.innerText.trim()', await page.querySelector('div.score_cards_container div:first-child div.score_card span.score_card_value'))
            problems_solved = await page.evaluate('el => el.innerText.trim()', await page.querySelector('div.score_cards_container div:nth-child(2) div.score_card span.score_card_value'))
            # monthly_coding_score = await page.evaluate('el => el.innerText.trim()', await page.querySelector('div.score_cards_container div:last-child div.score_card:last-child span.score_card_value'))
            level_wise = await page.evaluate('''() => { const elements = Array.from(document.querySelectorAll('div.solved_problem_section ul.linksTypeProblem li'));return elements.map(el => el.textContent.trim());}''')

            gfg_data = {
                # 'institute_rank': institute_rank,
                # 'lang_used': lang_used,
                # 'overall_coding_score': overall_coding_score,
                # 'monthly_coding_score': monthly_coding_score,
                'platform': 'gfg',
                'problems_solved': problems_solved,
                'level_wise_problems': level_wise
            }
            codingData.append(gfg_data)
        except Exception as e:
            print("Couldn't fetch data: ", e)
    if cf:
        try:
            await page.goto(cf, {'waitUntil': 'load'})
            # profile = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div.main-info div.user-rank'))
            rating = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div.info ul li:first-child'))
            problems = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div._UserActivityFrame_footer div._UserActivityFrame_countersRow:first-child div._UserActivityFrame_counterValue'))
            cf_data = {
                'platform': 'cf',
                'rating': rating,
                'problems_solved': problems
            }
            codingData.append(cf_data)
        except Exception as e:
            print("Couldn't fetch data: ", e)
    if cc:
        try:
            await page.goto(cc, {'waitUntil': 'load'})
            max_rating = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div.rating-header small'))
            rating_cc = await page.evaluate('el => el.textContent.trim()', await page.querySelector('div.rating-number'))
            problems_cc = await page.evaluate('el => el.textContent.trim()', await page.querySelector('section.problems-solved div.content h5'))
            # stars = await page.evaluate('el => el.textContent.trim()', await page.querySelector('span.rating'))
            cc_data = {
                'platform': 'cc',
                'max_rating': max_rating,
                'rating': rating_cc,
                'problems_solved': problems_cc,
                # 'stars': stars,
            }
            codingData.append(cc_data)
        except Exception as e:
            print("Couldn't fetch data: ", e)
    await browser.close()
    return codingData
    
class data_cleaning:
    def __init__(self) -> None:
        pass
    def extract_values(self, string):
        regex = r"(\d+)"
        matches = re.findall(regex, string)
        if len(matches) >= 2:
            value1 = matches[0]
            value2 = matches[1]
            return (value1, value2)
        elif len(matches)==1:
            value1=matches[0]
            return value1
        return None
    def remove_special_symbols(self, string):
        regex = r"[^\w\s]"
        return re.sub(regex, '', string)
    def clean_data(self, codingData):
        codingData[1]['rating'], codingData[1]['max_rating'] = self.extract_values(codingData[1]['rating'])
        codingData[2]['max_rating'] = self.extract_values(codingData[2]['max_rating'])
        codingData[2]['problems_solved'] = self.extract_values(codingData[2]['problems_solved'])
        codingData[1]['problems_solved'] = self.extract_values(codingData[1]['problems_solved'])
        codingData[2]['stars'] = self.remove_special_symbols(codingData[2]['stars'])
        return codingData
    # def grade_coding_profiles(self, codingData):
    #     total_problems = 0
    #     for profiles in codingData:
    #         if profiles.platform == 'gfg':

    #         total_problems += profiles.problems_solved


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    codingData = loop.run_until_complete(scrape())
    loop.close()
    print(codingData)
    if len(codingData)>0:
        cleaned_data = data_cleaning().clean_data(codingData)
        print(cleaned_data)
    