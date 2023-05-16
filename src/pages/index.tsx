import Layout from "@/components/Layout";

export default function Home() {
  function handleSubmit() {
    console.log("Clicou");
    window.location.href = "/listagem";
  }

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center">
        <div className="flex flex-col justify-center bg-gray-300 p-6 rounded-lg gap-3 text-3xl">
          <label className={`font-bold uppercase`}>Seu Nome:</label>
          <input type="text" className="rounded-lg px-2 py-1" />
          <button
            className="px-2 py-1 bg-blue-700 rounded-lg"
            onClick={handleSubmit}
          >
            <span className={` uppercase text-gray-300`}>Entrar</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
