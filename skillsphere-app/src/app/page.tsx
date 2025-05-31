'use client';

import { Page } from '@/components/PageLayout';
import { AuthButton } from '../components/AuthButton';
import { UserInfo } from '@/components/UserInfo';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Page className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="w-full flex justify-center pt-8">
        <h1 className="text-4xl font-extrabold text-blue-900">Welcome to SkillSphere</h1>
      </div>
      <Page.Header>
        <TopBar
          title="SkillSphere"
          endAdornment={
            <div className="flex items-center gap-2">
              <AuthButton />
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col items-center">
          <p className="text-gray-600 mb-6 text-center">
            Connect your wallet to start learning and earning
          </p>
          <div className="w-full mb-4">
            {session ? <UserInfo /> : (
              <div className="flex justify-center">
                <AuthButton />
              </div>
            )}
          </div>
        </div>
      </Page.Main>
      <Page.Footer>
        <div className="text-center text-xs text-gray-400 py-2">
          Powered by <span className="font-semibold text-blue-600">World ID</span>
        </div>
      </Page.Footer>
    </Page>
  );
}
