'use client';

import { useState } from 'react';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

const categories = [
  {
    name: 'Photography',
    image: '/photography.png', 
    languages: 'Spanish ↔ English',
  },
  {
    name: 'Coding',
    image: '/coding.png',
    languages: 'Create solidity smart contract for tokenswap',
  },
  {
    name: 'Translation',
    image: '/translation.png',
    languages: 'Dutch ↔ English',
  },
];

export default function Home() {
  const [selected, setSelected] = useState(categories[0].name);

  const selectedCategory = categories.find(cat => cat.name === selected);

  return (
    <Page className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="w-full flex justify-center pt-8">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Welcome to SkillSphere</h1>
      </div>
      <Page.Header>
        <TopBar title="SkillSphere" />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-start min-h-[60vh]">
        {/* Category Buttons */}
        <div className="flex gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105
                ${selected === cat.name
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-white text-indigo-800 hover:bg-indigo-50 border-2 border-indigo-100'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* Selected Category Card */}
        {selectedCategory && (
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 w-72 border-2 border-indigo-100 hover:shadow-2xl transition-all duration-300">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center p-2">
              <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <h2 className="text-xl font-bold text-indigo-900 mb-2">{selectedCategory.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-bold text-indigo-600">100</div>
              <div className="text-sm font-medium text-indigo-500">rBTC</div>
            </div>
            {selectedCategory.languages && (
              <div className="text-center text-sm text-indigo-700 mt-2 bg-indigo-50 px-4 py-2 rounded-lg">
                {selectedCategory.languages}
              </div>
            )}
          </div>
        )}
      </Page.Main>
      <Page.Footer>
        <div className="text-center text-xs text-indigo-400 py-2">
          Powered by <span className="font-semibold text-indigo-600">World ID</span>
        </div>
      </Page.Footer>
    </Page>
  );
}
