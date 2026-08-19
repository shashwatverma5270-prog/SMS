import requests
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

# ============================================================
# SPRING BOOT API
# ============================================================

API_URL = "http://localhost:8081/students"


# ============================================================
# GET STUDENT DATA
# ============================================================

try:
    response = requests.get(API_URL, timeout=10)

    if response.status_code != 200:
        print("Unable to get student data.")
        print("Backend returned status:", response.status_code)
        exit()

    data = response.json()

except requests.exceptions.ConnectionError:
    print("Backend is not running.")
    print("Please start your Spring Boot backend on port 8081.")
    exit()

except requests.exceptions.Timeout:
    print("Connection to backend timed out.")
    exit()

except Exception as error:
    print("Error while getting student data:", error)
    exit()


# ============================================================
# CHECK DATA
# ============================================================

if not data:
    print("No students found.")
    exit()


# ============================================================
# CREATE DATAFRAME
# ============================================================

df = pd.DataFrame(data)

print()
print("Student Report")
print("==============================")
print("Total Students:", len(df))

print()
print("Columns received from backend:")
print(list(df.columns))


# ============================================================
# SUPPORT BOTH fullName AND name
# ============================================================

if "fullName" in df.columns:
    name_column = "fullName"
elif "name" in df.columns:
    name_column = "name"
else:
    name_column = None


# ============================================================
# REQUIRED COLUMNS
# ============================================================

required_columns = [
    "gender",
    "department",
    "course"
]

missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]

if missing_columns:
    print()
    print("ERROR: Missing columns from backend:")
    print(missing_columns)
    exit()


# ============================================================
# CLEAN DATA
# ============================================================

for column in ["gender", "department", "course"]:
    df[column] = (
        df[column]
        .fillna("Unknown")
        .astype(str)
        .str.strip()
    )

if name_column:
    df[name_column] = (
        df[name_column]
        .fillna("Unknown")
        .astype(str)
        .str.strip()
    )


# ============================================================
# STUDENT DETAILS
# ============================================================

print()
print("Student Details")
print("==============================")

display_columns = []

if name_column:
    display_columns.append(name_column)

display_columns.extend([
    "gender",
    "department",
    "course"
])

print(
    df[display_columns]
    .to_string(index=False)
)


# ============================================================
# COUNT DATA
# ============================================================

gender = df["gender"].value_counts()
department = df["department"].value_counts()
course = df["course"].value_counts()


# ============================================================
# PRINT REPORTS
# ============================================================

print()
print("Students by Gender")
print("==============================")
print(gender.to_string())

print()
print("Students by Department")
print("==============================")
print(department.to_string())

print()
print("Students by Course")
print("==============================")
print(course.to_string())


# ============================================================
# FUNCTION FOR BAR CHARTS
# ============================================================

def create_bar_chart(
    data,
    title,
    xlabel,
    ylabel,
    filename
):

    plt.figure(figsize=(9, 6))

    ax = data.plot(
        kind="bar",
        edgecolor="black",
        linewidth=1
    )

    plt.title(
        title,
        fontsize=18,
        fontweight="bold",
        pad=15
    )

    plt.xlabel(
        xlabel,
        fontsize=12,
        fontweight="bold"
    )

    plt.ylabel(
        ylabel,
        fontsize=12,
        fontweight="bold"
    )

    # WHOLE NUMBER Y-AXIS
    ax.yaxis.set_major_locator(
        MaxNLocator(integer=True)
    )

    maximum = int(data.max()) if len(data) else 1

    ax.set_ylim(
        0,
        maximum + 1
    )

    # Show exact number above each bar
    for container in ax.containers:

        ax.bar_label(
            container,
            fmt="%d",
            padding=5,
            fontsize=11,
            fontweight="bold"
        )

    plt.xticks(
        rotation=25,
        ha="right"
    )

    plt.grid(
        axis="y",
        linestyle="--",
        alpha=0.3
    )

    plt.tight_layout()

    plt.savefig(
        filename,
        dpi=150,
        bbox_inches="tight"
    )

    plt.close()


# ============================================================
# CREATE INDIVIDUAL BAR CHARTS
# ============================================================

create_bar_chart(
    gender,
    "Students by Gender",
    "Gender",
    "Number of Students",
    "gender_report.png"
)

create_bar_chart(
    department,
    "Students by Department",
    "Department",
    "Number of Students",
    "department_report.png"
)

create_bar_chart(
    course,
    "Students by Course",
    "Course",
    "Number of Students",
    "course_report.png"
)


# ============================================================
# CREATE COMBINED DASHBOARD
# ============================================================

fig = plt.figure(
    figsize=(16, 11)
)

fig.suptitle(
    "Student Analytics Dashboard",
    fontsize=24,
    fontweight="bold",
    y=0.98
)


# ============================================================
# 1. GENDER BAR CHART
# ============================================================

ax1 = plt.subplot(2, 2, 1)

gender.plot(
    kind="bar",
    ax=ax1,
    edgecolor="black",
    linewidth=1
)

ax1.set_title(
    "Students by Gender",
    fontsize=16,
    fontweight="bold"
)

ax1.set_xlabel("Gender")
ax1.set_ylabel("Number of Students")

ax1.yaxis.set_major_locator(
    MaxNLocator(integer=True)
)

gender_max = int(gender.max())

ax1.set_ylim(
    0,
    gender_max + 1
)

for container in ax1.containers:

    ax1.bar_label(
        container,
        fmt="%d",
        padding=5,
        fontweight="bold"
    )

ax1.tick_params(
    axis="x",
    rotation=0
)

ax1.grid(
    axis="y",
    linestyle="--",
    alpha=0.3
)


# ============================================================
# 2. DEPARTMENT BAR CHART
# ============================================================

ax2 = plt.subplot(2, 2, 2)

department.plot(
    kind="bar",
    ax=ax2,
    edgecolor="black",
    linewidth=1
)

ax2.set_title(
    "Students by Department",
    fontsize=16,
    fontweight="bold"
)

ax2.set_xlabel("Department")
ax2.set_ylabel("Number of Students")

ax2.yaxis.set_major_locator(
    MaxNLocator(integer=True)
)

department_max = int(department.max())

ax2.set_ylim(
    0,
    department_max + 1
)

for container in ax2.containers:

    ax2.bar_label(
        container,
        fmt="%d",
        padding=5,
        fontweight="bold"
    )

ax2.tick_params(
    axis="x",
    rotation=20
)

ax2.grid(
    axis="y",
    linestyle="--",
    alpha=0.3
)


# ============================================================
# 3. COURSE BAR CHART
# ============================================================

ax3 = plt.subplot(2, 2, 3)

course.plot(
    kind="bar",
    ax=ax3,
    edgecolor="black",
    linewidth=1
)

ax3.set_title(
    "Students by Course",
    fontsize=16,
    fontweight="bold"
)

ax3.set_xlabel("Course")
ax3.set_ylabel("Number of Students")

ax3.yaxis.set_major_locator(
    MaxNLocator(integer=True)
)

course_max = int(course.max())

ax3.set_ylim(
    0,
    course_max + 1
)

for container in ax3.containers:

    ax3.bar_label(
        container,
        fmt="%d",
        padding=5,
        fontweight="bold"
    )

ax3.tick_params(
    axis="x",
    rotation=20
)

ax3.grid(
    axis="y",
    linestyle="--",
    alpha=0.3
)


# ============================================================
# 4. ATTRACTIVE GENDER PIE CHART
# ============================================================

ax4 = plt.subplot(2, 2, 4)

wedges, texts, autotexts = ax4.pie(
    gender.values,
    labels=gender.index,
    autopct="%1.0f%%",
    startangle=90,
    shadow=True,
    explode=[
        0.03
        for _ in gender.values
    ],
    textprops={
        "fontsize": 11
    }
)

ax4.set_title(
    "Gender Distribution",
    fontsize=16,
    fontweight="bold",
    pad=15
)

# Make percentage text bold
for text in autotexts:

    text.set_fontweight("bold")
    text.set_fontsize(12)


# ============================================================
# FINAL DASHBOARD
# ============================================================

plt.tight_layout(
    rect=[0, 0, 1, 0.95]
)

plt.savefig(
    "student_dashboard.png",
    dpi=180,
    bbox_inches="tight"
)

plt.close()


# ============================================================
# SAVE CSV
# ============================================================

df.to_csv(
    "student_analysis_report.csv",
    index=False
)


# ============================================================
# SUCCESS MESSAGE
# ============================================================

print()
print("======================================")
print("REPORTS CREATED SUCCESSFULLY")
print("======================================")

print("1. student_dashboard.png")
print("2. gender_report.png")
print("3. department_report.png")
print("4. course_report.png")
print("5. student_analysis_report.csv")

print()
print("Analytics completed successfully.")