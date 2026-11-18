# GridPulse Lite

Frontend-only Sustainable Energy Engineering MVP. React + Vite + Recharts. No backend, API keys, sensors or database required.

## Run

Install Node.js 20.19+ or 22.12+, then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the printed local URL (normally http://127.0.0.1:5173). On Windows use `npm.cmd` if PowerShell restricts npm.ps1. For a production build: `npm run build`, then `npm run preview`. Run engine checks with `npm test`.

## Demonstrate

1. Let normal operation run for ten seconds. Frequency remains near 50 Hz; voltage near 230 V.
2. Select Solar generation drop. Solar output falls from 82% toward 18%; the illustrative supply deficit reduces frequency and voltage gradually.
3. Observe warning then critical status and one incident that escalates in severity.
4. Select Grid recovery. Values return toward nominal and the incident closes automatically.
5. Pause/resume, review session min/average/max, and export CSV. Change warning/critical deviations through Thresholds.
6. Open Incident history. Incidents and thresholds survive reload in the same browser, when storage is allowed.

## Scope and limits

This is an educational real-time simulation, not physical measurement or a protection/control system. Voltage represents a 230 V single-phase demonstration feeder. Scenarios use a first-order response (3-second time constant) plus bounded noise; generation/load percentages illustrate conditions and are not a solved power-flow model. It does not predict a real interconnected grid's response to solar changes. Detection thresholds are configurable absolute deviations from nominal, not regulatory standards.

Sampling uses browser timers at a requested one second; background tabs may be throttled. Simulation duration and abnormal duration count executed one-second samples, excluding pauses. Charts display 60 samples; CSV and statistics retain up to 3,600 session samples. Measurements are not persisted. Up to 100 incidents and thresholds are stored in localStorage. Older unresolved incidents are labeled Previous session after reload. Incident duration uses wall-clock timestamps; severity records the highest severity reached, and measurements show onset values. Scenario labels describe conditions at incident onset. Reset clears session samples and closes any current incident while preserving history. CSV exports session readings, not historical incident records.

## Architecture

- `src/simulation.js`: standalone signal generation, scenarios, classification and analytics. Replace this data producer with a future WebSocket adapter for Spring Boot.
- `src/storage.js`: guarded browser persistence and CSV export.
- `src/main.jsx`: responsive dashboard, sampling lifecycle and incident transitions.
- `src/style.css`: responsive UI (system font fallback works offline).
- `tests/simulation.test.js`: normal stability, disturbance/recovery, boundaries and analytics.

All calculations and data stay in the browser. An optional Google Fonts stylesheet provides the typography; no external request is required for the simulation to operate.
