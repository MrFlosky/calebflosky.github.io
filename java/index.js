/* -------------------------------------------------------
   FLOATING + DETAIL ENGINE
------------------------------------------------------- */

const ANIMATION_SPEED = 1.75;
const TEXT_FLOAT_INTENSITY = 0.35;

/* =========================================
   PROJECT CONTENT CONFIG
========================================= */

const PROJECT_CONTENT = {
    "Spell Forge": {
        url: "spell-forge",
        main: {
            title: "Spell Forge",
            subtitle: "Gameplay Programming & Spell System Design",
            body: "Online multiplayer top-down fantasy combat game built with Quantum / Unity. I focused on deterministic gameplay programming and a flexible spell system for artifacts and enchantments."
        },
        sections: [
            {
                image: "/images/Spell Forge/technical-1.png",
                heading: "Modifying a Projectile's Launch Data",
                body: "Spellforge's spell system is built around the player's pickups, your base spell, the \"Artifact\", and add-ons called \"Enchantments\". On spell fired, each enchantment directly adds an effect to the projectile fired. Each projectile starts with base stats from its TomeConfig, then it loops through and applies every equipped spell layer to modify those stats or attach new behavior.<br><br>Shown in the function \"ShootTome\", I am looping through each spell in order, which lets different effects stack or interact depending on how the player sets up their loadout. This is what allows the same tome to behave completely differently depending on what the player equips."
            },
            {
                image: "/images/Spell Forge/technical-2.png",
                heading: "Individual Enchantment Behavior",
                body: "All enchantments in Spellforge inherit from a base SpellConfig, which gives each enchantment a consistent set of hooks to modify the projectile at different points in its lifecycle. OnFireSpell is the first one that gets called right when the projectile is fired. For this enchantment, Return, I use that hook to modify the projectile’s lifetime before it even enters flight, letting me time how long it will exist. Once the projectile is spawned and flying, the system begins calling OnSpellFlying every frame.<br><br>For this enchantment, I need access to the ProjectileAge component. ProjectileAge is added to each projectile fired if it comes from an artifact or enchantment that has its Required Age flag enabled. ProjectileAge is updated by a separate system that increments the age of every active projectile, letting projectiles react to how long they have been alive.<br><br>Since Return’s behavior depends on timing, I grab both BaseProjectile and ProjectileAge before doing anything else. The core logic of Return happens at the halfway point of the projectile’s lifetime. When the projectile’s age reaches half of its total lifetime, I mark it as returning, flip its base direction, and update its physics velocity so it cleanly travels back toward its caster. I also trigger an animation event on the player's HUD to show the return happening."
            },
            {
                image: "/images/Spell Forge/technical-3.png",
                heading: "Modular and Organized Projectile Data",
                body: "As Spellforge continued to grow with an increasing number of enchantments and artifacts, a recurring issue became clear. The variables required by each projectile had become too large, with most of them redundant to a player's current build. The projectile data model was overloaded with fields that only applied to specific spell types, making the system inefficient and difficult to scale. To solve this, I moved to a component-based setup that gives each projectile only the data it actually needs.<br><br>For example, when a player fires a projectile with the Shadow tome, the system adds a ShadowTomeProjectileData component to that projectile as it is created. This allows the projectile to track the Shadow Artifact’s data, including its initial position and an explosion counter used for distance-based effects. By isolating data to only the projectiles that require it, the system remains modular, efficient, and scalable."
            }
        ]
    },

    "Marble Game": {
        url: "marble-game",
        main: {
            title: "Marble Game",
            subtitle: "Networking & Systems Programming",
            body: "Physics-driven multiplayer marble arena. I focused on networking, deterministic state sync, and systems programming for movement, collisions, and scoring."
        },
        sections: [
            {
                image: "/images/Marble-Game/img2.png",
                heading: "Networking",
                body: "Designed systems to keep player positions, velocities, and collisions consistent across clients while keeping the controls feeling responsive."
            }
        ]
    },

    "Crazy Cash! Needs to Pay Rent": {
        url: "crazy-cash",
        main: {
            title: "Crazy Cash! Needs to Pay Rent",
            subtitle: "Environment & Systems Programming",
            body: "Chaotic prototype centered on money, rent, and environmental storytelling. I handled level logic, interactables, and the systems that make the world feel reactive."
        },
        sections: [
            {
                image: "/images/Crazy Cash/img1.png",
                heading: "Worldbuilding",
                body: "Focused on how props, triggers, and systems combine to tell the story of a character scrambling to pay rent in a highly interactive environment."
            }
        ]
    },

    "Grave": {
        url: "grave",
        main: {
            title: "Grave",
            subtitle: "Gameplay Programming",
            body: "Atmospheric project focused on combat feel, enemy behavior, and pacing. I worked on core gameplay systems and iteration on responsiveness."
        },
        sections: [
            {
                image: "/images/Grave/img2.png",
                heading: "Combat Feel",
                body: "Iterated on attack timings, feedback, and enemy behavior so encounters feel deliberate and readable without losing tension."
            },
            {
                image: "/images/Grave/img3.png",
                heading: "Systems",
                body: "Built modular gameplay logic so new enemies or interactions could be added quickly without rewriting existing behavior."
            }
        ]
    },

    "Maybe Mayhem": {
        url: "maybe-mayhem",
        main: {
            title: "Maybe Mayhem",
            subtitle: "Animation · Ragdoll · Level Design · Player Controls",
            body: "Slapstick physics game with ragdolls, expressive animation, and playful level design. I handled player controls, ragdoll setups, and sandboxes for goofy emergent behavior."
        },
        sections: [
            {
                image: "/images/Maybe Mayhem/img2.png",
                heading: "Ragdoll & Animation",
                body: "Hooked up ragdoll logic with animation states so characters smoothly transition from controlled movement into ridiculous physics-driven chaos."
            }
        ]
    }
};

/* -------------------------------------------------------
   DOM READY
------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    initializeImageCycling();

    document.querySelectorAll(".floating").forEach(el => {
        el._floatIntensity = el.dataset.strength ? parseFloat(el.dataset.strength) : 1.5;
        el._floatSpeed = el.dataset.speed ? parseFloat(el.dataset.speed) : 1.0;
        startRandomFloat(el);
    });

    document.querySelectorAll(".header-text").forEach(link => {
        link._floatIntensity = TEXT_FLOAT_INTENSITY;
        link._floatSpeed = link.dataset.speed ? parseFloat(link.dataset.speed) : 1.0;

        link.addEventListener("mouseenter", () => startRandomFloat(link));
        link.addEventListener("mouseleave", () => stopFloating(link));
    });

    setupProjectDetailView();
});

/* -------------------------------------------------------
   FLOATING ENGINE
------------------------------------------------------- */
function stopFloating(el) {
    el._stopFloating = true;
    el.style.transition = "transform 0.35s ease-out";
    el.style.transform = "translate(0px, 0px) rotate(0deg) scale(1)";
    setTimeout(() => el.style.transition = "", 400);
}

function startRandomFloat(el) {
    if (el._isFloating) return;
    el._isFloating = true;
    el._stopFloating = false;

    const intensity = el._floatIntensity ?? 1.0;
    const speed = el._floatSpeed ?? 1.0;

    let rot = 0, scale = 1, x = 0, y = 0;
    let targetRot = 0, targetScale = 1, targetX = 0, targetY = 0;

    let tRot = 1, tScale = 1, tMove = 1;
    let durRot = 2, durScale = 2, durMove = 2;

    let rotDir = Math.random() < 0.5 ? 1 : -1;
    let scaleDir = Math.random() < 0.5 ? 1 : -1;
    let moveDirX = Math.random() < 0.5 ? 1 : -1;
    let moveDirY = Math.random() < 0.5 ? 1 : -1;

    const rand = (a, b) => Math.random() * (b - a) + a;
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = t => t * t * (3 - 2 * t);

    function animate() {
        if (el._stopFloating) {
            el._isFloating = false;
            return;
        }

        requestAnimationFrame(animate);

        if (tRot >= 1) {
            tRot = 0;
            durRot = rand(5.5, 7.0) / (ANIMATION_SPEED * speed);
            rotDir *= -1;
            targetRot = (rotDir === 1 ? rand(5, 15) : rand(-15, -5)) * intensity;
        }
        tRot += (1 / 60) / durRot;
        const curRot = lerp(rot, targetRot, smoothstep(Math.min(1, tRot)));
        if (tRot >= 1) rot = targetRot;

        if (tScale >= 1) {
            tScale = 0;
            durScale = rand(7.0, 9.5) / (ANIMATION_SPEED * speed);
            scaleDir *= -1;
            const s = (scaleDir === 1 ? rand(1.05, 1.12) : rand(0.92, 0.97));
            targetScale = 1 + (s - 1) * intensity;
        }
        tScale += (1 / 60) / durScale;
        const curScale = lerp(scale, targetScale, smoothstep(Math.min(1, tScale)));
        if (tScale >= 1) scale = targetScale;

        if (tMove >= 1) {
            tMove = 0;
            durMove = rand(6.2, 8.2) / (ANIMATION_SPEED * speed);

            moveDirX *= -1;
            moveDirY *= -1;

            targetX = (moveDirX === 1 ? rand(0.2, 0.7) : rand(-0.7, -0.2)) * intensity;
            targetY = (moveDirY === 1 ? rand(0.2, 0.7) : rand(-0.7, -0.2)) * intensity;
        }
        tMove += (1 / 60) / durMove;

        const curX = lerp(x, targetX, smoothstep(Math.min(1, tMove)));
        const curY = lerp(y, targetY, smoothstep(Math.min(1, tMove)));
        if (tMove >= 1) {
            x = targetX;
            y = targetY;
        }

        el.style.transform =
            `translate(${curX}px, ${curY}px)
             rotate(${curRot}deg)
             scale(${curScale})`;
    }

    requestAnimationFrame(animate);
}

/* -------------------------------------------------------
   IMAGE CYCLING ENGINE
------------------------------------------------------- */
function initializeImageCycling() {
    const imgs = Array.from(document.querySelectorAll(".cycle-img"));

    imgs.forEach(originalImg => {
        const frames = (originalImg.dataset.images || "")
            .split(",")
            .map(x => x.trim())
            .filter(x => x.length > 0);

        if (frames.length <= 1) return;

        let index = parseInt(originalImg.dataset.index || "0", 10);
        if (isNaN(index) || index < 0 || index >= frames.length) index = 0;

        const mask = document.createElement("div");
        mask.className = "cycle-mask";

        const track = document.createElement("div");
        track.className = "cycle-track cycle-track--double";
        track.style.transform = "translateX(0)";

        const baseClasses = Array.from(originalImg.classList)
            .filter(c => c !== "floating" && c !== "cycle-img");

        const imgCurrent = document.createElement("img");
        imgCurrent.className = baseClasses.join(" ");
        imgCurrent.style.width = "50%";
        imgCurrent.style.flex = "0 0 50%";

        const imgNext = document.createElement("img");
        imgNext.className = baseClasses.join(" ");
        imgNext.style.width = "50%";
        imgNext.style.flex = "0 0 50%";

        imgCurrent.src = frames[index];
        const nextIndex = (index + 1) % frames.length;
        imgNext.src = frames[nextIndex];

        track.appendChild(imgCurrent);
        track.appendChild(imgNext);
        mask.appendChild(track);

        const floatWrapper = document.createElement("div");
        floatWrapper.className = "project-img-wrapper floating";

        if (originalImg.dataset.strength)
            floatWrapper.dataset.strength = originalImg.dataset.strength;
        if (originalImg.dataset.speed)
            floatWrapper.dataset.speed = originalImg.dataset.speed;
        if (originalImg.dataset.images)
            floatWrapper.dataset.images = originalImg.dataset.images;
        if (originalImg.dataset.index)
            floatWrapper.dataset.index = originalImg.dataset.index;

        floatWrapper.appendChild(mask);

        originalImg.replaceWith(floatWrapper);

        const intervalMs = 7500;
        const slideDuration = 450;

        setInterval(() => {
            const upcomingIndex = (index + 1) % frames.length;
            const afterUpcomingIndex = (upcomingIndex + 1) % frames.length;

            imgCurrent.src = frames[index];
            imgNext.src = frames[upcomingIndex];

            track.style.transition = `transform ${slideDuration}ms ease-out`;
            track.style.transform = "translateX(-50%)";

            setTimeout(() => {
                track.style.transition = "none";
                track.style.transform = "translateX(0)";

                index = upcomingIndex;

                imgCurrent.src = frames[index];
                imgNext.src = frames[afterUpcomingIndex];

                track.offsetHeight;
            }, slideDuration);

        }, intervalMs);
    });
}

/* =======================================================
   PROJECT DETAIL VIEW + URL State Support (using ?project=)
======================================================= */

function setupProjectDetailView() {
    const portfolio = document.getElementById("portfolio");
    if (!portfolio) return;

    const rows = Array.from(portfolio.querySelectorAll(".portfolio-row"));
    let detailOpen = false;
    let activeKey = null;

    // Read project name from ?project= param
    function getProjectFromURL() {
        const path = window.location.pathname;

        // Match /project/whatever
        const match = path.match(/\/project\/([^\/]+)/);
        if (!match) return null;

        const projectURL = match[1].toLowerCase();

        return Object.keys(PROJECT_CONTENT).find(key => {
            return PROJECT_CONTENT[key].url.toLowerCase() === projectURL;
        }) || null;
    }



    const overlay = createOverlay(portfolio);

    function createOverlay(portfolioEl) {
        let overlayEl = portfolioEl.querySelector(".portfolio-overlay");
        if (overlayEl) return overlayEl;

        overlayEl = document.createElement("div");
        overlayEl.className = "portfolio-overlay";
        overlayEl.innerHTML = `
            <div class="portfolio-overlay-inner">
                <button type="button" class="portfolio-overlay-close">← Back to projects</button>
                <div class="project-detail-grid"></div>
                <button type="button" class="portfolio-overlay-close portfolio-overlay-close-bottom">← Back to projects</button>
            </div>
        `;
        portfolioEl.appendChild(overlayEl);

        overlayEl.style.display = "none";

        overlayEl.querySelectorAll(".portfolio-overlay-close").forEach(btn => {
            btn.addEventListener("click", () => closeDetail({ updateHistory: true }));
        });

        return overlayEl;
    }

    function closeDetail({ updateHistory }) {
        // Only push a new history entry when user actively closes
        if (updateHistory) {
            const url = new URL(window.location.href);
            url.searchParams.delete("project");
            history.pushState({}, "", url.toString());
        }

        const OVERLAY_FADE_DURATION = 350;

        portfolio.classList.remove("detail-overlay-visible");

        setTimeout(() => {
            overlay.style.display = "none";

            portfolio.classList.remove("detail-grid-hidden");

            requestAnimationFrame(() => {
                portfolio.classList.remove("detail-grid-fading");

                detailOpen = false;
                activeKey = null;
            });
        }, OVERLAY_FADE_DURATION);
    }

    function buildDetailGrid(card, key) {
        const grid = overlay.querySelector(".project-detail-grid");
        grid.innerHTML = "";

        const content = PROJECT_CONTENT[key] || {
            main: {
                title: key || "Project",
                subtitle: card.querySelector("p")?.textContent.trim() || "",
                body: "More details coming soon."
            },
            sections: []
        };

        const mainRow = document.createElement("div");
        mainRow.className = "detail-row detail-row--image-left";

        const mainMedia = document.createElement("div");
        mainMedia.className = "detail-row-media";

        const mainText = document.createElement("div");
        mainText.className = "detail-row-text";

        const sourceWrapper =
            card.querySelector(".project-img-wrapper") ||
            card.querySelector(".cycle-img") ||
            card.querySelector(".project-img");

        let imagesAttr = "";
        let startIndex = "0";
        let strength = "0.08";
        let speed = "0.8";

        if (sourceWrapper) {
            if (sourceWrapper.dataset.images)
                imagesAttr = sourceWrapper.dataset.images;
            if (sourceWrapper.dataset.index)
                startIndex = sourceWrapper.dataset.index;
            if (sourceWrapper.dataset.strength)
                strength = sourceWrapper.dataset.strength;
            if (sourceWrapper.dataset.speed)
                speed = sourceWrapper.dataset.speed;
        }

        if (imagesAttr) {
            const overlayImg = document.createElement("img");
            overlayImg.className = "project-img floating cycle-img";
            overlayImg.dataset.images = imagesAttr;
            overlayImg.dataset.index = startIndex;
            overlayImg.dataset.strength = strength;
            overlayImg.dataset.speed = speed;

            const firstFrame = imagesAttr.split(",")[0].trim();
            overlayImg.src = firstFrame;

            mainMedia.appendChild(overlayImg);
        } else if (sourceWrapper) {
            const innerImg = sourceWrapper.querySelector("img") || sourceWrapper;
            const overlayImg = document.createElement("img");
            overlayImg.className = "project-img floating";
            overlayImg.src = innerImg.src;
            overlayImg.dataset.strength = strength;
            overlayImg.dataset.speed = speed;
            mainMedia.appendChild(overlayImg);
        }

        const h = document.createElement("h3");
        h.className = "detail-row-heading detail-row-heading-main";
        h.textContent = content.main.title;

        const sub = document.createElement("p");
        sub.className = "detail-row-subheading";
        sub.textContent = content.main.subtitle || "";

        const body = document.createElement("p");
        body.className = "detail-row-body";
        body.innerHTML = content.main.body || "";

        mainText.appendChild(h);
        if (content.main.subtitle) mainText.appendChild(sub);
        mainText.appendChild(body);

        mainRow.appendChild(mainMedia);
        mainRow.appendChild(mainText);
        grid.appendChild(mainRow);

        (content.sections || []).forEach((section, idx) => {
            const row = document.createElement("div");
            const rowIndex = idx + 1;
            const sideClass = (rowIndex % 2 === 0)
                ? "detail-row--image-left"
                : "detail-row--image-right";

            row.className = `detail-row detail-row--secondary ${sideClass}`;

            const media = document.createElement("div");
            media.className = "detail-row-media";

            const text = document.createElement("div");
            text.className = "detail-row-text";

            if (section.image) {
                const secImg = document.createElement("img");
                secImg.className = "project-img";
                secImg.src = section.image;
                media.appendChild(secImg);
            }

            if (section.heading) {
                const secHead = document.createElement("h4");
                secHead.className = "detail-row-heading";
                secHead.textContent = section.heading;
                text.appendChild(secHead);
            }

            if (section.subheading) {
                const secSub = document.createElement("p");
                secSub.className = "detail-row-subheading";
                secSub.textContent = section.subheading;
                text.appendChild(secSub);
            }

            if (section.body) {
                const secBody = document.createElement("p");
                secBody.className = "detail-row-body";
                secBody.innerHTML = section.body;
                text.appendChild(secBody);
            }

            row.appendChild(media);
            row.appendChild(text);
            grid.appendChild(row);
        });

        initializeImageCycling();

        overlay.querySelectorAll(".floating").forEach(el => {
            if (!el._isFloating) {
                el._floatIntensity = el.dataset.strength ? parseFloat(el.dataset.strength) : 1.5;
                el._floatSpeed = el.dataset.speed ? parseFloat(el.dataset.speed) : 1.0;
                startRandomFloat(el);
            }
        });
    }

    /**
     * openDetail
     * updateHistory = true  → user clicked card (push ?project=...)
     * updateHistory = false → popstate/init: DOM only
     */
    function openDetail(card, key, { updateHistory, isSwitching }) {
        if (updateHistory) {
            const urlObj = new URL(window.location.href);
            const content = PROJECT_CONTENT[key];

            if (content && content.url) {
                urlObj.searchParams.set("project", content.url);
                history.pushState({ project: key }, "", urlObj.toString());
            }
        }


        buildDetailGrid(card, key);

        overlay.style.display = "block";

        const GRID_FADE_DURATION = 250;

        if (isSwitching) {
            portfolio.classList.add("detail-overlay-visible");
            detailOpen = true;
            activeKey = key;
            return;
        }

        portfolio.classList.add("detail-grid-fading");

        setTimeout(() => {
            portfolio.classList.add("detail-grid-hidden");
            portfolio.classList.add("detail-overlay-visible");
        }, GRID_FADE_DURATION);

        detailOpen = true;
        activeKey = key;
    }

    // CLICK HANDLERS
    rows.forEach(row => {
        row.querySelectorAll(".project-simple").forEach(card => {
            card.addEventListener("click", () => {
                const titleEl = card.querySelector("h3");
                const key = titleEl ? titleEl.textContent.trim() : "";

                if (!detailOpen) {
                    openDetail(card, key, { updateHistory: true, isSwitching: false });
                    return;
                }

                if (detailOpen && key === activeKey) {
                    closeDetail({ updateHistory: true });
                    return;
                }

                openDetail(card, key, { updateHistory: true, isSwitching: true });
            });
        });
    });

    // BACK/FORWARD BUTTON SUPPORT
    window.addEventListener("popstate", () => {
        const project = getProjectFromURL();

        // No project in URL → show grid, hide overlay, but DO NOT pushState
        if (!project) {
            if (detailOpen) {
                closeDetail({ updateHistory: false });
            }
            return;
        }

        // Project in URL → open that detail, but DO NOT pushState
        const card = Array.from(document.querySelectorAll(".project-simple"))
            .find(c => c.querySelector("h3")?.textContent.trim().toLowerCase() === project.toLowerCase());

        if (card) {
            openDetail(card, project, { updateHistory: false, isSwitching: detailOpen });
        }
    });

    // AUTO-OPEN ON PAGE LOAD IF URL HAS ?project=
    const initial = getProjectFromURL();
    if (initial) {
        const card = Array.from(document.querySelectorAll(".project-simple"))
            .find(c => c.querySelector("h3")?.textContent.trim().toLowerCase() === initial.toLowerCase());

        if (card) {
            // First state: whatever URL is already loaded
            history.replaceState({ project: initial }, "", window.location.href);
            openDetail(card, initial, { updateHistory: false, isSwitching: false });
        }
    }
}
