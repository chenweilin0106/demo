-- CC Switch SQLite 导出
-- 生成时间: 2026-04-01 02:41:32
-- user_version: 6
PRAGMA foreign_keys=OFF;
PRAGMA user_version=6;
BEGIN TRANSACTION;
CREATE TABLE mcp_servers (
            id TEXT PRIMARY KEY, name TEXT NOT NULL, server_config TEXT NOT NULL,
            description TEXT, homepage TEXT, docs TEXT, tags TEXT NOT NULL DEFAULT '[]',
            enabled_claude BOOLEAN NOT NULL DEFAULT 0, enabled_codex BOOLEAN NOT NULL DEFAULT 0,
            enabled_gemini BOOLEAN NOT NULL DEFAULT 0, enabled_opencode BOOLEAN NOT NULL DEFAULT 0
        );
CREATE TABLE model_pricing (
            model_id TEXT PRIMARY KEY, display_name TEXT NOT NULL,
            input_cost_per_million TEXT NOT NULL, output_cost_per_million TEXT NOT NULL,
            cache_read_cost_per_million TEXT NOT NULL DEFAULT '0',
            cache_creation_cost_per_million TEXT NOT NULL DEFAULT '0'
        );
CREATE TABLE prompts (
            id TEXT NOT NULL, app_type TEXT NOT NULL, name TEXT NOT NULL, content TEXT NOT NULL,
            description TEXT, enabled BOOLEAN NOT NULL DEFAULT 1, created_at INTEGER, updated_at INTEGER,
            PRIMARY KEY (id, app_type)
        );
CREATE TABLE provider_endpoints (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                provider_id TEXT NOT NULL,
                app_type TEXT NOT NULL,
                url TEXT NOT NULL,
                added_at INTEGER,
                FOREIGN KEY (provider_id, app_type) REFERENCES providers(id, app_type) ON DELETE CASCADE
            );
CREATE TABLE provider_health (
            provider_id TEXT NOT NULL, app_type TEXT NOT NULL, is_healthy INTEGER NOT NULL DEFAULT 1,
            consecutive_failures INTEGER NOT NULL DEFAULT 0, last_success_at TEXT, last_failure_at TEXT,
            last_error TEXT, updated_at TEXT NOT NULL,
            PRIMARY KEY (provider_id, app_type),
            FOREIGN KEY (provider_id, app_type) REFERENCES providers(id, app_type) ON DELETE CASCADE
        );
CREATE TABLE providers (
                id TEXT NOT NULL,
                app_type TEXT NOT NULL,
                name TEXT NOT NULL,
                settings_config TEXT NOT NULL,
                website_url TEXT,
                category TEXT,
                created_at INTEGER,
                sort_index INTEGER,
                notes TEXT,
                icon TEXT,
                icon_color TEXT,
                meta TEXT NOT NULL DEFAULT '{}',
                is_current BOOLEAN NOT NULL DEFAULT 0,
                in_failover_queue BOOLEAN NOT NULL DEFAULT 0, "cost_multiplier" TEXT NOT NULL DEFAULT '1.0', "limit_daily_usd" TEXT, "limit_monthly_usd" TEXT, "provider_type" TEXT,
                PRIMARY KEY (id, app_type)
            );
CREATE TABLE proxy_config (
            app_type TEXT PRIMARY KEY CHECK (app_type IN ('claude','codex','gemini')),
            proxy_enabled INTEGER NOT NULL DEFAULT 0, listen_address TEXT NOT NULL DEFAULT '127.0.0.1',
            listen_port INTEGER NOT NULL DEFAULT 15721, enable_logging INTEGER NOT NULL DEFAULT 1,
            enabled INTEGER NOT NULL DEFAULT 0, auto_failover_enabled INTEGER NOT NULL DEFAULT 0,
            max_retries INTEGER NOT NULL DEFAULT 3, streaming_first_byte_timeout INTEGER NOT NULL DEFAULT 60,
            streaming_idle_timeout INTEGER NOT NULL DEFAULT 120, non_streaming_timeout INTEGER NOT NULL DEFAULT 600,
            circuit_failure_threshold INTEGER NOT NULL DEFAULT 4, circuit_success_threshold INTEGER NOT NULL DEFAULT 2,
            circuit_timeout_seconds INTEGER NOT NULL DEFAULT 60, circuit_error_rate_threshold REAL NOT NULL DEFAULT 0.6,
            circuit_min_requests INTEGER NOT NULL DEFAULT 10,
            default_cost_multiplier TEXT NOT NULL DEFAULT '1',
            pricing_model_source TEXT NOT NULL DEFAULT 'response',
            created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))
        , live_takeover_active INTEGER NOT NULL DEFAULT 0);
CREATE TABLE proxy_live_backup (
            app_type TEXT PRIMARY KEY, original_config TEXT NOT NULL, backed_up_at TEXT NOT NULL
        );
CREATE TABLE proxy_request_logs (
            request_id TEXT PRIMARY KEY, provider_id TEXT NOT NULL, app_type TEXT NOT NULL, model TEXT NOT NULL,
            request_model TEXT,
            input_tokens INTEGER NOT NULL DEFAULT 0, output_tokens INTEGER NOT NULL DEFAULT 0,
            cache_read_tokens INTEGER NOT NULL DEFAULT 0, cache_creation_tokens INTEGER NOT NULL DEFAULT 0,
            input_cost_usd TEXT NOT NULL DEFAULT '0', output_cost_usd TEXT NOT NULL DEFAULT '0',
            cache_read_cost_usd TEXT NOT NULL DEFAULT '0', cache_creation_cost_usd TEXT NOT NULL DEFAULT '0',
            total_cost_usd TEXT NOT NULL DEFAULT '0', latency_ms INTEGER NOT NULL, first_token_ms INTEGER,
            duration_ms INTEGER, status_code INTEGER NOT NULL, error_message TEXT, session_id TEXT,
            provider_type TEXT, is_streaming INTEGER NOT NULL DEFAULT 0,
            cost_multiplier TEXT NOT NULL DEFAULT '1.0', created_at INTEGER NOT NULL
        );
CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE skill_repos (
            owner TEXT NOT NULL, name TEXT NOT NULL, branch TEXT NOT NULL DEFAULT 'main',
            enabled BOOLEAN NOT NULL DEFAULT 1, PRIMARY KEY (owner, name)
        );
CREATE TABLE skills (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            directory TEXT NOT NULL,
            repo_owner TEXT,
            repo_name TEXT,
            repo_branch TEXT DEFAULT 'main',
            readme_url TEXT,
            enabled_claude BOOLEAN NOT NULL DEFAULT 0,
            enabled_codex BOOLEAN NOT NULL DEFAULT 0,
            enabled_gemini BOOLEAN NOT NULL DEFAULT 0,
            enabled_opencode BOOLEAN NOT NULL DEFAULT 0,
            installed_at INTEGER NOT NULL DEFAULT 0
        );
CREATE TABLE stream_check_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT, provider_id TEXT NOT NULL, provider_name TEXT NOT NULL,
            app_type TEXT NOT NULL, status TEXT NOT NULL, success INTEGER NOT NULL, message TEXT NOT NULL,
            response_time_ms INTEGER, http_status INTEGER, model_used TEXT,
            retry_count INTEGER DEFAULT 0, tested_at INTEGER NOT NULL
        );
CREATE TABLE usage_daily_rollups (
                date TEXT NOT NULL,
                app_type TEXT NOT NULL,
                provider_id TEXT NOT NULL,
                model TEXT NOT NULL,
                request_count INTEGER NOT NULL DEFAULT 0,
                success_count INTEGER NOT NULL DEFAULT 0,
                input_tokens INTEGER NOT NULL DEFAULT 0,
                output_tokens INTEGER NOT NULL DEFAULT 0,
                cache_read_tokens INTEGER NOT NULL DEFAULT 0,
                cache_creation_tokens INTEGER NOT NULL DEFAULT 0,
                total_cost_usd TEXT NOT NULL DEFAULT '0',
                avg_latency_ms INTEGER NOT NULL DEFAULT 0,
                PRIMARY KEY (date, app_type, provider_id, model)
            );
CREATE INDEX idx_providers_failover
             ON providers(app_type, in_failover_queue, sort_index);
CREATE INDEX idx_request_logs_created_at ON proxy_request_logs(created_at);
CREATE INDEX idx_request_logs_model ON proxy_request_logs(model);
CREATE INDEX idx_request_logs_provider ON proxy_request_logs(provider_id, app_type);
CREATE INDEX idx_request_logs_session ON proxy_request_logs(session_id);
CREATE INDEX idx_request_logs_status ON proxy_request_logs(status_code);
CREATE INDEX idx_stream_check_logs_provider
             ON stream_check_logs(app_type, provider_id, tested_at DESC);
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-opus-4-6-20260206', 'Claude Opus 4.6', '5', '25', '0.50', '6.25');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-opus-4-5-20251101', 'Claude Opus 4.5', '5', '25', '0.50', '6.25');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-sonnet-4-5-20250929', 'Claude Sonnet 4.5', '3', '15', '0.30', '3.75');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-haiku-4-5-20251001', 'Claude Haiku 4.5', '1', '5', '0.10', '1.25');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-opus-4-20250514', 'Claude Opus 4', '15', '75', '1.50', '18.75');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-opus-4-1-20250805', 'Claude Opus 4.1', '15', '75', '1.50', '18.75');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-sonnet-4-20250514', 'Claude Sonnet 4', '3', '15', '0.30', '3.75');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-3-5-haiku-20241022', 'Claude 3.5 Haiku', '0.80', '4', '0.08', '1');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-3-5-sonnet-20241022', 'Claude 3.5 Sonnet', '3', '15', '0.30', '3.75');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2', 'GPT-5.2', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-low', 'GPT-5.2', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-medium', 'GPT-5.2', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-high', 'GPT-5.2', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-xhigh', 'GPT-5.2', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-codex', 'GPT-5.2 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-codex-low', 'GPT-5.2 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-codex-medium', 'GPT-5.2 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-codex-high', 'GPT-5.2 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.2-codex-xhigh', 'GPT-5.2 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.3-codex', 'GPT-5.3 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.3-codex-low', 'GPT-5.3 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.3-codex-medium', 'GPT-5.3 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.3-codex-high', 'GPT-5.3 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.3-codex-xhigh', 'GPT-5.3 Codex', '1.75', '14', '0.175', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1', 'GPT-5.1', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-low', 'GPT-5.1', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-medium', 'GPT-5.1', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-high', 'GPT-5.1', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-minimal', 'GPT-5.1', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-codex', 'GPT-5.1 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-codex-mini', 'GPT-5.1 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-codex-max', 'GPT-5.1 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-codex-max-high', 'GPT-5.1 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5.1-codex-max-xhigh', 'GPT-5.1 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5', 'GPT-5', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-low', 'GPT-5', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-medium', 'GPT-5', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-high', 'GPT-5', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-minimal', 'GPT-5', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-low', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-medium', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-high', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-mini', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-mini-medium', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gpt-5-codex-mini-high', 'GPT-5 Codex', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gemini-3-pro-preview', 'Gemini 3 Pro Preview', '2', '12', '0.2', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gemini-3-flash-preview', 'Gemini 3 Flash Preview', '0.5', '3', '0.05', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gemini-2.5-pro', 'Gemini 2.5 Pro', '1.25', '10', '0.125', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('gemini-2.5-flash', 'Gemini 2.5 Flash', '0.3', '2.5', '0.03', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('doubao-seed-code', 'Doubao Seed Code', '1.20', '8.00', '0.24', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('deepseek-v3.2', 'DeepSeek V3.2', '2.00', '3.00', '0.40', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('deepseek-v3.1', 'DeepSeek V3.1', '4.00', '12.00', '0.80', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('deepseek-v3', 'DeepSeek V3', '2.00', '8.00', '0.40', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('kimi-k2-thinking', 'Kimi K2 Thinking', '4.00', '16.00', '1.00', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('kimi-k2-0905', 'Kimi K2', '4.00', '16.00', '1.00', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('kimi-k2-turbo', 'Kimi K2 Turbo', '8.00', '58.00', '1.00', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('minimax-m2.1', 'MiniMax M2.1', '2.10', '8.40', '0.21', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('minimax-m2.1-lightning', 'MiniMax M2.1 Lightning', '2.10', '16.80', '0.21', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('minimax-m2', 'MiniMax M2', '2.10', '8.40', '0.21', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('glm-4.7', 'GLM-4.7', '2.00', '8.00', '0.40', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('glm-4.6', 'GLM-4.6', '2.00', '8.00', '0.40', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('mimo-v2-flash', 'Mimo V2 Flash', '0', '0', '0', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('step-3.5-flash', 'Step 3.5 Flash', '0.10', '0.30', '0.02', '0');
INSERT INTO "model_pricing" ("model_id", "display_name", "input_cost_per_million", "output_cost_per_million", "cache_read_cost_per_million", "cache_creation_cost_per_million") VALUES ('claude-sonnet-4-6-20260217', 'Claude Sonnet 4.6', '3', '15', '0.30', '3.75');
INSERT INTO "prompts" ("id", "app_type", "name", "content", "description", "enabled", "created_at", "updated_at") VALUES ('auto-imported-1772242610', 'codex', 'Auto-imported Prompt 2026-02-28 09:36', '# Agent Instructions (Scope: C:\Users\dcw220\.codex\**)

- Default to Simplified Chinese; use English only when explicitly requested or required by content; keep code identifiers, commands, logs, and error messages in their original language.
- Keep communication concise and direct.

## Workflow
- Before changing any code, propose a plan and wait for user confirmation.
- If there is a clear blocking factor or required information is missing, return the question to the user instead of proceeding.
- Verify sources yourself; do not present guesses as facts. Prefer repo files + command outputs as source of truth.
- Scrutinize user input for pitfalls, call them out, and offer outside-the-box advice; if the user is wildly off-base, say so directly.
- After code changes, run a self-check; for bug fixes, verify impacts on other logic.

## Coding Style
- Always follow the programming language standard and the project''s existing conventions; keep code simple and concise.
- Remove outdated content and redundant implementations promptly; avoid dead code, unused abstractions, and speculative scaffolding.
- Follow industry best practices: prefer official language/framework guidance, project conventions, and automated formatting/linting when available.
- Security: reject unjustified "security over-design", but do not weaken baseline security or introduce known risks; call out security implications when they exist.
- Comments: write code comments in Chinese; focus on intent, constraints, and usage. Add appropriate comments for core logic; avoid restating obvious code.
- Comment exceptions: third-party API/protocol terms, upstream-required directives (e.g. lint/formatter pragmas), and untranslatable identifiers may remain in the original language.
', 'Automatically imported on first launch', 1, 1772242610, 1772242610);
INSERT INTO "providers" ("id", "app_type", "name", "settings_config", "website_url", "category", "created_at", "sort_index", "notes", "icon", "icon_color", "meta", "is_current", "in_failover_queue", "cost_multiplier", "limit_daily_usd", "limit_monthly_usd", "provider_type") VALUES ('3d71b669-9ac8-490f-85be-9e25ac171f8d', 'codex', 'tr13535155jin@163.com', '{"auth":{"OPENAI_API_KEY":null,"auth_mode":"chatgpt","last_refresh":"2026-02-28T01:46:01.661799600Z","tokens":{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MzQ0ZTY1LWJiYzktNDRkMS1hOWQwLWY5NTdiMDc5YmQwZSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSJdLCJjbGllbnRfaWQiOiJhcHBfRU1vYW1FRVo3M2YwQ2tYYVhwN2hyYW5uIiwiZXhwIjoxNzczMTA3MTYwLCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsiY2hhdGdwdF9hY2NvdW50X2lkIjoiMzU4YWUzZTQtMDk4YS00NmY2LThiMTgtNzVmNDkzMmMyNzYzIiwiY2hhdGdwdF9hY2NvdW50X3VzZXJfaWQiOiJ1c2VyLTdwYlpWem8xenVGcUxvWlZIeklHSUs0Sl9fMzU4YWUzZTQtMDk4YS00NmY2LThiMTgtNzVmNDkzMmMyNzYzIiwiY2hhdGdwdF9jb21wdXRlX3Jlc2lkZW5jeSI6Im5vX2NvbnN0cmFpbnQiLCJjaGF0Z3B0X3BsYW5fdHlwZSI6InRlYW0iLCJjaGF0Z3B0X3VzZXJfaWQiOiJ1c2VyLTdwYlpWem8xenVGcUxvWlZIeklHSUs0SiIsInVzZXJfaWQiOiJ1c2VyLTdwYlpWem8xenVGcUxvWlZIeklHSUs0SiJ9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ0cjEzNTM1MTU1amluQDE2My5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImlhdCI6MTc3MjI0MzE2MCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9wZW5haS5jb20iLCJqdGkiOiJhOGQzMjMwMC0wNmYyLTQ2ZTgtOGMzNy1lMzc0NGE3ZWEzNDQiLCJuYmYiOjE3NzIyNDMxNjAsInB3ZF9hdXRoX3RpbWUiOjE3NzIyNDMxNTc2MzksInNjcCI6WyJvcGVuaWQiLCJwcm9maWxlIiwiZW1haWwiLCJvZmZsaW5lX2FjY2VzcyJdLCJzZXNzaW9uX2lkIjoiYXV0aHNlc3NfMVdpRUpFYW43N2VNTmdxNUhYeURrQzRGIiwic3ViIjoiYXV0aDB8Zk1oejl4cTNRT3ZVOGZzb0ExdmVxWmVQIn0.yrivsqAYL1AvWwMdoqb2rpUZzT_yCdJmsF-uOzYJ6KFqeB-vf0LVV24HVZLRtCCQ0psHXC0kogVzSRIfiBRH8drRgfSKPRX3TzG63l58MS45BHv1YkPGWh7K0Z3onA2YqfpMY9lmsG8XZZhYK0oJKNfq7h64cXj-iIAxr8B9YI_SWLwSIDKZ-iyiQ7k2iqdNryg5Tidp-ZmuZhaXu6uVOOmAfJoL2aAhzEwRiO7JYFuiRK43MLEynDaCbk9KgA3GHfyq7uQ6Sd0D7sMMVR4KUHnmocseIeQmE4iVghDmjDUbJwGyoP8umqdeS7EXffZsbQiHjo2CHhw2XbS7DaSv5esSqxiKkrjaJCD-knHtD2nu3gV3l86SibiM7aZx4RIGwu8Eu2ukdokdEPBWnxjxnC5psTqZXYi7lsKqUCZEdhEDOT-TIUquh_74myUh2JspHohxCcGyP3bB8uVhSXeUqqYm8SgTD4U0gxrDggQw_PBtcBx-QEJx0tWyoVDCH3P2CaeYXauC5pkXF5Ha2NDzauf6EL9OzwXwy42lTLMw3VWF70STB49rcIBEDQEGhztV4UcpbIkWWCA552VeCOOENeAQoW63yqvQ5d8EFG-2rmxaN68-wBkikz-HEZ_o8Ueq289sZzss0Ln10dz-pqStHeqUpkaSS49Qceu_cTvi0rw","account_id":"358ae3e4-098a-46f6-8b18-75f4932c2763","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxZGQzZjhmLTlhYWQtNDdmZS1iMGU3LWVkYjAwOTc3N2Q2YiIsInR5cCI6IkpXVCJ9.eyJhdF9oYXNoIjoiaDVRcFp3Y3llRFdVN0ZDSnNFWG1OQSIsImF1ZCI6WyJhcHBfRU1vYW1FRVo3M2YwQ2tYYVhwN2hyYW5uIl0sImF1dGhfcHJvdmlkZXIiOiJwYXNzd29yZCIsImF1dGhfdGltZSI6MTc3MjI0MzE1NywiZW1haWwiOiJ0cjEzNTM1MTU1amluQDE2My5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZXhwIjoxNzcyMjQ2NzYwLCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsiY2hhdGdwdF9hY2NvdW50X2lkIjoiMzU4YWUzZTQtMDk4YS00NmY2LThiMTgtNzVmNDkzMmMyNzYzIiwiY2hhdGdwdF9wbGFuX3R5cGUiOiJ0ZWFtIiwiY2hhdGdwdF9zdWJzY3JpcHRpb25fYWN0aXZlX3N0YXJ0IjoiMjAyNi0wMi0wNlQwNTo0ODowNyswMDowMCIsImNoYXRncHRfc3Vic2NyaXB0aW9uX2FjdGl2ZV91bnRpbCI6IjIwMjYtMDMtMDZUMDU6NDg6MDcrMDA6MDAiLCJjaGF0Z3B0X3N1YnNjcmlwdGlvbl9sYXN0X2NoZWNrZWQiOiIyMDI2LTAyLTI4VDAxOjQ1OjU3LjYzOTQ1OCswMDowMCIsImNoYXRncHRfdXNlcl9pZCI6InVzZXItN3BiWlZ6bzF6dUZxTG9aVkh6SUdJSzRKIiwiZ3JvdXBzIjpbXSwib3JnYW5pemF0aW9ucyI6W3siaWQiOiJvcmcteVd4UlVndmIwZ1JCclNVTHRUdElwRnY3IiwiaXNfZGVmYXVsdCI6dHJ1ZSwicm9sZSI6Im93bmVyIiwidGl0bGUiOiJQZXJzb25hbCJ9XSwidXNlcl9pZCI6InVzZXItN3BiWlZ6bzF6dUZxTG9aVkh6SUdJSzRKIn0sImlhdCI6MTc3MjI0MzE2MCwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9wZW5haS5jb20iLCJqdGkiOiI1MTE2NjdkYS1kM2YwLTRlOWYtOGNkNC1iNTNmNDFlN2JhZmIiLCJyYXQiOjE3NzIyNDMxMjcsInNpZCI6ImIwM2MwMTFkLTE1YzctNDc2Zi05NmRiLWQwZWFjMmFjZmRlZCIsInN1YiI6ImF1dGgwfGZNaHo5eHEzUU92VThmc29BMXZlcVplUCJ9.vjc2P6hyan7I-tp_2TjyFCKSRUEHOktaV7VhMFcBUQ1xHH_Mwr8iYJjp4S5jMnVmjtdeJ-9HN4xG984rwVTZfxn2axDi_Nor_AaXFteqw8V-tjC9PtHTTOQC5EQulvA8t8pVrwuPwxoJ0g_je4QUP51qKNE3IZXII5yLlUlu4ElsXSvEGNi8lR4z3eGXiGLHVPHyLisvrl1xjbYeRon0HNNCGZZEiifXqbBavvwa2JyCuyOd6IAdGWougKp2iFbreEXSOQv00TZTd6eN9ldmvDyMMEgcWPiFPRR6IX4RmMvT7ItvYmSEa1j_kk5rN-7LAVGybcFUevYSyYjiKfvv0JpF0M27BWr4QLUlZzxoi2WzO72uFC199C9-y-ciRuGnqimzeqT2tlQaZZOUT1ZfXmyRtkWV2UaehkAbdmcnTQkNE6m4zj0yQpayGk-sS8yUo4i-bR2BAEDDeWGQLFES3GagFmOTt8yS61HXWuJ4RpC0g0OyanGfj_9t8dSA_w8V5eeVxK1YTmqBSiM5lcWPWF_UEFsxlPZKl-PNrSfVYktwb6ZuSSWPEqljpc7GCW_2KJnB8nMHwq6Gsbd6U4lYSFaBdMMbr7Kwn5aK2ZYbPTbZ-tB6-9YZfV5UfKwAdTuqeLMcPIMKEZJ2_cLvNSlmHeXM4KsfLvCfOV8ASJzjs_I","refresh_token":"rt_cyrEdBAE6p2bX3kOe3as5U4P92KFoRNOFixoHABR77g.ZCKr2rG3OwAahBXdN9N9fVyEDZPra_gKuyugjTyPrmU"}},"config":"suppress_unstable_features_warning = true\n\nmodel = \"gpt-5.2\"\nmodel_reasoning_effort = \"high\"\npersonality = \"pragmatic\"\nweb_search = \"live\"\nservice_tier = \"fast\"\n\n[features]\npowershell_utf8 = true\nuse_linux_sandbox_bwrap = true\nresponses_websockets_v2 = true\n\n[notice.model_migrations]\n\"gpt-5.2\" = \"gpt-5.3-codex\"\n\n[tui]\nstatus_line = [\"model-with-reasoning\", \"current-dir\", \"git-branch\", \"five-hour-limit\", \"weekly-limit\", \"codex-version\", \"context-used\", \"context-window-size\"]\n\n[windows]\nsandbox = \"elevated\"\n\n[projects.''C:\\Users\\dcw220'']\ntrust_level = \"trusted\"\n\n[projects.''C:\\Users\\dcw220\\.codex'']\ntrust_level = \"trusted\"\n\n[projects.''\\\\?\\D:\\Project\\demo'']\ntrust_level = \"trusted\"\n\n[projects.''\\\\?\\D:\\Project\\dandan-activity-web'']\ntrust_level = \"trusted\"\n\n[projects.''D:\\Project\\dandan_website'']\ntrust_level = \"trusted\"\n\n[projects.''D:\\CLIProxyAPI'']\ntrust_level = \"trusted\"\n\n[projects.\"/mnt/c/Users/dcw220\"]\ntrust_level = \"trusted\"\n\n[projects.\"/mnt/d/Project/demo\"]\ntrust_level = \"trusted\"\n"}', 'https://chatgpt.com/codex', 'official', 1772242858648, 0, 'OpenAI Official', 'openai', '#00A67E', '{"usage_script":{"enabled":false,"language":"javascript","code":"({\n  request: {\n    url: \"{{baseUrl}}/user/balance\",\n    method: \"GET\",\n    headers: {\n      \"Authorization\": \"Bearer {{apiKey}}\",\n      \"User-Agent\": \"cc-switch/1.0\"\n    }\n  },\n  extractor: function(response) {\n    return {\n      isValid: response.is_active || true,\n      remaining: response.balance,\n      unit: \"USD\"\n    };\n  }\n})","timeout":10,"templateType":"general"},"endpointAutoSelect":true}', 1, 0, '1.0', NULL, NULL, NULL);
INSERT INTO "providers" ("id", "app_type", "name", "settings_config", "website_url", "category", "created_at", "sort_index", "notes", "icon", "icon_color", "meta", "is_current", "in_failover_queue", "cost_multiplier", "limit_daily_usd", "limit_monthly_usd", "provider_type") VALUES ('01870677-0f42-4c2e-b773-cee1acf1e02f', 'codex', '2893646608@qq.com', '{"auth":{"OPENAI_API_KEY":null,"auth_mode":"chatgpt","last_refresh":"2026-03-24T11:06:35.228750700Z","tokens":{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MzQ0ZTY1LWJiYzktNDRkMS1hOWQwLWY5NTdiMDc5YmQwZSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSJdLCJjbGllbnRfaWQiOiJhcHBfRU1vYW1FRVo3M2YwQ2tYYVhwN2hyYW5uIiwiZXhwIjoxNzc1MjE0Mzk3LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsiY2hhdGdwdF9hY2NvdW50X2lkIjoiODRhYjdlZTgtMGRmNS00MWIxLWE1Y2ItMDVlNDFmZmY0ODY4IiwiY2hhdGdwdF9hY2NvdW50X3VzZXJfaWQiOiJ1c2VyLVVlZXJ6MEhMNXgzaUpYVFk4SUZHVm9zRV9fODRhYjdlZTgtMGRmNS00MWIxLWE1Y2ItMDVlNDFmZmY0ODY4IiwiY2hhdGdwdF9jb21wdXRlX3Jlc2lkZW5jeSI6Im5vX2NvbnN0cmFpbnQiLCJjaGF0Z3B0X3BsYW5fdHlwZSI6InRlYW0iLCJjaGF0Z3B0X3VzZXJfaWQiOiJ1c2VyLVVlZXJ6MEhMNXgzaUpYVFk4SUZHVm9zRSIsImxvY2FsaG9zdCI6dHJ1ZSwidXNlcl9pZCI6InVzZXItVWVlcnowSEw1eDNpSlhUWThJRkdWb3NFIn0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vcHJvZmlsZSI6eyJlbWFpbCI6IjI4OTM2NDY2MDhAcXEuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJpYXQiOjE3NzQzNTAzOTYsImlzcyI6Imh0dHBzOi8vYXV0aC5vcGVuYWkuY29tIiwianRpIjoiODQzZTY1NjQtZmFlYi00NjUyLTgxYmQtNmY2MTEwODJkY2UwIiwibmJmIjoxNzc0MzUwMzk2LCJwd2RfYXV0aF90aW1lIjoxNzc0MzUwMzkyNTI4LCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwib2ZmbGluZV9hY2Nlc3MiLCJhcGkuY29ubmVjdG9ycy5yZWFkIiwiYXBpLmNvbm5lY3RvcnMuaW52b2tlIl0sInNlc3Npb25faWQiOiJhdXRoc2Vzc19GNnY4ZGo4ZURsNUxkWHJTT3hrSHdhYnoiLCJzbCI6dHJ1ZSwic3ViIjoiYXV0aDB8QmFTdXdjTHlqeXJkSDNQOGtmN09pN3dPIn0.mNMJtuxCytpxH8pmREAZA1Y00N_OPEUoD83n5PNjgRGtajIRxWY6YV0dtL3w9Fe4n9VkJcAVo5Q9Qp9BX-1SR6UBOoS9zpYN_To_O-WCW1bbaC-Vohbgufd_KXU0CbMAdGiBkBKe4nWBz_6zCaUfK3OQAEHR2uD-6aZFoPE1342pB1VnzzsfhV4QbwHtvUHjLl099yARSYwleB2bt_2Hrmcl4UD2gfOiay-aP_u0gesLyF-3E4DYexPsVsyC6uSqU5m1e83O3P3m5eoFPv_pDydqQ1dwEvPDYWykLAnutNaknYHfMpkcSflSGiHIMzfnR_3izXmN-qcmpkgi8gAwhzy2_5bYGy_Y6JuMuSfAiR4gN_URRHzP15oz98liEVX7x_TvszgrumSDHpImOtekBeI0F_5J0o9Tx7rEWFRv1DfTSdHuFgy6ZYxGDRYqnrzM3bSsFqkdvRGKS38HWPHWIziI63ZLm-nCVmPQVvFqYs5_vf4uG7vVw6L9gdymj4sRwu99y50vT-idpoMDNtIk8uLBGWZyRgdyh3MVOQiCX9ql4hVHNshGAhXADeOJlTb4-cTFK2Vm0dhjG8YLKq7b9aWbKGuAfuiz3y7TGkxO43HjY77QIvz4WEEk5ix73JNYGKT2wGUDY8gfTpWkaXp-ywkix0nRvEXX7vlCV04zjoE","account_id":"84ab7ee8-0df5-41b1-a5cb-05e41fff4868","id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxZGQzZjhmLTlhYWQtNDdmZS1iMGU3LWVkYjAwOTc3N2Q2YiIsInR5cCI6IkpXVCJ9.eyJhbXIiOlsicHdkIiwib3RwIiwibWZhIiwidXJuOm9wZW5haTphbXI6b3RwX2VtYWlsIl0sImF0X2hhc2giOiJUWjViMUtKMkludE9yeU51NGU0eFhBIiwiYXVkIjpbImFwcF9FTW9hbUVFWjczZjBDa1hhWHA3aHJhbm4iXSwiYXV0aF9wcm92aWRlciI6InBhc3N3b3JkIiwiYXV0aF90aW1lIjoxNzc0MzUwMzkyLCJlbWFpbCI6IjI4OTM2NDY2MDhAcXEuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV4cCI6MTc3NDM1Mzk5NiwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7ImNoYXRncHRfYWNjb3VudF9pZCI6Ijg0YWI3ZWU4LTBkZjUtNDFiMS1hNWNiLTA1ZTQxZmZmNDg2OCIsImNoYXRncHRfcGxhbl90eXBlIjoidGVhbSIsImNoYXRncHRfc3Vic2NyaXB0aW9uX2FjdGl2ZV9zdGFydCI6IjIwMjYtMDItMjdUMTI6MDE6MzUrMDA6MDAiLCJjaGF0Z3B0X3N1YnNjcmlwdGlvbl9hY3RpdmVfdW50aWwiOiIyMDI2LTAzLTI3VDEyOjAxOjM1KzAwOjAwIiwiY2hhdGdwdF9zdWJzY3JpcHRpb25fbGFzdF9jaGVja2VkIjoiMjAyNi0wMy0yNFQxMTowNjozMi41Mjg5MjkrMDA6MDAiLCJjaGF0Z3B0X3VzZXJfaWQiOiJ1c2VyLVVlZXJ6MEhMNXgzaUpYVFk4SUZHVm9zRSIsImdyb3VwcyI6W10sImxvY2FsaG9zdCI6dHJ1ZSwib3JnYW5pemF0aW9ucyI6W3siaWQiOiJvcmctbzBlVTk4SUdBOU5IQm1uNkczaEptbHF0IiwiaXNfZGVmYXVsdCI6dHJ1ZSwicm9sZSI6Im93bmVyIiwidGl0bGUiOiJQZXJzb25hbCJ9XSwidXNlcl9pZCI6InVzZXItVWVlcnowSEw1eDNpSlhUWThJRkdWb3NFIn0sImlhdCI6MTc3NDM1MDM5NiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm9wZW5haS5jb20iLCJqdGkiOiJmOTMwOTdiMS1mMzEwLTRjYWItYTk1Ni01MDkzZTI2MTAxNjYiLCJuYW1lIjoiV1dXIiwicmF0IjoxNzc0MzUwMzU5LCJzaWQiOiJhZmU2NTVhNy02NDkyLTQ2NGYtOWI2YS1lMGEwMzg2NGQ0MzIiLCJzdWIiOiJhdXRoMHxCYVN1d2NMeWp5cmRIM1A4a2Y3T2k3d08ifQ.wCClShutNcWU7fjQx8otpJQLaBLe4RQwkRCs_h72wpyxLseeUEWPrI0cxnClg83WuSwfvhN0iRXlH2mFSuN-y16Y_LGLu9vqPmqTlaL32eEBl1LRET4ve0y7c5uPOk7egkMWhBOaNDYjm9Mis0DCepPvKjCGa1ZqK-gwJwo4qAM9O9SD5u7HvQUnj6_lMPpYTqCP9U0Ctc_QnnR-KkIVC3QGRAIoCOukdXqlX5DRJsO3iHFwfCwrgRQVpFo788AJ-B-COzCGj5q4VFcXZCdnMMDgjB2sZY-8RgmgByhtqq_wdhtNxO_JUIPIMKcArFMXAe2hTKMLGIhf2fDbE40sCr5vlxR7RSwQi-i-kr-7M4Og3MTwxlFeiolp6NjPKLNblNq9qQ5pAaWeddylTBRCajfDMmpItgrqrdKKNwMALyXWwDAa-24SmqmOpN-59wzyQBuNRgSzNrpRH-bk5qWBHgXTz0h8yOjuJBJcYpCU5bGRCMsmztcqxZeTeNltBIA6-t7RmAxk-ok1OBJGV4jZH0QGa3GEmDy4JwGitEoIUPVKkL2BrSOOqTUhHyWrcTEePMByZagAtoPi0rM_ZVzjpQCyv1O63dCS97HiJ33etab6E6TeKxUbJQA3sEYIsrcfv9bJYofkMCmNO6gDgsMPaMwyuhG8TKjvKXdsO38Bj1k","refresh_token":"oaistb_rt_FDlDYBj2qjDpGUAB0YYfQiZ4mxoHRFnwYGCq0mtR5Rc.ExCFL8LerXzhX7xxwOSP0HicEZWaN80bw_JyBlF_TPM"}},"config":"model = \"gpt-5.2\"\n\n[notice.model_migrations]\n\"gpt-5.3-codex\" = \"gpt-5.4\"\n\n[projects.''C:\\Users\\tr135'']\ntrust_level = \"trusted\"\n"}', 'https://chatgpt.com/codex', 'official', 1774314647414, 1, 'OpenAI Official', 'openai', '#00A67E', '{"commonConfigEnabled":true,"endpointAutoSelect":true}', 0, 0, '1.0', NULL, NULL, NULL);
INSERT INTO "proxy_config" ("app_type", "proxy_enabled", "listen_address", "listen_port", "enable_logging", "enabled", "auto_failover_enabled", "max_retries", "streaming_first_byte_timeout", "streaming_idle_timeout", "non_streaming_timeout", "circuit_failure_threshold", "circuit_success_threshold", "circuit_timeout_seconds", "circuit_error_rate_threshold", "circuit_min_requests", "default_cost_multiplier", "pricing_model_source", "created_at", "updated_at", "live_takeover_active") VALUES ('claude', 0, '127.0.0.1', 15721, 1, 0, 0, 6, 90, 180, 600, 8, 3, 90, 0.7, 15, '1', 'response', '2026-02-28 01:36:50', '2026-02-28 01:36:50', 0);
INSERT INTO "proxy_config" ("app_type", "proxy_enabled", "listen_address", "listen_port", "enable_logging", "enabled", "auto_failover_enabled", "max_retries", "streaming_first_byte_timeout", "streaming_idle_timeout", "non_streaming_timeout", "circuit_failure_threshold", "circuit_success_threshold", "circuit_timeout_seconds", "circuit_error_rate_threshold", "circuit_min_requests", "default_cost_multiplier", "pricing_model_source", "created_at", "updated_at", "live_takeover_active") VALUES ('codex', 0, '127.0.0.1', 15721, 1, 0, 0, 3, 60, 120, 600, 4, 2, 60, 0.6, 10, '1', 'response', '2026-02-28 01:36:50', '2026-02-28 01:36:50', 0);
INSERT INTO "proxy_config" ("app_type", "proxy_enabled", "listen_address", "listen_port", "enable_logging", "enabled", "auto_failover_enabled", "max_retries", "streaming_first_byte_timeout", "streaming_idle_timeout", "non_streaming_timeout", "circuit_failure_threshold", "circuit_success_threshold", "circuit_timeout_seconds", "circuit_error_rate_threshold", "circuit_min_requests", "default_cost_multiplier", "pricing_model_source", "created_at", "updated_at", "live_takeover_active") VALUES ('gemini', 0, '127.0.0.1', 15721, 1, 0, 0, 5, 60, 120, 600, 4, 2, 60, 0.6, 10, '1', 'response', '2026-02-28 01:36:50', '2026-02-28 01:36:50', 0);
INSERT INTO "settings" ("key", "value") VALUES ('common_config_codex', 'suppress_unstable_features_warning = true
model_reasoning_effort = "xhigh"
personality = "pragmatic"
web_search = "live"
service_tier = "fast"

[features]
powershell_utf8 = true
use_linux_sandbox_bwrap = true
responses_websockets_v2 = true

[notice.model_migrations]
"gpt-5.2" = "gpt-5.4"

[tui]
status_line = ["model-with-reasoning", "git-branch", "five-hour-limit", "weekly-limit", "context-used", "project-root"]
theme = "catppuccin-mocha"

[windows]
sandbox = "elevated"

[projects.''C:\Users\dcw220'']
trust_level = "trusted"

[projects.''C:\Users\dcw220\.codex'']
trust_level = "trusted"

[projects.''\\?\D:\Project\demo'']
trust_level = "trusted"

[projects.''\\?\D:\Project\dandan-activity-web'']
trust_level = "trusted"

[projects.''D:\Project\dandan_website'']
trust_level = "trusted"

[projects.''D:\CLIProxyAPI'']
trust_level = "trusted"

[projects."/mnt/c/Users/dcw220"]
trust_level = "trusted"

[projects."/mnt/d/Project/demo"]
trust_level = "trusted"

[projects."/home/dcw220/projects/demo"]
trust_level = "trusted"

[projects."/mnt/d/Project/dandan-activity-web"]
trust_level = "trusted"');
INSERT INTO "settings" ("key", "value") VALUES ('common_config_legacy_migrated_v1', 'true');
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('anthropics', 'skills', 'main', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('ComposioHQ', 'awesome-claude-skills', 'master', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('cexll', 'myclaude', 'master', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('JimLiu', 'baoyu-skills', 'main', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('obra', 'superpowers', 'main', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('vercel-labs', 'agent-skills', 'main', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('github', 'awesome-copilot', 'main', 1);
INSERT INTO "skill_repos" ("owner", "name", "branch", "enabled") VALUES ('vercel-labs', 'agent-browser', 'main', 1);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('anthropics/skills:skills\frontend-design', 'frontend-design', 'Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.', 'frontend-design', 'anthropics', 'skills', 'main', 'https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md', 0, 1, 0, 0, 1774313704);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\brainstorming', 'brainstorming', 'You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation.', 'brainstorming', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/brainstorming/SKILL.md', 0, 1, 0, 0, 1774313978);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\dispatching-parallel-agents', 'dispatching-parallel-agents', 'Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies', 'dispatching-parallel-agents', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/dispatching-parallel-agents/SKILL.md', 0, 1, 0, 0, 1774313979);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\executing-plans', 'executing-plans', 'Use when you have a written implementation plan to execute in a separate session with review checkpoints', 'executing-plans', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/executing-plans/SKILL.md', 0, 1, 0, 0, 1774313989);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\finishing-a-development-branch', 'finishing-a-development-branch', 'Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup', 'finishing-a-development-branch', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/finishing-a-development-branch/SKILL.md', 0, 1, 0, 0, 1774313989);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\receiving-code-review', 'receiving-code-review', 'Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation', 'receiving-code-review', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/receiving-code-review/SKILL.md', 0, 1, 0, 0, 1774314003);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\requesting-code-review', 'requesting-code-review', 'Use when completing tasks, implementing major features, or before merging to verify work meets requirements', 'requesting-code-review', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/requesting-code-review/SKILL.md', 0, 1, 0, 0, 1774314005);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\subagent-driven-development', 'subagent-driven-development', 'Use when executing implementation plans with independent tasks in the current session', 'subagent-driven-development', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/subagent-driven-development/SKILL.md', 0, 1, 0, 0, 1774314016);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\systematic-debugging', 'systematic-debugging', 'Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes', 'systematic-debugging', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md', 0, 1, 0, 0, 1774314016);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\test-driven-development', 'test-driven-development', 'Use when implementing any feature or bugfix, before writing implementation code', 'test-driven-development', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/test-driven-development/SKILL.md', 0, 1, 0, 0, 1774314026);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\using-git-worktrees', 'using-git-worktrees', 'Use when starting feature work that needs isolation from current workspace or before executing implementation plans - creates isolated git worktrees with smart directory selection and safety verification', 'using-git-worktrees', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/using-git-worktrees/SKILL.md', 0, 1, 0, 0, 1774314026);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\using-superpowers', 'using-superpowers', 'Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions', 'using-superpowers', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/using-superpowers/SKILL.md', 0, 1, 0, 0, 1774314038);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\verification-before-completion', 'verification-before-completion', 'Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always', 'verification-before-completion', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md', 0, 1, 0, 0, 1774314039);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\writing-plans', 'writing-plans', 'Use when you have a spec or requirements for a multi-step task, before touching code', 'writing-plans', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/writing-plans/SKILL.md', 0, 1, 0, 0, 1774314049);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('obra/superpowers:skills\writing-skills', 'writing-skills', 'Use when creating new skills, editing existing skills, or verifying skills work before deployment', 'writing-skills', 'obra', 'superpowers', 'main', 'https://github.com/obra/superpowers/blob/main/skills/writing-skills/SKILL.md', 0, 1, 0, 0, 1774314049);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('vercel-labs/agent-skills:skills\web-design-guidelines', 'web-design-guidelines', 'Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".', 'web-design-guidelines', 'vercel-labs', 'agent-skills', 'main', 'https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md', 0, 1, 0, 0, 1774314248);
INSERT INTO "skills" ("id", "name", "description", "directory", "repo_owner", "repo_name", "repo_branch", "readme_url", "enabled_claude", "enabled_codex", "enabled_gemini", "enabled_opencode", "installed_at") VALUES ('vercel-labs/agent-browser:skills\agent-browser', 'agent-browser', 'Browser automation CLI for AI agents. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task. Triggers include requests to "open a website", "fill out a form", "click a button", "take a screenshot", "scrape data from a page", "test this web app", "login to a site", "automate browser actions", or any task requiring programmatic web interaction.', 'agent-browser', 'vercel-labs', 'agent-browser', 'main', 'https://github.com/vercel-labs/agent-browser/blob/main/skills/agent-browser/SKILL.md', 0, 1, 0, 0, 1774855217);
COMMIT;
PRAGMA foreign_keys=ON;
