import { useRouter } from 'next/router';
import prompts from '../../data/prompts.json';

export default function PromptDetail() {
  const router = useRouter();
  const { id } = router.query;
  const prompt = prompts.find(p => p.id === id);

  if (!prompt) return <div className="p-8 text-white">Loading...</div>;

  const handleBuy = async () => {
    const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: prompt.stripePriceId, metadata: { promptId: prompt.id } }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Checkout creation failed');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#071022] to-[#001219] text-white p-8">
      <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-lg border border-white/10">
        <h1 className="text-3xl font-bold text-cyan-200">{prompt.title}</h1>
        <p className="text-slate-300 my-4">{prompt.description}</p>
        <div className="flex items-center justify-between mt-6">
          <span className="text-2xl font-semibold">${prompt.price}</span>
          <button onClick={handleBuy} className="bg-cyan-500 px-4 py-2 rounded-md font-bold text-black">Buy with Stripe</button>
        </div>
      </div>
    </main>
  );
}
