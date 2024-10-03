export function multiplyCssValue(cssValue, multiplier) {
	// Extract the number part and the unit part using a regular expression
	const match = cssValue.match(/^(\d+)(\D+)$/);

	// If it doesn't match the pattern, return the original value
	if (!match) {
		throw new Error("Invalid CSS value");
	}

	// Destructure the match array to get the value and the unit
	const [, value, unit] = match;

	console.log(multiplier);

	// Multiply the numeric part and concatenate with the unit
	return `${parseFloat(value) * multiplier}${unit}`;
}
