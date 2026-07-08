import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

const INITIAL_TASKS = {
  "task-1": { id: "task-1", title: "Audit Kanban libraries", priority: "high", assignee: "F" },
  "task-2": { id: "task-2", title: "Prepare comparison routes", priority: "normal", assignee: "A" },
  "task-3": { id: "task-3", title: "Build overview page", priority: "urgent", assignee: "R" },
  "task-4": { id: "task-4", title: "Document package trade-offs", priority: "low", assignee: "A" },
  "task-5": { id: "task-5", title: "Test drag behaviour", priority: "high", assignee: "N" },
  "task-6": { id: "task-6", title: "Share recommendation", priority: "normal", assignee: "A" },
};

const INITIAL_COLUMN_TASK_IDS = {
  backlog: ["task-1", "task-2"],
  todo: ["task-3", "task-4"],
  "in-progress": ["task-5"],
  done: ["task-6"],
};

export default function HelloPangeaKanbanPage() {
  const [tasks] = useState(INITIAL_TASKS);
  const [columnTaskIds, setColumnTaskIds] = useState(INITIAL_COLUMN_TASK_IDS);

  function handleDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    setColumnTaskIds((prev) => {
      const next = { ...prev };
      next[source.droppableId] = next[source.droppableId].filter(
        (id) => id !== draggableId
      );
      next[destination.droppableId] = [
        ...next[destination.droppableId].slice(0, destination.index),
        draggableId,
        ...next[destination.droppableId].slice(destination.index),
      ];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] p-8 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-lg font-semibold text-slate-900">
          @hello-pangea/dnd demo
        </h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                taskIds={columnTaskIds[column.id]}
                tasks={tasks}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

function Column({ column, taskIds, tasks }) {
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-lg border p-3 transition-colors ${
            snapshot.isDraggingOver
              ? "border-blue-300 bg-blue-50"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className={`h-2 w-2 rounded-full ${column.dot}`} />
            <span className="text-[13px] font-semibold text-slate-700">
              {column.title}
            </span>
            <span className="text-[12px] text-slate-400">{taskIds.length}</span>
          </div>

          <div className="space-y-2 min-h-16">
            {taskIds.map((taskId, index) => (
              <TaskCard key={taskId} task={tasks[taskId]} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

function TaskCard({ task, index }) {
  const priority = PRIORITY_STYLE[task.priority] ?? PRIORITY_STYLE.normal;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`cursor-grab rounded-md border border-l-4 border-slate-200 bg-white p-2.5 text-[13px] shadow-sm transition active:cursor-grabbing ${priority} ${
            snapshot.isDragging ? "opacity-70 shadow-md" : "hover:border-slate-300"
          }`}
        >
          <p className="text-slate-800">{task.title}</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wide">
              {task.priority}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] font-medium text-slate-600">
              {task.assignee}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}

{/*  implementation plan this file  */}

/*
@hello-pangea/dnd


1. DragDropContext
Whole board-ne wrap cheyyunna context aanu ithu.
Ithinte ullil ullathu mathrame drag/drop sense cheyyoo — Droppable, Draggable components
ellam ithinte context-il aanu work cheyyunnath. Ithu illenkil baaki randu components onnum work cheyyilla.
onDragEnd ithinre oru required prop aanu — ithu illenkil error varum.

  example :-   <DragDropContext onDragEnd={handleDragEnd}>
    ...columns render cheyyunnathu...
  </DragDropContext>
  onDragEnd — user oru card drop cheyyumbol trigger aavum, athu vechu
  source column-il ninnu card remove cheythu destination column-il insert cheyyunnu.


2. Droppable
Ee component oru area-ne drop zone aakki maattunnu.
droppableId prop kodukkanam — athu ethu column aanu ennu identify cheyyunnu.
provided.innerRef → column div-il attach cheyyam,
provided.droppableProps → aa div-il spread cheyyam (library-ku venda internal attributes),
provided.placeholder → column empty aavumbol height maintain cheyyunnu (card drop cheyyumbol snap smooth aavum),
snapshot.isDraggingOver → oru card ee column-inte mukalilekku drag cheythu kondu varumbol true aavum.

  example :-   <Droppable droppableId={column.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        ...cards...
        {provided.placeholder}
      </div>
    )}
  </Droppable>
  isDraggingOver → true aanenkil column blue highlight kaanikkam


3. Draggable
Ee component oru card-ne draggable aakki maattunnu.
draggableId (unique card id) + index (list-il ethu position) — randu um required.
provided.innerRef → card div-il attach cheyyam,
provided.draggableProps → drag position/animation library manage cheyyunnu,
provided.dragHandleProps → ith spread cheyyunna element vechu mathrame card drag cheyyam,
snapshot.isDragging → user ippozhum ee card drag cheythu kondirikkumbol true aavum.

  example :-   <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
      </div>
    )}
  </Draggable>
  isDragging → true aanenkil card opacity 70% + shadow kaanikkam

*/


{/*  In This File Use Cheythath  */}

/*
  Nammude HelloPangeaKanbanPage.tsx file @hello-pangea/dnd library use cheythu undakkiyathanu.
  Ithu React-specific aayi undakkiya component-based drag-drop library aanu. Ee file-il 3 main things use cheyttittund —
  DragDropContext — whole board wrap cheyyunnu, drag-drop context create cheyyunnu
  Droppable — oroo column-ne drop zone aakkunnu
  Draggable — oroo task card-ne drag cheyyavunnathu aakkunnu

  User oru card drag cheythu vere column-il drop cheyyumbol handleDragEnd fire aavum,
  source column-il ninnu card remove cheyyum, destination column-inte correct index-il insert cheyyum,
  card automatically puthiya column-ilekku smooth animation-il move aavum.
*/

    {/* packge  */}             {/* size */}

    // @hello-pangea/dnd       60kb

    { /* customization */ }
    
    /*
    Customization limited aanu. Built-in animation undu — athu override cheyyaan pattilla.
    Drag preview, placeholder, drop animation ellam library thanne control cheyyunnu.
    Simple look vendenkil nalla option, but deeply custom UI vendenkil frustrating aavum.
    provided.draggableProps, provided.dragHandleProps spread cheyyendathu kondu style freedom kurachu reduce aavunnu
    */