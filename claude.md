# Cookie’s Career Pivot Planner — Claude Code Spec

## 🎯 Product Purpose
This web app helps Cookie explore **what-if scenarios** for her career pivot from sonography ➜ therapist. She can vary:
- State (CA, VA, OK)
- License type (LMFT, LPC/LPCC, LCSW)
- Travel break length (0–24 months)
- Option to work as a sonographer (0–24 months)
- Program duration
- Residency intensity (hours/week)

The app then produces **timelines, calendars, and milestone ages** so Cookie sees when she’d finish school, when she’d be licensed, and how old she’d be at each stage. The goal: **reduce her fear that she won’t have enough time.**

---

## 🖥 Core User Flow
1. User opens **Scenario Builder** form.
2. Inputs choices (state, license, travel, work, etc).
3. Engine computes month-by-month timeline using rules.
4. Visualizers display:
   - Calendar grid (month blocks)
   - Timeline bar (colored phases)
   - Milestone cards with ages
   - Optionally compare 2–3 scenarios side-by-side.

---

## 🧩 Input Parameters
- **State**: `"CA" | "VA" | "OK"`
- **License**: `"LMFT" | "LPC" | "LPCC" | "LCSW"`
- **Birthdate**: default `"2000-03-23"` (age 25 in 2025)
- **FinishSonography**: default `"2026-05-08"`
- **Travel break**: slider `0–24 months` (1-month increments)
- **Work as Sonographer**: toggle ON/OFF + slider `0–24 months` if ON
- **Program length**: default `24 months` (adjustable `18–36`)
- **Hours per week (residency/associate)**: slider `15–40`, default `25`
- **Direct client ratio**: default `60%`
- **Allow remote coursework**: toggle (yes/no; practicum/residency always U.S. based)

---

## 📊 Rules Knowledge

### California (CA)
- LMFT/LPCC/LCSW: **3,000 hrs supervised**, **≥104 weeks**
- Must pass **Law & Ethics** exam during associate period
- Clinical exam after hours approved
- Associate titles: AMFT / APCC / ASW
- 90-day rule: file associate app within 90 days post-grad

### Virginia (VA)
- LPC: **3,400 hrs** (2,000 direct client, 200 supervision)
- LMFT: **3,400 hrs** (2,000 direct, 1,000 couples/family, 200 supervision)
- LCSW: **3,000 hrs**, ≥100 supervision
- Associate titles: Resident in Counseling / Resident in MFT / Supervisee in Social Work

### Oklahoma (OK)
- LPC: **3,000 hrs**, with **≥350 direct per 1,000 hrs** (i.e. ≥1,050 direct)
- LMFT: **~3,000 hrs** (assume couples/family emphasis required)
- LCSW: **4,000 hrs**, **≥3,000 direct**, **≥100 supervision**
- Associate titles: LPC Candidate / LMFT Candidate / LCSW Supervisee

### Graduate Program Fieldwork
- CACREP (counseling): Practicum 100 hrs (40 direct), Internship 600 hrs (240 direct)
- CSWE (MSW): ~900 hrs fieldwork

---

## ⏱ Timeline Generation Logic
1. **Start**: `finishSonography` (May 2026)
2. Add **Work phase** (if enabled, 0–24 months)
3. Add **Travel phase** (0–24 months)
4. Align **Master’s program start** to nearest September after work/travel
5. Add program duration (24 months default)
   - Mark practicum/internship months (U.S. based)
6. Add associate/residency period
   - Track hours/week until rules satisfied (total, direct, supervision, weeks)
7. Add exam windows & licensure
8. Compute **age at each milestone**

---

## 📅 Outputs
- **Calendar Grid**: months colored (Travel = sky, Work = gray, Master’s = green, Residency = amber, Licensed = rose)
- **Timeline Bar**: horizontal segmented bar with labels
- **Milestone Cards**: big callouts (e.g. “Graduate Master’s at 28”, “Licensed at 32”)
- **Comparison View**: show 2–3 scenarios aligned by calendar

---

## 🧩 Components
- `<HeroSection />`: title, subtitle, supportive text
- `<ScenarioForm />`: all inputs (state, license, travel slider, work slider, etc)
- `<TimelineBar />`: renders colored horizontal phases
- `<CalendarGrid />`: renders months across years with highlights
- `<MilestoneCards />`: key ages & achievements
- `<ScenarioCompare />`: side-by-side comparison view
- `<ClosingSection />`: inspirational note
- `<TooltipGlossary />`: hover definitions for acronyms and jargon

---

## 📖 Glossary (for tooltips)
These terms should be stored in a JSON/dictionary and automatically displayed as tooltips on hover whenever they appear in UI.

- **LMFT**: Licensed Marriage & Family Therapist. A master’s-level therapist specializing in couples, family, and relationship therapy.
- **LPC**: Licensed Professional Counselor. A master’s-level counselor focused on individuals and groups; known as LPCC in California.
- **LPCC**: Licensed Professional Clinical Counselor. California’s title for LPC.
- **LCSW**: Licensed Clinical Social Worker. A master’s-level therapist with social work training, often employed in hospitals, agencies, and private practice.
- **Associate**: Post-graduate pre-license title (e.g., AMFT, APCC, ASW, LPC Candidate). Allows supervised practice before full licensure.
- **Residency**: Virginia’s term for the supervised practice period (same concept as “associate” in California).
- **AMFT**: Associate Marriage & Family Therapist. California’s title for LMFT trainees post-graduation.
- **APCC**: Associate Professional Clinical Counselor. California’s title for LPCC trainees post-graduation.
- **ASW**: Associate Social Worker. California’s title for LCSW trainees post-graduation.
- **Direct Client Hours**: Time spent face-to-face with clients in therapy, counseling, or assessment sessions. Required minimums vary by state/license.
- **Supervision Hours**: Regular meetings with a licensed supervisor to review cases, ethics, and progress during residency/associate period.
- **Practicum**: Shorter field placement (100 hrs) early in master’s programs, usually during the first year.
- **Internship**: Longer clinical fieldwork (600+ hrs) later in master’s programs, often during the second year.
- **Law & Ethics Exam**: California-specific exam that must be passed during the associate period before taking the clinical exam.
- **Clinical Exam**: The national/state licensing exam taken after supervised hours are complete (e.g., LMFT Clinical, NCMHCE, ASWB Clinical, AMFTRB).
- **Counseling Compact**: An interstate licensing compact for LPCs/LPCCs. Allows practice across member states without relicensing.
- **Social Work Compact**: An interstate licensing compact for LCSWs. Expanding across states.
- **CACREP**: Accreditation body for counseling programs. Ensures programs meet national standards.
- **CSWE**: Council on Social Work Education. Accredits MSW programs.
- **Face-to-Face**: Direct interaction with clients (in-person or telehealth). Distinct from paperwork, training, or supervision time.

---

## 🎨 UX Copy
- Hero title: **Cookie’s Career Pivot Guide**
- Hero subtitle: *“From Sonography ➜ Therapist (with travel + breathing room)”*
- Closing message:  
  > “There’s time for travel, work, and growth. You’re not behind—you’re building a richer path.”

---

## Example Scenarios

### Scenario A — Work then Travel, Virginia LMFT
- Work: 6 months sonography (May–Nov 2026)
- Travel: 12 months (Dec 2026–Nov 2027)
- Master’s: Sep 2028–May 2030
- Residency: Jun 2030–Sep 2032 (3,400 hrs)
- Licensed: ~late 2032
- Age at license: ~32

### Scenario B — Travel Only, Oklahoma LPC
- Travel: 6 months (May–Nov 2026)
- Master’s: Sep 2027–May 2029
- Residency: Jun 2029–May 2032 (3,000 hrs, 350 direct/1,000 rule)
- Licensed: mid-2032
- Age at license: ~32

---

## ✅ Success Criteria
- Cookie can set **travel length** and **work length** and instantly see changes.
- Milestones clearly show ages (e.g., “Age 26–28 Master’s, Age 28–31 Residency, Licensed by 32–33”).
- She can compare scenarios (e.g., 1 year off in VA vs 6 months off in OK).
- Tooltips explain every acronym and technical term in plain English.
- Visual reassurance: she’ll still be young at licensure.

---

## 🛠 Technical
- React + TailwindCSS + shadcn/ui
- State management: `useState`
- Date math: `date-fns`
- Rules in `rules.ts`
- Timeline logic in `timeline.ts`
- Glossary data in `glossary.ts` (JSON of terms + definitions; used by `<TooltipGlossary />`)
