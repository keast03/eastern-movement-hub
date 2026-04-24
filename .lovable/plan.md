
# Eastern Movement — Build Plan

A premium, minimalist personal training website with a private trainer dashboard, lead capture, and automated email + SMS notifications. Payment integration is deferred — checkout buttons will collect client info and create a "pending" subscription that the trainer activates manually for now.

## 1. Pages & Routes

```
/                    Home (hero, philosophy, packages, Life Time CTA, footer)
/packages            Detail view of all training packages with signup buttons
/train-at-lifetime   Life Time lead capture form
/signup              Subscription signup form (chosen package → client details)
/thank-you           Post-submission confirmation
/admin/login         Trainer login
/admin               Dashboard (clients, sessions, leads)
/unsubscribe         Email unsubscribe page (required by email system)
```

## 2. Design System

- **Palette**: deep charcoal `#0E0E10`, off-black `#1A1A1D`, mid gray `#5A5A60`, soft gray `#E5E5E7`, crisp white `#FFFFFF`, single accent (warm off-white / bone) for CTAs
- **Typography**: large display headings (tight tracking), generous whitespace, uppercase eyebrow labels
- **Components**: full-bleed hero, sticky minimal nav, card-based pricing, athletic imagery placeholders
- Updates `src/styles.css` tokens to dark/premium palette; light theme stays default

## 3. Home Page Sections

1. **Hero** — large heading "Movement. Performance. Mastery." Primary CTA: *Book a 30-Minute Consultation*. Secondary: *View Training Packages*.
2. **Philosophy / About** — short statement on movement quality and performance training.
3. **Pricing Menu** — toggle between **Online Coaching** and **In-Person (Amli Joya, South Miami)**, three tiers each:
   - 2x / week — monthly subscription
   - 3x / week — monthly subscription
   - Elite / High Volume — monthly subscription
4. **Train at Life Time** — distinct dark section with a single CTA opening the lead form.
5. **Footer** — contact, social, locations.

## 4. Forms

**Subscription signup** (`/signup`): package + location pre-filled from selection. Collects name, email, phone, birthday, goals/notes. Creates a `subscriptions` row with status `pending_payment`. Triggers welcome email + SMS to the client and notification email to the trainer.

**Life Time lead form** (`/train-at-lifetime`): name, phone, email, birthday, inquiry details. Creates a `leads` row. Triggers acknowledgment email to client and notification email to trainer.

All inputs validated with Zod (length limits, email/phone format).

## 5. Trainer Admin Dashboard (`/admin`)

Protected by Lovable Cloud auth (email + password). Only users with the `admin` role (stored in a separate `user_roles` table per security best practice) can access.

Tabs:
- **Clients** — list of active subscriptions with: name, package, sessions remaining, last session date.
- **Client detail** — *Mark Session Complete* button (decrements `sessions_remaining`, inserts `sessions` row, triggers notification email + SMS to client). Edit package, add sessions, deactivate.
- **Leads** — Life Time inquiries with status (new / contacted / converted), notes field.
- **Pending signups** — new subscriptions awaiting payment activation; trainer can mark as active and set initial session count.

## 6. Database (Lovable Cloud / Supabase)

```
profiles             id, full_name, email, phone, birthday, created_at
subscriptions        id, profile_id, package_tier, location, status,
                     sessions_per_month, sessions_remaining, started_at
sessions             id, subscription_id, completed_at, notes
leads                id, name, email, phone, birthday, inquiry, status, notes, created_at
user_roles           id, user_id, role (enum: admin, trainer)
```

RLS: clients tables locked to admin role via `has_role()` security-definer function. Public insert allowed only for `leads` and pending `subscriptions` (rate-limited at server route).

## 7. Notifications — Email + SMS

**Email** via Lovable's built-in email infrastructure (requires enabling Lovable Cloud + setting up a sender domain). Templates created in `src/lib/email-templates/`:

- `lead-acknowledgment` — "Thanks for your inquiry, we'll be in touch."
- `subscription-welcome` — "Welcome to Eastern Movement, your trainer will reach out to confirm payment & schedule."
- `session-completed` — "Session marked complete. X sessions remaining this month."
- `trainer-new-lead` / `trainer-new-signup` — internal notifications to the trainer's inbox.

**SMS** via Twilio connector. Created server route `/api/notify/sms` that sends one message per trigger (welcome, session-completed). Client phone is collected at signup; trainer can opt clients out per-record.

Both channels use idempotency keys derived from the triggering event ID so retries don't double-send.

## 8. Payments — Deferred

Per your choice, no checkout integration now. The signup form creates a `pending_payment` subscription and clearly tells the client the trainer will follow up to arrange payment. When you're ready, we can add Stripe (recommended) — the package/tier data model is already structured for it.

## 9. Technical Notes (for reference)

- TanStack Start v1 routes under `src/routes/`
- Lovable Cloud (Supabase) for auth, DB, RLS
- Built-in Lovable Emails for transactional sending; Twilio connector for SMS
- Admin auth via `_authenticated` layout route + `has_role(uid, 'admin')` check in `beforeLoad`
- Public form server routes under `/api/public/*` with Zod validation and basic in-memory rate limiting
- Sender email domain setup will be the first step after approval; SMS requires connecting Twilio (you'll provide credentials when prompted)

## 10. What I'll Need From You After Approval

1. Confirm sender email domain (e.g. `notify.easternmovement.com`) — I'll guide DNS setup.
2. Connect Twilio (account + phone number) when prompted.
3. The trainer's email address for receiving lead/signup notifications.
4. Initial admin login email (you'll set the password on first sign-in).
