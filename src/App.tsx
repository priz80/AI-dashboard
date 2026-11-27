import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { ProjectHeader } from "./components/ProjectHeader";
import { RunDetailsModal } from "./components/RunDetailsModal";
import { RunsTable } from "./components/RunsTable";
import { RunsToolbar } from "./components/RunsToolbar";
import { Sidebar } from "./components/Sidebar";
import type { Run, RunStatusFilter } from "./types/run";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState<Run | null>(null);
  const [statusFilter, setStatusFilter] = useState<RunStatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

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
    const loadRuns = async () => {
      try {
        const [response] = await Promise.all([
          fetch("http://localhost:3001/runs"),
          new Promise((resolve) => window.setTimeout(resolve, 700)),
        ]);

        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.status}`);
        }

        const data: Run[] = await response.json();
        setRuns(data);
      } catch (error) {
        console.error("Не удалось загрузить запуски:", error);
        setRuns([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadRuns();
  }, []);

  const resetFilterAndReload = async () => {
    setStatusFilter("all");
    setSearchQuery("");
    setSelectedRun(null);
    setIsLoading(true);

    try {
      const [response] = await Promise.all([
        fetch("http://localhost:3001/runs"),
        new Promise((resolve) => window.setTimeout(resolve, 700)),
      ]);

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data: Run[] = await response.json();
      setRuns(data);
    } catch (error) {
      console.error("Не удалось загрузить запуски:", error);
      setRuns([]);
    } finally {
      setIsLoading(false);
    }
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
            onOpenRun={setSelectedRun}
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
          onClose={() => setSelectedRun(null)}
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
