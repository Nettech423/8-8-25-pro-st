import prompts from '../../prompts.json';
import Link from 'next/link';

export default function Prompts() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Prompts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((prompt) => (
          <li key={prompt.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{prompt.title}</h2>
            <p>{prompt.description}</p>
            <Link href={`/prompts/${prompt.id}`} className="text-blue-600 mt-2 inline-block">View & Buy</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
