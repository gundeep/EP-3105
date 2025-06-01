# SkillSphere - Freelance Marketplace

SkillSphere is a decentralized learning platform built as a World App mini application that enables users to learn new skills, earn attestations, and receive merits for completing tasks.

## Features
- Built on World App's authentication system with session management for each tasks the user completes..

### Attestation System
- Integration with Ethereum Attestation Service (EAS)
- Automatic attestation generation upon task completion
- Schema-based attestation structure:
  - `skillSphereCompleted`: Boolean indicating completion
  - `skillSpheresessionID`: Unique session identifier

### Smart Contract Integration
- Rootstock blockchain integration
- EAS contract interaction for attestations
- Merits distribution through Blockscout API

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Configure the following in `.env.local`:
   - `NEXT_PUBLIC_PRIVATE_KEY`: Your private key for blockchain interactions
   - `API_KEY`: Your Blockscout API key
   - Other required environment variables

5. Run the development server:
   ```bash
   npm run dev
   ```

6. For local testing:
   ```bash
   ngrok http 3000
   ```

## Task Flow

1. User selects a category from the main page
2. Task progress is tracked with a visual progress bar
3. Upon completion:
   - Generates attestation for the session
   - Distributes merits to participants
   - Returns to main page

## Dependencies

- Next.js
- React
- ethers.js
- @ethereum-attestation-service/eas-sdk
- @worldcoin/mini-apps-ui-kit-react
- TailwindCSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
