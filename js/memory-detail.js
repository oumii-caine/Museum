const params = new URLSearchParams(window.location.search);

const id = parseInt(params.get("id"));

const previous = document.getElementById("previous");
const next = document.getElementById("next");
const back = document.getElementById("back");
const detail = document.getElementById("memory-detail");


// Récupérer les médias
fetch("media.json")
    .then(response => response.json())
    .then(files => {

        if (!id || id < 1 || id > files.length) {
            window.location.href = "memories.html";
            return;
        }

        const file = files[id - 1];



        if (id === 1) {

          
            previous.style.display = "none";
            back.style.display = "block";

            next.href = "memory-detail.html?id=" + (id + 1);

        }

        else if (id === files.length) {

            next.style.display = "none";
            back.style.display = "block";

            previous.href = "memory-detail.html?id=" + (id - 1);

        }

        else {

         
            back.style.display = "none";

            previous.href = "memory-detail.html?id=" + (id - 1);
            next.href = "memory-detail.html?id=" + (id + 1);
        }


        

        const extension = file.split(".").pop().toLowerCase();


       

        if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {

            const image = document.createElement("img");

            image.src = "images/" + file;
            image.alt = "Memory " + id;

            detail.appendChild(image);
        }


   

        else if (["mp4", "webm", "mov"].includes(extension)) {

            const video = document.createElement("video");

            video.src = "images/" + file;
                video.poster = "images/" + file.replace(/\.[^/.]+$/, ".jpg");
            video.controls = true;
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            video.muted = true;
            video.preload = "metadata";
            detail.appendChild(video);
        }


        // =========================
        // DESCRIPTION
        // =========================

        fetch("descriptions.json")
            .then(response => response.json())
            .then(descriptions => {

                if (descriptions[id]) {

                    const description = document.createElement("p");

                    description.textContent = descriptions[id];

                    detail.appendChild(description);
                }

            })
            .catch(error => {

                console.log("Erreur descriptions :", error);

            });

    })
    .catch(error => {

        console.log("Erreur media.json :", error);

    });