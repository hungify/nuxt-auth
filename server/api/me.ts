export default defineEventHandler(async (event) => {
	const token = event.headers.get("Authorization");

	if (token === "1234") {
		return {
			status: 200,
			body: {
				message: "Hello World",
			},
		};
	} else {
		throw createError({
			message: "Missing Authorization header",
			status: 401,
			fatal: true,
			statusMessage: "Unauthorized",
		});
	}
});
