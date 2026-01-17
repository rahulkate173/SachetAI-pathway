import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import AlertFeed from "../components/AlertFeed";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [showAlertFeed, setShowAlertFeed] = useState(true);

  return (
    <div
      className={`h-screen w-screen grid transition-all duration-300 bg-gray-100
        ${
          collapsed
            ? showAlertFeed
              ? "grid-cols-[64px_1fr_360px]"
              : "grid-cols-[64px_1fr]"
            : showAlertFeed
              ? "grid-cols-[260px_1fr_360px]"
              : "grid-cols-[260px_1fr]"
        }
      `}
    >
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Chat */}
      <ChatArea />

      {/* Live Alert Feed */}
      {showAlertFeed && (
        <AlertFeed onClose={() => setShowAlertFeed(false)} />
      )}
    </div>
  );
}
