"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let todos = [];
const inputlabel = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const Ulist = document.getElementById("todoList");
const renderTodos = () => {
    Ulist.innerHTML = "";
    todos.forEach((todo) => {
        // Create container for todo
        const container = document.createElement("li");
        container.style.display = "flex";
        container.style.justifyContent = "space-between";
        container.style.alignItems = "center";
        container.style.padding = "8px 10px";
        container.style.marginBottom = "6px";
        container.style.border = "1px solid #ccc";
        container.style.borderRadius = "6px";
        container.style.background = "#f9f9f9";
        container.style.cursor = "pointer";
        // Todo text
        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        textSpan.style.textDecoration = todo.isCompleted ? "line-through" : "none";
        textSpan.style.flex = "1";
        // Toggle completion on click
        textSpan.addEventListener("click", () => {
            todo.isCompleted = !todo.isCompleted;
            renderTodos();
        });
        // Delete button
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.style.background = "#e74c3c";
        deletebtn.style.color = "white";
        deletebtn.style.border = "none";
        deletebtn.style.borderRadius = "4px";
        deletebtn.style.padding = "4px 8px";
        deletebtn.style.cursor = "pointer";
        deletebtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent toggling completion when clicking delete
            todos = todos.filter((item) => item.id !== todo.id);
            renderTodos();
        });
        // Modify button
        const modifyBtn = document.createElement("button");
        modifyBtn.textContent = "Modify";
        modifyBtn.style.background = "#3498db";
        modifyBtn.style.color = "white";
        modifyBtn.style.border = "none";
        modifyBtn.style.borderRadius = "4px";
        modifyBtn.style.padding = "4px 8px";
        modifyBtn.style.marginRight = "5px";
        modifyBtn.style.cursor = "pointer";
        modifyBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent toggle completion
            const input = document.createElement("input");
            input.type = "text";
            input.value = todo.text;
            input.style.flex = "1";
            input.style.marginRight = "5px";
            // Replace span with input
            container.replaceChild(input, textSpan);
            input.focus();
            // Save changes on Enter or blur
            const save = () => {
                if (input.value.trim() !== "") {
                    todo.text = input.value.trim();
                }
                renderTodos();
            };
            input.addEventListener("blur", save);
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter")
                    save();
            });
        });
        // Append elements to container
        container.appendChild(textSpan);
        container.appendChild(modifyBtn);
        container.appendChild(deletebtn);
        // Append container to list
        Ulist.appendChild(container);
    });
};
const addTodo = () => {
    if (!inputlabel || !button || !Ulist) {
        throw new Error("Required DOM elements not found");
    }
    if (inputlabel.value.trim() === "")
        return;
    const newTodo = {
        id: Date.now(),
        text: inputlabel.value,
        isCompleted: false
    };
    todos.push(newTodo);
    inputlabel.value = "";
    renderTodos();
};
button.addEventListener("click", addTodo);
//# sourceMappingURL=index.js.map