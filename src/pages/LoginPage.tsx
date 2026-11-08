"use client"
import * as React from "react"

/* ------------------------------------------------------------------ types */

export type LoginPageProps = {
  onLogin?: (email: string, password: string) => void | Promise<unknown>
  onGoRegister?: () => void
  onGoHome?: () => void
}

/* ------------------------------------------------------------------- css */

const CSS = `
.lp-root {
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
.lp-root::-webkit-scrollbar { display: none; }
.lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* left card (transparent liquid glass form container) */
.lp-left {
  flex: 0 0 clamp(380px, 34vw, 470px);
  width: 100%;
  max-width: 470px;
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
  justify-content: center;
  padding: clamp(28px, 3.5vw, 44px) clamp(24px, 3vw, 38px);
  position: relative;
  z-index: 10;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.lp-left::-webkit-scrollbar { display: none; width: 0; height: 0; }

/* right hero (liquid glass text) */
.lp-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  position: relative;
  min-height: 100%;
  padding-right: clamp(12px, 2vw, 32px);
}

/* nav */
.lp-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  position: relative;
  z-index: 10;
}
.lp-logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -.01em;
  color: #f2f4ff;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
}
.lp-brand-stripes {
  display: inline-flex;
  gap: 3px;
  align-items: center;
  height: 24px;
}
.lp-stripe {
  width: 5.5px;
  height: 22px;
  border-radius: 2px;
  transform: skewX(-18deg);
}
.lp-nav-end {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-nav-btn {
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
.lp-nav-btn:hover { background: #5d6bff; color: #fff; }
.lp-nav-close {
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
.lp-nav-close:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }

/* hero */
.lp-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 32px 24px;
  position: relative;
  z-index: 2;
}
.lp-headline {
  display: flex;
  flex-direction: column;
  line-height: .88;
  letter-spacing: -.03em;
  font-weight: 800;
}
.lp-headline-solid {
  font-size: clamp(50px,10vw,120px);
  color: #f2f4ff;
  font-weight: 800;
  font-family: inherit;
}
/* text echo effect */
.lp-headline-echo {
  font-size: clamp(50px, 10vw, 120px);
  color: rgba(255, 255, 255, 0.15);
  -webkit-text-stroke: 1.5px rgba(141, 156, 255, 0.8);
  text-shadow: 0 0 30px rgba(93, 107, 255, 0.45), 0 0 60px rgba(141, 156, 255, 0.2);
  backdrop-filter: blur(4px);
  font-weight: 800;
  font-family: inherit;
}
.lp-blurb {
  margin-top: 24px;
  font-size: 14px;
  color: #8a90bd;
  line-height: 1.65;
  max-width: 38ch;
}
.lp-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}
.lp-pill {
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
.lp-pill:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }

/* right hero container */
.lp-right-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(32px, 5vw, 64px);
  position: relative;
  z-index: 2;
}
.lp-form-heading {
  font-size: clamp(30px, 3.2vw, 42px);
  font-weight: 900;
  letter-spacing: -.03em;
  line-height: .95;
  color: #ffffff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}
.lp-form-sub {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #8d9cff;
  margin-top: 6px;
}
.lp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}
.lp-field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lp-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #d2d7f8;
}
.lp-input {
  height: 48px;
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
.lp-input::placeholder { color: rgba(255, 255, 255, 0.45); }
.lp-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.12);
}
.lp-input:focus {
  border-color: #5d6bff;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3.5px rgba(93, 107, 255, 0.35);
}
.lp-input-wrap {
  position: relative;
}
.lp-input-wrap .lp-input { padding-right: 48px; }
.lp-eye-btn {
  position: absolute;
  right: 14px;
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
.lp-eye-btn:hover { color: #ffffff; }

/* captcha */
.lp-captcha-box {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
}
.lp-captcha-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #8d9cff;
}
.lp-captcha-display-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lp-captcha-chars {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 44px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  letter-spacing: .18em;
  font-family: "JetBrains Mono","Courier New",monospace;
  font-size: 22px;
  font-weight: 700;
  user-select: none;
  overflow: hidden;
  position: relative;
}
.lp-captcha-char {
  display: inline-block;
  transform-origin: center;
}
.lp-captcha-refresh {
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
.lp-captcha-refresh:hover { background: #5d6bff; color: #fff; border-color: #5d6bff; }
.lp-captcha-input {
  height: 42px;
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
.lp-captcha-input:focus { border-color: #5d6bff; background: rgba(255, 255, 255, 0.16); box-shadow: 0 0 0 3px rgba(93, 107, 255, 0.35); }
.lp-captcha-input[data-invalid="true"] { border-color: #e5484d; }

/* checkbox */
.lp-check-row {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.lp-checkbox {
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
.lp-checkbox:checked { background: #5d6bff; border-color: #5d6bff; }
.lp-checkbox:checked::after {
  content: "";
  display: block;
  width: 5px;
  height: 9px;
  border: 2px solid #fff;
  border-top: none;
  border-left: none;
  transform: rotate(45deg) translate(-1px,-1px);
}
.lp-check-label { font-size: 13px; color: #d2d7f8; cursor: pointer; }

/* submit */
.lp-submit {
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
.lp-submit:hover { transform: translateY(-2px); background: #181b2e; border-color: #5d6bff; box-shadow: 0 14px 30px -6px rgba(0, 0, 0, 0.65); }
.lp-submit:active { transform: scale(.97); }
.lp-submit:disabled { opacity: .55; cursor: default; transform: none; }

/* below form */
.lp-below-form {
  margin-top: 16px;
  font-size: 13px;
  color: #a0a8cf;
  text-align: center;
}
.lp-link {
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
.lp-link:hover { opacity: .85; }

/* error/success */
.lp-err {
  font-size: 13px;
  color: #d92438;
  font-weight: 600;
  margin-top: -4px;
}
.lp-spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: lp-spin .7s linear infinite;
  flex-shrink: 0;
}
@keyframes lp-spin { to { transform: rotate(360deg); } }

/* mobile stacking */
@media (max-width: 700px) {
  .lp-root { flex-direction: column; overflow-y: auto; }
  .lp-left { flex: none; min-height: 50svh; }
  .lp-right { flex: none; border-left: none; border-top: 1px solid rgba(93,107,255,.2); min-height: unset; }
  .lp-headline-solid, .lp-headline-echo { font-size: clamp(44px,15vw,80px); }
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
    <div className="lp-captcha-chars" aria-label={"CAPTCHA: " + value} aria-live="polite">
      {chars.map((ch, i) => {
        const color = CAPTCHA_COLORS[i % CAPTCHA_COLORS.length]
        const rot = (Math.random() * 20 - 10).toFixed(1)
        const scale = (0.9 + Math.random() * 0.2).toFixed(2)
        return (
          <span
            key={i}
            className="lp-captcha-char"
            style={{
              color,
              transform: `rotate(${rot}deg) scale(${scale})`,
              display: "inline-block",
            }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- component */

export default function LoginPage({ onLogin, onGoRegister, onGoHome }: LoginPageProps) {
  const [initialCaptcha] = React.useState(() => generateCaptcha())
  const [email, setEmail] = React.useState("spacex@campuscode.co.in")
  const [password, setPassword] = React.useState("CampusCode@2026")
  const [showPw, setShowPw] = React.useState(false)
  const [remember, setRemember] = React.useState(true)
  const [captchaValue, setCaptchaValue] = React.useState(initialCaptcha)
  const [captchaInput, setCaptchaInput] = React.useState(initialCaptcha)
  const [captchaKey, setCaptchaKey] = React.useState(0)
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle")
  const [error, setError] = React.useState("")

  function refreshCaptcha() {
    const next = generateCaptcha()
    setCaptchaValue(next)
    setCaptchaInput(next)
    setCaptchaKey((k) => k + 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) { setError("Please enter your email address."); return }
    if (!password) { setError("Please enter your password."); return }
    if (captchaInput.trim().toUpperCase() !== captchaValue) {
      setError("Incorrect CAPTCHA. Please try again.")
      refreshCaptcha()
      return
    }
    setError("")
    setStatus("loading")
    try {
      await onLogin?.(email.trim(), password)
    } catch (err: unknown) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
      refreshCaptcha()
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="lp-root">
        {/* ── left card (liquid glass form container) ── */}
        <div className="lp-left">
          <div className="lp-form-heading">LOGIN</div>
          <div className="lp-form-sub">YOUR ARENA.</div>

          <form className="lp-form" onSubmit={handleSubmit} noValidate>
            {/* email */}
            <div className="lp-field-group">
              <label className="lp-label" htmlFor="lp-email">Email Address</label>
              <input
                id="lp-email"
                className="lp-input"
                type="email"
                placeholder="spacex@campuscode.co.in"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError("") }}
                autoComplete="email"
              />
            </div>

            {/* password */}
            <div className="lp-field-group">
              <label className="lp-label" htmlFor="lp-pw">Password</label>
              <div className="lp-input-wrap">
                <input
                  id="lp-pw"
                  className="lp-input"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* captcha */}
            <div className="lp-captcha-box">
              <div className="lp-captcha-label">Verify you're human</div>
              <div className="lp-captcha-display-row">
                <CaptchaDisplay key={captchaKey} value={captchaValue} />
                <button type="button" className="lp-captcha-refresh" onClick={refreshCaptcha} title="Refresh CAPTCHA">↻</button>
              </div>
              <input
                className="lp-captcha-input"
                type="text"
                placeholder="Enter CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                maxLength={5}
                autoComplete="off"
                spellCheck={false}
                data-invalid={captchaInput.length > 0 && captchaInput.toUpperCase() !== captchaValue.substring(0, captchaInput.length) ? "true" : "false"}
                aria-label="Enter CAPTCHA"
              />
            </div>

            {/* remember */}
            <label className="lp-check-row">
              <input
                className="lp-checkbox"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="lp-check-label">Remember me</span>
            </label>

            {/* error */}
            {error && <div className="lp-err" role="alert">{error}</div>}

            {/* submit */}
            <button type="submit" className="lp-submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <><div className="lp-spinner" /> Logging in…</>
              ) : (
                "LOGIN →"
              )}
            </button>
          </form>

          <div className="lp-below-form">
            New here?{" "}
            <button className="lp-link" type="button" onClick={onGoRegister}>
              Create an account →
            </button>
          </div>
        </div>

        {/* ── right panel (liquid glass text & branding) ── */}
        <div className="lp-right">
          {/* nav */}
          <nav className="lp-nav">
            <button className="lp-logo" onClick={onGoHome}>
              <div className="lp-brand-stripes">
                <span className="lp-stripe" style={{ background: "#0b0c16" }} />
                <span className="lp-stripe" style={{ background: "#5d6bff" }} />
                <span className="lp-stripe" style={{ background: "#78d61a" }} />
              </div>
              CampusCode
            </button>
            <div className="lp-nav-end">
              <button className="lp-nav-btn" onClick={onGoRegister}>Register</button>
              <button className="lp-nav-close" onClick={onGoHome} title="Go home">✕</button>
            </div>
          </nav>

          {/* hero with liquid glass text */}
          <div className="lp-right-hero">
            <div className="lp-headline" aria-label="Enter the arena.">
              <span className="lp-headline-solid">ENTER</span>
              <span className="lp-headline-solid">THE</span>
              <span className="lp-headline-echo">ARENA.</span>
            </div>
            <p className="lp-blurb">
              Log in to your CampusCode account and step back into the arena. Your hackathons, your team, your wins — all waiting.
            </p>
            <div className="lp-pills">
              <button className="lp-pill">ENTER</button>
              <button className="lp-pill">COMPETE</button>
              <button className="lp-pill">SHIP</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
