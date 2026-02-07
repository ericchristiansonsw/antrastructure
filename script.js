// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Animated Counter for Stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, duration / steps);
}

function formatNumber(num) {
    if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(0) + ' Quadrillion';
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(0) + ' Billion';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + ' Million';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toFixed(0);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    animateCounter(stat);
                    stat.classList.add('animated');
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Network Visualization - Background
class NetworkBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    init() {
        const nodeCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    drawNode(node) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        const gradient = this.ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, 'rgba(0, 255, 159, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 159, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawConnection(node1, node2, distance, maxDistance) {
        const opacity = 1 - (distance / maxDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(node2.x, node2.y);
        this.ctx.strokeStyle = `rgba(0, 255, 159, ${opacity * 0.3})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const maxDistance = 150;
        
        // Draw connections
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.drawConnection(this.nodes[i], this.nodes[j], distance, maxDistance);
                }
            }
        }
        
        // Draw nodes
        this.nodes.forEach(node => this.drawNode(node));
        
        this.updateNodes();
        requestAnimationFrame(() => this.animate());
    }
}

// Main Network Visualization
class NetworkVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.nodes = [];
        this.pulseNodes = [];
        this.time = 0;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    init() {
        const nodeCount = 30;
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                baseX: Math.random() * this.canvas.width,
                baseY: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 2,
                connections: [],
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        
        // Create connections
        this.nodes.forEach((node, i) => {
            const connectionCount = Math.floor(Math.random() * 3) + 2;
            for (let j = 0; j < connectionCount; j++) {
                const targetIndex = Math.floor(Math.random() * this.nodes.length);
                if (targetIndex !== i && !node.connections.includes(targetIndex)) {
                    node.connections.push(targetIndex);
                }
            }
        });
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        this.nodes.forEach(node => {
            const dx = mouseX - node.baseX;
            const dy = mouseY - node.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                node.x = node.baseX + dx * force * 0.3;
                node.y = node.baseY + dy * force * 0.3;
            } else {
                node.x += (node.baseX - node.x) * 0.1;
                node.y += (node.baseY - node.y) * 0.1;
            }
        });
    }
    
    drawNode(node) {
        const pulse = Math.sin(this.time * 0.02 + node.pulsePhase) * 0.5 + 0.5;
        const size = node.radius + pulse * 2;
        
        // Outer glow
        const gradient = this.ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, size * 4
        );
        gradient.addColorStop(0, 'rgba(0, 255, 159, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 255, 159, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Core
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        this.ctx.fillStyle = '#00ff9f';
        this.ctx.fill();
    }
    
    drawConnection(node1, node2, progress) {
        const gradient = this.ctx.createLinearGradient(
            node1.x, node1.y,
            node2.x, node2.y
        );
        gradient.addColorStop(0, 'rgba(0, 255, 159, 0.4)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 255, 159, 0.4)');
        
        this.ctx.beginPath();
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(node2.x, node2.y);
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
        
        // Animated pulse along connection
        const pulseX = node1.x + (node2.x - node1.x) * progress;
        const pulseY = node1.y + (node2.y - node1.y) * progress;
        
        const pulseGradient = this.ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 8
        );
        pulseGradient.addColorStop(0, 'rgba(0, 255, 159, 0.8)');
        pulseGradient.addColorStop(1, 'rgba(0, 255, 159, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = pulseGradient;
        this.ctx.fill();
    }
    
    animate() {
        this.time++;
        
        // Create gradient background
        const bgGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        bgGradient.addColorStop(0, 'rgba(18, 25, 26, 0.95)');
        bgGradient.addColorStop(1, 'rgba(26, 36, 37, 0.95)');
        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections with animated pulses
        this.nodes.forEach((node, i) => {
            node.connections.forEach(targetIndex => {
                if (targetIndex < this.nodes.length) {
                    const target = this.nodes[targetIndex];
                    const progress = (Math.sin(this.time * 0.03 + i) + 1) / 2;
                    this.drawConnection(node, target, progress);
                }
            });
        });
        
        // Draw nodes
        this.nodes.forEach(node => this.drawNode(node));
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize visualizations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NetworkBackground('networkCanvas');
    new NetworkVisualization('mainNetwork');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('.concept-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});
