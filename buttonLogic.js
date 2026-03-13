/**
 * Logic: Determines the 'Enabled' state of the Primary Action Button.
 * This prevents logic errors where a button might stay active during a server delay.
 */

const getButtonState = (isProcessing, isAlreadyFollowing, userIsLoggedIn) => {
    // User must be logged in to interact
    if (!userIsLoggedIn) {
        return { enabled: false, text: "Login to Follow" };
    }

    // If the server is still thinking, lock the button
    if (isProcessing) {
        return { enabled: false, text: "Processing..." };
    }

    // Success state
    if (isAlreadyFollowing) {
        return { enabled: true, text: "Following" };
    }

    // Default state
    return { enabled: true, text: "Follow" };
};

/**
 * Internal Validation: Testing the Logic Branches
 * This is our path-coverage suite (Logic Validation).
 */
const validateButtonLogic = () => {
    console.log("--- Starting Internal Logic Validation ---");

    // Verify the "Double Click" protection (isProcessing = true)
    const stateA = getButtonState(true, false, true);
    if (stateA.enabled === false && stateA.text === "Processing...") {
        console.log("PASS: Button correctly locks during processing.");
    }

    // See if guest Access is blocked
    const stateB = getButtonState(false, false, false);
    if (stateB.enabled === false && stateB.text === "Login to Follow") {
        console.log("PASS: Guest users cannot trigger the follow action.");
    }

    // Check the "Following" toggle
    const stateC = getButtonState(false, true, true);
    if (stateC.text === "Following") {
        console.log("PASS: UI correctly reflects existing follow status.");
    }

    // Boundary/Edge Case - Missing Data (Undefined login status)
    const stateD = getButtonState(false, false, undefined);
    if (stateD.enabled === false) {
        console.log("PASS: System defaults to 'Disabled' when login status is unknown.");
    } else {
        console.error("FAIL: Potential Security Risk - Button enabled with undefined login status.");
    }
};

validateButtonLogic();