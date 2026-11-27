import type { VercelRequest, VercelResponse } from "@vercel/node";

const runs = [
  {
    id: "run-001",
    task: "Auth refactor",
    repository: "web-platform",
    agent: "Claude Code",
    branch: "feature/auth-refactor",
    status: "RUNNING",
    statusLabel: "Выполняется",
    startedAt: "2026-11-27T10:42:00Z",
  },
  {
    id: "run-002",
    task: "Fix checkout tests",
    repository: "payment",
    agent: "Codex",
    branch: "fix/checkout-tests",
    status: "SUCCEEDED",
    statusLabel: "Успешно завершён",
    startedAt: "2026-11-27T09:18:00Z",
  },
  {
    id: "run-003",
    task: "Update dependencies",
    repository: "api-service",
    agent: "Claude Code",
    branch: "chore/dependencies",
    status: "QUEUED",
    statusLabel: "Ожидает запуска",
    startedAt: "2026-11-27T11:05:00Z",
  },
  {
    id: "run-004",
    task: "Add password reset flow",
    repository: "web-platform",
    agent: "Codex",
    branch: "feature/password-reset",
    status: "FAILED",
    statusLabel: "Завершён с ошибкой",
    startedAt: "2026-11-27T08:30:00Z",
  },
  {
    id: "run-005",
    task: "Improve API error handling",
    repository: "api-service",
    agent: "Claude Code",
    branch: "feature/api-errors",
    status: "RUNNING",
    statusLabel: "Выполняется",
    startedAt: "2026-11-27T11:12:00Z",
  },
  {
    id: "run-006",
    task: "Update payment methods",
    repository: "payment",
    agent: "Codex",
    branch: "feature/payment-methods",
    status: "QUEUED",
    statusLabel: "Ожидает запуска",
    startedAt: "2026-11-27T11:20:00Z",
  },
];

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json(runs);
}
