From 7c404d9b60867b414faa30c55ca5807ff7367055 Mon Sep 17 00:00:00 2001
From: maithree-fyxo <maithree@fyxo.co>
Date: Mon, 31 Aug 2026 11:41:45 +0000
Subject: [PATCH] Add Revenue by office breakdown under the chart
 (Collected/Scheduled, office-group attribution)

---
 src/App.jsx | 77 ++++++++++++++++++++++++++++++++++++++++++++++++++---
 1 file changed, 74 insertions(+), 3 deletions(-)

diff --git a/src/App.jsx b/src/App.jsx
index a60657f..11a089d 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -236,6 +236,11 @@ const STYLES = `
 .resolved-tag { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-muted); border: 1px solid var(--border); border-radius: 999px; padding: 4px 11px; font-weight: 500; }
 .resolved-tag svg { color: var(--text-faint); }
 .owner-office { font-size: 11px; color: var(--text-faint); margin-top: 1px; }
+.office-rev { margin-top: 18px; }
+.office-rev-head { font-family: 'Instrument Sans'; font-weight: 600; font-size: 14px; margin-bottom: 10px; }
+.office-rev table td:last-child, .office-rev table th:last-child { text-align: right; }
+.office-rev .office-total td { border-top: 1.5px solid var(--border-strong); }
+.office-rev-empty { font-size: 13px; color: var(--text-muted); padding: 6px 0; }
 .co-head { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 20px 40px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
 .co-ident { display: flex; align-items: center; gap: 16px; }
 .co-title h2 { font-family: 'Instrument Sans'; font-weight: 600; font-size: clamp(26px,4vw,36px); letter-spacing: -.02em; margin: 0; line-height: 1; }
@@ -421,7 +426,7 @@ const COMPANIES = [
     projects: [
       { dataType: "assignment", owner: "David Kessler", title: "VP Data Center Sales", fn: "Sales", status: "Active", loc: "Santa Clara", date: "Jun 2026", entity: "US" },
       { dataType: "assignment", owner: "Markus Hoffmann", title: "Head of Automotive EMEA", fn: "General Mgmt", status: "In progress", loc: "Frankfurt", date: "May 2026", entity: "Germany" },
-      { dataType: "assignment", owner: "Aiko Tanaka", title: "Director of AI Research", fn: "R&D", status: "Closed", loc: "Bangalore", date: "Feb 2026", entity: "India" },
+      { dataType: "assignment", owner: "Aiko Tanaka", ownerGroup: "APAC", title: "Director of AI Research", fn: "R&D", status: "Closed", loc: "Bangalore", date: "Feb 2026", entity: "India" },
       { dataType: "opportunity", owner: "David Kessler", title: "AI Infrastructure – Chief Architect", fn: "R&D", status: "Negotiation", value: 320000, date: "Aug 2026", entity: "US" },
       { dataType: "opportunity", owner: "Markus Hoffmann", title: "EMEA Automotive GM search", fn: "General Mgmt", status: "Proposal sent", value: 180000, date: "Jul 2026", entity: "Germany" },
       { dataType: "opportunity", owner: "Aiko Tanaka", title: "India R&D leadership scale-up", fn: "R&D", status: "Prospecting", value: 150000, date: "Sep 2026", entity: "India" },
@@ -625,6 +630,54 @@ function revSeries(c, scope, kind) {
 const fmt = (v) => v >= 1e6 ? "$" + (v / 1e6).toFixed(1) + "M" : v >= 1e3 ? "$" + Math.round(v / 1e3) + "k" : "$" + v;
 const fmtBig = (v) => v >= 1e6 ? "$" + (v / 1e6).toFixed(2) + "M" : v >= 1e3 ? "$" + Math.round(v / 1e3) + "k" : "$" + v;
 
+/* office-group rollup (dummy mapping for demo) — office cities resolve to their office group */
+const OFFICE_GROUP = {
+  "Santa Clara": "North America", "Baltimore": "North America", "Irving": "North America",
+  "New York": "North America", "San Jose": "North America", "Phoenix": "North America",
+  "Chandler": "North America", "Toronto": "North America",
+  "Frankfurt": "EMEA", "London": "EMEA", "Dublin": "EMEA", "Amsterdam": "EMEA",
+  "Eindhoven": "EMEA", "Munich": "EMEA", "Paris": "EMEA",
+  "Tokyo": "APAC", "Bangalore": "APAC", "Taipei": "APAC", "Hsinchu": "APAC",
+  "Singapore": "APAC", "Seoul": "APAC", "Shanghai": "APAC",
+};
+const groupOfOffice = (office) => {
+  if (!office) return "Other";
+  if (OFFICE_GROUP[office]) return OFFICE_GROUP[office];
+  const hit = Object.keys(OFFICE_GROUP).find((city) => office.includes(city));
+  return hit ? OFFICE_GROUP[hit] : "Other";
+};
+/* an assignment books to the office group named in its owner field, else the primary owner's office group */
+const assignmentGroup = (c, a) => {
+  if (a.ownerGroup) return a.ownerGroup;
+  const con = c.consultants.find((x) => x.name === a.owner);
+  return groupOfOffice(con ? con.office : a.loc);
+};
+/* distribute revenue across office groups; reconciles to the scope total (offices with $0 are dropped) */
+function revenueByOffice(c, scope, kind) {
+  const entities = scope ? c.entities.filter((e) => e.key === scope) : c.entities;
+  const acc = {};
+  const add = (g, v) => { acc[g] = (acc[g] || 0) + v; };
+  entities.forEach((e) => {
+    const rev = (c.revenue[e.key]?.[kind] || []).reduce((a, b) => a + b, 0);
+    if (rev <= 0) return;
+    const asg = c.projects.filter((p) => p.dataType === "assignment" && p.entity === e.key);
+    if (asg.length) {
+      const per = rev / asg.length;
+      asg.forEach((a) => add(assignmentGroup(c, a), per));
+    } else {
+      add(groupOfOffice(e.loc), rev); // no assignment on this entity — book to its own office group
+    }
+  });
+  const total = Math.round(Object.values(acc).reduce((a, b) => a + b, 0));
+  const rows = Object.entries(acc)
+    .map(([group, amount]) => ({ group, amount: Math.round(amount / 1000) * 1000 }))
+    .filter((r) => r.amount > 0)
+    .sort((a, b) => b.amount - a.amount);
+  const drift = total - rows.reduce((a, r) => a + r.amount, 0);
+  if (rows.length && drift !== 0) rows[0].amount += drift; // fold rounding drift into the top row so it reconciles
+  return { rows, total };
+}
+
 /* logo/image helpers — always inherited from the HQ record (company.image) */
 const companyMono = (name) => {
   const w = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
@@ -1012,9 +1065,9 @@ function CompanyView({ company: c }) {
         {tab === "consultants" && <Table head={["Consultant", "SC Office", "Assigned entity", "Last activity"]} empty={emptyMsg("consultants", scopeEntity)}
           rows={f.consultants.map((x, i) => <tr key={i}><td className="cell-strong">{x.name}</td><td className="cell-muted">{x.office}</td><td>{entName(x.entity)}</td><td className="cell-muted">{x.last}</td></tr>)} />}
         {tab === "assignments" && <Table head={["Assignment", "Function", "Status", "Location", "Assignment owner", "Date", "Entity"]} empty={emptyMsg("assignments", scopeEntity)}
-          rows={f.assignments.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{statusPill(x.status)}</td><td className="cell-muted">{x.loc}</td><td><div className="cell-strong">{x.owner}</div><div className="owner-office">{ownerOffice(c, x.owner)}</div></td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
+          rows={f.assignments.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{statusPill(x.status)}</td><td className="cell-muted">{x.loc}</td><td>{x.ownerGroup ? <><div className="cell-strong">{x.ownerGroup}</div><div className="owner-office">office group</div></> : <><div className="cell-strong">{x.owner}</div><div className="owner-office">{ownerOffice(c, x.owner)}</div></>}</td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
         {tab === "opportunities" && <Table head={["Opportunity", "Function", "Stage", "Est. fee", "Opportunity owner", "Target date", "Entity"]} empty={emptyMsg("opportunities", scopeEntity)}
-          rows={f.opportunities.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{oppPill(x.status)}</td><td className="cell-num">{fmt(x.value)}</td><td><div className="cell-strong">{x.owner}</div><div className="owner-office">{ownerOffice(c, x.owner)}</div></td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
+          rows={f.opportunities.map((x, i) => <tr key={i}><td><RecordLink href={ezUrl("project", x.title)}>{x.title}</RecordLink></td><td className="cell-muted">{x.fn}</td><td>{oppPill(x.status)}</td><td className="cell-num">{fmt(x.value)}</td><td>{x.ownerGroup ? <><div className="cell-strong">{x.ownerGroup}</div><div className="owner-office">office group</div></> : <><div className="cell-strong">{x.owner}</div><div className="owner-office">{ownerOffice(c, x.owner)}</div></>}</td><td className="cell-muted">{x.date}</td><td><span className="entity-tag">{x.entity}</span></td></tr>)} />}
         {tab === "revenues" && <RevenuesTab c={c} scope={scope} scopeEntity={scopeEntity} />}
         {tab === "news" && <ComingSoon feature="News" />}
         {tab === "signals" && <ComingSoon feature="Signals" />}
@@ -1039,6 +1092,7 @@ function RevenuesTab({ c, scope, scopeEntity }) {
   const [sub, setSub] = useState("collected");
   const series = revSeries(c, scope, sub);
   const total = series.reduce((a, b) => a + b, 0);
+  const office = revenueByOffice(c, scope, sub);
   const max = Math.max(...series, 1);
   const label = sub === "collected" ? "Collected revenue" : "Scheduled revenue";
   const totalCap = sub === "collected" ? "year to date · FY2026" : "full year · FY2026 (forecast)";
@@ -1076,6 +1130,23 @@ function RevenuesTab({ c, scope, scopeEntity }) {
           {sub === "collected" && <span style={{ color: "var(--text-faint)" }}>Future months populate as fees are received</span>}
         </div>
       </div>
+
+      <div className="office-rev">
+        <div className="office-rev-head">
+          {sub === "collected" ? "Collected" : "Scheduled"} revenue by office{scope ? "" : " · global family"}
+        </div>
+        {office.total > 0 ? (
+          <Table head={["Office name", "Amount"]} empty=""
+            rows={[
+              ...office.rows.map((r, i) => (
+                <tr key={i}><td className="cell-strong">{r.group}</td><td className="cell-num">{fmtBig(r.amount)}</td></tr>
+              )),
+              <tr key="__total" className="office-total"><td className="cell-strong">Total</td><td className="cell-num">{fmtBig(office.total)}</td></tr>,
+            ]} />
+        ) : (
+          <div className="office-rev-empty">No office revenue in view for this scope.</div>
+        )}
+      </div>
     </div>
   );
 }
-- 
2.43.0
