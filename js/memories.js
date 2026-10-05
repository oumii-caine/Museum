const isAppleSafari =
    /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) &&
    /Safari/.test(navigator.userAgent) &&
    !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS/.test(navigator.userAgent);

fetch("media.json")
    .then(response => response.json())
    .then(files => {

        const gallery = document.getElementById("memory-gallery");

        files.forEach((file, index) => {

            const memory = document.createElement("div");
            memory.classList.add("memory");

            const link = document.createElement("a");

            const number = index + 1;

            link.href = "memory-detail.html?id=" + number;

            const extension = file.split(".").pop().toLowerCase();

            // Images
            if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) {

                const image = document.createElement("img");

                image.classList.add("memory-image");
                image.src = "images/" + file;
                image.alt = "Memory " + number;

                link.appendChild(image);
            }

            // Videos
            else if (["mp4", "webm", "mov"].includes(extension)) {

                if (isAppleSafari) {

                    const image = document.createElement("img");

                    image.classList.add("memory-image");
                    image.src =
                        "images/posters/" +
                        file.replace(/\.[^/.]+$/, ".jpg");

                    image.alt = "Memory " + number;

                    link.appendChild(image);

                } else {

                    const video = document.createElement("video");

                    video.classList.add("memory-image");
                    video.src = "images/" + file;

                    video.controls = true;
                    video.setAttribute("playsinline", "");
                    video.setAttribute("webkit-playsinline", "");

                    video.muted = true;
                    video.preload = "auto";

                    link.appendChild(video);
                }
            }

            memory.appendChild(link);
            gallery.appendChild(memory);
        });
    })
    .catch(error => {
        console.error("Erreur :", error);
    });