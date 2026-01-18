import {
  AlertTriangle,
  Waves,
  Mountain,
  Wind,
  Route,
  Home,
  MessageSquare,
  Download,
  Plus,
  Share2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  MapPin,
  Building2,
} from "lucide-react";
import { useState } from "react";
import Modal1 from "./Modal1";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);

  /* ---------- MODULE CONTENT ---------- */
  const moduleContent = {
    "Live Alerts": (
      <>
        <Section title="DOs">
          <Item icon={<CheckCircle />} text="Follow official NDRF and district alerts immediately" />
          <Item icon={<CheckCircle />} text="Keep emergency contacts and phone alerts active" />
          <Item icon={<CheckCircle />} text="Move to safer zones when instructed" />
        </Section>

        <Section title="DON’Ts" danger>
          <Item icon={<XCircle />} text="Do not ignore evacuation warnings" />
          <Item icon={<XCircle />} text="Avoid spreading unverified information" />
        </Section>
      </>
    ),

    Floods: (
      <>
        <Section title="DOs">
          <Item icon={<CheckCircle />} text="Move to higher ground immediately" />
          <Item icon={<CheckCircle />} text="Switch off electricity and gas supply" />
          <Item icon={<CheckCircle />} text="Carry emergency kit and documents" />
        </Section>

        <Section title="DON’Ts" danger>
          <Item icon={<XCircle />} text="Do not walk or drive through flood water" />
          <Item icon={<XCircle />} text="Avoid bridges and low-lying roads" />
        </Section>
      </>
    ),

    Cyclones: (
      <>
        <Section title="DOs">
          <Item icon={<CheckCircle />} text="Secure loose objects around shelter" />
          <Item icon={<CheckCircle />} text="Stay indoors during high wind warnings" />
        </Section>

        <Section title="DON’Ts" danger>
          <Item icon={<XCircle />} text="Do not go near coastal areas" />
          <Item icon={<XCircle />} text="Avoid using mobile towers during storms" />
        </Section>
      </>
    ),

    Landslides: (
      <>
        <Section title="DOs">
          <Item icon={<CheckCircle />} text="Stay alert in hilly and ghat regions" />
          <Item icon={<CheckCircle />} text="Report cracks or unusual ground movement" />
        </Section>

        <Section title="DON’Ts" danger>
          <Item icon={<XCircle />} text="Do not travel through unstable slopes" />
        </Section>
      </>
    ),

    "Evacuation Routes": (
      <>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="City" placeholder="Pune (example)" />
          <Input label="Pincode" placeholder="411001" />
        </div>

        <InfoBox>
          <Item icon={<MapPin />} text="JM Road → University Circle → Aundh Shelter" />
          <Item icon={<MapPin />} text="Avoid Karve Nagar low-lying areas" />
        </InfoBox>
      </>
    ),

    "Shelters & Relief Camps": (
      <>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="City" placeholder="Pune" />
          <Input label="Area / Pincode" placeholder="Shivajinagar" />
        </div>

        <InfoBox>
          <Item icon={<Building2 />} text="Municipal School, Shivajinagar (Capacity: 350)" />
          <Item icon={<Building2 />} text="Medical aid, food & water available" />
        </InfoBox>
      </>
    ),
  };

  return (
    <div
      className={`relative flex flex-col min-h-full bg-slate-900 text-white transition-all duration-300
       ${collapsed ? "w-16" : "w-64"}`}
    >

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-slate-800 p-1 rounded-full shadow z-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Scrollable Content */}
      <div className="flex-1 p-4 space-y-3">

        {/* Profile */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center font-semibold">
            NO
          </div>

          {!collapsed && (
            <div className="flex-1">
              <button
                onClick={() => setRoleOpen(!roleOpen)}
                className="flex items-center gap-1 text-[14px] font-semibold"
              >
                NDRF Operator <ChevronDown size={14} />
              </button>

              {roleOpen && (
                <div className="mt-2 bg-slate-800 rounded-md text-sm overflow-hidden">
                  {["NDRF Operator", "Civilian", "Volunteer"].map((r) => (
                    <div key={r} className="px-3 py-2 hover:bg-orange-500 cursor-pointer">
                      {r}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2 inline-block px-2 py-0.5 text-[11px] font-medium rounded bg-green-600/20 text-green-400">
                Maharashtra Region
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="text-[11px] font-semibold tracking-wider text-slate-400 mt-4">
            EMERGENCY MODULES
          </div>
        )}

        <SidebarButton icon={<AlertTriangle size={16} />} label="Live Alerts" collapsed={collapsed} onClick={() => setActiveModule("Live Alerts")} />
        <SidebarButton icon={<Waves size={16} />} label="Floods" collapsed={collapsed} onClick={() => setActiveModule("Floods")} />
        <SidebarButton icon={<Wind size={16} />} label="Cyclones" collapsed={collapsed} onClick={() => setActiveModule("Cyclones")} />
        <SidebarButton icon={<Mountain size={16} />} label="Landslides" collapsed={collapsed} onClick={() => setActiveModule("Landslides")} />
        <SidebarButton icon={<Route size={16} />} label="Evacuation Routes" collapsed={collapsed} onClick={() => setActiveModule("Evacuation Routes")} />
        <SidebarButton icon={<Home size={16} />} label="Shelters & Relief Camps" collapsed={collapsed} onClick={() => setActiveModule("Shelters & Relief Camps")} />

        {!collapsed && (
          <>
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 mt-6">
              CHAT HISTORY
            </div>
            <div className="text-sm text-slate-300 flex items-center gap-2">
              <MessageSquare size={14} /> Last Rescue Query
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-4 space-y-2 border-t border-slate-800">
          <div className="text-[11px] font-semibold tracking-wider text-slate-400">
            QUICK ACTIONS
          </div>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-orange-500 text-white">
            <Plus size={14} /> Report New Incident
          </button>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-slate-800 hover:bg-orange-500">
            <Download size={14} /> Download Situation Report
          </button>

          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-slate-800 hover:bg-orange-500">
            <Share2 size={14} /> Share Update
          </button>
        </div>
      )}

      {/* Modal */}
      {activeModule && (
        <Modal1 title={activeModule} onClose={() => setActiveModule(null)}>
          {moduleContent[activeModule]}
        </Modal1>
      )}
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function SidebarButton({ icon, label, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[14px] font-medium hover:bg-orange-500 transition"
    >
      {icon}
      {!collapsed && label}
    </button>
  );
}

function Section({ title, danger, children }) {
  return (
    <div className="mb-4">
      <h3 className={`font-semibold mb-2 ${danger ? "text-red-500" : "text-orange-500"}`}>
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-700">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border rounded px-2 py-1 text-sm"
      />
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 p-3 space-y-2">
      {children}
    </div>
  );
}
