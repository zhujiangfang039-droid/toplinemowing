const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach(other => {
      if (other !== item) other.open = false;
    });
  });
});

const form = document.querySelector('#quote-form');
if (form) {
  form.action = 'https://formsubmit.co/toplinemowingandlandscaping@outlook.com';
  form.method = 'POST';

  const hiddenFields = {
    _subject: 'New Free Estimate Request - TOPLINE MOWING',
    _template: 'table',
    _captcha: 'true'
  };

  Object.entries(hiddenFields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
}

form?.addEventListener('submit', event => {
  if (form.checkValidity() && form.action.includes('formsubmit.co')) return;
  event.preventDefault();
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'Please complete the required fields.';
    status.className = 'form-status error';
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent('Free Estimate Request - TOPLINE MOWING');
  const body = encodeURIComponent(`Name: ${data.get('firstName')} ${data.get('lastName')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email') || 'Not provided'}\nAddress / ZIP: ${data.get('location')}\nService: ${data.get('service')}\n\nProperty details:\n${data.get('message') || 'Not provided'}`);
  status.innerHTML = 'Your request is ready. <a href="sms:+18323606419">Text 832-360-6419</a> or <a href="mailto:?subject=' + subject + '&body=' + body + '">send it by email</a>.';
  status.className = 'form-status success';
});

document.querySelector('#year').textContent = new Date().getFullYear();
