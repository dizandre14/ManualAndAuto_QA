# UI Behavior: "Follow Performer" Action Button

## Scenario: State Toggle & Feedback
**Goal:** Ensure the button accurately reflects the relationship between the user and the performer.

### Expected Interaction:
1. **Initial State:** The button should display "Follow" with a primary color (e.g., Blue).
2. **Action:** User clicks the button once.
3. **Transition State:** The button should immediately enter a 'Loading' or 'Disabled' state to prevent a second click while the server processes the request.
4. **Final State:** Once successful, the button text must change to "Following" and the color should shift to a neutral/secondary style (e.g., Gray).

---

## Scenario: Interaction Protection (The "Double-Click" Bug)
**Goal:** Prevent duplicate network requests.

### Expected Interaction:
1. User rapidly clicks the "Follow" button 3 times.
2. **Requirement:** The system must only register the first click. Subsequent clicks during the "Pending" state must be ignored.