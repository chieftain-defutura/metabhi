export const networks = [
  {
    chainId: `0x${Number(356256156).toString(16)}`,
    chain: 356256156,
    chainName: "Gather Testnet",
    name: "gather",
    nativeCurrency: {
      name: "GTH",
      decimals: 18,
      symbol: "GTH"
    },
    rpcUrls: ["https://testnet.gather.network"]
  },
  {
    chainId: `0x${Number(997).toString(16)}`,
    chain: 997,
    chainName: "5ire",
    name: "chainThunder",
    nativeCurrency: {
      name: "5ire",
      decimals: 18,
      symbol: "5ire"
    },
    rpcUrls: ["https://rpc-testnet.5ire.network"]
  },
  {
    chainId: `0x${Number(1287).toString(16)}`,
    chain: 1287,
    chainName: "Moonbase Alpha",
    name: "moonbaseAlpha",
    nativeCurrency: {
      name: "moonbase-alphanet",
      decimals: 18,
      symbol: "DEV"
    },
    rpcUrls: ["https://rpc.testnet.moonbeam.network"]
  },
  {
    chainId: `0x${Number(43113).toString(16)}`,
    chain: 43113,
    chainName: "Avalanche",
    name: "avalancheTestnetFuji",
    nativeCurrency: {
      name: "Avalanche",
      decimals: 18,
      symbol: "AVAX"
    },
    rpcUrls: ["https://avalanche-fuji.rpc.thirdweb.com"]
  },
  {
    chainId: `0x${Number(41).toString(16)}`,
    chain: 41,
    chainName: "telos",
    name: "telosEVMTestnet",
    nativeCurrency: {
      name: "telos",
      decimals: 18,
      symbol: "TLOS"
    },
    rpcUrls: ["https://telos-evm-testnet.rpc.thirdweb.com"]
  }
]

export const gather = {
  id: 0x153c099c,
  name: "Gather Testnet",
  network: "Gather Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Gather Testnet",
    symbol: "GTH"
  },
  rpcUrls: {
    public: { http: ["https://testnet.gather.network"] },
    default: { http: ["https://testnet.gather.network"] }
  }
}

export const telos = {
  id: 0x29,
  name: "telos",
  network: "telos",
  nativeCurrency: {
    decimals: 18,
    name: "telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    public: { http: ["https://telos-evm-testnet.rpc.thirdweb.com"] },
    default: { http: ["https://telos-evm-testnet.rpc.thirdweb.com"] }
  }
}

export const moonbaseAlpha = {
  id: 0x507,
  name: "Moonbase Alpha",
  network: "moonbaseAlpha",
  nativeCurrency: {
    decimals: 18,
    name: "moonbase-alphanet",
    symbol: "DEV"
  },
  rpcUrls: {
    public: { http: ["https://rpc.testnet.moonbeam.network"] },
    default: { http: ["https://rpc.testnet.moonbeam.network"] }
  }
}

export const fiveIre = {
  id: 0x3e5,
  name: "5ire",
  network: "5ire",
  nativeCurrency: {
    decimals: 18,
    name: "5ire",
    symbol: "5ire"
  },
  rpcUrls: {
    public: { http: ["https://rpc-testnet.5ire.network"] },
    default: { http: ["https://rpc-testnet.5ire.network"] }
  }
}
