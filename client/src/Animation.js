import React, { useEffect, useRef } from "react";

const ParticleAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = 50;

    canvas.style.zIndex = -1000;

    // Function to generate random number within a range
    const randomRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    // Particle object
    class Particle {
      constructor() {
        this.x = randomRange(0, canvas.width);
        this.y = randomRange(0, canvas.height);
        this.vx = randomRange(-2, 2); // Velocity in x-direction
        this.vy = randomRange(-2, 2); // Velocity in y-direction
        this.size = randomRange(1, 4); // Particle size
        this.color = `rgb(${randomRange(0, 255)}, ${randomRange(
          0,
          255
        )}, ${randomRange(0, 255)})`; // Random color
      }

      // Method to draw the particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      // Method to update particle position
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off the walls
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.vx = -this.vx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.vy = -this.vy;
        }
      }
    }

    // Create an array to store particles
    const particles = [];

    // Generate particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw text
      ctx.font = "20px Arial";
      ctx.fillStyle = "green";
      ctx.textAlign = "center";
      ctx.fillText(
        "Welcome to blog project !!",
        canvas.width / 2 - 30,
        canvas.height / 2 + 10
      );
    };

    // Start animation
    animate();

    // Cleanup on unmount
    return () => {
      // Stop animation
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default ParticleAnimation;
