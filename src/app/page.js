"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [count, setCount] = useState(100);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  // Fetch counter from backend
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await axios.get("/api/counter", { timeout: 10000 });
        setCount(res.data.value);
        setLastUpdated(new Date(res.data.updatedAt).toLocaleString());
      } catch (err) {
        if (err.code === "ERR_NETWORK") {
          setError("نیٹ ورک کا مسئلہ، براہ کرم کنکشن چیک کریں");
        } else if (err.response?.status === 500) {
          setError("سرور میں خرابی، بعد میں دوبارہ کوشش کریں");
        } else {
          console.error("Error:", err);
          setError("ڈیٹا لوڈ کرنے میں مسئلہ آیا ہے");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
  }, []);

  // Increment counter
  const increment = async (amount) => {
    const confirmAdd = window.confirm(
      `براہ کرم ${amount} مرتبہ درود شریف پڑھ لیں، پھر شامل کریں۔ \nکیا آپ واقعی اس مقدار کو شامل کرنا چاہتے ہیں؟`
    );

    if (!confirmAdd) return;

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/counter/increment",
        { amount },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.message) {
        alert(res.data.message);
      }

      setCount(res.data.value);
      if (res.data.updatedAt) {
        setLastUpdated(new Date(res.data.updatedAt).toLocaleString());
      }
      localStorage.setItem("darood-counter", res.data.value);
    } catch (error) {
      console.error(error);
      alert("کاؤنٹر اپ ڈیٹ کرنے میں مسئلہ آیا ہے۔");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-purple-100 via-white to-pink-100 text-center px-4 py-8"
        dir="rtl"
      >
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <p className="text-xl font-semibold text-fuchsia-700">
                لوڈ ہو رہا ہے...
              </p>
              <div className="mt-4 w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="absolute top-4 right-6 text-lg md:text-xl font-bold text-fuchsia-700">
          یا اللہ یا رسول مدد
        </div>

        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-fuchsia-300 opacity-25 blur-[120px]"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-fuchsia-700 mt-12 mb-6 leading-snug">
          پندرہ سو (۱۵۰۰) سالہ  
          <br /> جشنِ ولادتِ مصطفیٰ ﷺ
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-purple-800 mb-8">
          اس دفعہ کے جشنِ ولادت پر ہمارا مقصد  
          <br />
          <span className="text-fuchsia-700 font-extrabold">
            ۱۵ کروڑ درود کا تحفہ پیش کرنا ہے
          </span>
        </p>

        <p className="text-lg text-purple-700 font-medium mb-3">
          آپ نے جو بھی آج درود پڑھا ہے وہ اس میں شامل کر دیں
        </p>

        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            درود شریف کاؤنٹر
          </h2>
          <p className="text-3xl font-extrabold text-green-700 mb-2">
            {count.toLocaleString()}
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mb-6">
              آخری اپ ڈیٹ: {lastUpdated}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            {[100, 500, 1000, 2000, 5000, 10000].map((val) => (
              <button
                key={val}
                onClick={() => increment(val)}
                disabled={loading}
                className={`bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                +{val}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
