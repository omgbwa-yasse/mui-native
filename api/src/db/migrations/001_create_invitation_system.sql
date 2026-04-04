-- Migration 001: Create core entities for feature 004-invitation-multiagent
-- Run with: psql $DATABASE_URL -f 001_create_invitation_system.sql

BEGIN;

-- Enums
CREATE TYPE invitation_status AS ENUM ('active', 'revoked', 'expired', 'converted');
CREATE TYPE subscription_plan_type AS ENUM ('monthly', 'annual', 'trial');
CREATE TYPE subscription_status AS ENUM ('active', 'lapsed', 'cancelled');
CREATE TYPE agent_session_status AS ENUM ('analyzing', 'processing', 'synthesizing', 'complete', 'failed');
CREATE TYPE worker_agent_status AS ENUM ('pending', 'running', 'complete', 'failed');

-- Invitation
CREATE TABLE invitation (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id       UUID NOT NULL,
  recipient_email  VARCHAR(255) NOT NULL,
  code_hash        VARCHAR(255) NOT NULL UNIQUE,
  login_count      INTEGER NOT NULL DEFAULT 0 CHECK (login_count >= 0 AND login_count <= 10),
  status           invitation_status NOT NULL DEFAULT 'active',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at       TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '30 days',
  revoked_at       TIMESTAMPTZ,
  converted_at     TIMESTAMPTZ
);

CREATE INDEX idx_invitation_recipient_status ON invitation (recipient_email, status);
CREATE INDEX idx_invitation_inviter_status ON invitation (inviter_id, status);
CREATE INDEX idx_invitation_expires_at ON invitation (expires_at);

-- GuestSession
CREATE TABLE guest_session (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id         UUID NOT NULL REFERENCES invitation(id) ON DELETE CASCADE,
  login_attempt_number  INTEGER NOT NULL CHECK (login_attempt_number >= 1 AND login_attempt_number <= 10),
  session_token         VARCHAR(512),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at            TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '24 hours',
  revoked_at            TIMESTAMPTZ,
  access_scope          TEXT[] NOT NULL DEFAULT ARRAY['view', 'process', 'export']
);

CREATE INDEX idx_guest_session_invitation ON guest_session (invitation_id);

-- LoginAttemptLog  
CREATE TABLE login_attempt_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) NOT NULL,
  attempted_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  success         BOOLEAN NOT NULL,
  failure_reason  VARCHAR(100),
  lockout_until   TIMESTAMPTZ
);

CREATE INDEX idx_login_attempt_email ON login_attempt_log (email, attempted_at DESC);

-- Subscription
CREATE TABLE subscription (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL UNIQUE,
  plan_type           subscription_plan_type NOT NULL,
  status              subscription_status NOT NULL,
  billing_start       TIMESTAMPTZ NOT NULL,
  billing_end         TIMESTAMPTZ NOT NULL,
  multi_agent_enabled BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_subscription_user ON subscription (user_id);

-- AgentSession
CREATE TABLE agent_session (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL,
  document_snapshot    TEXT NOT NULL,
  word_count           INTEGER NOT NULL CHECK (word_count > 0),
  worker_count         INTEGER NOT NULL CHECK (worker_count >= 1 AND worker_count <= 6),
  supervisor_agent_id  VARCHAR(100),
  status               agent_session_status NOT NULL DEFAULT 'analyzing',
  started_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at         TIMESTAMPTZ,
  synthesized_document TEXT,
  error_message        VARCHAR(1000)
);

CREATE INDEX idx_agent_session_user ON agent_session (user_id, started_at DESC);
CREATE INDEX idx_agent_session_status ON agent_session (status);

-- WorkerAgent
CREATE TABLE worker_agent (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_session_id    UUID NOT NULL REFERENCES agent_session(id) ON DELETE CASCADE,
  section_index       INTEGER NOT NULL,
  section_start       INTEGER NOT NULL,
  section_end         INTEGER NOT NULL,
  section_word_count  INTEGER NOT NULL,
  status              worker_agent_status NOT NULL DEFAULT 'pending',
  progress_percent    INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  partial_output      TEXT,
  final_output        TEXT,
  last_reported_at    TIMESTAMPTZ,
  error_message       VARCHAR(500),
  UNIQUE (agent_session_id, section_index)
);

CREATE INDEX idx_worker_agent_session ON worker_agent (agent_session_id);

-- HumanizationReport
CREATE TABLE humanization_report (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_session_id          UUID NOT NULL UNIQUE REFERENCES agent_session(id) ON DELETE CASCADE,
  flesch_kincaid_before     FLOAT NOT NULL,
  flesch_kincaid_after      FLOAT NOT NULL,
  ai_risk_reduction_percent FLOAT NOT NULL CHECK (ai_risk_reduction_percent >= 0 AND ai_risk_reduction_percent <= 100),
  transformations_applied   JSONB NOT NULL DEFAULT '[]',
  highlighted_sections      JSONB NOT NULL DEFAULT '[]',
  readability_label         VARCHAR(20) NOT NULL,
  generated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
