import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const COLUMNS = [
  { id: "backlog", title: "Backlog", dot: "bg-slate-400" },
  { id: "todo", title: "To Do", dot: "bg-blue-500" },
  { id: "in-progress", title: "In Progress", dot: "bg-amber-500" },
  { id: "done", title: "Done", dot: "bg-emerald-500" },
];

const PRIORITY_STYLE = {
  urgent: "border-l-red-500 text-red-500",
  high: "border-l-amber-500 text-amber-500",
  normal: "border-l-blue-500 text-blue-500",
  low: "border-l-slate-300 text-slate-400",
};

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Audit Kanban libraries",
    priority: "high",
    assignee: "F",
    columnId: "backlog",
  },
  {
    id: "task-2",
    title: "Prepare comparison routes",
    priority: "normal",
    assignee: "A",
    columnId: "backlog",
  },
  {
    id: "task-3",
    title: "Build overview page",
    priority: "urgent",
    assignee: "R",
    columnId: "todo",
  },
  {
    id: "task-4",
    title: "Document package trade-offs",
    priority: "low",
    assignee: "A",
    columnId: "todo",
  },
  {
    id: "task-5",
    title: "Test drag behaviour",
    priority: "high",
    assignee: "N",
    columnId: "in-progress",
  },
  {
    id: "task-6",
    title: "Share recommendation",
    priority: "normal",
    assignee: "A",
    columnId: "done",
  },
];

export default function PragmaticKanbanPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const taskId = source.data.taskId;
        const columnId = destination.data.columnId;
        if (!taskId || !columnId) return;

        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, columnId } : t)),
        );
      },
    });
  }, []);

  function addTask(columnId) {
    const id = `task-${Date.now()}`;
    setTasks((prev) => [
      ...prev,
      { id, title: "New task", priority: "normal", assignee: "?", columnId },
    ]);
  }

  function removeTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] p-8 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-lg font-semibold text-slate-900">
          Pragmatic drag-and-drop demo
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((t) => t.columnId === column.id)}
              onAddTask={() => addTask(column.id)}
              onRemoveTask={removeTask}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function Column({ column, tasks, onAddTask, onRemoveTask }) {
  const ref = useRef(null);
  const [isDropTarget, setIsDropTarget] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: column.id }),
      onDragEnter: () => setIsDropTarget(true),
      onDragLeave: () => setIsDropTarget(false),
      onDrop: () => setIsDropTarget(false),
    });
  }, [column.id]);

  return (
    <div
      ref={ref}
      className={`rounded-lg border p-3 transition-colors ${
        isDropTarget
          ? "border-blue-300 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${column.dot}`} />
          <span className="text-[13px] font-semibold text-slate-700">
            {column.title}
          </span>
          <span className="text-[12px] text-slate-400">{tasks.length}</span>
        </div>
        <button
          onClick={onAddTask}
          className="rounded px-1.5 text-sm font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          title="Add task"
        >
          +
        </button>
      </div>

      <div className="space-y-2 min-h-16">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onRemove={() => onRemoveTask(task.id)}
            />
          ))
        ) : (
          <div className="rounded-md border border-dashed border-slate-200 py-6 text-center text-[12px] text-slate-400">
            Drop task here
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task, onRemove }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el,
      getInitialData: () => ({ taskId: task.id }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [task.id]);

  const priority = PRIORITY_STYLE[task.priority] ?? PRIORITY_STYLE.normal;

  return (
    <div
      ref={ref}
      className={`group cursor-grab rounded-md border border-l-4 border-slate-200 bg-white p-2.5 text-[13px] shadow-sm transition active:cursor-grabbing ${priority} ${
        isDragging ? "opacity-50" : "hover:border-slate-300"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-slate-800">{task.title}</p>
        <button
          onClick={onRemove}
          className="shrink-0 text-slate-300 opacity-0 group-hover:opacity-100 hover:text-slate-500"
          title="Remove task"
        >
          ×
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide">
          {task.priority}
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] font-medium text-slate-600">
          {task.assignee}
        </span>
      </div>
    </div>
  );
}


{/* implementation plan this file */}

/*  
    @atlaskit/pragmatic-drag-and-drop 


1. draggable()
Oru DOM element-ne draggable aakki maattunna function aanu ithu.
useEffect-inu ullil element-il directly call cheyyunnu,
return aavunna cleanup function useEffect-inte return-aayi kodukkunnu (unmount cheyyumbol auto cleanup).
getInitialData → drag start aavumbol aa card-inte data (taskId) attach cheyyunnu.
onDragStart / onDrop → isDragging state update cheyyunnu (visual feedback).

  example :-   draggable({
    element: el,
    getInitialData: () => ({ taskId: task.id }),
    onDragStart: () => setIsDragging(true),
    onDrop: () => setIsDragging(false),
  });
  el → card-inte ref.current (DOM element directly pass cheyyunnu)
  isDragging → true aanenkil card opacity 50% aakkunnu


2. dropTargetForElements()
Oru DOM element-ne drop zone aakki maattunna function aanu ithu.
Column component-inte useEffect-inu ullil call cheyyunnu.
getData → ee column-inte id (columnId) drop event-inu attach cheyyunnu.
onDragEnter / onDragLeave / onDrop → isDropTarget state update cheyyunnu (highlight effect).

  example :-   dropTargetForElements({
    element: el,
    getData: () => ({ columnId: column.id }),
    onDragEnter: () => setIsDropTarget(true),
    onDragLeave: () => setIsDropTarget(false),
    onDrop: () => setIsDropTarget(false),
  });
  isDropTarget → true aanenkil column blue highlight kaanikkam


3. monitorForElements()
Board-inte top level-il oru useEffect-inu ullil setup cheyyunnu.
Ella drag-drop events-um ee oru monitor-il ninnu listen cheyyam —
column component-il ninnu state pass cheyyenda kaaryam illa.
onDrop → source.data.taskId (drag cheytha card) + destination.data.columnId (drop cheytha column)
randu um eduthu task-inte columnId update cheyyunnu.

  example :-   monitorForElements({
    onDrop({ source, location }) {
      const destination = location.current.dropTargets[0];
      const taskId = source.data.taskId;
      const columnId = destination.data.columnId;

      -- task-inte columnId update cheyyunnu
    },
  });

*/


{/* in this file package small explaination  */}

/*
Nammude PragmaticKanbanPage.tsx file @atlaskit/pragmatic-drag-and-drop library use cheythu undakkiyathanu.
Ithu Atlassian (Jira, Trello undakkiyavar) undakkiya framework-agnostic drag-drop library aanu —
React mathramalla vanilla JS-ilum work cheyyum. Ee file-il 3 main things use cheyttittund —
draggable() — oroo task card-inte DOM element-ne drag cheyyavunnathu aakkunnu
dropTargetForElements() — oroo column-ne drop zone aakkunnu
monitorForElements() — board level-il ella drop events-um listen cheyyunnu, card move cheyyunnu


// ----- difference ------ //

@dnd-kit-il ninnu ulla key difference:
hooks illa — useEffect-inu ullil DOM element directly pass cheyyunnu, return cheyyana cleanup function
useEffect return aakkunnu (unmount cheyyumbol auto cleanup aavum).
monitorForElements oru global listener aanu — DragDropProvider pole context wrap cheyyendathilla,
board-inte top level-il oru useEffect-il vechu mount cheyyam.

User oru card drag cheythu column-il drop cheyyumbol monitorForElements-inte onDrop fire aavum,
source.data.taskId + destination.data.columnId eduthu task-inte columnId update cheyyum,
card automatically puthiya column-ilekku move aavum.
*/ 


      {/* packge  */}                             {/* size */}

    // @atlaskit/pragmatic-drag-and-drop      10kb

    { /* customization */ }

    /*
    Ithu bare-bones aanu — styling illatha pure logic library. UI/animation ellam nammal thanne code write cheyyanam.
    Kooduthal effort venam, pakshe performance best aanu. Custom drag preview, custom drop indicators ellam manually undaakkanam.
    */