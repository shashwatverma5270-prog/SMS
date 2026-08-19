const API_URL = "http://localhost:8081/students";


document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentForm");

    if (!form) {
        return;
    }


    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        const student = {

            rollNo:
                document.getElementById("rollNo")?.value.trim() || "",

            fullName:
                document.getElementById("fullName")?.value.trim() || "",

            fatherName:
                document.getElementById("fatherName")?.value.trim() || "",

            motherName:
                document.getElementById("motherName")?.value.trim() || "",

            course:
                document.getElementById("course")?.value || "",

            department:
                document.getElementById("department")?.value || "",

            dateOfBirth:
                document.getElementById("dob")?.value || "",

            gender:
                document.getElementById("gender")?.value || "",

            phone:
                document.getElementById("phone")?.value.trim() || "",

            email:
                document.getElementById("email")?.value.trim() || "",

            address:
                document.getElementById("address")?.value.trim() || ""
        };


        // Required fields
        if (!student.rollNo || !student.fullName) {

            alert(
                "Please fill Roll Number and Full Name."
            );

            return;
        }


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );


            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Backend error:",
                    errorText
                );

                throw new Error(
                    "Failed to add student"
                );
            }


            const data =
                await response.json();


            console.log(
                "Student added:",
                data
            );


            alert(
                "Student added successfully!"
            );


            form.reset();


        } catch (error) {

            console.error(
                "Add student error:",
                error
            );


            alert(
                "Unable to add student. Please make sure Spring Boot is running on port 8081."
            );
        }

    });

});