document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded");

    // LOADING SCREEN (Spinning Cube)
    const canvas = document.getElementById("cube-canvas");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(150, 150);

    const geometry = new THREE.BoxGeometry();
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const cube = new THREE.LineSegments(edges, material);
    scene.add(cube);

    function animateCube() {
        requestAnimationFrame(animateCube);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animateCube();

    // Hide loading screen and show content
    setTimeout(() => {
        document.getElementById("loading-screen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("main-content").style.display = "block";
        }, 500);
    }, 1500);

    // BIG CUBE BELOW BIO
    const bioCanvas = document.getElementById("bio-cube");
    function setupBioCube() {
        if (!bioCanvas || bioCanvas.clientWidth === 0 || bioCanvas.clientHeight === 0) {
            setTimeout(setupBioCube, 100);
            return;
        }

        const bioScene = new THREE.Scene();
        const bioCamera = new THREE.PerspectiveCamera(50, bioCanvas.clientWidth / bioCanvas.clientHeight, 0.1, 1000);
        bioCamera.position.z = 22; // Moves cube back to prevent cutting

        const bioRenderer = new THREE.WebGLRenderer({ canvas: bioCanvas, alpha: true });
        bioRenderer.setSize(bioCanvas.clientWidth, bioCanvas.clientHeight);

        const bioGeometry = new THREE.BoxGeometry(7, 7, 7);
        const bioEdges = new THREE.EdgesGeometry(bioGeometry);
        const bioMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const bioCube = new THREE.LineSegments(bioEdges, bioMaterial);

        bioCube.position.y = -4; // Moves cube downwards
        bioScene.add(bioCube);

        function animateBioCube() {
            requestAnimationFrame(animateBioCube);
            bioCube.rotation.x += 0.008;
            bioCube.rotation.y += 0.008;
            bioRenderer.render(bioScene, bioCamera);
        }
        animateBioCube();

        // RESIZE FIX
        window.addEventListener("resize", () => {
            bioCanvas.width = bioCanvas.clientWidth;
            bioCanvas.height = bioCanvas.clientHeight;
            bioCamera.aspect = bioCanvas.clientWidth / bioCanvas.clientHeight;
            bioCamera.updateProjectionMatrix();
            bioRenderer.setSize(bioCanvas.clientWidth, bioCanvas.clientHeight);
        });
    }
    setupBioCube();

    // DISCORD POPUP
    document.querySelector(".discord-btn").addEventListener("click", () => {
        document.getElementById("discord-popup").style.display = "block";
    });

    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("discord-popup").style.display = "none";
    });

    // INTERACTIVE BACKGROUND
    const bgCanvas = document.getElementById("background");
    const ctx = bgCanvas.getContext("2d");

    function resizeBackground() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeBackground();
    window.addEventListener("resize", resizeBackground);

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * 1.5 - 0.75
        });
    }

    function drawBackground() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        ctx.fillStyle = "white";
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x > bgCanvas.width || p.x < 0) p.speedX *= -1;
            if (p.y > bgCanvas.height || p.y < 0) p.speedY *= -1;
        });
        requestAnimationFrame(drawBackground);
    }
    drawBackground();

    // BACKGROUND MUSIC 🎵
    const backgroundMusic = document.getElementById("bg-music");

    function playMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.volume = 0.25; // Set volume (0.0 to 1.0)
            backgroundMusic.play().catch(error => console.log("Autoplay blocked:", error));
        }
    }

    // Play music on first click (fixes autoplay issues)
    document.addEventListener("click", playMusic);
});

