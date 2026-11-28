import type { Run } from "../types/run";

type RunsTableProps = {
  runs: Run[];
  isLoading: boolean;
  loadError: string | null;
  onOpenRun: (run: Run) => void;
  onRetry: () => void;
  onResetAndReload: () => void;
};

export const RunsTable = ({
  runs,
  isLoading,
  loadError,
  onOpenRun,
  onRetry,
  onResetAndReload,
}: RunsTableProps) => (
  <>
    <div className="table-heading">
      <h2 id="runs-heading">
        Runs <span className="run-count">{runs.length}</span>
      </h2>
      <span className="updated-label">
        <span className="live-dot" /> Live updates
      </span>
    </div>

    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">RUN</th>
            <th scope="col">REPOSITORY</th>
            <th scope="col">STATUS</th>
            <th scope="col" aria-label="Open run" />
          </tr>
        </thead>
        <tbody aria-busy={isLoading}>
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <tr key={`skeleton-${index}`} aria-hidden="true">
                <td>
                  <span className="skeleton skeleton-task" />
                </td>
                <td>
                  <span className="skeleton skeleton-repository" />
                </td>
                <td>
                  <span className="skeleton skeleton-status" />
                </td>
                <td className="row-action">
                  <span className="skeleton skeleton-action" />
                </td>
              </tr>
            ))
          ) : loadError ? (
            <tr className="error-row">
              <td colSpan={4}>
                <div className="error-state" role="alert">
                  <strong>Failed to load data</strong>
                  <span>{loadError}</span>
                  <button type="button" onClick={onRetry}>
                    Repeat
                  </button>
                </div>
              </td>
            </tr>
          ) : runs.length === 0 ? (
            <tr className="empty-row">
              <td colSpan={4}>
                <div className="empty-state">
                  <span>NO DATA</span>
                  <button type="button" onClick={onResetAndReload}>
                    Reset filter and reload
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            runs.map((run) => (
              <tr key={run.id}>
                <td className="run-name">{run.task}</td>
                <td>
                  <span className="repo-name">{run.repository}</span>
                </td>
                <td>
                  <span className={`status status-${run.status.toLowerCase()}`}>
                    <span className="status-dot" />
                    {run.statusLabel}
                  </span>
                </td>
                <td className="row-action">
                  <button
                    type="button"
                    aria-label={`Open ${run.task}`}
                    onClick={() => onOpenRun(run)}
                  >
                    ↗
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </>
);
