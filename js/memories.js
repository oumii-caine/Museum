// Détection iOS (iPhone, iPad, iPod + iPadOS qui s'identifie comme "MacIntel")
const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

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

                const video = document.createElement("video");

                video.classList.add("memory-image");

                video.src = "images/" + file;

                // Poster uniquement sur iOS
                if (isIOS) {
                    const posterName = file.replace(/\.[^/.]+$/, ".jpg");
                    video.poster = "images/posters/" + encodeURIComponent(posterName);
                    video.src = "images/" + file + "#t=0.001";
                } else {
                    video.src = "images/" + file;
                }

                video.controls = true;

                video.setAttribute("playsinline", "");

                video.setAttribute("webkit-playsinline", "");

                video.muted = true;

                video.preload = "metadata";

                link.appendChild(video);
            }

            memory.appendChild(link);

            gallery.appendChild(memory);
        });
    });