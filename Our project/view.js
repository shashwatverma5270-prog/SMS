const API_URL = "http://localhost:8081/students";


// ==================================================
// GET ALL STUDENTS FROM SPRING BOOT
// ==================================================

async function getStudents() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        return await response.json();

    } catch (error) {

        console.error("Get students error:", error);

        alert(
            "Unable to load students. Please make sure Spring Boot is running."
        );

        return [];
    }
}


// ==================================================
// RENDER STUDENTS
// ==================================================

async function renderStudents() {

    const tableBody =
        document.getElementById("studentBody");

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML =
        '<tr><td colspan="7">Loading students...</td></tr>';


    const students =
        await getStudents();


    tableBody.innerHTML = "";


    if (students.length === 0) {

        tableBody.innerHTML =
            '<tr><td colspan="7">No students found.</td></tr>';

        return;
    }


    students.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.rollNo || ""}</td>

            <td>${student.fullName || ""}</td>

            <td>${student.course || ""}</td>

            <td>${student.department || ""}</td>

            <td>${student.gender || ""}</td>

            <td>${student.phone || ""}</td>

            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        onclick="showStudentDetails(${student.studentId})">
                        View
                    </button>

                    <button
                        class="edit"
                        onclick="editStudent(${student.studentId})">
                        Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteStudent(${student.studentId})">
                        Delete
                    </button>

                </div>

            </td>
        `;


        tableBody.appendChild(row);

    });
}


// ==================================================
// SHOW STUDENT DETAILS
// ==================================================

async function showStudentDetails(studentId) {

    try {

        const response =
            await fetch(API_URL + "/" + studentId);


        if (!response.ok) {

            alert("Student not found.");

            return;
        }


        const student =
            await response.json();


        const detailsCard =
            document.getElementById(
                "studentDetails"
            );


        if (!detailsCard) {
            return;
        }


        detailsCard.style.display = "block";


        detailsCard.innerHTML = `

            <h3>
                ${student.fullName || "Student Details"}
            </h3>

            <p>
                <strong>Roll No:</strong>
                ${student.rollNo || ""}
            </p>

            <p>
                <strong>Father's Name:</strong>
                ${student.fatherName || ""}
            </p>

            <p>
                <strong>Mother's Name:</strong>
                ${student.motherName || ""}
            </p>

            <p>
                <strong>Course:</strong>
                ${student.course || ""}
            </p>

            <p>
                <strong>Department:</strong>
                ${student.department || ""}
            </p>

            <p>
                <strong>Gender:</strong>
                ${student.gender || ""}
            </p>

            <p>
                <strong>Date of Birth:</strong>
                ${student.dateOfBirth || ""}
            </p>

            <p>
                <strong>Phone:</strong>
                ${student.phone || ""}
            </p>

            <p>
                <strong>Email:</strong>
                ${student.email || ""}
            </p>

            <p>
                <strong>Address:</strong>
                ${student.address || ""}
            </p>

        `;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to load student details."
        );
    }
}


// ==================================================
// EDIT STUDENT
// ==================================================

async function editStudent(studentId) {

    try {

        const response =
            await fetch(
                API_URL + "/" + studentId
            );


        if (!response.ok) {

            alert("Student not found.");

            return;
        }


        const student =
            await response.json();


        const detailsCard =
            document.getElementById(
                "studentDetails"
            );


        if (!detailsCard) {
            return;
        }


        detailsCard.style.display = "block";


        detailsCard.innerHTML = `

            <h3>Edit Student</h3>

            <div class="filter-panel">

                <input
                    id="editRollNo"
                    placeholder="Roll Number"
                    value="${student.rollNo || ""}"
                >

                <input
                    id="editName"
                    placeholder="Full Name"
                    value="${student.fullName || ""}"
                >

                <input
                    id="editFather"
                    placeholder="Father's Name"
                    value="${student.fatherName || ""}"
                >

                <input
                    id="editMother"
                    placeholder="Mother's Name"
                    value="${student.motherName || ""}"
                >

                <input
                    id="editCourse"
                    placeholder="Course"
                    value="${student.course || ""}"
                >

                <input
                    id="editDepartment"
                    placeholder="Department"
                    value="${student.department || ""}"
                >

                <input
                    id="editGender"
                    placeholder="Gender"
                    value="${student.gender || ""}"
                >

                <input
                    id="editDob"
                    type="text"
                    placeholder="Date of Birth"
                    value="${student.dateOfBirth || ""}"
                >

                <input
                    id="editPhone"
                    placeholder="Phone Number"
                    value="${student.phone || ""}"
                >

                <input
                    id="editEmail"
                    placeholder="Email"
                    value="${student.email || ""}"
                >

                <textarea
                    id="editAddress"
                    placeholder="Address"
                >${student.address || ""}</textarea>

            </div>


            <div class="action-buttons">

                <button
                    class="edit"
                    onclick="saveEditedStudent(${student.studentId})">
                    Save
                </button>

                <button
                    class="view-btn"
                    onclick="showStudentDetails(${student.studentId})">
                    Cancel
                </button>

            </div>
        `;

    } catch (error) {

        console.error(error);

        alert(
            "Unable to load student for editing."
        );
    }
}


// ==================================================
// SAVE EDITED STUDENT
// ==================================================

async function saveEditedStudent(studentId) {

    const rollNo =
        document
            .getElementById("editRollNo")
            .value
            .trim();


    const fullName =
        document
            .getElementById("editName")
            .value
            .trim();


    if (!rollNo || !fullName) {

        alert(
            "Roll Number and Full Name are required."
        );

        return;
    }


    const updatedStudent = {

        rollNo: rollNo,

        fullName: fullName,

        fatherName:
            document
                .getElementById("editFather")
                .value
                .trim(),

        motherName:
            document
                .getElementById("editMother")
                .value
                .trim(),

        course:
            document
                .getElementById("editCourse")
                .value
                .trim(),

        department:
            document
                .getElementById("editDepartment")
                .value
                .trim(),

        dateOfBirth:
            document
                .getElementById("editDob")
                .value
                .trim(),

        gender:
            document
                .getElementById("editGender")
                .value
                .trim(),

        phone:
            document
                .getElementById("editPhone")
                .value
                .trim(),

        email:
            document
                .getElementById("editEmail")
                .value
                .trim(),

        address:
            document
                .getElementById("editAddress")
                .value
                .trim()
    };


    try {

        const response =
            await fetch(
                API_URL + "/" + studentId,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedStudent
                        )
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


        const updatedStudentFromServer =
            await response.json();


        alert(
            "Student updated successfully!"
        );


        await renderStudents();


        await showStudentDetails(
            updatedStudentFromServer.studentId
        );


    } catch (error) {

        console.error(error);

        alert(
            "Unable to update student. Please check the backend."
        );
    }
}


// ==================================================
// DELETE STUDENT
// ==================================================

async function deleteStudent(studentId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                API_URL + "/" + studentId,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete student"
            );
        }


        alert(
            "Student deleted successfully!"
        );


        const detailsCard =
            document.getElementById(
                "studentDetails"
            );


        if (detailsCard) {

            detailsCard.style.display =
                "none";

            detailsCard.innerHTML = "";
        }


        await renderStudents();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete student. Please check the backend."
        );
    }
}


// ==================================================
// SEARCH AND FILTER
// ==================================================

async function searchStudent() {

    const students =
        await getStudents();


    const searchElement =
        document.getElementById(
            "searchInput"
        );


    const searchText =
        searchElement
            ? searchElement.value
                .toUpperCase()
                .trim()
            : "";


    const getFilterValue =
        function (id) {

            const element =
                document.getElementById(id);

            return element
                ? element.value
                    .toUpperCase()
                    .trim()
                : "";
        };


    const filterRoll =
        getFilterValue("filterRoll");

    const filterName =
        getFilterValue("filterName");

    const filterFather =
        getFilterValue("filterFather");

    const filterMother =
        getFilterValue("filterMother");

    const filterCourse =
        getFilterValue("filterCourse");

    const filterDepartment =
        getFilterValue("filterDepartment");

    const filterGender =
        getFilterValue("filterGender");

    const filterPhone =
        getFilterValue("filterPhone");


    const tableBody =
        document.getElementById(
            "studentBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    const filteredStudents =
        students.filter(function (student) {

            const roll =
                (student.rollNo || "")
                    .toUpperCase();

            const name =
                (student.fullName || "")
                    .toUpperCase();

            const father =
                (student.fatherName || "")
                    .toUpperCase();

            const mother =
                (student.motherName || "")
                    .toUpperCase();

            const course =
                (student.course || "")
                    .toUpperCase();

            const department =
                (student.department || "")
                    .toUpperCase();

            const gender =
                (student.gender || "")
                    .toUpperCase();

            const phone =
                (student.phone || "")
                    .toUpperCase();


            const studentText =
                `
                ${roll}
                ${name}
                ${father}
                ${mother}
                ${course}
                ${department}
                ${gender}
                ${phone}
                `;


            const textMatch =
                studentText.includes(
                    searchText
                );


            return (

                textMatch &&

                roll.includes(filterRoll) &&

                name.includes(filterName) &&

                father.includes(filterFather) &&

                mother.includes(filterMother) &&

                course.includes(filterCourse) &&

                department.includes(
                    filterDepartment
                ) &&

                gender.includes(filterGender) &&

                phone.includes(filterPhone)
            );

        });


    if (filteredStudents.length === 0) {

        tableBody.innerHTML =
            '<tr><td colspan="7">No students found.</td></tr>';

        return;
    }


    filteredStudents.forEach(
        function (student) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${student.rollNo || ""}
                </td>

                <td>
                    ${student.fullName || ""}
                </td>

                <td>
                    ${student.course || ""}
                </td>

                <td>
                    ${student.department || ""}
                </td>

                <td>
                    ${student.gender || ""}
                </td>

                <td>
                    ${student.phone || ""}
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="view-btn"
                            onclick="showStudentDetails(${student.studentId})">
                            View
                        </button>

                        <button
                            class="edit"
                            onclick="editStudent(${student.studentId})">
                            Edit
                        </button>

                        <button
                            class="delete"
                            onclick="deleteStudent(${student.studentId})">
                            Delete
                        </button>

                    </div>

                </td>
            `;


            tableBody.appendChild(row);

        }
    );
}


// ==================================================
// FILTER PANEL
// ==================================================

function toggleFilterPanel() {

    const panel =
        document.getElementById(
            "filterPanel"
        );


    if (!panel) {
        return;
    }


    panel.classList.toggle("hidden");
}


// ==================================================
// PAGE LOAD
// ==================================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudents();


        const panel =
            document.getElementById(
                "filterPanel"
            );


        if (panel) {
            panel.classList.add("hidden");
        }

    }
);