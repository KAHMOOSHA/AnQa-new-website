"use client";

import { useEffect, useRef } from "react";
import styles from "./AnimatedFooterCanvas.module.css";

const COLORS = {
  brown: "#41100b",
  cream: "#fbeccb",
  red: "#e33b3b",
} as const;

const LETTERS = ["A", "n", "Q", "a"] as const;
const OPENING_DIRECTIONS = [
  "right-to-left",
  "top-to-bottom",
  "left-to-right",
  "bottom-to-top",
] as const;

type OpeningDirection = (typeof OPENING_DIRECTIONS)[number];

type ActiveTile = {
  column: number;
  direction: OpeningDirection;
  row: number;
  letter: (typeof LETTERS)[number];
  startedAt: number;
};

const easeInOut = (value: number) =>
  value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;

export function AnimatedFooterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animationDuration = 2300;
    let activeTile: ActiveTile | null = null;
    let animationFrame = 0;
    let columns = 1;
    let rows = 1;
    let cellSize = 96;
    let gridOffsetX = 0;
    let gridOffsetY = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let nextLetter = 0;
    let nextDirection = 0;
    let previousCell = -1;
    let revealTimer: number | undefined;

    const drawGrid = () => {
      context.clearRect(0, 0, cssWidth, cssHeight);
      context.fillStyle = COLORS.brown;
      context.fillRect(0, 0, cssWidth, cssHeight);

      // Every tile remains exactly the same size and color, so the resting
      // grid reads as one uninterrupted mint field.
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          context.fillRect(
            gridOffsetX + column * cellSize,
            gridOffsetY + row * cellSize,
            cellSize,
            cellSize,
          );
        }
      }
    };

    const drawActiveTile = (tile: ActiveTile, openness: number) => {
      const x = gridOffsetX + tile.column * cellSize;
      const y = gridOffsetY + tile.row * cellSize;
      const seam = 1;
      const innerX = x + seam;
      const innerY = y + seam;
      const tileSize = cellSize - seam * 2;
      const centerX = innerX + tileSize / 2;
      const centerY = innerY + tileSize / 2;
      const remaining = tileSize * (1 - openness);
      const shadowSize = Math.min(cellSize * 0.14, cellSize * openness);

      context.save();
      context.beginPath();
      context.rect(innerX, innerY, tileSize, tileSize);
      context.clip();

      // The letter sits behind the brown shutter. It appears naturally as the
      // shutter moves instead of fading in on top of the tile.
      context.fillStyle = COLORS.red;
      context.fillRect(innerX, innerY, tileSize, tileSize);
      context.fillStyle = COLORS.cream;
      context.font = `700 ${Math.max(30, tileSize * 0.58)}px Poppins, Arial, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(tile.letter, centerX, centerY + tileSize * 0.035);

      context.fillStyle = COLORS.brown;

      if (tile.direction === "right-to-left") {
        context.fillRect(innerX, innerY, remaining, tileSize);

        if (shadowSize > 0) {
          const edge = innerX + remaining;
          const shadow = context.createLinearGradient(
            edge,
            0,
            edge + shadowSize,
            0,
          );
          shadow.addColorStop(0, "rgba(65, 16, 11, 0.26)");
          shadow.addColorStop(1, "rgba(65, 16, 11, 0)");
          context.fillStyle = shadow;
          context.fillRect(edge, innerY, shadowSize, tileSize);
        }
      } else if (tile.direction === "left-to-right") {
        const edge = innerX + tileSize - remaining;
        context.fillRect(edge, innerY, remaining, tileSize);

        if (shadowSize > 0) {
          const shadow = context.createLinearGradient(
            edge - shadowSize,
            0,
            edge,
            0,
          );
          shadow.addColorStop(0, "rgba(65, 16, 11, 0)");
          shadow.addColorStop(1, "rgba(65, 16, 11, 0.26)");
          context.fillStyle = shadow;
          context.fillRect(edge - shadowSize, innerY, shadowSize, tileSize);
        }
      } else if (tile.direction === "top-to-bottom") {
        const edge = innerY + tileSize - remaining;
        context.fillRect(innerX, edge, tileSize, remaining);

        if (shadowSize > 0) {
          const shadow = context.createLinearGradient(
            0,
            edge - shadowSize,
            0,
            edge,
          );
          shadow.addColorStop(0, "rgba(65, 16, 11, 0)");
          shadow.addColorStop(1, "rgba(65, 16, 11, 0.26)");
          context.fillStyle = shadow;
          context.fillRect(innerX, edge - shadowSize, tileSize, shadowSize);
        }
      } else {
        context.fillRect(innerX, innerY, tileSize, remaining);

        if (shadowSize > 0) {
          const edge = innerY + remaining;
          const shadow = context.createLinearGradient(
            0,
            edge,
            0,
            edge + shadowSize,
          );
          shadow.addColorStop(0, "rgba(65, 16, 11, 0.26)");
          shadow.addColorStop(1, "rgba(65, 16, 11, 0)");
          context.fillStyle = shadow;
          context.fillRect(innerX, edge, tileSize, shadowSize);
        }
      }

      context.restore();
    };

    const scheduleReveal = () => {
      window.clearTimeout(revealTimer);
      if (reducedMotion.matches || document.hidden) return;

      const delay = 2600 + Math.random() * 2600;
      revealTimer = window.setTimeout(() => {
        const firstColumn = columns > 2 ? 1 : 0;
        const firstRow = rows > 2 ? 1 : 0;
        const availableColumns = Math.max(1, columns - firstColumn * 2);
        const availableRows = Math.max(1, rows - firstRow * 2);
        let column =
          firstColumn + Math.floor(Math.random() * availableColumns);
        const row = firstRow + Math.floor(Math.random() * availableRows);
        let selectedCell = row * columns + column;

        if (availableColumns > 1 && selectedCell === previousCell) {
          column =
            firstColumn + ((column - firstColumn + 1) % availableColumns);
          selectedCell = row * columns + column;
        }

        previousCell = selectedCell;
        activeTile = {
          column,
          direction:
            OPENING_DIRECTIONS[nextDirection % OPENING_DIRECTIONS.length],
          row,
          letter: LETTERS[nextLetter % LETTERS.length],
          startedAt: performance.now(),
        };
        nextLetter += 1;
        nextDirection += 1;
        animationFrame = window.requestAnimationFrame(animate);
      }, delay);
    };

    const animate = (time: number) => {
      if (!activeTile) return;

      const progress = Math.min(
        1,
        (time - activeTile.startedAt) / animationDuration,
      );
      let openness = 1;

      if (progress < 0.32) {
        openness = easeInOut(progress / 0.32);
      } else if (progress > 0.7) {
        openness = 1 - easeInOut((progress - 0.7) / 0.3);
      }

      drawGrid();
      drawActiveTile(activeTile, openness);

      if (progress < 1 && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      activeTile = null;
      drawGrid();
      scheduleReveal();
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (
        Math.abs(bounds.width - cssWidth) < 0.5 &&
        Math.abs(bounds.height - cssHeight) < 0.5
      ) {
        return;
      }

      cssWidth = bounds.width;
      cssHeight = bounds.height;
      cellSize = Math.max(72, Math.min(132, cssWidth / 9));
      columns = Math.max(1, Math.ceil(cssWidth / cellSize));
      rows = Math.max(1, Math.ceil(cssHeight / cellSize));
      gridOffsetX = (cssWidth - columns * cellSize) / 2;
      gridOffsetY = (cssHeight - rows * cellSize) / 2;

      canvas.width = Math.round(cssWidth * pixelRatio);
      canvas.height = Math.round(cssHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      activeTile = null;
      window.cancelAnimationFrame(animationFrame);
      drawGrid();
      scheduleReveal();
    };

    const handleVisibilityChange = () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(revealTimer);
      activeTile = null;
      drawGrid();

      if (!document.hidden) scheduleReveal();
    };

    const handleMotionPreference = () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(revealTimer);
      activeTile = null;
      drawGrid();

      if (!reducedMotion.matches) scheduleReveal();
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeCanvas();
    resizeObserver.observe(canvas.parentElement ?? canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreference);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(revealTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
