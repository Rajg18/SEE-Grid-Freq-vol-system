export const scenarios = {
 normal: {name:'Normal operation',description:'Balanced supply and demand',frequency:50,voltage:230,solar:82,load:72},
 overload: {name:'Demand surge',description:'Demand exceeds available generation',frequency:49.15,voltage:211,solar:82,load:98},
 surplus: {name:'Generation surplus',description:'Supply exceeds consumer demand',frequency:50.75,voltage:241,solar:96,load:48},
 undervoltage: {name:'Voltage disturbance',description:'Local voltage sag on the feeder',frequency:49.98,voltage:198,solar:82,load:78},
 solar: {name:'Solar generation drop',description:'Cloud cover reduces solar output',frequency:49.3,voltage:216,solar:18,load:72},
 recovery: {name:'Grid recovery',description:'Balancing response restores nominal values',frequency:50,voltage:230,solar:82,load:72}
};
export const defaultThresholds = {frequencyWarning:0.2,frequencyCritical:0.5,voltageWarning:10,voltageCritical:20};
export function validateThresholds(t){return Object.values(t).every(v=>Number.isFinite(v)&&v>0)&&t.frequencyCritical>t.frequencyWarning&&t.voltageCritical>t.voltageWarning;}
export function classify(r,t=defaultThresholds){const f=Math.abs(r.frequency-50),v=Math.abs(r.voltage-230);return f>=t.frequencyCritical||v>=t.voltageCritical?'critical':f>=t.frequencyWarning||v>=t.voltageWarning?'warning':'normal';}
export function step(previous,scenario,dt=1,random=Math.random){const target=scenarios[scenario]||scenarios.normal;const blend=1-Math.exp(-Math.max(0,dt)/3);const noise=()=>random()-.5;return {timestamp:Date.now(),frequency:previous.frequency+(target.frequency-previous.frequency)*blend+noise()*.018,voltage:previous.voltage+(target.voltage-previous.voltage)*blend+noise()*.7,solar:previous.solar+(target.solar-previous.solar)*blend,load:previous.load+(target.load-previous.load)*blend,scenario};}
export const initialReading=()=>({timestamp:Date.now(),frequency:50,voltage:230,solar:82,load:72,scenario:'normal'});
export function statistics(rows,key){if(!rows.length)return {min:0,max:0,avg:0};const values=rows.map(r=>r[key]);return {min:Math.min(...values),max:Math.max(...values),avg:values.reduce((a,b)=>a+b,0)/values.length};}
