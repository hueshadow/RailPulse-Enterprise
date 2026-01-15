import React, { useState, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';

// Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'P1' | 'P2' | 'P3';
  assignee?: string;
  location: string;
  deadline?: Date;
  createdAt: Date;
  type?: 'maintenance' | 'inspection' | 'repair' | 'emergency';
}

export interface TaskColumnData {
  id: string;
  title: string;
  icon: string;
  color: 'primary' | 'warning' | 'success';
  tasks: Task[];
}

// Priority config
const PRIORITY_CONFIG = {
  P1: {
    bgClass: 'bg-rail-danger/20',
    textClass: 'text-rail-danger',
    borderClass: 'border-l-rail-danger',
    label: 'Critical'
  },
  P2: {
    bgClass: 'bg-rail-warning/20',
    textClass: 'text-rail-warning',
    borderClass: 'border-l-rail-warning',
    label: 'High'
  },
  P3: {
    bgClass: 'bg-quantix-purple/20',
    textClass: 'text-quantix-purple',
    borderClass: 'border-l-quantix-purple',
    label: 'Normal'
  }
};

const TYPE_ICONS: Record<string, string> = {
  maintenance: 'build',
  inspection: 'search',
  repair: 'handyman',
  emergency: 'warning'
};

// Task Card Component
interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onDragStart: (e: DragEvent, task: Task) => void;
  onDragEnd: () => void;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging = false,
  onDragStart,
  onDragEnd,
  onClick
}) => {
  const { t } = useTranslation();
  const priorityConfig = PRIORITY_CONFIG[task.priority];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return t('common.timeAgo.justNow');
    if (hours < 24) return t('common.timeAgo.hours', { count: hours });
    const days = Math.floor(hours / 24);
    return t('common.timeAgo.days', { count: days });
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`
        glass-card p-3 cursor-grab active:cursor-grabbing
        border-l-4 ${priorityConfig.borderClass}
        transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-[1.02] hover:shadow-glass-lg'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {task.type && (
            <span className="material-symbols-outlined text-gray-400 text-sm">
              {TYPE_ICONS[task.type] || 'task'}
            </span>
          )}
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${priorityConfig.bgClass} ${priorityConfig.textClass}`}>
            {task.priority}
          </span>
        </div>
        <span className="text-[10px] text-gray-500">{task.id}</span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-white mb-1 line-clamp-2">{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-400 mb-2 line-clamp-2">{task.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 pt-2 border-t border-quantix-border/30">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">location_on</span>
          <span className="truncate max-w-[80px]">{task.location}</span>
        </div>
        <span>{formatTimeAgo(task.createdAt)}</span>
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-quantix-purple to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
            {task.assignee.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-400">{task.assignee}</span>
        </div>
      )}
    </div>
  );
};

// Task Column Component
interface TaskColumnProps {
  column: TaskColumnData;
  onDragStart: (e: DragEvent, task: Task) => void;
  onDragEnd: () => void;
  onDrop: (columnId: string) => void;
  isDropTarget: boolean;
  onTaskClick?: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  onDragStart,
  onDragEnd,
  onDrop,
  isDropTarget,
  onTaskClick
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(column.id);
  };

  const colorConfig = {
    primary: { bg: 'bg-quantix-purple/10', border: 'border-quantix-purple/30', text: 'text-quantix-purple' },
    warning: { bg: 'bg-rail-warning/10', border: 'border-rail-warning/30', text: 'text-rail-warning' },
    success: { bg: 'bg-rail-success/10', border: 'border-rail-success/30', text: 'text-rail-success' }
  };

  const config = colorConfig[column.color];

  return (
    <div
      className={`
        flex flex-col h-full rounded-xl overflow-hidden
        transition-all duration-200
        ${isDragOver && isDropTarget ? 'ring-2 ring-quantix-purple/50 bg-quantix-purple/5' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className={`glass-light p-3 border-b border-quantix-border/30`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined ${config.text} text-lg`}>{column.icon}</span>
            <h3 className="text-sm font-semibold text-white">{column.title}</h3>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.text} ${config.border} border`}>
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar bg-quantix-black/30">
        {column.tasks.length === 0 ? (
          <div className={`
            h-24 rounded-lg border-2 border-dashed
            ${isDragOver ? 'border-quantix-purple/50 bg-quantix-purple/5' : 'border-quantix-border/30'}
            flex items-center justify-center
            transition-all duration-200
          `}>
            <span className="text-xs text-gray-500">Drop tasks here</span>
          </div>
        ) : (
          column.tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onClick={() => onTaskClick?.(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Main Task Board Component
interface TaskBoardProps {
  columns: TaskColumnData[];
  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void;
  onTaskClick?: (task: Task) => void;
  className?: string;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  columns: initialColumns,
  onTaskMove,
  onTaskClick,
  className = ''
}) => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggingTask, setDraggingTask] = useState<{ task: Task; fromColumn: string } | null>(null);

  const handleDragStart = (e: DragEvent, task: Task) => {
    const fromColumn = columns.find(col => col.tasks.some(t => t.id === task.id))?.id;
    if (fromColumn) {
      setDraggingTask({ task, fromColumn });
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnd = () => {
    setDraggingTask(null);
  };

  const handleDrop = (toColumnId: string) => {
    if (!draggingTask) return;

    const { task, fromColumn } = draggingTask;

    if (fromColumn === toColumnId) {
      setDraggingTask(null);
      return;
    }

    // Update columns state
    setColumns(prev => {
      return prev.map(col => {
        if (col.id === fromColumn) {
          return { ...col, tasks: col.tasks.filter(t => t.id !== task.id) };
        }
        if (col.id === toColumnId) {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      });
    });

    // Callback
    onTaskMove?.(task.id, fromColumn, toColumnId);
    setDraggingTask(null);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 h-full ${className}`}>
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          isDropTarget={draggingTask !== null && draggingTask.fromColumn !== column.id}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
