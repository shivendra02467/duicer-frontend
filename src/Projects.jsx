import React, { useState, useEffect } from "react";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const CACHE_KEY = "github_repos_cache";
        const CACHE_TIME_KEY = "github_repos_timestamp";
        const ONE_HOUR = 60 * 60 * 1000;

        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTimestamp && now - cachedTimestamp < ONE_HOUR) {
            setRepos(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        fetch("https://api.github.com/users/shivendra02467/repos?sort=updated")
            .then((res) => res.json())
            .then((data) => {
                const originalRepos = Array.isArray(data)
                    ? data.filter((repo) => !repo.fork).slice(0, 6)
                    : [];
                setRepos(originalRepos);
                localStorage.setItem(CACHE_KEY, JSON.stringify(originalRepos));
                localStorage.setItem(CACHE_TIME_KEY, now.toString());
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="w-10 h-10 border-2 border-white/20 border-t-[#ffde59] rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20">
            <div className="max-w-6xl mx-auto">

                <header className="mb-20">
                    <h1 className="text-6xl font-bold uppercase tracking-tighter mb-4">
                        Projects
                    </h1>
                    <div className="h-1.5 w-20 bg-[#ffde59] mb-6"></div>
                    <p className="text-lg text-zinc-500 max-w-lg leading-relaxed">
                        A directory of software experiments, mathematical models, and open-source contributions.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {repos.map((repo) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-[#ffde59] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
                            <div className="relative bg-zinc-950 border border-white/40 p-8 h-full flex flex-col justify-between transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <div>
                                    <div className="mb-6">
                                        <span className="inline-block bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1">
                                            {repo.language || "Project"}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">
                                        {repo.name}
                                    </h2>

                                    <p className="text-zinc-400 text-sm leading-relaxed mb-10 line-clamp-2">
                                        {repo.description || "Experimental technical implementation and logic exploration."}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                                        Source // {repo.id.toString().substring(0, 5)}
                                    </span>
                                    <span className="text-[#ffde59] text-xl font-bold">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <footer className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 font-medium uppercase text-[10px] tracking-[0.3em]">
                        Shivendra / GitHub Public Archive
                    </p>
                    <a
                        href="https://github.com/shivendra02467"
                        className="text-sm font-bold uppercase tracking-widest hover:text-[#ffde59] transition-colors flex items-center gap-2"
                    >
                        All Repositories <span>↗</span>
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default Projects;