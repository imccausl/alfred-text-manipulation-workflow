const alfy = require("alfy");

const input = alfy.input
const emails = input.match(/[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?/igm);

if (emails === null) {
	alfy.error("No email addresses found")
} else {
	const commaSeparatedEmails = emails.map(item => `'${item}'`).join();
	const newLineSeparatedEmails = emails.join("\n");
	
	const list = [
		{
			title: "Comma-separated list of Emails",
			subtitle: commaSeparatedEmails,
			arg: commaSeparatedEmails,
			text: {
				copy: commaSeparatedEmails,
				largetype: commaSeparatedEmails
			}
		},
		{
			title: "New line-Separated list of Emails",
			subtitle: newLineSeparatedEmails,
			arg: newLineSeparatedEmails,
			text: {
				copy: newLineSeparatedEmails,
				largetype: newLineSeparatedEmails
			}
		}
	];
	
	alfy.output(list)
}


