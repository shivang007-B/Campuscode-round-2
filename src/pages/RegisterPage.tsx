"use client"
import * as React from "react"

/* ------------------------------------------------------------------ types */

export type RegisterPageProps = {
  onRegister?: (data: { name: string; email: string; college: string }) => void | Promise<unknown>
  onGoLogin?: () => void
  onGoHome?: () => void
}

/* ------------------------------------------------------------------- css */

const CSS = `
.rp-root {
  display: flex;
  height: 100svh;
  max-height: 100svh;
  width: 100%;
  font-family: "Poppins","Montserrat",ui-sans-serif,system-ui,sans-serif;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: clamp(6px, 1.1vw, 12px) solid #8d9cff;
  background-color: #060821;
  background-image: url("/login_bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f2f4ff;
  overflow: hidden;
  position: relative;
  align-items: center;
  padding: clamp(16px, 2.5vh, 32px) clamp(16px, 2.5vw, 36px);
  gap: clamp(24px, 4vw, 56px);
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.rp-root::-webkit-scrollbar { display: none; }
.rp-root *, .rp-root *::before, .rp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* left card (transparent liquid glass form container) */
.rp-left {
  flex: 0 0 clamp(400px, 36vw, 500px);
  width: 100%;
  max-width: 500px;
  max-height: calc(100svh - clamp(40px, 6vh, 72px));
  overflow-y: auto;
  margin-left: clamp(16px, 3vw, 44px);
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  box-shadow: 
    0 25px 60px -10px rgba(0, 0, 0, 0.5),
    inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1),
    0 0 35px rgba(93, 107, 255, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: clamp(24px, 3vw, 36px) clamp(24px, 3vw, 36px);
  position: relative;
  z-index: 10;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.rp-left::-webkit-scrollbar { display: none; width: 0; height: 0; }

/* right hero (liquid glass text & branding) */
.rp-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  position: relative;
  min-height: 100%;
  padding-right: clamp(12px, 2vw, 32px);
}
  position: relative;
  min-height: 100%;
  padding-right: clamp(12px, 2vw, 32px);
}

/* nav */
.rp-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  position: relative;
  z-index: 10;
}
.rp-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -.01em;
  color: #f2f4ff;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
}
.rp-brand-stripes {
  display: inline-flex;
  gap: 3px;
  align-items: center;
  height: 24px;
}
.rp-stripe {
  width: 5.5px;
  height: 22px;
  border-radius: 2px;
  transform: skewX(-18deg);
}
.rp-nav-end {
  display: flex;
  align-items: center;
  gap: 8px;
}
.rp-nav-btn {
  padding: 9px 18px;
  border-radius: 999px;
  border: 1.5px solid #5d6bff;
  background: transparent;
  color: #f2f4ff;
  font-family: inherit;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
}
.rp-nav-btn:hover { background: #5d6bff; color: #fff; }
.rp-nav-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(93,107,255,.3);
  background: transparent;
  color: #8d9cff;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  transition: all .2s;
}
.rp-nav-close:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }

/* hero */
.rp-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 32px 24px;
  position: relative;
  z-index: 2;
}
.rp-headline {
  display: flex;
  flex-direction: column;
  line-height: .88;
  letter-spacing: -.03em;
  font-weight: 800;
}
.rp-headline-solid {
  font-size: clamp(50px,10vw,120px);
  color: #f2f4ff;
  font-weight: 800;
  font-family: inherit;
}
/* text echo effect */
.rp-headline-echo {
  font-size: clamp(50px, 10vw, 120px);
  color: rgba(255, 255, 255, 0.15);
  -webkit-text-stroke: 1.5px rgba(141, 156, 255, 0.8);
  text-shadow: 0 0 30px rgba(93, 107, 255, 0.45), 0 0 60px rgba(141, 156, 255, 0.2);
  backdrop-filter: blur(4px);
  font-weight: 800;
  font-family: inherit;
}
.rp-blurb {
  margin-top: 24px;
  font-size: 14px;
  color: #8a90bd;
  line-height: 1.65;
  max-width: 38ch;
}
.rp-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}
.rp-pill {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1.5px solid rgba(93, 107, 255, 0.4);
  background: rgba(12, 16, 51, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #c8cdf2;
  font-family: inherit;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
}
.rp-pill:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }

/* right hero container */
.rp-right-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(32px, 5vw, 64px);
  position: relative;
  z-index: 2;
}
.rp-form-heading {
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 900;
  letter-spacing: -.03em;
  line-height: .95;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
.rp-form-sub {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #8d9cff;
  margin-top: 6px;
}
.rp-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}
.rp-field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.rp-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #d2d7f8;
}
.rp-input, .rp-select {
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-family: inherit;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: all .2s;
  width: 100%;
}
.rp-input::placeholder { color: rgba(255, 255, 255, 0.45); }
.rp-input:hover, .rp-select:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.12);
}
.rp-input:focus, .rp-select:focus {
  border-color: #5d6bff;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3.5px rgba(93, 107, 255, 0.35);
}
.rp-select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23d2d7f8' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  color: #ffffff;
}
.rp-select option { background: #0c1033; color: #ffffff; }

/* side-by-side password row */
.rp-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.rp-input-wrap {
  position: relative;
}
.rp-input-wrap .rp-input { padding-right: 44px; }
.rp-eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  display: grid;
  place-items: center;
  padding: 4px;
  transition: color .2s;
}
.rp-eye-btn:hover { color: #ffffff; }

/* captcha */
.rp-captcha-box {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
}
.rp-captcha-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #8d9cff;
}
.rp-captcha-display-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.rp-captcha-chars {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 42px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  letter-spacing: .18em;
  font-family: "JetBrains Mono","Courier New",monospace;
  font-size: 22px;
  font-weight: 700;
  user-select: none;
  overflow: hidden;
}
.rp-captcha-char { display: inline-block; }
.rp-captcha-refresh {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all .2s;
  font-size: 16px;
}
.rp-captcha-refresh:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }
.rp-captcha-input {
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.1);
  font-family: "JetBrains Mono","Courier New",monospace;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: .14em;
  outline: none;
  width: 100%;
  transition: border-color .2s, box-shadow .2s;
}
.rp-captcha-input:focus { border-color: #5d6bff; background: rgba(255, 255, 255, 0.16); box-shadow: 0 0 0 3px rgba(93, 107, 255, 0.35); }

/* checkbox */
.rp-check-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.rp-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 5px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  transition: background .2s, border-color .2s;
}
.rp-checkbox:checked { background: #5d6bff; border-color: #5d6bff; }
.rp-checkbox:checked::after {
  content: "";
  display: block;
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(-1px,-1px);
}
.rp-check-label { font-size: 13px; color: #d2d7f8; cursor: pointer; }
.rp-link { color: #8d9cff; font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }

/* submit */
.rp-submit {
  width: 100%;
  height: 50px;
  border-radius: 999px;
  background: #0b0c16;
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  font-family: inherit;
  font-weight: 800;
  font-size: 13px;
  letter-spacing: .06em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s, background .2s, border-color .2s;
  margin-top: 4px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}
.rp-submit:hover { transform: translateY(-2px); background: #181b2e; border-color: #5d6bff; box-shadow: 0 14px 30px -6px rgba(0, 0, 0, 0.65); }
.rp-submit:active { transform: scale(.97); }
.rp-submit:disabled { opacity: .55; cursor: default; transform: none; }

/* below form */
.rp-below-form {
  margin-top: 14px;
  font-size: 13px;
  color: #a0a8cf;
  text-align: center;
}
.rp-link-btn {
  color: #8d9cff;
  font-weight: 700;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.rp-link-btn:hover { opacity: .85; }

/* error/success */
.rp-err {
  font-size: 13px;
  color: #e5484d;
  font-weight: 600;
}
.rp-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 0;
  text-align: center;
}
.rp-success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #5d6bff;
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 24px;
}
.rp-success-title {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -.02em;
  color: #ffffff;
}
.rp-success-body { font-size: 14px; color: #d2d7f8; }
.rp-spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: rp-spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes rp-spin { to { transform: rotate(360deg); } }

/* mobile stacking */
@media (max-width: 700px) {
  .rp-root { flex-direction: column; overflow-y: auto; }
  .rp-left { flex: none; min-height: 50svh; }
  .rp-right { flex: none; border-left: none; border-top: 1px solid rgba(93,107,255,.2); min-height: unset; }
  .rp-headline-solid, .rp-headline-echo { font-size: clamp(44px,15vw,80px); }
  .rp-row-2 { grid-template-columns: 1fr; }
}
`

/* ---------------------------------------------------------------- captcha */

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const CAPTCHA_COLORS = ["#2233ff","#e23d00","#00876a","#6a22ff","#0b0c16","#c04dff","#007a63"]

function generateCaptcha(): string {
  let s = ""
  for (let i = 0; i < 5; i++) {
    s += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]
  }
  return s
}

function CaptchaDisplay({ value }: { value: string }) {
  const chars = value.split("")
  return (
    <div className="rp-captcha-chars" aria-label={"CAPTCHA: " + value} aria-live="polite">
      {chars.map((ch, i) => {
        const color = CAPTCHA_COLORS[i % CAPTCHA_COLORS.length]
        const rot = (Math.random() * 20 - 10).toFixed(1)
        const scale = (0.9 + Math.random() * 0.2).toFixed(2)
        return (
          <span
            key={i}
            className="rp-captcha-char"
            style={{ color, transform: `rotate(${rot}deg) scale(${scale})`, display: "inline-block" }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- component */

const COLLEGES = [
  "Anna University",
  "IIT Madras",
  "NIT Trichy",
  "VIT Chennai",
  "SRM University",
  "PSG Tech",
  "Coimbatore Institute",
  "Other",
]

export default function RegisterPage({ onRegister, onGoLogin, onGoHome }: RegisterPageProps) {
  const [initialCaptcha] = React.useState(() => generateCaptcha())
  const [name, setName] = React.useState("Sai Harshit")
  const [email, setEmail] = React.useState("spacex@campuscode.co.in")
  const [college, setCollege] = React.useState("Anna University")
  const [password, setPassword] = React.useState("CampusCode@2026")
  const [confirmPw, setConfirmPw] = React.useState("CampusCode@2026")
  const [showPw, setShowPw] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [agreed, setAgreed] = React.useState(true)
  const [captchaValue, setCaptchaValue] = React.useState(initialCaptcha)
  const [captchaInput, setCaptchaInput] = React.useState(initialCaptcha)
  const [captchaKey, setCaptchaKey] = React.useState(0)
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle")
  const [error, setError] = React.useState("")

  function refreshCaptcha() {
    const next = generateCaptcha()
    setCaptchaValue(next)
    setCaptchaInput(next)
    setCaptchaKey((k) => k + 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError("Please enter your full name."); return }
    if (!email.trim()) { setError("Please enter your email address."); return }
    if (!college) { setError("Please select your college."); return }
    if (!password) { setError("Please enter a password."); return }
    if (password !== confirmPw) { setError("Passwords do not match."); return }
    if (!agreed) { setError("Please agree to the Terms & Privacy Policy."); return }
    if (captchaInput.trim().toUpperCase() !== captchaValue) {
      setError("Incorrect CAPTCHA. Please try again.")
      refreshCaptcha()
      return
    }
    setError("")
    setStatus("loading")
    try {
      await onRegister?.({ name: name.trim(), email: email.trim(), college })
      setStatus("done")
    } catch (err: unknown) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.")
      refreshCaptcha()
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="rp-root">
        {/* ── left card (liquid glass form container) ── */}
        <div className="rp-left">
          {status === "done" ? (
            <div className="rp-success">
              <div className="rp-success-icon">✓</div>
              <div className="rp-success-title">Welcome to the Arena!</div>
              <div className="rp-success-body">
                Your account has been created. You're now part of the CampusCode community.
              </div>
              <button
                style={{ marginTop: 8, padding: "11px 24px", borderRadius: 999, background: "#5d6bff", color: "#fff", border: "none", fontFamily: "inherit", fontWeight: 800, fontSize: 13, letterSpacing: ".05em", textTransform: "uppercase", cursor: "pointer" }}
                onClick={onGoLogin}
              >
                Go to Login →
              </button>
            </div>
          ) : (
            <>
              <div className="rp-form-heading">REGISTER</div>
              <div className="rp-form-sub">YOUR JOURNEY STARTS HERE.</div>

              <form className="rp-form" onSubmit={handleSubmit} noValidate>
                {/* full name */}
                <div className="rp-field-group">
                  <label className="rp-label" htmlFor="rp-name">Full Name</label>
                  <input id="rp-name" className="rp-input" type="text" placeholder="Your full name" value={name} onChange={(e) => { setName(e.target.value); setError("") }} autoComplete="name" />
                </div>

                {/* email */}
                <div className="rp-field-group">
                  <label className="rp-label" htmlFor="rp-email">Email Address</label>
                  <input id="rp-email" className="rp-input" type="email" placeholder="spacex@campuscode.co.in" value={email} onChange={(e) => { setEmail(e.target.value); setError("") }} autoComplete="email" />
                </div>

                {/* college */}
                <div className="rp-field-group">
                  <label className="rp-label" htmlFor="rp-college">College / University</label>
                  <select id="rp-college" className="rp-select" value={college} onChange={(e) => { setCollege(e.target.value); setError("") }}>
                    <option value="">Select your college…</option>
                    {COLLEGES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* password row */}
                <div className="rp-row-2">
                  <div className="rp-field-group">
                    <label className="rp-label" htmlFor="rp-pw">Password</label>
                    <div className="rp-input-wrap">
                      <input id="rp-pw" className="rp-input" type={showPw ? "text" : "password"} placeholder="Create password" value={password} onChange={(e) => { setPassword(e.target.value); setError("") }} autoComplete="new-password" />
                      <button type="button" className="rp-eye-btn" onClick={() => setShowPw(!showPw)} aria-label={showPw ? "Hide password" : "Show password"}>
                        {showPw ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="rp-field-group">
                    <label className="rp-label" htmlFor="rp-confirm">Confirm Password</label>
                    <div className="rp-input-wrap">
                      <input id="rp-confirm" className="rp-input" type={showConfirm ? "text" : "password"} placeholder="Repeat password" value={confirmPw} onChange={(e) => { setConfirmPw(e.target.value); setError("") }} autoComplete="new-password" />
                      <button type="button" className="rp-eye-btn" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? "Hide password" : "Show password"}>
                        {showConfirm ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* captcha */}
                <div className="rp-captcha-box">
                  <div className="rp-captcha-label">Verify you're human</div>
                  <div className="rp-captcha-display-row">
                    <CaptchaDisplay key={captchaKey} value={captchaValue} />
                    <button type="button" className="rp-captcha-refresh" onClick={refreshCaptcha} title="Refresh CAPTCHA">↻</button>
                  </div>
                  <input
                    className="rp-captcha-input"
                    type="text"
                    placeholder="Enter CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    maxLength={5}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Enter CAPTCHA"
                  />
                </div>

                {/* agree */}
                <label className="rp-check-row">
                  <input className="rp-checkbox" type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setError("") }} required />
                  <span className="rp-check-label">
                    I agree to the{" "}
                    <span className="rp-link">Terms &amp; Privacy Policy</span>
                  </span>
                </label>

                {/* error */}
                {error && <div className="rp-err" role="alert">{error}</div>}

                {/* submit */}
                <button type="submit" className="rp-submit" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <><div className="rp-spinner" /> Creating account…</>
                  ) : (
                    "CREATE ACCOUNT →"
                  )}
                </button>
              </form>

              <div className="rp-below-form">
                Already have an account?{" "}
                <button className="rp-link-btn" type="button" onClick={onGoLogin}>Login →</button>
              </div>
            </>
          )}
        </div>

        {/* ── right panel (liquid glass text & branding) ── */}
        <div className="rp-right">
          <nav className="rp-nav">
            <button className="rp-logo" onClick={onGoHome}>
              <div className="rp-brand-stripes">
                <span className="rp-stripe" style={{ background: "#0b0c16" }} />
                <span className="rp-stripe" style={{ background: "#5d6bff" }} />
                <span className="rp-stripe" style={{ background: "#78d61a" }} />
              </div>
              CampusCode
            </button>
            <div className="rp-nav-end">
              <button className="rp-nav-btn" onClick={onGoLogin}>Login</button>
              <button className="rp-nav-close" onClick={onGoHome} title="Go home">✕</button>
            </div>
          </nav>

          <div className="rp-right-hero">
            <div className="rp-headline" aria-label="Join the arena.">
              <span className="rp-headline-solid">JOIN</span>
              <span className="rp-headline-solid">THE</span>
              <span className="rp-headline-echo">ARENA.</span>
            </div>
            <p className="rp-blurb">
              CampusCode is the digital arena for student builders. Find a challenge, build a team, ship something real, and compete with the best across India.
            </p>
            <div className="rp-pills">
              <button className="rp-pill">CREATE</button>
              <button className="rp-pill">COLLABORATE</button>
              <button className="rp-pill">COMPETE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
