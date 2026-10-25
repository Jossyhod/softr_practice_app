import { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Button, notification, ConfigProvider } from "antd";
import { ArrowRight, CircleCheck, Mail, Phone, Rocket, User } from "lucide-react";
import "./RegistrationForm.css";

// Brand theme expressed as antd tokens, so the modal needs no !important overrides.
const THEME = {
  token: {
    colorPrimary: "#ffa500",
    colorText: "#1c1917",
    colorTextPlaceholder: "#a8a29e",
    colorBorder: "#e7e5e4",
    colorError: "#dc2626",
    borderRadius: 12,
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Input: {
      colorBgContainer: "#fafaf9",
      hoverBg: "#ffffff",
      activeBg: "#ffffff",
      hoverBorderColor: "#ffb52e",
      activeBorderColor: "#ffa500",
      activeShadow: "0 0 0 3px rgba(255, 165, 0, 0.18)",
      paddingBlockLG: 10,
      paddingInlineLG: 14,
      inputFontSizeLG: 15,
    },
    Form: {
      labelColor: "#44403c",
      labelFontSize: 13,
      verticalLabelPadding: "0 0 6px",
      itemMarginBottom: 18,
    },
    Button: {
      // Dark text on brand orange — white on #ffa500 fails contrast.
      primaryColor: "#1c1917",
      primaryShadow: "0 8px 20px -8px rgba(255, 140, 0, 0.65)",
      fontWeight: 600,
      contentFontSizeLG: 15,
      controlHeightLG: 50,
    },
  },
};

const MODAL_STYLES = {
  container: {
    padding: 0,
    overflow: "hidden",
    borderRadius: 20,
    boxShadow: "0 24px 64px -12px rgba(28, 25, 23, 0.35)",
  },
  header: { margin: 0, padding: 0, background: "none" },
  body: { padding: 0 },
  mask: {
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(28, 25, 23, 0.55)",
  },
};

const AUTO_CLOSE_MS = 3000;

export default function RegistrationForm({
  open,
  onClose,
  initialEmail = "",
  webhookUrl,
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const closeTimer = useRef();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const handleClose = () => {
    // Clear a pending auto-close so it can't shut a modal the user re-opens.
    clearTimeout(closeTimer.current);
    onClose();
  };

  const showSuccess = () => {
    setSubmitted(true);
    closeTimer.current = setTimeout(handleClose, AUTO_CLOSE_MS);
  };

  const handleSubmit = async (values) => {
    if (!webhookUrl) {
      api.error({
        title: "Sign-up unavailable",
        description: "Registration isn't configured yet. Please try again later.",
        placement: "topRight",
        duration: 4,
      });
      return;
    }

    setLoading(true);

    const params = new URLSearchParams();
    params.append("full_name", values.fullName);
    params.append("email", values.email);
    params.append("phone", values.phone || "");
    params.append("submitted_at", new Date().toISOString());

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      showSuccess();
    } catch (err) {
      // TypeError = CORS blocked reading the response, but the POST was still
      // delivered to Zapier (the original working behaviour).
      if (err instanceof TypeError) {
        showSuccess();
      } else {
        api.error({
          title: "Submission failed",
          description: err.message || "Something went wrong. Please try again.",
          placement: "topRight",
          duration: 4,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Passed as the Modal title so antd wires it up as the dialog's accessible name.
  const header = (
    <div className="reg-header">
      <span className="reg-header-badge" aria-hidden="true">
        <Rocket size={13} strokeWidth={2.25} /> New account
      </span>
      <h2 className="reg-title">Create your account</h2>
      <p className="reg-subtitle">
        Join thousands of professionals already on the platform.
      </p>
    </div>
  );

  return (
    <ConfigProvider theme={THEME}>
      {contextHolder}

      <Modal
        open={open}
        onCancel={handleClose}
        afterClose={() => setSubmitted(false)}
        title={submitted ? null : header}
        footer={null}
        width={480}
        centered
        destroyOnHidden
        className={submitted ? "reg-modal is-success" : "reg-modal"}
        styles={MODAL_STYLES}
      >
        {submitted ? (
          <div className="reg-success">
            <div className="reg-success-icon" aria-hidden="true">
              <CircleCheck size={36} strokeWidth={2.25} />
            </div>
            {/* Focused on mount so screen readers announce the result */}
            <h2 className="reg-success-title" tabIndex={-1} ref={(el) => el?.focus()}>
              You&rsquo;re in! <span aria-hidden="true">🎉</span>
            </h2>
            <p className="reg-success-text">
              Your account has been created successfully. Welcome aboard!
            </p>
            <Button size="large" onClick={handleClose} className="reg-success-btn">
              Done
            </Button>
          </div>
        ) : (
          <div className="reg-body">
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
              size="large"
              initialValues={{ email: initialEmail }}
            >
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input
                  prefix={<User size={16} className="reg-input-icon" aria-hidden="true" />}
                  placeholder="John Doe"
                  autoComplete="name"
                  autoFocus
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input
                  prefix={<Mail size={16} className="reg-input-icon" aria-hidden="true" />}
                  placeholder="john@example.com"
                  autoComplete="email"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={
                  <>
                    Phone number <span className="reg-optional">(optional)</span>
                  </>
                }
              >
                <Input
                  prefix={<Phone size={16} className="reg-input-icon" aria-hidden="true" />}
                  placeholder="+234 801 234 5678"
                  autoComplete="tel"
                  type="tel"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<ArrowRight size={18} aria-hidden="true" />}
                  iconPlacement="end"
                  block
                >
                  {loading ? "Creating account…" : "Create my account"}
                </Button>
              </Form.Item>
            </Form>

            <p className="reg-terms">
              By registering you agree to our{" "}
              <a href="#" className="reg-link">Terms of Service</a> and{" "}
              <a href="#" className="reg-link">Privacy Policy</a>.
            </p>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
}
