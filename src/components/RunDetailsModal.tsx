import type { Run } from "../types/run";

type RunDetailsModalProps = {
  run: Run | null;
  onClose: () => void;
};

export const RunDetailsModal = ({ run, onClose }: RunDetailsModalProps) => {
  if (!run) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="run-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-modal-title"
      >
        <header className="run-modal-header">
          <div>
            <p className="modal-eyebrow">RUN DETAILS</p>
            <h2 id="run-modal-title">{run.task}</h2>
          </div>
          <button
            className="modal-close"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <dl className="run-details">
          <div>
            <dt>Repository</dt>
            <dd>{run.repository}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{run.statusLabel}</dd>
          </div>
          <div>
            <dt>Task</dt>
            <dd>{run.task}</dd>
          </div>
          <div>
            <dt>Agent</dt>
            <dd>{run.agent}</dd>
          </div>
          <div>
            <dt>Branch</dt>
            <dd>{run.branch}</dd>
          </div>
          <div>
            <dt>Started</dt>
            <dd>{run.startedAt}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
};
