import { useEffect, useRef } from "react";
import type { Run } from "../types/run";

type RunDetailsModalProps = {
  run: Run | null;
  onClose: () => void;
};

export const RunDetailsModal = ({ run, onClose }: RunDetailsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  // Escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        modal.querySelectorAll(focusableSelector)
      );
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus first focusable element on open
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const firstFocusable = modal.querySelector(focusableSelector);
    if (firstFocusable) {
      (firstFocusable as HTMLElement).focus();
    }
  }, [run]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!run) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      tabIndex={-1}
      role="presentation"
    >
      <section
        ref={modalRef}
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
