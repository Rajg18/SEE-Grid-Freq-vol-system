import {test} from 'node:test';
import assert from 'node:assert/strict';
import {step,initialReading,classify,validateThresholds,defaultThresholds,statistics,scenarios} from '../src/simulation.js';
test('normal operation stays stable for an hour',()=>{let r=initialReading();for(let n=0;n<3600;n++){r=step(r,'normal');assert.equal(classify(r),'normal');}});
test('each disturbance reaches the expected condition and recovers',()=>{for(const scenario of Object.keys(scenarios).filter(k=>!['normal','recovery'].includes(k))){let r=initialReading();for(let n=0;n<30;n++)r=step(r,scenario,1,()=>.5);assert.equal(classify(r),'critical',scenario);if(scenario==='solar')assert.ok(r.solar<20);for(let n=0;n<30;n++)r=step(r,'recovery',1,()=>.5);assert.equal(classify(r),'normal');}});
test('threshold boundaries and validation',()=>{assert.equal(classify({frequency:49.5,voltage:230}),'critical');assert.equal(classify({frequency:50,voltage:240}),'warning');assert.ok(validateThresholds(defaultThresholds));assert.ok(!validateThresholds({...defaultThresholds,frequencyCritical:.1}));assert.ok(!validateThresholds({...defaultThresholds,voltageWarning:NaN}));});
test('analytics reports exact sample statistics',()=>{assert.deepEqual(statistics([{frequency:49},{frequency:50},{frequency:51}],'frequency'),{min:49,max:51,avg:50});});
