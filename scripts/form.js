function validateText(inputValue) {
  if (inputValue === "") {
    return `Por favor digite seu nome`;
  }
  return ""; // Sem erros
}

function formatPhoneNumber(inputValue) {
  // Limitar o número de dígitos a 11
  inputValue = inputValue.slice(0, 11);

  const cleaned = inputValue.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (!match) return "";

  const formatted = `(${match[1]}) ${match[2]}-${match[3]}`;
  return formatted.trim();
}

function validatePhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, "");
  if (
    !/^\(\d{2}\)\s\d{5}-\d{4}$/.test(phoneNumber) ||
    /^(\d)\1+$/.test(digits)
  ) {
    return "Digite um número de telefone válido";
  }
  return ""; // Sem erros
}

function validateEmail(email) {
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Digite um email válido";
  }
  return ""; // Sem erros
}

function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}

function createInput(id, placeholder, validateFunction) {
  const input = document.createElement("input");
  input.className = "input-common";
  input.type = "text";
  input.id = id;
  input.placeholder = placeholder;

  const errorMessage = document.createElement("span");
  errorMessage.className = "error-message";
  errorMessage.id = `${id}-error-message`;

  input.addEventListener("input", function (event) {
    const inputValue = event.target.value;
    const error = validateFunction(inputValue, placeholder); // Corrigido para passar os três parâmetros
    errorMessage.textContent = error;
  });

  return [input, errorMessage];
}
function generateCustomForm(formId, title, buttonText, modal) {
  const form = document.createElement("form");
  form.id = formId;

  // Título do formulário
  const formTitle = document.createElement("h2");
  formTitle.className = "form-title";
  formTitle.textContent = title;
  form.appendChild(formTitle);

  // Campos adicionais para modal
  const additionalFieldsDiv = document.createElement("div");
  additionalFieldsDiv.id = `additional-form-fields-${formId}`;
  additionalFieldsDiv.style.display = modal ? "block" : "none";

  const [creditTypeInput, creditTypeErrorMessage] = createInput(
    `credit-type-${formId}`,
    "Finalidade do crédito",
    validateText
  );
  const [creditValueInput, creditValueErrorMessage] = createInput(
    `credit-value-${formId}`,
    "Valor do bem",
    validateText
  );
  const [creditEntranceInput, creditEntranceErrorMessage] = createInput(
    `credit-entrance-${formId}`,
    "Valor da entrada (se houver)",
    validateText
  );

  additionalFieldsDiv.appendChild(creditTypeInput);
  additionalFieldsDiv.appendChild(creditValueInput);
  additionalFieldsDiv.appendChild(creditEntranceInput);

  form.appendChild(additionalFieldsDiv);

  // Campos do formulário
  const [nameInput, nameErrorMessage] = createInput(
    `name-${formId}`,
    "Seu nome",
    validateText
  );
  const [phoneInput, phoneErrorMessage] = createInput(
    `phone-${formId}`,
    "DDD + Whatsapp",
    validatePhoneNumber
  );
  const [emailInput, emailErrorMessage] = createInput(
    `email-${formId}`,
    "Seu Email",
    validateEmail
  );

  // Adicionar campos do formulário e mensagens de erro à mesma div
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";
  inputContainer.appendChild(nameInput);
  inputContainer.appendChild(nameErrorMessage);
  form.appendChild(inputContainer);

  phoneInput.addEventListener("input", function () {
    const inputValue = phoneInput.value.replace(/\D/g, "");
    const formattedInput = formatPhoneNumber(inputValue);
    phoneInput.value = formattedInput;
  });

  phoneInput.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      const inputValue = phoneInput.value.replace(/\D/g, "");
      const formattedInput = formatPhoneNumber(inputValue.slice(0, -1));
      phoneInput.value = formattedInput;
    }
  });

  creditValueInput.addEventListener("input", function (event) {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const numericValue = parseFloat(inputValue) / 100; // Converte para número e divide por 100
    event.target.value = formatCurrency(numericValue); // Formata como moeda e define de volta no input
  });

  creditEntranceInput.addEventListener("input", function (event) {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const numericValue = parseFloat(inputValue) / 100; // Converte para número e divide por 100
    event.target.value = formatCurrency(numericValue); // Formata como moeda e define de volta no input
  });
  inputContainer.appendChild(phoneInput);
  inputContainer.appendChild(phoneErrorMessage);
  inputContainer.appendChild(emailInput);
  inputContainer.appendChild(emailErrorMessage);

  const submitButton = document.createElement("button");
  submitButton.className = "button button--orange";
  submitButton.type = "submit";
  submitButton.textContent = buttonText;
  form.appendChild(submitButton);

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const errors = [];

    const nameError = validateText(nameInput.value);
    if (nameError) {
      nameErrorMessage.textContent = nameError;
      errors.push(nameError);
    } else {
      nameErrorMessage.textContent = "";
    }

    const phoneError = validatePhoneNumber(phoneInput.value);
    if (phoneError) {
      phoneErrorMessage.textContent = phoneError;
      errors.push(phoneError);
    } else {
      phoneErrorMessage.textContent = "";
    }

    const emailError = validateEmail(emailInput.value);
    if (emailError) {
      emailErrorMessage.textContent = emailError;
      errors.push(emailError);
    } else {
      emailErrorMessage.textContent = "";
    }

    if (modal) {
      // Validar os campos adicionais
      const creditTypeError = validateText(creditTypeInput.value);
      if (creditTypeError) {
        creditTypeErrorMessage.textContent = creditTypeError;
        errors.push(creditTypeError);
      } else {
        creditTypeErrorMessage.textContent = "";
      }

      const creditValueError = validateText(creditValueInput.value);
      if (creditValueError) {
        creditValueErrorMessage.textContent = creditValueError;
        errors.push(creditValueError);
      } else {
        creditValueErrorMessage.textContent = "";
      }

      const creditEntranceError = validateText(creditEntranceInput.value);
      if (creditEntranceError) {
        creditEntranceErrorMessage.textContent = creditEntranceError;
        errors.push(creditEntranceError);
      } else {
        creditEntranceErrorMessage.textContent = "";
      }
    }

    if (errors.length === 0) {
      const templateParams = {
        nome: nameInput.value,
        email: emailInput.value,
        telefone: phoneInput.value,
        valor: creditValueInput.value,
        finalidade: creditTypeInput.value,
        entrada: creditEntranceInput.value,
      };
      const toastDiv = document.createElement("div");
      toastDiv.className = "toast";
      toastDiv.id = `toast-${formId}`;
      toastDiv.style.display = "none";
      form.appendChild(toastDiv);
      onSubmit(e, templateParams, formId);
    }
  });

  return form;
}
function onSubmit(event, templateParams, formId) {
  event.preventDefault();

  const data = {
    service_id: "service_gzkexfk", // Seu service id
    template_id: "template_779u6yl", // Seu template id
    user_id: "B6Gfu8m73AkHlhyDs", // Sua public key
    template_params: templateParams,
  };

  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("SUCCESS!");
        // Redefinir os campos de entrada após o envio bem-sucedido
        const nameInput = document.getElementById(`name-${formId}`);
        const phoneInput = document.getElementById(`phone-${formId}`);
        const emailInput = document.getElementById(`email-${formId}`);
        const creditType = document.getElementById(`credit-type-${formId}`);
        const creditValue = document.getElementById(`credit-value-${formId}`);
        const creditEntrance = document.getElementById(
          `credit-entrance-${formId}`
        );

        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        creditType.value = "";
        creditEntrance.value = "";
        creditValue.value = "";

        const toastDiv = document.getElementById(`toast-${formId}`);
        toastDiv.textContent = "Formulário enviado com sucesso!";
        toastDiv.style.display = "block";

        setTimeout(() => {
          toastDiv.style.display = "none";
        }, 1000);
      } else {
        console.log("FAILED...", response.status, response.statusText);
        // Lidar com erros, se necessário.
      }
    })
    .catch((error) => {
      console.error("ERROR:", error);
      // Lidar com erros de rede, se necessário.
    });
}
const formFirst = generateCustomForm(
  "form-first",
  "Planeje agora mesmo a compra do seu próximo imóvel!",
  "Dê o primeiro passo"
);
const formLast = generateCustomForm("form-last", "", "Solicitar contato");

const formWhatsapp = generateCustomForm(
  "form-whatsapp",
  "",
  "Chame agora mesmo"
);

const formModal = generateCustomForm(
  "form-modal",
  "Planeje agora mesmo sua próxima conquista!",
  "Simular",
  true
);

const formFirstContainer = document.getElementById("form-wrapper-first");
formFirstContainer.appendChild(formFirst);

const formLastContainer = document.getElementById("form-wrapper-last");
formLastContainer.appendChild(formLast);

const formModalContainer = document.getElementById("form-wrapper-modal");
formModalContainer.appendChild(formModal);

const formWhatsappContainer = document.getElementById("form-wrapper-whatsapp");
formWhatsappContainer.appendChild(formWhatsapp);

const whatsIcon = document.getElementById("logoContainer");
const whatsFormContainer = document.getElementById("form-whats-container");

whatsIcon.addEventListener("click", whatsAction);

function whatsAction(e) {
  // Impede a propagação do evento para que o clique no ícone não se propague para o documento
  e.stopPropagation();

  // Mostra o formulário
  whatsFormContainer.style.display = "flex";

  // Adiciona um event listener no documento para verificar cliques fora do formulário
  document.addEventListener("click", handleDocumentClick);
}

function handleDocumentClick(event) {
  // Verifica se o clique ocorreu fora do elemento form-whats-container
  if (!whatsFormContainer.contains(event.target)) {
    // Oculta o formulário
    whatsFormContainer.style.display = "none";

    // Remove o event listener do documento
    document.removeEventListener("click", handleDocumentClick);
  }
}
