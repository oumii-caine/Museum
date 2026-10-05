// Détection iOS (iPhone, iPad, iPod + iPadOS qui s'identifie comme "MacIntel")
const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

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

        // =========================
        // NAVIGATION
        // =========================
        if (id === 1) {
            // Premier média
            previous.style.display = "none";
            back.style.display = "block";
            next.href = "memory-detail.html?id=" + (id + 1);
        }
        else if (id === files.length) {
            // Dernier média
            next.style.display = "none";
            back.style.display = "block";
            previous.href = "memory-detail.html?id=" + (id - 1);
        }
        else {
            // Médias du milieu
            back.style.display = "none";
            previous.href = "memory-detail.html?id=" + (id - 1);
            next.href = "memory-detail.html?id=" + (id + 1);
        }

        // =========================
        // TYPE DU MÉDIA
        // =========================
        const extension = file.split(".").pop().toLowerCase();

        // IMAGE
        if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {
            const image = document.createElement("img");
            image.src = "images/" + file;
            image.alt = "Memory " + id;
            detail.appendChild(image);
        }

        // VIDEO
        else if (["mp4", "webm", "mov"].includes(extension)) {
            const video = document.createElement("video");

            if (isIOS) {
                // Poster uniquement sur iOS (nom encodé pour espaces/accents)
                const posterName = file.replace(/\.[^/.]+$/, ".jpg");
                video.poster = "images/posters/" + encodeURIComponent(posterName);

                // Astuce iOS : #t=0.001 force Safari à afficher la première image
                video.src = "images/" + file + "#t=0.001";
            } else {
                video.src = "images/" + file;
            }

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