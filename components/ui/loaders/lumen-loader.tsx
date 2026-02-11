import React from 'react';

const LumenLoader = () => {
  return (
    <div className="wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        /* --- THE VOID (Canvas) --- */
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          background-color: #050505; /* True Pitch Black */
          font-family: 'JetBrains Mono', monospace;
          overflow: hidden;
        }

        /* --- THE DEVICE CHASSIS --- */
        .device-shell {
          position: relative;
          z-index: 10;
          background: #0f0f0f;
          /* Refined Mad Black Neomorphism: Deep shadows for a stealth look */
          box-shadow: 
            25px 25px 70px #020202, 
            -25px -25px 70px #1a1a1a,
            inset 1px 1px 2px rgba(255, 255, 255, 0.03);
            
          /* The Cycle: Desktop -> Mobile -> Watch -> Desktop */
          animation: morphDevice 6s cubic-bezier(0.75, -0.2, 0.25, 1.2) infinite;
          
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #161616;
          padding: 8px; /* Hardware bezel thickness */
          border-radius: 14px;
        }

        /* --- THE SCREEN --- */
        .device-screen {
          background: #000000;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          
          /* Inner screen depth */
          box-shadow: inset 0 0 20px rgba(0,0,0,1);
        }

        /* Subtle Scifi Grid Background */
        .device-screen::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 24px 24px;
          transform: rotate(45deg);
          animation: gridPan 20s linear infinite;
        }

        /* --- CONTENT STACK --- */
        .content-stack {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Gap animates to 0 when text disappears to keep icon centered */
          animation: gapCollapse 6s ease-in-out infinite;
        }

        /* --- THE CORE NODE (Icon) --- */
        .node-icon {
          width: 12px;
          height: 12px;
          background: #e0e0e0;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          position: relative;
          z-index: 25;
        }
        
        /* Pulse Ripple */
        .node-icon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          animation: ripple 2s ease-out infinite;
        }

        /* --- TEXT ELEMENTS --- */
        .text-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          /* This handles the visibility state */
          animation: contentVisibility 6s ease-in-out infinite;
        }

        .brand-text {
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 12px;
          white-space: nowrap;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }

        .status-line {
          font-size: 8px;
          color: #555;
          margin-top: 4px;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        /* --- HARDWARE NOTCH --- */
        .notch {
          position: absolute;
          top: 8px;
          background: #111;
          border-radius: 0 0 4px 4px;
          z-index: 30;
          height: 6px;
          /* Notch morphs with device */
          animation: notchAnim 6s ease-in-out infinite;
        }

        /* --- KEYFRAMES --- */

        /* Device Shape Morphing */
        @keyframes morphDevice {
          0%, 15% {
            width: 260px;
            height: 150px;
            border-radius: 14px; /* Desktop/Tablet */
          }
          30%, 50% {
            width: 90px;
            height: 180px;
            border-radius: 24px; /* Mobile */
          }
          65%, 80% {
            width: 64px;
            height: 70px;
            border-radius: 18px; /* Watch/Wearable */
          }
          95%, 100% {
            width: 260px;
            height: 150px;
            border-radius: 14px; /* Return */
          }
        }

        /* Content Visibility: Hide text on small screens */
        @keyframes contentVisibility {
          0%, 15% {
            opacity: 1;
            max-height: 50px;
            transform: scale(1);
          }
          25%, 85% {
            opacity: 0;
            max-height: 0;
            transform: scale(0.8);
          }
          95%, 100% {
            opacity: 1;
            max-height: 50px;
            transform: scale(1);
          }
        }

        /* Notch Adaptation */
        @keyframes notchAnim {
           0%, 15% { width: 50px; opacity: 1; }
           30%, 50% { width: 30px; opacity: 1; }
           65%, 80% { width: 10px; opacity: 0; } /* Invisible on watch */
           95%, 100% { width: 50px; opacity: 1; }
        }

        /* Ripple Effect */
        @keyframes ripple {
          0% { width: 100%; height: 100%; opacity: 0.6; }
          100% { width: 350%; height: 350%; opacity: 0; }
        }

        /* Grid Movement */
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
      `}</style>

      <div className="device-shell">
        <div className="notch"></div>
        
        <div className="device-screen">
          <div className="content-stack">
            <div className="node-icon"></div>
            
            <div className="text-wrapper">
              <span className="brand-text">LumenNode</span>
              <span className="status-line">System::Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumenLoader;
