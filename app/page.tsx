"use client";

import { useEffect, useState } from "react";

type Team = "green" | "red";
type Role = "TW" | "Feld" | "Bank";

type Player = {
  id: string;
  name: string;
  number: string;
  team: Team;
  role: Role;
  points: number;
  active: boolean;
  fixedRole: boolean;
  secondRole: Role;
  strengths: string;
  weaknesses: string;
  notes: string;
  favoritePosition: string;
  stickSide: "Links" | "Rechts" | "Festschläger";
  speed: number;
  defense: number;
  ballControl: number;
  shooting: number;
  overview: number;
  x: number;
  y: number;
};

type Line = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type Formation = {
  id: string;
  name: string;
  players: Player[];
  lines: Line[];
  maxFieldPlayers: number;
};

const startPlayers: Player[] = [
  {
    id: "g1",
    name: "Selma",
    number: "19",
    team: "green",
    role: "TW",
    points: 1.5,
    active: true,
    fixedRole: true,
    secondRole: "TW",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 14,
    y: 50,
  },
  {
    id: "g2",
    name: "Frida",
    number: "22",
    team: "green",
    role: "Feld",
    points: 2.5,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 30,
    y: 35,
  },
  {
    id: "g3",
    name: "Gion",
    number: "91",
    team: "green",
    role: "Feld",
    points: 1.5,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 35,
    y: 50,
  },
  {
    id: "g4",
    name: "Jan C",
    number: "92",
    team: "green",
    role: "Feld",
    points: 2.5,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Rechts",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 30,
    y: 65,
  },
  {
    id: "g5",
    name: "Fatlum",
    number: "9",
    team: "green",
    role: "Bank",
    points: 4.5,
    active: false,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Links",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 0,
    y: 0,
  },
  {
    id: "g6",
    name: "Musa",
    number: "7",
    team: "green",
    role: "Bank",
    points: 3,
    active: false,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Links",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 0,
    y: 0,
  },
  {
    id: "r1",
    name: "G",
    number: "",
    team: "red",
    role: "Feld",
    points: 0,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 70,
    y: 35,
  },
  {
    id: "r2",
    name: "G",
    number: "",
    team: "red",
    role: "Feld",
    points: 0,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 75,
    y: 50,
  },
  {
    id: "r3",
    name: "G",
    number: "",
    team: "red",
    role: "Feld",
    points: 0,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 70,
    y: 65,
  },
  {
    id: "r4",
    name: "G",
    number: "",
    team: "red",
    role: "Feld",
    points: 0,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 88,
    y: 50,
  },
  {
    id: "r5",
    name: "G",
    number: "",
    team: "red",
    role: "Feld",
    points: 0,
    active: true,
    fixedRole: false,
    secondRole: "Feld",
    strengths: "",
    weaknesses: "",
    notes: "",
    favoritePosition: "",
    stickSide: "Festschläger",
    speed: 3,
    defense: 3,
    ballControl: 3,
    shooting: 3,
    overview: 3,
    x: 82,
    y: 35,
  },
];


export default function Home() {
  const [screen, setScreen] = useState<"portal" | "setup" | "board">("portal");
  const [teamId, setTeamId] = useState("");
  const [teamPassword, setTeamPassword] = useState("");
  const [portalMode, setPortalMode] = useState<"join" | "create">("join");
  const [setupStep, setSetupStep] = useState(1);
  const [selectedTW, setSelectedTW] = useState<string | null>(null);

  const [clubName, setClubName] = useState("Green Lightning");
  const [ownColor, setOwnColor] = useState("#16a34a");
  const [opponentColor, setOpponentColor] = useState("#111827");
  const [logo, setLogo] = useState<string | null>(null);

  const [players, setPlayers] = useState<Player[]>(startPlayers);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [infoPlayer, setInfoPlayer] = useState<Player | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const [drawMode, setDrawMode] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);
  const [previewLine, setPreviewLine] = useState<Line | null>(null);

  const [formationName, setFormationName] = useState("");
  const [formations, setFormations] = useState<Formation[]>([]);

  const [maxFieldPlayers, setMaxFieldPlayers] = useState(4);
  const [pointsRuleActive, setPointsRuleActive] = useState(true);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newPoints, setNewPoints] = useState(1);

  const ownPlayers = players.filter((p) => p.team === "green" && p.active);
  const bankPlayers = players.filter((p) => p.team === "green" && !p.active);

  const fieldCount = ownPlayers.filter((p) => p.role === "Feld").length;
  const twCount = ownPlayers.filter((p) => p.role === "TW").length;
  const totalPoints = ownPlayers.reduce((sum, p) => sum + p.points, 0);

  useEffect(() => {
    const savedFormations = localStorage.getItem("formations");
    const savedPlayers = localStorage.getItem("players");
    const savedClubName = localStorage.getItem("clubName");
    const savedScreen = localStorage.getItem("screen");
    const savedOwnColor = localStorage.getItem("ownColor");
    const savedOpponentColor = localStorage.getItem("opponentColor");
    const savedLogo = localStorage.getItem("logo");

    if (savedFormations) setFormations(JSON.parse(savedFormations));
    if (savedPlayers) {
      const loadedPlayers = JSON.parse(savedPlayers);
      setPlayers(
        loadedPlayers.map((p: Player) => ({
          ...p,
          secondRole: p.secondRole || "Feld",
        }))
      );
    }
    if (savedClubName) setClubName(savedClubName);
    if (savedScreen === "board" || savedScreen === "setup") {
      setScreen(savedScreen);
    }
    if (savedOwnColor) setOwnColor(savedOwnColor);
    if (savedOpponentColor) setOpponentColor(savedOpponentColor);
    if (savedLogo) setLogo(savedLogo);
  }, []);

  useEffect(() => {
    localStorage.setItem("formations", JSON.stringify(formations));
  }, [formations]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("clubName", clubName);
    localStorage.setItem("ownColor", ownColor);
    localStorage.setItem("opponentColor", opponentColor);
    if (logo) {
      localStorage.setItem("logo", logo);
    }
  }, [clubName, ownColor, opponentColor, logo]);

  function getFieldPosition(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  function movePlayer(event: React.MouseEvent<HTMLDivElement>) {
    if (!draggingId) return;
    const pos = getFieldPosition(event);
    setPlayers((old) =>
      old.map((p) =>
        p.id === draggingId
          ? {
              ...p,
              x: Math.max(5, Math.min(95, pos.x)),
              y: Math.max(8, Math.min(92, pos.y)),
            }
          : p
      )
    );
  }

  function startDrawing(event: React.MouseEvent<HTMLDivElement>) {
    if (!drawMode) return;
    const pos = getFieldPosition(event);
    setLineStart(pos);
    setPreviewLine({
      id: "preview",
      startX: pos.x,
      startY: pos.y,
      endX: pos.x,
      endY: pos.y,
    });
  }

  function updateDrawing(event: React.MouseEvent<HTMLDivElement>) {
    if (!drawMode || !lineStart) return;
    const pos = getFieldPosition(event);
    setPreviewLine({
      id: "preview",
      startX: lineStart.x,
      startY: lineStart.y,
      endX: pos.x,
      endY: pos.y,
    });
  }

  function finishDrawing() {
    if (!previewLine) return;
    setLines((old) => [
      ...old,
      {
        ...previewLine,
        id: Date.now().toString(),
      },
    ]);
    setPreviewLine(null);
    setLineStart(null);
  }

  function saveFormation() {
    if (!formationName.trim()) return;
    const newFormation: Formation = {
      id: Date.now().toString(),
      name: formationName,
      players,
      lines,
      maxFieldPlayers,
    };
    setFormations((old) => [...old, newFormation]);
    setFormationName("");
  }

  function loadFormation(formation: Formation) {
    setPlayers(formation.players);
    setLines(formation.lines);
    setMaxFieldPlayers(formation.maxFieldPlayers);
  }

  function deleteFormation(id: string) {
    setFormations((old) => old.filter((f) => f.id !== id));
  }

  function editFormation(id: string) {
    const formation = formations.find((f) => f.id === id);
    if (!formation) return;
    setFormationName(formation.name);
    setPlayers(formation.players);
    setLines(formation.lines);
    setMaxFieldPlayers(formation.maxFieldPlayers);
    deleteFormation(id);
  }

  function addPlayer() {
    if (!newName.trim()) return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newName,
      number: newNumber,
      team: "green",
      role: "Bank",
      points: Number(newPoints),
      active: false,
      fixedRole: false,
      secondRole: "Feld",
      strengths: "",
      weaknesses: "",
      notes: "",
      favoritePosition: "",
      stickSide: "Festschläger", 
      speed: 3,
      defense: 3,
      ballControl: 3,
      shooting: 3,
      overview: 3,
      x: 0,
      y: 0,
    };
    setPlayers((old) => [...old, newPlayer]);
    setNewName("");
    setNewNumber("");
    setNewPoints(1);
  }

  function updatePlayer(id: string, changes: Partial<Player>) {
    setPlayers((old) =>
      old.map((p) => (p.id === id ? { ...p, ...changes } : p))
    );
  }

  function deletePlayer(id: string) {
    setPlayers((old) => old.filter((p) => p.id !== id));
  }

  function putSelectedOnBank() {
    if (!selectedId) return;
    setPlayers((old) =>
      old.map((p) =>
        p.id === selectedId
          ? { ...p, active: false, role: "Bank", x: 0, y: 0 }
          : p
      )
    );
  }

  const logout = () => {
    localStorage.setItem("screen", "portal");
    setScreen("portal");
    setSelectedId(null);
  };

  function putBankPlayerOnField(player: Player) {
    if (fieldCount >= maxFieldPlayers) {
      alert("Zuerst einen Feldspieler auf die Bank setzen.");
      return;
    }
    setPlayers((old) =>
      old.map((p) =>
        p.id === player.id
          ? { ...p, active: true, role: "Feld", x: 20, y: 20 }
          : p
      )
    );
  }

  function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  if (screen === "portal") {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 rounded-3xl bg-white p-8 shadow">
            <div className="mb-3 font-bold text-green-700">Team Portal</div>
            <h1 className="text-4xl font-extrabold">
              Powerchair Hockey Taktik App
            </h1>
            <p className="mt-3 text-xl text-slate-600">
              Team erstellen oder mit Team-ID und Passwort beitreten.
            </p>
          </div>

          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setPortalMode("join")}
              className={`rounded-2xl px-6 py-3 font-bold ${
                portalMode === "join"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Team beitreten
            </button>

            <button
              onClick={() => setPortalMode("create")}
              className={`rounded-2xl px-6 py-3 font-bold ${
                portalMode === "create"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Team erstellen
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-bold">
              {portalMode === "join" ? "Team beitreten" : "Team erstellen"}
            </h2>

            <div className="space-y-4">
              <input
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Team-ID"
                className="w-full rounded-2xl border px-5 py-4"
              />

              <input
                value={teamPassword}
                onChange={(e) => setTeamPassword(e.target.value)}
                placeholder="Passwort"
                type="password"
                className="w-full rounded-2xl border px-5 py-4"
              />

              <button
                type="button"
                onClick={() => {
                  alert(
                    "Bitte Trainer oder Admin kontaktieren. Passwort zurücksetzen wird später mit Supabase eingebaut."
                  );
                }}
                className="mt-2 text-sm font-bold text-slate-600 underline"
              >
                Passwort vergessen?
              </button>

              <button
                onClick={() => {
                  if (!teamId.trim() || !teamPassword.trim()) {
                    alert("Bitte Team-ID und Passwort eingeben.");
                    return;
                  }

                  localStorage.setItem("teamId", teamId);
                  localStorage.setItem("teamPassword", teamPassword);

                  if (portalMode === "create") {
                    const emptyPlayers = startPlayers;
                    localStorage.setItem("teamId", teamId);
                    localStorage.setItem("teamPassword", teamPassword);
                    localStorage.setItem("players", JSON.stringify(emptyPlayers));
                    localStorage.setItem("formations", JSON.stringify([]));
                    localStorage.setItem("clubName", "");
                    localStorage.setItem("ownColor", "#16a34a");
                    localStorage.setItem("opponentColor", "#111827");
                    localStorage.removeItem("logo");

                    setPlayers(emptyPlayers);
                    setFormations([]);
                    setClubName("");
                    setLogo(null);
                    setOwnColor("#16a34a");
                    setOpponentColor("#111827");
                  }

                  localStorage.setItem("screen", "setup");
                  setScreen("setup");
                }}
                className="w-full rounded-2xl bg-green-600 px-6 py-4 font-bold text-white"
              >
                {portalMode === "join" ? "Beitreten" : "Team erstellen"}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (screen === "setup") {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
          >
            Abmelden
          </button>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-3xl bg-white p-8 shadow">
            <div className="mb-3 font-bold text-green-700">Start-Menü</div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold">{clubName}</h1>
                <p className="mt-3 text-xl text-slate-600">
                  Richte zuerst dein Team ein. Danach kommst du zur Tafel.
                </p>
              </div>

              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  className="h-24 w-24 rounded-2xl object-contain"
                />
              )}
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setSetupStep(step)}
                className={`rounded-2xl px-6 py-3 font-bold ${
                  setupStep === step
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700"
                }`}
              >
                Schritt {step}
              </button>
            ))}
          </div>

          {setupStep === 1 && (
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl font-bold">1. Clubname</h2>
              <input
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="w-full rounded-2xl border px-5 py-4 text-xl"
              />
            </div>
          )}

          {setupStep === 2 && (
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl font-bold">2. Logo & Farben</h2>

              <label className="inline-block cursor-pointer rounded-xl bg-slate-900 px-5 py-3 font-bold text-white">
                Logo auswählen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {logo && (
                <div className="mt-4 rounded-2xl border p-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="mx-auto h-40 object-contain"
                  />
                </div>
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 font-bold">Farbe eigenes Team</div>
                  <input
                    type="color"
                    value={ownColor}
                    onChange={(e) => setOwnColor(e.target.value)}
                    className="h-14 w-full"
                  />
                </div>

                <div>
                  <div className="mb-2 font-bold">Farbe Gegner</div>
                  <input
                    type="color"
                    value={opponentColor}
                    onChange={(e) => setOpponentColor(e.target.value)}
                    className="h-14 w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {setupStep === 3 && (
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl font-bold">3. Grundregel</h2>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setMaxFieldPlayers(3)}
                  className={`rounded-xl px-5 py-3 font-bold text-white ${
                    maxFieldPlayers === 3 ? "bg-orange-600" : "bg-slate-500"
                  }`}
                >
                  3 Feldspieler
                </button>

                <button
                  onClick={() => setMaxFieldPlayers(4)}
                  className={`rounded-xl px-5 py-3 font-bold text-white ${
                    maxFieldPlayers === 4 ? "bg-orange-600" : "bg-slate-500"
                  }`}
                >
                  4 Feldspieler
                </button>

                <button
                  onClick={() => setPointsRuleActive(!pointsRuleActive)}
                  className={`rounded-xl px-5 py-3 font-bold text-white ${
                    pointsRuleActive ? "bg-purple-600" : "bg-slate-500"
                  }`}
                >
                  {pointsRuleActive ? "Punkte-Regel AN" : "Punkte-Regel AUS"}
                </button>
              </div>
            </div>
          )}

          {setupStep === 4 && (
            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="mb-4 text-2xl font-bold">4. Spieler bearbeiten</h2>

              <div className="mb-6 rounded-2xl border bg-green-50 p-4">
                <h3 className="mb-3 font-bold text-green-800">
                  Neuen Spieler hinzufügen
                </h3>

                <div className="grid gap-3 md:grid-cols-4">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Name"
                    className="rounded-xl border px-4 py-3"
                  />

                  <input
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                    placeholder="Nummer"
                    className="rounded-xl border px-4 py-3"
                  />

                  <select
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="rounded-xl border px-4 py-3"
                  >
                    {[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addPlayer}
                    className="rounded-xl bg-green-600 px-4 py-3 font-bold text-white"
                  >
                    Spieler hinzufügen
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {players
                  .filter((p) => p.team === "green")
                  .map((player) => (
                    <div
                      key={player.id}
                      className="rounded-2xl border bg-slate-50 p-4"
                    >
                      <div className="mb-3 flex justify-between">
                        <div className="font-bold text-slate-600">
                          Spieler bearbeiten
                        </div>

                        <button
                          onClick={() => deletePlayer(player.id)}
                          className="rounded-lg bg-red-100 px-3 py-1 font-bold text-red-600"
                        >
                          Löschen
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
                        <input
                          value={player.name}
                          onChange={(e) =>
                            updatePlayer(player.id, { name: e.target.value })
                          }
                          className="rounded-xl border px-3 py-3"
                        />

                        <input
                          value={player.number}
                          onChange={(e) =>
                            updatePlayer(player.id, { number: e.target.value })
                          }
                          className="rounded-xl border px-3 py-3"
                        />

                        <select
                          value={player.points}
                          onChange={(e) =>
                            updatePlayer(player.id, {
                              points: Number(e.target.value),
                            })
                          }
                          className="rounded-xl border px-3 py-3"
                        >
                          {[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5].map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>

                        <select
                          value={player.role}
                          onChange={(e) =>
                            updatePlayer(player.id, {
                              role: e.target.value as Role,
                              active: e.target.value !== "Bank",
                            })
                          }
                          className="rounded-xl border px-3 py-3"
                        >
                          <option value="TW">TW</option>
                          <option value="Feld">Feld</option>
                          <option value="Bank">Bank</option>
                        </select>

                        <select
                          value={player.secondRole}
                          onChange={(e) =>
                            updatePlayer(player.id, {
                              secondRole: e.target.value as Role,
                            })
                          }
                          className="rounded-xl border px-3 py-3"
                        >
                          <option value="TW">2. TW</option>
                          <option value="Feld">2. Feld</option>
                          <option value="Bank">2. Bank</option>
                        </select>

                        <select
                          value={player.fixedRole ? "fix" : "frei"}
                          onChange={(e) =>
                            updatePlayer(player.id, {
                              fixedRole: e.target.value === "fix",
                            })
                          }
                          className="rounded-xl border px-3 py-3"
                        >
                          <option value="frei">Rolle frei</option>
                          <option value="fix">Rolle fix</option>
                        </select>
                      </div>

                      <div className="mt-3 rounded-xl bg-slate-100 p-3">
                        <div className="mb-2 font-bold text-green-700">
                          Spielerprofil
                        </div>
<div className="mb-2">
  <div className="text-sm font-bold text-slate-700">
    Schlägerseite
  </div>

  <select
    value={player.stickSide || "Rechts"}
    onChange={(e) =>
      updatePlayer(player.id, {
        stickSide: e.target.value as "Links" | "Rechts" | "Festschläger",
      })
    }
    className="w-full rounded-xl border px-3 py-2"
  >
    <option value="Rechts">Rechts</option>
<option value="Links">Links</option>
<option value="Festschläger">Festschläger</option>
  </select>
</div>

{[
  ["speed", "⚡ Geschwindigkeit"],
  ["defense", "🛡️ Verteidigung"],
  ["ballControl", "✓ Ballkontrolle"],
  ["shooting", "🎯 Schuss"],
  ["overview", "👀 Übersicht"],
].map(([key, label]) => (
  <div key={key} className="mb-2">
    <div className="text-sm font-bold text-slate-700">{label}</div>

    <select
      value={(player as any)[key] || 1}
      onChange={(e) =>
        updatePlayer(player.id, {
          [key]: Number(e.target.value),
        })
      }
      className="w-full rounded-xl border px-3 py-2"
    >
      <option value={1}>⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={5}>⭐⭐⭐⭐⭐</option>
    </select>
  </div>
))}
                        <input
                          value={player.strengths || ""}
                          onChange={(e) =>
                            updatePlayer(player.id, { strengths: e.target.value })
                          }
                          placeholder="Stärken"
                          className="mb-2 w-full rounded-xl border px-3 py-2"
                        />

                        <input
                          value={player.weaknesses || ""}
                          onChange={(e) =>
                            updatePlayer(player.id, { weaknesses: e.target.value })
                          }
                          placeholder="Schwächen"
                          className="mb-2 w-full rounded-xl border px-3 py-2"
                        />

                        <input
                          value={player.favoritePosition || ""}
                          onChange={(e) =>
                            updatePlayer(player.id, { favoritePosition: e.target.value })
                          }
                          placeholder="Lieblingsposition"
                          className="mb-2 w-full rounded-xl border px-3 py-2"
                        />

                        <textarea
                          value={player.notes || ""}
                          onChange={(e) =>
                            updatePlayer(player.id, { notes: e.target.value })
                          }
                          placeholder="Notizen"
                          className="w-full rounded-xl border px-3 py-2"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setSetupStep(Math.max(1, setupStep - 1))}
              className="rounded-2xl bg-white px-6 py-3 font-bold shadow"
            >
              Zurück
            </button>

            {setupStep < 4 ? (
              <button
                onClick={() => setSetupStep(setupStep + 1)}
                className="rounded-2xl bg-slate-900 px-6 py-3 font-bold text-white"
              >
                Weiter
              </button>
            ) : (
              <button
                onClick={() => {
                  localStorage.setItem("screen", "board");
                  setScreen("board");
                }}
                className="rounded-2xl bg-green-600 px-6 py-3 font-bold text-white"
              >
                Zur Tafel
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={logout}
          className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
        >
          Abmelden
        </button>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-4 rounded-2xl bg-white p-4 shadow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {clubName} Taktik-Tafel
              </h1>
              <p className="text-slate-600">
                Spieler antippen und verschieben.
              </p>
            </div>

            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-16 rounded-xl object-contain"
              />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => {
                localStorage.setItem("screen", "setup");
                setScreen("setup");
              }}
              className="rounded-xl bg-slate-900 px-4 py-2 font-bold text-white"
            >
              Start-Menü
            </button>

            <button
              onClick={() => setMaxFieldPlayers(3)}
              className={`rounded-xl px-4 py-2 font-bold text-white ${
                maxFieldPlayers === 3 ? "bg-orange-600" : "bg-slate-500"
              }`}
            >
              3 Feldspieler
            </button>

            <button
              onClick={() => setMaxFieldPlayers(4)}
              className={`rounded-xl px-4 py-2 font-bold text-white ${
                maxFieldPlayers === 4 ? "bg-orange-600" : "bg-slate-500"
              }`}
            >
              4 Feldspieler
            </button>

            <button
              onClick={() => setPointsRuleActive(!pointsRuleActive)}
              className={`rounded-xl px-4 py-2 font-bold text-white ${
                pointsRuleActive ? "bg-purple-600" : "bg-slate-500"
              }`}
            >
              {pointsRuleActive ? "Punkte-Regel AN" : "Punkte-Regel AUS"}
            </button>

            <button
              onClick={() => setDrawMode(!drawMode)}
              className={`rounded-xl px-4 py-2 font-bold text-white ${
                drawMode ? "bg-red-600" : "bg-blue-600"
              }`}
            >
              {drawMode ? "Zeichenmodus AN" : "Zeichenmodus AUS"}
            </button>

            <button
              onClick={() => {
                setLines([]);
                setPreviewLine(null);
                setLineStart(null);
              }}
              className="rounded-xl bg-slate-700 px-4 py-2 font-bold text-white"
            >
              Linien löschen
            </button>

            <input
              value={formationName}
              onChange={(e) => setFormationName(e.target.value)}
              placeholder="Formation Name"
              className="rounded-xl border px-4 py-2"
            />

            <button
              onClick={saveFormation}
              className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white"
            >
              Formation speichern
            </button>
          </div>
        </div>

        <div className="mb-4 rounded-2xl bg-white p-4 text-center font-bold shadow">
          TW: {twCount} · Feldspieler: {fieldCount}/{maxFieldPlayers}
          {pointsRuleActive && (
            <> · Punkte: {totalPoints} / 12</>
          )}

          {pointsRuleActive && totalPoints > 12 && (
            <div className="pointer-events-none mt-2 animate-pulse text-red-600">
              Warnung: über 12 Punkte
            </div>
          )}

          {fieldCount > maxFieldPlayers && (
            <div className="mt-2 animate-pulse text-red-600">
              Zu viele Feldspieler: bitte einen auswählen und auf Bank setzen
            </div>
          )}
        </div>

        <div
          onMouseMove={(e) => {
            if (drawMode) {
              updateDrawing(e);
            } else {
              movePlayer(e);
            }
          }}
          onMouseUp={() => {
            setDraggingId(null);
            if (drawMode) {
              finishDrawing();
            }
          }}
          onMouseLeave={() => {
            setDraggingId(null);
          }}
          onMouseDown={(e) => {
            if (drawMode) {
              startDrawing(e);
            }
          }}
          className={`relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-4 border-slate-800 bg-[#eee7d8] ${
            pointsRuleActive && totalPoints > 12 ? "bg-red-200" : ""
          }`}
        >
          {pointsRuleActive && totalPoints > 12 && (
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
              <div className="animate-pulse rounded-3xl border-4 border-white bg-red-600 px-12 py-8 text-5xl font-extrabold text-white shadow-2xl">
                ⚠️ ÜBER 12 PUNKTE!
              </div>
            </div>
          )}

          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full">
            {previewLine && (
              <line
                x1={`${previewLine.startX}%`}
                y1={`${previewLine.startY}%`}
                x2={`${previewLine.endX}%`}
                y2={`${previewLine.endY}%`}
                stroke="black"
                strokeWidth="5"
              />
            )}

            {lines.map((line) => (
              <line
                key={line.id}
                x1={`${line.startX}%`}
                y1={`${line.startY}%`}
                x2={`${line.endX}%`}
                y2={`${line.endY}%`}
                stroke="black"
                strokeWidth="5"
              />
            ))}
          </svg>

          <div className="absolute inset-[4%] rounded-2xl border-4 border-slate-700"></div>
          <div className="absolute left-1/2 top-[4%] h-[92%] w-1 -translate-x-1/2 bg-slate-700"></div>
          <div className="absolute left-[7%] top-1/2 h-[34%] w-[12%] -translate-y-1/2 border-4 border-slate-700"></div>
          <div className="absolute right-[7%] top-1/2 h-[34%] w-[12%] -translate-y-1/2 border-4 border-slate-700"></div>
          <div className="absolute left-1/2 top-1/2 h-[18%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-700"></div>

          {players
            .filter((p) => p.active)
            .map((player) => {
              const selected = selectedId === player.id;
              const isOwnTW = player.team === "green" && player.role === "TW";

              return (
<button
  key={player.id}
  onDoubleClick={() => setInfoPlayer(player)}
  onMouseDown={(e) => {
  e.stopPropagation();
  setSelectedId(player.id);

  if (player.role === "TW") {
    setSelectedTW(player.id);
  }

  setDraggingId(player.id);
}}

className={`absolute z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 text-xs font-bold text-white shadow-lg ${
                    selected ? "ring-4 ring-yellow-300 scale-110" : ""
                  } ${player.team === "green" ? "border-green-900" : "border-red-600"}`}
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                    background: isOwnTW
                      ? `linear-gradient(135deg, ${ownColor} 50%, #dc2626 50%)`
                      : player.team === "green"
                      ? ownColor
                      : opponentColor,
                  }}
                >
                  <span>{player.number || player.name}</span>
                  

{player.team === "green" && <span>{player.name}</span>}
                </button>
              );
            })}
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow">
          <h2 className="mb-3 text-xl font-bold">Bank</h2>

          <div className="flex flex-wrap gap-4">
            {bankPlayers.map((player) => (
              <button
                key={player.id}
                onDoubleClick={() => setInfoPlayer(player)}
                onClick={() => {
                  setSelectedId(player.id);
                }}
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-green-900 text-xs font-bold text-white shadow-lg ${
                  selectedId === player.id ? "ring-4 ring-yellow-300 scale-110" : ""
                }`}
                style={{ background: ownColor }}
              >
                <span>{player.number}</span>
                <span>{player.name}</span>
              </button>
            ))}
          </div>

          {selectedId && (
            <button
              onClick={putSelectedOnBank}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
            >
              Ausgewählten auf Bank
            </button>
          )}
        </div>

        <button
          onClick={() => {
            const selectedPlayer = players.find((p) => p.id === selectedId);
            if (!selectedPlayer) return;
            putBankPlayerOnField(selectedPlayer);
            setSelectedId(null);
          }}
          className="mt-4 rounded-xl bg-green-600 px-4 py-2 font-bold text-white"
        >
          Ausgewählten ins Feld
        </button>

        <button
          onClick={() => {
            if (!selectedId) {
              alert("Bitte zuerst einen Spieler auswählen.");
              return;
            }

            const selectedPlayer = players.find((p) => p.id === selectedId);

            if (!selectedPlayer) {
              alert("Spieler nicht gefunden.");
              return;
            }

            const canBeTW =
              JSON.stringify(selectedPlayer).toLowerCase().includes("TW");
            if (!canBeTW) {
              alert("Dieser Spieler hat keine TW Rolle.");
              return;
            }

            setPlayers((old) =>
              old.map((p) => {
                if (p.team === selectedPlayer.team && p.role === "TW" && p.active) {
                  return {
                    ...p,
                    active: false,
                    x: 0,
                    y: 0,
                  };
                }
                if (p.id === selectedId) {
                  return {
                    ...p,
                    role: "TW",
                    active: true,
                    x: 14,
                    y: 50,
                  };
                }
                return p;
              })
            );

            setSelectedId(null);
          }}
          className="rounded-xl bg-yellow-500 px-4 py-2 font-bold text-white"
        >
          TW auswechseln
        </button>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow">
          <h2 className="mb-3 text-xl font-bold">Gespeicherte Formationen</h2>

          <div className="flex flex-wrap gap-3">
            {formations.map((formation) => (
              <div key={formation.id} className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => loadFormation(formation)}
                  className="rounded-xl bg-slate-800 px-4 py-2 font-bold text-white"
                >
                  Laden
                </button>

                <button
                  onClick={() => editFormation(formation.id)}
                  className="rounded-xl bg-orange-600 px-4 py-2 font-bold text-white"
                >
                  Bearbeiten
                </button>

                <button
                  onClick={() => deleteFormation(formation.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
                >
                  Löschen
                </button>

                <div className="font-bold">{formation.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {infoPlayer && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[500px] rounded-2xl bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {infoPlayer.name}
        </h2>

        <button
          onClick={() => setInfoPlayer(null)}
          className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
        >
          Schließen
        </button>
      </div>

      <div className="space-y-2">
        <p><b>Nummer:</b> {infoPlayer.number}</p>
        <p><b>Punkte:</b> {infoPlayer.points}</p>
        <p><b>Rolle:</b> {infoPlayer.role}</p>
        <p><b>2. Rolle:</b> {infoPlayer.secondRole}</p>
        <p><b>Schlägerseite:</b> {infoPlayer.stickSide}</p>

        <hr />

        <p><b>Geschwindigkeit:</b> {infoPlayer.speed} ⭐</p>
        <p><b>Verteidigung:</b> {infoPlayer.defense} ⭐</p>
        <p><b>Ballkontrolle:</b> {infoPlayer.ballControl} ⭐</p>
        <p><b>Schuss:</b> {infoPlayer.shooting} ⭐</p>
        <p><b>Übersicht:</b> {infoPlayer.overview} ⭐</p>

        <hr />

        <p><b>Stärken:</b> {infoPlayer.strengths || "-"}</p>
        <p><b>Schwächen:</b> {infoPlayer.weaknesses || "-"}</p>
        <p><b>Lieblingsposition:</b> {infoPlayer.favoritePosition || "-"}</p>
        <p><b>Notizen:</b> {infoPlayer.notes || "-"}</p>
      </div>
    </div>
  </div>
)}
    </main>
  );
}