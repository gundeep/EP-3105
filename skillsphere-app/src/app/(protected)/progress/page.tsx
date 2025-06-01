'use client';

import { useState, useEffect } from 'react';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';

export default function ProgressPage() {
  const router = useRouter();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const contractAddress = '0x0000000000000000000000000000000000000000';
  const contractABI = []; // TODO: Add your contract ABI here
  const [progress, setProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState<any[]>([]);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const completeSession = async () => {
    if (!address) {
      setError('Wallet not connected');
      return;
    }

    setIsCompleting(true);
    setError('');

    try {
      const sessionIndex = 0;
      const session = sessions[sessionIndex];
      
      const data = ethers.keccak256(
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['uint256', 'address', 'address', 'string'],
          [sessionIndex, session.teacher, session.learner, session.skill]
        )
      );

      const hash = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'completeSession',
        args: [sessionIndex, data]
      });

      if (!hash) {
        throw new Error('Transaction failed');
      }

      // Update session state
      const updatedSessions = [...sessions];
      updatedSessions[sessionIndex].completed = true;
      setSessions(updatedSessions);

      // Navigate back to main page after successful completion
      router.push('/page1');
    } catch (err: any) {
      console.error('Error completing session:', err);
      setError(err.message || 'Failed to complete session');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Page className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <Page.Header>
        <TopBar title="Task Progress" />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            Task in Progress
          </h2>
          
          <div className="mb-8">
            <div className="h-4 bg-indigo-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-indigo-600 font-medium">
              {progress}%
            </div>
          </div>

          <p className="text-gray-600 text-center mb-8">
            The task is in progress. When completed, click done.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            onClick={completeSession}
            disabled={isCompleting || progress < 100}
            className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group
              ${(isCompleting || progress < 100) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-lg">
              {isCompleting ? 'Completing...' : 'Done'}
            </span>
          </button>
        </div>
      </Page.Main>
    </Page>
  );
} 