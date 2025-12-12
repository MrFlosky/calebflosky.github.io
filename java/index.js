/* -------------------------------------------------------
   FLOATING + DETAIL ENGINE
------------------------------------------------------- */

const ANIMATION_SPEED = 1.75;
const TEXT_FLOAT_INTENSITY = 0.35;

/* =========================================
   PROJECT CONTENT CONFIG
========================================= */

// Add these entries (everything besides Spell Forge) into your PROJECT_CONTENT object

const PROJECT_CONTENT = {
  "Spell Forge": {
    url: "spell-forge",
    itchLink: "https://caleb-flosky.itch.io/spell-forge",
    titleImage: "/images/Spell Forge/SpellForge-Logo.png",
    main: {
      title: "Spell Forge",
      subtitle: "Gameplay & Networking Programming",
      body: "Online multiplayer top-down fantasy combat game built with Quantum / Unity. I focused on deterministic gameplay programming and a flexible spell system for artifacts and enchantments."
    },
    sections: [
      {
        images: ["/images/Spell Forge/technical-1.png", "/images/Spell Forge/variety-example.gif"],
        heading: "Modifying a Projectile's Launch Data",
        body: "Spell Forge's spell system is built around the player's pickups, your base spell, the \"Artifact\", and add-ons called \"Enchantments\". On spell fired, each enchantment directly adds an effect to the projectile fired. Each projectile starts with base stats from its TomeConfig, then it loops through and applies every equipped spell layer to modify those stats or attach new behavior.<br><br>Shown in the function \"ShootTome\", I am looping through each spell in order, which lets different effects stack or interact depending on how the player sets up their loadout. This is what allows the same tome to behave completely differently depending on what the player equips."
      },
      {
        images: ["/images/Spell Forge/technical-2.png", "/images/Spell Forge/return-example.gif"],
        heading: "Individual Enchantment Behavior",
        body: "All enchantments in Spell Forge inherit from a base SpellConfig, which gives each enchantment a consistent set of hooks to modify the projectile at different points in its lifecycle. OnFireSpell is the first one that gets called right when the projectile is fired. For this enchantment, Return, I use that hook to modify the projectile’s lifetime before it even enters flight, letting me time how long it will exist. Once the projectile is spawned and flying, the system begins calling OnSpellFlying every frame.<br><br>For this enchantment, I need access to the ProjectileAge component. ProjectileAge is added to each projectile fired if it comes from an artifact or enchantment that has its Required Age flag enabled. ProjectileAge is updated by a separate system that increments the age of every active projectile, letting projectiles react to how long they have been alive.<br><br>Since Return’s behavior depends on timing, I grab both BaseProjectile and ProjectileAge before doing anything else. The core logic of Return happens at the halfway point of the projectile’s lifetime. When the projectile’s age reaches half of its total lifetime, I mark it as returning, flip its base direction, and update its physics velocity so it cleanly travels back toward its caster. I also trigger an animation event on the player's HUD to show the return happening."
      },
      {
        images: ["/images/Spell Forge/technical-3.png", "/images/Spell Forge/shadow-example.gif"],
        heading: "Modular and Organized Projectile Data",
        body: "As Spell Forge continued to grow with an increasing number of enchantments and artifacts, a recurring issue became clear. The variables required by each projectile had become too large, with most of them redundant to a player's current build. The projectile data model was overloaded with fields that only applied to specific spell types, making the system inefficient and difficult to scale. To solve this, I moved to a component-based setup that gives each projectile only the data it actually needs.<br><br>For example, when a player fires a projectile with the Shadow tome, the system adds a ShadowTomeProjectileData component to that projectile as it is created. This allows the projectile to track the Shadow Artifact’s data, including its initial position and an explosion counter used for distance-based effects. By isolating data to only the projectiles that require it, the system remains modular, efficient, and scalable."
      }
    ]
  },

  "Miskatonic": {
    url: "miskatonic",
    itchLink: "https://caleb-flosky.itch.io/miskatonic",
    main: {
      title: "Miskatonic",
      subtitle: "Gameplay & Systems Programming",
      body: "Project made in MSU's MI 445 Game Design and Development I. You play as an ancient entity, Labgoroth, manipulating human psyches to cultivate fear. As the AI-controlled humans attempt to flee, your goal is to amplify their terror until Labgoroth fully manifests once fear reaches its peak."
    },
    sections: [
      {
        images: ["/images/Miskatonic/technical-1.png"],
        heading: "AI and Fear Escalation",
        body: "I programmed the AI to roam the maze using A-star navigation, allowing each NPC to wander around the maze and slowly navigate the environment. Because the player’s goal is to scare all four AI before the NPCs complete their objectives on the map, the AI constantly applying pressure forces the player to plan ahead rather than react moment to moment. The player must intentionally kite the AI into specific areas, control spacing between NPCs, and manipulate their movement paths to interrupt objectives and build fear efficiently. This turns the AI from simple obstacles into moving systems the player has to manage, making route planning, timing, and positioning central to successfully scaring all AI before they finish their tasks."
      },
      {
        images: ["/images/Miskatonic/technical-2.png"],
        heading: "Maze Generation",
        body: "I built the maze and room generation system so each playthrough produces a fresh layout while remaining fully traversable. The generation logic ensures all rooms are placed without collision, then connects them through a maze structure that guarantees valid paths between every space. By validating connectivity and spacing during generation, the layout stays readable for navigation while still introducing uncertainty in how routes unfold, which directly supports exploration, kiting, and AI movement throughout the map."
      }
    ]
  },

  "Marble Game": {
    url: "marble-game",
    itchLink: "https://caleb-flosky.itch.io/marble-game",
    main: {
      title: "Marble Game",
      subtitle: "Networking & Systems Programming",
      body: "Multiplayer zombie tag experience designed for planetarium projection. Players join using their phones as one becomes the zombie and others try to avoid infection until only one remains."
    },
    sections: [
      {
        images: ["/images/Marble-Game/technical-1.png","/images/Marble-Game/technical-3.jpg"],
        heading: "WebSocket Phone to Unity Connection",
        body: "I developed the WebSocket-to-Unity connection that allows phone inputs to reliably control players in real time, enabling fast-paced group sessions without sacrificing stability. Incoming messages are parsed, validated, and filtered by lobby code to ensure each client only responds to events intended for its active session. Player join and leave events are handled dynamically, keeping the lobby state synchronized as connections change. By decoupling network message handling from gameplay logic and enforcing lightweight validation on every update, the system maintains responsiveness under multiple simultaneous connections while preventing cross-lobby interference."
      },
      {
        images: ["/images/Marble-Game/technical-2.png"],
        heading: "Round-Based Game Loop",
        body: "I implemented the game loop to manage rounds and transitions, including infection state, win conditions, and clean resets so the experience stays fast and readable for a live audience. The system continuously evaluates player state during active gameplay, determines when a round-ending condition has been met, and triggers a controlled transition into the next phase without interrupting flow. Timers, player freezing, and team resets are handled centrally to ensure each round starts in a consistent state, allowing matches to resolve quickly while remaining easy to follow for spectators."
      }
    ]
  },

  "Crazy Cash! Needs to Pay Rent": {
    url: "crazy-cash-needs-to-pay-rent",
    itchLink: "https://willfff.itch.io/crazy-cash-needs-to-pay-rent",
    main: {
      title: "Crazy Cash! Needs to Pay Rent",
      subtitle: "Environment & Systems Programming",
      body: "Fast-paced dungeon crawler built in MSU's MI 445. Help Cash scrounge up rent money in 7 in-game days by exploring trap-filled, randomly generated dungeons under constant time pressure."
    },
    sections: [
      {
        images: ["/images/Crazy Cash/technical-1.png", "/images/Crazy Cash/generation-example.gif"],
        heading: "Auto-Generating Level System",
        body: "I implemented a procedural level generation system that constructs dungeons as a linked sequence of rooms, where each room is instantiated, aligned, and connected to its predecessor. Early versions of the system used more freeform placement, which caused rooms to collide or overlap in world space and made layouts unreliable. By switching to a chained generation approach, each room is positioned relative to the previous one and aligned before generation continues, preventing collisions and ensuring valid traversal.<br><br>In addition to the main path, the system supports optional side rooms that branch off from primary rooms. When spawning a side room, the generator evaluates which side of the room it can safely attach to, ensuring the new room does not clip into rooms generated above or below in the chain. This logic allows side content to be introduced without breaking spatial consistency, while still preserving controlled progression, predictable pacing beats such as exit and final rooms, and replayable layouts with tight encounter flow."
      },
      {
        images: ["/images/Crazy Cash/technical-2.png"],
        heading: "Day-Based Game Loop",
        body: "I built the day-based game loop that drives progression over 7 in-game days, tying exploration, resource pressure, and risk-reward decisions into the core structure of each run. Each day advances the global game state and pushes the player closer to a hard end condition, forcing meaningful tradeoffs between short-term gains and long-term survival. By enforcing a fixed timeline, the system creates natural tension, reinforces pacing, and gives player choices lasting consequences across the entire run."
      }
    ]
  },

  "Maybe Mayhem": {
    url: "maybe-mayhem",
    itchLink: "https://caleb-flosky.itch.io/maybe-mayhem",
    main: {
      title: "Maybe Mayhem",
      subtitle: "Gameplay Programming & Level Design",
      body: "Project made during the Spartasoft February 2024 Game Jam. Slapstick physics game centered on expressive animation, ragdolls, and obstacle-driven levels. Winner of the \"Best Level Design\" award for the jam."
    },
    sections: [
      {
        images: ["/images/Maybe Mayhem/technical-2.png"],
        heading: "Player Controls and Ragdoll",
        body: "I built the player movement system and tightly integrated it with a physics-driven ragdoll pipeline, allowing the character to switch cleanly between precise player control and fully simulated chaos. When ragdolling is triggered, I disable animation and player input, transfer the character’s current velocity into the ragdoll rigidbodies, and re-enable full physics so momentum carries through naturally. Jump behavior uses variable gravity scaling to support both short hops and full jumps, keeping movement responsive while still letting unexpected physics interactions take over. This balance ensures physics moments feel funny and emergent without ever breaking readability or player control."
      },
      {
        images: ["/images/Maybe Mayhem/technical-3.png"],
        heading: "Level Design",
        body: "I handled level design for the first and third levels, focusing on clear, readable obstacle setups that teach mechanics through play while steadily increasing pressure. Early sections emphasize momentum and timing, introducing moving hazards and spacing that reward confident movement, while later sections layer obstacles together to force quick decision-making and improvisation. The layouts are built to feel fair but punishing, encouraging players to fully commit to their actions."
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
   REFRESH LIGHTBOX CLICK BINDINGS (NEW)
------------------------------------------------------- */
function refreshLightboxBindings() {
    const lightbox = document.getElementById("global-lightbox");
    const lightboxImg = document.getElementById("global-lightbox-img");

    document.querySelectorAll(".clickable-img").forEach(img => {
        if (!img._lightboxBound) {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.classList.add("visible");
            });
            img._lightboxBound = true;
        }
    });
}

/* -------------------------------------------------------
   FLOATING ENGINE (UNCHANGED)
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
   IMAGE CYCLING ENGINE (UNCHANGED)
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

        floatWrapper.dataset.images = originalImg.dataset.images;
        floatWrapper.dataset.index = originalImg.dataset.index;
        floatWrapper.dataset.strength = originalImg.dataset.strength;
        floatWrapper.dataset.speed = originalImg.dataset.speed;

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
   PROJECT DETAIL VIEW (UPDATED WITH CLICKABLE IMAGES)
======================================================= */

function setupProjectDetailView() {
    const portfolio = document.getElementById("portfolio");
    if (!portfolio) return;

    const rows = Array.from(portfolio.querySelectorAll(".portfolio-row"));
    let detailOpen = false;
    let activeKey = null;

    function getProjectFromURL() {
        const params = new URLSearchParams(window.location.search);
        const projectURL = params.get("project");
        if (!projectURL) return null;
        const lower = projectURL.toLowerCase();

        return Object.keys(PROJECT_CONTENT).find(key => {
            const content = PROJECT_CONTENT[key];
            return content.url && content.url.toLowerCase() === lower;
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

            <!-- TOP ROW: left itch, right buttons -->
            <div class="portfolio-nav-row">

                <div class="portfolio-nav-left">
                    <a class="detail-itch-link" href="#" target="_blank" rel="noopener noreferrer" title="Play on Itch.io">
                        <img src="/images/itchio.png"
                            class="itchio-detail-icon floating"
                            data-strength="0.7"
                            data-speed="2.0">
                        <span>Play on Itch</span>
                    </a>
                </div>

                <div class="portfolio-nav-center"></div>

                <div class="portfolio-nav-right">
                    <a href="about.html" class="portfolio-nav-btn">About Me</a>
                    <a href="resume.html" class="portfolio-nav-btn">Resume</a>
                    <button type="button" class="portfolio-overlay-close">← Back to projects</button>
                </div>

            </div>

            <!-- Detail grid content is inserted here -->
            <div class="project-detail-grid"></div>

            <!-- BOTTOM ROW: center itch (text underneath), right buttons -->
            <div class="portfolio-nav-row">

                <div class="portfolio-nav-left"></div>

                <div class="portfolio-nav-center">
                    <a class="detail-itch-link detail-itch-link--stack" href="#" target="_blank" rel="noopener noreferrer" title="Play on Itch.io">
                        <img src="/images/itchio.png"
                            class="itchio-detail-icon floating"
                            data-strength="0.7"
                            data-speed="2.0">
                        <span>Play on Itch</span>
                    </a>
                </div>

                <div class="portfolio-nav-right">
                    <a href="about.html" class="portfolio-nav-btn">About Me</a>
                    <a href="resume.html" class="portfolio-nav-btn">Resume</a>
                    <button type="button" class="portfolio-overlay-close">← Back to projects</button>
                </div>

            </div>

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
        if (updateHistory) {
            const url = new URL(window.location.href);
            url.searchParams.delete("project");
            history.pushState({}, "", url.toString());
        }

        const OVERLAY_FADE_DURATION = 350;
        const GRID_FADE_DURATION = 250;

        // 1. Start fading overlay out
        portfolio.classList.remove("detail-overlay-visible");

        setTimeout(() => {
            // 2. Put grid BACK into faded state
            portfolio.classList.add("detail-grid-fading");
            portfolio.classList.remove("detail-grid-hidden");

            requestAnimationFrame(() => {
                // 3. Fade grid in
                portfolio.classList.remove("detail-grid-fading");

                // 4. After grid fade finishes, fully hide overlay
                setTimeout(() => {
                    overlay.style.display = "none";
                    detailOpen = false;
                    activeKey = null;
                }, GRID_FADE_DURATION);
            });
        }, OVERLAY_FADE_DURATION);
    }


    function buildDetailGrid(card, key) {
        const grid = overlay.querySelector(".project-detail-grid");
        grid.innerHTML = "";

        const content = PROJECT_CONTENT[key];

        // Update the top-left + bottom-left itch links
        overlay.querySelectorAll(".detail-itch-link").forEach(a => {
            if (content.itchLink) {
                a.href = content.itchLink;
                a.style.display = "inline-flex";
            } else {
                a.style.display = "none";
            }
        });


        const mainRow = document.createElement("div");
        mainRow.className = "detail-row detail-row--image-left";

        const mainMedia = document.createElement("div");
        mainMedia.className = "detail-row-media";

        const mainText = document.createElement("div");
        mainText.className = "detail-row-text";

        const titleSlot = document.createElement("div");
        titleSlot.className = "detail-row-title";

        // TITLE IMAGE OR TEXT
        if (content.titleImage) {
            const img = document.createElement("img");
            img.src = content.titleImage;
            img.alt = content.main.title;
            img.className = "detail-title-image";

            img.dataset.strength = "0.12";
            img.dataset.speed = "0.9";

            titleSlot.appendChild(img);
        } else {
            const h = document.createElement("h3");
            h.className = "detail-row-heading detail-row-heading-main";
            h.textContent = content.main.title;
            titleSlot.appendChild(h);
        }
        
        // append ONCE
        mainRow.appendChild(titleSlot);



        // SUBTITLE + BODY
        if (content.main.subtitle) {
            const sub = document.createElement("p");
            sub.className = "detail-row-subheading detail-row-subheading-main";
            sub.textContent = content.main.subtitle;
            mainText.appendChild(sub);
        }

        const body = document.createElement("p");
        body.className = "detail-row-body detail-row-body-main";
        body.innerHTML = content.main.body;
        mainText.appendChild(body);

        // MAIN IMAGE (copied from project card)
        const sourceWrapper =
            card.querySelector(".project-img-wrapper") ||
            card.querySelector(".cycle-img") ||
            card.querySelector(".project-img");

        let imagesAttr = "";
        let startIndex = "0";
        let strength = "0.08";
        let speed = "0.8";

        if (sourceWrapper) {
            imagesAttr = sourceWrapper.dataset.images || "";
            startIndex = sourceWrapper.dataset.index || "0";
            strength = sourceWrapper.dataset.strength || "0.08";
            speed = sourceWrapper.dataset.speed || "0.8";
        }

        if (imagesAttr) {
            const overlayImg = document.createElement("img");
            overlayImg.className = "project-img floating cycle-img clickable-img";
            overlayImg.dataset.images = imagesAttr;
            overlayImg.dataset.index = startIndex;
            overlayImg.dataset.strength = strength;
            overlayImg.dataset.speed = speed;

            overlayImg.src = imagesAttr.split(",")[0].trim();
            mainMedia.appendChild(overlayImg);

        } else if (sourceWrapper) {
            const innerImg = sourceWrapper.querySelector("img") || sourceWrapper;
            const overlayImg = document.createElement("img");
            overlayImg.className = "project-img floating clickable-img";
            overlayImg.src = innerImg.src;
            mainMedia.appendChild(overlayImg);
        }



        mainRow.appendChild(mainMedia);
        mainRow.appendChild(mainText);
        grid.appendChild(mainRow);

        // SECTION IMAGES
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

            const textInner = document.createElement("div");
            textInner.className = "detail-text-inner";
            text.appendChild(textInner);

            // MULTI-IMAGE SUPPORT
            if (section.images && Array.isArray(section.images)) {
                // APPLY VERTICAL STACK CLASS
                media.classList.add("multi-image-column");

                const firstImageWrapper = document.createElement("div");
                firstImageWrapper.className = "first-image-row";

                const firstImg = document.createElement("img");
                firstImg.className = "project-img clickable-img";
                firstImg.src = section.images[0];

                firstImageWrapper.appendChild(firstImg);
                media.appendChild(firstImageWrapper);

                // Remaining images (stacked below)
                section.images.slice(1).forEach(src => {
                    const secImg = document.createElement("img");
                    secImg.className = "project-img clickable-img";
                    secImg.src = src;
                    media.appendChild(secImg);
                });

            }


            // Single image fallback
            else if (section.image) {
                const secImg = document.createElement("img");
                secImg.className = "project-img clickable-img";
                secImg.src = section.image;
                media.appendChild(secImg);
            }


            if (section.heading) {
                const secHead = document.createElement("h4");
                secHead.className = "detail-row-heading";
                secHead.textContent = section.heading;
                text.appendChild(secHead);
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
                el._floatIntensity = parseFloat(el.dataset.strength) || 1.5;
                el._floatSpeed = parseFloat(el.dataset.speed) || 1.0;
                startRandomFloat(el);
            }
        });

        // 🔥 MAKE ALL IMAGES CLICKABLE FOR LIGHTBOX
        refreshLightboxBindings();
    }

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

        if (isSwitching) {
            portfolio.classList.add("detail-overlay-visible");
            detailOpen = true;
            activeKey = key;
            return;
        }

        const GRID_HIDE_DELAY = 300;

        portfolio.classList.add("detail-grid-fading");

        setTimeout(() => {
            portfolio.classList.add("detail-grid-hidden");
            portfolio.classList.add("detail-overlay-visible");
        }, GRID_HIDE_DELAY);

        detailOpen = true;
        activeKey = key;
    }

    // CARD CLICK HANDLERS
    rows.forEach(row => {
        row.querySelectorAll(".project-simple").forEach(card => {
            card.addEventListener("click", () => {
                const titleEl = card.querySelector("h3");
                const key = titleEl.textContent.trim();

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

    window.addEventListener("popstate", () => {
        const project = getProjectFromURL();
        if (!project) {
            if (detailOpen) closeDetail({ updateHistory: false });
            return;
        }

        const card = Array.from(document.querySelectorAll(".project-simple"))
            .find(c => c.querySelector("h3").textContent.trim().toLowerCase() === project.toLowerCase());

        if (card) {
            openDetail(card, project, { updateHistory: false, isSwitching: detailOpen });
        }
    });

    const initial = getProjectFromURL();
    if (initial) {
        const card = Array.from(document.querySelectorAll(".project-simple"))
            .find(c => c.querySelector("h3").textContent.trim().toLowerCase() === initial.toLowerCase());

        if (card) {
            history.replaceState({ project: initial }, "", window.location.href);
            openDetail(card, initial, { updateHistory: false, isSwitching: false });
        }
    }
}
