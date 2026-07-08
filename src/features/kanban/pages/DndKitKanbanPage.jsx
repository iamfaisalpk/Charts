import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropProvider, useDraggable, useDroppable } from "@dnd-kit/react";


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

export default function DndKitKanbanPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function handleDragEnd(event) {
    const { source, target } = event.operation;
    if (!source || !target) return;

    const targetColumnId = target.data?.columnId ?? target.id;
    if (!targetColumnId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === source.id ? { ...task, columnId: targetColumnId } : task,
      ),
    );
  }

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
        <div>
            DND KIT KANBAN
        </div>
      <div className="mx-auto max-w-6xl">
        <DragDropProvider onDragEnd={handleDragEnd}>
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
        </DragDropProvider>
      </div>
    </div>
  );
}

function Column({ column, tasks, onAddTask, onRemoveTask }) {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });



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
  const { ref, isDragging } = useDraggable({
    id: task.id,
    data: { columnId: task.columnId },
  });

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



{/*  implementation plan this file  */}

/*   
@dnd-kit/react — Ee File-il Engane Use Cheythu


1. DragDropProvider
Whole board-ne wrap cheyyunna context aanu ithu.
Ithinte ullil ullathu mathrame drag/drop sense cheyyoo — useDraggable, useDroppable hooks ellam ithinte context-il aanu work cheyyunnath.
Ithu illenkil baaki randu hooks onnum work cheyyilla.

  example :-    <DragDropProvider onDragEnd={handleDragEnd}>
  ...columns render cheyyunnathu...
</DragDropProvider>
onDragEnd — user oru card drop cheyyumbol trigger aavum, athu vechu task-inte columnId update cheyyunnu.

2. useDraggable
Ee hook oru element-ne draggable aakki maattunnu.
Hook return cheyyunna ref aa DOM element-il attach cheyyam, isDragging — user ippozhum drag cheythu kondirikkumbol true aavum.

  example :-   const { ref, isDragging } = useDraggable({ id: task.id, data: { columnId: task.columnId } });
  ref → div-il attach cheythu card-ne draggable aakkunnu
  isDragging → true aanenkil card opacity 50% aakkunnu (visual feedback)

3. useDroppable
Ee hook oru element-ne drop zone aakki maattunnu.
Hook return cheyyunna ref aa DOM element-il attach cheyyam, isDropTarget — oru card ee zone-inte
mukalilekku drag cheythu kondu varumbol true aavum.

  example :-  const { ref, isDropTarget } = useDroppable({ id: column.id, data: { columnId: column.id } });
  ref → column div-il attach cheythu drop zone aakkunnu
  isDropTarget → true aanenkil column blue highlight kaanikkam

*/


 {/*  In This file Use cheythath  */}

/* 
  Nammude DndKitKanbanPage.tsx file @dnd-kit/react library use cheythu undakkiyathanu.
  Ithu React-specific aayi undakkiya hooks-based drag-drop library aanu. Ee file-il 3 main things use cheyttittund —
  DragDropProvider — whole board wrap cheyyunnu, drag-drop context create cheyyunnu
  useDraggable — oroo task card-ne drag cheyyavunnathu aakkunnu
  useDroppable — oroo column-ne drop zone aakkunnu

  User oru card drag cheythu vere column-il drop cheyyumbol handleDragEnd fire aavum,
  athu task-inte columnId update cheyyum, card automatically puthiya column-ilekku move aavum
  
  */


    {/* packge  */}       {/* size */}

    // @dnd-kit/react       40kb

    { /* customization */ }

    /*
    Customization-il best aanu ithu. CSS, animation, behavior — ellam fully manual control-il aanu.
    Library onnum impose cheyyilla, vendath pole style cheyyam. Custom drag overlay, custom sensors, modifiers
    (restrict movement, snap to grid) ellam support cheyyunnu.
    */