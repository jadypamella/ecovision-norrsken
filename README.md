# EcoVision – AI-Powered Forest Safety Monitoring

**Built for Norrsken Fixathon 2025 – AI Safety Challenge 2: AI Safety in Real-world Physical Environments**

---

## Main Information

- **Repository**: https://github.com/jadypamella/ecovision-norrsken
- **Challenge**: Norrsken Fixathon 2025 - Challenge 2: AI Safety in Physical Environments
- **Technology**: NVIDIA Video Search & Summarization (VSS) Blueprint

---

EcoVision is a Physical AI Safety Agent that transforms drone footage into real-time forest safety alerts. Using NVIDIA's Video Search & Summarization (VSS) blueprint, EcoVision detects wildfires, deforestation, storm damage, and wildlife activity in seconds, providing transparent, explainable insights that help protect ecosystems and communities.

**This project was designed and built during the Fixathon by the SU Heroes team.**

---

## 📌 Links & Resources

Our pitch and demo are in the same YouTube video. You can watch it here:  
**🎥 [YouTube Demo & Pitch Video](https://youtu.be/SSAKVqXt2-A)**

Our prototype is deployed on Lovable:  
**🚀 [Live Application](https://ecovision-norrsken.lovable.app)**

Our pitch deck is also available on Lovable:  
**🎤 [Pitch Deck](https://ecovision-norrsken.lovable.app/fixathon)**

GitHub repository:  
**🔗 [github.com/jadypamella/ecovision-norrsken](https://github.com/jadypamella/ecovision-norrsken)**

The NVIDIA VSS blueprint we used is here:  
**🤖 [NVIDIA VSS API](https://vss-api-qgrhjnqzr.brevlab.com/)**

And the data we used is available here:  
**📊 [Test Data](https://drive.google.com/drive/folders/1_ARCLWKCgHgPCZUC38HQeVfl7fKmavVp?usp=sharing)**

If you have any questions, feel free to reach out on [LinkedIn](https://www.linkedin.com/in/jadypamella/) or email me at **hello@jadypamella.com**.

---

![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![NVIDIA VSS](https://img.shields.io/badge/NVIDIA-VSS-76B900?logo=nvidia)

---

## 🌍 Problem Overview

Forests face multiple safety threats that evolve quickly and often go unnoticed:

- **Wildfires** spread before ground teams can react
- **Illegal deforestation** happens far from human monitoring
- **Storms** create hazardous terrain for rangers and communities
- **Wildlife movements** can pose risks to both people and endangered species
- **Manual review** of drone footage is slow, inconsistent, and reactive

Traditional monitoring methods lack speed, transparency, and scalability.

**EcoVision solves this by turning drone video into immediate, actionable safety intelligence.**

---

## ✨ Solution Summary

EcoVision analyzes drone footage using GPU-accelerated Vision Transformers and delivers:

✅ **Real-time detection** (<2 seconds)  
Fires, deforestation, storm damage, wildlife presence

✅ **Explainable alerts**  
Each event includes visual evidence, timestamps, and reasoning

✅ **Severity scoring**  
High-risk events are surfaced instantly for urgent response

✅ **Accessible UI**  
Dashboards, timelines, and searchable clips powered by a modern React frontend

✅ **Human-centered oversight**  
Humans make the final decisions — EcoVision enhances visibility, not autonomy

---

## 🚀 Key Features

### 1. Fire Detection
Identifies flames, smoke, heat signatures, and ignition points with high accuracy.

### 2. Deforestation Alerts
Detects machinery, exposed soil, and new clearing patterns in protected areas.

### 3. Storm Impact Analysis
Flags fallen trees, blocked paths, and unstable terrain for ranger safety.

### 4. Wildlife Activity Monitoring
Tracks animal presence and movement to prevent human-wildlife conflict.

### 5. Transparency & Explainability
Every alert includes visual cues, reasoning chains, and confidence scores.

### 6. Real-time Dashboard
Events displayed as they are detected, with type, severity, and clip previews.

---

## 🧠 AI Safety Principles

EcoVision integrates core Physical AI Safety principles from global frameworks:

| Principle | Framework | Implementation |
|-----------|-----------|----------------|
| **Transparency** | OECD AI Principles | Clear explanations for every detected event |
| **Human Oversight** | EU AI Act | EcoVision provides signals; humans retain control |
| **Robustness & Physical Safety** | NIST AI RMF | Reliable early detection reduces risk for field teams |
| **Fairness & Bias Reduction** | OECD | Consistent AI analysis minimizes subjective interpretation |

---

## 📊 Features Overview

### Dashboard
- **Real-time Statistics**: Total events, flights, severity distribution
- **Interactive Charts**: Event type breakdown with Recharts
- **Recent Events Feed**: Latest detections with severity indicators
- **VSS Processing Status**: Real-time analysis pipeline visualization

### Event Timeline
- **Filterable Events**: By type (fire, deforestation, storm, wildlife) and severity
- **Color-Coded Badges**:
  - 🔥 Fire - Orange gradient
  - 🌳 Deforestation - Amber gradient
  - ⛈️ Storm - Blue gradient
  - 🦅 Wildlife - Green gradient
- **Confidence Scores**: AI detection confidence for each event
- **Timestamps & Locations**: Precise event metadata

### Video Upload
- **Drag-and-Drop Interface**: Intuitive file selection
- **Real-time Progress**: Upload and analysis progress tracking
- **Format Validation**: MP4, AVI, MOV (max 500MB)
- **VSS Integration**: Automatic analysis with NVIDIA VSS
- **Event Detection**: Instant safety event identification

### Event Details
- **Visual Evidence**: Video clips and thumbnails
- **VSS Analysis**: Detailed reasoning and context
- **Flight Metadata**: Drone information and coordinates
- **Severity Assessment**: Risk level and recommended actions

---

## 🌱 Impact

EcoVision enables environmental teams to:

✅ **Detect threats earlier** - Real-time analysis vs. manual review  
✅ **Respond faster** - Instant alerts for high-severity events  
✅ **Reduce human error** - Consistent AI-powered detection  
✅ **Protect ecosystems** - Prevent irreversible damage  
✅ **Scale monitoring** - Cover large forest areas efficiently  
✅ **Increase transparency** - Explainable AI decision-making  

**This transforms forest monitoring from reactive to proactive, making forests safer for people and wildlife.**

---

## 👥 Team – SU Heroes

| Name | Role | LinkedIn |
|------|------|----------|
| **Jady Pamella** | AI & Technology Leader | [linkedin.com/in/jadypamella](https://www.linkedin.com/in/jadypamella/) |
| **Phuwit Vititayanon** | AI Maker, Data Scientist | [linkedin.com/in/phuwit-vititayanon](https://www.linkedin.com/in/phuwit-vititayanon-4b6503157/) |
| **Supun Chathuranga** | AI Engineer | [linkedin.com/in/supun-chathuranga](https://www.linkedin.com/in/supun-chathuranga-190372148/) |

---

## 🛠 Tech Stack

### Frontend (This Repository)
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite** - Build tool and dev server
- **React Router 6.30** - Client-side routing
- **TanStack Query 5.83** - Data fetching and caching
- **shadcn/ui** - Component library (Radix UI + Tailwind CSS)
- **Lucide React** - Icon system
- **Recharts 2.15** - Data visualization
- **Supabase** - NVIDIA VSS proxy integration
- **Sonner** - Toast notifications

### AI & Processing
- **NVIDIA Video Search & Summarization (VSS)**
- **GPU-accelerated Vision Transformers**
- **Context-aware reasoning engine**
- **Multi-class event detection**

---

## 🏗 What Was Built During the Fixathon

Everything in this repository was created during the Fixathon, including:

✅ Integration with NVIDIA VSS for drone footage ingestion  
✅ Multi-class forest risk detection (fire, deforestation, storm, wildlife)  
✅ Forest Safety Reasoning Engine with explainability  
✅ Severity scoring and prioritization system  
✅ Modern React UI with Dashboard, Timeline, and Event Viewer  
✅ Real-time video analysis with progress tracking  
✅ Explainability layer for transparent decision support  
✅ System architecture and Safety/Ethics documentation  

**No pre-existing project or code was used.**

---

## 🤖 NVIDIA VSS Integration

The frontend connects to NVIDIA VSS through a Supabase Edge Function proxy:

1. **Video Upload** - File sent to VSS
2. **Caption Generation** - VSS analyzes frames
3. **Event Summarization** - Safety events extracted
4. **Risk Categorization** - Events classified by type and severity

---

## ⚙️ Architecture & Key Components

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend (React + TS)                   │
│        Lovable.app UI + shadcn/ui Components            │
│  (Upload, Dashboard, Timeline, Event Details, VSS)      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ REST API + WebSocket
                  │
┌─────────────────▼───────────────────────────────────────┐
│              Supabase Backend + VSS Proxy               │
│           (Authentication, Storage, API)                │
└─────────────────┬───────────────────────────────────────┘
                  │
         ┌────────┼────────┐
         │        │        │
         ▼        ▼        ▼
    ┌────────┐ ┌──────────┐ ┌──────────┐
    │ Video  │ │  NVIDIA  │ │ Postgres │
    │Storage │ │   VSS    │ │ Database │
    │(Bucket)│ │Blueprint │ │ (Events) │
    └────────┘ └──────────┘ └──────────┘
```

### Key Signals Detected

EcoVision's AI Safety Agent monitors **4 critical environmental signals**:

| Signal | Detection | Severity Levels |
|--------|-----------|-----------------|
| **Fire** | Flames, smoke, heat signatures | High, Medium, Low |
| **Deforestation** | Logging, cleared areas, machinery | High, Medium, Low |
| **Storm** | Fallen trees, flooding, blocked routes | High, Medium, Low |
| **Wildlife** | Animal presence, movement patterns | High, Medium, Low |

### Dashboard Features

The Safety Dashboard displays real-time statistics from VSS analysis:

- **Total Events**: Count of all detected safety events
- **High Severity**: Number of critical events requiring attention
- **Videos Analyzed**: Total drone footage processed
- **Fire Events**: Specific count of fire-related detections

### Data Flow

1. **Video Upload** → User uploads drone footage via drag-and-drop
2. **VSS Processing** → NVIDIA VSS analyzes video frames
3. **Event Extraction** → Safety events parsed from VSS response
4. **Database Storage** → Events persisted to Supabase (Postgres)
5. **UI Rendering** → Real-time dashboard and timeline updates

### Technical Implementation

#### Built With
- **Frontend**: React 18.3 + TypeScript 5.6
- **UI Framework**: shadcn/ui + TailwindCSS
- **Backend**: Supabase (Database, Storage, Edge Functions)
- **AI Engine**: NVIDIA VSS Blueprint
- **Video Processing**: GPU-accelerated Vision Transformers
- **Hosting**: Lovable.app

#### Database Schema

```sql
-- Video analyses table
video_analyses (id, file_name, video_url, status, caption, summary, raw_response)

-- Safety events table  
safety_events (id, analysis_id, event_type, severity, title, description, start_time, end_time)
```

#### Key Features Implemented
- Drag-and-drop video upload (MP4, AVI, MOV)
- Real-time VSS processing visualization
- Interactive event timeline with filtering
- Severity-based color coding (High: red, Medium: yellow, Low: green)
- Event detail pages with video playback
- Dashboard statistics and charts (Recharts)
- Persistent storage in Supabase database
- Mobile-responsive design

### Safety & Ethics Rationale

**Human-in-the-Loop Design**:
- AI provides event detection and classification; humans make response decisions
- All events display severity levels and visual evidence for informed decision-making
- Operators can review, filter, and investigate detected events
- Clear separation between AI detection and human action

**Transparency & Explainability**:
- Every detected event includes description from VSS analysis
- Severity levels (high/medium/low) clearly displayed
- Video timestamps allow verification of AI decisions
- Raw VSS response stored for audit purposes

**Bias Reduction**:
- Consistent AI-powered analysis replaces subjective human interpretation
- Same detection criteria applied uniformly across all footage
- Event categorization based on trained models, not individual judgment

**Data Handling**:
- Video footage stored in secure Supabase storage bucket
- Events and analyses persisted in PostgreSQL database
- Public access for demo purposes (production would use RLS with auth)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard stats and charts
│   ├── upload/             # Video upload with VSS integration
│   ├── timeline/           # Event timeline and cards
│   ├── landing/            # Landing page
│   ├── layout/             # App layout components
│   ├── common/             # Shared components
│   └── ui/                 # shadcn/ui components
├── pages/                  # React Router pages
├── services/               # API client
├── types/                  # TypeScript interfaces
├── hooks/                  # Custom React hooks (including VSS analysis)
├── lib/                    # Utilities and VSS API
└── integrations/           # Supabase VSS proxy
```

---

## 📝 License

MIT License - NVIDIA AI Safety Fixathon Submission

---

## 📬 Contact

For collaboration, demos, or inquiries:

- Reach out via [LinkedIn](https://www.linkedin.com/in/jadypamella/)
- Email: hello@jadypamella.com

---

## 🙏 Acknowledgments

- **NVIDIA** for the VSS Blueprint and AI Safety Fixathon
- **Norrsken** for organizing the Fixathon 2025
- **Lovable** for the UI framework foundation
- **Supabase** for VSS proxy infrastructure

---

**Built with ❤️ for forest safety and environmental protection**
