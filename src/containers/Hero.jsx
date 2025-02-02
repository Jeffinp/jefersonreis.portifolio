import React, { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/assets/images/nebula-space-blue-12k-2v.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: 1;
    animation: slowZoom 30s ease-in-out infinite alternate;
  }

  @keyframes slowZoom {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  text-align: center;
  color: white;
`;

const ProfileWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px rgba(74, 158, 255, 0.2);
    border-color: rgba(74, 158, 255, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      rgba(74, 158, 255, 0) 0%,
      rgba(74, 158, 255, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  ${ProfileWrapper}:hover & {
    transform: scale(1.08);
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #b3e0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 3s ease-in-out infinite alternate;

  @keyframes titleGlow {
    from {
      filter: drop-shadow(0 0 2px rgba(179, 224, 255, 0.3));
    }
    to {
      filter: drop-shadow(0 0 10px rgba(179, 224, 255, 0.6));
    }
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  strong {
    color: #4a9eff;
    text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(4px);
  letter-spacing: 0.5px;

  &.primary {
    background: linear-gradient(
      135deg,
      rgba(74, 158, 255, 0.9) 0%,
      rgba(45, 123, 212, 0.9) 100%
    );
    color: white;
    box-shadow: 0 4px 15px rgba(74, 158, 255, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(74, 158, 255, 0.4);
      background: linear-gradient(
        135deg,
        rgba(74, 158, 255, 1) 0%,
        rgba(45, 123, 212, 1) 100%
      );
    }
  }

  &.outline {
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    background: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.1);
    }
  }

  span {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
`;

const ParticleSystem = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: null, y: null });
    const animationFrameRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseSize = this.size;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.baseOpacity = this.opacity;
                this.glowing = Math.random() > 0.9;
                this.glowIntensity = 0;
                this.glowDirection = 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.rotationAngle = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.rotationAngle += this.rotationSpeed;

                if (this.glowing) {
                    this.glowIntensity += 0.05 * this.glowDirection;
                    if (this.glowIntensity >= 1 || this.glowIntensity <= 0) {
                        this.glowDirection *= -1;
                    }
                }

                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges with damping
                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX *= -0.8;
                    this.x = this.x < 0 ? 0 : canvas.width;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY *= -0.8;
                    this.y = this.y < 0 ? 0 : canvas.height;
                }

                // Mouse interaction
                if (mouseRef.current.x != null) {
                    const dx = this.x - mouseRef.current.x;
                    const dy = this.y - mouseRef.current.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        const force = (1 - distance / maxDistance) * 0.2;
                        this.x += (dx / distance) * force * 5;
                        this.y += (dy / distance) * force * 5;
                        this.size = this.baseSize * (1 + force);
                        this.opacity = this.baseOpacity * (1 + force);
                    } else {
                        this.size = this.baseSize;
                        this.opacity = this.baseOpacity;
                    }
                }

                // Gentle return to original position
                const dx = this.baseX - this.x;
                const dy = this.baseY - this.y;
                this.x += dx * 0.01;
                this.y += dy * 0.01;
            }

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotationAngle);

                const glowEffect = this.glowing ? this.glowIntensity * 0.3 : 0;

                if (this.glowing) {
                    ctx.shadowColor = 'rgba(74, 158, 255, 0.8)';
                    ctx.shadowBlur = 15 * this.glowIntensity;
                }

                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + glowEffect})`;
                ctx.fill();

                ctx.restore();
            }
        }

        const initParticles = () => {
            particles = Array.from({ length: 100 }, () => new Particle());
            particlesRef.current = particles;
        };

        const drawLines = (p1, p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                ctx.beginPath();
                const opacity = (1 - distance / maxDistance) * 0.2;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = (1 - distance / maxDistance) * 1;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, i) => {
                particle.update();
                particle.draw(ctx);

                for (let j = i + 1; j < particles.length; j++) {
                    drawLines(particle, particles[j]);
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouseRef.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleMouseLeave);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
                zIndex: 3
            }}
        />
    );
};

const Hero = () => {
    const { t } = useTranslation();

    return (
        <HeroSection id="home" aria-labelledby="heroTitle">
            <ParticleSystem />
            <HeroContainer>
                <ProfileWrapper>
                    <ProfilePic
                        src="/assets/images/Linkedin-foto.webp"
                        alt={t('hero.profileAlt')}
                        loading="eager"
                        width="300"
                        height="300"
                    />
                </ProfileWrapper>
                <Title id="heroTitle">
                    {t('hero.title')}
                </Title>
                <Subtitle>
                    {t('hero.subtitle')}
                    <strong>{t('hero.transforming')}</strong> ✨
                </Subtitle>
                <ButtonContainer>
                    <Button href="#portfolio" className="primary">
                        <span>→</span>
                        {t('hero.buttons.viewProjects')}
                    </Button>
                    <Button href="#contact" className="outline">
                        <span>✉</span>
                        {t('hero.buttons.contact')}
                    </Button>
                </ButtonContainer>
            </HeroContainer>
        </HeroSection>
    );
};

export default Hero;