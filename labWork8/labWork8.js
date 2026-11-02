"use strict";

const STORAGE_KEY = "contactbook.contacts";

const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const companyInput = document.querySelector("#company");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const formTitle = document.querySelector("#form-title");
const formEyebrow = document.querySelector("#form-eyebrow");
const formMessage = document.querySelector("#form-message");
const contactList = document.querySelector("#contact-list");
const contactCount = document.querySelector("#contact-count");
const searchInput = document.querySelector("#search");
const resultsLabel = document.querySelector("#results-label");

let contacts = loadContacts();
let editingId = null;

function loadContacts() {
  try {
    const savedContacts = localStorage.getItem(STORAGE_KEY);
    if (!savedContacts) return [];

    const parsedContacts = JSON.parse(savedContacts);
    if (!Array.isArray(parsedContacts)) {
      throw new Error("Saved contacts have an invalid format.");
    }

    return parsedContacts.filter((contact) =>
      contact &&
      typeof contact.id === "string" &&
      typeof contact.name === "string" &&
      typeof contact.email === "string" &&
      typeof contact.phone === "string" &&
      typeof contact.company === "string"
    );
  } catch (error) {
    console.error("Unable to load saved contacts:", error);
    showMessage("Saved contacts could not be loaded. Check browser storage or the console for details.", true);
    return [];
  }
}

function saveContacts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.error("Unable to save contacts:", error);
    showMessage("Could not save your changes. Check browser storage and try again.", true);
    return false;
  }
}

function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("error", isError);
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");
}

function makeActionButton(label, symbol, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button ${className}`.trim();
  button.setAttribute("aria-label", label);
  button.title = label;
  button.textContent = symbol;
  button.addEventListener("click", handler);
  return button;
}

function renderContacts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const visibleContacts = contacts
    .filter((contact) =>
      [contact.name, contact.email, contact.phone, contact.company]
        .some((value) => value.toLocaleLowerCase().includes(query))
    )
    .sort((first, second) => first.name.localeCompare(second.name));

  contactList.replaceChildren();
  contactCount.textContent = String(contacts.length);

  if (contacts.length === 0) {
    resultsLabel.textContent = "Your people, all together.";
    contactList.append(createEmptyState("Your contact list is empty", "Add your first contact using the form."));
    return;
  }

  if (visibleContacts.length === 0) {
    resultsLabel.textContent = "No matching contacts.";
    contactList.append(createEmptyState("No contacts found", "Try another name, email, phone, or company."));
    return;
  }

  resultsLabel.textContent = `${visibleContacts.length} ${visibleContacts.length === 1 ? "person" : "people"} in your address book`;

  visibleContacts.forEach((contact, index) => {
    const row = document.createElement("article");
    row.className = "contact-row";

    const avatar = document.createElement("div");
    avatar.className = `contact-avatar tone-${index % 5}`;
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = getInitials(contact.name);

    const details = document.createElement("div");
    details.className = "contact-details";

    const name = document.createElement("h3");
    name.className = "contact-name";
    name.textContent = contact.name;

    const meta = document.createElement("p");
    meta.className = "contact-meta";
    const metaParts = [contact.email, contact.phone, contact.company].filter(Boolean);
    metaParts.forEach((part, partIndex) => {
      if (partIndex > 0) {
        const divider = document.createElement("span");
        divider.className = "meta-divider";
        divider.setAttribute("aria-hidden", "true");
        divider.textContent = "·";
        meta.append(divider);
      }
      const text = document.createElement("span");
      text.textContent = part;
      meta.append(text);
    });

    details.append(name, meta);

    const actions = document.createElement("div");
    actions.className = "contact-actions";
    actions.append(
      makeActionButton(`Edit ${contact.name}`, "✎", "", () => startEditing(contact.id)),
      makeActionButton(`Delete ${contact.name}`, "⌫", "delete", () => deleteContact(contact.id))
    );

    row.append(avatar, details, actions);
    contactList.append(row);
  });
}

function createEmptyState(title, description) {
  const state = document.createElement("div");
  state.className = "empty-state";

  const icon = document.createElement("div");
  icon.className = "empty-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "♡";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const copy = document.createElement("p");
  copy.textContent = description;

  state.append(icon, heading, copy);
  return state;
}

function resetForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = "Add a contact";
  formEyebrow.textContent = "GET STARTED";
  submitButton.innerHTML = "<span aria-hidden=\"true\">＋</span> Add contact";
  cancelEditButton.hidden = true;
  showMessage("");
}

function startEditing(id) {
  const contact = contacts.find((item) => item.id === id);
  if (!contact) return;

  editingId = id;
  nameInput.value = contact.name;
  emailInput.value = contact.email;
  phoneInput.value = contact.phone;
  companyInput.value = contact.company;
  formTitle.textContent = "Edit contact";
  formEyebrow.textContent = "UPDATE DETAILS";
  submitButton.innerHTML = "<span aria-hidden=\"true\">✓</span> Save changes";
  cancelEditButton.hidden = false;
  showMessage("");
  nameInput.focus();
}

function deleteContact(id) {
  const contact = contacts.find((item) => item.id === id);
  if (!contact || !window.confirm(`Delete ${contact.name} from your contacts?`)) return;

  const previousContacts = contacts;
  contacts = contacts.filter((item) => item.id !== id);
  if (!saveContacts()) {
    contacts = previousContacts;
    return;
  }

  if (editingId === id) resetForm();
  renderContacts();
  showMessage("Contact deleted.");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const updatedContact = {
    id: editingId || createId(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    company: companyInput.value.trim()
  };

  if (!updatedContact.name) {
    nameInput.setCustomValidity("Please enter a name.");
    nameInput.reportValidity();
    nameInput.setCustomValidity("");
    return;
  }

  const previousContacts = contacts;
  contacts = editingId
    ? contacts.map((contact) => contact.id === editingId ? updatedContact : contact)
    : [...contacts, updatedContact];

  if (!saveContacts()) {
    contacts = previousContacts;
    return;
  }

  const wasEditing = Boolean(editingId);
  resetForm();
  renderContacts();
  showMessage(wasEditing ? "Contact updated." : "Contact added.");
});

cancelEditButton.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderContacts);

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderContacts();
