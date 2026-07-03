"use client";
import { useState, useEffect, useRef, type ElementType, type MouseEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
  compact?: boolean;
  light?: boolean;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
  compact = false,
  light = false,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) {
          newState[parseInt(key, 10)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval> | undefined;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = compact ? 140 : 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center overflow-hidden",
        light ? "bg-transparent" : "bg-black",
        compact ? "h-[360px] sm:h-[420px]" : "h-screen",
        className
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="animate-pulse absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ffb36b] via-[#f28a32] to-[#f6f6f6]">
            <div className={cn("animate-ping absolute h-20 w-20 rounded-full opacity-70", light ? "border border-slate-400/40" : "border border-white/20")} />
            <div
              className={cn("animate-ping absolute h-24 w-24 rounded-full opacity-50", light ? "border border-slate-300/35" : "border border-white/10")}
              style={{ animationDelay: "0.5s" }}
            />
            <div className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md" />
          </div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer transition-all duration-700"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute -inset-1 rounded-full ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                />

                <div
                  className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2
                  ${
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                        ? cn("animate-pulse", light ? "border-[#275d78] bg-[#dceaf6] text-[#11253d]" : "border-white bg-white/50 text-black")
                        : light
                          ? "border-[#4b728f] bg-[#17304d] text-white"
                          : "border-white/40 bg-black text-white"
                  }
                  transition-all duration-300
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? (light ? "scale-125 text-[#132640]" : "scale-125 text-white") : (light ? "text-[#3f5974]" : "text-white/70")}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 overflow-visible",
                      compact ? "top-18 w-44 min-h-[140px]" : "top-24 w-56 min-h-[170px]",
                      light
                        ? "border-[#d7e0eb] bg-white text-[#132640] shadow-[0_10px_24px_rgba(20,35,55,0.14)]"
                        : "border-white/25 bg-black/92 text-white shadow-xl shadow-white/10"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute -top-2 left-1/2 h-2 w-px -translate-x-1/2",
                        light ? "bg-[#9eb1c7]" : "bg-white/45"
                      )}
                    />
                    <CardHeader className={cn(compact ? "space-y-1 p-3 pb-1.5" : "space-y-1 p-4 pb-2")}>
                      <div className="flex items-center justify-between gap-2">
                        <span />
                        <span />
                      </div>
                      <CardTitle className={cn("text-sm font-semibold leading-tight", compact && "text-xs")}>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={cn(
                        "p-3 pt-0 text-[11px] leading-[1.45]",
                        light ? "text-[#4f647d]" : "text-white/78"
                      )}
                    >
                      <p>{item.content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
