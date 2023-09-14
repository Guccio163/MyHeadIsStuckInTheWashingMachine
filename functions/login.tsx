import emailjs from "@emailjs/browser";
import {EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "@env";



export function generateCode(level: number) {
  let randomNumber = Math.floor(Math.random() * Math.pow(10, level) - 1);
  let randomStringified = `${randomNumber}`;
  let numberLength = randomStringified.length;
  let missing = level - numberLength;
  let fill = "0".repeat(missing);
  //   console.log(randomNumber, fill, );
  return fill.concat(randomStringified);
}

export async function generateCodeSetState(
  level: number,
  setState: (arg0: string) => void
) {
  await setState(generateCode(level));
}

export async function sendAuthCode(
  username: string,
  email: string,
  code: string,
  setLoading: (arg0: boolean) => void
) {
  console.log("inside sendAuth function");
  console.log(
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    
  );
  if (
    EMAILJS_PUBLIC_KEY &&
    EMAILJS_SERVICE_ID &&
    EMAILJS_TEMPLATE_ID &&
    username &&
    email &&
    code
  ) {
    console.log("entered email sending");
    emailjs.init(EMAILJS_PUBLIC_KEY), [];
    const serviceId = EMAILJS_SERVICE_ID;
    const templateId = EMAILJS_TEMPLATE_ID;
    console.log("before try");
    try {
      await emailjs.send(serviceId, templateId, {
        name: username,
        recipient: email,
        auth_code: code,
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
      console.log('error caught')
    } finally {
      //   setLoading(false);
    }
  }
}
