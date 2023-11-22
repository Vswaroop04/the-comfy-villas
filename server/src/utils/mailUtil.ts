import nodemailer from 'nodemailer';
const config = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'noreply.emailhtt@gmail.com',
		pass: 'ppmj gxyw alih bukz',
	},
});

export default async function sendMailUtil(
	sub: any,
	mailBody: any,
	admin: boolean,
	toMail?: string
) {
	let mailOptions2 = {
		from: 'noreply.emailhtt@gmail.com',
		to: admin ? 'vswaroop04@gmail.com' : toMail,
		subject: sub,
		html: mailBody,
    };
	config.sendMail(mailOptions2, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
