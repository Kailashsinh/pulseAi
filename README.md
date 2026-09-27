# Health Pulse AI

Build a complete frontend-only MVP web application called:

PULSEAI

“Personal Health Intelligence & AI Risk Assessment Platform”

IMPORTANT:

This is a FRONTEND-ONLY MVP.

Do NOT build a backend.

Do NOT create real authentication.

Do NOT connect PostgreSQL.

Do NOT implement real medical diagnosis.

Do NOT implement real OCR.

Do NOT implement real ML models.

Do NOT implement real medical image classification.

Do NOT implement real medication prescribing.

Instead, create a highly polished, realistic, production-quality frontend prototype using mock data, local state, simulated loading states, simulated AI responses, mock charts, mock health reports and realistic sample users/data.

The goal is to make the frontend feel like a real premium AI health platform that could later be connected to a FastAPI/Python backend.

==================================================

1. PRODUCT VISION

==================================================

PulseAI is a multimodal personal health intelligence platform.

It helps users:

1. Have an AI-powered symptom conversation.

2. Answer adaptive follow-up questions.

3. Receive AI-assisted health-risk/condition indicators.

4. Upload and visually inspect medical reports.

5. View extracted health values.

6. Track health information over time.

7. View health trends and personal baselines.

8. Detect unusual health measurements.

9. Compare medical reports.

10. View health insights.

11. Manage medication information and interaction checks.

12. Analyze one supported medical-image workflow.

13. Generate a Doctor Brief before an appointment.

14. See a chronological health timeline.

15. Receive health alerts and notifications.

The central product idea:

“PulseAI does not treat every health question separately. It builds a continuous health history and helps users understand how their health information changes over time.”

The UI should communicate this concept strongly.

==================================================

2. MEDICAL SAFETY BOUNDARY

==================================================

This is an academic/product prototype.

The application must NEVER visually present itself as replacing a doctor.

Use language such as:

“AI-assisted assessment”

“Possible health indicator”

“Risk indicator”

“Health insight”

“Suggested next step”

“Consider discussing with a healthcare professional”

Avoid presenting results as:

“Confirmed diagnosis”

“You definitely have X”

“Take this medicine”

“Prescription generated”

For urgent situations, the UI should clearly prioritize professional/emergency care guidance.

Add subtle but visible medical disclaimer components where appropriate.

Example:

“PulseAI provides informational, AI-assisted health insights and is not a substitute for professional medical advice, diagnosis or treatment.”

==================================================

3. DESIGN DIRECTION

==================================================

The visual quality must be PREMIUM / GEM-LEVEL.

Think:

Apple Health

Linear

Arc

Notion

Stripe

Vercel

Modern medical SaaS

Premium AI dashboard

Glassmorphism

Soft futuristic healthcare interface

But do NOT make it dark.

THE ENTIRE APPLICATION MUST USE A CLASSIC LIGHT THEME.

No dark dashboard.

No black backgrounds.

No cyberpunk aesthetic.

No excessive neon.

No overly colorful cartoon healthcare design.

Use a sophisticated light color system:

Primary:

Deep medical blue / royal blue

Secondary:

Soft cyan / sky blue

Accent:

Mint / teal

Success:

Soft green

Warning:

Warm amber

Danger:

Soft red

Background:

Very light white / cool gray / subtle blue tint

Cards:

White / translucent white

Text:

Deep navy / charcoal

Use subtle gradients.

Example gradient directions:

Blue → Cyan

Blue → Violet

Cyan → Mint

Soft blue → white

Gradients should feel premium and subtle rather than loud.

==================================================

4. GLASSMORPHISM

==================================================

Use sophisticated glass effects throughout the application.

Examples:

- translucent white cards

- backdrop blur

- subtle borders

- soft shadows

- gradient glow behind major components

- floating glass panels

- glass navigation

- glass AI chat bubbles

- translucent metric cards

Do NOT overuse glass.

Maintain excellent readability.

Example style:

background:

rgba(255,255,255,0.65)

backdrop-filter:

blur(20px)

border:

1px solid rgba(255,255,255,0.7)

box-shadow:

soft large diffuse shadow

Use glass mainly for:

- navbar

- dashboard cards

- AI interface

- modal dialogs

- floating action buttons

- insight cards

- profile panels

==================================================

5. ANIMATIONS

==================================================

The application should feel alive but professional.

Use smooth micro-interactions.

Include:

- page fade-in

- slide-up cards

- staggered dashboard loading

- hover elevation

- button press animations

- smooth sidebar transitions

- animated chart drawing

- progress ring animation

- AI typing animation

- pulsing AI indicator

- skeleton loading

- modal entrance/exit

- dropdown transitions

- toast notifications

- number count-up animations

- timeline reveal animations

- upload progress animation

- health score animation

- smooth tab transitions

Use Framer Motion or an equivalent frontend animation system if appropriate.

Animations must be subtle and performant.

Respect prefers-reduced-motion.

==================================================

6. RESPONSIVE DESIGN

==================================================

Build the complete application responsive for:

Desktop

Laptop

Tablet

Mobile

Desktop:

Full sidebar + top navigation.

Tablet:

Collapsible sidebar.

Mobile:

Bottom navigation or compact mobile navigation.

Every page must work properly on mobile.

Do not simply shrink desktop UI.

Re-design layouts responsively.

==================================================

7. GLOBAL NAVIGATION

==================================================

Authenticated application layout:

LEFT SIDEBAR:

PulseAI logo

Dashboard

AI Health Chat

Health Timeline

Medical Reports

Image Analysis

Analytics

Medications

Insights

Doctor Brief

Then bottom section:

Notifications

Help

Profile

Sidebar should be collapsible.

Use icons from Lucide React.

Top bar:

Global search

Notification icon

User avatar

User name

Small health status indicator

Mobile:

Bottom navigation with:

Home

AI Chat

Reports

Analytics

Profile

More pages accessible through a “More” menu.

==================================================

8. BRANDING

==================================================

Brand:

PulseAI

Logo concept:

A sophisticated pulse/heartbeat waveform integrated with an AI spark or intelligent node.

Create a clean SVG-style logo using frontend shapes/icons if possible.

Logo should work in:

Splash screen

Login

Navbar

Sidebar

Favicon-style UI

Tagline:

“Understand your health. Track what changes. Make informed decisions.”

Do not use “AI doctor” as the primary positioning.

==================================================

9. SPLASH SCREEN

==================================================

Create a premium splash screen before the application.

Light gradient background.

Center:

PulseAI logo

Large AI visual/illustration.

Use an AI-generated-looking healthcare intelligence visual:

A friendly abstract AI health assistant represented as a sophisticated translucent holographic human/AI silhouette surrounded by:

- heartbeat waveform

- health data nodes

- medical document icons

- analytics graphs

- subtle glowing particles

The visual should feel premium, trustworthy and medical.

Do NOT make it creepy.

Do NOT make it robotic in a sci-fi movie style.

Animation:

Logo fades in.

AI visual gently floats.

Pulse waveform animates.

Small particles move slowly.

“Initializing your health intelligence...” appears.

Then transition smoothly into authentication.

==================================================

10. LANDING / WELCOME PAGE

==================================================

Create a polished public landing page.

Hero:

“Your health, understood over time.”

Subtitle:

“PulseAI brings symptoms, medical reports, health measurements and historical trends together into one intelligent health timeline.”

CTA:

“Get Started”

Secondary CTA:

“Explore PulseAI”

Hero visual:

Premium dashboard preview + AI health conversation floating cards.

Sections:

1. AI Health Conversation

2. Medical Report Intelligence

3. Personal Health Analytics

4. Health Timeline

5. Pattern Detection

6. Medical Image Analysis

7. Medication Information

8. Doctor Brief

Show a visual workflow:

Symptoms

↓

AI Conversation

↓

Health Data

↓

Analysis

↓

Insights

↓

Health Timeline

Safety section:

“AI-assisted, not a replacement for professional care.”

Footer:

PulseAI

Product

Features

Privacy

Safety

About

Contact

==================================================

11. AUTHENTICATION UI

==================================================

Create:

Login

Register

Forgot Password

Reset Password

Email Verification

FRONTEND ONLY.

Use mock authentication.

Login fields:

Email

Password

Remember me

Buttons:

Sign In

Continue with Google

Continue with Apple

Register:

Full Name

Email

Password

Confirm Password

Date of Birth

Optional basic profile information

Checkbox:

“I understand that PulseAI provides informational AI-assisted health insights.”

Do NOT collect unnecessary sensitive information.

Use beautiful glass authentication card centered on light gradient background.

Include AI healthcare illustration on desktop.

Mobile should focus on the form.

==================================================

12. ONBOARDING

==================================================

After registration, show onboarding.

Step 1:

Welcome to PulseAI

Step 2:

What do you want to monitor?

Options:

General wellness

Symptoms

Lab values

Heart health

Respiratory health

Metabolic health

Step 3:

Health goals

Step 4:

Notification preferences

Step 5:

Privacy & consent

Progress indicator:

1 — 2 — 3 — 4 — 5

Finish:

“Build My Health Space”

Then enter Dashboard.

==================================================

13. DASHBOARD

==================================================

This is the main application page.

Header:

“Good morning, [Name]”

Subtitle:

“Here’s what PulseAI found in your health history.”

Top health overview:

Health Overview card.

Display:

Overall Health Snapshot

Recent activity

Open insights

Recent reports

Active alerts

Do NOT call this a clinically validated “health score”.

Use:

“Health Snapshot”

Example:

Health Snapshot

72

“Based on available personal records”

Cards:

Recent Symptoms

Recent Reports

Health Trends

Open Insights

==================================================

14. DASHBOARD HEALTH SNAPSHOT

==================================================

Create a large premium card.

Example:

Health Snapshot

72 / 100

Status:

“Stable based on available records”

Include circular progress visualization.

Under it:

“Updated today”

Small explanation:

“Your recent records show stable measurements with one trend worth monitoring.”

Button:

“View Analysis”

==================================================

15. DASHBOARD TREND CARDS

==================================================

Show cards:

Blood Glucose

95 → 99 → 105 → 111

Trend:

Upward

Resting Heart Rate

68 → 71 → 70 → 74

Status:

Within personal baseline

Weight

84 → 83.2 → 82.7 → 82.1

Trend:

Gradual decrease

Use beautiful mini charts.

==================================================

16. DASHBOARD INSIGHTS

==================================================

Section:

“Recent Health Insights”

Example cards:

Persistent glucose trend detected

“Your recent glucose measurements have shown a gradual upward pattern.”

Button:

View Details

Another:

“Resting heart rate remains close to your historical baseline.”

Another:

“New report uploaded 2 days ago.”

Each insight should have:

Icon

Title

Short explanation

Date

Severity/status

View details

==================================================

17. DASHBOARD ALERTS

==================================================

Create alert panel.

Example:

“Attention”

“Several recent measurements differ from your usual personal range.”

Button:

Review

Critical alert example:

“Potentially urgent symptom pattern”

Button:

“Review safety guidance”

Use clear hierarchy.

Do NOT use scary visuals.

==================================================

18. AI HEALTH CHAT PAGE

==================================================

This is one of the most important pages.

Create a premium conversational AI interface.

Header:

AI Health Chat

Status:

● PulseAI is ready

Conversation layout.

User message:

“I have been having chest discomfort since yesterday.”

AI:

“Where exactly do you feel the discomfort?”

User:

“In the center of my chest.”

AI:

“Does it become worse during walking or exercise?”

User:

“Yes.”

Then continue simulated adaptive questions.

Question categories:

Location

Duration

Severity

Frequency

Associated symptoms

Relevant history

The interface should make it clear that questions are being selected based on previous answers.

==================================================

19. AI CHAT UI

==================================================

Chat components:

AI avatar

User avatar

Typing animation

Timestamp

Message bubbles

Suggested quick responses

Voice icon UI

Text input

Send button

Input placeholder:

“Describe what you’re experiencing…”

Quick actions:

“Start symptom assessment”

“Upload a report”

“Ask about a health trend”

Side panel on desktop:

Assessment Progress

Symptoms collected

4 / 7

Information confidence

Moderate

Relevant history

2 items

The AI should appear intelligent without pretending to be a doctor.

==================================================

20. AI ASSESSMENT RESULT

==================================================

After simulated conversation, show:

“Assessment Summary”

Possible condition/risk indicators.

Example:

Respiratory condition indicator

Moderate

Supporting information:

Persistent cough

Fever

Symptom duration

Urgency:

“Consider professional evaluation if symptoms are severe, worsening or persistent.”

Status:

“AI-assisted assessment — not a confirmed diagnosis.”

Include:

“How did PulseAI reach this result?”

Expandable explanation.

Show contributing factors as chips.

Example:

Symptom duration

Severity

Associated symptoms

Historical context

==================================================

21. URGENT SAFETY STATE

==================================================

Create a special emergency/safety UI state.

If mock symptoms suggest urgency:

Pause normal AI interview.

Show:

“Your responses may indicate a situation that needs prompt professional attention.”

Then:

“Please seek appropriate professional or emergency care.”

Buttons:

Emergency Guidance

Return to Chat

Use red only as an accent.

Do not make the screen dramatic or alarming.

==================================================

22. HEALTH TIMELINE

==================================================

Create a beautiful vertical health timeline.

Header:

“Health Timeline”

Filters:

All

Symptoms

Reports

Vitals

Medications

Insights

Assessments

Timeline example:

January

Blood report uploaded

February

New symptom recorded

March

Second report uploaded

April

Health value increased

May

Persistent trend detected

June

Health insight generated

Each timeline item opens a detail panel.

Use connected timeline nodes and subtle animations.

==================================================

23. MEDICAL REPORTS PAGE

==================================================

Header:

“Medical Reports”

CTA:

“Upload Report”

Upload zone:

Drag & Drop

“Upload PDF, JPG or PNG”

Supported examples:

Blood reports

Lab reports

Prescriptions

Discharge summaries

Frontend-only upload simulation.

After upload:

Uploading...

Processing...

Extracting...

Complete

Show progress animation.

==================================================

24. REPORT DETAIL PAGE

==================================================

Layout:

Left:

Document preview

Right:

Extracted Health Data

Example:

Glucose

118 mg/dL

Hemoglobin

11.2 g/dL

Date

18 Sep 2026

Reference information

Status:

Extracted successfully

Buttons:

View Original

Compare Report

Add to Timeline

Include a disclaimer that extracted information should be verified against the original report.

==================================================

25. REPORT COMPARISON

==================================================

Create comparison interface.

Select:

Previous Report

Current Report

Show side-by-side values.

Example:

Glucose

Previous: 105 mg/dL

Current: 118 mg/dL

Hemoglobin

Previous: 12.0 g/dL

Current: 11.2 g/dL

Add visual trend indicators.

Include:

“Change over time”

Chart.

Do not independently claim disease diagnosis from these changes.

==================================================

26. ANALYTICS PAGE

==================================================

This should be one of the most visually impressive pages.

Header:

“Health Analytics”

Tabs:

Overview

Trends

Baseline

Anomalies

Correlations

Overview cards:

Tracked Measurements

Reports

Detected Trends

Anomalies

Insights

==================================================

27. TREND ANALYSIS

==================================================

Show interactive charts.

Examples:

Glucose

95

99

105

111

Weight

84

83.2

82.7

82.1

Resting HR

68

71

70

74

Features:

Date range

7 days

30 days

3 months

6 months

1 year

Metric selector.

Tooltips.

Smooth chart animations.

Use Recharts or another modern chart library.

==================================================

28. PERSONAL BASELINE

==================================================

Page section:

“Your Personal Baseline”

Example:

Typical resting HR

68–75 BPM

Current:

72 BPM

Status:

Within personal baseline

Create baseline visualization.

Explain:

“PulseAI uses your historical records to understand your typical range.”

==================================================

29. ANOMALY DETECTION

==================================================

Create anomaly cards.

Example:

Heart Rate

112 BPM

Usual range:

68–75 BPM

Status:

Unusual compared with personal history

Show explanation:

“This measurement is outside the user's historical range.”

Button:

View Context

Use visual but calm alert design.

==================================================

30. CORRELATION ANALYSIS

==================================================

Create an interactive analytics interface.

Example:

Weight vs Selected Health Value

Show scatter chart.

Other variables:

Sleep

Weight

Heart Rate

Glucose

Use mock data.

Explain:

“Correlation shown here describes a pattern in available data and does not establish causation.”

==================================================

31. PATTERN DETECTION

==================================================

Section:

“Detected Patterns”

Example:

Persistent upward glucose trend

Several consecutive measurements have increased.

Another:

Repeated elevated heart-rate readings

Another:

Stable resting heart-rate baseline

Each card:

Pattern

Evidence

Time range

Confidence indicator

Suggested next step

==================================================

32. INSIGHTS PAGE

==================================================

Dedicated health intelligence page.

Header:

“Health Insights”

Categories:

All

Trends

Anomalies

Reports

Symptoms

Risk

Each insight:

Icon

Title

Description

Evidence

Date

Severity

Example:

“Persistent upward glucose pattern”

Evidence:

95 → 99 → 105 → 111

Explanation:

“A gradual increase was observed across recent available records.”

CTA:

“View in Analytics”

==================================================

33. NOTIFICATIONS

==================================================

Create notification center.

Types:

Health trend

New report

Anomaly

AI assessment

System

Reminder

Example:

“New report processed”

“Your uploaded blood report has been processed.”

Another:

“Persistent trend detected”

“Review your recent glucose measurements.”

Unread indicator.

Mark all as read.

Notification detail drawer.

==================================================

34. MEDICATIONS PAGE

==================================================

Header:

“Medications”

CTA:

“Add Medication”

Medication cards:

Medication A

Dosage information

Schedule

Status

But clearly label this as:

“Medication Information”

not prescribing.

Add:

Medication Interaction Checker

Select Medication A

Select Medication B

Simulate interaction result.

Example:

“Potential interaction identified”

Severity:

Moderate

Description:

“Known interaction information is available for these medications.”

Guidance:

“Discuss medication combinations with a qualified doctor or pharmacist.”

==================================================

35. ADD MEDICATION MODAL

==================================================

Fields:

Medication name

Dosage

Frequency

Start date

Notes

Buttons:

Save

Cancel

Use frontend local state.

==================================================

36. MEDICAL IMAGE ANALYSIS

==================================================

Create dedicated page.

Header:

“Medical Image Analysis”

Subtitle:

“Supported medical-image screening prototype”

For MVP, focus on ONE narrow example:

Chest X-ray classification/screening.

Upload area:

“Upload Chest X-ray”

Supported:

PNG

JPG

JPEG

Show preview after upload.

Processing animation:

Preparing image

Preprocessing

Running model

Generating explanation

Then simulated result:

Screening Result

Example Classification

“Example finding indicator”

Confidence:

87%

Important:

“Prototype result — not a clinical diagnosis.”

==================================================

37. GRAD-CAM VISUALIZATION

==================================================

Create a beautiful image analysis result page.

Left:

Original X-ray

Right:

Model visualization / heatmap mockup

Tabs:

Original

Attention Map

Overlay

Include:

“Why did the model focus here?”

Use a mock explanation panel.

Explain:

“Highlighted regions represent areas that influenced the model's output. They should not be interpreted as proof of disease.”

Button:

“Review Guidance”

==================================================

38. DOCTOR BRIEF

==================================================

Create a premium document-generation page.

Header:

“Doctor Brief”

Subtitle:

“Prepare a concise summary for your healthcare appointment.”

Preview:

Main complaint:

Persistent cough

Duration:

3 weeks

Relevant history:

Previous respiratory episodes

Recent reports:

2

Detected trend:

Persistent symptom pattern

Questions to discuss:

Generated from stored history

Buttons:

Generate Brief

Edit

Download PDF

Print

For MVP:

Generate button creates a mock document preview.

==================================================

39. DOCTOR BRIEF PDF-STYLE PREVIEW

==================================================

Create realistic A4-style document inside the browser.

Header:

PulseAI

Doctor Brief

Patient:

Demo User

Date:

18 September 2026

Sections:

Main Concern

Symptom History

Relevant Health History

Recent Reports

Important Measurements

Detected Trends

Current Medications

Questions for Healthcare Professional

Footer:

“Generated from information entered or stored in PulseAI. Verify information with original medical records.”

==================================================

40. PROFILE PAGE

==================================================

Profile:

Avatar

Name

Email

Basic information.

Health preferences.

Notification preferences.

Connected data placeholders.

Buttons:

Edit Profile

Privacy Settings

Consent Settings

==================================================

41. PRIVACY PAGE

==================================================

Create privacy-focused UI.

Sections:

Data Overview

Consent

Health Records

Uploaded Documents

AI Processing

Notifications

Use toggles.

Example:

“Allow AI-assisted health analysis”

“Allow health insights based on historical records”

“Allow notification alerts”

Explain each setting clearly.

==================================================

42. SETTINGS

==================================================

Sections:

Account

Appearance

Notifications

Privacy

AI Preferences

Data

Security

Appearance:

Light theme ONLY for this MVP.

Do not create a dark theme.

Notification settings:

Health alerts

Trend insights

Report processing

Appointment reminders

==================================================

43. SEARCH

==================================================

Create global search.

Search across:

Symptoms

Reports

Health values

Insights

Medications

Timeline events

Show grouped results.

Example:

Search:

“glucose”

Results:

Glucose trend

Blood report — March

Blood report — June

Insight — persistent glucose increase

==================================================

44. GLOBAL AI ASSISTANT

==================================================

Add floating PulseAI assistant button.

Bottom-right desktop.

When clicked:

Glass floating assistant panel.

Header:

PulseAI Assistant

Quick actions:

Analyze recent trend

Explain my report

Review my timeline

Prepare doctor brief

Use simulated AI responses.

==================================================

45. EMPTY STATES

==================================================

Every page must have beautiful empty states.

Examples:

No reports:

“No medical reports yet.”

“Upload your first report to start building your health timeline.”

No insights:

“Your health insights will appear here as PulseAI analyzes your records.”

No medications:

“Add medications to keep your medication information organized.”

No timeline:

“Your health timeline will grow as you add symptoms, reports and measurements.”

==================================================

46. LOADING STATES

==================================================

Create skeleton loaders for:

Dashboard

Analytics

Reports

Timeline

Insights

Medications

AI loading:

Animated PulseAI icon + typing dots.

Report processing:

Multi-step progress.

Image analysis:

Animated processing visualization.

==================================================

47. ERROR STATES

==================================================

Create polished error components.

Examples:

Upload failed

Unable to process report

Unable to load analytics

Something went wrong

Buttons:

Retry

Go Back

Never show raw technical errors to users.

==================================================

48. TOAST SYSTEM

==================================================

Create toast notifications.

Examples:

“Report uploaded successfully”

“Medication added”

“Insight marked as reviewed”

“Doctor Brief generated”

“Profile updated”

==================================================

49. MODALS / DRAWERS

==================================================

Use consistent glass modal system.

Required modals:

Upload report

Add medication

View insight

Timeline detail

Assessment explanation

Notification detail

Delete confirmation

Privacy setting

Doctor brief generation

==================================================

50. DESIGN SYSTEM

==================================================

Create reusable design tokens.

Typography:

Use a modern professional font such as Inter, Geist or similar.

Headings:

Strong but not oversized.

Body:

Highly readable.

Border radius:

12–24px depending on component.

Cards:

16–24px.

Buttons:

10–14px radius.

Use generous whitespace.

Grid system:

12-column desktop layout.

Use consistent spacing.

==================================================

51. ICONOGRAPHY

==================================================

Use Lucide icons or another consistent icon library.

Examples:

Activity

HeartPulse

Brain

FileText

Upload

ChartLine

Bell

User

Settings

ShieldCheck

Pill

Stethoscope

MessageCircle

Clock

AlertTriangle

Sparkles

Search

ChevronRight

Do not mix unrelated icon styles.

==================================================

52. VISUAL HEALTH DATA

==================================================

Use realistic mock data.

Example:

Glucose:

95

99

105

111

Resting HR:

68

71

70

74

Weight:

84

83.2

82.7

82.1

Hemoglobin:

12.4

12.0

11.8

11.2

Use dates spread across several months.

This should create the feeling of longitudinal health tracking.

==================================================

53. MOCK AI BEHAVIOR

==================================================

Since this is frontend-only, simulate AI.

Create deterministic mock conversations.

Example flow:

User:

“I have been having a cough for three weeks.”

AI:

“How often are you coughing?”

User:

“Several times throughout the day.”

AI:

“Have you experienced fever, shortness of breath or chest discomfort?”

Then:

Assessment generated.

Use a short artificial delay.

Show:

“PulseAI is analyzing your responses…”

Then display result.

The AI UI should look real but must be clearly treated as a prototype.

==================================================

54. FRONTEND STATE

==================================================

Use frontend state/local mock data.

Possible:

React state

Context

LocalStorage

Persist demo changes locally where useful.

Examples:

Adding medication updates medication page.

Uploading mock report updates report page.

Generated insight appears in dashboard.

Timeline updates after simulated events.

No backend.

==================================================

55. ROUTING

==================================================

Create proper frontend routes.

Suggested:

/

 /login

 /register

 /forgot-password

 /onboarding

/app

/app/dashboard

/app/chat

/app/timeline

/app/reports

/app/reports/[id]

/app/reports/compare

/app/image-analysis

/app/analytics

/app/insights

/app/medications

/app/doctor-brief

/app/notifications

/app/profile

/app/privacy

/app/settings

Use client-side mock navigation.

==================================================

56. DASHBOARD INFORMATION ARCHITECTURE

==================================================

The user must always understand:

Where am I?

What happened?

What needs attention?

What changed?

What should I review?

Dashboard priority:

1. Important alerts

2. Health snapshot

3. Recent insights

4. Trends

5. Recent reports

6. Timeline

Avoid overwhelming users.

==================================================

57. ACCESSIBILITY

==================================================

Implement:

Keyboard navigation

Visible focus states

ARIA labels

Readable contrast

Semantic HTML

Accessible buttons

Accessible forms

Screen-reader-friendly labels

Do not depend only on color.

For health statuses use:

Icon + text + color.

==================================================

58. PERFORMANCE

==================================================

Frontend must be optimized.

Use:

Lazy loading

Image optimization

Code splitting where appropriate

Skeleton loading

Efficient animations

Avoid unnecessary re-renders

Do not make the interface feel slow.

==================================================

59. AI-GENERATED VISUAL CONTENT

==================================================

Where illustrations are needed, use high-quality AI-generated-looking visual assets or suitable generated illustrations.

Required visuals:

1. PulseAI splash AI assistant

2. Landing page hero AI health intelligence visual

3. Empty state illustrations

4. Medical report illustration

5. Health analytics illustration

6. Doctor brief illustration

7. Medical image analysis visual

Visual style:

Premium

Minimal

Clinical

Trustworthy

Soft gradients

Light background

Glass elements

Subtle blue/cyan/mint accents

No cartoon doctors.

No generic stock-photo healthcare imagery.

No cheesy smiling doctor imagery.

==================================================

60. MICROCOPY

==================================================

Use professional, human language.

Avoid technical terminology in user-facing UI unless explained.

Examples:

Instead of:

“Anomaly Detection Algorithm”

Use:

“Unusual Measurement”

Instead of:

“Classification Model”

Use:

“Assessment Indicator”

Instead of:

“Feature Importance”

Use:

“What influenced this result?”

Instead of:

“Time-Series Regression”

Use:

“Trend Analysis”

==================================================

61. IMPORTANT MEDICAL UX RULE

==================================================

Whenever showing AI results, clearly distinguish:

USER DATA

AI ANALYSIS

HEALTH INDICATOR

RECOMMENDED NEXT STEP

Example:

USER DATA:

Persistent cough for 3 weeks

AI ANALYSIS:

Pattern associated with respiratory symptoms

INDICATOR:

Respiratory condition indicator — Moderate

NEXT STEP:

Consider discussing persistent symptoms with a healthcare professional.

Never make the UI imply certainty.

==================================================

62. MOBILE EXPERIENCE

==================================================

Mobile dashboard should prioritize:

Health Snapshot

Alerts

AI Chat

Recent Insights

Recent Reports

Mobile AI chat should become full-screen.

Charts must remain readable.

Upload should support camera/gallery-style UI visually.

Timeline should become vertical.

Sidebar should become a bottom navigation.

==================================================

63. PREMIUM INTERACTION DETAILS

==================================================

Add subtle details that make the application feel expensive:

- animated gradient background blobs

- glass cards

- soft shadows

- subtle border highlights

- hover glow

- animated pulse icon

- animated heartbeat waveform

- chart line drawing

- smooth page transitions

- skeleton shimmer

- tooltip animations

- command/search palette

- keyboard shortcuts where useful

- contextual hover states

- animated notification badge

- progress indicators

- beautiful confirmation states

Do not over-animate.

The product should feel calm, intelligent and trustworthy.

==================================================

64. COMMAND PALETTE

==================================================

Add keyboard-accessible command/search palette.

Shortcut:

Cmd/Ctrl + K

Actions:

Go to Dashboard

Start AI Chat

Upload Report

View Analytics

View Timeline

Add Medication

Generate Doctor Brief

Open Settings

==================================================

65. DEMO MODE

==================================================

Because this is frontend-only, create a realistic DEMO USER.

Example:

Name:

Aarav Sharma

Age:

28

Use fictional data only.

Create enough mock records to populate:

Dashboard

Timeline

Analytics

Reports

Insights

Medications

Doctor Brief

The application should never look empty when first opened.

==================================================

66. DEMO DATA STORY

==================================================

Create a coherent fictional health history.

Example:

January:

Blood report uploaded.

February:

Fatigue symptom recorded.

March:

Second blood report.

April:

Glucose increases.

May:

Another measurement increases.

June:

PulseAI detects persistent trend.

July:

User receives health insight.

August:

New report uploaded.

September:

Dashboard shows comparison.

This should make the entire application feel connected.

The same mock data should appear across:

Dashboard

Timeline

Reports

Analytics

Insights

Doctor Brief

Do NOT use random unrelated numbers on different pages.

==================================================

67. COMPLETE USER JOURNEY

==================================================

The application should support this demo flow:

Landing page

↓

Get Started

↓

Register

↓

Onboarding

↓

Dashboard

↓

AI Health Chat

↓

Symptom conversation

↓

Assessment result

↓

Upload medical report

↓

Report processing animation

↓

Extracted values

↓

Health timeline updated

↓

Analytics

↓

Trend detected

↓

Insight generated

↓

Notification

↓

Doctor Brief

↓

Generate appointment summary

This entire journey should be visually connected.

==================================================

68. PAGE TRANSITIONS

==================================================

Use consistent transitions.

Route transition:

fade + slight vertical movement.

Modal:

scale + fade.

Drawer:

slide from right.

Sidebar:

smooth width transition.

Charts:

draw-in animation.

Timeline:

staggered reveal.

AI:

typing animation.

==================================================

69. RESPONSIVE SIDEBAR

==================================================

Desktop:

240–280px sidebar.

Collapsed:

72px.

Mobile:

bottom navigation.

Sidebar should show:

PulseAI logo

navigation

active page indicator

Active state should use subtle gradient background.

==================================================

70. FINAL VISUAL QUALITY REQUIREMENT

==================================================

This must NOT look like:

A basic Bootstrap dashboard

A generic Tailwind template

A student CRUD project

A generic medical website

A dark AI dashboard

A collection of disconnected pages

It should look like a real premium AI-health SaaS product.

Every page must belong to the same visual system.

Use:

Consistent spacing

Consistent typography

Consistent border radius

Consistent glass effect

Consistent shadows

Consistent gradients

Consistent icons

Consistent interaction patterns

==================================================

71. TECHNICAL FRONTEND STACK

==================================================

Use:

React

TypeScript

Tailwind CSS

Modern component architecture

Lucide icons

Framer Motion where appropriate

Recharts for analytics

Use reusable components.

Create:

components/ui

components/layout

components/dashboard

components/chat

components/reports

components/analytics

components/timeline

components/medications

components/insights

components/doctor-brief

Use clean TypeScript interfaces for mock data.

==================================================

72. DO NOT BUILD BACKEND

==================================================

Absolutely no:

FastAPI

Node backend

Express backend

PostgreSQL

MongoDB

Qdrant server

Real authentication

Real medical APIs

Real OCR APIs

Real LLM APIs

Real ML inference

Real image classification APIs

The frontend should simulate these functions.

Architect the frontend so that APIs can be integrated later.

==================================================

73. FUTURE BACKEND-READY STRUCTURE

==================================================

Even though no backend is required now, separate mock services logically.

For example:

mockAuthService

mockAIService

mockReportService

mockAnalyticsService

mockMedicationService

mockTimelineService

mockNotificationService

This will make future FastAPI integration easier.

==================================================

74. FINAL QUALITY CHECK

==================================================

Before finishing, verify:

Every route works.

Every button has a meaningful frontend interaction.

No dead navigation.

No broken links.

No empty major page.

No placeholder Lorem Ipsum.

No random stock medical content.

No dark theme.

No inconsistent colors.

No inconsistent icons.

No horizontal overflow.

Mobile layout works.

Desktop layout works.

Loading states exist.

Empty states exist.

Error states exist.

Modals work.

Charts render correctly.

Mock data remains consistent across pages.

AI conversation works as a simulated flow.

Report upload works as a simulated flow.

Medication creation works locally.

Doctor Brief generation works as a simulated flow.

Notifications update in frontend state.

Timeline updates when mock events occur.

The application should feel like one coherent product.

==================================================

75. FINAL PRODUCT MESSAGE

==================================================

PulseAI should communicate this concept visually:

“Your health information is not a collection of isolated reports.

PulseAI brings symptoms, reports, measurements and historical changes together so you can understand your health information over time.”

The final application should feel:

Premium

Calm

Intelligent

Modern

Medical

Trustworthy

Human-centered

Data-driven

AI-powered

Easy to navigate

Build the complete frontend MVP now.

Do not stop at a landing page.

Implement all pages, routes, components, mock interactions, responsive layouts, animations, charts, dialogs, loading states, empty states and demo data described above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://chroni-health-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e96fa922-438d-4fda-9e01-c0e4e819d60d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
