def user_insert_serializer(user: str, employer: str, email: str, hashed_password: str) -> dict:
    return {
        'name': user, 'employer': employer, 'email': email, 'password': hashed_password
        }
def job_details_schema(r_id=0, jd=1, weights=1, job_title=1, status=1) -> dict: 
    return {
        "r_id": r_id,
        "jd": jd,
        "weights": weights,
        "job_title": job_title,
        "status": status 
    }