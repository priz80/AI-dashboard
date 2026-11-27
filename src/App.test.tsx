import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const runs = [
  {
    id: "run-001",
    task: "Auth refactor",
    repository: "web-platform",
    status: "RUNNING",
    statusLabel: "Выполняется",
    agent: "Claude Code",
    branch: "feature/auth",
    startedAt: "2026-11-27T10:42:00Z",
  },
  {
    id: "run-002",
    task: "Fix checkout tests",
    repository: "payment",
    status: "SUCCEEDED",
    statusLabel: "Успешно завершён",
    agent: "Codex",
    branch: "fix/checkout",
    startedAt: "2026-11-27T09:18:00Z",
  },
];

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => runs,
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("App runs", () => {
  it("фильтрует запуск по статусу", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Auth refactor");

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Фильтр по статусу" }),
      "running",
    );

    expect(screen.getByText("Auth refactor")).toBeInTheDocument();
    expect(screen.queryByText("Fix checkout tests")).not.toBeInTheDocument();
  });

  it("ищет по названию и репозиторию вместе с фильтром", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Auth refactor");

    await user.type(
      screen.getByRole("searchbox", {
        name: "Поиск по названию запуска или репозиторию",
      }),
      "payment",
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Фильтр по статусу" }),
      "succeeded",
    );

    expect(screen.getByText("Fix checkout tests")).toBeInTheDocument();
    expect(screen.queryByText("Auth refactor")).not.toBeInTheDocument();
  });

  it("открывает модальное окно деталей запуска", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Auth refactor");

    await user.click(
      screen.getByRole("button", { name: "Open Auth refactor" }),
    );

    expect(
      screen.getByRole("dialog", { name: "Auth refactor" }),
    ).toBeInTheDocument();

    expect(screen.getByText("Claude Code")).toBeInTheDocument();
    expect(screen.getByText("feature/auth")).toBeInTheDocument();
  });
});
