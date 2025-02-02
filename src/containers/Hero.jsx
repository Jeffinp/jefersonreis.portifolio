import React, { useRef, useEffect, useCallback } from 'react';
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
    background-clip: text;
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
    const isVisibleRef = useRef(true);
    const lastFrameTimeRef = useRef(0);
    const viewportRef = useRef(null);

    // Cache de configurações frequentemente utilizadas
    const configRef = useRef({
        particleCount: 100,
        maxDistance: 150,
        baseSpeed: 1.5,
        mouseForce: 0.2,
        returnSpeed: 0.01,
        frameInterval: 1000 / 60, // Target 60 FPS
        visibilityThreshold: 100, // Pixels fora da viewport para pausar
        particleMemory: new Map(), // Armazena estado das partículas
    });

    class Particle {
        constructor(canvas, index) {
            this.index = index;
            this.canvas = canvas;
            this.active = true;
            this.wasVisible = true;
            this.lastActivePosition = null;
            this.reset();
        }

        reset() {
            const stored = configRef.current.particleMemory.get(this.index);

            if (stored && stored.lastActivePosition) {
                // Restaura a última posição ativa
                Object.assign(this, stored);
                this.active = true;
                return;
            }

            // Inicialização com valores aleatórios
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.size = Math.random() * 2 + 1;
            this.baseSize = this.size;
            this.speedX = (Math.random() - 0.5) * configRef.current.baseSpeed;
            this.speedY = (Math.random() - 0.5) * configRef.current.baseSpeed;
            this.lastSpeedX = this.speedX;
            this.lastSpeedY = this.speedY;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.baseOpacity = this.opacity;
            this.glowing = Math.random() > 0.9;
            this.glowIntensity = 0;
            this.glowDirection = 1;
            this.rotationAngle = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.energyLevel = 1; // Nível de energia para movimento
        }

        pause() {
            if (this.active) {
                this.lastActivePosition = {
                    x: this.x,
                    y: this.y,
                    speedX: this.speedX,
                    speedY: this.speedY
                };
                configRef.current.particleMemory.set(this.index, this.lastActivePosition);
            }
            this.lastSpeedX = this.speedX;
            this.lastSpeedY = this.speedY;
            this.speedX = 0;
            this.speedY = 0;
            this.active = false;
        }

        resume(viewportBounds) {
            if (this.lastActivePosition && this.isInViewport(viewportBounds)) {
                Object.assign(this, this.lastActivePosition);
                this.active = true;
                this.lastActivePosition = null;
                configRef.current.particleMemory.delete(this.index);
            } else {
                this.reset();
            }
        }

        isInViewport(viewportBounds) {
            if (!viewportBounds) return false;

            const buffer = configRef.current.visibilityThreshold;
            return (
                this.x >= viewportBounds.left - buffer &&
                this.x <= viewportBounds.right + buffer &&
                this.y >= viewportBounds.top - buffer &&
                this.y <= viewportBounds.bottom + buffer
            );
        }

        update(mouse, viewportBounds, deltaTime) {
            if (!this.active || !viewportBounds) return false;

            // Normaliza o deltaTime para movimento consistente
            const timeScale = deltaTime / 16.667; // 60 FPS base

            // Verifica visibilidade
            const wasVisible = this.wasVisible;
            this.wasVisible = this.isInViewport(viewportBounds);

            if (!this.wasVisible) {
                if (wasVisible) {
                    this.pause();
                }
                return false;
            }

            // Atualiza rotação
            this.rotationAngle += this.rotationSpeed * timeScale;

            // Atualiza brilho
            if (this.glowing) {
                this.glowIntensity += 0.05 * this.glowDirection * timeScale;
                if (this.glowIntensity >= 1 || this.glowIntensity <= 0) {
                    this.glowDirection *= -1;
                }
            }

            // Movimento com energia
            const energyFactor = this.energyLevel * timeScale;
            this.x += this.speedX * energyFactor;
            this.y += this.speedY * energyFactor;

            // Colisão com bordas melhorada
            if (this.x < viewportBounds.left || this.x > viewportBounds.right) {
                this.speedX *= -0.8;
                this.x = this.x < viewportBounds.left ? viewportBounds.left : viewportBounds.right;
                this.energyLevel *= 0.95; // Perde energia na colisão
            }
            if (this.y < viewportBounds.top || this.y > viewportBounds.bottom) {
                this.speedY *= -0.8;
                this.y = this.y < viewportBounds.top ? viewportBounds.top : viewportBounds.bottom;
                this.energyLevel *= 0.95;
            }

            // Interação com mouse otimizada
            if (mouse.x != null && mouse.y != null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.hypot(dx, dy);
                const maxDistance = configRef.current.maxDistance;

                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * configRef.current.mouseForce;
                    const multiplier = force * 5 * timeScale;
                    this.x += (dx / distance) * multiplier;
                    this.y += (dy / distance) * multiplier;
                    this.size = this.baseSize * (1 + force);
                    this.opacity = this.baseOpacity * (1 + force);
                    this.energyLevel = Math.min(this.energyLevel + 0.1, 1.5); // Ganha energia
                } else {
                    this.size = this.baseSize;
                    this.opacity = this.baseOpacity;
                }
            }

            // Recuperação gradual de energia
            this.energyLevel = Math.max(this.energyLevel - 0.01 * timeScale, 0.5);

            return true;
        }

        draw(ctx) {
            if (!this.active) return;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotationAngle);

            if (this.glowing) {
                const glowEffect = this.glowIntensity * 0.3;
                ctx.shadowColor = 'rgba(74, 158, 255, 0.8)';
                ctx.shadowBlur = 15 * this.glowIntensity;
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + glowEffect})`;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            }

            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const getViewportBounds = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        return {
            left: 0,
            right: canvas.width,
            top: 0,
            bottom: canvas.height,
            width: canvas.width,
            height: canvas.height
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: true // Melhoria de performance
        });

        ctx.imageSmoothingEnabled = true;
        let particles = [];

        const initParticles = () => {
            particles = Array.from(
                { length: configRef.current.particleCount },
                (_, index) => new Particle(canvas, index)
            );
            particlesRef.current = particles;
        };

        const drawLines = (p1, p2, opacity) => {
            if (!p1.active || !p2.active) return;

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.hypot(dx, dy);

            if (distance < configRef.current.maxDistance) {
                const lineOpacity = opacity * (1 - distance / configRef.current.maxDistance) * 0.2;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
                ctx.lineWidth = (1 - distance / configRef.current.maxDistance);
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        };

        const animate = (timestamp) => {
            if (!isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = timestamp - lastFrameTimeRef.current;
            if (deltaTime < configRef.current.frameInterval) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const viewportBounds = getViewportBounds();
            if (!viewportBounds) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let activeParticles = 0;
            const opacity = Math.min(1, deltaTime / configRef.current.frameInterval);

            particles.forEach((particle, i) => {
                const isActive = particle.update(mouseRef.current, viewportBounds, deltaTime);
                if (isActive) {
                    activeParticles++;
                    particle.draw(ctx);

                    // Otimização: só desenha linhas entre partículas ativas
                    for (let j = i + 1; j < particles.length; j++) {
                        if (particles[j].active) {
                            drawLines(particle, particles[j], opacity);
                        }
                    }
                }
            });

            // Restaura partículas se necessário
            if (activeParticles < configRef.current.particleCount * 0.5) {
                particles.forEach(particle => {
                    if (!particle.active && Math.random() < 0.1) {
                        particle.resume(viewportBounds);
                    }
                });
            }

            lastFrameTimeRef.current = timestamp;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.scale(dpr, dpr);

            viewportRef.current = getViewportBounds();
            initParticles();
        };

        const handleVisibilityChange = () => {
            isVisibleRef.current = !document.hidden;
            if (isVisibleRef.current) {
                lastFrameTimeRef.current = performance.now();
                particles.forEach(particle => {
                    if (particle.wasVisible) {
                        particle.resume(viewportRef.current);
                    }
                });
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            mouseRef.current = {
                x: (e.clientX - rect.left) * dpr,
                y: (e.clientY - rect.top) * dpr
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            const touch = e.touches[0];
            mouseRef.current = {
                x: (touch.clientX - rect.left) * dpr,
                y: (touch.clientY - rect.top) * dpr
            };
        };

        // Inicialização
        handleResize();
        lastFrameTimeRef.current = performance.now();
        animate(lastFrameTimeRef.current);

        // Event Listeners
        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);
        canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
        canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvas.addEventListener('touchend', handleMouseLeave, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            canvas.removeEventListener('touchend', handleMouseLeave);
            cancelAnimationFrame(animationFrameRef.current);
            configRef.current.particleMemory.clear();
        };
    }, [getViewportBounds]);

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

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/assets/images/Linkedin-foto.webp';
        link.as = 'image';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

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