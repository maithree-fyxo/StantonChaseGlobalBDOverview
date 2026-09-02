From d8e7be04ab54080f684237af8d36eb9e9b2b97db Mon Sep 17 00:00:00 2001
From: maithree-fyxo <maithree@fyxo.co>
Date: Wed, 2 Sep 2026 12:18:07 +0000
Subject: [PATCH] Add demo Microsoft sign-in screen with sign-out

---
 src/App.jsx | 42 +++++++++++++++++++++++++++++++++++++++++-
 1 file changed, 41 insertions(+), 1 deletion(-)

diff --git a/src/App.jsx b/src/App.jsx
index 11a089d..7b6acf1 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -82,6 +82,20 @@ const STYLES = `
 .access { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--text-muted); }
 .avatar { width: 28px; height: 28px; border-radius: 7px; background: var(--accent); color: #fff; display: grid; place-items: center; font-size: 12px; font-weight: 600; font-family: 'Instrument Sans'; }
 .access .role { font-size: 11px; color: var(--text-faint); }
+.access .grow { flex: 1; min-width: 0; }
+.signout-btn { margin-left: auto; width: 30px; height: 30px; border-radius: 7px; border: 1px solid var(--border); background: transparent; color: var(--text-faint); display: grid; place-items: center; flex-shrink: 0; }
+.signout-btn:hover { color: var(--text); border-color: var(--border-strong); background: var(--surface-2); }
+.login { min-height: 100vh; display: grid; place-items: center; background: var(--bg); padding: 24px; }
+.login-card { width: 100%; max-width: 380px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 40px 32px; text-align: center; box-shadow: var(--shadow); }
+.login-brand { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 26px; }
+.login-brand .brand-logo svg { height: 26px; width: auto; }
+.login-sub { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; }
+.login-title { font-family: 'Instrument Sans'; font-size: 22px; font-weight: 600; margin: 0 0 8px; color: var(--text); }
+.login-note { font-size: 13px; color: var(--text-muted); line-height: 1.5; margin: 0 auto 24px; max-width: 300px; }
+.ms-btn { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--surface); color: var(--text); border: 1px solid var(--border-strong); border-radius: 10px; padding: 12px 16px; font-size: 14px; font-weight: 600; }
+.ms-btn:hover { border-color: var(--accent); color: var(--accent); }
+.login-foot { margin-top: 22px; font-size: 11.5px; color: var(--text-faint); display: inline-flex; align-items: center; gap: 6px; }
+.login-foot .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); display: inline-block; }
 
 /* main */
 .main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
@@ -800,8 +814,29 @@ const NAV = [
   { id: "marketing", label: "Marketing", icon: I.marketing, v2: true },
 ];
 
+function LoginScreen({ onSignIn }) {
+  return (
+    <div className="login">
+      <div className="login-card">
+        <div className="login-brand">
+          <span className="brand-logo" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
+          <span className="login-sub">Global BD Visibility</span>
+        </div>
+        <h1 className="login-title">Sign in</h1>
+        <p className="login-note">Access the Global BD Visibility Layer with your Stanton Chase Microsoft account.</p>
+        <button className="ms-btn" onClick={onSignIn}>
+          <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true"><rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" /><rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" /></svg>
+          Sign in with Microsoft
+        </button>
+        <div className="login-foot"><span className="dot" />Read-only demo · sample data</div>
+      </div>
+    </div>
+  );
+}
+
 export default function App() {
   const [theme, setTheme] = useState("light");
+  const [authed, setAuthed] = useState(false);
   const [page, setPage] = useState("companies");
   const [selectedId, setSelectedId] = useState(null);
   const [selectedConsultant, setSelectedConsultant] = useState(null);
@@ -824,6 +859,8 @@ export default function App() {
   function openCompany(id) { setSelectedId(id); setPage("companies"); setSideOpen(false); }
   const pageTitle = NAV.find((n) => n.id === page)?.label || "";
 
+  if (!authed) return <div className="gbd"><LoginScreen onSignIn={() => setAuthed(true)} /></div>;
+
   return (
     <div className="gbd">
       <div className="shell">
@@ -842,7 +879,10 @@ export default function App() {
           <div className="side-foot">
             <div className="access">
               <span className="avatar">JB</span>
-              <div><div>Jan-Bart Smits</div><div className="role">Semiconductor practice</div></div>
+              <div className="grow"><div>Jan-Bart Smits</div><div className="role">Semiconductor practice</div></div>
+              <button className="signout-btn" onClick={() => setAuthed(false)} title="Sign out" aria-label="Sign out">
+                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
+              </button>
             </div>
           </div>
         </aside>
-- 
2.43.0
