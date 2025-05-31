'use client';

import { useState } from 'react';
import { Page } from '@/components/PageLayout';
import { TopBar } from '@worldcoin/mini-apps-ui-kit-react';

const categories = [
  {
    name: 'Photography',
    image: '/photography.png', // Replace with your image path or use a placeholder
    languages: 'Spanish ↔ English',
  },
  {
    name: 'Coding',
    image: '/coding.png', // Replace with your image path or use a placeholder
    languages: '',
  },
  {
    name: 'Translation',
    image: '/translation.png', // Replace with your image path or use a placeholder
    languages: 'Dutch ↔ English',
  },
];

export default function Home() {
  const [selected, setSelected] = useState(categories[0].name);

  const selectedCategory = categories.find(cat => cat.name === selected);

  return (
    <Page className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="w-full flex justify-center pt-8">
        <h1 className="text-4xl font-extrabold text-blue-900">Welcome to SkillSphere</h1>
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
              className={`px-4 py-2 rounded-lg font-semibold shadow transition
                ${selected === cat.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* Selected Category Card */}
        {selectedCategory && (
          <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-56">
            <div className="w-24 h-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              {/* Replace with <img src={selectedCategory.image} ... /> if you have images */}
              <span className="text-gray-400">image</span>
            </div>
            {selectedCategory.languages && (
              <div className="text-center text-sm text-gray-700 mt-2">
                {selectedCategory.languages}
              </div>
            )}
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
