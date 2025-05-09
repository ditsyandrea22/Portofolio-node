// Sample node data
const nodesData = {
    mainnet: [
        {
            name: "Ethereum Mainnet",
            type: "Full Archive Node",
            version: "Geth v1.12.0",
            status: "online",
            sync: "100%",
            peers: 42,
            block: 17543245,
            rpc: "Enabled",
            endpoint: "eth.ditsyandrea.com",
            since: "2021-03-15",
            uptime: "99.98%"
        },
        {
            name: "Polygon PoS",
            type: "Full Node",
            version: "Bor v0.4.2",
            status: "online",
            sync: "100%",
            peers: 35,
            block: 38765432,
            rpc: "Enabled",
            endpoint: "polygon.ditsyandrea.com",
            since: "2022-01-10",
            uptime: "99.95%"
        },
        {
            name: "Binance Smart Chain",
            type: "Archive Node",
            version: "Geth v1.1.8",
            status: "online",
            sync: "100%",
            peers: 28,
            block: 28765432,
            rpc: "Enabled",
            endpoint: "bsc.ditsyandrea.com",
            since: "2021-09-05",
            uptime: "99.97%"
        },
        {
            name: "Avalanche C-Chain",
            type: "Validator Node",
            version: "AvalancheGo v1.9.14",
            status: "syncing",
            sync: "87%",
            peers: 56,
            block: 132456789,
            rpc: "Enabled",
            endpoint: "avax.ditsyandrea.com",
            since: "2022-05-20",
            uptime: "99.92%"
        }
    ],
    testnet: [
        {
            name: "Ethereum Goerli",
            type: "Full Node",
            version: "Geth v1.12.0",
            status: "online",
            sync: "100%",
            peers: 23,
            block: 8654321,
            rpc: "Enabled",
            endpoint: "goerli.ditsyandrea.com",
            since: "2022-02-18",
            uptime: "99.90%"
        },
        {
            name: "Polygon Mumbai",
            type: "Full Node",
            version: "Bor v0.4.2",
            status: "offline",
            sync: "0%",
            peers: 0,
            block: 0,
            rpc: "Disabled",
            endpoint: "mumbai.ditsyandrea.com",
            since: "2022-03-22",
            uptime: "95.20%"
        },
        {
            name: "Avalanche Fuji",
            type: "Validator",
            version: "AvalancheGo v1.9.14",
            status: "online",
            sync: "100%",
            peers: 18,
            block: 5432198,
            rpc: "Enabled",
            endpoint: "fuji.ditsyandrea.com",
            since: "2022-04-05",
            uptime: "99.85%"
        }
    ]
};

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contact-form');

// Render Nodes
function renderNodes() {
    const mainnetContainer = document.getElementById('mainnet-nodes');
    const testnetContainer = document.getElementById('testnet-nodes');
    
    mainnetContainer.innerHTML = '';
    testnetContainer.innerHTML = '';
    
    nodesData.mainnet.forEach(node => {
        const nodeCard = createNodeCard(node);
        mainnetContainer.appendChild(nodeCard);
    });
    
    nodesData.testnet.forEach(node => {
        const nodeCard = createNodeCard(node);
        testnetContainer.appendChild(nodeCard);
    });
}

// Create Node Card
function createNodeCard(node) {
    const card = document.createElement('div');
    card.className = 'node-card';
    
    const statusClass = node.status === 'online' ? 'online' : 
                       node.status === 'offline' ? 'offline' : 'syncing';
    
    card.innerHTML = `
        <div class="node-header">
            <h3>${node.name}</h3>
            <span class="node-status ${statusClass}"></span>
        </div>
        <div class="node-body">
            <div class="node-info">
                <p><span>Type:</span> <span>${node.type}</span></p>
                <p><span>Version:</span> <span>${node.version}</span></p>
                <p><span>Status:</span> <span>${node.status}</span></p>
                <p><span>Sync Status:</span> <span>${node.sync}</span></p>
                <p><span>Connected Peers:</span> <span>${node.peers}</span></p>
                <p><span>Current Block:</span> <span>${node.block.toLocaleString()}</span></p>
                <p><span>RPC Status:</span> <span>${node.rpc}</span></p>
                <p><span>Endpoint:</span> <span>${node.endpoint}</span></p>
                <p><span>Uptime:</span> <span>${node.uptime}</span></p>
                <p><span>Running Since:</span> <span>${node.since}</span></p>
            </div>
            <div class="node-actions">
                <button class="btn btn-outline">
                    <i class="fas fa-chart-line"></i> Metrics
                </button>
                <button class="btn btn-primary">
                    <i class="fas fa-terminal"></i> Connect
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Animate Counting Numbers
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    renderNodes();
    animateCounters();
    
    // Add scroll event for navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});