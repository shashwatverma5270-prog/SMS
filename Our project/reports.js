async function loadReports() {

    try {

        const response =
            await fetch(
                "http://localhost:8081/students"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to get student data"
            );
        }


        const students =
            await response.json();


        const total =
            students.length;


        const male =
            students.filter(function(student) {

                return (
                    student.gender &&
                    student.gender
                        .toLowerCase()
                        .trim() === "male"
                );

            }).length;


        const female =
            students.filter(function(student) {

                return (
                    student.gender &&
                    student.gender
                        .toLowerCase()
                        .trim() === "female"
                );

            }).length;


        document.getElementById(
            "totalStudents"
        ).textContent = total;


        document.getElementById(
            "maleStudents"
        ).textContent = male;


        document.getElementById(
            "femaleStudents"
        ).textContent = female;


        // New admissions is not currently stored
        // separately in the backend.
        document.getElementById(
            "newAdmissions"
        ).textContent = 0;


    } catch (error) {

        console.error(
            "Error:",
            error
        );


        document.getElementById(
            "totalStudents"
        ).textContent = 0;


        document.getElementById(
            "maleStudents"
        ).textContent = 0;


        document.getElementById(
            "femaleStudents"
        ).textContent = 0;


        document.getElementById(
            "newAdmissions"
        ).textContent = 0;
    }
}


// ============================================================
// OPEN COMPLETE PYTHON ANALYTICS DASHBOARD
// ============================================================

function openPythonReport() {

    window.open(
        "http://localhost:5000/dashboard",
        "_blank"
    );
}


// ============================================================
// LOAD REPORTS
// ============================================================

loadReports();