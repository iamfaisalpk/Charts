import React from "react";
import { Link } from "react-router-dom";

export default function KanbanOverviewPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] p-8 text-slate-800">
      <div className="mx-auto max-w-md">
        <h1 className="text-lg font-semibold text-slate-900">Kanban Demos</h1>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/kanban/dnd-kit"
            className="rounded-md bg-slate-900 px-4 py-2.5 text-center text-[13px] font-medium text-white hover:bg-slate-800"
          >
            @dnd-kit/react
          </Link>
          <Link
            to="/kanban/pragmatic-dnd"
            className="rounded-md bg-slate-900 px-4 py-2.5 text-center text-[13px] font-medium text-white hover:bg-slate-800"
          >
            @atlaskit/pragmatic-drag-and-drop
          </Link>
          <Link
            to="/kanban/hello-pangea"
            className="rounded-md bg-slate-900 px-4 py-2.5 text-center text-[13px] font-medium text-white hover:bg-slate-800"
          >
            @hello-pangea/dnd
          </Link>
        </div>
      </div>
    </div>
  );
}


        {/* @dnd-kit/react  */}
        
        /* 
        React-inu specifically undakkiya modern library aanu ithu.
        Hooks-based API (useDraggable, useDroppable) use cheyyunnathu kondu code clean-aayi ezhutham.
        Active community undu, regular updates varunnu. Bundle size kuranjath aayathu kondu page load fast aavum,
        unnecessary re-renders avoid cheyyunna smart internal architecture undathu kondu complex boards-ilum
        performance drop varathe smooth-aayi work cheyyum.

        ✅ React-specific, hooks-based
        ✅ Lightweight — bundle size kuranjath, page fast load aavum
        ✅ Smart re-render optimization — complex boards-ilum lag varathe
        ✅ Accessibility built-in
        ✅ Active maintenance & large community
        ⚠️ Learning curve medium aanu
        */



        {/* @atlaskit/pragmatic-drag-and-drop */}

        /* 
        Jira, Trello undakkiya Atlassian company-inte library aanu ithu.
        Framework agnostic aanu — React mathramalla Vue, vanilla JS-ilum work cheyyum.
        Performance-il focus cheythu undakkiyath aayathu kondu very fast aanu

        ✅ Battle-tested (Atlassian internally use cheyyunnu)
        ✅ Best performance
        ✅ Framework agnostic
        ❌ Community & docs weak
        ❌ Learning curve high aanu
        */



        
        {/*  @hello-pangea/dnd */}

        /* 
        Atlude popular aaayirunna react-beautiful-dnd React 18 support drop cheythappe,
        community athu fork cheythu undakkiyath aanu ithu. API simple aayathu kondu pick up cheyyaan easy aanu,
        animated drag experience out of the box kittum. Pakshe official backing illatha community project aanu — future uncertain.

        ✅ Easiest to learn
        ✅ Smooth animations built-in
        ✅ Familiar API (RBD users-inu)
        ❌ No official backing
        ❌ Long-term maintenance uncertain
        */