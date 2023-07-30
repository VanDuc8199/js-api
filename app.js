const coursesAPI = "http://localhost:3000/courses";

function start() {
    getCourses((courses) => {
        renderCourses(courses);
    });
    handleCreateForm();
}

start();
function getCourses(callBack) {
    fetch(coursesAPI)
        .then((response) => {
            return response.json();
        })
        .then(callBack);
}

function createCourses(data, callBack) {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(coursesAPI, options)
        .then((response) => {
            response.json();
        })
        .then(callBack);
}

function HandleDeleteCourses(id) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(coursesAPI + "/" + id, options)
        .then((response) => {
            response.json();
        })
        .then(() => {
            const courseItem = document.querySelector(".courses-item-" + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}

function renderCourses(courses) {
    const listCoursesBlock = document.getElementById("list-courses");
    const html = courses
        .map((course) => {
            return `
        <li class="courses-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <div>
                <button onclick = "HandleDeleteCourses(${course.id})">Delete</button>
            </div>
        </li>`;
        })
        .join("");
    listCoursesBlock.innerHTML = html;
}

function handleCreateForm() {
    const createBtn = document.getElementById("create");
    createBtn.onclick = function () {
        const name = document.querySelector('input[name = "name"]').value;
        const description = document.querySelector(
            'input[name = "description"]'
        ).value;
        const formData = {
            name: name,
            description: description,
        };
        createCourses(
            formData,
            getCourses((courses) => {
                renderCourses(courses);
            })
        );
    };
}
