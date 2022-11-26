document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const text = event.target.closest("li");
    console.log(text.firstElementChild.textContent);
    const newNote = prompt("Введите новое название").trim();
    edit(id, newNote);
    text.firstElementChild.textContent = newNote;
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, text) {
  if (text) {
    await fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: text }),
    });
  }
}
