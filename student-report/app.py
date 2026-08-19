from flask import Flask, send_file

app = Flask(__name__)


# ============================================================
# HOME
# ============================================================

@app.route("/")
def home():
    return """
    <h1>Student Analytics Server</h1>
    <p>Server is running successfully.</p>
    <p>Available reports:</p>

    <ul>
        <li><a href="/dashboard">Complete Analytics Dashboard</a></li>
        <li><a href="/gender">Gender Report</a></li>
        <li><a href="/department">Department Report</a></li>
        <li><a href="/course">Course Report</a></li>
    </ul>
    """


# ============================================================
# COMPLETE DASHBOARD
# ============================================================

@app.route("/dashboard")
def dashboard():
    return send_file(
        "student_dashboard.png"
    )


# ============================================================
# GENDER REPORT
# ============================================================

@app.route("/gender")
def gender():
    return send_file(
        "gender_report.png"
    )


# ============================================================
# DEPARTMENT REPORT
# ============================================================

@app.route("/department")
def department():
    return send_file(
        "department_report.png"
    )


# ============================================================
# COURSE REPORT
# ============================================================

@app.route("/course")
def course():
    return send_file(
        "course_report.png"
    )


# ============================================================
# START FLASK SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )