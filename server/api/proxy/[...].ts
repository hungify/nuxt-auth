/* eslint-disable so1ve/function-style */
import { createProxyMiddleware } from "http-proxy-middleware";

export default defineEventHandler(() => {
	return createProxyMiddleware({
		target: "http://localhost:3000",
		changeOrigin: true,
		pathRewrite(path) {
			return path.replace(/^\/api\/proxy/, "");
		},
		onProxyReq(proxyReq, req, res) {
			console.log("onProxyReq");
		},
	});
});

// export default defineEventHandler(async (event) => {
// 	const pathname = event.path;
// 	const isLogin = pathname === "/api/proxy/login";
// 	const method = event.method;

// 	const token = getCookie(event, "token");
// 	const params = getQuery(event);
// 	const body = method === "GET" ? undefined : await readBody(event);

// 	const url = pathname.replace(/^\/api\/proxy/, "");

// 	return new Promise((resolve, reject) => {
// 		proxy
// 			.once("proxyRes", (proxyRes) => {
// 				if (isLogin) {
// 					let responseBody = "";
// 					proxyRes.on("data", (chunk) => {
// 						responseBody += chunk;
// 					});

// 					proxyRes.on("end", () => {
// 						try {
// 							const { authToken } = JSON.parse(responseBody);
// 							setCookie(event, "auth-token", authToken, {
// 								httpOnly: true,
// 								sameSite: "lax", // CSRF protection
// 							});

// 							return resolve({
// 								isLoggedIn: true,
// 							});
// 						} catch {
// 							createError({
// 								message: "Invalid credentials",
// 								status: 401,
// 								fatal: true,
// 								statusMessage: "Unauthorized",
// 							});
// 						}
// 					});
// 				} else {
// 					return resolve({
// 						isLoggedIn: true,
// 					});
// 				}
// 			})
// 			.once("error", reject)
// 			.web(req, res, {
// 				target: API_URL,
// 				autoRewrite: false,
// 				selfHandleResponse: isLogin,
// 			});
// 	});
// });
