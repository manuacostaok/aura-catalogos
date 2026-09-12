"use client";

import { useEffect, useRef } from "react";
import { hashSeed } from "@/lib/hash";

/**
 * Ambient background for the platform's own hero: a loose network of
 * "product nodes" drifting and connecting — an abstract read of what Aura
 * Catálogos actually is (a catalog of products, linked together), not a
 * generic particle field. Two aurora blobs underneath share the visual
 * language of Aura Soft Solutions. Pure CSS/SVG + anime.js, no WebGL.
 */
const NODE_COUNT = 20;
const NEIGHBORS_PER_NODE = 2;
const MAX_CONNECT_DISTANCE = 30;

type Node = { id: number; x: number; y: number; r: number; tone: number };

function buildNodes(): Node[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const h = hashSeed(`catalog-field-node-${i}`);
    return {
      id: i,
      x: 4 + (h % 92),
      y: 6 + ((h >> 4) % 88),
      r: 1.1 + ((h >> 8) % 3) * 0.4,
      tone: h % 3,
    };
  });
}

function distance(a: Node, b: Node) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Connects each node only to its nearest neighbors — a sparse constellation, not a dense web. */
function buildEdges(nodes: Node[]) {
  const seen = new Set<string>();
  const edges: { id: string; x1: number; y1: number; x2: number; y2: number; strength: number }[] = [];

  nodes.forEach((node) => {
    const nearest = nodes
      .filter((other) => other.id !== node.id)
      .map((other) => ({ other, dist: distance(node, other) }))
      .filter((entry) => entry.dist < MAX_CONNECT_DISTANCE)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, NEIGHBORS_PER_NODE);

    nearest.forEach(({ other, dist }) => {
      const id = [node.id, other.id].sort((a, b) => a - b).join("-");
      if (seen.has(id)) return;
      seen.add(id);
      edges.push({
        id,
        x1: node.x,
        y1: node.y,
        x2: other.x,
        y2: other.y,
        strength: 1 - dist / MAX_CONNECT_DISTANCE,
      });
    });
  });

  return edges;
}

const nodes = buildNodes();
const edges = buildEdges(nodes);
const toneColor = ["var(--violet)", "var(--blue)", "var(--cyan)"];

export function CatalogField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dots = rootRef.current?.querySelectorAll(".catalog-node");
    if (!dots || dots.length === 0) return;

    let cancelled = false;
    import("animejs").then(({ animate, utils }) => {
      if (cancelled) return;
      animate(dots, {
        translateX: () => utils.random(-3, 3),
        translateY: () => utils.random(-5, 5),
        opacity: () => [utils.random(0.4, 0.6), utils.random(0.75, 1)],
        duration: () => utils.random(3000, 5000),
        delay: () => utils.random(0, 2200),
        direction: "alternate",
        loop: true,
        ease: "inOutSine",
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="aurora-blob animate-aurora-drift-left h-[70vh] w-[26rem]"
        style={{ top: "-18%", left: "-10%", background: "var(--violet)" }}
      />
      <div
        className="aurora-blob animate-aurora-drift-right h-[60vh] w-[22rem]"
        style={{ top: "-8%", right: "-12%", background: "var(--cyan)" }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 92%)",
        }}
      >
        {edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="var(--violet)"
            strokeWidth="0.12"
            opacity={edge.strength * 0.35}
          />
        ))}
        {nodes.map((node) => (
          <circle
            key={node.id}
            className="catalog-node"
            cx={node.x}
            cy={node.y}
            r={node.r * 0.55}
            style={{ fill: toneColor[node.tone] }}
            opacity={0.75}
          />
        ))}
      </svg>
    </div>
  );
}
