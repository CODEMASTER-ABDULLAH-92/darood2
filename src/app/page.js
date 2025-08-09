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
             {/* Significance Section */}
      <div className="mt-10 bg-gradient-to-r from-fuchsia-200 via-white to-purple-200 p-8 rounded-2xl shadow-lg max-w-3xl text-right">
        <h3 className="text-2xl font-bold text-fuchsia-700 mb-4">
          درود شریف کی فضیلت
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          حضرت محمد ﷺ نے فرمایا:  
          <span className="font-semibold text-fuchsia-800">
            &quot;جو مجھ پر ایک مرتبہ درود بھیجتا ہے، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے۔&quot;
          </span>  
          (صحیح مسلم)
        </p>

        <blockquote className="italic text-purple-800 border-r-4 border-fuchsia-600 pr-4 mb-4">
          &quot;درود شریف وہ خوشبو ہے جو مومن کے دل کو معطر کرتی ہے۔&quot; — امام شافعیؒ
        </blockquote>

        <h4 className="text-xl font-bold text-fuchsia-700 mb-2">درود شریف کے فوائد:</h4>
        <ul className="list-disc pr-5 text-gray-700 mb-4">
          <li>دل کی سکون اور اطمینان کا ذریعہ ہے۔</li>
          <li>اللہ کی رحمتوں کا سبب بنتا ہے۔</li>
          <li>دنیا اور آخرت میں کامیابی کی ضمانت ہے۔</li>
          <li>نبی ﷺ کی شفاعت کا ذریعہ ہے۔</li>
          <li>انسان کے دل کو گناہوں سے پاک کرتا ہے۔</li>
        </ul>

        <h4 className="text-xl font-bold text-fuchsia-700 mb-2">درود شریف پڑھنے کا طریقہ:</h4>
        <ol className="list-decimal pr-5 text-gray-700 mb-4">
          <li>نیت کریں کہ آپ درود شریف اللہ کی رضا کے لیے پڑھ رہے ہیں۔</li>
          <li>اللہ کی حمد و ثنا کریں اور پھر درود شریف پڑھیں۔</li>
          <li>آخر میں اللہ سے دعا کریں اور امت مسلمہ کے لیے خیر مانگیں۔</li>
        </ol>

        <h4 className="text-xl font-bold text-fuchsia-700 mb-2">مشہور اقوال:</h4>
        <blockquote className="italic text-purple-800 border-r-4 border-fuchsia-600 pr-4">
          &quot;درود شریف دل کو روشن کرتا ہے اور انسان کو اللہ کے قریب کرتا ہے۔&quot;  
          — حضرت امام احمد بن حنبلؒ
        </blockquote>
      </div>

      {/* Poetry Section */}
      <div className="mt-8 text-purple-800 text-lg font-semibold">
        <p>مُجھے کیا فکر ہو اختر میرے یاور ہیں وہ یاور </p>
        <p>بلاؤں کو جو میری خود گرفتارِ بلا کر دیں</p>
      </div>

      {/* Contact Section */}
      <div className="mt-10 text-gray-700 text-base font-medium">
        <p>
          اگر ایپلیکیشن میں کوئی مسئلہ ہو تو براہ کرم صرف واٹس ایپ پر رابطہ کریں:{" "}
          <span className="text-fuchsia-700 font-bold"> 3233381938 92+</span>
        </p>
        <p className="mt-1 text-fuchsia-800 font-semibold">
          عبداللہ الحسینی قادری
        </p>
      </div>
      </div>
    </div>
  );
}
