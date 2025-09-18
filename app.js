// Asegúrate de que GSAP y ScrollTrigger estén cargados
gsap.registerPlugin(ScrollTrigger);

const networkContainer = document.querySelector('.network-container');
const nodeCount = 50;
const nodes = [];
const lines = [];

// Crear nodos y líneas aleatorios
for (let i = 0; i < nodeCount; i++) {
    const node = document.createElement('div');
    node.classList.add('network-node');
    networkContainer.appendChild(node);
    nodes.push(node);

    gsap.set(node, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random()
    });
}

// Conectar nodos cercanos con líneas
nodes.forEach((node, i) => {
    for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(Math.pow(gsap.getProperty(node, 'x') - gsap.getProperty(nodes[j], 'x'), 2) + Math.pow(gsap.getProperty(node, 'y') - gsap.getProperty(nodes[j], 'y'), 2));
        if (dist < 200) {
            const line = document.createElement('div');
            line.classList.add('network-line');
            networkContainer.appendChild(line);
            lines.push(line);

            const angle = Math.atan2(gsap.getProperty(nodes[j], 'y') - gsap.getProperty(node, 'y'), gsap.getProperty(nodes[j], 'x') - gsap.getProperty(node, 'x')) * 180 / Math.PI;
            gsap.set(line, {
                x: gsap.getProperty(node, 'x'),
                y: gsap.getProperty(node, 'y'),
                width: dist,
                rotation: angle
            });
        }
    }
});

// Crear el escudo
const shield = document.createElement('div');
shield.classList.add('shield');
networkContainer.appendChild(shield);

// Animación de los nodos
gsap.to(nodes, {
    x: 'random(0, ' + window.innerWidth + ')',
    y: 'random(0, ' + window.innerHeight + ')',
    ease: 'power1.inOut',
    stagger: 0.1,
    repeat: -1,
    yoyo: true
});

// Animación del escudo al hacer scroll
gsap.to(shield, {
    scale: 1,
    opacity: 1,
    ease: 'power3.inOut',
    scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});