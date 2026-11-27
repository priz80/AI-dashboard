import type { RunStatusFilter } from "../types/run";

type RunsToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: RunStatusFilter;
  onStatusChange: (value: RunStatusFilter) => void;
};

export const RunsToolbar = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: RunsToolbarProps) => (
  <div className="runs-toolbar">
    <div className="toolbar-tabs">
      <button className="toolbar-tab selected" type="button">
        Список запусков
      </button>
    </div>
    <div className="toolbar-actions">
      <label className="tool-button search-control">
        <span className="search-icon" aria-hidden="true" />
        <span className="sr-only">
          Поиск по названию запуска или репозиторию
        </span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Запуск или репозиторий"
          aria-label="Поиск по названию запуска или репозиторию"
        />
      </label>
      <label className={`tool-button filter-control filter-${statusFilter}`}>
        <span
          className={`filter-status-dot filter-dot-${statusFilter}`}
          aria-hidden="true"
        />
        <span className="sr-only">Фильтр по статусу</span>
        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value as RunStatusFilter)
          }
          aria-label="Фильтр по статусу"
        >
          <option value="all">Все статусы</option>
          <option value="queued">Queued</option>
          <option value="running">Running</option>
          <option value="succeeded">Succeeded</option>
          <option value="failed">Failed</option>
          <option value="dev">Dev mode</option>
        </select>
      </label>
    </div>
  </div>
);
