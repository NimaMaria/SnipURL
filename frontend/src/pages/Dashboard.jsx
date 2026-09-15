import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

const formatLink = (link) => ({
  id: link._id,
  short: link.shortUrl,
  full: link.fullUrl,
  long: link.originalUrl,
  clicks: link.clicks || 0,
  date: new Date(link.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
});

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [stats, setStats] = useState({ totalLinks: 0, totalClicks: 0, activeLinks: 0 });
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showAlias, setShowAlias] = useState(false);
  const [successLink, setSuccessLink] = useState("");
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [editingLink, setEditingLink] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [editAlias, setEditAlias] = useState("");
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const [profileResponse, linksResponse] = await Promise.all([
          api.get("/auth/me"),
          api.get("/links/my-links"),
        ]);

        setUser(profileResponse.data?.user || null);
        setLinks((linksResponse.data?.links || []).map(formatLink));
        setStats(linksResponse.data?.stats || { totalLinks: 0, totalClicks: 0, activeLinks: 0 });
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

  const currentDate = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleCreateNew = () => {
    setActiveView("dashboard");
    setLongUrl("");
    setAlias("");
    setShowAlias(false);
    setSuccessLink("");
    setActionError("");

    window.setTimeout(() => {
      const input = document.getElementById("mainInput");
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
      input?.focus();
    }, 0);
  };

  const shorten = async () => {
    const trimmedUrl = longUrl.trim();
    if (!trimmedUrl) {
      setActionError("Please enter a URL.");
      return;
    }

    try {
      const parsedUrl = new URL(trimmedUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error("Unsupported protocol");
      }
    } catch (error) {
      setActionError("Please enter a valid http:// or https:// link.");
      return;
    }

    setActionError("");

    try {
      const response = await api.post("/links/shorten", {
        originalUrl: trimmedUrl,
        customAlias: showAlias ? alias : undefined,
      });
      const link = response.data?.data;

      setSuccessLink(link.fullUrl);
      setLinks((currentLinks) => [formatLink(link), ...currentLinks]);
      setStats((currentStats) => ({
        ...currentStats,
        totalLinks: currentStats.totalLinks + 1,
        activeLinks: currentStats.activeLinks + 1,
      }));
      setLongUrl("");
      setAlias("");
    } catch (error) {
      setActionError(error.response?.data?.message || "Unable to create the link.");
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const startEditing = (link) => {
    setEditingLink(link.id);
    setEditUrl(link.long);
    setEditAlias(link.short);
    setActionError("");
  };

  const saveEdit = async () => {
    try {
      const response = await api.patch(`/links/${editingLink}`, {
        originalUrl: editUrl,
        customAlias: editAlias,
      });
      const updatedLink = formatLink(response.data?.data);
      setLinks((currentLinks) => currentLinks.map((link) => (
        link.id === editingLink ? updatedLink : link
      )));
      setEditingLink(null);
      setActionError("");
    } catch (error) {
      setActionError(error.response?.data?.message || "Unable to update the link.");
    }
  };

  const deleteLink = (link) => {
    setDeleteCandidate(link);
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;

    try {
      await api.delete(`/links/${deleteCandidate.id}`);
      setLinks((currentLinks) => currentLinks.filter((item) => item.id !== deleteCandidate.id));
      setStats((currentStats) => ({
        ...currentStats,
        totalLinks: Math.max(0, currentStats.totalLinks - 1),
        activeLinks: Math.max(0, currentStats.activeLinks - 1),
        totalClicks: Math.max(0, currentStats.totalClicks - deleteCandidate.clicks),
      }));
      setDeleteCandidate(null);
      setActionError("");
    } catch (error) {
      setActionError(error.response?.data?.message || "Unable to delete the link.");
    }
  };

  const filtered = links.filter((l) => {
    const query = search.toLowerCase();
    return l.short.toLowerCase().includes(query) || l.long.toLowerCase().includes(query);
  });
  const visibleLinks = activeView === "my-links" ? filtered : filtered.slice(0, 5);
  const groupedLinks = visibleLinks.reduce((groups, link) => {
    if (!groups[link.date]) groups[link.date] = [];
    groups[link.date].push(link);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-[#070b1c] text-white flex flex-col font-['Inter']">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex flex-1">
      {/* SIDEBAR */}
      <aside className="w-[250px] hidden md:flex flex-col justify-between bg-[#090f27] border-r border-white/10 p-5 fixed top-[81px] bottom-0">
        <div>
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Workspace</p>
          <nav className="space-y-2 text-[14px]">
            <button type="button" onClick={() => setActiveView("dashboard")} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${activeView === "dashboard" ? "bg-gradient-to-r from-[#ec4899] to-[#6366f1] text-white shadow-lg shadow-indigo-950/40" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><span className="mr-3">⌂</span>Dashboard</button>
            <button type="button" onClick={() => setActiveView("my-links")} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${activeView === "my-links" ? "bg-gradient-to-r from-[#ec4899] to-[#6366f1] text-white shadow-lg shadow-indigo-950/40" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><span className="mr-3">↗</span>My Links</button>
          </nav>
        </div>
        <div className="rounded-2xl border border-[#8b9eff]/20 bg-gradient-to-br from-[#1a2453] to-[#111638] p-4 text-[13px] font-semibold shadow-xl shadow-black/20"><span className="text-[#ff9bc5]"></span> Built for sharing<p className="mt-2 text-[12px] font-normal leading-relaxed text-white/55">Create, manage, and track every link in one place.</p></div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 md:ml-[250px] p-5 md:p-8 lg:p-10 space-y-7">
        {/* TOP */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#9ba8ff]">{activeView === "my-links" ? "Your link library" : "Overview"}</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{activeView === "my-links" ? "My Links" : "Good to see you, "}<span className={activeView === "dashboard" ? "bg-gradient-to-r from-[#ff9bc5] to-[#93a7ff] bg-clip-text text-transparent" : ""}>{activeView === "dashboard" ? (user?.name || "there") : ""}</span></h1>
            <p className="mt-2 text-sm text-white/50">{activeView === "my-links" ? "Every shortened link, organized and ready to manage." : `${currentDate} · Your links at a glance.`}</p>
          </div>
          <button onClick={handleCreateNew} className="w-fit rounded-xl bg-gradient-to-r from-[#ec4899] to-[#6366f1] px-5 py-3 text-[14px] font-semibold shadow-xl shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:shadow-[#6366f1]/20">+ Create New Link</button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "TOTAL LINKS", value: stats.totalLinks, icon: "↗", color: "text-[#9ba8ff]" },
            { label: "TOTAL CLICKS", value: stats.totalClicks, icon: "◉", color: "text-[#ff9bc5]" },
            { label: "ACTIVE LINKS", value: stats.activeLinks, icon: "✓", color: "text-[#8ee7c1]" },
          ].map((s) => (
            <div key={s.label} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101936] p-5 shadow-xl shadow-black/10">
              <div className="absolute -right-5 -top-8 h-24 w-24 rounded-full bg-white/[0.03]" />
              <div className="flex items-start justify-between"><div><p className="text-[11px] font-bold tracking-[0.18em] text-white/45">{s.label}</p><h2 className="mt-2 text-4xl font-semibold tracking-tight text-white">{s.value}</h2></div><div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl font-bold ${s.color}`}>{s.icon}</div></div>
              <p className="mt-4 text-[12px] text-white/40">Updated from your live links</p>
            </div>
          ))}
        </div>

        {activeView === "dashboard" && <>
        {/* HERO SHORTEN BOX - NOTICEABLE */}
        <div className="rounded-3xl bg-gradient-to-r from-[#ec4899] via-[#8b7cff] to-[#6366f1] p-[1px] shadow-2xl shadow-indigo-950/30">
          <div className="rounded-[23px] bg-[#0d1533] p-6 md:p-7">
            <div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff9bc5]">Quick action</p><h3 className="mt-1 text-xl font-semibold">Shorten your next link</h3></div><span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/55 sm:block">Fast & secure</span></div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="mainInput"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                type="url"
                placeholder="Paste your long URL here..."
                className="min-h-[52px] flex-1 rounded-xl border border-white/10 bg-[#070b1c] px-4 py-3.5 text-[15px] text-white outline-none transition focus:border-[#ff9bc5]/70 focus:ring-2 focus:ring-[#ec4899]/15 placeholder:text-white/35"
              />
              <button onClick={shorten} className="min-h-[52px] rounded-xl bg-white px-8 text-[14px] font-bold text-[#17152e] transition hover:bg-[#ffeaf4]">Shorten</button>
            </div>

            {actionError && <p className="mt-3 text-xs text-red-400">{actionError}</p>}

            <div className="flex items-center gap-2 mt-3">
              <input type="checkbox" checked={showAlias} onChange={() => setShowAlias(!showAlias)} className="w-4 h-4" />
              <span className="text-[13px] text-white/65">Customize alias <span className="text-white/35">(optional)</span></span>
            </div>

            {showAlias && (
              <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="your-alias" className="mt-3 w-full rounded-lg border border-white/10 bg-[#070b1c] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff9bc5]/70 md:w-1/3" />
            )}

            {successLink && (
              <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                <div><p className="text-[13px] text-emerald-300">Link created successfully!</p><a href={successLink} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-[#8b9eff] hover:underline break-all">{successLink}</a></div>
                <div className="flex gap-2">
                  <button onClick={() => copy(successLink)} className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-black transition hover:bg-[#eaf0ff]">Copy</button>
                  <button className="rounded-lg bg-white/10 px-4 py-2 text-[13px] text-white transition hover:bg-white/20">QR</button>
                </div>
              </div>
            )}
          </div>
        </div>
        </>}

        {/* LINKS TABLE */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1533] shadow-xl shadow-black/10">
          <div className="flex flex-col gap-4 border-b border-white/10 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9ba8ff]">{activeView === "my-links" ? "Link library" : "Your activity"}</p><h3 className="mt-1 text-xl font-semibold">{activeView === "my-links" ? "All Links by Date" : "Recent Links"}</h3></div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search links..." className="w-full rounded-xl border border-white/10 bg-[#070b1c] px-4 py-2.5 text-[14px] text-white outline-none transition focus:border-[#9ba8ff]/70 md:w-[240px]" />
          </div>

          {editingLink && (
            <div className="mb-5 rounded-2xl border border-[#9ba8ff]/30 bg-[#070b1c] p-5">
              <h4 className="mb-3 text-lg font-semibold">Edit Link</h4>
              <div className="grid gap-2 md:grid-cols-[1fr_180px_auto_auto]">
                <input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} className="rounded-lg border border-white/10 bg-[#101936] px-3 py-2.5 text-[13px] outline-none focus:border-[#9ba8ff]/70" placeholder="Original URL" />
                <input value={editAlias} onChange={(e) => setEditAlias(e.target.value)} className="rounded-lg border border-white/10 bg-[#101936] px-3 py-2.5 text-[13px] outline-none focus:border-[#9ba8ff]/70" placeholder="Short alias" />
                <button type="button" onClick={saveEdit} className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-black">Save</button>
                <button type="button" onClick={() => setEditingLink(null)} className="rounded-lg bg-white/10 px-4 py-2 text-[13px] text-white hover:bg-white/20">Cancel</button>
              </div>
            </div>
          )}

          {visibleLinks.length === 0? (
            <div className="py-12 text-center"><p className="text-sm">No links yet</p><p className="text-xs text-white/40">Create your first link</p></div>
          ) : (
            <div className="overflow-x-auto px-5 pb-4 md:px-6">
            <table className="w-full min-w-[760px] text-left">
              <thead className="text-[13px] text-white/65"><tr><th className="py-3 font-semibold">SHORT LINK</th><th className="font-semibold">ORIGINAL URL</th><th className="font-semibold">CLICKS</th><th className="font-semibold">CREATED</th>{activeView === "my-links" && <th className="font-semibold text-right">ACTIONS</th>}</tr></thead>
              <tbody className="text-[15px]">
                {activeView === "my-links"
                  ? Object.entries(groupedLinks).map(([date, dateLinks]) => (
                    <Fragment key={date}>
                      <tr key={`${date}-heading`} className="border-t border-[#6366f1]/30 bg-[#121e45]">
                        <td colSpan="5" className="py-3 text-[14px] font-semibold text-[#c6d0ff]">{date}</td>
                      </tr>
                      {dateLinks.map((l) => (
                        <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                          <td className="py-4 flex items-center gap-3"><a href={l.full} target="_blank" rel="noreferrer" className="font-medium text-[#b8c4ff] hover:text-white hover:underline break-all">{l.full}</a> <button onClick={() => copy(l.full)} className="w-7 h-7 shrink-0 bg-white/10 rounded text-[12px] text-white hover:bg-white/20">⎙</button></td>
                          <td className="text-white/75 truncate max-w-[220px]">{l.long}</td>
                          <td className="font-semibold text-white">{l.clicks} clicks</td>
                          <td className="text-white/70">{l.date}</td>
                          <td className="text-right whitespace-nowrap"><button type="button" onClick={() => startEditing(l)} className="mr-4 font-medium text-[#b8c4ff] hover:text-white hover:underline">Edit</button><button type="button" onClick={() => deleteLink(l)} className="font-medium text-[#ff9fb8] hover:text-white hover:underline">Delete</button></td>
                        </tr>
                      ))}
                    </Fragment>
                  ))
                  : visibleLinks.map((l) => (
                    <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                      <td className="py-4 flex items-center gap-3"><a href={l.full} target="_blank" rel="noreferrer" className="font-medium text-[#b8c4ff] hover:text-white hover:underline break-all">{l.full}</a> <button onClick={() => copy(l.full)} className="w-7 h-7 shrink-0 bg-white/10 rounded text-[12px] text-white hover:bg-white/20">⎙</button></td>
                      <td className="text-white/75 truncate max-w-[220px]">{l.long}</td>
                      <td className="font-semibold text-white">{l.clicks} clicks</td>
                      <td className="text-white/70">{l.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </main>
      </div>

      {deleteCandidate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="w-full max-w-[430px] rounded-2xl border border-[#6366f1]/40 bg-[#0f1a3a] p-6 shadow-2xl shadow-[#3b82f6]/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ec4899]/15 text-2xl text-[#ff9fb8]">!</div>
            <h2 id="delete-title" className="text-xl font-semibold text-white">Delete this link?</h2>
            <p className="mt-2 break-all text-sm leading-relaxed text-white/70">{deleteCandidate.full}</p>
            <p className="mt-2 text-sm text-white/55">This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setDeleteCandidate(null)} className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10">Cancel</button>
              <button type="button" onClick={confirmDelete} className="rounded-xl bg-gradient-to-r from-[#ec4899] to-[#6366f1] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}