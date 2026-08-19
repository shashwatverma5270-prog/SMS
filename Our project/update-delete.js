const API_URL = "http://localhost:8081/students";


// --------------------------------------------------
// SHOW MESSAGE
// --------------------------------------------------

function showMessage(message, isError = false) {

    const messageBox = document.getElementById("formMessage");

    if (messageBox) {

        messageBox.textContent = message;

        messageBox.style.color =
            isError ? "#dc3545" : "#0d6efd";
    }
}


// --------------------------------------------------
// GET FIELD VALUE
// --------------------------------------------------

function getFieldValue(id) {

    const element = document.getElementById(id);

    return element
        ? element.value.trim()
        : "";
}


// --------------------------------------------------
// CLEAR STUDENT FIELDS
// --------------------------------------------------

function clearStudentFields() {

    const fields = [
        "name",
        "fatherName",
        "motherName",
        "course",
        "department",
        "gender",
        "dob",
        "phone",
        "email",
        "address"
    ];

    fields.forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });


    const detailFields =
        document.getElementById("detailFields");

    if (detailFields) {
        detailFields.style.display = "none";
    }
}


// --------------------------------------------------
// PUT STUDENT DATA INTO FORM
// --------------------------------------------------

function populateStudent(student) {

    const fields = {

        roll: student.rollNo || "",

        name: student.fullName || "",

        fatherName: student.fatherName || "",

        motherName: student.motherName || "",

        course: student.course || "",

        department: student.department || "",

        gender: student.gender || "",

        dob: student.dateOfBirth || "",

        phone: student.phone || "",

        email: student.email || "",

        address: student.address || "",

        originalRoll: student.rollNo || ""
    };


    Object.keys(fields).forEach(function (id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = fields[id];
        }

    });
}


// --------------------------------------------------
// FIND STUDENT BY ROLL NUMBER
// --------------------------------------------------

async function findStudent() {

    const roll =
        getFieldValue("roll");


    if (!roll) {

        clearStudentFields();

        showMessage(
            "Invalid roll no. Please enter a valid roll no.",
            true
        );

        return;
    }


    try {

        // First get all students
        const response =
            await fetch(API_URL);


        if (!response.ok) {
            throw new Error("Unable to load students");
        }


        const students =
            await response.json();


        const student =
            students.find(function (item) {

                return item.rollNo === roll;

            });


        if (!student) {

            clearStudentFields();

            showMessage(
                "Invalid roll no. Please enter a valid roll no.",
                true
            );

            return;
        }


        populateStudent(student);


        const detailFields =
            document.getElementById("detailFields");

        if (detailFields) {
            detailFields.style.display = "block";
        }


        showMessage(
            "Student details loaded. You can update or delete them."
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to connect to Spring Boot backend.",
            true
        );
    }
}


// --------------------------------------------------
// COLLECT STUDENT DATA
// --------------------------------------------------

function collectStudentData() {

    return {

        rollNo:
            getFieldValue("roll"),

        fullName:
            getFieldValue("name"),

        fatherName:
            getFieldValue("fatherName"),

        motherName:
            getFieldValue("motherName"),

        course:
            getFieldValue("course"),

        department:
            getFieldValue("department"),

        dateOfBirth:
            getFieldValue("dob"),

        gender:
            getFieldValue("gender"),

        phone:
            getFieldValue("phone"),

        email:
            getFieldValue("email"),

        address:
            getFieldValue("address")
    };
}


// --------------------------------------------------
// UPDATE STUDENT
// --------------------------------------------------

async function updateStudent() {

    const originalRollElement =
        document.getElementById("originalRoll");


    const originalRoll =
        originalRollElement
            ? originalRollElement.value.trim()
            : "";


    if (!originalRoll) {

        showMessage(
            "Please find a student first.",
            true
        );

        return;
    }


    const student =
        collectStudentData();


    if (!student.rollNo ||
        !student.fullName) {

        showMessage(
            "Roll Number and Full Name are required.",
            true
        );

        return;
    }


    try {

        // Find student by roll number
        const getResponse =
            await fetch(API_URL);


        if (!getResponse.ok) {
            throw new Error(
                "Unable to load students"
            );
        }


        const students =
            await getResponse.json();


        const existingStudent =
            students.find(function (item) {

                return item.rollNo === originalRoll;

            });


        if (!existingStudent) {

            showMessage(
                "Student not found.",
                true
            );

            return;
        }


        // PUT request
        const response =
            await fetch(
                API_URL + "/" + existingStudent.studentId,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(student)
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Update error:",
                errorText
            );

            throw new Error(
                "Failed to update student"
            );
        }


        const updatedStudent =
            await response.json();


        console.log(
            "Updated student:",
            updatedStudent
        );


        if (originalRollElement) {
            originalRollElement.value =
                updatedStudent.rollNo;
        }


        showMessage(
            "Student details updated successfully!"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to update student. Please check the backend.",
            true
        );
    }
}


// --------------------------------------------------
// DELETE STUDENT
// --------------------------------------------------

async function deleteStudent() {

    const roll =
        getFieldValue("roll");


    if (!roll) {

        showMessage(
            "Invalid roll no. Please enter a valid roll no.",
            true
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        // Get students
        const getResponse =
            await fetch(API_URL);


        if (!getResponse.ok) {
            throw new Error(
                "Unable to load students"
            );
        }


        const students =
            await getResponse.json();


        const student =
            students.find(function (item) {

                return item.rollNo === roll;

            });


        if (!student) {

            showMessage(
                "Invalid roll no. Please enter a valid roll no.",
                true
            );

            return;
        }


        // DELETE request
        const response =
            await fetch(
                API_URL + "/" + student.studentId,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );
        }


        clearStudentFields();


        const originalRoll =
            document.getElementById(
                "originalRoll"
            );

        if (originalRoll) {
            originalRoll.value = "";
        }


        showMessage(
            "Student deleted successfully!"
        );


    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to delete student. Please check the backend.",
            true
        );
    }
}


// --------------------------------------------------
// RESET UPDATE FORM
// --------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const updateForm =
            document.getElementById(
                "updateForm"
            );


        if (updateForm) {

            updateForm.addEventListener(
                "reset",
                function () {

                    clearStudentFields();


                    const originalRoll =
                        document.getElementById(
                            "originalRoll"
                        );


                    if (originalRoll) {
                        originalRoll.value = "";
                    }


                    showMessage("");
                }
            );
        }

    }
);