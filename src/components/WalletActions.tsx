import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { sepolia } from 'wagmi/chains';
import React, { useEffect, useState } from 'react';
import {
  useAccount,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSignMessage,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'viem';

export default function WalletActions() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [message, setMessage] = useState('');

  // Prepare message to be signed
  useEffect(() => {
    if (address) {
      setMessage(
        `Sign this message to prove you are the owner of this wallet: ${address}`,
      );
    }
  }, [address]);

  // Ask the wallet to sign a message
  const { data: signedHash, signMessage } = useSignMessage({
    message,
  });

  // Ask the wallet to send test MATIC on Polygon Mumbai testnet
  const { config } = usePrepareSendTransaction({
    chainId: sepolia.id,
    // Replace `to` with another address to receive the tokens
    to: '0xfddD2b8D9aaf04FA583CCF604a2De12668200582',
    value: parseEther('0.001'),
  });
  const { data: txData, sendTransaction } = useSendTransaction(config);

  // Watch for transaction completion and show a success alert when done
  useWaitForTransaction({
    chainId: sepolia.id,
    hash: txData?.hash,
    onSuccess() {
      Alert.alert('Transaction succeeded!', '0.001 MATIC sent successfully');
    },
  });

  return (
    <>
      {signedHash && (
        <View style={styles.block}>
          <Text>Signature hash: {signedHash}</Text>
        </View>
      )}

      {/* Add a button to sign the message */}
      <View style={styles.block}>
        <Button title="Sign message" onPress={() => signMessage()} />
      </View>
      {/* 
      <View style={styles.block}>
        <Button
          title="Send 0.001 MATIC"
          disabled={chain?.id !== sepolia.id}
          onPress={() => sendTransaction()}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 32,
  },
});
