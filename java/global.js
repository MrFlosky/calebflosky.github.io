/* =======================================================
   GLOBAL CLICK-TO-ENLARGE IMAGE LIGHTBOX + ZOOM + DRAG
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const lightbox = document.getElementById("global-lightbox");
    const lightboxImg = document.getElementById("global-lightbox-img");

    let isZoomed = false;
    let isDragging = false;
    let dragMoved = false;
    let startX, startY, imgX = 0, imgY = 0;
    let pointerDownX = 0, pointerDownY = 0;
    const ZOOM_SCALE = 2;

    // Helper: turn smooth transition on/off
    function setTransition(enabled) {
        lightboxImg.style.transition = enabled ? "transform 0.25s ease" : "none";
    }

    // Open lightbox on click
    document.querySelectorAll(".clickable-img").forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("visible");
            resetZoom();
        });
    });

    // Toggle zoom on image click
    lightboxImg.addEventListener("click", (e) => {
        e.stopPropagation();

        // ignore click at end of drag
        if (dragMoved) {
            dragMoved = false;
            return;
        }

        isZoomed ? zoomOut() : zoomIn(e);
    });

    function zoomIn(e) {
        isZoomed = true;
        lightboxImg.classList.add("zoomed");

        // smooth zoom
        setTransition(true);

        // center logic based on click
        const rect = lightboxImg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        imgX = -ZOOM_SCALE * offsetX;
        imgY = -ZOOM_SCALE * offsetY;

        updateTransform();
    }

    function zoomOut() {
        isZoomed = false;
        lightboxImg.classList.remove("zoomed");

        // smooth zoom
        setTransition(true);

        imgX = 0;
        imgY = 0;
        updateTransform();
    }

    function resetZoom() {
        isZoomed = false;
        lightboxImg.classList.remove("zoomed");

        // smooth initial state
        setTransition(true);

        imgX = 0;
        imgY = 0;
        updateTransform();
    }

    // Apply pan transform
    function updateTransform() {
        if (isZoomed) {
            lightboxImg.style.transform = `translate(${imgX}px, ${imgY}px) scale(${ZOOM_SCALE})`;
        } else {
            lightboxImg.style.transform = `translate(0, 0) scale(1)`;
        }
    }

    // --------- Desktop dragging ---------
    lightboxImg.addEventListener("mousedown", (e) => {
        if (!isZoomed) return;

        isDragging = true;
        dragMoved = false;

        // turn off easing so drag feels instant
        setTransition(false);

        pointerDownX = e.clientX;
        pointerDownY = e.clientY;

        startX = e.clientX - imgX;
        startY = e.clientY - imgY;

        e.preventDefault();
    });

    lightbox.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - pointerDownX;
        const dy = e.clientY - pointerDownY;

        if (!dragMoved && Math.hypot(dx, dy) > 3) {
            dragMoved = true;
        }

        imgX = e.clientX - startX;
        imgY = e.clientY - startY;
        updateTransform();
    });

    lightbox.addEventListener("mouseup", () => {
        isDragging = false;

        // re-enable easing for future zooms
        setTransition(true);
    });

    lightbox.addEventListener("mouseleave", () => {
        isDragging = false;
        setTransition(true);
    });

    // --------- Touch dragging ---------
    lightboxImg.addEventListener("touchstart", (e) => {
        if (!isZoomed) return;

        isDragging = true;
        dragMoved = false;

        setTransition(false);

        const touch = e.touches[0];
        pointerDownX = touch.clientX;
        pointerDownY = touch.clientY;

        startX = touch.clientX - imgX;
        startY = touch.clientY - imgY;
    });

    lightbox.addEventListener("touchmove", (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const dx = touch.clientX - pointerDownX;
        const dy = touch.clientY - pointerDownY;

        if (!dragMoved && Math.hypot(dx, dy) > 3) {
            dragMoved = true;
        }

        imgX = touch.clientX - startX;
        imgY = touch.clientY - startY;
        updateTransform();
    });

    lightbox.addEventListener("touchend", () => {
        isDragging = false;
        setTransition(true);
    });

    // Close on background click
    lightbox.addEventListener("click", () => {
        if (isZoomed) {
            zoomOut();
            return;
        }
        lightbox.classList.remove("visible");
        setTimeout(() => {
            lightboxImg.src = "";
            resetZoom();
        }, 200);
    });

});
