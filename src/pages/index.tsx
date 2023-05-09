import Layout from "@/components/Layout";
import localFont from "next/font/local";

const savior = localFont({ src: "../../public/Savior4.ttf" });

export default function Home() {
  function handleSubmit() {
    console.log("Clicou");
    window.location.href = "/listagem";
  }

  return (
    <Layout>
      <div className="flex flex-col justify-around bg-gray-300 p-6 rounded-lg gap-3 text-3xl">
        <label className={`${savior.className} font-bold uppercase`}>
          Seu Nome:
        </label>
        <input type="text" className="rounded-lg px-2 py-1" />
        <button
          className="px-2 py-1 bg-blue-700 rounded-lg"
          onClick={handleSubmit}
        >
          <span className={`${savior.className} uppercase text-gray-300`}>
            Entrar
          </span>
        </button>
      </div>
    </Layout>
  );
}
