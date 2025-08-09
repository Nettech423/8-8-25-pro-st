import { useRouter } from 'next/router';
import prompts from '../../../prompts.json';

export default function PromptDetail() {
  const router = useRouter();
  const { id } = router.query;
  const prompt = prompts.find(p => p.id === id);

  const handleBuy = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ priceId: prompt.stripePriceId }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  if (!prompt) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{prompt.title}</h1>
      <p className="my-4">{prompt.description}</p>
      <p className="font-semibold mb-4">${prompt.price}</p>
      <button onClick={handleBuy} className="bg-green-600 text-white px-5 py-2 rounded">Buy with Stripe</button>
    </div>
  );
}
