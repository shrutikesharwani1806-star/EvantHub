import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import Loader from "../components/Loader"

export default function RegisterPage() {

  const {user , isLoading , isSuccess , isError , message} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({name : "" , email : "" , phone : "" , password : ""})

  const {name , email , phone , password} = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const registerData = { ...formData, email: formData.email.toLowerCase() }
    dispatch(registerUser(registerData))
  }

  useEffect(() => {

    if(user){
      navigate("/profile")
    }
  }, [user , isError , message])

  if(isLoading) {
    return (
      <Loader />
    )
  }


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: '2s' }} />

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
          <h1 className="text-2xl font-extrabold text-white mb-2">Create your account</h1>
          <p className="text-slate-400 text-sm">Start discovering unforgettable experiences</p>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-400 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
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
              <label className="block text-slate-400 text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="9215463728"
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
            <button type="submit" className="w-full py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg shadow-violet-500/25 btn-glow">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 font-medium hover:text-violet-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
