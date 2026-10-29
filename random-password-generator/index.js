
const generatePasswordButton = document.getElementById("generate-password");
const passwordLengthCursor = document.getElementById("password-length-cursor");
const passwordLength = document.getElementById("password-length");
const copyButtonText = document.getElementById("copy-button-text");
const copyButton = document.getElementById("copy-button");
const passwordGenerator = document.getElementById("password-generator");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";


const generatedPassword = () => {
  let password = "";
  const random = new Uint32Array(1);

  const limit =
    Math.floor(2 ** 32 / characters.length) * characters.length;

  for (let i = 0; i < Number(passwordLengthCursor.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] >= limit);

    password += characters[random[0] % characters.length];
    passwordGenerator.value = password;
  }

  copyButton.textContent = "Copy";
  copyButtonText.textContent = "Uses letters, numbers, and symbols.";
};


const generatedPasswordFromRange = () => {
  passwordLength.textContent = passwordLengthCursor.value;
  generatedPassword()
};


const showGeneratedPassword = async () => {
  if (!passwordGenerator.value) {
    copyButtonText.textContent = "Generate a password first.";
    return;
  }

  try {
    await navigator.clipboard.writeText(passwordGenerator.value);

    copyButton.textContent = "Copied";
    copyButtonText.textContent = "Password copied to clipboard.";

    setTimeout(() => {
      copyButton.textContent = "Copy";
      copyButtonText.textContent = "Uses letters, numbers, and symbols.";
    }, 1500);
  } catch (error) {
    copyButtonText.textContent = "Unable to copy password.";
  }
};


generatePasswordButton.addEventListener("click", generatedPassword);
copyButton.addEventListener("click", showGeneratedPassword);
passwordLengthCursor.addEventListener("input", generatedPasswordFromRange);


generatedPassword();
