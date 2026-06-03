"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  MouseEvent,
  TouchEvent,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Role = "TW" | "Feld" | "Bank";

interface Player {
  id: string;
  name: string;
  number: string;
  points: number;
  role: Role;
  secondRole: Role | null;
  fixedRole: boolean;
  x: number; // 0-100 percent of field
  y: number; // 0-100 percent of field
}

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Formation {
  id: string;
  name: string;
  players: Player[];
  lines: Line[];
  fieldPlayerCount: 3 | 4;
}

interface AppState {
  clubName: string;
  logoData: string | null;
  teamColor: string;
  opponentColor: string;
  fieldPlayerCount: 3 | 4;
  pointsRuleActive: boolean;
  players: Player[];
  formations: Formation[];
}

type Screen = "setup" | "board";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "pch_tactics_v3";
const MAX_POINTS = 12;

const DEFAULT_PLAYERS: Player[] = [
  { id: "p1", name: "Spieler 1", number: "1", points: 3, role: "TW", secondRole: "Feld", fixedRole: false, x: 10, y: 50 },
  { id: "p2", name: "Spieler 2", number: "2", points: 3, role: "Feld", secondRole: null, fixedRole: false, x: 35, y: 25 },
  { id: "p3", name: "Spieler 3", number: "3", points: 3, role: "Feld", secondRole: null, fixedRole: false, x: 35, y: 75 },
  { id: "p4", name: "Spieler 4", number: "4", points: 3, role: "Feld", secondRole: null, fixedRole: false, x: 55, y: 50 },
  { id: "p5", name: "Spieler 5", number: "5", points: 2, role: "Bank", secondRole: null, fixedRole: false, x: 70, y: 30 },
];

const DEFAULT_STATE: AppState = {
  clubName: "Mein Club",
  logoData: null,
  teamColor: "#16a34a",
  opponentColor: "#1e293b",
  fieldPlayerCount: 4,
  pointsRuleActive: true,
  players: DEFAULT_PLAYERS,
  formations: [],
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function loadState(): AppState & { _firstRun?: boolean } {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, _firstRun: true };
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_STATE, _firstRun: true };
  }
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // quota exceeded – ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SETUP SCREEN
// ─────────────────────────────────────────────────────────────────────────────

interface SetupProps {
  state: AppState;
  onChange: (s: AppState) => void;
  onGo: () => void;
}

function SetupScreen({ state, onChange, onGo }: SetupProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const set = (partial: Partial<AppState>) => onChange({ ...state, ...partial });

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set({ logoData: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  const addPlayer = () => {
    const newPlayer: Player = {
      id: generateId(),
      name: `Spieler ${state.players.length + 1}`,
      number: String(state.players.length + 1),
      points: 2,
      role: "Bank",
      secondRole: null,
      fixedRole: false,
      x: 50,
      y: 50,
    };
    set({ players: [...state.players, newPlayer] });
  };

  const updatePlayer = (id: string, partial: Partial<Player>) => {
    set({ players: state.players.map((p) => (p.id === id ? { ...p, ...partial } : p)) });
  };

  const deletePlayer = (id: string) => {
    set({ players: state.players.filter((p) => p.id !== id) });
  };

  const roles: Role[] = ["TW", "Feld", "Bank"];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-400 tracking-tight">⚽ PCH Taktik</h1>
          <p className="text-slate-400 mt-1">Setup & Einstellungen</p>
        </div>

        {/* Club */}
        <Card title="Club">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Clubname</label>
              <input
                className="w-full bg-slate-700 rounded-lg px-3 py-2 text-white border border-slate-600 focus:border-green-500 focus:outline-none"
                value={state.clubName}
                onChange={(e) => set({ clubName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Logo</label>
              <div className="flex items-center gap-3">
                {state.logoData && (
                  <img src={state.logoData} alt="Logo" className="w-12 h-12 object-contain rounded" />
                )}
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm border border-slate-600"
                >
                  Logo hochladen
                </button>
                {state.logoData && (
                  <button
                    onClick={() => set({ logoData: null })}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Entfernen
                  </button>
                )}
                <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              </div>
            </div>
          </div>
        </Card>

        {/* Colors */}
        <Card title="Farben">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 block mb-1">Eigenes Team</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.teamColor}
                  onChange={(e) => set({ teamColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-sm">{state.teamColor}</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-1">Gegner</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={state.opponentColor}
                  onChange={(e) => set({ opponentColor: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-sm">{state.opponentColor}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Rules */}
        <Card title="Regeln">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Feldspieler</label>
              <div className="flex gap-3">
                {([3, 4] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => set({ fieldPlayerCount: n })}
                    className={`flex-1 py-2 rounded-lg font-semibold border ${
                      state.fieldPlayerCount === n
                        ? "bg-green-600 border-green-500 text-white"
                        : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {n} Feldspieler
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Punkte-Regel</div>
                <div className="text-sm text-slate-400">Max. 12 Punkte aktiv</div>
              </div>
              <Toggle value={state.pointsRuleActive} onChange={(v) => set({ pointsRuleActive: v })} />
            </div>
          </div>
        </Card>

        {/* Players */}
        <Card title={`Spieler (${state.players.length})`}>
          <div className="space-y-3">
            {state.players.map((p) => (
              <div key={p.id} className="bg-slate-700 rounded-xl p-3 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-slate-400">Name</label>
                    <input
                      className="w-full bg-slate-600 rounded px-2 py-1 text-sm text-white border border-slate-500 focus:border-green-500 focus:outline-none"
                      value={p.name}
                      onChange={(e) => updatePlayer(p.id, { name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Nr.</label>
                    <input
                      className="w-full bg-slate-600 rounded px-2 py-1 text-sm text-white border border-slate-500 focus:border-green-500 focus:outline-none"
                      value={p.number}
                      onChange={(e) => updatePlayer(p.id, { number: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Punkte</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      className="w-full bg-slate-600 rounded px-2 py-1 text-sm text-white border border-slate-500 focus:border-green-500 focus:outline-none"
                      value={p.points}
                      onChange={(e) => updatePlayer(p.id, { points: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 items-end">
                  <div>
                    <label className="text-xs text-slate-400">Rolle</label>
                    <select
                      className="w-full bg-slate-600 rounded px-2 py-1 text-sm text-white border border-slate-500"
                      value={p.role}
                      onChange={(e) => updatePlayer(p.id, { role: e.target.value as Role })}
                    >
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">2. Rolle</label>
                    <select
                      className="w-full bg-slate-600 rounded px-2 py-1 text-sm text-white border border-slate-500"
                      value={p.secondRole ?? ""}
                      onChange={(e) => updatePlayer(p.id, { secondRole: (e.target.value as Role) || null })}
                    >
                      <option value="">–</option>
                      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      value={p.fixedRole}
                      onChange={(v) => updatePlayer(p.id, { fixedRole: v })}
                      size="sm"
                    />
                    <span className="text-xs text-slate-400">Fix</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => deletePlayer(p.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addPlayer}
              className="w-full py-2 rounded-lg border-2 border-dashed border-slate-600 text-slate-400 hover:border-green-500 hover:text-green-400 transition-colors"
            >
              + Spieler hinzufügen
            </button>
          </div>
        </Card>

        <button
          onClick={onGo}
          className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl text-xl font-bold transition-colors"
        >
          Zur Tafel →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOARD SCREEN
// ─────────────────────────────────────────────────────────────────────────────

interface BoardProps {
  state: AppState;
  onChange: (s: AppState) => void;
  onSetup: () => void;
}

function BoardScreen({ state, onChange, onSetup }: BoardProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawMode, setDrawMode] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [tooManyWarning, setTooManyWarning] = useState(false);
  const [formationName, setFormationName] = useState("");
  const [editingFormationId, setEditingFormationId] = useState<string | null>(null);

  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const drawStartRef = useRef<{ x: number; y: number } | null>(null);

  const set = (partial: Partial<AppState>) => {
    const next = { ...state, ...partial };
    onChange(next);
  };

  const setPlayers = (players: Player[]) => set({ players });

  // ── derived ────────────────────────────────────────────────────────────────

  const fieldPlayers = state.players.filter((p) => p.role !== "Bank");
  const bankPlayers = state.players.filter((p) => p.role === "Bank");
  const twPlayer = state.players.find((p) => p.role === "TW");
  const activePlayers = state.players.filter((p) => p.role !== "Bank");
  const activePoints = activePlayers.reduce((sum, p) => sum + p.points, 0);
  const fieldCount = fieldPlayers.filter((p) => p.role === "Feld").length;
  const pointsOver = state.pointsRuleActive && activePoints > MAX_POINTS;

  const selected = state.players.find((p) => p.id === selectedId) ?? null;

  // ── field coordinate helpers ───────────────────────────────────────────────

  function getFieldRect() {
    return fieldRef.current?.getBoundingClientRect() ?? null;
  }

  function clientToField(cx: number, cy: number): { x: number; y: number } | null {
    const rect = getFieldRect();
    if (!rect) return null;
    const x = ((cx - rect.left) / rect.width) * 100;
    const y = ((cy - rect.top) / rect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }

  // ── drag ──────────────────────────────────────────────────────────────────

  function onPlayerPointerDown(e: React.PointerEvent, id: string) {
    if (drawMode) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    const p = state.players.find((pl) => pl.id === id);
    if (!p || p.role === "Bank") return;
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, origX: p.x, origY: p.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onFieldPointerMove(e: React.PointerEvent) {
    if (dragRef.current) {
      const coord = clientToField(e.clientX, e.clientY);
      if (!coord) return;
      setPlayers(
        state.players.map((p) =>
          p.id === dragRef.current!.id ? { ...p, x: coord.x, y: coord.y } : p
        )
      );
    }
    if (drawStartRef.current) {
      const coord = clientToField(e.clientX, e.clientY);
      if (!coord) return;
      setCurrentLine({ x1: drawStartRef.current.x, y1: drawStartRef.current.y, x2: coord.x, y2: coord.y });
    }
  }

  function onFieldPointerUp(e: React.PointerEvent) {
    if (dragRef.current) dragRef.current = null;
    if (drawStartRef.current) {
      const coord = clientToField(e.clientX, e.clientY);
      if (coord) {
        const line: Line = { x1: drawStartRef.current.x, y1: drawStartRef.current.y, x2: coord.x, y2: coord.y };
        const dist = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
        if (dist > 1) setLines((prev) => [...prev, line]);
      }
      drawStartRef.current = null;
      setCurrentLine(null);
    }
  }

  function onFieldPointerDown(e: React.PointerEvent) {
    if (!drawMode) return;
    const coord = clientToField(e.clientX, e.clientY);
    if (!coord) return;
    drawStartRef.current = coord;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  // ── bank actions ──────────────────────────────────────────────────────────

  function sendToBank() {
    if (!selectedId) return;
    setPlayers(
      state.players.map((p) =>
        p.id === selectedId ? { ...p, role: "Bank" } : p
      )
    );
    setSelectedId(null);
  }

  function bringToField(id: string) {
    const currentFieldCount = state.players.filter((p) => p.role === "Feld").length;
    if (currentFieldCount >= state.fieldPlayerCount) {
      setTooManyWarning(true);
      setTimeout(() => setTooManyWarning(false), 3000);
      return;
    }
    setPlayers(
      state.players.map((p) =>
        p.id === id ? { ...p, role: "Feld", x: 50, y: 50 } : p
      )
    );
  }

  // ── TW switch ─────────────────────────────────────────────────────────────

  function makeGoalkeeper() {
    if (!selectedId) return;
    const candidate = state.players.find((p) => p.id === selectedId);
    if (!candidate || candidate.role === "Bank") return;

    setPlayers(
      state.players.map((p) => {
        if (p.id === selectedId) return { ...p, role: "TW" };
        if (p.role === "TW") {
          // Old TW becomes field player
          if (p.fixedRole) return p; // fixed role – don't change
          const newRole: Role = p.secondRole === "Feld" ? "Feld" : "Feld";
          return { ...p, role: newRole };
        }
        return p;
      })
    );
  }

  // ── formations ────────────────────────────────────────────────────────────

  function saveFormation() {
    if (!formationName.trim()) return;
    const formation: Formation = {
      id: editingFormationId ?? generateId(),
      name: formationName.trim(),
      players: JSON.parse(JSON.stringify(state.players)),
      lines: [...lines],
      fieldPlayerCount: state.fieldPlayerCount,
    };
    const existing = state.formations.find((f) => f.id === formation.id);
    if (existing) {
      set({ formations: state.formations.map((f) => (f.id === formation.id ? formation : f)) });
    } else {
      set({ formations: [...state.formations, formation] });
    }
    setFormationName("");
    setEditingFormationId(null);
  }

  function loadFormation(f: Formation) {
    set({ players: JSON.parse(JSON.stringify(f.players)), fieldPlayerCount: f.fieldPlayerCount });
    setLines([...f.lines]);
    setFormationName(f.name);
    setEditingFormationId(f.id);
  }

  function deleteFormation(id: string) {
    set({ formations: state.formations.filter((f) => f.id !== id) });
    if (editingFormationId === id) {
      setEditingFormationId(null);
      setFormationName("");
    }
  }

  // ── field player count change warning ─────────────────────────────────────

  const activeFieldPlayers = state.players.filter((p) => p.role === "Feld");
  const showTooManyOnField = activeFieldPlayers.length > state.fieldPlayerCount;

  // ── render ────────────────────────────────────────────────────────────────

  const tc = state.teamColor;
  const oc = state.opponentColor;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          {state.logoData && <img src={state.logoData} alt="Logo" className="w-8 h-8 object-contain" />}
          <span className="font-bold text-green-400">{state.clubName}</span>
        </div>

        {/* Status */}
        <div className={`flex items-center gap-3 text-sm font-mono px-3 py-1 rounded-lg ${pointsOver ? "bg-red-600 text-white" : "bg-slate-700 text-slate-200"}`}>
          <span>TW: {twPlayer ? 1 : 0}</span>
          <span>·</span>
          <span>Feld: {fieldCount}/{state.fieldPlayerCount}</span>
          {state.pointsRuleActive && (
            <>
              <span>·</span>
              <span>Punkte: {activePoints} / {MAX_POINTS}</span>
            </>
          )}
        </div>

        <button onClick={onSetup} className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-sm">
          ⚙ Setup
        </button>
      </div>

      {/* Warnings (non-blocking) */}
      {pointsOver && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
          <div className="bg-red-600/90 text-white text-2xl font-bold px-8 py-6 rounded-2xl shadow-2xl animate-pulse text-center">
            ⚠️ Zu viele Punkte!<br />
            <span className="text-lg font-normal">{activePoints} / {MAX_POINTS}</span>
          </div>
        </div>
      )}

      {tooManyWarning && (
        <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-20 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
          Zu viele Feldspieler – bitte einen auf Bank setzen
        </div>
      )}

      {showTooManyOnField && (
        <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-20 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg text-center">
          ⚠️ Zu viele Feldspieler – bitte Spieler auswählen und auf Bank setzen
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Action bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex flex-wrap gap-2 items-center">
          <button
            onClick={sendToBank}
            disabled={!selectedId || selected?.role === "Bank"}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold"
          >
            → Bank
          </button>
          <button
            onClick={makeGoalkeeper}
            disabled={!selectedId || selected?.role === "Bank" || selected?.role === "TW"}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold"
          >
            Zum TW
          </button>
          <button
            onClick={() => setDrawMode((d) => !d)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${drawMode ? "bg-purple-600 hover:bg-purple-500" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            {drawMode ? "✏️ Zeichnen AN" : "✏️ Zeichnen"}
          </button>
          <button
            onClick={() => { setLines([]); setCurrentLine(null); }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
          >
            Linien löschen
          </button>
          {selected && (
            <span className="text-sm text-slate-400 ml-2">
              Ausgewählt: <span className="text-white font-semibold">{selected.name}</span>
              {" "}({selected.role})
            </span>
          )}
        </div>

        {/* Field */}
        <div className="px-4 pt-4">
          <div
            ref={fieldRef}
            className={`relative w-full select-none overflow-hidden rounded-xl border-2 ${
              pointsOver ? "border-red-500" : "border-slate-600"
            } ${pointsOver ? "shadow-red-500/40 shadow-xl" : ""}`}
            style={{ aspectRatio: "16/9", background: pointsOver ? "#1a0a0a" : "#166534", touchAction: "none" }}
            onPointerDown={onFieldPointerDown}
            onPointerMove={onFieldPointerMove}
            onPointerUp={onFieldPointerUp}
          >
            {/* Field markings */}
            <FieldMarkings />

            {/* Draw lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {lines.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#facc15" strokeWidth="0.7" strokeLinecap="round" />
              ))}
              {currentLine && (
                <line x1={currentLine.x1} y1={currentLine.y1} x2={currentLine.x2} y2={currentLine.y2} stroke="#facc15" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="2,1" />
              )}
            </svg>

            {/* Players on field */}
            {state.players.filter((p) => p.role !== "Bank").map((p) => (
              <PlayerMarker
                key={p.id}
                player={p}
                teamColor={tc}
                selected={selectedId === p.id}
                onPointerDown={(e) => onPlayerPointerDown(e, p.id)}
              />
            ))}
          </div>
        </div>

        {/* Bank */}
        <div className="px-4 pt-4">
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <h2 className="text-sm font-semibold text-slate-400 mb-2">Bank ({bankPlayers.length})</h2>
            <div className="flex flex-wrap gap-2">
              {bankPlayers.length === 0 && (
                <span className="text-slate-500 text-sm">Keine Spieler auf der Bank</span>
              )}
              {bankPlayers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => bringToField(p.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedId === p.id
                      ? "border-yellow-400 bg-slate-700"
                      : "border-slate-600 bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: tc }}
                  >
                    {p.number}
                  </span>
                  <span>{p.name}</span>
                  <span className="text-slate-400">→ Feld</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Formations */}
        <div className="px-4 pt-4 pb-6">
          <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
            <h2 className="text-sm font-semibold text-slate-400 mb-3">Formationen</h2>
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 bg-slate-700 rounded-lg px-3 py-2 text-sm text-white border border-slate-600 focus:border-green-500 focus:outline-none"
                placeholder="Formationsname…"
                value={formationName}
                onChange={(e) => setFormationName(e.target.value)}
              />
              <button
                onClick={saveFormation}
                disabled={!formationName.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-40 rounded-lg text-sm font-semibold"
              >
                {editingFormationId ? "Überschreiben" : "Speichern"}
              </button>
              {editingFormationId && (
                <button
                  onClick={() => { setEditingFormationId(null); setFormationName(""); }}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {state.formations.length === 0 && (
                <span className="text-slate-500 text-sm">Noch keine Formationen gespeichert</span>
              )}
              {state.formations.map((f) => (
                <div
                  key={f.id}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm ${
                    editingFormationId === f.id ? "border-green-500 bg-slate-700" : "border-slate-600 bg-slate-700"
                  }`}
                >
                  <button onClick={() => loadFormation(f)} className="hover:text-green-400">
                    {f.name}
                  </button>
                  <button onClick={() => deleteFormation(f.id)} className="text-red-400 hover:text-red-300 ml-1">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FIELD MARKINGS (SVG overlay)
// ─────────────────────────────────────────────────────────────────────────────

function FieldMarkings() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 160 90"
      preserveAspectRatio="none"
    >
      {/* Outer border */}
      <rect x="2" y="2" width="156" height="86" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

      {/* Center line */}
      <line x1="80" y1="2" x2="80" y2="88" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

      {/* Center circle */}
      <circle cx="80" cy="45" r="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      <circle cx="80" cy="45" r="1" fill="rgba(255,255,255,0.4)" />

      {/* Left goal area */}
      <rect x="2" y="27" width="18" height="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      {/* Left goal */}
      <rect x="0" y="35" width="2" height="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />

      {/* Right goal area */}
      <rect x="140" y="27" width="18" height="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      {/* Right goal */}
      <rect x="158" y="35" width="2" height="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PLAYER MARKER
// ─────────────────────────────────────────────────────────────────────────────

interface PlayerMarkerProps {
  player: Player;
  teamColor: string;
  selected: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

function PlayerMarker({ player, teamColor, selected, onPointerDown }: PlayerMarkerProps) {
  const isTW = player.role === "TW";
  const size = 28; // px equivalent, but we use % positioning

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left: `calc(${player.x}% - 18px)`,
        top: `calc(${player.y}% - 18px)`,
        zIndex: selected ? 20 : 10,
        cursor: "grab",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
    >
      {/* Outer ring when selected */}
      {selected && (
        <div
          className="absolute rounded-full border-2 border-yellow-400"
          style={{ width: 44, height: 44, top: -6, left: -6, pointerEvents: "none" }}
        />
      )}
      {/* The marker */}
      <div
        className="rounded-full flex items-center justify-center text-white font-bold shadow-lg"
        style={{
          width: 32,
          height: 32,
          background: isTW
            ? `linear-gradient(135deg, ${teamColor} 50%, #dc2626 50%)`
            : teamColor,
          fontSize: 11,
          border: "2px solid rgba(255,255,255,0.6)",
          userSelect: "none",
        }}
      >
        {player.number}
      </div>
      {/* Name label */}
      <div
        className="text-white text-center mt-0.5 rounded px-0.5"
        style={{
          fontSize: 9,
          textShadow: "0 1px 2px #000",
          maxWidth: 52,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {player.name}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
      <h2 className="text-base font-semibold text-slate-300 mb-3">{title}</h2>
      {children}
    </div>
  );
}

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
}

function Toggle({ value, onChange, size = "md" }: ToggleProps) {
  const w = size === "sm" ? 32 : 44;
  const h = size === "sm" ? 18 : 24;
  const d = size === "sm" ? 14 : 20;
  const t = size === "sm" ? 2 : 2;
  return (
    <button
      onClick={() => onChange(!value)}
      className={`rounded-full transition-colors flex-shrink-0`}
      style={{
        width: w,
        height: h,
        background: value ? "#16a34a" : "#475569",
        position: "relative",
        border: "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: t,
          left: value ? w - d - t : t,
          width: d,
          height: d,
          background: "white",
          borderRadius: "50%",
          transition: "left 0.15s",
        }}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [appState, setAppState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadState();
    const { _firstRun, ...rest } = loaded as AppState & { _firstRun?: boolean };
    setAppState(rest);
    setScreen(_firstRun ? "setup" : "board");
    setHydrated(true);
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    if (hydrated) saveState(appState);
  }, [appState, hydrated]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-green-400 text-2xl font-bold animate-pulse">PCH Taktik…</div>
      </div>
    );
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        state={appState}
        onChange={setAppState}
        onGo={() => setScreen("board")}
      />
    );
  }

  return (
    <BoardScreen
      state={appState}
      onChange={setAppState}
      onSetup={() => setScreen("setup")}
    />
  );
}
