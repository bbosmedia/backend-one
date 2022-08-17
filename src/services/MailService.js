import nodemailer from 'nodemailer'
import 'dotenv/config'

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'outlook',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}
	async sendActivationLink(to, link) {
		await this.transporter.sendMail(
			{
				from: process.env.SMTP_USER,
				to,
				subject: 'Activation link',
				text: '',
				html: `
            <div>
            <h1>CLick to activation Link</h1>
            <a href="${link}">Activate</a>
            </div>
            `,
			},
		)
	}
}

export default new MailService()
