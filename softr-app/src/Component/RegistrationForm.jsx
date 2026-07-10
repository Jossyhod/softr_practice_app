import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  notification,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function RegistrationForm({
  webhookUrl = "https://hooks.zapier.com/hooks/catch/25351507/u8zfnm8/",
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  const handleOpen = () => {
    setOpen(true);
    setSubmitted(false);
    form.resetFields();
  };

  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const params = new URLSearchParams();
    params.append("full_name", values.fullName);
    params.append("email", values.email);
    params.append("phone", values.phone || "");
    params.append("submitted_at", new Date().toISOString());

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      // no-cors returns an opaque response (can't read status), so we assume success

      setSubmitted(true);

      setTimeout(() => {
        handleClose();
      }, 2200);
    } catch {
      api.error({
        message: "Submission Failed",
        description: "Something went wrong. Please try again.",
        placement: "topRight",
        duration: 4,
      });
    }

    setLoading(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ffa500",
          borderRadius: 12,
          fontFamily:
            "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }}
    >
      {contextHolder}

      
      <button onClick={handleOpen} className="reg-trigger-btn">
        <span className="reg-btn-icon">
          <RocketOutlined />
        </span>
        Get Started Free
      </button>

  
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        width={520}
        centered
        className="reg-modal"
        styles={{
          content: {
            padding: 0,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow:
              "0 25px 60px rgba(79, 70, 229, 0.25), 0 8px 32px rgba(0,0,0,0.12)",
          },
          mask: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(15,15,30,0.65)",
          },
        }}
      >
        {submitted ? (
        
          <div className="reg-success">
            <div className="reg-success-icon">
              <CheckCircleOutlined />
            </div>
            <Title level={3} className="reg-success-title">
              You&rsquo;re In! 🎉
            </Title>
            <Paragraph className="reg-success-text">
              Your account has been created successfully. Welcome aboard!
            </Paragraph>
          </div>
        ) : (
          <>
          
            <div className="reg-modal-header">
              <div className="reg-modal-header-glow" />
              <div className="reg-header-badge">
                <RocketOutlined /> New Account
              </div>
              <Title level={2} className="reg-modal-title">
                Create Your Account
              </Title>
              <Paragraph className="reg-modal-subtitle">
                Join thousands of professionals already on the platform.
              </Paragraph>
            </div>

            
            <div className="reg-modal-body">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                size="large"
              >
          
                <Form.Item
                  name="fullName"
                  label={<span className="reg-label">Full Name</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your full name",
                    },
                    {
                      min: 2,
                      message: "Name must be at least 2 characters",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="reg-input-icon" />}
                    placeholder="John Doe"
                    className="reg-input"
                    autoComplete="name"
                  />
                </Form.Item>

              
                <Form.Item
                  name="email"
                  label={<span className="reg-label">Email Address</span>}
                  rules={[
                    { required: true, message: "Please enter your email" },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="reg-input-icon" />}
                    placeholder="john@example.com"
                    className="reg-input"
                    autoComplete="email"
                  />
                </Form.Item>

          
                <Form.Item
                  name="phone"
                  label={
                    <span className="reg-label">
                      Phone Number{" "}
                      <span className="reg-optional">(optional)</span>
                    </span>
                  }
                >
                  <Input
                    prefix={<PhoneOutlined className="reg-input-icon" />}
                    placeholder="+234 801 234 5678"
                    className="reg-input"
                    autoComplete="tel"
                  />
                </Form.Item>

                
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    className="reg-submit-btn"
                  >
                    {loading ? "Creating Account…" : "Create My Account →"}
                  </Button>
                </Form.Item>
              </Form>

              <Text className="reg-terms">
                By registering you agree to our{" "}
                <a href="#" className="reg-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="reg-link">
                  Privacy Policy
                </a>
                .
              </Text>
            </div>
          </>
        )}
      </Modal>

      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ── Trigger Button ── */
        .reg-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #ffa500 0%, #ff7a00 100%);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(255,165,0,0.45), 0 1px 4px rgba(0,0,0,0.12);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .reg-trigger-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ffb733, #ff8c00);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .reg-trigger-btn:hover::before { opacity: 1; }
        .reg-trigger-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 30px rgba(255,165,0,0.55), 0 2px 8px rgba(0,0,0,0.15);
        }
        .reg-trigger-btn:active { transform: translateY(0) scale(0.98); }
        .reg-btn-icon { font-size: 16px; position: relative; z-index: 1; }
        .reg-trigger-btn span:last-child { position: relative; z-index: 1; }

        /* ── Modal Header ── */
        .reg-modal-header {
          position: relative;
          background: linear-gradient(135deg, #7a3e00 0%, #b35900 45%, #cc7700 100%);
          padding: 36px 36px 32px;
          overflow: hidden;
        }
        .reg-modal-header-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,165,0,0.35) 0%, transparent 70%);
          top: -80px;
          right: -60px;
          pointer-events: none;
        }
        .reg-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffe0a0;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 50px;
          margin-bottom: 16px;
          backdrop-filter: blur(8px);
        }
        .reg-modal-title {
          color: #fff !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 28px !important;
          font-weight: 800 !important;
          letter-spacing: -0.03em !important;
          margin: 0 0 8px !important;
          line-height: 1.2 !important;
        }
        .reg-modal-subtitle {
          color: #ffd580 !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 14px !important;
          margin: 0 !important;
          line-height: 1.6 !important;
        }

        /* ── Form Body ── */
        .reg-modal-body {
          padding: 28px 36px 32px;
          background: #fff;
        }
        .reg-label {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }
        .reg-optional {
          font-weight: 400;
          color: #9ca3af;
          font-size: 12px;
          margin-left: 4px;
        }
        .reg-input-icon {
          color: #ffa500 !important;
          font-size: 15px;
        }
        .reg-input.ant-input-affix-wrapper {
          border-radius: 12px !important;
          border: 1.5px solid #e5e7eb !important;
          background: #fafafa !important;
          transition: all 0.2s ease !important;
          padding: 10px 14px !important;
        }
        .reg-input.ant-input-affix-wrapper:hover {
          border-color: #ffa500 !important;
          background: #fff !important;
        }
        .reg-input.ant-input-affix-wrapper-focused,
        .reg-input.ant-input-affix-wrapper:focus-within {
          border-color: #ffa500 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(255,165,0,0.15) !important;
        }
        .reg-input .ant-input {
          font-family: 'Inter', sans-serif !important;
          font-size: 14px !important;
          color: #111827 !important;
          background: transparent !important;
        }
        .reg-input .ant-input::placeholder { color: #d1d5db !important; }

        /* ── Submit Button ── */
        .reg-submit-btn.ant-btn {
          height: 52px !important;
          border-radius: 14px !important;
          background: linear-gradient(135deg, #ffa500 0%, #ff7a00 100%) !important;
          border: none !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 15px !important;
          font-weight: 700 !important;
          letter-spacing: -0.01em !important;
          box-shadow: 0 4px 16px rgba(255,165,0,0.4) !important;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          margin-top: 4px;
        }
        .reg-submit-btn.ant-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 24px rgba(255,165,0,0.5) !important;
          background: linear-gradient(135deg, #e69400 0%, #e06000 100%) !important;
        }
        .reg-submit-btn.ant-btn:active { transform: translateY(0) !important; }
        .reg-submit-btn.ant-btn-loading { opacity: 0.85 !important; }

        /* ── Terms ── */
        .reg-terms {
          display: block;
          text-align: center;
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          color: #9ca3af !important;
          margin-top: 20px !important;
          line-height: 1.7 !important;
        }
        .reg-link {
          color: #cc7700 !important;
          font-weight: 600;
          text-decoration: none;
        }
        .reg-link:hover { text-decoration: underline; }

        /* ── Success State ── */
        .reg-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 56px 36px;
          background: linear-gradient(160deg, #fff8ee 0%, #fff0cc 100%);
          text-align: center;
        }
        .reg-success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffa500, #ff7a00);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: #fff;
          margin-bottom: 24px;
          box-shadow: 0 8px 30px rgba(255,165,0,0.4);
          animation: reg-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes reg-pop {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .reg-success-title {
          color: #7a3e00 !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 800 !important;
          font-size: 24px !important;
          margin-bottom: 10px !important;
        }
        .reg-success-text {
          color: #6b7280 !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 15px !important;
          max-width: 280px;
          line-height: 1.6 !important;
        }

        /* ── Ant Modal Overrides ── */
        .reg-modal .ant-modal-close {
          top: 16px !important;
          right: 16px !important;
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          background: rgba(255,255,255,0.18) !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: background 0.2s !important;
        }
        .reg-modal .ant-modal-close:hover {
          background: rgba(255,255,255,0.32) !important;
        }
        .reg-modal .ant-modal-close .ant-modal-close-x {
          font-size: 14px !important;
        }
        .reg-modal .ant-form-item {
          margin-bottom: 18px !important;
        }
        .reg-modal .ant-form-item-label {
          padding-bottom: 6px !important;
        }
        .reg-modal .ant-form-item-explain-error {
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          color: #ef4444 !important;
          margin-top: 4px !important;
        }
      `}</style>
    </ConfigProvider>
  );
}