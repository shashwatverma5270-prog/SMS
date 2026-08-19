const API_URL = "http://localhost:8081/students";

async function loadDashboard() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load students");
        }

        const students = await response.json();

        const total = students.length;

        const male = students.filter(student =>
            student.gender &&
            student.gender.toLowerCase() === "male"
        ).length;

        const female = students.filter(student =>
            student.gender &&
            student.gender.toLowerCase() === "female"
        ).length;

        document.getElementById("totalStudents").textContent = total;
        document.getElementById("maleStudents").textContent = male;
        document.getElementById("femaleStudents").textContent = female;
        document.getElementById("newStudents").textContent = 0;

        createGenderChart(male, female);
        createMonthlyChart(students);

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the student backend.");
    }
}

function createGenderChart(male, female) {
    const pie = document.getElementById("pieChart");

    new Chart(pie, {
        type: "doughnut",
        data: {
            labels: ["Male", "Female"],
            datasets: [{
                data: [male, female],
                backgroundColor: [
                    "#3b82f6",
                    "#ec4899"
                ]
            }]
        },
        options: {
            responsive: true,
            cutout: "65%"
        }
    });
}

function createMonthlyChart(students) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const monthlyData = [
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0
    ];

    students.forEach(student => {
        const date = student.admissionDate || student.createdAt;

        if (date) {
            const month = new Date(date).getMonth();
            monthlyData[month]++;
        }
    });

    const bar = document.getElementById("barChart");

    new Chart(bar, {
        type: "bar",
        data: {
            labels: months,
            datasets: [{
                label: "Students",
                data: monthlyData,
                backgroundColor: "#3b82f6",
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

loadDashboard();