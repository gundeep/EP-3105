'use client';

import { useState, useEffect } from 'react';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from "ethers";

export default function ProgressPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState<'idle' | 'attestation' | 'merits'>('idle');

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

  const handleDone = async () => {
    setIsCompleting(true);
    setError('');

    try {
      // Step 1: Show attestation status
      setCurrentStep('attestation');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Setup EAS
      const provider = new ethers.JsonRpcProvider("https://rpc.testnet.rootstock.io/API-KEY");
      const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY || "", provider);
      const EASContractAddress = '0xc300aeeadd60999933468738c9f5d7e9c0671e1c';
      const eas = new EAS(EASContractAddress);
      eas.connect(signer);

      // Create attestation for skillSphere session completion
      const schemaUID = '0xb24597f7326aecc1e9456db721453edc8c265e8b5525cf0796217fd1e40e3eff';
      const encoder = new SchemaEncoder('string statement');
      const encodedData = encoder.encodeData([
        { name: 'skillSphereCompleted', value: 'true', type: 'boolean' },
        { name: 'skillSpheresessionID', value: '1234567890', type: 'string' }
      ]);

      // Make attestation
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: '0x0000000000000000000000000000000000000000',
          expirationTime: BigInt(0),
          revocable: true,
          data: encodedData,
        },
      });

      const attestation = await tx.wait();
      console.log("Attestation completed:", attestation);

      // Step 2: Show merits distribution status
      setCurrentStep('merits');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // After attestation, distribute merits
      const meritAmount = 10;
      const distributions = [
        { address: '0x123...', amount: meritAmount },
        { address: '0x456...', amount: meritAmount }
      ];

      const response = await fetch('https://merits.blockscout.com/api/v1/merits/distribute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '4S3G4MZ5S3K4V3MXYD7AEZXB6808V789'
        },
        body: JSON.stringify({ distributions })
      });

      const responseText = await response.text();
      console.log('API Response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to distribute Merits: ${response.status} ${responseText}`);
      }

      // Navigate back to main page after successful completion
      router.push('/page1');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to complete task');
    } finally {
      setIsCompleting(false);
      setCurrentStep('idle');
    }
  };

  const getStatusMessage = () => {
    switch (currentStep) {
      case 'attestation':
        return 'Generating attestation for this session';
      case 'merits':
        return 'Distributing Merits';
      default:
        return '';
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

          {currentStep !== 'idle' && (
            <div className="mb-4 p-3 bg-indigo-50 text-indigo-600 rounded-lg text-center">
              {getStatusMessage()}
            </div>
          )}

          <button
            onClick={handleDone}
            disabled={isCompleting || progress < 100}
            className={`w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group
              ${(isCompleting || progress < 100) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-lg">
              {isCompleting ? 'Processing...' : 'Done'}
            </span>
          </button>
        </div>
      </Page.Main>
    </Page>
  );
} 