import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Observer, SplitText);

const Services = () => {
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const descriptionsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);
  const splitHeadingsRef = useRef([]);
  const splitDescriptionsRef = useRef([]);

  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive and modern web applications with cutting-edge technologies",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      title: "Mobile Applications",
      description:
        "Creating seamless native and cross-platform mobile experiences",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      title: "UI/UX Design",
      description:
        "Crafting intuitive and beautiful user interfaces that delight your customers",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      title: "Digital Marketing",
      description:
        "Driving growth through strategic campaigns and data-driven insights",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable infrastructure and cloud-native architectures for the future",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
      gradient:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.1) 100%)",
    },
  ];

  useEffect(() => {
    // Set first section visible immediately
    gsap.set(sectionsRef.current[0], { autoAlpha: 1, zIndex: 1 });

    // Initialize SplitText for all headings and descriptions
    splitHeadingsRef.current = headingsRef.current.map(
      (heading) =>
        new SplitText(heading, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        })
    );

    splitDescriptionsRef.current = descriptionsRef.current.map(
      (desc) =>
        new SplitText(desc, {
          type: "chars,words,lines",
          linesClass: "clip-text",
        })
    );

    // Set initial positions for all sections except first
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    // Set first section wrappers to 0
    gsap.set([outerWrappersRef.current[0], innerWrappersRef.current[0]], {
      yPercent: 0,
    });

    const wrap = gsap.utils.wrap(0, services.length);

    const gotoSection = (index, direction) => {
      index = wrap(index);
      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], {
          yPercent: -15 * dFactor,
        }).set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(
          imagesRef.current[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          splitHeadingsRef.current[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: { each: 0.02, from: "random" },
          },
          0.2
        )
        .fromTo(
          splitDescriptionsRef.current[index].chars,
          { autoAlpha: 0, yPercent: 100 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.8,
            ease: "power2",
            stagger: { each: 0.01, from: "random" },
          },
          0.4
        );

      currentIndexRef.current = index;
    };

    // Create Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Animate in the first section's text
    gsap.fromTo(
      splitHeadingsRef.current[0].chars,
      { autoAlpha: 0, yPercent: 150 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2",
        stagger: { each: 0.02, from: "random" },
        delay: 0.3,
      }
    );

    gsap.fromTo(
      splitDescriptionsRef.current[0].chars,
      { autoAlpha: 0, yPercent: 100 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power2",
        stagger: { each: 0.01, from: "random" },
        delay: 0.5,
      }
    );

    currentIndexRef.current = 0;

    // Cleanup
    return () => {
      observer.kill();
      splitHeadingsRef.current.forEach((split) => split.revert());
      splitDescriptionsRef.current.forEach((split) => split.revert());
    };
  }, []);

  return (
    <div style={styles.container} data-services2-page>
      <header style={styles.header}>
        <div>Our Services</div>
        <div style={styles.subtext}>Scroll to explore</div>
      </header>

      {services.map((service, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          style={styles.section}
        >
          <div
            ref={(el) => (outerWrappersRef.current[index] = el)}
            style={styles.outer}
          >
            <div
              ref={(el) => (innerWrappersRef.current[index] = el)}
              style={styles.inner}
            >
              <div
                ref={(el) => (imagesRef.current[index] = el)}
                style={{
                  ...styles.bg,
                  backgroundImage: `${service.gradient}, url(${service.image})`,
                }}
              >
                <h2
                  ref={(el) => (headingsRef.current[index] = el)}
                  style={styles.heading}
                >
                  {service.title}
                </h2>
                <p
                  ref={(el) => (descriptionsRef.current[index] = el)}
                  style={styles.description}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#fff",
    userSelect: "none",
  },
  header: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    width: "100%",
    zIndex: 3,
    height: "7em",
    top: "80px",
    fontSize: "clamp(0.66rem, 2vw, 1rem)",
    letterSpacing: "0.5em",
    textTransform: "uppercase",
  },
  subtext: {
    fontSize: "0.8em",
    opacity: 0.7,
  },
  section: {
    height: "100%",
    width: "100%",
    top: 0,
    position: "fixed",
    visibility: "hidden",
  },
  outer: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  },
  inner: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
  },
  bg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    gap: "0.5rem",
  },
  heading: {
    fontSize: "clamp(2rem, 8vw, 10rem)",
    fontWeight: 600,
    lineHeight: 1.2,
    textAlign: "center",
    margin: 0,
    marginBottom: "1rem",
    width: "90vw",
    maxWidth: "1200px",
    zIndex: 999,
    textShadow: "2px 2px 20px rgba(0,0,0,0.8)",
  },
  description: {
    fontSize: "clamp(1rem, 2vw, 1.5rem)",
    fontWeight: 300,
    lineHeight: 1.6,
    textAlign: "center",
    margin: 0,
    width: "90vw",
    maxWidth: "800px",
    zIndex: 999,
    textShadow: "1px 1px 10px rgba(0,0,0,0.8)",
    opacity: 0.9,
  },
};

export default Services;
