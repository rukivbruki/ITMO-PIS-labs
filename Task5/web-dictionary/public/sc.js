const enterWord = document.getElementById("enter-word");
const sendButton = document.getElementById("send");
const definition = document.getElementById("definition");

const addWord = document.getElementById("add-word");
const addWordDefinition = document.getElementById("add-word-definition");
const addButton = document.getElementById("add");

sendButton.addEventListener("click", async () => {
    const response = await fetch(`http://localhost:8080/words/${enterWord.value}`);
    const json = await response.json();
    if (json.error) {
        definition.textContent = "no such word in database"
    } else {
        definition.textContent = `Name: ${json.name} \n Definition: ${json.definition}`;
    }
});

addButton.addEventListener("click", async () => {
    const response = await fetch('http://localhost:8080/words', {
        method: "POST",
        mode: 'cors',
        cache: "default",
        headers: new Headers(),
        body: JSON.stringify({ name: addWord.value, definition: addWordDefinition.value }),
    });
    return await response.json();
});