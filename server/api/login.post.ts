export default defineEventHandler(async (event) => {
	const body = await readBody<{ email: string; password: string }>(event);
	const { email, password } = body || {};
	console.log("### :: file: login.post.ts:4 ::  { email, password }:", {
		email,
		password,
	});

	if (email === "admin@admin.com" && password === "admin") {
		return {
			token: "1234",
		};
	}

	throw createError({
		status: 401,
		message: "Invalid credentials",
		data: {
			message: "Invalid credentials",
		},
		fatal: true,
		statusCode: 401,
		statusMessage: "Unauthorized",
	});
});
