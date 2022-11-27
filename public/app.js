document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "update") {
    const li = event.target.closest("li");
    const child = li.children;
    for (let index = 0; index < child.length; index++) {
      child[index].classList.toggle("visually-hidden");
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "save") {
    const li = event.target.closest("li");
    const id = event.target.dataset.id;
    const text = document.querySelector(`#edit${id}`).value;
    if (text) {
      edit(id, text);
      li.firstElementChild.textContent = text;
    }
    const child = li.children;
    for (let index = 0; index < child.length; index++) {
      child[index].classList.toggle("visually-hidden");
    }
  }
});
document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "cancel") {
    const li = event.target.closest("li");
    const child = li.children;
    for (let index = 0; index < child.length; index++) {
      child[index].classList.toggle("visually-hidden");
    }
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
