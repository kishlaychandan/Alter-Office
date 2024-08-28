import anime from 'animejs';

function createParticles() {
  const numParticles = 50;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    document.getElementById('background-animation').appendChild(particle);

    const size = Math.random() * 10 + 5;
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;
    const color = ['#5cb85c', '#4cae4c', '#008cba', '#0056b3'][Math.floor(Math.random() * 4)];

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.left = `${initialX}px`;
    particle.style.top = `${initialY}px`;

    anime({
      targets: particle,
      translateX: [
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
      ],
      translateY: [
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
        { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
      ],
      opacity: [
        { value: 1 },
        { value: 0, duration: 1500, delay: 200, easing: 'easeOutQuad' }
      ],
      duration: () => Math.random() * 5000 + 2000,
      loop: true,
      easing: 'linear'
    });
  }
}

window.onload = createParticles;
