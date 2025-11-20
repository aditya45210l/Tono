"use client";

import { ArrowLeft, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";

interface ScannerPageProps {
  onBack: () => void;
}

export default function ScannerPage({ onBack }: ScannerPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState("");
  const lastScannedRef = useRef("");
  const animationIdRef = useRef<number>();

  // STOP CAMERA FUNCTION (New)
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    setCameraActive(false);
  };

  const drawLine = (
    ctx: CanvasRenderingContext2D,
    begin: { x: number; y: number },
    end: { x: number; y: number },
    color = "#9EFF36"
  ) => {
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const handleQRCode = (data: string) => {
    if (!data || data === lastScannedRef.current) return;

    lastScannedRef.current = data;
    setScannedData(data);
    setError("");

    // 🔥 AUTO STOP CAMERA AFTER FIRST SCAN
    stopCamera();
  };

  useEffect(() => {
    if (!cameraActive) return;

    let lastProcessTime = 0;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          await videoRef.current.play();
          tick();
        }
      } catch (err) {
        console.error(err);
        setError("Cannot access camera. Check permissions and try again.");
      }
    };

    const tick = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const now = Date.now();
      if (now - lastProcessTime > 100) {
        lastProcessTime = now;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const code = jsQR(imageData.data, canvas.width, canvas.height, {
          inversionAttempts: "attemptBoth",
        });

        if (code) {
          drawLine(ctx, code.location.topLeftCorner, code.location.topRightCorner);
          drawLine(ctx, code.location.topRightCorner, code.location.bottomRightCorner);
          drawLine(ctx, code.location.bottomRightCorner, code.location.bottomLeftCorner);
          drawLine(ctx, code.location.bottomLeftCorner, code.location.topLeftCorner);

          handleQRCode(code.data);
        }
      }

      animationIdRef.current = requestAnimationFrame(tick);
    };

    startCamera();

    return () => stopCamera();
  }, [cameraActive]);

  return (
    <div className="relative h-full bg-black text-white overflow-y-auto">
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-5 pt-6 mb-8 z-20"
        >
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Scan QR Code</h1>
          <div className="w-10" />
        </motion.div>

        {/* Scanner Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 -mt-20">
          {!cameraActive ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-sm aspect-square rounded-[32px] glass flex flex-col items-center justify-center"
            >
              <Camera className="w-16 h-16 text-gray-400 mb-6" />
              <p className="text-gray-400 mb-6 text-center px-6">Camera not active</p>
              <button
                onClick={() => {
                  lastScannedRef.current = "";
                  setScannedData("");
                  setCameraActive(true);
                }}
                className="px-6 py-3 bg-[#9EFF36] text-black rounded-[16px] hover:bg-[#8CFF00] transition-colors font-semibold"
              >
                Activate Camera
              </button>
            </motion.div>
          ) : (
            <div className="w-full max-w-sm aspect-square overflow-hidden rounded-[32px] border-2 border-[#9EFF36] relative bg-black">
              <video ref={videoRef} className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
          )}

          {/* Scanned Data Display */}
          {scannedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 glass rounded-[20px] w-full max-w-sm text-center"
            >
              <p className="text-sm text-gray-400 mb-1">Scanned Value</p>
              <p className="font-mono text-[#9EFF36] break-all">{scannedData}</p>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-[20px] w-full max-w-sm text-center"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
