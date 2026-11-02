/* ==========================================================================
   Auspicious Craft — Contact / B2B Inquiry form
   Submits inquiries via EmailJS to auspicious@vip.163.com.
   ========================================================================== */

/* --------------------------------------------------------------------------
   ★ EmailJS 配置（重要 —— 你需要替换下面三个值）
   1. 到 https://www.emailjs.com 免费注册。
   2. 创建一个 Email Service（连接你的 163 邮箱），得到 Service ID。
   3. 创建一个 Email Template，得到 Template ID。
   4. 在 Account → General（API Keys）里找到 Public Key。
   -------------------------------------------------------------------------- */
const EMAILJS_SERVICE_ID = 'service_gv9xywr'; // ★ 已填：你的 Service ID
const EMAILJS_TEMPLATE_ID = 'template_nu2ctyw'; // ★ 已填：你的 Template ID
const EMAILJS_PUBLIC_KEY = '7MaD-m3woQ1yh-ma3'; // ★ 已填：你的 Public Key

/* 判断是否已经填入了真实的 EmailJS 三个 ID */
function emailjsConfigured() {
  return EMAILJS_SERVICE_ID.indexOf('YOUR_') === -1 &&
         EMAILJS_TEMPLATE_ID.indexOf('YOUR_') === -1 &&
         EMAILJS_PUBLIC_KEY.indexOf('YOUR_') === -1;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Pre-fill the "Product Interest" field when arriving from a product page */
function prefillProduct() {
  const q = new URLSearchParams(window.location.search).get('product');
  if (q) {
    const el = document.getElementById('product');
    if (el) el.value = q;
  }
}

function fieldValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function markInvalid(id, invalid) {
  const el = document.getElementById(id);
  if (!el) return;
  if (invalid) { el.classList.add('border-red-400'); }
  else { el.classList.remove('border-red-400'); }
}

function validate() {
  const checks = [
    ['name', fieldValue('name') !== '', 'Please enter your name.'],
    ['company', fieldValue('company') !== '', 'Please enter your company name.'],
    ['email', EMAIL_RE.test(fieldValue('email')), 'Please enter a valid business email.'],
    ['country', fieldValue('country') !== '', 'Please enter your country.'],
    ['product', fieldValue('product') !== '', 'Please tell us which product you are interested in.'],
    ['message', fieldValue('message') !== '', 'Please add a short message (customisation / delivery requirements).']
  ];
  const errors = [];
  checks.forEach(function (c) {
    markInvalid(c[0], !c[1]);
    if (!c[1]) errors.push(c[2]);
  });
  return errors;
}

/* Collect the form fields into a single object (used by the mailto: fallback) */
function collectData() {
  return {
    name: fieldValue('name'),
    company: fieldValue('company'),
    email: fieldValue('email'),
    country: fieldValue('country'),
    product: fieldValue('product'),
    moq: fieldValue('moq') || 'Not specified',
    message: fieldValue('message'),
    _subject: 'B2B Inquiry from ' + fieldValue('name') + ' (' + fieldValue('company') + ')'
  };
}

/* Fallback: open the visitor's email client with the data pre-filled */
function buildMailto() {
  const data = collectData();
  const body = [
    'Name: ' + data.name,
    'Company: ' + data.company,
    'Business Email: ' + data.email,
    'Country: ' + data.country,
    'Product Interest: ' + data.product,
    'MOQ Expectation: ' + data.moq,
    'Message: ' + data.message
  ].join('\n');
  return 'mailto:' + BRAND.email +
    '?subject=' + encodeURIComponent(data._subject) +
    '&body=' + encodeURIComponent(body);
}

/* 通过 EmailJS 的 sendForm 发送表单（自动读取表单字段，按 name 属性匹配模板变量） */
function sendToEmailJS(form) {
  return emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, {
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

function showSuccess() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.add('open');
}

function wireForm() {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const errorBox = document.getElementById('formError');
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnOriginal = submitBtn ? submitBtn.textContent.trim() : '';

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.textContent = loading ? t('contact.sending') : btnOriginal;
    submitBtn.style.opacity = loading ? '0.6' : '1';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const errors = validate();

    if (errors.length) {
      if (errorBox) {
        errorBox.innerHTML = '<ul class="list-disc list-inside text-left space-y-1">' +
          errors.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul>';
        errorBox.classList.remove('hidden');
      }
      return;
    }
    if (errorBox) errorBox.classList.add('hidden');

    if (emailjsConfigured()) {
      /* 已配置 EmailJS：发送表单，成功后弹窗提示 */
      var subjectEl = document.getElementById('emailSubject');
      if (subjectEl) subjectEl.value = 'B2B Inquiry from ' + fieldValue('name') + ' (' + fieldValue('company') + ')';

      setLoading(true);
      sendToEmailJS(form)
        .then(function () {
          setLoading(false);
          showSuccess();
          form.reset();
        })
        .catch(function (error) {
          setLoading(false);
          if (errorBox) {
            var msg = (error && (error.text || error.message)) ? (error.text || error.message) : t('contact.sendError');
            errorBox.innerHTML = '<p>' + msg + '</p>';
            errorBox.classList.remove('hidden');
          }
        });
    } else {
      /* 尚未配置 EmailJS：退回 mailto 方式 */
      showSuccess();
      window.location.href = buildMailto();
    }
  });

  /* Clear error styling as the user types */
  ['name', 'company', 'email', 'country', 'product', 'message'].forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { markInvalid(id, false); });
  });

  const closeModal = document.getElementById('closeModal');
  if (closeModal) {
    closeModal.addEventListener('click', function () {
      document.getElementById('successModal').classList.remove('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  prefillProduct();
  wireForm();
});

/* ==========================================================================
   ★ EmailJS 注册 / 配置步骤（照着做即可）★
   --------------------------------------------------------------------------
   1. 注册账号：打开 https://www.emailjs.com ，点 Sign Up 用邮箱免费注册。

   2. 添加邮箱服务（拿 Service ID）：
      - 登录后进入 Dashboard → 左侧「Email Services」→ 「Add New Service」。
      - 选择一个邮箱服务商（例如 Gmail / Outlook / 163 等），按提示授权。
      - 创建后你会得到一个 Service ID，形如 service_xxxxxxx。

   3. 创建邮件模板（拿 Template ID）：
      - 左侧「Email Templates」→ 「Create New Template」。
      - 在模板内容里用 {{变量名}} 引用表单字段，例如：
          {{name}}     姓名
          {{company}}  公司
          {{email}}    邮箱
          {{country}}  国家
          {{product}}  感兴趣产品
          {{moq}}      采购量
          {{message}}  留言
          {{_subject}} 邮件主题
      - 保存后你会得到一个 Template ID，形如 template_xxxxxxx。
      - 提示：在模板设置里把「Reply To」填成 {{email}}，这样你点回复时
        会直接回复到客户的邮箱。

   4. 拿 Public Key：
      - 左侧「Account」→「General」，页面里的「Public Key」就是公钥。

   5. 回填代码：
      - 把上面 contact.js 顶部的 3 个值替换成你的：
          EMAILJS_SERVICE_ID  = 'service_xxxxxxx'
          EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'
          EMAILJS_PUBLIC_KEY  = '你的公钥'

   6. 测试：刷新页面，填一份表单提交，确认你的邮箱（auspicious@vip.163.com）
      能收到邮件即可。
   ========================================================================== */
