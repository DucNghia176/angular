const input = document.getElementById('input');
const list = document.getElementById('list');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
const countSpan = document.getElementById('count');
const searchInput = document.getElementById('search');


const todos = [];

addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (todos.includes(text)) {
        alert("Todo đã tồn tại!");
        input.value = "";
        return;
    }
    if (text !== "") {
        const li = document.createElement('li');
        li.className = "group flex items-stretch bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 transition";
        li.innerHTML = `
            <span class="flex-1 px-3 py-2 flex items-center"> ${text}</span>
            <button class="hidden group-hover:flex items-center justify-center w-12 text-white bg-red-500 rounded-r-lg hover:bg-red-600 transition text-2xl">x</button>
        `;

        li.querySelector("button").addEventListener("click", () => {
            list.removeChild(li);
            const index = todos.indexOf(text);
            if (index !== -1) {
                todos.splice(index, 1);
            }
            console.log(todos);
            updateCount();
        });

        list.appendChild(li);
        todos.push(text);
        input.value = "";
        updateCount();
        console.log(todos);
    }
});

clearButton.addEventListener('click', () => {
    list.innerHTML = "";
    input.value = "";
    todos.length = 0;
    updateCount();
    console.log(todos);
});


new Sortable(document.querySelector("#list"), {
    animation: 150
});

function updateCount() {
    countSpan.textContent = `You have ${todos.length} pending task(s)`;
}

searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    Array.from(list.children).forEach(li => {
        const text = li.querySelector("span").textContent.toLowerCase();
        li.style.display = text.includes(filter) ? "" : "none";
    });
});