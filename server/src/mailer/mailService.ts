import "dotenv/config";
import mailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { dirname, resolve } from "path";

const __dir = dirname(module.filename);

//Create transporter
const createTransporter = () => {
  return mailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

//Create email
const createEmail = async (
  recipientEmail: string,
  subject: string,
  filename: string,
  data = {}
) => {
  //Check for missing params
  if (!recipientEmail || !subject || !filename) {
    throw new Error("Missing arguments.");
  }

  //Default footer message
  let msg = process.env.FOOTER_MESSAGE
    ? process.env.FOOTER_MESSAGE
    : "Made with ❤️ | By Juan Cardenas";

  //Generate html
  let html = await compileTemplate(filename, { ...data, footerMessage: msg });
  //Return email
  return {
    from: process.env.SMTP_USER,
    to: recipientEmail,
    subject: subject,
    html: html,
  };
};

const compileTemplate = async (filename: string, variables: Object) => {
  //Create email template
  const templatePath = resolve(__dir, `./templates/${filename}.hbs`);
  //Read and compile template
  let templateSource;
  try {
    // Try to read and compile template
    templateSource = fs.readFileSync(templatePath, "utf-8");
  } catch (error: any) {
    // Handle file not found error
    if (error.code === "ENOENT") {
      throw new Error(`Template file not found: ${templatePath}`);
    }
    // Re-throw other errors
    throw error;
  }

  const template = await handlebars.compile(templateSource);

  //Return email template
  return template(variables);
};

export default {
  createEmail,
  createTransporter,
};
