import config from '../config/index.js';

export const generateToken = (user, message, statusCode, res) => {
	const token = user.generateJwtToken();
	const cookieName = user.role === 'Admin' ? 'AdminToken' : 'PatientToken';
	res
		.status(statusCode)
		.cookie(cookieName, token, {
			expires: new Date(
				Date.now() + config.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			secure: true, // set to true if you're using HTTPS (you are, since you're on render.com)
			sameSite: 'None', // 'Lax' or 'Strict' will block cross-site cookies
		})
		.json({
			success: true,
			message,
			user,
			token,
		});
};
