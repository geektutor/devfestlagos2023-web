import React, { useEffect, useRef } from "react";
import styles from "./team-pills.module.scss";
import CategoryPill from "@/components/category-pill/category-pill";
import Matter from "matter-js";

const pills = [
  {
    text: "🤭Codelife",
    color: "#E6E4E7",
  },
  {
    text: "🤖Aijay",
    color: "#DDEEE4",
  },
  {
    text: "🤔P",
    color: "#FFF1CC",
  },
  {
    text: "🫅🏿Daniel",
    color: "#FFFFCC",
  },
  {
    text: "🤓T-Sticks",
    color: "#EFDCDD",
  },
  {
    text: "🤩Hendrick",
    color: "#EBCCFF",
  },
  {
    text: "😭Geek’s Deadlines",
    color: "#E5F0DB",
  },
  {
    text: "💰Maryann",
    color: "#CCFFCC",
  },
  {
    text: "🫶🏾Lere",
    color: "#E9DDEE",
  },
  {
    text: "👹WordPress Babalawo",
    color: "#FFF5CC",
  },
  {
    text: "💅🏼Zia",
    color: "#FFE6CC",
  },
  {
    text: "🕵🏿Litmus",
    color: "#EEE4DD",
  },
  {
    text: "🫴🏿Vibes",
    color: "#F5F1D6",
  },
  {
    text: "😁Geek",
    color: "#FFE9CC",
  },
  {
    text: "😍Omorinsola",
    color: "#FFE6CC",
  },
  {
    text: "🐺Zeus",
    color: "#EBE4E0",
  },
  {
    text: "🦇CodeFarmer",
    color: "#DDE7EE",
  },
  {
    text: "💪🏿Geek",
    color: "#D6F5EB",
  },
];

const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const TeamPills = () => {
  const elements = useRef<Array<HTMLDivElement>>([]);
  const canvas = useRef<HTMLDivElement>(null);
  const hasRendered = useRef(false);

  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const renderEngine = () => {
    if (!canvas.current) return;

    const worldWidth = canvas.current.offsetWidth;
    const worldHeight = canvas.current.offsetHeight;

    // Create an engine
    let engine = engineRef.current;
    let render = renderRef.current;

    if (engine === null) {
      engine = Matter.Engine.create();
      engineRef.current = engine;
    } else {
      console.log("clearing");
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }

    if (render === null) {
      render = Matter.Render.create({
        element: canvas.current!,
        engine: engine,
        options: {
          width: worldWidth,
          height: worldHeight,
          wireframes: true,
        },
      });

      renderRef.current = render;
    } else {
      render.canvas.width = worldWidth;
      render.canvas.height = worldHeight;
      render.bounds.max.x = worldWidth;
      render.bounds.max.y = worldHeight;

      // Adjust the render bounds to match the new world size
      render.bounds.min.x = 0;
      render.bounds.min.y = 0;
      render.bounds.max.x = worldWidth;
      render.bounds.max.y = worldHeight;
    }

    const groundHeight = 35;
    const groundWidth = worldWidth;

    // Create a ground
    const ground = Matter.Bodies.rectangle(
      groundWidth / 2,
      worldHeight - groundHeight / 2,
      groundWidth,
      groundHeight,
      { isStatic: true },
    );
    const leftWall = Matter.Bodies.rectangle(0, 0, 60, worldHeight * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(worldWidth, 0, 60, worldHeight * 2, {
      isStatic: true,
    });
    const topWall = Matter.Bodies.rectangle(0, 0, worldWidth * 2, 20, { isStatic: true });

    // Add the ground to the world
    Matter.World.add(engine.world, [ground, leftWall, rightWall, topWall]);

    // Create an array to hold your HTML elements and their corresponding physics bodies
    const matterElements: Array<{
      body: Matter.Body;
      element: HTMLDivElement;
    }> = [];

    // For each HTML element, create a corresponding physics body and add it to the world
    const htmlElements = elements.current;
    htmlElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();

      if (index === 0) {
        console.log(rect.top + rect.height / 2, worldHeight);
      }
      const y = Math.min(rect.top + rect.height / 2, worldHeight - rect.height);
      const body = Matter.Bodies.rectangle(rect.left + rect.width / 2, y, rect.width, rect.height, {
        restitution: 0.9,
      });
      Matter.World.add(engine!.world, [body]);
      matterElements.push({ element: element, body: body });
    });

    // Create a mouse
    const mouse = Matter.Mouse.create(render.canvas);

    // Create a mouse constraint
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Matter.World.add(engine.world, mouseConstraint);

    // Make sure the mouse is in sync with the render
    render.mouse = mouse;

    Matter.Render.run(render);

    // @ts-ignore Run the engine todo: fix this lol
    Matter.Engine.run(engine, {
      timestep: 1000 / 10,
    });

    // On each engine update, update the position and rotation of each HTML element
    Matter.Events.on(engine, "afterUpdate", function () {
      matterElements.forEach((item) => {
        const position = item.body.position;
        const angle = item.body.angle;
        item.element.style.position = "absolute";
        item.element.style.left = position.x - item.element.offsetWidth / 2 + "px";
        item.element.style.top = position.y - item.element.offsetHeight / 2 + "px";
        item.element.style.transform = "rotate(" + angle + "rad)";
      });
    });
  };

  useEffect(() => {
    if (hasRendered.current) return;
    hasRendered.current = true;
    renderEngine();
  }, []);

  return (
    <div className={styles.teamPills}>
      <div ref={canvas} className={styles.canvas} />
      {pills.map((pill, index) => (
        <div
          style={{
            top: `${getRandomInteger(0, 20)}%`,
            left: `${getRandomInteger(0, 90)}%`,
          }}
          key={index}
          className={styles.pill}
          ref={(el) => (elements.current[index] = el!)}
        >
          <CategoryPill isActive activeBgColor={pill.color} activeTextColor='#1C1C1C'>
            {pill.text}
          </CategoryPill>
        </div>
      ))}
    </div>
  );
};
