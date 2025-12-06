# EcoVision Frontend (Lovable)

Modern React frontend for the EcoVision forest safety monitoring platform, built with Lovable.

## Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **shadcn/ui** - Component library (Radix UI + Tailwind)
- **Lucide React** - Icons
- **Recharts** - Data visualization

## Architecture

### Design System
- **Colors**: EcoVision palette (#003A23 deep green, #03813A leaf green, #2A6C4F forest mist)
- **Font**: Plus Jakarta Sans
- **Icons**: Lucide React (no emojis)
- **Theme**: Light mode with forest-inspired colors

### Project Structure
```
src/
 components/
    dashboard/     # Dashboard stats and charts
    upload/        # Video upload interface
    timeline/      # Event timeline and cards
    landing/       # Landing page
    layout/        # App layout components
    common/        # Shared components
    ui/            # shadcn/ui components
 pages/             # React Router pages
 services/          # API client (api.ts)
 types/             # TypeScript interfaces
 hooks/             # Custom React hooks
 lib/               # Utilities and helpers
```

## Configuration

### Environment Variables
Create `.env` file:
```bash
VITE_API_URL=http://localhost:8765
```

### Backend API Integration
The frontend connects to the FastAPI backend at `http://localhost:8765/api/`:

**Endpoints:**
- `GET /api/stats` - Dashboard statistics
- `GET /api/events` - Event timeline (with filters: event_type, severity, page, limit)
- `GET /api/events/:id` - Event details
- `POST /api/upload` - Video upload with multipart/form-data

**Response Mapping:**
- Backend `flight_id`  Frontend `flightId`
- Event types: fire, deforestation, storm, wildlife
- Severity levels: high, medium, low

### API Client Features
- **Automatic Fallback**: Uses mock data when backend is unavailable
- **Progress Tracking**: XMLHttpRequest for upload progress
- **Type Safety**: TypeScript interfaces matching backend schemas
- **Error Handling**: Try-catch with graceful degradation

## Development

### Install Dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```
Frontend runs on: `http://localhost:8080/`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Integration with Backend

### Running Full Stack

1. **Start Backend** (Docker):
   ```bash
   cd D:\Projetos\ecovision
   docker-compose up -d
   ```
   Backend: `http://localhost:8765/api/`

2. **Start Frontend**:
   ```bash
   cd D:\Projetos\ecovision-norrsken
   npm run dev
   ```
   Frontend: `http://localhost:8080/`

3. **NVIDIA VSS** (Optional - for real video analysis):
   - Run on `http://localhost:8100`
   - Configure API key in backend `.env`

### API Service (`src/services/api.ts`)

The API client automatically handles:
- Environment-based API URL (`VITE_API_URL`)
- Mock data fallback for development without backend
- FormData for file uploads with progress tracking
- Query parameter building for event filtering

**Example Usage:**
```typescript
import { getStats, getEvents, uploadVideo } from '@/services/api';

// Get dashboard stats
const stats = await getStats();

// Get filtered events
const fireEvents = await getEvents({ 
  event_type: 'fire', 
  severity: 'high' 
});

// Upload video with progress
await uploadVideo(file, (progress) => {
  console.log(`Upload: ${progress}%`);
});
```

## Features

### Dashboard
- Real-time statistics (total events, flights, events by type/severity)
- Interactive charts (event distribution, severity breakdown)
- Recent events feed with severity indicators

### Event Timeline
- Filterable event cards (type, severity)
- Event type badges with color coding:
  -  Fire - Orange gradient
  -  Deforestation - Amber gradient  
  -  Storm - Blue gradient
  -  Wildlife - Green gradient
- Confidence scores and timestamps
- Location information

### Video Upload
- Drag-and-drop or click-to-browse
- Real-time upload progress bar
- Video validation (MP4, AVI, MOV, 500MB max)
- Processing feedback with detected events

### Event Details
- Full event information
- Video clips and thumbnails
- VSS analysis results
- Flight metadata

## Dependencies

### Core
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.0",
  "typescript": "^5.6.3"
}
```

### Data & State
```json
{
  "@tanstack/react-query": "^5.83.1",
  "@tanstack/react-query-devtools": "^5.83.1"
}
```

### UI Components
```json
{
  "@radix-ui/react-*": "^1.x",
  "lucide-react": "^0.468.0",
  "recharts": "^2.15.0"
}
```

### Styling
```json
{
  "tailwindcss": "^3.4.17",
  "tailwindcss-animate": "^1.0.7"
}
```

## Testing Backend Connection

### Check Backend Health
```bash
curl http://localhost:8765/api/stats
```

Expected response:
```json
{
  "total_flights": 0,
  "total_events": 0,
  "events_by_type": {},
  "events_by_severity": {
    "high": 0,
    "medium": 0,
    "low": 0
  }
}
```

### Test CORS
The backend is configured with CORS for:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:8000`
- `http://localhost:8080` 

## Deployment

### Frontend
- Build output: `dist/`
- Static files ready for hosting on Vercel, Netlify, or any CDN
- Environment variables configured via hosting platform

### Backend
- Docker container: `ecovision_backend`
- Port mapping: `8765:8000`
- Database: SQLite (`backend/ecovision.db`)
- Storage volumes: uploads, clips, thumbnails

## License

MIT License - NVIDIA AI Safety Fixathon Submission

## Links

- **Repository**: https://github.com/jadypamella/ecovision-norrsken
- **Backend Repo**: https://github.com/jadypamella/ecovision
- **Challenge**: NVIDIA AI Safety Fixathon - Physical AI Safety
