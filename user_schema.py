def user_insert_serializer(user: str, employer: str, email: str, hashed_password: str) -> dict:
    return {
        'name': user, 'employer': employer, 'email': email, 'password': hashed_password
        }
def job_details_schema(jd=1, weights=1, job_title=1, status=1) -> dict: 
    return {
        "jd": jd,
        "weights": weights,
        "job_title": job_title,
        "status": status 
    }