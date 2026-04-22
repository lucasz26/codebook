// get id from URL
const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch("http://localhost:3000/problems/" + id)
  .then(res => res.json())
  .then(data => {
    document.getElementById("problem-title").textContent = data.title;
    document.getElementById("problem-description").textContent = data.description;
  });

