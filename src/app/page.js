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
    <div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 text-center px-6 py-10 md:py-16"
      dir="rtl"
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-7 rounded-2xl shadow-2xl w-64 flex flex-col items-center">
            <p className="text-xl font-semibold text-fuchsia-700 mb-4">لوڈ ہو رہا ہے...</p>
            <div className="w-14 h-14 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg shadow-lg z-50 max-w-md w-full">
          <span className="block">{error}</span>
        </div>
      )}

      {/* Floating Top Text */}
      <div className="absolute top-6 right-6 text-lg md:text-2xl font-extrabold text-fuchsia-700 select-none pointer-events-none">
        یا اللہ یا رسول مدد
      </div>

      {/* Background Glow Circle */}
      <div className="absolute inset-x-0 top-0 flex justify-center -z-10 mt-12">
        <div className="h-[420px] w-[420px] rounded-full bg-fuchsia-300 opacity-25 blur-[120px]" />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-fuchsia-700 mt-20 mb-8 leading-snug max-w-4xl mx-auto">
        پندرہ سو (۱۵۰۰) سالہ <br />
        جشنِ ولادتِ مصطفیٰ ﷺ
      </h1>

      {/* Subheading */}
      <p className="text-xl md:text-2xl font-semibold text-purple-800 mb-12 max-w-3xl mx-auto leading-relaxed">
        اس دفعہ کے جشنِ ولادت پر ہمارا مقصد
        <br />
        <span className="text-fuchsia-700 font-extrabold">
          ۱۵ کروڑ درود کا تحفہ پیش کرنا ہے
        </span>
      </p>

      {/* Instruction Text */}
      <p className="text-lg text-purple-700 font-medium mb-6 max-w-xl mx-auto">
        آپ نے جو بھی آج درود پڑھا ہے وہ اس میں شامل کر دیں
      </p>

      {/* Counter Box */}
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">درود شریف کاؤنٹر</h2>
        <p className="text-4xl font-extrabold text-green-700 mb-3">{count.toLocaleString()}</p>
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-8">آخری اپ ڈیٹ: {lastUpdated}</p>
        )}

        <div className="flex flex-wrap justify-center gap-5">
          {[100, 500, 1000, 2000, 5000, 10000].map((val) => (
            <button
              key={val}
              onClick={() => increment(val)}
              disabled={loading}
              className={`bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              +{val}
            </button>
          ))}
        </div>
      </div>

      {/* Significance Section */}
      <section className="mt-14 bg-gradient-to-r from-fuchsia-200 via-white to-purple-200 p-10 rounded-3xl shadow-xl max-w-4xl mx-auto text-right text-gray-800">
        <h3 className="text-3xl font-bold text-fuchsia-700 mb-6">درود شریف کی فضیلت</h3>

        <p className="text-lg leading-relaxed mb-5">
          حضرت محمد ﷺ نے فرمایا:{" "}
          <span className="font-semibold text-fuchsia-800">
            "جو مجھ پر ایک مرتبہ درود بھیجتا ہے، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے۔"
          </span>{" "}
          (صحیح مسلم)
        </p>

        <blockquote className="italic text-purple-800 border-r-4 border-fuchsia-600 pr-6 mb-6">
          "درود شریف وہ خوشبو ہے جو مومن کے دل کو معطر کرتی ہے۔" — امام شافعیؒ
        </blockquote>

        <h4 className="text-2xl font-bold text-fuchsia-700 mb-4">درود شریف کے فوائد:</h4>
        <ul className="list-disc pr-7 space-y-2 text-gray-700 mb-8">
          <li>دل کی سکون اور اطمینان کا ذریعہ ہے۔</li>
          <li>اللہ کی رحمتوں کا سبب بنتا ہے۔</li>
          <li>دنیا اور آخرت میں کامیابی کی ضمانت ہے۔</li>
          <li>نبی ﷺ کی شفاعت کا ذریعہ ہے۔</li>
          <li>انسان کے دل کو گناہوں سے پاک کرتا ہے۔</li>
        </ul>

        <h4 className="text-2xl font-bold text-fuchsia-700 mb-4">درود شریف پڑھنے کا طریقہ:</h4>
        <ol className="list-decimal pr-7 space-y-2 text-gray-700 mb-8">
          <li>نیت کریں کہ آپ درود شریف اللہ کی رضا کے لیے پڑھ رہے ہیں۔</li>
          <li>اللہ کی حمد و ثنا کریں اور پھر درود شریف پڑھیں۔</li>
          <li>آخر میں اللہ سے دعا کریں اور امت مسلمہ کے لیے خیر مانگیں۔</li>
        </ol>

        <h4 className="text-2xl font-bold text-fuchsia-700 mb-4">مشہور اقوال:</h4>
        <blockquote className="italic text-purple-800 border-r-4 border-fuchsia-600 pr-6">
          "درود شریف دل کو روشن کرتا ہے اور انسان کو اللہ کے قریب کرتا ہے۔" — حضرت امام احمد بن حنبلؒ
        </blockquote>
      </section>

      {/* Poetry Section */}
      <section className="mt-10 max-w-2xl mx-auto text-purple-800 text-lg font-semibold leading-relaxed space-y-2">
        <p>مُجھے کیا فکر ہو اختر میرے یاور ہیں وہ یاور</p>
        <p>بلاؤں کو جو میری خود گرفتارِ بلا کر دیں</p>
      </section>

      {/* Contact Section */}
      <section className="mt-12 max-w-xl mx-auto text-gray-700 text-base font-medium text-right space-y-3">
        <p>
          اگر ایپلیکیشن میں کوئی مسئلہ ہو تو براہ کرم صرف واٹس ایپ پر رابطہ کریں:{" "}
          <span className="text-fuchsia-700 font-bold">3233381938 92+</span>
        </p>

        <p>
          مزید برکت اور معلومات کے لیے ہماری آفیشل کمیونٹی میں شامل ہوں:{" "}
          <a
            href="https://whatsapp.com/channel/0029VbB8yHoKrWQtP1rC511p"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fuchsia-700 font-bold underline hover:text-fuchsia-900 transition"
          >
            جَزاکَ اللّٰہ کمیونٹی
          </a>
        </p>

        <p className="text-fuchsia-800 font-semibold">
          رجب علی حسینی, عبداللہ الحسینی قادری
        </p>
      </section>
    </div>
  );
}
