export default function Loader() {
  return (
    <div className="loader-container">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative flex flex-col items-center gap-8">
        {/* Spinning rings */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 border-r-fuchsia-500 loader-ring" />
          {/* Inner ring */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-violet-400 border-l-fuchsia-400 loader-ring-reverse" />
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center loader-logo shadow-2xl shadow-violet-500/40">
            <span className="text-white font-black text-2xl">E</span>
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-3">
            EventHub
          </h1>
          {/* Loading dots */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-400 loader-dot" />
            <div className="w-2 h-2 rounded-full bg-fuchsia-400 loader-dot" />
            <div className="w-2 h-2 rounded-full bg-pink-400 loader-dot" />
            <div className="w-2 h-2 rounded-full bg-violet-400 loader-dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
