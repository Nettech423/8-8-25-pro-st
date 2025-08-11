import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Success() {
  const [session, setSession] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchSession() {
      const sId = router.query.session_id;
      if (!sId) return;
      const res = await fetch(`/api/session?sessionId=${sId}`);
      const data = await res.json();
      setSession(data);
    }
    fetchSession();
  }, [router.query.session_id]);

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ color: '#06b6d4' }}>Thank you — purchase complete</h1>
      <pre style={{ background: '#111', padding: 12 }}>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
