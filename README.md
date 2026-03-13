# Logic Integrity & UI Behavior Validation Suite

## Overview
My project demonstrates a security-first approach to Quality Assurance for high-traffic web applications. Leveraging my background in fintech data integrity, I focus on validating internal logic branches and user interaction constraints to prevent financial and operational liabilities.

## Core Components
---

## Structural Logic Analysis (White-Box Strategy)
The validation suite targets the four primary logical branches within the `getButtonState` function. This prevents "blind spots" in the application state.

| Logic Path | Input State | Expected Outcome | Risk Mitigated |
| :--- | :--- | :--- | :--- |
| **Path 1: Auth Gate** | `userIsLoggedIn: false` | `enabled: false` | Unauthorized access to performer features. |
| **Path 2: Concurrency**| `isProcessing: true` | `enabled: false` | Duplicate transaction/follow requests. |
| **Path 3: Persistence** | `isAlreadyFollowing: true`| `text: "Following"` | Desync between UI and Database state. |
| **Path 4: Safety/Edge** | `userIsLoggedIn: undefined`| `enabled: false` | System crash/leak on corrupted session data. |

### How to Run
1. Ensure Node.js is installed.
2. Run `npm test` in the root directory.
3. Observe the `console.assert` results for structural integrity verification.

### 1. Logic Validation (`buttonLogic.js`)
Instead of testing via the UI alone, this suite validates the underlying JavaScript logic that governs application state. 
* **Path Coverage:** Ensures that every conditional branch (e.g., restricted access, server-side processing, and success states) is executed.
* **Security-First Defaults:** Includes validation for boundary cases where session data may be `undefined`, ensuring the system "fails closed" to protect user data.

### 2. Behavioral Specifications (`ButtonBehavior.md`)
Documentation of User Acceptance Criteria (UAC):
* **Concurrency Protection:** Logic to prevent "double-tap" duplicate transactions.
* **State Synchronization:** Ensuring the UI accurately reflects the database state in real-time.

## Tech Stack
* **Language:** JavaScript (Node.js)
* **Architecture:** Functional, Arrow-function based logic
* **Workflow:** NPM-based test execution