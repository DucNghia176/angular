const input = document.getElementById('input');
const list = document.getElementById('list');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
const countSpan = document.getElementById('count');
const searchInput = document.getElementById('search');
const messageBox = document.getElementById('message');


const todos = ['gaming', 'coding', 'reading'];

// --- Hàm render chung ---
function renderTodos(data) {
    list.innerHTML = "";

    if (data.length === 0) {
        const li = document.createElement("li");
        li.className = "text-center text-gray-500 italic";
        li.textContent = "Chưa có dữ liệu";
        list.appendChild(li);
        updateCount();
        return;
    }

    data.forEach(text => {
        const li = document.createElement('li');
        li.className = "group flex items-stretch bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-200 transition";
        li.innerHTML = `
            <span class="flex-1 px-3 py-2 flex items-center">${text}</span>
            <button class="hidden group-hover:flex items-center justify-center w-12 text-white bg-red-500 rounded-r-lg hover:bg-red-600 transition text-2xl">x</button>
        `;

        // nút xóa
        li.querySelector("button").addEventListener("click", () => {
            const index = todos.indexOf(text);
            if (index !== -1) {
                todos.splice(index, 1);
            }
            renderTodos(todos);
        });

        list.appendChild(li);
    });

    updateCount();
}

// --- Thêm todo ---
addButton.addEventListener('click', () => {
    const text = input.value.trim();
    if (todos.includes(text)) {
        showMessage("Todo đã tồn tại!", "error");
        input.value = "";
        return;
    }
    if (text !== "") {
        todos.push(text);
        input.value = "";
        // showMessage("Thêm thành công!", "success");
        renderTodos(todos);
    }
});

function showMessage(text, type = "error") {
    messageBox.textContent = text;
    messageBox.className = "min-h-[20px] text-sm";
    if (type === "error") {
        messageBox.className = "text-red-500  text-sm";
    } else if (type === "success") {
        messageBox.className = "text-green-500  text-sm";
    }

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        messageBox.textContent = "";
        messageBox.className = "";
    }, 3000);
}

// --- Xóa tất cả ---
clearButton.addEventListener('click', () => {
    todos.length = 0;
    renderTodos(todos);
});

// --- Cập nhật số lượng ---
function updateCount() {
    countSpan.textContent = `You have ${todos.length} pending task(s)`;
}

// --- Search ---
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const filtered = todos.filter(todo => todo.toLowerCase().includes(filter));
    renderTodos(filtered);
});

// --- Sortable ---
new Sortable(document.querySelector("#list"), {
    animation: 150
});

// --- Render khi load trang ---
renderTodos(todos);
