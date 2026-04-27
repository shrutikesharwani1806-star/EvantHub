import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { loginUser } from "../features/auth/authSlice";

export default function LoginPage() {

  
  const {user , isLoading , isSuccess , isError , message} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email : "" , password : ""})

  const { email , password} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const loginData = { ...formData, email: formData.email.toLowerCase() }
    dispatch(loginUser(loginData))
  }

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin/dashboard")
      } else {
        navigate("/profile")
      }
    }
  }, [user, isError, message, navigate])

  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm">
              E
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-sm">Sign in to continue your journey</p>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-violet-400 text-sm cursor-pointer hover:text-violet-300 transition-colors">
                Forgot password?
              </span>
            </div>
            <button type="submit" className="w-full py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
