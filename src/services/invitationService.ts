import { API_BASE } from './config';

export interface Invitation {
  id: string;
  recipientEmail: string;
  status: 'active' | 'expired' | 'revoked' | 'converted';
  loginCount: number;
  maxLogins: number;
  createdAt: string;
  expiryDate: string;
}

export interface SendInvitationResponse {
  invitation: Invitation;
  code: string;
}

export interface ListInvitationsParams {
  page?: number;
  pageSize?: number;
  status?: string;
}

export interface ListInvitationsResponse {
  invitations: Invitation[];
  total: number;
  page: number;
  pageSize: number;
}

async function userAuthHeader(): Promise<Record<string, string>> {
  // Placeholder: in production, retrieve the authenticated user token.
  // Replace with your user auth token retrieval logic.
  return {};
}

export async function send(
  recipientEmail: string,
  userToken: string,
): Promise<SendInvitationResponse> {
  const res = await fetch(`${API_BASE}/invitations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ recipientEmail }),
  });
  if (!res.ok) {
    throw new Error(`POST /invitations failed: ${res.status}`);
  }
  return (await res.json()) as SendInvitationResponse;
}

export async function list(
  userToken: string,
  params: ListInvitationsParams = {},
): Promise<ListInvitationsResponse> {
  const { page = 1, pageSize = 20, status } = params;
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(status ? { status } : {}),
  });
  const res = await fetch(`${API_BASE}/invitations?${query.toString()}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!res.ok) {
    throw new Error(`GET /invitations failed: ${res.status}`);
  }
  return (await res.json()) as ListInvitationsResponse;
}

export async function revoke(invitationId: string, userToken: string): Promise<Invitation> {
  const res = await fetch(`${API_BASE}/invitations/${invitationId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  if (!res.ok) {
    throw new Error(`DELETE /invitations/${invitationId} failed: ${res.status}`);
  }
  const body = (await res.json()) as { invitation: Invitation };
  return body.invitation;
}
