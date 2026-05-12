# Pipemodoro REST API Documentation

This document describes how to interact with the Pomodoro app's Supabase backend directly via `curl`. All requests use the PostgREST endpoint exposed by Supabase, combined with the GoTrue Auth API for authentication.

***

## Base URLs & Keys

| Parameter | Value |
|-----------|-------|
| **Supabase Project URL** | `https://rksnwqapqtyozomuqegl.supabase.co` |
| **Anon Key** | `sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j` |
| **Auth endpoint** | `https://rksnwqapqtyozomuqegl.supabase.co/auth/v1` |
| **REST endpoint** | `https://rksnwqapqtyozomuqegl.supabase.co/rest/v1` |

The **Anon Key** must be sent in every request as the `apikey` header. It identifies your project and is safe to use in public clients.

***

## Authentication

### Create an Account

Register a new user with an email and password.

```bash
curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/auth/v1/signup' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "your@email.com",
    "password": "your_password"
  }'
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "abc123...",
  "expires_in": 3600,
  "token_type": "bearer",
  "user": {
    "id": "uuid-of-your-user",
    "email": "your@email.com"
  }
}
```

> Email confirmation is required so you might receive a confirmation email and the `access_token` may not be returned immediately.

***

### Log In

Authenticate with an existing account to obtain an `access_token` and `refresh_token`.

```bash
curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/auth/v1/token?grant_type=password' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "your@email.com",
    "password": "your_password"
  }'
```

**Response (200 OK):**

```json
{
  "access_token": "eyJhbGci...",
  "refresh_token": "abc123...",
  "expires_in": 3600,
  "token_type": "bearer",
  "user": {
    "id": "uuid-of-your-user",
    "email": "your@email.com"
  }
}
```

Save `access_token`, `refresh_token`, and `user.id` — you will use them for all subsequent requests.

***

### Refresh the Access Token

Access tokens expire after 1 hour. Use the refresh token to get a new one without logging in again.

```bash
curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/auth/v1/token?grant_type=refresh_token' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Content-Type: application/json' \
  -d '{
    "refresh_token": "your_refresh_token"
  }'
```

**Response:** Same structure as the login response, with a new `access_token` and `refresh_token`.

***

## Using Your Access Token

For all data operations, attach both headers:

```
-H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j'
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

Row-Level Security (RLS) policies use the JWT in the `Authorization` header to identify your `user_id` — this is what scopes data to your account.

***

## Labels

The `Labels` table stores named categories for timers. Each label belongs to a user and can optionally carry a `webhook` URL.

### Schema

| Column | Type | Notes |
|--------|------|-------|
| `name` | `text` (PK) | Unique label name (primary key) |
| `webhook` | `text` | URL called when a timer with this label fires |
| `user_id` | `uuid` | Automatically set to the authenticated user's ID |

***

### Create a Label

```bash
curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Labels' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=representation' \
  -d '{
    "name": "Work",
    "webhook": "https://hooks.example.com/my-webhook",
    "user_id": "YOUR_USER_ID"
  }'
```

> The `webhook` field is required by the schema. If you do not need a webhook, pass an empty string `""`.

**Response (201 Created):**

```json
[
  {
    "name": "Work",
    "webhook": "https://hooks.example.com/my-webhook",
    "user_id": "uuid-of-your-user"
  }
]
```

The `Prefer: return=representation` header tells PostgREST to return the created row. Without it, a `201` with an empty body is returned.

***

### List Your Labels

```bash
curl -X GET 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Labels?select=*' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

**Response (200 OK):**

```json
[
  {
    "name": "Work",
    "webhook": "https://hooks.example.com/my-webhook",
    "user_id": "uuid-of-your-user"
  },
  {
    "name": "Break",
    "webhook": "",
    "user_id": "uuid-of-your-user"
  }
]
```

> RLS policies ensure only labels belonging to your `user_id` are returned.

***

### Delete a Label

```bash
curl -X DELETE 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Labels?name=eq.Work' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

***

## Timers

The `Timers` table records each pomodoro session — when it ends, its type, its label, and whether it was canceled or fired.

### Schema

| Column | Type | Notes |
|--------|------|-------|
| `id` | `bigint` | Auto-generated primary key |
| `created_at` | `timestamptz` | Set automatically to `now()` |
| `ends_at` | `timestamptz` | When the timer should fire |
| `user_id` | `uuid` | Authenticated user's ID |
| `canceled` | `boolean` | Default `false` |
| `client_timer_id` | `uuid` | Client-generated UUID (auto-generated if omitted) |
| `label` | `text` | FK → `Labels.name` (nullable) |
| `fired` | `boolean` | Default `false` |
| `timer_type` | `text` | E.g. `"pomodoro"`, `"short_break"`, `"long_break"` |

***

### Create a Timer

To set a 25-minute pomodoro timer from the current time:

```bash
curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=representation' \
  -d '{
    "ends_at": "2026-05-12T10:34:00+02:00",
    "user_id": "YOUR_USER_ID",
    "timer_type": "pomodoro",
    "label": "Work"
  }'
```

Replace `ends_at` with the ISO 8601 timestamp corresponding to `now() + your desired duration`.

**Response (201 Created):**

```json
[
  {
    "id": 1,
    "created_at": "2026-05-12T09:09:00+02:00",
    "ends_at": "2026-05-12T10:34:00+02:00",
    "user_id": "uuid-of-your-user",
    "canceled": false,
    "client_timer_id": "a1b2c3d4-...",
    "label": "Work",
    "fired": false,
    "timer_type": "pomodoro"
  }
]
```

#### Computing `ends_at` Dynamically in Bash

You can compute a timestamp programmatically to avoid hardcoding it:

```bash
# 25 minutes from now (Linux / macOS with GNU date)
ENDS_AT=$(date -u -d '+25 minutes' '+%Y-%m-%dT%H:%M:%SZ')

# 25 minutes from now (macOS with BSD date)
ENDS_AT=$(date -u -v+25M '+%Y-%m-%dT%H:%M:%SZ')

curl -X POST 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=representation' \
  -d "{
    \"ends_at\": \"$ENDS_AT\",
    \"user_id\": \"YOUR_USER_ID\",
    \"timer_type\": \"pomodoro\",
    \"label\": \"Work\"
  }"
```

#### Common `timer_type` Values

| Value | Duration |
|-------|----------|
| `"pomodoro"` | 25 minutes |
| `"short_break"` | 5 minutes |
| `"long_break"` | 15 minutes |

These values are conventions — the app does not enforce a specific list of types.

***

### List Your Timers

Retrieve all timers for your account, ordered by creation date (most recent first):

```bash
curl -X GET 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers?select=*&order=created_at.desc' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### Filter by Label

```bash
curl -X GET 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers?select=*&label=eq.Work' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### Filter by Timer Type

```bash
curl -X GET 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers?select=*&timer_type=eq.pomodoro' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

#### Only Non-Canceled Timers

```bash
curl -X GET 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers?select=*&canceled=eq.false' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
```

***

### Cancel a Timer

Mark a timer as canceled by its `id`:

```bash
curl -X PATCH 'https://rksnwqapqtyozomuqegl.supabase.co/rest/v1/Timers?id=eq.1' \
  -H 'apikey: sb_publishable_5TWgWKTH6OOgkpE1bld_Dw_nWH7zn7j' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=representation' \
  -d '{"canceled": true}'
```

***

## PostgREST Filter Operators

These operators can be appended to any query string parameter to filter rows:

| Operator | Meaning | Example |
|----------|---------|---------|
| `eq` | Equals | `?timer_type=eq.pomodoro` |
| `neq` | Not equals | `?canceled=neq.true` |
| `lt` | Less than | `?ends_at=lt.2026-05-12T12:00:00Z` |
| `gt` | Greater than | `?created_at=gt.2026-05-01T00:00:00Z` |
| `is` | Is null / Is not null | `?label=is.null` |
| `in` | In list | `?timer_type=in.(pomodoro,short_break)` |
| `order` | Sort | `?order=created_at.desc` |
| `limit` | Limit rows | `?limit=10` |
| `offset` | Pagination offset | `?offset=20` |

Combine multiple filters by chaining them with `&`:

```bash
?timer_type=eq.pomodoro&canceled=eq.false&order=created_at.desc&limit=10
```

***

## Error Reference

| HTTP Status | Meaning |
|-------------|---------|
| `200 OK` | Successful GET |
| `201 Created` | Row inserted successfully |
| `400 Bad Request` | Malformed JSON or invalid column |
| `401 Unauthorized` | Missing or expired `Authorization` header |
| `403 Forbidden` | RLS policy blocked the request |
| `409 Conflict` | Unique constraint violation (e.g., duplicate label `name`) |
| `422 Unprocessable Entity` | Foreign key constraint failed (e.g., label does not exist) |

***

## [Supabase documentation](https://supabase.com/docs)
For additional information refer to the original supabase documentation.