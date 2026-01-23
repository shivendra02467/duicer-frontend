import React, { useState, useEffect } from "react";

function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_KEY = import.meta.env.VITE_YT_API_KEY;
        const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;
        const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU");
        const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=6&playlistId=${uploadsPlaylistId}&key=${API_KEY}`;

        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setVideos(data.items || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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
                        Videos
                    </h1>
                    <div className="h-1.5 w-20 bg-[#ffde59] mb-6"></div>
                    <p className="text-lg text-zinc-500 max-w-lg leading-relaxed">
                        Visual demonstrations and deep dives into physics, programming, and mathematical theory.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videos.map((video) => {
                        const videoId = video?.contentDetails?.videoId;
                        const snippet = video?.snippet;
                        if (!videoId) return null;

                        const thumbs = snippet.thumbnails;
                        const highResUrl = thumbs?.maxres?.url || thumbs?.standard?.url || thumbs?.high?.url;

                        return (
                            <a
                                key={videoId}
                                href={`https://www.youtube.com/watch?v=${videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-[#ffde59] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
                                <div className="relative bg-zinc-950 border border-white/40 h-full flex flex-col transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <div className="relative aspect-video overflow-hidden border-b border-white/10">
                                        <img
                                            src={highResUrl}
                                            alt={snippet.title}
                                            className="w-full h-full object-cover transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1">
                                                YouTube
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold uppercase tracking-tight mb-3 line-clamp-2">
                                                {snippet.title}
                                            </h2>
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                                                {new Date(snippet.publishedAt).getFullYear()} // Archive
                                            </span>
                                            <span className="text-[#ffde59] text-xl font-bold">▶</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <footer className="mt-24 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 font-medium uppercase text-[10px] tracking-[0.3em]">
                        Duicer / Educational Content
                    </p>
                    <a
                        href="https://www.youtube.com/@duicer"
                        className="text-sm font-bold uppercase tracking-widest hover:text-[#ffde59] transition-colors flex items-center gap-2"
                    >
                        Go to Channel <span>↗</span>
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default Videos;