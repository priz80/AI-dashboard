import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectHeader } from "./components/ProjectHeader";
import { RunDetailsModal } from "./components/RunDetailsModal";
import { RunsTable } from "./components/RunsTable";
import { RunsToolbar } from "./components/RunsToolbar";
import { Sidebar } from "./components/Sidebar";
import type { Run, RunStatusFilter } from "./types/run";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [statusFilter, setStatusFilter] = useState<RunStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const previousFocusRef = useRef<HTMLElement | null>(null);

  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesStatus =
        statusFilter === "all" || run.status.toLowerCase() === statusFilter;
      const matchesSearch =
        normalizedQuery === "" ||
        run.task.toLowerCase().includes(normalizedQuery) ||
        run.repository.toLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesSearch;
    });
  }, [runs, statusFilter, normalizedQuery]);

  useEffect(() => {
    const loadInitialRuns = async () => {
      try {
        const [response] = await Promise.all([
          fetch("/api/runs"),
          new Promise((resolve) => window.setTimeout(resolve, 700)),
        ]);

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data: Run[] = await response.json();
        setRuns(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Не удалось загрузить запуски";
        console.error("Не удалось загрузить запуски:", error);
        setRuns([]);
        setLoadError(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadInitialRuns();
  }, []);

  const openRun = (run: Run) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedRun(run);
  };

  const closeRun = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
    setSelectedRun(null);
  };

  const retryLoad = () => {
    setIsLoading(true);
    setLoadError(null);
    window.location.reload();
  };

  const resetFilterAndReload = () => {
    setStatusFilter("all");
    setSearchQuery("");
    setSelectedRun(null);
    window.location.reload();
  };

  return (
    <main className="dashboard">
      <Sidebar />

      <section className="main-panel">
        <ProjectHeader />

        <section className="runs-section" aria-labelledby="runs-heading">
          <RunsTable
            runs={filteredRuns}
            isLoading={isLoading}
            loadError={loadError}
            onOpenRun={openRun}
            onRetry={retryLoad}
            onResetAndReload={resetFilterAndReload}
          />
          <RunsToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </section>

        <RunDetailsModal
          run={selectedRun}
          onClose={closeRun}
        />

        <footer className="main-footer">
          <span>
            Showing <strong>{filteredRuns.length}</strong> runs
          </span>
          <span>Updated just now</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
