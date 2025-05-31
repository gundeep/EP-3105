//  schema definition for the SkillSphere Attestation 
// contains the following data:
// skillSphereCompleted: boolean
// skillSpheresessionID: string


import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from "ethers";
import 'dotenv/config'; // or: require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider("https://rpc.testnet.rootstock.io/API-KEY"); // RPC Api URL Testnet
const signer = new ethers.Wallet("privateKey", provider);

const EASContractAddress = '0xc300aeeadd60999933468738c9f5d7e9c0671e1c' // Testnet (has to be in lowercase)

const eas = new EAS(EASContractAddress); // EAS contract on Rootstock Mainnet
eas.connect(signer);

const schemaUID = '0xb24597f7326aecc1e9456db721453edc8c265e8b5525cf0796217fd1e40e3eff';
// This UID references to https://explorer.testnet.rootstock.io/ras/schema/0xb24597f7326aecc1e9456db721453edc8c265e8b5525cf0796217fd1e40e3eff
const encoder = new SchemaEncoder('string statement');
const encodedData = encoder.encodeData([
  { name: 'skillSphereCompleted', value: 'true', type: 'boolean' }, 
{ name: 'skillSpheresessionID', value: '1234567890', type: 'string' }
]);

// Make attestation
const tx = await eas.attest({
  schema: schemaUID,
  data: {
    recipient: '0x0000000000000000000000000000000000000000', // optional
    expirationTime: BigInt(0),
    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
    data: encodedData,
  },
});

const attestation = await tx.wait();

console.log("Transaction submitted:", attestation);