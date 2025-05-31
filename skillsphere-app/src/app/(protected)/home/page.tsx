'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleHireClick = () => {
    setSelected('hire');
    router.push('/page1');
  };

  return (
    <Page className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="w-full flex justify-center pt-8">
        <h1 className="text-4xl font-extrabold text-blue-900">Welcome to SkillSphere</h1>
      </div>
      <Page.Header>
        <TopBar title="SkillSphere" />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col gap-8 w-full max-w-md">
          <button
            onClick={handleHireClick}
            className={`w-full py-10 rounded-2xl text-2xl font-bold shadow-lg transition
              ${selected === 'hire'
                ? 'bg-green-700 text-white scale-105'
                : 'bg-green-500 text-white hover:bg-green-600'}
            `}
          >
            Hire for skills
          </button>
          <button
            onClick={() => setSelected('offer')}
            className={`w-full py-10 rounded-2xl text-2xl font-bold shadow-lg transition
              ${selected === 'offer'
                ? 'bg-green-700 text-white scale-105'
                : 'bg-green-500 text-white hover:bg-green-600'}
            `}
          >
            Offer skills
          </button>
        </div>
        {selected && (
          <div className="mt-8 text-lg text-blue-700 font-semibold">
            {selected === 'hire' ? 'You want to hire for skills.' : 'You want to offer your skills.'}
          </div>
        )}
      </Page.Main>
      <Page.Footer>
        <div className="text-center text-xs text-gray-400 py-2">
          Powered by <span className="font-semibold text-blue-600">World ID</span>
        </div>
      </Page.Footer>
    </Page>
  );
}
