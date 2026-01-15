import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, RadialBarChart, RadialBar, Tooltip } from 'recharts';

// Chart data
const punctualityData = [
  { v: 96 }, { v: 97 }, { v: 95 }, { v: 98 }, { v: 97 }, { v: 99 }, { v: 98 }
];

const headwayData = [
  { v: 20 }, { v: 35 }, { v: 45 }, { v: 60 }, { v: 40 }, { v: 25 }, { v: 30 }, { v: 50 }
];

const passengerData = [
  { hour: '6am', v: 1200 },
  { hour: '8am', v: 4500 },
  { hour: '10am', v: 2800 },
  { hour: '12pm', v: 3200 },
  { hour: '2pm', v: 2600 },
  { hour: '4pm', v: 4100 },
  { hour: '6pm', v: 5200 },
  { hour: '8pm', v: 3500 },
  { hour: '10pm', v: 1800 },
];

const delayByCause = [
  { name: 'Signal', value: 35, fill: '#ef4444' },
  { name: 'Weather', value: 20, fill: '#f59e0b' },
  { name: 'Equipment', value: 25, fill: '#2E5CFF' },
  { name: 'Ops', value: 15, fill: '#8b5cf6' },
  { name: 'Other', value: 5, fill: '#10b981' },
];

const trainOccupancy = [
  { v: 45 }, { v: 65 }, { v: 82 }, { v: 91 }, { v: 78 }, { v: 55 }, { v: 40 }, { v: 35 }
];

const energyData = [
  { hour: '00', kw: 120 }, { hour: '04', kw: 80 }, { hour: '08', kw: 450 },
  { hour: '12', kw: 380 }, { hour: '16', kw: 520 }, { hour: '20', kw: 480 }, { hour: '23', kw: 200 }
];

const stationCrowding = [
  { station: 'South', v: 45 },
  { station: 'Market', v: 78 },
  { station: 'Central', v: 95 },
  { station: 'Tech', v: 62 },
  { station: 'North', v: 38 },
];

const reliabilityData = [
  { v: 98.5 }, { v: 99.1 }, { v: 97.8 }, { v: 99.3 }, { v: 98.9 }, { v: 99.5 }
];

const wheelWear = [
  { mm: 2.5 }, { mm: 3.1 }, { mm: 4.2 }, { mm: 2.8 }, { mm: 3.5 }
];

const brakePerf = [
  { v: 95 }, { v: 92 }, { v: 98 }, { v: 88 }, { v: 94 }
];

const doorOps = [
  { success: 99.2 }, { fail: 0.8 }
];

const trackCondition = [
  { gauge: 98 }, { alignment: 97 }, { surface: 99 }
];

const maintStatus = [
  { name: 'Scheduled', value: 12 },
  { name: 'In Progress', value: 3 },
  { name: 'Completed', value: 45 },
  { name: 'Overdue', value: 2 },
];

const crewUtil = [
  { v: 85 }, { v: 12 }, { v: 3 }
];

const temperatureData = [
  { v: 22 }, { v: 24 }, { v: 23 }, { v: 21 }, { v: 25 }, { v: 23 }
];

const signalPerf = [
  { v: 99.8 }, { v: 99.5 }, { v: 99.9 }, { v: 99.7 }
];

const lineData = [
  { v: 65 }, { v: 80 }, { v: 72 }, { v: 88 }, { v: 90 }, { v: 75 }, { v: 68 }, { v: 82 }, { v: 95 }
];

// Chart components
const ChartCard = ({ title, subtitle, children, color = 'quantix-purple', stats }: { title: string; subtitle?: string; children: React.ReactNode; color?: string; stats?: string }) => {
  const colorMap: Record<string, string> = {
    'quantix-purple': '#25c0f4',
    'success': '#10b981',
    'warning': '#f59e0b',
    'danger': '#ef4444',
    'purple': '#8b5cf6',
    'orange': '#f97316',
  };
  const accentColor = colorMap[color] || colorMap['quantix-purple'];

  return (
    <div className="glass-card p-4 flex flex-col h-48 group hover:shadow-[0_0_20px_rgba(37,192,244,0.1)] transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <span className="w-1 h-3 rounded-full" style={{ backgroundColor: accentColor }}></span>
            {title}
          </h3>
          {subtitle && <p className="text-[10px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {stats && (
          <span className="text-xs font-mono px-1.5 py-0.5 rounded border" style={{ color: accentColor, borderColor: `${accentColor}30`, backgroundColor: `${accentColor}10` }}>
            {stats}
          </span>
        )}
      </div>
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};

export const LineDetail = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  return (
    <div className="p-4 h-full overflow-y-auto">
       {/* Header */}
       <div className="flex justify-between items-center mb-4">
           <h1 className="text-lg font-bold text-white">BLUE LINE <span className="text-slate-400 font-normal text-sm">– Live Monitor</span></h1>
           <div className="flex gap-1">
               <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-all">All Stations</button>
               <button className="px-3 py-1 rounded-lg bg-quantix-purple/15 border border-quantix-purple/30 text-xs text-quantix-purple hover:bg-quantix-purple/25 transition-all">Northbound</button>
               <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-all">Southbound</button>
           </div>
       </div>

       {/* Key Metrics Row */}
       <div className="grid grid-cols-6 gap-3 mb-4">
          {[
            { label: 'On-Time', value: '98.2%', color: 'text-rail-success', bg: 'bg-rail-success/10', border: 'border-rail-success/30' },
            { label: 'Active Trains', value: '24', color: 'text-quantix-purple', bg: 'bg-quantix-purple/10', border: 'border-quantix-purple/30' },
            { label: 'Pax/hr', value: '3,847', color: 'text-white', bg: 'bg-white/5', border: 'border-white/10' },
            { label: 'Avg Headway', value: '3m 20s', color: 'text-rail-warning', bg: 'bg-rail-warning/10', border: 'border-rail-warning/30' },
            { label: 'Load Factor', value: '76%', color: 'text-rail-warning', bg: 'bg-rail-warning/10', border: 'border-rail-warning/30' },
            { label: 'Energy', value: '412 kW', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
          ].map((metric, i) => (
            <div key={i} className={`glass-card p-3 text-center border ${metric.border}`}>
               <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
               <div className="text-[10px] text-slate-500 uppercase mt-1">{metric.label}</div>
            </div>
          ))}
       </div>

       {/* Main Charts Grid - Row 1 */}
       <div className="grid grid-cols-4 gap-3 mb-3">
          <ChartCard title="Punctuality Trend" subtitle="Last 7 days" color="success" stats="98.2%">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={punctualityData}>
                <defs>
                  <linearGradient id="gradPunct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10b981" fill="url(#gradPunct)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Headway Variance" subtitle="By hour" color="warning" stats="±12s">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={headwayData}>
                <Bar dataKey="v" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Passenger Flow" subtitle="By hour" color="quantix-purple" stats="Peak 18:45">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={passengerData}>
                <defs>
                  <linearGradient id="gradPax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#25c0f4" fill="url(#gradPax)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Delay by Cause" subtitle="Distribution" color="danger">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={delayByCause} cx="50%" cy="50%" innerRadius={25} outerRadius={45} paddingAngle={2} dataKey="value">
                  {delayByCause.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
       </div>

       {/* Main Charts Grid - Row 2 */}
       <div className="grid grid-cols-4 gap-3 mb-3">
          <ChartCard title="Train Occupancy" subtitle="Live %" color="purple" stats="76% avg">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trainOccupancy}>
                <defs>
                  <linearGradient id="gradOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#8b5cf6" fill="url(#gradOcc)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Energy Consumption" subtitle="kW by hour" color="orange" stats="412 kW">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
                <Bar dataKey="kw" fill="#f97316" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Station Crowding" subtitle="% capacity" color="warning" stats="Max 95%">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stationCrowding} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="station" tick={{ fill: '#64748b', fontSize: 10 }} width={45} />
                <Bar dataKey="v" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="System Reliability" subtitle="Last 6 runs" color="success" stats="99.1%">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reliabilityData}>
                <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
       </div>

       {/* Main Charts Grid - Row 3 */}
       <div className="grid grid-cols-4 gap-3 mb-3">
          <ChartCard title="Wheel Wear" subtitle="mm degradation" color="danger" stats="Avg 3.2mm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wheelWear}>
                <Bar dataKey="mm" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Brake Performance" subtitle="Efficiency %" color="success" stats="94%">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={brakePerf}>
                <defs>
                  <linearGradient id="gradBrake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10b981" fill="url(#gradBrake)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Door Operations" subtitle="Success rate" color="quantix-purple" stats="99.2%">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={doorOps} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={5}>
                  <Cell fill="#25c0f4" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Track Condition" subtitle="Index score" color="success" stats="98%">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={50} data={trackCondition}>
                <RadialBar dataKey="gauge" background={{ strokeWidth: 2, stroke: '#1e293b' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartCard>
       </div>

       {/* Main Charts Grid - Row 4 */}
       <div className="grid grid-cols-4 gap-3 mb-3">
          <ChartCard title="Maintenance Status" subtitle="Work orders" color="quantix-purple" stats="62 total">
            <div className="flex items-center justify-center h-full">
               <div className="flex gap-4 text-xs">
                  <div className="text-center">
                     <div className="text-lg font-bold text-quantix-purple">12</div>
                     <div className="text-slate-500">Scheduled</div>
                  </div>
                  <div className="text-center">
                     <div className="text-lg font-bold text-rail-warning">3</div>
                     <div className="text-slate-500">In Progress</div>
                  </div>
                  <div className="text-center">
                     <div className="text-lg font-bold text-rail-success">45</div>
                     <div className="text-slate-500">Completed</div>
                  </div>
                  <div className="text-center">
                     <div className="text-lg font-bold text-rail-danger">2</div>
                     <div className="text-slate-500">Overdue</div>
                  </div>
               </div>
            </div>
          </ChartCard>

          <ChartCard title="Crew Utilization" subtitle="Allocation %" color="quantix-purple" stats="85%">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={crewUtil} cx="50%" cy="50%" innerRadius={35} outerRadius={50} dataKey="v">
                  <Cell fill="#25c0f4" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Car Temperature" subtitle="Average °C" color="success" stats="23°C">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Signal Performance" subtitle="Uptime %" color="success" stats="99.7%">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signalPerf}>
                <defs>
                  <linearGradient id="gradSignal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10b981" fill="url(#gradSignal)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
       </div>

       {/* Line Voltage & Speed Profile */}
       <div className="grid grid-cols-2 gap-3">
          <ChartCard title="Line Voltage Profile" subtitle="Along route" color="quantix-purple" stats="750V DC">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="gradVolt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25c0f4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#25c0f4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#25c0f4" fill="url(#gradVolt)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Speed Restriction Zones" subtitle="Current alerts" color="danger" stats="3 active">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lineData}>
                <Bar dataKey="v" fill="#ef4444" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
       </div>
    </div>
  );
};
