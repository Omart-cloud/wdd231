// Course List Array
const courses = [
    { code: 'CSE 110', name: 'Introduction to Programming', credits: 3, completed: true },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 4, completed: true },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 3, completed: true },
    { code: 'ITM 111', name: 'Introduction to IT', credits: 2, completed: false },
    { code: 'WDD 130', name: 'Web Design', credits: 3, completed: true },
    { code: 'WDD 131', name: 'JavaScript Programming', credits: 3, completed: false },
    { code: 'WDD 231', name: 'Advanced CSS', credits: 3, completed: false }
];

// Display Courses
const courseContainer = document.querySelector('.courses');
const creditCount = document.createElement('p');
courseContainer.after(creditCount);

function displayCourses(filter = 'ALL') {
    const filteredCourses = courses.filter(course => {
        if (filter === 'ALL') return true;
        if (filter === 'CSE') return course.code.startsWith('CSE');
        if (filter === 'WDD') return course.code.startsWith('WDD');
    });

    courseContainer.innerHTML = filteredCourses.map(course => `
        <button class="course ${course.completed ? 'completed' : 'light'}">
            ${course.code}: ${course.name}
        </button>
    `).join('');

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditCount.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses();

document.getElementById('all-btn').addEventListener('click', () => displayCourses('ALL'));
document.getElementById('cse-btn').addEventListener('click', () => displayCourses('CSE'));
document.getElementById('wdd-btn').addEventListener('click', () => displayCourses('WDD'));
