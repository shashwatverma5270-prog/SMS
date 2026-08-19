import requests

# Spring Boot Student API
url = "http://localhost:8081/students"

try:
    response = requests.get(url)

    print("Status Code:", response.status_code)

    response.raise_for_status()

    data = response.json()

    print("\nStudents:")

    for student in data:
        print(student)

except requests.exceptions.ConnectionError:
    print("ERROR: Cannot connect to Spring Boot.")
    print("Make sure Spring Boot is running on port 8081.")

except requests.exceptions.RequestException as error:
    print("ERROR:", error)