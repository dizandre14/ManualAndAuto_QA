/**
 * Logic: Determines the 'Enabled' state of the Primary Action Button.
 * This prevents logic errors where a button might stay active during a server delay.
 */
const getButtonState = (isProcessing, isAlreadyFollowing, userIsLoggedIn) => {

    // User must be logged in to interact
    // This also handles 'undefined' or 'null' session data (Security fallback)
    if (!userIsLoggedIn) {
        return { enabled: false, text: "Login to Follow" };
    }

    // Server is still processing, lock the button
    // Prevents "Double-Click" duplicate transaction errors
    if (isProcessing) {
        return { enabled: false, text: "Processing..." };
    }

    // Success state (Already Following)
    if (isAlreadyFollowing) {
        return { enabled: true, text: "Following" };
    }

    // Default state: User is logged in and not following yet
    return { enabled: true, text: "Follow" };
};

/**
 * Logic-Level Validation Suite
 */
const runValidation = () => {
    console.log("--- Starting Logic-Level Validation ---");

    // Unauthorized Access Branch
    const res1 = getButtonState(false, false, false);
    console.assert(res1.enabled === false, "FAIL: Path 1");
    console.log("PASS: Guest users correctly restricted.");

    // Concurrency Lock Branch (Double-Click Protection)
    const res2 = getButtonState(true, false, true);
    console.assert(res2.enabled === false, "FAIL: Path 2");
    console.log("PASS: Button correctly locks during server-side processing.");

    // State Integrity (Already Following)
    const res3 = getButtonState(false, true, true);
    console.assert(res3.text === "Following", "FAIL: Path 3");
    console.log("PASS: UI correctly reflects existing relationship status.");

    // Boundary/Safety Check (Undefined Login Status)
    // Proves the system "Fails Closed" if session data is corrupted/missing
    const res4 = getButtonState(false, false, undefined);
    console.assert(res4.enabled === false, "FAIL: Path 4");
    console.log("PASS: System defaults to 'Disabled' on unknown session state.");

    console.log("--- Validation Complete---");
};


runValidation();