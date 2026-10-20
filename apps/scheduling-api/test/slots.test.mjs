import {test} from "node:test";
import assert from "node:assert/strict";
import {slotsFor,dateOK,dayOK,serviceOf} from "../core.mjs";
const now=new Date("2026-10-20T08:00:00Z"); // 10:00 Maputo
test("validates date, weekdays and services",()=>{
 assert.equal(dateOK("2026-02-30"),false);
 assert.equal(dayOK("2026-10-24"),false);
 assert.equal(serviceOf("visit").duration,45);
});
test("slots never overlap another service, including pending reservations",()=>{
 const booked=[{time:"09:00",durationMinutes:45,status:"requested"}];
 const slots=slotsFor("2026-10-21","admission",booked,now);
 assert.ok(!slots.includes("08:45"));
 assert.ok(!slots.includes("09:00"));
 assert.ok(!slots.includes("09:15"));
 assert.ok(!slots.includes("09:30"));
 assert.ok(slots.includes("09:45"));
});
test("cancelled bookings release their slots",()=>{
 const rows=[{time:"09:00",durationMinutes:30,status:"cancelled"}];
 assert.ok(slotsFor("2026-10-21","admission",rows,now).includes("09:00"));
});
test("past Maputo slots and weekends are closed",()=>{
 const arr=slotsFor("2026-10-20","admission",[],now);
 assert.ok(!arr.includes("08:00"));
 assert.ok(!arr.includes("10:00"));
 assert.ok(arr.includes("10:15"));
 assert.deepEqual(slotsFor("2026-10-24","admission",[],now),[]);
});
