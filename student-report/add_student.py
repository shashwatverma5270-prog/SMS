import requests

# Spring Boot Student API
url = "http://localhost:8081/students"

student = {
    "rollNo": "SDMS004",
    "fullName": "Shash Verma",
    "fatherName": "Test Father",
    "motherName": "Test Mother",
    "course": "B.Tech",
    "department": "Computer Science",
    "dateOfBirth": "2005-10-10",
    "gender": "Male",
    "phone": "9876543212",
    "email": "aman@example.com",
    "address": "Ayodhya, Uttar Pradesh"
}

try:
    response = requests.post(
        url,
        json=student,
        headers={
            "Content-Type": "application/json"
        }
    )

    print("Status Code:", response.status_code)

    response.raise_for_status()

    print("Student added successfully!")

    print("Response:")

    print(response.json())

except requests.exceptions.ConnectionError:
    print("ERROR: Cannot connect to Spring Boot.")
    print("Make sure Spring Boot is running on port 8081.")

except requests.exceptions.RequestException as error:
    print("ERROR:", error)

except ValueError:
    print("Server returned an invalid response.")