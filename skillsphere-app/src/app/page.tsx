import { Page } from '@/components/PageLayout';
import { AuthButton } from '../components/AuthButton';
import { UserInfo } from '@/components/UserInfo';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default function Home() {
  return (
    <Page>
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
      <Page.Main className="flex flex-col items-center justify-start gap-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to SkillSphere</h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to start learning and earning
          </p>
          <UserInfo />
        </div>
      </Page.Main>
      <Page.Footer>
        <div className="text-center text-sm text-gray-500">
          Powered by World ID
        </div>
      </Page.Footer>
    </Page>
  );
}
