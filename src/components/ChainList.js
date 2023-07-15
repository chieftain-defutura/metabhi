export const networks = [
  {
    chainId: `0x${Number(356256156).toString(16)}`,
    chain: 356256156,
    chainName: "Gather Testnet",
    icon: "https://miro.medium.com/v2/resize:fit:2400/1*chjmJksbPKjaZh1Fwp3xlw.jpeg",
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
    chainName: "5ire Chain Thunder",
    icon:
      "https://media-thumbs.golden.com/AwujuORgz5P9AJbMBcTCK6ebcRc=/100x100/smart/golden-storage-production.s3.amazonaws.com%2Ftopic_images%2Fa07561454498480b973e413b0559c073.png",
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
    icon:
      "data:image/png;base64,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",
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
    chainName: "Avalanche testnet fuji",
    icon:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3_9sai9W5S_c2b0t30aGgKNizHflWHCKr_XrDOYKph74Mllhuj2pYczBbabz41g21RU&usqp=CAU",
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
    chainName: "Telos EVM Testnet",
    icon:
      "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/telos/0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E/logo.png",
    name: "telosEVMTestnet",
    nativeCurrency: {
      name: "telos",
      decimals: 18,
      symbol: "TLOS"
    },
    rpcUrls: ["https://telos-evm-testnet.rpc.thirdweb.com"]
  },
  {
    chainId: `0x${Number(8082).toString(16)}`,
    chain: 8082,
    chainName: "Shardeum Validator Sphinx 1.X",
    icon: "https://avatars.githubusercontent.com/u/98940804?s=200&v=4",
    name: "shmSphinx",
    nativeCurrency: {
      name: "SHARDEUM",
      decimals: 18,
      symbol: "SHM"
    },
    rpcUrls: ["https://sphinx.shardeum.org"]
  }
]

export const gather = {
  id: 0x153c099c,
  name: "Gather Testnet",
  icon: "https://miro.medium.com/v2/resize:fit:2400/1*chjmJksbPKjaZh1Fwp3xlw.jpeg",
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
  name: "Telos EVM Testnet",
  icon:
    "https://raw.githubusercontent.com/elkfinance/tokens/main/logos/telos/0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E/logo.png",
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
  icon: "https://miro.medium.com/v2/resize:fit:2400/1*chjmJksbPKjaZh1Fwp3xlw.jpeg",
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
  name: "5ire Chain Thunder",
  icon:
    "https://media-thumbs.golden.com/AwujuORgz5P9AJbMBcTCK6ebcRc=/100x100/smart/golden-storage-production.s3.amazonaws.com%2Ftopic_images%2Fa07561454498480b973e413b0559c073.png",
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
