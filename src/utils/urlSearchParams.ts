export const urlSearchParams = (params: Record<string, unknown>) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value)) {
				// Handle arrays by appending multiple entries for the same key
				value.forEach((item) => searchParams.append(key, String(item)));
			} else {
				searchParams.append(key, String(value));
			}
		}
	});
	return searchParams;
};
