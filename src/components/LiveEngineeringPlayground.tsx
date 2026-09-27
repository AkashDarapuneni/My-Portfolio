import React, { useState } from 'react';
import { Play, Database, Sliders, Code2, Check, Copy, Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';
import { CardTilt3D } from './CardTilt3D';

export const LiveEngineeringPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'sql' | 'code'>('simulator');

  // Simulator state
  const [txVolume, setTxVolume] = useState<number>(150000);
  const [enableDeduplication, setEnableDeduplication] = useState<boolean>(true);
  const [enableSmartRouting, setEnableSmartRouting] = useState<boolean>(true);

  // SQL console state
  const [selectedSqlIndex, setSelectedSqlIndex] = useState<number>(0);
  const [isExecutingSql, setIsExecutingSql] = useState<boolean>(false);
  const [sqlExecuted, setSqlExecuted] = useState<boolean>(false);

  // Code preview state
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Calculations for Simulator
  const baseFailureRate = 6.4;
  const deduplicationSaving = enableDeduplication ? 3.2 : 0;
  const routingSaving = enableSmartRouting ? 2.1 : 0;
  const currentFailureRate = Math.max(0.4, Number((baseFailureRate - deduplicationSaving - routingSaving).toFixed(1)));
  const successRate = Number((100 - currentFailureRate).toFixed(1));
  const failedTransactions = Math.round((txVolume * currentFailureRate) / 100);
  const rescuedTransactions = Math.round((txVolume * (deduplicationSaving + routingSaving)) / 100);
  const avgLatency = enableSmartRouting ? 142 : 385;

  const sqlSnippets = [
    {
      title: 'UPI Merchant Settlement & Success Rate Ranking',
      description: 'Calculates success percentages and rolling settlement volumes grouped by merchant category.',
      query: `SELECT 
    m.merchant_name,
    m.category,
    COUNT(t.tx_id) AS total_attempts,
    ROUND(SUM(CASE WHEN t.status = 'SUCCESS' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS success_pct,
    ROUND(SUM(CASE WHEN t.status = 'SUCCESS' THEN t.amount ELSE 0 END), 2) AS total_volume_inr,
    AVG(t.latency_ms) AS avg_turnaround_ms
FROM transactions t
JOIN merchants m ON t.merchant_id = m.id
WHERE t.created_at >= NOW() - INTERVAL '24 HOURS'
GROUP BY m.merchant_name, m.category
HAVING COUNT(t.tx_id) > 1000
ORDER BY total_volume_inr DESC
LIMIT 5;`,
      headers: ['Merchant Name', 'Category', 'Attempts', 'Success %', 'Volume (INR)', 'Latency'],
      rows: [
        ['Swiggy QuickCommerce', 'Food & Dining', '48,290', '99.1%', '₹1,42,80,500', '118ms'],
        ['Amazon Pay Merchant', 'E-Commerce', '72,140', '98.8%', '₹3,95,10,200', '135ms'],
        ['Blinkit Instant Mart', 'Groceries', '39,810', '99.4%', '₹89,45,000', '104ms'],
        ['IRCTC Ticket Booking', 'Travel & Transit', '61,020', '96.2%', '₹2,10,60,000', '264ms'],
        ['Zomato Hyperlocal', 'Food & Dining', '53,400', '98.9%', '₹1,67,20,000', '125ms'],
      ],
    },
    {
      title: 'Peak-Hour Traffic Congestion & Queue Bottleneck Query',
      description: 'Aggregates vehicle densities and calculates intersection wait delays from kinematic sensor logs.',
      query: `SELECT 
    intersection_id,
    lane_direction,
    DATE_TRUNC('hour', recorded_at) AS time_window,
    COUNT(vehicle_id) AS vehicle_density,
    AVG(wait_duration_sec) AS avg_wait_seconds,
    CASE 
        WHEN AVG(wait_duration_sec) > 90 THEN 'CRITICAL GRIDLOCK'
        WHEN AVG(wait_duration_sec) > 45 THEN 'MODERATE CONGESTION'
        ELSE 'OPTIMAL FLOW'
    END AS flow_status
FROM traffic_sensor_logs
WHERE recorded_at >= '2026-03-20 08:00:00' 
  AND recorded_at <= '2026-03-20 11:00:00'
GROUP BY intersection_id, lane_direction, DATE_TRUNC('hour', recorded_at)
ORDER BY avg_wait_seconds DESC
LIMIT 4;`,
      headers: ['Intersection ID', 'Lane', 'Time Window', 'Density', 'Avg Wait', 'Flow Status'],
      rows: [
        ['NODE-04-HYD', 'NORTH-SOUTH', '09:00 - 10:00', '1,420 cars', '112.4s', 'CRITICAL GRIDLOCK'],
        ['NODE-04-HYD', 'EAST-WEST', '09:00 - 10:00', '1,180 cars', '74.2s', 'MODERATE CONGESTION'],
        ['NODE-02-KLU', 'NORTH-SOUTH', '08:00 - 09:00', '940 cars', '38.6s', 'OPTIMAL FLOW'],
        ['NODE-07-ORR', 'OUTER-LOOP', '10:00 - 11:00', '2,100 cars', '41.1s', 'OPTIMAL FLOW'],
      ],
    },
    {
      title: 'Fertilizer Shop ERP: Automated Zero-Stock & Ledger Alerts',
      description: 'Finds products reaching reorder thresholds and calculates accrued customer credit balances.',
      query: `SELECT 
    p.sku_code,
    p.product_name,
    p.current_stock_bags,
    p.minimum_threshold_bags,
    (p.minimum_threshold_bags - p.current_stock_bags) AS shortage_deficit,
    COALESCE(SUM(l.outstanding_balance), 0) AS farmer_credit_exposure
FROM products p
LEFT JOIN ledger_records l ON p.supplier_id = l.supplier_id AND l.status = 'PENDING'
WHERE p.current_stock_bags <= p.minimum_threshold_bags
GROUP BY p.sku_code, p.product_name, p.current_stock_bags, p.minimum_threshold_bags
ORDER BY shortage_deficit DESC;`,
      headers: ['SKU Code', 'Product Name', 'Current Stock', 'Threshold', 'Deficit', 'Credit Exposure'],
      rows: [
        ['UREA-46N-50KG', 'Neem Coated Urea 46%', '14 bags', '100 bags', '86 bags', '₹48,500'],
        ['DAP-18-46-0', 'Di-Ammonium Phosphate', '8 bags', '60 bags', '52 bags', '₹71,200'],
        ['MOP-0-0-60', 'Muriate of Potash', '25 bags', '50 bags', '25 bags', '₹32,000'],
        ['NPK-20-20-0', 'Complex Fertilizer 20-20', '32 bags', '50 bags', '18 bags', '₹19,800'],
      ],
    },
  ];

  const codeSnippets = [
    {
      language: 'Python',
      filename: 'upi_cleaning_pipeline.py',
      badge: 'Data Pipeline',
      code: `import pandas as pd
import numpy as np

def clean_transaction_stream(raw_df: pd.DataFrame) -> pd.DataFrame:
    """
    Automated wrangling pipeline for messy digital transaction logs:
    - Removes retry duplicates within 15-second windows
    - Imputes missing merchant network identifiers
    - Normalizes ISO-8601 timestamps
    """
    df = raw_df.copy()
    
    # 1. Deduplication on compound bank reference & timestamp window
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
    df = df.dropna(subset=['timestamp', 'tx_hash'])
    df = df.sort_values(by=['account_id', 'timestamp'])
    
    # Detect retry attempts within 15s window
    time_delta = df.groupby('account_id')['timestamp'].diff().dt.total_seconds()
    same_amount = df.groupby('account_id')['amount'].diff() == 0
    is_retry_duplicate = (time_delta <= 15.0) & same_amount
    df = df[~is_retry_duplicate]
    
    # 2. Impute missing status using response code mapping
    code_map = {'00': 'SUCCESS', 'U69': 'DECLINED', 'T01': 'TIMEOUT', 'Z9': 'GATEWAY_ERROR'}
    df['status'] = df['status'].fillna(df['resp_code'].map(code_map)).fillna('FAILED')
    
    # 3. Derive operational metrics
    df['is_peak_hour'] = df['timestamp'].dt.hour.isin([12, 13, 19, 20, 21])
    
    return df`,
    },
    {
      language: 'Java / Spring Boot',
      filename: 'WeatherForecastController.java',
      badge: 'Backend Microservice',
      code: `@RestController
@RequestMapping("/api/v1/forecast")
@CrossOrigin(origins = "*")
public class WeatherForecastController {

    private final WeatherService weatherService;
    private final CacheManager cacheManager;

    @Autowired
    public WeatherForecastController(WeatherService weatherService, CacheManager cacheManager) {
        this.weatherService = weatherService;
        this.cacheManager = cacheManager;
    }

    @GetMapping("/{city}")
    public ResponseEntity<ForecastResponseDTO> getCityForecast(
            @PathVariable @NotBlank String city,
            @RequestParam(defaultValue = "metric") String units) {
        
        // Multi-tier cache lookup before external meteorology dispatch
        ForecastResponseDTO forecast = weatherService.getCachedOrFetch(city.trim().toLowerCase(), units);
        
        return ResponseEntity.ok()
                .header("X-Cache-Status", forecast.isCacheHit() ? "HIT" : "MISS")
                .header("X-Response-Time-Ms", String.valueOf(forecast.getLatencyMs()))
                .body(forecast);
    }
}`,
    },
    {
      language: 'Python / Vosk',
      filename: 'emergency_voice_trigger.py',
      badge: 'Edge AI / GPIO',
      code: `import json
import sounddevice as sd
from vosk import Model, KaldiRecognizer
import RPi.GPIO as GPIO

# Emergency Relay Actuation Setup
RELAY_PIN = 18
STATUS_LED_PIN = 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(RELAY_PIN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(STATUS_LED_PIN, GPIO.OUT, initial=GPIO.LOW)

def run_edge_listener():
    model = Model(lang="en-us")
    rec = KaldiRecognizer(model, 16000)
    
    print("[EDGE AI] Offline acoustic listener initialized on RPi...")
    
    def audio_callback(indata, frames, time, status):
        if rec.AcceptWaveform(bytes(indata)):
            result = json.loads(rec.Result())
            text = result.get("text", "")
            
            # Sub-350ms emergency keyword matching
            if "emergency shutdown" in text or "system abort" in text:
                print(f"[ALERT] Override triggered: '{text}'")
                GPIO.output(RELAY_PIN, GPIO.HIGH)
                GPIO.output(STATUS_LED_PIN, GPIO.HIGH)

    with sd.RawInputStream(samplerate=16000, blocksize=4000, dtype='int16',
                           channels=1, callback=audio_callback):
        sd.sleep(1000000)`,
    },
  ];

  const handleExecuteSql = () => {
    setIsExecutingSql(true);
    setSqlExecuted(false);
    setTimeout(() => {
      setIsExecutingSql(false);
      setSqlExecuted(true);
    }, 350);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[selectedCodeIndex].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Playground Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#121c34]/90 border border-slate-700/70 mb-6 backdrop-blur-md shadow-lg">
        <button
          onClick={() => setActiveTab('simulator')}
          data-cursor="SIMULATOR"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'simulator'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive UPI Simulator</span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] bg-slate-900/30 font-mono">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          data-cursor="SQL RUNNER"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'sql'
              ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Live SQL Query Runner</span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] bg-indigo-950/60 text-indigo-300 font-mono">Postgres / MySQL</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          data-cursor="INSPECT CODE"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'code'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Code Sandbox</span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[10px] bg-emerald-950/40 text-emerald-300 font-mono">Production Ready</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE UPI SIMULATOR */}
      {activeTab === 'simulator' && (
        <CardTilt3D maxTilt={4} scale={1.01} className="w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121c34]/90 border border-cyan-500/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    UPI Transaction Analytics & Routing Simulator
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Adjust volume and test automated data wrangling & gateway failover mitigation in real-time.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-mono text-cyan-300 bg-[#0e172e] px-2.5 py-1 rounded-full border border-cyan-500/40 shadow-sm">
                  Python · Pandas · SQL View
                </span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Volume Slider */}
              <div className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Daily Transactions:</span>
                  <span className="text-cyan-400 font-bold">{txVolume.toLocaleString()} txs</span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="500000"
                  step="5000"
                  value={txVolume}
                  onChange={(e) => setTxVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>25k (Local)</span>
                  <span>150k (Baseline)</span>
                  <span>500k (National Peak)</span>
                </div>
              </div>

              {/* Toggle 1: Deduplication */}
              <div
                onClick={() => setEnableDeduplication(!enableDeduplication)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  enableDeduplication
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-inner'
                    : 'bg-[#0e172e]/60 border-slate-700/60 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-white">Retry Deduplication</span>
                  <div
                    className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                      enableDeduplication ? 'bg-indigo-600 justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2">
                  Filters 15-second double-tap retry anomalies with window indexing.
                </p>
                <span className="text-[10px] font-mono text-emerald-400 mt-2">
                  {enableDeduplication ? '✓ Eliminates 3.2% phantom errors' : '✕ Disabled (Noise present)'}
                </span>
              </div>

              {/* Toggle 2: Smart Gateway Routing */}
              <div
                onClick={() => setEnableSmartRouting(!enableSmartRouting)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  enableSmartRouting
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-inner'
                    : 'bg-[#0e172e]/60 border-slate-700/60 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-white">Smart Gateway Routing</span>
                  <div
                    className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                      enableSmartRouting ? 'bg-cyan-500 justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-slate-950 shadow-sm" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2">
                  Reroutes bank-timeout spikes to alternate NPCI nodal servers.
                </p>
                <span className="text-[10px] font-mono text-cyan-300 mt-2">
                  {enableSmartRouting ? '✓ Cuts latency from 385ms to 142ms' : '✕ High latency during peak'}
                </span>
              </div>
            </div>

            {/* Real-time KPI Outcome Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 text-center">
                <span className="text-[11px] font-mono text-slate-300 block mb-1">Success Ratio</span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${successRate >= 98 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {successRate}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Target: &gt;98.0%</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 text-center">
                <span className="text-[11px] font-mono text-slate-300 block mb-1">Failed Tx Count</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-400">
                  {failedTransactions.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">({currentFailureRate}% failure)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 text-center">
                <span className="text-[11px] font-mono text-slate-300 block mb-1">Rescued Settlements</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300">
                  {rescuedTransactions.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1">Pipeline Saved</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0e172e]/90 border border-slate-700/70 text-center">
                <span className="text-[11px] font-mono text-slate-300 block mb-1">End-to-End Latency</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono text-indigo-300">
                  {avgLatency} ms
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">P95 Turnaround</span>
              </div>
            </div>
          </div>
        </CardTilt3D>
      )}

      {/* TAB 2: LIVE SQL QUERY RUNNER */}
      {activeTab === 'sql' && (
        <CardTilt3D maxTilt={3} scale={1.01} className="w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121c34]/90 border border-indigo-500/40 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Analytical SQL Query Console</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Select a production query written by Akash and test executed results.
                </p>
              </div>

              <button
                onClick={handleExecuteSql}
                disabled={isExecutingSql}
                data-cursor="RUN SQL"
                className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${isExecutingSql ? 'animate-spin' : ''}`} />
                <span>{isExecutingSql ? 'Running Query...' : 'Execute SQL'}</span>
              </button>
            </div>

            {/* Query Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {sqlSnippets.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSqlIndex(idx);
                    setSqlExecuted(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                    selectedSqlIndex === idx
                      ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-400/60 font-bold'
                      : 'bg-[#0e172e] text-slate-300 border border-slate-700/70 hover:text-white hover:border-slate-600'
                  }`}
                >
                  {s.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* SQL Code Editor View */}
            <div className="rounded-xl bg-[#091122] border border-slate-700/70 overflow-hidden font-mono shadow-inner">
              <div className="px-4 py-2 bg-[#0e172e] border-b border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
                <span>query_{selectedSqlIndex + 1}.sql</span>
                <span className="text-cyan-400">PostgreSQL / MySQL 8.0</span>
              </div>
              <pre className="p-4 text-xs text-indigo-200 overflow-x-auto leading-relaxed select-text font-mono">
                {sqlSnippets[selectedSqlIndex].query}
              </pre>
            </div>

            {/* Query Output Table */}
            <div className="rounded-xl bg-[#091122] border border-slate-700/70 p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white font-semibold">Query Result Set:</span>
                  <span className="text-slate-400">
                    {sqlExecuted ? '5 rows returned in 8.4ms' : 'Ready (Click Execute SQL)'}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-700/60 text-slate-300 text-[11px]">
                      {sqlSnippets[selectedSqlIndex].headers.map((h, i) => (
                        <th key={i} className="pb-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {sqlSnippets[selectedSqlIndex].rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 text-slate-200 pr-4">
                            {cIdx === 3 && cell.includes('%') ? (
                              <span className="text-emerald-400 font-semibold">{cell}</span>
                            ) : cIdx === 5 && cell.includes('ms') ? (
                              <span className="text-cyan-300">{cell}</span>
                            ) : cIdx === 5 && cell.includes('GRIDLOCK') ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800">
                                {cell}
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardTilt3D>
      )}

      {/* TAB 3: CODE SANDBOX */}
      {activeTab === 'code' && (
        <CardTilt3D maxTilt={3} scale={1.01} className="w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#121c34]/90 border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Production Code Repository Sandbox</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Inspect real-world implementation logic across Python, Java, and Edge AI.
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                data-cursor="COPY"
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e172e] hover:bg-[#152342] text-slate-200 text-xs font-mono transition-colors border border-slate-700"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Tabs */}
            <div className="flex flex-wrap gap-2">
              {codeSnippets.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCodeIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedCodeIndex === idx
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/60 font-bold'
                      : 'bg-[#0e172e] text-slate-300 border border-slate-700/70 hover:text-white'
                  }`}
                >
                  <span>{c.filename}</span>
                  <span className="ml-2 text-[10px] text-slate-400">({c.language})</span>
                </button>
              ))}
            </div>

            {/* Code Body */}
            <div className="rounded-xl bg-[#091122] border border-slate-700/70 p-4 font-mono overflow-hidden shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 text-[11px] text-slate-300 mb-3">
                <span className="text-emerald-400">{codeSnippets[selectedCodeIndex].badge}</span>
                <span>UTF-8 · LF</span>
              </div>
              <pre className="text-xs text-slate-200 overflow-x-auto leading-relaxed select-text font-mono">
                {codeSnippets[selectedCodeIndex].code}
              </pre>
            </div>
          </div>
        </CardTilt3D>
      )}
    </div>
  );
};
