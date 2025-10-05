"use client";

import { Sparkles } from "lucide-react";

// Custom Perfume Bottle SVG Component with Loading Animation
const AnimatedPerfumeBottle = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 120 120"
    className="text-primary"
    fill="currentColor"
  >
    {/* Perfume bottle body */}
    <path
      d="M35 45 L85 45 L80 100 L40 100 Z"
      fill="currentColor"
      opacity="0.1"
      className="animate-pulse"
    />
    <path
      d="M35 45 L85 45 L80 100 L40 100 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Perfume bottle neck */}
    <rect
      x="50"
      y="25"
      width="20"
      height="20"
      fill="currentColor"
      opacity="0.1"
      className="animate-pulse"
    />
    <rect
      x="50"
      y="25"
      width="20"
      height="20"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Perfume bottle cap */}
    <rect
      x="48"
      y="20"
      width="24"
      height="8"
      rx="4"
      fill="currentColor"
      opacity="0.2"
      className="animate-pulse"
    />
    <rect
      x="48"
      y="20"
      width="24"
      height="8"
      rx="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />

    {/* Spray nozzle */}
    <circle
      cx="45"
      cy="24"
      r="3"
      fill="currentColor"
      opacity="0.3"
      className="animate-pulse"
    />
    <line
      x1="42"
      y1="24"
      x2="38"
      y2="22"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="42"
      y1="24"
      x2="38"
      y2="26"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* Animated perfume liquid */}
    <path
      d="M40 50 L80 50 L76 95 L44 95 Z"
      fill="currentColor"
      opacity="0.2"
      className="animate-pulse"
      style={{
        animationDelay: "0.5s",
        animationDuration: "2s",
      }}
    />

    {/* Animated decorative bubbles */}
    <circle
      cx="60"
      cy="70"
      r="2"
      fill="currentColor"
      opacity="0.4"
      className="animate-bounce"
      style={{ animationDelay: "0.2s", animationDuration: "1.5s" }}
    />
    <circle
      cx="55"
      cy="75"
      r="1.5"
      fill="currentColor"
      opacity="0.4"
      className="animate-bounce"
      style={{ animationDelay: "0.4s", animationDuration: "1.8s" }}
    />
    <circle
      cx="65"
      cy="65"
      r="1"
      fill="currentColor"
      opacity="0.4"
      className="animate-bounce"
      style={{ animationDelay: "0.6s", animationDuration: "1.2s" }}
    />
  </svg>
);

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Crafting your experience...",
  size = "md",
  fullScreen = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  const containerClasses = fullScreen
    ? "min-h-[80vh]  flex items-center justify-center px-4"
    : `flex flex-col items-center justify-center py-8 px-4 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="max-w-lg mx-auto text-center">
        {/* Animated Perfume Bottle with Sparkles */}
        <div className="relative mb-8">
          <div className="flex justify-center mb-4">
            <div className={sizeClasses[size]}>
              <AnimatedPerfumeBottle />
            </div>
          </div>

          {/* Animated Sparkles */}
          <div className="absolute -top-2 -left-4 animate-pulse">
            <Sparkles
              className="w-4 h-4 text-primary/60"
              style={{ animationDelay: "0.3s", animationDuration: "2s" }}
            />
          </div>
          <div className="absolute top-4 -right-2 animate-pulse">
            <Sparkles
              className="w-3 h-3 text-primary/40"
              style={{ animationDelay: "0.7s", animationDuration: "2.5s" }}
            />
          </div>
          <div className="absolute bottom-2 -left-2 animate-pulse">
            <Sparkles
              className="w-3 h-3 text-primary/50"
              style={{ animationDelay: "1s", animationDuration: "2.2s" }}
            />
          </div>
          <div className="absolute bottom-0 -right-4 animate-pulse">
            <Sparkles
              className="w-4 h-4 text-primary/60"
              style={{ animationDelay: "0.1s", animationDuration: "1.8s" }}
            />
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-6">
          <h2
            className={`${textSizes[size]} font-light mb-4 tracking-wider text-foreground`}
          >
            {message}
          </h2>
          <div className="h-px w-24 bg-primary/30 mx-auto mb-4"></div>
        </div>

        {/* Status Badge */}
        {/* <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Loading</span>
          </div>
        </div> */}

        {/* Animated Loading Dots */}
        <div className="flex justify-center items-center gap-1">
          <div
            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "1.4s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s", animationDuration: "1.4s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s", animationDuration: "1.4s" }}
          ></div>
        </div>

        {/* Luxury Quote */}
        {/* {fullScreen && (
          <div className="mt-12 max-w-sm mx-auto">
            <blockquote className="text-sm italic text-muted-foreground">
              "Patience reveals the finest fragrances..."
            </blockquote>
            <cite className="text-xs text-muted-foreground/80 block mt-2">
              — Parfums de Marly
            </cite>
          </div>
        )} */}
      </div>
    </div>
  );
};

// Compact loading spinner for smaller spaces
export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <AnimatedPerfumeBottle />
      </div>
    </div>
  );
};

// Loading overlay for existing content
export const LoadingOverlay: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
}) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loading message={message} size={size} fullScreen={false} />
    </div>
  );
};

export default Loading;
