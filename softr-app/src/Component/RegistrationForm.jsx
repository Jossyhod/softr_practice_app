import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function RegistrationForm({
  webhookUrl = "https://hooks.zapier.com/hooks/catch/25351507/u8zfnm8/",
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const params = new URLSearchParams();

    params.append("full_name", form.fullName);
    params.append("email", form.email);
    params.append("phone", form.phone);
    params.append("submitted_at", new Date().toISOString());

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!res.ok) {
        throw new Error();
      }

      setSuccess(true);
      setMessage("Registration successful!");

      setForm({
        fullName: "",
        email: "",
        phone: "",
      });

      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1800);
    } catch {
      setSuccess(false);
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Get Started Free
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl"
          >
            {/* Close Button */}

            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2 hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>

            <div className="p-10">

              <h2 className="text-4xl font-bold text-gray-900">
                Create Your Account
              </h2>

              <p className="mt-3 mb-8 text-gray-500 leading-7">
                Join thousands of professionals already using our
                platform.
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Full Name */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full h-12 rounded-lg border border-gray-300 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Email */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      required
                      className="w-full h-12 rounded-lg border border-gray-300 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 801 234 5678"
                      className="w-full h-12 rounded-lg border border-gray-300 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Message */}

                {message && (
                  <div
                    className={`flex items-center gap-3 rounded-lg p-4 ${
                      success
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {success ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}

                    <span>{message}</span>
                  </div>
                )}

                {/* Button */}

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !form.fullName ||
                    !form.email
                  }
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-600 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="mr-2 animate-spin"
                        size={18}
                      />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                By registering you agree to our{" "}
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  Privacy Policy
                </span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}